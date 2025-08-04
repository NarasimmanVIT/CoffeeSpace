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
import Signup from './components/Signup'
import Login from './components/Login'

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
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      </Routes>
    </>
  )
}

export default App
