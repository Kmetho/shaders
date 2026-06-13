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

export async function initAudio(
  url = "/audio/audio.mp3",
): Promise<AudioSystem> {
  const context = new AudioContext();
  if (context.state === "suspended") {
    await context.resume();
  }

  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const decoded = await context.decodeAudioData(arrayBuffer);

  const source = context.createBufferSource();
  source.buffer = decoded;
  source.loop = true;

  const analyser = context.createAnalyser();
  analyser.fftSize = 256;
  analyser.smoothingTimeConstant = 0.85;

  source.connect(analyser);
  analyser.connect(context.destination);
  source.start();

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
