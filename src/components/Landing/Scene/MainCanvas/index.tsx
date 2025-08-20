'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import styles from './mainCanvas.module.css';
import Skybox from './Skybox';
import Ocean from './LiquidSphere';
import Stars from './Stars';
import { initializeMouseTracking } from '@/utils/mouseTracking';
import { setupStaticCamera } from '@/utils/cameraUtils';

const FOV = 30;

function SceneSetup() {
	const { camera } = useThree();

	useEffect(() => {
		const cleanup = initializeMouseTracking();
		return cleanup;
	}, []);

	useFrame(() => {
		setupStaticCamera(camera);
	});

	return null;
}

function MainCanvas({ skyboxIntensity }: MainCanvasProps) {
	console.log('MainCanvas: Received skyboxIntensity:', skyboxIntensity);
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
			<SceneSetup />
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
			</Suspense>
		</Canvas>
	);
}

export default MainCanvas;

interface MainCanvasProps {
	skyboxIntensity: number;
}
