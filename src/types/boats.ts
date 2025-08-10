import { Vector3, Vector2 } from 'three';

export interface BoatProps {
	id: string;
	modelPath: string;
	position: Vector3;
	direction: Vector2;
	speed: number;
	rotation: number;
	rockingPhase: number;
	rockingSpeed: number;
	rockingAmplitude: number;
	isMoving: boolean;
	collisionRadius: number;
}

export interface BoatMovement {
	position: Vector3;
	direction: Vector2;
	speed: number;
	rotation: number;
}

export interface CollisionInfo {
	hasCollision: boolean;
	distance: number;
	otherBoatId?: string;
}

export interface BoatSystemConfig {
	maxBoats: number;
	oceanBounds: {
		minX: number;
		maxX: number;
		minZ: number;
		maxZ: number;
	};
	speedRange: {
		min: number;
		max: number;
	};
	collisionDistance: number;
	rockingConfig: {
		speed: number;
		amplitude: number;
	};
}
