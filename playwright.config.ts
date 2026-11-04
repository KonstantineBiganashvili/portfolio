import { defineConfig, devices } from '@playwright/test';

const PORT = 3100;

// E2E runs against a production build fed by fixture content (CMS_FIXTURES=1), so it needs no CMS or secrets.
export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? 'github' : 'list',
	use: { baseURL: `http://localhost:${PORT}`, trace: 'retain-on-failure' },
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile', use: { ...devices['Pixel 7'] } },
	],
	webServer: {
		command: `npx next start -p ${PORT}`,
		url: `http://localhost:${PORT}`,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
		// Everything the app reads is pinned here so runs don't depend on a developer's .env.
		// The form key is a dummy: tests intercept or never reach the Web3Forms endpoint.
		env: {
			CMS_FIXTURES: '1',
			BUILD_SHA: 'e2e0000',
			WEB3_FORM_API_URL: 'https://api.web3forms.com/submit',
			WEB3_FORM_API_KEY: 'e2e-dummy-key',
		},
	},
});
