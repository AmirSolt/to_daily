import React from 'react';
import { Img, staticFile } from "remotion";
import { Report } from '../global/report';
import CrimeIcon from './CrimeIcon';
import Icon from './Icon';
import Blink from './Blink';
import { mapFilename, circleFilename } from '../global/filenames';
import { width, height } from '../global/videoConfig';


function convertReportPointToPixel(report:Report):[number,number]{

  const newX = Math.round(0.01691221*report.geoPoint[0] + 149980.6)
  const newY = Math.round(-0.016820124*report.geoPoint[1] + 91710.715546780)
  
  return [newX, newY];
}



const ReportMapped: React.FC<{
	durationInFrames: number,
  animDelayPerc:number,
	report:Report,
  isHighlighted:boolean,
}> = ({durationInFrames, report, isHighlighted, animDelayPerc=0}) => {

  const reportPixelPoint = convertReportPointToPixel(report);
  const iconOffsetX = 55
  const iconOffsetY = 130

  const x = reportPixelPoint[0] - iconOffsetX
  const y = reportPixelPoint[1] - iconOffsetY

	return (
      <div
        style={{transform: `translate(${x}px, ${y}px)`}}

        className='absolute flex flex-col justify-center items-center'
      >

        {isHighlighted?
        (
        <div >
            <Blink durationInFrames={durationInFrames} classOther="" animDelayPerc={animDelayPerc} >
              <CrimeIcon report={report} classOther='w-28 h-28' />
            </Blink>
          </div>
        ):(<div className='w-28 h-28' />)}

          <div>
            <Icon filename={circleFilename} classOther='w-8' />
          </div>
      </div>
	);
};




const Map: React.FC<{
	durationInFrames: number,
  animDelayPerc:number,
	reports:Report[],
  highlightedIndices:number[]
}> = ({durationInFrames, reports, highlightedIndices, animDelayPerc=0}) => {
	return (
    <div className='w-full'>

      {reports.map((report, index) =>(
        <ReportMapped durationInFrames={durationInFrames} animDelayPerc={animDelayPerc} report={report} isHighlighted={highlightedIndices.includes(index)} />
      ))}


      {/* <Icon filename={pointFilename} classOther='w-64' /> */}
      <Img src={staticFile(mapFilename)} className={"w-full"} alt="Map" />
    </div>
	);
};

export default Map;
