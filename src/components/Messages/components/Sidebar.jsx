import React from "react";
import ConversationItem from "./ConversationItem";
import useSidebar from "../hooks/useSidebar";
import "./Sidebar.css";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const {
    loading,
    error,
    search,
    setSearch,
    filteredConversations,
    formatTimestamp,
    markAsReadLocal
  } = useSidebar();

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
          online={user.isOnline}
          isActive={selectedUser?.conversationId === user.conversationId}
          onClick={() => {
            setSelectedUser(user);
            markAsReadLocal(user.conversationId); 
          }}
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
