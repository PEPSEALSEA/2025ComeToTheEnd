"use client";

import { useState, useEffect } from "react";
import { Sparkles, PartyPopper } from "lucide-react";

export default function Home() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isNewYear: false,
    });

    useEffect(() => {
        // Target: Jan 1, 2026 00:00:00 UTC+7
        const targetDate = new Date("2026-01-01T00:00:00+07:00").getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isNewYear: true });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds, isNewYear: false });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (timeLeft.isNewYear) {
        return (
            <main className="hero">
                <div className="premium-card floating">
                    <PartyPopper className="gradient-text" size={80} style={{ marginBottom: '2rem' }} />
                    <h1 className="gradient-text">HAPPY NEW YEAR</h1>
                    <h1 style={{ color: '#fff', marginTop: '-1rem' }}>2026</h1>
                    <p className="subtitle" style={{ marginTop: '1rem' }}>The future is here.</p>
                    <button className="btn" onClick={() => window.location.reload()}>Celebrate Again</button>
                </div>
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

                <p style={{ marginTop: '2rem', color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>
                    "The best is yet to come."
                </p>
            </div>
        </main>
    );
}
