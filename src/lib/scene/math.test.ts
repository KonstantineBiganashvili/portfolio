import { describe, expect, it } from 'vitest';
import { clamp01, easeOutBack, easeOutCubic, nodeDelay, quadBezier, ringPoint } from './math';

describe('scene math', () => {
	it('clamps to [0, 1]', () => {
		expect([clamp01(-1), clamp01(0.4), clamp01(3)]).toEqual([0, 0.4, 1]);
	});

	it('eases from 0 to 1', () => {
		expect(easeOutCubic(0)).toBe(0);
		expect(easeOutCubic(1)).toBe(1);
		expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
	});

	it('overshoots past 1 before settling', () => {
		expect(easeOutBack(0)).toBeCloseTo(0);
		expect(easeOutBack(1)).toBeCloseTo(1);
		expect(Math.max(...[0.6, 0.7, 0.8].map((t) => easeOutBack(t)))).toBeGreaterThan(1);
	});

	it('places ring points on the circle', () => {
		const [x, y, z] = ringPoint(10, Math.PI / 2);
		expect(x).toBeCloseTo(0);
		expect(y).toBe(0);
		expect(z).toBeCloseTo(10);
	});

	it('interpolates a quadratic Bézier between its endpoints', () => {
		const a: [number, number, number] = [0, 0, 0];
		const b: [number, number, number] = [10, 0, 0];
		const c: [number, number, number] = [5, 4, 0];
		expect(quadBezier(a, c, b, 0)).toEqual(a);
		expect(quadBezier(a, c, b, 1)).toEqual(b);
		expect(quadBezier(a, c, b, 0.5)).toEqual([5, 2, 0]);
	});

	it('staggers node start-up times', () => {
		expect(nodeDelay(0)).toBeCloseTo(0.9);
		expect(nodeDelay(3)).toBeCloseTo(1.14);
	});
});
