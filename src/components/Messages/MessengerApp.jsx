import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatBox from './ChatBox';

const MessengerApp = () => {
  const [selectedUser, setSelectedUser] = useState({
    name: 'Marcus Rodriguez',
    image: 'https://via.placeholder.com/40',
    lastMessage: "I'd love to discuss the project further"
  });

  return (
    <div className="messenger-container">
      <Sidebar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <ChatBox selectedUser={selectedUser} />
    </div>
  );
};

export default MessengerApp;