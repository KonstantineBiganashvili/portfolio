import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			// `server-only` throws outside a React Server environment; tests run server modules directly.
			'server-only': fileURLToPath(new URL('./src/test/server-only-stub.ts', import.meta.url)),
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test/setup.ts'],
		include: ['src/**/*.test.{ts,tsx}'],
		coverage: {
			provider: 'v8',
			include: ['src/lib/**', 'src/components/**', 'src/app/**/route.ts'],
			// WebGL scene code is exercised by e2e (canvas mounts) rather than jsdom, which has no WebGL.
			exclude: ['src/components/scene/**', 'src/**/*.test.*', 'src/**/*.module.css', 'src/test/**'],
			thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
		},
	},
});
