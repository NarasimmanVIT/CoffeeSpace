import { useEffect, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const useChatWebSocket = (userId, conversationId, onMessage) => {
  const stompClient = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!userId || !conversationId) return;

    const socket = new SockJS(`${baseURL}ws`);
    const client = over(socket);
    stompClient.current = client;

    client.connect(
      {},
      () => {
        console.log("✅ WebSocket connected");
        setIsConnected(true);

        // Subscribe to conversation messages
        client.subscribe(`/topic/conversations/${conversationId}`, (msg) => {
          try {
            const body = JSON.parse(msg.body);
            console.log("📩 Incoming message:", body);
            onMessage(body);
          } catch (err) {
            console.error("Failed to parse message", err);
          }
        });

        // Subscribe to presence updates
        client.subscribe(`/topic/presence/${conversationId}`, (msg) => {
          try {
            const body = JSON.parse(msg.body); // { userId: 45, isOnline: true }
            setOnlineUsers((prev) => {
              const newSet = new Set(prev);
              if (body.isOnline) newSet.add(body.userId);
              else newSet.delete(body.userId);
              return newSet;
            });
          } catch (err) {
            console.error("Failed to parse presence message", err);
          }
        });
      },
      (error) => {
        console.error("❌ Connection error:", error);
        setIsConnected(false);
      }
    );

    return () => {
      if (stompClient.current && isConnected) {
        stompClient.current.disconnect(() => {
          console.log("❌ WebSocket disconnected");
          setIsConnected(false);
        });
      }
    };
  }, [userId, conversationId]);

  const sendMessage = (receiverId, text) => {
    if (!isConnected) {
      console.warn("Cannot send message, WebSocket not connected yet");
      return;
    }
    if (!text.trim()) return;

    const msg = {
      conversationId,
      senderId: userId,
      receiverId,
      text,
    };

    try {
      stompClient.current.send("/app/chat.sendMessage", {}, JSON.stringify(msg));
      console.log("✅ Sent message:", msg);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  // Function to check if a user is online
  const isUserOnline = useCallback(
    (userId) => onlineUsers.has(userId),
    [onlineUsers]
  );

  return { sendMessage, isConnected, isUserOnline };
};

export default useChatWebSocket;





// import { useEffect, useRef, useState } from "react";
// import SockJS from "sockjs-client";
// import { over } from "stompjs";

// const useChatWebSocket = (userId, conversationId, onMessage) => {
//   const stompClient = useRef(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const baseURL = import.meta.env.VITE_BASE_URL;

//   useEffect(() => {
//     if (!userId || !conversationId) return;

//     const socket = new SockJS(`${baseURL}ws`);
//     const client = over(socket);
//     stompClient.current = client;

//     client.connect(
//       {},
//       () => {
//         console.log(" WebSocket connected");
//         setIsConnected(true);

//         client.subscribe(`/topic/conversations/${conversationId}`, (msg) => {
//           try {
//             const body = JSON.parse(msg.body);
//             console.log(" Incoming message:", body);
//             onMessage(body);
//           } catch (err) {
//             console.error(" Failed to parse message", err);
//           }
//         });
//       },
//       (error) => {
//         console.error(" Connection error:", error);
//         setIsConnected(false);
//       }
//     );

//     return () => {
//       if (stompClient.current && isConnected) {
//         stompClient.current.disconnect(() => {
//           console.log(" WebSocket disconnected");
//           setIsConnected(false);
//         });
//       }
//     };
//   }, [userId, conversationId]);

//   const sendMessage = (receiverId, text) => {
//     if (!isConnected) {
//       console.warn(" Cannot send message, WebSocket not connected yet");
//       return;
//     }
//     if (!text.trim()) return;

//     const msg = {
//       conversationId,
//       senderId: userId,
//       receiverId,
//       text,
//     };

//     try {
//       stompClient.current.send(
//         "/app/chat.sendMessage",
//         {},
//         JSON.stringify(msg)
//       );
//       console.log(" Sent message:", msg);
//     } catch (err) {
//       console.error(" Failed to send message", err);
//     }
//   };

//   return { sendMessage, isConnected };
// };

// export default useChatWebSocket;
