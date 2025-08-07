import React from "react";
import "../styles/SidebarComponents.css";


const QuickStats = () => {
  return (
    <div className="quick-stats">
      <h3>Quick Stats</h3>
      <p>Profile views: <strong>142</strong></p>
      <p>Matches: <strong>23</strong></p>
      <p>Messages: <strong>8</strong></p>
    </div>
  );
};

export default QuickStats;
