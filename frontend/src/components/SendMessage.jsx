import React, { useState } from "react";

const SendMessage = ({ setMessages, socket, users }) => {
  const [message, setMessage] = useState("");
  const [recipientId, setRecipientId] = useState(""); // ID de l'utilisateur destinataire

  // Fonction pour envoyer un message
  const sendMessage = () => {
    if (message.trim() && recipientId) {
      const newMessage = {
        id: Date.now(), // Générer un ID unique pour chaque message
        sender: "User", // Peut être dynamique selon l'utilisateur connecté
        recipientId,
        content: message,
        read: false,
      };

      // Envoyer le message via socket
      socket.emit("sendMessage", newMessage);

      // Ajouter le message à l'état local
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setMessage("");  // Réinitialiser le champ du message
    }
  };

  return (
    <div className="mb-4">
      {/* Sélecteur de destinataire (utilisateur) */}
      <select
        className="form-control mb-3"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
      >
        <option value="">Choisir un destinataire</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>

      <textarea
        className="form-control"
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrivez un message..."
      />
      <button
        className="btn btn-primary mt-2"
        onClick={sendMessage}
      >
        Envoyer
      </button>
    </div>
  );
};

export default SendMessage;
