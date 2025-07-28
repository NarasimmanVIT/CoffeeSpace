
import React from "react";
import { Routes, Route } from "react-router-dom";
import PartnershipSection from "./Components/PartnershipSection";
import DiscoverPage from "./Components/DiscoverPage";
import MeetPartners from "./Components/MeetPartners";

function HomePage() {
  return (
    <>
      <MeetPartners />
      <PartnershipSection />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/discover" element={<DiscoverPage />} />
    </Routes>
  );
}

export default App;
