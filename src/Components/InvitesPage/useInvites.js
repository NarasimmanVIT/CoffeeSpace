import { useState } from "react";
import invitesData from "../../Data/invitesData";

const useInvites = () => {
  const [receivedInvites, setReceivedInvites] = useState(invitesData);
  const [connected, setConnected] = useState([]);

  const handleAccept = (id) => {
    const accepted = receivedInvites.find((invite) => invite.id === id);
    if (accepted) {
      setConnected((prev) => [...prev, accepted]);
      setReceivedInvites((prev) => prev.filter((invite) => invite.id !== id));
    }
  };

  const handleDecline = (id) => {
    setReceivedInvites((prev) => prev.filter((invite) => invite.id !== id));
  };

  return {
    receivedInvites,
    connected,
    handleAccept,
    handleDecline,
  };
};

export default useInvites;
