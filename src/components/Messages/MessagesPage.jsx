import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatBox from './ChatBox';
import './MessagesPage.css';

const MessagesPage = () => {
   const [selectedUser, setSelectedUser] = useState(null);

  return (
    <main className="messages-page">
      {/* <div className='messages-header'> */}
        <h2 className='messages-header'>Messages</h2>
        {/* </div> */}
        <div className='message-content'>
          <div className='sidebar-box'>
        <Sidebar
         selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
         />
      </div>
      <div className='chatbox-box'>
        <ChatBox
         selectedUser={selectedUser}
          />
      </div>
        </div>
    </main>
  );
};

export default MessagesPage;