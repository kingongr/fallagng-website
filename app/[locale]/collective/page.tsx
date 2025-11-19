import { Metadata } from "next";
import { CollectiveHero } from "@/components/collective-hero";
import { EthosSection } from "@/components/ethos-section";
import { Pillars } from "@/components/pillars";
import { MembersGrid } from "@/components/members-grid";
import membersData from "@/content/members.json";
import { Member } from "@/lib/types";

export const metadata: Metadata = {
  title: "The Collective",
  description:
    "Meet the artists, musicians, and creators behind FALLAGNG. A collective bound by shared vision, crafting sounds that transcend genres.",
  openGraph: {
    title: "The Collective | FALLAGNG",
    description:
      "Meet the artists, musicians, and creators behind FALLAGNG. A collective bound by shared vision.",
    type: "website",
  },
};

export default function Collective() {
  const members = membersData as Member[];

  // Generate structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "FALLAGNG",
    description:
      "A music collective pushing boundaries and creating sounds that resonate",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://fallagng.com",
  };

  const personSchemas = members.map((member) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: member.shortBio,
    memberOf: {
      "@type": "MusicGroup",
      name: "FALLAGNG",
    },
  }));

  const structuredData = [organizationSchema, ...personSchemas];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CollectiveHero />
      <EthosSection />
      <Pillars />
      <MembersGrid members={members} />
    </>
  );
}


