export interface Vec2 {
  x: number;
  y: number;
}

export interface PointerTracker {
  readonly smoothed: Vec2;
  update: () => void;
  dispose: () => void;
}

export function initInteraction(lerpFactor = 0.05): PointerTracker {
  const target: Vec2 = { x: 0, y: 0 };
  const smoothed: Vec2 = { x: 0, y: 0 };

  const onMove = (e: MouseEvent): void => {
    target.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.y = -((e.clientY / window.innerHeight) * 2 - 1);
  };

  window.addEventListener("mousemove", onMove);

  const update = (): void => {
    smoothed.x += (target.x - smoothed.x) * lerpFactor;
    smoothed.y += (target.y - smoothed.y) * lerpFactor;
  };

  const dispose = (): void => {
    window.removeEventListener("mousemove", onMove);
  };

  return { smoothed, update, dispose };
}
