import React from 'react';
import { Img, staticFile } from "remotion";
import { Report } from '../global/report';
import Icon from './Icon';
import Blink from './Blink';
import { gunFilename, mapFilename, circleFilename } from '../global/filenames';


function convertReportPointToPixel(report:Report):[number,number]{
  return [report.geoPoint[0], report.geoPoint[1]]
}




const ReportMapped: React.FC<{
	durationInFrames: number,
  animDelayPerc:number,
	report:Report,
  isHighlighted:boolean,
}> = ({durationInFrames, report, isHighlighted, animDelayPerc=0}) => {

  const highlightOffsetY = 128;
  const reportsPixelPoint = convertReportPointToPixel(report);

	return (
      <div>

        {isHighlighted?
          (
          <div 
              style={{transform: `translate(${reportsPixelPoint[0]}px, ${reportsPixelPoint[1]-highlightOffsetY}px)`}}
                className={`absolute`}
              >
              <Blink durationInFrames={durationInFrames} classOther="" animDelayPerc={animDelayPerc} >
                <Icon filename={gunFilename} classOther='w-32' />
              </Blink>
            </div>
          ):(<div/>)}

          <div
                style={{transform: `translate(${reportsPixelPoint[0]}px, ${reportsPixelPoint[1]}px)`}}
                className={`absolute`}
          >
            <Icon filename={circleFilename} classOther='w-12' />
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
