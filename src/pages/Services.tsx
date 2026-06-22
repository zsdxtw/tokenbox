import {
  ShieldCheck,
  Truck,
  Wrench,
  Calculator,
  FileCheck,
  Settings,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { valueServices } from "@/data/platform";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Truck,
  Wrench,
  Calculator,
  FileCheck,
  Settings,
};

const inspectionStandards = [
  {
    category: "GPU 服务器",
    items: ["GPU 健康度（温度/算力/显存）", "金手指氧化", "散热器积灰", "供电模块", "BIOS 完整性", "72h 压力测试"],
    tools: "nvidia-smi / GPU-Burn / memtester / 红外热成像",
    levels: "A 级（<1年，衰减<5%）/ B 级（1-2年，5-15%）/ C 级（2-3年，15-30%）",
  },
  {
    category: "CPU 服务器",
    items: ["CPU 步进/微码", "内存通道完整性", "硬盘健康度", "电源模块", "风扇状态", "主板电容"],
    tools: "dmidecode / stress-ng / smartctl / IPMI 日志",
    levels: "同 A/B/C 三级分类",
  },
  {
    category: "网络设备",
    items: ["端口连通性", "光功率", "误码率", "固件版本", "背板状态", "风扇电源"],
    tools: "光功率计 / BERT 误码测试 / show interface",
    levels: "认证 / 功能正常",
  },
  {
    category: "存储设备",
    items: ["SMART 数据（SSD）", "坏道数（HDD）", "通电小时", "重新映射扇区"],
    tools: "smartctl / MHDD / victoria / CrystalDiskInfo",
    levels: "按 TBW 消耗比例和坏道数量分级",
  },
];

const dataClearingLevels = [
  {
    level: "一级·逻辑清除",
    method: "数据覆写 ≥ 2 次",
    desc: "符合 GB 46864-2025 标准，覆盖全部存储区域",
    price: "200-500 元/台",
  },
  {
    level: "二级·固件重置",
    method: "恢复出厂设置 + BIOS/BMC 配置清除",
    desc: "清除固件层配置与运行日志",
    price: "包含在一级服务中",
  },
  {
    level: "三级·物理销毁",
    method: "硬盘消磁或粉碎",
    desc: "物理破坏存储介质，不可恢复",
    price: "500-1,500 元/台",
  },
];

