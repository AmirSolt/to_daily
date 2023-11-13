import {Composition} from 'remotion';
import {MyComposition} from './Composition';
import './style.css';
import { fps, width, height } from './global/videoConfig';
import {Prompt} from './global/prompt';
import {Report} from './global/report';
import preData from '../public/data.json'


// cd pre && python main.py

const date = new Date(`${preData.date} 00:00:00`);
const reports:Report[] = preData.reports
const prompts:Prompt[] = preData.prompts



export const RemotionRoot: React.FC = () => {

	const durationInSeconds = prompts.reduce((n, {durationInSeconds}) => n + durationInSeconds, 0)
	console.log(durationInSeconds)
	
	return (
		<>
			<Composition
				id="MyComp"
				durationInFrames={Math.round(durationInSeconds*fps)}
				component={MyComposition}
				fps={fps}
				width={width}
				height={height}
				defaultProps={{
					date:date,
					reports:reports,
					prompts:prompts,
				}}
			/>
		</>
	);
};

