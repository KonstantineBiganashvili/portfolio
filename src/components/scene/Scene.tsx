'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import type { Group } from 'three';
import { clamp01, easeOutCubic } from '@/lib/scene/math';
import { Core } from './Core';
import { Orbits } from './Orbits';
import { Stars } from './Stars';
import styles from './scene.module.css';

function Cluster() {
	const group = useRef<Group>(null);
	const viewport = useThree((s) => s.viewport);
	const wide = viewport.aspect > 1.1;
	const x = wide ? viewport.width * 0.26 : 0;
	const y = wide ? 0 : viewport.height * 0.2;
	const scale = wide ? 0.92 : 0.62;

	useFrame((state) => {
		const g = group.current;
		if (!g) return;
		const t = state.clock.elapsedTime;
		// Gentle parallax towards the pointer.
		g.rotation.y += (state.pointer.x * 0.28 - g.rotation.y) * 0.04;
		g.rotation.x += (-state.pointer.y * 0.16 - g.rotation.x) * 0.04;
		g.scale.setScalar(scale * (0.55 + 0.45 * easeOutCubic(clamp01(t / 1.4))));
	});

	return (
		<group ref={group} position={[x, y, 0]}>
			<Suspense fallback={null}>
				<Core />
			</Suspense>
			<Orbits />
		</group>
	);
}

export default function Scene({ active }: { active: boolean }) {
	const [ready, setReady] = useState(false);
	return (
		<Canvas
			className={styles.canvas}
			data-ready={ready}
			frameloop={active ? 'always' : 'never'}
			dpr={[1, 1.75]}
			camera={{ position: [0, 0, 34], fov: 35, near: 0.1, far: 300 }}
			gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
			onCreated={() => setReady(true)}
		>
			<ambientLight intensity={0.4} />
			<directionalLight position={[12, 10, 8]} intensity={1.2} />
			<pointLight position={[-10, -6, 8]} intensity={40} distance={60} color='#2dd4bf' />
			<Stars />
			<Cluster />
		</Canvas>
	);
}
