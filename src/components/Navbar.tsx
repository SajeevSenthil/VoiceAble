
import { Github } from "lucide-react";
import { useState } from "react";

const githubLinks = [
  { url: "https://github.com/SajeevSenthil/", label: "Sajeev Senthil" },
  { url: "https://github.com/Keerthivasan-Venkitajalam/", label: "Keerthivasan V" },
  { url: "https://github.com/suganth07", label: "Suganth A" },
];

export default function Navbar({ onToggleTheme }: { onToggleTheme: () => void }) {
  const [isDark, setIsDark] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);

  const handleToggleTheme = () => {
    setIsDark((v) => !v);
    onToggleTheme();
  };

  return (
    <nav className="w-full border-b border-border bg-card sticky top-0 z-40 shadow-sm transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold text-primary flex items-center gap-2 select-none tracking-tight">
            <span className="rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 p-1.5 text-white">🗣️</span>
            <span className="hidden sm:inline">VoiceAble</span>
          </span>
          <span className="ml-4 text-muted-foreground text-sm hidden md:inline font-semibold tracking-wide opacity-70">
            by Tensor Troops
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <a href="/" className="px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition">Home</a>
          <a href="#generator" className="px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition">Generator</a>
          <a href="#history" className="px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition">History</a>
          <button
            aria-label="Toggle dark mode"
            className="ml-2 p-2 rounded-lg bg-background border border-border hover:bg-accent transition"
            onClick={handleToggleTheme}
          >
            <span className="sr-only">Toggle theme</span>
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-yellow-400" stroke="currentColor"><path d="M12 2v1m0 18v1m8.66-13.25l-.71.71M4.05 19.95l-.71.71m16.97 0l-.71-.71M4.05 4.05l-.71-.71M2 12h1m18 0h1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/><circle cx={12} cy={12} r={5} strokeWidth={2} /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gray-800 dark:text-zinc-100" stroke="currentColor"><path d="M21 12.79A9 9 0 0 1 12.21 3 7.5 7.5 0 1 0 21 12.79Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
          </button>
          <div className="ml-4 flex gap-1">
            {githubLinks.map((g) => (
              <a
                key={g.url}
                href={g.url}
                className="p-2 text-muted-foreground hover:text-primary transition"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={g.label}
                title={g.label}
              >
                <Github size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
