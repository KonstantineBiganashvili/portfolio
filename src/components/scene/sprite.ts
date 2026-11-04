import { CanvasTexture } from 'three';

let texture: CanvasTexture | null = null;

/** A soft round sprite so points render as glowing dots instead of squares. */
export function dotTexture(): CanvasTexture {
	if (texture) return texture;
	const size = 64;
	const canvas = document.createElement('canvas');
	canvas.width = canvas.height = size;
	const ctx = canvas.getContext('2d')!;
	const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
	g.addColorStop(0, 'rgba(255,255,255,1)');
	g.addColorStop(0.35, 'rgba(255,255,255,0.65)');
	g.addColorStop(1, 'rgba(255,255,255,0)');
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, size, size);
	texture = new CanvasTexture(canvas);
	return texture;
}
