import { Metadata } from "next";
import { PlatformList } from "@/components/platform-list";
import linksData from "@/content/links.json";
import { Link } from "@/lib/types";

export const metadata: Metadata = {
  title: "Listen",
  description:
    "Stream FALLAGNG on Spotify, Apple Music, YouTube, SoundCloud, and Bandcamp. Listen to our latest releases and exclusive tracks.",
    openGraph: {
    title: "Listen | FALLAGNG",
    description: "Stream FALLAGNG on all major music platforms",
    type: "website",
  },
};

export default function Listen() {
  const links = linksData as Link[];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-text mb-4">
            Listen
          </h1>
          <p className="text-lg text-muted">
            Stream our music on your favorite platform
          </p>
        </div>

        {/* Platform List */}
        <PlatformList links={links} />
      </div>
    </div>
  );
}
