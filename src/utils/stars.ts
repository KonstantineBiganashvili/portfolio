import { Vector3, Spherical, Color } from 'three';
import { StarsData } from '@/types/stars';

export function genStar(r: number): Vector3 {
	return new Vector3().setFromSpherical(
		new Spherical(
			r,
			Math.acos(1 - Math.random() * 2),
			Math.random() * 2 * Math.PI,
		),
	);
}

export function generateStarsData(
	count: number,
	radius: number,
	depth: number,
	saturation: number,
	factor: number,
): StarsData {
	const positions: number[] = [];
	const colorsArr: number[] = [];
	const sizesArr: number[] = [];
	const color = new Color();
	let r = radius + depth;
	const step = depth / count;

	for (let i = 0; i < count; i++) {
		r -= step * Math.random();
		positions.push(...genStar(r).toArray());
		color.setHSL(i / count, saturation, 0.9);
		colorsArr.push(color.r, color.g, color.b);
		sizesArr.push((0.5 + 0.5 * Math.random()) * factor);
	}

	return {
		positions: new Float32Array(positions),
		colors: new Float32Array(colorsArr),
		sizes: new Float32Array(sizesArr),
	};
}
