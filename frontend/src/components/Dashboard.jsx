import React, { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Dashboard() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="container-fluid mt-4">

      {/* Section Calendrier */}
      <div className="text-center mb-4">
        <h3>Calendrier des échéances</h3>
        <Calendar value={date} onChange={setDate} className="mx-auto" />
      </div>
    </div>
  );
}

export default Dashboard;
