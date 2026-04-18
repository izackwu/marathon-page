import React from "react";
import { StatsCard } from "./components/StatsCard";
import { ResultsTable } from "./components/ResultsTable";
import { TabView } from "./components/TabView";
import { marathonResults } from "./data/marathonResults";
import { upcomingRaces } from "./data/upcomingRaces";
import { bioContent } from "./data/bioContent";
import { UpcomingRaces } from "./components/UpcomingRaces";
import { MarathonStats, DurationString } from "./types/marathon";
import { durationToSeconds } from "./utils/dateUtils";
import { Footer } from "./components/Footer";
import { Rss } from "lucide-react";

function calculateStats(results: typeof marathonResults): MarathonStats {
  const sortedResults = [...results].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const halfMarathons = results.filter((r) => r.type === "half");
  const fullMarathons = results.filter((r) => r.type === "full");

  const nextRace = upcomingRaces.length > 0 ? upcomingRaces[0].date : undefined;

  const bestHalfTime: DurationString | undefined =
    halfMarathons.length > 0
      ? halfMarathons.reduce(
          (best, curr) => (curr.finishTime < best ? curr.finishTime : best),
          halfMarathons[0].finishTime,
        )
      : undefined;

  const bestFullTime: DurationString | undefined =
    fullMarathons.length > 0
      ? fullMarathons.reduce(
          (best, curr) => (curr.finishTime < best ? curr.finishTime : best),
          fullMarathons[0].finishTime,
        )
      : undefined;

  // Hide half marathon best if it's stale (slower than half of full marathon best)
  const isHalfTimeStale =
    bestHalfTime &&
    bestFullTime &&
    durationToSeconds(bestHalfTime) > durationToSeconds(bestFullTime) / 2;

  return {
    totalRaces: results.length,
    bestHalfTime: isHalfTimeStale ? undefined : bestHalfTime,
    bestFullTime,
    firstRaceDate: sortedResults[0].date,
    lastRaceDate: sortedResults[sortedResults.length - 1].date,
    uniqueCountries: new Set(results.map((r) => r.location.country)).size,
    nextRaceDate: nextRace,
  };
}

function App() {
  const stats = calculateStats(marathonResults);

  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 py-8">
        <h1 className="text-[32px] font-serif font-normal text-heading tracking-[-0.01em]">
          {bioContent.title}
        </h1>
        <div className="flex items-center gap-4 mb-8">
          {bioContent.socialLinks.map((link, index) => (
            <React.Fragment key={link.platform}>
              {index > 0 && (
                <span className="text-line text-xs">·</span>
              )}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-muted text-xs hover:text-heading transition-colors"
              >
                {link.platform === "strava" ? (
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="#FC4C02">
                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7.008 13.828h4.172" />
                  </svg>
                ) : (
                  <Rss className="w-3 h-3" />
                )}
                <span>{link.label}</span>
              </a>
            </React.Fragment>
          ))}
        </div>

        <div className="space-y-8">

          <StatsCard stats={stats} />

          <TabView results={marathonResults} />

          {upcomingRaces.length > 0 && (
            <div>
              <h2 className="text-base font-medium text-heading mb-3">
                Upcoming Races <span className="text-muted font-normal">({upcomingRaces.length})</span>
              </h2>
              <div>
                <UpcomingRaces races={upcomingRaces} />
              </div>
            </div>
          )}

          <div>
            <h2 className="text-base font-medium text-heading mb-3">
              Race History <span className="text-muted font-normal">({marathonResults.length})</span>
            </h2>
            <div>
              <ResultsTable results={marathonResults} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default App;
