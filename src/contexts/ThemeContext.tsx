'use client';

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { Theme, ThemeMode, THEME_COLORS } from '@/types/theme';
import { updateCSSVariables } from '@/utils/cssVariables';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'portfolio-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>({
		mode: 'light',
		colors: THEME_COLORS.light,
		isDay: true,
	});

	const updateTheme = (mode: ThemeMode) => {
		const newColors = THEME_COLORS[mode];
		setThemeState({
			mode,
			colors: newColors,
			isDay: mode === 'light',
		});
		updateCSSVariables(newColors);

		// Save to localStorage
		if (typeof window !== 'undefined') {
			localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(mode));
		}
	};

	useEffect(() => {
		const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
		if (savedTheme) {
			try {
				const parsedTheme = JSON.parse(savedTheme) as ThemeMode;
				if (parsedTheme === 'light' || parsedTheme === 'dark') {
					const newColors = THEME_COLORS[parsedTheme];
					setThemeState({
						mode: parsedTheme,
						colors: newColors,
						isDay: parsedTheme === 'light',
					});
					updateCSSVariables(newColors);
				}
			} catch (error) {
				console.warn('Failed to parse saved theme:', error);
			}
		} else {
			updateCSSVariables(THEME_COLORS.light);
		}
	}, []);

	const toggleTheme = () => {
		const newMode = theme.mode === 'light' ? 'dark' : 'light';
		updateTheme(newMode);
	};

	const setTheme = (mode: ThemeMode) => {
		updateTheme(mode);
	};

	const contextValue: ThemeContextType = {
		theme,
		toggleTheme,
		setTheme,
	};

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}
