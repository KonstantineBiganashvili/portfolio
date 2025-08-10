const fragmentShader = `
uniform sampler2D pointTexture;
uniform float fade;
uniform float brightness;
varying vec3 vColor;
void main() {
  float opacity = 1.0;
  if (fade == 1.0) {
    float d = distance(gl_PointCoord, vec2(0.5, 0.5));
    opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
  }
  vec3 col = vColor * brightness;
  gl_FragColor = vec4(col, opacity);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export default fragmentShader;
