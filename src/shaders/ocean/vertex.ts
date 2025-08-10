const vertexShader = `
precision highp float;

uniform float uTime;
uniform vec2  uDir1;
uniform float uSteepness1;
uniform float uWavelength1;
uniform float uSpeed1;
uniform vec2  uDir2;
uniform float uSteepness2;
uniform float uWavelength2;
uniform float uSpeed2;

varying vec2 csm_vUv;

vec3 gerstnerWave(
    vec3  pos,
    vec2  dir,
    float steepness,
    float wavelength,
    float speed,
    float time
) {
    float k = 6.283185 / wavelength;
    float f = dot(dir, pos.xz) * k + time * speed;
    float a = steepness / k;
    float c = cos(f);
    pos.x += dir.x * a * c;
    pos.z += dir.y * a * c;
    pos.y += a * sin(f);
    return pos;
}

void main() {
    csm_vUv = uv;
    vec3 pos = position;

    pos = gerstnerWave(pos, normalize(uDir1), uSteepness1, uWavelength1, uSpeed1, uTime);
    pos = gerstnerWave(pos, normalize(uDir2), uSteepness2, uWavelength2, uSpeed2, uTime);

    csm_Position = pos;
}
`;

export default vertexShader;
