import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>C R Y</h2>
          </div>
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#impact">Impact</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Empowering Communities Through Technology</h1>
          <p>Track and manage impactful projects that make a difference in people's lives</p>
          <button className="cta-button">Get Started</button>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
            alt="Community collaboration"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>About Our Mission</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                We are dedicated to creating positive change through innovative project management 
                and community engagement. Our platform helps NGOs and community organizations 
                track their impact and deliver meaningful results.
              </p>
              <div className="stats">
                <div className="stat">
                  <h3>500+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat">
                  <h3>50K+</h3>
                  <p>Lives Impacted</p>
                </div>
                <div className="stat">
                  <h3>100+</h3>
                  <p>Partner Organizations</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Team collaboration"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2>Our Active Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80" 
                alt="Education project"
              />
              <div className="project-content">
                <h3>Education for All</h3>
                <p>Providing quality education to underprivileged children in rural areas</p>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '75%'}}></div>
                  </div>
                  <span>75% Complete</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Healthcare project"
              />
              <div className="project-content">
                <h3>Healthcare Access</h3>
                <p>Improving healthcare access in remote communities</p>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '60%'}}></div>
                  </div>
                  <span>60% Complete</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80" 
                alt="Clean water project"
              />
              <div className="project-content">
                <h3>Clean Water Initiative</h3>
                <p>Bringing clean drinking water to communities in need</p>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '90%'}}></div>
                  </div>
                  <span>90% Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="impact">
        <div className="container">
          <h2>Our Impact</h2>
          <div className="impact-content">
            <div className="impact-stories">
              <div className="story">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Success story"
                />
                <div className="story-content">
                  <h3>Sarah's Story</h3>
                  <p>"Thanks to the education program, I was able to complete my studies and now I'm helping other children in my community."</p>
                </div>
              </div>
            </div>
            <div className="impact-numbers">
              <div className="impact-stat">
                <h3>95%</h3>
                <p>Project Success Rate</p>
              </div>
              <div className="impact-stat">
                <h3>25</h3>
                <p>Communities Served</p>
              </div>
              <div className="impact-stat">
                <h3>10K+</h3>
                <p>Volunteer Hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Get Involved</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Join Our Mission</h3>
              <p>Ready to make a difference? Get in touch with us to learn how you can contribute to our projects.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="icon">📧</span>
                  <span>info@projecttracker.org</span>
                </div>
                <div className="contact-item">
                  <span className="icon">📞</span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <span className="icon">📍</span>
                  <span>123 Community St, City, Country</span>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message"></textarea>
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>C R Y </h3>
              <p>Empowering communities through technology and collaboration.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Instagram</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Project Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
