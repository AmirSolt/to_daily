import {Composition} from 'remotion';
import {MyComposition, totalDurationInSeconds} from './Composition';
import './style.css';
import { fps, width, height } from './global/videoConfig';



export const RemotionRoot: React.FC = () => {

	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={totalDurationInSeconds*fps}
				fps={fps}
				width={width}
				height={height}
			/>
		</>
	);
};

