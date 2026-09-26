/* ============ 页面：M3 金融 / M4 处置 / M5 方案 / 运营后台 ============ */
window.PAGES=window.PAGES||{};
(function(){
const {fmt,yuan,pct,chgTxt,badge,levelBadge,chBadge,panel,spark,lineChart,stepper,flowStrip,statCard,ltvGauge,iconSvg,secHead,pageHead}=UI;
const D=DATA;

/* ================= M3 金融超市 ================= */
PAGES['m3']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['金融服务中心','#/m3'],['金融超市']],title:'金融超市',mod:'M3-01/02',desc:'把「设备信用」从主体信用中独立出来：估值（残值曲线）→ 押品登记（人行动产统一登记）→ 贷后监控（算力遥测）→ 处置出口（三通道）。',actions:`<a class="btn btn-primary" href="#/m3/apply">一键融资申请</a><a class="btn btn-gold" href="#/m4/bank">资金方入驻</a>`})}
<div class="g4 mb16">
  ${D.finStats.map(s=>statCard({label:s.label,value:s.value,unit:s.unit})).join('')}
</div>
${panel('资产信用四层支撑','<div style="padding:6px 0">'+flowStrip(D.finFlow,0)+'</div><div class="g4 mt24">'+[
  ['估值',iconSvg('chart'),'平台成交价中位数 × 状态系数 × 流动性系数'],
  ['登记',iconSvg('shield'),'人行动产融资统一登记 · 状态与设备档案绑定'],
  ['监控',iconSvg('radar'),'利用率/上架率/租金回收 遥测 · 阈值自动预警'],
  ['处置',iconSvg('scale'),'T1/T2/T3 三通道 · 处置能力就是授信能力'],
].map(x=>`<div class="stat-card"><div class="s-label">${x[1]} ${x[0]}</div><div class="small dim2" style="line-height:1.8;margin-top:8px">${x[2]}</div></div>`).join('')+'</div>',{cls:'corner hi'})}
<div class="sec-head" style="margin-top:36px"><div class="sec-tit gold">资金方货架</div><div class="sec-sub">银行 · 金租 · 保理 · 保险 · 券商/资管</div></div>
<div class="g3">
${D.finProducts.map(p=>`
<div class="product-card">
  <div class="pc-head"><div><div class="pc-title">${p.type}</div><div class="pc-sub">${p.org}</div></div>${p.hot?badge('主推','gold'):''}</div>
  <div class="pc-specs"><span class="spec-pill" style="color:var(--mint);border-color:rgba(0,224,154,.4)">${p.rate}</span><span class="spec-pill">${p.ltv}</span><span class="spec-pill">${p.term}</span></div>
  <div class="small dim2" style="min-height:34px;line-height:1.7;margin-top:4px">${p.note}</div>
  <div class="flex between" style="margin-top:auto;border-top:1px solid var(--line);padding-top:12px">
    <span class="small dim2">额度充足 · 3日放款</span>
    <button class="btn btn-gold btn-sm" onclick="UI.toast('申请已提交至${p.org}（演示）')">申请</button>
  </div>
</div>`).join('')}
</div>
<div class="g3 mt16">
${panel('回购承诺增信','<div class="small dim" style="line-height:2">平台/生态方对指定 SKU 出具<b style="color:var(--txt)">回购价承诺</b>（对标英伟达残值保证模式），覆盖 H100/H200/910B 主流 SKU，银行放款率可上浮 5–10pct。</div>',{cls:'gold-c gold'})}
${panel('算力收益权 ABS/RWA（预留）','<div class="small dim" style="line-height:2">一期对接 ABS：SPV 打包<b style="color:var(--txt)">已签长约算力收益权</b>；二期预留香港 RWA 通道，仅在合规沙箱内对合格机构投资者开放。</div><div class="mt16">'+badge('二期占位','gray')+' '+badge('M3-07','blue')+'</div>',{cls:''})}
${panel('禁投红线','<div class="small dim" style="line-height:2">仅覆盖<b style="color:var(--txt)">已签合同应收</b>；<span style="color:var(--down)">禁止以预期现货需求支持长期债务</span>；应收保理须逐笔核验合同与计量流水。</div>',{cls:''})}
</div>
</div>`
});

/* ================= M3 融资申请 ================= */
PAGES['m3/apply']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['金融服务','#/m3'],['融资申请']],title:'融资申请 · 一键授权',mod:'M3-01',desc:'授权平台将「设备档案 + 成交数据 + 算力合同」打包生成融资申请包，推送多家资金方抢单或定向邀约。'})}
<div class="panel corner hi mb16">
  <div class="panel-h"><div class="p-title"><i>▸</i>授权流程</div></div>
  <div class="panel-b">${stepper(['选择资产','授权数据','生成申请包','推送资金方'],1)}</div>
</div>
<div class="g32">
<div>
${panel('第一步 · 选择纳入授信的资产',`
<div class="table-wrap"><table class="tbl">
<thead><tr><th></th><th>资产</th><th>平台估值</th><th>状态系数</th><th>建议放款率</th><th>可贷额度</th></tr></thead>
<tbody>${D.collaterals.slice(0,4).map((c,i)=>`<tr>
  <td><input type="checkbox" ${i<3?'checked':''} style="accent-color:var(--mint)"/></td>
  <td><div class="cell-main">${c.sku}</div><div class="cell-sub">${c.id} · ${c.bank}在押</div></td>
  <td class="num">${yuan(c.appraisal)}</td>
  <td>${badge('×0.92','gray')}</td>
  <td class="num" style="color:var(--gold)">≤65%</td>
  <td class="num" style="color:var(--mint)">${yuan(Math.round(c.appraisal*0.92*0.65))}</td>
</tr>`).join('')}</tbody></table></div>`,{sub:'估值 = 平台成交价中位数 × 状态系数 × 流动性系数'})}
${panel('第二步 · 授权数据范围',`<div class="kv" style="grid-template-columns:170px 1fr">
  <span class="k">设备健康档案</span><span class="v">${badge('已授权','mint')} 一机一档 · 检测/维修/过户全记录</span>
  <span class="k">成交价数据</span><span class="v">${badge('已授权','mint')} 脱敏成交样本 · SKU中位数</span>
  <span class="k">算力合同</span><span class="v">${badge('已授权','mint')} 3份闭口长约 · 年化现金流 ¥1,840万</span>
  <span class="k">遥测数据</span><span class="v">${badge('已授权','mint')} 贷后监控（M3-04）持续接入</span>
  <span class="k">残值曲线引用</span><span class="v">${badge('API引用','blue')} 银行侧实时调用</span>
