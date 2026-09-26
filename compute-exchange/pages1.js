/* ============ 页面：首页 / 指数 / 入驻 / 帮助 / M1 设备交易 ============ */
window.PAGES=window.PAGES||{};
(function(){
const {fmt,yuan,pct,chgTxt,chgHtml,badge,levelBadge,certBadge,panel,spark,lineChart,stepper,flowStrip,statCard,iconSvg,secHead,pageHead,toast,utilBar}=UI;
const D=DATA;

/* ================= 首页 ================= */
PAGES.home=()=>({
html:`
<div class="page">
  <div class="hero">
    <div>
      <div class="kicker">Compute Asset Exchange · 2026</div>
      <h1>让每一块 GPU<br/>成为<span class="grad">可定价、可融资</span>的资产</h1>
      <div class="hero-sub">算力巢是面向<b>「设备—算力—金融」全生命周期</b>的算力资产交易所：双市场撮合发现价格，价格指数与残值曲线建立信任，押品处置闭环提升融资能力。</div>
      <div class="hero-cta">
        <a class="btn btn-primary btn-lg" href="#/m1/new">进入设备交易 <span style="opacity:.7">→</span></a>
        <a class="btn btn-ghost btn-lg" href="#/m2/spot">闲散算力现货</a>
        <a class="btn btn-gold btn-lg" href="#/m4/auctions">银行押品专场</a>
      </div>
      <div class="hero-meta">
        <div class="hm"><b>¥32.4亿</b><span>累计设备成交 GMV</span></div>
        <div class="hm"><b>86,400+</b><span>在架 GPU 卡时供给</span></div>
        <div class="hm"><b>24.7B</b><span>月度 TOKEN 结算量</span></div>
        <div class="hm"><b>60.8%</b><span>处置资产回流率</span></div>
      </div>
    </div>
    <div class="panel corner hi index-hero">
      <div class="ih-top">
        <div>
          <div class="ih-name">算力巢综合指数 · SC-COMPOSITE</div>
          <div class="ih-value">${fmt(D.composite.value,1)}</div>
          <div class="ih-chg">${chgTxt(D.composite.change)}<span style="color:var(--txt3);margin-left:10px;font-size:12px">日度 · 2026-09-26</span></div>
        </div>
        <div style="text-align:right">${badge('双轨发布 · 可审计','mint')}</div>
      </div>
      <div class="ih-chart">${spark(D.composite.spark,{w:560,h:90,color:UI.C.mint})}</div>
      <div class="ih-grid">
        ${D.idxSummary.map(s=>`<div class="ih-cell"><div class="c-label">${s.name}</div><div class="c-val">${fmt(s.value,1)}<span class="c-chg">${chgTxt(s.change)}</span></div><div style="font-size:10.5px;color:var(--txt4)">${s.code} · ${s.desc}</div></div>`).join('')}
      </div>
    </div>
  </div>

  ${secHead('六大市场模块','设备 · 算力 · 金融 · 处置 · 方案 · 公共服务','#/indices')}
  <div class="module-grid">
    <a class="mod-card" href="#/m1/new"><div class="m-code">M1</div><div class="m-icon">${iconSvg('gpu',20)}</div><div class="m-name">设备交易中心</div><div class="m-desc">一手/二手/供需/检测/交付</div><span class="m-link">进入市场 →</span></a>
    <a class="mod-card" href="#/m2/pro"><div class="m-code">M2</div><div class="m-icon">${iconSvg('zap',20)}</div><div class="m-name">算力交易中心</div><div class="m-desc">专业算力/闲散算力/TOKEN</div><span class="m-link">进入市场 →</span></a>
    <a class="mod-card is-gold" href="#/m3"><div class="m-code">M3</div><div class="m-icon">${iconSvg('bank',20)}</div><div class="m-name">金融服务中心</div><div class="m-desc">融资/租赁/保险/押品登记</div><span class="m-link">进入服务 →</span></a>
    <a class="mod-card is-gold" href="#/m4/collaterals"><div class="m-code">M4 ★</div><div class="m-icon">${iconSvg('scale',20)}</div><div class="m-name">金融资产处置中心</div><div class="m-desc">违约预警/三通道快速处置</div><span class="m-link">进入专区 →</span></a>
    <a class="mod-card" href="#/m5"><div class="m-code">M5</div><div class="m-icon">${iconSvg('building',20)}</div><div class="m-name">解决方案中心</div><div class="m-desc">智算建设/国产化/绿色算力</div><span class="m-link">查看方案 →</span></a>
    <a class="mod-card" href="#/indices"><div class="m-code">M0</div><div class="m-icon">${iconSvg('chart',20)}</div><div class="m-name">估值指数中心</div><div class="m-desc">成交价指数/残值曲线 API</div><span class="m-link">查看指数 →</span></a>
  </div>

  <div class="g32 mt24">
    <div>
      ${secHead('二手市场热榜','挂牌价 vs 成交中位 · 双轨价差','#/m1/new?cond=used')}
      ${panel('设备价格 TOP 热门 SKU','',{
        sub:'成交价中位数 · 近30日趋势',
        body:`<div class="table-wrap"><table class="tbl">
        <thead><tr><th>SKU</th><th>区域</th><th>挂牌均价</th><th>成交中位</th><th>价差</th><th>30日趋势</th></tr></thead>
        <tbody>${D.deviceIdx.slice(0,5).map(r=>`<tr>
          <td><div class="cell-main">${r.sku}</div><div class="cell-sub">${r.cond}成色 · ${r.samples}笔样本</div></td>
          <td class="dim">${r.region}</td>
          <td class="num">${yuan(r.list)}</td>
          <td class="num" style="color:var(--mint)">${yuan(r.deal)}</td>
          <td class="num">${((r.list-r.deal)/r.deal*100).toFixed(1)>0?`<span class="down">+${((r.list-r.deal)/r.deal*100).toFixed(1)}%</span>`:'—'}</td>
          <td class="spark-cell">${spark(r.spark,{w:90,h:26,color:r.ch>=0?UI.C.mint:UI.C.down})}</td>
        </tr>`).join('')}</tbody></table></div>`})}
    </div>
    <div>
      ${secHead('TOKEN 价格榜','主流模型输出价','#/m2/token')}
      ${panel('模型馆 · 智能指数×价格','',{
        body:D.tokenIdx.slice(0,5).map(m=>`
        <div class="flex between" style="padding:10px 2px;border-bottom:1px solid var(--line)">
          <div><div style="font-size:13px;font-weight:500">${m.model}</div><div class="cell-sub">${m.vendor}</div></div>
          <div style="text-align:right"><div class="num" style="font-size:13px">¥${m.output.toFixed(2)}/M</div><div style="margin-top:2px">${chgTxt(m.ch)}</div></div>
        </div>`).join('')+`<a class="btn btn-ghost btn-sm mt16" style="width:100%;justify-content:center" href="#/m2/token">浏览全部模型 →</a>`})}
    </div>
  </div>

  ${secHead('违约处置三通道','处置出口接回交易市场 · 处置能力就是授信能力','#/m4/workbench')}
  <div class="g3">
    ${D.channels.map(ch=>`
    <div class="channel-card t${ch.code[1]} corner">
      <div class="ch-days">${ch.days}</div>
      <div class="ch-code">${ch.code}</div>
      <div style="font-size:15px;font-weight:700;margin-top:4px">${ch.name}</div>
      <div class="small dim2 mt8" style="line-height:1.75;min-height:66px">${ch.desc}</div>
      <div class="flex between mt8"><span class="dim2 small">适用：${ch.fit}</span><span class="badge b-gold">${ch.fee}</span></div>
    </div>`).join('')}
  </div>

  <div class="g23 mt24" style="margin-bottom:8px">
    ${panel('价格即服务','<div style="line-height:1.9;color:var(--txt2);font-size:13px">成交价指数与残值曲线是平台的<b style="color:var(--mint)">第一性服务</b>：银行按残值曲线放款、保险按指数定价、买家按中位数出价。分 SKU/区域/成色日度发布，样本脱敏可审计，<b style="color:var(--txt)">开放 API 供金融机构引用</b>。</div><div class="flex mt16" style="gap:10px"><a class="btn btn-primary" href="#/indices">查看指数总览</a><a class="btn btn-ghost" href="#/ops">指数 API 订阅</a></div>',{cls:'corner hi'})}
    ${panel('合规内建','<div class="kv"><span class="k">国产化校验</span><span class="v">按买方主体类型自动校验国产化率与采购限制</span><span class="k">数据清除</span><span class="v">擦除/消磁/物理销毁三档 · 全程录像≥3年</span><span class="k">押品登记</span><span class="v">对接人行动产融资统一登记系统</span><span class="k">资金监管</span><span class="v">监管账户模式 · 平台不碰资金池</span></div>',{cls:'corner gold-c gold'})}
  </div>
</div>`,
after(){}
});

/* ================= 价格指数总览 ================= */
PAGES.indices=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['价格指数总览']],title:'估值指数中心',mod:'M0-01',desc:'分 SKU/区域/成色的设备成交价中位数、分卡型/SLA 的算力价格指数、TOKEN 价格指数与残值曲线——日度发布、样本脱敏、方法论公开、可审计。',actions:`<a class="btn btn-primary" href="#/ops">指数 API 订阅</a><a class="btn btn-ghost">下载今日样本</a><a class="btn btn-ghost">方法论白皮书</a>`})}
<div class="g4 mb16">
  ${D.idxSummary.map(s=>statCard({label:s.name,unit:'',value:fmt(s.value,1),foot:'今日 '+new Date().toLocaleDateString('zh-CN'),trend:s.change,icon:iconSvg('chart',15)})).join('')}
