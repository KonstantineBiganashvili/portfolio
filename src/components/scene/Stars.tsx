'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { Points } from 'three';
import { dotTexture } from './sprite';

/** Small deterministic PRNG so the starfield is identical on every load. */
function mulberry32(seed: number) {
	return () => {
		seed |= 0;
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export function Stars({ count = 900 }: { count?: number }) {
	const ref = useRef<Points>(null);
	const positions = useMemo(() => {
		const rand = mulberry32(7);
		const out = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			const r = 45 + rand() * 60;
			const theta = rand() * Math.PI * 2;
			const phi = Math.acos(2 * rand() - 1);
			out[i * 3] = r * Math.sin(phi) * Math.cos(theta);
			out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
			out[i * 3 + 2] = r * Math.cos(phi) - 30;
		}
		return out;
	}, [count]);

	useFrame((_, delta) => {
		if (ref.current) ref.current.rotation.y += Math.min(delta, 0.1) * 0.006;
	});

	return (
		<points ref={ref}>
			<bufferGeometry>
				<bufferAttribute attach='attributes-position' args={[positions, 3]} />
			</bufferGeometry>
			<pointsMaterial map={dotTexture()} size={0.42} color='#a3b0c5' transparent opacity={0.55} depthWrite={false} sizeAttenuation />
		</points>
	);
}
