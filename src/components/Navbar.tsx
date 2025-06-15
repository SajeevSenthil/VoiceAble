
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Generator", href: "#generator" },
  { label: "About", href: "#about" },
];

export default function Navbar({ onToggleTheme }: { onToggleTheme: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b border-border bg-card sticky top-0 z-40 shadow-sm transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Logo size={38} />
          <span className="text-2xl font-extrabold tracking-tight select-none flex items-center" style={{ letterSpacing: '-0.03em' }}>
            <span className="ml-2" style={{ fontFamily: 'inherit', fontWeight: 900, color: 'hsl(var(--primary))' }}>
              VoiceAble
            </span>
          </span>
          <span className="ml-4 hidden md:inline text-muted-foreground text-sm font-semibold tracking-wide opacity-70">by Tensor Troops</span>
        </div>
        <div className="hidden md:flex gap-4 items-center text-base">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-md font-medium text-foreground hover:bg-accent transition focus-visible:outline-2"
              aria-label={link.label}
            >{link.label}</a>
          ))}
          <button
            aria-label="Toggle theme"
            className="ml-2 p-2 rounded-lg bg-background border border-border hover:bg-accent transition"
            onClick={onToggleTheme}
            title="Toggle light/dark mode"
          >
            <span className="sr-only">Toggle theme</span>
            {/* Sun/Moon with visible color in both themes */}
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-yellow-500 dark:text-zinc-100" stroke="currentColor"><path d="M12 2v1m0 18v1m8.66-13.25l-.71.71M4.05 19.95l-.71.71m16.97 0l-.71-.71M4.05 4.05l-.71-.71M2 12h1m18 0h1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/><circle cx={12} cy={12} r={5} strokeWidth={2} /></svg>
          </button>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-2 rounded-lg bg-background border border-border hover:bg-accent transition ml-1"
          aria-label="Open menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span className="sr-only">Open menu</span>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {/* Drawer menu mobile */}
      <div className={`md:hidden transition-all duration-200 bg-card border-t border-border ${menuOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col py-2 px-4">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 font-medium text-foreground hover:bg-accent rounded transition"
              onClick={() => setMenuOpen(false)}
            >{link.label}</a>
          ))}
          <button
            aria-label="Toggle theme"
            className="mt-2 p-2 rounded-lg border border-border hover:bg-accent transition self-start"
            onClick={onToggleTheme}
          >
            <span className="sr-only">Toggle theme</span>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-yellow-500 dark:text-zinc-100" stroke="currentColor"><path d="M12 2v1m0 18v1m8.66-13.25l-.71.71M4.05 19.95l-.71.71m16.97 0l-.71-.71M4.05 4.05l-.71-.71M2 12h1m18 0h1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/><circle cx={12} cy={12} r={5} strokeWidth={2} /></svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
