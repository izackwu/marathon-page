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
        <div className="bg-card rounded-lg p-6 border-[0.5px] border-line">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Trophy className="w-4 h-4" />
            <h3 className="text-[10px] uppercase tracking-[0.12em]">Total Races</h3>
          </div>
          <p className="text-[28px] font-medium text-heading tracking-tight">{stats.totalRaces}</p>
        </div>

        <div className="bg-card rounded-lg p-6 border-[0.5px] border-line space-y-4">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Medal className="w-4 h-4" />
              <h3 className="text-[10px] uppercase tracking-[0.12em]">Best Times</h3>
            </div>
            <div className="text-[28px] font-medium text-heading tracking-tight tabular-nums flex flex-wrap items-baseline gap-x-2">
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

        <div className="bg-card rounded-lg p-6 border-[0.5px] border-line">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Globe2 className="w-4 h-4" />
            <h3 className="text-[10px] uppercase tracking-[0.12em]">Countries</h3>
          </div>
          <p className="text-[28px] font-medium text-heading tracking-tight">
            {stats.uniqueCountries}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-6 border-[0.5px] border-line">
          <div className="flex items-center gap-2 text-muted mb-2">
            <Calendar className="w-4 h-4" />
            <h3 className="text-[10px] uppercase tracking-[0.12em]">First Race</h3>
          </div>
          <p className="text-lg font-medium text-heading">
            {formatTimeAgo(stats.firstRaceDate)}
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border-[0.5px] border-line">
          <div className="flex items-center gap-2 text-muted mb-2">
            <Clock className="w-4 h-4" />
            <h3 className="text-[10px] uppercase tracking-[0.12em]">Last Race</h3>
          </div>
          <p className="text-lg font-medium text-heading">
            {formatTimeAgo(stats.lastRaceDate)}
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border-[0.5px] border-line">
          <div className="flex items-center gap-2 text-muted mb-2">
            <Timer className="w-4 h-4" />
            <h3 className="text-[10px] uppercase tracking-[0.12em]">Next Race</h3>
          </div>
          <p className="text-lg font-medium text-heading">
            {stats.nextRaceDate
              ? formatTimeAgo(stats.nextRaceDate)
              : "No races scheduled"}
          </p>
        </div>
      </div>
    </div>
  );
}
