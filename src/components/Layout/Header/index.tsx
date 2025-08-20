import React from 'react';
import styles from './header.module.css';
import Logo from '@/components/common/svgs/Logo';
import ThemeCanvas from '@/components/Landing/Scene/ThemeCanvas';

interface HeaderProps {
	handleSkyboxIntensity: (intensity: number) => void;
	isDay: boolean;
	handleIsDay: (isDay: boolean) => void;
}

function Header({ handleSkyboxIntensity, isDay, handleIsDay }: HeaderProps) {
	return (
		<div className={styles.wrapper}>
			<Logo width={60} height={60} />
			<ThemeCanvas
				handleSkyboxIntensity={handleSkyboxIntensity}
				isDay={isDay}
				handleIsDay={handleIsDay}
			/>
		</div>
	);
}

export default Header;
