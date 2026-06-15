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
    uBass: { value: 0 },
    uMid: { value: 0 },
    uHigh: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  },
});

export const terrainMaterial = material;

export const terrainMesh = new THREE.Mesh(terrain, material);
