import { ColorPalette } from '@/types/theme';

// CSS custom property names for theme colors
export const CSS_VARIABLES = {
	PRIMARY: '--theme-primary',
	SECONDARY: '--theme-secondary',
	ACCENT: '--theme-accent',
	DEEP: '--theme-deep',
	LIGHT: '--theme-light',
	FOAM: '--theme-foam',
	TEXT: '--theme-text-contrast',
	BACKGROUND: '--theme-bg-contrast',
	BACKGROUND_RGB: '--theme-bg-contrast-rgb',
} as const;

// Function to update CSS custom properties
export function updateCSSVariables(colors: ColorPalette) {
	if (typeof window !== 'undefined') {
		const root = document.documentElement;

		root.style.setProperty(CSS_VARIABLES.PRIMARY, colors.primary);
		root.style.setProperty(CSS_VARIABLES.SECONDARY, colors.secondary);
		root.style.setProperty(CSS_VARIABLES.ACCENT, colors.accent);
		root.style.setProperty(CSS_VARIABLES.DEEP, colors.deep);
		root.style.setProperty(CSS_VARIABLES.LIGHT, colors.light);
		root.style.setProperty(CSS_VARIABLES.FOAM, colors.foam);
		root.style.setProperty(CSS_VARIABLES.TEXT, colors.text);
		root.style.setProperty(CSS_VARIABLES.BACKGROUND, colors.background);
		root.style.setProperty(CSS_VARIABLES.BACKGROUND_RGB, colors.backgroundRgb);
	}
}

// Helper function to get CSS variable value (for JS usage)
export function getCSSVariable(variableName: string): string {
	if (typeof window !== 'undefined') {
		return getComputedStyle(document.documentElement)
			.getPropertyValue(variableName)
			.trim();
	}
	return '';
}
