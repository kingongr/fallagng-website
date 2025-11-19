import { locales, defaultLocale, type Locale } from '@/middleware';

export type Translations = typeof import('@/messages/en.json');

export function getLocale(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  
  return defaultLocale;
}

export function removeLocaleFromPath(pathname: string): string {
  const locale = getLocale(pathname);
  if (locale === defaultLocale) {
    return pathname.replace(`/${locale}`, '') || '/';
  }
  return pathname.replace(`/${locale}`, '') || '/';
}

export function addLocaleToPath(pathname: string, locale: Locale): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (locale === defaultLocale) {
    return cleanPath === '/' ? '/' : cleanPath;
  }
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}


