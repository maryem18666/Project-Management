import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";

import AddClient from "./components/AddClient";
import AddProject from "./components/AddProject";
import AddTask from "./components/AddTask";
import AddTaskAdmin from "./components/AddTaskAdmin";
import Clients from "./components/Client";
import Dashboard from "./components/Dashboard";
import DashboradEmloyee from "./components/DashboradEmloyee";
import Footer from "./components/Footer";
import Gamification from "./components/Gamification";
import Header from "./components/Header";
import Home from "./components/Home";
import Dash from "./components/HomeAdmin";
import Login from "./components/Login";
import Messages from "./components/Message";
import Navbar from "./components/Navbar";
import Notes from "./components/Note";
import Profile from "./components/profile";
import Projectbar from "./components/Projectbar";
import ProjectList from "./components/ProjectList";
import Register from "./components/Register";
import Settings from "./components/Settings";
import TasksTable from './components/TasksTable';
import Tasks from './components/tasktotal';
import TaskAdmin from "./components/Taskadmin";
import TaskTableAdmin from './components/TaskTableAdmin';
import UpdateProject from "./components/UpdateProject";
import { MessageProvider } from "./context/MessageContext"; 

const userId = "67913e1f55ead5e532726e9b"; // Remplace par l'ID de l'utilisateur connecté


const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"], // Permet de gérer plusieurs types de connexion
  reconnectionAttempts: 5, // Réessayer en cas d'échec
  reconnectionDelay: 1000, // Attendre 1 seconde entre chaque tentative
});

socket.on("connect", () => {
  console.log("✅ Connecté au WebSocket !");
});

socket.on("connect_error", (error) => {
  console.error("❌ Erreur de connexion WebSocket :", error);
});

function App() {
  return (
    <MessageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dash" element={<Dash />} />
          <Route path="/DashEmployee" element={<DashboradEmloyee />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/add" element={<AddProject />} />
          <Route path="/projects/:id/edit" element={<UpdateProject />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/AddTask" element={<AddTask />} />
          <Route path="/AddTaskAdmin" element={<AddTaskAdmin />} />
          <Route path="/taskstotal" element={<Tasks />} />
          <Route path="/taskstable" element={<TasksTable />} />
          <Route path="/TaskAdmin" element={<TaskAdmin />} />
          <Route path="/tasktableadmin" element={<TaskTableAdmin />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/add" element={<AddClient />} />
          <Route path="/Note" element={<Notes />} />
          <Route path="/messages" element={<Messages socket={socket} userId={userId} />} />
          <Route path="/projectsbar" element={<Projectbar />} />
          <Route path="/gamification" element={<Gamification />} />
        </Routes>
      </Router>
      </MessageProvider>
  );
}

export default App;
