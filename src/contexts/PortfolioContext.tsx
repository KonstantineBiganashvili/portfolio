'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { PageData } from '@/types/portfolio';

interface PortfolioContextType {
	pageData: PageData;
	cmsUrl: string;
	contactEmail: string;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
	undefined,
);

export function PortfolioProvider({
	children,
	pageData,
	cmsUrl,
	contactEmail,
}: {
	children: ReactNode;
	pageData: PageData;
	cmsUrl: string;
	contactEmail: string;
}) {
	return (
		<PortfolioContext.Provider value={{ pageData, cmsUrl, contactEmail }}>
			{children}
		</PortfolioContext.Provider>
	);
}

export function usePortfolio() {
	const context = useContext(PortfolioContext);
	if (context === undefined) {
		throw new Error('usePortfolio must be used within a PortfolioProvider');
	}
	return context;
}
