import "./style.css";
import { initInteraction } from "./interaction";
import { initAudio, type AudioSystem, type AudioBands } from "./audio";
import { renderer, camera, scene } from "./scene";
import { terrainMaterial } from "./terrain";
import * as THREE from "three";

const startScreen = document.getElementById("start-screen")!;

const pointer = initInteraction();

let audio: AudioSystem | null = null;

async function begin(): Promise<void> {
  audio = await initAudio();
  startScreen.classList.add("hidden");
}

startScreen.addEventListener("click", () => void begin(), { once: true });

const SILENCE: AudioBands = { bass: 0, mid: 0, high: 0 };
const clock = new THREE.Timer();

function animate(): void {
  clock.update();
  requestAnimationFrame(animate);

  pointer.update();
  const bands = audio ? audio.getBands() : SILENCE;
  void bands;

  terrainMaterial.uniforms.uTime.value = clock.getElapsed();

  renderer.render(scene, camera);
}

animate();
