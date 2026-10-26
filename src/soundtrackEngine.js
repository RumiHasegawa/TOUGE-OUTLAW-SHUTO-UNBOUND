/**
 * HARDCORE REMIX SOUNDTRACK & BGM SYNTH ENGINE
 * Inspired by Free Fire x BTS (GEN FF), K-Pop Trap, Hardstyle, and Phonk Drift
 * Fully synthesized with Web Audio API - 100% Offline, Zero external lag, APK-safe
 */

class HardcoreMusicEngine {
    constructor() {
        this.ctx = null;
        this.currentTrack = null;
        this.isPlaying = false;
        this.bpm = 150;
        this.step = 0;
        this.timer = null;
        this.volume = 0.45;
        this.currentMood = "menu"; // menu, garage, carlot, freeroam, sprint, canyon
    }

    initAudio() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Generator Kick Drum Hardstyle / Trap Khas Gen FF (Distorted 909 Kick)
    playHardcoreKick(time) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, time);
        osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);

        gain.gain.setValueAtTime(this.volume * 1.5, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.25);
    }

    // Hi-Hat & Snare Trap K-Pop Roll
    playTrapSnare(time, isRoll = false) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = isRoll ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(isRoll ? 380 : 220, time);

        gain.gain.setValueAtTime(this.volume * (isRoll ? 0.4 : 0.8), time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + (isRoll ? 0.05 : 0.14));

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.14);
    }

    // Synth Melody Lead (Phonk / K-Pop Hardcore Synth Lead)
    playLeadNote(freq, time, dur) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(this.volume * 0.7, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + dur);
    }

    // Ganti Mood Musik Sesuai State Permainan
    setMusicMood(mood) {
        this.currentMood = mood;
        this.step = 0;

        const trackData = {
            "menu": { title: "GEN-OUTLAW x BANGTAN-X (HARDSTYLE PHONK REMIX)", bpm: 155 },
            "garage": { title: "IDOL-APEX // HYPER-BASS TRAP REMIX", bpm: 140 },
            "carlot": { title: "SHIBUYA BOUNCE // K-SPEED FUTURE REMIX", bpm: 135 },
            "freeroam": { title: "MIDNIGHT CIPHER // K-TRAP DRIFT PHONK", bpm: 150 },
            "sprint": { title: "REDLINE OVERDRIVE // HARDCORE BASS CLASH", bpm: 165 },
            "canyon": { title: "TOUGE VALKYRIE // PSY-SPEEDCORE RUSH", bpm: 175 }
        };

        const current = trackData[mood] || trackData["menu"];
        this.bpm = current.bpm;

        // Update HUD OSD Musik di Game
        const musicOsd = document.getElementById('music-track-title');
        if (musicOsd) {
            musicOsd.innerText = `🎵 NOW PLAYING: ${current.title} [${current.bpm} BPM]`;
        }
    }

    startBgmLoop() {
        this.initAudio();
        if (this.isPlaying) return;
        this.isPlaying = true;

        const intervalMs = (60 / this.bpm / 4) * 1000; // 16th note steps

        // Melodi Khas Free Fire x BTS "Gen FF" / K-Pop High Energy Phonk
        const GEN_FF_MELODY = [
            440, 0, 440, 523, 0, 587, 0, 659, // A4, C5, D5, E5 (Anthemic Hook)
            659, 587, 523, 440, 392, 0, 440, 0,
            440, 440, 523, 0, 659, 0, 783, 659,
            587, 0, 523, 0, 440, 0, 0, 0
        ];

        // Melodi Touge Canyon Duel (Lebih Cepat & Agresif)
        const CANYON_MELODY = [
            587, 587, 0, 587, 698, 0, 783, 0,
            880, 0, 783, 698, 587, 0, 523, 0,
            587, 698, 783, 880, 1046, 0, 880, 0,
            783, 698, 587, 523, 440, 0, 587, 0
        ];

        this.timer = setInterval(() => {
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const currentStep = this.step % 32;

            // Kick drum Hardstyle di setiap beat ke 1, 5, 9, 13 (4-on-the-floor)
            if (this.currentMood === 'canyon' || this.currentMood === 'sprint') {
                if (currentStep % 4 === 0) {
                    this.playHardcoreKick(now);
                }
            } else {
                // Trap Kick ala Gen FF Free Fire
                if (currentStep === 0 || currentStep === 6 || currentStep === 10 || currentStep === 16 || currentStep === 22 || currentStep === 26) {
                    this.playHardcoreKick(now);
                }
            }

            // Snare Trap di beat ke 8 dan 24
            if (currentStep === 8 || currentStep === 24) {
                this.playTrapSnare(now);
            }

            // Snare roll cepat di akhir bar (step 28, 29, 30, 31)
            if (currentStep >= 28) {
                this.playTrapSnare(now, true);
            }

            // Lead Synth Melody
            const melody = (this.currentMood === 'canyon' || this.currentMood === 'sprint') ? CANYON_MELODY : GEN_FF_MELODY;
            const noteFreq = melody[currentStep];
            if (noteFreq > 0) {
                const dur = (this.currentMood === 'canyon') ? 0.12 : 0.22;
                this.playLeadNote(noteFreq, now, dur);
            }

            this.step++;
        }, intervalMs);
    }

    stopBgm() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.isPlaying = false;
    }

    stopBgmLoop() {
        this.stopBgm();
    }
}

// Global Music Engine Instance
const musicEngine = new HardcoreMusicEngine();
