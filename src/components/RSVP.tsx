import { useState, useMemo } from 'react';
import { useLang } from '../context/LanguageContext';
import { useAccess } from '../context/AccessContext';
import { useCloudStorage } from '../hooks/useCloudStorage';
import { AccessCodeModal } from './AccessCodeModal';

interface RSVPEntry {
  id: string;
  name: string;
  email: string;
  attending: boolean;
  dietary: string;
  message: string;
  needHotel: boolean;
  numAdults: number;
  bringingKids: boolean;
  numKids: number;
  submittedAt: string;
}

export function RSVP() {
  const { t, lang } = useLang();
  const [entries, setEntries] = useCloudStorage<RSVPEntry[]>('rsvp', 'wedding-rsvp', []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [choice, setChoice] = useState<'yes' | 'no' | null>(null);
  const [dietary, setDietary] = useState('');
  const [message, setMessage] = useState('');
  const [needHotel, setNeedHotel] = useState(false);
  const [numAdults, setNumAdults] = useState(1);
  const [bringingKids, setBringingKids] = useState(false);
  const [numKids, setNumKids] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { isGroomBride, setAccessTier } = useAccess();
  const [showViewer, setShowViewer] = useState(isGroomBride);
  const [showAccessModal, setShowAccessModal] = useState(false);

  // Check if name matches existing guest entry
  const nameHint = useMemo(() => {
    if (name.trim().length < 2) return null;
    const match = entries.find((e) => e.name.toLowerCase().includes(name.trim().toLowerCase()));
    return match
      ? { type: 'found' as const, text: `✓ ${t.rsvp.alreadySubmitted}` }
      : null;
  }, [name, entries, t]);

  const stats = useMemo(() => {
    const attending = entries.filter((e) => e.attending);
    return {
      total: entries.length,
      attending: attending.length,
      declined: entries.filter((e) => !e.attending).length,
      totalAdults: attending.reduce((s, e) => s + e.numAdults, 0),
      totalKids: attending.reduce((s, e) => s + e.numKids, 0),
      needHotel: attending.filter((e) => e.needHotel).length,
    };
  }, [entries]);

  async function handleSubmit() {
    if (!name.trim()) return;
    if (!choice) return;

    const entry: RSVPEntry = {
      id: 'r' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      attending: choice === 'yes',
      dietary: choice === 'yes' ? dietary : '',
      message,
      needHotel: choice === 'yes' ? needHotel : false,
      numAdults: choice === 'yes' ? numAdults : 0,
      bringingKids: choice === 'yes' ? bringingKids : false,
      numKids: choice === 'yes' && bringingKids ? numKids : 0,
      submittedAt: new Date().toISOString(),
    };

    // Submit to public API endpoint
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    } catch {
      // Fallback: save locally if API fails
    }
    setEntries((prev) => [...prev, entry]);
    setSubmitted(true);
  }

  function resetForm() {
    setName(''); setEmail(''); setChoice(null);
    setDietary(''); setMessage(''); setNeedHotel(false);
    setNumAdults(1); setBringingKids(false); setNumKids(0);
    setSubmitted(false);
  }

  // Viewer mode (groom/bride)
  if (showViewer) {
    return (
      <div className="container section" style={{ paddingTop: '80px' }}>
        <h1 className="section-title">{t.rsvp.guestList}</h1>
        <button className="btn btn-outline" onClick={() => setShowViewer(false)} style={{ marginBottom: '20px' }}>
          ← {t.common.back}
        </button>

        <div style={statGridStyle}>
          {[
            { num: stats.total, label: t.rsvp.totalGuests, color: 'var(--color-primary-dark)' },
            { num: stats.attending, label: t.rsvp.attending_label, color: '#2e7d32' },
            { num: stats.declined, label: t.rsvp.declined, color: '#c62828' },
            { num: stats.totalAdults, label: t.rsvp.totalAdults, color: 'var(--color-primary-dark)' },
            { num: stats.totalKids, label: t.rsvp.totalKids, color: 'var(--color-primary-dark)' },
            { num: stats.needHotel, label: t.rsvp.needingHotel, color: 'var(--color-primary-dark)' },
          ].map((s) => (
            <div key={s.label} className="card" style={{ textAlign: 'center', padding: '16px' }}>
              <span style={{ display: 'block', fontSize: '2rem', fontWeight: 700, color: s.color }}>{s.num}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr>
                <th style={thStyle}>{t.rsvp.name}</th>
                <th style={thStyle}>{t.rsvp.attending}</th>
                <th style={thStyle}>{t.rsvp.numAdults}</th>
                <th style={thStyle}>{t.rsvp.numKids}</th>
                <th style={thStyle}>{t.rsvp.needHotel}</th>
                <th style={thStyle}>{t.rsvp.dietaryRestrictions}</th>
                <th style={thStyle}>{t.rsvp.notes}</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td style={tdStyle}>{entry.name}</td>
                  <td style={tdStyle}>{entry.attending ? '✓' : '✗'}</td>
                  <td style={tdStyle}>{entry.numAdults}</td>
                  <td style={tdStyle}>{entry.numKids}</td>
                  <td style={tdStyle}>{entry.needHotel ? '✓' : '—'}</td>
                  <td style={tdStyle}>{entry.dietary || '—'}</td>
                  <td style={tdStyle}>{entry.message || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Thank you screen
  if (submitted) {
    const yes = choice === 'yes';
    return (
      <div className="container section" style={{ paddingTop: '80px' }}>
        <div className="card rsvp-thanks-wrap">
          <div className="thanks-icon">{yes ? '🎊' : '💕'}</div>
          <h2>{t.rsvp.thankYou}</h2>
          <p>{yes ? t.rsvp.subtitle : t.rsvp.subtitle}</p>
          <button className="btn btn-outline" onClick={resetForm}>{t.rsvp.update}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container section" style={{ paddingTop: '80px' }}>
      {/* Hero Card */}
      <div className="rsvp-hero-card">
        <p className="rsvp-tag">{t.rsvp.subtitle}</p>
        <h2><strong>Heilam Wu & Baoqi Huang</strong></h2>
        <p className="rsvp-date">November 1, 2026</p>
        <p className="rsvp-loc">Shicheng Forest Hot Spring Resort · 石城森林溫泉度假酒店</p>
      </div>

      {/* View Responses button */}
      {!showViewer && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button className="btn btn-outline" onClick={() => {
            if (isGroomBride) { setShowViewer(true); } else { setShowAccessModal(true); }
          }} style={{ fontSize: '.85rem' }}>
            🔒 {t.rsvp.viewResponses}
          </button>
        </div>
      )}

      {showAccessModal && (
        <AccessCodeModal
          onSuccess={(r) => { setAccessTier(r); setShowAccessModal(false); setShowViewer(true); }}
          onCancel={() => setShowAccessModal(false)}
        />
      )}

      {/* RSVP Form */}
      <div className="card">
        <h2>{t.rsvp.title}</h2>

        {/* Name */}
        <label style={labelStyle}>{t.rsvp.name} *</label>
        <div className="form-row" style={{ marginBottom: '.25rem' }}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.rsvp.name} />
        </div>
        {nameHint && <div className={`rsvp-name-hint ${nameHint.type}`}>{nameHint.text}</div>}

        {/* Email */}
        <label style={labelStyle}>{t.rsvp.email}</label>
        <div className="form-row">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.rsvp.email} />
        </div>

        {/* Attendance */}
        <label style={labelStyle}>{t.rsvp.attending}</label>
        <div className="rsvp-attend-btns">
          <button
            className={`rsvp-attend-btn${choice === 'yes' ? ' selected-yes' : ''}`}
            onClick={() => setChoice('yes')}
          >
            <span className="ra-icon">🎉</span>
            <span>{t.rsvp.yes}</span>
          </button>
          <button
            className={`rsvp-attend-btn${choice === 'no' ? ' selected-no' : ''}`}
            onClick={() => setChoice('no')}
          >
            <span className="ra-icon">💌</span>
            <span>{t.rsvp.no}</span>
          </button>
        </div>

        {choice === 'yes' && (
          <>
            {/* Number of Adults & Kids */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '.75rem' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{t.rsvp.numAdults}</label>
                <input type="number" min={1} value={numAdults} onChange={(e) => setNumAdults(Math.max(1, +e.target.value))} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{t.rsvp.numKids}</label>
                <input type="number" min={0} value={numKids} onChange={(e) => setNumKids(Math.max(0, +e.target.value))} />
              </div>
            </div>

            {/* Dietary */}
            <label style={labelStyle}>{t.rsvp.dietaryRestrictions}</label>
            <div className="form-row">
              <select
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                style={{ flex: '1 1 100%' }}
              >
                <option value="">{lang === 'en' ? 'None' : '無'}</option>
                <option value="Vegetarian">{lang === 'en' ? 'Vegetarian' : '素食'}</option>
                <option value="Vegan">{lang === 'en' ? 'Vegan' : '純素'}</option>
                <option value="Halal">{lang === 'en' ? 'Halal' : '清真'}</option>
                <option value="Gluten-free">{lang === 'en' ? 'Gluten-free' : '無麩質'}</option>
                <option value="Nut allergy">{lang === 'en' ? 'Nut allergy' : '堅果過敏'}</option>
                <option value="Seafood allergy">{lang === 'en' ? 'Seafood allergy' : '海鮮過敏'}</option>
                <option value="Other">{lang === 'en' ? 'Other (specify in message)' : '其他（請在留言註明）'}</option>
              </select>
            </div>
          </>
        )}

        {/* Message */}
        <label style={labelStyle}>{t.rsvp.notes}</label>
        <div className="form-row">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.rsvp.notes}
            rows={3}
            style={{ resize: 'vertical', flex: '1 1 100%' }}
          />
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%', padding: '.8rem', fontSize: '1rem' }}
          onClick={handleSubmit}
          disabled={!name.trim() || !choice}
        >
          {t.rsvp.submit}
        </button>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: '.85rem',
  fontWeight: 600,
  color: 'var(--color-primary-dark)',
  display: 'block',
  marginBottom: '.3rem',
};

const statGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: '12px',
  marginBottom: '24px',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  background: 'var(--color-primary-light)',
  color: 'var(--color-primary-dark)',
  fontWeight: 600,
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid var(--color-border)',
};
