import { createContext, useContext, useState, type ReactNode } from 'react';

export type AccessTier = 'groomBride' | 'groomsmenBridesmaid' | null;

interface AccessContextType {
  accessTier: AccessTier;
  setAccessTier: (tier: AccessTier) => void;
  /** True if user has groom/bride full access (code 516100) */
  isGroomBride: boolean;
  /** True if user has any crew-level access (516100 or 2616) */
  hasCrewAccess: boolean;
  /** Clear access tier (used when switching roles) */
  clearAccess: () => void;
}

const AccessContext = createContext<AccessContextType | null>(null);

export function AccessProvider({ children }: { children: ReactNode }) {
  const [accessTier, setAccessTier] = useState<AccessTier>(() => {
    const saved = localStorage.getItem('wedding-access-tier');
    if (saved === 'groomBride' || saved === 'groomsmenBridesmaid') return saved;
    return null;
  });

  const updateTier = (tier: AccessTier) => {
    // Only upgrade, never downgrade
    if (tier === 'groomBride' || (tier === 'groomsmenBridesmaid' && accessTier !== 'groomBride')) {
      setAccessTier(tier);
      if (tier) localStorage.setItem('wedding-access-tier', tier);
    }
  };

  const clearAccess = () => {
    setAccessTier(null);
    localStorage.removeItem('wedding-access-tier');
  };

  return (
    <AccessContext.Provider value={{
      accessTier,
      setAccessTier: updateTier,
      isGroomBride: accessTier === 'groomBride',
      hasCrewAccess: accessTier === 'groomBride' || accessTier === 'groomsmenBridesmaid',
      clearAccess,
    }}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error('useAccess must be used within AccessProvider');
  return ctx;
}
