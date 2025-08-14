import React from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
import MeetProfiles from "../../Data/MeetProfiles"; 
import "./MeetPartner.css"



const MeetPartners = () => {
  return (
    <div className="app-container">
      <h1>Meet Your Future Partners</h1>
      <p className="subtitle">
        Discover talented individuals ready to collaborate. From visionary
        entrepreneurs to skilled developers, find the perfect match for your
        next venture.
      </p>
      <div className="cards-wrapper">
        {MeetProfiles.map((profile, index) => (
          <ProfileCard key={index} {...profile} />
        ))}
      </div>
      <button className="view-all-btn">View All Profiles</button>
    </div>
  );
};

export default MeetPartners;
