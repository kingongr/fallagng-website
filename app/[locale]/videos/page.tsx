"use client";

import { VideosGrid } from "@/components/videos-grid";
import { PicturesGrid } from "@/components/pictures-grid";
import { SectionNavigation } from "@/components/section-navigation";
import videosData from "@/content/videos.json";
import picturesData from "@/content/pictures.json";
import { Video } from "@/lib/types";
import { useTranslations } from "@/hooks/use-translations";

export default function Videos() {
  const { t } = useTranslations();
  const videos = videosData as Video[];
  const pictures = picturesData as Array<{ id: string; permalink: string }>;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">{t.videos.title}</h1>
          <p className="text-lg text-muted max-w-2xl">
            {t.videos.description}
          </p>
        </div>

        {/* Section Navigation */}
        <SectionNavigation sections={[
          { id: "videos", label: t.videos.sections.videos, count: videos.length },
          { id: "pictures", label: t.videos.sections.pictures, count: pictures.length },
        ]} />

        {/* Videos Section */}
        <section id="videos" className="scroll-mt-24 mb-32">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{t.videos.videosSection.title}</h2>
            <p className="text-lg text-muted">
              {t.videos.videosSection.description}
            </p>
          </div>
          <VideosGrid videos={videos} />
        </section>

        {/* Pictures Section */}
        <section id="pictures" className="scroll-mt-24">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{t.videos.picturesSection.title}</h2>
            <p className="text-lg text-muted">
              {t.videos.picturesSection.description}
            </p>
          </div>
          <PicturesGrid posts={pictures} />
        </section>
      </div>
    </div>
  );
}



