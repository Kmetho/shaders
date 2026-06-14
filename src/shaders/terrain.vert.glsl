uniform float uTime;

void main() {
    vec3 pos = position;
    pos.y += sin(pos.x * 2.0 + uTime);   // a wave travelling along x
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

}