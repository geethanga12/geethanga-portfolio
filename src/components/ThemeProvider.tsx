'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: true,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const themeTimer = useRef<number>();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      const initialDark = saved ? saved === 'dark' : true;
      setDarkMode(initialDark);
      applyTheme(initialDark);
    } catch {
      applyTheme(true);
    }
  }, []);

  const applyTheme = (dark: boolean) => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.style.colorScheme = dark ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      /* ignore unavailable storage */
    }
  };

  const toggleDarkMode = () => {
    const next = !darkMode;

    const commit = () => {
      flushSync(() => setDarkMode(next));
      applyTheme(next);
    };

    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };

    if (reduce) {
      commit();
      return;
    }

    if (typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(commit);
      return;
    }

    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.clearTimeout(themeTimer.current);
    themeTimer.current = window.setTimeout(
      () => root.classList.remove('theme-transition'),
      450,
    );
    commit();
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
