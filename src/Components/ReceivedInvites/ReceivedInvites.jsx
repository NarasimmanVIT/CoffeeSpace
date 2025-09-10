import "./ReceivedInvites.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useReceivedInvites from "../ReceivedInvites/useReceivedInvites"; 

const ReceivedInvites = () => {
  const { invites, loading, error, handleResponse } = useReceivedInvites();

  if (loading) return <p>Loading invites...</p>;


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
