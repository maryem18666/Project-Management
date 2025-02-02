import React from "react";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import StatsDashboard from "./StatsDashboard";
import TeamWorkload from "./TeamWorkload";


const DashContent = () => {

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4 bg-light" style={{ paddingTop: "70px" }}>
        <Navbar />
        <StatsDashboard />
        <TeamWorkload />
        <Dashboard />

      </div>
    </div>
  );
};

const Dash = () => {
  return (
      <DashContent />
  );
};

export default Dash;