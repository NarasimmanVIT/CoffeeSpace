import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../SentInvites/SentInvites.css";

const SentInvites = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSentInvites = async () => {
      try {
        const response = await axiosInstance.get("/api/invites/sent?page=0&size=10");

        if (response.data.success && response.data.data?.items) {
          setInvites(response.data.data.items); // ✅ use items
          console.log("Sent Invites:", response.data.data.items);
        } else {
          setError(response.data.message || "Failed to fetch sent invites");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSentInvites();
  }, []);

  if (loading) return <p>Loading sent invites...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
