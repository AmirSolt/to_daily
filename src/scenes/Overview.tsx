import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {footerFont, primary, secondary, bodyFont, tertiary, titleFont} from '../global/stylesConfig';
import {Report, chosenCrimeTypes} from '../global/report';
import Card from '../comp/Card';
import FadeInOut from '../comp/FadeInOut'
import Text from '../comp/Text';
import SlideUpDown from '../comp/SlideUpDown'
import Map from '../comp/Map';
import { Prompt } from '../global/prompt';




export const OverviewScene: React.FC<{
	reports:Report[],
	prompt:Prompt,
	durationInFrames:number,
}> = ({reports, durationInFrames, prompt}) => {


	const crimeCounter: { [key: string]: number } = {}
	reports.forEach(r=>{
		if(r.crimeType in crimeCounter){
			crimeCounter[r.crimeType]++
		}else{
			crimeCounter[r.crimeType]=1
		}
	})


	return (

		<AbsoluteFill className={`bg-slate-900 items-start justify-start`}>

			{/* map */}
			<Map durationInFrames={durationInFrames} reports={reports} highlightedIndices={reports.map((_, i)=>i)} animDelayPerc={0.1} isOverview={true} />

			{/* prompt */}
			<SlideUpDown 
				durationInFrames={durationInFrames} 
				targetHeightRatio={0.45} 
				classOther="w-full flex flex-col items-center justify-center" 
				animDelayPerc={0}>
				<Card colorScheme={primary}>
					<FadeInOut durationInFrames={durationInFrames} classOther="w-full flex flex-col items-start justify-center" animDelayPerc={0}>
						<Text text='Overview' fontScheme={titleFont} colorScheme={primary} />
					</FadeInOut>
				</Card>
				<Card colorScheme={secondary}>
					<FadeInOut durationInFrames={durationInFrames} classOther="w-full flex flex-col items-start justify-center gap-4 pt-4 pb-8" animDelayPerc={0.04}>
						<Text bolded="Total: " text={`${reports.length} ${grammarPlurality('report', reports.length)}`} fontScheme={bodyFont} colorScheme={secondary} />
						{Object.entries(crimeCounter).map((crimeStat) => {     
							return (
								<Text bolded={`${crimeStat[0]}: `} text={`${crimeStat[1]} ${grammarPlurality('report', crimeStat[1])}`} fontScheme={bodyFont} colorScheme={secondary} />
								) 
						})}
					
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
        



function grammarPlurality(word:string, count:number){
	return count == 1? word : word+"s";
}