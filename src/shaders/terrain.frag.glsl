varying float vElevation;
varying vec2 vUV;
uniform float uBass;
uniform float uMid;
uniform float uHigh;

void main() {
    vec3 deepColour = vec3(0.04, 0.04, 0.10);
    vec3 violetGlow = vec3(0.48, 0.37, 0.65);
    vec3 cyanPeak = vec3(0.31, 0.76, 0.97);

    float t = clamp(vElevation / 1.2, 0.0, 1.0);

    vec3 colour = mix(deepColour, violetGlow, t * (0.5 + uBass * 0.8));
    colour = mix(colour, cyanPeak, pow(t, 3.0) * uHigh * 1.5);

    float edgeFade = 1.0 - pow(abs(vUV.x - 0.5) * 2.0, 4.0);
    edgeFade *= 1.0 - pow(abs(vUV.y - 0.5) * 2.0, 4.0);
    colour *= edgeFade;

    colour += violetGlow * uMid * 0.08;

    gl_FragColor = vec4(colour, 1.0);
}
