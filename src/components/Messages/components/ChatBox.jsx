import React from "react";
import MessageItem from "./MessageItem";
import "./ChatBox.css";
import { DotsThreeVertical, ArrowLeft } from "phosphor-react";
import useChatBox from "../hooks/useChatBox";

const ChatBox = ({ selectedUser, onBack }) => {
  const {
    messages,
    loading,
    error,
    newMessage,
    setNewMessage,
    sending,
    handleSendMessage,
    myId,
    formatTime,
    online,
    messagesEndRef,
  } = useChatBox(selectedUser);

  if (!selectedUser) {
    return (
      <div className="chat-box-empty-chat">
        <p>Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="chat-box">
      <div className="chat-header">
        <div className="chat-header-icons">
          <button onClick={onBack}>
            <ArrowLeft size={22} />
          </button>
        </div>

        <div className="chat-user-info">
          <span>{selectedUser.name}</span>
          {selectedUser.isOnline && <p className="online">Online</p>}
        </div>

        <div className="chat-header-icons">
          <button>
            <DotsThreeVertical size={20} />
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {loading && <p>Loading messages...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && messages.length === 0 && <p>No messages yet</p>}

        {!loading &&
          !error &&
          myId &&
          messages.map((msg) => (
            <MessageItem
              key={msg.messageId || msg.sentAt}
              text={msg.text}
              type={String(msg.senderId) === String(myId) ? "sent" : "received"}
              time={formatTime(msg.sentAt)}
            />
          ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <textarea
          placeholder="Type a message..."
          rows="1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        ></textarea>

        <button onClick={handleSendMessage} disabled={sending}>
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
