import React, { useState } from "react";
import { downloadApp, previewApp, generateDeploymentInstructions } from "@/utils/downloadUtils";
import type { GeneratedApp } from "@/utils/codeGenerator";

interface DeployStepProps {
  userPrompt: string;
  generatedApp: GeneratedApp | null;
  onStartOver: () => void;
}

export default function DeployStep({ userPrompt, generatedApp, onStartOver }: DeployStepProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!generatedApp) return;
    
    setIsDownloading(true);
    try {
      await downloadApp(generatedApp);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePreview = () => {
    if (!generatedApp) return;
    previewApp(generatedApp);
  };

  if (!generatedApp) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center py-10 w-full max-w-lg mx-auto">
        <div className="text-center">
          <span className="text-3xl">⚠️</span>
          <h2 className="text-xl font-bold text-red-600 mt-2">
            App Generation Failed
          </h2>
          <p className="text-muted-foreground mt-2">
            Something went wrong during app generation. Please try again.
          </p>
        </div>
        <button
          className="px-8 py-3 rounded-md font-semibold bg-blue-600 text-white text-lg hover:bg-blue-700 transition shadow-md"
          onClick={onStartOver}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center py-10 w-full max-w-lg mx-auto">
      <div className="flex flex-col gap-4 items-center text-center">
        <span className="text-4xl">🚀</span>
        <span className="text-2xl font-bold text-green-600">
          {generatedApp.name} is Ready!
        </span>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md">
          <p className="text-sm text-green-800">
            <strong>Your request:</strong> "{userPrompt}"
          </p>
          <p className="text-sm text-green-700 mt-2">
            <strong>Generated:</strong> {generatedApp.description}
          </p>
        </div>
      </div>

      {/* App preview card */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
          <h3 className="font-bold text-lg">{generatedApp.name}</h3>
          <p className="text-blue-100 text-sm">{generatedApp.description}</p>
        </div>
        <div className="p-4">
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Files:</span>
              <span className="font-medium">{Object.keys(generatedApp.files).length}</span>
            </div>
            <div className="flex justify-between">
              <span>Size:</span>
              <span className="font-medium">
                {Math.round(JSON.stringify(generatedApp.files).length / 1024)}KB
              </span>
            </div>
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="font-medium">Web Application</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 w-full justify-center">
        <button
          onClick={handlePreview}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md flex items-center gap-2"
        >
          <span>👁️</span>
          Preview App
        </button>
        
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-md disabled:opacity-50 flex items-center gap-2"
        >
          <span>{isDownloading ? '⏳' : '⬇️'}</span>
          {isDownloading ? 'Downloading...' : 'Download Code'}
        </button>

        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition shadow-md flex items-center gap-2"
        >
          <span>📋</span>
          Deploy Guide
        </button>
      </div>

      {/* Deployment instructions */}
      {showInstructions && (
        <div className="w-full max-w-2xl bg-gray-50 border border-gray-200 rounded-lg p-6 text-left">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span>🚀</span>
            Deployment Instructions
          </h3>
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap text-xs bg-white p-4 rounded border overflow-auto max-h-96">
              {generateDeploymentInstructions(generatedApp)}
            </pre>
          </div>
        </div>
      )}

      {/* File structure preview */}
      <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <span>📁</span>
          Generated Files
        </h4>
        <div className="space-y-1 text-sm font-mono">
          {Object.keys(generatedApp.files).map(filename => (
            <div key={filename} className="flex items-center gap-2 text-gray-700">
              <span className="text-blue-500">
                {filename.endsWith('.html') ? '🌐' : 
                 filename.endsWith('.js') ? '⚡' : 
                 filename.endsWith('.css') ? '🎨' : 
                 filename.endsWith('.md') ? '📄' : '📄'}
              </span>
              {filename}
            </div>
          ))}
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-green-500">📦</span>
            package.json
          </div>
        </div>
      </div>

      <button
        className="w-full mt-8 px-6 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
        onClick={onStartOver}
      >
        ← Create Another App
      </button>
    </div>
  );
}
