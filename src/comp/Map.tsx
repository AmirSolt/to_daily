import React from 'react';
import { Img, staticFile } from "remotion";
import { Report } from '../global/report';
import CrimeIcon from './CrimeIcon';
import Icon from './Icon';
import Blink from './Blink';
import { mapFilename, circle1Filename, circle2Filename } from '../global/filenames';


function convertReportPointToPixel(report: Report): [number, number] {

  const newX = Math.round(0.01691221 * report.x + 149980.6)
  const newY = Math.round(-0.016820124 * report.y + 91710.715546780)

  return [newX, newY];
}



const SingleReportMapped: React.FC<{
  durationInFrames: number,
  animDelayPerc: number,
  report: Report,
  isHighlighted: boolean,
}> = ({ durationInFrames, report, isHighlighted, animDelayPerc = 0 }) => {

  const reportPixelPoint = convertReportPointToPixel(report);
  const iconOffsetX = 55
  const iconOffsetY = 130

  const x = reportPixelPoint[0] - iconOffsetX
  const y = reportPixelPoint[1] - iconOffsetY

  return (
    <div
      style={{ transform: `translate(${x}px, ${y}px)` }}

      className='absolute flex flex-col justify-center items-center'
    >

      {isHighlighted ?
        (
          <div >
            <Blink durationInFrames={durationInFrames} classOther="" animDelayPerc={animDelayPerc} >
              <CrimeIcon report={report} classOther='w-28 h-28' />
            </Blink>
          </div>
        ) : (<div className='w-28 h-28' />)}



      {isHighlighted ?
        (
          <div>
            <Icon filename={circle2Filename} classOther='w-8' />
          </div>
        ) : (
          <div>
            <Icon filename={circle1Filename} classOther='w-8' />
          </div>
        )}

    </div>
  );
};


const OverviewReportMapped: React.FC<{
  durationInFrames: number,
  animDelayPerc: number,
  report: Report,
  isHighlighted: boolean,
}> = ({ durationInFrames, report, isHighlighted, animDelayPerc = 0 }) => {

  const reportPixelPoint = convertReportPointToPixel(report);
  const iconOffsetX = 55
  const iconOffsetY = 130

  const x = reportPixelPoint[0] - iconOffsetX
  const y = reportPixelPoint[1] - iconOffsetY

  return (
    <div
      style={{ transform: `translate(${x}px, ${y}px)` }}

      className='absolute flex flex-col justify-center items-center'
    >

      <div >
        <CrimeIcon report={report} classOther='w-28 h-28' />
      </div>

      <div>
        <Icon filename={circle1Filename} classOther='w-8' />
      </div>

    </div>
  );
};







const Map: React.FC<{
  durationInFrames: number,
  animDelayPerc: number,
  reports: Report[],
  highlightedIndices: number[],
  isOverview: boolean
}> = ({ durationInFrames, reports, isOverview, highlightedIndices, animDelayPerc = 0 }) => {
  return (
    <div className='w-full'>

    {isOverview?(
      reports.map((report, index) => (
        <OverviewReportMapped durationInFrames={durationInFrames} animDelayPerc={animDelayPerc} report={report} isHighlighted={highlightedIndices.includes(index)} />
      ))
    ):(
      reports.map((report, index) => (
        <SingleReportMapped durationInFrames={durationInFrames} animDelayPerc={animDelayPerc} report={report} isHighlighted={highlightedIndices.includes(index)} />
      ))
    )}


      {/* <Icon filename={pointFilename} classOther='w-64' /> */}
      <Img src={staticFile(mapFilename)} className={"w-full"} alt="Map" />
    </div>
  );
};

export default Map;
