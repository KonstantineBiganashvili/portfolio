'use client';

import React from 'react';
import styles from './landing.module.css';
import MainCanvas from '@/components/Landing/Scene/MainCanvas';
import { useSkybox } from '@/contexts/SkyboxContext';

function Landing() {
	const { skyboxIntensity } = useSkybox();
	return (
		<div className={styles.wrapper}>
			<MainCanvas skyboxIntensity={skyboxIntensity} />
		</div>
	);
}

export default Landing;
