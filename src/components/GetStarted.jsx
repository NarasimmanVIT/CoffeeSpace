import React from 'react';
import './GetStarted.css';
import { useNavigate } from 'react-router-dom';
import { Phone,Lock } from 'phosphor-react';

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="getstarted-container">
      <div className="getstarted-box">
        <h2 className="getstarted-title">Get Started</h2>
        <p className="getstarted-subtitle">Enter your phone number to begin</p>

        <label htmlFor="phone" className="getstarted-label">Phone Number</label>
        <div className="input-group">
          <Phone className='phone-icon' size={24} color="#8a6969" />
          <input
            type="text"
            id="phone"
            placeholder="+1 (555) 000-0000"
            className="getstarted-input"
          />
        </div>

        <label htmlFor="verification" className="getstarted-label">Verification Code</label>
        <div className="input-group">
          <Lock className="phone-icon" size={22} color="#8a6969" />
          <input
            type="text"
            id="verification"
            placeholder="Enter code"
            className="getstarted-input"
          />
        </div>

        <button className="getstarted-button">Send Verification Code</button>
      </div>
    </div>
  );
};

export default GetStarted;