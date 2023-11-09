import React from 'react';
import { Img, staticFile } from "remotion";
import { Report } from '../global/report';
import Icon from './Icon';
import Blink from './Blink';
import { gunFilename, mapFilename, pointFilename } from '../global/filenames';


const Map: React.FC<{
	durationInFrames: number,
  animDelayPerc:number,
	reports:Report[],
  reportsHighlighted:Report[]
}> = ({durationInFrames, reports, reportsHighlighted, animDelayPerc=0}) => {

	return (
    <div className='w-full'>
      <div 
          style={{transform: `translate(${0}px, ${0}px)`}}
          className={`absolute`}
        >
        <Blink durationInFrames={durationInFrames} classOther="" animDelayPerc={animDelayPerc} >
          <Icon filename={gunFilename} classOther='w-64' />
        </Blink>
      </div>
      {/* <Icon filename={pointFilename} classOther='w-64' /> */}
      <Img src={staticFile(mapFilename)} className={"w-full"} alt="Map" />
    </div>
	);
};

export default Map;
