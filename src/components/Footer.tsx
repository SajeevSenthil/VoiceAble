
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8 mt-8 w-full">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-4">
        <div>
          <span className="font-extrabold text-lg flex items-center gap-2">
            <span className="rounded bg-gradient-to-br from-blue-600 to-cyan-400 p-1.5 text-white text-xl">🗣️</span>
            VoiceAble
          </span>
          <p className="text-muted-foreground text-xs mt-1">
            by Tensor Troops &mdash; Enabling digital access for all.
          </p>
        </div>
        <div>
          <span className="block font-semibold mb-1 text-primary">Contact us</span>
          <div className="flex gap-4 items-center text-sm text-muted-foreground">
            <a href="https://github.com/SajeevSenthil/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition flex items-center gap-1" title="Sajeev Senthil">
              <Github size={18} className="inline-block mb-0.5" /> Sajeev
            </a>
            <a href="https://github.com/Keerthivasan-Venkitajalam/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition flex items-center gap-1" title="Keerthivasan V">
              <Github size={18} className="inline-block mb-0.5" /> Keerthivasan
            </a>
            <a href="https://github.com/suganth07" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition flex items-center gap-1" title="Suganth A">
              <Github size={18} className="inline-block mb-0.5" /> Suganth
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
