import React from "react";
import "./ProfileCard.css";
import {MapPin, ChatCircle} from "phosphor-react";

const ProfileCard = ({ image, name, role, location, bio, tags, rating, projects }) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={image} alt={name} className="avatar" />
        <div className="name-role-location">
          <h2>{name}</h2>
          <p className="role">{role}</p>
          <div className="location"> <MapPin /> {location}</div>
        </div>
      </div>
      <p className="bio">{bio}</p>
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <div className="stats">
        <span>⭐ {rating}</span>
        <span>{projects} projects completed</span>
      </div>
      <button className="connect-btn"> <ChatCircle /> Connect</button>
    </div>
  );
};

export default ProfileCard;
