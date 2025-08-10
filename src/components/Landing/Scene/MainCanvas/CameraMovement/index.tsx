import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

export default function CameraMovement() {
	const { camera } = useThree();
	const mouseRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	useFrame(() => {
		camera.position.set(0, 10, 15);

		const rotationAngle = (-mouseRef.current.x * Math.PI) / 24;

		const lookAtDistance = 15;
		const x = Math.sin(rotationAngle) * lookAtDistance;
		const z = -Math.cos(rotationAngle) * lookAtDistance;

		camera.lookAt(x, 6, z);
	});

	return null;
}
