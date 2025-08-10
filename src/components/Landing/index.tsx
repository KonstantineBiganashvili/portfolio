'use client';

import React, { useState } from 'react';
import styles from './landing.module.css';
import MainCanvas from '@/components/Landing/Scene/MainCanvas';
import ThemeCanvas from '@/components/Landing/Scene/ThemeCanvas';

function Landing() {
	const [skyboxIntensity, setSkyboxIntensity] = useState(1);
	const [isDay, setIsDay] = useState(true);

	const handleSkyboxIntensity = (intensity: number) => {
		setSkyboxIntensity(intensity);
	};

	const handleIsDay = (isDay: boolean) => {
		setIsDay(isDay);
	};

	return (
		<div className={styles.wrapper}>
			<MainCanvas skyboxIntensity={skyboxIntensity} />
			<ThemeCanvas
				handleSkyboxIntensity={handleSkyboxIntensity}
				isDay={isDay}
				handleIsDay={handleIsDay}
			/>
		</div>
	);
}

export default Landing;
