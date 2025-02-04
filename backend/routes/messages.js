const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Route pour récupérer les messages d'un utilisateur spécifique
router.get("/:userId", async (req, res) => {
  try {
    const messages = await Message.find({ recipientId: req.params.userId }); // Utilisation de recipientId
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des messages", error: err });
  }
});

// Route pour envoyer un message
router.post("/", async (req, res) => {
  const { senderId, recipientId, content } = req.body;

  if (!senderId || !recipientId || !content) {
    return res.status(400).json({ message: "Tous les champs doivent être remplis." });
  }

  try {
    const newMessage = new Message({ senderId, recipientId, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'envoi du message", error: err });
  }
});

// Route pour marquer un message comme lu
router.put("/read/:messageId", async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.messageId, { read: true }, { new: true });
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du message", error: err });
  }
});

module.exports = router;
