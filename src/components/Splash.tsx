import { useState } from 'react';
import { PugMascot, PoodleMascot } from './DogMascots';

interface SplashProps {
  onEnter: () => void;
}

export function Splash({ onEnter }: SplashProps) {
  const [imageLoaded, setImageLoaded] = useState([false, false]);

  const handleLoad = (idx: number) => {
    setImageLoaded((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.imageContainer}>
        <img
          src="/images/invitationLetter1.JPG"
          alt="Wedding Invitation - Front"
          style={{
            ...styles.image,
            opacity: imageLoaded[0] ? 1 : 0,
          }}
          onLoad={() => handleLoad(0)}
        />
        <img
          src="/images/invitationLetter2.JPG"
          alt="Wedding Invitation - Details"
          style={{
            ...styles.image,
            opacity: imageLoaded[1] ? 1 : 0,
          }}
          onLoad={() => handleLoad(1)}
        />
      </div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <PugMascot size={48} />
        <PoodleMascot size={48} />
      </div>
      <button
        className="btn btn-primary"
        style={styles.enterBtn}
        onClick={onEnter}
      >
        Enter
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-secondary-light) 100%)',
    padding: '20px',
  },
  imageContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',
    marginBottom: '24px',
  },
  image: {
    maxHeight: '80vh',
    width: '45%',
    maxWidth: '500px',
    borderRadius: '16px',
    boxShadow: '0 8px 40px rgba(155, 109, 198, 0.25)',
    transition: 'opacity 0.6s ease',
    objectFit: 'contain' as const,
  },
  enterBtn: {
    fontSize: '1rem',
    padding: '12px 40px',
    borderRadius: '50px',
    boxShadow: '0 4px 16px rgba(155, 109, 198, 0.3)',
    letterSpacing: '2px',
  },
};
