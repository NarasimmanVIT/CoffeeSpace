import React from 'react';
import './Login.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate ();
    
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Enter your phone number to continue</p>

        <label htmlFor="phone" className="login-label">Phone Number</label>
        <div className="input-group">
          <span className="phone-icon">📞</span>
          <input
            type="text"
            id="phone"
            placeholder="+1 (555) 000-0000"
            className="login-input"
          />
        </div>

        <button className="login-button">Send Verification Code</button>

        <p className="login-signup">
          Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;