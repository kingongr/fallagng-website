'use client';

import { usePathname } from 'next/navigation';
import { getTranslations, type Locale } from '@/lib/translations';
import { getLocale } from '@/lib/i18n';

export function useTranslations() {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const t = getTranslations(locale);
  
  return { t, locale };
}



