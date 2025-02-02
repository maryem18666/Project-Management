import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Header from "./components/Header";
import Dash from "./components/HomeUser";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProjectList from "./components/ProjectList";
import AddProject from "./components/AddProject";
import UpdateProject from "./components/UpdateProject";
import Settings from "./components/Settings";
import Profile from "./components/profile";
import AddTask from "./components/AddTask";
import Tasks from './components/tasktotal';
import TasksTable from './components/TasksTable';
import Notes from "./components/Note";
import Clients from "./components/Client";
import AddClient from "./components/AddClient";
import Messages from "./components/Message";

import Projectbar from "./components/Projectbar";
import Gamification from "./components/Gamification";

function App() {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dash" element={<Dash />} />
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
          <Route path="/messages" element={<Messages />} />
          <Route path="/projectsbar" element={<Projectbar />} />
          <Route path="/gamification" element={<Gamification />} />
        </Routes>
      </Router>

  );
}

export default App;
