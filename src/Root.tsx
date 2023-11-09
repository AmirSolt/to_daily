import {Composition} from 'remotion';
import {MyComposition, totalDurationInFrames} from './Composition';
import './style.css';
import { fps } from './global/vars';


export const RemotionRoot: React.FC = () => {

	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={totalDurationInFrames}
				fps={fps}
				width={1080}
				height={1920}
			/>
		</>
	);
};

