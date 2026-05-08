<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="theme-color" content="#7C3AED">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>Thinko</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin></script>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body,#root{height:100%;overflow:hidden}
body{font-family:'Nunito',system-ui,sans-serif;background:#F8F5FF}
.drum{height:120px;overflow:hidden;position:relative;width:60px;cursor:grab;user-select:none;touch-action:none}
.drum-inner{display:flex;flex-direction:column}
.drum-item{height:40px;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;color:rgba(255,255,255,0.3);flex-shrink:0}
.drum-item.sel{color:#fff;font-size:22px;font-weight:900}
.drum-item.near{color:rgba(255,255,255,0.65);font-size:19px}
.drum::before{content:'';position:absolute;top:0;left:0;right:0;height:40px;background:linear-gradient(to bottom,rgba(124,58,237,.98),transparent);z-index:2;pointer-events:none}
.drum::after{content:'';position:absolute;bottom:0;left:0;right:0;height:40px;background:linear-gradient(to top,rgba(124,58,237,.98),transparent);z-index:2;pointer-events:none}
.drum-line{position:absolute;top:40px;left:4px;right:4px;height:40px;border-top:1.5px solid rgba(255,255,255,0.25);border-bottom:1.5px solid rgba(255,255,255,0.25);pointer-events:none;z-index:3}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
</style>
</head>
<body>
<div id="root"></div>
<script>
var h=React.createElement;
var useState=React.useState,useRef=React.useRef,useEffect=React.useEffect;

var TASK_COLORS=["#DC2626","#D97706","#059669","#2563EB","#7C3AED","#DB2777","#0891B2","#65A30D"];
var LIST_COLORS=["#7C3AED","#2563EB","#059669","#DB2777","#D97706","#0891B2","#DC2626","#65A30D"];
var DVALS=[];for(var _d=1;_d<=99;_d++)DVALS.push(_d);

function Drum(props){
  var selIdx=DVALS.indexOf(props.value||25);if(selIdx<0)selIdx=24;
  var ref=useRef(null),startY=useRef(null),startIdx=useRef(selIdx),curIdx=useRef(selIdx);
  function clamp(n){return Math.max(0,Math.min(DVALS.length-1,n));}
  function applyIdx(idx,anim){
    if(!ref.current)return;
    var inner=ref.current.querySelector(".drum-inner");
    if(!inner)return;
    inner.style.transition=anim?"transform .18s ease":"none";
    inner.style.transform="translateY("+(-idx*40+40)+"px)";
    var items=ref.current.querySelectorAll(".drum-item");
    items.forEach(function(el,i){el.className="drum-item"+(i===idx?" sel":Math.abs(i-idx)===1?" near":"");});
  }
  function onDown(e){startY.current=e.touches?e.touches[0].clientY:e.clientY;startIdx.current=curIdx.current;e.preventDefault();}
  function onMove(e){if(startY.current===null)return;var y=e.touches?e.touches[0].clientY:e.clientY;var ni=clamp(Math.round(startIdx.current+(startY.current-y)/40));if(ni!==curIdx.current){curIdx.current=ni;applyIdx(ni,false);}e.preventDefault();}
  function onUp(e){if(startY.current===null)return;startY.current=null;applyIdx(curIdx.current,true);props.onChange(DVALS[curIdx.current]);e.preventDefault();}
  function onWheel(e){var ni=clamp(curIdx.current+(e.deltaY>0?1:-1));curIdx.current=ni;applyIdx(ni,true);props.onChange(DVALS[ni]);e.preventDefault();}
  useEffect(function(){applyIdx(selIdx,false);},[]);
  return h("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4}},
    h("div",{ref:ref,className:"drum",onTouchStart:onDown,onTouchMove:onMove,onTouchEnd:onUp,onMouseDown:onDown,onMouseMove:onMove,onMouseUp:onUp,onMouseLeave:onUp,onWheel:onWheel},
      h("div",{className:"drum-inner"},DVALS.map(function(v){return h("div",{key:v,className:"drum-item"},v);})),
      h("div",{className:"drum-line"})
    ),
    h("div",{style:{fontSize:10,fontWeight:800,color:"rgba(255,255,255,.5)",letterSpacing:"0.1em"}},props.label||"MIN")
  );
}

function fmt(s){return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");}

function TimerSheet(props){
  var _w=useState(props.wm||25);var wm=_w[0],setWm=_w[1];
  var _b=useState(props.bm||5);var bm=_b[0],setBm=_b[1];
  return h("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"},onClick:function(e){if(e.target===e.currentTarget)props.onClose();}},
    h("div",{style:{background:props.color||"#7C3AED",borderRadius:"22px 22px 0 0",padding:"22px 20px 40px",width:"100%",maxWidth:480,animation:"slideUp .28s ease-out"}},
      h("div",{style:{width:34,height:4,background:"rgba(255,255,255,.3)",borderRadius:100,margin:"0 auto 18px"}}),
      h("div",{style:{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:3}},"TIMER FOR"),
      h("div",{style:{fontSize:15,fontWeight:800,color:"#fff",marginBottom:22,lineHeight:1.3}},props.taskText),
      h("div",{style:{display:"flex",justifyContent:"space-around",alignItems:"flex-start",marginBottom:24}},
        h("div",{style:{textAlign:"center"}},h("div",{style:{fontSize:11,fontWeight:800,color:"rgba(255,255,255,.55)",marginBottom:10,letterSpacing:"0.1em"}},"WORK"),h(Drum,{value:wm,onChange:setWm})),
        h("div",{style:{alignSelf:"center",fontSize:22,color:"rgba(255,255,255,.3)",fontWeight:700,marginTop:20}},"//"),
        h("div",{style:{textAlign:"center"}},h("div",{style:{fontSize:11,fontWeight:800,color:"rgba(255,255,255,.55)",marginBottom:10,letterSpacing:"0.1em"}},"BREAK"),h(Drum,{value:bm,onChange:setBm}))
      ),
      h("button",{onClick:function(){props.onSave(wm,bm);},style:{width:"100%",padding:15,background:"#fff",border:"none",borderRadius:14,color:props.color||"#7C3AED",fontSize:15,fontWeight:900,fontFamily:"inherit",cursor:"pointer"}},"Set: "+wm+"min work / "+bm+"min break"),
      h("button",{onClick:props.onClose,style:{width:"100%",padding:11,background:"transparent",border:"none",color:"rgba(255,255,255,.5)",fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer",marginTop:6}},"Cancel")
    )
  );
}

function RunTimer(props){
  var _p=useState("work");var phase=_p[0],setPhase=_p[1];
  var _l=useState(props.wm*60);var left=_l[0],setLeft=_l[1];
  var _pa=useState(false);var paused=_pa[0],setPaused=_pa[1];
  var _c=useState(0);var cycles=_c[0],setCycles=_c[1];
  var ref=useRef(null);
  useEffect(function(){
    if(paused){clearInterval(ref.current);return;}
    ref.current=setInterval(function(){setLeft(function(p){if(p<=1){clearInterval(ref.current);setPhase(function(ph){if(ph==="work"){setLeft(props.bm*60);setCycles(function(c){return c+1;});return"break";}else{setLeft(props.wm*60);return"work";}});return 0;}return p-1;});},1000);
    return function(){clearInterval(ref.current);};
  },[paused,phase]);
  var isWork=phase==="work",total=isWork?props.wm*60:props.bm*60,prog=(total-left)/total;
  var r=82,circ=2*Math.PI*r,col=isWork?(props.color||"#7C3AED"):"#059669";
  return h("div",{style:{position:"fixed",inset:0,background:"#F8F5FF",zIndex:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28,gap:16}},
    h("div",{style:{fontSize:11,fontWeight:800,color:"#9B8BB4",letterSpacing:"0.12em"}},isWork?"FOCUS TIME":"BREAK TIME"),
    h("div",{style:{fontSize:14,fontWeight:700,color:"#5B4C7A",textAlign:"center",maxWidth:240,lineHeight:1.4}},props.taskText),
    h("div",{style:{position:"relative",width:184,height:184}},
      h("svg",{width:"184",height:"184",style:{transform:"rotate(-90deg)"}},h("circle",{cx:"92",cy:"92",r:r,fill:"none",stroke:"#E9E0FF",strokeWidth:"10"}),h("circle",{cx:"92",cy:"92",r:r,fill:"none",stroke:col,strokeWidth:"10",strokeLinecap:"round",strokeDasharray:circ,strokeDashoffset:circ*(1-prog),style:{transition:"stroke-dashoffset 1s linear,stroke .5s"}})),
      h("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}},h("div",{style:{fontSize:40,fontWeight:900,color:col,letterSpacing:"-1px"}},fmt(left)),h("div",{style:{fontSize:10,fontWeight:800,color:"#9B8BB4",marginTop:3,letterSpacing:"0.1em"}},isWork?"WORK":"BREAK"))
    ),
    cycles>0&&h("div",{style:{background:"#EDE9FE",borderRadius:100,padding:"5px 14px",fontSize:12,fontWeight:800,color:"#7C3AED"}},cycles+" cycle"+(cycles===1?"":"s")+" done"),
    h("div",{style:{display:"flex",gap:10,width:"100%",maxWidth:220}},
      h("button",{onClick:function(){setPaused(function(v){return !v;});},style:{flex:2,padding:13,background:"#EDE9FE",border:"2px solid "+(props.color||"#7C3AED"),borderRadius:13,color:props.color||"#7C3AED",fontSize:14,fontWeight:800,fontFamily:"inherit",cursor:"pointer"}},paused?"\u25B6 Resume":"\u23F8 Pause"),
      h("button",{onClick:props.onClose,style:{flex:1,padding:13,background:"#fff",border:"1.5px solid #E9E0FF",borderRadius:13,color:"#9B8BB4",fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}},"\u2715")
    )
  );
}

function ListView(props){
  var list=props.list;
  var _items=useState(list.items||[]);var items=_items[0],setItems=_items[1];
  var _inp=useState("");var inp=_inp[0],setInp=_inp[1];
  var _done=useState({});var done=_done[0],setDone=_done[1];
  var _cPick=useState(null);var cPick=_cPick[0],setCPick=_cPick[1];
  var _tSheet=useState(null);var tSheet=_tSheet[0],setTSheet=_tSheet[1];
  var _runT=useState(null);var runT=_runT[0],setRunT=_runT[1];
  var _tInfo=useState({});var tInfo=_tInfo[0],setTInfo=_tInfo[1];
  var _phase=useState("list");var phase=_phase[0],setPhase=_phase[1];
  var _pairs=useState([]);var pairs=_pairs[0],setPairs=_pairs[1];
  var _pIdx=useState(0);var pIdx=_pIdx[0],setPIdx=_pIdx[1];
  var _wins=useState({});var wins=_wins[0],setWins=_wins[1];
  var iRef=useRef(null);
  useEffect(function(){props.onUpdate(items);},[items]);
  function add(){var v=inp.trim();if(!v)return;setItems(function(p){return p.concat([{text:v,color:TASK_COLORS[p.length%TASK_COLORS.length]}]);});setInp("");if(iRef.current)iRef.current.focus();}
  function saveT(i,wm,bm){setTInfo(function(p){var n=Object.assign({},p);n[i]={wm:wm,bm:bm};return n;});setTSheet(null);}
  function startPri(){
    var active=items.filter(function(_,i){return !done[i];});
    if(active.length<2)return;
    var txts=active.map(function(x){return x.text;});
    var ps=[];for(var i=0;i<txts.length;i++)for(var j=i+1;j<txts.length;j++)ps.push([txts[i],txts[j]]);
    for(var k=ps.length-1;k>0;k--){var r=Math.floor(Math.random()*(k+1));var tmp=ps[k];ps[k]=ps[r];ps[r]=tmp;}
    var w={};txts.forEach(function(t){w[t]=0;});
    setPairs(ps);setPIdx(0);setWins(w);setPhase("comparing");
  }
  function pickWinner(winner){
    var nw=Object.assign({},wins);nw[winner]=(nw[winner]||0)+1;
    var ni=pIdx+1;
    if(ni>=pairs.length){
      var ranked=Object.entries(nw).sort(function(a,b){return b[1]-a[1];}).map(function(e){return e[0];});
      setItems(function(prev){
        var doneItems=prev.filter(function(_,i){return done[i];});
        var activeItems=prev.filter(function(_,i){return !done[i];});
        var sorted=ranked.map(function(txt){return activeItems.find(function(x){return x.text===txt;});}).filter(Boolean);
        return sorted.concat(doneItems);
      });
      setPhase("list");
    }else{setWins(nw);setPIdx(ni);}
  }
  var active=items.filter(function(_,i){return !done[i];});
  var dc=Object.values(done).filter(Boolean).length;

  if(phase==="comparing"){
    var pair=pairs[pIdx];
    var pct=Math.round((pIdx/pairs.length)*100);
    return h("div",{style:{display:"flex",flexDirection:"column",height:"100%",background:"#F8F5FF"}},
      h("div",{style:{background:"#2563EB",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}},
        h("button",{onClick:function(){setPhase("list");},style:{background:"none",border:"none",color:"#fff",fontSize:22,cursor:"pointer",lineHeight:1}},"\u2190"),
        h("div",{style:{flex:1,fontSize:16,fontWeight:800,color:"#fff"}},"Prioritiser"),
        h("div",{style:{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.7)"}},pct+"%")
      ),
      h("div",{style:{height:4,background:"rgba(37,99,235,.2)"}},h("div",{style:{height:"100%",width:pct+"%",background:"#2563EB",transition:"width .3s"}})),
      h("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 20px",gap:24}},
        h("div",{style:{fontSize:22,fontWeight:900,color:"#1E1033",textAlign:"center",lineHeight:1.3}},"Which one is most important?"),
        h("div",{style:{display:"flex",gap:16,width:"100%",alignItems:"center",justifyContent:"center"}},
          h("button",{onClick:function(){pickWinner(pair[0]);},style:{flex:1,maxWidth:150,padding:"24px 14px",background:"#60A5FA",borderRadius:18,border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:14,boxShadow:"0 6px 24px rgba(37,99,235,.3)"}},
            h("div",{style:{width:50,height:50,background:"rgba(255,255,255,.4)",borderRadius:10}}),
            h("div",{style:{fontSize:15,fontWeight:800,color:"#fff",textAlign:"center",lineHeight:1.3}},pair[0])
          ),
          h("div",{style:{fontSize:24,fontWeight:900,color:"#DC2626",flexShrink:0}},"OR"),
          h("button",{onClick:function(){pickWinner(pair[1]);},style:{flex:1,maxWidth:150,padding:"24px 14px",background:"#60A5FA",borderRadius:18,border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:14,boxShadow:"0 6px 24px rgba(37,99,235,.3)"}},
            h("div",{style:{width:50,height:50,background:"rgba(255,255,255,.4)",borderRadius:10}}),
            h("div",{style:{fontSize:15,fontWeight:800,color:"#fff",textAlign:"center",lineHeight:1.3}},pair[1])
          )
        ),
        h("div",{style:{fontSize:12,color:"#9B8BB4",fontWeight:600}},(pIdx+1)+" of "+pairs.length+" comparisons")
      )
    );
  }

  return h("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},
    h("div",{style:{background:list.color,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}},
      h("button",{onClick:props.onBack,style:{background:"none",border:"none",color:"#fff",fontSize:22,cursor:"pointer",lineHeight:1}},"\u2190"),
      h("div",{style:{flex:1,fontSize:18,fontWeight:900,color:"#fff"}},list.name),
      h("div",{style:{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.75)"}},items.length+" items")
    ),
    h("div",{style:{padding:"12px 14px 8px",background:"#fff",borderBottom:"1px solid #E9E0FF",flexShrink:0}},
      h("div",{style:{display:"flex",gap:8}},
        h("input",{ref:iRef,value:inp,onChange:function(e){setInp(e.target.value);},onKeyDown:function(e){if(e.key==="Enter")add();},placeholder:"Add goal / item...",style:{flex:1,background:"#F8F5FF",border:"2px solid "+(inp?list.color:"#E9E0FF"),borderRadius:13,padding:"11px 14px",color:"#1E1033",fontSize:14,fontFamily:"inherit",outline:"none",fontWeight:600,transition:"border-color .2s"}}),
        h("button",{onClick:add,disabled:!inp.trim(),style:{width:46,height:46,borderRadius:13,background:inp.trim()?list.color:"transparent",border:"2px solid "+(inp.trim()?list.color:"#E9E0FF"),color:inp.trim()?"#fff":"#9B8BB4",cursor:inp.trim()?"pointer":"not-allowed",fontSize:24,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}},"+")
      )
    ),
    h("div",{style:{flex:1,overflowY:"auto",padding:"10px 14px",display:"flex",flexDirection:"column",gap:6}},
      items.length===0&&h("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 20px",gap:10,textAlign:"center"}},
        h("div",{style:{fontSize:40}},"\uD83D\uDCCB"),
        h("div",{style:{fontSize:15,fontWeight:700,color:"#5B4C7A"}},"No items yet"),
        h("div",{style:{fontSize:13,color:"#9B8BB4"}},"Add your first goal above")
      ),
      items.map(function(item,i){
        var isDone=done[i];
        var ti=tInfo[i];
        return h("div",{key:i,style:{display:"flex",flexDirection:"column",gap:0,animation:"fadeUp .2s ease-out"}},
          h("div",{style:{background:isDone?"rgba(5,150,105,.08)":"#fff",border:"1.5px solid "+(isDone?"rgba(5,150,105,.3)":"#E9E0FF"),borderRadius:14,padding:"12px 13px",opacity:isDone?0.65:1,transition:"all .2s"}},
            h("div",{style:{display:"flex",alignItems:"center",gap:10}},
              h("div",{onClick:function(){setDone(function(p){var n=Object.assign({},p);n[i]=!p[i];return n;});},style:{width:28,height:28,borderRadius:7,background:isDone?"rgba(5,150,105,.15)":"rgba(124,58,237,.1)",border:"2px solid "+(isDone?"#059669":list.color),display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,color:isDone?"#059669":list.color,flexShrink:0,cursor:"pointer"}},isDone?"\u2713":i+1),
              h("button",{onClick:function(){setCPick(cPick===i?null:i);},style:{width:28,height:28,borderRadius:6,background:item.color,border:"none",cursor:"pointer",flexShrink:0}}),
              h("div",{onClick:function(){setDone(function(p){var n=Object.assign({},p);n[i]=!p[i];return n;});},style:{flex:1,cursor:"pointer"}},
                h("div",{style:{fontSize:14,fontWeight:isDone?400:700,textDecoration:isDone?"line-through":"none",color:isDone?"#9B8BB4":"#1E1033",lineHeight:1.4}},item.text)
              ),
              h("button",{onClick:function(){setItems(function(p){return p.filter(function(_,x){return x!==i;});});},style:{background:"none",border:"none",color:"#9B8BB4",fontSize:16,cursor:"pointer",padding:"0 4px",lineHeight:1}},"\u2715")
            ),
            cPick===i&&!isDone&&h("div",{style:{marginTop:10,display:"flex",gap:8,flexWrap:"wrap"}},
              TASK_COLORS.map(function(col){return h("button",{key:col,onClick:function(){setItems(function(p){var n=p.slice();n[i]=Object.assign({},n[i],{color:col});return n;});setCPick(null);},style:{width:30,height:30,borderRadius:7,background:col,border:item.color===col?"3px solid #1E1033":"2px solid transparent",cursor:"pointer"}});})
            ),
            !isDone&&h("div",{style:{marginTop:10,paddingTop:10,borderTop:"1px solid #E9E0FF",display:"flex",flexDirection:"column",gap:6}},
              ti
                ?h("div",{style:{display:"flex",flexDirection:"column",gap:6}},
                  h("div",{style:{display:"flex",alignItems:"center",gap:8}},
                    h("div",{style:{background:"rgba(124,58,237,.1)",borderRadius:100,padding:"5px 13px",fontSize:12,fontWeight:800,color:list.color}},"\u23F1\uFE0F "+ti.wm+"m work"),
                    h("button",{onClick:function(){setTSheet({i:i});},style:{background:"transparent",border:"1px solid #E9E0FF",borderRadius:100,padding:"4px 10px",fontSize:11,fontWeight:700,color:"#9B8BB4",cursor:"pointer",fontFamily:"inherit"}},"Edit"),
                    h("button",{onClick:function(){setRunT({taskText:item.text,wm:ti.wm,bm:ti.bm});},style:{background:list.color,border:"none",borderRadius:100,padding:"5px 16px",fontSize:12,fontWeight:900,color:"#fff",cursor:"pointer",fontFamily:"inherit",marginLeft:"auto"}},"\u25B6 Start")
                  ),
                  h("div",{style:{display:"flex",alignItems:"center"}},
                    h("div",{style:{background:"rgba(5,150,105,.1)",borderRadius:100,padding:"5px 13px",fontSize:12,fontWeight:800,color:"#059669"}},"\u2615\uFE0F "+ti.bm+"m break")
                  )
                )
                :h("button",{onClick:function(){setTSheet({i:i});},style:{background:"rgba(124,58,237,.1)",border:"1px dashed "+list.color+"55",borderRadius:100,padding:"6px 14px",fontSize:12,fontWeight:700,color:list.color,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}},"\u23F1\uFE0F Set Work & Break Timer")
            )
          )
        );
      }),
      dc===items.length&&items.length>0&&h("div",{style:{textAlign:"center",padding:22,background:"rgba(5,150,105,.08)",borderRadius:16,border:"1.5px solid rgba(5,150,105,.3)",marginTop:8}},h("div",{style:{fontSize:26,marginBottom:6}},"\uD83C\uDF89"),h("div",{style:{fontSize:15,fontWeight:800,color:"#059669"}},"All done!"))
    ),
    active.length>=2&&h("div",{style:{padding:"12px 14px",background:"#fff",borderTop:"1.5px solid #E9E0FF",flexShrink:0}},
      h("button",{onClick:startPri,style:{width:"100%",padding:14,background:"#2563EB",border:"none",borderRadius:14,color:"#fff",fontSize:15,fontWeight:900,fontFamily:"inherit",cursor:"pointer"}},"\u2696\uFE0F Prioritise")
    ),
    tSheet&&h(TimerSheet,{taskText:items[tSheet.i]&&items[tSheet.i].text||"",wm:(tInfo[tSheet.i]||{}).wm||25,bm:(tInfo[tSheet.i]||{}).bm||5,color:list.color,onSave:function(wm,bm){saveT(tSheet.i,wm,bm);},onClose:function(){setTSheet(null);}}),
    runT&&h(RunTimer,Object.assign({},runT,{color:list.color,onClose:function(){setRunT(null);}}))
  );
}

function App(){
  var _lists=useState([
    {id:1,name:"To do list",color:"#7C3AED",items:[]},
    {id:2,name:"Home Tasks",color:"#2563EB",items:[]},
    {id:3,name:"Creative list",color:"#059669",items:[]},
    {id:4,name:"Beauty & wellbeing",color:"#DB2777",items:[]}
  ]);var lists=_lists[0],setLists=_lists[1];
  var _open=useState(null);var openId=_open[0],setOpenId=_open[1];
  var _adding=useState(false);var adding=_adding[0],setAdding=_adding[1];
  var _newName=useState("");var newName=_newName[0],setNewName=_newName[1];
  var _newColor=useState(LIST_COLORS[0]);var newColor=_newColor[0],setNewColor=_newColor[1];
  var iRef=useRef(null);
  useEffect(function(){if(adding&&iRef.current)iRef.current.focus();},[adding]);
  function createList(){
    var n=newName.trim();if(!n)return;
    var id=Date.now();
    setLists(function(p){return p.concat([{id:id,name:n,color:newColor,items:[]}]);});
    setNewName("");setAdding(false);setOpenId(id);
  }
  if(openId){
    var list=lists.find(function(l){return l.id===openId;});
    if(!list){setOpenId(null);return null;}
    return h(ListView,{list:list,onBack:function(){setOpenId(null);},onUpdate:function(items){setLists(function(p){return p.map(function(l){return l.id===openId?Object.assign({},l,{items:items}):l;});});}});
  }
  return h("div",{style:{display:"flex",flexDirection:"column",height:"100vh"}},
    h("div",{style:{background:"linear-gradient(135deg,#7C3AED,#A855F7)",padding:"16px 18px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}},
      h("div",null,h("div",{style:{fontSize:24,fontWeight:900,color:"#fff",lineHeight:1}},"Thinko"),h("div",{style:{fontSize:11,color:"rgba(255,255,255,.7)",marginTop:2,fontWeight:700,letterSpacing:"0.1em"}},"MY LISTS")),
      h("button",{onClick:function(){setAdding(true);},style:{width:42,height:42,borderRadius:12,background:"rgba(255,255,255,.2)",border:"2px solid rgba(255,255,255,.4)",color:"#fff",fontSize:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,lineHeight:1}},"+")
    ),
    h("div",{style:{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:10}},
      lists.map(function(list){
        var count=list.items?list.items.length:0;
        return h("button",{key:list.id,onClick:function(){setOpenId(list.id);},style:{background:"#fff",border:"2px solid #E9E0FF",borderRadius:18,padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,textAlign:"left",width:"100%",fontFamily:"inherit",boxShadow:"0 2px 12px rgba(0,0,0,.05)",animation:"fadeUp .2s ease-out"}},
          h("div",{style:{width:50,height:50,borderRadius:14,background:list.color,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,flexShrink:0}},
            [0,1,2].map(function(j){return h("div",{key:j,style:{width:22,height:4,background:"rgba(255,255,255,.9)",borderRadius:2}});})
          ),
          h("div",{style:{flex:1}},
            h("div",{style:{fontSize:16,fontWeight:800,color:"#1E1033",marginBottom:3}},list.name),
            h("div",{style:{fontSize:12,fontWeight:600,color:"#9B8BB4"}},count===0?"No items yet":count+" item"+(count===1?"":"s"))
          ),
          h("button",{onClick:function(e){e.stopPropagation();setLists(function(p){return p.filter(function(l){return l.id!==list.id;});});},style:{width:34,height:34,borderRadius:9,background:"rgba(220,38,38,.08)",border:"none",color:"#DC2626",fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},"\uD83D\uDDD1\uFE0F"),
          h("div",{style:{color:"#9B8BB4",fontSize:20,fontWeight:700,flexShrink:0}},"\u203A")
        );
      }),
      h("button",{onClick:function(){setAdding(true);},style:{background:"transparent",border:"2px dashed #E9E0FF",borderRadius:18,padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",fontFamily:"inherit",color:"#9B8BB4",fontSize:14,fontWeight:700}},
        h("div",{style:{width:32,height:32,borderRadius:"50%",background:"#EDE9FE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:"#7C3AED"}},"+"),
        "Create new list"
      )
    ),
    adding&&h("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20}},
      h("div",{style:{background:"#fff",borderRadius:22,padding:"24px 20px",width:"100%",maxWidth:360,boxShadow:"0 20px 60px rgba(0,0,0,.2)"}},
        h("div",{style:{fontSize:18,fontWeight:900,color:"#1E1033",marginBottom:4}},"New list"),
        h("div",{style:{fontSize:13,color:"#9B8BB4",marginBottom:16,fontWeight:600}},"Give your list a name and colour"),
        h("input",{ref:iRef,value:newName,onChange:function(e){setNewName(e.target.value);},onKeyDown:function(e){if(e.key==="Enter")createList();},placeholder:"e.g. Home Tasks, Work, Shopping...",style:{width:"100%",background:"#F8F5FF",border:"2px solid "+(newName?"#7C3AED":"#E9E0FF"),borderRadius:12,padding:"12px 14px",color:"#1E1033",fontSize:14,fontFamily:"inherit",outline:"none",fontWeight:600,marginBottom:14,transition:"border-color .2s"}}),
        h("div",{style:{fontSize:11,fontWeight:800,color:"#9B8BB4",marginBottom:10,letterSpacing:"0.06em"}},"CHOOSE COLOUR"),
        h("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}},
          LIST_COLORS.map(function(col){return h("button",{key:col,onClick:function(){setNewColor(col);},style:{width:36,height:36,borderRadius:10,background:col,border:newColor===col?"3px solid #1E1033":"2px solid transparent",cursor:"pointer"}});})
        ),
        h("div",{style:{display:"flex",gap:10}},
          h("button",{onClick:function(){setAdding(false);setNewName("");},style:{flex:1,padding:12,background:"transparent",border:"1.5px solid #E9E0FF",borderRadius:12,color:"#5B4C7A",fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}},"Cancel"),
          h("button",{onClick:createList,disabled:!newName.trim(),style:{flex:2,padding:12,background:newName.trim()?"linear-gradient(135deg,#7C3AED,#A855F7)":"#E9E0FF",border:"none",borderRadius:12,color:newName.trim()?"#fff":"#9B8BB4",fontSize:14,fontWeight:800,fontFamily:"inherit",cursor:newName.trim()?"pointer":"not-allowed"}},"Create List")
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
</script>
</body>
</html>
