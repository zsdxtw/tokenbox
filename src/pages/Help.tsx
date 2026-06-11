import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem { q: string; a: string; }
interface FaqGroup { title: string; items: FaqItem[]; }

const faqData: FaqGroup[] = [
  {
    title: '采购相关',
    items: [
      { q: '如何批量采购？', a: '您可以通过平台提交批量采购需求，或直接联系商务团队获取专属报价。批量采购享有阶梯价格优惠，最低起订量为5台。' },
      { q: '如何获取企业报价？', a: '企业客户可注册企业账号并完成认证，认证后即可查看企业专属价格。也可拨打商务热线400-888-8888获取定制报价方案。' },
      { q: '支持哪些支付方式？', a: '目前支持银行转账、支付宝、微信支付三种方式。企业客户大额订单建议使用银行转账，可享受额外折扣。' },
    ],
  },
  {
    title: '二手设备',
    items: [
      { q: '二手设备质量如何保证？', a: '所有二手设备均经过专业质检团队检测，出具详细质检报告，包含外观、性能、稳定性等维度评分。设备上架前需通过72小时烤机测试。' },
      { q: '质检报告包含哪些内容？', a: '质检报告包含：设备外观评分、核心部件性能测试数据、运行稳定性测试结果、维修历史记录、质保期限说明等。' },
      { q: '退换货政策？', a: '二手设备支持7天无理由退货，30天内出现非人为质量问题可免费换货。所有二手设备均提供至少90天质保。' },
    ],
  },
  {
    title: '物流配送',
    items: [
      { q: '配送范围和时间？', a: '全国范围均可配送，标准物流3-7个工作日送达，加急配送1-3个工作日送达。偏远地区可能额外增加1-2天。' },
      { q: '如何选择安装调试服务？', a: '下单时可在配送方式中选择"送货上楼+安装调试"服务，专业工程师将上门完成设备安装、网络配置和性能调优。' },
      { q: '大件设备如何运输？', a: '大件设备采用专车运输，全程GPS追踪，配备防震包装和保险。到货后提供送货上楼服务，确保设备安全到位。' },
    ],
  },
  {
    title: '寄售服务',
    items: [
      { q: '如何发布寄售设备？', a: '登录后在"我的"页面选择"寄售管理"，填写设备信息并上传照片，审核通过后即可上架。我们提供专业拍照和描述撰写服务。' },
      { q: '寄售服务费多少？', a: '标准寄售服务费为成交价的3%，包含质检、拍照、上架、交易撮合等全流程服务。VIP客户可享2%优惠费率。' },
      { q: '什么时候可以收到回款？', a: '买家确认收货后3个工作日内，款项将打入您的平台账户，可随时提现至银行卡，提现1-2个工作日到账。' },
    ],
  },
];

function FaqSection({ group }: { group: FaqGroup }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="bg-nest-card border border-nest-border rounded-lg p-4">
      <h2 className="font-display text-lg font-semibold text-nest-text mb-3">{group.title}</h2>
      <div className="space-y-2">
        {group.items.map((item, i) => (
          <div key={i} className="border border-nest-border rounded-lg overflow-hidden">
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-nest-surface/50 transition-colors">
              <span className="text-sm text-nest-text">{item.q}</span>
              <ChevronDown size={16} className={`text-nest-muted shrink-0 transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIdx === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  <p className="px-4 pb-3 text-sm text-nest-muted leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Help() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-nest-green/10 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-nest-green" />
        </div>
        <h1 className="font-display text-2xl font-bold text-nest-text">帮助中心</h1>
      </div>
      <div className="space-y-4">
        {faqData.map(group => <FaqSection key={group.title} group={group} />)}
      </div>
    </motion.div>
  );
}
