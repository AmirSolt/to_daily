import config
import prompt as prmpt
import report as rprt


# json_filepath = 'C:/Users/killo/OneDrive/Desktop/TO_DAILY/public/data.json'
json_filepath = './data.json'


yesterday = config.yesterday
reports = rprt.fetchReports(yesterday)
prompts = prmpt.generatePrompts(yesterday, reports)

data = {
    "date":yesterday.strftime('%Y-%m-%d'),
    "reports":reports,
    "prompts":prompts
}


config.save_dict_as_json(prompts, json_filepath)