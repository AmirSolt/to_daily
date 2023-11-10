import React from 'react';
import { Img, staticFile } from "remotion";
import { Report } from '../global/report';
import CrimeIcon from './CrimeIcon';
import Icon from './Icon';
import Blink from './Blink';
import { mapFilename, circleFilename } from '../global/filenames';

// 5427239.027927728,49
// 5443097.109880663,931
// 5405767.174643795,604
// y = 64166290 - 23.66701*x + 0.000002182327*x^2

// 5427239.027927728, -8864425.720870294
// 49, 356

// 5443097.109880663, -8813484.897743978
// 931, 78

// 5405767.174643795, -8833013.898652822
// 604, 713

function convertReportPointToPixel(report:Report):[number,number]{

  y = -0.0168663*x - 148494.1
  y = 0.01696261*x - 90655.49
  const newX = Math.round(-2699487000 + 1497.296*report.geoPoint[0] - 0.0002768294*report.geoPoint[0]^2 + 1.706064e-11*report.geoPoint[0]^3)
  const newY = Math.round(-2699487000 + 1497.296*report.geoPoint[1] - 0.0002768294*report.geoPoint[1]^2 + 1.706064e-11*report.geoPoint[1]^3)
  
  return [newX, newY];
}



const ReportMapped: React.FC<{
	durationInFrames: number,
  animDelayPerc:number,
	report:Report,
  isHighlighted:boolean,
}> = ({durationInFrames, report, isHighlighted, animDelayPerc=0}) => {

  const reportPixelPoint = convertReportPointToPixel(report);

	return (
      <div
        style={{transform: `translate(${reportPixelPoint[0]}px, ${reportPixelPoint[1]}px)`}}

        className='absolute flex flex-col justify-center items-center'
      >

        {isHighlighted?
          (
          <div >
              <Blink durationInFrames={durationInFrames} classOther="" animDelayPerc={animDelayPerc} >
                <CrimeIcon report={report} classOther='w-28' />
              </Blink>
            </div>
          ):(<div/>)}

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
