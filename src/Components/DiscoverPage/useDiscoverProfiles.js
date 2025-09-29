// import { useEffect, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import { toast } from "react-toastify";

// const useDiscoverProfiles = () => {
//   const [profiles, setProfiles] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchProfiles = async (pageNum) => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get(
//         `api/recommendations?page=${pageNum}&size=10`
//       );

//       const apiProfiles = res.data?.data?.profiles || [];

//       const mappedProfiles = apiProfiles.map((p) => ({
//         id: p.profileId,
//         name: `${p.firstName} ${p.lastName}`,
//         age: p.age,
//         role: p.goal,
//         location: p.city,
//         about: p.experience,
//         skills: p.skills || [],
//         interests: p.industries || [],
//         image: p.profilePicUrl,
//         verified: false,
//       }));

//       setProfiles(mappedProfiles);
//       setTotalPages(res.data?.data?.totalPages || 1);
//       setIndex(0);
//     } catch (err) {
//       setError("Failed to fetch recommendations");
//       console.error("Error fetching profiles:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfiles(0);
//   }, []);

//   const interact = async (action, message = "") => {
//     const currentProfile = profiles[index];
//     if (!currentProfile) return;

//     try {
//       const payload = { targetProfileId: currentProfile.id, type: action };

//       if (action === "LIKE" && message.trim() !== "") {
//         payload.message = message;
//       }

//       const res = await axiosInstance.post("api/interactions", payload);

//       toast.success(
//         res.data?.message || `You ${action === "LIKE" ? "liked" : "disliked"} ${currentProfile.name}`
//       );
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to record interaction");
//     } finally {
//       handleNext();
//     }
//   };

//   const handleNext = () => {
//     const isLastProfile = index === profiles.length - 1;

//     if (isLastProfile && page < totalPages - 1) {
//       const nextPage = page + 1;
//       setPage(nextPage);
//       fetchProfiles(nextPage);
//     }

//     if (index < profiles.length - 1) {
//       setIndex(index + 1);
//     }
//   };

//   const current = profiles[index];
//   const remaining = profiles.length - index - 1;

//   return {
//     current,
//     remaining,
//     interact,
//     handleNext,
//     loading,
//     error,
//   };
// };

// export default useDiscoverProfiles;


import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const useDiscoverProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI states moved here
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const fetchProfiles = async (pageNum) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `api/recommendations?page=${pageNum}&size=10`
      );

      const apiProfiles = res.data?.data?.profiles || [];

      const mappedProfiles = apiProfiles.map((p) => ({
        id: p.profileId,
        name: `${p.firstName} ${p.lastName}`,
        age: p.age,
        role: p.goal,
        location: p.city,
        about: p.experience,
        skills: p.skills || [],
        interests: p.industries || [],
        image: p.profilePicUrl,
        verified: false,
      }));

      setProfiles(mappedProfiles);
      setTotalPages(res.data?.data?.totalPages || 1);
      setIndex(0);
    } catch (err) {
      setError("Failed to fetch recommendations");
      console.error("Error fetching profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(0);
  }, []);

  const handleNext = () => {
    const isLastProfile = index === profiles.length - 1;

    if (isLastProfile && page < totalPages - 1) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProfiles(nextPage);
    }

    if (index < profiles.length - 1) {
      setIndex(index + 1);
    }
  };

  const interact = async (action, msg = "") => {
    const currentProfile = profiles[index];
    if (!currentProfile) return;

    try {
      const payload = { targetProfileId: currentProfile.id, type: action };

      if (action === "LIKE" && msg.trim() !== "") {
        payload.message = msg;
      }

      const res = await axiosInstance.post("api/interactions", payload);

      toast.success(
        res.data?.message ||
          `You ${action === "LIKE" ? "liked" : "disliked"} ${currentProfile.name}`
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to record interaction");
    } finally {
      handleNext();
    }
  };

  // 👇 Event handlers moved here
  const handleLike = () => setShowModal(true);

  const handleSend = async () => {
    setSending(true);
    await interact("LIKE", message);
    setMessage("");
    setSending(false);
    setShowModal(false);
  };

  const handleSkip = async () => {
    setSending(true);
    await interact("LIKE", "");
    setMessage("");
    setSending(false);
    setShowModal(false);
  };

  const handleDislike = async () => {
    setSending(true);
    await interact("DISLIKE");
    setSending(false);
  };

  const current = profiles[index];
  const remaining = profiles.length - index - 1;

  return {
    current,
    remaining,
    loading,
    error,
    // UI + actions exposed
    showModal,
    setShowModal,
    message,
    setMessage,
    sending,
    handleLike,
    handleSend,
    handleSkip,
    handleDislike,
  };
};

export default useDiscoverProfiles;
