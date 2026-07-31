let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  return audioContext;
}

function createImpulseResponse(ctx, duration = 2.2, decay = 2.6) {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * duration;
  const impulse = ctx.createBuffer(2, length, sampleRate);

  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel);

    for (let i = 0; i < length; i++) {
      const t = i / length;
      data[i] =
        (Math.random() * 2 - 1) *
        Math.pow(1 - t, decay) *
        0.45;
    }
  }

  return impulse;
}

export function playShipHorn() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  /*
    Master envelope
  */
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.42, now + 0.18);
  master.gain.setValueAtTime(0.42, now + 0.55);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 2.85);

  /*
    Low-pass filter makes it feel large and distant.
  */
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(680, now);
  lowpass.frequency.exponentialRampToValueAtTime(420, now + 2.6);
  lowpass.Q.setValueAtTime(0.8, now);

  /*
    Gentle compressor prevents harsh clipping.
  */
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-18, now);
  compressor.knee.setValueAtTime(18, now);
  compressor.ratio.setValueAtTime(4, now);
  compressor.attack.setValueAtTime(0.08, now);
  compressor.release.setValueAtTime(0.35, now);

  /*
    Reverb/echo tail.
  */
  const convolver = ctx.createConvolver();
  convolver.buffer = createImpulseResponse(ctx, 2.4, 2.8);

  const dryGain = ctx.createGain();
  dryGain.gain.setValueAtTime(0.86, now);

  const wetGain = ctx.createGain();
  wetGain.gain.setValueAtTime(0.18, now);

  lowpass.connect(compressor);
  compressor.connect(dryGain);
  compressor.connect(convolver);

  dryGain.connect(master);
  convolver.connect(wetGain);
  wetGain.connect(master);

  master.connect(ctx.destination);

  /*
    Layered horn tones:
    - fundamental
    - fifth-ish overtone
    - low sub layer
    Slight detuning makes it more organic.
  */
  const tones = [
    {
      frequency: 82.4,
      type: "sawtooth",
      gain: 0.58,
      detune: -7,
    },
    {
      frequency: 110,
      type: "triangle",
      gain: 0.32,
      detune: 4,
    },
    {
      frequency: 164.8,
      type: "sine",
      gain: 0.2,
      detune: -3,
    },
    {
      frequency: 55,
      type: "sine",
      gain: 0.18,
      detune: 0,
    },
  ];

  tones.forEach((tone, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = tone.type;
    osc.frequency.setValueAtTime(tone.frequency, now);

    /*
      Slight downward pitch drift gives a real horn feel.
    */
    osc.frequency.exponentialRampToValueAtTime(
      tone.frequency * 0.965,
      now + 2.4
    );

    osc.detune.setValueAtTime(tone.detune, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(
      tone.gain,
      now + 0.14 + index * 0.025
    );
    gain.gain.setValueAtTime(tone.gain, now + 0.65);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.75);

    osc.connect(gain);
    gain.connect(lowpass);

    osc.start(now);
    osc.stop(now + 2.9);
  });
}

export function playSonarPing() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const delay = ctx.createDelay();
  const feedback = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.22, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);

  delay.delayTime.setValueAtTime(0.18, now);
  feedback.gain.setValueAtTime(0.22, now);

  osc.connect(gain);
  gain.connect(ctx.destination);

  gain.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.7);
}