import React, { useEffect, useRef, useState } from "react";
import "./Style/Footer.css";
import { Link } from "react-router-dom";
import logo from "/images/logo.png"; // ← adjust path if your logo is elsewhere
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";

// Opens Google Maps (app on phones, browser on desktop).
// Tip: replace with your "Share → Copy link" URL (maps.app.goo.gl/...) for the exact listing.
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Ganesan+Lex+Firm+Chennai";

const quickLinks = [
  { to: "/about", label: "About Us" },
  { to: "/about", label: "The Team" },
  { to: "/service", label: "Services" },
  { to: "/contact", label: "Contact" },
    { to: "/career", label: "Careers" },

];

const practiceAreas = [
  { to: "/service#criminal-litigation", label: "Criminal Litigation" },
  { to: "/service#family-divorce-law", label: "Family & Divorce Law" },
  { to: "/service#consumer-rights", label: "Consumer Rights" },
  { to: "/service#civil-dispute", label: "Civil Disputes" },
  { to: "/service", label: "View All" },
];

const socials = [
  { icon: <FaWhatsapp />, href: "https://wa.me/916380732072", label: "WhatsApp" },
  { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
  { icon: <FaTwitter />, href: "#", label: "Twitter" },
  { icon: <FaFacebook />, href: "#", label: "Facebook" },
];

function Footer() {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Play the reveal once, when the footer scrolls into view
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer ref={footerRef} className={`footer${visible ? " in-view" : ""}`}>
      {/* Gold rule that draws itself across the top */}
      <span className="footer-rule" aria-hidden="true" />

      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-col footer-brand" style={{ "--i": 0 }}>
          <Link to="/" className="footer-logo-link" aria-label="Ganesan Lex home">
            <span className="footer-logo-badge">
              <img src={logo} alt="Ganesan Lex Firm logo" className="footer-logo-img" />
            </span>
            <span className="footer-name">
              <span className="footer-name-gold">GANESAN</span>LEX FIRM
              <small>Advocates &amp; Solicitors</small>
            </span>
          </Link>
          <p>
            Delivering the highest value to our clients and resolving
            litigation in a fully professional manner.
          </p>
          <div className="social-icons">
            {socials.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col" style={{ "--i": 1 }}>
          <h2>Quick Links</h2>
          <ul>
            {quickLinks.map(({ to, label }) => (
              <li key={label}>
                <Link to={to}>
                  <FaChevronRight className="arrow" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* PRACTICE AREAS */}
        <div className="footer-col" style={{ "--i": 2 }}>
          <h2>Practice Areas</h2>
          <ul>
            {practiceAreas.map(({ to, label }) => (
              <li key={label}>
                <Link to={to}>
                  <FaChevronRight className="arrow" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col" style={{ "--i": 3 }}>
          <h2>Get In Touch</h2>
          <a className="contact-item" href="tel:+916380732072">
            <FaPhoneAlt className="icon" />
            <span>+91 6380732072</span>
          </a>
          <a className="contact-item" href="mailto:ganeshanyadhava@gmail.com">
            <FaEnvelope className="icon" />
            <span>ganeshanyadhava@gmail.com</span>
          </a>
          <a
            className="contact-item"
            href={MAP_LINK}
            target="_blank"
            rel="noreferrer"
            aria-label="Open our location in Google Maps"
          >
            <FaMapMarkerAlt className="icon" />
            <span>Chennai, Tamil Nadu, India - 600001</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} <span>Ganesan Lex Firm</span> Advocates
          &amp; Solicitors. All rights reserved.
        </p>
        <button
          type="button"
          className="back-to-top"
          onClick={scrollTop}
          aria-label="Back to top"
        >
          <FaChevronUp />
        </button>
      </div>
    </footer>
  );
}

export default Footer;