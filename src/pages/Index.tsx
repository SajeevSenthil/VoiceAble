
import AccessibleToolForm from "@/components/AccessibleToolForm";
import HistoryPanel from "@/components/HistoryPanel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

type Tool = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

export default function Index() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  // Toggle theme for demonstration (real implementation: use context or next-themes)
  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "light");
  };

  return (
    <div className={`${theme}`}>
      <div className="min-h-screen flex flex-col bg-background transition-colors duration-200">
        <Navbar onToggleTheme={handleToggleTheme} />
        <main className="flex-1 max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-10 px-4 py-10">
          <section className="flex-1 flex flex-col justify-center items-center">
            <div className="mb-10 w-full flex flex-col items-center text-center gap-4">
              <span className="bg-gradient-to-br from-blue-600 to-cyan-400 text-white rounded-full px-4 py-2 font-extrabold text-xs tracking-wide uppercase">
                Empowering Accessibility
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary leading-tight hero-title-gradient mb-3">
                Build <span className="text-blue-500">Accessible</span> Tools Instantly, with <span className="text-cyan-400">VoiceAble</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-0.5">
                Describe any digital accessibility need, and let <b>Tensor Troops</b> generate your unique accessible tool. 
                One sentence. Limitless power for inclusion.
              </p>
              <a
                href="#generator"
                className="mt-4 px-8 py-3 rounded-md font-semibold bg-blue-600 text-white text-lg hover:bg-blue-700 transition shadow-md"
              >
                Start Creating
              </a>
            </div>
            <AccessibleToolForm
              onToolGenerated={tool => setTools(prev => [tool, ...prev])}
            />
          </section>
          <aside className="w-full md:w-[350px] shrink-0" id="history">
            <HistoryPanel tools={tools} />
          </aside>
        </main>
        <Footer />
      </div>
    </div>
  );
}
