import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import CustomShaderMaterial from 'three-custom-shader-material';
import vertexShader from '@/shaders/ocean/vertex';
import fragmentShader from '@/shaders/ocean/fragment';
import { useTexture } from '@react-three/drei';

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

export default function Ocean() {
	const materialRef = useRef<any>(null);
	const normal = useTexture('/static/images/ocean/normals.jpeg');

	useFrame(({ clock }) => {
		if (!materialRef.current) return;
		materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
	});

	return (
		<mesh rotation-x={-Math.PI / 2} position-y={0} receiveShadow>
			<planeGeometry args={[256, 256, 32, 32]} />
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
					uColorDeep: { value: new THREE.Color('#1E88E5') },
					uColorShallow: { value: new THREE.Color('#64B5F6') },
					uRimColor: { value: new THREE.Color('#FFB74D') },
					uTextureSize: { value: 45 },
				}}
                color='#0288D1'
				normalMap={normal}
				normalScale={new THREE.Vector2(0.5, 0.5)}
                transparent
                opacity={0.85}
			/>
		</mesh>
	);
}
