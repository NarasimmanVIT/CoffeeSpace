import React from "react";
import "./HeroSection.css";
import heroImg from "../../assets/hero-image.webp"
import { heroStats, heroTexts } from "./heroData";

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
          {heroTexts.titleLine1}<br />
          <span className="highlight-text">{heroTexts.highlight}</span>
        </h1>
        <p>{heroTexts.subtitle}</p>

        <div className="parah">
            <p>{heroTexts.description1}
              <br />{heroTexts.description2}<br />{heroTexts.description3}
            </p>
        </div>

        <div className="hero-buttons">
          <button className="btn btn-primary">Join the Community </button>
          <button className="btn btn-secondary">Learn More</button>
        </div>

        
           <div className="stats-container">
          {heroStats.map((stat, idx) => (
            <React.Fragment key={idx}>
              <div className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
              {idx < heroStats.length - 1 && <div className="divider"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;