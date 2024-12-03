import React from "react";
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
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Trophy className="w-5 h-5" />
            <h3 className="font-medium">Total Races</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalRaces}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
          <div>
            <div className="flex items-center gap-2 text-amber-500 mb-2">
              <Medal className="w-5 h-5" />
              <h3 className="font-medium">Best Times</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 flex items-baseline gap-2">
              <span>
                {stats.bestFullTime ? formatDuration(stats.bestFullTime) : "-"}
              </span>
              <span className="text-sm text-gray-500">(full)</span>
              <span className="text-gray-400">/</span>
              <span>
                {stats.bestHalfTime ? formatDuration(stats.bestHalfTime) : "-"}
              </span>
              <span className="text-sm text-gray-500">(half)</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <Globe2 className="w-5 h-5" />
            <h3 className="font-medium">Countries</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {stats.uniqueCountries}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Calendar className="w-5 h-5" />
            <h3 className="font-medium">First Race</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatTimeAgo(stats.firstRaceDate)}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Clock className="w-5 h-5" />
            <h3 className="font-medium">Last Race</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatTimeAgo(stats.lastRaceDate)}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Timer className="w-5 h-5" />
            <h3 className="font-medium">Next Race</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {stats.nextRaceDate
              ? formatTimeAgo(stats.nextRaceDate)
              : "No races scheduled"}
          </p>
        </div>
      </div>
    </div>
  );
}
