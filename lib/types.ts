export interface Member {
  name: string;
  role: string;
  shortBio: string;
  headshot: string;
  carousel?: string[]; // Array of image paths for carousel
  socials: {
    spotify?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
    [key: string]: string | undefined;
  };
}

export interface Video {
  title: string;
  platform: "youtube" | "vimeo" | "instagram";
  id: string;
  thumbnail: string;
  date: string;
}

export interface Link {
  label: string;
  platform: "spotify" | "apple" | "youtube" | "soundcloud" | "bandcamp" | "tidal" | "deezer";
  url: string;
  note: string;
}

