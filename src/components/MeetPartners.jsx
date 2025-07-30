import React from "react";
import ProfileCard from "./ProfileCard";
import "../styles/MeetPartners.css";

const MeetPartners = () => {
  const profiles = [
    {
      name: "Sarah Chen",
      role: "Entrepreneur",
      location: "San Francisco, CA",
      image: "https://i.pravatar.cc/100?img=47",
      bio: "Building the future of sustainable fashion. Looking for a full-stack developer to join my eco-friendly marketplace startup.",
      tags: ["E-commerce", "Sustainability", "Marketing"],
      rating: 4.9,
      projects: 3,
    },
    {
      name: "Alex Rodriguez",
      role: "Full-Stack Developer",
      location: "Austin, TX",
      image: "https://i.pravatar.cc/100?img=47",
      bio: "Passionate developer with 5+ years experience. Love working on innovative projects that make a real impact.",
      tags: ["React", "Node.js", "TypeScript", "AWS", "Python"],
      rating: 4.8,
      projects: 12,
    },
    {
      name: "Maya Patel",
      role: "Entrepreneur",
      location: "New York, NY",
      image: "https://i.pravatar.cc/100?img=47",
      bio: "FinTech entrepreneur revolutionizing small business lending. Seeking a backend developer with financial sector experience.",
      tags: ["FinTech", "Analytics", "Strategy"],
      rating: 5,
      projects: 2,
    },
  ];

  return (
    <div className="app-container">
      <h1>Meet Your Future Partners</h1>
      <p className="subtitle">
        Discover talented individuals ready to collaborate. From visionary
        entrepreneurs to skilled developers, find the perfect match for your
        next venture.
      </p>
      <div className="cards-wrapper">
        {profiles.map((profile, index) => (
          <ProfileCard key={index} {...profile} />
        ))}
      </div>
      <button className="view-all-btn">View All Profiles</button>
    </div>
  );
};

export default MeetPartners;
