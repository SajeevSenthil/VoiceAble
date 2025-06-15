
import { CheckCircle, Volume2, BookOpen, Accessibility, HeartHandshake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-[#eaeaff]/60 dark:from-[#181d2e] dark:to-[#16181f] border-t border-border pt-10 pb-4 mt-12 w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
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
                <Volume2 size={16} className="text-blue-500" /> Voice Generation
              </li>
              <li className="flex items-center gap-1">
                <Accessibility size={16} className="text-green-600" /> Accessibility First
              </li>
              <li className="flex items-center gap-1">
                <CheckCircle size={15} className="text-green-400" /> WCAG Compliant
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-center gap-1">
                <BookOpen size={15} className="text-cyan-500" /> Documentation
              </li>
              <li className="flex items-center gap-1">
                <BookOpen size={15} className="text-cyan-400" /> Accessibility Guide
              </li>
              <li className="flex items-center gap-1">
                <BookOpen size={15} className="text-cyan-300" /> Support
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Connect With Us</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-center gap-1">
                <HeartHandshake size={15} className="text-pink-500" /> Keerthivasan
              </li>
              <li className="flex items-center gap-1">
                <HeartHandshake size={15} className="text-pink-400" /> Sajeev Senthil
              </li>
              <li className="flex items-center gap-1">
                <HeartHandshake size={15} className="text-pink-300" /> Suganth K
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-t border-border mb-4 opacity-40" />
        <div className="text-xs flex flex-col md:flex-row md:justify-between items-center text-muted-foreground gap-2">
          <span>© 2025 VoiceAble. Built for inclusion.</span>
          <span>Made with <span className="text-pink-500">♥</span> by our passionate team.</span>
        </div>
      </div>
    </footer>
  );
}
