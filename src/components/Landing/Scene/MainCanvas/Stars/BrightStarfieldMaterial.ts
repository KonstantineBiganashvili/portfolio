import { ShaderMaterial } from 'three';
import vertexShader from '@/shaders/stars/vertex';
import fragmentShader from '@/shaders/stars/fragment';

export class BrightStarfieldMaterial extends ShaderMaterial {
	constructor() {
		super({
			uniforms: {
				time: { value: 0 },
				fade: { value: 1 },
				brightness: { value: 1 },
			},
			vertexShader,
			fragmentShader,
		});
	}
}
