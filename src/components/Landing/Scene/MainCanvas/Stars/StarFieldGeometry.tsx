import React from 'react';

const StarFieldGeometry: React.FC<StarFieldGeometryProps> = ({
	positions,
	colors,
	sizes,
}) => {
	return (
		<bufferGeometry>
			<bufferAttribute attach='attributes-position' args={[positions, 3]} />
			<bufferAttribute attach='attributes-color' args={[colors, 3]} />
			<bufferAttribute attach='attributes-size' args={[sizes, 1]} />
		</bufferGeometry>
	);
};

export default StarFieldGeometry;

interface StarFieldGeometryProps {
	positions: Float32Array;
	colors: Float32Array;
	sizes: Float32Array;
}