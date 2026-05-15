import { useState, type ReactNode } from 'react';

export function CollapsibleCard({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card" style={{ cursor: 'pointer' }} onClick={() => !open && setOpen(true)}>
      <h2 onClick={() => setOpen(!open)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, cursor: 'pointer', userSelect: 'none' }}>
        <span>{title}</span>
        <span style={{ fontSize: '1.2rem', transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
      </h2>
      {open && <div style={{ marginTop: '1rem' }}>{children}</div>}
    </div>
  );
}
