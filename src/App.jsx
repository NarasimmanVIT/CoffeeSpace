
import React from "react";
import { Routes, Route } from "react-router-dom";
import PartnershipSection from "./Components/PartnershipSection/PartnershipSection";
import DiscoverPage from "./Components/DiscoverPage/DiscoverPage";
import MeetPartners from "./Components/MeetPartners/MeetPartners";
import InvitesPage from "./Components/InvitesPage/InvitesPage";


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
