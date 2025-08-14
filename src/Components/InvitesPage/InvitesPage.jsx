import SentInvites from "../SentInvites/SentInvites";
import ReceivedInvites from "../ReceivedInvites/ReceivedInvites";
import ConnectedInvites from "../ConnectedInvites/ConnectedInvites";
import invitesData from "../../Data/invitesData";
import { Tray, PaperPlaneTilt, Users } from "phosphor-react";
import "./Invitespage.css";
import { useState } from "react";
import { handleAccept, handleDecline } from "./InvitesHandlers";

const InvitesPage = () => {
  
  const [activeTab, setActiveTab] = useState("received");
  const [receivedInvites, setReceivedInvites] = useState(invitesData);
  const [connected, setConnected] = useState([]);

  return (
    <div className="invites-page">
      <h2>Connections & Invites</h2>
      <nav className="sub-navbar">
        <button
          className={activeTab === "received" ? "active" : ""}
          onClick={() => setActiveTab("received")}
        >
          <Tray size={18} color=" #847062" weight="regular" style={{ marginRight: "8px" }} />
          Received
        </button>
        <button
          className={activeTab === "sent" ? "active" : ""}
          onClick={() => setActiveTab("sent")}
        >
          <PaperPlaneTilt size={18} color=" #847062" weight="regular" style={{ marginRight: "8px" }} />
          Sent
        </button>
        <button
          className={activeTab === "connected" ? "active" : ""}
          onClick={() => setActiveTab("connected")}
        >
          <Users size={18} color=" #847062" weight="regular" style={{ marginRight: "8px" }} />
          Connected
        </button>
      </nav>

      <div className="tab-content">
        {activeTab === "sent" && <SentInvites />}
        {activeTab === "received" && (
          <ReceivedInvites
            invites={receivedInvites}
            onAccept={(id) => handleAccept(id, receivedInvites, setReceivedInvites, connected, setConnected)}
            onDecline={(id) => handleDecline(id, receivedInvites, setReceivedInvites)}
          />
        )}
        {activeTab === "connected" && <ConnectedInvites connections={connected} />}
      </div>
    </div>
  );
};

export default InvitesPage;
