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
    <div className="bg-card rounded-lg border-[0.5px] border-line overflow-hidden">
      <div className="border-b border-b-line">
        <nav className="flex -mb-px" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("map")}
            className={`
              py-3 px-5 border-b-2 font-medium text-sm
              ${
                activeTab === "map"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-heading hover:border-line"
              }
            `}
          >
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              <span>Map View</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("chart")}
            className={`
              py-3 px-5 border-b-2 font-medium text-sm
              ${
                activeTab === "chart"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-heading hover:border-line"
              }
            `}
          >
            <div className="flex items-center gap-2">
              <LineChart className="w-4 h-4" />
              <span>Progress Chart</span>
            </div>
          </button>
        </nav>
      </div>
      {activeTab === "map" ? (
        <MapView results={results} />
      ) : (
        <div className="p-4">
          <TimeChart results={results} />
        </div>
      )}
    </div>
  );
}
