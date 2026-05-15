import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useRole } from '../context/RoleContext';
import { useCloudStorage } from '../hooks/useCloudStorage';
import { PugMascot, PoodleMascot, DogDivider } from './DogMascots';
import type { ChecklistItem } from '../data/checklistDefaults';
import { defaultChecklistItems } from '../data/checklistDefaults';

const WEDDING_DATE = new Date('2026-11-01T00:00:00+08:00');

const DRESS_COLORS = [
  { hex: '#8B6F47', en: 'Earthy Brown', zh: '大地色' },
  { hex: '#F0E68C', en: 'Pale Gold', zh: '淺黃' },
  { hex: '#C3B091', en: 'Khaki', zh: '卡其' },
  { hex: '#D2B48C', en: 'Sand', zh: '沙色' },
];

export function Overview() {
  const { t, lang } = useLang();
  const { isCrew } = useRole();
  const navigate = useNavigate();
  const [daysLeft, setDaysLeft] = useState(getDaysLeft());
  const [showInvite, setShowInvite] = useState(false);

  // Pull live stats from cloud storage
  const [checklist] = useCloudStorage<ChecklistItem[]>('checklist', 'wedding-checklist', defaultChecklistItems);
  const [rsvpEntries] = useCloudStorage<{ attending: boolean }[]>('rsvp', 'wedding-rsvp', []);
  const [guests] = useCloudStorage<{ status: string }[]>('guests', 'wedding-guests', []);

  const doneTasks = checklist.filter((i) => i.status === 'done').length;
  const taskPct = checklist.length ? Math.round((doneTasks / checklist.length) * 100) : 0;
  const confirmedGuests = guests.filter((g) => g.status === 'confirmed').length;
  const rsvpCount = rsvpEntries.filter((e) => e.attending).length;

  useEffect(() => {
    const timer = setInterval(() => setDaysLeft(getDaysLeft()), 60000);
    return () => clearInterval(timer);
  }, []);

  function getDaysLeft() {
    const diff = WEDDING_DATE.getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  const dateDisplay = lang === 'en'
    ? WEDDING_DATE.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Shanghai' })
    : WEDDING_DATE.toLocaleDateString('zh-TW', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Shanghai' });

  const guestSections = [
    { path: '/rsvp', label: t.nav.rsvp, emoji: '💌' },
    { path: '/schedule', label: lang === 'en' ? 'Schedule' : '日程', emoji: '📋' },
    { path: '/travel', label: t.nav.travelGuide, emoji: '✈️' },
    { path: '/faq', label: 'Q+A', emoji: '❓' },
  ];

  const crewSections = [
    { path: '/budget', label: t.nav.budget, emoji: '💰' },
    { path: '/checklist', label: t.nav.checklist, emoji: '✅' },
    { path: '/rsvp', label: t.nav.rsvp, emoji: '💌' },
    { path: '/guests', label: t.nav.guests, emoji: '👥' },
    { path: '/schedule', label: lang === 'en' ? 'Schedule' : '日程', emoji: '📋' },
    { path: '/travel', label: t.nav.travelGuide, emoji: '✈️' },
    { path: '/faq', label: 'Q+A', emoji: '❓' },
  ];

  const sections = isCrew ? crewSections : guestSections;

  return (
    <div style={{ paddingTop: '60px' }}>
      {/* Gradient Header */}
      <div style={styles.heroHeader} className="overview-hero">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
          <PugMascot size={40} style={{ opacity: 0.9 }} />
          <PoodleMascot size={40} style={{ opacity: 0.9 }} />
        </div>
        <h1 style={styles.heroTitle}>✨ <span style={{ fontWeight: 700 }}>{t.overview.title}</span> ✨</h1>
        <p style={styles.heroNames}>Heilam Wu 胡希琳 & Baoqi Huang 黃寶琪</p>
        <div style={styles.heroDate}>{dateDisplay}</div>
        <div style={styles.heroCountdown}>
          {daysLeft > 0
            ? `${daysLeft} ${lang === 'en' ? 'days to go!' : '天倒數！'}`
            : lang === 'en' ? 'Today is the big day! 🎉' : '今天就是大日子！🎉'
          }
        </div>
      </div>

      <div className="container section" style={{ paddingTop: '0' }}>
        {/* Stats Dashboard */}
        <div className="card">
          <h2 style={styles.cardTitle}>{lang === 'en' ? 'At a Glance' : '概覽'}</h2>
          {isCrew ? (
            <div style={styles.statsGrid}>
              <div style={styles.statBox}>
                <div style={styles.statLabel}>{t.overview.countdown.days}</div>
                <div style={styles.statValue}>{daysLeft}</div>
              </div>
              <div style={{ ...styles.statBox, borderTop: '3px solid #81c784' }}>
                <div style={styles.statLabel}>{lang === 'en' ? 'RSVPs' : '已回覆'}</div>
                <div style={{ ...styles.statValue, color: '#2e7d32' }}>{rsvpCount}</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statLabel}>{lang === 'en' ? 'Guests' : '賓客'}</div>
                <div style={styles.statValue}>{confirmedGuests}</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statLabel}>{lang === 'en' ? 'Tasks' : '待辦'}</div>
                <div style={styles.statValue}>{taskPct}%</div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ ...styles.statValue, fontSize: '3rem', marginBottom: '4px' }}>{daysLeft}</div>
              <div style={{ ...styles.statLabel, fontSize: '.9rem' }}>
                {lang === 'en' ? 'days until the wedding 🎉' : '天後就是婚禮 🎉'}
              </div>
            </div>
          )}
          {isCrew && (
            <>
              <div style={styles.progressWrap}>
                <div style={{ ...styles.progressBar, width: `${taskPct}%` }} />
              </div>
              <p style={styles.progressLabel}>
                {doneTasks}/{checklist.length} {lang === 'en' ? 'tasks completed' : '項任務已完成'}
              </p>
            </>
          )}
          {/* View invitation button */}
          <div style={{ textAlign: 'center' }}>
            <button style={styles.inviteBtn} onClick={() => setShowInvite(true)}>
              📜 {lang === 'en' ? 'View Invitation' : '查看邀請函'}
            </button>
          </div>
        </div>

        {/* Guest Welcome Message */}
        {!isCrew && (
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <DogDivider />
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-light)', lineHeight: 1.8, fontStyle: 'italic' }}>
              {lang === 'en'
                ? '"Thank you for being here — this alone is the greatest gift we could receive. The wedding is but a fleeting moment, yet you will always hold a cherished place in our lives."'
                : '「感謝你來，這已經是我們收到最好的禮物。婚禮短暫，你永遠是我們生命中重要的人。」'
              }
            </p>
            <p style={{ marginTop: '12px', fontSize: '.85rem', color: 'var(--color-text-muted)' }}>
              {lang === 'en'
                ? '— Your presence is the greatest gift of all 🐾'
                : '— 你的出現，就是最好的禮物 🐾'
              }
            </p>
          </div>
        )}

        {/* Venue */}
        <div className="card">
          <h2 style={styles.cardTitle}>{t.overview.venue.title}</h2>
          <h3 style={styles.venueName}>{t.overview.venue.name}</h3>
          <p style={styles.venueAddress}>📍 {t.overview.venue.address}</p>
          <p style={{ fontSize: '.85rem', marginBottom: '.5rem' }}>
            🔗 <a href="https://hk.trip.com/hotels/shicheng-hotel-detail-67740925/junlan-forest-hot-springs-resort-hotel/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-dark)', textDecoration: 'underline' }}>
              {lang === 'en' ? 'View hotel on Trip.com' : '在Trip.com查看酒店'}
            </a>
          </p>
          <div className="tip-box" style={{ marginTop: '.85rem' }}>
            <span className="tip-icon">🏨</span>
            <div>{lang === 'en'
              ? 'This resort is both our wedding venue and the recommended hotel for guests.'
              : '此度假酒店既是我們的婚禮場地，亦是推薦賓客入住的酒店。'
            }</div>
          </div>
        </div>

        {/* Dress Code */}
        <div className="card">
          <h2 style={styles.cardTitle}>{t.overview.dressCode.title}</h2>
          <p style={styles.dressDesc}>{t.overview.dressCode.description}</p>
          <div style={styles.colorSwatches}>
            {DRESS_COLORS.map((c) => (
              <div key={c.hex} style={styles.swatch}>
                <div style={{ ...styles.swatchCircle, background: c.hex }} />
                <span style={styles.swatchLabel}>{lang === 'en' ? c.en : c.zh}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Links */}
        <div className="card">
          <h2 style={styles.cardTitle}>{t.overview.sections}</h2>
          <div style={styles.linksGrid}>
            {sections.map((s) => (
              <button
                key={s.path}
                style={styles.sectionLink}
                onClick={() => navigate(s.path)}
              >
                <span style={styles.sectionEmoji}>{s.emoji}</span>
                <span style={styles.sectionLinkText}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Invitation Modal */}
      {showInvite && (
        <div style={styles.inviteOverlay} onClick={() => setShowInvite(false)}>
          <div style={styles.inviteInner} onClick={(e) => e.stopPropagation()}>
            <button style={styles.inviteClose} onClick={() => setShowInvite(false)}>✕</button>
            <div style={styles.inviteImgWrap}>
              <img src="/images/invitationLetter1.JPG" alt="Invitation 1" style={{ width: '50%', display: 'block', objectFit: 'contain' }} />
              <img src="/images/invitationLetter2.JPG" alt="Invitation 2" style={{ width: '50%', display: 'block', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heroHeader: {
    background: 'linear-gradient(135deg, #6e47ab 0%, #a98ad6 55%, #f0d060 100%)',
    color: 'white',
    textAlign: 'center',
    padding: '2.5rem 1rem 1.8rem',
  },
  heroTitle: {
    fontSize: '2.4rem',
    letterSpacing: '.04em',
    fontWeight: 300,
    marginBottom: '.4rem',
  },
  heroNames: {
    opacity: 0.88,
    marginTop: '.4rem',
    fontSize: '.95rem',
  },
  heroDate: {
    marginTop: '.8rem',
    fontSize: '1.1rem',
    fontWeight: 600,
  },
  heroCountdown: {
    marginTop: '.3rem',
    fontSize: '.9rem',
    opacity: 0.9,
  },
  cardTitle: {
    fontSize: '1.15rem',
    color: 'var(--color-primary-dark)',
    marginBottom: '1rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem',
  },
  statBox: {
    background: 'var(--color-primary-light)',
    borderRadius: '10px',
    padding: '1rem',
    textAlign: 'center',
    borderTop: '3px solid var(--color-primary)',
  },
  statLabel: {
    fontSize: '.75rem',
    color: 'var(--color-primary-dark)',
    marginBottom: '.3rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '.05em',
  },
  statValue: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: 'var(--color-primary-dark)',
  },
  progressWrap: {
    background: 'var(--color-primary-light)',
    borderRadius: '999px',
    height: '10px',
    marginBottom: '.5rem',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: '999px',
    background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary-dark))',
    transition: 'width 0.4s',
  },
  progressLabel: {
    fontSize: '.8rem',
    color: 'var(--color-primary-dark)',
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: '1rem',
  },
  inviteBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '.4rem',
    background: 'none',
    border: '1.5px solid var(--color-primary)',
    color: 'var(--color-primary-dark)',
    borderRadius: '8px',
    padding: '.4rem .9rem',
    fontSize: '.82rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background .2s',
    fontFamily: 'var(--font-family)',
  },
  venueName: {
    fontSize: '1.1rem',
    color: 'var(--color-primary-dark)',
    marginBottom: '.15rem',
  },
  venueAddress: {
    fontSize: '.85rem',
    color: 'var(--color-text-light)',
    lineHeight: 1.5,
    marginBottom: '.5rem',
  },
  dressDesc: {
    textAlign: 'center',
    color: 'var(--color-text-light)',
    marginBottom: '20px',
    fontSize: '.9rem',
  },
  colorSwatches: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    flexWrap: 'wrap',
  },
  swatch: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  swatchCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: '0 2px 8px rgba(0,0,0,.12)',
  },
  swatchLabel: {
    fontSize: '0.8rem',
    color: 'var(--color-text-muted)',
    fontWeight: 500,
  },
  linksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '.75rem',
  },
  sectionLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '.4rem',
    padding: '1rem',
    cursor: 'pointer',
    background: 'var(--color-primary-light)',
    border: '2px solid transparent',
    borderRadius: '10px',
    transition: 'all 0.2s',
    fontFamily: 'var(--font-family)',
  },
  sectionEmoji: {
    fontSize: '1.8rem',
  },
  sectionLinkText: {
    fontSize: '.85rem',
    fontWeight: 600,
    color: 'var(--color-primary-dark)',
  },
  inviteOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(70,30,120,.72)',
    backdropFilter: 'blur(6px)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  inviteInner: {
    background: '#fff',
    borderRadius: '18px',
    maxWidth: '960px',
    width: '100%',
    boxShadow: '0 24px 80px rgba(110,71,171,.45)',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '92vh',
  },
  inviteClose: {
    position: 'absolute',
    top: '.7rem',
    right: '.7rem',
    zIndex: 10,
    background: 'rgba(255,255,255,.9)',
    border: 'none',
    borderRadius: '50%',
    width: '2.1rem',
    height: '2.1rem',
    cursor: 'pointer',
    fontSize: '1rem',
    color: 'var(--color-primary-dark)',
    boxShadow: '0 2px 8px rgba(0,0,0,.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
  },
  inviteImgWrap: {
    display: 'flex',
    gap: '0',
    flex: 1,
    overflow: 'hidden',
  },
};
