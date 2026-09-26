/* ============ 页面：M2 算力与 TOKEN 交易中心 ============ */
window.PAGES=window.PAGES||{};
(function(){
const {fmt,yuan,pct,chgTxt,badge,levelBadge,slaBadge,panel,spark,lineChart,stepper,statCard,iconSvg,secHead,pageHead,utilBar}=UI;
const D=DATA;

/* ================= M2 专业算力商城 ================= */
PAGES['m2/pro']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['算力交易','#/m2/pro'],['专业算力商城']],title:'专业算力商城 · 训练级集群',mod:'M2-01',desc:'千卡集群 · 超节点整机 · 裸金属。长约闭口（1–5年、保底量、锁价）与大宗撮合；白金 SLA 99.9% 可用性、故障赔付、专属机房与 IB 网络保障。',actions:`<a class="btn btn-primary" href="#/m2/bid">推理竞价场</a><button class="btn btn-ghost" onclick="UI.toast('集群压测报告已发送至邮箱（演示）')">索取压测报告</button>`})}
<div class="g3 mb16">
  ${D.slaTiers.map(t=>`<div class="stat-card" style="border-color:${t.color==='mint'?'rgba(0,224,154,.3)':t.color==='gold'?'rgba(240,181,66,.3)':'var(--line)'}">
    <div class="s-label"><span class="dot d-${t.color==='mint'?'mint':t.color==='gold'?'gold':'gray'}"></span>${t.tier} · 可用性 ${t.avail}</div>
    <div class="s-value" style="font-size:19px">${t.pay}</div><div class="s-foot">${t.extra}</div>
  </div>`).join('')}
</div>
<div class="filter-bar">
  <span class="f-label">区域</span><button class="chip active">全部</button><button class="chip">华北</button><button class="chip">华东</button><button class="chip">西部</button><button class="chip">西南</button>
  <span class="f-label" style="margin-left:14px">卡型</span><button class="chip active">全部</button><button class="chip">H100</button><button class="chip">H200</button><button class="chip">昇腾</button>
  <span class="f-label" style="margin-left:14px">SLA</span><button class="chip active">全部</button><button class="chip">白金</button><button class="chip">金</button>
</div>
<div class="g2">
${D.clusters.map(c=>`
  <div class="product-card">
    <div class="pc-head">
      <div><div class="pc-title">${c.name}</div><div class="pc-sub">${c.region} · ${c.power}</div></div>
      ${slaBadge(c.sla)}
    </div>
    <div class="pc-specs">
      <span class="spec-pill">${c.scale}</span><span class="spec-pill">${c.net}</span>
      <span class="spec-pill">存储 ${c.storage}</span><span class="spec-pill">实测 ${c.fs} TFLOPS·B/卡</span>
    </div>
    <div class="flex between" style="margin-top:auto;border-top:1px solid var(--line);padding-top:12px">
      <div class="pc-price">¥${c.price.toFixed(1)}<span class="u">/${c.unit}</span><span class="u" style="margin-left:8px;color:var(--txt3)">${c.mode}</span></div>
      <div class="flex" style="gap:6px"><button class="btn btn-primary btn-sm" onclick="UI.toast('闭口长约向导已打开（演示）')">闭口长约</button><button class="btn btn-ghost btn-sm" onclick="UI.toast('RFQ 已发起（演示）')">RFQ</button></div>
    </div>
  </div>`).join('')}
