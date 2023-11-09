import React from 'react';
import {AbsoluteFill} from 'remotion';
import {footerFont, primary, secondary, bodyFont, tertiary, titleFont, headerFont} from '../global/stylesConfig';
import {Report} from '../global/report';
import Card from '../comp/Card';
import FadeInOut from '../comp/FadeInOut'
import Text from '../comp/Text';
import SlideUpDown from '../comp/SlideUpDown'
import Map from '../comp/Map';
import { fps } from '../global/vars';




const durationSeconds = 3;
export const durationInFrames = durationSeconds*fps;





export const ReportScene: React.FC<{
  reportIndex:number
	reports:Report[],
}> = ({reportIndex, reports}) => {

	// convert reports to text
	// get tts
	// get duration

	return (

		<AbsoluteFill className={`bg-slate-900 items-start justify-start`}>

			{/* map */}
			<Map durationInFrames={durationInFrames} reports={reports} highlightedIndices={[reportIndex]} animDelayPerc={0.1} />

			{/* prompt */}
			<SlideUpDown 
				durationInFrames={durationInFrames} 
				targetHeightRatio={0.5} 
				classOther="w-full flex flex-col items-center justify-center" 
				animDelayPerc={0}>
				<Card colorScheme={secondary}>
					<FadeInOut durationInFrames={durationInFrames} classOther="w-full flex flex-col items-start justify-center gap-4 pt-4 pb-8" animDelayPerc={0.04}>
						<Text text='Police Report' fontScheme={headerFont} colorScheme={secondary} />
						<Text bolded="Date: " text='Nov 09' fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Time: " text='11pm' fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Neighborhood: " text='Downtown Yonge East' fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Crime Type: " text='Shooting' fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Location Type: " text='Parking Lot' fontScheme={bodyFont} colorScheme={secondary} />
					</FadeInOut>
				</Card>
				<Card colorScheme={tertiary}>
					<FadeInOut durationInFrames={durationInFrames} classOther="w-full flex flex-col items-center justify-center" animDelayPerc={0.02}>
						<Text text='@TO_Daily' fontScheme={footerFont} colorScheme={tertiary} />
					</FadeInOut>
				</Card>
			</SlideUpDown>

		</AbsoluteFill>

	);
};
        
