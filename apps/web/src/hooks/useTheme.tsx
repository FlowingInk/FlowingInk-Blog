import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'bochi' | 'whiteAlbum';

const THEMES: Theme[] = ['bochi', 'whiteAlbum'];

function getThemeClass(theme: Theme): string | null {
	return theme === 'bochi' ? null : `theme-${theme}`;
}

function getInitialTheme(): Theme {
	if (typeof window === 'undefined') return 'bochi';
	return (localStorage.getItem('color-theme') as Theme) || 'bochi';
}

function getBackgroundUrl(theme: Theme): string {
	const mq = window.matchMedia('(min-width: 768px)');
	if (mq.matches) return theme === 'bochi' ? '/bochi-bg1-pc.avif' : '/white-album-pc.webp';
	return theme === 'bochi' ? '/bochi-bg-mb.webp' : '/white-album-bg-mb.jpg';
}

interface ThemeContextValue {
	theme: Theme;
	backgroundUrl: string;
	toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	useEffect(() => {
		const root = document.documentElement;
		for (const t of THEMES) {
			const cls = getThemeClass(t);
			if (cls) root.classList.remove(cls);
		}
		const current = getThemeClass(theme);
		if (current) root.classList.add(current);
		localStorage.setItem('color-theme', theme);
	}, [theme]);

	const toggle = useCallback(() => {
		setTheme((prev) => (prev === 'bochi' ? 'whiteAlbum' : 'bochi'));
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, backgroundUrl: getBackgroundUrl(theme), toggle }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextValue {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>');
	return ctx;
}
