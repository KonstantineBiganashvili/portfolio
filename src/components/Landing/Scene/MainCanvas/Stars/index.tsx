import React, { forwardRef, useMemo } from 'react';
import { Points } from 'three';
import { generateStarsData } from '@/utils/stars';
import StarFieldGeometry from './StarFieldGeometry';
import StarFieldMaterial from './StarFieldMaterial';

const Stars = forwardRef<Points, StarsProps>(
	(
		{
			radius = 100,
			depth = 50,
			count = 5000,
			factor = 4,
			saturation = 0,
			fade = false,
			speed = 1,
			brightness = 1,
		},
		ref,
	) => {
		const { positions, colors, sizes } = useMemo(
			() => generateStarsData(count, radius, depth, saturation, factor),
			[count, radius, depth, saturation, factor],
		);

		return (
			<points ref={ref}>
				<StarFieldGeometry
					positions={positions}
					colors={colors}
					sizes={sizes}
				/>
				<StarFieldMaterial fade={fade} brightness={brightness} speed={speed} />
			</points>
		);
	},
);

Stars.displayName = 'Stars';

export default Stars;

interface StarsProps {
	radius?: number;
	depth?: number;
	count?: number;
	factor?: number;
	saturation?: number;
	fade?: boolean;
	speed?: number;
	brightness?: number;
}
