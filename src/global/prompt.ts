
export interface Prompt{
  type:string|"intro"|"overview"|"report"|"message"
  text:string
  audioFilePath:string
  relativeAudioFilePath:string
  durationInSeconds:number
  highlightedReportIndex:number
}
