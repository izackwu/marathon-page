interface SocialLink {
  platform: "strava" | "blog";
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
Hey, I'm Zack, a runner based in Singapore. I started running back in high school, but it wasn’t until 2022 that I ran my first race and truly fell in love with long-distance running. These days, running is part of my daily routine, and races are celebratory milestones along the way.
<br />
I’m not chasing perfection—just progress. It’s a long road to becoming faster and stronger, but I’ll get there one day.
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