</div><button class="btn btn-primary mt16" onclick="UI.toast('融资申请包已生成并推送 6 家资金方（演示）')">生成申请包 · 推送资金方</button>`,{cls:'corner hi'})}
</div>
<div>
${panel('生成预览 · 融资申请包',`<div class="kv" style="grid-template-columns:110px 1fr">
  <span class="k">申请额度</span><span class="v big-num" style="font-size:18px;color:var(--gold)">¥1.42亿</span>
  <span class="k">押品估值合计</span><span class="v">${yuan(184000000)}</span>
  <span class="k">组合LTV</span><span class="v">${ltvGauge(58)}</span>
  <span class="k">风险评级</span><span class="v">${badge('AA- 设备维度 / A 主体维度','mint')}</span>
  <span class="k">资金方</span><span class="v">中原银行 · 国银金租 · 招银金租</span>
  <span class="k">预计放款</span><span class="v">3个工作日（评估复核后）</span>
</div>`,{cls:'gold-c gold'})}
${panel('三维风险评级 · M3-05','<div>'+[['设备维度',88,'SKU残值曲线 + 流动性评分'],['主体维度',76,'经营流水 + 信用记录'],['合同维度',92,'闭口长约 + 保底量覆盖']].map(r=>`<div style="margin-bottom:13px"><div class="bar-label"><span>${r[0]}</span><b>${r[1]}/100</b></div><div class="progress ${r[1]>=85?'':r[1]>=75?'warn':'danger'}"><div class="pf" style="width:${r[1]}%"></div></div><div class="small dim2" style="margin-top:4px">${r[2]}</div></div>`).join('')+'</div>',{cls:''})}
</div>
</div>
</div>`
});

/* ================= M3 贷后监控台 ================= */
PAGES['m3/monitor']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['金融服务','#/m3'],['贷后监控台']],title:'贷后监控台',mod:'M3-04',desc:'接入算力遥测：利用率、上架率、租金回收、合同履约；指标跌破阈值自动预警推送资金方（日级 T+1）。',actions:`<button class="btn btn-ghost" onclick="UI.toast('监控日报已推送 6 家资金方（演示）')">推送日报</button>`})}
<div class="g4 mb16">
  ${statCard({label:'在贷笔数',value:'14',unit:'笔',foot:'余额 ¥11.2亿'})}
  ${statCard({label:'组合 LTV',value:'64.8',unit:'%',foot:'阈值 75%',trend:0.9})}
  ${statCard({label:'平均利用率',value:'71.4%',foot:'环比',trend:-2.2})}
  ${statCard({label:'活跃预警',value:'4',unit:'条',foot:'关注2 · 可疑1 · 违约1',trend:1})}
