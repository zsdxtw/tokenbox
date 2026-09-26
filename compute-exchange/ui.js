/* ============ 算力巢 · 通用组件库 ============ */
window.UI=(function(){
const C={mint:'#00e09a',gold:'#f0b542',blue:'#5aa2ff',down:'#ff5d6c',purple:'#b48cff',cyan:'#3fd8e8',orange:'#ff8a4d',grid:'#17233c',txt3:'#57678a'};

function fmt(n,d=0){return n.toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d})}
function yuan(n,d=0){return '¥'+fmt(n,d)}
function pct(v,d=2){return (v>0?'+':'')+v.toFixed(d)+'%'}
function chgHtml(v){return `<span class="mono ${v>=0?'up':'down'}">${v>=0?'▲':'▼'} ${pct(Math.abs(v))}</span>`}
function chgTxt(v){return `<span class="mono ${v>=0?'up':'down'} price-${v>=0?'up':'down'}">${pct(v)}</span>`}

/* ---------- 徽章 ---------- */
function badge(t,type='gray'){return `<span class="badge b-${type}">${t}</span>`}
function levelBadge(lv){const m={'正常':'mint','关注':'gold','可疑':'orange','违约':'red','已撮合':'mint','匹配中':'blue','在售':'mint','洽谈中':'gold'};return `<span class="badge b-${m[lv]||'gray'}"><span class="dot d-${m[lv]==='mint'?'mint':m[lv]==='gold'?'gold':m[lv]==='orange'?'orange':m[lv]==='red'?'red':'gray'}"></span>${lv}</span>`}
function slaBadge(s){const m={'白金 99.9%':'mint','金 99.5%':'gold','现货':'gray','尽力而为':'gray'};return `<span class="badge b-${m[s]||'gray'}">${s}</span>`}
function certBadge(c){return c==='已出报告'?badge(c,'mint'):badge(c,'gold')}
function chBadge(ch){const m={'T1':'mint','T2':'gold','T3':'blue'};return `<span class="badge b-${m[ch]}">${ch}</span>`}

/* ---------- 面板 ---------- */
function panel(title,body,{right='',sub='',cls='corner',style=''}={}){
  return `<section class="panel ${cls}" style="${style}">
    ${title?`<div class="panel-h"><div class="p-title"><i>▸</i>${title}</div>${sub?`<div class="p-sub">${sub}</div>`:''}<div class="p-right">${right}</div></div>`:''}
    <div class="panel-b">${body}</div></section>`;
}

/* ---------- Sparkline ---------- */
function spark(data,{w=100,h=30,color=C.mint,fill=true,strokeW=1.6}={}){
  const min=Math.min(...data),max=Math.max(...data),rg=max-min||1;
  const pts=data.map((v,i)=>[i/(data.length-1)*w,h-2-(v-min)/rg*(h-6)]);
  const path=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)).join('');
  const area=path+`L${w},${h}L0,${h}Z`;
  const gid='g'+Math.random().toString(36).slice(2,8);
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="overflow:visible">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${color}" stop-opacity=".28"/><stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </linearGradient></defs>
    ${fill?`<path d="${area}" fill="url(#${gid})"/>`:''}
    <path d="${path}" fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${pts[pts.length-1][0]}" cy="${pts[pts.length-1][1]}" r="2.2" fill="${color}"/></svg>`;
}

