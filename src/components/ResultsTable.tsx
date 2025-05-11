import React, { useState } from "react";
import { MarathonResult } from "../types/marathon";
import { formatDuration, formatDate } from "../utils/dateUtils";
import { ArrowUpDown } from "lucide-react";
import { getWeatherIcon } from "../utils/weatherUtils";
import { getCountryFlag } from "../utils/countryUtils";
import { calculatePace } from "../utils/paceUtils";
import { convertSpecialMarkToIcon } from "../utils/specialMarkUtils";

type SortField = "date" | "pace";
type SortDirection = "asc" | "desc";

interface ResultsTableProps {
  results: MarathonResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortedResults = [...results].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;
    switch (sortField) {
      case "date":
        return (
          multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime())
        );
      case "pace": {
        const paceA = calculatePace(a.finishTime, a.type);
        const paceB = calculatePace(b.finishTime, b.type);
        return multiplier * paceA.localeCompare(paceB);
      }
      default:
        return 0;
    }
  });

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortButton = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-gray-700"
    >
      {children}
      <ArrowUpDown className="w-4 h-4" />
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="date">DATE</SortButton>
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
                FINISH TIME
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="pace">AVG PACE</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weather
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {/* Column for special marks, but there's no need to give it a name */}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedResults.map((result) => (
              <tr
                key={`${result.date}-${result.name}`}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(result.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${result.type === "full"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-emerald-100 text-emerald-800"
                      }`}
                  >
                    {result.type === "full" ? "Marathon" : "Half Marathon"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {result.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    {React.createElement(
                      getCountryFlag(result.location.country),
                      {
                        className: "w-4 h-4",
                      },
                    )}
                    <span>{result.location.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDuration(result.finishTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {calculatePace(result.finishTime, result.type)}/km
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    {React.createElement(
                      getWeatherIcon(result.weather.condition),
                      {
                        className: "w-4 h-4 text-gray-400",
                      },
                    )}
                    <span>{result.weather.condition}</span>
                    <span className="text-xs text-gray-500">
                      (feels like {result.weather.feelsLike}°C)
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    {result.specialMarks?.map((mark, index) => {
                      const { icon: Icon, description } = convertSpecialMarkToIcon(mark);
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-1"
                          title={description}
                        >
                          <Icon className="w-4 h-4 text-gray-500" />
                          <span className="sr-only">{description}</span>
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