</div>
${panel('在贷项目 · 遥测监控',`
<div class="table-wrap"><table class="tbl">
<thead><tr><th>贷款编号</th><th>借款人</th><th>押品</th><th>在贷余额</th><th>LTV</th><th>算力利用率</th><th>租金回收</th><th>级别</th><th>预警</th></tr></thead>
<tbody>${D.loans.map(l=>`<tr>
  <td class="num dim">${l.id}</td>
  <td><div class="cell-main">${l.borrower}</div><div class="cell-sub">${l.collateral}</div></td>
  <td class="dim">${l.collateral}</td>
  <td class="num">${l.balance}</td>
  <td>${ltvGauge(l.ltv)}</td>
  <td>${UI.utilBar(l.util)}</td>
  <td>${l.rent==='正常'?badge('正常','mint'):badge(l.rent,l.rent.includes('60')?'red':'gold')}</td>
  <td>${levelBadge(l.level)}</td>
  <td class="small dim2">${l.note||'—'}</td>
</tr>`).join('')}</tbody></table></div>`,{cls:'corner hi',sub:'遥测指标 42 项/日 · 跌破阈值自动推送资金方'})}
<div class="g3 mt16">
${panel('重估与补充担保','<div class="small dim" style="line-height:2">押品价值<b style="color:var(--txt)">月度/季度自动重估</b>（对标国际按季下调押品估值表）；LTV 超限自动通知补充担保，市价跌幅超 X% 触发临时重估。</div>',{cls:''})}
${panel('断租损失险联动','<div class="small dim" style="line-height:2">租金回收逾期触发<b style="color:var(--txt)">断租损失险</b>理赔（M3 保险超市），最高覆盖 3 期租金，缓解资金方现金流风险。</div>',{cls:''})}
${panel('处置预案就绪','<div class="small dim" style="line-height:2">违约贷款<b style="color:var(--txt)">一键转入 M4 处置工作台</b>：估值引擎按 SKU 流动性自动推荐 T1/T2/T3 通道。</div><a class="btn btn-gold mt16" href="#/m4/workbench">进入处置工作台</a>',{cls:'gold-c gold'})}
</div>
</div>`,
after(){UI.animateUtils()}
});

/* ================= M4 押品库总览 ================= */
PAGES['m4/collaterals']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['处置中心','#/m4/collaterals'],['押品库']],title:'押品库',mod:'M4-01/02',desc:'押品建档：型号/序列号/SKU/批组/机房位置/访问凭证（托管）→ 统一押品 ID；入库评估、月度/季度自动重估、LTV 看板。',actions:`<button class="btn btn-primary" onclick="UI.toast('押品建档向导已打开（演示）')">押品建档</button><a class="btn btn-gold" href="#/m4/alerts">违约预警中心</a>`})}
<div class="g4 mb16">
  ${statCard({label:'在管押品',value:'126',unit:'笔',foot:'押品总卡数 6.4万'})}
  ${statCard({label:'押品总值（评估）',value:'¥21.3',unit:'亿',foot:'市值 ¥19.8亿',trend:-1.2})}
  ${statCard({label:'组合 LTV',value:'62.1',unit:'%',foot:'安全线 75%',trend:0.6})}
  ${statCard({label:'登记/保险完备率',value:'98.4%',foot:'1笔登记中'})}
</div>
${panel('押品总览 · 登记/保险/托管状态',`
<div class="table-wrap"><table class="tbl">
<thead><tr><th>押品ID</th><th>标的</th><th>评估价</th><th>市值</th><th>LTV</th><th>债权方</th><th>人行登记</th><th>保险</th><th>托管位置</th><th>状态</th></tr></thead>
<tbody>${D.collaterals.map(c=>`<tr>
  <td class="num dim">${c.id}</td>
  <td class="cell-main">${c.sku}</td>
  <td class="num">${yuan(c.appraisal)}</td>
  <td class="num dim">${yuan(c.market)}</td>
  <td>${ltvGauge(c.ltv)}</td>
  <td class="dim">${c.bank}</td>
  <td>${badge(c.reg,c.reg==='已登记'?'mint':'gold')}</td>
  <td>${badge(c.ins,c.ins==='已投保'?'mint':'gold')}</td>
  <td class="dim2 small">${c.loc}</td>
  <td>${levelBadge(c.level)}</td>
</tr>`).join('')}</tbody></table></div>`,{cls:'corner hi',sub:'访问凭证加密托管 · 一机一档（序列号贯穿全生命周期）'})}
<div class="g3 mt16">
${panel('入库评估公式','<div class="code-block" style="background:var(--bg0);border:1px solid var(--line);border-radius:5px;padding:14px;font-family:var(--f-mono);font-size:12px;color:#8fe6c5;line-height:1.9">评估价 = 平台成交价中位数 × 状态系数<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; × 流动性系数<br/>附：残值曲线 + 处置预估周期</div>',{cls:''})}
${panel('重估节奏','<div class="kv" style="grid-template-columns:110px 1fr"><span class="k">常规节奏</span><span class="v">月度快估 / 季度全量</span><span class="k">触发式</span><span class="v">市价跌幅>5% 或 预警升级</span><span class="k">输出</span><span class="v">LTV 看板 + 补充担保通知</span></div>',{cls:''})}
${panel('绿色通道协议','<div class="small dim" style="line-height:2">律所/公证/机房托管方<b style="color:var(--txt)">预设协议</b>：step-in 介入权 · 远程锁定技术手段——保证接管无纠纷、数据可清除、过户无障碍。</div>',{cls:'gold-c gold'})}
</div>
</div>`
});

