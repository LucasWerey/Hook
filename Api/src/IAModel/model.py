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
from nltk.stem.porter import PorterStemmer
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')


def cleanResume(resumeText):
    resumeText = re.sub('http\S+\s*', ' ', resumeText)  # remove URLs
    resumeText = re.sub('RT|cc', ' ', resumeText)  # remove RT and cc
    resumeText = re.sub('#\S+', '', resumeText)  # remove hashtags
    resumeText = re.sub('@\S+', '  ', resumeText)  # remove mentions
    resumeText = re.sub('[%s]' % re.escape(
        """!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', resumeText)  # remove punctuations
    resumeText = re.sub(r'[^\x00-\x7f]', r' ', resumeText)
    resumeText = re.sub('\s+', ' ', resumeText)  # remove extra whitespace
    pattern = r"<[^>]+>"
    resumeText = re.sub(pattern, "", resumeText)
    return resumeText


def model_preprocessing(txt):
    cleaned_text = cleanResume(txt)
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


def model(input):
    input_model = model_preprocessing(input)
    input_model = input_model.astype(np.float32)
    input_name = sess.get_inputs()[0].name
    output_name = sess.get_outputs()[0].name
    predictions = sess.run([output_name], {input_name: input_model})[0]
    return predictions


with open('tokenizer.json') as f:
    data = json.load(f)
    tokenizer = tokenizer_from_json(data)

print("\033[92mLoading the ONNX model...\033[0m")
sess = rt.InferenceSession("output_model_2.onnx")
print("\033[92mONNX model loaded successfully.\033[0m")

print("\033[92mGetting the input name...\033[0m")
input_name = sess.get_inputs()[0].name
print(f"\033[92mInput name: {input_name}\033[0m")

print("\033[92mPreprocessing the input data...\033[0m")
txt = """"
Planification de projets
Réseau étendu (WAN)
Programmation en C et VHDL
Gestion de projet
Product Owner (stage)
Conseil client en zone bien-être et outdoor, opérations de caisse, mise en place de table de présentation produit.
Réalisation des prérequis pour la migration d'équipements sous le réseau INUITMises à jour patrimoniales.
Rigueur
Autonomie
Esprit d’équipe
"""
translator = Translator()
translation = translator.translate(txt, dest='en')

lemmatizer = nltk.stem.WordNetLemmatizer()

entries = model_preprocessing(translation.text)
entries = entries.astype('float32')

print("\033[92mInput data preprocessed successfully.\033[0m")

print("\033[92mRunning the model...\033[0m")
output = sess.run(None, {input_name: entries})
print("\033[92mModel run successfully.\033[0m")

print("\033[92mOutput:\033[0m")


keys = ['Java_Developer', 'Software_Developer', 'Web_Developer',       'Network_Administrator', 'Systems_Administrator',
        'Project_manager', 'Database_Administrator', 'Front_End_Developer',       'Security_Analyst', 'Python_Developer']

output = np.array(output).flatten()
output_dict = dict(zip(keys, output))
for key in output_dict:
    output_dict[key] = f"{output_dict[key] * 100:.0f}%"
print(output_dict)
