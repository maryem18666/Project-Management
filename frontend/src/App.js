import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";

import { MessageProvider } from "./context/MessageContext"; 
import AddClient from "./components/AddClient";
import AddProject from "./components/AddProject";
import AddTask from "./components/AddTask";
import Clients from "./components/Client";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Gamification from "./components/Gamification";
import Header from "./components/Header";
import Home from "./components/Home";
import Dash from "./components/HomeAdmin";
import DashboradEmloyee from "./components/DashboradEmloyee";
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
import UpdateProject from "./components/UpdateProject";


const socket = io("http://localhost:3000"); // Remplace par l'URL de ton serveur

const userId = "67913e1f55ead5e532726e9b"; // Remplace par l'ID de l'utilisateur connecté


function App() {
  return (
    <MessageProvider>
      <Router>
        <Navbar />
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
          <Route path="/taskstotal" element={<Tasks />} />
          <Route path="/taskstable" element={<TasksTable />} />
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
