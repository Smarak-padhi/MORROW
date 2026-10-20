/**
 * Procedural Web Audio Engine for MORROW
 * Adheres to:
 * - game-audio skill: Audio category hierarchy, procedural synthesis, zero external mp3s
 * - web-games skill: Strict user gesture activation requirement, graceful suspend/resume
 * - DESIGN_SYSTEM.md: Default muted state, never autoplay audible sound
 */

export type AudioEffect = 'chime' | 'stitch' | 'bell' | 'gear' | 'tock';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private lastBellTime: number = 0;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public requestAudioActivation(): Promise<boolean> {
    const ctx = this.getContext();
    if (!ctx) return Promise.resolve(false);
    if (ctx.state === 'suspended') {
      return ctx.resume().then(() => ctx.state === 'running').catch(() => false);
    }
    return Promise.resolve(ctx.state === 'running');
  }

  public play(effect: AudioEffect, muted: boolean): void {
    if (muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    switch (effect) {
      case 'chime': {
        // High crystalline pentatonic glockenspiel
        const freqs = [523.25, 659.25, 783.99, 1046.5];
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + idx * 0.08);

          gain.gain.setValueAtTime(0.08, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

          osc.connect(gain).connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.45);
        });
        break;
      }

      case 'stitch': {
        // Snip/thread friction noise burst
        const bufferSize = Math.floor(ctx.sampleRate * 0.04);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1800, now);
        filter.Q.setValueAtTime(3, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        whiteNoise.connect(filter).connect(gain).connect(ctx.destination);
        whiteNoise.start(now);
        break;
      }

      case 'bell': {
        // Debounce counter bell by 250ms to prevent double-clicks
        if (now - this.lastBellTime < 0.25) return;
        this.lastBellTime = now;

        // Rich Handcrafted Brass Shop Counter Bell Synthesis:
        // 1. Strike transient: Tiny high-frequency metallic strike tap
        const strikeOsc = ctx.createOscillator();
        const strikeGain = ctx.createGain();
        strikeOsc.type = 'triangle';
        strikeOsc.frequency.setValueAtTime(2400, now);
        strikeOsc.frequency.exponentialRampToValueAtTime(800, now + 0.02);
        strikeGain.gain.setValueAtTime(0.18, now);
        strikeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
        strikeOsc.connect(strikeGain).connect(ctx.destination);
        strikeOsc.start(now);
        strikeOsc.stop(now + 0.03);

        // 2. Brass cup inharmonic modes (Fundamental, minor 3rd, quint, octave, tierce)
        const partials = [
          { freq: 587.33, gain: 0.14, decay: 1.8 }, // D5 (fundamental)
          { freq: 700.0, gain: 0.09, decay: 1.5 },  // inharmonic body
          { freq: 880.0, gain: 0.08, decay: 1.4 },  // A5 fifth
          { freq: 1174.66, gain: 0.06, decay: 1.1 }, // D6 octave
          { freq: 1760.0, gain: 0.03, decay: 0.8 },  // high shimmer
        ];

        partials.forEach(({ freq, gain: pGain, decay }) => {
          const osc = ctx.createOscillator();
          const gNode = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gNode.gain.setValueAtTime(pGain, now);
          gNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

          osc.connect(gNode).connect(ctx.destination);
          osc.start(now);
          osc.stop(now + decay + 0.05);
        });
        break;
      }

      case 'gear': {
        // Mechanical clock cog click (square blip 240Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.linearRampToValueAtTime(180, now + 0.05);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
        break;
      }

      case 'tock': {
        // Soft clock ticking wood block
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }
    }
  }
}

export const sound = new SoundEngine();
