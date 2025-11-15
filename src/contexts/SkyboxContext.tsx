'use client';

import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { useTheme } from './ThemeContext';

interface SkyboxContextType {
	skyboxIntensity: number;
}

const SkyboxContext = createContext<SkyboxContextType | undefined>(undefined);

export function SkyboxProvider({ children }: { children: ReactNode }) {
	const { theme } = useTheme();

	const skyboxIntensity = useMemo(() => {
		return theme.mode === 'light' ? 1 : 0.1;
	}, [theme.mode]);

	return (
		<SkyboxContext.Provider value={{ skyboxIntensity }}>
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
