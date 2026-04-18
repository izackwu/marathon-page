import React from "react";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MarathonResult } from "../types/marathon";
import { formatDuration } from "../utils/dateUtils";
import "chartjs-adapter-date-fns";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function timeToMinutes(time: string): number {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 60 + minutes + seconds / 60;
}

interface TimeChartProps {
  results: MarathonResult[];
}

export function TimeChart({ results }: TimeChartProps) {
  const sortedResults = [...results].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const halfMarathons = sortedResults.filter((r) => r.type === "half");
  const fullMarathons = sortedResults.filter((r) => r.type === "full");

  const minTime = Math.floor(
    Math.min(
      ...halfMarathons.map((r) => timeToMinutes(r.finishTime)),
      ...fullMarathons.map((r) => timeToMinutes(r.finishTime)),
    ) - 10,
  );

  const maxTime = Math.ceil(
    Math.max(
      ...halfMarathons.map((r) => timeToMinutes(r.finishTime)),
      ...fullMarathons.map((r) => timeToMinutes(r.finishTime)),
    ) + 10,
  );

  const data = {
    datasets: [
      {
        label: "Full Marathon",
        data: sortedResults.map((r) => ({
          x: new Date(r.date),
          y: r.type === "full" ? timeToMinutes(r.finishTime) : null,
        })),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        tension: 0.3,
        spanGaps: true,
      },
      {
        label: "Half Marathon",
        data: sortedResults.map((r) => ({
          x: new Date(r.date),
          y: r.type === "half" ? timeToMinutes(r.finishTime) : null,
        })),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        tension: 0.3,
        spanGaps: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          afterTitle: (items) => {
            const idx = items[0].dataIndex;
            return sortedResults[idx].name;
          },
          label: (context) => {
            const result = sortedResults[context.dataIndex];
            if (
              result &&
              ((context.dataset.label === "Full Marathon" &&
                result.type === "full") ||
                (context.dataset.label === "Half Marathon" &&
                  result.type === "half"))
            ) {
              return `Time: ${formatDuration(result.finishTime)}`;
            }
            return undefined;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "day",
          displayFormats: {
            day: "yyyy-MM-dd",
          },
          tooltipFormat: "yyyy-MM-dd",
        },
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 6,
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
        },
      },
      y: {
        min: minTime,
        max: maxTime,
        title: {
          display: true,
          text: "Time (minutes)",
        },
        ticks: {
          callback: (value) => {
            const hours = Math.floor((value as number) / 60);
            const minutes = Math.floor((value as number) % 60)
              .toString()
              .padStart(2, "0");
            return `${hours}:${minutes}:00`;
          },
        },
      },
    },
  };

  return (
    <div className="h-[400px]">
      <Line options={options} data={data} />
    </div>
  );
}
