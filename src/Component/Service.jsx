import React, { useState, useEffect } from "react";
import "./Style/Service.css";
import { Link, useLocation } from "react-router-dom";

// ── HARDCODED DATA ─────────────────────────────────────────────────

// Intro / Expertise section (same content the old code took from about1[3])
const introData = {
  title: "Committed to Every Client's Success",
  description:
    "At Ganesan Lex Firm, we are committed to delivering trusted legal solutions tailored to every client's unique needs. Since 1997, our experienced legal professionals have provided strategic, practical, and result-oriented legal services with integrity, professionalism, and dedication. We focus on building long-term relationships through transparent communication, personalized attention, and dependable legal support for individuals, businesses, and organizations.",
};

// Practice area cards
// Paragraphs are separated by "\n\n" so the mobile "View More" toggle works.
const services = [
  {
    id: 1,
    title: "Criminal Litigation",
    image: "/images/litigation.png",
    description:
      "Ganesan Lex Firm provides strong and strategic criminal litigation services with a commitment to protecting the rights and interests of every client. Our experienced legal team handles criminal matters with professionalism, confidentiality, and a result-oriented approach. We represent clients in cases involving bail proceedings, criminal trials, cybercrime matters, white-collar offences, fraud, assault, domestic disputes, and other criminal allegations. Our advocates carefully analyze every case, prepare effective legal strategies, and ensure dedicated representation before all levels of courts.\n\nAt Ganesh Lex Firm, we believe every client deserves fair representation, timely legal guidance, and unwavering support throughout the legal process. Our focus is on delivering practical solutions, safeguarding client interests, and achieving the best possible outcome with integrity and excellence.",
  },
  {
    id: 2,
    title: "Family and Divorce Law",
    image: "/images/divorce.png",
    description:
      "Ganesan Lex Firm offers compassionate and professional legal support in family and divorce matters, helping clients navigate emotionally challenging situations with confidence and clarity. Our legal team understands the sensitivity of family disputes and works diligently to protect the rights, dignity, and future of every client.\n\nWe provide legal assistance in divorce proceedings, child custody, maintenance claims, domestic violence matters, property disputes, judicial separation, and family settlements. Our advocates focus on resolving conflicts through strategic negotiation and effective legal representation while ensuring the best interests of our clients and their families.\n\nAt Ganesh Lex Firm, we are committed to delivering practical solutions with empathy, confidentiality, and professionalism. We strive to make the legal process smooth, transparent, and efficient while standing beside our clients at every stage of their family law matters.",
  },
  {
    id: 3,
    title: "Protection of Consumer Rights",
    image: "/images/conrights.png",
    description:
      "Ganesan Lex Firm is dedicated to protecting the rights and interests of consumers by providing reliable and effective legal assistance in consumer-related disputes. Our experienced legal team helps clients seek justice against unfair trade practices, defective products, deficient services, misleading advertisements, and other consumer grievances.\n\nWe assist individuals and businesses in filing consumer complaints, pursuing compensation claims, and representing matters before consumer forums and courts. Our advocates focus on delivering practical legal solutions while ensuring transparency, accountability, and fair treatment for every client.\n\nAt Ganesh Lex Firm, we believe every consumer deserves strong legal protection and equal access to justice. With professionalism, commitment, and strategic legal support, we work to safeguard consumer rights and help clients achieve fair and timely resolutions.",
  },
  {
    id: 4,
    title: "Recovery Proceedings and Cheque Bounce",
    image: "/images/bounce.png",
    description:
      "Ganesan Lex Firm provides professional legal assistance in recovery proceedings and cheque bounce matters with a focus on protecting the financial interests of our clients. Our experienced legal team handles disputes involving unpaid dues, dishonoured cheques, loan recoveries, and commercial payment defaults with strategic and result-oriented representation.\n\nWe assist clients in issuing legal notices, initiating recovery proceedings, filing cheque bounce complaints under the Negotiable Instruments Act, and representing matters before appropriate courts and tribunals. Our advocates work diligently to ensure timely legal action, effective case handling, and maximum recovery of legitimate claims.\n\nAt Ganesh Lex Firm, we understand the financial and business impact caused by payment disputes. With professionalism, legal expertise, and practical solutions, we are committed to helping clients recover their dues efficiently while safeguarding their legal rights and commercial interests.",
  },
  {
    id: 5,
    title: "Civil Dispute",
    image: "/images/civi.png",
    description:
      "Ganesan Lex Firm provides trusted legal services in civil dispute matters with a strong focus on protecting the rights and interests of our clients. Our experienced advocates handle a wide range of civil cases with professionalism, strategic planning, and effective legal representation.\n\nWe assist clients in matters involving property disputes, contract disputes, recovery suits, injunctions, partnership conflicts, landlord-tenant issues, and other civil litigation cases. Our legal team carefully evaluates every matter, develops practical legal strategies, and works diligently to achieve fair and favourable outcomes.\n\nAt Ganesh Lex Firm, we believe in delivering clear legal guidance, transparent communication, and dedicated support throughout the legal process. With commitment, integrity, and client-focused solutions, we strive to resolve disputes efficiently while safeguarding the interests of every client.",
  },
];

