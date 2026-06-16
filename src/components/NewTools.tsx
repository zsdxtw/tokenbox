import { Sparkles } from "lucide-react";
import type { Tool } from "@/data/types";
import ToolCard from "./ToolCard";

interface NewToolsProps {
  tools: Tool[];
}

export default function NewTools({ tools }: NewToolsProps) {
  if (tools.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-accent-cyan to-accent-blue" />
          <h2 className="text-xl font-bold text-white">最新收录</h2>
          <Sparkles className="w-5 h-5 text-accent-cyan" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {tools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
