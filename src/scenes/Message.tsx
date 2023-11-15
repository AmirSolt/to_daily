import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {footerFont, primary, secondary, bodyFont, tertiary, titleFont} from '../global/stylesConfig';
import {Report} from '../global/report';
import Card from '../comp/Card';
import FadeInOut from '../comp/FadeInOut'
import Text from '../comp/Text';
import SlideUpDown from '../comp/SlideUpDown'
import Map from '../comp/Map';
import { Prompt } from '../global/prompt';



export const MessageScene: React.FC<{
	reports:Report[],
	prompt:Prompt,
	durationInFrames:number,
}> = ({reports, durationInFrames, prompt}) => {

	// convert reports to text
	// get tts
	// get duration

	return (

		<AbsoluteFill className={`bg-slate-900 items-start justify-start`}>

			{/* map */}
			<Map durationInFrames={durationInFrames} reports={reports} highlightedIndices={[]} animDelayPerc={0.1} isOverview={false} />

			{/* prompt */}
			<SlideUpDown 
				durationInFrames={durationInFrames} 
				targetHeightRatio={0.6} 
				classOther="w-full flex flex-col items-center justify-center" 
				animDelayPerc={0}>
				<Card colorScheme={primary}>
					<FadeInOut durationInFrames={durationInFrames} classOther="w-full flex flex-col items-start justify-center" animDelayPerc={0}>
						<Text text='Follow for Daily Upload' fontScheme={titleFont} colorScheme={primary} />
					</FadeInOut>
				</Card>
				<Card colorScheme={secondary}>
					<FadeInOut durationInFrames={durationInFrames} classOther="w-full flex flex-col items-start justify-center gap-4 pt-4 pb-8" animDelayPerc={0.04}>
						<Text text="Share to Spread Awareness" fontScheme={bodyFont} colorScheme={secondary} />
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
        
