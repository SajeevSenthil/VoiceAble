import React, { useState } from "react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Speak or Type Your Need",
      description: "Describe what accessible tool you need in natural language",
      example: '"Create a medication reminder app for elderly users"',
      icon: "🎤"
    },
    {
      title: "Choose Template",
      description: "Select from our accessibility-focused templates",
      example: "Screen Reader, Planner, Medication, or Custom",
      icon: "🎨"
    },
    {
      title: "AI Generates Your App",
      description: "GPT-4o Mini creates a fully functional, accessible application",
      example: "Complete HTML, CSS, JavaScript with ARIA labels",
      icon: "🤖"
    },
    {
      title: "Download & Deploy",
      description: "Get your ready-to-use app with deployment instructions",
      example: "ZIP file with all code, docs, and hosting guide",
      icon: "🚀"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-8 my-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          From idea to accessible app in minutes - powered by AI and designed for inclusion
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
              activeStep === index
                ? 'border-blue-500 bg-white dark:bg-gray-800 shadow-lg scale-105'
                : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-blue-300'
            }`}
            onClick={() => setActiveStep(index)}
            onMouseEnter={() => setActiveStep(index)}
          >
            {/* Step number */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>

            {/* Icon */}
            <div className="text-4xl mb-4 text-center">
              {step.icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
              {step.description}
            </p>

            {/* Example */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
              <p className="text-xs text-blue-700 dark:text-blue-300 italic text-center">
                {step.example}
              </p>
            </div>

            {/* Active indicator */}
            {activeStep === index && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-4 h-4 bg-blue-600 rotate-45"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium">
          <span>✨</span>
          <span>Powered by GPT-4o Mini • Fully Accessible • Ready to Deploy</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  );
}