/* ---------- 多序列折线图 ---------- */
function lineChart(series,{w=720,h=260,xLabels=[],yFmt=v=>v,colors=[C.mint,C.gold,C.blue,C.purple,C.cyan,C.orange],area=false,legend=true,yMin,yMax}={}){
  const all=series.flatMap(s=>s.data),mn=yMin!==undefined?yMin:Math.min(...all),mx=yMax!==undefined?yMax:Math.max(...all);
  const rg=(mx-mn)||1,pl=46,pr=12,pt=16,pb=30,cw=w-pl-pr,chh=h-pt-pb;
  const X=i=>pl+i/(Math.max(xLabels.length-1,series[0].data.length-1,1))*cw;
  const Y=v=>pt+chh-(v-mn)/rg*chh;
  let grid='',ylab='';
  for(let g=0;g<=4;g++){const gy=pt+chh-g/4*chh;grid+=`<line x1="${pl}" y1="${gy}" x2="${w-pr}" y2="${gy}" stroke="${C.grid}" stroke-width="1" stroke-dasharray="${g===0?'0':'3 4'}"/>`;ylab+=`<text class="axis-t" x="${pl-8}" y="${gy+3}" text-anchor="end">${yFmt(mn+g/4*rg)}</text>`}
  let xl='';
  (xLabels.length?xLabels:series[0].data.map((_,i)=>i+1)).forEach((lb,i)=>{xl+=`<text class="axis-t" x="${X(i)}" y="${h-10}" text-anchor="middle">${lb}</text>`});
  let paths='';
  series.forEach((s,si)=>{
    const pts=s.data.map((v,i)=>[X(i),Y(v)]);
    const path=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)).join('');
    if(area){paths+=`<path d="${path}L${X(s.data.length-1)},${pt+chh}L${pl},${pt+chh}Z" fill="${colors[si%colors.length]}" opacity=".07"/>`}
    paths+=`<path d="${path}" fill="none" stroke="${colors[si%colors.length]}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" ${s.dash?'stroke-dasharray="5 4"':''}/>`;
    pts.filter((_,i)=>i%Math.ceil(s.data.length/8)===0||i===s.data.length-1).forEach(p=>{paths+=`<circle cx="${p[0]}" cy="${p[1]}" r="2.6" fill="${colors[si%colors.length]}"/>`});
  });
  const lg=legend&&series.length>1?`<div class="legend" style="margin-top:10px">${series.map((s,i)=>`<span class="lg"><span class="sw" style="background:${colors[i%colors.length]}"></span>${s.name}</span>`).join('')}</div>`:'';
  return `<div class="chart-box"><svg viewBox="0 0 ${w} ${h}">${grid}${ylab}${xl}${paths}</svg>${lg}</div>`;
}

/* ---------- 步骤条 ---------- */
function stepper(steps,cur){return `<div class="stepper">${steps.map((s,i)=>`<div class="step ${i<cur?'done':i===cur?'cur':''}">${s}</div>`).join('')}</div>`}

/* ---------- 流程节点 ---------- */
function flowStrip(steps,curIdx){
  return `<div class="flow-strip">${steps.map((s,i)=>`<span class="flow-node ${i<curIdx?'done':i===curIdx?'cur':''}">${s}</span>${i<steps.length-1?'<span class="flow-arrow">›</span>':''}`).join('')}</div>`;
}

/* ---------- 统计卡 ---------- */
function statCard({label,value,unit='',foot='',trend=null,icon=''}){
  return `<div class="stat-card">
    <div class="s-label">${icon?iconSvg(icon,15):''}${label}</div>
    <div class="s-value">${value}<span class="unit">${unit}</span></div>
    ${foot?`<div class="s-foot">${foot}${trend!==null?chgTxt(trend):''}</div>`:''}
  </div>`;
}

/* ---------- LTV 仪表 ---------- */
function ltvGauge(v){
  const cls=v<65?'':v<76?'warn':'danger';
  return `<div style="min-width:150px">
    <div class="bar-label"><span>LTV</span><b class="${v<65?'':v<76?'': 'down'}" style="color:${v<65?'var(--up)':v<76?'var(--gold)':'var(--down)'}">${v}%</b></div>
    <div class="ltv-bar"><div class="ltv-seg g1" style="width:60%"></div><div class="ltv-seg g2" style="width:15%"></div><div class="ltv-seg g3" style="width:25%"></div><div class="ltv-cursor" style="left:${Math.min(v,98)}%"></div></div>
  </div>`;
}

/* ---------- 利用率条 ---------- */
function utilBar(v){
  const cls=v>=75?'':v>=45?'mid':'low';
  return `<div class="flex" style="gap:8px;min-width:140px"><div class="util ${cls}" style="flex:1"><div class="util-fill" data-util="${v}" style="width:0%"></div></div><span class="util-num" data-utilnum="${v}">${v}%</span></div>`;
}

