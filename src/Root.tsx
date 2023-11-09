import {Composition} from 'remotion';
import {MyComposition, totalDurationInSeconds, fps} from './Composition';
import './style.css';



export const RemotionRoot: React.FC = () => {

	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={totalDurationInSeconds*fps}
				fps={fps}
				width={1080}
				height={1920}
			/>
		</>
	);
};