export default function Services() {
  return (
    <div className="bg-ink-50 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] glow-cyan opacity-40" />
        <div className="container relative py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-rose-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
                VALUE-ADDED SERVICES
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              增值服务板块
            </h1>
            <p className="mt-4 text-base text-ink-300 leading-relaxed">
              围绕设备交易的专业服务闭环。验机质检、物流安装、残值评估、数据清除、维修维保、
              全生命周期管理，构建交易壁垒。
            </p>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="SERVICE LIST"
          title="六项核心增值服务"
          description="平台自营或接入第三方服务商，提供覆盖设备交易全链路的专业服务。"
        />

        <div className="space-y-6">
          {valueServices.map((service, idx) => {
            const Icon = iconMap[service.icon];
            const isReverse = idx % 2 === 1;
            return (
              <div
                key={service.id}
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-12 gap-6 p-7 bg-white rounded-xl border border-ink-200 card-hover",
                )}
              >
                <div className={cn("lg:col-span-4", isReverse && "lg:order-2")}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                      {Icon && <Icon className="h-6 w-6 text-rose-600" />}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-ink-900">{service.name}</h3>
                      <p className="text-xs text-rose-600 font-medium">{service.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-ink-500 leading-relaxed">{service.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink-50 rounded-md text-xs text-ink-700">
                    <span className="text-ink-400">计费方式：</span>
                    {service.billing}
                  </div>
                  {service.standard && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 rounded-md text-xs text-cyan-700">
                      <FileCheck className="h-3 w-3" />
                      符合 {service.standard} 标准
                    </div>
                  )}
                </div>

                <div className={cn("lg:col-span-8", isReverse && "lg:order-1")}>
                  <div className="h-full p-5 bg-ink-50 rounded-lg">
                    <h4 className="text-xs font-semibold text-ink-900 uppercase tracking-wider mb-4">
                      服务流程
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {service.process.map((step, sIdx) => (
                        <div key={sIdx} className="relative">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-7 w-7 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-mono font-bold">
                              {sIdx + 1}
                            </div>
                            {sIdx < service.process.length - 1 && (
                              <ArrowRight className="h-3 w-3 text-ink-300 hidden md:block" />
                            )}
                          </div>
                          <div className="text-xs text-ink-700 leading-snug">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Inspection standards */}
      <section className="bg-white border-y border-ink-100">
        <div className="container py-20">
          <SectionHeader
            eyebrow="INSPECTION STANDARDS"
            title="标准化质检认证体系"
            description="平台建立标准化质检流程，覆盖主要设备品类。每台通过质检的设备生成唯一质检报告编号。"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {inspectionStandards.map((std) => (
              <div key={std.category} className="p-6 bg-ink-50 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-bold text-ink-900">{std.category}</h3>
                  <ShieldCheck className="h-5 w-5 text-cyan-500" />
                </div>

                <div className="space-y-2 mb-4">
                  {std.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-ink-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-ink-200 space-y-2 text-xs">
                  <div className="flex gap-2">
                    <span className="text-ink-400 shrink-0 w-16">检测工具</span>
                    <span className="text-ink-700 font-mono">{std.tools}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-ink-400 shrink-0 w-16">认证等级</span>
                    <span className="text-ink-700">{std.levels}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data clearing */}
      <section className="container py-20">
        <SectionHeader
          eyebrow="DATA CLEARING"
          title="数据清除合规服务"
          description="GB 46864-2025《数据安全技术 电子产品信息清除技术要求》将于 2027 年 1 月 1 日实施，AI 服务器首次被纳入废弃电子产品管控范围。"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {dataClearingLevels.map((level, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl border border-ink-200 card-hover relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500" />
              <div className="font-mono text-xs text-cyan-600 mb-2">LEVEL {idx + 1}</div>
              <h3 className="font-serif text-lg font-bold text-ink-900 mb-2">{level.level}</h3>
              <div className="text-sm font-medium text-cyan-700 mb-3">{level.method}</div>
              <p className="text-xs text-ink-500 leading-relaxed mb-4">{level.desc}</p>
              <div className="pt-4 border-t border-ink-100">
                <div className="text-xs text-ink-400">参考价格</div>
                <div className="font-mono text-sm font-bold text-ink-900 mt-1">{level.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 bg-cyan-50 border border-cyan-100 rounded-xl flex items-start gap-3">
          <FileCheck className="h-5 w-5 text-cyan-600 shrink-0 mt-0.5" />
          <div className="text-xs text-cyan-800 leading-relaxed">
            每次数据清除生成认证报告，包含设备序列号、清除方法、操作时间、操作人员、验证结果。
            对接持有危险废物经营许可证的电子废弃物处置企业，资源回收利用率达 95% 以上。
          </div>
        </div>
      </section>

      {/* Lifecycle management */}
      <section className="bg-ink-900 text-white">
        <div className="container py-20">
          <SectionHeader
            eyebrow="LIFECYCLE MANAGEMENT"
            title="设备全生命周期管理"
            description="平台为每台交易设备建立数字档案，追踪从采购到退役处置的完整生命周期。"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                phase: "第 1-2 年",
                scenario: "前沿训练",
                desc: "新设备部署于训练集群，承担大模型训练任务，性能处于巅峰期。",
                action: "继续使用",
              },
              {
                phase: "第 3-4 年",
                scenario: "高价值推理",
                desc: "性能衰减后转入推理场景，仍可承担高价值推理任务。",
                action: "降级使用",
              },
              {
                phase: "第 5-6 年",
                scenario: "批量工作负载",
                desc: "进一步衰减，适合批量推理、轻量计算等场景。",
                action: "转售变现 / 拆解回收",
              },
            ].map((stage, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-ink-700 hover:border-cyan-400/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-cyan-400">{stage.phase}</span>
                  <span className="px-2 py-0.5 text-[10px] bg-ink-800 text-ink-300 rounded">
                    {stage.action}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">{stage.scenario}</h3>
                <p className="text-xs text-ink-400 leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-ink-800 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-ink-300 leading-relaxed">
              参考超大规模云服务商将服务器使用寿命从 3-4 年延长到 6 年的实践，
              平台帮助企业优化设备折旧策略和退役时机，最大化设备残值。
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
