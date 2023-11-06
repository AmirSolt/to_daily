import { Intro } from './scenes/Intro';
import { Report } from './scenes/Report';
import {
  linearTiming,
  springTiming,
  TransitionSeries,
} from "@remotion/transitions";
 
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
 


export const sceneDurationsInFrames = [
	60,
	60,
]
export const transDurationsInFrames = [
	8,
	8,
]



{/* <TransitionSeries.Transition
					timing={springTiming({ durationInFrames: transDurationsInFrames[0] })}
					presentation={fade()}
				/>
<TransitionSeries.Transition
	timing={linearTiming({ durationInFrames: transDurationsInFrames[1]})}
	presentation={wipe()}
/> */}

export const MyComposition: React.FC = () => {
  return (
			<TransitionSeries>

				<TransitionSeries.Sequence durationInFrames={sceneDurationsInFrames[0]}>
				<Intro date={new Date()}/>
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					timing={linearTiming({ durationInFrames: transDurationsInFrames[0]})}
					presentation={wipe()}
				/>

			<TransitionSeries.Sequence durationInFrames={sceneDurationsInFrames[1]}>
				<Report date={new Date()}/>
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					timing={linearTiming({ durationInFrames: transDurationsInFrames[1]})}
					presentation={wipe()}
				/>

			</TransitionSeries>
  );
};