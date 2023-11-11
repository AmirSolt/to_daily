import { Report } from "./report";
import { getDateStr } from '../global/dateHelper';
import ElevenLabs from "elevenlabs-node";
import { getAudioDurationInSeconds } from 'get-audio-duration'

export interface Prompt{
  type:"intro"|"overview"|"report"|"message"
  text:string
  audioFilePath:string|null
  durationInSeconds:number
  highlightedReportIndex:number|null
}

export function generatePrompts(date: Date, reports:Report[]):Prompt[]{

  const messageAfterReports = 2;
  const reportPrompts = reports.map((r,i)=>getReportPrompt(date, r, i))

  return [
    getIntroPrompt(date),
    getOverviewPrompt(date,reports),
    reportPrompts.slice(0, messageAfterReports),
    getMessagePrompt(date,),
    reportPrompts.slice(messageAfterReports),
  ].flat()
}



function getIntroPrompt(date:Date){
  return {
    type:"intro",
    text:"",
    audioFilePath:null,
    durationInSeconds:0.2,
    highlightedReportIndex:null
  } as Prompt
}

function getOverviewPrompt(date:Date, reports:Report[]){
  const type = "overview"
  const filename = `${type}`
  const text = `${reports.length} police reports on ${getDateStr(date, false)}`
  const {filepath, durationInSeconds} = generateTTS(text, filename)
  return {
    type:type,
    text:text,
    audioFilePath:filepath,
    durationInSeconds:durationInSeconds,
    highlightedReportIndex:null
  } as Prompt
}

function getReportPrompt(date:Date, report:Report, reportIndex:number){
  const type = "report"
  const text = `${report.crimeType} near ${report.neighborhood} at ${report.hour}`
  const filename = `${type}_${reportIndex}`
  const {filepath, durationInSeconds} = generateTTS(text, filename)
  return {
    type:type,
    text:text,
    audioFilePath:filepath,
    durationInSeconds:durationInSeconds,
    highlightedReportIndex:reportIndex
  } as Prompt
}


function getMessagePrompt(date:Date){
  const type = "message"
  const text = "Follow for daily reports"
  const filename = `${type}`
  const {filepath, durationInSeconds} = generateTTS(text, filename)
  return {
    type:type,
    text:text,
    audioFilePath:filepath,
    durationInSeconds:durationInSeconds,
    highlightedReportIndex:null
  } as Prompt
}



function generateTTS(text:string, filename:string):{filepath:string, durationInSeconds:number}{
  const API_KEY = "2c77de5e87730023e7cc8434b5a808d5"
  const voiceId = "onwK4e9ZLuTAKqWW03F9"
  const modelId = "eleven_multilingual_v1"
  const filepath = `./public/audio/${filename}.mp3`
  
  const voice = new ElevenLabs(
      {
          apiKey:  API_KEY, // Your API key from 
      }
  );
  
  voice.textToSpeech({
    fileName:        filepath,                    // The name of your audio file
    textInput:       text,                // The text you wish to convert to speech
    voiceId:         voiceId,         // A different Voice ID from the default
    modelId:         modelId,   // The ElevenLabs Model ID
  }).then((res) => {
    console.log(res);
  });

  let durationInSeconds = 0;
  getAudioDurationInSeconds(filepath).then((duration) => {
    durationInSeconds = duration
  })


  return {
    filepath:filepath,
    durationInSeconds:durationInSeconds,
  }
}
