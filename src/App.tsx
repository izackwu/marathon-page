import React from 'react';
import { StatsCard } from './components/StatsCard';
import { Bio } from './components/Bio';
import { ResultsTable } from './components/ResultsTable';
import { TabView } from './components/TabView';
import { marathonResults } from './data/marathonResults';
import { upcomingRaces } from './data/upcomingRaces';
import { bioContent } from './data/bioContent';
import { UpcomingRaces } from './components/UpcomingRaces';
import { MarathonStats } from './types/marathon';

function calculateStats(results: typeof marathonResults): MarathonStats {
  const sortedResults = [...results].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const halfMarathons = results.filter(r => r.type === 'half');
  const fullMarathons = results.filter(r => r.type === 'full');
  
  const nextRace = upcomingRaces.length > 0 ? upcomingRaces[0].date : undefined;

  return {
    totalRaces: results.length,
    bestHalfTime: halfMarathons.length > 0 
      ? halfMarathons.reduce((best, curr) => curr.finishTime < best ? curr.finishTime : best, halfMarathons[0].finishTime)
      : undefined,
    bestFullTime: fullMarathons.length > 0
      ? fullMarathons.reduce((best, curr) => curr.finishTime < best ? curr.finishTime : best, fullMarathons[0].finishTime)
      : undefined,
    firstRaceDate: sortedResults[0].date,
    lastRaceDate: sortedResults[sortedResults.length - 1].date,
    uniqueCountries: new Set(results.map(r => r.location.country)).size,
    nextRaceDate: nextRace
  };
}

function App() {
  const stats = calculateStats(marathonResults);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{bioContent.title}</h1>

        <div className="space-y-8">
          <Bio />

          <StatsCard stats={stats} />

          <TabView results={marathonResults} />
          
          {upcomingRaces.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Upcoming Races ({upcomingRaces.length})
              </h2>
              <div className="-mx-2 sm:mx-0">
                <UpcomingRaces races={upcomingRaces} />
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Race History ({marathonResults.length})
            </h2>
            <div className="-mx-2 sm:mx-0">
              <ResultsTable results={marathonResults} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default App;
