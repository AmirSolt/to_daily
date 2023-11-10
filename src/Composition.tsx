import * as IntroScene from "./scenes/Intro";
import * as OverviewScene from "./scenes/Overview";
import * as ReportScene from "./scenes/Report";
import * as MessageScene from "./scenes/Message";
import {fetchReports} from './global/report';
import {
  TransitionSeries,
} from "@remotion/transitions"; 
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { generatePrompts } from "./global/prompt";
import { fps } from './global/videoConfig';


const { fontFamily } = loadFont();



const date = new Date()
date.setDate(date.getDate() - 1);
const reports = fetchReports(date)
const prompts = generatePrompts(date, reports)


export const totalDurationInSeconds = prompts.map(p=>p.durationInSeconds).reduce((a, b) => a + b, 0)

export const MyComposition: React.FC = () => {
  return (
      <TransitionSeries
        style={{
          fontFamily,
        }}
        >

        {prompts.map((prompt) =>(
            <TransitionSeries.Sequence durationInFrames={prompt.durationInSeconds*fps}>
              {
                {
                  "intro":<IntroScene.IntroScene date={date} reports={reports} durationInFrames={prompt.durationInSeconds*fps} />,
                  "overview":<OverviewScene.OverviewScene reports={reports} durationInFrames={prompt.durationInSeconds*fps} />,
                  "report":<ReportScene.ReportScene reports={reports} reportIndex={prompt.highlightedReportIndex} durationInFrames={prompt.durationInSeconds*fps} />,
                  "message":<MessageScene.MessageScene reports={reports} durationInFrames={prompt.durationInSeconds*fps} />,
                }[prompt.type]
              }

            </TransitionSeries.Sequence>
        ))}

    </TransitionSeries>

  );
};