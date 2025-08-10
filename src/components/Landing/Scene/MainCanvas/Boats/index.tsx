import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Vector2 } from 'three';
import Boat from './Boat';
import { BoatProps, BoatSystemConfig } from '@/types/boats';
import {
	DEFAULT_BOAT_CONFIG,
	createRandomBoat,
	checkPotentialCollision,
	generateRandomDirection,
	generateRandomSpeed,
} from '@/utils/boats';

interface BoatSystemProps {
	config?: Partial<BoatSystemConfig>;
}

const FOV_CONFIG = {
	cameraPosition: new Vector3(0, 10, 10),
	viewRadius: 50,
	minDistance: 8,
	maxDistance: 35,
	spawnDistance: 25,
};

const BoatSystem: React.FC<BoatSystemProps> = ({ config = {} }) => {
	const [boats, setBoats] = useState<BoatProps[]>([]);
	const [lastUpdate, setLastUpdate] = useState(0);

	const boatConfig: BoatSystemConfig = { ...DEFAULT_BOAT_CONFIG, ...config };

	const generatePositionInFOV = (): Vector3 => {
		const angle = Math.random() * Math.PI * 2;
		const distance = FOV_CONFIG.spawnDistance;
		const x = Math.cos(angle) * distance;
		const z = Math.sin(angle) * distance;
		return new Vector3(x, 0, z);
	};

	const isInFieldOfView = (position: Vector3): boolean => {
		const distance = position.distanceTo(FOV_CONFIG.cameraPosition);
		return (
			distance >= FOV_CONFIG.minDistance && distance <= FOV_CONFIG.maxDistance
		);
	};

	useEffect(() => {
		const initialBoats: BoatProps[] = [];
		for (let i = 0; i < boatConfig.maxBoats; i++) {
			const boat = createRandomBoat(`boat-${i}`, boatConfig);
			boat.position = generatePositionInFOV();
			boat.direction = generateRandomDirection();
			boat.rotation = Math.atan2(boat.direction.y, boat.direction.x);
			boat.speed = generateRandomSpeed(boatConfig);
			boat.isMoving = true;

			initialBoats.push(boat);
		}
		setBoats(initialBoats);
	}, [boatConfig.maxBoats]);

	useFrame((state, deltaTime) => {
		if (boats.length === 0) return;

		const currentTime = state.clock.elapsedTime;
		if (currentTime - lastUpdate < 0.016) return;

		setBoats((prevBoats) => {
			const updatedBoats = prevBoats.map((boat) => {
				const updatedBoat = { ...boat };

				const collisionInfo = checkPotentialCollision(
					boat,
					prevBoats,
					boatConfig,
				);

				if (collisionInfo.hasCollision) {
					updatedBoat.isMoving = false;
				} else {
					updatedBoat.isMoving = true;
				}

				if (updatedBoat.isMoving) {
					const newPosition = new Vector3(
						updatedBoat.position.x +
							updatedBoat.direction.x * updatedBoat.speed * deltaTime,
						updatedBoat.position.y,
						updatedBoat.position.z +
							updatedBoat.direction.y * updatedBoat.speed * deltaTime,
					);

					if (!isInFieldOfView(newPosition)) {
						const centerDirection = new Vector2(
							FOV_CONFIG.cameraPosition.x - newPosition.x,
							FOV_CONFIG.cameraPosition.z - newPosition.z,
						).normalize();

						updatedBoat.direction = centerDirection;
						updatedBoat.rotation = Math.atan2(
							centerDirection.y,
							centerDirection.x,
						);

						const clampedPosition = newPosition.clone();
						const distance = clampedPosition.distanceTo(
							FOV_CONFIG.cameraPosition,
						);

						if (distance > FOV_CONFIG.maxDistance) {
							const scale = FOV_CONFIG.maxDistance / distance;
							clampedPosition.x =
								FOV_CONFIG.cameraPosition.x +
								(clampedPosition.x - FOV_CONFIG.cameraPosition.x) * scale;
							clampedPosition.z =
								FOV_CONFIG.cameraPosition.z +
								(clampedPosition.z - FOV_CONFIG.cameraPosition.z) * scale;
						} else if (distance < FOV_CONFIG.minDistance) {
							const scale = FOV_CONFIG.minDistance / distance;
							clampedPosition.x =
								FOV_CONFIG.cameraPosition.x +
								(clampedPosition.x - FOV_CONFIG.cameraPosition.x) * scale;
							clampedPosition.z =
								FOV_CONFIG.cameraPosition.z +
								(clampedPosition.z - FOV_CONFIG.cameraPosition.z) * scale;
						}

						updatedBoat.position = clampedPosition;
					} else {
						updatedBoat.position = newPosition;
					}
				}

				if (Math.random() < 0.003 && updatedBoat.isMoving) {
					updatedBoat.direction = generateRandomDirection();
					updatedBoat.rotation = Math.atan2(
						updatedBoat.direction.y,
						updatedBoat.direction.x,
					);
					updatedBoat.speed = generateRandomSpeed(boatConfig);
				}

				return updatedBoat;
			});

			const boatsInView = updatedBoats.filter((boat) =>
				isInFieldOfView(boat.position),
			);
			const boatsToAdd = boatConfig.maxBoats - boatsInView.length;

			if (boatsToAdd > 0) {
				for (let i = 0; i < boatsToAdd; i++) {
					const newBoat = createRandomBoat(
						`boat-${Date.now()}-${i}`,
						boatConfig,
					);
					newBoat.position = generatePositionInFOV();
					newBoat.direction = generateRandomDirection();
					newBoat.rotation = Math.atan2(
						newBoat.direction.y,
						newBoat.direction.x,
					);
					newBoat.speed = generateRandomSpeed(boatConfig);
					newBoat.isMoving = true;
					boatsInView.push(newBoat);
				}
			}

			return boatsInView;
		});

		setLastUpdate(currentTime);
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
