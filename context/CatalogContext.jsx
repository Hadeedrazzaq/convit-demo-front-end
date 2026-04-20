'use client';
import { createContext, useContext, useState } from 'react';

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState('');
  return (
    <CatalogContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
