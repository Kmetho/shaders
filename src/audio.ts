export interface AudioBands {
  bass: number;
  mid: number;
  high: number;
}

export interface AudioSystem {
  analyser: AnalyserNode;
  getBands: () => AudioBands;
}

function average(data: Uint8Array, start: number, end: number): number {
  let sum = 0;
  for (let i = start; i < end; i++) {
    sum += data[i];
  }
  return sum / (end - start) / 255;
}

export async function initAudio(): Promise<AudioSystem> {
  const context = new AudioContext();
  if (context.state === "suspended") {
    await context.resume();
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
    },
  });

  const source = context.createMediaStreamSource(stream);

  const analyser = context.createAnalyser();
  analyser.fftSize = 256;
  analyser.smoothingTimeConstant = 0.85;

  source.connect(analyser);

  const data = new Uint8Array(analyser.frequencyBinCount);

  const getBands = (): AudioBands => {
    analyser.getByteFrequencyData(data);
    return {
      bass: average(data, 0, 8),
      mid: average(data, 8, 48),
      high: average(data, 48, 128),
    };
  };

  return { analyser, getBands };
}
