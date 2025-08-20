import * as THREE from 'three';

export function setupStaticCamera(camera: THREE.Camera) {
	camera.position.set(0, 6, 15);
	(camera as THREE.PerspectiveCamera).lookAt(0, 6, 0);
}