</div>
<div class="g32">
  <div>
    <div class="tabs mb16">
      <div class="tab active" data-itab="dev">设备成交指数</div>
      <div class="tab" data-itab="cpt">算力卡时指数</div>
      <div class="tab" data-itab="tok">TOKEN 价格指数</div>
    </div>
    <div id="idxTabBody"></div>
  </div>
  <div>
    ${panel('残值曲线 · 按SKU','<div style="font-size:12px;color:var(--txt3);margin-bottom:8px">按 SKU 发布 1–5 年残值曲线，开放 API 供银行/保险引用</div><div id="residualChart">'+lineChart([{name:'H100 SXM 80G',data:D.residual.skus['H100 SXM 80G']},{name:'昇腾910B 64G',data:D.residual.skus['昇腾910B 64G'],dash:true},{name:'RTX 4090 24G',data:D.residual.skus['RTX 4090 24G']}],{w:400,h:230,xLabels:D.residual.years.map(y=>y+'年'),yFmt:v=>v+'%',yMin:0,yMax:105})+'</div><div class="flex mt16" style="gap:6px;flex-wrap:wrap">'+Object.keys(D.residual.skus).map(k=>`<button class="chip" data-sku="${k}">${k}</button>`).join('')+'</div>',{cls:'corner hi'})}
    ${panel('指数方法论','<div class="small dim" style="line-height:2"><span class="dot d-mint"></span>成交价样本<b style="color:var(--txt)">脱敏可审计</b>，剔除关联交易<br/><span class="dot d-mint"></span>挂价 vs 成交价<b style="color:var(--txt)">双轨发布</b>（对标 CCIR）<br/><span class="dot d-mint"></span>残值曲线由<b style="color:var(--txt)">真实成交数据生成</b>，反哺融资定价<br/><span class="dot d-mint"></span>拟对接国家级/交易所级<b style="color:var(--txt)">指数合作</b></div>',{cls:'gold-c gold'})}
  </div>
