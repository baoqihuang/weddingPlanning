import { useState } from 'react';
import { useLang } from '../context/LanguageContext';

interface AccessCodeModalProps {
  onSuccess: (role: 'groomBride' | 'groomsmenBridesmaid') => void;
  onCancel: () => void;
  allowGroomsmenCode?: boolean;
}

export function AccessCodeModal({ onSuccess, onCancel, allowGroomsmenCode = false }: AccessCodeModalProps) {
  const { t } = useLang();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '516100') {
      onSuccess('groomBride');
    } else if (allowGroomsmenCode && code === '2616') {
      onSuccess('groomsmenBridesmaid');
    } else {
      setError(true);
    }
  };

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.title}>{t.accessCode.title}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              placeholder={t.accessCode.placeholder}
              autoFocus
            />
          </div>
          {error && <p style={styles.error}>{t.accessCode.error}</p>}
          <div style={styles.buttons}>
            <button type="button" className="btn btn-outline btn-sm" onClick={onCancel}>
              {t.accessCode.cancel}
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              {t.accessCode.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(61, 44, 78, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    borderRadius: '16px',
    padding: '32px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 8px 32px rgba(155, 109, 198, 0.2)',
  },
  title: {
    marginBottom: '20px',
    color: 'var(--color-primary-dark)',
    textAlign: 'center' as const,
  },
  error: {
    color: 'var(--color-danger)',
    fontSize: '0.85rem',
    marginBottom: '12px',
  },
  buttons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '16px',
  },
};
