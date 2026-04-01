import { createContext, useState, useCallback, type ReactNode } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface CacheContextType {
  getCache: <T>(key: string, ttlMs: number) => T | null;
  setCache: <T>(key: string, data: T) => void;
  invalidateCache: (key: string) => void;
  clearCache: () => void;
}

export const CacheContext = createContext<CacheContextType>({
  getCache: () => null,
  setCache: () => {},
  invalidateCache: () => {},
  clearCache: () => {},
});

export const CacheProvider = ({ children }: { children: ReactNode }) => {
  const [cache, setCache] = useState<Record<string, CacheEntry<unknown>>>({});

  const getCache = useCallback(<T,>(key: string, ttlMs: number): T | null => {
    const entry = cache[key];
    if (!entry) return null;
    if (Date.now() - entry.timestamp > ttlMs) {
      setCache((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      return null;
    }
    return entry.data as T;
  }, [cache]);

  const setCacheValue = useCallback(<T,>(key: string, data: T) => {
    setCache((prev) => ({
      ...prev,
      [key]: { data, timestamp: Date.now() },
    }));
  }, []);

  const invalidateCache = useCallback((key: string) => {
    setCache((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const clearCache = useCallback(() => {
    setCache({});
  }, []);

  return (
    <CacheContext.Provider value={{ getCache, setCache: setCacheValue, invalidateCache, clearCache }}>
      {children}
    </CacheContext.Provider>
  );
};
