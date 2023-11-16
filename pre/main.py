import config
import prompt as prmpt
import report as rprt
import datetime

json_filepath = 'C:/Users/killo/OneDrive/Desktop/TO_DAILY/public/data.json'
# json_filepath = './data.json'


import re
import inquirer
questions = [
  inquirer.List('Audio',
                message="Do Generate Audio?",
                choices=['Yes', 'No'],
            ),
  inquirer.List('Crime Type',
                message="Pick Crime Type?",
                choices=['violence', 'break and enter', 'vehicle theft'],
            ),
]
answers = inquirer.prompt(questions)
generate_audio = True if answers['Audio'] == 'Yes' else False
crimeTypeName = answers['Crime Type']


today = datetime.date.today()
yesterday = today - datetime.timedelta(days = 1)
reports = rprt.fetchReports(yesterday, crimeTypeName)
prompts = prmpt.generatePrompts(yesterday, reports, generate_audio, crimeTypeName)

data = {
    "date":yesterday.strftime('%Y-%m-%d'),
    "reports":reports,
    "prompts":prompts
}


config.save_dict_as_json(data, json_filepath)