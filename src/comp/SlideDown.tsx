import {interpolate, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import React from 'react';


const startEnterFadePerc = 0.1;
const endEndFadePerc = 1;




const Anim: React.FC<{
	durationInFrames: number,
  children:React.ReactNode,
  targetHeightRatio:number,
  animDelayPerc:number,
	classOther:string,
}> = ({durationInFrames, children, classOther, targetHeightRatio=0.5, animDelayPerc=0}) => {
	const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  const initY = Math.floor(height*(1-targetHeightRatio));
  const targetY = Math.floor(height);

	const yTrans = interpolate(frame, [
		Math.floor(startEnterFadePerc*durationInFrames) + Math.floor(animDelayPerc*durationInFrames),
		Math.floor(endEndFadePerc*durationInFrames),
	], [initY, targetY], {
    easing: Easing.bezier(.05,.32,.83,.79),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div
      style={{transform: `translateY(${yTrans}px)`}}
				className={`absolute ${classOther}`}
		>
      {children}
    </div>
	);
};



export default Anim;