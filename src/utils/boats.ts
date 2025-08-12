import { Camera, PerspectiveCamera, Vector3, Vector2 } from 'three';
import { BoatProps, CollisionInfo, BoatSystemConfig } from '@/types/boats';

export const BOAT_MODELS = [
    '/static/models/boat_1.glb',
    '/static/models/boat_2.glb',
    '/static/models/boat_3.glb',
    '/static/models/boat_4.glb',
    '/static/models/boat_5.glb',
];

export const BOAT_YAW_OFFSETS: Record<string, number> = {
    '/static/models/boat_1.glb': -Math.PI / 2,
    '/static/models/boat_2.glb': 0,
    '/static/models/boat_3.glb': -Math.PI / 2,
    '/static/models/boat_4.glb': 0,
    '/static/models/boat_5.glb': -Math.PI / 2 - 0.3,
};

export const BOAT_FORWARD_SIGNS: Record<string, 1 | -1> = {
    '/static/models/boat_1.glb': 1,
    '/static/models/boat_2.glb': 1,
    '/static/models/boat_3.glb': -1,
    '/static/models/boat_4.glb': 1,
    '/static/models/boat_5.glb': -1,
};

export const DEFAULT_BOAT_CONFIG: BoatSystemConfig = {
	maxBoats: 6,
	oceanBounds: {
		minX: -120,
		maxX: 120,
		minZ: -120,
		maxZ: 120,
	},
	speedRange: {
		min: 0.3,
		max: 1.5,
	},
	collisionDistance: 15,
	rockingConfig: {
        speed: 1.25,
        amplitude: 0.06,
	},
};

export function getCameraBasisXZ(
    camera: Camera,
): { forward2: Vector2; right2: Vector2 } {
    const forward = new Vector3();
    (camera as any).getWorldDirection?.(forward);
    const forward2 = new Vector2(forward.x, forward.z).normalize();
    const right2 = new Vector2(-forward2.y, forward2.x);
    return { forward2, right2 };
}

export function getHorizontalFovRad(camera: Camera): number {
    const persp = camera as PerspectiveCamera;
    const isPerspective = (persp as unknown as { isPerspectiveCamera?: boolean })
        .isPerspectiveCamera === true;
    const vFovRad = isPerspective ? (persp.fov * Math.PI) / 180 : Math.PI / 3;
    return isPerspective
        ? 2 * Math.atan(Math.tan(vFovRad / 2) * persp.aspect)
        : Math.PI / 2;
}


export function generatePositionInFront(
    camera: Camera,
    distanceAhead: number,
    lateralCoverage = 0.8,
): Vector3 {
    const { forward2, right2 } = getCameraBasisXZ(camera);
    const hFovRad = getHorizontalFovRad(camera);
    const lateralHalfWidth = Math.tan(hFovRad / 2) * distanceAhead * lateralCoverage;
    const lateralOffset = (Math.random() * 2 - 1) * lateralHalfWidth;
    const x = (camera as any).position.x + forward2.x * distanceAhead + right2.x * lateralOffset;
    const z = (camera as any).position.z + forward2.y * distanceAhead + right2.y * lateralOffset;
    return new Vector3(x, 0, z);
}

export function generateSideSpawn(
    camera: Camera,
    side: 'left' | 'right',
    minDistance: number,
    maxDistance: number,
): { position: Vector3; yaw: number } {
    const { forward2, right2 } = getCameraBasisXZ(camera);
    const hFovRad = getHorizontalFovRad(camera);
    const minD = minDistance;
    const maxD = Math.max(minD + 1, maxDistance);
    const dist = minD + Math.random() * (maxD - minD);
    const lateralHalfWidth = Math.tan(hFovRad / 2) * dist;
    const edgeSign = side === 'right' ? 1 : -1;
    const lateralOffset = edgeSign * lateralHalfWidth * 0.9 + (Math.random() - 0.5) * (lateralHalfWidth * 0.1);
    const x = (camera as any).position.x + forward2.x * dist + right2.x * lateralOffset;
    const z = (camera as any).position.z + forward2.y * dist + right2.y * lateralOffset;
    const yawRight = Math.atan2(right2.y, right2.x);
    const yawLeft = Math.atan2(-right2.y, -right2.x);
    const yaw = Math.random() < 0.5 ? yawLeft : yawRight;
    return { position: new Vector3(x, 0, z), yaw };
}

