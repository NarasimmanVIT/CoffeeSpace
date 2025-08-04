<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ConnectSection from './components/ConnectSection'
import { Route, Routes } from 'react-router-dom'
import MessagesPage from './components/Messages/MessagesPage'
import PartnershipSection from "./Components/PartnershipSection";
import DiscoverPage from "./Components/DiscoverPage";
import MeetPartners from "./Components/MeetPartners";

function App() {

  return (
    <>
       <Navbar />
      <Routes>
        <Route path='/' element={ 
          <>
          <HeroSection />
          <ConnectSection />
          <MeetPartners />
          <PartnershipSection />
        </>
      } />
      <Route path='/messages' element={<MessagesPage />} />
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/discover" element={<DiscoverPage />} />
      {/* <Route path='/received' element={<ReceivedInvites/>} /> */}
      </Routes>
    </>
  )
}

export default App
=======

import React from "react";
import { Routes, Route } from "react-router-dom";
import PartnershipSection from "./Components/PartnershipSection";
import DiscoverPage from "./Components/DiscoverPage";
import MeetPartners from "./Components/MeetPartners";
import InvitesPage from "./Components/InvitesPage";


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
>>>>>>> origin/profiles
