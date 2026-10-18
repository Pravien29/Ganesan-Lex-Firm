import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Style/About.css';

// ── DATA ───────────────────────────────────────────────────────────

const FOUNDED = 1997;

const cardData = [
  {
    icon: '⚖️',
    title: 'Practical Legal Advice, Long-Term Solutions',
    text: 'Need a solution to your legal problem? Post your query related to any legal matter and receive strategic, practical guidance from our top advocates.',
  },
  {
    icon: '💼',
    title: 'Crores of Rupees in Recoveries',
    text: 'Recoveries of non-payment are at the core of our services. Get in touch with our professional lawyers who will guide you to recover your dues in a legal manner.',
  },
  {
    icon: '🤝',
    title: 'Hundreds of Happy Clients',
    text: 'Throughout the service tenure, our focus remains on client satisfaction. Our tailor-made solutions have helped many individuals as well as corporate entities.',
  },
];

// bio + focus are shown in the popup – edit them freely
const team = [
  {
    id: 1,
    img: '/photos/sir.jpeg',
    name: 'Ganesan',
    description: 'Advocate, Founder and Managing GANESAN LEX FIRM',
    bio: 'Ganesan founded the firm in 1997 and leads it with a simple belief: legal advice should be practical, honest and built for the long term. He personally guides strategy on important matters, helping individuals and businesses resolve disputes and recover their dues with clarity and confidence.',
    focus: ['Civil Disputes', 'Recovery of Dues', 'Legal Advisory'],
  },
  {
    id: 2,
    img: '/photos/sugnakka.jpeg',
    name: 'Suganya',
    description: 'Associate',
    bio: 'Suganya supports clients through every stage of their matter, from the first consultation to final resolution. She is known for careful case preparation, clear communication and a patient, reassuring approach.',
    focus: ['Case Preparation', 'Client Counselling', 'Documentation'],
  },
  {
    id: 3,
    img: '/photos/Confident Advocate in a Warm Law Office.png',
    name: 'Rakesh',
    description: 'Associate',
    bio: 'Rakesh brings energy and sharp research to the team. He handles drafting, legal notices and court work with a focus on timely, result-oriented outcomes for clients.',
    focus: ['Legal Notices', 'Drafting', 'Court Appearances'],
  },
  {
    id: 4,
    img: '/photos/vivekakka.jpeg',
    name: 'Viveka',
    description: 'Associate',
    bio: 'Viveka combines attention to detail with a strong sense of client care. She works closely with clients to understand their concerns and turn them into well-structured, practical legal strategies.',
    focus: ['Legal Research', 'Agreements', 'Client Support'],
  },
  {
    id: 5,
    img: '/photos/subha.png',
    name: 'Suba Shree',
    description: 'Associate',
    bio: 'Suba Shree is dedicated to making legal processes easier to understand. She assists with pleadings, case files and follow-ups, making sure every client stays informed at every step.',
    focus: ['Pleadings', 'Case Management', 'Client Communication'],
  },
 {
  id: 6,
  img: '/photos/petchi.jpeg',
  name: 'Petchi Muthu',
  description: 'Intern',
  bio: 'Petchi Muthu manages case files, documentation and court schedules with precision, ensuring every matter proceeds without delay. His discipline, reliability and attention to detail are valued by colleagues and clients alike. His long-standing commitment has contributed greatly to the firm\'s reputation for dependable service.',
  focus: ['Office Administration', 'Case File Management', 'Court Procedure'],
},
{
  id: 7,
  img: '/photos/image.png',
  name: 'Yoga Lakshmi',
  description: 'Intern',
  bio: 'Yoga Lakshmi is an enthusiastic member of the team who assists with legal research, document preparation and case file organisation. She is eager to learn and brings a careful, dependable approach to every task, gaining hands-on experience in court procedure and client matters under the guidance of the senior advocates.',
  focus: ['Legal Research', 'Document Preparation', 'Court Procedure'],
},
];

// ── HELPERS ────────────────────────────────────────────────────────

// Adds "in" once the element scrolls into view (runs one time)
function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal${inView ? ' in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CountUp({ to, duration = 1400 }) {
  const [ref, inView] = useInView(0.5);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{value}</span>;
}

// ── PROFILE POPUP ──────────────────────────────────────────────────

function ProfileModal({ member, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    // close on Escape
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    // lock page scroll while the popup is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // move focus into the popup
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="modal-img-wrap">
          <img
            src={member.img}
            alt={member.name}
            className="modal-img"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <div className="modal-body">
          <span className="modal-role">{member.description}</span>
          <h3 className="modal-name" id="modal-title">{member.name}</h3>
          <div className="modal-bar" />
          <p className="modal-bio">{member.bio}</p>

          <ul className="modal-tags">
            {member.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <Link to="/contact" className="modal-cta" onClick={onClose}>
            Contact {member.name}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── COMPONENT ──────────────────────────────────────────────────────

function About() {
  const years = new Date().getFullYear() - FOUNDED;
  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const stats = [
    { value: years, suffix: '+', label: 'Years of practice' },
    { value: team.length, suffix: '', label: 'Legal professionals' },
    { value: 4, suffix: '', label: 'Core practice areas' },
  ];

  return (
    <div className="about-page">
      {/* ── HERO ── */}
      <div className="hero">
        <img
          className="hero-img"
          src="/images/grp.jpeg"
          alt="Ganesh Lex Firm Team"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="hero-text">
          <h1 className="hero-label">About</h1>
          <p className="hero-sub">Trusted legal counsel since {FOUNDED}</p>
        </div>
      </div>

      {/* ── STATS (overlaps hero) ── */}
      <div className="stats-wrap">
        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-value">
                <CountUp to={s.value} />{s.suffix}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY CHOOSE ── */}
      <section className="why-section">
        <div className="why-inner">
          <Reveal>
            <h2 className="why-heading">Committed to Every Client's Success</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="why-intro">
              At Ganesan Lex Firm, we are committed to delivering trusted legal
              solutions tailored to every client's unique needs. Since {FOUNDED},
              our experienced legal professionals have provided strategic,
              practical, and result-oriented legal services with integrity,
              professionalism, and dedication. We focus on building long-term
              relationships through transparent communication, personalized
              attention, and dependable legal support for individuals,
              businesses, and organizations.
            </p>
          </Reveal>

          <div className="cards">
            {cardData.map((card, index) => (
              <Reveal key={card.title} delay={index * 140}>
                <div className="card">
                  <div className="card-icon">{card.icon}</div>
                  <div className="card-title">{card.title}</div>
                  <p className="card-text">{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="team-section">
        <Reveal className="team-header">
          <span className="team-label">Our People</span>
          <h2 className="team-heading">Meet Our Legal Team</h2>
          <div className="team-heading-bar" />
        </Reveal>

        <div className="team-grid">
          {team.map((member, index) => (
            <Reveal key={member.id} delay={(index % 3) * 120}>
              <div className="team-card">
                <div className="team-img-wrap">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="team-img"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-desc">{member.description}</p>
                  <button
                    type="button"
                    className="team-view-btn"
                    onClick={() => setSelected(member)}
                    aria-haspopup="dialog"
                  >
                    View
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PROFILE POPUP (kept outside <Reveal> so position:fixed works) ── */}
      {selected && <ProfileModal member={selected} onClose={closeModal} />}
    </div>
  );
}

export default About;