
import React, { useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function VoiceTextInput({
  onSubmit,
  disabled,
}: {
  onSubmit: (text: string) => void;
  disabled?: boolean;
}) {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  // Use 'any' as type for compatibility
  const recognitionRef = useRef<any>(null);

  // Check if browser supports SpeechRecognition
  const isSpeechSupported =
    "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

  // Start/stop voice recognition
  const handleMicClick = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    setIsRecording(true);

    recognition.onresult = event => {
      const text = event.results[0][0].transcript;
      setInput(text);
      setIsRecording(false);
    };
    recognition.onerror = () => {
      setIsRecording(false);
    };
    recognition.onend = () => setIsRecording(false);

    recognition.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input.trim());
    setInput("");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} aria-label="Describe Accessible Tool" tabIndex={-1}>
      <div className="flex items-center gap-2">
        <label htmlFor="voice-textarea" className="sr-only">Describe tool</label>
        <Textarea
          id="voice-textarea"
          rows={3}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='Describe the tool you need...'
          disabled={disabled || isRecording}
          aria-required="true"
          className="flex-1 text-base bg-background text-foreground placeholder:text-muted-foreground shadow-none border outline-none focus:ring-2 focus:ring-blue-400"
          style={{ minHeight: 60, fontSize: '1.07rem', fontFamily: 'inherit' }}
        />
        <Button
          type="button"
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          aria-label={isRecording ? "Stop Recording" : "Speak"}
          onClick={handleMicClick}
          disabled={!isSpeechSupported || disabled}
        >
          {isRecording ? (
            <MicOff className="text-red-500" />
          ) : (
            // Make the mic icon blue for both light and dark mode
            <Mic className="text-blue-600 dark:text-blue-400" />
          )}
        </Button>
      </div>
      {!isSpeechSupported && (
        <div className="text-xs text-muted-foreground px-1">
          (Voice input not supported in this browser)
        </div>
      )}
      <Button type="submit" className="w-full text-base">Next</Button>
    </form>
  );
}
