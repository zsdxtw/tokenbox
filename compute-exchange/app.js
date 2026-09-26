/* ============ 量衡 · 路由 / 导航 / 行情跑马灯 ============ */
(function(){
const D=DATA;

/* ---------- 导航结构 ---------- */
const NAV=[
  {t:'首页',h:'#/'},
  {t:'设备交易',h:'#/m1/new',kids:[['一手商城 · 品牌馆','#/m1/new'],['二手市场 · SKU检索','#/m1/used'],['供需大厅 · 求购/货源','#/m1/hall'],['竞价拍卖厅','#/m1/auction'],['大宗撮合 · OTC','#/m1/otc'],['交易订单管理','#/m1/orders']]},
  {t:'算力交易',h:'#/m2/pro',kids:[['专业算力商城 · 集群','#/m2/pro'],['闲散算力市场 · 现货','#/m2/spot'],['TOKEN 商城 · 模型馆','#/m2/token'],['推理竞价场','#/m2/bid'],['计量计费中心','#/m2/billing'],['SLA 监控看板','#/m2/sla']]},
  {t:'金融服务',h:'#/m3',kids:[['金融超市','#/m3'],['融资申请 · 一键授权','#/m3/apply'],['贷后监控台','#/m3/monitor']]},
  {t:'处置中心',h:'#/m4/collaterals',kids:[['押品库总览','#/m4/collaterals'],['违约预警中心','#/m4/alerts'],['处置工作台 T1/T2/T3','#/m4/workbench'],['银行押品拍卖专场','#/m4/auctions'],['银行端门户','#/m4/bank']]},
  {t:'解决方案',h:'#/m5'},
  {t:'价格指数',h:'#/indices'},
  {t:'机构入驻',h:'#/onboarding'},
  {t:'帮助',h:'#/help'},
];

const LOGO=`<svg class="logo-mark" viewBox="0 0 40 40"><defs><linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00e09a"/><stop offset="1" stop-color="#3fd8e6"/></linearGradient></defs><polygon points="20,3 35,11.5 35,28.5 20,37 5,28.5 5,11.5" fill="none" stroke="url(#lg1)" stroke-width="1.8"/><path d="M13 14h14M20 14v13M13 27h14" stroke="#00e09a" stroke-width="2" stroke-linecap="round"/></svg>`;

function buildHeader(){
  document.getElementById('siteHeader').innerHTML=`
  <div class="hd-in">
    <div class="logo" onclick="location.hash='#/'">${LOGO}
      <div class="logo-txt"><b>量<i>衡</i></b><span class="logo-sub">Suanheng · Compute Asset Exchange</span></div>
    </div>
    <nav class="nav" id="nav">
      ${NAV.map(n=>`<div class="nav-item" data-nav="${n.h}"><a href="${n.h}">${n.t}${n.kids?'<span class="nav-caret">▼</span>':''}</a>
        ${n.kids?`<div class="nav-drop">${n.kids.map(k=>`<a href="${k[1]}"><b>${k[0]}</b><span>${k[1].replace('#','')}</span></a>`).join('')}</div>`:''}
      </div>`).join('')}
    </nav>
    <div class="hd-right">
      <div class="hd-clock"><span class="market-dot"></span><b id="hdTime"></b> · 交易中</div>
      <div class="hd-user">
        <button class="btn btn-ghost btn-sm" onclick="UI.toast('演示环境：登录已模拟')">登录</button>
        <button class="btn btn-primary btn-sm" onclick="location.hash='#/onboarding'">机构入驻</button>
      </div>
      <button class="hd-burger" id="burger">☰</button>
    </div>
  </div>`;
  document.getElementById('burger').onclick=()=>document.getElementById('nav').classList.toggle('open');
}

function buildFooter(){
  document.getElementById('siteFooter').innerHTML=`
  <div class="ft-in">
    <div class="ft-grid">
      <div>
        <div class="ft-brand">量<i>衡</i> · 算力资产交易所</div>
        <div class="ft-desc">面向「设备—算力—金融」全生命周期的算力资产交易与金融化基础设施平台。价格即服务 · 闭环优先 · 合规内建。</div>
        <div class="mt16">${UI.badge('原型演示 · 模拟数据','gold')}</div>
      </div>
      <div class="ft-col"><h4>设备交易 M1</h4><a href="#/m1/new">一手商城</a><a href="#/m1/used">二手市场</a><a href="#/m1/hall">供需大厅</a><a href="#/m1/auction">竞价拍卖</a><a href="#/m1/otc">大宗撮合</a></div>
      <div class="ft-col"><h4>算力交易 M2</h4><a href="#/m2/pro">专业算力</a><a href="#/m2/spot">闲散算力</a><a href="#/m2/token">TOKEN 商城</a><a href="#/m2/bid">推理竞价</a><a href="#/m2/sla">SLA 监控</a></div>
      <div class="ft-col"><h4>金融与处置 M3/M4</h4><a href="#/m3">金融超市</a><a href="#/m3/apply">融资申请</a><a href="#/m4/collaterals">押品库</a><a href="#/m4/workbench">处置工作台</a><a href="#/m4/auctions">押品拍卖专场</a></div>
      <div class="ft-col"><h4>平台服务</h4><a href="#/indices">价格指数</a><a href="#/m5">解决方案</a><a href="#/onboarding">机构入驻</a><a href="#/ops">运营后台</a><a href="#/help">帮助中心</a></div>
    </div>
    <div class="ft-bottom">
      <span>© 2026 量衡科技（演示原型） · 依据《算力交易平台需求设计文档 V1.0》构建</span>
      <span>资金监管账户模式 · 平台不碰资金池 ｜ 检测/清除录像留存 ≥3年 ｜ RWA 功能仅在合规沙箱内开放</span>
    </div>
  </div>`;
}

/* ---------- 跑马灯 ---------- */
function buildTicker(){
  const track=document.getElementById('tickerTrack');
  const html=D.tickers.map((t,i)=>{
    const dec=t.dec!==undefined?t.dec:2;
    const val=(t.unit||'')+(t.v>=1000?Math.round(t.v).toLocaleString():t.v.toFixed(dec))+(t.suffix||'');
    return `<span class="tk" data-tk="${i}"><span class="tk-name">${t.n}</span><b class="tk-val">${val}</b><span class="tk-chg ${t.c>=0?'up':'down'}">${t.c>=0?'▲':'▼'}${Math.abs(t.c).toFixed(2)}%</span></span>`;
  }).join('');
  track.innerHTML=html+html; // 双份无缝滚动
}
function liveTicker(){
  // 每 2.4s 随机微调部分行情，产生涨闪
  const idx=Math.floor(Math.random()*D.tickers.length);
  const t=D.tickers[idx];
  const drift=(Math.random()-.5)*.3;
  t.v=Math.max(.01,t.v*(1+drift/100));t.c=t.c+drift*.4;
  document.querySelectorAll(`[data-tk="${idx}"]`).forEach(el=>{
    const dec=t.dec!==undefined?t.dec:2;
    el.querySelector('.tk-val').textContent=(t.unit||'')+(t.v>=1000?Math.round(t.v).toLocaleString():t.v.toFixed(dec))+(t.suffix||'');
    const chg=el.querySelector('.tk-chg');
    chg.textContent=(t.c>=0?'▲':'▼')+Math.abs(t.c).toFixed(2)+'%';
    chg.className='tk-chg '+(t.c>=0?'up':'down');
    el.classList.remove('tk-flash-up','tk-flash-down');
    void el.offsetWidth;
    el.classList.add(drift>=0?'tk-flash-up':'tk-flash-down');
  });
}

/* ---------- 时钟 ---------- */
function tickClock(){
  const el=document.getElementById('hdTime');
  if(el){const d=new Date();el.textContent=d.toLocaleTimeString('zh-CN',{hour12:false})+' CST';}
}

/* ---------- 路由 ---------- */
let cleanup=null;
function parseHash(){
  const raw=location.hash.replace(/^#\/?/,'');
  const [path,qs]=raw.split('?');
  const q={};(qs||'').split('&').filter(Boolean).forEach(kv=>{const [k,v]=kv.split('=');q[k]=decodeURIComponent(v)});
  return {path:path||'',q};
}
function activeNav(path){
  document.querySelectorAll('.nav-item').forEach(el=>{
    const h=el.dataset.nav||'';
    const p='#/'+path;
    el.classList.toggle('active',h===p||(h==='#/m1/new'&&path.startsWith('m1'))||(h==='#/m2/pro'&&path.startsWith('m2'))||(h==='#/m3'&&path.startsWith('m3'))||(h==='#/m4/collaterals'&&path.startsWith('m4')));
  });
}
function route(){
  if(cleanup){try{cleanup()}catch(e){};cleanup=null}
  const {path,q}=parseHash();
  const view=document.getElementById('view');
  const page=PAGES[path]||PAGES['home'];
  const res=page(q);
  view.innerHTML=`<div class="page">${res.html.replace(/^<div class="page">|<\/div>$/g,'')}</div>`;
  // scroll top
  window.scrollTo({top:0});
  activeNav(path);
  // 通用动态组件
  UI.tickCountdowns();
  UI.animateUtils();
  if(res.after)res.after();
  if(res.live)cleanup=res.live;
}
window.addEventListener('hashchange',route);

/* ---------- 启动 ---------- */
buildTicker();
buildHeader();
buildFooter();
route();
setInterval(liveTicker,2400);
setInterval(tickClock,1000);tickClock();
setInterval(UI.tickCountdowns,1000);
})();
