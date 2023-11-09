import React from 'react';
import {AbsoluteFill} from 'remotion';
import {primary, maxFont} from '../global/stylesConfig';
import {Report} from '../global/report';
import Text from '../comp/Text';
import Map from '../comp/Map';
import SlideDown from '../comp/SlideDown'
import { getDateStr } from '../global/dateHelper';


export const IntroScene: React.FC<{
  date:Date,
	reports:Report[],
	durationInFrames:number,
}> = ({date, reports, durationInFrames}) => {


	return (

		<AbsoluteFill className={`bg-slate-900 items-start justify-start`}>

			{/* map */}
			<Map durationInFrames={durationInFrames} reports={reports} highlightedIndices={[]} animDelayPerc={0.1} />

			{/* prompt */}
			<SlideDown 
				durationInFrames={durationInFrames} 
				targetHeightRatio={0.5} 
				classOther="w-full flex flex-col items-center justify-center" 
				animDelayPerc={0}>
						<Text text={getDateStr(date)} fontScheme={maxFont} colorScheme={primary} />
			</SlideDown>

		</AbsoluteFill>

	);
};
        
