import React, { useState, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useSpring } from '@react-spring/three';
import * as THREE from 'three';

export default function SunMoon({
	handleSkyboxIntensity,
	handleIsDay,
	isDay,
}: SunMoonProps) {
	const sun = useLoader(GLTFLoader, '/static/models/sun_low_poly.glb');
	const moon = useLoader(GLTFLoader, '/static/models/moon_low_poly.glb');

	const sunRef = useRef<THREE.Mesh>(null!);
	const moonRef = useRef<THREE.Mesh>(null!);

	const [toggle, setToggle] = useState(false);
	const [isAnimating, setAnimating] = useState(false);

	const { t } = useSpring({
		t: toggle ? 1 : 0,
		config: {
			duration: 2000,
			easing: (t) => 0.5 * (1 - Math.cos(Math.PI * t)),
		},
		onStart: () => setAnimating(true),
		onRest: () => {
			setAnimating(false);
			handleIsDay(!isDay);
		},
		onChange: ({ value: { t } }) => {
			const dayI = 1.0,
				nightI = 0.1;
			const intensity = isDay
				? dayI + (nightI - dayI) * t
				: nightI + (dayI - nightI) * (1 - t);
			handleSkyboxIntensity(intensity);
		},
	});

	useFrame(() => {
		const tv = t.get();

		sunRef.current.position.set(0, 0, 0);
		moonRef.current.position.set(0, 0, 0);

		const sunFactor = tv <= 0.5 ? 1 - tv * 2 : 0;
		const moonFactor = tv >= 0.5 ? (tv - 0.5) * 2 : 0;

		const sunScale = 0.5 * sunFactor;
		const moonScale = 0.9 * moonFactor;

		sunRef.current.scale.set(sunScale, sunScale, sunScale);
		moonRef.current.scale.set(moonScale, moonScale, moonScale);
	});

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!isAnimating) setToggle((v) => !v);
	};

	return (
		<group>
			<ambientLight intensity={0.6} />
			<directionalLight position={[5, 5, 5]} intensity={1} />
			<mesh ref={sunRef} onClick={handleClick}>
				<primitive object={sun.scene} />
			</mesh>
			<mesh ref={moonRef} onClick={handleClick}>
				<primitive object={moon.scene} />
			</mesh>
		</group>
	);
}

interface SunMoonProps {
	handleSkyboxIntensity: (i: number) => void;
	handleIsDay: (isDay: boolean) => void;
	isDay: boolean;
}
