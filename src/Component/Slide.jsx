import React, { useState, useEffect, useCallback } from 'react';
import './Style/Slide.css';
import { Link } from 'react-router-dom';

// ── HARDCODED DATA ─────────────────────────────────────────────────

const slides = [
  {
    id: 1,
    title: "Protection of Consumer Rights",
    description:
      "We help consumers protect their rights against unfair trade practices, defective products, and service deficiencies. Our legal team provides effective representation in consumer forums and dispute resolution matters. We are committed to securing fair compensation and justice for every client.",
    image: "/images/consumer.jpeg",
    link: "/service#consumer-rights",
  },
  {
    id: 2,
    title: "Civil Dispute",
    description:
      "Our firm handles a wide range of civil disputes including property matters, contractual conflicts, and recovery claims. We focus on strategic legal solutions that protect your interests and minimize unnecessary litigation. With professional guidance, we help clients achieve timely and effective resolutions.",
    image: "/images/civil.jpeg",
    link: "/service#civil-dispute",
  },
  {
    id: 3,
    title: "Criminal Litigation",
    description:
      "We provide strong legal defense and representation in criminal cases at every stage of litigation. Our team handles bail applications, trial proceedings, and criminal investigations with dedication and confidentiality. We work tirelessly to safeguard the rights and reputation of our clients.",
    image: "/images/criminal.jpeg",
    link: "/service#criminal-litigation",
  },
  {
    id: 4,
    title: "Family Dispute",
    description:
      "We offer compassionate legal support for family-related matters including divorce, child custody, maintenance, and property disputes. Our approach focuses on protecting relationships while ensuring fair legal outcomes. We guide clients with sensitivity, professionalism, and complete confidentiality.",
    image: "/images/family.jpeg",
    link: "/service#family-divorce-law",
  },
  {
    id: 5,
    title: "Writ Jurisdiction",
    description:
      "Our legal experts assist clients in filing writ petitions before High Courts and constitutional authorities. We handle matters involving violation of fundamental rights, administrative actions, and public law remedies. Our firm ensures effective legal representation to uphold constitutional justice.",
    image: "/images/writ.jpeg",
    link: "/service", // no dedicated section yet: opens the Services page
  },
  {
    id: 6,
    title: "Labour Compliance",
    description:
      "We assist businesses in maintaining compliance with labour laws, employment regulations, and workplace policies. Our services include legal audits, documentation, dispute handling, and compliance advisory. We help organizations create legally secure and efficient work environments.",
    image: "/images/labour.jpeg",
    link: "/service#labour-compliance",
  },
];

const areas = [
  {
    id: 1,
    title: "Criminal Litigation",
    description:
      "We provide strong legal defense and representation in criminal cases at every stage of litigation, handling bail applications, trial proceedings, and investigations with dedication.",
  },
  {
    id: 2,
    title: "Family and Divorce Law",
    description:
      "We offer compassionate legal support for family-related matters including divorce, child custody, maintenance, and property disputes with complete confidentiality.",
  },
  {
    id: 3,
    title: "Consumer Rights Protection",
    description:
      "We help consumers protect their rights against unfair trade practices, defective products, and service deficiencies with effective representation in consumer forums.",
  },
  {
    id: 4,
    title: "Labour Compliance",
    description:
      "We assist businesses in maintaining compliance with labour laws, employment regulations, and workplace policies through legal audits, documentation, and advisory services.",
  },
  {
    id: 5,
    title: "Recovery and Cheque Bounce",
    description:
      "We handle recovery matters and cheque bounce cases under the Negotiable Instruments Act, securing dues efficiently through legal action and strategic representation.",
  },
  {
    id: 6,
    title: "Property and Civil Dispute",
    description:
      "Our firm handles a wide range of civil disputes including property matters, contractual conflicts, and recovery claims with strategic legal solutions and professional guidance.",
  },
];

const about = {
  id: 1,
  description:
    "At Ganesh Lex Firm, we are committed to delivering trusted legal solutions with professionalism, integrity, and dedication. Our firm focuses on providing practical legal guidance and effective representation tailored to the unique needs of every client. With a client-first approach, we strive to resolve legal matters efficiently while maintaining the highest standards of service and confidentiality.",
  description1:
    "Our experienced team of legal professionals advises a diverse range of clients, including individuals, businesses, start-ups, financial institutions, and corporate organizations. From litigation and dispute resolution to legal consultation and compliance support, Ganesh Lex Firm is dedicated to helping clients navigate complex legal challenges with confidence and clarity.",
};

// ── Slug map: area title → Service page anchor ID ──────────────────
const areaSlugMap = {
  "Criminal Litigation": "criminal-litigation",
  "Family and Divorce Law": "family-divorce-law",
  "Consumer Rights Protection": "consumer-rights",
  "Recovery and Cheque Bounce": "recovery-cheque-bounce",
  "Labour Compliance": "labour-compliance",
  "Property and Civil Dispute": "civil-dispute",
};

