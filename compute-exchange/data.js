/* ============ 量衡 · 模拟数据层 ============ */
(function(){
// 线性同余伪随机（保证每次刷新数据形态稳定）
let seed=20260926;
function rnd(){seed=(seed*48271)%2147483647;return (seed-1)/2147483646}
function walk(n,start,vol,drift=0){const a=[start];for(let i=1;i<n;i++){a.push(Math.max(start*.3,a[i-1]*(1+(rnd()-.5)*vol+drift)))}return a}

const NOW=Date.now();
const H=n=>NOW+n*3600e3;
const D=n=>NOW+n*86400e3;

window.DATA={
now:NOW,

/* ---------- 跑马灯 ---------- */
tickers:[
  {n:'量衡综指',v:1287.6,c:+0.86,dec:1},
  {n:'设备价格指数',v:1042.3,c:+0.42,dec:1},
  {n:'算力卡时指数',v:876.5,c:-0.63,dec:1},
  {n:'TOKEN价格指数',v:713.2,c:-1.28,dec:1},
  {n:'H100 SXM 二手',v:205800,c:+1.2,dec:0,unit:'¥'},
  {n:'H200 SXM 二手',v:302400,c:+0.6,dec:0,unit:'¥'},
  {n:'A100 80G',v:86500,c:-0.8,dec:0,unit:'¥'},
  {n:'昇腾910B',v:118400,c:+2.2,dec:0,unit:'¥'},
  {n:'H100卡时·白金',v:36.8,c:-0.5,dec:1,unit:'¥'},
  {n:'910B卡时·金',v:22.5,c:+0.4,dec:1,unit:'¥'},
  {n:'4090卡时·现货',v:4.2,c:-1.5,dec:1,unit:'¥'},
  {n:'DS-V3.2 输出',v:8.4,c:-3.1,dec:1,unit:'¥',suffix:'/M'},
  {n:'Qwen3-235B 输出',v:12.7,c:-1.9,dec:1,unit:'¥',suffix:'/M'},
  {n:'押品处置回流率',v:60.8,c:+1.4,dec:1,suffix:'%'},
],

/* ---------- 指数总览 ---------- */
composite:{value:1287.6,change:0.86,spark:walk(90,1180,.018,.0022)},
idxSummary:[
  {key:'device',name:'设备价格指数',code:'SH-DEV',value:1042.3,change:0.42,desc:'分SKU/区域/成色成交中位数'},
  {key:'compute',name:'算力卡时指数',code:'SH-CPT',value:876.5,change:-0.63,desc:'分卡型/SLA卡时价'},
  {key:'token',name:'TOKEN价格指数',code:'SH-TOK',value:713.2,change:-1.28,desc:'主流模型token价格'},
  {key:'disp',name:'处置回流指数',code:'SH-DSP',value:60.8,change:1.4,desc:'处置资产回流交易市场比例'},
],
deviceIdx:[
  {sku:'H100 SXM 80G',region:'华北',cond:'A',list:215000,deal:205800,ch:1.2,spark:walk(30,198,.02,.0012),samples:186},
  {sku:'H200 SXM 141G',region:'华东',cond:'A',list:312000,deal:302400,ch:0.6,spark:walk(30,298,.018,.0006),samples:64},
  {sku:'A100 PCIE 80G',region:'华东',cond:'A-',list:92000,deal:86500,ch:-0.8,spark:walk(30,880,.02,-.0008),samples:212},
  {sku:'A100 SXM 80G',region:'西北',cond:'B+',list:78000,deal:74200,ch:-1.4,spark:walk(30,780,.022,-.0014),samples:98},
  {sku:'昇腾910B 64G',region:'西南',cond:'A',list:124000,deal:118400,ch:2.2,spark:walk(30,108,.02,.0022),samples:143},
  {sku:'昇腾910B3',region:'华北',cond:'A',list:138000,deal:132600,ch:1.8,spark:walk(30,124,.02,.0018),samples:76},
  {sku:'RTX 4090 24G',region:'华东',cond:'B',list:13200,deal:13050,ch:-1.9,spark:walk(30,13800,.025,-.0019),samples:486},
  {sku:'L40S 48G',region:'华南',cond:'A-',list:62000,deal:59800,ch:0.3,spark:walk(30,60000,.015,.0003),samples:54},
  {sku:'MI300X 192G',region:'华北',cond:'A',list:205000,deal:196800,ch:1.1,spark:walk(30,190,.02,.0011),samples:38},
  {sku:'H20 96G',region:'华东',cond:'A',list:98000,deal:94200,ch:0.9,spark:walk(30,92000,.015,.0009),samples:67},
],
computeIdx:[
  {card:'H100 SXM',region:'华北',sla:'白金',price:36.8,ch:-0.5,spark:walk(30,37.5,.03,-.0005)},
  {card:'H100 SXM',region:'华东',sla:'金',price:32.4,ch:-0.2,spark:walk(30,33,.03,-.0002)},
  {card:'H100 SXM',region:'西部',sla:'现货',price:21.6,ch:-1.1,spark:walk(30,22.5,.04,-.0011)},
  {card:'H200 SXM',region:'华东',sla:'白金',price:52.0,ch:+0.4,spark:walk(30,51,.03,.0004)},
  {card:'昇腾910B',region:'西南',sla:'金',price:22.5,ch:+0.4,spark:walk(30,22,.03,.0004)},
  {card:'昇腾910B3',region:'华北',sla:'白金',price:19.8,ch:+0.9,spark:walk(30,19,.03,.0009)},
  {card:'A100 80G',region:'西北',sla:'金',price:18.2,ch:-0.7,spark:walk(30,18.6,.03,-.0007)},
  {card:'RTX 4090',region:'华东',sla:'尽力而为',price:4.2,ch:-1.5,spark:walk(30,4.5,.05,-.0015)},
  {card:'L40S',region:'华南',sla:'现货',price:8.6,ch:-0.3,spark:walk(30,8.8,.03,-.0003)},
],
tokenIdx:[
  {model:'DeepSeek-V3.2',vendor:'深度求索',input:1.0,output:8.4,cache:0.12,ch:-3.1,spark:walk(30,9.2,.05,-.0031)},
  {model:'DeepSeek-V3.2-Flash',vendor:'深度求索',input:0.4,output:0.4,cache:0.04,ch:-2.2,spark:walk(30,0.45,.05,-.0022)},
  {model:'Qwen3-235B-A22B',vendor:'阿里云',input:2.0,output:12.7,cache:0.40,ch:-1.9,spark:walk(30,13.5,.04,-.0019)},
  {model:'GLM-5-Plus',vendor:'智谱',input:2.5,output:14.0,cache:0.45,ch:-1.2,spark:walk(30,14.5,.04,-.0012)},
  {model:'Kimi-K2',vendor:'月之暗面',input:4.0,output:16.0,cache:0.60,ch:-0.8,spark:walk(30,16.4,.03,-.0008)},
  {model:'ERNIE-5.0',vendor:'百度',input:2.4,output:9.6,cache:0.36,ch:-1.5,spark:walk(30,10,.04,-.0015)},
  {model:'Hunyuan-T1',vendor:'腾讯云',input:1.8,output:9.0,cache:0.30,ch:-1.1,spark:walk(30,9.4,.03,-.0011)},
  {model:'Llama-4-Maverick',vendor:'社区部署',input:1.5,output:6.5,cache:0.20,ch:-2.6,spark:walk(30,7,.05,-.0026)},
],
residual:{
  years:[0,1,2,3,4,5],
  skus:{
    'H100 SXM 80G':[100,82,68,56,45,36],
    'H200 SXM 141G':[100,88,76,64,53,43],
    '昇腾910B 64G':[100,86,73,61,50,41],
    'A100 PCIE 80G':[100,72,55,42,32,24],
    'RTX 4090 24G':[100,75,58,44,33,24],
  }
},

/* ---------- M1 一手商城 ---------- */
brands:['NVIDIA','华为昇腾','寒武纪','沐曦','摩尔线程','燧原','海光','AMD'],
newProducts:[
  {id:'N1',name:'HGX H200 超节点整机',brand:'NVIDIA',spec:'8×H200 SXM · NVLink · 1128G HBM3e',price:2680000,type:'现货',tag:['进口件','预售锁价'],national:false,lead:'4–6周'},
  {id:'N2',name:'昇腾 Atlas 900 A3 SuperPoD',brand:'华为昇腾',spec:'16×910B3 · 256G HBM · RoCE 400G',price:2360000,type:'集采',tag:['国产化100%','集采拼单'],national:true,lead:'2–3周'},
  {id:'N3',name:'Atlas 800T A2 整机',brand:'华为昇腾',spec:'8×910B · 512G HBM',price:1080000,type:'现货',tag:['国产化100%'],national:true,lead:'1周'},
  {id:'N4',name:'MLU370-X8 智算服务器',brand:'寒武纪',spec:'8×MLU370-X8 · 256G LPDDR5',price:720000,type:'集采',tag:['国产化100%','集采拼单'],national:true,lead:'3–4周'},
  {id:'N5',name:'曦云 C500 塔式训练服务器',brand:'沐曦',spec:'8×MXC500 · 512G 显存',price:980000,type:'预售',tag:['国产化100%','预售锁价'],national:true,lead:'6–8周'},
  {id:'N6',name:'MTT S4000 千卡集群包',brand:'摩尔线程',spec:'64×MTT S4000 · KUAE 万卡互联',price:5800000,type:'集采',tag:['国产化100%'],national:true,lead:'8–10周'},
  {id:'N7',name:'HGX B200 旗舰整机',brand:'NVIDIA',spec:'8×B200 · NVL72 互联',price:5200000,type:'预售',tag:['进口件','预售锁价'],national:false,lead:'12–16周'},
  {id:'N8',name:'天垓150 训练服务器',brand:'燧原',spec:'8×S60 · 320G 显存',price:660000,type:'现货',tag:['国产化100%'],national:true,lead:'2周'},
  {id:'N9',name:'国产化整机（海光）',brand:'海光',spec:'8×DCU K100 · 320G HBM2e',price:890000,type:'集采',tag:['国产化100%','集采拼单'],national:true,lead:'3–5周'},
],
groupBuy:{name:'昇腾 Atlas 900 A3 · 全国联采',joined:8,total:12,unit:'台',deadline:H(46),price:2360000},

/* ---------- M1 二手市场 ---------- */
usedDevices:[
  {id:'SH26-0117',sku:'H100 SXM5 80G',count:8,cond:'A',condScore:95,source:'头部云厂商退役',region:'河北·怀来',list:212000,deal:205800, ecc:0,hours:8420,health:92,cert:'已出报告',seller:'华东智算·官方店',type:'整件挂牌'},
  {id:'SH26-0118',sku:'H100 SXM5 80G',count:64,cond:'B+',condScore:82,source:'智算中心退役',region:'宁夏·中卫',list:196500,deal:197200,ecc:2,hours:15110,health:81,cert:'已出报告',seller:'西部算力集团',type:'批组挂牌'},
  {id:'SH26-0119',sku:'H200 SXM 141G',count:8,cond:'A',condScore:97,source:'扩容置换',region:'江苏·苏州',list:308000,deal:302400,ecc:0,hours:3260,health:96,cert:'已出报告',seller:'金陵数据',type:'整件挂牌'},
  {id:'SH26-0121',sku:'A100 PCIE 80G',count:16,cond:'A-',condScore:88,source:'企业机房升级',region:'江苏·苏州',list:89000,deal:86500,ecc:1,hours:12400,health:86,cert:'已出报告',seller:'金鸡湖智算',type:'整件挂牌'},
  {id:'SH26-0123',sku:'昇腾910B 64G',count:32,cond:'A',condScore:93,source:'运营商退役',region:'贵州·贵安',list:121000,deal:118400,ecc:0,hours:9980,health:91,cert:'已出报告',seller:'黔云智算',type:'批组挂牌'},
  {id:'SH26-0124',sku:'RTX 4090 24G',count:128,cond:'B',condScore:75,source:'渲染农场退役',region:'浙江·杭州',list:12800,deal:13050,ecc:5,hours:18900,health:72,cert:'检测中',seller:'阿里算力回收',type:'批组挂牌'},
  {id:'SH26-0126',sku:'L40S 48G',count:24,cond:'A-',condScore:90,source:'影视渲染企业',region:'广东·深圳',list:62500,deal:59800,ecc:0,hours:7100,health:89,cert:'已出报告',seller:'鹏城视算',type:'整件挂牌'},
  {id:'SH26-0127',sku:'MI300X 192G',count:8,cond:'A',condScore:96,source:'模型公司处置',region:'北京·亦庄',list:202000,deal:196800,ecc:0,hours:4110,health:95,cert:'已出报告',seller:'亦庄AI产业园',type:'整件挂牌'},
  {id:'SH26-0129',sku:'昇腾910B3 64G',count:16,cond:'A',condScore:94,source:'国产化置换',region:'上海·临港',list:137000,deal:132600,ecc:0,hours:5230,health:93,cert:'已出报告',seller:'临港新片区智算',type:'整件挂牌'},
  {id:'SH26-0130',sku:'A100 SXM4 40G',count:48,cond:'B+',condScore:80,source:'机房整体下线',region:'甘肃·庆阳',list:51000,deal:48900,ecc:3,hours:22400,health:76,cert:'已出报告',seller:'陇东算力',type:'批组挂牌'},
],

/* ---------- M1 供需大厅 ---------- */
demandList:[
  {id:'D2509-31',buyer:'某大模型公司',sku:'H100 SXM 80G',count:512,budget:'¥1.0–1.1亿',deadline:'30天',status:'匹配中',matched:3,pub:'09-24'},
  {id:'D2509-32',buyer:'某智算中心（跨界）',sku:'昇腾910B3',count:256,budget:'¥3,200–3,500万',deadline:'45天',status:'已撮合',matched:1,pub:'09-18'},
  {id:'D2509-33',buyer:'某AI应用企业',sku:'L40S 48G',count:64,budget:'¥380–420万',deadline:'15天',status:'匹配中',matched:2,pub:'09-25'},
  {id:'D2509-34',buyer:'某高校实验室联盟',sku:'RTX 4090',count:128,budget:'¥160–180万',deadline:'20天',status:'匹配中',matched:5,pub:'09-21'},
  {id:'D2509-35',buyer:'某租赁商',sku:'H200 SXM 141G',count:64,budget:'¥1,900–2,050万',deadline:'60天',status:'匹配中',matched:2,pub:'09-20'},
],
supplyList:[
  {id:'S2509-18',seller:'某云厂商',sku:'H100 SXM 80G',count:256,expect:'¥2.0亿',cert:'检测报告齐全',status:'在售',matched:4,pub:'09-22'},
  {id:'S2509-19',seller:'某运营商',sku:'昇腾910B',count:512,expect:'¥5,900万',cert:'可后补报告',status:'在售',matched:2,pub:'09-19'},
  {id:'S2509-21',seller:'某渲染企业',sku:'RTX 4090',count:200,expect:'¥250万',cert:'可后补报告',status:'在售',matched:6,pub:'09-25'},
  {id:'S2509-22',seller:'某智算中心',sku:'H20 96G',count:96,expect:'¥880万',cert:'检测报告齐全',status:'洽谈中',matched:1,pub:'09-15'},
],

/* ---------- M1 竞价拍卖 ---------- */
auctions:[
  {id:'A0912',sku:'H100 SXM5 80G ×16',type:'限时竞价',cur:3168000,bids:23,ends:H(5.2),reserve:'保留价 ¥2,620,000',appraisal:3088000,hot:true},
  {id:'A0915',sku:'A100 PCIE 80G ×32',type:'荷兰式降价',cur:2752000,bids:0,ends:H(26),reserve:'每2h降价2%',appraisal:2920000},
  {id:'A0917',sku:'RTX 4090 24G ×64',type:'限时竞价',cur:819200,bids:41,ends:H(1.1),reserve:'保留价 ¥780,000',appraisal:835000,hot:true},
  {id:'A0918',sku:'昇腾910B ×32',type:'限时竞价',cur:3880000,bids:9,ends:H(49),reserve:'保留价 ¥3,680,000',appraisal:3790000},
  {id:'A0920',sku:'MI300X 192G ×8',type:'荷兰式降价',cur:1580000,bids:2,ends:H(9.5),reserve:'每3h降价1.5%',appraisal:1574000},
  {id:'A0921',sku:'L40S 48G ×24',type:'限时竞价',cur:1436000,bids:15,ends:H(73),reserve:'保留价 ¥1,350,000',appraisal:1435000},
],
reverseAuction:{sku:'H200 SXM 141G ×32（求购）',budget:9680000,bids:6,lowest:9420000,ends:H(8.6)},

/* ---------- M1 大宗 OTC ---------- */
rfqs:[
  {id:'RFQ-2509-018',dir:'求购',sku:'H100 SXM 80G',count:512,budget:'¥1.05亿',status:'3家报价中',broker:'陈屹 · 高级经纪人',updated:'12分钟前'},
  {id:'RFQ-2509-021',dir:'出售',sku:'昇腾910B3',count:256,budget:'¥3,380万',status:'还价谈判中',broker:'苏婉 · 高级经纪人',updated:'1小时前'},
  {id:'RFQ-2509-014',dir:'求购',sku:'H200 超节点',count:20,budget:'¥5,360万',status:'已锁单',broker:'陈屹 · 高级经纪人',updated:'昨天'},
  {id:'RFQ-2509-022',dir:'出售',sku:'A100 SXM4 40G',count:512,budget:'¥2,510万',status:'待报价',broker:'林澈 · 经纪人',updated:'今天'},
],

/* ---------- M1 订单 ---------- */
orderSteps:['锁定','付款','检测','过户','交付','放款','互评'],
orders:[
  {id:'SO-25092301',sku:'H100 SXM5 80G ×64',amount:12576000,step:2,status:'检测中',deposit:'保证金 ¥125.8万 已冻结',buyer:'某大模型公司',time:'09-23',fund:'监管账户'},
  {id:'SO-25091807',sku:'昇腾910B ×32',amount:3788000,step:6,status:'待互评',deposit:'已放款',buyer:'某智算中心',time:'09-18',fund:'放款完成 T+1'},
  {id:'SO-25092509',sku:'RTX 4090 ×128',amount:1640000,step:1,status:'待付款',deposit:'保证金 ¥16.4万 已冻结',buyer:'某高校联盟',time:'09-25',fund:'监管账户'},
  {id:'SO-25092214',sku:'H200 SXM 141G ×8',amount:2419000,step:3,status:'过户中',deposit:'货款已入监管',buyer:'某租赁商',time:'09-22',fund:'监管账户'},
  {id:'SO-25091203',sku:'L40S ×24',amount:1436000,step:6,status:'已完成',deposit:'双向互评 5.0',buyer:'某渲染企业',time:'09-12',fund:'放款完成'},
],

/* ---------- M2 专业算力 ---------- */
clusters:[
  {id:'CL-01',name:'华北·怀来 千卡训练集群',scale:'1024× H100 SXM',net:'IB NDR 400G · 无收敛三平面',sla:'白金 99.9%',region:'河北·怀来',price:36.8,unit:'卡时',mode:'闭口长约 / RFQ',fs:2200,storage:'12PB 全闪',power:'风冷+冷板液冷'},
  {id:'CL-02',name:'华东·苏州 H200 超节点',scale:'64× H200 SXM（8卡/机）',net:'NVLink + 400G RoCE',sla:'白金 99.9%',region:'江苏·苏州',price:52.0,unit:'卡时',mode:'闭口长约',fs:2560,storage:'8PB',power:'液冷'},
  {id:'CL-03',name:'西部·中卫 昇腾集群',scale:'1024× 昇腾910B3',net:'RoCE 200G',sla:'金 99.5%',region:'宁夏·中卫',price:19.8,unit:'卡时',mode:'闭口长约 / 按月',fs:1120,storage:'6PB',power:'自然冷'},
  {id:'CL-04',name:'华南·韶关 A100 集群',scale:'512× A100 SXM 80G',net:'IB HDR 200G',sla:'金 99.5%',region:'广东·韶关',price:18.2,unit:'卡时',mode:'闭口长约',fs:1600,storage:'5PB',power:'风冷'},
  {id:'CL-05',name:'东北·哈尔滨 裸金属池',scale:'128× L40S · 裸金属',net:'以太 200G',sla:'现货',region:'黑龙江·哈尔滨',price:8.6,unit:'卡时',mode:'现货/按月',fs:400,storage:'2PB',power:'自然冷'},
  {id:'CL-06',name:'西南·贵安 训推一体池',scale:'256× 昇腾910B',net:'RoCE 200G',sla:'金 99.5%',region:'贵州·贵安',price:22.5,unit:'卡时',mode:'闭口/开口混合',fs:960,storage:'4PB',power:'水冷'},
],
slaTiers:[
  {tier:'白金级',avail:'99.9%',pay:'故障时长 3× 赔付',extra:'专属机房 · IB 保障 · 7×24 驻场',color:'mint'},
  {tier:'黄金级',avail:'99.5%',pay:'故障时长 2× 赔付',extra:'共享机房 · 计划内维护豁免',color:'gold'},
  {tier:'尽力而为',avail:'尽力而为',pay:'不赔付 · 多节点冗余校验',extra:'现货 · 断点续跑 · 适合无状态任务',color:'gray'},
],

/* ---------- M2 闲散算力 ---------- */
spotGpus:[
  {id:'SP01',gpu:'RTX 4090 24G',owner:'企业闲置服务器·杭州',util:87,price:4.2,discount:'云价2.7折',lat:12,status:'接单中',uptime:'46天',tasks:152},
  {id:'SP02',gpu:'RTX 4090 24G',owner:'个人工作站·成都',util:64,price:4.5,discount:'云价2.9折',lat:22,status:'接单中',uptime:'128天',tasks:89},
  {id:'SP03',gpu:'A100 PCIE 80G',owner:'企业机房·北京',util:91,price:18.5,discount:'云价5.2折',lat:8,status:'接单中',uptime:'210天',tasks:64},
  {id:'SP04',gpu:'昇腾910B 64G',owner:'运营商机房·贵阳',util:58,price:13.2,discount:'云价4.1折',lat:18,status:'接单中',uptime:'95天',tasks:37},
  {id:'SP05',gpu:'RTX 5090 32G',owner:'个人工作站·深圳',util:76,price:7.8,discount:'云价3.4折',lat:9,status:'接单中',uptime:'33天',tasks:118},
  {id:'SP06',gpu:'H100 SXM 80G',owner:'智算中心闲时·张家口',util:42,price:24.9,discount:'云价6.5折',lat:15,status:'闲时开放',uptime:'370天',tasks:210},
  {id:'SP07',gpu:'L20 48G',owner:'企业闲置·上海',util:33,price:9.8,discount:'云价4.8折',lat:11,status:'接单中',uptime:'61天',tasks:44},
  {id:'SP08',gpu:'RTX 4090D 24G',owner:'渲染农场·青岛',util:52,price:4.0,discount:'云价2.6折',lat:19,status:'接单中',uptime:'88天',tasks:76},
],
agentSteps:['安装 Agent','接入遥测','定价策略','开始接单'],

/* ---------- M2 TOKEN 商城 ---------- */
tokenModels:[
  {id:'T1',model:'DeepSeek-V3.2',vendor:'深度求索',idx:89,input:1.0,output:8.4,cache:0.12,ctx:'128K',tags:['深度思考','开源权重'],today:'4.2B'},
  {id:'T2',model:'Qwen3-235B-A22B',vendor:'阿里云',idx:88,input:2.0,output:12.7,cache:0.40,ctx:'256K',tags:['MoE','开源权重'],today:'3.1B'},
  {id:'T3',model:'GLM-5-Plus',vendor:'智谱',idx:86,input:2.5,output:14.0,cache:0.45,ctx:'200K',tags:['工具调用'],today:'1.8B'},
  {id:'T4',model:'Kimi-K2',vendor:'月之暗面',idx:85,input:4.0,output:16.0,cache:0.60,ctx:'256K',tags:['长文本'],today:'0.9B'},
  {id:'T5',model:'ERNIE-5.0',vendor:'百度',idx:83,input:2.4,output:9.6,cache:0.36,ctx:'128K',tags:['多模态'],today:'1.2B'},
  {id:'T6',model:'Hunyun-T1',vendor:'腾讯云',idx:82,input:1.8,output:9.0,cache:0.30,ctx:'256K',tags:['深度思考'],today:'0.8B'},
  {id:'T7',model:'DeepSeek-V3.2-Flash',vendor:'深度求索',idx:71,input:0.4,output:0.4,cache:0.04,ctx:'128K',tags:['极速','高性价比'],today:'12.4B'},
  {id:'T8',model:'Llama-4-Maverick',vendor:'社区部署',idx:78,input:1.5,output:6.5,cache:0.20,ctx:'256K',tags:['开源权重'],today:'0.6B'},
],
tokenPackages:[
  {size:'100M tokens',price:1200,perM:12.0,off:'标准价',best:false},
  {size:'1B tokens',price:10800,perM:10.8,off:'9折',best:true},
  {size:'10B tokens',price:96000,perM:9.6,off:'8折',best:false},
],
apiKeys:[
  {name:'prod-inference-main',model:'DeepSeek-V3.2',created:'09-02',used:'82%',status:'启用'},
  {name:'batch-etl-nightly',model:'DeepSeek-V3.2-Flash',created:'08-14',used:'41%',status:'启用'},
  {name:'sandbox-test',model:'Qwen3-235B-A22B',created:'09-21',used:'6%',status:'停用'},
],

/* ---------- M2 推理竞价 ---------- */
bidTasks:[
  {id:'B-0926-01',spec:'70B FP8 · ctx 1024 · 输入输出混合',daily:'2B tokens/日',lowest:6.85,bidders:6,ends:H(2.1),benchmark:'市价 ¥8.1/M'},
  {id:'B-0926-02',spec:'235B MoE · ctx 32K · 长上下文',daily:'800M tokens/日',lowest:11.2,bidders:3,ends:H(5.7),benchmark:'市价 ¥13.9/M'},
  {id:'B-0926-03',spec:'Embedding bge-m3 · 向量化',daily:'10B tokens/日',lowest:0.08,bidders:8,ends:H(1.2),benchmark:'市价 ¥0.12/M'},
  {id:'B-0926-04',spec:'视觉理解 34B · 图片1M张/日',daily:'1M images/日',lowest:0.21,bidders:4,ends:H(9.4),benchmark:'市价 ¥0.30/张'},
],

/* ---------- M2 计量计费 ---------- */
billingSummary:{month:'2026-09',payable:284530,discount:'阶梯折扣 -6%',items:[
  {name:'华北训练集群 · 闭口长约',unit:'卡时',usage:'184,320',price:'¥36.80',amount:'6,782,976分摊',cache:'—'},
  {name:'闲散算力 · 现货调度',unit:'卡时',usage:'96,540',price:'¥4.35均',amount:'419,949',cache:'—'},
  {name:'DeepSeek-V3.2 · API',unit:'M tokens',usage:'1,842,000',price:'输出¥8.4',amount:'15,472,800分摊',cache:'命中率 62%'},
  {name:'Flash · 批处理',unit:'M tokens',usage:'8,120,000',price:'输出¥0.4',amount:'3,248,000分摊',cache:'命中率 88%'},
]},

/* ---------- M2 SLA ---------- */
slaStats:[
  {tier:'白金级',avail:99.97,target:'99.9%',incidents:1,paid:18400},
  {tier:'黄金级',avail:99.82,target:'99.5%',incidents:2,paid:66200},
  {tier:'尽力而为',avail:98.10,target:'尽力而为',incidents:9,paid:0},
],
slaIncidents:[
  {id:'INC-0921',res:'华东·苏州 H200 超节点',type:'IB 网络抖动',impact:'降级 12 分钟',comp:18400,status:'已赔付到账',time:'09-21 14:32'},
  {id:'INC-0912',res:'西部·中卫 910B 集群',type:'市电闪断',impact:'中断 43 分钟',comp:66200,status:'已赔付到账',time:'09-12 03:17'},
  {id:'INC-0908',res:'闲散算力·华东池',type:'节点批量掉线',impact:'冗余切换成功',comp:0,status:'SLA豁免',time:'09-08 22:41'},
],

/* ---------- M3 金融 ---------- */
finProducts:[
  {type:'设备抵押融资',org:'中原银行·科技支行',rate:'年化 3.85%',ltv:'放款率 ≤65%',term:'期限 36月',note:'以平台成交价中位数为估值基准',hot:true},
  {type:'融资租赁（直租）',org:'国银金租',rate:'年化 4.20%',ltv:'放款率 ≤70%',term:'48月 · ¥100留购',note:'设备直租 · 期满所有权转移'},
  {type:'售后回租',org:'招银金租',rate:'年化 4.35%',ltv:'放款率 ≤60%',term:'36月',note:'盘活存量设备 · 表内融资'},
  {type:'应收账款保理',org:'招商保理',rate:'贴现 5.1%',ltv:'融资比例 ≤80%',term:'12月',note:'仅覆盖已签算力合同应收'},
  {type:'交易分期',org:'平台担保 + 银行',rate:'年化 4.8%',ltv:'首付 ≥30%',term:'6–24月',note:'设备抵押登记 · 违约进M4处置'},
  {type:'处置差价险',org:'平安产险',rate:'费率 0.8%',ltv:'保额=处置差额',term:'随贷款',note:'赔付处置成交价低于评估值差额',hot:true},
],
finFlow:['估值','押品登记','放款','贷后监控','处置出口'],
finStats:[
  {label:'累计撮合放款',value:'¥18.6',unit:'亿'},
  {label:'在贷余额',value:'¥11.2',unit:'亿'},
  {label:'平均放款率',value:'62.4',unit:'%'},
  {label:'不良率（违约进入处置）',value:'1.9',unit:'%'},
],

/* ---------- M3 贷后监控 ---------- */
loans:[
  {id:'LN-2501',borrower:'某智算中心A',collateral:'H100 ×2048',balance:'¥2.8亿',ltv:63,util:82,rent:'正常',level:'正常',note:'利用率健康'},
  {id:'LN-2506',borrower:'某租赁商B',collateral:'910B ×512',balance:'¥0.6亿',ltv:71,util:58,rent:'逾期1期',level:'关注',note:'利用率连续14日<60%'},
  {id:'LN-2509',borrower:'某科技公司C',collateral:'A100 ×128',balance:'¥0.4亿',ltv:55,util:71,rent:'正常',level:'正常',note:''},
  {id:'LN-2511',borrower:'某智算中心D',collateral:'H200 ×256',balance:'¥1.7亿',ltv:78,util:66,rent:'正常',level:'可疑',note:'H200市价30日跌幅-8.2%，LTV超限'},
  {id:'LN-2514',borrower:'某模型公司E',collateral:'910B ×128',balance:'¥0.16亿',ltv:74,util:12,rent:'逾期60日',level:'违约',note:'已触发处置流程'},
],

/* ---------- M4 押品库 ---------- */
collaterals:[
  {id:'C-2025-0342',sku:'H100 SXM ×512',appraisal:102400000,market:96800000,ltv:61,bank:'中原银行',reg:'已登记',ins:'已投保',loc:'怀来·托管机房A',level:'正常'},
  {id:'C-2025-0351',sku:'昇腾910B ×256',appraisal:31000000,market:29500000,ltv:70,bank:'国银金租',reg:'已登记',ins:'已投保',loc:'中卫·托管机房B',level:'关注'},
  {id:'C-2025-0338',sku:'RTX 4090 ×1024',appraisal:13100000,market:12600000,ltv:66,bank:'民生银行',reg:'已登记',ins:'投保中',loc:'杭州·托管仓库',level:'正常'},
  {id:'C-2025-0329',sku:'H200 SXM ×128',appraisal:39800000,market:36500000,ltv:77,bank:'浦发银行',reg:'已登记',ins:'已投保',loc:'苏州·托管机房',level:'可疑'},
  {id:'C-2025-0315',sku:'MI300X ×64',appraisal:12600000,market:12100000,ltv:58,bank:'光大银行',reg:'登记中',ins:'已投保',loc:'亦庄·托管机房',level:'正常'},
  {id:'C-2025-0330',sku:'910B ×128',appraisal:16800000,market:16500000,ltv:74,bank:'中原银行',reg:'已登记',ins:'已投保',loc:'贵安·托管机房',level:'违约'},
],

/* ---------- M4 预警 ---------- */
alerts:[
  {id:'W-0926-01',level:'违约',target:'某模型公司E · 910B ×128',sources:['遥测','回款'],desc:'利用率连续30日<15%，租金逾期60日',suggest:'建议 T1 快速回购（流动性好，评估价90–95%）',time:'09-26 08:12'},
  {id:'W-0926-02',level:'可疑',target:'某智算中心D · H200 ×256',sources:['市价'],desc:'H200 市价30日跌幅-8.2%，LTV 78%→81%',suggest:'建议季度重估 + 通知补充担保',time:'09-25 16:40'},
  {id:'W-0926-03',level:'关注',target:'某租赁商B · 910B ×512',sources:['遥测','回款'],desc:'利用率跌破58%，租金逾期1期',suggest:'推送资金方 · 建议现场尽调',time:'09-24 11:05'},
  {id:'W-0926-04',level:'关注',target:'某智算中心F · A100 ×256',sources:['遥测'],desc:'上架率跌破70%（当前66%）',suggest:'触发托管运维优化方案（M5-03）',time:'09-22 09:30'},
],

/* ---------- M4 处置 ---------- */
disposalSteps:['违约确认','接管','检测','数据清除','挂牌','成交','过户','清分','报告'],
disposals:[
  {id:'D-2509-01',sku:'昇腾910B ×128',channel:'T1',step:2,appraisal:16800000,expect:'≤7天',buyer:'生态买家池预出价 · 评估价95%',bank:'中原银行',fund:'监管账户已开立'},
  {id:'D-2508-17',sku:'H200 SXM ×64',channel:'T2',step:4,appraisal:19900000,expect:'7–15天',buyer:'公开竞价 · 12轮出价',bank:'浦发银行',fund:'保留价=评估价85%'},
  {id:'D-2508-03',sku:'A100 ×512 + 机房租约',channel:'T3',step:5,appraisal:24800000,expect:'15–30天',buyer:'整包承接 · 含电力/运维合同',bank:'民生银行',fund:'共管账户谈判中'},
  {id:'D-2507-29',sku:'RTX 4090 ×2048',channel:'T3',step:8,appraisal:26200000,expect:'已完成',buyer:'回收商联盟',bank:'民生银行',fund:'清分完成 · 回收率96.2%'},
],
channels:[
  {code:'T1',name:'快速回购',days:'≤7天',fit:'流动性好的热门SKU',desc:'生态买家池/平台自营预出价，先到先得锁定，评估价90–95%成交',fee:'通道费 4%'},
  {code:'T2',name:'公开竞价',days:'7–15天',fit:'中等流动性、数量适中',desc:'押品专区挂牌拍卖，保留价=评估价85%，全流程留痕，支持多轮',fee:'通道费 3%'},
  {code:'T3',name:'整包大宗处置',days:'15–30天',fit:'大批量/跨机房/含配套',desc:'经纪撮合整机房打包出售，含机房租约、电力、运维合同整体承接',fee:'通道费 2%'},
],
bankAuctions:[
  {id:'BA-01',bank:'中原银行',sku:'H100 SXM5 80G ×64（批组）',appraisal:13120000,entry:11152000,bids:18,ends:H(70),note:'检测报告已披露 · 数据清除认证已附',hot:true},
  {id:'BA-02',bank:'国银金租',sku:'昇腾910B ×256',appraisal:31000000,entry:26350000,bids:6,ends:H(118),note:'国产化合规 · 含上架服务',hot:false},
  {id:'BA-03',bank:'某AMC',sku:'RTX 4090 ×512（渲染池退役）',appraisal:6520000,entry:5540000,bids:31,ends:H(22),note:'批组拆售可选 · 含机架配件',hot:true},
  {id:'BA-04',bank:'浦发银行',sku:'H200 SXM ×32',appraisal:9950000,entry:8460000,bids:9,ends:H(46),note:'整柜交付 · 含IB交换机',hot:false},
],
bankStats:[
  {label:'在管押品总值',value:'¥21.3',unit:'亿'},
  {label:'合作债权方',value:'6',unit:'家'},
  {label:'处置回流率',value:'60.8',unit:'%'},
  {label:'平均回收率',value:'94.1',unit:'%'},
],

/* ---------- M5 解决方案 ---------- */
solutions:[
  {id:'S1',code:'M5-01',name:'智算中心建设',icon:'building',pain:'跨界进入者「选址/电力/资金」三重阻碍',desc:'选址与电力测算 · 液冷机柜方案 · EPC 总包对接 · 建设期融资打包',tags:['EPC','融资打包','液冷']},
  {id:'S2',code:'M5-02',name:'国产化替代',icon:'flag',pain:'国产份额加速上升期的选型焦虑',desc:'昇腾/寒武纪/海光/沐曦/摩尔线程/燧原选型库 · CUDA 迁移评估 · ROI 测算',tags:['选型库','迁移评估','ROI']},
  {id:'S3',code:'M5-03',name:'托管运维',icon:'gear',pain:'中小租赁商毛利 <20% 的降本刚需',desc:'设备托管与上架率优化 · 集群运维 · 故障替换 · 性能调优',tags:['上架率','运维SLA']},
  {id:'S4',code:'M5-04',name:'闲置算力激活',icon:'zap',pain:'35% 机架闲置的变现需求',desc:'Agent 部署 · 计量改造 · 收益分成模式设计 · 一键接入闲散市场',tags:['Agent','计量改造']},
  {id:'S5',code:'M5-05',name:'绿色算力',icon:'leaf',pain:'ESG 与绿电采购压力',desc:'绿电采购 · 碳标签认证（对接算力碳标签方向）· PUE 优化',tags:['绿电','碳标签']},
  {id:'S6',code:'M5-06',name:'跨境算力',icon:'globe',pain:'「境外资产、境内融资」路径',desc:'海外算力采购合规通道 · 香港 RWA 出海架构咨询',tags:['合规通道','香港RWA']},
],

/* ---------- 机构入驻 ---------- */
onboardRoles:[
  {name:'设备卖方（OEM/代理/回收商）',desc:'挂牌、批组、寄售与回购',tags:['挂牌','批组溢价','24h回购报价']},
  {name:'设备买方（智算中心/租赁商）',desc:'集采、分期、检测保障交付',tags:['集采拼单','分期','检测']},
  {name:'算力供给方',desc:'闲散算力接入、长约定价',tags:['Agent接入','长约']},
  {name:'算力需求方',desc:'TOKEN、卡时、集群按需采购',tags:['TOKEN','SLA']},
  {name:'金融机构（银行/金租/保理）',desc:'押品定价、贷后监控、处置',tags:['押品登记','处置通道']},
  {name:'检测认证机构',desc:'标准化体检与数据清除认证',tags:['burn-in','数据清除']},
  {name:'服务商（物流/运维/翻新）',desc:'专线物流、机房上架、翻新',tags:['专线','上架']},
  {name:'债权处置方（银行资保/AMC）',desc:'违约预警与三通道快速处置',tags:['T1/T2/T3','资金监管']},
],
onboardSteps:['提交主体信息','银行级KYC实名','资质与场景审核','开通子账号权限','签署平台协议'],

/* ---------- FAQ ---------- */
faqs:[
  {q:'平台的「双轨价格」是什么？',a:'设备价格指数同时发布挂牌均价与成交价中位数（对标国际 CCIR 双轨模式），用于揭示挂价与真实成交的价差，为银行、保险与买家提供可审计的定价锚点。'},
  {q:'二手设备交易如何保障检测可信？',a:'下单即触发第三方检测：burn-in 测试、ECC 错误计数、热历史分析、显存压测，并出具设备体检报告。报告不符可退单，符合则付款至监管账户。'},
  {q:'什么是对算力交易的双 TOKEN 形态？',a:'同时支持设备租赁型算力（按卡时/机时计量）与大模型 TOKEN 型算力（按 API 调用量计量），计量网关统一计费并支持缓存命中差异化定价。'},
  {q:'银行押品处置的三条通道时效？',a:'T1 快速回购 ≤7 天；T2 公开竞价 7–15 天；T3 整包大宗处置 15–30 天。处置资产直接回流平台二手与租赁市场获得市场化价格，而非折价甩卖。'},
  {q:'资金安全如何保障？',a:'全交易采用资金监管账户模式，平台不碰资金池。处置成交款进入共管监管账户，按贷款合同分配（本金→罚息→费用→余额返还借款人），全程可追溯。'},
  {q:'数据清除认证的适用场景？',a:'针对含存储部件设备，提供擦除/消磁/物理销毁三档，全程录像留档≥3年并出具认证证书，满足金融与政企卖方的硬性合规要求。'},
]
};
})();
