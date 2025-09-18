import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const useChatWebSocket = (userId, conversationId, onMessage) => {
  const stompClient = useRef(null);

  useEffect(() => {
    if (!userId || !conversationId) return;

    const socket = new SockJS("https://86299174054c.ngrok-free.app/ws");
    stompClient.current = over(socket);

    stompClient.current.connect({}, () => {
      console.log("WebSocket connected");

      stompClient.current.subscribe(
        `/topic/conversations/${conversationId}`,
        (msg) => {
          const body = JSON.parse(msg.body);
          console.log("Incoming message:", body);
          onMessage(body); 
        }
      );
    });

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect(() => {
          console.log("WebSocket disconnected");
        });
      }
    };
  }, [userId, conversationId]);

  const sendMessage = (receiverId, text) => {
    if (!stompClient.current || !text.trim()) return;

    const msg = {
      conversationId,
      senderId: userId,
      receiverId,
      text,
    };

    stompClient.current.send("/app/chat.sendMessage", {}, JSON.stringify(msg));
  };

  return { sendMessage };
};

export default useChatWebSocket;

