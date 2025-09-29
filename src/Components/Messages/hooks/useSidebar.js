import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

const useSidebar = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const markAsReadLocal = (conversationId) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.conversationId === conversationId
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axiosInstance.get("api/conversations?page=0&size=10");
        if (res.data.success) {
          setConversations(res.data.data.conversations || []);
        } else {
          setError(res.data.message || "Failed to fetch conversations");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(search.toLowerCase())
  );

  return {
    conversations,
    loading,
    error,
    search,
    setSearch,
    filteredConversations,
    formatTimestamp,
    markAsReadLocal
  };
};

export default useSidebar;

// import { useEffect, useState } from "react";
// import axiosInstance from "../../../api/axiosInstance";

// const useSidebar = () => {
//   const [conversations, setConversations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");

//   // Fetch conversations
//   const fetchConversations = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axiosInstance.get("/api/conversations");
//       console.log("API response:", res.data);

//       // Ensure conversations is always an array
//       setConversations(
//         Array.isArray(res.data) ? res.data.conversations : res.data.conversations || []
//       );
//     } catch (err) {
//       console.error("Failed to fetch conversations:", err);
//       setError("Failed to load conversations");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Optimistic mark as read
//   const markAsRead = async (conversationId) => {
//     // ✅ update local state immediately
//     setConversations((prev) =>
//       prev.map((c) =>
//         c.conversationId === conversationId ? { ...c, unreadCount: 0 } : c
//       )
//     );

//     // ✅ also call backend
//     try {
//       await axiosInstance.post(`/api/conversations/${conversationId}/read`);
//     } catch (err) {
//       console.error("Failed to mark as read:", err);
//       // optional: rollback if needed
//     }
//   };

//   // Format timestamp helper
//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return "";
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   // Filter conversations by search
//   const filteredConversations = conversations.filter((c) =>
//     c.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   useEffect(() => {
//     fetchConversations();
//   }, []);

//   return {
//     conversations,
//     loading,
//     error,
//     search,
//     setSearch,
//     filteredConversations,
//     formatTimestamp,
//     markAsRead, // 👈 export function
//   };
// };

// export default useSidebar;
