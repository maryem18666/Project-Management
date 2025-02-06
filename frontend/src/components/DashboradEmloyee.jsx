import React from "react";

import Gamification from "./Gamification";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import StatsDashboard from "./StatsDashboard";
import TaskAdmin from "./Taskadmin";


const DashContent = () => {

  return (
    <div className="d-flex">
      <Sidebar role="user" />
      <div className="flex-grow-1 p-4 bg-light" style={{ paddingTop: "70px" }}>
        <Navbar />
        <StatsDashboard />
        <TaskAdmin />
        <Gamification />

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