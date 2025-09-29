// import { useEffect, useState } from "react";
// import axiosInstance from "../../../api/axiosInstance";
// import useAuthStore from "../../../store/authStore";
// import useChatWebSocket from "./useChatWebSocket";

// const useChatBox = (selectedUser) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [sending, setSending] = useState(false);

//   const myId = useAuthStore((state) => state.userId);

//   const formatTime = (timestamp) => {
//     if (!timestamp) return "";
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   useEffect(() => {
//     if (!selectedUser?.conversationId) return;

//     const fetchMessages = async () => {
//       setLoading(true);
//       try {
//         const res = await axiosInstance.get(
//           `api/messages/${selectedUser.conversationId}?page=0&size=20`
//         );
//         if (res.data.success) {
//           setMessages(res.data.data.messages || []);
//         } else {
//           setError(res.data.message || "Failed to fetch messages");
//         }
//       } catch (err) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, [selectedUser?.conversationId]);

//   const { sendMessage } = useChatWebSocket(
//     myId,
//     selectedUser?.conversationId,
//     (msg) => setMessages((prev) => [...prev, msg])
//   );

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return;
//     setSending(true);

//     const messageText = newMessage.trim();

//     try {
//       sendMessage(selectedUser.participantId, messageText);

//       await axiosInstance.post("api/messages", {
//         conversationId: selectedUser.conversationId,
//         senderId: myId,
//         receiverId: selectedUser.participantId,
//         text: messageText,
//       });

//       setNewMessage("");
//     } catch (err) {
//       setError(err.message || "Failed to send message");
//     } finally {
//       setSending(false);
//     }
//   };

//   return {
//     messages,
//     loading,
//     error,
//     newMessage,
//     setNewMessage,
//     sending,
//     handleSendMessage,
//     myId,
//     formatTime,
//   };
// };

// export default useChatBox;



import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../api/axiosInstance";
import useAuthStore from "../../../store/authStore";
import useChatWebSocket from "./useChatWebSocket";

const useChatBox = (selectedUser) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [online, setOnline] = useState(false);

  const myId = useAuthStore((state) => state.userId);
  const messagesEndRef = useRef(null);

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Fetch initial messages
  useEffect(() => {
    if (!selectedUser?.conversationId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `api/messages/${selectedUser.conversationId}?page=0&size=100`
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

  // WebSocket setup
  const { sendMessage, isUserOnline } = useChatWebSocket(
    myId,
    selectedUser?.conversationId,
    (msg) => setMessages((prev) => [...prev, msg])
  );

  // Update online status
  useEffect(() => {
    if (selectedUser?.participantId) {
      setOnline(isUserOnline(selectedUser.participantId));
    }
  }, [selectedUser, isUserOnline]);

  // Send message handler
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setSending(true);

    const messageText = newMessage.trim();

    try {
      sendMessage(selectedUser.participantId, messageText);

      await axiosInstance.post("api/messages", {
        conversationId: selectedUser.conversationId,
        senderId: myId,
        receiverId: selectedUser.participantId,
        text: messageText,
      });

      setNewMessage("");
    } catch (err) {
      setError(err.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // Auto-scroll whenever messages or selectedUser changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedUser]);

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
    online,
    messagesEndRef, 
  };
};

export default useChatBox;
