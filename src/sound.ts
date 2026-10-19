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
        // High, pure bell chime (660Hz -> 880Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      }

      case 'stitch': {
        // Crisp fabric stitch snip (noise-like short click)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }

      case 'bell': {
        // Workshop brass bell tone (520Hz with rich harmonic)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(520, now);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1040, now);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.7);
        osc2.stop(now + 0.7);
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