/* ================= M4 违约预警中心 ================= */
PAGES['m4/alerts']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['处置中心','#/m4/collaterals'],['违约预警中心']],title:'违约预警中心',mod:'M4-03',desc:'多源预警（遥测/回款/市价）· 分级预警（关注/可疑/违约）· 处置建议自动生成。',actions:`<button class="btn btn-primary" onclick="UI.toast('预警规则配置已打开（演示）')">预警规则</button><a class="btn btn-gold" href="#/m4/workbench">处置工作台</a>`})}
<div class="g4 mb16">
  ${statCard({label:'今日新增预警',value:'4',unit:'条',foot:'推送资金方 ≤1s'})}
  ${statCard({label:'关注级',value:'2',unit:'条',foot:'持续观察'})}
  ${statCard({label:'可疑级',value:'1',unit:'条',foot:'建议重估/尽调'})}
  ${statCard({label:'违约级',value:'1',unit:'条',foot:'建议立即处置',trend:1})}
</div>
<div class="g2" style="grid-template-columns:1.5fr 1fr">
<div>
${D.alerts.map(a=>`
<div class="alert-row lv-${a.level}">
  <div style="min-width:76px">${levelBadge(a.level)}<div class="small dim2 mono" style="margin-top:6px">${a.id}</div></div>
  <div class="grow">
    <div style="font-weight:500">${a.target}</div>
    <div class="small dim" style="margin-top:4px;line-height:1.7">${a.desc}</div>
    <div class="flex mt8" style="gap:6px;flex-wrap:wrap">${a.sources.map(s=>badge(s,'gray')).join('')}</div>
    <div class="small mt8" style="color:${a.level==='违约'?'var(--down)':'var(--gold)'}">▸ ${a.suggest}</div>
  </div>
  <div class="small dim2" style="text-align:right;min-width:96px">${a.time}<br/><br/><button class="btn ${a.level==='违约'?'btn-gold':'btn-ghost'} btn-sm" onclick="UI.toast('已${a.level==='违约'?'启动处置流程':'推送资金方'}（演示）')">${a.level==='违约'?'启动处置':'推送'}</button></div>
</div>`).join('')}
</div>
<div>
${panel('预警规则引擎','<div class="kv" style="grid-template-columns:140px 1fr"><span class="k">利用率</span><span class="v">连续N日 < 50% → 关注</span><span class="k">上架率</span><span class="v">跌破 70% → 关注</span><span class="k">租金</span><span class="v">逾期 1期 → 关注 · 3期 → 可疑</span><span class="k">市价</span><span class="v">30日跌幅 > 5% → 触发重估</span><span class="k">LTV</span><span class="v">> 75% → 补充担保通知</span><span class="k">综合</span><span class="v">逾期60日 → 违约</span></div>',{cls:'corner hi'})}
${panel('预警→处置联动',`<div class="tl">
  <div class="tl-item done"><div class="t-tit">预警触发</div><div class="t-des">多源指标交叉验证 · 去噪</div></div>
  <div class="tl-item done"><div class="t-tit">分级推送</div><div class="t-des">资金方收件箱 · 银行端门户</div></div>
  <div class="tl-item cur"><div class="t-tit">处置建议</div><div class="t-des">估值引擎按 SKU 流动性推荐 T1/T2/T3</div></div>
  <div class="tl-item"><div class="t-tit">债权方确认</div><div class="t-des">一键启动处置流程引擎</div></div>
</div>`,{cls:'gold-c gold'})}
</div>
</div>
</div>`
});

/* ================= M4 处置工作台 ================= */
PAGES['m4/workbench']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['处置中心','#/m4/collaterals'],['处置工作台']],title:'处置工作台',mod:'M4-04',desc:'通道选择建议（T1/T2/T3）· 处置流程引擎（接管→检测→数据清除→挂牌→成交→过户）· 资金监管清分 · 全流程留痕。',actions:`<button class="btn btn-gold" onclick="UI.toast('处置报告已生成并归档（演示）')">生成处置报告</button>`})}
<div class="g3 mb16">
${D.channels.map(ch=>`
<div class="channel-card t${ch.code[1]} corner">
  <div class="ch-days">${ch.days}</div>
  <div class="ch-code">${ch.code}</div>
  <div style="font-size:15px;font-weight:700;margin-top:4px">${ch.name}</div>
  <div class="small dim2 mt8" style="line-height:1.75">${ch.desc}</div>
  <div class="flex between mt8"><span class="dim2 small">适用：${ch.fit}</span><span class="badge b-gold">${ch.fee}</span></div>
