import React, { useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Vector2 } from 'three';
import Boat from './Boat';
import { BoatProps, BoatSystemConfig } from '@/types/boats';
import {
    DEFAULT_BOAT_CONFIG,
    createRandomBoat,
    BOAT_FORWARD_SIGNS,
    getCameraBasisXZ,
    generatePositionInFront,
    generateSideSpawn,
    computeEffectiveSpeed,
} from '@/utils/boats';

interface BoatSystemProps {
	config?: Partial<BoatSystemConfig>;
}

const FOV_CONFIG = {
    minDistance: 8,
    maxDistance: 150,
    spawnDistance: 25,
};

const BoatSystem: React.FC<BoatSystemProps> = ({ config = {} }) => {
	const [boats, setBoats] = useState<BoatProps[]>([]);

    const boatConfig: BoatSystemConfig = { ...DEFAULT_BOAT_CONFIG, ...config };

    const { camera } = useThree();

    const generatePositionInFOV = (distanceAhead?: number): Vector3 =>
        generatePositionInFront(camera, distanceAhead ?? FOV_CONFIG.spawnDistance, 0.8);

    const computeSpawnPositions = (count: number): Vector3[] => {
        const minSeparation = 18;
        const maxDistance = FOV_CONFIG.maxDistance;
        const step = Math.max(minSeparation, Math.min(FOV_CONFIG.spawnDistance, maxDistance / count));

        const positions: Vector3[] = [];
        for (let i = 1; i <= count; i++) {
            const pos = generatePositionInFOV(step * i);
            positions.push(pos);
        }
        return positions;
    };

    const generatePositionOnSide = (side: 'left' | 'right') =>
        generateSideSpawn(camera, side, Math.max(FOV_CONFIG.minDistance + 4, FOV_CONFIG.spawnDistance * 0.8), Math.min(FOV_CONFIG.maxDistance * 0.9, FOV_CONFIG.maxDistance));

	useEffect(() => {
        const totalBoats = 5;
        const positions = computeSpawnPositions(totalBoats);

        const forward = new Vector3();
        camera.getWorldDirection(forward);
        const forward2 = new Vector2(forward.x, forward.z).normalize();
        const right2 = new Vector2(-forward2.y, forward2.x); 
        const yawRight = Math.atan2(right2.y, right2.x);
        const yawLeft = Math.atan2(-right2.y, -right2.x);

        const spawned: BoatProps[] = positions.map((pos, idx) => {
            const boat = createRandomBoat(`boat-${idx}`, boatConfig);
            boat.position = pos;
            boat.rotation = Math.random() < 0.5 ? yawLeft : yawRight;
            boat.speed = 0.08 + Math.random() * 0.15;
            const sign = BOAT_FORWARD_SIGNS[boat.modelPath] ?? 1;
            boat.direction = new Vector2(Math.cos(boat.rotation), Math.sin(boat.rotation)).multiplyScalar(sign);
            boat.isMoving = true;
            return boat;
        });
        setBoats(spawned);
    }, [boatConfig.maxBoats]);

    useFrame((_, delta) => {
        if (boats.length === 0) return;
        setBoats((prev) => {
            const { right2 } = getCameraBasisXZ(camera);

            const kept: BoatProps[] = [];
            const removedSides: Array<'left' | 'right'> = [];

            for (const b of prev) {
                const cam2 = new Vector2(camera.position.x, camera.position.z);
                const cur2 = new Vector2(b.position.x, b.position.z);
                const radial = cur2.distanceTo(cam2);

                const baseSpeed = b.speed && b.speed > 0 ? b.speed : 0.1;
                const effSpeed = computeEffectiveSpeed(
                    baseSpeed,
                    radial,
                    FOV_CONFIG.minDistance,
                    FOV_CONFIG.maxDistance,
                );

                const dir = b.direction ?? new Vector2(Math.cos(b.rotation), Math.sin(b.rotation));
                const nextPos = new Vector3(
                    b.position.x + dir.x * effSpeed * delta,
                    0,
                    b.position.z + dir.y * effSpeed * delta,
                );

                const ndc = nextPos.clone().project(camera);
                const inView = ndc.z > -1 && ndc.z < 1 && Math.abs(ndc.x) <= 1 && Math.abs(ndc.y) <= 1 &&
                    radial >= FOV_CONFIG.minDistance && radial <= FOV_CONFIG.maxDistance;

                if (!inView) {
                    const toBoat = new Vector2(nextPos.x - camera.position.x, nextPos.z - camera.position.z).normalize();
                    const lateral = right2.dot(toBoat);
                    const side: 'left' | 'right' = lateral >= 0 ? 'right' : 'left';
                    removedSides.push(side);
                    continue;
                }

                kept.push({ ...b, position: nextPos, direction: dir, isMoving: true });
            }

            for (const side of removedSides) {
                const opposite: 'left' | 'right' = side === 'left' ? 'right' : 'left';
                const { position, yaw } = generatePositionOnSide(opposite);
                const boat = createRandomBoat(`boat-${Date.now()}-${Math.random()}`, boatConfig);
                boat.position = position;
                boat.rotation = yaw;
                boat.speed = 0.08 + Math.random() * 0.07;
                const sign = BOAT_FORWARD_SIGNS[boat.modelPath] ?? 1;
                boat.direction = new Vector2(Math.cos(boat.rotation), Math.sin(boat.rotation)).multiplyScalar(sign);
                boat.isMoving = true;
                kept.push(boat);
            }

            const targetCount = 5;
            if (kept.length > targetCount) kept.length = targetCount;
            return kept;
        });
    });

	return (
		<>
			{boats.map((boat) => (
				<Boat key={boat.id} boat={boat} />
			))}
		</>
	);
};

export default BoatSystem;
