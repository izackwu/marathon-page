interface SocialLink {
  platform: "strava" | "blog";
  url: string;
  label: string;
}

export interface BioContent {
  title: string;
  socialLinks: SocialLink[];
}

export const bioContent: BioContent = {
  title: import.meta.env.VITE_SITE_TITLE,
  socialLinks: [
    {
      platform: "strava",
      url: "https://www.strava.com/athletes/zackwu",
      label: "Follow on Strava",
    },
    {
      platform: "blog",
      url: "https://zackwu.com",
      label: "Read my blog (in Chinese)",
    },
  ],
};