/* ---------- 图标 ---------- */
function iconSvg(name,s=18,c='currentColor'){
  const p={
    gpu:`<path d="M2 7h20M2 12h20M6 3v14M14 3v14M4 21v-4M20 21v-4" /><rect x="2" y="5" width="20" height="12" rx="1.5"/>`,
    chip:`<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>`,
    bank:`<path d="M3 9l9-6 9 6M4 9h16M5 9v9M9.7 9v9M14.3 9v9M19 9v9M3 21h18"/>`,
    shield:`<path d="M12 2l8 3.5V11c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5.5L12 2z"/><path d="M8.5 11.5l2.5 2.5 4.5-4.5"/>`,
    chart:`<path d="M3 3v18h18M8 15v-4M13 17V7M18 17v-7"/>`,
    zap:`<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>`,
    building:`<path d="M4 21V5l8-3v19M12 21h8V9l-8-2M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2"/>`,
    flag:`<path d="M5 21V4M5 4h13l-2.5 4L18 12H5"/>`,
    gear:`<circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>`,
    leaf:`<path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16zM4 20c3-6 7-10 12-12"/>`,
    globe:`<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18"/>`,
    box:`<path d="M12 2l9 5v10l-9 5-9-5V7l9-5zM12 22V12M3 7l9 5 9-5"/>`,
    doc:`<path d="M6 2h9l5 5v15H6V2zM14 2v6h6M9 13h6M9 17h6"/>`,
    scale:`<path d="M12 3v18M4 21h16M12 5l6 3-2.5 6a3.5 3.5 0 01-7 0L6 8l6-3z"/>`,
    coin:`<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 9.5c0-1.4 1.3-2 3-2s3 .6 3 2-1 2-3 2.3-3 .9-3 2.2 1.3 2 3 2 3-.6 3-2"/>`,
    clock:`<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>`,
    link:`<path d="M9 15l6-6M8 16l-2.5 2.5a3.5 3.5 0 01-5-5L3 12M16 8l2.5-2.5a3.5 3.5 0 015 5L21 12"/>`,
    key:`<circle cx="7.5" cy="14.5" r="4.5"/><path d="M10.5 11.5L21 2M16 7l3 3M13 10l2 2"/>`,
    alert:`<path d="M12 3l10 17H2L12 3zM12 10v4M12 17.5v.5"/>`,
    check:`<path d="M4 12.5l5 5L20 6.5"/>`,
    radar:`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12l6-4"/>`
  }[name]||'';
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
}

/* ---------- Toast ---------- */
function toast(msg){
  const root=document.getElementById('toast-root');
  const t=document.createElement('div');t.className='toast';t.innerHTML=`<i>✓</i>${msg}`;
  root.appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .4s';setTimeout(()=>t.remove(),400)},2600);
}

/* ---------- 倒计时引擎 ---------- */
function fmtCd(ms){
  if(ms<=0)return {txt:'已结束',days:0,hot:true};
  const s=Math.floor(ms/1000),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),sec=s%60;
  const pad=n=>String(n).padStart(2,'0');
  return {txt:d>0?`${d}天 ${pad(h)}:${pad(m)}:${pad(sec)}`:`${pad(h)}:${pad(m)}:${pad(sec)}`,days:d,hot:ms<2*3600e3};
}
function tickCountdowns(){
  document.querySelectorAll('[data-cd]').forEach(el=>{
    const end=+el.dataset.cd,r=fmtCd(end-Date.now());
    el.textContent=r.txt;el.classList.toggle('hot',r.hot);
  });
}

/* ---------- 工具条动画 ---------- */
function animateUtils(){
  document.querySelectorAll('.util-fill').forEach(f=>{requestAnimationFrame(()=>{f.style.width=f.dataset.util+'%'})});
}

/* ---------- 区块标题 ---------- */
function secHead(tit,sub,more=''){
  return `<div class="sec-head"><div class="sec-tit ${/处置|金融/.test(tit)?'gold':''}">${tit}</div>${sub?`<div class="sec-sub">${sub}</div>`:''}${more?`<a class="sec-more" href="${more}">查看全部 →</a>`:''}</div>`;
}

/* ---------- 页面头 ---------- */
function pageHead({crumb=[],title='',desc='',actions='',mod=''}={}){
  const c=crumb.map((x,i)=>i===crumb.length-1?`<span>${x}</span>`:`<a href="${x[1]}">${x[0]}</a>`).join(' <span style="color:var(--txt4)">/</span> ');
  return `<div class="page-head"><div class="crumb">${c}</div>
    <div class="page-title">${mod?`<span class="mod-tag">${mod}</span>`:''}${title}</div>
    ${desc?`<div class="page-desc">${desc}</div>`:''}
    ${actions?`<div class="page-actions">${actions}</div>`:''}</div>`;
}

return {C,fmt,yuan,pct,chgHtml,chgTxt,badge,levelBadge,slaBadge,certBadge,chBadge,panel,spark,lineChart,stepper,flowStrip,statCard,ltvGauge,utilBar,iconSvg,toast,fmtCd,tickCountdowns,animateUtils,secHead,pageHead};
})();
