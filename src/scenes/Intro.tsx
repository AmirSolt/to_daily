import React from 'react';
import {Logo} from '../comps/Logo';
import {Subtitle} from '../comps/Subtitle';
import {Title} from '../comps/Title';
import {AbsoluteFill} from 'remotion';
import {primary,
	secondary,
	tertiary} from '../comps/Colors';




export const Intro: React.FC<{
	date: Date;
}> = ({date}) => {
	return (

		<AbsoluteFill className={`${primary.bgColor} items-center justify-center`}>
        <div className="m-10" />
				<Logo logoColor={"#00f"} />
				<div className="m-3" />
				<Title text={"Intro"} textColor={primary.textColor} />
				<Subtitle  text={"This is subtext for intro"} textColor={primary.textColor} />
		</AbsoluteFill>

	);
};
        