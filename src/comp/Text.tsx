import React from 'react';
import { FontScheme, ColorScheme } from '../global/stylesConfig';

const Text: React.FC<{
	text: string,
	fontScheme: FontScheme,
	colorScheme: ColorScheme,
}> = ({text, fontScheme, colorScheme}) => {

	return (
		<div
			className={`${fontScheme.size} ${fontScheme.other} ${colorScheme.textColor}`}
		>
			{' '}
			{text}
		</div>
	);
};

export default Text;
