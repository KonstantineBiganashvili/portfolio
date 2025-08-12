import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Box3, Mesh, Vector3 as ThreeVector3 } from 'three';
import { BoatProps } from '@/types/boats';
import { BOAT_YAW_OFFSETS } from '@/utils/boats';

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
    onComputedHeight?: (height: number) => void;
}> = ({ boat, meshRef, onComputedHeight }) => {
	const gltf = useGLTF(boat.modelPath);
	const [model, setModel] = useState<any>(null);

	useEffect(() => {
		if (!gltf || !gltf.scene) return;

		try {
			const clonedModel = gltf.scene.clone();

            const scale = BOAT_SCALES[boat.modelPath] || [0.1, 0.1, 0.1];
            clonedModel.scale.set(scale[0], scale[1], scale[2]);

			clonedModel.position.set(0, 0, 0);

            // Apply yaw correction so left/right heading matches visual left/right
            const yawOffset = BOAT_YAW_OFFSETS[boat.modelPath] || 0;
            clonedModel.rotation.set(0, yawOffset, 0);

            // Compute scaled bounding box height for dynamic submerge
            try {
                clonedModel.updateWorldMatrix(true, true);
                const box = new Box3().setFromObject(clonedModel);
                const size = new ThreeVector3();
                box.getSize(size);
                onComputedHeight?.(size.y);
            } catch {}

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
    const [submergeY, setSubmergeY] = useState<number>(-0.15);

    useFrame((state) => {
		if (!meshRef.current) return;

        const t = state.clock.elapsedTime;

        // Subtle rocking (pitch and roll), no vertical bobbing and no yaw smoothing
        const rockingOffsetZ = Math.sin(t * boat.rockingSpeed * 0.3 + boat.rockingPhase) * boat.rockingAmplitude; // roll around Z
        const rockingOffsetX = Math.cos(t * boat.rockingSpeed * 0.2 + boat.rockingPhase) * boat.rockingAmplitude * 0.6; // pitch around X

        // Set yaw directly to the desired left/right orientation
        meshRef.current.rotation.y = boat.rotation;

        // Apply rocking pitch/roll
        meshRef.current.rotation.x = rockingOffsetX;
        meshRef.current.rotation.z = rockingOffsetZ;

        // Keep position fixed at the ocean plane (Y from boat.position)
        meshRef.current.position.set(
            boat.position.x,
            boat.position.y + submergeY,
            boat.position.z,
        );
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
            <BoatModel
                boat={boat}
                meshRef={meshRef}
                onComputedHeight={(h) => setSubmergeY(-0.12 * h)}
            />
		</Suspense>
	);
};

export default Boat;