</div>
</div>`,
after(){
  const tabs={
    dev(){return panel('设备成交价指数 · 分SKU/区域/成色',`<div class="table-wrap"><table class="tbl"><thead><tr><th>SKU</th><th>区域</th><th>成色</th><th>挂牌均价</th><th>成交中位</th><th>涨跌</th><th>样本</th><th>30日趋势</th></tr></thead><tbody>${D.deviceIdx.map(r=>`<tr>
      <td><div class="cell-main">${r.sku}</div></td><td class="dim">${r.region}</td><td>${badge(r.cond,'gray')}</td>
      <td class="num">${yuan(r.list)}</td><td class="num" style="color:var(--mint)">${yuan(r.deal)}</td>
      <td>${chgTxt(r.ch)}</td><td class="num dim">${r.samples}</td>
      <td class="spark-cell">${spark(r.spark,{w:90,h:26,color:r.ch>=0?UI.C.mint:UI.C.down})}</td></tr>`).join('')}</tbody></table></div>`,{sub:'日度更新 · T-1'})},
    cpt(){return panel('算力卡时指数 · 分卡型/区域/SLA',`<div class="table-wrap"><table class="tbl"><thead><tr><th>卡型</th><th>区域</th><th>SLA</th><th>卡时价</th><th>涨跌</th><th>30日趋势</th></tr></thead><tbody>${D.computeIdx.map(r=>`<tr>
      <td class="cell-main">${r.card}</td><td class="dim">${r.region}</td><td>${UI.slaBadge(r.sla)}</td>
      <td class="num" style="color:var(--mint)">¥${r.price.toFixed(1)}/h</td><td>${chgTxt(r.ch)}</td>
      <td class="spark-cell">${spark(r.spark,{w:90,h:26,color:r.ch>=0?UI.C.mint:UI.C.down})}</td></tr>`).join('')}</tbody></table></div>`,{sub:'日度更新 · 闲散算力为现货均价'})},
    tok(){return panel('TOKEN 价格指数 · 主流模型',`<div class="table-wrap"><table class="tbl"><thead><tr><th>模型</th><th>厂商</th><th>输入价</th><th>输出价</th><th>缓存读取</th><th>涨跌</th><th>30日趋势</th></tr></thead><tbody>${D.tokenIdx.map(r=>`<tr>
      <td class="cell-main">${r.model}</td><td class="dim">${r.vendor}</td>
      <td class="num">¥${r.input.toFixed(2)}/M</td><td class="num" style="color:var(--mint)">¥${r.output.toFixed(2)}/M</td><td class="num dim">¥${r.cache.toFixed(2)}/M</td>
      <td>${chgTxt(r.ch)}</td><td class="spark-cell">${spark(r.spark,{w:90,h:26,color:r.ch>=0?UI.C.mint:UI.C.down})}</td></tr>`).join('')}</tbody></table></div>`,{sub:'参考市场：输出约¥12.7/M · 缓存读取¥0.03–1.5/M · Flash ¥0.4/M'})}
  };
  const body=document.getElementById('idxTabBody');
  const render=k=>body.innerHTML=tabs[k]();
  render('dev');
  document.querySelectorAll('[data-itab]').forEach(t=>t.onclick=()=>{
    document.querySelectorAll('[data-itab]').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');render(t.dataset.itab);
  });
  // 残值曲线 SKU 切换
  document.querySelectorAll('[data-sku]').forEach(b=>b.onclick=()=>{
    document.querySelectorAll('[data-sku]').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const sel=[...document.querySelectorAll('[data-sku].active')].map(x=>x.dataset.sku);
    const picks=sel.length?sel:Object.keys(D.residual.skus).slice(0,3);
    document.getElementById('residualChart').innerHTML=lineChart(picks.map((k,i)=>({name:k,data:D.residual.skus[k],dash:i===1})),{w:400,h:230,xLabels:D.residual.years.map(y=>y+'年'),yFmt:v=>v+'%',yMin:0,yMax:105});
  });
}
});

/* ================= M1 设备交易市场（一手×二手 统一入口） ================= */
PAGES['m1/new']=(q)=>{
q=q||{};
const cat=q.cat||'all';
const sub=q.sub||'';
const cond=q.cond||'all';
const brand=q.brand||'';
const nat=q.nat||'';
const cats=D.deviceCats;
const catObj=cats.find(c=>c.key===cat);
const subObj=catObj&&catObj.subs.find(s=>s.key===sub);

const qs=(over={})=>{
  const m=Object.assign({cat:cat,sub:sub,cond:cond,brand:brand,nat:nat},over);
  if(over.cat!==undefined&&over.cat!==cat)m.sub='';
  if(m.cat==='all')m.sub='';
  const p=[];
  if(m.cat&&m.cat!=='all')p.push('cat='+m.cat);
  if(m.sub)p.push('sub='+m.sub);
  if(m.cond&&m.cond!=='all')p.push('cond='+m.cond);
  if(m.brand)p.push('brand='+encodeURIComponent(m.brand));
  if(m.nat)p.push('nat='+m.nat);
  return '#/m1/new'+(p.length?'?'+p.join('&'):'');
};

const inScope=p=>(cat==='all'||p.cat===cat)&&(!sub||p.sub===sub);
let newItems=D.newProducts.filter(p=>inScope(p)&&(!brand||p.brand===brand));
if(nat==='nat')newItems=newItems.filter(p=>p.national);
if(nat==='imp')newItems=newItems.filter(p=>!p.national);
const usedItems=D.usedDevices.filter(p=>inScope(p));

const catCount=k=>D.newProducts.filter(p=>p.cat===k).length+D.usedDevices.filter(p=>p.cat===k).length;
const subCount=(k,sk)=>D.newProducts.filter(p=>p.cat===k&&p.sub===sk).length+D.usedDevices.filter(p=>p.cat===k&&p.sub===sk).length;
const allCount=D.newProducts.length+D.usedDevices.length;
const usedCards=usedItems.reduce((s,r)=>s+r.count,0);
const scopeBrands=[...new Set(D.newProducts.filter(p=>inScope(p)).map(p=>p.brand))];
const where=[catObj?catObj.name:'全部设备',subObj?subObj.name:'',brand?brand+' 品牌馆':''].filter(Boolean).join(' / ');

const newCards=newItems.map(p=>`
  <div class="product-card">
    <div class="pc-head">
      <div><div class="pc-title">${p.name}</div><div class="pc-sub">${p.brand} · 交付周期 ${p.lead}</div></div>
      ${badge(p.type,p.type==='现货'?'mint':p.type==='集采'?'blue':'gold')}
    </div>
    <div class="pc-sub" style="line-height:1.7">${p.spec}</div>
    <div class="pc-specs">${p.tag.map(t=>`<span class="spec-pill" style="${t.includes('国产化')?'color:var(--mint);border-color:rgba(0,224,154,.4)':''}">${t}</span>`).join('')}</div>
    <div class="flex between" style="margin-top:auto">
      <div class="pc-price">${yuan(p.price)}<span class="u">${p.type==='订阅'?'/年':'/台'}</span></div>
      <button class="btn btn-primary btn-sm" onclick="UI.toast('已发起询价（演示）')">询价锁价</button>
    </div>
  </div>`).join('');

const usedTable=`<div class="table-wrap"><table class="tbl">
<thead><tr><th>标的</th><th>类型</th><th>成色</th><th>来源/区域</th><th>挂牌单价</th><th>成交中位</th><th>价差</th><th>ECC</th><th>通电时长</th><th>检测</th><th>操作</th></tr></thead>
<tbody>${usedItems.map(r=>{
  const gap=((r.list-r.deal)/r.deal*100);
  return `<tr>
    <td><div class="cell-main">${r.sku} <b class="mono" style="color:var(--gold)">×${fmt(r.count)}</b></div><div class="cell-sub">${r.id} · ${r.seller}</div></td>
    <td>${badge(r.type,r.type==='批组挂牌'?'purple':'gray')}</td>
    <td>${badge(r.cond+' '+r.condScore,r.condScore>=90?'mint':'gray')}</td>
    <td><div class="dim">${r.source}</div><div class="cell-sub">${r.region}</div></td>
    <td class="num">${yuan(r.list)}</td>
    <td class="num" style="color:var(--mint)">${yuan(r.deal)}</td>
    <td class="num ${gap>0?'down':'up'}">${gap>0?'+':''}${gap.toFixed(1)}%</td>
    <td class="num ${r.ecc?'down':''}">${r.ecc} err</td>
    <td class="num dim">${fmt(r.hours)}h</td>
    <td>${certBadge(r.cert)}</td>
    <td><div class="act"><a class="btn btn-primary btn-sm" href="#/m1/device?id=${r.id}">详情</a><button class="btn btn-ghost btn-sm" onclick="UI.toast('已冻结保证金，进入检测流程（演示）')">下单</button></div></td>
  </tr>`}).join('')}</tbody></table></div>`;

const showNew=cond!=='used';
const showUsed=cond!=='new';
const showGroupBuy=(cat==='all'||cat==='gpu')&&cond!=='used';

return {html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['设备交易市场','#/m1/new']],title:'设备交易市场 · 一手×二手',mod:'M1-01/02',desc:'GPU/CPU服务器、网络、存储、供电散热、机柜基础设施与集群软件全品类覆盖：一手品牌馆集采拼单、二手SKU级检索同场可比；下单即触发第三方检测，成交价实时回流价格指数。',actions:`<a class="btn btn-primary" href="#/m1/hall">发布求购</a><a class="btn btn-gold" href="#/m1/hall">发布货源</a><a class="btn btn-ghost" href="#/m1/otc">大宗 OTC 撮合</a>`})}

<div class="market-top">
  <a class="mt-entry" href="#/onboarding">
    <div class="mt-icon">${iconSvg('building',20)}</div>
    <div class="grow"><div class="mt-tit">品牌入驻 <span class="mt-tag">M0-04</span></div><div class="mt-sub">OEM / 总代 / 代理入驻挂牌 · 集采拼单 · 预售锁价</div></div>
    <span class="mt-arrow">→</span>
  </a>
  <a class="mt-entry gold" href="#/m1/new?cond=new">
    <div class="mt-icon">${iconSvg('gpu',20)}</div>
    <div class="grow"><div class="mt-tit">品牌馆 <span class="mt-tag">${scopeBrands.length}+ 品牌</span></div><div class="mt-sub">NVIDIA · 昇腾 · 寒武纪 等 按品牌逛一手整机与网络互连</div></div>
    <span class="mt-arrow">→</span>
  </a>
  <a class="mt-entry blue" href="#/m1/hall">
    <div class="mt-icon">${iconSvg('radar',20)}</div>
    <div class="grow"><div class="mt-tit">供需大厅 <span class="mt-tag">M1-03</span></div><div class="mt-sub">求购 / 货源双向发布 · 智能撮合推送 ≤5 分钟</div></div>
    <span class="mt-arrow">→</span>
  </a>
</div>

<div class="market-layout">
  <aside class="cat-side">
    <div class="cat-head"><b>品类导航</b><span>${cats.length} 大类</span></div>
    <a class="cat-row ${cat==='all'?'active':''}" href="${qs({cat:'all',sub:''})}"><span class="cat-ic">${iconSvg('chart',14)}</span>全部设备<span class="cat-n">${allCount}</span></a>
    ${cats.map(c=>`
    <div class="cat-grp ${cat===c.key?'open':''}">
      <a class="cat-row ${cat===c.key&&!sub?'active':''}" href="${qs({cat:c.key})}"><span class="cat-ic">${iconSvg(c.icon,14)}</span>${c.name}<span class="cat-n">${catCount(c.key)}</span></a>
      <div class="cat-subs">
        ${c.subs.map(s=>`<a class="cat-sub ${cat===c.key&&sub===s.key?'active':''}" href="${qs({cat:c.key,sub:s.key})}">${s.name}<span>${subCount(c.key,s.key)}</span></a>`).join('')}
      </div>
    </div>`).join('')}
  </aside>

  <div class="market-main">
    <div class="g4 mb16">
      ${statCard({label:'一手挂牌',value:fmt(newItems.length),unit:'款',foot:'品牌馆 · 集采/预售'})}
      ${statCard({label:'二手在架标的',value:fmt(usedItems.length),unit:'标的',foot:'单卡/整件/批组'})}
      ${statCard({label:'二手在架总件数',value:fmt(usedCards),unit:'件',foot:'含批组挂牌'})}
      ${statCard({label:'挂价 vs 成交中位价差',value:'-3.2%',foot:'双轨对比 · 回流指数',trend:-0.4})}
    </div>

    <div class="tabs mb16">
      <a class="tab ${cond==='all'?'active':''}" href="${qs({cond:'all'})}">全部</a>
      <a class="tab ${cond==='new'?'active':''}" href="${qs({cond:'new'})}">一手 · 品牌馆 <span class="cnt">${newItems.length}</span></a>
      <a class="tab ${cond==='used'?'active':''}" href="${qs({cond:'used'})}">二手 · SKU检索 <span class="cnt">${usedItems.length}</span></a>
      <span class="market-where">当前浏览：${where}</span>
    </div>

    ${showNew?`
    <div class="filter-bar">
      <span class="f-label">品牌馆</span>
      <a class="chip ${!brand?'active':''}" href="${qs({brand:''})}">全部品牌</a>
      ${scopeBrands.map(b=>`<a class="chip ${brand===b?'active':''}" href="${qs({brand:b})}">${b}</a>`).join('')}
      <span class="f-label" style="margin-left:14px">合规</span>
      <a class="chip ${!nat?'active':''}" href="${qs({nat:''})}">全部</a>
      <a class="chip ${nat==='nat'?'active':''}" href="${qs({nat:'nat'})}">国产化100%</a>
      <a class="chip ${nat==='imp'?'active':''}" href="${qs({nat:'imp'})}">进口件</a>
    </div>`:''}

    ${showGroupBuy?`
    <div class="panel corner gold-c mb16" style="border-color:rgba(240,181,66,.45)">
      <div class="panel-h"><div class="p-title"><i>◈</i>集采拼单</div><div class="p-sub">${D.groupBuy.name} · ${D.groupBuy.joined}/${D.groupBuy.total}${D.groupBuy.unit}已参团</div><div class="p-right"><span class="countdown" data-cd="${D.groupBuy.deadline}"></span></div></div>
      <div class="panel-b"><div class="bar-label"><span>成团进度</span><b>${Math.round(D.groupBuy.joined/D.groupBuy.total*100)}%</b></div>
      <div class="progress blue"><div class="pf" style="width:${Math.round(D.groupBuy.joined/D.groupBuy.total*100)}%"></div></div>
      <div class="flex between mt16" style="flex-wrap:wrap"><span class="dim small">拼单价 ${yuan(D.groupBuy.price)} · 较单台采购低约 4.2%</span><button class="btn btn-gold" onclick="UI.toast('已加入集采拼单（演示）')">＋ 加入拼单</button></div></div>
    </div>`:''}

    ${showNew?(newItems.length?`
    ${panel('一手 · 品牌馆挂牌',`<div class="g3">${newCards}</div>`,{sub:'OEM/总代直供 · 国产化合规引擎自动校验',cls:'corner hi'})}`
    :`<div class="empty-hint">该筛选下暂无一手挂牌 · 可前往 <a href="#/m1/hall">供需大厅</a> 发布求购，或 <a href="#/onboarding">邀请品牌入驻</a></div>`):''}

    ${showUsed?(usedItems.length?`
    ${panel('二手 · SKU级检索（挂牌价 vs 平台成交中位）',usedTable,{sub:'排序：价格发现度 · 每笔成交实时回流 M0 指数',cls:'corner hi'})}`
    :`<div class="empty-hint">该品类暂无二手在架 · 可前往 <a href="#/m1/hall">供需大厅</a> 发布求购</div>`):''}

    ${panel('国产化合规引擎说明','<div class="flex" style="gap:22px;flex-wrap:wrap"><div class="small dim" style="max-width:420px;line-height:1.9">下单时按<b style="color:var(--txt)">买方主体类型</b>（党政机关/国企/民企/外资）自动校验国产化率与采购限制，不合规订单将被拦截并提示替代方案（M5-02 国产化选型工具）。</div><div class="g4" style="flex:1;min-width:300px"><div class="stat-card"><div class="s-label">已校验订单</div><div class="s-value">12,847</div></div><div class="stat-card"><div class="s-label">拦截不合规</div><div class="s-value">316</div></div></div></div>',{cls:''})}
  </div>
</div>
</div>`};
};

