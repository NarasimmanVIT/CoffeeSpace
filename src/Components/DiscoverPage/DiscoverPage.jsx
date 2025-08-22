import React from "react";
import "./DiscoverPage.css";
import { Suitcase, MapPin, ChatCircle, X, HeartStraight } from "phosphor-react";
import useDiscoverProfiles from "./useDiscoverProfiles"

function DiscoverPage() {
  const { current, remaining, handleNext } = useDiscoverProfiles();

  return (
    <div className="discover-container">
      <h2>Discover Entrepreneurs</h2>
      <div className="discover-profile-card">
        <div className="image-wrapper">
          <img src={current.image} alt={current.name} />
          {current.verified && <span className="verified-badge">Verified</span>}
        </div>
        <div className="discover-information">
          <h3>
            {current.name}, {current.age}
          </h3>
          <p className="rolee">
            <Suitcase size={20} color="#847062" />
            <span style={{ marginLeft: "8px" }}>{current.role}</span>
          </p>
          <p className="locationn">
            <MapPin size={20} color="#847062" />
            <span style={{ marginLeft: "8px" }}>{current.location}</span>
          </p>
          <p className="about">{current.about}</p>

          <div className="discover-tags">
            <p className="tag-heading">Skills</p>
            {current.skills.map((skill) => (
              <span key={skill} className="discover-tag">
                {skill}
              </span>
            ))}
          </div>

          <div className="discover-tags">
            <p className="tag-heading">Interests</p>
            {current.interests.map((interest) => (
              <span key={interest} className="tag interest">
                {interest}
              </span>
            ))}
          </div>

          <div className="discover-buttons">
            <button className="x" onClick={handleNext}>
              <X size={16} color="#ef4444" weight="bold" />
            </button>
            <button className="like" onClick={handleNext}>
              <HeartStraight size={16} color="#93501f" weight="bold" />
            </button>
            {/* <button className="chat">
              <ChatCircle size={16} color="#93501f" weight="bold" />
            </button> */}
          </div>
        </div>
      </div>
      <p className="remaining">{remaining} more profiles to discover</p>
    </div>
  );
}

export default DiscoverPage;
