"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Sparkles, PartyPopper, Music, Volume2, VolumeX } from "lucide-react";
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
        // Note: Using a public CDN firework sound
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2006/2006-preview.mp3");
        audio.loop = true;
        audioRef.current = audio;
        return () => {
            audio.pause();
            fireworksIntervalRef.current && clearInterval(fireworksIntervalRef.current);
        };
    }, []);

    const triggerFireworks = useCallback(() => {
        const duration = 5 * 60 * 1000; // 5 minutes
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Firework effect
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        fireworksIntervalRef.current = interval;
    }, []);

    useEffect(() => {
        // Target: Jan 1, 2026 00:00:00 UTC+7
        const targetDate = new Date("2026-01-01T00:00:00+07:00").getTime();

        const timer = setInterval(() => {
            const now = isDebug ? targetDate - 5000 : new Date().getTime(); // 5s before if debug
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isNewYear: true });
                triggerFireworks();
                if (isAudioEnabled && audioRef.current) {
                    audioRef.current.play().catch(e => console.log("Audio play blocked", e));
                }
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds, isNewYear: false });
        }, 1000);

        // Keyboard Debug Listener (Pause key)
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Pause" || e.keyCode === 19) {
                setIsDebug(prev => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearInterval(timer);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isDebug, isAudioEnabled, triggerFireworks]);

    const toggleAudio = () => {
        setIsAudioEnabled(prev => !prev);
        if (isAudioEnabled && audioRef.current) {
            audioRef.current.pause();
        }
    };

    if (timeLeft.isNewYear) {
        return (
            <main className="hero">
                <div className="flash"></div>
                <div className="premium-card floating shake" style={{ border: '2px solid gold' }}>
                    <PartyPopper className="gradient-text" size={100} style={{ marginBottom: '1rem' }} />
                    <h1 className="celebration-title gradient-text">2026</h1>
                    <h2 style={{ fontSize: '3rem', color: '#fff', margin: '1rem 0' }}>HAPPY NEW YEAR!</h2>
                    <p className="subtitle" style={{ letterSpacing: '8px' }}>THE FUTURE HAS ARRIVED</p>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button className="btn" onClick={() => window.location.reload()}>Celebrate Again</button>
                        <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }} onClick={toggleAudio}>
                            {isAudioEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                        </button>
                    </div>
                </div>
                {isDebug && <div className="debug-overlay">DEBUG MODE: ON (PAUSE KEY)</div>}
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

                <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <button className="btn" style={{ marginTop: 0 }} onClick={toggleAudio}>
                        {isAudioEnabled ? <><Volume2 size={20} style={{ marginRight: 8 }} /> Sound On</> : <><VolumeX size={20} style={{ marginRight: 8 }} /> Sound Off</>}
                    </button>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
                        {isDebug ? "DEBUG: FAST FORWARD ACTIVE" : "Press 'Pause' key to debug"}
                    </p>
                </div>
            </div>
            {isDebug && <div className="debug-overlay">DEBUG MODE: ON (PAUSE KEY)</div>}
        </main>
    );
}
