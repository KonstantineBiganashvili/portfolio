import { useTheme } from '@/contexts/ThemeContext';
import { CSS_VARIABLES, getCSSVariable } from '@/utils/cssVariables';

export function useThemeCSS() {
	const { theme } = useTheme();

	const colors = theme.colors;

	const cssVars = {
		primary: `var(${CSS_VARIABLES.PRIMARY})`,
		secondary: `var(${CSS_VARIABLES.SECONDARY})`,
		accentText: `var(${CSS_VARIABLES.ACCENT_TEXT})`,
		primaryText: `var(${CSS_VARIABLES.PRIMARY_TEXT})`,
		secondaryText: `var(${CSS_VARIABLES.SECONDARY_TEXT})`,
		background: `var(${CSS_VARIABLES.BACKGROUND})`,
	};

	const getCSSValue = (variable: keyof typeof CSS_VARIABLES) => {
		return getCSSVariable(CSS_VARIABLES[variable]);
	};

	return {
		colors,
		cssVars,
		getCSSValue,
		theme,
	};
}
