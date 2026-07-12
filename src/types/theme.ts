export type ThemeMode = 'light' | 'dark';

export interface ColorPalette {
	primary: string;
	secondary: string;
	background: string;
	cardBackground: string;
	mutedBackground: string;
	primaryText: string;
	secondaryText: string;
	accentText: string;
	border: string;
	error: string;
	success: string;
	warning: string;
	backgroundRgb: string;
	cardBackgroundRgb: string;
	mutedBackgroundRgb: string;
	primaryRgb: string;
	secondaryRgb: string;
	borderRgb: string;
}

export interface ThemeColors {
	light: ColorPalette;
	dark: ColorPalette;
}

export interface Theme {
	mode: ThemeMode;
	colors: ColorPalette;
	isDay: boolean;
}

export const THEME_COLORS: ThemeColors = {
	light: {
		primary: '#0EA5E9',
		secondary: '#22D3EE',
		background: '#F0F9FF',
		cardBackground: '#FFFFFF',
		mutedBackground: '#E2E8F0',
		primaryText: '#0F172A',
		secondaryText: '#334155',
		accentText: '#0EA5E9',
		border: '#CBD5E1',
		error: '#DC2626',
		success: '#16A34A',
		warning: '#F59E0B',
		backgroundRgb: '240, 249, 255',
		cardBackgroundRgb: '255, 255, 255',
		mutedBackgroundRgb: '226, 232, 240',
		primaryRgb: '14, 165, 233',
		secondaryRgb: '34, 211, 238',
		borderRgb: '203, 213, 225',
	},
	dark: {
		primary: '#0EA5E9',
		secondary: '#06B6D4',
		background: '#0F172A',
		cardBackground: '#1E293B',
		mutedBackground: '#334155',
		primaryText: '#F8FAFC',
		secondaryText: '#CBD5E1',
		accentText: '#38BDF8',
		border: '#475569',
		error: '#F87171',
		success: '#4ADE80',
		warning: '#FACC15',
		backgroundRgb: '15, 23, 42',
		cardBackgroundRgb: '30, 41, 59',
		mutedBackgroundRgb: '51, 65, 85',
		primaryRgb: '14, 165, 233',
		secondaryRgb: '6, 182, 212',
		borderRgb: '71, 85, 105',
	},
};
