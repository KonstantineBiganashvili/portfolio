'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import styles from './mainCanvas.module.css';
import Skybox from './Skybox';
import Ocean from './Ocean';
import Stars from './Stars';
import CameraMovement from './CameraMovement';
import BoatSystem from './Boats';

const FOV = 30;

function MainCanvas({ skyboxIntensity }: MainCanvasProps) {
	return (
		<Canvas
			className={styles.canvas}
			camera={{
				fov: FOV,
				near: 0.1,
				far: 500,
				position: [0, 10, 10],
			}}
		>
			<Skybox
				skybox={'/static/images/skybox/skybox.hdr'}
				intensity={skyboxIntensity}
			/>
			<CameraMovement />
			{/* <OrbitControls /> */}
			<ambientLight intensity={0.3} />
			<directionalLight position={[10, 10, 5]} intensity={0.5} />
			<Stars
				radius={100}
				depth={50}
				count={5000}
				factor={4}
				fade
				brightness={1 - skyboxIntensity}
				speed={1}
			/>
			<color attach='background' args={['#000020']} />
			<Suspense fallback={null}>
				<Ocean />
				<BoatSystem />
			</Suspense>
		</Canvas>
	);
}

export default MainCanvas;

interface MainCanvasProps {
	skyboxIntensity: number;
}
