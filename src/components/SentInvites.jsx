import '../styles/SentInvites.css';
import sentData from '../Data/SentData';

const SentInvites = () => {
  return (
    <div className="invite-card">
      <h1>Sent Invites</h1>
      {sentData.map((invite) => (
        <div className='Profiles' key={invite.id}>
          <img
            className="profile-pic"
            src={invite.image}
            alt="Profile"
          />
          <div className="details">
            <h3>{invite.name}</h3>
            <p className="role">{invite.role}</p>
            <p className="message">{invite.message}</p>
            <button className="collaborate-btn">{invite.tag}</button>
            <span className="timestamp">{invite.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SentInvites;
