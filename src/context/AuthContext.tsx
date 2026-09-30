import { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '../types/user';
import { mockDb } from '../data/mockDb';

interface AuthUser {
  userId: string;
  role: UserRole;
  name: string;
  email: string;
  doctorId?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string, loginType: 'patient' | 'staff') => Promise<{ success: boolean; error?: string }>;
  register: (data: { name: string; email: string; password: string; phone: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = 'dcp_session';

function readStoredUser(): AuthUser | null {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    if (!value || typeof value !== 'object') return null;
    const stored = value as Partial<AuthUser>;
    const roles: UserRole[] = ['patient', 'receptionist', 'doctor', 'admin'];
    if (typeof stored.userId === 'string' && typeof stored.name === 'string' && typeof stored.email === 'string' && stored.role && roles.includes(stored.role)) {
      return { userId: stored.userId, name: stored.name, email: stored.email, role: stored.role, doctorId: stored.doctorId };
    }
  } catch {
    // Ignore corrupt or unavailable local prototype session state.
  }
  return null;
}


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);
  const [isLoading] = useState(false);

  const login = async (email: string, password: string, loginType: 'patient' | 'staff'): Promise<{ success: boolean; error?: string }> => {
    const result = await mockDb.authenticate(email, password);
    if (!result) {
      return { success: false, error: 'Invalid email or password.' };
    }
    if ((loginType === 'patient' && result.role !== 'patient') || (loginType === 'staff' && result.role === 'patient')) {
      return { success: false, error: 'Invalid email or password.' };
    }
    const authUser: AuthUser = {
      userId: result.userId,
      role: result.role,
      name: result.name,
      email,
      doctorId: result.doctorId,
    };
    setUser(authUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
    return { success: true };
  };

  const register = async (data: { name: string; email: string; password: string; phone: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      await mockDb.registerPatient(data);
      // Auto-login after registration
      const loginResult = await login(data.email, data.password, 'patient');
      if (!loginResult.success) return loginResult;
      return { success: true };
    } catch (e: unknown) {
      if (e instanceof Error && e.message === 'EMAIL_EXISTS') {
        return { success: false, error: 'An account with this email already exists.' };
      }
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


