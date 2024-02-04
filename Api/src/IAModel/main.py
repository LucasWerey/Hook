from model import main
import requests

def get_all_student_ids():
    response = requests.get(f'http://127.0.0.1:8000/students')

    if response.status_code == 200:
        students = response.json()
        student_ids = [student['_id']['$oid'] for student in students]
        return student_ids
    else:
        print(f"Request failed with status code {response.status_code}")
        return []

student_ids = get_all_student_ids()

for student_id in student_ids:
    print('\n' + '*' * 50)
    print('\033[1;32;40m' + f"Processing student id: {student_id}" + '\033[0m')
    print('*' * 50 + '\n')
    main(student_id)
