import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null); // Stocke l'utilisateur connecté

  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  return (
    <MessageContext.Provider value={{ messages, setMessages, user, setUser }}>
      {children}
    </MessageContext.Provider>
  );
};
