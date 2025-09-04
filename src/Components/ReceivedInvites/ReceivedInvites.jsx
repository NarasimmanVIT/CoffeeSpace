import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ReceivedInvites.css";

const ReceivedInvites = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch invites
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/invites/received?page=0&size=10"
        );
        if (response.data.success && response.data.data?.items) {
          setInvites(response.data.data.items);
          console.log("Received Invites:", response.data.data.items);
        } else {
          setError(response.data.message || "Failed to fetch invites");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchInvites();
  }, []);

  const handleResponse = async (inviteId, action) => {
    try {
      const response = await axiosInstance.post("/api/invite/response", {
        inviteId,
        type: action,
      });

      if (response.data.success) {
        console.log(`Invite ${action}ED:`, response.data);

        toast.success(`Invite ${action.toLowerCase()}ed successfully`);

        setInvites((prev) => prev.filter((invite) => invite.id !== inviteId));
      } else {
        toast.error(
          response.data.message || `Failed to ${action.toLowerCase()} invite`
        );
      }
    } catch (err) {
      console.error(`Error while ${action.toLowerCase()}ing invite:`, err);
      toast.error(
        err.message ||
          `Something went wrong while ${action.toLowerCase()}ing invite`
      );
    }
  };

  if (loading) return <p>Loading invites...</p>;
  if (error) return <p style={{ color: "black" }}>{error}</p>;

  return (
    <div className="invite-card">
      <h1>Received Invites</h1>
      {invites.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>No invites found</h1>
      ) : (
        invites.map((invite) => (
          <div className="Profiles" key={invite.id}>
            <img
              className="profile-pic"
              src={invite.avatar}
              alt={invite.name}
            />
            <div className="details">
              <h3>{invite.name}</h3>
              <p className="role">{invite.role}</p>
              <p className="message">{invite.message}</p>
              <div className="actions">
                <button
                  className="accept-btn"
                  onClick={() => handleResponse(invite.id, "ACCEPTED")}
                >
                  Accept
                </button>
                <button
                  className="decline-btn"
                  onClick={() => handleResponse(invite.id, "DECLINE")}
                >
                  Decline
                </button>
                <span className="collaborate-btn">{invite.tag}</span>
                <span className="timestamp">{invite.timeAgo}</span>
              </div>
            </div>
          </div>
        ))
      )}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ReceivedInvites;
