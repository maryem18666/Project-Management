import React from "react";

import Dashboard from "./Dashboard";
import Gamification from "./Gamification";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import StatsDashboard from "./StatsDashboard";
import Tasks from "./tasktotal";
import TeamWorkload from "./TeamWorkload";

const DashContent = () => {

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4 bg-light" style={{ paddingTop: "70px" }}>
        <Navbar />
        <StatsDashboard />
        <Tasks />
        <TeamWorkload />
        <Gamification />
        <Dashboard />

      </div>
    </div>
  );
};

const DashboradEmloyee = () => {
  return (
      <DashContent />
  );
};

export default DashboradEmloyee;