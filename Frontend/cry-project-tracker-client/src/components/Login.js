import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Add your login logic here
      console.log('Login attempt:', formData);
    }, 2000);
  };

  return (
    <div className="login-container">
      {/* Background decoration */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      <div className="login-content">
        {/* Left side - Welcome section */}
        <div className="login-welcome">
          <div className="welcome-content">
            <div className="logo-section">
              <div className="logo-circle">
                <span className="logo-text">C R Y</span>
              </div>
              <h1>Welcome Back!</h1>
              <p>Ready to continue making a difference in children's lives?</p>
            </div>
            
            <div className="illustration-section">
              <div className="kids-illustration">
                <div className="kid kid-1">👧</div>
                <div className="kid kid-2">👦</div>
                <div className="kid kid-3">👧</div>
                <div className="kid kid-4">👦</div>
              </div>
              <div className="hearts">
                <span className="heart">❤️</span>
                <span className="heart">💙</span>
                <span className="heart">💚</span>
                <span className="heart">💛</span>
              </div>
            </div>

            <div className="features">
              <div className="feature">
                <span className="feature-icon">📚</span>
                <span>Track Education Projects</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🏥</span>
                <span>Monitor Health Programs</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💧</span>
                <span>Water & Sanitation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <div className="form-header">
              <h2>Sign In</h2>
              <p>Access your project dashboard</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  <span className="label-icon">📧</span>
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                  <span className="input-decoration">✨</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <span className="label-icon">🔒</span>
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                  <span className="input-decoration">🌟</span>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span className="checkmark">✅</span>
                  Remember me
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>

              <button 
                type="submit" 
                className={`login-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner">🔄</span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <span className="button-icon">🚀</span>
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-login">
              <button className="social-button google">
                <span className="social-icon">🔍</span>
                Continue with Google
              </button>
              <button className="social-button microsoft">
                <span className="social-icon">🪟</span>
                Continue with Microsoft
              </button>
            </div>

            <div className="signup-link">
              <p>
                Don't have an account? 
                <a href="#" className="signup-text"> Sign up here</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="bottom-decoration">
        <div className="grass"></div>
        <div className="flowers">
          <span className="flower">🌸</span>
          <span className="flower">🌻</span>
          <span className="flower">🌺</span>
          <span className="flower">🌼</span>
        </div>
      </div>
    </div>
  );
};

export default Login; 