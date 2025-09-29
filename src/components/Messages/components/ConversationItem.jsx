import React from "react";
import "./ConversationItem.css";


const ConversationItem = ({ name, lastMessage, isActive, image, unreadCount, onClick }) => {
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };


  return (
    <div
      className={`conversation-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {image ? (
        <img className="profile-pic" src={image} alt={`${name}'s profile`} />
      ) : (
        <div className="profile-placeholder">{getInitial(name)}</div>
      )}
      <div className="conversation-text">
        <h4 className="conversation-name">{name}</h4>
        <p className="conversation-message">{lastMessage}</p>
      </div>
      {unreadCount > 0 && (
        <span className="unread-badge">{unreadCount}</span>
      )}
    </div>
  );
};

export default ConversationItem;
