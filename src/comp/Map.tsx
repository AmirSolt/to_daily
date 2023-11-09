import React from 'react';
import { Img, staticFile } from "remotion";
import { Report } from '../global/report';
import Icon from './Icon';
import Blink from './Blink';
import { gunFilename, mapFilename, circleFilename } from '../global/filenames';


function convertReportPointToPixel(report:Report):[number,number]{
  return [report.geoPoint[0], report.geoPoint[1]]
}









const Map: React.FC<{
	durationInFrames: number,
  animDelayPerc:number,
	reports:Report[],
  reportsHighlighted:Report[]
}> = ({durationInFrames, reports, reportsHighlighted, animDelayPerc=0}) => {

  const reportsPixelPoint = reports.map(r=>convertReportPointToPixel(r))
  const highReportsPixelPoint = reportsHighlighted.map(r=>convertReportPointToPixel(r))

	return (
    <div className='w-full'>


      <div>
        <div 
            style={{transform: `translate(${highReportsPixelPoint[0][0]}px, ${highReportsPixelPoint[0][1]-128}px)`}}
              className={`absolute`}
            >
            <Blink durationInFrames={durationInFrames} classOther="" animDelayPerc={animDelayPerc} >
              <Icon filename={gunFilename} classOther='w-32' />
            </Blink>
          </div>
          <div
                style={{transform: `translate(${reportsPixelPoint[0][0]}px, ${reportsPixelPoint[0][1]}px)`}}
                className={`absolute`}
          >
            <Icon filename={circleFilename} classOther='w-12' />
          </div>
      </div>


      {/* <Icon filename={pointFilename} classOther='w-64' /> */}
      <Img src={staticFile(mapFilename)} className={"w-full"} alt="Map" />
    </div>
	);
};

export default Map;
