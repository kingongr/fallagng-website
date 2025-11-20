"use client";

import { PlatformList } from "@/components/platform-list";
import linksData from "@/content/links.json";
import { Link } from "@/lib/types";
import { useTranslations } from "@/hooks/use-translations";

export default function Listen() {
  const { t } = useTranslations();
  const links = linksData as Link[];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-text mb-4">
            {t.listen.title}
          </h1>
          <p className="text-lg text-muted">
            {t.listen.description}
          </p>
        </div>

        {/* Platform List */}
        <PlatformList links={links} />
      </div>
    </div>
  );
}



