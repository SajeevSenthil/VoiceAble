
import ToolCard from "./ToolCard";

type Tool = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

export default function HistoryPanel({ tools }: { tools: Tool[] }) {
  if (!tools.length)
    return (
      <div className="bg-card border border-border rounded-xl p-5 h-full flex flex-col items-center justify-center text-muted-foreground min-h-[260px]">
        <div className="text-4xl mb-2">💡</div>
        <span className="text-center leading-tight">
          Your generated tools will appear here.
        </span>
      </div>
    );

  return (
    <div className="bg-card border border-border rounded-xl p-4 h-full overflow-y-auto max-h-[550px] flex flex-col gap-4 min-h-[260px]">
      <h3 className="text-lg font-medium text-primary pl-1 mb-1">History</h3>
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
