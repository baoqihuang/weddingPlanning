export function PugMascot({ size = 48, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <img
      src="/images/pug1.png"
      alt="Pug mascot"
      width={size}
      height={size}
      style={{ objectFit: 'contain', mixBlendMode: 'multiply', ...style }}
    />
  );
}

export function PoodleMascot({ size = 48, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <img
      src="/images/pug2.png"
      alt="Pug mascot 2"
      width={size}
      height={size}
      style={{ objectFit: 'contain', mixBlendMode: 'multiply', ...style }}
    />
  );
}

export function DogDivider({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '24px 0', ...style }}>
      <PugMascot size={32} />
      <div style={{ width: '60px', height: '2px', background: 'var(--color-primary-light)', borderRadius: '1px' }} />
      <span style={{ fontSize: '1.2rem' }}>🐾</span>
      <div style={{ width: '60px', height: '2px', background: 'var(--color-primary-light)', borderRadius: '1px' }} />
      <PoodleMascot size={32} />
    </div>
  );
}
