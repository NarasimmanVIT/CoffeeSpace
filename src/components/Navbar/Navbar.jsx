import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Users, ChatCircle, PaperPlaneTilt, SignIn, UserCircle } from "phosphor-react";
import { useLocation } from "react-router-dom";
import { useNavbar } from "./useNavbar";

const Navbar = () => {

  const {
    isScrolled, isMobileMenuOpen, toggleMenu,location
  } = useNavbar();

  // const [isScrolled, setIsScrolled] = useState(false);

  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 10);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const toggleMenu = () => {
  //  setIsMobileMenuOpen(!isMobileMenuOpen);
  // };

  // const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  // const location =useLocation();



  return (
    <>
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-left">
        <div className="navbar-logo">CoffeeSpace</div>

     {/* Mobile Icon */}

       {/* <div className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg width="28" height="28" fill="none" stroke="#2f2121" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>  */}

        {/* desktop */}

        <div className="navbar-links">
          <Link to="/discover" className={location.pathname ==="/discover" ? "active-nav-link" : ""}>
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#8a6969" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M13.5 13.5L17 7l-6.5 3.5L7 17l6.5-3.5z"/>
              </svg>
            </span>
            Discover
          </Link>
          <Link to="/messages" className={location.pathname ==="/messages" ? "active-nav-link" : ""}>
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#8a6969" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </span>
            Messages
          </Link>
          <Link to="/invites" className={location.pathname ==="/invites" ? "active-nav-link" : ""}>
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#8a6969" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2.08M16 3.13a4 4 0 0 1 0 7.75M12 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm8 14a8 8 0 0 0-16 0"/>
              </svg>
            </span>
            Invites
          </Link>
        </div>

        {/* <div className="navbar-account" onClick={() => setIsAccountDropdownOpen(! isAccountDropdownOpen)}>
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#2f2121" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 2.015-8 4.5V21h16v-2.5c0-2.485-3.582-4.5-8-4.5Z"/>
            </svg>
          </span>
          Account

           {isAccountDropdownOpen && (
    <div className="account-dropdown">
      <Link to="/login">
        <SignIn size={18} style={{ marginRight: "8px" }} color="#8a6969" />
        Login
      </Link>
      <Link to="/signup">
        Sign Up
      </Link>
    </div>
  )}

        </div> */}

        <Link to="/get-started"
        className={`navbar-account ${location.pathname === "/get-started" ? "active-nav-link" : ""}`}
        >
          <UserCircle size={24} />
          Get Started
          </Link>

          <div className="mobile-menu-icon" onClick={toggleMenu}>
            <svg width="28" height="28" fill="none" stroke="#2f2121" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
      </div>
    </nav>

    
      {/* mobile menu */}

      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="close-icon" onClick={toggleMenu}>X</div>
        <Link to="/discover">
            <Users size={22} color="#8a6969" style={{ marginRight: "8px" }} />
          Discover
          </Link>
        <Link to="/messages">
             <ChatCircle size={22} color="#8a6969" style={{ marginRight: "8px" }} />
          Messages
          </Link>
        <Link to="#">
                 <PaperPlaneTilt size={22} color="#8a6969" style={{ marginRight: "8px" }} />
          Invites
          </Link>
        <Link to="/login">
          <SignIn size={22} color="#8a6969" style={{ marginRight: "8px" }} />
          Login
          </Link>
        <Link to="/signup">Sign Up</Link>
      </div>

       {isMobileMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}

    </>
  );
};

export default Navbar;