import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { UpcomingRace } from "../types/marathon";
import { formatDate } from "../utils/dateUtils";
import { getCountryFlag } from "../utils/countryUtils";

interface UpcomingRacesProps {
  races: UpcomingRace[];
}

export function UpcomingRaces({ races }: UpcomingRacesProps) {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedRaces = [...races].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;
    return (
      multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime())
    );
  });

  return (
    <div className="md:bg-card md:rounded-lg md:border-[0.5px] md:border-line md:overflow-hidden">
      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        <div className="bg-card px-4 py-3 rounded-lg border-[0.5px] border-line flex gap-4">
          <span className="text-label font-normal text-muted uppercase self-center">
            Sort by:
          </span>
          <button
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="flex items-center gap-1 text-label font-normal text-muted uppercase hover:text-heading"
          >
            Date
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {sortedRaces.map((race) => (
            <div
              key={`${race.date}-${race.name}`}
              className="bg-card rounded-lg border-[0.5px] border-line p-4 hover:bg-page space-y-3"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <div className="text-xs text-muted">
                    {formatDate(race.date)}
                  </div>
                  <h3 className="font-medium text-heading">{race.name}</h3>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 ${
                    race.type === "full"
                      ? "bg-primary-badge-bg text-primary-badge"
                      : "bg-[#F2F1EF] text-muted"
                  }`}
                >
                  {race.type === "full" ? "Marathon" : "Half Marathon"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted uppercase text-label">
                    Location
                  </div>
                  <div className="flex items-center gap-1">
                    {React.createElement(
                      getCountryFlag(race.location.country),
                      {
                        className: "w-3 h-3",
                      },
                    )}
                    <span>{race.location.name}</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted uppercase text-label">
                    Notes
                  </div>
                  <div className="text-body">
                    {race.notes || "-"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-y-[0.5px] divide-[#EDEAE5]">
          <thead className="bg-card">
            <tr>
              <th className="px-6 py-3 text-left text-label font-normal text-muted uppercase">
                <button
                  onClick={() =>
                    setSortDirection((prev) =>
                      prev === "asc" ? "desc" : "asc",
                    )
                  }
                  className="flex items-center gap-1 hover:text-heading"
                >
                  DATE
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-label font-normal text-muted uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-label font-normal text-muted uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-label font-normal text-muted uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-label font-normal text-muted uppercase">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-y-[0.5px] divide-[#EDEAE5]">
            {sortedRaces.map((race) => (
              <tr
                key={`${race.date}-${race.name}`}
                className="hover:bg-page"
              >
                <td className="px-6 py-4 whitespace-nowrap text-cell text-heading">
                  {formatDate(race.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-cell text-heading">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      race.type === "full"
                        ? "bg-primary-badge-bg text-primary-badge"
                        : "bg-[#F2F1EF] text-muted"
                    }`}
                  >
                    {race.type === "full" ? "Marathon" : "Half Marathon"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-cell text-heading">
                  {race.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-cell text-heading">
                  <div className="flex items-center gap-2">
                    {React.createElement(
                      getCountryFlag(race.location.country),
                      {
                        className: "w-4 h-4",
                      },
                    )}
                    <span>{race.location.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-cell text-muted">
                  {race.notes || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
