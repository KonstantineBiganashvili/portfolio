import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
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
	const materialRef = useRef<any>(null);
	const groupRef = useRef<any>(null);
	const outlineRef = useRef<any>(null);
	const normal = useTexture('/static/images/ocean/normals.jpeg');

	useFrame(({ clock }) => {
		if (!materialRef.current) return;
		materialRef.current.uniforms.uTime.value = clock.getElapsedTime();

		if (groupRef.current) {
			groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;

			const liquidOffsetX = -mousePosition.x * 1.5;
			groupRef.current.position.x = liquidOffsetX;
		}

		if (outlineRef.current) {
			const outlineOffsetX = mousePosition.x;
			outlineRef.current.position.x = outlineOffsetX;
		}
	});

	return (
		<>
			<mesh ref={outlineRef} position={[0, 6, -20]} receiveShadow>
				<sphereGeometry args={[10.3, 64, 64]} />
				<meshBasicMaterial
					color={theme.colors.accent}
					transparent
					opacity={0.25}
					side={THREE.BackSide}
				/>
			</mesh>

			<group ref={groupRef} position={[0, 6, -20]}>
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
							uColorDeep: { value: new THREE.Color(theme.colors.deep) },
							uColorShallow: { value: new THREE.Color(theme.colors.light) },
							uRimColor: { value: new THREE.Color(theme.colors.accent) },
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
