import * as THREE from "three";
import vertexShader from "./shaders/terrain.vert.glsl?raw";
import fragmentShader from "./shaders/terrain.frag.glsl?raw";

const terrain = new THREE.PlaneGeometry(10, 10, 256, 256);
terrain.rotateX(-Math.PI / 2);

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
  },
});

export const terrainMesh = new THREE.Mesh(terrain, material);
