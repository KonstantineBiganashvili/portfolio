import React from 'react';

interface MoonProps {
	width?: number | string;
	height?: number | string;
	className?: string;
}

function Moon({ width = 14, height = 14, className }: MoonProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<path
				d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'
				fill='currentColor'
			/>
		</svg>
	);
}

export default Moon;
