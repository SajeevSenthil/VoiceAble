
import React from "react";

const steps = [
  { label: "Your Prompt" },
  { label: "Choose Template" },
  { label: "Generate App" },
  { label: "Deploy" },
];

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 my-6 w-full">
      {steps.map((step, idx) => (
        <div 
          key={step.label}
          className="flex items-center gap-3"
          aria-current={currentStep === idx}
        >
          <div
            className={`rounded-full w-9 h-9 flex items-center justify-center font-bold text-lg border-2 transition ${
              idx < currentStep
                ? "bg-blue-500 border-blue-500 text-white"
                : idx === currentStep
                ? "bg-cyan-400 border-cyan-400 text-white animate-pulse"
                : "bg-accent border-border text-muted-foreground"
            } shadow `}
            aria-label={step.label}
          >
            {idx + 1}
          </div>
          <span className={`font-semibold tracking-tight ${idx === currentStep ? "text-cyan-400" : "text-muted-foreground"}`}>{step.label}</span>
          {idx < steps.length - 1 && (
            <div className="h-1 w-8 md:w-14 bg-muted rounded-md" />
          )}
        </div>
      ))}
    </div>
  );
}