</div>`).join('')}
</div>
${panel('处置案件 · 流程引擎',`
<div style="margin-bottom:18px">${flowStrip(D.disposalSteps,-1)}</div>
<div class="table-wrap"><table class="tbl">
<thead><tr><th>案件号</th><th>标的</th><th>通道</th><th>评估价</th><th>进度</th><th>时效</th><th>买方/方式</th><th>资金</th></tr></thead>
<tbody>${D.disposals.map(dp=>`<tr>
  <td class="num dim">${dp.id}</td>
  <td class="cell-main">${dp.sku}</td>
  <td>${chBadge(dp.channel)}</td>
  <td class="num">${yuan(dp.appraisal)}</td>
  <td style="min-width:210px">${flowStrip(D.disposalSteps,dp.step)}</td>
  <td><span class="mono ${dp.expect==='已完成'?'up':''}">${dp.expect}</span></td>
  <td class="dim small">${dp.buyer}</td>
  <td class="dim small">${dp.fund}</td>
</tr>`).join('')}</tbody></table></div>`,{cls:'corner hi',sub:'接管（远程锁定/现场封存 · 介入权预设协议）→ 检测 → 数据清除 → 挂牌 → 成交 → 过户（复用M1流程）'})}
<div class="g3 mt16">
${panel('资金监管与清分 · M4-06','<div class="tl"><div class="tl-item done"><div class="t-tit">成交款入共管监管账户</div></div><div class="tl-item done"><div class="t-tit">按合同顺序分配</div><div class="t-des">本金 → 罚息 → 费用 → 余额返还借款人</div></div><div class="tl-item cur"><div class="t-tit">凭证生成 · 全程可追溯</div></div></div>',{cls:''})}
${panel('处置差价险理赔','<div class="small dim" style="line-height:2">处置成交价低于评估值的差额，由<b style="color:var(--txt)">处置差价险</b>赔付（M3-08），显著提升银行放款意愿。</div><div class="mt16">'+badge('试点赔付 ¥84万','gold')+'</div>',{cls:'gold-c gold'})}
${panel('处置报告 · M4-07',`<div class="small dim" style="line-height:2">全流程<b style="color:var(--txt)">时间戳存证</b>；一键生成 PDF《处置报告》供银行内部审计与监管报送。</div><button class="btn btn-primary mt16" onclick="UI.toast('《处置报告》PDF 已生成（演示）')">一键生成 PDF</button>`,{cls:''})}
</div>
<div class="panel corner hi mt16">
  <div class="panel-h"><div class="p-title"><i>◈</i>反向赋能 · 数据回流</div><div class="p-sub">处置产生的成交数据回流价格指数 → 银行因处置通道存在而提高放款意愿与放款率</div></div>
  <div class="panel-b"><div class="g4">
    ${statCard({label:'处置资产回流交易市场率',value:'60.8%',foot:'P3目标 ≥60% 达成',trend:1.4})}
    ${statCard({label:'平均回收率/评估价',value:'94.1%',foot:'T1通道 95.2%',trend:0.6})}
    ${statCard({label:'T1 平均时效',value:'5.4',unit:'天',foot:'SLA ≤7天',trend:-8.2})}
    ${statCard({label:'因处置通道上浮放款率',value:'+8.4',unit:'pct',foot:'合作银行样本',trend:0.9})}
  </div></div>
</div>
</div>`
});

