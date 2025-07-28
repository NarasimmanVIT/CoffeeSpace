import React from 'react';
import './ConversationItem.css';

const ConversationItem = ({ name, lastMessage, isActive, image, onClick }) => {
  return (
       <div className={`conversation-item ${isActive ? 'active' : ''}`}
       onClick={onClick}>
      {/* <img className="profile-pic" src={image} alt={`${name}'s profile`} /> */}
      <div className="conversation-text">
        <h4 className="conversation-name">{name}</h4>
        <p className="conversation-message">{lastMessage}</p>
      </div>
    </div>
  );
};

export default ConversationItem;