import React from "react";
import "./ConnectSection.css"; // Same CSS

const ConnectBox = ({ icon, title, description }) => {
  return (
    <div className="connect-box">
      <div className="connect-icon icon-circle">{icon}</div>
      <h3 className="connect-title">{title}</h3>
      <p className="connect-description">{description}</p>
    </div>
  );
};

export default ConnectBox;