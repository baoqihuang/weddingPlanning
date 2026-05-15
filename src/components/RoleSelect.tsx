import { useState } from 'react';
import { useRole } from '../context/RoleContext';
import { useAccess } from '../context/AccessContext';
import { useLang } from '../context/LanguageContext';
import { PugMascot, PoodleMascot } from './DogMascots';

export function RoleSelect() {
  const { setRole } = useRole();
  const { clearAccess } = useAccess();
  const { t } = useLang();
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const selectRole = (r: 'guest' | 'crew') => {
    clearAccess();
    setRole(r);
  };

  const handleCrewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '2616') {
      selectRole('crew');
    } else {
      setError(true);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.dogs}>
          <PugMascot size={64} />
          <PoodleMascot size={64} />
        </div>
        <h2 style={styles.title}>
          {t.roleSelect.welcome}
        </h2>
        <p style={styles.subtitle}>
          {t.roleSelect.subtitle}
        </p>

        <button style={styles.guestBtn} onClick={() => selectRole('guest')}>
          <span style={styles.btnIcon}>💌</span>
          <span style={styles.btnLabel}>
            {t.roleSelect.guest}
          </span>
          <span style={styles.btnHint}>
            {t.roleSelect.guestHint}
          </span>
        </button>

        <button style={styles.crewBtn} onClick={() => setShowCode(true)}>
          <span style={styles.btnIcon}>💍</span>
          <span style={styles.btnLabel}>
            {t.roleSelect.crew}
          </span>
          <span style={styles.btnHint}>
            {t.roleSelect.crewHint}
          </span>
        </button>

        {showCode && (
          <form onSubmit={handleCrewSubmit} style={styles.codeForm}>
            <input
              type="password"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              placeholder={t.roleSelect.codePlaceholder}
              style={styles.codeInput}
              autoFocus
            />
            {error && (
              <p style={styles.error}>
                {t.roleSelect.codeError}
              </p>
            )}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              {t.roleSelect.enter}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary-light) 100%)',
    padding: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px 32px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 12px 48px rgba(155, 109, 198, 0.2)',
    textAlign: 'center',
  },
  dogs: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '1.6rem',
    color: 'var(--color-primary-dark)',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '.9rem',
    color: 'var(--color-text-muted)',
    marginBottom: '24px',
  },
  guestBtn: {
    width: '100%',
    padding: '16px',
    border: '2px solid var(--color-primary-light)',
    borderRadius: '12px',
    background: 'var(--color-primary-light)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '12px',
    transition: 'all .2s',
    fontFamily: 'var(--font-family)',
  },
  crewBtn: {
    width: '100%',
    padding: '16px',
    border: '2px solid var(--color-secondary)',
    borderRadius: '12px',
    background: 'var(--color-secondary-light)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '12px',
    transition: 'all .2s',
    fontFamily: 'var(--font-family)',
  },
  btnIcon: {
    fontSize: '1.8rem',
  },
  btnLabel: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--color-text)',
  },
  btnHint: {
    fontSize: '.78rem',
    color: 'var(--color-text-muted)',
  },
  codeForm: {
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  codeInput: {
    padding: '10px 14px',
    border: '1.5px solid var(--color-border)',
    borderRadius: '8px',
    fontSize: '1rem',
    textAlign: 'center',
    fontFamily: 'var(--font-family)',
    width: '100%',
  },
  error: {
    color: 'var(--color-danger)',
    fontSize: '.82rem',
  },
};