/* 旧路由兼容：#/m1/used → 二手Tab */
PAGES['m1/used']=(q)=>PAGES['m1/new'](Object.assign({},q,{cond:'used'}));

/* ================= M1 设备详情 ================= */
PAGES['m1/device']=(q)=>{
const r=D.usedDevices.find(x=>x.id===q.id)||D.usedDevices[0];
const health=[
  {name:'Burn-in 满载压测',v:r.health,max:100,note:'72h 连续满载 · 通过'},
  {name:'ECC 错误计数',v:100-r.ecc*8,max:100,note:r.ecc+' err / 24h'},
  {name:'热历史分析',v:Math.max(60,r.health-4),max:100,note:'峰值 78°C · 无降频史'},
  {name:'显存压测',v:Math.max(60,r.health-2),max:100,note:'ECC 校验通过'},
];
return {html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['设备交易市场','#/m1/new'],[r.sku+' ×'+r.count]],title:r.sku+' × '+r.count,mod:'M1-09',desc:r.id+' · '+r.seller+' · '+r.type,actions:`<button class="btn btn-primary" onclick="UI.toast('保证金已冻结 · 进入第三方检测（演示）')">立即下单 · 冻结保证金</button><button class="btn btn-ghost" onclick="UI.toast('已加入比价清单（演示）')">加入比价</button><button class="btn btn-gold" onclick="UI.toast('已向卖家发起还价（演示）')">议价</button>`})}
<div class="g32">
  <div>
    <div class="g3 mb16">
      ${statCard({label:'挂牌单价',value:yuan(r.list),foot:'总价 '+yuan(r.list*r.count)})}
      ${statCard({label:'平台成交中位',value:yuan(r.deal),foot:'近30日 · 供出价参考',icon:iconSvg('chart',15)})}
      ${statCard({label:'综合健康分',value:r.health,unit:'/100',foot:'体检报告 '+r.cert})}
    </div>
    ${panel('第三方检测 · 设备体检报告',`
      <div class="kv mb16" style="grid-template-columns:150px 1fr"><span class="k">检测机构</span><span class="v">中国泰尔实验室（演示） · CNAS授权</span><span class="k">检测时间</span><span class="v">2026-09-24 · 报告编号 QR-2026-0931</span><span class="k">数据清除认证</span><span class="v">${badge('已认证 · 擦除级（一档）','mint')} 录像留档≥3年</span></div>
      ${health.map(hh=>`<div style="margin-bottom:14px"><div class="bar-label"><span>${hh.name}</span><b>${hh.note}</b></div><div class="progress ${hh.v>=85?'':hh.v>=65?'warn':'danger'}"><div class="pf" style="width:${hh.v}%"></div></div></div>`).join('')}
      <div class="small dim2">* 报告不符可退单（保证金全退）；符合则付款至监管账户，过户后 T+1 放款。</div>`,{cls:'corner hi',sub:'burn-in / ECC / 热历史 / 显存压测'})}
    ${panel('残值曲线参考',lineChart([{name:'本SKU残值',data:[100,82,68,56,45,36]},{name:'平台同型残值带',data:[100,86,74,61,49,39],dash:true}],{w:640,h:220,xLabels:['0年','1年','2年','3年','4年','5年'],yFmt:v=>v+'%',yMin:0,yMax:105,area:true}),{sub:'由真实成交数据生成 · 开放API'})}
  </div>
  <div>
    ${panel('标的参数','<div class="kv"><span class="k">SKU</span><span class="v">'+r.sku+'</span><span class="k">数量</span><span class="v">×'+r.count+'</span><span class="k">成色</span><span class="v">'+r.cond+'（'+r.condScore+'分）</span><span class="k">来源</span><span class="v">'+r.source+'</span><span class="k">区域</span><span class="v">'+r.region+'</span><span class="k">保证金</span><span class="v">'+yuan(Math.round(r.list*r.count*0.05))+'（5%）</span><span class="k">交付</span><span class="v">专线物流 · 防震防静电 · 可选机房上架</span></div>',{cls:''})}
    ${panel('交易流程 · 履约状态机',stepper(D.orderSteps,0)+'<div class="tl mt24">'+[['09-26','下单','冻结保证金至监管账户'],['T+0','检测','第三方体检 · 报告不符可退单'],['T+2','付款','货款入监管账户'],['T+3','过户','数据清除认证 + 所有权变更'],['T+5','交付','专线物流 · 上架验收'],['T+6','放款','监管账户放款（T+1）'],['T+6','互评','成交价回流指数']].map((t,i)=>`<div class="tl-item ${i===0?'cur':''}"><div class="t-time">${t[0]}</div><div class="t-tit">${t[1]}</div><div class="t-des">${t[2]}</div></div>`).join('')+'</div>',{cls:'gold-c gold'})}
    ${panel('同款标的 · 批组溢价参考',`<div class="table-wrap"><table class="tbl" style="min-width:0"><tbody>${D.usedDevices.filter(x=>x.sku!==r.sku).slice(0,4).map(x=>`<tr><td><div class="cell-main small">${x.sku} ×${x.count}</div><div class="cell-sub">${x.cond} · ${x.region}</div></td><td class="num small">${yuan(x.list)}</td><td><a class="btn btn-ghost btn-sm" href="#/m1/device?id=${x.id}">看</a></td></tr>`).join('')}</tbody></table></div>`,{sub:'同质批组 ≥32卡 可享批组溢价'})}
  </div>
