import config
import prompt as prmpt
import report as rprt

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
                choices=['violence', 'house', 'vehicle'],
            ),
]
answers = inquirer.prompt(questions)
generate_audio = True if answers['Audio'] == 'Yes' else False
chosenCrimeType = config.crimeTypes[answers['Crime Type']]



yesterday = config.yesterday
reports = rprt.fetchReports(yesterday, chosenCrimeType)
prompts = prmpt.generatePrompts(yesterday, reports, generate_audio)

data = {
    "date":yesterday.strftime('%Y-%m-%d'),
    "reports":reports,
    "prompts":prompts
}


config.save_dict_as_json(data, json_filepath)