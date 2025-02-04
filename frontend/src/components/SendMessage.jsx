import React, { useState } from "react";

const SendMessage = ({ setMessages, socket, users, userId }) => {
  const [message, setMessage] = useState("");
  const [recipientId, setRecipientId] = useState(""); // ID du destinataire

  // Fonction pour envoyer un message
  const sendMessage = () => {
    if (message.trim() && recipientId) {
      const newMessage = {
        senderId: userId, // ID de l'expéditeur (connecté)
        recipientId, // ID du destinataire
        content: message,
        read: false,
      };

      if (socket) {
        // Vérifie si la connexion WebSocket est active avant d'envoyer
        socket.emit("sendMessage", newMessage);
      } else {
        console.error("WebSocket non connecté.");
      }

      // Ajoute le message à l'état local
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setMessage(""); // Réinitialise le champ du message
      
    } else {
      console.error("Veuillez remplir tous les champs.");
    }
  };

  return (
    <div className="mb-4">
      {/* Sélecteur de destinataire */}
      <select
        className="form-control mb-3"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
      >
        <option value="">Choisir un destinataire</option>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.email}
            </option>
          ))
        ) : (
          <option disabled>Aucun utilisateur trouvé</option>
        )}
      </select>

      {/* Champ de texte pour le message */}
      <textarea
        className="form-control"
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrivez un message..."
      />

      {/* Bouton pour envoyer */}
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
