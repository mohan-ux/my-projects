import React, { useState, useEffect } from "react";
import "../styles/sign-in.css";

const Signin = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMode = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsSignUpMode(!isSignUpMode);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  useEffect(() => {
    document.querySelector(".auth-wrapper").classList.add("mounted");
  }, []);

  return (
    <div className="auth-container">
      <div className={`auth-wrapper ${isSignUpMode ? "sign-up-mode" : ""}`}>
        {/* Background Particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>

        {/* Forms Container */}
        <div className="forms-container">
          {/* Sign In Form */}
          <form className="signin-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-content">
              <h2 className="title">Sign In</h2>
              <div className="social-buttons">
                <button type="button" className="social-button">
                  <span>f</span>
                </button>
                <button type="button" className="social-button">
                  <span>G+</span>
                </button>
                <button type="button" className="social-button">
                  <span>in</span>
                </button>
              </div>
              <p className="social-text">or use your email account</p>
              <div className="input-group">
                <input type="email" placeholder="Email" required />
                <div className="input-highlight"></div>
              </div>
              <div className="input-group">
                <input type="password" placeholder="Password" required />
                <div className="input-highlight"></div>
              </div>
              <button type="submit" className="form-button">
                <span>Sign In</span>
                <div className="button-effect"></div>
              </button>
            </div>
          </form>

          {/* Sign Up Form */}
          <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-content">
              <h2 className="title">Create Account</h2>
              <div className="social-buttons">
                <button type="button" className="social-button">
                  <span>f</span>
                </button>
                <button type="button" className="social-button">
                  <span>G+</span>
                </button>
                <button type="button" className="social-button">
                  <span>in</span>
                </button>
              </div>
              <p className="social-text">or use your email for registration</p>
              <div className="input-group">
                <input type="text" placeholder="Name" required />
                <div className="input-highlight"></div>
              </div>
              <div className="input-group">
                <input type="email" placeholder="Email" required />
                <div className="input-highlight"></div>
              </div>
              <div className="input-group">
                <input type="password" placeholder="Password" required />
                <div className="input-highlight"></div>
              </div>
              <button type="submit" className="form-button">
                <span>Sign Up</span>
                <div className="button-effect"></div>
              </button>
            </div>
          </form>
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
          <div className="overlay">
            {/* Left Overlay Panel */}
            <div className="overlay-panel overlay-left">
              <div className="panel-content">
                <h2>Welcome Back!</h2>
                <p>
                  Already have an account? Sign in to continue your journey with
                  us.
                </p>
                <button className="overlay-button" onClick={toggleMode}>
                  <span>Sign In</span>
                  <div className="button-effect"></div>
                </button>
              </div>
            </div>
            {/* Right Overlay Panel */}
            <div className="overlay-panel overlay-right">
              <div className="panel-content">
                <h2>Hello, Friend!</h2>
                <p>
                  Enter your personal details and start your journey with us.
                </p>
                <button className="overlay-button" onClick={toggleMode}>
                  <span>Sign Up</span>
                  <div className="button-effect"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
