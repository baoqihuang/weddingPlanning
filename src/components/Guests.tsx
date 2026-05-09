import { useState, useMemo } from 'react';
import { useLang } from '../context/LanguageContext';
import { useAccess } from '../context/AccessContext';
import { useCloudStorage } from '../hooks/useCloudStorage';
import { AccessCodeModal } from './AccessCodeModal';

type GuestStatus = 'invited' | 'confirmed' | 'declined';
type GuestSide = 'bride' | 'groom' | 'both';

interface Guest {
  id: string;
  name: string;
  email: string;
  status: GuestStatus;
  side: GuestSide;
  dietary: string;
  notes: string;
}

export function Guests() {
  const { t } = useLang();
  const { isGroomBride, setAccessTier } = useAccess();
  const [showModal, setShowModal] = useState(!isGroomBride);
  const [guests, setGuests] = useCloudStorage<Guest[]>('guests', 'wedding-guests', []);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    status: 'invited' as GuestStatus,
    side: 'both' as GuestSide,
    dietary: '',
    notes: '',
  });

  const stats = useMemo(() => {
    const total = guests.length;
    const confirmed = guests.filter((g) => g.status === 'confirmed').length;
    const declined = guests.filter((g) => g.status === 'declined').length;
    return { total, confirmed, declined, pending: total - confirmed - declined };
  }, [guests]);

  const filtered = useMemo(() => {
    return guests.filter((g) => {
      const q = search.toLowerCase();
      if (q && !g.name.toLowerCase().includes(q) && !g.email.toLowerCase().includes(q)) return false;
      if (statusFilter !== 'all' && g.status !== statusFilter) return false;
      return true;
    });
  }, [guests, search, statusFilter]);

  if (!isGroomBride) {
    if (!showModal) return null;
    return (
      <div className="container section" style={{ paddingTop: '80px' }}>
        <h1 className="section-title">{t.guests.title}</h1>
        <p style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>{t.guests.accessPrompt}</p>
        <AccessCodeModal
          onSuccess={(r) => { setAccessTier(r); setShowModal(false); }}
          onCancel={() => setShowModal(false)}
        />
      </div>
    );
  }

  const addGuest = () => {
    if (!newGuest.name.trim()) return;
    setGuests((prev) => [
      ...prev,
      { ...newGuest, id: 'g' + Date.now(), name: newGuest.name.trim(), email: newGuest.email.trim() },
    ]);
    setNewGuest({ name: '', email: '', status: 'invited', side: 'both', dietary: '', notes: '' });
    setShowAddForm(false);
  };

  const updateStatus = (id: string, status: GuestStatus) => {
    setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, status } : g)));
  };

  const deleteGuest = (id: string) => {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  };

  const sideLabel = (side: GuestSide) => {
    const labels = { bride: t.guests.brideSide, groom: t.guests.groomSide, both: t.guests.bothSide };
    return labels[side];
  };

  const statusBadge = (status: GuestStatus) => {
    const colors: Record<GuestStatus, { bg: string; color: string }> = {
      confirmed: { bg: '#c8e6c9', color: '#2e7d32' },
      invited: { bg: 'var(--color-secondary-light)', color: '#b8a000' },
      declined: { bg: '#ffcdd2', color: '#c62828' },
    };
    const labels: Record<GuestStatus, string> = {
      confirmed: t.guests.confirmed,
      invited: t.guests.invited,
      declined: t.guests.declinedStatus,
    };
    return { ...colors[status], label: labels[status] };
  };

  return (
    <div className="container section" style={{ paddingTop: '80px' }}>
      <h1 className="section-title">{t.guests.title}</h1>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statBox}>
          <span style={styles.statNum}>{stats.total}</span>
          <span style={styles.statLabel}>{t.guests.totalLabel}</span>
        </div>
        <div style={{ ...styles.statBox, borderTop: '3px solid #81c784' }}>
          <span style={{ ...styles.statNum, color: '#2e7d32' }}>{stats.confirmed}</span>
          <span style={styles.statLabel}>{t.guests.confirmedLabel}</span>
        </div>
        <div style={{ ...styles.statBox, borderTop: '3px solid #e57373' }}>
          <span style={{ ...styles.statNum, color: '#c62828' }}>{stats.declined}</span>
          <span style={styles.statLabel}>{t.guests.declinedLabel}</span>
        </div>
        <div style={{ ...styles.statBox, borderTop: '3px solid var(--color-secondary-dark)' }}>
          <span style={{ ...styles.statNum, color: '#b8a000' }}>{stats.pending}</span>
          <span style={styles.statLabel}>{t.guests.pendingLabel}</span>
        </div>
      </div>

      {/* Add Guest */}
      <div className="card">
        <div style={styles.addHeader}>
          <h2 style={styles.cardTitle}>{t.guests.addTitle}</h2>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? t.guests.cancel : t.guests.addBtn}
          </button>
        </div>

        {showAddForm && (
          <div style={styles.addForm}>
            <div style={styles.formRow}>
              <input
                placeholder={t.guests.namePh}
                value={newGuest.name}
                onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                style={styles.formInput}
              />
              <input
                placeholder={t.guests.emailPh}
                value={newGuest.email}
                onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                style={styles.formInput}
              />
            </div>
            <div style={styles.formRow}>
              <select
                value={newGuest.status}
                onChange={(e) => setNewGuest({ ...newGuest, status: e.target.value as GuestStatus })}
                style={styles.formInput}
              >
                <option value="invited">{t.guests.invited}</option>
                <option value="confirmed">{t.guests.confirmed}</option>
                <option value="declined">{t.guests.declinedStatus}</option>
              </select>
              <select
                value={newGuest.side}
                onChange={(e) => setNewGuest({ ...newGuest, side: e.target.value as GuestSide })}
                style={styles.formInput}
              >
                <option value="bride">{t.guests.brideSide}</option>
                <option value="groom">{t.guests.groomSide}</option>
                <option value="both">{t.guests.bothSide}</option>
              </select>
            </div>
            <div style={styles.formRow}>
              <input
                placeholder={t.guests.dietaryPh}
                value={newGuest.dietary}
                onChange={(e) => setNewGuest({ ...newGuest, dietary: e.target.value })}
                style={styles.formInput}
              />
              <input
                placeholder={t.guests.notesPh}
                value={newGuest.notes}
                onChange={(e) => setNewGuest({ ...newGuest, notes: e.target.value })}
                style={styles.formInput}
              />
            </div>
            <button className="btn btn-primary" onClick={addGuest} style={{ width: '100%' }}>
              {t.guests.addBtn}
            </button>
          </div>
        )}
      </div>

      {/* Guest List */}
      <div className="card" style={{ marginTop: '16px' }}>
        <h2 style={styles.cardTitle}>{t.guests.listTitle}</h2>
        <div style={styles.filterRow}>
          <input
            placeholder={t.guests.searchPh}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...styles.formInput, flex: '1 1 250px' }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ ...styles.formInput, flex: '0 1 180px' }}
          >
            <option value="all">{t.guests.filterAll}</option>
            <option value="invited">{t.guests.invited}</option>
            <option value="confirmed">{t.guests.confirmed}</option>
            <option value="declined">{t.guests.declinedStatus}</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p style={styles.empty}>
            {guests.length === 0 ? t.guests.empty : t.guests.notFound}
          </p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>{t.guests.colName}</th>
                  <th style={styles.th}>{t.guests.colEmail}</th>
                  <th style={styles.th}>{t.guests.colSide}</th>
                  <th style={styles.th}>{t.guests.colStatus}</th>
                  <th style={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((guest) => {
                  const badge = statusBadge(guest.status);
                  return (
                    <tr key={guest.id} style={styles.tr}>
                      <td style={styles.td}>
                        <span style={styles.guestName}>{guest.name}</span>
                        {guest.dietary && (
                          <span style={styles.dietaryChip}>🍽 {guest.dietary}</span>
                        )}
                        {guest.notes && (
                          <span style={styles.noteChip} title={guest.notes}>💬</span>
                        )}
                      </td>
                      <td style={styles.td}>{guest.email || '—'}</td>
                      <td style={styles.td}>{sideLabel(guest.side)}</td>
                      <td style={styles.td}>
                        <select
                          value={guest.status}
                          onChange={(e) => updateStatus(guest.id, e.target.value as GuestStatus)}
                          style={{
                            ...styles.statusSelect,
                            background: badge.bg,
                            color: badge.color,
                          }}
                        >
                          <option value="invited">{t.guests.invited}</option>
                          <option value="confirmed">{t.guests.confirmed}</option>
                          <option value="declined">{t.guests.declinedStatus}</option>
                        </select>
                      </td>
                      <td style={styles.td}>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteGuest(guest.id)}
                          style={{ fontSize: '0.78rem' }}
                        >
                          {t.guests.remove}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
    marginBottom: '20px',
  },
  statBox: {
    background: 'var(--color-primary-light)',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    borderTop: '3px solid var(--color-primary)',
  },
  statNum: {
    display: 'block',
    fontSize: '2rem',
    fontWeight: 700,
    color: 'var(--color-primary-dark)',
    lineHeight: 1.2,
  },
  statLabel: {
    fontSize: '0.8rem',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  cardTitle: {
    fontSize: '1.15rem',
    color: 'var(--color-primary-dark)',
    marginBottom: '12px',
  },
  addHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addForm: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  formRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  formInput: {
    flex: '1 1 180px',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
    background: 'var(--color-primary-light)',
    fontSize: '0.9rem',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-family)',
    transition: 'all 0.2s',
    width: 'auto',
  },
  filterRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
  },
  th: {
    textAlign: 'left',
    padding: '10px 12px',
    background: 'var(--color-primary-light)',
    color: 'var(--color-primary-dark)',
    fontWeight: 600,
    fontSize: '0.85rem',
    whiteSpace: 'nowrap',
  },
  tr: {
    transition: 'background 0.15s',
  },
  td: {
    padding: '10px 12px',
    borderBottom: '1px solid var(--color-border)',
    verticalAlign: 'middle',
  },
  guestName: {
    fontWeight: 500,
    display: 'block',
  },
  dietaryChip: {
    display: 'inline-block',
    fontSize: '0.72rem',
    padding: '2px 8px',
    borderRadius: '999px',
    background: '#c8e6c9',
    color: '#2e7d32',
    marginTop: '4px',
    marginRight: '4px',
  },
  noteChip: {
    display: 'inline-block',
    fontSize: '0.72rem',
    padding: '2px 6px',
    borderRadius: '999px',
    background: 'var(--color-secondary-light)',
    cursor: 'pointer',
    marginTop: '4px',
  },
  statusSelect: {
    padding: '4px 8px',
    borderRadius: '999px',
    fontSize: '0.78rem',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-family)',
  },
  empty: {
    textAlign: 'center',
    color: 'var(--color-text-muted)',
    padding: '32px 0',
  },
};
