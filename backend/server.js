
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/signup");
const projectRoutes = require("./routes/projectRoutes");
const clientRoutes = require("./routes/clientRoutes");
const messagesRoutes = require("./routes/messages");
const taskRoutes = require("./routes/taskRoutes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/*const app = express();*/

const http = require("http");
const socketIo = require("socket.io");

const nodemailer = require("nodemailer");

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Ton email
    pass: process.env.EMAIL_PASS, // Ton mot de passe (ou app password)
  },
});

const app = express();

const server = http.createServer(app);
const io = socketIo(server);
io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté");

  socket.on("sendMessage", (message) => {
    // Traite l'envoi de message
    console.log(message);
    // Émet le message aux autres utilisateurs
    socket.broadcast.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});
// Rendre `io` accessible dans l'application
app.set("socketio", io);

app.use(cors());
require("./config/connect");

// Middleware pour parser les requêtes JSON si nécessaire
app.use(express.json());
app.use("/projects", projectRoutes);
app.use("/clients", clientRoutes);
app.use("/messages", messagesRoutes);
app.use("/taskstotal", taskRoutes);

app.post("/register", async (req, res) => {
  try {
    const data = req.body;

    const user = new User(data);
    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync(data.password, salt);
    user.password = cryptedPass;
    const savedUser = await user.save();

    res.status(201).send(savedUser);
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'utilisateur:", err);
    res.status(500).send("Erreur serveur");
  }
});

app.post("/login", async (req, res) => {
  try {
    const data = req.body;

    // Vérifier si l'email et le mot de passe sont fournis
    if (!data.email || !data.password) {
      return res.status(400).send("Email et mot de passe requis !");
    }

    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(404).send("Email ou mot de passe invalide !");
    }

    // Vérifier si le mot de passe correspond
    const validPass = bcrypt.compareSync(data.password, user.password);
    if (!validPass) {
      return res.status(401).send("Email ou mot de passe invalide !");
    }

    // Créer un payload pour le token
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // Générer un token JWT
    // const token = jwt.sign(payload, "123456", { expiresIn: "1h" }); // Durée de validité du token : 1 heure
    const token = jwt.sign(payload, process.env.JWT_SECRET || "123456", {
      expiresIn: "1h", // Durée de validité du token : 1 heure
    });

    // Répondre avec le token
    res.status(200).send({ mytoken: token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).send("Erreur serveur");
  }
});

app.post("/create", async (req, res) => {
  try {
    data = req.body;
    const user = new User(data);
    savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.send(error);
  }
});

app.get("/getall", async (req, res) => {
  try {
    const users = await User.find({}, "_id name"); // Récupère uniquement `_id` et `username` des utilisateurs
    const clients = await Client.find({}, "_id name"); // Récupère `_id` et `username` des clients

    const allUsers = [...users, ...clients]; // Fusionne les deux tableaux

    res.json(allUsers); // Envoie la liste complète
    console.log("getall work");
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs et clients:", err);
    res.status(500).send(err);
  }
});

/*app.get("/getall", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
  console.log("getall work");
});*/

app.put("/update", (req, res) => {
  console.log("update work");
});

app.listen(3000, () => {
  console.log("server work");
});
