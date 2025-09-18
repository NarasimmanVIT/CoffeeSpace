import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import useAuthStore from "../../../store/authStore";
import useChatWebSocket from "./useChatWebSocket";

const useChatBox = (selectedUser) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  const myId = useAuthStore((state) => state.userId);

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };


  useEffect(() => {
    if (!selectedUser?.conversationId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `api/messages/${selectedUser.conversationId}?page=0&size=20`
        );
        if (res.data.success) {
          setMessages(res.data.data.messages || []);
        } else {
          setError(res.data.message || "Failed to fetch messages");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedUser?.conversationId]);

  const { sendMessage } = useChatWebSocket(
    myId,
    selectedUser?.conversationId,
    (msg) => setMessages((prev) => [...prev, msg]) 
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setSending(true);
    sendMessage(selectedUser.participantId, newMessage.trim());
    setNewMessage("");
    setSending(false);
  };

  return {
    messages,
    loading,
    error,
    newMessage,
    setNewMessage,
    sending,
    handleSendMessage,
    myId,
    formatTime,
  };
};

export default useChatBox;
