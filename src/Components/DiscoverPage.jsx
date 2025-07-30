import React, { useState } from "react";
import profiles from "../Data/Profiles";
import "../styles/DiscoverPage.css";
import { Suitcase, MapPin, ChatCircle, X, HeartStraight } from "phosphor-react";

function DiscoverPage() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < profiles.length - 1) {
      setIndex(index + 1);
    }
  };

  const current = profiles[index];

  return (
    <div className="discover-container">
      <h2>Discover </h2>
      <div className="discover-profile-card">
        <img src={current.image} alt={current.name} />
        {current.verified && <span className="verified-badge">Verified</span>}
        <div className="discover-information">
          <h3>{current.name}</h3>
          <p className="age">{current.age} years old</p>
          <p className="rolee">
            <Suitcase size={16} color="#30251D" weight="regular" />
            <span style={{ marginLeft: "8px" }}>{current.role}</span>
          </p>
          <p className="locationn">
            <MapPin size={16} color="#30251D" weight="regular" />
            <span style={{ marginLeft: "8px" }}>{current.location}</span>
          </p>
          <p className="about">{current.about}</p>
          <div className="discover-tags">
            <p>
              <strong>Skills</strong>
            </p>
            {current.skills.map((skill) => (
              <span key={skill} className="discover-tag">
                {skill}
              </span>
            ))}
          </div>
          <div className="discover-tags">
            <p>
              <strong>Interests</strong>
            </p>
            {current.interests.map((interest) => (
              <span key={interest} className="tag interest">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="buttons">
        <button className="X" onClick={handleNext}>
          <X size={16} color="#ef4444" weight="bold" />
        </button>
        <button className="like" onClick={handleNext}>
          <HeartStraight size={16} color="#93501f" weight="bold" />
        </button>
        <button className="chat">
          <ChatCircle size={16} color="#93501f" weight="bold" />{" "}
        </button>
      </div>
      <p className="remaining">
        {profiles.length - index - 1} more profiles to discover
      </p>
    </div>
  );
}

export default DiscoverPage;
