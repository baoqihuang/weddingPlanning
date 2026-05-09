import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useRole } from '../context/RoleContext';

export function Navbar() {
  const { t, lang, toggleLang } = useLang();
  const { isCrew } = useRole();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const guestLinks = [
    { path: '/', label: t.nav.overview },
    { path: '/rsvp', label: t.nav.rsvp },
    { path: '/schedule', label: lang === 'en' ? 'Schedule' : '日程' },
    { path: '/travel', label: t.nav.travelGuide },
    { path: '/faq', label: 'FAQ' },
  ];

  const crewLinks = [
    { path: '/', label: t.nav.overview },
    { path: '/budget', label: t.nav.budget },
    { path: '/checklist', label: t.nav.checklist },
    { path: '/rsvp', label: t.nav.rsvp },
    { path: '/guests', label: t.nav.guests },
    { path: '/responsibilities', label: lang === 'en' ? 'Roles' : '分工表' },
    { path: '/schedule', label: lang === 'en' ? 'Schedule' : '日程' },
    { path: '/travel', label: t.nav.travelGuide },
    { path: '/faq', label: 'FAQ' },
  ];

  const links = isCrew ? crewLinks : guestLinks;

  const handleNav = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <span style={styles.logo} onClick={() => handleNav('/')}>
          💒 H & B
        </span>

        {/* Desktop links */}
        <div className="nav-desktop" style={styles.links}>
          {links.map((l) => (
            <button
              key={l.path}
              onClick={() => handleNav(l.path)}
              style={{
                ...styles.link,
                ...(location.pathname === l.path ? styles.linkActive : {}),
              }}
            >
              {l.label}
            </button>
          ))}
          <button className="btn btn-sm btn-outline" onClick={toggleLang}>
            {t.nav.langToggle}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="nav-mobile" style={styles.mobileControls}>
          <button className="btn btn-sm btn-outline" onClick={toggleLang}>
            {t.nav.langToggle}
          </button>
          <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {links.map((l) => (
            <button
              key={l.path}
              onClick={() => handleNav(l.path)}
              style={{
                ...styles.mobileLink,
                ...(location.pathname === l.path ? styles.mobileLinkActive : {}),
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--color-border)',
    zIndex: 100,
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 20px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: 'var(--color-primary-dark)',
    cursor: 'pointer',
    letterSpacing: '1px',
  },
  links: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  link: {
    background: 'none',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    color: 'var(--color-text-light)',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  linkActive: {
    background: 'var(--color-primary-light)',
    color: 'var(--color-primary-dark)',
  },
  mobileControls: {
    display: 'none',
    gap: '8px',
    alignItems: 'center',
  },
  hamburger: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: 'var(--color-text)',
    padding: '4px 8px',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '0 20px 16px',
    gap: '4px',
    background: 'rgba(255,255,255,0.98)',
    borderBottom: '1px solid var(--color-border)',
  },
  mobileLink: {
    background: 'none',
    border: 'none',
    padding: '12px 14px',
    borderRadius: '8px',
    color: 'var(--color-text-light)',
    fontSize: '1rem',
    fontWeight: 500,
    textAlign: 'left' as const,
    cursor: 'pointer',
  },
  mobileLinkActive: {
    background: 'var(--color-primary-light)',
    color: 'var(--color-primary-dark)',
  },
};

// Add responsive CSS via a style tag
const responsiveCSS = document.createElement('style');
responsiveCSS.textContent = `
  @media (max-width: 768px) {
    .nav-desktop { display: none !important; }
    .nav-mobile { display: flex !important; }
  }
  @media (min-width: 769px) {
    .nav-desktop { display: flex !important; }
    .nav-mobile { display: none !important; }
  }
`;
if (!document.getElementById('navbar-responsive')) {
  responsiveCSS.id = 'navbar-responsive';
  document.head.appendChild(responsiveCSS);
}
