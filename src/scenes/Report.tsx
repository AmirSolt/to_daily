import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {footerFont, primary, secondary, bodyFont, tertiary, titleFont, headerFont} from '../global/stylesConfig';
import {Report} from '../global/report';
import Card from '../comp/Card';
import FadeInOut from '../comp/FadeInOut'
import Text from '../comp/Text';
import SlideUpDown from '../comp/SlideUpDown'
import Map from '../comp/Map';
import { convertTo12 } from '../global/dateHelper';
import { Prompt } from '../global/prompt';



export const ReportScene: React.FC<{
  reportIndex:number|null,
	reports:Report[],
	prompt:Prompt,
	durationInFrames:number,
}> = ({reportIndex, reports, durationInFrames, prompt}) => {

	if(reportIndex==null){
		throw new Error("Report Index was null");
	}

	const report = reports[reportIndex]

	return (

		<AbsoluteFill className={`bg-slate-900 items-start justify-start`}>

			<Map durationInFrames={durationInFrames} reports={reports} highlightedIndices={[reportIndex]} animDelayPerc={0.1} isOverview={false} />

			<SlideUpDown 
				durationInFrames={durationInFrames} 
				targetHeightRatio={0.45} 
				classOther="w-full flex flex-col items-center justify-center" 
				animDelayPerc={0}>
				<Card colorScheme={secondary}>
					<FadeInOut durationInFrames={durationInFrames} classOther="w-full flex flex-col items-start justify-center gap-4 pt-4 pb-8" animDelayPerc={0.04}>
						<Text bolded="Time: " text={`${convertTo12(report.hour)}`} fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Area: " text={`${report.neighborhood}`} fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Incident Type: " text={`${report.crimeType}`} fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Location Type: " text={`${report.locationType}`} fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Occurance Date: " text={`${report.occurDate}`} fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Report Date: " text={`${report.reportDate}`} fontScheme={bodyFont} colorScheme={secondary} />
					</FadeInOut>
				</Card>
				<Card colorScheme={tertiary}>
					<FadeInOut durationInFrames={durationInFrames} classOther="w-full flex flex-col items-center justify-center" animDelayPerc={0.02}>
						<Text text='Tiktok: @TO_Daily' fontScheme={footerFont} colorScheme={tertiary} />
					</FadeInOut>
				</Card>
			</SlideUpDown>

			{prompt.relativeAudioFilePath? 
			(<Audio src={staticFile(prompt.relativeAudioFilePath)} />):(<div/>)}

		</AbsoluteFill>

	);
};
        
