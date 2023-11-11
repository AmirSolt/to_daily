import {Composition} from 'remotion';
import {MyComposition} from './Composition';
import './style.css';
import { fps, width, height } from './global/videoConfig';


import {fetchReports} from './global/report';
import { generatePrompts } from "./global/prompt";

const date = new Date()
date.setDate(date.getDate() - 1);



export const RemotionRoot: React.FC = () => {


	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				fps={fps}
				width={width}
				height={height}
				defaultProps={{
					date:date,
					reports:[],
					prompts:[],
				}}
				calculateMetadata={async () => {

					const reports = await fetchReports(date)
					const prompts = generatePrompts(date, reports)
					const totalDurationInSeconds = prompts.map(p=>p.durationInSeconds).reduce((a, b) => a + b, 0)
					return {
						durationInFrames:totalDurationInSeconds*fps,
						props: {
							date:date,
							reports:reports,
							prompts:prompts,
						},
					};
				}}

			/>
		</>
	);
};

