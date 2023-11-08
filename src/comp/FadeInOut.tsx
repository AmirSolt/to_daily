import {interpolate, useCurrentFrame, Easing} from 'remotion';
import React from 'react';



const startEnterFadePerc = 0.02;
const endEnterFadePerc = 0.15;
const startEndFadePerc = 0.85;
const endEndFadePerc = 0.95;

const Anim: React.FC<{
	durationInFrames: number,
  children:React.ReactNode,
  animDelayPerc:number,
	classOther:string,
}> = ({durationInFrames, children, classOther, animDelayPerc=0}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [
		Math.floor(startEnterFadePerc*durationInFrames) + Math.floor(animDelayPerc*durationInFrames),
		Math.floor(endEnterFadePerc*durationInFrames) + Math.floor(animDelayPerc*durationInFrames),
		Math.floor(startEndFadePerc*durationInFrames),
		Math.floor(endEndFadePerc*durationInFrames),
	], [0, 1, 1, 0], {
    easing: Easing.bezier(.05,.32,.83,.79),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div
			style={{opacity}}
			className={classOther}
		>
      {children}
		</div>
	);
};


export default Anim;