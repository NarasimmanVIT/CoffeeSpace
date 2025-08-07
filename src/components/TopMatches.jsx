import React from "react";
import "../styles/SidebarComponents.css";


const TopMatches = () => {
  const matches = ["Emma Wilson", "David Park", "Lisa Chen"];

  return (
    <div className="top-matches">
      <h3>Top Matches</h3>
      {matches.map((name) => (
        <p key={name}>
          {name}
          <br />
          <small>98% match</small>
        </p>
      ))}
    </div>
  );
};

export default TopMatches;
