// Sound Manager - Handles all UI sounds with mute toggle
class SoundManagerClass {
    constructor() {
        this.sounds = {};
        this.isMuted = localStorage.getItem('portfolioSoundMuted') === 'true';
        this.isInitialized = false;
        this.volume = 0.3;

        // Sound definitions with base64 encoded minimal sounds
        this.soundDefinitions = {
            hover: { frequency: 800, duration: 0.05, type: 'sine' },
            click: { frequency: 600, duration: 0.08, type: 'square' },
            whoosh: { frequency: 400, duration: 0.15, type: 'sine', sweep: true },
            success: { frequency: 880, duration: 0.2, type: 'sine' },
            pop: { frequency: 1200, duration: 0.03, type: 'sine' },
            transition: { frequency: 300, duration: 0.25, type: 'triangle', sweep: true },
        };

        this.audioContext = null;
    }

    init() {
        if (this.isInitialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.isInitialized = true;
        } catch {
            console.warn('Web Audio API not supported');
        }
    }

    // Generate sound using Web Audio API (no external files needed)
    playSound(soundName) {
        if (this.isMuted || !this.isInitialized) return;

        const sound = this.soundDefinitions[soundName];
        if (!sound || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.type = sound.type;
            oscillator.frequency.setValueAtTime(sound.frequency, this.audioContext.currentTime);

            if (sound.sweep) {
                oscillator.frequency.exponentialRampToValueAtTime(
                    sound.frequency * 0.5,
                    this.audioContext.currentTime + sound.duration
                );
            }

            gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                this.audioContext.currentTime + sound.duration
            );

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + sound.duration);
        } catch {
            // Silently fail if audio context is suspended
        }
    }

    hover() {
        this.playSound('hover');
    }

    click() {
        this.playSound('click');
    }

    whoosh() {
        this.playSound('whoosh');
    }

    success() {
        this.playSound('success');
    }

    pop() {
        this.playSound('pop');
    }

    transition() {
        this.playSound('transition');
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('portfolioSoundMuted', this.isMuted.toString());

        if (!this.isMuted) {
            this.pop();
        }

        return this.isMuted;
    }

    setMuted(muted) {
        this.isMuted = muted;
        localStorage.setItem('portfolioSoundMuted', muted.toString());
    }

    getMuted() {
        return this.isMuted;
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
}

// Singleton instance
const SoundManager = new SoundManagerClass();

export default SoundManager;
