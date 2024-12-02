interface SocialLink {
  platform: 'strava' | 'blog';
  url: string;
}

export interface BioContent {
  title: string;
  text: string;
  socialLinks: SocialLink[];
}

export const bioContent: BioContent = {
  title: import.meta.env.VITE_SITE_TITLE,
  text: `
  Hey, I'm Zack, and I live in Singapore.

  My marathon journey began in Singapore, where I completed my first half marathon in challenging tropical
  conditions. Since then, I've been fortunate to run through the streets of various cities across Asia and Oceania,
  each race teaching me something new about endurance, determination, and the joy of running.

  If you'd like to follow my journey, you can find me on Strava and my personal blog (in Chinese).
`,
  socialLinks: [
    {
      platform: "strava",
      url: "https://www.strava.com/athletes/zackwu",
    },
    {
      platform: "blog",
      url: "https://zackwu.com",
    },
  ],
};