</div>
${panel('闭口长约合同模板要点 · M2-07','<div class="g4"><div class="stat-card"><div class="s-label">期限结构</div><div class="s-value" style="font-size:17px">2年闭口+1年开口</div><div class="s-foot">市场主流混合合同</div></div><div class="stat-card"><div class="s-label">保底量</div><div class="s-value" style="font-size:17px">≥75% 承诺量</div><div class="s-foot">未达量按保底计费</div></div><div class="stat-card"><div class="s-label">锁价机制</div><div class="s-value" style="font-size:17px">签约价锁定</div><div class="s-foot">不受市价上涨影响</div></div><div class="stat-card"><div class="s-label">赔付条款</div><div class="s-value" style="font-size:17px">可用性<99.9% → 3×</div><div class="s-foot">按故障时长赔付</div></div></div>',{cls:''})}
</div>`
});

/* ================= M2 闲散算力市场 ================= */
PAGES['m2/spot']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['算力交易','#/m2/pro'],['闲散算力市场']],title:'闲散算力市场 · 现货',mod:'M2-02',desc:'企业闲置服务器、个人工作站、消费级 GPU 即插即卖：供给 Agent 自动上报遥测并接单，按卡时现货挂价（云厂商 3–7 折），就近/低价/冗余调度，尽力而为级 SLA。',actions:`<button class="btn btn-primary" onclick="UI.toast('Agent 安装包已开始下载（演示）')">供给方接入 Agent</button>`})}
<div class="g4 mb16">
  ${statCard({label:'在线供给节点',value:'3,847',foot:'心跳≤6s',trend:3.2})}
  ${statCard({label:'现货均价',value:'¥5.8/卡时',foot:'云厂商 3–7 折',trend:-1.6})}
  ${statCard({label:'今日已调度',value:'12.6万卡时',foot:'断点续跑中 214 任务',trend:5.1})}
  ${statCard({label:'冗余校验通过率',value:'99.2%',foot:'多节点交叉验证',trend:0.2})}
</div>
${panel('现货挂单 · 实时遥测',`
<div class="table-wrap"><table class="tbl">
<thead><tr><th>GPU</th><th>供给方</th><th>实时利用率</th><th>卡时价</th><th>vs 云价</th><th>时延</th><th>在线时长</th><th>完成任务</th><th>状态</th><th>操作</th></tr></thead>
<tbody>${D.spotGpus.map(g=>`<tr>
  <td class="cell-main">${g.gpu}</td>
  <td class="dim">${g.owner}</td>
  <td>${utilBar(g.util)}</td>
  <td class="num" style="color:var(--mint)">¥${g.price.toFixed(1)}/h</td>
  <td><span class="badge b-cyan">${g.discount}</span></td>
  <td class="num dim">${g.lat}ms</td>
  <td class="num dim">${g.uptime}</td>
  <td class="num dim">${g.tasks}</td>
  <td>${badge(g.status,g.status==='接单中'?'mint':'gold')}</td>
  <td><button class="btn btn-primary btn-sm" onclick="UI.toast('任务已派发 · 冗余调度已启用（演示）')">派发任务</button></td>
</tr>`).join('')}</tbody></table></div>`,{cls:'corner hi',sub:'调度策略：就近 / 低价 / 多节点冗余 · 断点续跑'})}
<div class="g23 mt16">
${panel('供给方接入向导 · Agent 部署',`<div class="small dim" style="line-height:2">${D.agentSteps.map((s,i)=>`<b style="color:var(--mint);font-family:var(--f-mono)">0${i+1}</b>　${s}`).join('<br/>')}</div><div class="code-block mt16" style="background:var(--bg0);border:1px solid var(--line);border-radius:5px;padding:14px;font-family:var(--f-mono);font-size:11.5px;color:#8fe6c5;line-height:1.8">curl -fsSL https://get.computenest.dev/agent | sh -s -- --token=CN-xxxx<br/># 自动上报 GPU/显存/利用率遥测 · 心跳≤6s · 自动接单</div><button class="btn btn-primary mt16" onclick="UI.toast('接入向导已打开（演示）')">开始接入</button>`,{cls:''})}
${panel('计量改造 · 收益模型','<div class="kv" style="grid-template-columns:110px 1fr"><span class="k">闲散定价</span><span class="v">云厂商 3–7 折 · 现货挂价</span><span class="k">平台抽成</span><span class="v">8–15%（含调度/计量/冗余）</span><span class="k">结算周期</span><span class="v">T+7 自动结算</span><span class="k">典型月收益</span><span class="v">4090 全月满载 ≈ ¥2,400</span></div>',{cls:'gold-c gold'})}
</div>
</div>`,
after(){UI.animateUtils()}
});

/* ================= M2 TOKEN 商城 ================= */
PAGES['m2/token']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['算力交易','#/m2/pro'],['TOKEN 商城']],title:'TOKEN 商城 · 模型馆',mod:'M2-03',desc:'token 预付费卡/额度包：平台聚合采购主流模型与自部署推理资源零售 token 包；统一计量网关按输入/输出/缓存读取分开计价。',actions:`<button class="btn btn-ghost">API 文档</button>`})}
<div class="filter-bar">
  <span class="f-label">排序</span><button class="chip active">智能指数</button><button class="chip">价格低→高</button><button class="chip">调用量</button>
  <span class="f-label" style="margin-left:14px">筛选</span><button class="chip active">全部</button><button class="chip">深度思考</button><button class="chip">开源权重</button><button class="chip">极速</button>
</div>
<div class="g4">
${D.tokenModels.map(m=>`
<div class="product-card">
  <div class="pc-head">
    <div><div class="pc-title">${m.model}</div><div class="pc-sub">${m.vendor} · ctx ${m.ctx}</div></div>
    <div style="text-align:center"><div class="big-num" style="font-size:22px;font-weight:700;color:var(--mint)">${m.idx}</div><div class="small dim2">智能指数</div></div>
  </div>
  <div class="pc-specs">${m.tags.map(t=>`<span class="spec-pill">${t}</span>`).join('')}<span class="spec-pill">日调用 ${m.today}</span></div>
  <div style="margin-top:auto;padding-top:10px;border-top:1px solid var(--line)">
    <div class="flex between small"><span class="dim2">输入</span><b class="mono">¥${m.input.toFixed(2)}/M</b></div>
    <div class="flex between small mt8"><span class="dim2">输出</span><b class="mono" style="color:var(--mint)">¥${m.output.toFixed(2)}/M</b></div>
    <div class="flex between small mt8"><span class="dim2">缓存读取</span><b class="mono" style="color:var(--cyan)">¥${m.cache.toFixed(2)}/M</b></div>
  </div>
  <button class="btn btn-primary btn-sm" style="width:100%;justify-content:center" onclick="UI.toast('Token 包购买流程已打开（演示）')">购买 Token 包</button>
