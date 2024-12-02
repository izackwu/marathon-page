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
  text: `My marathon journey began in Singapore, where I completed my first race in challenging tropical conditions. 
Since then, I've been fortunate to run through the streets of various cities across Asia and Oceania, 
each race teaching me something new about endurance, determination, and the joy of running. 
From the humid streets of Singapore to the scenic routes of Sydney and Gold Coast, 
every marathon has been a unique adventure that pushed my limits and enriched my life.`,
  socialLinks: [
    {
      platform: 'strava',
      url: 'https://www.strava.com/athletes/example'
    },
    {
      platform: 'blog',
      url: 'https://example.com'
    }
  ]
};