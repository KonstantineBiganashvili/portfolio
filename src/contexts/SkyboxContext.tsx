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
		return theme.mode === 'light' ? 1 : 0.1;
	});

	useEffect(() => {
		const newIntensity = theme.mode === 'light' ? 1 : 0.1;
		setSkyboxIntensity(newIntensity);
	}, [theme.mode]);

	const handleSkyboxIntensity = (intensity: number) => {
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
