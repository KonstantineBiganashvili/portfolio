export const mousePosition = { x: 0, y: 0 };

export function initializeMouseTracking() {
	const handleMouseMove = (event: MouseEvent) => {
		mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
		mousePosition.y = -((event.clientY / window.innerHeight) * 2 - 1);
	};

	window.addEventListener('mousemove', handleMouseMove);

	return () => window.removeEventListener('mousemove', handleMouseMove);
}