const slugMap = {
  "Criminal Litigation": "criminal-litigation",
  "Family and Divorce Law": "family-divorce-law",
  "Protection of Consumer Rights": "consumer-rights",
  "Recovery Proceedings and Cheque Bounce": "recovery-cheque-bounce",
  "Civil Dispute": "civil-dispute",
};

/* ── Per-card Read-More toggle (mobile only) ── */
function CardText({ service }) {
  const [expanded, setExpanded] = useState(false);

  // Split on double newline or two+ spaces after sentence-end
  const paragraphs = service.description
    .split(/\n\n|(?<=[.!?])\s{2,}/)
    .filter(Boolean)
    .map((p) => p.trim());

  const visibleParas = expanded ? paragraphs : paragraphs.slice(0, 1);

  return (
    <div className="card-text">
      <div className="card-icon-bar">
        <span className="icon-square gold" />
        <span className="icon-square navy" />
      </div>

      <h3>{service.title}</h3>
      <div className="card-divider" />

      {visibleParas.map((para, i) => (
        <p key={i} style={{ color: "var(--slate)" }}>
          {para}
        </p>
      ))}

      {paragraphs.length > 1 && (
        <button
          className="read-more-btn"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
        >
          {expanded ? "Show Less ↑" : "View More ↓"}
        </button>
      )}

      <a href="#contact" className="card-cta">
        Consult Us <span>→</span>
      </a>
    </div>
  );
}

function Service() {
  const location = useLocation();

  /* Scroll to anchor (e.g. /Service#civil-dispute) */
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;

    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.hash]);

  return (
    <div className="service-container">

      {/* ── Hero ── */}
      <div
        className="service-hero"
        style={{ backgroundImage: "url('/images/court.avif')" }}
      >
        <div className="overlay" />
        <div className="hero-content">
          <span className="hero-eyebrow">Ganesh Lex Firm</span>
          <h1>Practice Areas</h1>
          <div className="underline" />
        </div>
      </div>

      {/* ── Intro / Expertise ── */}
      <div className="service-content">
        <div className="service-content-inner">
          <span className="section-label">Our Expertise</span>
          <h2>{introData.title}</h2>
          <div className="section-divider" />
          <p>{introData.description}</p>
        </div>
      </div>

      {/* ── Practice Area Cards ── */}
      <div className="practice-areas">
        {services.map((service, index) => (
          <div
            key={service.id}
            id={slugMap[service.title] || ""}
            className={`practice-card${index % 2 !== 0 ? " reverse" : ""}`}
          >
            {/* Image side */}
            <div className="card-image">
              <div className="card-image-inner">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                />
              </div>
              <div className="card-image-number">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Text side */}
            <CardText service={service} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default Service;