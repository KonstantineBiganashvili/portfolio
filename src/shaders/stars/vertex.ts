const vertexShader = `
uniform float time;
attribute float size;
varying vec3 vColor;
void main() {
  vColor = color;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time));
  gl_Position = projectionMatrix * mvPosition;
}
`;

export default vertexShader;
