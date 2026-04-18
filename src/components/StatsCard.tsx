import { Clock, Calendar, Trophy, Medal, Globe2, Timer } from "lucide-react";
import { MarathonStats } from "../types/marathon";
import { formatTimeAgo, formatDuration } from "../utils/dateUtils";

interface StatsCardProps {
  stats: MarathonStats;
}

export function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center gap-2 text-accent mb-2">
            <Trophy className="w-5 h-5" />
            <h3 className="font-medium">Total Races</h3>
          </div>
          <p className="text-[26px] font-medium text-heading tracking-tight">{stats.totalRaces}</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border space-y-4">
          <div>
            <div className="flex items-center gap-2 text-accent mb-2">
              <Medal className="w-5 h-5" />
              <h3 className="font-medium">Best Times</h3>
            </div>
            <div className="text-[26px] font-medium text-heading tracking-tight tabular-nums flex flex-wrap items-baseline gap-x-2">
              <div className="flex items-baseline gap-2">
                <span>
                  {stats.bestFullTime ? formatDuration(stats.bestFullTime) : "-"}
                </span>
                <span className="text-sm text-muted">(full)</span>
              </div>
              {stats.bestHalfTime && (
                <>
                  <span className="text-muted">/</span>
                  <div className="flex items-baseline gap-2">
                    <span>{formatDuration(stats.bestHalfTime)}</span>
                    <span className="text-sm text-muted">(half)</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center gap-2 text-accent mb-2">
            <Globe2 className="w-5 h-5" />
            <h3 className="font-medium">Countries</h3>
          </div>
          <p className="text-[26px] font-medium text-heading tracking-tight">
            {stats.uniqueCountries}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center gap-2 text-muted mb-2">
            <Calendar className="w-5 h-5" />
            <h3 className="font-medium text-muted">First Race</h3>
          </div>
          <p className="text-[26px] font-medium text-heading tracking-tight">
            {formatTimeAgo(stats.firstRaceDate)}
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center gap-2 text-muted mb-2">
            <Clock className="w-5 h-5" />
            <h3 className="font-medium text-muted">Last Race</h3>
          </div>
          <p className="text-[26px] font-medium text-heading tracking-tight">
            {formatTimeAgo(stats.lastRaceDate)}
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center gap-2 text-muted mb-2">
            <Timer className="w-5 h-5" />
            <h3 className="font-medium text-muted">Next Race</h3>
          </div>
          <p className="text-[26px] font-medium text-heading tracking-tight">
            {stats.nextRaceDate
              ? formatTimeAgo(stats.nextRaceDate)
              : "No races scheduled"}
          </p>
        </div>
      </div>
    </div>
  );
}
