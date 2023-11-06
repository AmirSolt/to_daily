import {Composition} from 'remotion';
import {MyComposition, sceneDurationsInFrames, transDurationsInFrames} from './Composition';
import './style.css';



export const RemotionRoot: React.FC = () => {

	const totalSceneDurationInFrames = sceneDurationsInFrames.reduce((partialSum, a) => partialSum + a, 0);
	const totalTransDurationInFrames = transDurationsInFrames.reduce((partialSum, a) => partialSum + a, 0);
	const totalDurationInFrames = totalSceneDurationInFrames - totalTransDurationInFrames;
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={totalDurationInFrames}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};