export function computeEffectiveSpeed(
    baseSpeed: number,
    radialDistance: number,
    minDistance: number,
    maxDistance: number,
): number {
    const norm = Math.max(
        0,
        Math.min(1, (radialDistance - minDistance) / Math.max(1e-3, maxDistance - minDistance)),
    );
    const speedFactor = 0.6 + norm * 1.4;
    return baseSpeed * speedFactor;
}

export function generateRandomPosition(config: BoatSystemConfig): Vector3 {
	const { oceanBounds } = config;
	const x =
		Math.random() * (oceanBounds.maxX - oceanBounds.minX) + oceanBounds.minX;
	const z =
		Math.random() * (oceanBounds.maxZ - oceanBounds.minZ) + oceanBounds.minZ;
	return new Vector3(x, 0, z);
}

export function generateRandomDirection(): Vector2 {
	const angle = Math.random() * Math.PI * 2;
	return new Vector2(Math.cos(angle), Math.sin(angle));
}

export function generateRandomSpeed(config: BoatSystemConfig): number {
	const { speedRange } = config;
	return Math.random() * (speedRange.max - speedRange.min) + speedRange.min;
}

export function checkCollision(
	boat1: BoatProps,
	boat2: BoatProps,
): CollisionInfo {
	const distance = boat1.position.distanceTo(boat2.position);
	const collisionDistance = boat1.collisionRadius + boat2.collisionRadius;

	return {
		hasCollision: distance < collisionDistance,
		distance,
		otherBoatId: boat2.id,
	};
}

export function checkPotentialCollision(
	boat: BoatProps,
	otherBoats: BoatProps[],
	config: BoatSystemConfig,
): CollisionInfo {
	let closestDistance = Infinity;
	let closestBoatId: string | undefined;

	for (const otherBoat of otherBoats) {
		if (otherBoat.id === boat.id) continue;

		const futurePosition = boat.position.clone();
		futurePosition.x += boat.direction.x * boat.speed * 2;
		futurePosition.z += boat.direction.y * boat.speed * 2;

		const distance = futurePosition.distanceTo(otherBoat.position);
		const collisionDistance =
			boat.collisionRadius +
			otherBoat.collisionRadius +
			config.collisionDistance;

		if (distance < collisionDistance && distance < closestDistance) {
			closestDistance = distance;
			closestBoatId = otherBoat.id;
		}
	}

	return {
		hasCollision: closestDistance < Infinity,
		distance: closestDistance,
		otherBoatId: closestBoatId,
	};
}

export function updateBoatPosition(
	boat: BoatProps,
	deltaTime: number,
): Vector3 {
	const newPosition = boat.position.clone();

	if (boat.isMoving) {
		newPosition.x += boat.direction.x * boat.speed * deltaTime;
		newPosition.z += boat.direction.y * boat.speed * deltaTime;
	}

	return newPosition;
}

export function isWithinBounds(
	position: Vector3,
	config: BoatSystemConfig,
): boolean {
	const { oceanBounds } = config;
	return (
		position.x >= oceanBounds.minX &&
		position.x <= oceanBounds.maxX &&
		position.z >= oceanBounds.minZ &&
		position.z <= oceanBounds.maxZ
	);
}

export function generateBounceDirection(
	position: Vector3,
	config: BoatSystemConfig,
): Vector2 {
	const { oceanBounds } = config;
	const centerX = (oceanBounds.maxX + oceanBounds.minX) / 2;
	const centerZ = (oceanBounds.maxZ + oceanBounds.minZ) / 2;

	const directionX = centerX - position.x;
	const directionZ = centerZ - position.z;
	const length = Math.sqrt(directionX * directionX + directionZ * directionZ);

	return new Vector2(directionX / length, directionZ / length);
}

export function createRandomBoat(
	id: string,
	config: BoatSystemConfig,
): BoatProps {
	const modelPath = BOAT_MODELS[Math.floor(Math.random() * BOAT_MODELS.length)];
	const position = generateRandomPosition(config);
	const direction = generateRandomDirection();
	const speed = generateRandomSpeed(config);
	const rotation = Math.atan2(direction.y, direction.x);
	const rockingPhase = Math.random() * Math.PI * 2;
	const rockingSpeed = config.rockingConfig.speed + (Math.random() - 0.5) * 0.5;
	const rockingAmplitude =
		config.rockingConfig.amplitude + (Math.random() - 0.5) * 0.02;

	return {
		id,
		modelPath,
		position,
		direction,
		speed,
		rotation,
		rockingPhase,
		rockingSpeed,
		rockingAmplitude,
		isMoving: true,
		collisionRadius: 8,
	};
}