</div>
</div>`};
};

/* ================= M1 供需大厅 ================= */
PAGES['m1/hall']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['设备交易','#/m1/new'],['供需大厅']],title:'供需大厅',mod:'M1-03',desc:'求购/供货双向发布，智能匹配推送 ≤5 分钟；撮合成功率看板全程可视。',actions:`<button class="btn btn-primary" onclick="UI.toast('求购单已发布 · 匹配推送≤5分钟（演示）')">发布求购</button><button class="btn btn-gold" onclick="UI.toast('货源已发布 · 可先发布后补检测报告（演示）')">发布货源</button>`})}
<div class="g4 mb16">
  ${statCard({label:'在市求购单',value:'47',foot:'匹配中 31',trend:6.2})}
  ${statCard({label:'在市货源',value:'82',foot:'含待补报告 19',trend:2.8})}
  ${statCard({label:'撮合成功率',value:'68.4%',foot:'近30日',trend:1.9})}
  ${statCard({label:'平均撮合时长',value:'4.2分',foot:'SLA ≤5分钟',trend:-8.3})}
</div>
<div class="tabs mb16">
  <div class="tab active" data-htab="d">求购大厅 <span class="cnt">47</span></div>
  <div class="tab" data-htab="s">货源大厅 <span class="cnt">82</span></div>
</div>
<div id="hallBody"></div>
</div>`,
after(){
  const tabs={
    d:panel('买方求购 · 需求大厅',`<div class="table-wrap"><table class="tbl"><thead><tr><th>求购单</th><th>买方</th><th>标的</th><th>数量</th><th>预算</th><th>时限</th><th>匹配状态</th><th>操作</th></tr></thead><tbody>${D.demandList.map(r=>`<tr>
      <td class="num dim">${r.id}</td><td class="cell-main">${r.buyer}</td><td class="cell-main">${r.sku}</td>
      <td class="num">×${r.count}</td><td class="num">${r.budget}</td><td class="dim">${r.deadline}</td>
      <td>${levelBadge(r.status)}<div class="cell-sub">${r.matched}家货源匹配</div></td>
      <td><button class="btn btn-primary btn-sm" onclick="UI.toast('已应单 · 等待撮合经纪人接入（演示）')">应单报价</button></td></tr>`).join('')}</tbody></table></div>`,{sub:'自动匹配推送 ≤5分钟'}),
    s:panel('卖方货源 · 货源大厅',`<div class="table-wrap"><table class="tbl"><thead><tr><th>货源单</th><th>卖方</th><th>标的</th><th>数量</th><th>期望价</th><th>检测</th><th>状态</th><th>操作</th></tr></thead><tbody>${D.supplyList.map(r=>`<tr>
      <td class="num dim">${r.id}</td><td class="cell-main">${r.seller}</td><td class="cell-main">${r.sku}</td>
      <td class="num">×${r.count}</td><td class="num">${r.expect}</td><td>${certBadge(r.cert)}</td>
      <td>${levelBadge(r.status)}<div class="cell-sub">${r.matched}家买方关注</div></td>
      <td><button class="btn btn-gold btn-sm" onclick="UI.toast('已发起撮合请求（演示）')">请求撮合</button></td></tr>`).join('')}</tbody></table></div>`,{sub:'可先发布后补充检测报告'})
  };
  const body=document.getElementById('hallBody');
  body.innerHTML=tabs.d();
  document.querySelectorAll('[data-htab]').forEach(t=>t.onclick=()=>{
    document.querySelectorAll('[data-htab]').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');body.innerHTML=tabs[t.dataset.htab]();
  });
}
});

