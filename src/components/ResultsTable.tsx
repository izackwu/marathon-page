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
      className="flex items-center gap-1 hover:text-heading"
    >
      {children}
      <ArrowUpDown className="w-4 h-4" />
    </button>
  );

  return (
    <div className="md:bg-card md:rounded-lg md:border-[0.5px] md:border-line md:overflow-hidden">
      {/* Mobile View */}
      <div className="md:hidden space-y-3">
        <div className="bg-card px-4 py-3 rounded-lg border-[0.5px] border-line flex gap-4">
          <span className="text-label font-medium text-muted uppercase self-center">
            Sort by:
          </span>
          <div className="text-label font-medium text-muted uppercase">
            <SortButton field="date">Date</SortButton>
          </div>
          <div className="text-label font-medium text-muted uppercase">
            <SortButton field="pace">Pace</SortButton>
          </div>
        </div>
        <div className="space-y-3">
          {sortedResults.map((result) => (
            <div
              key={`${result.date}-${result.name}`}
              className="bg-card rounded-lg border-[0.5px] border-line p-4 hover:bg-page space-y-3"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <div className="text-xs text-muted">
                    {formatDate(result.date)}
                  </div>
                  <h3 className="font-medium text-heading">{result.name}</h3>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 ${
                    result.type === "full"
                      ? "bg-primary-badge-bg text-primary-badge"
                      : "bg-[#F2F1EF] text-muted"
                  }`}
                >
                  {result.type === "full" ? "Marathon" : "Half Marathon"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted uppercase text-label">
                    Location
                  </div>
                  <div className="flex items-center gap-1">
                    {React.createElement(
                      getCountryFlag(result.location.country),
                      {
                        className: "w-3 h-3",
                      },
                    )}
                    <span>{result.location.name}</span>
                  </div>
                </div>
                <div>
                  <div className="text-muted uppercase text-label">
                    Finish Time
                  </div>
                  <div className="font-semibold">
                    {formatDuration(result.finishTime)}
                  </div>
                </div>
                <div>
                  <div className="text-muted uppercase text-label">
                    Avg Pace
                  </div>
                  <div>{calculatePace(result.finishTime, result.type)}/km</div>
                </div>
                <div>
                  <div className="text-muted uppercase text-label">
                    Weather (feels like)
                  </div>
                  <div className="flex items-center gap-1">
                    {React.createElement(
                      getWeatherIcon(result.weather.condition),
                      {
                        className: "w-3 h-3 text-muted",
                      },
                    )}
                    <span className="truncate">
                      {result.weather.condition} ({result.weather.feelsLike}°C)
                    </span>
                  </div>
                </div>
              </div>

              {result.specialMarks && result.specialMarks.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-line">
                  {result.specialMarks.map((mark, index) => {
                    const { icon: Icon, description } =
                      convertSpecialMarkToIcon(mark);
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-1 text-xs text-muted bg-page px-2 py-1 rounded"
                        title={description}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{description}</span>
                      </div>
                    );
                  })}
                </div>
              )}
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
                <SortButton field="date">DATE</SortButton>
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
                FINISH TIME
              </th>
              <th className="px-6 py-3 text-left text-label font-normal text-muted uppercase">
                <SortButton field="pace">AVG PACE</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-label font-normal text-muted uppercase">
                Weather (feels like)
              </th>
              <th className="px-6 py-3 text-left text-label font-normal text-muted uppercase">
                {/* Column for special marks, but there's no need to give it a name */}
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-y-[0.5px] divide-[#EDEAE5]">
            {sortedResults.map((result) => (
              <tr
                key={`${result.date}-${result.name}`}
                className="hover:bg-page"
              >
                <td className="px-6 py-4 whitespace-nowrap text-cell text-heading">
                  {formatDate(result.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-cell text-heading">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      result.type === "full"
                        ? "bg-primary-badge-bg text-primary-badge"
                        : "bg-[#F2F1EF] text-muted"
                    }`}
                  >
                    {result.type === "full" ? "Marathon" : "Half Marathon"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-cell text-heading">
                  {result.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-cell text-heading">
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
                <td className="px-6 py-4 whitespace-nowrap text-cell text-heading">
                  {formatDuration(result.finishTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-cell text-heading">
                  {calculatePace(result.finishTime, result.type)}/km
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-cell text-heading">
                  <div className="flex items-center gap-2">
                    {React.createElement(
                      getWeatherIcon(result.weather.condition),
                      {
                        className: "w-4 h-4 text-muted",
                      },
                    )}
                    <span>{result.weather.condition} ({result.weather.feelsLike}°C)</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-cell text-muted">
                  <div className="flex gap-2">
                    {result.specialMarks?.map((mark, index) => {
                      const { icon: Icon, description } =
                        convertSpecialMarkToIcon(mark);
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-1"
                          title={description}
                        >
                          <Icon className="w-4 h-4 text-muted" />
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
