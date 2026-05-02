import React, { createContext, useContext, useState, useEffect } from 'react';

interface GeminiKeyContextType {
  geminiKey: string | null;
  setGeminiKey: (key: string | null) => void;
  isKeyConfigured: boolean;
  isUsingGlobalFallback: boolean;
  hasUserKey: boolean;
}

const GeminiKeyContext = createContext<GeminiKeyContextType | undefined>(undefined);

export function GeminiKeyProvider({ children }: { children: React.ReactNode }) {
  const [geminiKey, setGeminiKeyState] = useState<string | null>(null);
  const [hasUserKey, setHasUserKey] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setGeminiKeyState(savedKey);
      setHasUserKey(true);
    } else {
      const envKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
      if (envKey) {
        setGeminiKeyState(envKey);
      }
      setHasUserKey(false);
    }
  }, []);

  const setGeminiKey = (key: string | null) => {
    if (key) {
      localStorage.setItem('gemini_api_key', key);
      setGeminiKeyState(key);
      setHasUserKey(true);
    } else {
      localStorage.removeItem('gemini_api_key');
      const envKey = (import.meta as any).env.VITE_GEMINI_API_KEY || null;
      setGeminiKeyState(envKey);
      setHasUserKey(false);
    }
  };

  const isUsingGlobalFallback = !hasUserKey && !!(import.meta as any).env.VITE_GEMINI_API_KEY;

  return (
    <GeminiKeyContext.Provider value={{ 
      geminiKey, 
      setGeminiKey, 
      isKeyConfigured: !!geminiKey, 
      isUsingGlobalFallback,
      hasUserKey
    }}>
      {children}
    </GeminiKeyContext.Provider>
  );
}

export function useGeminiKey() {
  const context = useContext(GeminiKeyContext);
  if (context === undefined) {
    throw new Error('useGeminiKey must be used within a GeminiKeyProvider');
  }
  return context;
}
