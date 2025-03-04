import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo White Text.png";
import LogoDark from "../assets/Logo Black Text.png";
import DownArrowWhite from "../assets/down-arrow-white.png";
import DownArrowBlack from "../assets/down-arrow-black.png";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header
      id="header"
      className={`header ${isScrolled ? "scrolled" : "transparent"}`}
    >
      <div id="header-row" className="header-row">
        <div id="logo">
          <a href="/" id="logo-link">
            <img
              id="logo-img"
              className="logo-default"
              src={isScrolled ? LogoDark : Logo}
              alt="Logo"
            />
          </a>
        </div>

        <div
          id="menu-trigger"
          className={`primary-menu-trigger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <img
            id="down-arrow-icon"
            src={isScrolled ? DownArrowBlack : DownArrowWhite} // Dynamically change arrow image
            alt="Menu"
            className={`menu-arrow ${menuOpen ? "open" : ""}`} // Add class for animation
          />
        </div>

        <nav
          id="primary-menu"
          className={`primary-menu ${menuOpen ? "show" : ""}`}
        >
          <ul id="menu-container" className="menu-container">
            <li id="menu-item-about" className="menu-item">
              <Link id="menu-link-about" className="menu-link" to="/diplomasi-dan-investasi">
                Diplomasi
              </Link>
            </li>
            <li id="menu-item-works" className="menu-item">
              <Link
                id="menu-link-works"
                className="menu-link"
                to="/mahadata-dan-kecerdasan-buatan"
                smooth={true}
              >
                Mahadata
              </Link>
            </li>
            <li id="menu-item-works" className="menu-item">
              <Link
                id="menu-link-works"
                className="menu-link"
                to="/hukum-dan-perundangan"
                smooth={true}
              >
                Hukum
              </Link>
            </li>
            <li id="menu-item-features" className="menu-item">
              <Link
                to="/mahadata-dan-kecerdasan-buatan/map/Nikel" // Internal route
                className="menu-link"
                id="menu-link-features-visit-map"
              >
                PETA
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
