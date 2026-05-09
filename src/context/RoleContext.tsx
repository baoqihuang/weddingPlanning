import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'guest' | 'crew' | null;

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isCrew: boolean;
}

const RoleContext = createContext<RoleContextType | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);

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
