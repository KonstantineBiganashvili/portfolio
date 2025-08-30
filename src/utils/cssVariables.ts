import { ColorPalette } from '@/types/theme';

export const CSS_VARIABLES = {
	PRIMARY: '--theme-primary',
	SECONDARY: '--theme-secondary',
	BACKGROUND: '--theme-background',
	CARD_BACKGROUND: '--theme-card-background',
	MUTED_BACKGROUND: '--theme-muted-background',
	PRIMARY_TEXT: '--theme-primary-text',
	SECONDARY_TEXT: '--theme-secondary-text',
	ACCENT_TEXT: '--theme-accent-text',
	BORDER: '--theme-border',
	ERROR: '--theme-error',
	SUCCESS: '--theme-success',
	WARNING: '--theme-warning',
	BACKGROUND_RGB: '--theme-background-rgb',
	CARD_BACKGROUND_RGB: '--theme-card-background-rgb',
	MUTED_BACKGROUND_RGB: '--theme-muted-background-rgb',
} as const;

export function updateCSSVariables(colors: ColorPalette) {
	if (typeof window !== 'undefined') {
		const root = document.documentElement;

		root.style.setProperty(CSS_VARIABLES.PRIMARY, colors.primary);
		root.style.setProperty(CSS_VARIABLES.SECONDARY, colors.secondary);
		root.style.setProperty(CSS_VARIABLES.BACKGROUND, colors.background);
		root.style.setProperty(
			CSS_VARIABLES.CARD_BACKGROUND,
			colors.cardBackground,
		);
		root.style.setProperty(
			CSS_VARIABLES.MUTED_BACKGROUND,
			colors.mutedBackground,
		);
		root.style.setProperty(CSS_VARIABLES.PRIMARY_TEXT, colors.primaryText);
		root.style.setProperty(CSS_VARIABLES.SECONDARY_TEXT, colors.secondaryText);
		root.style.setProperty(CSS_VARIABLES.ACCENT_TEXT, colors.accentText);
		root.style.setProperty(CSS_VARIABLES.BORDER, colors.border);
		root.style.setProperty(CSS_VARIABLES.ERROR, colors.error);
		root.style.setProperty(CSS_VARIABLES.SUCCESS, colors.success);
		root.style.setProperty(CSS_VARIABLES.WARNING, colors.warning);
		root.style.setProperty(CSS_VARIABLES.BACKGROUND_RGB, colors.backgroundRgb);
		root.style.setProperty(
			CSS_VARIABLES.CARD_BACKGROUND_RGB,
			colors.cardBackgroundRgb,
		);
		root.style.setProperty(
			CSS_VARIABLES.MUTED_BACKGROUND_RGB,
			colors.mutedBackgroundRgb,
		);
	}
}

export function getCSSVariable(variableName: string): string {
	if (typeof window !== 'undefined') {
		return getComputedStyle(document.documentElement)
			.getPropertyValue(variableName)
			.trim();
	}
	return '';
}