</div>`).join('')}
</div>
<div class="g32 mt24">
${panel('Token 包 · 阶梯定价','<div class="g3">'+D.tokenPackages.map(p=>`
  <div class="stat-card" style="${p.best?'border-color:rgba(0,224,154,.45);box-shadow:0 0 24px rgba(0,224,154,.1)':''}">
    ${p.best?'<span class="badge b-mint" style="position:absolute;top:12px;right:12px">最热门</span>':''}
    <div class="s-label">DeepSeek-V3.2 输出额度</div>
    <div class="s-value" style="font-size:20px">${p.size}</div>
    <div class="s-foot"><b style="color:var(--txt)" class="mono">${yuan(p.price)}</b> · 合 ${p.perM}元/M · <span class="up">${p.off}</span></div>
  </div>`).join('')+'</div><div class="small dim2 mt16">* 额度 12 个月有效 · 输入/缓存读取按模型牌价另计 · 缓存命中差异化计费自动生效</div>',{cls:'corner hi',sub:'token 预付费卡 · 预售远期产能可享折扣价锁定'})}
<div>
${panel('API Key 管理 · M2-03',`<div class="table-wrap"><table class="tbl" style="min-width:0"><tbody>${D.apiKeys.map(k=>`<tr>
  <td><div class="cell-main mono" style="font-size:12px">${k.name}</div><div class="cell-sub">${k.model} · 创建 ${k.created}</div></td>
  <td><div class="bar-label"><span>额度</span><b>${k.used}</b></div><div class="progress ${parseInt(k.used)>80?'warn':''}"><div class="pf" style="width:${k.used}"></div></div></td>
  <td>${badge(k.status,k.status==='启用'?'mint':'gray')}</td>
  <td><button class="btn btn-ghost btn-sm" onclick="UI.toast('密钥已轮换（演示）')">轮换</button></td>
</tr>`).join('')}</tbody></table></div><button class="btn btn-primary btn-sm mt16" onclick="UI.toast('新 API Key 已生成（演示）')">＋ 创建 API Key</button>`,{cls:''})}
${panel('token 预售与远期',`<div class="small dim" style="line-height:2">推理服务商可<b style="color:var(--txt)">预售未来 token 产能</b>（折扣价锁定），平台提供交割核销；大额产能远期合约可对接 M3 应收保理。</div><button class="btn btn-gold mt16" onclick="UI.toast('远期产能预售已挂出（演示）')">挂出产能预售</button>`,{cls:'gold-c gold'})}
</div>
</div>
</div>`
});

