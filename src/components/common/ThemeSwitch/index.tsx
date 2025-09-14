'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './themeSwitch.module.css';
import { Moon, Sun } from 'lucide-react';

interface ThemeSwitchProps {
	className?: string;
}

function ThemeSwitch({ className }: ThemeSwitchProps) {
	const { theme, toggleTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<button
				className={`${styles.themeSwitch} ${className ?? ''}`.trim()}
				aria-label='Toggle theme'
				title='Toggle theme'
				disabled
			>
				<div className={styles.switchTrack}>
					<div className={styles.switchThumb}>
						<div className={styles.icon} />
					</div>
				</div>
			</button>
		);
	}

	const nextLabel =
		theme.mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode';

	return (
		<button
			className={`${styles.themeSwitch} ${className ?? ''}`.trim()}
			onClick={toggleTheme}
			aria-label={nextLabel}
			title={nextLabel}
		>
			<div className={styles.switchTrack}>
				<div
					className={`${styles.switchThumb} ${
						theme.mode === 'dark' ? styles.switchThumbDark : ''
					}`.trim()}
				>
					<div className={styles.icon}>
						{theme.mode === 'light' ? <Sun size={16} /> : <Moon size={16} />}
					</div>
				</div>
			</div>
		</button>
	);
}

export default ThemeSwitch;
