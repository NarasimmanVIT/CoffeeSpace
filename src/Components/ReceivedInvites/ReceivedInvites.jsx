import "./ReceivedInvites.css"

const ReceivedInvites = ({ invites, onAccept, onDecline }) => {
  return (
    <div className="invite-card">
      <h1>Received Invites</h1>
      {invites.map((invite) => (
        <div className="Profiles" key={invite.id}>
          <img className="profile-pic" src={invite.image} alt="Profile" />
          <div className="details">
            <h3>{invite.name}</h3>
            <p className="role">{invite.role}</p>
            <p className="message">{invite.message}</p>
            <div className="actions">
              <button className="accept-btn" onClick={() => onAccept(invite.id)}>
                Accept
              </button>
              <button className="decline-btn" onClick={() => onDecline(invite.id)}>
                Decline
              </button>
              <span className="collaborate-btn">{invite.tag}</span>
              <span className="timestamp">{invite.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReceivedInvites;
