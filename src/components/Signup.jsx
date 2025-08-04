import React from 'react';
import './Signup.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Join the Network</h2>
        <p className="signup-subtitle">Enter your phone number to get started</p>

        <label htmlFor="phone" className="signup-label">Phone Number</label>
        <div className="input-group">
          <span className="phone-icon">📞</span>
          <input
            type="text"
            id="phone"
            placeholder="+1 (555) 000-0000"
            className="signup-input"
          />
        </div>

        <button className="signup-button">Send Verification Code</button>

        <p className="signup-login">
          Already have an account? <span className="signin-link" onClick={() => navigate('/login')}>Sign in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;