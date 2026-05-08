<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="theme-color" content="#9B59B6">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>Thinko</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin></script>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body,#root{height:100%;overflow:hidden}
body{font-family:'Nunito',system-ui,sans-serif;background:#F3E8FF}

/* Drum spinner */
.drum-wrap{display:flex;flex-direction:column;align-items:center;gap:2px}
.drum{height:120px;overflow:hidden;position:relative;width:56px;cursor:grab;user-select:none;touch-action:none;border-radius:12px;background:rgba(255,255,255,.15)}
.drum:active{cursor:grabbing}
.drum-inner{display:flex;flex-direction:column}
.drum-item{height:40px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:rgba(255,255,255,.25);flex-shrink:0;font-family:'Nunito',sans-serif}
.drum-item.sel{color:#fff;font-size:24px;font-weight:900}
.drum-item.near{color:rgba(255,255,255,.6);font-size:20px}
.drum::before{content:'';position:absolute;top:0;left:0;right:0;height:38px;background:linear-gradient(to bottom,rgba(120,50,180,.97),transparent);z-index:2;pointer-events:none}
.drum::after{content:'';position:absolute;bottom:0;left:0;right:0;height:38px;background:linear-gradient(to top,rgba(120,50,180,.97),transparent);z-index:2;pointer-events:none}
.drum-sel-line{position:absolute;top:38px;left:6px;right:6px;height:42px;border-top:2px solid rgba(255,255,255,.4);border-bottom:2px solid rgba(255,255,255,.4);pointer-events:none;z-index:3;border-radius:4px}
.drum-label{font-size:11px;font-weight:800;color:rgba(255,255,255,.55);letter-spacing:.08em;font-family:'Nunito',sans-serif}

@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes spin{to{transform:rotate(360deg)}}
</style>
</head>
<body>
<div id="root"></div>
<script>
var h=React.createElement;
var useState=React.useState,useRef=React.useRef,useEffect=React.useEffect;

/* ── COLOURS ── */
var PUR="#7C3AED",PUR2="#A855F7",PUR3="#EDE9FE",PUR4="#F3E8FF";
var BLU="#2563EB",GRN="#059669",RED="#DC2626",AMB="#D97706",PNK="#DB2777";
var T1="#2D1B69",T2="#5B4C7A",T3="#9B8BB4",BRD="#E9D8FD",SUR="#FFFFFF",CARD="#FDFBFF";

var TCOLS=["#DC2626","#D97706","#059669","#2563EB","#7C3AED","#DB2777","#0891B2","#65A30D","#92400E","#1D4ED8"];
var LCOLS=["#7C3AED","#2563EB","#059669","#DB2777","#D97706","#0891B2","#DC2626","#065F46"];

/* drum values 1-99 */
var DV=[];for(var _i=1;_i<=99;_i++)DV.push(_i);

var MSYS='You are a mind map AI. Return ONLY valid JSON: {"center":"topic","branches":[{"label":"name","color":"#hex","nodes":["idea1","idea2","idea3"]}]}. Make 4-6 branches, 2-4 nodes each.';
var SSYS='You are a SMART goal AI. Return ONLY valid JSON: {"smart_goal":"","specific":"","measurable":"","achievable":"","relevant":"","timebound":"","steps":["","",""],"encouragement":""}';

function callAI(msgs,sys,mt){
  return fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:mt||800,system:sys,messages:msgs})
  }).then(function(r){return r.json();}).then(function(d){return(d.content&&d.content[0]&&d.content[0].text)||"";});
}
function pJ(r){var s=r||"";while(s.includes("```"))s=s.replace("```json","").replace("```","");return JSON.parse(s.trim());}
function fmt(s){return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");}

/* ── DRUM SPINNER ── */
function Drum(props){
  var idx=DV.indexOf(props.value||5);if(idx<0)idx=4;
  var ref=useRef(null),sy=useRef(null),si=useRef(idx),ci=useRef(idx);
  function clamp(n){return Math.max(0,Math.min(DV.length-1,n));}
  function apply(i,anim){
    if(!ref.current)return;
    var inn=ref.current.querySelector(".drum-inner");
    if(!inn)return;
    inn.style.transition=anim?"transform .15s ease":"none";
    inn.style.transform="translateY("+(-i*40+40)+"px)";
    ref.current.querySelectorAll(".drum-item").forEach(function(el,j){
      el.className="drum-item"+(j===i?" sel":Math.abs(j-i)===1?" near":"");
    });
  }
  function down(e){sy.current=e.touches?e.touches[0].clientY:e.clientY;si.current=ci.current;e.preventDefault();}
  function move(e){
    if(sy.current===null)return;
    var y=e.touches?e.touches[0].clientY:e.clientY;
    var ni=clamp(Math.round(si.current+(sy.current-y)/40));
    if(ni!==ci.current){ci.current=ni;apply(ni,false);}
    e.preventDefault();
  }
  function up(e){if(sy.current===null)return;sy.current=null;apply(ci.current,true);props.onChange(DV[ci.current]);e.preventDefault();}
  function wheel(e){var ni=clamp(ci.current+(e.deltaY>0?1:-1));ci.current=ni;apply(ni,true);props.onChange(DV[ni]);e.preventDefault();}
  useEffect(function(){apply(idx,false);},[]);
  return h("div",{className:"drum-wrap"},
    h("div",{ref:ref,className:"drum",onTouchStart:down,onTouchMove:move,onTouchEnd:up,onMouseDown:down,onMouseMove:move,onMouseUp:up,onMouseLeave:up,onWheel:wheel},
      h("div",{className:"drum-inner"},DV.map(function(v){return h("div",{key:v,className:"drum-item"},v);})),
      h("div",{className:"drum-sel-line"})
    ),
    h("div",{className:"drum-label"},props.label||"MIN")
  );
}

/* ── RUNNING TIMER ── */
function RunTimer(props){
  var _p=useState("work");var ph=_p[0],setPh=_p[1];
  var _l=useState(props.wm*60);var left=_l[0],setLeft=_l[1];
  var _pa=useState(false);var paused=_pa[0],setPaused=_pa[1];
  var _cy=useState(0);var cycles=_cy[0],setCycles=_cy[1];
  var ref=useRef(null);
  useEffect(function(){
    if(paused){clearInterval(ref.current);return;}
    ref.current=setInterval(function(){
      setLeft(function(p){
        if(p<=1){
          clearInterval(ref.current);
          setPh(function(ph2){
            if(ph2==="work"){setLeft(props.bm*60);setCycles(function(c){return c+1;});return"break";}
            else{setLeft(props.wm*60);return"work";}
          });
          return 0;
        }
        return p-1;
      });
    },1000);
    return function(){clearInterval(ref.current);};
  },[paused,ph]);
  var isW=ph==="work",total=isW?props.wm*60:props.bm*60,prog=(total-left)/total;
  var r=80,circ=2*Math.PI*r,col=isW?(props.col||PUR):GRN;
  return h("div",{style:{position:"fixed",inset:0,background:PUR4,zIndex:300,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14,padding:24}},
    h("div",{style:{fontSize:12,fontWeight:800,color:T3,letterSpacing:".1em"}},isW?"FOCUS TIME":"BREAK TIME"),
    h("div",{style:{fontSize:15,fontWeight:700,color:T2,textAlign:"center",maxWidth:240,lineHeight:1.4}},props.task),
    h("div",{style:{position:"relative",width:180,height:180}},
      h("svg",{width:"180",height:"180",style:{transform:"rotate(-90deg)"}},
        h("circle",{cx:"90",cy:"90",r:r,fill:"none",stroke:BRD,strokeWidth:"10"}),
        h("circle",{cx:"90",cy:"90",r:r,fill:"none",stroke:col,strokeWidth:"10",strokeLinecap:"round",strokeDasharray:circ,strokeDashoffset:circ*(1-prog),style:{transition:"stroke-dashoffset 1s linear,stroke .4s"}})
      ),
      h("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}},
        h("div",{style:{fontSize:42,fontWeight:900,color:col,letterSpacing:"-2px"}},fmt(left)),
        h("div",{style:{fontSize:10,fontWeight:800,color:T3,marginTop:2,letterSpacing:".1em"}},isW?"WORK":"BREAK")
      )
    ),
    cycles>0&&h("div",{style:{background:PUR3,borderRadius:100,padding:"4px 14px",fontSize:12,fontWeight:800,color:PUR}},cycles+" cycle"+(cycles===1?"":"s")+" done"),
    h("div",{style:{display:"flex",gap:10,width:"100%",maxWidth:220}},
      h("button",{onClick:function(){setPaused(function(v){return !v;});},style:{flex:2,padding:13,background:PUR3,border:"2px solid "+col,borderRadius:13,color:col,fontSize:14,fontWeight:800,fontFamily:"inherit",cursor:"pointer"}},paused?"\u25B6 Resume":"\u23F8 Pause"),
      h("button",{onClick:props.onClose,style:{flex:1,padding:13,background:SUR,border:"1.5px solid "+BRD,borderRadius:13,color:T3,fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}},"\u2715")
    )
  );
}

/* ── LIST VIEW ── */
function ListView(props){
  var list=props.list;
  var _it=useState(list.items||[]);var items=_it[0],setItems=_it[1];
  var _in=useState("");var inp=_in[0],setInp=_in[1];
  var _dn=useState({});var done=_dn[0],setDone=_dn[1];
  var _cp=useState(null);var cPick=_cp[0],setCPick=_cp[1];
  var _tw=useState({});var tInfo=_tw[0],setTInfo=_tw[1];
  var _rt=useState(null);var runT=_rt[0],setRunT=_rt[1];
  var _ph=useState("list");var phase=_ph[0],setPhase=_ph[1];
  var _pa=useState([]);var pairs=_pa[0],setPairs=_pa[1];
  var _pi=useState(0);var pIdx=_pi[0],setPIdx=_pi[1];
  var _wi=useState({});var wins=_wi[0],setWins=_wi[1];
  /* drum open state per task: {taskIdx: "work"|"break"|null} */
  var _do=useState({});var drumOpen=_do[0],setDrumOpen=_do[1];
  var iRef=useRef(null);
  useEffect(function(){props.onUpdate(items);},[items]);

  function add(){var v=inp.trim();if(!v)return;setItems(function(p){return p.concat([{text:v,color:TCOLS[p.length%TCOLS.length]}]);});setInp("");if(iRef.current)iRef.current.focus();}
  function rem(i){setItems(function(p){return p.filter(function(_,x){return x!==i;});});}
  function tog(i){setDone(function(p){var n=Object.assign({},p);n[i]=!p[i];return n;});}
  function setCol(i,c){setItems(function(p){var n=p.slice();n[i]=Object.assign({},n[i],{color:c});return n;});setCPick(null);}
  function setWm(i,v){setTInfo(function(p){var n=Object.assign({},p);n[i]=Object.assign({},p[i]||{bm:5},{wm:v});return n;});}
  function setBm(i,v){setTInfo(function(p){var n=Object.assign({},p);n[i]=Object.assign({},p[i]||{wm:25},{bm:v});return n;});}
  function toggleDrum(i,which){setDrumOpen(function(p){if(p[i]===which)return Object.assign({},p,{[i]:null});return Object.assign({},p,{[i]:which});});}

  function startPri(){
    var active=items.filter(function(_,i){return !done[i];});
    if(active.length<2)return;
    var txts=active.map(function(x){return x.text;});
    var ps=[];for(var i=0;i<txts.length;i++)for(var j=i+1;j<txts.length;j++)ps.push([txts[i],txts[j]]);
    for(var k=ps.length-1;k>0;k--){var r=Math.floor(Math.random()*(k+1));var tmp=ps[k];ps[k]=ps[r];ps[r]=tmp;}
    var w={};txts.forEach(function(t){w[t]=0;});
    setPairs(ps);setPIdx(0);setWins(w);setPhase("comparing");
  }
  function pickW(winner){
    var nw=Object.assign({},wins);nw[winner]=(nw[winner]||0)+1;
    var ni=pIdx+1;
    if(ni>=pairs.length){
      var ranked=Object.entries(nw).sort(function(a,b){return b[1]-a[1];}).map(function(e){return e[0];});
      setItems(function(prev){
        var dI=prev.filter(function(_,i){return done[i];});
        var aI=prev.filter(function(_,i){return !done[i];});
        var sorted=ranked.map(function(t){return aI.find(function(x){return x.text===t;});}).filter(Boolean);
        return sorted.concat(dI);
      });
      setPhase("list");
    }else{setWins(nw);setPIdx(ni);}
  }

  var active=items.filter(function(_,i){return !done[i];});
  var dc=Object.values(done).filter(Boolean).length;

  /* COMPARISON VIEW */
  if(phase==="comparing"){
    var pair=pairs[pIdx];
    var pct=Math.round((pIdx/pairs.length)*100);
    return h("div",{style:{display:"flex",flexDirection:"column",height:"100%",background:PUR4}},
      h("div",{style:{background:BLU,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}},
        h("button",{onClick:function(){setPhase("list");},style:{background:"none",border:"none",color:"#fff",fontSize:22,cursor:"pointer",lineHeight:1}},"\u2190"),
        h("div",{style:{flex:1,fontSize:16,fontWeight:800,color:"#fff"}},"Which is most important?"),
        h("div",{style:{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.7)"}},pct+"%")
      ),
      h("div",{style:{height:5,background:"rgba(37,99,235,.2)"}},h("div",{style:{height:"100%",width:pct+"%",background:BLU,transition:"width .3s"}})),
      h("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 20px",gap:20}},
        h("div",{style:{fontSize:20,fontWeight:900,color:T1,textAlign:"center",lineHeight:1.3}},"Which one is most important?"),
        h("div",{style:{display:"flex",gap:14,width:"100%",alignItems:"center",justifyContent:"center"}},
          h("button",{onClick:function(){pickW(pair[0]);},style:{flex:1,maxWidth:155,minHeight:160,padding:"20px 14px",background:"#60A5FA",borderRadius:20,border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:14,boxShadow:"0 8px 28px rgba(37,99,235,.35)"}},
            h("div",{style:{width:54,height:54,background:"rgba(255,255,255,.35)",borderRadius:12}}),
            h("div",{style:{fontSize:16,fontWeight:800,color:"#fff",textAlign:"center",lineHeight:1.3}},pair[0])
          ),
          h("div",{style:{fontSize:26,fontWeight:900,color:RED,flexShrink:0}},"OR"),
          h("button",{onClick:function(){pickW(pair[1]);},style:{flex:1,maxWidth:155,minHeight:160,padding:"20px 14px",background:"#60A5FA",borderRadius:20,border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:14,boxShadow:"0 8px 28px rgba(37,99,235,.35)"}},
            h("div",{style:{width:54,height:54,background:"rgba(255,255,255,.35)",borderRadius:12}}),
            h("div",{style:{fontSize:16,fontWeight:800,color:"#fff",textAlign:"center",lineHeight:1.3}},pair[1])
          )
        ),
        h("div",{style:{fontSize:12,color:T3,fontWeight:600}},(pIdx+1)+" of "+pairs.length+" comparisons")
      )
    );
  }

  /* MAIN LIST */
  return h("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},
    h("div",{style:{background:"linear-gradient(135deg,"+list.color+","+list.color+"CC)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}},
      h("button",{onClick:props.onBack,style:{background:"none",border:"none",color:"#fff",fontSize:22,cursor:"pointer",lineHeight:1}},"\u2190"),
      h("div",{style:{flex:1,fontSize:18,fontWeight:900,color:"#fff"}},list.name),
      h("div",{style:{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.75)"}},items.length+" items")
    ),
    h("div",{style:{padding:"10px 14px 8px",background:SUR,borderBottom:"1px solid "+BRD,flexShrink:0}},
      h("div",{style:{display:"flex",gap:8}},
        h("input",{ref:iRef,value:inp,onChange:function(e){setInp(e.target.value);},onKeyDown:function(e){if(e.key==="Enter")add();},placeholder:"Add goal / item...",
          style:{flex:1,background:PUR4,border:"2px solid "+(inp?list.color:BRD),borderRadius:13,padding:"11px 14px",color:T1,fontSize:14,fontFamily:"inherit",outline:"none",fontWeight:600,transition:"border-color .2s"}}),
        h("button",{onClick:add,disabled:!inp.trim(),
          style:{width:46,height:46,borderRadius:13,background:inp.trim()?list.color:"transparent",border:"2px solid "+(inp.trim()?list.color:BRD),color:inp.trim()?"#fff":T3,cursor:inp.trim()?"pointer":"not-allowed",fontSize:24,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}},"+")
      )
    ),
    h("div",{style:{flex:1,overflowY:"auto",padding:"10px 14px",display:"flex",flexDirection:"column",gap:8}},
      items.length===0&&h("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 20px",gap:10,textAlign:"center"}},
        h("div",{style:{fontSize:44}},"📋"),
        h("div",{style:{fontSize:15,fontWeight:700,color:T2}},"No items yet"),
        h("div",{style:{fontSize:13,color:T3}},"Add your first goal above")
      ),
      items.map(function(item,i){
        var isDone=done[i];
        var ti=tInfo[i]||{};
        var dOpen=drumOpen[i];
        return h("div",{key:i,style:{display:"flex",flexDirection:"column",gap:0,animation:"fadeUp .2s ease-out"}},
          h("div",{style:{background:isDone?"rgba(5,150,105,.06)":CARD,border:"2px solid "+(isDone?"rgba(5,150,105,.25)":BRD),borderRadius:16,padding:"12px 13px",opacity:isDone?0.65:1,transition:"all .2s",boxShadow:"0 2px 8px rgba(124,58,237,.06)"}},
            /* Task row */
            h("div",{style:{display:"flex",alignItems:"center",gap:10}},
              /* Number + checkbox */
              h("div",{onClick:function(){tog(i);},
                style:{width:30,height:30,borderRadius:8,background:isDone?"rgba(5,150,105,.12)":"rgba(124,58,237,.1)",border:"2px solid "+(isDone?GRN:list.color),display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,color:isDone?GRN:list.color,flexShrink:0,cursor:"pointer"}},
                isDone?"\u2713":i+1
              ),
              /* Colour square */
              h("button",{onClick:function(){setCPick(cPick===i?null:i);},
                style:{width:26,height:26,borderRadius:6,background:item.color,border:cPick===i?"3px solid "+T1:"none",cursor:"pointer",flexShrink:0}}),
              /* Text */
              h("div",{onClick:function(){tog(i);},style:{flex:1,cursor:"pointer"}},
                h("div",{style:{fontSize:14,fontWeight:isDone?400:700,textDecoration:isDone?"line-through":"none",color:isDone?T3:T1,lineHeight:1.4}},item.text)
              ),
              /* Delete */
              h("button",{onClick:function(){rem(i);},style:{background:"none",border:"none",color:T3,fontSize:15,cursor:"pointer",padding:"0 4px"}},"\u2715")
            ),
            /* Colour picker */
            cPick===i&&!isDone&&h("div",{style:{marginTop:10,display:"flex",gap:7,flexWrap:"wrap"}},
              TCOLS.map(function(c){return h("button",{key:c,onClick:function(){setCol(i,c);},style:{width:28,height:28,borderRadius:7,background:c,border:item.color===c?"3px solid "+T1:"2px solid transparent",cursor:"pointer"}});})
            ),
            /* Timer section - only show if not done */
            !isDone&&h("div",{style:{marginTop:10,paddingTop:10,borderTop:"1px solid "+BRD,display:"flex",flexDirection:"column",gap:6}},
              /* Work timer row */
              h("div",{style:{display:"flex",alignItems:"center",gap:8}},
                h("div",{style:{fontSize:12,fontWeight:800,color:list.color,width:44,flexShrink:0}},"WORK"),
                ti.wm
                  ?h("div",{style:{background:PUR3,borderRadius:100,padding:"4px 12px",fontSize:12,fontWeight:800,color:PUR,flex:1}},ti.wm+" min")
                  :h("div",{style:{fontSize:12,color:T3,flex:1}},"Not set"),
                h("button",{onClick:function(){toggleDrum(i,"work");},
                  style:{background:dOpen==="work"?list.color:PUR3,border:"none",borderRadius:100,padding:"5px 12px",fontSize:11,fontWeight:800,color:dOpen==="work"?"#fff":list.color,cursor:"pointer",fontFamily:"inherit",flexShrink:0}},
                  dOpen==="work"?"Done \u2713":"Set"),
                ti.wm&&h("button",{onClick:function(){setRunT({task:item.text,wm:ti.wm,bm:ti.bm||5,col:list.color});},
                  style:{background:list.color,border:"none",borderRadius:100,padding:"5px 14px",fontSize:12,fontWeight:900,color:"#fff",cursor:"pointer",fontFamily:"inherit",flexShrink:0}},"\u25B6")
              ),
              /* Work drum */
              dOpen==="work"&&h("div",{style:{background:"linear-gradient(135deg,"+list.color+","+list.color+"BB)",borderRadius:14,padding:"14px",display:"flex",justifyContent:"center",marginTop:4}},
                h(Drum,{value:ti.wm||25,onChange:function(v){setWm(i,v);},label:"WORK MIN"})
              ),
              /* Break timer row */
              h("div",{style:{display:"flex",alignItems:"center",gap:8}},
                h("div",{style:{fontSize:12,fontWeight:800,color:GRN,width:44,flexShrink:0}},"BREAK"),
                ti.bm
                  ?h("div",{style:{background:"rgba(5,150,105,.1)",borderRadius:100,padding:"4px 12px",fontSize:12,fontWeight:800,color:GRN,flex:1}},ti.bm+" min")
                  :h("div",{style:{fontSize:12,color:T3,flex:1}},"Not set"),
                h("button",{onClick:function(){toggleDrum(i,"break");},
                  style:{background:dOpen==="break"?GRN:"rgba(5,150,105,.1)",border:"none",borderRadius:100,padding:"5px 12px",fontSize:11,fontWeight:800,color:dOpen==="break"?"#fff":GRN,cursor:"pointer",fontFamily:"inherit",flexShrink:0}},
                  dOpen==="break"?"Done \u2713":"Set")
              ),
              /* Break drum */
              dOpen==="break"&&h("div",{style:{background:"linear-gradient(135deg,#059669,#34D399)",borderRadius:14,padding:"14px",display:"flex",justifyContent:"center",marginTop:4}},
                h(Drum,{value:ti.bm||5,onChange:function(v){setBm(i,v);},label:"BREAK MIN"})
              )
            )
          )
        );
      }),
      dc===items.length&&items.length>0&&h("div",{style:{textAlign:"center",padding:22,background:"rgba(5,150,105,.07)",borderRadius:16,border:"1.5px solid rgba(5,150,105,.25)",marginTop:4}},
        h("div",{style:{fontSize:28,marginBottom:6}},"🎉"),
        h("div",{style:{fontSize:15,fontWeight:800,color:GRN}},"All done! Amazing work.")
      )
    ),
    active.length>=2&&h("div",{style:{padding:"10px 14px",background:SUR,borderTop:"1.5px solid "+BRD,flexShrink:0}},
      h("button",{onClick:startPri,
        style:{width:"100%",padding:14,background:BLU,border:"none",borderRadius:14,color:"#fff",fontSize:15,fontWeight:900,fontFamily:"inherit",cursor:"pointer",boxShadow:"0 4px 16px rgba(37,99,235,.3)"}},
        "\u2696\uFE0F Prioritise my list")
    ),
    runT&&h(RunTimer,Object.assign({},runT,{onClose:function(){setRunT(null);}}))
  );
}

/* ── LISTS HOME ── */
function ListsTab(){
  var _ls=useState([
    {id:1,name:"To do list",color:PUR,items:[]},
    {id:2,name:"Home Tasks",color:BLU,items:[]},
    {id:3,name:"Creative list",color:GRN,items:[]},
    {id:4,name:"Beauty & wellbeing",color:PNK,items:[]}
  ]);var lists=_ls[0],setLists=_ls[1];
  var _op=useState(null);var openId=_op[0],setOpenId=_op[1];
  var _ad=useState(false);var adding=_ad[0],setAdding=_ad[1];
  var _nn=useState("");var newName=_nn[0],setNewName=_nn[1];
  var _nc=useState(LCOLS[0]);var newCol=_nc[0],setNewCol=_nc[1];
  var iRef=useRef(null);
  useEffect(function(){if(adding&&iRef.current)iRef.current.focus();},[adding]);
  function create(){
    var n=newName.trim();if(!n)return;
    var id=Date.now();
    setLists(function(p){return p.concat([{id:id,name:n,color:newCol,items:[]}]);});
    setNewName("");setAdding(false);setOpenId(id);
  }
  if(openId){
    var list=lists.find(function(l){return l.id===openId;});
    if(!list){setOpenId(null);return null;}
    return h(ListView,{list:list,onBack:function(){setOpenId(null);},onUpdate:function(items){setLists(function(p){return p.map(function(l){return l.id===openId?Object.assign({},l,{items:items}):l;});});}});
  }
  return h("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},
    h("div",{style:{background:"linear-gradient(135deg,"+PUR+","+PUR2+")",padding:"16px 18px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}},
      h("div",null,
        h("div",{style:{fontSize:22,fontWeight:900,color:"#fff",lineHeight:1}},"Thinko"),
        h("div",{style:{fontSize:11,color:"rgba(255,255,255,.7)",marginTop:2,fontWeight:700,letterSpacing:".1em"}},"MY LISTS")
      ),
      h("button",{onClick:function(){setAdding(true);},
        style:{width:42,height:42,borderRadius:12,background:"rgba(255,255,255,.2)",border:"2px solid rgba(255,255,255,.35)",color:"#fff",fontSize:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,lineHeight:1}},"+")
    ),
    h("div",{style:{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:10}},
      lists.map(function(list){
        var cnt=list.items?list.items.length:0;
        return h("button",{key:list.id,onClick:function(){setOpenId(list.id);},
          style:{background:SUR,border:"2px solid "+BRD,borderRadius:20,padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,textAlign:"left",width:"100%",fontFamily:"inherit",boxShadow:"0 2px 16px rgba(124,58,237,.08)",animation:"fadeUp .2s ease-out"}},
          h("div",{style:{width:52,height:52,borderRadius:16,background:list.color,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,flexShrink:0,boxShadow:"0 4px 14px "+list.color+"50"}},
            [0,1,2].map(function(j){return h("div",{key:j,style:{width:24,height:4,background:"rgba(255,255,255,.9)",borderRadius:2}});})
          ),
          h("div",{style:{flex:1}},
            h("div",{style:{fontSize:16,fontWeight:800,color:T1,marginBottom:3}},list.name),
            h("div",{style:{fontSize:12,fontWeight:600,color:T3}},cnt===0?"No items yet":cnt+" item"+(cnt===1?"":"s"))
          ),
          h("button",{onClick:function(e){e.stopPropagation();setLists(function(p){return p.filter(function(l){return l.id!==list.id;});});},
            style:{width:34,height:34,borderRadius:10,background:"rgba(220,38,38,.08)",border:"none",color:RED,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},"🗑️"),
          h("div",{style:{color:T3,fontSize:22,fontWeight:700,flexShrink:0}},"\u203A")
        );
      }),
      h("button",{onClick:function(){setAdding(true);},
        style:{background:"transparent",border:"2px dashed "+BRD,borderRadius:20,padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",fontFamily:"inherit",color:T3,fontSize:14,fontWeight:700}},
        h("div",{style:{width:34,height:34,borderRadius:"50%",background:PUR3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:PUR}},"+"),
        "Create new list"
      )
    ),
    adding&&h("div",{style:{position:"fixed",inset:0,background:"rgba(45,27,105,.45)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20}},
      h("div",{style:{background:SUR,borderRadius:24,padding:"24px 20px",width:"100%",maxWidth:360,boxShadow:"0 24px 64px rgba(124,58,237,.2)"}},
        h("div",{style:{fontSize:18,fontWeight:900,color:T1,marginBottom:4}},"New list"),
        h("div",{style:{fontSize:13,color:T3,marginBottom:16,fontWeight:600}},"Name it and pick a colour"),
        h("input",{ref:iRef,value:newName,onChange:function(e){setNewName(e.target.value);},onKeyDown:function(e){if(e.key==="Enter")create();},placeholder:"e.g. Work, Shopping, Ideas...",
          style:{width:"100%",background:PUR4,border:"2px solid "+(newName?PUR:BRD),borderRadius:12,padding:"12px 14px",color:T1,fontSize:14,fontFamily:"inherit",outline:"none",fontWeight:600,marginBottom:14}}),
        h("div",{style:{fontSize:11,fontWeight:800,color:T3,marginBottom:10,letterSpacing:".06em"}},"COLOUR"),
        h("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}},
          LCOLS.map(function(c){return h("button",{key:c,onClick:function(){setNewCol(c);},style:{width:36,height:36,borderRadius:10,background:c,border:newCol===c?"3px solid "+T1:"2px solid transparent",cursor:"pointer"}});})
        ),
        h("div",{style:{display:"flex",gap:10}},
          h("button",{onClick:function(){setAdding(false);setNewName("");},style:{flex:1,padding:12,background:"transparent",border:"1.5px solid "+BRD,borderRadius:12,color:T2,fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}},"Cancel"),
          h("button",{onClick:create,disabled:!newName.trim(),style:{flex:2,padding:12,background:newName.trim()?"linear-gradient(135deg,"+PUR+","+PUR2+")":BRD,border:"none",borderRadius:12,color:newName.trim()?"#fff":T3,fontSize:14,fontWeight:800,fontFamily:"inherit",cursor:newName.trim()?"pointer":"not-allowed"}},"Create List")
        )
      )
    )
  );
}

/* ── TASKS TAB (Brain Dump + AI Rank + Mind Map) ── */
function TasksTab(){
  var _m=useState("dump");var mode=_m[0],setMode=_m[1];
  var _it=useState([]);var items=_it[0],setItems=_it[1];
  var _in=useState("");var dInp=_in[0],setDInp=_in[1];
  var _sl=useState(null);var sLoad=_sl[0],setSLoad=_sl[1];
  var _sr=useState({});var sRes=_sr[0],setSRes=_sr[1];
  var _sv=useState(null);var sView=_sv[0],setSView=_sv[1];
  var _rw=useState("");var raw=_rw[0],setRaw=_rw[1];
  var _rph=useState("input");var rPh=_rph[0],setRPh=_rph[1];
  var _rs=useState(null);var ranked=_rs[0],setRanked=_rs[1];
  var _rm=useState("");var rmsg=_rm[0],setRmsg=_rm[1];
  var _dn=useState({});var done=_dn[0],setDone=_dn[1];
  var _er=useState("");var err=_er[0],setErr=_er[1];
  var _mt=useState("");var mapT=_mt[0],setMapT=_mt[1];
  var _mph=useState("input");var mapPh=_mph[0],setMapPh=_mph[1];
  var _md=useState(null);var mapD=_md[0],setMapD=_md[1];
  var _ms=useState(null);var selB=_ms[0],setSelB=_ms[1];
  var dRef=useRef(null);

  function addD(){var v=dInp.trim();if(!v)return;setItems(function(p){return p.concat([{text:v}]);});setDInp("");if(dRef.current)dRef.current.focus();}
  function makeSmart(i,txt){
    setSLoad(i);setSView(null);
    callAI([{role:"user",content:"Convert to SMART goal: "+txt}],SSYS,800)
    .then(function(r){try{var p=pJ(r);setSRes(function(x){var n=Object.assign({},x);n[i]=p;return n;});setSView(i);}catch(e){setSRes(function(x){var n=Object.assign({},x);n[i]={error:true};return n;});setSView(i);}})
    .catch(function(){setSRes(function(x){var n=Object.assign({},x);n[i]={error:true};return n;});setSView(i);})
    .finally(function(){setSLoad(null);});
  }
  function doRank(){
    var lines=raw.split("\n").map(function(l){return l.trim();}).filter(Boolean);
    if(!lines.length)return;setRPh("loading");setErr("");
    var RSYS='You are a task ranking AI. Return ONLY valid JSON: {"ranked":[{"rank":1,"task":"text","reason":"one sentence"}],"message":"one sentence"}';
    callAI([{role:"user",content:"Rank these tasks by importance:\n"+lines.map(function(l,i){return(i+1)+". "+l;}).join("\n")}],RSYS)
    .then(function(r){try{var p=pJ(r);setRanked(p.ranked);setRmsg(p.message||"");setDone({});setRPh("results");}catch(e){setErr("Error. Try again.");setRPh("input");}})
    .catch(function(){setErr("Error. Try again.");setRPh("input");});
  }
  function doMap(){
    if(!mapT.trim())return;setMapPh("loading");
    callAI([{role:"user",content:"Create a mind map for: "+mapT}],MSYS,1000)
    .then(function(r){try{var p=pJ(r);setMapD(p);setMapPh("map");setSelB(null);}catch(e){setMapPh("input");}})
    .catch(function(){setMapPh("input");});
  }

  var td=Object.values(done).filter(Boolean).length;
  var tot=ranked?ranked.length:0;

  var mbar=h("div",{style:{display:"flex",background:SUR,borderBottom:"1.5px solid "+BRD,flexShrink:0}},
    [{id:"dump",l:"🧠 Dump"},{id:"rank",l:"🤖 AI Rank"},{id:"map",l:"🗺️ Mind Map"}].map(function(m){
      return h("button",{key:m.id,onClick:function(){setMode(m.id);},style:{flex:1,padding:"12px 4px",background:mode===m.id?PUR3:"none",border:"none",borderBottom:"2.5px solid "+(mode===m.id?PUR:"transparent"),color:mode===m.id?PUR:T3,fontSize:11,fontWeight:mode===m.id?800:600,cursor:"pointer",fontFamily:"inherit"}},m.l);
    })
  );

  /* BRAIN DUMP */
  if(mode==="dump"){
    return h("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},mbar,
      h("div",{style:{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}},
        h("div",{style:{display:"flex",gap:8}},
          h("input",{ref:dRef,value:dInp,onChange:function(e){setDInp(e.target.value);},onKeyDown:function(e){if(e.key==="Enter")addD();},placeholder:"Type anything on your mind...",
            style:{flex:1,background:PUR4,border:"2px solid "+(dInp?PUR:BRD),borderRadius:13,padding:"11px 13px",color:T1,fontSize:14,fontFamily:"inherit",outline:"none",fontWeight:600}}),
          h("button",{onClick:addD,disabled:!dInp.trim(),style:{width:44,height:44,borderRadius:13,background:dInp.trim()?"linear-gradient(135deg,"+PUR+","+PUR2+")":"transparent",border:"2px solid "+(dInp.trim()?PUR:BRD),color:dInp.trim()?"#fff":T3,cursor:dInp.trim()?"pointer":"not-allowed",fontSize:22,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}},"+")
        ),
        items.length===0&&h("div",{style:{textAlign:"center",padding:"40px 20px",color:T3}},
          h("div",{style:{fontSize:36,marginBottom:10}},"🧠"),
          h("div",{style:{fontSize:14,fontWeight:600}},"Get it all out of your head.")
        ),
        items.map(function(item,i){
          return h("div",{key:i,style:{background:CARD,border:"1.5px solid "+BRD,borderRadius:14,padding:"12px 14px"}},
            h("div",{style:{display:"flex",alignItems:"center",gap:8}},
              h("div",{style:{width:24,height:24,borderRadius:7,background:PUR3,color:PUR,fontSize:11,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},i+1),
              h("div",{style:{flex:1,fontSize:14,color:T1,fontWeight:600,lineHeight:1.4}},item.text),
              h("button",{onClick:function(){makeSmart(i,item.text);},disabled:sLoad===i,style:{background:PUR3,border:"none",borderRadius:8,padding:"4px 9px",color:PUR,fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"inherit",flexShrink:0}},sLoad===i?"...":"⚡ SMART"),
              h("button",{onClick:function(){setItems(function(p){return p.filter(function(_,x){return x!==i;});});},style:{background:"none",border:"none",color:T3,fontSize:14,cursor:"pointer",padding:"0 2px"}},"\u2715")
            ),
            sView===i&&sRes[i]&&h("div",{style:{marginTop:8,background:PUR3,borderRadius:12,padding:12}},
              sRes[i].error?h("div",{style:{fontSize:13,color:RED}},"Something went wrong."):
              h("div",{style:{display:"flex",flexDirection:"column",gap:6}},
                h("div",{style:{fontSize:13,fontWeight:800,color:PUR}},"⚡ SMART Goal"),
                h("div",{style:{fontSize:13,fontWeight:700,color:T1,lineHeight:1.4}},sRes[i].smart_goal),
                h("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}},
                  [{l:"S",v:sRes[i].specific,c:PUR},{l:"M",v:sRes[i].measurable,c:BLU},{l:"A",v:sRes[i].achievable,c:GRN},{l:"R",v:sRes[i].relevant,c:PNK}].map(function(s){
                    return h("div",{key:s.l,style:{background:s.c+"15",borderRadius:9,padding:"6px 9px"}},h("div",{style:{fontSize:9,fontWeight:900,color:s.c,marginBottom:2}},s.l),h("div",{style:{fontSize:11,color:T1,lineHeight:1.3}},s.v));
                  })
                ),
                sRes[i].steps&&sRes[i].steps.map(function(step,si){return h("div",{key:si,style:{display:"flex",gap:8}},h("div",{style:{width:18,height:18,borderRadius:"50%",background:PUR3,color:PUR,fontSize:10,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},si+1),h("div",{style:{fontSize:12,color:T1,lineHeight:1.4}},step));}),
                h("button",{onClick:function(){setSView(null);},style:{padding:"4px 10px",background:"transparent",border:"1px solid "+BRD,borderRadius:8,color:T2,fontSize:11,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}},"Close")
              )
            )
          );
        }),
        items.length>0&&h("button",{onClick:function(){setRaw(items.map(function(d){return d.text;}).join("\n"));setMode("rank");setRPh("input");},
          style:{width:"100%",padding:14,background:"linear-gradient(135deg,"+PUR+","+PUR2+")",border:"none",borderRadius:12,color:"#fff",fontSize:14,fontWeight:800,fontFamily:"inherit",cursor:"pointer",marginTop:4}},
          "🤖 Send to AI Ranker")
      )
    );
  }

  /* AI RANKER */
  if(mode==="rank"){
    if(rPh==="loading"){
      return h("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},mbar,
        h("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:40}},
          h("div",{style:{width:48,height:48,borderRadius:14,background:"linear-gradient(135deg,"+PUR+","+PUR2+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:"#fff",fontWeight:900,animation:"spin 1s linear infinite"}},"⟳"),
          h("div",{style:{fontSize:15,fontWeight:700,color:PUR}},"Ranking your tasks...")
        )
      );
    }
    if(rPh==="results"){
      return h("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},mbar,
        h("div",{style:{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}},
          h("div",{style:{background:CARD,border:"1.5px solid "+BRD,borderRadius:16,padding:14}},
            h("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:8}},
              h("div",{style:{fontSize:13,fontWeight:700,color:T2}},td+"/"+tot+" done"),
              h("div",{style:{fontSize:12,fontWeight:800,color:PUR,background:PUR3,borderRadius:100,padding:"2px 10px"}},tot+" tasks")
            ),
            h("div",{style:{height:6,background:BRD,borderRadius:100,overflow:"hidden"}},
              h("div",{style:{height:"100%",width:(tot>0?(td/tot)*100:0)+"%",background:"linear-gradient(90deg,"+PUR+","+PUR2+")",borderRadius:100,transition:"width .4s"}})
            ),
            rmsg&&h("div",{style:{fontSize:12,color:T2,marginTop:8,fontStyle:"italic",fontWeight:600}},"\u201C"+rmsg+"\u201D")
          ),
          ranked&&ranked.map(function(task,i){
            var isDone=done[i];var rk=i===0?RED:i===1?AMB:i===2?BLU:T3;
            return h("div",{key:i,style:{background:isDone?"rgba(5,150,105,.06)":CARD,border:"1.5px solid "+(isDone?"rgba(5,150,105,.25)":BRD),borderRadius:14,padding:"12px 14px",opacity:isDone?0.6:1}},
              h("div",{style:{display:"flex",alignItems:"flex-start",gap:10}},
                h("div",{onClick:function(){setDone(function(p){var n=Object.assign({},p);n[i]=!p[i];return n;});},
                  style:{width:28,height:28,borderRadius:8,background:isDone?"rgba(5,150,105,.12)":rk+"15",border:"2px solid "+(isDone?GRN:rk),display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:12,color:isDone?GRN:rk,cursor:"pointer",flexShrink:0}},isDone?"\u2713":"#"+(i+1)),
                h("div",{style:{flex:1}},
                  h("div",{style:{fontSize:14,fontWeight:isDone?400:700,textDecoration:isDone?"line-through":"none",color:isDone?T3:T1,lineHeight:1.4}},task.task),
                  !isDone&&h("div",{style:{fontSize:11,color:T3,marginTop:3,fontWeight:600}},task.reason)
                )
              )
            );
          }),
          td===tot&&tot>0&&h("div",{style:{textAlign:"center",padding:20,background:"rgba(5,150,105,.07)",borderRadius:14}},h("div",{style:{fontSize:24}},"🎉"),h("div",{style:{fontSize:14,fontWeight:800,color:GRN,marginTop:6}},"All done!")),
          h("button",{onClick:function(){setRPh("input");setRaw("");setRanked(null);setDone({});},style:{width:"100%",padding:12,background:"transparent",border:"1.5px solid "+BRD,borderRadius:12,color:T2,fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}},"\u21A9 New List")
        )
      );
    }
    return h("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},mbar,
      h("div",{style:{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:12}},
        h("div",{style:{background:CARD,border:"1.5px solid "+BRD,borderRadius:16,padding:14}},
          h("div",{style:{fontSize:13,fontWeight:800,color:T1,marginBottom:5}},"🤖 AI Ranker"),
          h("div",{style:{fontSize:12,color:T3,marginBottom:10,fontWeight:600}},"One task per line. AI ranks by importance."),
          h("textarea",{value:raw,onChange:function(e){setRaw(e.target.value);},placeholder:"Call the school\nPay electric bill\nTidy bedroom",style:{width:"100%",minHeight:150,background:"transparent",border:"none",outline:"none",color:T1,fontSize:14,fontFamily:"inherit",lineHeight:1.8,resize:"none",fontWeight:600}})
        ),
        err&&h("div",{style:{color:RED,fontSize:13,textAlign:"center",fontWeight:700}},err),
        h("button",{onClick:doRank,disabled:!raw.trim(),style:{width:"100%",padding:14,background:raw.trim()?"linear-gradient(135deg,"+PUR+","+PUR2+")":BRD,border:"none",borderRadius:12,color:raw.trim()?"#fff":T3,fontSize:14,fontWeight:800,fontFamily:"inherit",cursor:raw.trim()?"pointer":"not-allowed"}},"\u26A1 Rank My Tasks")
      )
    );
  }

  /* MIND MAP */
  if(mode==="map"){
    if(mapPh==="loading"){
      return h("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},mbar,
        h("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:40}},
          h("div",{style:{width:48,height:48,borderRadius:14,background:"linear-gradient(135deg,"+PUR+","+PUR2+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:"#fff",fontWeight:900,animation:"spin 1s linear infinite"}},"⟳"),
          h("div",{style:{fontSize:15,fontWeight:700,color:PUR}},"Building your mind map...")
        )
      );
    }
    if(mapPh==="map"&&mapD){
      var bCols=[PUR,BLU,GRN,PNK,AMB,RED];
      return h("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},mbar,
        h("div",{style:{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}},
          h("div",{style:{textAlign:"center",marginBottom:4}},
            h("div",{style:{display:"inline-block",background:"linear-gradient(135deg,"+PUR+","+PUR2+")",borderRadius:100,padding:"12px 24px",fontSize:16,fontWeight:900,color:"#fff",boxShadow:"0 4px 20px "+PUR+"40"}},mapD.center)
          ),
          (mapD.branches||[]).map(function(branch,bi){
            var bc=branch.color||bCols[bi%bCols.length];
            var isOpen=selB===bi;
            return h("div",{key:bi,style:{display:"flex",flexDirection:"column",gap:6}},
              h("button",{onClick:function(){setSelB(isOpen?null:bi);},style:{display:"flex",alignItems:"center",gap:10,background:bc+"15",border:"2px solid "+bc+"40",borderRadius:14,padding:"12px 14px",cursor:"pointer",fontFamily:"inherit",textAlign:"left",width:"100%"}},
                h("div",{style:{width:10,height:10,borderRadius:"50%",background:bc,flexShrink:0}}),
                h("div",{style:{fontSize:14,fontWeight:800,color:T1,flex:1}},branch.label),
                h("div",{style:{fontSize:11,color:bc,fontWeight:700,background:bc+"15",borderRadius:100,padding:"2px 10px"}},branch.nodes.length+" ideas"),
                h("div",{style:{fontSize:14,color:bc,fontWeight:700}},isOpen?"\u2212":"+")
              ),
              isOpen&&h("div",{style:{display:"flex",flexDirection:"column",gap:5,paddingLeft:20}},
                branch.nodes.map(function(node,ni){
                  return h("div",{key:ni,style:{background:CARD,border:"1.5px solid "+bc+"30",borderRadius:11,padding:"10px 13px",display:"flex",alignItems:"center",gap:10,animation:"fadeUp .15s ease-out"}},
                    h("div",{style:{width:6,height:6,borderRadius:"50%",background:bc,flexShrink:0}}),
                    h("div",{style:{fontSize:13,fontWeight:600,color:T1}},node)
                  );
                })
              )
            );
          }),
          h("button",{onClick:function(){setMapPh("input");setMapD(null);setSelB(null);},style:{width:"100%",marginTop:4,padding:12,background:"transparent",border:"1.5px solid "+BRD,borderRadius:12,color:T2,fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}},"\u21A9 New Mind Map")
        )
      );
    }
    return h("div",{style:{display:"flex",flexDirection:"column",height:"100%"}},mbar,
      h("div",{style:{flex:1,display:"flex",flexDirection:"column",padding:14,gap:14,justifyContent:"center"}},
        h("div",{style:{textAlign:"center"}},
          h("div",{style:{fontSize:44,marginBottom:12}},"🗺️"),
          h("div",{style:{fontSize:18,fontWeight:900,color:T1,marginBottom:6}},"Mind Map"),
          h("div",{style:{fontSize:13,color:T3,fontWeight:600,lineHeight:1.5}},"Type a topic — Thinko builds a visual map of ideas and connections.")
        ),
        h("input",{value:mapT,onChange:function(e){setMapT(e.target.value);},onKeyDown:function(e){if(e.key==="Enter")doMap();},placeholder:"e.g. Holiday planning, Starting a business...",
          style:{width:"100%",background:PUR4,border:"2px solid "+(mapT?PUR:BRD),borderRadius:14,padding:"14px 16px",color:T1,fontSize:15,fontFamily:"inherit",outline:"none",fontWeight:700,textAlign:"center"}}),
        h("button",{onClick:doMap,disabled:!mapT.trim(),style:{width:"100%",padding:14,background:mapT.trim()?"linear-gradient(135deg,"+PUR+","+PUR2+")":BRD,border:"none",borderRadius:12,color:mapT.trim()?"#fff":T3,fontSize:14,fontWeight:800,fontFamily:"inherit",cursor:mapT.trim()?"pointer":"not-allowed"}},"🗺️ Build Mind Map")
      )
    );
  }
  return null;
}

/* ── FOCUS TAB ── */
function FocusTab(){
  var _ph=useState("setup");var ph=_ph[0],setPh=_ph[1];
  var _t=useState("");var task=_t[0],setTask=_t[1];
  var _wm=useState(25);var wm=_wm[0],setWm=_wm[1];
  var _bm=useState(5);var bm=_bm[0],setBm=_bm[1];
  var _tp=useState("work");var tph=_tp[0],setTph=_tp[1];
  var _l=useState(25*60);var left=_l[0],setLeft=_l[1];
  var _pa=useState(false);var paused=_pa[0],setPaused=_pa[1];
  var _cy=useState(0);var cycles=_cy[0],setCycles=_cy[1];
  var ref=useRef(null);
  useEffect(function(){
    if(ph!=="on"||paused){clearInterval(ref.current);return;}
    ref.current=setInterval(function(){setLeft(function(p){if(p<=1){clearInterval(ref.current);setTph(function(t){if(t==="work"){setLeft(bm*60);setCycles(function(c){return c+1;});return"break";}else{setLeft(wm*60);return"work";}});return 0;}return p-1;});},1000);
    return function(){clearInterval(ref.current);};
  },[ph,paused,tph]);
  function start(){setLeft(wm*60);setTph("work");setPaused(false);setCycles(0);setPh("on");}
  function reset(){clearInterval(ref.current);setPh("setup");setPaused(false);setCycles(0);}
  var isW=tph==="work",total=isW?wm*60:bm*60,prog=(total-left)/total;
  var r=80,circ=2*Math.PI*r,col=isW?PUR:GRN;
  if(ph==="setup"){
    return h("div",{style:{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:16}},
      h("div",{style:{fontSize:22,fontWeight:900,color:T1}},"⏱️ Focus Mode"),
      h("div",null,
        h("div",{style:{fontSize:11,fontWeight:800,color:T3,marginBottom:8,letterSpacing:".08em"}},"WHAT ARE YOU FOCUSING ON?"),
        h("input",{value:task,onChange:function(e){setTask(e.target.value);},placeholder:"e.g. Write the report",style:{width:"100%",background:PUR4,border:"2px solid "+(task?PUR:BRD),borderRadius:13,padding:"12px 15px",color:T1,fontSize:14,fontFamily:"inherit",outline:"none",fontWeight:700}})
      ),
      h("div",{style:{background:"linear-gradient(135deg,"+PUR+","+PUR2+")",borderRadius:18,padding:20}},
        h("div",{style:{fontSize:11,fontWeight:800,color:"rgba(255,255,255,.6)",marginBottom:16,letterSpacing:".1em"}},"SET YOUR TIMERS"),
        h("div",{style:{display:"flex",justifyContent:"space-around",alignItems:"flex-start"}},
          h("div",{style:{textAlign:"center"}},h("div",{style:{fontSize:11,fontWeight:800,color:"rgba(255,255,255,.6)",marginBottom:10}},"WORK"),h(Drum,{value:wm,onChange:setWm,label:"MIN"})),
          h("div",{style:{alignSelf:"center",fontSize:20,color:"rgba(255,255,255,.3)",fontWeight:700,marginTop:20}},"//"),
          h("div",{style:{textAlign:"center"}},h("div",{style:{fontSize:11,fontWeight:800,color:"rgba(255,255,255,.6)",marginBottom:10}},"BREAK"),h(Drum,{value:bm,onChange:setBm,label:"MIN"}))
        ),
        h("div",{style:{textAlign:"center",marginTop:14,color:"rgba(255,255,255,.65)",fontSize:12,fontWeight:700}},wm+"min work → "+bm+"min break → repeat")
      ),
      h("button",{onClick:start,disabled:!task.trim(),style:{width:"100%",padding:14,background:task.trim()?"linear-gradient(135deg,"+PUR+","+PUR2+")":BRD,border:"none",borderRadius:12,color:task.trim()?"#fff":T3,fontSize:14,fontWeight:800,fontFamily:"inherit",cursor:task.trim()?"pointer":"not-allowed"}},task.trim()?"Start Focus ▶":"Enter a task first")
    );
  }
  return h("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,gap:16}},
    h("div",{style:{fontSize:11,fontWeight:800,color:T3,letterSpacing:".12em"}},isW?"FOCUS TIME":"BREAK TIME"),
    h("div",{style:{fontSize:14,fontWeight:700,color:T2,textAlign:"center",maxWidth:240,lineHeight:1.4}},"\u201C"+task+"\u201D"),
    h("div",{style:{position:"relative",width:180,height:180}},
      h("svg",{width:"180",height:"180",style:{transform:"rotate(-90deg)"}},h("circle",{cx:"90",cy:"90",r:r,fill:"none",stroke:BRD,strokeWidth:"10"}),h("circle",{cx:"90",cy:"90",r:r,fill:"none",stroke:col,strokeWidth:"10",strokeLinecap:"round",strokeDasharray:circ,strokeDashoffset:circ*(1-prog),style:{transition:"stroke-dashoffset 1s linear,stroke .4s"}})),
      h("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}},h("div",{style:{fontSize:40,fontWeight:900,color:col,letterSpacing:"-1px"}},fmt(left)),h("div",{style:{fontSize:10,fontWeight:800,color:T3,marginTop:2,letterSpacing:".1em"}},isW?"WORK":"BREAK"))
    ),
    cycles>0&&h("div",{style:{background:PUR3,borderRadius:100,padding:"4px 14px",fontSize:12,fontWeight:800,color:PUR}},cycles+" cycle"+(cycles===1?"":"s")+" complete"),
    h("div",{style:{display:"flex",gap:10,width:"100%",maxWidth:220}},
      h("button",{onClick:function(){setPaused(function(v){return !v;});},style:{flex:2,padding:13,background:PUR3,border:"2px solid "+col,borderRadius:13,color:col,fontSize:14,fontWeight:800,fontFamily:"inherit",cursor:"pointer"}},paused?"▶ Resume":"⏸ Pause"),
      h("button",{onClick:reset,style:{flex:1,padding:13,background:SUR,border:"1.5px solid "+BRD,borderRadius:13,color:T3,fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}},"\u2715")
    )
  );
}

/* ── ROOT ── */
function Thinko(){
  var _t=useState("lists");var tab=_t[0],setTab=_t[1];
  var NAV=[{id:"lists",i:"📋",l:"Lists"},{id:"tasks",i:"🧠",l:"Thinko"},{id:"focus",i:"⏱️",l:"Focus"}];
  return h("div",{style:{fontFamily:"'Nunito',system-ui,sans-serif",background:PUR4,color:T1,height:"100vh",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column"}},
    h("div",{style:{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}},
      tab==="lists"?h(ListsTab):null,
      tab==="tasks"?h(TasksTab):null,
      tab==="focus"?h(FocusTab):null
    ),
    h("div",{style:{background:SUR,borderTop:"2px solid "+BRD,display:"flex",flexShrink:0,paddingBottom:"env(safe-area-inset-bottom,0px)"}},
      NAV.map(function(t){
        var active=tab===t.id;
        return h("button",{key:t.id,onClick:function(){setTab(t.id);},style:{flex:1,padding:"10px 0 9px",background:active?PUR3:"none",border:"none",borderTop:"3px solid "+(active?PUR:"transparent"),cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,transition:"all .15s"}},
          h("span",{style:{fontSize:20}},t.i),
          h("span",{style:{fontSize:10,color:active?PUR:T3,fontWeight:active?800:600}},t.l)
        );
      })
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(Thinko));
</script>
</body>
</html>
