import React from 'react';
import { Canvas } from '@react-three/fiber';
import SunMoon from '@/components/Landing/Scene/ThemeCanvas/SunMoon';

const FOV = 30;

function ThemeCanvas({
	handleSkyboxIntensity,
	handleIsDay,
	isDay,
}: ThemeCanvasProps) {
	return (
		<Canvas
			style={{
				width: '60px',
				height: '60px',
				zIndex: 10,
				pointerEvents: 'auto',
			}}
			camera={{
				fov: FOV,
				near: 0.1,
				far: 1000,
				position: [0, 0, 5],
			}}
		>
			<SunMoon
				handleSkyboxIntensity={handleSkyboxIntensity}
				handleIsDay={handleIsDay}
				isDay={isDay}
			/>
		</Canvas>
	);
}

export default ThemeCanvas;

interface ThemeCanvasProps {
	handleSkyboxIntensity: (intensity: number) => void;
	handleIsDay: (isDay: boolean) => void;
	isDay: boolean;
}
