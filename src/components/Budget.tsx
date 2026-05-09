import { useState, useMemo } from 'react';
import { useLang } from '../context/LanguageContext';
import { useAccess } from '../context/AccessContext';
import { useCloudStorage } from '../hooks/useCloudStorage';
import { AccessCodeModal } from './AccessCodeModal';
import { defaultBudgetItems, budgetCategories, type BudgetItem } from '../data/budgetDefaults';

export function Budget() {
  const { t } = useLang();
  const { isGroomBride, setAccessTier } = useAccess();
  const [showModal, setShowModal] = useState(!isGroomBride);
  const [items, setItems] = useCloudStorage<BudgetItem[]>('budget', 'wedding-budget', defaultBudgetItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<BudgetItem>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<BudgetItem>>({
    category: budgetCategories[0],
    name: '',
    estimated: 0,
    actual: 0,
    paid: false,
    notes: '',
  });

  const totals = useMemo(() => {
    const estimated = items.reduce((s, i) => s + (i.estimated || 0), 0);
    const actual = items.reduce((s, i) => s + (i.actual || 0), 0);
    return { estimated, actual, remaining: estimated - actual };
  }, [items]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, BudgetItem[]> = {};
    for (const cat of budgetCategories) groups[cat] = [];
    for (const item of items) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [items]);

  if (!isGroomBride) {
    if (!showModal) return null;
    return (
      <div className="container section" style={{ paddingTop: '80px' }}>
        <h1 className="section-title">{t.budget.title}</h1>
        <p style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>{t.budget.accessPrompt}</p>
        <AccessCodeModal
          onSuccess={(r) => { setAccessTier(r); setShowModal(false); }}
          onCancel={() => setShowModal(false)}
        />
      </div>
    );
  }

  const handleAdd = () => {
    const id = 'b' + Date.now();
    setItems((prev) => [...prev, { id, ...newItem } as BudgetItem]);
    setNewItem({ category: budgetCategories[0], name: '', estimated: 0, actual: 0, paid: false, notes: '' });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const startEdit = (item: BudgetItem) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const saveEdit = () => {
    if (!editingId) return;
    setItems((prev) => prev.map((i) => (i.id === editingId ? { ...i, ...editForm } : i)));
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="container section" style={{ paddingTop: '80px' }}>
      <h1 className="section-title">{t.budget.title}</h1>

      {/* Summary */}
      <div style={styles.summary}>
        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>{t.budget.totalEstimated}</span>
          <span style={styles.summaryValue}>¥{totals.estimated.toLocaleString()}</span>
        </div>
        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>{t.budget.totalActual}</span>
          <span style={styles.summaryValue}>¥{totals.actual.toLocaleString()}</span>
        </div>
        <div style={{ ...styles.summaryCard, borderColor: totals.remaining >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
          <span style={styles.summaryLabel}>{t.budget.remaining}</span>
          <span style={{ ...styles.summaryValue, color: totals.remaining >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
            ¥{totals.remaining.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Add Item Button */}
      <div style={{ textAlign: 'right', marginBottom: '16px' }}>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? t.budget.cancel : t.budget.addItem}
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <div style={styles.formGrid}>
            <div className="form-group">
              <label>{t.budget.category}</label>
              <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
                {budgetCategories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>{t.budget.item}</label>
              <input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>{t.budget.estimated}</label>
              <input type="number" value={newItem.estimated} onChange={(e) => setNewItem({ ...newItem, estimated: +e.target.value })} />
            </div>
            <div className="form-group">
              <label>{t.budget.actual}</label>
              <input type="number" value={newItem.actual} onChange={(e) => setNewItem({ ...newItem, actual: +e.target.value })} />
            </div>
            <div className="form-group">
              <label>{t.budget.notes}</label>
              <input value={newItem.notes} onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })} />
            </div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={handleAdd}>{t.budget.save}</button>
        </div>
      )}

      {/* Items by Category */}
      {budgetCategories.map((cat) => {
        const catItems = groupedItems[cat];
        if (!catItems || catItems.length === 0) return null;
        return (
          <div key={cat} style={{ marginBottom: '24px' }}>
            <h3 style={styles.catTitle}>{cat}</h3>
            {catItems.map((item) => (
              <div key={item.id} className="card" style={styles.itemCard}>
                {editingId === item.id ? (
                  <>
                    <div style={styles.formGrid}>
                      <div className="form-group">
                        <label>{t.budget.item}</label>
                        <input value={editForm.name || ''} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>{t.budget.estimated}</label>
                        <input type="number" value={editForm.estimated || 0} onChange={(e) => setEditForm({ ...editForm, estimated: +e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>{t.budget.actual}</label>
                        <input type="number" value={editForm.actual || 0} onChange={(e) => setEditForm({ ...editForm, actual: +e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>{t.budget.notes}</label>
                        <input value={editForm.notes || ''} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} />
                      </div>
                    </div>
                    <div style={styles.itemActions}>
                      <label style={styles.paidLabel}>
                        <input type="checkbox" checked={editForm.paid || false} onChange={(e) => setEditForm({ ...editForm, paid: e.target.checked })} />
                        {t.budget.paid}
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-primary btn-sm" onClick={saveEdit}>{t.budget.save}</button>
                        <button className="btn btn-outline btn-sm" onClick={() => setEditingId(null)}>{t.budget.cancel}</button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={styles.itemRow}>
                    <div style={styles.itemInfo}>
                      <span style={styles.itemName}>
                        {item.paid && <span style={styles.paidBadge}>✓</span>}
                        {item.name}
                      </span>
                      {item.notes && <span style={styles.itemNotes}>{item.notes}</span>}
                    </div>
                    <div style={styles.itemNumbers}>
                      <span style={styles.itemEst}>¥{item.estimated.toLocaleString()}</span>
                      <span style={styles.itemAct}>¥{item.actual.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-outline btn-sm" onClick={() => startEdit(item)}>{t.budget.edit}</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>{t.budget.delete}</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  summary: {
    display: 'flex',
    gap: '16px',
    marginBottom: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  summaryCard: {
    flex: '1 1 200px',
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: 'var(--shadow)',
    border: '2px solid var(--color-border)',
  },
  summaryLabel: {
    display: 'block',
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
  },
  summaryValue: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--color-primary-dark)',
  },
  catTitle: {
    fontSize: '1.1rem',
    color: 'var(--color-primary-dark)',
    marginBottom: '8px',
    paddingBottom: '4px',
    borderBottom: '2px solid var(--color-primary-light)',
  },
  itemCard: {
    padding: '16px',
    marginBottom: '8px',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  itemInfo: {
    flex: '1 1 200px',
    display: 'flex',
    flexDirection: 'column',
  },
  itemName: {
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  itemNotes: {
    fontSize: '0.8rem',
    color: 'var(--color-text-muted)',
  },
  itemNumbers: {
    display: 'flex',
    gap: '16px',
  },
  itemEst: {
    color: 'var(--color-text-light)',
    fontSize: '0.9rem',
  },
  itemAct: {
    fontWeight: 600,
    color: 'var(--color-primary-dark)',
  },
  paidBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: 'var(--color-success)',
    color: 'white',
    fontSize: '0.7rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '12px',
  },
  itemActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  paidLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
};
