import React, { useState } from 'react';
import SentInvites from '../Components/SentInvites';
import '../styles/Invitespage.css';

const InvitesPage = () => {
  const [activeTab, setActiveTab] = useState('sent');

  return (
    <div className="invites-page">
      <h2>Connections & Invites</h2>
      <nav className="sub-navbar">
        <button
          className={activeTab === 'received' ? 'active' : ''}
          onClick={() => setActiveTab('received')}
        >
          Received
        </button>
        <button
          className={activeTab === 'sent' ? 'active' : ''}
          onClick={() => setActiveTab('sent')}
        >
          Sent
        </button>
        <button
          className={activeTab === 'connected' ? 'active' : ''}
          onClick={() => setActiveTab('connected')}
        >
          Connected
        </button>
      </nav>

      <div className="tab-content">
        {activeTab === 'sent' && <SentInvites />}

        {activeTab === 'received' && (
          <div className="placeholder">
            <button className="simple-btn">Received Invite Button</button>
          </div>
        )}

        {activeTab === 'connected' && (
          <div className="placeholder">
            <button className="simple-btn">Connected Button</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitesPage;