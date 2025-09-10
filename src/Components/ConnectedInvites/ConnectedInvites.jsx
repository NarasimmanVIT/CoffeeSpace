import "./ConnectedInvites.css";
import useConnectedInvites from "../ConnectedInvites/useConnectedInvites"; 
import { useNavigate } from "react-router-dom";  
const ConnectedInvites = () => {
  const { connections, loading, error } = useConnectedInvites();
  const navigate = useNavigate(); 

  if (loading) return <p>Loading connections...</p>;

  return (
    <div className="invite-card">
      <h1>Your Connections</h1>
      {connections.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>No connections yet</h1>
      ) : (
        connections.map((person) => (
          <div className="Profiles" key={person.id}>
            <img
              className="profile-pic"
              src={person.avatar}
              alt={person.name}
            />
            <div className="details">
              <h3>{person.name}</h3>
              <p className="role">{person.role}</p>
              <p className="connect-message">
                Connected on {new Date(person.connectedAt).toLocaleDateString()}
              </p>
              <button
                className="message-btn"
                onClick={() => navigate("/messages")}
              >
                Message
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ConnectedInvites;
