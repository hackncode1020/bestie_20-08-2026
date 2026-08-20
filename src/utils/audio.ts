// Web Audio API Synthesizer for Zero-Asset Sound Effects & Lo-Fi Birthday Beats

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isLofiPlaying: boolean = false;
  private lofiInterval: number | null = null;
  private masterGain: GainNode | null = null;
  private lofiVolume: number = 0.6;
  private onLofiStateChange: ((isPlaying: boolean) => void) | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(1, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 1, this.ctx.currentTime);
    }
    if (muted && this.isLofiPlaying) {
      this.stopLofiMusic();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsLofiPlaying(): boolean {
    return this.isLofiPlaying;
  }

  public setLofiVolume(vol: number) {
    this.lofiVolume = Math.max(0, Math.min(1, vol));
  }

  public getLofiVolume(): number {
    return this.lofiVolume;
  }

  // Pop sound (balloons, clicks)
  public playPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  // Magic Sparkle Chimes
  public playSparkle() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.04;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, startTime + 0.3);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  // Curtains Theatrical Swoosh
  public playCurtainOpen() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    // Filtered noise swoosh + uplifting harp arpeggio
    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.6);
    filter.Q.value = 3;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();

    // Harp arpeggio chime
    const harpNotes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    harpNotes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + 0.15 + idx * 0.08;
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      noteGain.gain.setValueAtTime(0.12, startTime);
      noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  }

  // Mystic 🧿 Evil Eye Protection Gong & Aura Tone
  public playEvilEyeProtection() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    const freqs = [220, 330, 440, 660, 880];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.02, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.18 / (i + 1), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.3);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      osc.stop(ctx.currentTime + 1.3);
    });
  }

  // Party Horn Fanfare
  public playPartyFanfare() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    const chord = [392.00, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(freq * 1.01, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    });
  }

  // ==========================================
  // UPBEAT LO-FI BIRTHDAY BACKGROUND MUSIC ENGINE
  // ==========================================
  public toggleLofiMusic(onStateChange?: (isPlaying: boolean) => void) {
    if (onStateChange) this.onLofiStateChange = onStateChange;
    if (this.isLofiPlaying) {
      this.stopLofiMusic();
    } else {
      this.startLofiMusic();
    }
  }

  public startLofiMusic() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.masterGain) return;

    this.stopLofiMusic();
    this.isLofiPlaying = true;
    this.onLofiStateChange?.(true);

    // Lo-Fi Chord Progressions (Warm Rhodes Sound in C Major / F Major)
    // [Fmaj7 -> Cmaj7 -> Dm7 -> G7sus4] with gentle Happy Birthday melodies
    const chords = [
      { notes: [174.61, 261.63, 329.63, 392.00], bass: 87.31 },  // Fmaj7 (F, C, E, G)
      { notes: [130.81, 196.00, 246.94, 329.63], bass: 65.41 },  // Cmaj7 (C, G, B, E)
      { notes: [146.83, 220.00, 261.63, 349.23], bass: 73.42 },  // Dm7 (D, A, C, F)
      { notes: [196.00, 261.63, 293.66, 392.00], bass: 98.00 },  // G9/G7sus4
    ];

    // Melodic Lo-Fi lead motifs on top of chord changes
    const leadMotifs = [
      [261.63, 293.66, 329.63, 392.00], // Happy...
      [523.25, 440.00, 349.23, 329.63], // Birthday...
      [392.00, 349.23, 293.66, 261.63], // Bestie...
      [329.63, 392.00, 523.25, 659.25], // Cheers!
    ];

    let beat = 0;
    const stepDuration = 0.55; // Upbeat yet chill ~108 BPM

    const playLofiStep = () => {
      if (!this.isLofiPlaying || this.isMuted) return;
      const currentCtx = this.getContext();
      if (!currentCtx || !this.masterGain) return;

      const now = currentCtx.currentTime;
      const bar = Math.floor(beat / 4) % chords.length;
      const stepInBar = beat % 4;
      const chord = chords[bar];

      // 1. Warm Electric Piano (Rhodes) on beat 0 & 2
      if (stepInBar === 0 || stepInBar === 2) {
        chord.notes.forEach((freq, idx) => {
          const osc = currentCtx.createOscillator();
          const oscFilter = currentCtx.createBiquadFilter();
          const gain = currentCtx.createGain();

          osc.type = idx === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, now);

          // Subtle lo-fi warmth filter
          oscFilter.type = 'lowpass';
          oscFilter.frequency.setValueAtTime(1100, now);
          oscFilter.frequency.exponentialRampToValueAtTime(450, now + 1.2);

          gain.gain.setValueAtTime(0.09 * this.lofiVolume, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

          osc.connect(oscFilter);
          oscFilter.connect(gain);
          gain.connect(this.masterGain!);

          osc.start(now);
          osc.stop(now + 1.1);
        });

        // Sub Bass Sine
        const bassOsc = currentCtx.createOscillator();
        const bassGain = currentCtx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(chord.bass, now);
        bassGain.gain.setValueAtTime(0.18 * this.lofiVolume, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
        bassOsc.connect(bassGain);
        bassGain.connect(this.masterGain);
        bassOsc.start(now);
        bassOsc.stop(now + 1.0);
      }

      // 2. Upbeat Lo-Fi Drums (Kick on 0 & 2.5, Soft Snare/Clap on 1 & 3, Chill Hi-Hat on every beat)
      // Kick drum
      if (stepInBar === 0 || stepInBar === 2) {
        const kickOsc = currentCtx.createOscillator();
        const kickGain = currentCtx.createGain();
        kickOsc.frequency.setValueAtTime(140, now);
        kickOsc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
        kickGain.gain.setValueAtTime(0.22 * this.lofiVolume, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        kickOsc.connect(kickGain);
        kickGain.connect(this.masterGain);
        kickOsc.start(now);
        kickOsc.stop(now + 0.15);
      }

      // Snare / Rimshot on 1 & 3
      if (stepInBar === 1 || stepInBar === 3) {
        const snareNoise = currentCtx.createBufferSource();
        const bufferSize = currentCtx.sampleRate * 0.08;
        const buffer = currentCtx.createBuffer(1, bufferSize, currentCtx.sampleRate);
        const d = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) d[i] = Math.random() * 2 - 1;
        snareNoise.buffer = buffer;

        const snareFilter = currentCtx.createBiquadFilter();
        snareFilter.type = 'bandpass';
        snareFilter.frequency.setValueAtTime(1800, now);

        const snareGain = currentCtx.createGain();
        snareGain.gain.setValueAtTime(0.12 * this.lofiVolume, now);
        snareGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        snareNoise.connect(snareFilter);
        snareFilter.connect(snareGain);
        snareGain.connect(this.masterGain);
        snareNoise.start(now);
      }

      // Gentle Hi-hat tick
      const hat = currentCtx.createBufferSource();
      const hatBufSize = currentCtx.sampleRate * 0.025;
      const hatBuf = currentCtx.createBuffer(1, hatBufSize, currentCtx.sampleRate);
      const hd = hatBuf.getChannelData(0);
      for (let i = 0; i < hatBufSize; i++) hd[i] = Math.random() * 2 - 1;
      hat.buffer = hatBuf;

      const hatFilter = currentCtx.createBiquadFilter();
      hatFilter.type = 'highpass';
      hatFilter.frequency.setValueAtTime(6000, now);

      const hatGain = currentCtx.createGain();
      hatGain.gain.setValueAtTime(0.04 * this.lofiVolume, now);
      hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      hat.connect(hatFilter);
      hatFilter.connect(hatGain);
      hatGain.connect(this.masterGain);
      hat.start(now);

      // 3. Playful Lo-Fi Bell Melody note
      const motif = leadMotifs[bar];
      const leadNote = motif[stepInBar];
      if (leadNote) {
        const leadOsc = currentCtx.createOscillator();
        const leadGain = currentCtx.createGain();
        leadOsc.type = 'sine';
        leadOsc.frequency.setValueAtTime(leadNote, now);

        leadGain.gain.setValueAtTime(0.07 * this.lofiVolume, now);
        leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        leadOsc.connect(leadGain);
        leadGain.connect(this.masterGain);
        leadOsc.start(now);
        leadOsc.stop(now + 0.45);
      }

      beat = (beat + 1) % 64;
      this.lofiInterval = window.setTimeout(playLofiStep, stepDuration * 1000);
    };

    playLofiStep();
  }

  public stopLofiMusic() {
    this.isLofiPlaying = false;
    if (this.lofiInterval) {
      clearTimeout(this.lofiInterval);
      this.lofiInterval = null;
    }
    this.onLofiStateChange?.(false);
  }

  // Backwards compatibility
  public toggleBirthdayTune(onStateChange?: (isPlaying: boolean) => void) {
    this.toggleLofiMusic(onStateChange);
  }
}

export const sound = new SoundEngine();
