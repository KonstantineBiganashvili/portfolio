import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import CustomShaderMaterial from 'three-custom-shader-material';
import vertexShader from '@/shaders/ocean/vertex';
import fragmentShader from '@/shaders/ocean/fragment';
import { useTexture } from '@react-three/drei';
import { mousePosition } from '@/utils/mouseTracking';
import { useTheme } from '@/contexts/ThemeContext';

const wave1 = {
	dir: new THREE.Vector2(1, 0.5),
	steepness: 0.3,
	wavelength: 8.0,
	speed: 1.0,
};

const wave2 = {
	dir: new THREE.Vector2(1, 0.5),
	steepness: 0.1,
	wavelength: 12.0,
	speed: 0.7,
};

export default function LiquidSphere() {
	const { theme } = useTheme();
	const { viewport } = useThree();
	const materialRef = useRef<any>(null);
	const groupRef = useRef<any>(null);
	const outlineRef = useRef<any>(null);
	const normal = useTexture('/static/images/ocean/normals.jpeg');

	const [spherePosition, setSpherePosition] = useState({ x: 0, y: 6, z: -35 });

	useEffect(() => {
		const updatePosition = () => {
			const width = viewport.width;

			let zDistance = -35;

			if (width < 6) {
				zDistance = -55;
			} else if (width < 10) {
				zDistance = -45;
			} else if (width < 14) {
				zDistance = -40;
			}

			setSpherePosition({ x: 0, y: 6, z: zDistance });
		};

		updatePosition();
	}, [viewport.width]);

	useFrame(({ clock }) => {
		if (!materialRef.current) return;
		materialRef.current.uniforms.uTime.value = clock.getElapsedTime();

		if (groupRef.current) {
			groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;

			const liquidOffsetX = -mousePosition.x * 1.5;
			groupRef.current.position.set(
				spherePosition.x + liquidOffsetX,
				spherePosition.y,
				spherePosition.z,
			);
		}

		if (outlineRef.current) {
			const outlineOffsetX = mousePosition.x;
			outlineRef.current.position.set(
				spherePosition.x + outlineOffsetX,
				spherePosition.y,
				spherePosition.z,
			);
		}
	});

	return (
		<>
			<mesh
				ref={outlineRef}
				position={[spherePosition.x, spherePosition.y, spherePosition.z]}
				receiveShadow
			>
				<sphereGeometry args={[10.3, 64, 64]} />
				<meshBasicMaterial
					color={theme.colors.accentText}
					transparent
					opacity={0.25}
					side={THREE.BackSide}
				/>
			</mesh>

			<group
				ref={groupRef}
				position={[spherePosition.x, spherePosition.y, spherePosition.z]}
			>
				<mesh receiveShadow>
					<sphereGeometry args={[10, 64, 64]} />
					<CustomShaderMaterial
						ref={materialRef}
						baseMaterial={THREE.MeshStandardMaterial}
						vertexShader={vertexShader}
						fragmentShader={fragmentShader}
						uniforms={{
							uTime: { value: 0 },
							uDir1: { value: wave1.dir },
							uSteepness1: { value: wave1.steepness },
							uWavelength1: { value: wave1.wavelength },
							uSpeed1: { value: wave1.speed },
							uDir2: { value: wave2.dir },
							uSteepness2: { value: wave2.steepness },
							uWavelength2: { value: wave2.wavelength },
							uSpeed2: { value: wave2.speed },
							uColorDeep: { value: new THREE.Color(theme.colors.primary) },
							uColorShallow: { value: new THREE.Color(theme.colors.secondary) },
							uRimColor: { value: new THREE.Color(theme.colors.accentText) },
							uTextureSize: { value: 45 },
						}}
						color={theme.colors.primary}
						normalMap={normal}
						normalScale={new THREE.Vector2(0.5, 0.5)}
						transparent
						opacity={0.85}
					/>
				</mesh>
			</group>
		</>
	);
}
