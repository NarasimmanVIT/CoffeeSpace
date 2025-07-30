import '../styles/SentInvites.css'

const SentInvites = () => {
  return (
    <div className="invite-card">
      <h1>Sent Invites</h1>
      <div className='Profiles'>
      <img
        className="profile-pic"
        src="https://via.placeholder.com/50"
        alt="Profile"
      />
      <div className="details">
        <h3>Alex Johnson</h3>
        <p className="role">Product Manager</p>
        <p className="message">
          Hi Alex! I'd love to discuss potential collaboration
          opportunities.
        </p>
        <button className="collaborate-btn">collaborate</button>
        <span className="timestamp">2 days ago</span>
      </div>
      </div>
    </div>
  );
};

export default SentInvites;