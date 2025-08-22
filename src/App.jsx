import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/HeroSection/HeroSection' 
import ConnectSection from './components/Connect/ConnectSection'
import { Route, Routes } from 'react-router-dom'
import MessagesPage from './components/Messages/MessagesPage'
import PartnershipSection from "./Components/PartnershipSection/PartnershipSection";
import DiscoverPage from "./Components/DiscoverPage/DiscoverPage";
import MeetPartners from "./Components/MeetPartners/MeetPartners";
import Signup from './components/Login-Signup/Signup'
import Login from './components/Login-Signup/Login'
import InvitesPage from "./Components/InvitesPage/InvitesPage";
import Register from './components/Register/Register'
import GetStarted from './components/GetStarted/GetStarted'



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
      <Route path="/invites" element={<InvitesPage />} />
      {/* <Route path='/received' element={<ReceivedInvites/>} /> */}
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/get-started' element={<GetStarted/>} />
      <Route path='/register' element={<Register/>} />

      </Routes>
    </>
  )
}

export default App
