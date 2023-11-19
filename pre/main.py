import config
import prompt as prmpt
import report as rprt
import datetime
import sys
import getopt
import re
import inquirer

json_filepath = '../public/data.json'
# json_filepath = './data.json'
audioBoolChoices = ['No', 'Yes']
CrimeTypeChoices = ['violence', 'break and enter', 'vehicle theft']


def main(argv):
    generate_audio_arg = ""
    crime_type_arg = ""



    if len(argv) > 0:
        opts, args = getopt.getopt(argv,"v:c:")
        for opt, arg in opts:
            if opt == '-h':
                print (f'test.py -v <voice {audioBoolChoices=}> -c <crime {CrimeTypeChoices=}>')
                sys.exit()
            elif opt in ("-v", "--voice"):
                generate_audio_arg = audioBoolChoices[int(arg)]
            elif opt in ("-c", "--crime"):
                crime_type_arg = CrimeTypeChoices[int(arg)]
    else:

        questions = [
        inquirer.List('Audio',
                        message="Do Generate Audio?",
                        choices=audioBoolChoices,
                    ),
        inquirer.List('Crime Type',
                        message="Pick Crime Type?",
                        choices=CrimeTypeChoices,
                    ),
        ]
        answers = inquirer.prompt(questions)
        generate_audio_arg = answers['Audio']
        crime_type_arg = answers['Crime Type']


    generate_audio = True if generate_audio_arg == 'Yes' else False
    crimeTypeName = crime_type_arg 


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


if __name__ == "__main__":
    main(sys.argv[1:])