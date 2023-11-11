import {fetchReports} from './pre/report.js';
import { generatePrompts } from "./pre/prompt.js";


( async ()=>{

  const date = new Date()
  date.setDate(date.getDate() - 1);

  const reports = await fetchReports(date)
  const prompts = generatePrompts(date, reports)
  const totalDurationInSeconds = prompts.map(p=>p.durationInSeconds).reduce((a, b) => a + b, 0)

  console.log(totalDurationInSeconds);
})();
