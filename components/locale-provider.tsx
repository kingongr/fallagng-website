"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocale } from "@/lib/i18n";

export function LocaleProvider() {
  const pathname = usePathname();
  const locale = getLocale(pathname);

  useEffect(() => {
    // Update html lang attribute
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}


