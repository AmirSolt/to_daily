import * as OverviewScene from "./scenes/Overview";
import * as ReportScene from "./scenes/Report";
import {Report} from './global/report';
import {
  linearTiming,
  springTiming,
  TransitionSeries,
} from "@remotion/transitions"; 
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { loadFont } from "@remotion/google-fonts/Montserrat";


const { fontFamily } = loadFont();


const reportExample:Report={
  geoPoint : [250,450],
  hour:23,
	neighborhood:"Downtown Yonge East",
  crimeType:"Yolo",
  locationType:"Outside",
}
const reportExample2:Report={
  geoPoint : [500,350],
  hour:23,
	neighborhood:"Downtown Yonge East",
  crimeType:"Yolo",
  locationType:"Outside",
}
const reportExample3:Report={
  geoPoint : [850,300],
  hour:23,
	neighborhood:"Downtown Yonge East",
  crimeType:"Yolo",
  locationType:"Outside",
}

const reports:Report[] = [
	reportExample,
	reportExample2,
	reportExample3,
]


export const totalDurationInFrames = [
  OverviewScene.durationInFrames,
  ReportScene.durationInFrames*reports.length,
].reduce((a, b) => a + b, 0)


export const MyComposition: React.FC = () => {
  return (
      <TransitionSeries
        style={{
          fontFamily,
        }}
        >
        <TransitionSeries.Sequence durationInFrames={OverviewScene.durationInFrames}>
          <OverviewScene.OverviewScene reports={reports} />
        </TransitionSeries.Sequence>

        
        {reports.map((_, index) =>(
            <TransitionSeries.Sequence durationInFrames={ReportScene.durationInFrames}>
              <ReportScene.ReportScene reports={reports} reportIndex={index} />
            </TransitionSeries.Sequence>
        ))}
  
    </TransitionSeries>

  );
};