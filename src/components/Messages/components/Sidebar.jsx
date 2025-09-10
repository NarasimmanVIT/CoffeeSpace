import React, { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem";
import "./Sidebar.css";
import axiosInstance from "../../../api/axiosInstance";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");


  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axiosInstance.get("/api/conversations?page=0&size=10");
        if (res.data.success) {

          setConversations(res.data.data.profiles || []);
        } else {
          setError(res.data.message || "Failed to fetch conversations");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);


  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sidebar">
      <input
        type="text"
        placeholder="Search conversations..."
        className="sidebar-search sidebar-search-desktop"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading conversations...</p>}
      {error && <p className="error">{error}</p>}

      {filteredConversations.map((user) => (
        <ConversationItem
          key={user.conversationId}
          name={user.name}
          lastMessage={user.lastMessage}
          image={user.avatar}
          unreadCount={user.unreadCount}
          isActive={selectedUser?.conversationId === user.conversationId}
          onClick={() => setSelectedUser(user)}
          time={formatTimestamp(user.lastMessageAt)}
        />
      ))}

      {!loading && !error && filteredConversations.length === 0 && (
        <p>No conversations found</p>
      )}
    </div>
  );
};

export default Sidebar;
