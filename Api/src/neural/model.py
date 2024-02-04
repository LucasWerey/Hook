import requests
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import tensorflow as tf
import numpy as np
import onnxruntime as rt
import json
from tensorflow.keras.preprocessing.text import tokenizer_from_json
from googletrans import Translator
import nltk
from nltk.corpus import stopwords
import string
import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import os

nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')

lemmatizer = WordNetLemmatizer()

def clean_text(text):
    text = re.sub('http\S+\s*', ' ', text)
    text = re.sub('RT|cc', ' ', text)
    text = re.sub('#\S+', '', text)
    text = re.sub('@\S+', '  ', text)
    text = re.sub('[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', text)
    text = re.sub(r'[^\x00-\x7f]', r' ', text)
    text = re.sub('\s+', ' ', text)
    pattern = r"<[^>]+>"
    text = re.sub(pattern, "", text)
    return text

def preprocess_text(text, tokenizer):
    cleaned_text = clean_text(text)
    lower = cleaned_text.lower()
    tokens = word_tokenize(lower)
    stop_words = set(stopwords.words('english') + list(string.punctuation))
    tokens = [w for w in tokens if not w in stop_words]
    lemmatized_tokens = [lemmatizer.lemmatize(token) for token in tokens]
    txt_tok = tokenizer.texts_to_sequences(lemmatized_tokens)
    txt_tok_nr = pad_sequences(txt_tok)
    txt_tok_nr = np.array(txt_tok_nr)
    txt_tok_nr = np.transpose(txt_tok_nr)
    return txt_tok_nr


def load_tokenizer_from_json(file_name):
    file_path = os.path.join(os.path.dirname(__file__), file_name)
    with open(file_path) as f:
        data = json.load(f)
        tokenizer = tokenizer_from_json(data)
    return tokenizer

def load_onnx_model(file_name):
    file_path = os.path.join(os.path.dirname(__file__), file_name)
    sess = rt.InferenceSession(file_path)
    input_name = sess.get_inputs()[0].name
    return sess, input_name

def run_model(sess, input_name, entries):
    output_name = sess.get_outputs()[0].name
    output = sess.run([output_name], {input_name: entries})[0]
    return output

def get_student_info(student_id):
    response = requests.get(f'http://127.0.0.1:8000/student/{student_id}')

    if response.status_code == 200:
        student = response.json()
        id = student['_id']['$oid']
        formations = ' '.join([formation['name'] for formation in student['profile']['formations']])
        soft_skills = ' '.join(student['profile']['softSkills'])
        hard_skills = ' '.join(student['profile']['hardSkills'])
        experiences = ' '.join([experience['jobTitle'] for experience in student['profile']['experiences']])
        job_description = ' '.join([experience['description'] for experience in student['profile']['experiences']])

        txt = f"{formations} {soft_skills} {hard_skills} {experiences} {job_description}"
        return txt, id
    else:
        return f"Request failed with status code {response.status_code}"

def get_all_offers():
    response = requests.get(f'http://127.0.0.1:8000/offers')
    if response.status_code == 200:
        data = response.json()
        offers = []
        for offer in data:
            offer_id = offer['_id']['$oid']
            matches = offer['matchs']
            position_name = offer['details']['position_name']
            details = offer['details']
            id_company = offer['id_company']
            id_recruiter = offer['id_recruiter']
            offers.append({
                "ID": offer_id,
                "Matches": matches,
                "Position Name": position_name,
                "id_company": id_company,
                'details': details,
                "id_recruiter": id_recruiter,
            })
        return offers
    else:
        return f"Request failed with status code {response.status_code}"

def update_offer(offer_id, data):
    json_data = json.dumps(data)
    response = requests.put(f"http://127.0.0.1:8000/offer/{offer_id}", data=json_data)
    return response.text

def main(student_id):
    tokenizer = load_tokenizer_from_json('tokenizer.json')
    sess, input_name = load_onnx_model("output_model_2.onnx")

    txt, _ = get_student_info(student_id)  # Extracting 'txt', but not using the second variable '_'
    translator = Translator()
    translation = translator.translate(txt, dest='en')

    entries = preprocess_text(translation.text, tokenizer)
    entries = entries.astype('float32')

    print("\033[92mInput data preprocessed successfully.\033[0m")

    print("\033[92mRunning the model...\033[0m")
    output = run_model(sess, input_name, entries)
    print("\033[92mModel run successfully.\033[0m")

    keys = ['Java_Developer', 'Software_Developer', 'Web_Developer', 'Network_Administrator', 'Systems_Administrator',
            'Project_manager', 'Database_Administrator', 'Front_End_Developer', 'Security_Analyst', 'Python_Developer']

    output = np.array(output).flatten()
    print("\033[92mModel Output:\033[0m")
    output_dict = dict(zip(keys, output))
    print(output_dict, '\n')
    for key in output_dict:
        output_dict[key] = f"{output_dict[key] * 100:.0f}%"

    offers = get_all_offers()
    format_keys = [key.replace('_', ' ') for key in keys]

    for offer in offers:
        try:
            position_name = translator.translate(offer['Position Name'], dest='en').text.replace('-', ' ')
            for key in format_keys:
                key_with_underscores = key.replace(' ', '_')
                if key.lower() in position_name.lower():
                    if not offer.get('Matches'):
                        offer['Matches'] = [{'student_id': {'$oid': student_id}, 'globalMatch': output_dict[key_with_underscores]}]
                    else:
                        match_found = False
                        for match in offer['Matches']:
                            if 'student_id' in match and match['student_id'].get('$oid') == student_id:
                                match['globalMatch'] = output_dict[key_with_underscores]
                                match_found = True
                                break
                        if not match_found:
                            offer['Matches'].append({'student_id': {'$oid': student_id}, 'globalMatch': output_dict[key_with_underscores]})
                    data = {
                        'id_company': offer['id_company']['$oid'],
                        'id_recruiter': offer['id_recruiter']['$oid'],
                        'details': offer.get('details', ''),
                        'matchs': offer['Matches'],
                        'id': offer['ID']
                    }
                    print(update_offer(offer['ID'], data))
        except KeyError as e:
            print(f"Missing key {e} in offer")
        except Exception as e:
            print(f"An error occurred: {e}")

if __name__ == "__main__":
    student_id_to_analyze = '65afec2897cb083d98525cbf'
    main(student_id_to_analyze)
