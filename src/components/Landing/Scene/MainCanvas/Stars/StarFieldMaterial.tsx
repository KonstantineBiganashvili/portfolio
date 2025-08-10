import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending } from 'three';
import { BrightStarfieldMaterial } from './BrightStarfieldMaterial';

const StarFieldMaterial: React.FC<StarFieldMaterialProps> = ({
	fade = false,
	brightness = 1,
	speed = 1,
}) => {
	const materialRef = useRef<BrightStarfieldMaterial>(null!);
	const material = useMemo(() => new BrightStarfieldMaterial(), []);

	useFrame((state) => {
		const mat = materialRef.current!;
		mat.uniforms.time.value = state.clock.elapsedTime * speed;
		mat.uniforms.brightness.value = brightness;
	});

	return (
		<primitive
			ref={materialRef}
			object={material}
			attach='material'
			blending={AdditiveBlending}
			uniforms-fade-value={fade ? 1 : 0}
			depthWrite={false}
			transparent
			vertexColors
		/>
	);
};

export default StarFieldMaterial;

interface StarFieldMaterialProps {
	fade?: boolean;
	brightness?: number;
	speed?: number;
}
