import React from 'react';
import { FontScheme, ColorScheme } from '../global/stylesConfig';

const Text: React.FC<{
	bolded?: string,
	text: string,
	fontScheme: FontScheme,
	colorScheme: ColorScheme,
}> = ({text, fontScheme, colorScheme, bolded=""}) => {

	return (
		<div
			className={`${fontScheme.size} ${fontScheme.other} ${colorScheme.textColor}`}
		>
			{' '}
			<b>{bolded}</b>{text}
		</div>
	);
};

export default Text;
