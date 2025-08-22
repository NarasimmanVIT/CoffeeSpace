import React from 'react';
import "./ConnectedInvites.css"
const ConnectedInvites = ({ connections }) => {
  return (
    <div className="invite-card">
      <h1>Your Connections</h1>
      {connections.map((person) => (
        <div className="Profiles" key={person.id}>
          <img className="profile-pic" src={person.image} alt="Profile" />
          <div className="details">
            <h3>{person.name}</h3>
            <p className="role">{person.role}</p>
            <p className="connect-message">Connected just now</p>
            <button className="message-btn">Message</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectedInvites;
