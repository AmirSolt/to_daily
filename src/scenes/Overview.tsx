import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {footerFont, primary, secondary, subTitleFont, tertiary, titleFont} from '../global/stylesConfig';
import Icon from '../comp/Icon';
import Card from '../comp/Card';
import FadeInOut from '../comp/FadeInOut'
import Text from '../comp/Text';
import SlideUpDown from '../comp/SlideUpDown'
import Blink from '../comp/Blink';
export const durationSeconds = 4;

export const Overview: React.FC<{
}> = ({}) => {

	const {fps} = useVideoConfig();
	const durationInFrames = durationSeconds*fps;

	return (

		<AbsoluteFill className={`bg-slate-900 items-center justify-center`}>

			<Blink durationInFrames={durationInFrames} classOther="" animDelayPerc={0} >
				<Icon filename='gun.png' classOther='w-64' />
			</Blink>

			<SlideUpDown 
				durationInFrames={durationInFrames} 
				targetHeightRatio={0.28} 
				classOther="absolute w-full flex flex-col items-center justify-center" 
				animDelayPerc={0}>
				<Card colorScheme={primary}>
					<FadeInOut durationInFrames={durationInFrames} classOther="w-full flex flex-col items-start justify-center" animDelayPerc={0}>
						<Text text='Overview' fontScheme={titleFont} colorScheme={primary} />
					</FadeInOut>
				</Card>
				<Card colorScheme={secondary}>
					<FadeInOut durationInFrames={durationInFrames} classOther="w-full flex flex-col items-start justify-center" animDelayPerc={0.04}>
						<Text text='Overview' fontScheme={subTitleFont} colorScheme={secondary} />
						<Text text='Overview' fontScheme={subTitleFont} colorScheme={secondary} />
						<Text text='Overview' fontScheme={subTitleFont} colorScheme={secondary} />
						<Text text='Overview' fontScheme={subTitleFont} colorScheme={secondary} />
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
        
