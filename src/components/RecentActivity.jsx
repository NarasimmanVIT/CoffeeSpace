import React from "react";
import "../styles/SidebarComponents.css";


const RecentActivity = () => {
  return (
    <div className="recent-activity">
      <h3>Recent Activity</h3>
      <p>  You liked Alex Chen</p>
      <small>2 hours ago</small>
      <p>  New match with Maria</p>
      <small>1 day ago</small>
    </div>
  );
};

export default RecentActivity;
