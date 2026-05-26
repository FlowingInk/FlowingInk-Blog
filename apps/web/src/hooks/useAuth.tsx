import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

interface AuthContextValue {
	token: string | null;
	setAuth: (access: string, refresh: string) => void;
	clearAuth: () => void;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadToken(): string | null {
	if (typeof window === 'undefined') return null;
	return localStorage.getItem('access_token');
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(loadToken);

	const setAuth = useCallback((access: string, refresh: string) => {
		localStorage.setItem('access_token', access);
		localStorage.setItem('refresh_token', refresh);
		setToken(access);
	}, []);

	const clearAuth = useCallback(() => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		setToken(null);
	}, []);

	return (
		<AuthContext.Provider value={{ token, setAuth, clearAuth, isAuthenticated: !!token }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextValue {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
	return ctx;
}
