import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-8 pb-8 text-center">
      <a
        href="https://github.com/izackwu/marathon-page"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors text-sm"
      >
        <Github className="w-4 h-4" />
        <span>Source Code</span>
      </a>
    </footer>
  );
}