/* ================= M4 银行押品拍卖专场（买家端） ================= */
PAGES['m4/auctions']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['处置中心','#/m4/collaterals'],['押品拍卖专场']],title:'银行押品专场 · 买家端',mod:'M4-05',desc:'面向买家的独立入口：银行/金租/AMC 押品资产，与二手市场互通展示；检测报告已披露、数据清除认证已附、过户无障碍。',actions:`<button class="btn btn-ghost" onclick="UI.toast('专场开拍提醒已订阅（演示）')">订阅开拍提醒</button>`})}
<div class="g2">
${D.bankAuctions.map(a=>`
<div class="auction-card corner ${a.hot?'urgent':''}">
  <div class="flex between mb8"><div class="flex">${badge(a.bank+' 专场','gold')}${a.hot?badge('热拍中','red'):''}</div><span class="small dim2 mono">${a.id}</span></div>
  <div style="font-size:15.5px;font-weight:700">${a.sku}</div>
  <div class="small dim2 mt8">${a.note}</div>
  <div class="flex mt16" style="gap:20px;align-items:flex-end">
    <div><div class="small dim2">评估价</div><div class="big-num" style="font-size:16px;text-decoration:line-through;color:var(--txt3)">${yuan(a.appraisal)}</div></div>
    <div><div class="small dim2">起拍价（评估85%）</div><div class="auc-price" style="color:var(--gold)">${yuan(a.entry)}</div></div>
    <div style="margin-left:auto;text-align:right"><div class="small dim2">距截拍</div><div class="countdown" data-cd="${a.ends}"></div><div class="small dim2 mt8">${a.bids} 次出价</div></div>
  </div>
  <div class="flex mt16" style="border-top:1px solid var(--line);padding-top:12px;gap:8px">
    ${badge('检测报告已披露','mint')}${badge('数据清除已认证','mint')}${badge('司法留痕','gray')}
    <button class="btn btn-gold btn-sm" style="margin-left:auto" onclick="UI.toast('竞拍保证金已冻结（演示）')">报名竞拍</button>
  </div>
</div>`).join('')}
</div>
${panel('为什么从押品专场买入？','<div class="g4">'+[
  ['价格优势','评估价85折起拍 · 较二手市场价低 8–15%'],
  ['状态透明','第三方检测+数据清除认证 全披露'],
  ['权属干净','过户无障碍 · 处置流程合规留痕'],
  ['金融支持','可同步申请 M3 交易分期 · 首付30%'],
].map(x=>`<div class="stat-card"><div class="s-label">${x[0]}</div><div class="small dim2" style="line-height:1.8;margin-top:8px">${x[1]}</div></div>`).join('')+'</div>',{cls:''})}
</div>`,
after(){UI.tickCountdowns()}
});

/* ================= M4 银行端门户 ================= */
PAGES['m4/bank']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['处置中心','#/m4/collaterals'],['银行端门户']],title:'银行端门户 · 机构独立视图',mod:'M4-08',desc:'押品总览 · 预警收件箱 · 处置进度 · 回收率统计；子账号权限（资产保全部/交易部/风控部分级）。',actions:`<button class="btn btn-gold" onclick="UI.toast('子账号邀请已发送（演示）')">＋ 添加子账号</button>`})}
<div class="g4 mb16">
  ${D.bankStats.map(s=>statCard({label:s.label,value:s.value,unit:s.unit})).join('')}
</div>
<div class="g32">
<div>
${panel('预警收件箱 · 今日',`
<div class="table-wrap"><table class="tbl">
<thead><tr><th>级别</th><th>押品</th><th>事项</th><th>建议</th><th>操作</th></tr></thead>
<tbody>${D.alerts.slice(0,3).map(a=>`<tr>
  <td>${levelBadge(a.level)}</td>
  <td class="cell-main">${a.target.split(' · ')[1]}</td>
  <td class="dim small">${a.desc}</td>
  <td class="small" style="color:var(--gold)">${a.suggest}</td>
  <td><button class="btn btn-ghost btn-sm" onclick="UI.toast('已标记处理（演示）')">处理</button></td>
</tr>`).join('')}</tbody></table></div>`,{cls:'corner hi',sub:'推送时效 ≤1s'})}
${panel('处置进度跟踪',`
<div class="table-wrap"><table class="tbl">
<thead><tr><th>案件</th><th>通道</th><th>进度</th><th>预计回款</th></tr></thead>
<tbody>${D.disposals.map(dp=>`<tr>
  <td><div class="cell-main">${dp.sku}</div><div class="cell-sub">${dp.id} · ${dp.bank}</div></td>
  <td>${chBadge(dp.channel)}</td>
  <td style="min-width:180px">${flowStrip(D.disposalSteps,dp.step)}</td>
  <td class="num">${yuan(Math.round(dp.appraisal*0.94))}</td>
</tr>`).join('')}</tbody></table></div>`,{sub:'接管→检测→清除→挂牌→成交→过户→清分'})}
</div>
<div>
${panel('回收率统计 · 分通道',lineChart([
  {name:'T1 快速回购回收率',data:[90.2,91.1,92.4,93.0,94.1,95.2]},
  {name:'T2 公开竞价回收率',data:[86.5,87.2,88.0,89.3,90.1,91.0]},
  {name:'T3 整包处置回收率',data:[82.0,83.4,84.2,85.5,86.8,88.1]},
],{w:400,h:230,xLabels:['4月','5月','6月','7月','8月','9月'],yFmt:v=>v+'%',yMin:78,yMax:98}),{cls:'gold-c gold',sub:'回收率 = 处置成交价 / 入库评估价'})}
${panel('系统对接状态',`<div class="kv" style="grid-template-columns:130px 1fr"><span class="k">人行登记系统</span><span class="v">${badge('已对接','mint')} 登记状态实时同步</span><span class="k">算力遥测</span><span class="v">${badge('已对接','mint')} 42项指标/日</span><span class="k">监管账户</span><span class="v">${badge('已对接','mint')} 共管清分可追溯</span><span class="k">处置报告</span><span class="v">${badge('审计级','gold')} 时间戳存证</span></div>`,{cls:''})}
</div>
</div>
</div>`
});

