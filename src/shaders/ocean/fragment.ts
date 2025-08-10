const fragmentShader = `
varying vec2 csm_vUv;

uniform float uTime;
uniform vec3  uColorDeep;
uniform vec3  uColorShallow;
uniform vec3  uRimColor;
uniform float uTextureSize;

vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
    const vec4 C = vec4(0.2113249, 0.3660254, -0.5773503, 0.02439024);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1,0) : vec2(0,1);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0) );
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.7928429 - 0.8537347 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    float ts        = 100.0 - uTextureSize;
    float nBase     = snoise(csm_vUv * (ts * 2.8) + sin(uTime * 0.3)) * 0.5 + 0.5;
    vec3  foam      = step(0.5,
                         smoothstep(0.08, 0.001, vec3(nBase)));
    float nWaves    = snoise(csm_vUv * ts + sin(uTime * -0.1)) * 0.5 + 0.5;
    float thresh    = 0.6 + 0.01 * sin(uTime * 2.0);
    vec3  waveMask  = step(0.5,
                         1.0 - (smoothstep(thresh+0.03, thresh+0.032, vec3(nWaves))
                              + smoothstep(thresh, thresh-0.01, vec3(nWaves))));
    vec3  combined  = min(waveMask + foam, 1.0);

    float depthT = smoothstep(0.0, 1.0, csm_vUv.y);
    vec3 waterColor = mix(uColorDeep, uColorShallow, depthT);

    float rimDist = length(csm_vUv - 0.5) * 1.414;
    float rimT    = smoothstep(0.7, 1.0, rimDist);
    waterColor = mix(waterColor, uRimColor, rimT * 0.3);

    vec3 finalCol = mix(waterColor, vec3(1.0), combined);
    float alpha   = mix(0.2, 1.0, foam.r);

    csm_FragColor = vec4(finalCol, alpha);
}
`;

export default fragmentShader;
