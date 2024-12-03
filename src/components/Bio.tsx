import { BookHeart, Rss } from "lucide-react";
import { bioContent } from "../data/bioContent";

function StravaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7.008 13.828h4.172" />
    </svg>
  );
}

export function Bio() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <BookHeart className="w-8 h-8 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">About Me</h2>
        </div>
        <div className="flex items-center gap-4">
          {bioContent.socialLinks.map((link) => {
            const Icon = link.platform === "strava" ? StravaIcon : Rss;

            const hoverColor =
              link.platform === "strava"
                ? "hover:text-[#FC4C02]"
                : "hover:text-indigo-600";

            const title = `Follow me on ${link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}`;

            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 ${hoverColor} transition-colors`}
                title={title}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
      <p
        className="text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: bioContent.text }}
      />
    </div>
  );
}
