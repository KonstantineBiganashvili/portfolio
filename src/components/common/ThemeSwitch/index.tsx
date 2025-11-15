'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './themeSwitch.module.css';
import { Moon, Sun } from 'lucide-react';

interface ThemeSwitchProps {
	className?: string;
}

function ThemeSwitch({ className }: ThemeSwitchProps) {
	const { theme, toggleTheme } = useTheme();

	const nextLabel =
		theme.mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode';

	return (
		<button
			className={`${styles.themeSwitch} ${className ?? ''}`.trim()}
			onClick={toggleTheme}
			aria-label={nextLabel}
			title={nextLabel}
			suppressHydrationWarning
		>
			<div className={styles.switchTrack} suppressHydrationWarning>
				<div
					className={`${styles.switchThumb} ${
						theme.mode === 'dark' ? styles.switchThumbDark : ''
					}`.trim()}
					suppressHydrationWarning
				>
					<div className={styles.icon} suppressHydrationWarning>
						{theme.mode === 'light' ? <Sun size={16} /> : <Moon size={16} />}
					</div>
				</div>
			</div>
		</button>
	);
}

export default ThemeSwitch;
