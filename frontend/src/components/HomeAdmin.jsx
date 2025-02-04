import React from "react";

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