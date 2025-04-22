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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() =>
                    setSortDirection((prev) =>
                      prev === "asc" ? "desc" : "asc",
                    )
                  }
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Date
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedRaces.map((race) => (
              <tr
                key={`${race.date}-${race.name}`}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(race.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      race.type === "full"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {race.type === "full" ? "Marathon" : "Half Marathon"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {race.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
