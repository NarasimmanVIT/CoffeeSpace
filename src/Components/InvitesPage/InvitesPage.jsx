import SentInvites from "../SentInvites/SentInvites";
import ReceivedInvites from "../ReceivedInvites/ReceivedInvites";
import ConnectedInvites from "../ConnectedInvites/ConnectedInvites";
import { Tray, PaperPlaneTilt, Users } from "phosphor-react";
import "./Invitespage.css";
import { useState } from "react";
import useInvites from "./useInvites";

const InvitesPage = () => {
  const [activeTab, setActiveTab] = useState("received");

  const { receivedInvites, connected, handleAccept, handleDecline } = useInvites();

  return (
    <div className="invites-page">
      <h2>Connections & Invites</h2>
      <nav className="sub-navbar">
        <button
          className={activeTab === "received" ? "active" : ""}
          onClick={() => setActiveTab("received")}
        >
          <Tray size={18} color="#847062" style={{ marginRight: "8px" }} />
          Received
        </button>
        <button
          className={activeTab === "sent" ? "active" : ""}
          onClick={() => setActiveTab("sent")}
        >
          <PaperPlaneTilt
            size={18}
            color="#847062"
            style={{ marginRight: "8px" }}
          />
          Sent
        </button>
        <button
          className={activeTab === "connected" ? "active" : ""}
          onClick={() => setActiveTab("connected")}
        >
          <Users size={18} color="#847062" style={{ marginRight: "8px" }} />
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
