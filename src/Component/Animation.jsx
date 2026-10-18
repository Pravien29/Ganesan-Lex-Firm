import React, { useEffect, useState } from "react";
import "./style/Animation.css";
function Animation({ onComplete }) {
  // Phase state: 'idle' -> 'entering' -> 'settled' -> 'zooming' -> 'complete'
  const [phase, setPhase] = useState("idle");
  useEffect(() => {
    // 1. Immediately trigger the entrance transition (slightly delayed to let DOM register mount)
    const enterTimeout = setTimeout(() => {
      setPhase("entering");
    }, 50);
    // 2. Once the card flies in and stops in the center (1.4s duration in CSS), enable floating breath effect
    const settledTimeout = setTimeout(() => {
      setPhase("settled");
    }, 1450);
    // 3. Keep the card settled for 1.8s (revealing Logo, Name, QR Code, and laser scan line).
    // Total elapsed: 3.25 seconds. Then start the camera zoom transition.
    const zoomTimeout = setTimeout(() => {
      setPhase("zooming");
    }, 3250);
    // 4. Once the zoom animation completes (0.9s duration in CSS), call the finish hook to navigate.
    const completeTimeout = setTimeout(() => {
      setPhase("complete");
      if (typeof onComplete === "function") {
        onComplete();
      }
    }, 4150);
    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(settledTimeout);
      clearTimeout(zoomTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);
  // Determine classes based on current animation phase
  const overlayClass = `animation-overlay ${
    phase !== "idle" ? "show" : ""
  } ${phase === "zooming" || phase === "complete" ? "zoomed" : ""}`;
  const cardClass = `visiting-card ${
    phase === "entering" ? "fly-in" : ""
  } ${phase === "settled" ? "fly-in float" : ""} ${
    phase === "zooming" || phase === "complete" ? "zoom-out" : ""
  }`;
  return (
    <div className={overlayClass} id="cinematic-transition-overlay">
      <div className="card-scene">
        <div className={cardClass}>
          
          {/* ⚖ Scales of Justice Watermark */}
          <svg
            className="card-watermark"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Base */}
            <path d="M12 3v17" />
            <path d="M19 20H5" />
            
            {/* Beam */}
            <path d="M5 7h14" />
            
            {/* Left Pan */}
            <path d="M5 7l-2 5h4l-2-5z" />
            <path d="M5 12v3" />
            <path d="M2 15h6" />
            
            {/* Right Pan */}
            <path d="M19 7l-2 5h4l-2-5z" />
            <path d="M19 12v3" />
            <path d="M16 15h6" />
          </svg>
          {/* ── Card Header ── */}
          <div className="card-header">
            {/* SVG Logo (Drawn dynamically) */}
            <svg
              className="card-logo-mark"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="23,3 43,13 43,33 23,43 3,33 3,13"
                stroke="#c9a84c"
                strokeWidth="1"
              />
              <polygon
                points="23,7 39,16 39,30 23,39 7,30 7,16"
                stroke="#c9a84c"
                strokeWidth="1"
              />
              <line
                x1="23"
                y1="7"
                x2="23"
                y2="39"
                stroke="#c9a84c"
                strokeWidth="0.5"
              />
              <line
                x1="7"
                y1="16"
                x2="39"
                y2="30"
                stroke="#c9a84c"
                strokeWidth="0.5"
              />
              <line
                x1="39"
                y1="16"
                x2="7"
                y2="30"
                stroke="#c9a84c"
                strokeWidth="0.5"
              />
              <text
                x="23"
                y="29"
                textAnchor="middle"
                fontFamily="Playfair Display, serif"
                fontSize="15"
                fontWeight="700"
                fill="#c9a84c"
                letterSpacing="1"
              >
                G
              </text>
            </svg>
            {/* Chamber Registration / Info */}
            <div className="card-credentials">
              <div>CHAMBERS OF</div>
              <strong>GANESAN LEX</strong>
              <div style={{ opacity: 0.6 }}>Reg. No. 230/1997</div>
            </div>
          </div>
          {/* ── Card Body (Office Name & Tagline) ── */}
          <div className="card-body">
            <div className="card-title-group">
              <div className="card-name">GANESAN LEX FIRM</div>
              <div className="card-tagline">Advocates &amp; Solicitors</div>
            </div>
          </div>
          {/* ── Card Footer (Contact info & Scanning QR) ── */}
          <div className="card-footer">
            {/* Contact details */}
            <div className="card-contact">
              <div className="card-contact-item">
                <span className="card-contact-icon">📍</span>
                <span>12, Law Chambers, High Court Buildings, Parrys, Chennai-600 104</span>
              </div>
              <div className="card-contact-item">
                <span className="card-contact-icon">📞</span>
                <span>+91 6380732072 </span>
              </div>
              <div className="card-contact-item">
                <span className="card-contact-icon">✉</span>
                <span>ganeshanyadhava@gmail.com</span>
              </div>
            </div>
            {/* QR Code with scanning laser sweep */}
            <div className="card-qr-container">
              <svg
                className="card-qr"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Visual approximation of a premium QR code grid */}
                <path
                  d="M2 2h6v6H2V2zm1 1v4h4V3H3zm15-1h6v6h-6V2zm1 1v4h4V3h-4zM2 16h6v6H2v-6zm1 1v4h4v-4H3zm15 0h6v6h-6v-6zm1 1v4h4v-4h-4zM10 2h4v4h-4V2zm1 1v2h2V3h-2zm0 7h2v2h-2v-2zm4 0h2v2h-2v-2zm-8 4h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2z"
                  fill="#c9a84c"
                />
                <rect x="5" y="5" width="2" height="2" fill="#c9a84c" />
                <rect x="17" y="5" width="2" height="2" fill="#c9a84c" />
                <rect x="5" y="17" width="2" height="2" fill="#c9a84c" />
                <rect x="17" y="17" width="2" height="2" fill="#c9a84c" />
              </svg>
              {/* Laser line slider */}
              <div className="card-qr-scanner"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Subtitle Caption */}
      <div className="animation-subtitle">Trusted Legal Services</div>
    </div>
  );
}
export default Animation;