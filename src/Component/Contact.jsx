import React, { useState } from "react";
import "./Style/Contact.css";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { FaLinkedinIn, FaWhatsapp, FaTwitter, FaFacebookF } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <section className="ct-section" id="contact">

      {/* ── Top gold rule ── */}
      <div className="ct-top-rule" />

      {/* ── Section header ── */}
      <div className="ct-header">
        <span className="ct-eyebrow">Get In Touch</span>
        <h2 className="ct-heading">Let's Discuss Your Case</h2>
        <div className="ct-rule" />
        <p className="ct-subheading">
          Every legal journey begins with a conversation. We're here to listen,
          advise, and act — confidentially and promptly.
        </p>
      </div>

      {/* ── Main body ── */}
      <div className="ct-body">

        {/* ── Left info panel ── */}
        <div className="ct-left">
          <div className="ct-left-glow" />

          <div className="ct-left-top">
            <span className="ct-left-badge">Our Office</span>
            <h3 className="ct-left-title">We Are Just a Call Away</h3>
            <p className="ct-left-tagline">
              Reach out for a confidential consultation or visit us at our office
              in Mumbai for a face-to-face discussion.
            </p>
          </div>

          <ul className="ct-info-list">
            {[
              {
                icon: <FiPhone />,
                label: "Phone",
                value: "+91 6380732072",
                href: "tel:+916380732072"
              },
              {
                icon: <FiMail />,
                label: "Email",
                value: "ganeshanyadhava@gmail.com",
                href: "mailto:ganeshanyadhava@gmail.com"
              },
              {
                icon: <FiMapPin />,
                label: "Office",
                value: "#7/13, Vedaram Building, 2nd Floor,\nSunkurama Street, Parrys,\nChennai – 600 001"
              },
              {
                icon: <FiClock />,
                label: "Hours",
                value: "Mon – Sat  |  10:00 AM – 7:00 PM"
              }
            ].map(({ icon, label, value, href }) => (
              <li key={label} className="ct-info-item">
                <div className="ct-info-icon">{icon}</div>
                <div className="ct-info-detail">
                  <span className="ct-info-label">{label}</span>
                  {href
                    ? <a href={href} className="ct-info-value ct-link">{value}</a>
                    : <span className="ct-info-value" style={{ whiteSpace: "pre-line" }}>{value}</span>
                  }
                </div>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="ct-divider" />

          {/* Social */}
          <div className="ct-social">
            <span className="ct-social-label">Follow Us</span>
            <div className="ct-social-icons">
              {[
                { icon: <FaLinkedinIn />, label: "LinkedIn", href: "#" },
                { icon: <FaWhatsapp />,  label: "WhatsApp", href: "#" },
                { icon: <FaTwitter />,   label: "Twitter",  href: "#" },
                { icon: <FaFacebookF />, label: "Facebook", href: "#" },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} className="ct-social-link" aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Corner brackets */}
          <div className="ct-bracket ct-bracket--tl" />
          <div className="ct-bracket ct-bracket--br" />
        </div>

        {/* ── Right form panel ── */}
        <div className="ct-right">
          <div className="ct-form-card">
            <div className="ct-form-top-bar" />

            <div className="ct-form-header">
              <h3 className="ct-form-title">Send Us a Message</h3>
              <p className="ct-form-subtitle">
                We'll respond within 24 hours — your information stays confidential.
              </p>
            </div>

            <form className="ct-form" onSubmit={handleSubmit} noValidate>
              <div className="ct-form-row">
                <div className="ct-field">
                  <label className="ct-label">Full Name <span className="ct-req">*</span></label>
                  <input
                    type="text" name="name" placeholder="Rahul Sharma"
                    value={formData.name} onChange={handleChange}
                    className="ct-input" required
                  />
                </div>
                <div className="ct-field">
                  <label className="ct-label">Email Address <span className="ct-req">*</span></label>
                  <input
                    type="email" name="email" placeholder="rahul@example.com"
                    value={formData.email} onChange={handleChange}
                    className="ct-input" required
                  />
                </div>
              </div>

              <div className="ct-form-row">
                <div className="ct-field">
                  <label className="ct-label">Phone Number</label>
                  <input
                    type="tel" name="phone" placeholder="+91 98000 00000"
                    value={formData.phone} onChange={handleChange}
                    className="ct-input"
                  />
                </div>
                <div className="ct-field">
<label className="ct-label">Case Type</label>
                 <select
  name="service" value={formData.service}
  onChange={handleChange} className="ct-input ct-select"
>
  <option value="">Select your case type</option>
  <option>Criminal Case</option>
  <option>Family & Divorce</option>
  <option>Consumer Complaint</option>
  <option>Cheque Bounce / Recovery</option>
  <option>Civil Dispute</option>
  <option>Property Matter</option>
  <option>Labour & Employment</option>
  <option>Anticipatory Bail</option>
  <option>Domestic Violence</option>
  <option>Other / Not Sure</option>
</select>
                </div>
              </div>

              <div className="ct-field ct-field--full">
                <label className="ct-label">Your Message <span className="ct-req">*</span></label>
                <textarea
                  name="message" placeholder="Briefly describe your legal matter…"
                  value={formData.message} onChange={handleChange}
                  className="ct-input ct-textarea" rows={5} required
                />
              </div>

              <div className="ct-form-footer">
                <p className="ct-privacy">
                  🔒 All communications are protected by attorney–client privilege.
                </p>
                <button
                  type="submit"
                  className={`ct-submit${submitted ? " ct-submit--sent" : ""}`}
                >
                  <span className="ct-submit-label">
                    {submitted ? "✓ Message Sent" : "Send Message"}
                  </span>
                  {!submitted && (
                    <span className="ct-submit-arrow">→</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* ── Bottom map strip ── */}
      <div className="ct-map-strip">
  <iframe
    title="Office Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3203.0425016495487!2d80.28417727196673!3d13.089308652198474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f000223e781%3A0x59654164c1a84098!2sGANESAN%20LEX%20FIRM!5e1!3m2!1sen!2sin!4v1792323986974!5m2!1sen!2sin"
    width="600"
    height="450"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>

    </section>
  );
}

export default Contact;