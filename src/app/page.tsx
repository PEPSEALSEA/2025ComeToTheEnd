import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
    return (
        <main className="hero">
            <div className="premium-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Sparkles className="gradient-text" style={{ color: '#00d4ff' }} size={48} />
                </div>
                <h1 className="gradient-text">2025</h1>
                <p>
                    Welcome to the final chapter of 2025. Experience the journey of the year's end with a premium interface and seamless interactions.
                </p>
                <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2rem auto 0' }}>
                    Get Started <ArrowRight size={20} />
                </button>
            </div>
        </main>
    );
}
