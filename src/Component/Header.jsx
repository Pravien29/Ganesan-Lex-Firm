
import React, { useState } from "react";
import "./Style/Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import Animation from "./Animation"; // cinematic transition component
import lexlogo from "/images/logo.png"; // ← your logo

const PHONE_HREF = "tel:+916380732072";
const PHONE_TEXT = "+91 6380732072";

const navItems = [
  { to: "/",        label: "Home"     },
  { to: "/about",   label: "About"    },
  { to: "/service", label: "Services" },
  { to: "/contact", label: "Contact"  },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const handleNavigation = (e, path) => {
    if (path === "/about" && location.pathname !== "/about") {
      e.preventDefault();
      setMenuOpen(false);
      setIsTransitioning(true);
    }
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    navigate("/about");
  };

  return (
    <>
      <header className="header">
        {/* ── Logo ── */}
        <Link to="/" className="logo-link">
          <div className="logo">
            <div className="logo-mark">
              <img src={lexlogo} alt="Ganesan Lex Firm logo" className="logo-img" />
            </div>
            <div className="logo-text">
              <div className="logo-wordmark">
                <span className="logo-gold">GANESAN</span> LEX FIRM
              </div>
              <div className="logo-tagline">Advocates &amp; Solicitors</div>
            </div>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="nav">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link${isActive(to) ? " active" : ""}`}
              onClick={(e) => handleNavigation(e, to)}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop call button ── */}
        <div className="header-actions">
          <a href={PHONE_HREF} className="call-btn" aria-label={`Call ${PHONE_TEXT}`}>
            <span className="call-btn-icon"><FaPhoneAlt /></span>
            <span className="call-btn-text">
              <small>Call us now</small>
            </span>
          </a>
        </div>

        {/* ── Hamburger (mobile) ── */}
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* ── Mobile drawer ── */}
      <div className={`mobile-drawer${menuOpen ? " show" : ""}`}>
        {navItems.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`drawer-link${isActive(to) ? " active" : ""}`}
            onClick={(e) => {
              handleNavigation(e, to);
              if (to !== "/about") setMenuOpen(false);
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* ── Mobile call button ── */}
      <a href={PHONE_HREF} className="call-fab" aria-label={`Call ${PHONE_TEXT}`}>
        <FaPhoneAlt />
      </a>

      {/* ── Cinematic transition ── */}
      {isTransitioning && <Animation onComplete={handleTransitionComplete} />}
    </>
  );
}

export default Header;