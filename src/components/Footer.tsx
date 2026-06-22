import { Link } from "react-router-dom";
import { Cpu, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  {
    title: "交易板块",
    links: [
      { label: "设备交易", path: "/market" },
      { label: "算力交易", path: "/compute" },
      { label: "招标采购", path: "/bidding" },
      { label: "集采拼单", path: "/bidding" },
    ],
  },
  {
    title: "解决方案",
    links: [
      { label: "智算集群建设", path: "/solutions" },
      { label: "绿色供电方案", path: "/solutions" },
      { label: "算力租赁运营", path: "/solutions" },
      { label: "残值处置方案", path: "/solutions" },
    ],
  },
  {
    title: "金融服务",
    links: [
      { label: "融资租赁", path: "/finance" },
      { label: "分期付款", path: "/finance" },
      { label: "以旧换新", path: "/finance" },
      { label: "算力保险", path: "/finance" },
    ],
  },
  {
    title: "增值与资讯",
    links: [
      { label: "验机质检", path: "/services" },
      { label: "数据清除", path: "/services" },
      { label: "政策资讯", path: "/policy" },
      { label: "设备指纹", path: "/market" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-50 border-t border-ink-100">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative h-9 w-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                <Cpu className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-ink-900">算力巢</span>
                <span className="text-[10px] text-ink-400 tracking-widest">COMPUTE NEST</span>
              </div>
            </div>
            <p className="text-sm text-ink-500 leading-relaxed max-w-xs">
              全国性算力设备 B2B 交易平台，覆盖六大设备层级全品类交易，提供从设备采购到资产处置的全生命周期交易服务。
            </p>
            <div className="mt-5 space-y-2 text-xs text-ink-500">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand-500" />
                <span>400-888-2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-500" />
                <span>service@compute-nest.cn</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-brand-500" />
                <span>北京市经济技术开发区·亦城财富中心</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-ink-900 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-xs text-ink-500 hover:text-brand-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-ink-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-400">
            © 2026 算力巢 COMPUTE NEST · 全国性算力设备 B2B 交易平台
          </p>
          <div className="flex items-center gap-4 text-xs text-ink-400">
            <span>京 ICP 备 2026000000 号</span>
            <span>京公网安备 11000002000000 号</span>
            <span>合规处置资质</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
