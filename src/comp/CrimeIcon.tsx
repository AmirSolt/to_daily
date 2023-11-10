import React from 'react';
import {Report, CrimeTypes} from '../global/report';
import { Img, staticFile } from "remotion";
import { gunFilename, robberFilename, sexualViolationFilename, homicideFilename } from '../global/filenames';





const CrimeIcon: React.FC<{
	report: Report,
  classOther:string
}> = ({report, classOther}) => {

  let filename:string|null = null;
  
  switch (report.crimeType) {
    case CrimeTypes.shooting:
      filename=gunFilename
      break;

    case CrimeTypes.robbery:
      filename=robberFilename
      break;

    case CrimeTypes.sexualViolation:
      filename=sexualViolationFilename
      break;

    case CrimeTypes.homicide:
      filename=homicideFilename
      break;
  
    default:
      break;
  }

  if(filename==null){
    throw new Error("Report crimeType did not match existing icons");
  }

	return (
			<Img src={staticFile(filename)} className={classOther} alt="Icon" />
	);
};

export default CrimeIcon;
