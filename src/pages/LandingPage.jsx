import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className="landing-container">
            {/* Navbar */}
            <nav className="landing-nav">
                <div className="landing-nav-content container">
                    <div className="logo">
                        <span className="logo-icon">📊</span>
                        <span className="logo-text">Nexus Analytics</span>
                    </div>
                    <div className="nav-links">
                        <Link to="/login" className="btn sm">Sign In</Link>
                        <Link to="/login" className="btn primary sm">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero container">
                <div className="hero-content">
                    <div className="badge-glow">Now with Predictive Analytics</div>
                    <h1 className="hero-title">
                        Unleash Your <span className="text-gradient">Data's Potential</span>
                    </h1>
                    <p className="hero-subtitle">
                        I specialize in premium web development, focuses on building secure, practical MVPs with clean workflows. Transform raw metrics into actionable foresight.
                    </p>
                    <div className="hero-actions">
                        <Link to="/login" className="btn primary lg">Start Free Trial</Link>
                        <button className="btn lg secondary">Watch Demo</button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-val">10k+</span>
                            <span className="stat-label">Daily Events</span>
                        </div>
                        <div className="divider" />
                        <div className="stat-item">
                            <span className="stat-val">99.9%</span>
                            <span className="stat-label">Uptime</span>
                        </div>
                        <div className="divider" />
                        <div className="stat-item">
                            <span className="stat-val">24/7</span>
                            <span className="stat-label">Support</span>
                        </div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="glass-card-preview">
                        <div className="inner-visual">
                            {/* Visual representation of a chart or dashboard element */}
                            <div className="visual-bar" style={{ height: '40%' }}></div>
                            <div className="visual-bar" style={{ height: '70%', background: 'var(--primary)' }}></div>
                            <div className="visual-bar" style={{ height: '55%' }}></div>
                            <div className="visual-bar" style={{ height: '85%', background: 'var(--primary)' }}></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="features container">
                <div className="section-header">
                    <h2>Everything you need to <span className="text-gradient">Scale</span></h2>
                    <p>Powerful tools designed for teams that move fast.</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="f-icon">⚡</div>
                        <h3>Real-time Reporting</h3>
                        <p>Stream live data directly to your dashboard with zero latency.</p>
                    </div>
                    <div className="feature-card">
                        <div className="f-icon">🔮</div>
                        <h3>Predictive Modeling</h3>
                        <p>Built-in linear regression to forecast your next 30 days of growth.</p>
                    </div>
                    <div className="feature-card">
                        <div className="f-icon">🔒</div>
                        <h3>Enterprise Security</h3>
                        <p>Supabase-powered auth and RLS ensures your data stays your data.</p>
                    </div>
                    <div className="feature-card">
                        <div className="f-icon">📑</div>
                        <h3>Smart Export</h3>
                        <p>Export any filtered view to professional CSV reports in one click.</p>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="trust">
                <div className="container">
                    <p className="trust-label">Trusted by leading data-driven teams</p>
                    <div className="logo-cloud">
                        <span className="cloud-logo">Vercel</span>
                        <span className="cloud-logo">Supabase</span>
                        <span className="cloud-logo">PostgreSQL</span>
                        <span className="cloud-logo">React</span>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta container">
                <div className="cta-card">
                    <h2>Ready to see your business in <span className="text-gradient">High Def?</span></h2>
                    <p>Join over 500+ businesses using Nexus to drive their decisions.</p>
                    <Link to="/login" className="btn primary lg">Get Started Now</Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo">
                            <span className="logo-icon">📊</span>
                            <span className="logo-text">Nexus</span>
                        </div>
                        <p>Advanced Analytics for the modern web.</p>
                    </div>
                    <div className="footer-links">
                        <div className="f-col">
                            <h4>Connect</h4>
                            <a href="https://www.linkedin.com/in/mizan-shaikh-b36607394" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://www.instagram.com/19.mizan" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://x.com/mizan__shaikh96" target="_blank" rel="noopener noreferrer">Twitter</a>
                        </div>
                        <div className="f-col">
                            <h4>Contact</h4>
                            <a href="mailto:shaikhmizan120@gmail.com">Email Me</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    &copy; {new Date().getFullYear()} Mizan Shaikh &bull; Nexus Analytics.
                </div>
            </footer>
        </div>
    )
}
