import React from 'react';
import './Dashboard.css'; // Optional: for custom styles

const PremiumDashboard = () => {
  return (
    <div className="premium-dashboard-container gradient-bg">
      <header className="dashboard-header hero-section">
        <img src="https://www.cry.org/wp-content/themes/cry/images/logo.png" alt="CRY Logo" className="cry-logo" />
        <h1 className="main-title">RY: Ensuring Happier Childhoods</h1>
        <h2 className="subtitle">Born of a dream to ensure happier childhoods for all children.</h2>
        <button className="cta-btn">Get Involved</button>
      </header>
      <section className="dashboard-mission modern-mission">
        <div className="mission-card">
          <h3>Our Mission</h3>
          <p>
            CRY works with the mission of <strong>“Taking responsibility, Mobilising potential and Inspiring collective action”</strong>.
          </p>
        </div>
      </section>
      <section className="dashboard-content premium-features modern-cards">
        <div className="dashboard-widget modern-widget">
          <h3>Welcome to your premium experience!</h3>
          <p>Access exclusive insights, reports, and tools to help make a difference.</p>
        </div>
        <div className="dashboard-stats modern-stats">
          <div className="stat-card modern-stat-card">
            <span className="stat-number">1M+</span>
            <span className="stat-label">Children Helped</span>
          </div>
          <div className="stat-card modern-stat-card">
            <span className="stat-number">500+</span>
            <span className="stat-label">Projects Supported</span>
          </div>
          <div className="stat-card modern-stat-card">
            <span className="stat-number">100K+</span>
            <span className="stat-label">Volunteers</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumDashboard;