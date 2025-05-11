import { useState } from "react";
import { Map, LineChart } from "lucide-react";
import { MarathonResult } from "../types/marathon";
import { MapView } from "./MapView";
import { TimeChart } from "./TimeChart";

interface TabViewProps {
  results: MarathonResult[];
}

export function TabView({ results }: TabViewProps) {
  const [activeTab, setActiveTab] = useState<"map" | "chart">("map");

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("map")}
            className={`
              flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm
              ${activeTab === "map"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            <div className="flex items-center justify-center gap-2">
              <Map className="w-5 h-5" />
              <span>Map View</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("chart")}
            className={`
              flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm
              ${activeTab === "chart"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            <div className="flex items-center justify-center gap-2">
              <LineChart className="w-5 h-5" />
              <span>Progress Chart</span>
            </div>
          </button>
        </nav>
      </div>
      <div className="p-4">
        {activeTab === "map" ? (
          <MapView results={results} />
        ) : (
          <TimeChart results={results} />
        )}
      </div>
    </div>
  );
}
