
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6 mt-8 w-full">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4">
        <div>
          <span className="font-extrabold text-lg flex items-center gap-2">
            <span className="rounded bg-gradient-to-br from-blue-600 to-cyan-400 p-1.5 text-white text-xl">🗣️</span>
            VoiceAble
          </span>
          <p className="text-muted-foreground text-xs mt-1">
            by Tensor Troops &mdash; Enabling digital access for all.
          </p>
        </div>
        <div className="flex gap-4 items-center text-sm text-muted-foreground mt-2 sm:mt-0">
          <div>
            Team:
            <a href="https://github.com/SajeevSenthil/" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-primary transition" title="Sajeev Senthil">
              <Github size={18} className="inline-block mb-0.5" /> Sajeev
            </a>
            <a href="https://github.com/Keerthivasan-Venkitajalam/" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-primary transition" title="Keerthivasan V">
              <Github size={18} className="inline-block mb-0.5" /> Keerthivasan
            </a>
            <a href="https://github.com/suganth07" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-primary transition" title="Suganth A">
              <Github size={18} className="inline-block mb-0.5" /> Suganth
            </a>
          </div>
          <span className="hidden sm:inline">|</span>
          <div>
            <a href="https://github.com/SajeevSenthil/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              View on Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
