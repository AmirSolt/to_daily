

from elevenlabs import set_api_key
from elevenlabs import generate
from elevenlabs import save
import config
import time
from mutagen.mp3 import MP3
from dotenv import load_dotenv
load_dotenv()
import os

API_KEY = os.environ.get("ELEVENLABS_API_KEY")
VOICE_NAME = "Daniel"
FILE_TYPE = "mp3"
MODEL_ID = "eleven_multilingual_v1"
AUDIO_DIR = '../public/audio/'
STATIC_RELATIVE_AUDIO_DIR = 'audio/'
# AUDIO_DIR = './audio/'
set_api_key(API_KEY)

start_pause = '<break time="0.7s" />'
end_pause = 0.7




def generatePrompts(date, reports, generate_audio, crimeTypeName):
  messageAfterReports = 4
  
  reportPrompts = [get_report_prompt(date, r, i, generate_audio, crimeTypeName) for i, r in enumerate(reports)]

  return [
    get_intro_prompt(date, generate_audio),
    get_overview_prompt(date, reports, generate_audio, crimeTypeName),
    *reportPrompts[:messageAfterReports],
    get_message_prompt(date, generate_audio),
    *reportPrompts[messageAfterReports:]
  ]



def get_intro_prompt(date, generate_audio):
  type_ = "intro"
  filename = f"{type_}"
  text = f"{start_pause} {get_date_str(date, is_short_hand=False)}, toronto"
  relativeAudioFilePath, filepath, duration_in_seconds = generate_tts(text, filename, generate_audio)
  return {
    "type": type_,
    "text": text,
    "audioFilePath": filepath,
    "relativeAudioFilePath": relativeAudioFilePath,
    "durationInSeconds": duration_in_seconds,
    "highlightedReportIndex": -1
  }

def get_overview_prompt(date, reports, generate_audio, crimeTypeName):
  type_ = "overview"
  filename = f"{type_}"
  text = f"{start_pause} {len(reports)} police reports of {crimeTypeName}."
  relativeAudioFilePath, filepath, duration_in_seconds = generate_tts(text, filename, generate_audio)
  return {
    "type": type_, 
    "text": text, 
    "audioFilePath": filepath, 
    "relativeAudioFilePath": relativeAudioFilePath,
    "durationInSeconds": duration_in_seconds + end_pause, 
    "highlightedReportIndex": -1
  }

def get_report_prompt(date, report, report_index, generate_audio, crimeTypeName):
  type_ = "report"
  crime_type = censor_word(report['crimeType'])
  crime_type = "" if config.ChosenCrimeTypes[crimeTypeName] else crime_type 
  text = f"{start_pause} {crime_type} near {report['neighborhood']} at {convert_to_12(report['hour'])}."
  filename = f"{type_}_{report_index}"
  relativeAudioFilePath, filepath, duration_in_seconds = generate_tts(text, filename, generate_audio)
  return {
    "type": type_, 
    "text": text, 
    "audioFilePath": filepath, 
    "relativeAudioFilePath": relativeAudioFilePath,
    "durationInSeconds": duration_in_seconds + end_pause, 
    "highlightedReportIndex": report_index
  }

def get_message_prompt(date, generate_audio):
  type_ = "message"
  text = f"{start_pause} Follow for daily reports."
  filename = f"{type_}"
  relativeAudioFilePath, filepath, duration_in_seconds = generate_tts(text, filename, generate_audio)
  return {
    "type": type_,
    "text": text,
    "audioFilePath": filepath,
    "relativeAudioFilePath": relativeAudioFilePath,
    "durationInSeconds": duration_in_seconds + end_pause,
    "highlightedReportIndex": -1
  }


def censor_word(word:str):
  if "sexual violation" == word.lower():
    return "S/V"
  return word

def get_ordinal_suffix(n):
    if n > 3 and n < 21:
        return 'th'
    elif n % 10 == 1:
        return "st"
    elif n % 10 == 2:
        return "nd"
    elif n % 10 == 3:
        return "rd"
    else:
        return "th"

def get_date_str(date, is_short_hand):
    day = date.day
    month = date.month

    full_months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    short_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    if is_short_hand:
        return f"{short_months[month - 1]} {day}{get_ordinal_suffix(day)}"
    else:
        return f"{full_months[month - 1]} {day}{get_ordinal_suffix(day)}"

def convert_to_12(time):
    if time == 0:
        return "12am"
    elif time < 12:
        return f"{time}am"
    elif time == 12:
        return "12pm"
    else:
        return f"{time - 12}pm"


def generate_tts(text, filename, generate_audio):
  
  filepath = AUDIO_DIR + filename + "." + FILE_TYPE
  relativeAudioFilePath = STATIC_RELATIVE_AUDIO_DIR + filename + "." + FILE_TYPE
  
  if generate_audio:
    audio = generate(
      text=text,
      voice=VOICE_NAME,
      model=MODEL_ID,
    )
    save(audio, filepath)
    print(f"{filepath} created. Sleeping...")
    time.sleep(1)
  
  

  duration = get_duration(filepath)

  return relativeAudioFilePath, filepath, duration
  

  
def get_duration(file):
    audio = MP3(file)
    audio_info = audio.info   
    return audio_info.length