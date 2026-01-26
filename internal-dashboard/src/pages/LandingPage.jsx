import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero-3d-chart.png'

export default function LandingPage() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])

    return (
        <div className={`nexus-landing ${mounted ? 'is-mounted' : ''}`}>
            {/* 1. Navbar */}
            <nav className="lp-nav">
                <div className="lp-container nav-flex">
                    <Link to="/" className="lp-logo">
                        <div className="logo-dot"></div>
                        <span>PURE<strong style={{ color: 'var(--primary)' }}>FLOW</strong></span>
                    </Link>
                    <Link to="/login" className="lp-btn-primary lp-sm">System Login</Link>
                </div>
            </nav>

            {/* 2. Hero */}
            <section className="lp-hero">
                <div className="lp-container lp-hero-grid">
                    <div className="hero-copy reveal" style={{ '--d': '0.1s' }}>
                        <div className="lp-badge">QUANTUM ENGINE v5.2</div>
                        <h1 className="hero-h1">Intelligent <br /><span className="lp-text-gradient">Data Alchemy.</span></h1>
                        <p className="hero-p">PureFlow is the definitive instrument for elite data cleaning. Absolute Obsidian physicality meets Lava-sharp precision.</p>
                        <div className="hero-actions">
                            <Link to="/login" className="lp-btn-primary">Initialize Access</Link>
                            <button className="lp-btn-ghost">Specifications</button>
                        </div>
                    </div>
                    <div className="hero-visual reveal" style={{ '--d': '0.3s' }}>
                        <div className="lp-clay-img-card">
                            <img src={heroImage} alt="PureFlow Intelligence" className="lp-hero-img" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Features */}
            <section className="lp-features">
                <div className="lp-container">
                    <div className="lp-section-head reveal" style={{ '--d': '0.1s' }}>
                        <h2 className="lp-h2">The Obsidian <span style={{ color: 'var(--primary)' }}>Core</span></h2>
                        <p>Meticulously engineered for high-octane business intelligence.</p>
                    </div>
                    <div className="lp-feature-grid">
                        {[
                            { title: 'Neural Scrub', desc: 'AI-driven duplicate removal with tensor precision.', icon: '🧠', color: 'var(--primary)' },
                            { title: 'Lava Sync', desc: 'Real-time data propagation across enterprise nodes.', icon: '⚡', color: '#B30000' },
                            { title: 'Void Guard', desc: 'Immutable security layers for high-stakes privacy.', icon: '🛡️', color: 'var(--primary)' }
                        ].map((f, i) => (
                            <div key={i} className="lp-feature-card reveal" style={{ '--d': `${0.2 + i * 0.1}s` }}>
                                <div className="lp-feature-icon" style={{ background: f.color }}>{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Footer */}
            <footer className="lp-footer">
                <div className="lp-container footer-flex">
                    <div className="footer-brand">
                        <div className="lp-logo">
                            <div className="logo-dot"></div>
                            <span>PUREFLOW</span>
                        </div>
                        <p>Redefining data clarity for the elite intelligence era.</p>
                    </div>
                    <div className="footer-links">
                        <div className="f-col">
                            <h4>Protocol</h4>
                            <Link to="/login">Dashboard</Link>
                            <Link to="/login">Intelligence</Link>
                        </div>
                    </div>
                </div>
                <div className="lp-container lp-footer-btm">
                    <span>Core Status: <span style={{ color: 'var(--primary)' }}>OPTIMAL</span></span>
                    <span>&copy; {new Date().getFullYear()} PureFlow Intelligence</span>
                </div>
            </footer>

            <style>{`
        /* Reset and Base */
        .nexus-landing { background: #050505; color: #F5F5F5; min-height: 100vh; overflow-x: hidden; font-family: 'Outfit', sans-serif; }
        .lp-container { max-width: 1400px; margin: 0 auto; padding: 0 60px; }
        .lp-text-gradient { background: linear-gradient(135deg, #FFF 20%, var(--primary) 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        
        /* Typography */
        .hero-h1 { font-family: 'Outfit', sans-serif; font-size: 84px; font-weight: 900; line-height: 1; margin-bottom: 24px; letter-spacing: -2px; }
        .hero-p { font-size: 20px; color: #808080; margin-bottom: 48px; max-width: 580px; line-height: 1.6; font-weight: 500; }
        .lp-h2 { font-family: 'Outfit', sans-serif; font-size: 56px; font-weight: 900; margin-bottom: 16px; letter-spacing: -1px; }
        
        /* Navigation */
        .lp-nav { padding: 40px 0; }
        .nav-flex { display: flex; justify-content: space-between; align-items: center; }
        .lp-logo { display: flex; align-items: center; gap: 14px; font-weight: 900; font-size: 24px; text-decoration: none; color: #FFF; letter-spacing: -1px; }
        .logo-dot { width: 20px; height: 20px; background: var(--primary); border-radius: 50%; box-shadow: 0 0 20px var(--primary); }
        
        /* Buttons */
        .lp-btn-primary { background: linear-gradient(145deg, var(--primary), var(--primary-dark)); color: #FFF; padding: 18px 48px; border-radius: 30px; font-weight: 800; text-decoration: none; display: inline-block; transition: all 0.3s; box-shadow: 10px 10px 30px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 1px; }
        .lp-btn-primary.lp-sm { padding: 12px 28px; font-size: 13px; border-radius: 20px; }
        .lp-btn-primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 20px 40px rgba(255,0,0,0.3); }
        .lp-btn-ghost { background: transparent; border: none; color: #808080; font-weight: 700; margin-left: 32px; cursor: pointer; border-bottom: 2px solid var(--primary); padding-bottom: 4px; transition: color 0.3s; }
        .lp-btn-ghost:hover { color: #FFF; }
        
        /* Hero */
        .lp-hero { padding: 60px 0 160px 0; }
        .lp-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .lp-badge { background: rgba(255, 0, 0, 0.1); color: var(--primary); font-size: 13px; font-weight: 900; letter-spacing: 2px; padding: 10px 20px; border-radius: 99px; display: inline-block; margin-bottom: 32px; border: 1px solid rgba(255, 0, 0, 0.2); }
        .lp-clay-img-card { padding: 16px; border-radius: 50px; background: #121212; box-shadow: 20px 20px 60px #000, -10px -10px 40px #1a1a1a; position: relative; }
        .lp-clay-img-card::after { content: ''; position: absolute; top:0; left:0; width:100%; height:100%; border-radius: 50px; box-shadow: inset 5px 5px 15px rgba(255,255,255,0.02), inset -5px -5px 15px rgba(0,0,0,0.5); pointer-events: none; }
        .lp-hero-img { width: 100%; border-radius: 40px; display: block; filter: brightness(1.1) drop-shadow(0 0 30px rgba(255,0,0,0.1)); }
        
        /* Features */
        .lp-features { padding: 140px 0; background: #080808; }
        .lp-section-head { text-align: center; margin-bottom: 100px; }
        .lp-feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        .lp-feature-card { background: #121212; padding: 60px 45px; border-radius: 40px; box-shadow: 15px 15px 40px #000; position: relative; transition: all 0.4s; border: 1px solid rgba(255,255,255,0.03); }
        .lp-feature-card:hover { transform: translateY(-10px); border-color: var(--primary); }
        .lp-feature-card::after { content: ''; position: absolute; top:0; left:0; width:100%; height:100%; border-radius: 40px; box-shadow: inset 4px 4px 10px rgba(255,255,255,0.01), inset -4px -4px 10px rgba(0,0,0,0.3); pointer-events: none; }
        .lp-feature-icon { width: 64px; height: 64px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 32px; box-shadow: 0 10px 20px rgba(0,0,0,0.4); }
        .lp-feature-card h3 { font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 800; margin-bottom: 16px; }
        .lp-feature-card p { color: #808080; font-size: 16px; line-height: 1.7; font-weight: 500; }
        
        /* Footer */
        .lp-footer { padding: 120px 0 60px 0; border-top: 1px solid #141414; }
        .footer-flex { display: flex; justify-content: space-between; margin-bottom: 80px; }
        .footer-brand p { color: #666; margin-top: 20px; font-size: 16px; max-width: 320px; font-weight: 500; }
        .f-col h4 { font-size: 14px; text-transform: uppercase; color: var(--primary); font-weight: 900; margin-bottom: 24px; display: block; letter-spacing: 1px; }
        .f-col a { color: #808080; text-decoration: none; display: block; margin-bottom: 12px; font-size: 15px; font-weight: 600; transition: color 0.3s; }
        .f-col a:hover { color: #FFF; }
        .lp-footer-btm { border-top: 1px solid #141414; padding-top: 60px; display: flex; justify-content: space-between; color: #666; font-size: 14px; font-weight: 600; }
        
        /* Reveal Animations */
        .reveal { opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: var(--d); }
        .is-mounted .reveal { opacity: 1; transform: translateY(0); }
      `}</style>
        </div>
    )
}
