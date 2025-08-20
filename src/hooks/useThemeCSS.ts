import { useTheme } from '@/contexts/ThemeContext';
import { CSS_VARIABLES, getCSSVariable } from '@/utils/cssVariables';

/**
 * Custom hook for accessing theme colors in CSS-in-JS or component styles
 */
export function useThemeCSS() {
	const { theme } = useTheme();

	// Direct access to theme colors (for JS usage)
	const colors = theme.colors;

	// CSS variable references (for CSS-in-JS usage)
	const cssVars = {
		primary: `var(${CSS_VARIABLES.PRIMARY})`,
		secondary: `var(${CSS_VARIABLES.SECONDARY})`,
		accent: `var(${CSS_VARIABLES.ACCENT})`,
		deep: `var(${CSS_VARIABLES.DEEP})`,
		light: `var(${CSS_VARIABLES.LIGHT})`,
		foam: `var(${CSS_VARIABLES.FOAM})`,
	};

	// Helper to get current CSS variable value
	const getCSSValue = (variable: keyof typeof CSS_VARIABLES) => {
		return getCSSVariable(CSS_VARIABLES[variable]);
	};

	return {
		colors, // Direct color values
		cssVars, // CSS variable references
		getCSSValue, // Function to get current CSS variable value
		theme, // Full theme object
	};
}
