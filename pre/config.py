
import datetime
import json




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

ChosenCrimeTypes = {
  'violence': {
    "voiceCrimeType": True,
    "crimeTypes":{
      'sexualViolation':CrimeTypes['sexualViolation'],
      'robbery':CrimeTypes['robbery'],
      'shooting':CrimeTypes['shooting'],
      'homicide':CrimeTypes['homicide'],
    }
  },
    'break and enter': {
      "voiceCrimeType": False,
      "crimeTypes":{
        'breakAndEnter':CrimeTypes['breakAndEnter'],
      }
  },
    'vehicle theft':{
      "voiceCrimeType": False,
      "crimeTypes":{
        'autoTheft':CrimeTypes['autoTheft'],
      }
  }
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