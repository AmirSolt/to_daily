import React from 'react';
import {AbsoluteFill} from 'remotion';
import {footerFont, primary, secondary, bodyFont, tertiary, titleFont} from '../global/stylesConfig';
import {Report, CrimeTypes} from '../global/report';
import Card from '../comp/Card';
import FadeInOut from '../comp/FadeInOut'
import Text from '../comp/Text';
import SlideUpDown from '../comp/SlideUpDown'
import Map from '../comp/Map';




export const OverviewScene: React.FC<{
	reports:Report[],
	durationInFrames:number,
}> = ({reports, durationInFrames}) => {

	const shooting = reports.filter(r=>r.crimeType===CrimeTypes.shooting)
	const robbery = reports.filter(r=>r.crimeType===CrimeTypes.robbery)
	const sexualViolation = reports.filter(r=>r.crimeType===CrimeTypes.sexualViolation)
	const homicide = reports.filter(r=>r.crimeType===CrimeTypes.homicide)


	return (

		<AbsoluteFill className={`bg-slate-900 items-start justify-start`}>

			{/* map */}
			<Map durationInFrames={durationInFrames} reports={reports} highlightedIndices={reports.map((_, i)=>i)} animDelayPerc={0.1} />

			{/* prompt */}
			<SlideUpDown 
				durationInFrames={durationInFrames} 
				targetHeightRatio={0.4} 
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
						<Text bolded="Shooting: " text={`${shooting.length} ${grammarPlurality('report', shooting.length)}`} fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Robbery: " text={`${robbery.length} ${grammarPlurality('report', robbery.length)}`} fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Sexual Violation: " text={`${sexualViolation.length} ${grammarPlurality('report', sexualViolation.length)}`} fontScheme={bodyFont} colorScheme={secondary} />
						<Text bolded="Homicide: " text={`${homicide.length} ${grammarPlurality('report', homicide.length)}`} fontScheme={bodyFont} colorScheme={secondary} />
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
        



function grammarPlurality(word:string, count:number){
	return count == 1? word : word+"s";
}