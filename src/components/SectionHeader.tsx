import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-8",
        align === "center" ? "items-center text-center" : "items-start",
        action && "md:flex-row md:items-end md:justify-between"
      )}
    >
      <div className={cn(align === "center" && "max-w-2xl")}>
        {eyebrow && (
          <div
            className={cn(
              "flex items-center gap-2 mb-3",
              align === "center" && "justify-center"
            )}
          >
            <span className="h-px w-6 bg-brand-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-600">
              {eyebrow}
            </span>
            {align === "center" && <span className="h-px w-6 bg-brand-500" />}
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-ink-900 tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm text-ink-500 leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
