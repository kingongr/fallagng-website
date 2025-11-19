import en from '@/messages/en.json';
import fr from '@/messages/fr.json';
import { type Locale } from '@/middleware';

export type { Locale };

export const translations = {
  en,
  fr,
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export type TranslationKey = keyof typeof en;

// Helper function to access nested translation keys
export function getNestedTranslation(t: typeof en, key: string): string {
  const keys = key.split('.');
  let value: any = t;
  for (const k of keys) {
    value = value?.[k];
  }
  return typeof value === 'string' ? value : key;
}

