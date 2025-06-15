
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ToolCard from "./ToolCard";
import { toast } from "@/hooks/use-toast";

type Tool = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

export default function AccessibleToolForm({
  onToolGenerated,
}: {
  onToolGenerated: (tool: Tool) => void;
}) {
  const [value, setValue] = useState("");
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setTool(null);

    if (!value.trim()) return setError("Please describe the tool you need.");

    setLoading(true);

    try {
      // Stubbed "build" using fake OpenAI call
      await new Promise((res) => setTimeout(res, 1800));
      // Simulated OpenAI response
      const example = generateExampleTool(value);
      setTool(example);
      onToolGenerated(example);
      toast({
        title: "Tool created!",
        description: "Your accessible tool has been generated.",
      });
      setValue("");
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      setError("Sorry, something went wrong.");
      toast({
        title: "Error",
        description: "Could not create tool. Try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  // For later: replace with real OpenAI call using API key
  function generateExampleTool(userInput: string): Tool {
    return {
      id: `${Date.now()}`,
      title: capitalizeFirstLetter(userInput),
      description:
        userInput.toLowerCase().includes("screen")
          ? "This assistant will read screen content aloud and summarize using AI, with keyboard shortcuts and high-contrast text."
          : userInput.toLowerCase().includes("planner")
          ? "An accessible, voice-controlled daily planner with reminders, clear layout, and speech feedback."
          : userInput.toLowerCase().includes("medication")
          ? "Reminds users of medication schedules, with speech alerts and large print, configurable by voice or text."
          : "A custom accessible tool generated for your needs.",
      createdAt: new Date(),
    };
  }

  function capitalizeFirstLetter(str: string) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <form
      ref={formRef}
      className="bg-card rounded-xl border border-border p-8 shadow-lg flex flex-col gap-5 w-full max-w-xl mx-auto"
      onSubmit={handleSubmit}
      aria-label="Describe Accessible Tool"
      tabIndex={-1}
      id="generator"
    >
      <label
        htmlFor="input"
        className="text-lg font-medium text-primary mb-1"
      >
        Describe the tool you need
      </label>
      <Textarea
        id="input"
        autoFocus
        rows={4}
        maxLength={220}
        placeholder='E.g., "A screen reader with AI summarization"'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="text-md"
        aria-required="true"
        aria-describedby="desc-ex"
        disabled={loading}
      />
      <div id="desc-ex" className="text-sm text-muted-foreground mb-3">
        In plain words, explain what you or someone needs.
      </div>
      <Button
        type="submit"
        className="w-full h-11 text-lg font-semibold"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
            Creating…
          </>
        ) : (
          "Create Tool"
        )}
      </Button>
      {error && (
        <div className="mt-2 text-destructive text-sm" role="alert">
          {error}
        </div>
      )}
      {tool && (
        <div className="mt-7">
          <ToolCard tool={tool} />
        </div>
      )}
    </form>
  );
}
