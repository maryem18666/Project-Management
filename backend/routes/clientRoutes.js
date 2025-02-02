const express = require("express");
const router = express.Router();
const Client = require("../models/client");

// Route POST pour ajouter un client
router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  const newClient = new Client({ name, email, phone });

  try {
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);  // Renvoie le client ajouté
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du client.' });
  }
});

// Route GET pour récupérer tous les clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);  // Renvoie la liste des clients
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des clients.' });
  }
});

module.exports = router;
