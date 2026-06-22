import { Link } from "react-router-dom";
import { ShieldCheck, MapPin, Star } from "lucide-react";
import type { Equipment } from "@/data/equipment";
import { cn } from "@/lib/utils";

const conditionStyles: Record<string, string> = {
  new: "bg-cyan-50 text-cyan-700 border-cyan-200",
  A: "bg-emerald-50 text-emerald-700 border-emerald-200",
  B: "bg-amber-50 text-amber-700 border-amber-200",
  C: "bg-rose-50 text-rose-700 border-rose-200",
  certified: "bg-cyan-50 text-cyan-700 border-cyan-200",
  preferred: "bg-emerald-50 text-emerald-700 border-emerald-200",
  standard: "bg-amber-50 text-amber-700 border-amber-200",
  economy: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function EquipmentCard({ equipment }: { equipment: Equipment }) {
  const discount = equipment.originalPrice
    ? Math.round((1 - equipment.price / equipment.originalPrice) * 100)
    : 0;

  return (
    <Link
      to={`/equipment/${equipment.id}`}
      className="group block bg-white rounded-xl border border-ink-200 overflow-hidden card-hover hover:border-cyan-300"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-ink-50 to-ink-100 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-ink-300 tracking-tightest">
              {equipment.brand.slice(0, 3).toUpperCase()}
            </div>
            <div className="mt-1 text-[10px] text-ink-400 tracking-widest">
              {equipment.categoryLabel}
            </div>
          </div>
        </div>

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className={cn(
              "px-2 py-0.5 text-[10px] font-medium rounded border",
              conditionStyles[equipment.condition] || "bg-ink-50 text-ink-600 border-ink-200"
            )}
          >
            {equipment.conditionLabel}
          </span>
          {equipment.isSelfRun && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-ink-900 text-white">
              平台自营
            </span>
          )}
        </div>

        {discount > 0 && (
          <div className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-rose-500 text-white">
            -{discount}%
          </div>
        )}

        {equipment.stock === 0 && (
          <div className="absolute inset-0 bg-ink-900/60 flex items-center justify-center">
            <span className="px-3 py-1 text-xs font-medium text-white bg-amber-500 rounded">
              预售锁单
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-ink-900 line-clamp-2 group-hover:text-cyan-600 transition-colors min-h-[2.5rem]">
          {equipment.name}
        </h3>

        {/* Specs */}
        <div className="mt-3 space-y-1">
          {equipment.specs.slice(0, 2).map((spec) => (
            <div key={spec.label} className="flex items-center text-xs text-ink-500">
              <span className="text-ink-400 w-16 shrink-0">{spec.label}</span>
              <span className="text-ink-700 truncate">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {equipment.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 text-[10px] text-ink-500 bg-ink-50 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-ink-500">¥</span>
              <span className="font-mono text-xl font-bold text-ink-900">
                {equipment.price.toLocaleString()}
              </span>
              <span className="text-xs text-ink-500">/{equipment.unit}</span>
            </div>
            {equipment.originalPrice && (
              <div className="text-xs text-ink-400 line-through">
                ¥{equipment.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          {equipment.inspectionLevel && (
            <div className="flex items-center gap-1 text-[10px] text-emerald-600">
              <ShieldCheck className="h-3 w-3" />
              <span>已质检</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-ink-100 flex items-center justify-between text-[11px] text-ink-500">
          <span className="flex items-center gap-1 truncate">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            {equipment.sellerName}
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <MapPin className="h-3 w-3" />
            {equipment.location.split("·")[0]}
          </span>
        </div>
      </div>
    </Link>
  );
}
