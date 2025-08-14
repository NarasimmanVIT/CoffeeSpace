export const handleAccept = (id, receivedInvites, setReceivedInvites, connected, setConnected) => {
  const accepted = receivedInvites.find((invite) => invite.id === id);
  if (accepted) {
    setConnected([...connected, accepted]);
    setReceivedInvites(receivedInvites.filter((invite) => invite.id !== id));
  }
};

export const handleDecline = (id, receivedInvites, setReceivedInvites) => {
  setReceivedInvites(receivedInvites.filter((invite) => invite.id !== id));
};
