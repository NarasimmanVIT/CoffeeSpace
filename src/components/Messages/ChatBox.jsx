import React from 'react';
import MessageItem from './MessageItem';
import './ChatBox.css';

const ChatBox = ({ selectedUser }) => {
   if (!selectedUser) {
    return (
      <div className="chat-box-empty-chat">
        <p>Select a user to start chatting</p>
      </div>
    );
  }
  return (
    <div className="chat-box">
      <div className="chat-header">{selectedUser.name}</div>
      <div className="chat-messages">
        <MessageItem text="Hey! I saw your profile and loved your fintech project ideas." type="received" />
        <MessageItem text="Thanks! I'd love to hear more about your development experience." type="sent" />
        <MessageItem text="That sounds like a great idea! When can we meet?" type="received" />
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;