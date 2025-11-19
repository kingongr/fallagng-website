import { Metadata } from "next";
import { VideosGrid } from "@/components/videos-grid";
import { PicturesGrid } from "@/components/pictures-grid";
import { SectionNavigation } from "@/components/section-navigation";
import videosData from "@/content/videos.json";
import picturesData from "@/content/pictures.json";
import { Video } from "@/lib/types";

export const metadata: Metadata = {
  title: "Watch",
  description:
    "Watch FALLAGNG's latest music videos, live performances, behind-the-scenes content, and exclusive releases.",
    openGraph: {
    title: "Watch | FALLAGNG",
    description: "Watch FALLAGNG's latest music videos and performances",
  },
};

export default function Videos() {
  const videos = videosData as Video[];
  const pictures = picturesData as Array<{ id: string; permalink: string }>;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Watch</h1>
          <p className="text-lg text-muted max-w-2xl">
            Explore our latest music videos, live performances, behind-the-scenes content, and visual stories.
          </p>
        </div>

        {/* Section Navigation */}
        <SectionNavigation sections={[
          { id: "videos", label: "Videos", count: videos.length },
          { id: "pictures", label: "Pictures", count: pictures.length },
        ]} />

        {/* Videos Section */}
        <section id="videos" className="scroll-mt-24 mb-32">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Videos</h2>
            <p className="text-lg text-muted">
              Watch our latest music videos, live performances, and behind-the-scenes content.
            </p>
          </div>
          <VideosGrid videos={videos} />
        </section>

        {/* Pictures Section */}
        <section id="pictures" className="scroll-mt-24">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Pictures</h2>
            <p className="text-lg text-muted">
              Explore our latest photos and visual content.
            </p>
          </div>
          <PicturesGrid posts={pictures} />
        </section>
      </div>
    </div>
  );
}
