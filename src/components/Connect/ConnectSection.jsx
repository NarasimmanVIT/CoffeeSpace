import React from "react";
import "./ConnectSection.css";
import ConnectBox from "./ConnectBoxes";
import connectData from "./ConnectData"

const ConnectSection = () => {
  return (
    <section className="connect-section">
      {/* SECTION 1 */}
      <div className="connect-top">
        <h1>Connect Based on Shared Interests</h1>
        <p>
         CoffeeSpace brings together entrepreneurs who share similar business interests, <br /> industry focus, and collaborative goals. Find your ideal business partners through meaningful connections.
        </p>

        <div className="connect-boxes">
           {connectData.map((box, index) => (
            <ConnectBox
              key={index}
              icon={box.icon}
              title={box.title}
              description={box.description}
            />
          ))}
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="connect-bottom">
        <h2>Ready to Find Your Business Partners?</h2>
        <p>
         Join a community where entrepreneurial minds connect based on shared interests and business goals. Your next <br /> business partner or collaborator is waiting to connect with you.
        </p>

        <div className="connect-buttons">
          <div className="connect-btn similar-btn">
            <h4>Similar Industries</h4>
            <p>Connect with entrepreneurs in your industry <br /> or related fields</p>
          </div>
          <div className="connect-btn interest-btn">
            <h4>Shared Interests</h4>
            <p>Find partners who share your business vision <br /> and goals</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;