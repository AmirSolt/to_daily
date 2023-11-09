import { Report } from "./report";
import { getDateStr } from '../global/dateHelper';


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
  return {
    type:"overview",
    text:`${reports.length} police reports on ${getDateStr(date)}`,
    audioFilePath:null,
    durationInSeconds:4,
    highlightedReportIndex:null
  } as Prompt
}

function getReportPrompt(date:Date, report:Report, reportIndex:number){
  return {
    type:"report",
    text:`${report.crimeType} near ${report.neighborhood} at ${report.hour}`,
    audioFilePath:null,
    durationInSeconds:4,
    highlightedReportIndex:reportIndex
  } as Prompt
}


function getMessagePrompt(date:Date){
  return {
    type:"message",
    text:"Follow for daily reports",
    audioFilePath:null,
    durationInSeconds:3,
    highlightedReportIndex:null
  } as Prompt
}



function generateTTS(){

}

function getTTSDuration(){

}