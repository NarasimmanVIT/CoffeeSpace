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
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axiosInstance.get("api/conversations?page=0&size=10");
        if (res.data.success) {
          setConversations(res.data.data.profiles || []);
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
  };
};

export default useSidebar;
