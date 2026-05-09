import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { en } from '../i18n/en';
import { zhTW } from '../i18n/zh-TW';

export type Language = 'en' | 'zh-TW';
export type Translations = typeof en;

interface LanguageContextType {
  lang: Language;
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const translations: Record<Language, Translations> = { en, 'zh-TW': zhTW };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('wedding-lang');
    return saved === 'zh-TW' ? 'zh-TW' : 'en';
  });

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'zh-TW' : 'en';
      localStorage.setItem('wedding-lang', next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
