import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type UserRole = 'guest' | 'crew' | null;

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isCrew: boolean;
}

const RoleContext = createContext<RoleContextType | null>(null);

const ROLE_KEY = 'wedding-role';

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = sessionStorage.getItem(ROLE_KEY);
    return saved === 'guest' || saved === 'crew' ? saved : null;
  });

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole) {
      sessionStorage.setItem(ROLE_KEY, newRole);
    } else {
      sessionStorage.removeItem(ROLE_KEY);
    }
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole, isCrew: role === 'crew' }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}
