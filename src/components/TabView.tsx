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
              flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm
              ${
                activeTab === "map"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-heading hover:border-line"
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
              ${
                activeTab === "chart"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-heading hover:border-line"
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
