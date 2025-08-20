export type ThemeMode = 'light' | 'dark';

export interface ColorPalette {
	primary: string;
	secondary: string;
	accent: string;
	deep: string;
	light: string;
	foam: string;
	text: string; // High contrast text color
	background: string; // High contrast background color
	backgroundRgb: string; // RGB values for opacity control
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

// Ocean Depths palette (recommended)
export const THEME_COLORS: ThemeColors = {
	light: {
		primary: '#0EA5E9', // Sky Blue
		secondary: '#06B6D4', // Cyan
		accent: '#F59E0B', // Amber
		deep: '#0369A1', // Deep Blue
		light: '#BAE6FD', // Light Blue
		foam: '#F0F9FF', // Ice Blue
		text: '#FFFFFF', // Pure white for maximum contrast
		background: '#0F172A', // Very dark blue for high contrast
		backgroundRgb: '15, 23, 42', // RGB values for rgba() usage
	},
	dark: {
		primary: '#0C4A6E', // Deep Ocean
		secondary: '#0E7490', // Teal
		accent: '#1E40AF', // Indigo
		deep: '#1E293B', // Slate
		light: '#334155', // Slate Gray
		foam: '#475569', // Cool Gray
		text: '#F8FAFC', // Near white for maximum contrast
		background: '#020617', // Very dark slate for high contrast
		backgroundRgb: '2, 6, 23', // RGB values for rgba() usage
	},
};
