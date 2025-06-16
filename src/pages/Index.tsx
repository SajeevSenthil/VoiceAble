import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceTextInput from "@/components/VoiceTextInput";
import BuildingStep from "@/components/BuildingStep";
import DeployStep from "@/components/DeployStep";
import HowItWorks from "@/components/HowItWorks";
import { Stepper } from "@/components/Stepper";
import { useState, useEffect } from "react";
import type { GeneratedApp } from "@/utils/codeGenerator";

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
  const [generatedApp, setGeneratedApp] = useState<GeneratedApp | null>(null);

  // Auto-progress from step 2 (generation) to step 3 (deploy) when app is generated
  const handleAppGenerated = (app: GeneratedApp) => {
    setGeneratedApp(app);
    setStep(3);
  };

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
    }    if (step === 2) {
      return (
        <BuildingStep 
          template={template} 
          prompt={userPrompt}
          onAppGenerated={handleAppGenerated}
        />
      );
    }    if (step === 3) {
      return (
        <DeployStep 
          userPrompt={userPrompt}
          generatedApp={generatedApp}
          onStartOver={() => {
            setStep(0);
            setUserPrompt("");
            setTemplate("default");
            setGeneratedApp(null);
          }}
        />
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
          </section>          {/* Stepper and current stage */}
          <Stepper currentStep={step} />
          <section className="w-full my-3">
            {renderStepContent()}
          </section>
          
          {/* How it works section - only show on initial step */}
          {step === 0 && (
            <section className="w-full mt-12">
              <HowItWorks />
            </section>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
