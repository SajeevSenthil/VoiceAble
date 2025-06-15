
import { ReactNode } from "react";
import { Accessibility } from "lucide-react";

type Tool = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="border border-primary bg-background rounded-xl p-6 flex flex-col gap-2 shadow-md hover:shadow-lg focus-within:ring-2 focus-within:ring-primary focus:outline-none transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-2">
        <span className="rounded-full bg-primary text-primary-foreground p-2">
          <Accessibility size={24} aria-hidden />
        </span>
        <h2 className="text-xl font-bold leading-snug" tabIndex={0}>
          {tool.title}
        </h2>
      </div>
      <p className="text-muted-foreground">{tool.description}</p>
      <time
        dateTime={tool.createdAt.toISOString()}
        className="text-xs text-muted-foreground mt-1"
      >
        {tool.createdAt.toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
          month: "short",
          day: "numeric",
        })}
      </time>
    </div>
  );
}