/* ================= M1 竞价拍卖厅 ================= */
PAGES['m1/auction']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['设备交易','#/m1/new'],['竞价拍卖厅']],title:'竞价拍卖厅',mod:'M1-04',desc:'限时竞价（二手）· 反向竞价（求购）· 荷兰式降价（滞销库）。全流程留痕，成交价回流指数。'})}
<div class="g3">
  ${D.auctions.map(a=>`
  <div class="auction-card corner ${a.hot?'urgent':''}">
    <div class="flex between mb8"><span>${badge(a.type,a.type.includes('荷兰')?'cyan':a.type.includes('反向')?'purple':'mint')}</span><span class="small dim2 mono">${a.id}</span></div>
    <div style="font-size:15px;font-weight:700">${a.sku}</div>
    <div class="flex between mt16"><div><div class="small dim2">当前价</div><div class="auc-price ${a.hot?'down':''}">${yuan(a.cur)}</div></div>
    <div style="text-align:right"><div class="small dim2">距截止</div><div class="countdown" data-cd="${a.ends}"></div></div></div>
    <div class="flex between mt16" style="border-top:1px solid var(--line);padding-top:12px">
      <span class="small dim">${a.reserve} · 评估价 ${yuan(a.appraisal)}</span>
      <span class="small mono dim2">${a.bids} 次出价</span>
    </div>
    <button class="btn ${a.hot?'btn-gold':'btn-primary'} btn-sm mt16" style="width:100%;justify-content:center" onclick="UI.toast('出价已提交 · 需缴纳保证金（演示）')">${a.hot?'立即竞价':'出价'}</button>
  </div>`).join('')}
