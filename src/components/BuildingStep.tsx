import React, { useEffect, useState } from "react";
import { generateAppWithAI } from "@/services/aiService";
import type { GeneratedApp } from "@/utils/codeGenerator";

interface BuildingStepProps {
  template: string;
  prompt: string;
  onAppGenerated: (app: GeneratedApp) => void;
}

export default function BuildingStep({ template, prompt, onAppGenerated }: BuildingStepProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Analyzing your prompt");

  useEffect(() => {
    let isMounted = true;
    
    const generateApp = async () => {
      try {
        // Step 1: Analyzing
        if (!isMounted) return;
        setCurrentStep("Analyzing your prompt with AI");
        setProgress(20);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Step 2: AI Generation
        if (!isMounted) return;
        setCurrentStep("Generating your app with GPT-4o Mini");
        setProgress(40);
        
        const generatedApp = await generateAppWithAI({
          prompt,
          template,
          features: []
        });
        
        // Step 3: Processing
        if (!isMounted) return;
        setCurrentStep("Processing and optimizing code");
        setProgress(70);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Step 4: Finalizing
        if (!isMounted) return;
        setCurrentStep("Finalizing your accessible application");
        setProgress(90);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (!isMounted) return;
        setProgress(100);
        setCurrentStep("Complete!");
        
        // Slight delay before moving to next step
        setTimeout(() => {
          if (isMounted) {
            onAppGenerated(generatedApp);
          }
        }, 500);
        
      } catch (error) {
        console.error('App generation failed:', error);
        if (!isMounted) return;
        
        setCurrentStep("Generation failed - using fallback");
          // Create a fallback app
        const fallbackApp: GeneratedApp = {
          id: `app-${Date.now()}`,
          name: `${prompt.split(' ').slice(0, 2).join(' ')} Tool`,
          description: `An accessible ${template} application: ${prompt}`,
          type: template,
          files: {
            'index.html': `<!DOCTYPE html><html><head><title>Generated App</title></head><body><h1>Your Accessible App</h1><p>${prompt}</p></body></html>`,
            'README.md': `# Generated Accessible App\n\n${prompt}\n\nGenerated by VoiceAble`
          },
          dependencies: {},
          scripts: { 'start': 'Open index.html in browser' },
          instructions: `Generated accessible app for: ${prompt}`
        };
        
        setTimeout(() => {
          if (isMounted) {
            onAppGenerated(fallbackApp);
          }
        }, 1000);
      }
    };
    
    generateApp();
    
    return () => {
      isMounted = false;
    };
  }, [template, prompt, onAppGenerated]);

  const getTemplateName = () => {
    switch (template) {
      case "screen-reader":
        return "Screen Reader Optimized";
      case "planner":
        return "Daily Planner";
      case "medication":
        return "Medication Reminder";
      default:
        return "Custom";
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center py-10 w-full max-w-md mx-auto">
      <div className="flex flex-col gap-2 items-center">
        <span className="text-3xl animate-bounce">🤖</span>
        <span className="text-xl font-bold text-blue-600">
          Building your AI-powered tool...
        </span>
        <span className="text-muted-foreground text-base mt-2 text-center">
          Using GPT-4o Mini and Lovable.AI to generate your accessible app!<br/>
          <span className="text-sm text-blue-500 font-medium">
            Template: {getTemplateName()}
          </span>
        </span>
      </div>
      
      {/* Enhanced spinning loader */}
      <div className="relative">
        <div className="animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 w-16 h-16" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current step */}
      <div className="w-full text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-blue-600 font-medium">{currentStep}</span>
        </div>
      </div>
      
      <button
        disabled
        className="w-full mt-4 px-8 py-3 rounded-md font-semibold bg-gray-400 text-white text-lg shadow-md opacity-50 cursor-not-allowed"
      >
        Generating with AI...
      </button>
    </div>
  );
}
