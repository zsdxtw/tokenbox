import { useState } from 'react';
import { Shield, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InspectionReport as InspectionReportType } from '../../data/products';

function getScoreColor(score: number): string {
  if (score >= 90) return 'bg-nest-green';
  if (score >= 70) return 'bg-nest-orange';
  return 'bg-nest-red';
}

function getScoreTextColor(score: number): string {
  if (score >= 90) return 'text-nest-green';
  if (score >= 70) return 'text-nest-orange';
  return 'text-nest-red';
}

export default function InspectionReport({ report }: { report: InspectionReportType }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-nest-card rounded-lg border border-nest-border overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-nest-surface/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-nest-green" />
          <span className="text-sm font-medium text-nest-text">平台质检报告</span>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-nest-muted" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-nest-border pt-3">
              {/* Test date */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-nest-muted">测试日期</span>
                <span className="text-nest-text">{report.testDate}</span>
              </div>

              {/* Stability score */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-nest-muted">稳定性评分</span>
                  <span className={`font-display font-bold ${getScoreTextColor(report.stabilityScore)}`}>
                    {report.stabilityScore}
                  </span>
                </div>
                <div className="h-2 bg-nest-surface rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${getScoreColor(report.stabilityScore)}`}
                    style={{ width: `${report.stabilityScore}%` }}
                  />
                </div>
              </div>

              {/* Hashrate test */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-nest-muted">算力测试</span>
                <span className="text-nest-text text-right max-w-[60%]">{report.hashrate}</span>
              </div>

              {/* Power consumption */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-nest-muted">功耗测试</span>
                <span className="text-nest-text text-right max-w-[60%]">{report.powerConsumption}</span>
              </div>

              {/* Temperature */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-nest-muted">温度测试</span>
                <span className="text-nest-text text-right max-w-[60%]">{report.temperature}</span>
              </div>

              {/* Notes */}
              {report.notes && (
                <div className="text-sm">
                  <span className="text-nest-muted">备注：</span>
                  <span className="text-nest-text">{report.notes}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
