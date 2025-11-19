"use client";

import Link from "next/link";
import { Youtube, Instagram } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { addLocaleToPath } from "@/lib/i18n";
import { getNestedTranslation } from "@/lib/translations";

const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@fallagng",
    icon: Youtube,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/fallagng/",
    icon: Instagram,
  },
];

export function SiteFooter() {
  const { t, locale } = useTranslations();
  
  const legalLinks = [
    { href: "/privacy", labelKey: "footer.privacy" as const },
    { href: "/terms", labelKey: "footer.terms" as const },
    { href: "/contact", labelKey: "footer.contact" as const },
  ];
  
  const navItems = [
    { href: "/", labelKey: "nav.home" as const },
    { href: "/collective", labelKey: "nav.collective" as const },
    { href: "/videos", labelKey: "nav.watch" as const },
    { href: "/listen", labelKey: "nav.listen" as const },
  ];
  return (
    <footer className="border-t border-stroke bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo & Manifesto */}
          <div className="space-y-4">
            <Link
              href={addLocaleToPath("/", locale)}
              className="text-2xl font-permanent-marker text-text hover:text-electric transition-colors inline-block focus-ring"
            >
              FALLAGNG
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              {t.footer.manifesto}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-4">{t.footer.navigation}</h3>
            <nav className="flex flex-col space-y-2" aria-label={t.common.ariaLabels.footerNav}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={addLocaleToPath(item.href, locale)}
                  className="text-sm text-muted hover:text-text transition-colors focus-ring w-fit"
                >
                  {getNestedTranslation(t, item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Legal */}
          <div className="space-y-6">
            {/* Social Icons */}
            <div>
              <h3 className="text-sm font-semibold text-text mb-4">{t.footer.connect}</h3>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-surface/50 text-muted hover:text-electric hover:bg-surface transition-colors focus-ring"
                      aria-label={`${t.footer.followUs} ${social.name}`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <nav className="flex flex-wrap gap-4" aria-label={t.common.ariaLabels.legal}>
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={addLocaleToPath(link.href, locale)}
                    className="text-xs text-muted hover:text-text transition-colors focus-ring"
                  >
                    {getNestedTranslation(t, link.labelKey)}
                  </Link>
                ))}
                <span className="text-xs text-muted">
                  © {new Date().getFullYear()} FALLAGNG
                </span>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

