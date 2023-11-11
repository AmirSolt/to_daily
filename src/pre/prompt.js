import ElevenLabs from "elevenlabs-node";
import { getAudioDurationInSeconds } from 'get-audio-duration'



export function generatePrompts(date, reports){

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



function getIntroPrompt(date){
  return {
    type:"intro",
    text:"",
    audioFilePath:null,
    durationInSeconds:0.2,
    highlightedReportIndex:null
  }
}

function getOverviewPrompt(date, reports){
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
  }
}

function getReportPrompt(date, report, reportIndex){
  const type = "report"
  const text = `${report.crimeType} near ${report.neighborhood} at ${report.hour}`
  const filename = `${type}_${reportIndex}`
  const {filepath, durationInSeconds} = generateTTS(text, filename)
  return {
    type:type,
    text:text,
    audioFilePath:filepath,
    durationInSeconds:durationInSeconds,
    highlightedReportIndex:reportIndex,
  }
}


function getMessagePrompt(date){
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
  }
}



function generateTTS(text, filename){
  const API_KEY = "2c77de5e87730023e7cc8434b5a808d5"
  const voiceId = "onwK4e9ZLuTAKqWW03F9"
  const modelId = "eleven_multilingual_v1"
  const filepath = `C:/Users/killo/OneDrive/Desktop/TO_DAILY/public/audio/${filename}.mp3`

  setTimeout(()=>{}, 2000);
  
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
    console.log("ElevenLabs Error:",res);
  });

  console.log("filepath: ",filepath)

  let durationInSeconds = 0;
  getAudioDurationInSeconds(filepath).then((duration) => {
    durationInSeconds = duration
  })


  return {
    filepath:filepath,
    durationInSeconds:durationInSeconds,
  }
}




export function getDateStr(date, isShortHand) {
  const day = date.getDate();
  const month = date.getMonth();

  // Define full months and shorthand months 
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getOrdinalSuffix = (n) => { 
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
  }

  if(isShortHand) {
    return `${shortMonths[month]} ${day}${getOrdinalSuffix(day)}`;
  } else {
    return `${fullMonths[month]} ${day}${getOrdinalSuffix(day)}`;
  }
}

export function convertTo12(time) {
  if (time === 0) {
      return `12am`;
  } else if (time < 12) {
      return `${time}am`;
  } else if (time === 12) {
      return `12pm`;
  } else {
      return `${time - 12}pm`;
  }
};