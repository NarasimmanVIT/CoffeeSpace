// import React, { useState } from "react";
// import "./DiscoverPage.css";
// import { Suitcase, MapPin, X, HeartStraight } from "phosphor-react";
// import useDiscoverProfiles from "./useDiscoverProfiles";
// import { Loader2 } from "lucide-react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function DiscoverPage() {
//   const { current, interact, loading, error } = useDiscoverProfiles();
//   const [showModal, setShowModal] = useState(false);
//   const [message, setMessage] = useState("");
//   const [sending, setSending] = useState(false);


//   const handleLike = () => setShowModal(true);

//   const handleSend = async () => {
//     setSending(true);
//     await interact("LIKE", message);
//     setMessage("");
//     setSending(false);
//     setShowModal(false);
//   };

//   const handleSkip = async () => {
//     setSending(true);
//     await interact("LIKE", "");
//     setMessage("");
//     setSending(false);
//     setShowModal(false);
//   };


//   const handleDislike = async () => {
//     setSending(true);
//     await interact("DISLIKE"); 
//     setSending(false);
//   };

//   if (loading)
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "80vh",
//           flexDirection: "column",
//           gap: "10px",
//         }}
//       >
//         <Loader2 className="animate-spin" size={40} color="#93501f" />
//         <p style={{ color: "#93501f", fontWeight: "bold" }}>
//           Loading recommendations...
//         </p>
//       </div>
//     );

//   if (error)
//     return (
//       <p
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//           margin: "100px",
//           color: "red",
//         }}
//       >
//         {error}
//       </p>
//     );

//   if (!current)
//     return (
//       <h1
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//           margin: "100px",
//         }}
//       >
//         No profiles available
//       </h1>
//     );

//   return (
//     <div className="discover-container">
//       <h2>Discover Entrepreneurs</h2>
//       <div className="discover-profile-card">
//         <div className="image-wrapper">
//           <img src={current.image} alt={current.name} />
//           {current.verified && <span className="verified-badge">Verified</span>}
//         </div>
//         <div className="discover-information">
//           <h3>
//             {current.name}, {current.age}
//           </h3>
//           <p className="rolee">
//             <Suitcase size={20} color="#847062" />
//             <span style={{ marginLeft: "8px" }}>{current.role}</span>
//           </p>
//           <p className="locationn">
//             <MapPin size={20} color="#847062" />
//             <span style={{ marginLeft: "8px" }}>{current.location}</span>
//           </p>
//           <p className="about">{current.about}</p>

//           <div className="discover-tags">
//             <p className="tag-heading">Skills</p>
//             {current.skills.map((skill) => (
//               <span key={skill} className="discover-tag">
//                 {skill}
//               </span>
//             ))}
//           </div>

//           <div className="discover-tags">
//             <p className="tag-heading">Interests</p>
//             {current.interests.map((interest) => (
//               <span key={interest} className="tag interest">
//                 {interest}
//               </span>
//             ))}
//           </div>

//           <div className="discover-buttons">
//             <button className="x" onClick={handleDislike} disabled={sending}>
//               <X size={16} color="#ef4444" weight="bold" />
//             </button>

//             <button className="like" onClick={handleLike} disabled={sending}>
//               <HeartStraight size={16} color="#93501f" weight="bold" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content animate-popup">
//             <h3>Add a message</h3>
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Write a message..."
//               rows={4}
//               disabled={sending}
//             />
//             <div className="modal-actions">
//               <button
//                 onClick={handleSend}
//                 className="send-btn"
//                 disabled={sending}
//               >
//                 {sending ? <Loader2 className="animate-spin" size={16} /> : "Send"}
//               </button>
//               <button
//                 onClick={handleSkip}
//                 className="skip-btn"
//                 disabled={sending}
//               >
//                 {sending ? <Loader2 className="animate-spin" size={16} /> : "Skip"}
//               </button>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="cancel-btn"
//                 disabled={sending}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <ToastContainer
//         position="top-right"
//         autoClose={2500}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//     </div>
//   );
// }

// export default DiscoverPage;


import React from "react";
import "./DiscoverPage.css";
import { Suitcase, MapPin, X, HeartStraight } from "phosphor-react";
import useDiscoverProfiles from "./useDiscoverProfiles";
import { Loader2 } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DiscoverPage() {
  const {
    current,
    loading,
    error,
    showModal,
    setShowModal,
    message,
    setMessage,
    sending,
    handleLike,
    handleSend,
    handleSkip,
    handleDislike,
  } = useDiscoverProfiles();

  if (loading)
    return (
      <div className="loading-wrapper">
        <Loader2 className="animate-spin" size={40} color="#93501f" />
        <p>Loading recommendations...</p>
      </div>
    );

  if (error) return <p className="error-text">{error}</p>;

  if (!current)
    return <h1 className="no-profiles">No profiles available</h1>;

  return (
    <div className="discover-container">
      <h2>Discover Entrepreneurs</h2>
      <div className="discover-profile-card">
        <div className="image-wrapper">
          <img src={current.image} alt={current.name} />
          {current.verified && <span className="verified-badge">Verified</span>}
        </div>
        <div className="discover-information">
          <h3>
            {current.name}, {current.age}
          </h3>
          <p className="rolee">
            <Suitcase size={20} color="#847062" />
            <span>{current.role}</span>
          </p>
          <p className="locationn">
            <MapPin size={20} color="#847062" />
            <span>{current.location}</span>
          </p>
          <p className="about">{current.about}</p>

          <div className="discover-tags">
            <p className="tag-heading">Skills</p>
            {current.skills.map((skill) => (
              <span key={skill} className="discover-tag">
                {skill}
              </span>
            ))}
          </div>

          <div className="discover-tags">
            <p className="tag-heading">Interests</p>
            {current.interests.map((interest) => (
              <span key={interest} className="tag interest">
                {interest}
              </span>
            ))}
          </div>

          <div className="discover-buttons">
            <button className="x" onClick={handleDislike} disabled={sending}>
              <X size={16} color="#ef4444" weight="bold" />
            </button>
            <button className="like" onClick={handleLike} disabled={sending}>
              <HeartStraight size={16} color="#93501f" weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-popup">
            <h3>Add a message</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              rows={4}
              disabled={sending}
            />
            <div className="modal-actions">
              <button
                onClick={handleSend}
                className="send-btn"
                disabled={sending}
              >
                {sending ? <Loader2 className="animate-spin" size={16} /> : "Send"}
              </button>
              <button
                onClick={handleSkip}
                className="skip-btn"
                disabled={sending}
              >
                {sending ? <Loader2 className="animate-spin" size={16} /> : "Skip"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="cancel-btn"
                disabled={sending}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="colored"
      />
    </div>
  );
}

export default DiscoverPage;
