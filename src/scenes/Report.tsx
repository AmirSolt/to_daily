import React from 'react';
import {Logo} from '../comps/Logo';
import {Subtitle} from '../comps/Subtitle';
import {Title} from '../comps/Title';
import {AbsoluteFill} from 'remotion';
import {primary,
	secondary,
	tertiary} from '../comps/Colors';




export const Report: React.FC<{
	date: Date;
}> = ({date}) => {
	return (

		<AbsoluteFill className={`${secondary.bgColor} items-center justify-center`}>
        <div className="m-10" />
				<Logo logoColor={"#0f0"} />
				<div className="m-3" />
				<Title text={"Report"} textColor={secondary.textColor} />
				<Subtitle  text={"This is subtext for report"} textColor={secondary.textColor} />
		</AbsoluteFill>

	);
};
        