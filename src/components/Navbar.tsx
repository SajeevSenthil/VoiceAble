
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

// No more navLinks
export default function Navbar({ onToggleTheme }: { onToggleTheme: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b border-border bg-card sticky top-0 z-40 shadow-sm transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex flex-col items-start gap-0">
          <span className="text-lg md:text-2xl font-extrabold tracking-tight select-none text-blue-500" style={{ fontFamily: 'inherit' }}>
            Instantly Build <span className="text-cyan-400">Accessible</span> Tools,<br />
            with <span className="text-blue-500">VoiceAble</span>
          </span>
          <span className="text-sm text-muted-foreground mt-1 max-w-xs hidden md:inline">
            Just <b>speak or type</b> your need, and <b>VoiceAble</b> generates a digital accessibility tool in seconds.
          </span>
        </div>
        <button
          aria-label="Toggle theme"
          className="ml-2 p-2 rounded-lg bg-background border border-border hover:bg-accent transition"
          onClick={onToggleTheme}
          title="Toggle light/dark mode"
        >
          <span className="sr-only">Toggle theme</span>
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-yellow-500 dark:text-zinc-100" stroke="currentColor"><path d="M12 2v1m0 18v1m8.66-13.25l-.71.71M4.05 19.95l-.71.71m16.97 0l-.71-.71M4.05 4.05l-.71-.71M2 12h1m18 0h1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/><circle cx={12} cy={12} r={5} strokeWidth={2} /></svg>
        </button>
      </div>
    </nav>
  );
}
