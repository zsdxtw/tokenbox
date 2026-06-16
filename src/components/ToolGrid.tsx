import { LayoutGrid, List } from "lucide-react";
import type { Tool } from "@/data/types";
import ToolCard from "./ToolCard";

interface ToolGridProps {
  tools: Tool[];
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function ToolGrid({ tools, viewMode, onViewModeChange, sortBy, onSortChange }: ToolGridProps) {
  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-500">{tools.length} 个工具</span>
        <div className="flex items-center gap-3">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-xs bg-primary-50 border border-white/10 text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-accent-cyan/50"
          >
            <option value="order">默认排序</option>
            <option value="hot">热门优先</option>
            <option value="new">最新优先</option>
            <option value="free">免费优先</option>
          </select>

          {/* View mode */}
          <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-accent-cyan/20 text-accent-cyan" : "text-slate-500 hover:text-white"}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-1.5 transition-colors ${viewMode === "list" ? "bg-accent-cyan/20 text-accent-cyan" : "text-slate-500 hover:text-white"}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {tools.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500">暂无工具</p>
        </div>
      ) : (
        <div className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3"
            : "grid grid-cols-1 gap-2"
        }>
          {tools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
