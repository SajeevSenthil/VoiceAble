
import React from "react";

export default function Navbar({ onToggleTheme }: { onToggleTheme: () => void }) {
  return (
    <nav className="w-full border-b border-border bg-[#0b1020] sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Logo and Brand */}
        <div className="flex items-center space-x-3">
          <img
            src="/lovable-uploads/8000b7b3-2470-4077-b953-993d76e1dade.png"
            alt="VoiceAble Logo"
            className="h-10 w-10 rounded-xl"
            draggable={false}
          />
          <div className="flex flex-col -space-y-1">
            <span className="text-white font-extrabold text-2xl tracking-tight" style={{ fontFamily: 'inherit' }}>
              VoiceAble
            </span>
            <span className="text-sm text-muted-foreground font-medium">by Tensor Troops</span>
          </div>
        </div>

        {/* Center: Navigation links */}
        <div className="flex items-center space-x-8">
          <a href="#" className="text-white font-semibold hover:text-cyan-400 transition">Home</a>
          <a href="#" className="text-white font-semibold hover:text-cyan-400 transition">Generator</a>
          <a href="#" className="text-white font-semibold hover:text-cyan-400 transition">About</a>
        </div>

        {/* Right: Theme Toggle */}
        <button
          aria-label="Toggle theme"
          className="ml-2 p-2 rounded-lg border border-border hover:bg-accent transition bg-[#101632]"
          onClick={onToggleTheme}
          title="Toggle light/dark mode"
        >
          <span className="sr-only">Toggle theme</span>
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-zinc-100" stroke="currentColor">
            <path d="M12 2v1m0 18v1m8.66-13.25l-.71.71M4.05 19.95l-.71.71m16.97 0l-.71-.71M4.05 4.05l-.71-.71M2 12h1m18 0h1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx={12} cy={12} r={5} strokeWidth={2} />
          </svg>
        </button>
      </div>
    </nav>
  );
}