/* ================= M5 解决方案中心 ================= */
PAGES['m5']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['解决方案中心']],title:'解决方案中心',mod:'M5',desc:'从「跨界进入者三重阻碍」到「35%机架闲置」——六大行业痛点的可落地解决方案，与平台交易/金融/处置能力深度联动。'})}
<div class="g3">
${D.solutions.map(s=>`
<div class="product-card">
  <div class="pc-head">
    <div><div class="pc-title">${s.name}</div><div class="pc-sub">${s.code}</div></div>
    <div class="m-icon" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;border:1px solid var(--line2);border-radius:5px;color:var(--mint)">${iconSvg(s.icon,19)}</div>
  </div>
  <div class="small dim2" style="line-height:1.8">对标痛点：${s.pain}</div>
  <div class="small dim mt8" style="line-height:1.9">${s.desc}</div>
  <div class="pc-specs">${s.tags.map(t=>`<span class="spec-pill">${t}</span>`).join('')}</div>
  <button class="btn btn-primary btn-sm" style="width:100%;justify-content:center;margin-top:auto" onclick="UI.toast('方案顾问将在1个工作日内联系（演示）')">咨询方案</button>
</div>`).join('')}
</div>
<div class="panel corner hi mt24">
  <div class="panel-h"><div class="p-title"><i>◈</i>跨资源转换路径 · M2-10</div><div class="p-sub">「买不起设备 → 先租 → 租转融（M3）→ 融转买」一键升级</div></div>
  <div class="panel-b">
    ${flowStrip(['买不起设备','先租（闲散/整机月租）','租转融（金租直租）','融转买（期满留购 ¥100）'],0)}
    <div class="g4 mt24">
      ${statCard({label:'方案转化率',value:'23.6%',foot:'租→融升级'})}
      ${statCard({label:'平均节省初始投入',value:'-62%',foot:'vs 直接采购'})}
      ${statCard({label:'期满留购案例',value:'148',unit:'笔',foot:'100元留购条款'})}
      ${statCard({label:'应收保理联动',value:'¥3.2亿',foot:'租赁应收质押融资'})}
    </div>
  </div>
