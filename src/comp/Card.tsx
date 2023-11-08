import React from 'react';
import { ColorScheme } from '../global/stylesConfig';

const Card: React.FC<{
  children:React.ReactNode,
  colorScheme:ColorScheme,
}> = ({children, colorScheme}) => {
	return (
		<div
      className={`${colorScheme.bgColor} p-6 w-5/6`}
		>
      {children}
     
    </div>
	);
};

export default Card;
