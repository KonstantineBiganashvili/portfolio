import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './themeSwitch.module.css';
import Sun from '@/components/common/svgs/Sun';
import Moon from '@/components/common/svgs/Moon';

interface ThemeSwitchProps {
	className?: string;
}

function ThemeSwitch({ className }: ThemeSwitchProps) {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			className={`${styles.themeSwitch} ${className || ''}`}
			onClick={toggleTheme}
			aria-label={`Switch to ${theme.mode === 'light' ? 'dark' : 'light'} mode`}
			title={`Switch to ${theme.mode === 'light' ? 'dark' : 'light'} mode`}
		>
			<div className={styles.switchTrack}>
				<div
					className={`${styles.switchThumb} ${
						theme.mode === 'dark' ? styles.switchThumbDark : ''
					}`}
				>
					<div className={styles.icon}>
						{theme.mode === 'light' ? <Sun /> : <Moon />}
					</div>
				</div>
			</div>
		</button>
	);
}

export default ThemeSwitch;
