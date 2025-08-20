'use client';

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { useTheme } from './ThemeContext';

interface SkyboxContextType {
	skyboxIntensity: number;
	handleSkyboxIntensity: (intensity: number) => void;
}

const SkyboxContext = createContext<SkyboxContextType | undefined>(undefined);

export function SkyboxProvider({ children }: { children: ReactNode }) {
	const { theme } = useTheme();
	const [skyboxIntensity, setSkyboxIntensity] = useState(() => {
		// Initialize based on theme - light = 1, dark = 0.1
		return theme.mode === 'light' ? 1 : 0.1;
	});

	// Sync skybox intensity with theme changes
	useEffect(() => {
		const newIntensity = theme.mode === 'light' ? 1 : 0.1;
		console.log(
			'SkyboxProvider: Theme changed, setting intensity to:',
			newIntensity,
		);
		setSkyboxIntensity(newIntensity);
	}, [theme.mode]);

	const handleSkyboxIntensity = (intensity: number) => {
		console.log('SkyboxProvider: Setting skybox intensity to:', intensity);
		setSkyboxIntensity(intensity);
	};

	return (
		<SkyboxContext.Provider value={{ skyboxIntensity, handleSkyboxIntensity }}>
			{children}
		</SkyboxContext.Provider>
	);
}

export function useSkybox() {
	const context = useContext(SkyboxContext);
	if (context === undefined) {
		throw new Error('useSkybox must be used within a SkyboxProvider');
	}
	return context;
}
