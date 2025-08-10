import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';
import { BoatProps } from '@/types/boats';

interface BoatComponentProps {
	boat: BoatProps;
}

const BOAT_SCALES: { [key: string]: [number, number, number] } = {
	'/static/models/boat_1.glb': [0.05, 0.05, 0.05],
	'/static/models/boat_2.glb': [0.004, 0.004, 0.004],
	'/static/models/boat_3.glb': [0.3, 0.3, 0.3],
	'/static/models/boat_4.glb': [0.3, 0.3, 0.3],
	'/static/models/boat_5.glb': [0.005, 0.005, 0.005],
};

const BoatModel: React.FC<{
	boat: BoatProps;
	meshRef: React.RefObject<Mesh>;
}> = ({ boat, meshRef }) => {
	const gltf = useGLTF(boat.modelPath);
	const [model, setModel] = useState<any>(null);

	useEffect(() => {
		if (!gltf || !gltf.scene) return;

		try {
			const clonedModel = gltf.scene.clone();

			const scale = BOAT_SCALES[boat.modelPath] || [0.1, 0.1, 0.1];
			clonedModel.scale.set(scale[0], scale[1], scale[2]);

			clonedModel.position.set(0, 0, 0);

			setModel(clonedModel);
		} catch (error) {
			console.error('Error processing boat model:', error);
		}
	}, [gltf, boat.modelPath]);

	if (!model) {
		return (
			<mesh ref={meshRef} position={boat.position}>
				<boxGeometry args={[2, 1, 4]} />
				<meshStandardMaterial color='red' />
			</mesh>
		);
	}

	return (
		<mesh ref={meshRef} position={boat.position}>
			<primitive object={model} />
		</mesh>
	);
};

const Boat: React.FC<BoatComponentProps> = ({ boat }) => {
	const meshRef = useRef<Mesh>(null!);

	useFrame((state) => {
		if (!meshRef.current) return;

		const rockingOffset =
			Math.sin(
				state.clock.elapsedTime * boat.rockingSpeed * 0.3 + boat.rockingPhase,
			) * boat.rockingAmplitude;
		const rollingOffset =
			Math.cos(
				state.clock.elapsedTime * boat.rockingSpeed * 0.2 + boat.rockingPhase,
			) *
			boat.rockingAmplitude *
			0.3;

		meshRef.current.rotation.set(
			rollingOffset,
			boat.rotation,
			rockingOffset,
		);

		meshRef.current.position.copy(boat.position);
	});

	return (
		<Suspense
			fallback={
				<mesh ref={meshRef} position={boat.position}>
					<boxGeometry args={[2, 1, 4]} />
					<meshStandardMaterial color='blue' />
				</mesh>
			}
		>
			<BoatModel boat={boat} meshRef={meshRef} />
		</Suspense>
	);
};

export default Boat;
