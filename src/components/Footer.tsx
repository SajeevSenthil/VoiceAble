
import Logo from "./Logo";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-[#eaeaff]/60 dark:from-[#181d2e] dark:to-[#16181f] border-t border-border pt-10 pb-4 mt-12 w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Logo size={38} />
          <span className="ml-2 text-2xl font-extrabold tracking-tight select-none" style={{ letterSpacing: '-0.03em', fontFamily: 'inherit', fontWeight: 900, color: 'hsl(var(--primary))' }}>
            VoiceAble
          </span>
          <span className="ml-4 hidden md:inline text-muted-foreground text-sm font-semibold tracking-wide opacity-70">by Tensor Troops</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">About VoiceAble</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Empowering accessibility through AI-powered voice interfaces. Build personalized tools that speak for everyone.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Features</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-center gap-1">
                Voice Generation
              </li>
              <li className="flex items-center gap-1">
                Accessibility First
              </li>
              <li className="flex items-center gap-1">
                WCAG Compliant
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-center gap-1">
                Documentation
              </li>
              <li className="flex items-center gap-1">
                Accessibility Guide
              </li>
              <li className="flex items-center gap-1">
                Support
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Connect With Us</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <a
                  href="https://github.com/Keerthivasan-Venkitajalam"
                  className="inline-flex items-center font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Keerthivasan on GitHub"
                >
                  <Github size={18} className="text-gray-800 dark:text-gray-200" />
                </a>
                <span>Keerthivasan</span>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://github.com/SajeevSenthil"
                  className="inline-flex items-center font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sajeev Senthil on GitHub"
                >
                  <Github size={18} className="text-gray-800 dark:text-gray-200" />
                </a>
                <span>Sajeev Senthil</span>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://github.com/suganth07"
                  className="inline-flex items-center font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suganth K on GitHub"
                >
                  <Github size={18} className="text-gray-800 dark:text-gray-200" />
                </a>
                <span>Suganth K</span>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-t border-border mb-4 opacity-40" />
        <div className="text-xs flex flex-col md:flex-row md:justify-between items-center text-muted-foreground gap-2">
          <span>© 2025 VoiceAble. Built for inclusion.</span>
        </div>
      </div>
    </footer>
  );
}
