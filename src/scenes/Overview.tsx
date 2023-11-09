import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {footerFont, primary, secondary, subTitleFont, tertiary, titleFont} from '../global/stylesConfig';
import {Report} from '../global/report';
import Card from '../comp/Card';
import FadeInOut from '../comp/FadeInOut'
import Text from '../comp/Text';
import SlideUpDown from '../comp/SlideUpDown'
import Map from '../comp/Map';

export const durationSeconds = 4;

const reportExample:Report={
  geoPoint : [250,450],
  hour:23,
	neighborhood:"Downtown Yonge East",
  crimeType:"Yolo",
  locationCategory:"Outside",
}

export const Overview: React.FC<{
}> = ({}) => {

	const {fps} = useVideoConfig();
	const durationInFrames = durationSeconds*fps;

	return (

		<AbsoluteFill className={`bg-slate-900 items-start justify-start`}>

			<Map durationInFrames={durationInFrames} reports={[reportExample]} reportsHighlighted={[reportExample]} animDelayPerc={0.1} />

			<SlideUpDown 
				durationInFrames={durationInFrames} 
				targetHeightRatio={0.5} 
				classOther="w-full flex flex-col items-center justify-center" 
				animDelayPerc={0}>
				<Card colorScheme={primary}>
					<FadeInOut durationInFrames={durationInFrames} classOther="w-full flex flex-col items-start justify-center" animDelayPerc={0}>
						<Text text='Overview on Nov 09' fontScheme={titleFont} colorScheme={primary} />
					</FadeInOut>
				</Card>
				<Card colorScheme={secondary}>
					<FadeInOut durationInFrames={durationInFrames} classOther="w-full flex flex-col items-start justify-center gap-4 pt-4 pb-8" animDelayPerc={0.04}>
						<Text text='Time: 11pm' fontScheme={subTitleFont} colorScheme={secondary} />
						<Text text='Neighborhood: Downtown Yonge East' fontScheme={subTitleFont} colorScheme={secondary} />
						<Text text='Crime Type: Shooting' fontScheme={subTitleFont} colorScheme={secondary} />
						<Text text='Location Category: Parking Lot' fontScheme={subTitleFont} colorScheme={secondary} />
					</FadeInOut>
				</Card>
				<Card colorScheme={tertiary}>
					<FadeInOut durationInFrames={durationInFrames} classOther="w-full flex flex-col items-center justify-center" animDelayPerc={0.02}>
						<Text text='Overview' fontScheme={footerFont} colorScheme={tertiary} />
					</FadeInOut>
				</Card>
			</SlideUpDown>
		</AbsoluteFill>

	);
};
        
