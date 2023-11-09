import React from 'react';
import { Img, staticFile } from "remotion";

const Icon: React.FC<{
	filename: string,
  classOther:string
}> = ({filename, classOther}) => {

	return (
			<Img src={staticFile(filename)} className={classOther} alt="Icon" />
	);
};

export default Icon;
