import {Composition} from 'remotion';
import {MyComposition} from './Composition';
import './style.css';
import { fps, width, height } from './global/videoConfig';








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

