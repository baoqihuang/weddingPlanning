import { useState, useMemo } from 'react';
import { useLang } from '../context/LanguageContext';
import { useAccess } from '../context/AccessContext';
import { useCloudStorage } from '../hooks/useCloudStorage';
import { AccessCodeModal } from './AccessCodeModal';
import { defaultChecklistItems, checklistCategories, weddingPartyMembers, type ChecklistItem } from '../data/checklistDefaults';

export function Checklist() {
  const { t, lang } = useLang();
  const { accessTier, hasCrewAccess, setAccessTier } = useAccess();
  const [showModal, setShowModal] = useState(!hasCrewAccess);
  const [items, setItems] = useCloudStorage<ChecklistItem[]>('checklist', 'wedding-checklist', defaultChecklistItems);
  const [filterCat, setFilterCat] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState<Partial<ChecklistItem>>({
    task: '',
    category: checklistCategories[0],
    dueDate: '',
    status: 'notStarted',
    assignee: '',
  });

  const readOnly = accessTier === 'groomsmenBridesmaid';

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filterCat !== 'all' && item.category !== filterCat) return false;
      if (filterStatus !== 'all' && item.status !== filterStatus) return false;
      if (filterAssignee !== 'all' && item.assignee !== filterAssignee) return false;
      return true;
    });
  }, [items, filterCat, filterStatus, filterAssignee]);

  const stats = useMemo(() => ({
    total: items.length,
    done: items.filter((i) => i.status === 'done').length,
    inProgress: items.filter((i) => i.status === 'inProgress').length,
  }), [items]);

  if (!hasCrewAccess) {
    if (!showModal) return null;
    return (
      <div className="container section" style={{ paddingTop: '80px' }}>
        <h1 className="section-title">{t.checklist.title}</h1>
        <p style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>{t.checklist.accessPrompt}</p>
        <AccessCodeModal
          onSuccess={(r) => { setAccessTier(r); setShowModal(false); }}
          onCancel={() => setShowModal(false)}
          allowGroomsmenCode
        />
      </div>
    );
  }

  const updateItem = (id: string, updates: Partial<ChecklistItem>) => {
    if (readOnly) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  };

  const deleteItem = (id: string) => {
    if (readOnly) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const addTask = () => {
    const id = 'c' + Date.now();
    setItems((prev) => [...prev, { id, ...newTask } as ChecklistItem]);
    setNewTask({ task: '', category: checklistCategories[0], dueDate: '', status: 'notStarted', assignee: '' });
    setShowAddForm(false);
  };

  const statusColor = (status: string) => {
    if (status === 'done') return 'var(--color-success)';
    if (status === 'inProgress') return 'var(--color-secondary-dark)';
    return 'var(--color-text-muted)';
  };

  const statusLabel = (status: string) => {
    if (status === 'done') return t.checklist.status.done;
    if (status === 'inProgress') return t.checklist.status.inProgress;
    return t.checklist.status.notStarted;
  };

  return (
    <div className="container section" style={{ paddingTop: '80px' }}>
      <h1 className="section-title">
        {t.checklist.title} {readOnly && <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t.checklist.readOnly}</span>}
      </h1>

      {/* Progress */}
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${items.length ? (stats.done / items.length) * 100 : 0}%` }} />
      </div>
      <p style={styles.progressText}>{stats.done}/{stats.total} {t.checklist.status.done}</p>

      {/* Filters */}
      <div style={styles.filters}>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} style={{ maxWidth: '200px' }}>
          <option value="all">{t.checklist.filterAll}</option>
          {checklistCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ maxWidth: '200px' }}>
          <option value="all">{t.checklist.filterAll}</option>
          <option value="notStarted">{t.checklist.status.notStarted}</option>
          <option value="inProgress">{t.checklist.status.inProgress}</option>
          <option value="done">{t.checklist.status.done}</option>
        </select>
        <select value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)} style={{ maxWidth: '200px' }}>
          <option value="all">{t.checklist.assignee || 'Assignee'}</option>
          {[...weddingPartyMembers, 'All Bridesmaids', 'All Groomsmen'].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        {!readOnly && (
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? t.checklist.cancel : t.checklist.addTask}
          </button>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && !readOnly && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <div style={styles.formGrid}>
            <div className="form-group">
              <label>Task</label>
              <input value={newTask.task} onChange={(e) => setNewTask({ ...newTask, task: e.target.value })} />
            </div>
            <div className="form-group">
              <label>{t.budget.category}</label>
              <select value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}>
                {checklistCategories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>{t.checklist.dueDate}</label>
              <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
            </div>
            <div className="form-group">
              <label>{t.checklist.assignee}</label>
              <select value={newTask.assignee} onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}>
                <option value="">—</option>
                {[...weddingPartyMembers, 'All Bridesmaids', 'All Groomsmen'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={addTask}>{t.checklist.save}</button>
        </div>
      )}

      {/* Items */}
      {filteredItems.map((item) => (
        <div key={item.id} className="card" style={styles.itemCard}>
          <div style={styles.itemRow}>
            {!readOnly && (
              <input
                type="checkbox"
                checked={item.status === 'done'}
                onChange={(e) => updateItem(item.id, { status: e.target.checked ? 'done' : 'notStarted' })}
                style={styles.checkbox}
              />
            )}
            <div style={styles.itemInfo}>
              <span style={{ ...styles.itemTask, textDecoration: item.status === 'done' ? 'line-through' : 'none' }}>
                {item.task}
              </span>
              <span style={styles.itemMeta}>
                {item.category} {item.dueDate && `· ${item.dueDate}`} {item.assignee && `· ${item.assignee}`}
              </span>
              {!readOnly ? (
                <input
                  type="text"
                  value={item.notes || ''}
                  onChange={(e) => updateItem(item.id, { notes: e.target.value })}
                  placeholder={lang === 'en' ? 'Add a note...' : '添加備註...'}
                  style={styles.notesInput}
                />
              ) : item.notes ? (
                <span style={styles.notesText}>💬 {item.notes}</span>
              ) : null}
            </div>
            <div style={styles.itemRight}>
              {!readOnly && (
                <select
                  value={item.status}
                  onChange={(e) => updateItem(item.id, { status: e.target.value as ChecklistItem['status'] })}
                  style={{ ...styles.statusSelect, borderColor: statusColor(item.status), color: statusColor(item.status) }}
                >
                  <option value="notStarted">{t.checklist.status.notStarted}</option>
                  <option value="inProgress">{t.checklist.status.inProgress}</option>
                  <option value="done">{t.checklist.status.done}</option>
                </select>
              )}
              {readOnly && (
                <span style={{ color: statusColor(item.status), fontSize: '0.85rem', fontWeight: 500 }}>
                  {statusLabel(item.status)}
                </span>
              )}
              {!readOnly && (
                <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item.id)}>
                  {t.checklist.delete}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  progressBar: {
    height: '8px',
    background: 'var(--color-primary-light)',
    borderRadius: '4px',
    marginBottom: '8px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'var(--color-success)',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  progressText: {
    textAlign: 'center',
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
    marginBottom: '20px',
  },
  filters: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '12px',
    marginBottom: '12px',
  },
  itemCard: {
    padding: '12px 16px',
    marginBottom: '8px',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    accentColor: 'var(--color-success)',
    flexShrink: 0,
  },
  itemInfo: {
    flex: '1 1 250px',
    display: 'flex',
    flexDirection: 'column',
  },
  itemTask: {
    fontWeight: 500,
    fontSize: '0.95rem',
  },
  itemMeta: {
    fontSize: '0.8rem',
    color: 'var(--color-text-muted)',
  },
  notesInput: {
    marginTop: '4px',
    padding: '4px 8px',
    fontSize: '0.8rem',
    border: '1px solid var(--color-primary-light)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    background: 'var(--color-primary-light)',
    width: '100%',
  },
  notesText: {
    marginTop: '4px',
    fontSize: '0.8rem',
    color: 'var(--color-text-muted)',
    fontStyle: 'italic',
  },
  itemRight: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  statusSelect: {
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: 500,
    border: '2px solid',
    background: 'white',
    width: 'auto',
  },
};