</div>
<div class="panel corner mb16 mt24" style="border-color:rgba(180,140,255,.35)">
  <div class="panel-h"><div class="p-title"><i>◈</i>反向竞价 · 买方求购</div><div class="p-sub">${D.reverseAuction.sku} · 预算 ${yuan(D.reverseAuction.budget)}</div><div class="p-right"><span class="countdown" data-cd="${D.reverseAuction.ends}"></span></div></div>
  <div class="panel-b">
    <div class="g4">
      ${statCard({label:'已报价卖家',value:D.reverseAuction.bids,unit:'家'})}
      ${statCard({label:'当前最低报价',value:yuan(D.reverseAuction.lowest),foot:'全流程保密'})}
      ${statCard({label:'较预算节省',value:'2.7%',foot:'竞价进行中'})}
      ${statCard({label:'报价轮次',value:'第 2 轮',foot:'剩余 1 轮'})}
    </div>
    <button class="btn btn-primary mt16" onclick="UI.toast('卖家报价已提交（演示）')">我是卖家 · 参与抢单报价</button>
  </div>
</div>
</div>`,
after(){UI.tickCountdowns()}
});

/* ================= M1 大宗撮合 OTC ================= */
PAGES['m1/otc']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['设备交易','#/m1/new'],['大宗撮合']],title:'大宗暗盘撮合 · OTC',mod:'M1-05',desc:'买家发起询价（RFQ）→ 卖家报价 → 还价 → 锁单，全程平台经纪人撮合；适用于百卡以上需求与整机房处置。',actions:`<button class="btn btn-primary" onclick="UI.toast('RFQ 已创建 · 已分配经纪人（演示）')">发起 RFQ</button>`})}
<div class="g32">
<div>
${panel('进行中的 RFQ 询报价单',`
<div class="table-wrap"><table class="tbl">
<thead><tr><th>RFQ 编号</th><th>方向</th><th>标的</th><th>数量</th><th>预算/期望</th><th>状态</th><th>经纪人</th><th>更新</th></tr></thead>
<tbody>${D.rfqs.map(r=>`<tr>
  <td class="num dim">${r.id}</td>
  <td>${badge(r.dir,r.dir==='求购'?'blue':'gold')}</td>
  <td class="cell-main">${r.sku}</td><td class="num">×${r.count}</td><td class="num">${r.budget}</td>
  <td>${levelBadge(r.status)}</td><td class="dim small">${r.broker}</td><td class="dim2 small">${r.updated}</td>
</tr>`).join('')}</tbody></table></div>`,{cls:'corner hi',sub:'RFQ → 报价 → 还价 → 锁单'})}
${panel('发起询价 RFQ',`<div class="g3">
  <div><div class="small dim2 mb8">标的 SKU</div><input class="inp" style="width:100%" placeholder="如 H100 SXM 80G"/></div>
  <div><div class="small dim2 mb8">数量（卡）</div><input class="inp" style="width:100%" placeholder="≥100"/></div>
  <div><div class="small dim2 mb8">预算区间</div><input class="inp" style="width:100%" placeholder="如 ¥5,000万"/></div>
