"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface PreloaderContextType {
  preloaderDone: boolean;
  setPreloaderDone: (done: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export const PreloaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from sessionStorage so it persists across reloads and remounts
  const [preloaderDone, setPreloaderDone] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!window.sessionStorage.getItem('hasVisited');
    }
    return false;
  });
  const setDone = useCallback((done: boolean) => {
    setPreloaderDone(done);
    if (done && typeof window !== 'undefined') {
      window.sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);
  return (
    <PreloaderContext.Provider value={{ preloaderDone, setPreloaderDone: setDone }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export function usePreloader() {
  const ctx = useContext(PreloaderContext);
  if (!ctx) throw new Error('usePreloader must be used within a PreloaderProvider');
  return ctx;
}
