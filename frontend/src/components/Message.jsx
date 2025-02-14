import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "../context/MessageContext";
import axios from "axios";

const Messages = ({ socket }) => {
  const { messages, setMessages, user } = useContext(MessageContext);
  const [input, setInput] = useState("");
  const [receiver, setReceiver] = useState(""); // Destinataire dynamique

  useEffect(() => {
    socket.on("newMessage", (message) => {
      if (message.receiver === user?.email || message.sender === user?.email) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, user]);

  const sendMessage = async () => {
    if (input.trim() === "" || !receiver) return;

    const messageData = {
      sender: user.email, // Expéditeur dynamique
      receiver, // Destinataire sélectionné
      message: input,
    };

    try {
      await axios.post("http://localhost:3000/api/messages", messageData);
      socket.emit("sendMessage", messageData); // Envoi au WebSocket
      setInput("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };

  return (
    <div>
      <h2>Messagerie</h2>

      {/* Sélecteur de destinataire */}
      <select value={receiver} onChange={(e) => setReceiver(e.target.value)}>
        <option value="">Choisir un destinataire</option>
        <option value="maram20@gmail.com">Maram</option>
        <option value="user2@example.com">Utilisateur 2</option>
        {/* Ajouter dynamiquement d'autres utilisateurs */}
      </select>

      {/* Affichage des messages */}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender} → {msg.receiver}:</strong> {msg.message}
          </li>
        ))}
      </ul>

      {/* Champ d'envoi de message */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Écrivez un message..."
      />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
};

export default Messages;
