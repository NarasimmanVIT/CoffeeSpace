import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ConnectSection from './components/ConnectSection'
import { Route, Routes } from 'react-router-dom'
import MessagesPage from './components/Messages/MessagesPage'

function App() {

  return (
    <>
       <Navbar />
      <Routes>
        <Route path='/' element={ 
          <>
          <HeroSection />
          <ConnectSection />
        </>
      } />
      <Route path='/messages' element={<MessagesPage />} />
      </Routes>
    </>
  )
}

export default App
