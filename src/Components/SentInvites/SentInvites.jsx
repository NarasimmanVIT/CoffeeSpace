import "../SentInvites/SentInvites.css";
import useSentInvites from "../SentInvites/useSentInvites"

const SentInvites = () => {
  const { invites, loading, error } = useSentInvites();

  if (loading) return <p>Loading sent invites...</p>;
 

  return (
    <div className="invite-card">
      <h1>Sent Invites</h1>
      {invites.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>No sent invites found</h1>
      ) : (
        invites.map((invite) => (
          <div className="Profiles" key={invite.id}>
            <img className="profile-pic" src={invite.avatar} alt={invite.name} />
            <div className="details">
              <h3>{invite.name}</h3>
              <p className="role">{invite.role}</p>
              <p className="message">{invite.message}</p>
              <button className="collaborate-btn">{invite.status}</button>
              <span className="timestamp">{invite.sentAt}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SentInvites;
