import React, { useState, useEffect } from "react";
import axios from "axios";
import SendMessage from "./SendMessage";
import MessageList from "./MessageList";

const Messages = ({ socket, userId, onMarkAsRead }) => {
  const [messages, setMessages] = useState([]);
  const [recipients, setRecipients] = useState([]);

  // Charger les destinataires
  useEffect(() => {
    axios.get("http://localhost:3000/getall")
      .then(response => {
        setRecipients(response.data); // Met à jour la liste des destinataires
      })
      .catch(error => {
        console.error("Erreur lors du chargement des destinataires:", error);
      });
  }, []);

  // Charger les messages et écouter les nouveaux via WebSocket
  useEffect(() => {
    axios.get(`http://localhost:3000/messages/${userId}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des messages:", error);
      });

    if (socket) { // Vérifier si socket est défini
      socket.on("receiveMessage", (newMessage) => {
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [socket, userId]);

  return (
    <div>
      <h2>Messages</h2>
      <SendMessage socket={socket} users={recipients} userId={userId} setMessages={setMessages} />
      <MessageList messages={messages || []} users={recipients || []} onMarkAsRead={onMarkAsRead}/>
    </div>
  );
};

export default Messages;
