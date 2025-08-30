'use client';

import React from 'react';
import styles from './landing.module.css';
import MainCanvas from '@/components/Landing/Scene/MainCanvas';
import { useSkybox } from '@/contexts/SkyboxContext';
import MyJourney from './MyJoyurney';

function Landing() {
	const { skyboxIntensity } = useSkybox();
	return (
		<>
			<MainCanvas skyboxIntensity={skyboxIntensity} />
			<div className={styles.landignWrapper}>
				<MyJourney />
			</div>
		</>
	);
}

export default Landing;
