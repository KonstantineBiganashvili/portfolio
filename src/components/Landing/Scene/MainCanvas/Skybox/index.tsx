import React from 'react';
import { Environment } from '@react-three/drei';

const Skybox = React.memo(function Skybox({
	skybox,
	intensity = 1,
}: SkyboxProps) {
	return (
		<Environment
			files={skybox}
			background
			backgroundIntensity={intensity}
			resolution={4096}
			backgroundBlurriness={0}
		/>
	);
});

export default Skybox;

interface SkyboxProps {
	skybox: string;
	intensity?: number;
}
