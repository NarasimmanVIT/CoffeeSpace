import React, { useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import "./ChatBox.css";
import { Phone, VideoCamera, DotsThreeVertical } from "phosphor-react";
import axiosInstance from "../../../api/axiosInstance";

const ChatBox = ({ selectedUser, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [myId, setMyId] = useState(null);

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    if (!selectedUser?.conversationId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `api/conversations/${selectedUser.conversationId}/messages?page=0&size=20`
        );

        if (res.data.success) {
          const msgs = res.data.data.messages || [];
          setMessages(msgs);

          if (msgs.length > 0) {
            const ownId = msgs.find(msg => msg.senderId !== selectedUser.participantId)?.senderId;
            setMyId(ownId || msgs[0].receiverId); 
          } else {
            setMyId(1);
          }
        } else {
          setError(res.data.message || "Failed to fetch messages");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedUser?.conversationId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setSending(true);

    try {
      const res = await axiosInstance.post(
        "/api/messages",
        {
          conversationId: selectedUser.conversationId,
          receiverId: selectedUser.participantId,
          text: newMessage.trim(),
        }
      );

      if (res.data.success) {
        const sentMessage = res.data.data;
        setMessages((prev) => [...prev, sentMessage]);

        if (!myId) setMyId(sentMessage.senderId);

        setNewMessage("");
      } else {
        alert(res.data.message || "Failed to send message");
      }
    } catch (err) {
      alert(err.message || "Error sending message");
    } finally {
      setSending(false);
    }
  };

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
        <button className="back-button" onClick={onBack}>
          ←
        </button>
        <div className="chat-user-info">{selectedUser.name}</div>
        <div className="chat-header-icons">
          <Phone size={20} />
          <VideoCamera size={20} />
          <DotsThreeVertical size={20} />
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
              key={msg.messageId}
              text={msg.text}
              type={msg.senderId === myId ? "sent" : "received"}
              time={formatTime(msg.sentAt)}
            />
          ))}
      </div>

      <div className="chat-input">
        <textarea
          placeholder="Type a message..."
          rows="1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button onClick={handleSendMessage} disabled={sending}>
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
