// Language utilities for bilingual support

export type Language = 'en' | 'es';

export const DEFAULT_LANGUAGE: Language = 'en';

export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  },
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸'
  }
} as const;

// UI translations
export const UI_TRANSLATIONS = {
  en: {
    'section.about': 'About',
    'section.experience': 'Work Experience',
    'section.education': 'Education',
    'section.skills': 'Skills',
    'section.projects': 'Projects',
    'section.certifications': 'Certifications',
    'time.present': 'Present',
    'education.inProgress': 'In Progress',
    'print.title': 'Resume'
  },
  es: {
    'section.about': 'Acerca de',
    'section.experience': 'Experiencia Laboral',
    'section.education': 'Educación',
    'section.skills': 'Habilidades',
    'section.projects': 'Proyectos',
    'section.certifications': 'Certificaciones',
    'time.present': 'Actual',
    'education.inProgress': 'En Curso',
    'print.title': 'Currículum'
  }
} as const;

export function getLanguageFromURL(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang') as Language;

  if (lang === 'en' || lang === 'es') {
    return lang;
  }

  return DEFAULT_LANGUAGE;
}

export function getLanguageFromStorage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const stored = localStorage.getItem('preferred-language') as Language;

  if (stored === 'en' || stored === 'es') {
    return stored;
  }

  return DEFAULT_LANGUAGE;
}

export function setLanguageInStorage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('preferred-language', lang);
}

export function getCurrentLanguage(): Language {
  // Priority: URL > localStorage > default
  const urlLang = getLanguageFromURL();
  if (urlLang !== DEFAULT_LANGUAGE) return urlLang;

  return getLanguageFromStorage();
}

export function translate(key: string, lang: Language): string {
  return UI_TRANSLATIONS[lang][key as keyof typeof UI_TRANSLATIONS['en']] || key;
}
