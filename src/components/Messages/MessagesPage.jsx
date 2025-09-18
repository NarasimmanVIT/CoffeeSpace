import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import ChatBox from './ChatBox';
import Sidebar from './components/Sidebar';
import ChatBox from "./components/ChatBox";
import './MessagesPage.css';
import useIsMobile from './hooks/useIsMobile';

const MessagesPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const isMobile = useIsMobile();
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 1024);
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <main className="messages-page">
      {!(isMobile && selectedUser) && (
       <>
       <h2 className="messages-header">Messages</h2>

        {isMobile && (
          <input
           type="text"
           placeholder='Search conversation...'
           className='sidebar-search mobile-search'
            />
        )}
       </>
        
      )}
      <div className="message-content">
        {isMobile ? (
          // mobile view
          selectedUser ? (
            <div className="chatbox-box">
              <ChatBox selectedUser={selectedUser} onBack={() => setSelectedUser(null)} />
            </div>
          ) : (
            <div className="sidebar-box">
              <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            </div>
          )
        ) : (
          // desktop view
          <>
            <div className="sidebar-box">
              <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            </div>
            <div className="chatbox-box">
              <ChatBox selectedUser={selectedUser} onBack={() => setSelectedUser(null)} />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default MessagesPage;


