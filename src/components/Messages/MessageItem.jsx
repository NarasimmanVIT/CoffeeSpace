import React from 'react';
import './MessageItem.css';

const MessageItem = ({ text, type }) => {
  return (
    <div className={`message-item ${type}`}>
      <p>{text}</p>
    </div>
  );
};

export default MessageItem;