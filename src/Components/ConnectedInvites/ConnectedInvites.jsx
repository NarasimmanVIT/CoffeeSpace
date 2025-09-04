import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./ConnectedInvites.css";

const ConnectedInvites = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axiosInstance.get("/api/connections?page=0&size=10");
        if (response.data.success && response.data.data?.items) {
          setConnections(response.data.data.items); 
          console.log("Connections:", response.data.data.items);
        } else {
          setError(response.data.message || "Failed to fetch connections");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  if (loading) return <p>Loading connections...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="invite-card">
      <h1>Your Connections</h1>
      {connections.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No connections yet</h2>
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
              <button className="message-btn">Message</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ConnectedInvites;
