'use client';

import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { AdditiveBlending, BackSide, Color, type Mesh, MeshStandardMaterial, RepeatWrapping, TextureLoader, Vector2 } from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';
import fragmentShader from '@/shaders/ocean/fragment';
import vertexShader from '@/shaders/ocean/vertex';

const RADIUS = 5;
const NORMAL_SCALE = new Vector2(0.5, 0.5);

/** The cluster's control plane: the liquid "ocean" sphere from the previous site, retuned to the sonar palette. */
type ShaderMaterialHandle = MeshStandardMaterial & { uniforms: Record<string, { value: unknown }> };

export function Core() {
	const mesh = useRef<Mesh>(null);
	const material = useRef<ShaderMaterialHandle>(null);
	const loaded = useLoader(TextureLoader, '/static/images/ocean/normals.jpeg');
	const normal = useMemo(() => {
		const texture = loaded.clone();
		texture.wrapS = RepeatWrapping;
		texture.wrapT = RepeatWrapping;
		return texture;
	}, [loaded]);
	// The clone is a separate GPU upload from the loader's cached original.
	useEffect(() => () => normal.dispose(), [normal]);

	const uniforms = useMemo(
		() => ({
			uTime: { value: 0 },
			uDir1: { value: new Vector2(1, 0.5) },
			uSteepness1: { value: 0.3 },
			uWavelength1: { value: 4 },
			uSpeed1: { value: 1 },
			uDir2: { value: new Vector2(1, 0.5) },
			uSteepness2: { value: 0.1 },
			uWavelength2: { value: 6 },
			uSpeed2: { value: 0.7 },
			uColorDeep: { value: new Color('#0b4f5e') },
			uColorShallow: { value: new Color('#2dd4bf') },
			uRimColor: { value: new Color('#a5f3fc') },
			uTextureSize: { value: 45 },
		}),
		[],
	);

	useFrame(({ clock }) => {
		const time = material.current?.uniforms.uTime;
		if (time) time.value = clock.elapsedTime;
		if (mesh.current) mesh.current.rotation.y = clock.elapsedTime * 0.08;
	});

	return (
		<>
			<mesh ref={mesh}>
				<sphereGeometry args={[RADIUS, 96, 96]} />
				<CustomShaderMaterial
					ref={material as never}
					baseMaterial={MeshStandardMaterial}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={uniforms}
					normalMap={normal}
					normalScale={NORMAL_SCALE}
					roughness={0.35}
					metalness={0.1}
					transparent
					opacity={0.92}
				/>
			</mesh>
			{/* Halo */}
			<mesh scale={1.09}>
				<sphereGeometry args={[RADIUS, 48, 48]} />
				<meshBasicMaterial color='#2dd4bf' transparent opacity={0.1} side={BackSide} blending={AdditiveBlending} depthWrite={false} />
			</mesh>
		</>
	);
}
