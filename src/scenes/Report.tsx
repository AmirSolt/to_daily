import React from 'react';
import {AbsoluteFill} from 'remotion';
import {footerFont, primary, secondary, bodyFont, tertiary, titleFont, headerFont} from '../global/stylesConfig';
import {Report} from '../global/report';
import Card from '../comp/Card';
import FadeInOut from '../comp/FadeInOut'
import Text from '../comp/Text';
import SlideUpDown from '../comp/SlideUpDown'
import Map from '../comp/Map';




export const ReportScene: React.FC<{
  reportIndex:number|null,
	reports:Report[],
	durationInFrames:number,
}> = ({reportIndex, reports, durationInFrames}) => {

	if(reportIndex==null){
		throw new Error("Report Index was null");
	}

	const report = reports[reportIndex]

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
						<Text bolded="Time: " text={`${report.hour} *`} fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Neighborhood: " text={`${report.neighborhood}`} fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Crime Type: " text={`${report.crimeType}`} fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Location Type: " text={`${report.locationType}`} fontScheme={bodyFont} colorScheme={secondary} />
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
        
