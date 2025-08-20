'use client';

import React, { useState } from 'react';
import Header from './Header';
import styles from './layout.module.css';
import { useSkybox } from '@/contexts/SkyboxContext';

interface LandingProps {
	skyboxIntensity: number;
}

function Layout({ children }: { children: React.ReactNode }) {
	const [isDay, setIsDay] = useState(true);
	const { handleSkyboxIntensity } = useSkybox();

	const handleIsDay = (isDay: boolean) => {
		setIsDay(isDay);
	};

	return (
		<main className={styles.main}>
			<Header
				handleSkyboxIntensity={handleSkyboxIntensity}
				isDay={isDay}
				handleIsDay={handleIsDay}
			/>
			{children}
		</main>
	);
}

export default Layout;