// ── Icons ──────────────────────────────────────────────────────────
const iconMap = {
  "Criminal Litigation": (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="20" r="10" stroke="white" strokeWidth="2.5" fill="none" />
      <circle cx="40" cy="20" r="10" stroke="white" strokeWidth="2.5" fill="none" />
      <path
        d="M10 52c0-10 8-16 14-16M54 52c0-10-8-16-14-16M24 36c4 4 12 4 16 0"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  "Family and Divorce Law": (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="20" height="26" rx="3" stroke="white" strokeWidth="2.5" fill="none" />
      <rect x="34" y="12" width="20" height="26" rx="3" stroke="white" strokeWidth="2.5" fill="none" />
      <path d="M20 38v8M44 38v8M14 50h36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  "Consumer Rights Protection": (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 10l4 12h13l-10 8 4 12-11-8-11 8 4-12-10-8h13z"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M20 46l-8 8M44 46l8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  "Recovery and Cheque Bounce": (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="32" height="22" rx="3" stroke="white" strokeWidth="2.5" fill="none" />
      <path
        d="M16 38v8h32V24h-8"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 24h16M16 30h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 20l4-4 4 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Labour Compliance": (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 10v8M20 14l4 7M44 14l-4 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="28" r="6" stroke="white" strokeWidth="2.5" fill="none" />
      <path
        d="M14 44c0-8 8-14 18-14s18 6 18 14"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M10 52h44" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  "Property and Civil Dispute": (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 8l20 16v30H12V24L32 8z"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
      <rect x="24" y="36" width="16" height="18" rx="2" stroke="white" strokeWidth="2.5" fill="none" />
      <path d="M28 26h8M32 22v8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
};

const defaultIcon = (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="20" stroke="white" strokeWidth="2.5" />
    <path d="M32 22v12l8 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// ── COMPONENT ──────────────────────────────────────────────────────
export default function Slide() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  const goTo = useCallback(
    (index, dir = 'next') => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 600);
    },
    [animating]
  );

  const prev = () => {
    const index = (current - 1 + slides.length) % slides.length;
    goTo(index, 'prev');
  };

  const next = useCallback(() => {
    const index = (current + 1) % slides.length;
    goTo(index, 'next');
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current] || {};

  return (
    <>
      {/* ── SLIDER ─────────────────────────────────── */}
      <div className="glf-slider-wrapper">
        <div
          className={`glf-slider-bg ${animating ? `glf-slide-out-${direction}` : 'glf-slide-in'}`}
          style={{ backgroundImage: slide.image ? `url(${slide.image})` : undefined }}
        />
        <div className="glf-slider-overlay" />

        <div className={`glf-slider-content ${animating ? 'glf-content-hidden' : 'glf-content-visible'}`}>
          <h1 className="glf-slider-title">{slide.title}</h1>
          <p className="glf-slider-description">{slide.description}</p>

          {/* FIXED: now a real link to the matching Services section */}
          <Link to={slide.link || "/service"} className="glf-slider-btn">
            Know More
          </Link>
        </div>

        <button className="glf-slider-arrow glf-slider-arrow--prev" onClick={prev} aria-label="Previous">
          ‹
        </button>
        <button className="glf-slider-arrow glf-slider-arrow--next" onClick={next} aria-label="Next">
          ›
        </button>

        <div className="glf-slider-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`glf-slider-dot ${i === current ? 'glf-slider-dot--active' : ''}`}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── ABOUT SECTION ──────────────────────────── */}
      <section className="glf-about-section">
        <div className="glf-about-image-block">
          <div className="glf-about-image-outer">
            <div className="glf-about-image-inner">
              <img
                src="/images/insight.jpeg"
                alt="Ganesh Lex Firm"
                className="glf-about-img"
              />
              <div className="glf-about-image-overlay">
                <p className="glf-about-image-tagline">
                  RESEARCH<br />DRIVEN RESULTS
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="glf-about-content">
          <span className="glf-about-label">Who We Are</span>
          <h2 className="glf-about-heading">
            Efficient and Professional<br />Legal Solutions
          </h2>
          <div className="glf-about-divider" />
          <p className="glf-about-para">{about.description}</p>
          <p className="glf-about-para">{about.description1}</p>

          {/* FIXED: now a real link to the About page */}
          <Link to="/about" className="glf-about-btn">
            Read More
          </Link>
        </div>
      </section>

      {/* ── PRACTICE AREAS ─────────────────────────── */}
      <section className="glf-practice-section">
        <div className="glf-practice-header">
          <h2 className="glf-practice-title">Our Areas of Practice</h2>
          <p className="glf-practice-subtitle">
            At Ganesh Lex Firm, we understand our client's unique legal needs across
            multiple sectors and jurisdictions, delivering reliable and practical solutions.
          </p>
        </div>

        <div className="glf-practice-grid">
          {areas.map((area) => (
            <div className="glf-practice-card" key={area.id}>
              <div className="glf-practice-icon-wrap">
                {iconMap[area.title] || defaultIcon}
              </div>
              <h3 className="glf-practice-card-title">{area.title}</h3>
              <p className="glf-practice-card-desc">{area.description}</p>
              <Link
                to={`/service#${areaSlugMap[area.title] || ""}`}
                className="glf-practice-learn-more"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}