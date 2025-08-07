import React from "react";
import "./HeroSection.css";
import heroImg from "../assets/hero-image.webp"; 

const HeroSection = () => {
  return (
    <section className="hero-image-only">
      <div className="hero-image-wrapper">
        <img src={heroImg} alt="Hero" className="hero-img" />
        <div className="overlay">
        </div>
      </div>
    
      
      <div className="hero-content">
        <h1>
          Connect with <br />
          <span className="highlight-text">Entrepreneurs</span>
        </h1>
        <p>Who share your vision</p>

        <div className="parah">
            <p>Discover and connect with entrepreneurs who share your <br /> interests, industry focus, and business vision for meaningful <br /> partnerships.</p>
        </div>

        <div className="hero-buttons">
          <button className="btn btn-primary">Join the Community </button>
          <button className="btn btn-secondary">Learn More</button>
        </div>

        
           <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Entrepreneurs</div>
          </div>
          <div className="divider"></div>
          <div className="stat-item">
            <div className="stat-number">25+</div>
            <div className="stat-label">Interest Categories</div>
          </div>
          <div className="divider"></div>
          <div className="stat-item">
            <div className="stat-number">200+</div>
            <div className="stat-label">Partnerships Formed</div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default HeroSection;