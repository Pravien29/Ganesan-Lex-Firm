import React, { useState } from "react";
import "./Style/Career.css";

function Career() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    resume: null,
  });

  const [resumeName, setResumeName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setResumeName(files[0]?.name || "");
    }
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="career-page">
      {/* Background decorative elements */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <div className="career-wrapper">
        {/* Left panel */}
        <div className="career-left">
          <div className="brand-badge">
            <span className="badge-dot" />
            We're Hiring
          </div>

          <h1 className="career-headline">
            Build the <br />
            <span className="headline-accent">Future of</span>
            <br />
            Justice With Us
          </h1>

          <p className="career-subtext">
            At <strong>Ganesan Lex Firm</strong>, we champion integrity,
            excellence, and client-first legal solutions. Join a team where
            your expertise drives real-world impact.
          </p>

          <div className="perks-list">
            {[
              { icon: "⚖️", label: "Justice-First Culture" },
              { icon: "🌱", label: "Growth Mentorship" },
              { icon: "🤝", label: "Collaborative Team" },
              { icon: "🏆", label: "Proven Track Record" },
            ].map((perk) => (
              <div className="perk-item" key={perk.label}>
                <span className="perk-icon">{perk.icon}</span>
                <span>{perk.label}</span>
              </div>
            ))}
          </div>

          <div className="left-footer">
            <div className="stat">
              <span className="stat-num">200+</span>
              <span className="stat-label">Cases Won</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">20+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">25+</span>
              <span className="stat-label">Legal Experts</span>
            </div>
          </div>
        </div>

        {/* Right panel — Form */}
        <div className="career-right">
          <div className="form-card">
            <div className="form-header">
              <h2>Apply Now</h2>
              <p>Fill in your details and we'll get back to you.</p>
            </div>

            {submitted && (
              <div className="success-banner">
                <span className="success-icon">✓</span>
                Application submitted successfully! We'll be in touch soon.
              </div>
            )}

            <form className="career-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className={`form-group ${focused === "name" ? "is-focused" : ""} ${formData.name ? "has-value" : ""}`}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    required
                  />
                  <span className="field-line" />
                </div>

                <div className={`form-group ${focused === "email" ? "is-focused" : ""} ${formData.email ? "has-value" : ""}`}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    required
                  />
                  <span className="field-line" />
                </div>
              </div>

              <div className="form-row">
                <div className={`form-group ${focused === "phone" ? "is-focused" : ""} ${formData.phone ? "has-value" : ""}`}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused("")}
                    required
                  />
                  <span className="field-line" />
                </div>

                <div className={`form-group ${focused === "interest" ? "is-focused" : ""} ${formData.interest ? "has-value" : ""}`}>
                  <label htmlFor="interest">Area of Interest</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    onFocus={() => setFocused("interest")}
                    onBlur={() => setFocused("")}
                    required
                  >
                    <option value="">Select a role</option>
                    <option value="Internship">Internship</option>
                    <option value="Associates">Associates</option>
                    
                  </select>
                  <span className="field-line" />
                  <span className="select-arrow">▾</span>
                </div>
              </div>

              <div className={`form-group resume-group ${resumeName ? "has-file" : ""}`}>
                <label>Resume / CV</label>
                <label htmlFor="resume" className="resume-upload-label">
                  <span className="upload-icon">📎</span>
                  <span className="upload-text">
                    {resumeName ? resumeName : "Click to upload PDF or DOCX"}
                  </span>
                  <span className="upload-hint">Max 5MB</span>
                </label>
                <input
                  id="resume"
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  className="resume-input"
                />
              </div>

              <div className={`form-group ${focused === "message" ? "is-focused" : ""} ${formData.message ? "has-value" : ""}`}>
                <label htmlFor="message">Cover Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tell us about yourself, your skills, and why you want to join Ganesh Lex Firm..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                />
                <span className="field-line" />
              </div>

              <button type="submit" className="submit-btn">
                <span className="btn-text">Submit Application</span>
                <span className="btn-arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Career;