# My super cool website

A dark, audio-reactive WebGL experience built with vanilla Three.js and custom GLSL shaders.

## Overview

- Custom vertex and fragment shaders drive the main terrain surface.
- Real-time audio analysis from WebAudio controls displacement, glow, and chromatic aberration.
- Post-processing includes chromatic aberration and a subtle vignette.
- Mouse movement adds a slow, dreamy influence to the terrain.
- Minimal UI.

## Tech stack

- Three.js
- Vite
- WebAudio API
- GLSL ES300
- TypeScript

## Key files

- `index.html` — entry HTML with title and start screen overlay
- `src/main.js` — application bootstrap and animation loop
- `src/audio.js` — audio context, analyser setup, and band extraction
- `src/interaction.js` — pointer tracking and smooth mouse lerping
- `src/scene.js` — renderer, camera, scene setup
- `src/terrain.js` — plane mesh and shader material
- `src/postprocessing.js` — effect composer and shader passes
- `src/shaders/terrain.vert.glsl` — terrain displacement vertex shader
- `src/shaders/terrain.frag.glsl` — terrain surface fragment shader
- `src/shaders/chromatic.frag.glsl` — chromatic aberration pass
- `src/shaders/vignette.frag.glsl` — final vignette pass

## Run locally

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open the local Vite URL in the browser

## Notes

- Audio playback is triggered by the user gesture on the start screen.
- The scene uses no Three.js lights; all lighting and color are handled in GLSL.
- The project avoids frameworks and shader helper libraries to keep the implementation custom and lightweight.