/* ================= M2 推理竞价场 ================= */
PAGES['m2/bid']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['算力交易','#/m2/pro'],['推理竞价场']],title:'推理竞价场',mod:'M2-04',desc:'同任务规格由多家推理供给方报价抢单，按「每百万 token 价格」比价成交；统一计量网关验证质量（延迟/成功率）后交割。',actions:`<button class="btn btn-primary" onclick="UI.toast('任务规格发布向导已打开（演示）')">发布任务规格</button>`})}
<div class="g2">
${D.bidTasks.map(b=>`
<div class="auction-card corner">
  <div class="flex between mb8"><span class="mono dim2 small">${b.id}</span><span class="countdown" data-cd="${b.ends}"></span></div>
  <div style="font-size:14.5px;font-weight:700;line-height:1.5">${b.spec}</div>
  <div class="small dim2 mt8">日规模 ${b.daily}</div>
  <div class="flex between mt16" style="border-top:1px solid var(--line);padding-top:12px">
    <div><div class="small dim2">当前最低价</div><div class="auc-price" style="color:var(--mint)">¥${b.lowest.toFixed(2)}/M</div></div>
    <div style="text-align:right"><div class="small dim2">${b.benchmark}</div><div class="badge b-mint mt8">低 ${(1-b.lowest/parseFloat(b.benchmark.replace(/[^\d.]/g,''))*100).toFixed(0)}%</div></div>
    <div style="text-align:right"><div class="small dim2">抢单供给方</div><div class="big-num" style="font-size:22px;font-weight:700">${b.bidders}<span class="small dim2" style="font-weight:400"> 家</span></div></div>
  </div>
  <button class="btn btn-primary btn-sm mt16" style="width:100%;justify-content:center" onclick="UI.toast('报价已提交 · 等待计量网关验证（演示）')">我是供给方 · 抢单报价</button>
</div>`).join('')}
</div>
${panel('竞价机制说明','<div class="g4"><div class="stat-card"><div class="s-label">规格模板化</div><div class="s-value" style="font-size:16px">模型/精度/ctx 统一</div><div class="s-foot">消除规格歧义</div></div><div class="stat-card"><div class="s-label">质量验证</div><div class="s-value" style="font-size:16px">延迟/成功率达标</div><div class="s-foot">计量网关自动校验</div></div><div class="stat-card"><div class="s-label">交割方式</div><div class="s-value" style="font-size:16px">按实际 tokens 核销</div><div class="s-foot">断点自动切换备选方</div></div><div class="stat-card"><div class="s-label">较市价节省</div><div class="s-value" style="font-size:16px">12–25%</div><div class="s-foot">多供给方比价</div></div></div>',{cls:''})}
</div>`,
after(){UI.tickCountdowns()}
});

/* ================= M2 计量计费中心 ================= */
PAGES['m2/billing']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['算力交易','#/m2/pro'],['计量计费中心']],title:'计量计费中心',mod:'M2-05',desc:'统一计量网关：卡时/机时/tokens 多计费单位 · 缓存命中差异化计费 · 阶梯与峰谷价 · 调用日志与 tokens 计数透明可查。'})}
<div class="g4 mb16">
  ${statCard({label:'本月应付（预估）',value:yuan(D.billingSummary.payable),foot:'含阶梯折扣 -6%',trend:-2.1})}
  ${statCard({label:'月度卡时消耗',value:'280,860',foot:'长约占 66%',trend:4.4})}
  ${statCard({label:'月度 TOKEN 消耗',value:'9.96B',foot:'缓存命中率 71%',trend:9.8})}
  ${statCard({label:'成本优化',value:'¥21,700',foot:'峰谷调度+缓存优化',trend:12.6})}
</div>
${panel('计费明细 · 2026-09',`
<div class="table-wrap"><table class="tbl">
<thead><tr><th>资源/服务</th><th>计费单位</th><th>用量</th><th>单价</th><th>金额分摊</th><th>缓存命中</th></tr></thead>
<tbody>${D.billingSummary.items.map(i=>`<tr>
  <td class="cell-main">${i.name}</td><td>${badge(i.unit,i.unit==='M tokens'?'purple':'blue')}</td>
  <td class="num">${i.usage}</td><td class="num dim">${i.price}</td><td class="num" style="color:var(--mint)">按月结算</td><td class="dim">${i.cache}</td>
</tr>`).join('')}</tbody></table></div>`,{cls:'corner hi',sub:'日级对账 · 异常用量自动告警'})}
<div class="g3 mt16">
${panel('峰谷定价','<div class="flex" style="justify-content:space-around"><div style="text-align:center"><div class="big-num" style="font-size:26px;color:var(--gold)">1.2×</div><div class="small dim2">峰时 09–21</div></div><div style="text-align:center"><div class="big-num" style="font-size:26px">1.0×</div><div class="small dim2">平时</div></div><div style="text-align:center"><div class="big-num" style="font-size:26px;color:var(--mint)">0.65×</div><div class="small dim2">谷时 00–07</div></div></div>',{cls:''})}
${panel('阶梯折扣','<div class="tl"><div class="tl-item done"><div class="t-tit">月耗 <¥10万 · 标准价</div></div><div class="tl-item done"><div class="t-tit">¥10–50万 · 9折</div></div><div class="tl-item cur"><div class="t-tit">¥50万+ · 8折 + 专属调度</div></div></div>',{cls:''})}
${panel('缓存差异化计费','<div class="small dim" style="line-height:2">缓存命中输入价 <b style="color:var(--cyan)">低至牌价 1/25</b><br/>批量批处理通道 <b style="color:var(--txt)">再享 7 折</b><br/>上月缓存命中节省 <b class="mono" style="color:var(--mint)">¥8,420</b></div>',{cls:''})}
</div>
</div>`
});

