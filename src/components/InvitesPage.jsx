import SentInvites from "../Components/SentInvites";
import ReceivedInvites from "../Components/ReceivedInvites";
import ConnectedInvites from "../Components/ConnectedInvites";
import invitesData from "../Data/invitesData";
import { Tray, PaperPlaneTilt, Users } from "phosphor-react";
import "../styles/Invitespage.css";
import { useState } from "react";

const InvitesPage = () => {
  const [activeTab, setActiveTab] = useState("sent");
  const [receivedInvites, setReceivedInvites] = useState(invitesData);
  const [connected, setConnected] = useState([]);

  const handleAccept = (id) => {
    const accepted = receivedInvites.find((invite) => invite.id === id);
    setConnected([...connected, accepted]);
    setReceivedInvites(receivedInvites.filter((invite) => invite.id !== id));
  };

  const handleDecline = (id) => {
    setReceivedInvites(receivedInvites.filter((invite) => invite.id !== id));
  };

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
          <PaperPlaneTilt  size={18} color=" #847062" weight="regular" style={{ marginRight: "8px" }} />
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
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        )}
        {activeTab === "connected" && (
          <ConnectedInvites connections={connected} />
        )}
      </div>
    </div>
  );
};

export default InvitesPage;
