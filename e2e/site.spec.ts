import { expect, test } from '@playwright/test';

test.describe('home page', () => {
	test('renders the hero and every section from CMS content', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { level: 1, name: /Konstantine\s+Biganashvili/ })).toBeVisible();
		await expect(page.getByText('Full-Stack & DevOps Engineer').first()).toBeVisible();
		for (const name of ['about.md', 'experience', 'projects', 'skills', 'education.log', 'contact']) {
			await expect(page.getByRole('heading', { level: 2, name })).toBeAttached();
		}
		await expect(page.getByRole('contentinfo')).toContainText('build e2e0000');
	});

	test('section navigation scrolls to the section', async ({ page, isMobile }) => {
		await page.goto('/');
		const nav = page.getByRole('navigation', { name: 'Sections' });
		if (isMobile) await nav.getByRole('link', { name: 'skills' }).scrollIntoViewIfNeeded();
		await nav.getByRole('link', { name: 'skills' }).click();
		await expect(page).toHaveURL(/#skills$/);
		await expect(page.getByRole('heading', { level: 2, name: 'skills' })).toBeInViewport();
	});

	test('experience rows expand to show highlights', async ({ page }) => {
		await page.goto('/#experience');
		const second = page.locator('#experience details').nth(1);
		await expect(second).not.toHaveAttribute('open', '');
		await second.locator('summary').click();
		await expect(second).toHaveAttribute('open', '');
		await expect(second.locator('li').first()).toBeVisible();
	});

	test('has no horizontal overflow', async ({ page }) => {
		await page.goto('/');
		const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
		expect(overflow).toBeLessThanOrEqual(0);
	});
});

test.describe('3D scene', () => {
	test('mounts the WebGL canvas behind the hero', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('section[aria-labelledby="hero-name"] canvas')).toBeAttached({ timeout: 15_000 });
	});

	test('shows the static poster instead when reduced motion is requested', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');
		await expect(page.locator('[data-mode="static"]')).toBeAttached();
		await page.waitForTimeout(1500);
		await expect(page.locator('canvas')).toHaveCount(0);
	});
});

test.describe('projects', () => {
	test('opens a case study with its architecture diagram', async ({ page }) => {
		await page.goto('/#projects');
		await page.getByRole('link', { name: 'Helmsman' }).click();
		await expect(page).toHaveURL(/\/projects\/helmsman$/);
		await expect(page.getByRole('heading', { level: 1, name: 'Helmsman' })).toBeVisible();
		await expect(page.getByRole('img', { name: 'Helmsman architecture' })).toBeVisible();
		await expect(page.getByRole('list', { name: 'Connections' })).toContainText('Operator → React SPA');
	});

	test('never links out to the products themselves', async ({ page }) => {
		for (const slug of ['exists', 'helmsman', 'homelab']) {
			await page.goto(`/projects/${slug}`);
			const hrefs = await page.locator('main a[href]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
			expect(hrefs.filter((h) => /^https?:\/\//.test(h))).toEqual([]);
		}
	});

	test('unknown projects return a 404 page', async ({ page }) => {
		const res = await page.goto('/projects/does-not-exist');
		expect(res?.status()).toBe(404);
		await expect(page.getByRole('heading', { level: 1 })).toContainText('NotFound');
	});
});

test.describe('contact and CV', () => {
	test('the contact form validates before sending', async ({ page }) => {
		let sent = false;
		await page.route('**/api.web3forms.com/**', (route) => {
			sent = true;
			return route.abort();
		});
		await page.goto('/#contact');
		await page.getByRole('button', { name: 'Send message' }).click();
		await expect(page.getByText('Enter your name.')).toBeVisible();
		await expect(page.getByLabel('Name')).toBeFocused();
		expect(sent).toBe(false);
	});

	test('downloads the CV as a PDF attachment', async ({ request }) => {
		const res = await request.get('/cv');
		expect(res.status()).toBe(200);
		expect(res.headers()['content-type']).toBe('application/pdf');
		expect(res.headers()['content-disposition']).toContain('attachment');
	});

	test('publishes a sitemap with every project', async ({ request }) => {
		const xml = await (await request.get('/sitemap.xml')).text();
		for (const slug of ['exists', 'helmsman', 'homelab']) expect(xml).toContain(`/projects/${slug}`);
	});
});
