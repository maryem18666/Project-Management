const express = require("express");
const router = express.Router();
const Client = require("../models/client");

// Route POST pour ajouter un client
router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: "Tous les champs sont obligatoires." });
  }

  try {
    const newClient = new Client({ name, email, phone });
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout du client.", error });
  }
});

// Route GET pour récupérer tous les clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des clients.", error });
  }
});

// Route DELETE pour supprimer un client
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("ID reçu pour suppression :", id); // Vérification de l'ID

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    await Client.deleteOne({ _id: id });
    res.status(200).json({ message: "Client supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du client:", error);
    res.status(500).json({ message: "Erreur lors de la suppression du client.", error: error.message });
  }
});




module.exports = router;
