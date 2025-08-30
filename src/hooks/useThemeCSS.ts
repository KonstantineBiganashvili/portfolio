import { useTheme } from '@/contexts/ThemeContext';
import { CSS_VARIABLES, getCSSVariable } from '@/utils/cssVariables';

export function useThemeCSS() {
	const { theme } = useTheme();

	const colors = theme.colors;

	const cssVars = {
		primary: `var(${CSS_VARIABLES.PRIMARY})`,
		secondary: `var(${CSS_VARIABLES.SECONDARY})`,
		accent: `var(${CSS_VARIABLES.ACCENT})`,
		deep: `var(${CSS_VARIABLES.DEEP})`,
		light: `var(${CSS_VARIABLES.LIGHT})`,
		foam: `var(${CSS_VARIABLES.FOAM})`,
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
