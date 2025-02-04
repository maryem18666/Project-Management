import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AddClient from "./components/AddClient";
import AddProject from "./components/AddProject";
import AddTask from "./components/AddTask";
import Clients from "./components/Client";
import Dashboard from "./components/Dashboard";
import DashboradEmloyee from "./components/DashboradEmloyee";
import Footer from "./components/Footer";
import Gamification from "./components/Gamification";
import Header from "./components/Header";
import Home from "./components/Home";
import Dash from "./components/HomeUser";
import Login from "./components/Login";
import Messages from "./components/Message";
import Navbar from "./components/Navbar";
import Notes from "./components/Note";
import Profile from "./components/profile";
import Projectbar from "./components/Projectbar";
import ProjectList from "./components/ProjectList";
import Register from "./components/Register";
import Settings from "./components/Settings";
import TasksTable from "./components/TasksTable";
import Tasks from "./components/tasktotal";
import UpdateProject from "./components/UpdateProject";

function App() {
  const isAdmin = () => localStorage.getItem("userRole") === "admin";
  console.log("🚀 ~ App ~ isAdmin:", isAdmin);

  function PrivateRoute({ element }) {
    return isAdmin() ? element : <Navigate to="/DashEmployee" />;
  }
  return (
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
        <Route
          path="/add-project"
          element={<PrivateRoute element={<AddProject />} />}
        />
        {/* <Route path="/projects/add" element={<AddProject />} /> */}
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
