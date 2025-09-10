import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  ChatCircle,
  PaperPlaneTilt,
  SignIn,
  UserCircle,
  User,
  Gear,
  SignOut,
  IdentificationCard,
} from "phosphor-react";
import { useNavbar } from "./useNavbar";
import useAuthStore from "../../store/authStore";

const Navbar = () => {
  const {
    isScrolled,
    isMobileMenuOpen,
    toggleMenu,
    isAccountDropdownOpen,
    toggleAccountDropdown,
    location,
  } = useNavbar();

  const token = useAuthStore((state) => state.token);
  const clearToken = useAuthStore((state) => state.clearToken);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/");
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-left">
          <Link to="/">
            <div className="navbar-logo">CoffeeSpace</div>
          </Link>

          <div className="navbar-links">
            {token && (
              <>
                <Link
                  to="/discover"
                  className={
                    location.pathname === "/discover" ? "active-nav-link" : ""
                  }
                >
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="#8a6969"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.5 13.5L17 7l-6.5 3.5L7 17l6.5-3.5z" />
                    </svg>
                  </span>
                  Discover
                </Link>
                <Link
                  to="/messages"
                  className={
                    location.pathname === "/messages" ? "active-nav-link" : ""
                  }
                >
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="#8a6969"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  Messages
                </Link>
                <Link
                  to="/invites"
                  className={
                    location.pathname === "/invites" ? "active-nav-link" : ""
                  }
                >
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="#8a6969"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2.08M16 3.13a4 4 0 0 1 0 7.75M12 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm8 14a8 8 0 0 0-16 0" />
                    </svg>
                  </span>
                  Invites
                </Link>
              </>
            )}
          </div>


          <div className="navbar-account" onClick={toggleAccountDropdown}>
            <UserCircle size={22} style={{ marginRight: "6px" }} />
            {token ? "Account" : "Get Started"}
            {isAccountDropdownOpen && (
              <div className="account-dropdown">
                {!token ? (
                  <>
                    <Link to="/get-started">
                      <SignIn size={18} style={{ marginRight: "8px" }} />
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile">
                      <User size={18} style={{ marginRight: "8px" }} />
                      Profile
                    </Link>
                    <Link to="/register">
                      <IdentificationCard
                        size={18}
                        style={{ marginRight: "8px" }}
                      />
                      Complete Profile
                    </Link>
                    <Link to="/settings">
                      <Gear size={18} style={{ marginRight: "8px" }} />
                      Settings
                    </Link>
                    <button className="logout-btn" onClick={handleLogout}>
                      <SignOut size={18} style={{ marginRight: "8px" }} />
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mobile-menu-icon" onClick={toggleMenu}>
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="#2f2121"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>
      </nav>


      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="close-icon" onClick={toggleMenu}>
          X
        </div>

        {token && (
          <>
            <Link to="/discover">
              <Users size={22} color="#8a6969" style={{ marginRight: "8px" }} />
              Discover
            </Link>
            <Link to="/messages">
              <ChatCircle
                size={22}
                color="#8a6969"
                style={{ marginRight: "8px" }}
              />
              Messages
            </Link>
            <Link to="/invites">
              <PaperPlaneTilt
                size={22}
                color="#8a6969"
                style={{ marginRight: "8px" }}
              />
              Invites
            </Link>
          </>
        )}

        {!token ? (
          <>
            <Link to="/get-started">
              <SignIn
                size={22}
                color="#8a6969"
                style={{ marginRight: "8px" }}
              />
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/register">Complete Profile</Link>
            <Link to="/settings">Settings</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="menu-overlay" onClick={toggleMenu}></div>
      )}
    </>
  );
};

export default Navbar;
