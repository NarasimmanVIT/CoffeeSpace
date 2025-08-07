
import React from "react";
import { Routes, Route } from "react-router-dom";
import PartnershipSection from "./Components/PartnershipSection";
import DiscoverPage from "./components/DiscoverPage";
import MeetPartners from "./Components/MeetPartners";
import InvitesPage from "./components/InvitesPage";


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
      <Route path="/invites" element={<InvitesPage />} />
    </Routes>
  );
}

export default App;
