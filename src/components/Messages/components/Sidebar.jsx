import React from 'react';
import ConversationItem from './ConversationItem';
import './Sidebar.css';
import { users } from "../constants/usersData";

// const users = [
//   {
//     id: 1,
//     name: 'Sarah Chen',
//     lastMessage: 'That sounds like a great idea! When can we meet?',
//     image: 'https://via.placeholder.com/40',
//   },
//   {
//     id: 2,
//     name: 'Marcus Rodriguez',
//     lastMessage: "I'd love to discuss the project further",
//     image: 'https://via.placeholder.com/40',
//   },
// ];

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  return (
    <div className="sidebar">
      <input
        type="text"
        placeholder="Search conversations..."
        className="sidebar-search sidebar-search-desktop"
      />

      {users.map((user) => (
        <ConversationItem
          key={user.id}
          name={user.name}
          lastMessage={user.lastMessage}
          image={user.image}
          isActive={selectedUser?.id === user.id}
          onClick={() => setSelectedUser(user)}
        />
      ))}
    </div>
  );
};

export default Sidebar;