import * as THREE from "three";
import { MeshBasicMaterial } from "three";

const terrain = new THREE.PlaneGeometry(10, 10, 256, 256);
terrain.rotateX(-Math.PI / 2);

const material = new MeshBasicMaterial({ wireframe: true });

export const terrainMesh = new THREE.Mesh(terrain, material);
