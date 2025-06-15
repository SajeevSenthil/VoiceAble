
import AccessibleToolForm from "@/components/AccessibleToolForm";
import HistoryPanel from "@/components/HistoryPanel";
import { useState } from "react";

type Tool = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

const Index = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  const handleNewTool = (tool: Tool) => {
    setTools(prev => [tool, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full py-6 border-b border-border bg-card">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 gap-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary mb-1">🌍 Social Impact Assistant</h1>
            <p className="text-muted-foreground max-w-xl">Describe the accessible digital tool you need—for yourself or someone else. We'll help you create it, instantly.</p>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-8 px-4 py-10">
        <section className="flex-1">
          <AccessibleToolForm onToolGenerated={handleNewTool} />
        </section>
        <aside className="w-full md:w-[340px] shrink-0">
          <HistoryPanel tools={tools} />
        </aside>
      </main>
    </div>
  );
};

export default Index;
