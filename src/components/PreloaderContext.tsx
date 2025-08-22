"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface PreloaderContextType {
  preloaderDone: boolean;
  setPreloaderDone: (done: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export const PreloaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const setDone = useCallback((done: boolean) => setPreloaderDone(done), []);
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
