import * as IntroScene from "./scenes/Intro";
import * as OverviewScene from "./scenes/Overview";
import * as ReportScene from "./scenes/Report";
import * as MessageScene from "./scenes/Message";
import {
  TransitionSeries,
} from "@remotion/transitions"; 
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { fps } from './global/videoConfig';
import { Prompt } from "./global/prompt";
import { Report } from "./global/report";


const { fontFamily } = loadFont();









export const MyComposition: React.FC<{
  date:Date,
  prompts:Prompt[],
  reports:Report[],

}> = ({ date,prompts,reports, }) => {
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
                  "intro":<IntroScene.IntroScene date={date} reports={reports} durationInFrames={prompt.durationInSeconds*fps} prompt={prompt} />,
                  "overview":<OverviewScene.OverviewScene reports={reports} durationInFrames={prompt.durationInSeconds*fps} prompt={prompt} />,
                  "report":<ReportScene.ReportScene reports={reports} reportIndex={prompt.highlightedReportIndex} durationInFrames={prompt.durationInSeconds*fps} prompt={prompt} />,
                  "message":<MessageScene.MessageScene reports={reports} durationInFrames={prompt.durationInSeconds*fps} prompt={prompt} />,
                }[prompt.type]
              }

            </TransitionSeries.Sequence>
        ))}

    </TransitionSeries>

  );
};
