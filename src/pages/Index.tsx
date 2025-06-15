
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceTextInput from "@/components/VoiceTextInput";
import { Stepper } from "@/components/Stepper";
import { useState } from "react";

type Step = 0 | 1 | 2 | 3;
const stepLabels = [
  "Your Prompt",
  "Choose Template",
  "Generate App",
  "Deploy"
];

export default function Index() {
  const [theme, setTheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [step, setStep] = useState<Step>(0);
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [template, setTemplate] = useState<string>("default");

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "light");
  };

  // Handler for progressing through steps
  const handleNext = (data?: string) => {
    if (step === 0 && data) {
      setUserPrompt(data);
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  // Step content builder
  function renderStepContent() {
    if (step === 0) {
      return (
        <div className="w-full flex flex-col gap-5 items-center justify-center max-w-xl mx-auto">
          <VoiceTextInput
            onSubmit={v => handleNext(v)}
            disabled={false}
          />
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="w-full flex flex-col gap-6 items-center justify-center max-w-lg mx-auto">
          <div className="text-lg md:text-xl font-medium text-primary mb-3">Choose a template</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {[
              { id: "screen-reader", name: "Screen Reader", desc: "Voice-based reading and summarization." },
              { id: "planner", name: "Daily Planner", desc: "Accessible, voice-controlled planning." },
              { id: "medication", name: "Medication Reminder", desc: "Smart medication reminders, easy to use." },
              { id: "default", name: "Custom", desc: "Start from scratch with accessibility best practices." }
            ].map(tpl => (
              <button
                key={tpl.id}
                className={`rounded-lg border px-4 py-5 flex flex-col gap-1 items-start shadow hover:bg-muted/60 transition focus:border-primary outline-none
                  ${template === tpl.id ? "border-blue-500 bg-blue-50 dark:bg-blue-900/40" : "border-border bg-card"}`}
                onClick={() => setTemplate(tpl.id)}
                tabIndex={0}
              >
                <span className="font-semibold">{tpl.name}</span>
                <span className="text-xs text-muted-foreground">{tpl.desc}</span>
              </button>
            ))}
          </div>
          <button
            className="w-full mt-4 px-8 py-3 rounded-md font-semibold bg-blue-600 text-white text-lg hover:bg-blue-700 transition shadow-md"
            onClick={() => handleNext()}
          >
            Continue
          </button>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="flex flex-col gap-8 items-center justify-center py-10 w-full max-w-md mx-auto">
          <div className="flex flex-col gap-2 items-center">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold text-blue-600">
              Building your tool...
            </span>
            <span className="text-muted-foreground text-base mt-2">
              Hang tight, we’re generating your accessible app!
            </span>
          </div>
          <div className="animate-spin rounded-full border-4 border-blue-400 border-t-transparent w-12 h-12" />
          <button
            disabled
            className="w-full mt-4 px-8 py-3 rounded-md font-semibold bg-blue-600 text-white text-lg shadow-md"
          >
            Generating...
          </button>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="flex flex-col gap-8 items-center justify-center py-10 w-full max-w-lg mx-auto">
          <div className="flex flex-col gap-4 items-center">
            <span className="text-3xl">🚀</span>
            <span className="text-xl font-bold text-cyan-600">
              Your tool is ready to deploy!
            </span>
            <span className="text-base text-muted-foreground text-center">
              Download or deploy your new accessible tool, crafted by <b>VoiceAble</b> with your prompt:<br/>
              <span className="inline-block italic my-2 text-blue-500">"{userPrompt}"</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-3 w-full justify-center">
            <a
              href="#"
              className="px-7 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow"
            >
              Download Code
            </a>
            <a
              href="#"
              className="px-7 py-2 rounded bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition shadow"
            >
              Deploy to Vercel
            </a>
          </div>
          <button
            className="w-full mt-8 px-6 py-2 bg-muted rounded text-primary font-medium hover:bg-muted-foreground/20 transition"
            onClick={() => {
              setStep(0);
              setUserPrompt("");
              setTemplate("default");
            }}
          >
            Start Over
          </button>
        </div>
      );
    }

    return null;
  }

  return (
    <div className={`${theme}`}>
      <div className="min-h-screen flex flex-col bg-background transition-colors duration-200">
        <Navbar onToggleTheme={handleToggleTheme} />
        {/* Hero */}
        <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col px-4 pt-6 pb-0">
          <section className="flex flex-col items-center text-center mb-10 gap-6 w-full">
            <span className="bg-gradient-to-br from-blue-600 to-cyan-400 text-white rounded-full px-4 py-2 font-extrabold text-xs tracking-wide uppercase">
              Empowering Accessibility
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3" style={{ fontFamily: 'inherit' }}>
              Instantly Build <span className="text-blue-500">Accessible</span> Tools,<br />
              with <span className="text-cyan-400">VoiceAble</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Just <b>speak or type</b> your need, and <b>VoiceAble</b> generates a digital accessibility tool in seconds. 
              No coding, just inclusion — by <span className="font-semibold text-blue-700 dark:text-cyan-300">Tensor Troops</span>.
            </p>
          </section>
          {/* Stepper and current stage */}
          <Stepper currentStep={step} />
          <section className="w-full my-3">
            {renderStepContent()}
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
