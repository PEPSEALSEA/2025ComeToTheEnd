"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Sparkles, PartyPopper, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isNewYear: false,
    });
    const [isDebug, setIsDebug] = useState(false);
    const [isAudioEnabled, setIsAudioEnabled] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fireworksIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Initialize Audio
    useEffect(() => {
        // High quality firework/celebration sound
        const audio = new Audio("https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Fireworks&filename=mt/MTI0OTA0MTExMjQ5MzE0_0_2be4p_2be7v6Q.mp3");
        audio.loop = true;
        audioRef.current = audio;
        return () => {
            audio.pause();
            if (fireworksIntervalRef.current) clearInterval(fireworksIntervalRef.current);
        };
    }, []);

    const triggerFireworks = useCallback(() => {
        // Initial Massive Burst
        const scalar = 4;
        const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10z' });

        confetti({
            particleCount: 150,
            spread: 180,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
            shapes: [triangle, 'circle', 'square'],
            scalar
        });

        // 5 Minutes of Continuous Fireworks
        const duration = 5 * 60 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 60 * (timeLeft / duration);

            // Random multi-color explosions
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.2, 0.5) },
                colors: ['#ff0000', '#eeff00']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.2, 0.5) },
                colors: ['#0070f3', '#00d4ff']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.4, 0.6), y: randomInRange(0.1, 0.4) },
                colors: ['#ffffff', '#ff00ff']
            });
        }, 300);

        fireworksIntervalRef.current = interval;
    }, []);

    const handleCelebration = useCallback(() => {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isNewYear: true });
        triggerFireworks();
        if (isAudioEnabled && audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio barred", e));
        }
    }, [triggerFireworks, isAudioEnabled]);

    useEffect(() => {
        const targetDate = new Date("2026-01-01T00:00:00+07:00").getTime();

        const timer = setInterval(() => {
            const now = isDebug ? targetDate - 5000 : new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(timer);
                if (!timeLeft.isNewYear) {
                    handleCelebration();
                }
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds, isNewYear: false });
        }, 1000);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Pause" || e.keyCode === 19) setIsDebug(prev => !prev);
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearInterval(timer);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isDebug, handleCelebration, timeLeft.isNewYear]);

    const toggleAudio = () => {
        setIsAudioEnabled(prev => !prev);
        if (isAudioEnabled && audioRef.current) audioRef.current.pause();
    };

    if (timeLeft.isNewYear) {
        return (
            <main className="hero">
                <div className="flash"></div>
                <div className="premium-card floating shake" style={{ border: '2px solid gold', padding: '4rem 2rem' }}>
                    <div style={{ position: 'relative' }}>
                        <PartyPopper className="gradient-text" size={120} style={{ marginBottom: '1rem' }} />
                        <Sparkles className="floating" size={40} style={{ position: 'absolute', top: -20, right: -20, color: 'gold' }} />
                    </div>
                    <h1 className="celebration-title gradient-text" style={{ fontSize: '10rem' }}>2026</h1>
                    <h2 style={{ fontSize: '4rem', color: '#fff', margin: '1rem 0', fontWeight: 900, textTransform: 'uppercase' }}>Happy New Year!</h2>
                    <p className="subtitle" style={{ letterSpacing: '12px', fontSize: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>Welcome to the Future</p>

                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem' }}>
                        <button className="btn" onClick={() => window.location.reload()}>Restart</button>
                        <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }} onClick={toggleAudio}>
                            {isAudioEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                        </button>
                    </div>
                </div>
                {isDebug && <div className="debug-overlay">DEBUG ACTIVE</div>}
            </main>
        );
    }

    return (
        <main className="hero">
            <div className="premium-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                    <Sparkles className="gradient-text" size={32} />
                    <span className="subtitle" style={{ margin: 0 }}>Countdown to New Year</span>
                </div>

                <h1 className="gradient-text">2026</h1>
                <p className="subtitle">Bangkok Time (UTC+7)</p>

                <div className="countdown-grid">
                    <div className="countdown-item">
                        <span className="countdown-value">{timeLeft.days.toString().padStart(2, '0')}</span>
                        <span className="countdown-label">Days</span>
                    </div>
                    <div className="countdown-item">
                        <span className="countdown-value">{timeLeft.hours.toString().padStart(2, '0')}</span>
                        <span className="countdown-label">Hours</span>
                    </div>
                    <div className="countdown-item">
                        <span className="countdown-value">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                        <span className="countdown-label">Minutes</span>
                    </div>
                    <div className="countdown-item">
                        <span className="countdown-value">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                        <span className="countdown-label">Seconds</span>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button className="btn" style={{ marginTop: 0 }} onClick={toggleAudio}>
                        {isAudioEnabled ? <><Volume2 size={20} style={{ marginRight: 8 }} /> Sound On</> : <><VolumeX size={20} style={{ marginRight: 8 }} /> Sound Off</>}
                    </button>

                    <button
                        className="btn"
                        style={{
                            marginTop: 0,
                            background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
                            boxShadow: '0 10px 30px rgba(255, 65, 108, 0.4)',
                            padding: '1rem 3rem',
                            fontSize: '1.25rem'
                        }}
                        onClick={handleCelebration}
                    >
                        START NEW YEAR
                    </button>

                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', width: '100%', textAlign: 'center', marginTop: '1rem' }}>
                        {isDebug ? "DEBUG: FAST FORWARD ACTIVE" : "Press 'Pause' key to jump near 0"}
                    </p>
                </div>
            </div>
            {isDebug && <div className="debug-overlay">DEBUG ACTIVE</div>}
        </main>
    );
}
