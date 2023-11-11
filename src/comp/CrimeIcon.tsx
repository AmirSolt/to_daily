import React from 'react';
import {Report, chosenCrimeTypes} from '../global/report';
import { Img, staticFile } from "remotion";
import { gunFilename, robberFilename, sexualViolationFilename, homicideFilename } from '../global/filenames';





const CrimeIcon: React.FC<{
	report: Report,
  classOther:string
}> = ({report, classOther}) => {

  let filename:string|null = null;
  
  switch (report.crimeType) {
    case chosenCrimeTypes.shooting:
      filename=gunFilename
      break;

    case chosenCrimeTypes.robbery:
      filename=robberFilename
      break;

    case chosenCrimeTypes.sexualViolation:
      filename=sexualViolationFilename
      break;

    case chosenCrimeTypes.homicide:
      filename=homicideFilename
      break;
  
    default:
      break;
  }

  if(filename==null){
    throw new Error(`${report.crimeType} crimeType did not match existing icons`);
  }

	return (
			<Img src={staticFile(filename)} className={classOther} alt="Icon" />
	);
};

export default CrimeIcon;
