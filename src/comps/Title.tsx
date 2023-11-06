import {interpolate} from 'remotion';
import {useCurrentFrame} from 'remotion';
import React from 'react';

export const Title: React.FC<{
	text: string;
	textColor: string;
}> = ({text, textColor}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [20, 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div
			style={{opacity}}
			className={`${textColor} text-5xl font-bold leading-relaxed`}
		>
			{' '}
			{text}
		</div>
	);
};
