import { Vector3, Vector2 } from 'three';
import { BoatProps, CollisionInfo, BoatSystemConfig } from '@/types/boats';

export const BOAT_MODELS = [
	'/static/models/boat_1.glb',
	'/static/models/boat_2.glb',
	'/static/models/boat_3.glb',
	'/static/models/boat_4.glb',
	'/static/models/boat_5.glb',
];

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
		speed: 1.0,
		amplitude: 0.05,
	},
};

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
