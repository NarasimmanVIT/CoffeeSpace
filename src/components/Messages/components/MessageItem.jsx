import React from 'react';
import './MessageItem.css';

const MessageItem = ({ text, type, time }) => {
  return (
    <div className="message-item">
      <div className={`message-bubble ${type}`}>
        <p>{text}</p>
        <span className="message-time">{time}</span>
      </div>
    </div>
  );
};

export default MessageItem;