import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';



export const Subtitle: React.FC<{
	text: string;
	textColor: string;
}> = ({text, textColor}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [30, 50], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div
			style={{opacity}}
			className={`${textColor} text-3xl`}
		>
			{' '}
			{text}
		</div>
	);
};
