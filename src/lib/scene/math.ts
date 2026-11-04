export type Vec3 = [number, number, number];

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const easeOutCubic = (t: number) => 1 - (1 - clamp01(t)) ** 3;

/** Overshoots slightly before settling: used for nodes "starting up". */
export function easeOutBack(t: number, overshoot = 1.6): number {
	const x = clamp01(t) - 1;
	return 1 + (overshoot + 1) * x ** 3 + overshoot * x ** 2;
}

/** Point on a horizontal circle of `radius` at `angle` (radians), in the ring's local space. */
export function ringPoint(radius: number, angle: number): Vec3 {
	return [radius * Math.cos(angle), 0, radius * Math.sin(angle)];
}

/** Quadratic Bézier between a and b through control point c. */
export function quadBezier(a: Vec3, c: Vec3, b: Vec3, t: number): Vec3 {
	const u = 1 - t;
	return [0, 1, 2].map((i) => u * u * a[i]! + 2 * u * t * c[i]! + t * t * b[i]!) as Vec3;
}

/** Start time of the n-th node's start-up animation, so the cluster comes up one node at a time. */
export const nodeDelay = (index: number, base = 0.9, step = 0.08) => base + index * step;
