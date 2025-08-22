import React from "react";
import "./PartnershipSection.css";
import {Users, Lightning} from "phosphor-react";

function PartnershipSection() {
  return (
    <div className="partnership-section">
      <h1>
        Ready to Find Your <br />
        <span className="highlight">Business Partners?</span>
      </h1>
      <p className="subtext">
        Join thousands of entrepreneurs who have already connected based on
        shared interests and business goals. Your perfect collaboration partner is waiting.
      </p>

      <div className="cards-container">
        <div className="card">
          <div className="card-logo">
            <Users size={40} color="#ED8E5E" weight="regular" />
          </div>
          <div className="card-title">Industry Matching</div>
          <p className="card-description">
            Connect with entrepreneurs in your industry or complementary sectors for strategic partnerships.
          </p>
          <button className="card-button">Find Partners →</button>
        </div>

        <div className="card">
          <div className="card-logo">

            <Lightning size={40} color="#ED8E5E" weight="regular" />
          </div>
          <div className="card-title">Interest Alignment</div>
          <p className="card-description">
            Discover entrepreneurs who share your business interests, goals, and collaborative vision.
          </p>
          <button className="card-button">Browse Interests →</button>
        </div>
      </div>

      <p className="community-text">
        Join our community today - it's free to get started!
      </p>
      <button className="get-access-button">Get Early Access</button>
    </div>
  );
}

export default PartnershipSection;