</div>
</div>`
});

/* ================= 运营后台 ================= */
PAGES.ops=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['运营后台']],title:'运营后台 · 指数发布与机构审核',mod:'M0-01/运营',desc:'指数样本审核与发布 · 机构入驻审核队列 · 撮合经纪人工作台 · 数据回流与风控大盘。',actions:`<button class="btn btn-primary" onclick="UI.toast('今日指数已审核并发布（演示）')">发布今日指数</button>`})}
<div class="g32">
<div>
${panel('今日指数发布 · 待审核样本',`
<div class="table-wrap"><table class="tbl">
<thead><tr><th>SKU</th><th>新增样本</th><th>拟中位数</th><th>当前中位数</th><th>偏离</th><th>状态</th><th>操作</th></tr></thead>
<tbody>${D.deviceIdx.slice(0,6).map(r=>`<tr>
  <td class="cell-main">${r.sku}</td>
  <td class="num">${r.samples}</td>
  <td class="num" style="color:var(--mint)">${yuan(r.deal)}</td>
  <td class="num dim">${yuan(Math.round(r.deal*1.005))}</td>
  <td class="num">${((r.deal/(r.deal*1.005)-1)*100).toFixed(2)}%</td>
  <td>${badge('待审核','gold')}</td>
  <td><button class="btn btn-primary btn-sm" onclick="UI.toast('样本已审核通过（演示）')">通过</button></td>
</tr>`).join('')}</tbody></table></div>`,{sub:'剔除关联交易样本 · 脱敏可审计'})}
${panel('机构入驻审核队列',`
<div class="table-wrap"><table class="tbl">
<thead><tr><th>机构</th><th>类型</th><th>KYC</th><th>资质</th><th>申请</th><th>操作</th></tr></thead>
<tbody>${[
  ['某检测认证机构','检测认证','已通过','待复核','09-25'],
  ['某股份制银行·资保部','债权处置方','已通过','已通过','09-24'],
  ['某头部云厂商','设备卖方','审核中','—','09-26'],
  ['某金租公司','金融机构','已通过','待复核','09-23'],
].map(r=>`<tr><td class="cell-main">${r[0]}</td><td>${badge(r[1],'gray')}</td><td>${badge(r[2],r[2]==='已通过'?'mint':'gold')}</td><td>${badge(r[3],r[3]==='已通过'?'mint':'gray')}</td><td class="dim2 small">${r[4]}</td><td><button class="btn btn-primary btn-sm" onclick="UI.toast('已通过审核（演示）')">审核</button></td></tr>`).join('')}</tbody></table></div>`)}
</div>
<div>
${panel('撮合效率大盘',`
<div class="g2" style="grid-template-columns:1fr 1fr">
  ${statCard({label:'供需匹配推送',value:'4.2分',foot:'SLA ≤5分'})}
  ${statCard({label:'回购报价时效',value:'18h',foot:'SLA ≤24h'})}
  ${statCard({label:'今日撮合 GMV',value:'¥3,860万',foot:'含OTC 2笔'})}
  ${statCard({label:'在线经纪人',value:'24',unit:'人',foot:'响应≤10分'})}
</div>`,{cls:'corner hi'})}
${panel('数据回流 · 风控信号','<div class="small dim" style="line-height:2.1"><span class="dot d-mint"></span>今日新增成交 <b class="mono" style="color:var(--txt)">32 笔</b>已回流指数<br/><span class="dot d-gold"></span>市价异动监控：H200 30日 <b class="mono down">-8.2%</b> 已触发重估<br/><span class="dot d-blue"></span>黑名单校验：拦截 2 家关联交易主体<br/><span class="dot d-red"></span>反欺诈：1 笔重复挂牌请求已拒绝</div>',{cls:'gold-c gold'})}
${panel('指数 API 订阅方','<div class="kv" style="grid-template-columns:100px 1fr"><span class="k">银行</span><span class="v">6 家 · 残值曲线API</span><span class="k">保险</span><span class="v">3 家 · 成交价指数</span><span class="k">研究机构</span><span class="v">11 家 · 全量数据包</span><span class="k">月度API调用量</span><span class="v big-num" style="color:var(--mint)">1,842万次</span></div>',{cls:''})}
</div>
</div>
</div>`
});

})();