/* ================= M2 SLA 监控看板 ================= */
PAGES['m2/sla']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['算力交易','#/m2/pro'],['SLA 监控看板']],title:'SLA 监控看板',mod:'M2-08',desc:'集群压测报告（实测算力/线性扩展率）· SLA 实时监控 · 故障赔付自动计算。'})}
<div class="g4 mb16">
  ${statCard({label:'平台级可用性（30日）',value:'99.86%',foot:'加权平均',trend:0.05})}
  ${statCard({label:'本季故障事件',value:'12',foot:'触发赔付 2 起',trend:-28.6})}
  ${statCard({label:'自动赔付到账',value:yuan(84600),foot:'T+3 自动执行',trend:0})}
  ${statCard({label:'在监集群',value:'6',unit:'个',foot:'遥测指标 42 项/分钟'})}
</div>
<div class="g32">
${panel('SLA 达标情况 · 分层',`
<div class="table-wrap"><table class="tbl">
<thead><tr><th>SLA 层级</th><th>实际可用性</th><th>目标</th><th>达标</th><th>季度事件</th><th>累计赔付</th></tr></thead>
<tbody>${D.slaStats.map(s=>`<tr>
  <td><b>${s.tier}</b></td>
  <td class="num" style="color:${parseFloat(s.avail)>=parseFloat(s.target)?'var(--up)':'var(--gold)'}">${s.avail}%</td>
  <td class="num dim">${s.target}</td>
  <td>${parseFloat(s.avail)>=parseFloat(s.target)?badge('达标','mint'):badge('关注','gold')}</td>
  <td class="num">${s.incidents}</td><td class="num">${yuan(s.paid)}</td>
</tr>`).join('')}</tbody></table></div>`,{cls:'corner hi'})}
<div>
${panel('集群压测报告 · 最新',lineChart([
  {name:'实测线性扩展率',data:[100,96.5,92.8,88.1,84.2,81.5,79.2,77.8,76.1,74.9]},
  {name:'行业基准',data:[100,93,86,80,75,70,66,62,59,56],dash:true}
],{w:400,h:200,xLabels:['8','32','64','128','256','512','1k','2k','4k','8k'].map(x=>x+'卡'),yFmt:v=>v+'%',yMin:50,yMax:105}),{sub:'华北千卡集群 · 8→8192卡 · IB 400G'})}
</div>
</div>
${panel('故障事件与赔付 · 自动计算',`
<div class="table-wrap"><table class="tbl">
<thead><tr><th>事件号</th><th>资源</th><th>类型</th><th>影响</th><th>赔付金额</th><th>状态</th><th>时间</th></tr></thead>
<tbody>${D.slaIncidents.map(i=>`<tr>
  <td class="num dim">${i.id}</td><td class="cell-main">${i.res}</td><td class="dim">${i.type}</td>
  <td>${badge(i.impact,i.comp?'gold':'gray')}</td><td class="num">${i.comp?yuan(i.comp):'—'}</td>
  <td>${badge(i.status,i.status.includes('赔付')?'mint':'gray')}</td><td class="dim2 small">${i.time}</td>
</tr>`).join('')}</tbody></table></div>`,{sub:'赔付系数：白金3× / 金2× · 尽力而为豁免'})}
</div>`
});

})();
