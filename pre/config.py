
import datetime
import json

today = datetime.date.today()
yesterday = today - datetime.timedelta(days = 1)

generate_audio = False

promptTypes = {
  'intro':'intro',
  'overview':'overview',
  'report':'report',
  'message':'message',
}

CrimeTypes = {
  'assault': 'Assault',
  'autoTheft': 'Auto Theft',
  'theftFromVehicle': 'Theft from Motor Vehicle',
  'breakAndEnter': 'Break and Enter',
  'sexualViolation': 'Sexual Violation',
  'robbery': 'Robbery',
  'theftOver': 'Theft Over',
  'bikeTheft': 'Bike Theft',
  'shooting': 'Shooting',
  'homicide': 'Homicide',
}

chosenCrimeTypes = {
  'sexualViolation':CrimeTypes['sexualViolation'],
  'robbery':CrimeTypes['robbery'],
  'shooting':CrimeTypes['shooting'],
  'homicide':CrimeTypes['homicide'],
}

def save_dict_as_json(d, filepath):
    """
    Save a dictionary into a json file

    Args:
    d : dict
        dictionary to save
    filepath : str
        path to the json file
    """
    with open(filepath, 'w') as json_file:
        json.dump(d, json_file)