'use client';

import React from 'react';
import styles from './landing.module.css';
import MainCanvas from '@/components/Landing/Scene/MainCanvas';
import { useSkybox } from '@/contexts/SkyboxContext';
import MyJourney from './MyJoyurney';
import Introduction from './Introduction';
import AboutMe from './AboutMe';
import RecentWorks from './RecentWorks';
import ContactMe from './ContactMe';

function Landing() {
	const { skyboxIntensity } = useSkybox();

	return (
		<div className={styles.landingWrapper}>
			<MainCanvas skyboxIntensity={skyboxIntensity} />
			<Introduction />
			<AboutMe />
			<RecentWorks />
			<MyJourney />
			<ContactMe />
		</div>
	);
}

export default Landing;