</div><div class="mt16"><button class="btn btn-primary" onclick="UI.toast('RFQ 已创建 · 3个交易日内完成首轮报价（演示）')">提交 RFQ · 分配经纪人</button></div>`,{cls:''})}
</div>
<div>
${panel('经纪人工作台','<div style="text-align:center;padding:18px 0"><div style="width:64px;height:64px;margin:0 auto;border-radius:50%;border:1px solid rgba(0,224,154,.4);display:flex;align-items:center;justify-content:center;color:var(--mint)">'+iconSvg('radar',30)+'</div><div style="font-size:15px;font-weight:700;margin-top:14px">平台撮合经纪人</div><div class="small dim2 mt8" style="line-height:1.8">暗盘询报价全保密<br/>多轮还价策略建议<br/>锁单后接入交易订单状态机</div><div class="mt16">'+badge('本周撮合 ¥1.2亿','gold')+'</div></div>',{cls:'corner hi'})}
${panel('大宗成交回顾',`<div class="tl">
  <div class="tl-item done"><div class="t-time">09-24</div><div class="t-tit">H200 超节点 ×20 · ¥5,360万</div><div class="t-des">RFQ-2509-014 锁单 · 某租赁商</div></div>
  <div class="tl-item done"><div class="t-time">09-19</div><div class="t-tit">910B ×512 · ¥5,900万</div><div class="t-des">整柜承接 · 含上架服务</div></div>
  <div class="tl-item done"><div class="t-time">09-11</div><div class="t-tit">H100 ×1024 · ¥2.05亿</div><div class="t-des">年度最大单 · 分三期交付</div></div>
</div>`,{cls:''})}
</div>
</div>
</div>`
});

/* ================= M1 交易订单 ================= */
PAGES['m1/orders']=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['设备交易','#/m1/new'],['交易订单']],title:'交易订单管理',mod:'M1-06',desc:'合同电子签 · 保证金 · 履约状态机（锁定→付款→检测→过户→交付）；全交易资金监管账户模式。',actions:`<button class="btn btn-ghost">导出对账单</button>`})}
<div class="panel corner hi">
  <div class="panel-h"><div class="p-title"><i>▸</i>订单履约状态机</div><div class="p-sub">监管账户 · 平台不碰资金池</div><div class="p-right">${badge('T+1 放款','mint')}</div></div>
  <div class="panel-b">
  <div class="table-wrap"><table class="tbl">
    <thead><tr><th>订单号</th><th>标的</th><th>金额</th><th>资金状态</th><th>履约进度</th><th>下单</th><th>操作</th></tr></thead>
    <tbody>${D.orders.map(o=>`<tr>
      <td class="num dim">${o.id}</td>
      <td><div class="cell-main">${o.sku}</div><div class="cell-sub">${o.buyer}</div></td>
      <td class="num">${yuan(o.amount)}</td>
      <td><span class="small">${o.fund}</span><div class="cell-sub">${o.deposit}</div></td>
      <td style="min-width:200px">${UI.stepper(D.orderSteps,o.step)}</td>
      <td class="dim2 small">${o.time}</td>
      <td><button class="btn btn-ghost btn-sm" onclick="UI.toast('订单详情（演示）')">详情</button></td>
    </tr>`).join('')}</tbody></table></div>
  </div>
</div>
<div class="g2 mt16">
${panel('物流交付跟踪 · M1-08',`<div class="tl">
  <div class="tl-item done"><div class="t-time">09-25 10:00</div><div class="t-tit">专线物流揽收 · 防震防静电包装</div><div class="t-des">SO-25092214 · 温湿度记录仪已激活</div></div>
  <div class="tl-item done"><div class="t-time">09-25 22:30</div><div class="t-tit">干线运输 · 全程定位</div><div class="t-des">苏州 → 上海临港 · 双驾直发</div></div>
  <div class="tl-item cur"><div class="t-time">预计 09-27</div><div class="t-tit">机房上架 · 安装调试</div><div class="t-des">上门工程师 2 名 · 含 IB 布线验收</div></div>
  <div class="tl-item"><div class="t-time">—</div><div class="t-tit">买家验收 · 签署交付确认</div></div>
</div>`,{cls:''})}
${panel('数据清除认证 · M1-09',`<div class="kv" style="grid-template-columns:130px 1fr">
  <span class="k">认证等级</span><span class="v">${badge('二档 · 消磁','gold')} ${badge('三档 · 物理销毁（可选）','gray')}</span>
  <span class="k">过程记录</span><span class="v">全程录像留档 · 保存期 ≥3年</span>
  <span class="k">证书效力</span><span class="v">金融/政企卖方硬性要求 · 附加于过户文件包</span>
  <span class="k">本期订单</span><span class="v">含存储部件订单 3/5 已完成认证</span>
</div><button class="btn btn-gold mt16" onclick="UI.toast('认证证书已生成并归档（演示）')">生成认证证书</button>`,{cls:'gold-c gold'})}
</div>
</div>`
});

/* ================= 机构入驻 ================= */
PAGES.onboarding=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['机构入驻中心']],title:'机构入驻',mod:'M0-04/06',desc:'银行级 KYC 实名认证 · 多角色账户体系 · 子账号权限（银行资产保全部/交易部/风控部分级）。'})}
<div class="panel corner hi mb24">
  <div class="panel-h"><div class="p-title"><i>▸</i>入驻流程</div></div>
  <div class="panel-b">${stepper(D.onboardSteps.map(s=>s),0)}</div>
</div>
<div class="role-grid">
${D.onboardRoles.map(r=>`<div class="role-card">
  <div class="r-name">${r.name}</div><div class="r-desc">${r.desc}</div>
  <div class="r-tags">${r.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
  <button class="btn btn-primary btn-sm mt16" style="width:100%;justify-content:center" onclick="UI.toast('入驻申请已提交 · 进入KYC审核（演示）')">申请入驻</button>
</div>`).join('')}
</div>
</div>`
});

/* ================= 帮助中心 ================= */
PAGES.help=()=>({
html:`
<div class="page">
${pageHead({crumb:[['首页','#/'],['帮助中心']],title:'帮助中心',desc:'价格发现、检测认证、双 TOKEN 形态、三通道处置——平台核心机制问答。'})}
<div style="max-width:860px">
${D.faqs.map((f,i)=>`<div class="faq-item ${i===0?'open':''}"><div class="faq-q">${f.q}<span class="fx">＋</span></div><div class="faq-a"><div class="faq-a-inner">${f.a}</div></div></div>`).join('')}
</div>
</div>`,
after(){document.querySelectorAll('.faq-q').forEach(q=>q.onclick=()=>q.parentElement.classList.toggle('open'))}
});

})();
