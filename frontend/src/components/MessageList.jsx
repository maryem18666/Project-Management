import React from "react";
import { FaEnvelope } from "react-icons/fa"; // Icône pour les messages

const MessageItem = ({ message, onMarkAsRead }) => (
  <li
    className={`message-item ${message.read ? "message-read" : "message-unread"}`}
  >
    <div className="message-content">
      <FaEnvelope className="message-icon" />
      <strong>{message.sender}:</strong> {message.content}
    </div>
    <button
      className={`mark-read-btn ${message.read ? "read" : "unread"}`}
      onClick={() => onMarkAsRead(message.id)}
    >
      {message.read ? "Marquer comme non lu" : "Marquer comme lu"}
    </button>
  </li>
);

const MessageList = ({ messages, onMarkAsRead }) => {
  return (
    <div className="message-list-container">
      <ul className="message-list">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} onMarkAsRead={onMarkAsRead} />
          ))
        ) : (
          <li>Aucun message reçu.</li>
        )}
      </ul>
    </div>
  );
};

export default MessageList;
