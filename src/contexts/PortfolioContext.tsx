'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { PageData } from '@/types/portfolio';

interface PortfolioContextType {
	pageData: PageData;
	cmsUrl: string;
	web3FormApiUrl: string;
	web3FormApiKey: string;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
	undefined,
);

export function PortfolioProvider({
	children,
	pageData,
	cmsUrl,
	web3FormApiUrl,
	web3FormApiKey,
}: {
	children: ReactNode;
	pageData: PageData;
	cmsUrl: string;
	web3FormApiUrl: string;
	web3FormApiKey: string;
}) {
	return (
		<PortfolioContext.Provider
			value={{ pageData, cmsUrl, web3FormApiUrl, web3FormApiKey }}
		>
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
