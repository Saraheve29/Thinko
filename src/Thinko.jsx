import React,{useState,useEffect,useRef,useCallback} from 'react';

// Call Anthropic API via secure Vercel proxy
async function callAnthropic(body){
  const res=await fetch('/api/ai',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(body)
  });
  const data=await res.json();
  if(data.error) throw new Error(data.error.message||JSON.stringify(data.error));
  return data;
}

const C = {
  dp:"#2C3820", mp:"#4A7038", pp:"#6A9058",
  lp:"#A8C5B0", ll:"#D4E4D8", pale:"#F0EBE0",
  wh:"#FFFFFF", txt:"#1A1A10", mid:"#5A5040",
  soft:"#8A8070", done:"#D8D0C0",
};
const MULTI="linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)";
const RECIPE_CUISINES=[
  {id:"any",      label:"Any cuisine",  icon:"🌍"},
  {id:"british",  label:"British",      icon:"🇬🇧"},
  {id:"jamaican", label:"Jamaican",     icon:"🇯🇲"},
  {id:"mexican",  label:"Mexican",      icon:"🇲🇽"},
  {id:"italian",  label:"Italian",      icon:"🇮🇹"},
  {id:"chinese",  label:"Chinese",      icon:"🇨🇳"},
  {id:"indian",   label:"Indian",       icon:"🇮🇳"},
  {id:"american", label:"American",     icon:"🇺🇸"},
  {id:"french",   label:"French",       icon:"🇫🇷"},
  {id:"thai",     label:"Thai",         icon:"🇹🇭"},
  {id:"mediterranean", label:"Mediterranean", icon:"🌊"},
  {id:"spanish",  label:"Spanish",      icon:"🇪🇸"},
  {id:"caribbean",label:"Caribbean",    icon:"🌴"},
  {id:"african",  label:"African",      icon:"🌍"},
  {id:"turkish",  label:"Turkish",      icon:"🇹🇷"},
  {id:"other",    label:"Other",        icon:"🌐"},
];

const RECIPE_CATS=[
  {id:"all",      label:"All",       icon:"🍽️"},
  {id:"meat",     label:"Meat",      icon:"🥩"},
  {id:"fish",     label:"Fish",      icon:"🐟"},
  {id:"chicken",  label:"Chicken",   icon:"🍗"},
  {id:"veggie",   label:"Veggie",    icon:"🥗"},
  {id:"pasta",    label:"Pasta",     icon:"🍝"},
  {id:"pies",     label:"Pies",      icon:"🥧"},
  {id:"soups",    label:"Soups",     icon:"🍲"},
  {id:"baking",   label:"Baking",    icon:"🧁"},
  {id:"breakfast",label:"Breakfast", icon:"🍳"},
  {id:"dessert",  label:"Dessert",   icon:"🍮"},
  {id:"snacks",   label:"Snacks",    icon:"🧀"},
  {id:"drinks",   label:"Drinks",    icon:"🥤"},
  {id:"other",    label:"Other",     icon:"📌"},
];

// ── Recipe sorting: one shared engine for automatic AND by-hand categories ──
const CAT_IDS=RECIPE_CATS.filter(c=>c.id!=="all").map(c=>c.id);
const CUISINE_IDS=RECIPE_CUISINES.filter(c=>c.id!=="any").map(c=>c.id);
const CAT_SYNONYMS={soup:"soups",broth:"soups",chowder:"soups",vegetarian:"veggie",vegan:"veggie",vegetable:"veggie",vegetables:"veggie",plantbased:"veggie",
  beef:"meat",pork:"meat",lamb:"meat",mince:"meat",sausage:"meat",sausages:"meat",bacon:"meat",ham:"meat",goat:"meat",poultry:"chicken",turkey:"chicken",
  seafood:"fish",prawn:"fish",prawns:"fish",shellfish:"fish",salmon:"fish",pie:"pies",cake:"baking",cakes:"baking",bread:"baking",bake:"baking",bakes:"baking",
  desserts:"dessert",pudding:"dessert",puddings:"dessert",sweets:"dessert",snack:"snacks",starter:"snacks",starters:"snacks",drink:"drinks",beverage:"drinks",
  beverages:"drinks",cocktail:"drinks",cocktails:"drinks",smoothie:"drinks",smoothies:"drinks",noodle:"pasta",noodles:"pasta"};
// Turn whatever the AI (or old saved data) says into a real category id — e.g. "Soup." → "soups"
const normCat=v=>{
  const s=String(v||"").toLowerCase().replace(/[^a-z ]/g,"").trim();
  if(!s)return null;
  if(CAT_IDS.includes(s))return s;
  if(CAT_SYNONYMS[s])return CAT_SYNONYMS[s];
  const w=s.split(" ").find(x=>CAT_IDS.includes(x)||CAT_SYNONYMS[x]);
  return w?(CAT_IDS.includes(w)?w:CAT_SYNONYMS[w]):null;
};
const CUISINE_SYNONYMS={english:"british",scottish:"british",welsh:"british",irish:"british",uk:"british",greek:"mediterranean",lebanese:"mediterranean",
  middleeastern:"mediterranean",moroccan:"african",nigerian:"african",ghanaian:"african",ethiopian:"african",southafrican:"african",
  trinidadian:"caribbean",barbadian:"caribbean",texmex:"mexican",cantonese:"chinese",szechuan:"chinese",sichuan:"chinese",usa:"american",us:"american"};
const normCuisine=v=>{
  const s=String(v||"").toLowerCase().replace(/[^a-z]/g,"");
  if(!s)return null;
  if(CUISINE_IDS.includes(s))return s;
  return CUISINE_SYNONYMS[s]||null;
};
// Instant guess from the recipe name (then main ingredients) — works even with no AI / no credit.
// Dish type wins first (soup, pie, pasta...), then the main protein.
const CAT_RULES=[
  ["soups",/\b(soups?|broth|chowder|bisque|gazpacho|minestrone|ramen|pho)\b/],
  ["breakfast",/\b(breakfast|brunch|pancakes?|porridge|granola|overnight oats|omelett?es?|french toast|waffles?|eggs? benedict|full english|fry up|muesli|crumpets?|shakshuka)\b/],
  ["pies",/\b(pies?|pasty|pasties|quiche|wellington)\b/],
  ["pasta",/\b(pasta|spag|spaghetti|penne|lasagne|lasagna|macaroni|mac (and|n) cheese|tagliatelle|linguine|fusilli|rigatoni|farfalle|ravioli|tortellini|gnocchi|carbonara|bolognese|noodles?|orzo|chow mein|pad thai)\b/],
  ["dessert",/\b(desserts?|puddings?|crumble|cheesecake|trifle|mousse|ice cream|sorbet|tiramisu|pavlova|custard|sundae|eton mess|panna cotta|jelly|roly poly|banoffee)\b/],
  ["baking",/\b(cakes?|cupcakes?|muffins?|cookies?|biscuits?|scones?|bread|loaf|buns?|flapjacks?|shortbread|brownies?|blondies?|doughnuts?|donuts?|bagels?|croissants?|sponge|teacakes?)\b/],
  ["drinks",/\b(drinks?|smoothies?|milkshakes?|mocktails?|cocktails?|lemonade|latte|cappuccino|frappe|iced coffee|iced tea|hot chocolate|mojito|margarita|sangria|spritz|slushies?|punch|cordial|sorrel|eggnog)\b/],
  ["fish",/\b(fish|saltfish|salmon|cod|tuna|haddock|mackerel|prawns?|shrimps?|seafood|crab|lobster|mussels|sardines?|trout|sea ?bass|plaice|kippers?|scampi|squid|calamari|tilapia|pollock|snapper|anchov(y|ies))\b/],
  ["chicken",/\b(chicken|turkey|poultry|duck)\b/],
  ["meat",/\b(beef|pork|lamb|mince|minced|sausages?|bacon|ham|steak|gammon|corned beef|meatballs?|burgers?|chorizo|brisket|ribs|oxtail|goat|mutton|venison|salami|pepperoni|hot ?dogs?|kebabs?|meatloaf)\b/],
  ["veggie",/\b(vegetarian|vegan|veggie|halloumi|tofu|lentils?|chickpeas?|falafel|paneer|quorn|dahl|dal)\b/],
  ["snacks",/\b(snacks?|dips?|hummus|houmous|nachos|popcorn|sandwich(es)?|toasties?|wraps?|bruschetta|samosas?|spring rolls?|canapes?|crisps)\b/],
];
const guessText=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/&/g," and ").replace(/[^a-z' ]/g," ").replace(/\s+/g," ");
const guessCat=r=>{
  const name=guessText(r&&r.name);
  for(const [id,re] of CAT_RULES) if(re.test(name)) return id;
  // Not obvious from the name → look at the main ingredients (ignoring stock, sauces, powders etc.)
  const lines=String((r&&r.ingredients)||"").split("\n").map(guessText)
    .filter(l=>l.trim()&&!/\b(stock|sauce|gravy|bouillon|cubes?|oxo|granules|seasoning|powder|paste|essence|fat|dripping|lard)\b/.test(l));
  const ing=" "+lines.join(" | ")+" ";
  for(const id of ["pasta","fish","chicken","meat","veggie"]){
    const rule=CAT_RULES.find(x=>x[0]===id);
    if(rule&&rule[1].test(ing)) return id;
  }
  return null;
};
// A recipe "needs sorting" if it has no real category and you haven't chosen one yourself
const needsCat=r=>!!r&&!r.catManual&&(!r.category||r.category==="other"||!CAT_IDS.includes(r.category));
// Ask the AI to sort a batch of recipes (matched back by NUMBER, not by name — so no mix-ups)
async function aiCategoriseBatch(list){
  if(!list||!list.length) return [];
  const lines=list.map((r,i)=>{
    const ings=String(r.ingredients||"").split("\n").map(s=>s.trim()).filter(Boolean).slice(0,12).join(", ").slice(0,240);
    const notes=String(r.description||"").trim().slice(0,80);
    return `${i+1}. ${r.name||"Untitled"}${ings?` — ingredients: ${ings}`:""}${notes?` — notes: ${notes}`:""}`;
  }).join("\n");
  const data=await callAnthropic({
    model:"claude-sonnet-4-6",
    max_tokens:Math.min(4000,150+list.length*45),
    system:"You sort home-cooking recipes into categories for a family meal planner. Return ONLY a JSON array, no markdown, no explanation.",
    messages:[{role:"user",content:[{type:"text",text:
`Choose the ONE best category and the cuisine for each recipe below.

Categories — use these exact words: ${CAT_IDS.join(", ")}
How to choose the category:
- If it clearly is one of these dish types, use it: drinks, breakfast, soups, pies, pasta (incl. noodles), dessert, baking (cakes, bread, biscuits), snacks (sandwiches, dips, finger food)
- Otherwise use the main protein: chicken (incl. turkey/duck), fish (incl. seafood/prawns/saltfish), meat (beef, pork, lamb, goat, mince, sausages, bacon, corned beef), veggie (no meat or fish)
- Only answer "other" if nothing fits at all
Cuisines — use these exact words: ${CUISINE_IDS.join(", ")}

Recipes:
${lines}

Reply with one entry per recipe, using the same numbers:
[{"n":1,"category":"meat","cuisine":"british"}]`}]}]
  });
  const raw=data.content?.[0]?.text||"[]";
  const m=raw.match(/\[[\s\S]*\]/);
  if(!m) throw new Error("No answer from AI");
  const arr=JSON.parse(m[0]);
  return list.map((r,i)=>{
    const hit=Array.isArray(arr)?arr.find(x=>x&&Number(x.n)===i+1):null;
    return {category:hit?normCat(hit.category):null,cuisine:hit?normCuisine(hit.cuisine):null};
  });
}

const headerGrad  =`linear-gradient(135deg,#3A5030 0%,#4A6840 50%,#5A7850 100%)`;
const pageGrad    = `linear-gradient(180deg,#F5F0E4 0%,#EDE8D8 40%,#E5DFC8 100%)`;
const btnGrad     = `linear-gradient(135deg,#3D5A2A,#6A9058)`;
const cardGlass   = "rgba(252,248,238,0.75)";

const SWATCHES = [
  {id:"sage",  fill:"#5A7848",border:"#3A5830",num:"#3A5830"},
  {id:"forest",fill:"#2E7D52",border:"#1B5E38",num:"#1B5E38"},
  {id:"teal",  fill:"#1abc9c",border:"#148f77",num:"#148f77"},
  {id:"blue",  fill:"#2980b9",border:"#1a5276",num:"#1a5276"},
  {id:"purple",fill:"#9b59b6",border:"#7d3c98",num:"#7d3c98"},
  {id:"amber", fill:"#f39c12",border:"#d68910",num:"#b7770d"},
  {id:"orange",fill:"#e67e22",border:"#ca6f1e",num:"#ca6f1e"},
  {id:"rose",  fill:"#e07090",border:"#c05070",num:"#c05070"},
  {id:"moss",  fill:"#7A9A58",border:"#5A7838",num:"#3A5818"},
];
const swatchById = id => SWATCHES.find(s=>s.id===id)||SWATCHES[8];
const BREAK_PRESETS = [5,10,15,20,30];
const spinBtnStyle = { borderRadius:8,width:34,height:34,fontSize:22,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1,border:"none" };


// ── Background ──────────────────────────────────────────
/* ── GARDEN BACKGROUND ── */
const GardenBg = () => (
  <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
    <img
      src="/Gareden2.png"
      alt=""
      style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",filter:"brightness(1.08) saturate(1.05)"}}
    />
    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(255,255,255,0.15) 0%,rgba(0,0,0,0.08) 100%)"}}/>
  </div>
);
// ── Nav Bar ─────────────────────────────────────────────
function NavBar({current,setScreen}){
  const tabs=[
    {id:'todo',    icon:'📋', label:'To Do'},
    {id:'housework',icon:'🏠', label:'Chores'},
    {id:'shopping',icon:'🛒', label:'Shopping'},
    {id:'meals',   icon:'🍽️', label:'Meals'},
  ];
  return(
    <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(255,255,255,0.95)',backdropFilter:'blur(12px)',borderTop:'1px solid rgba(180,160,140,0.25)',display:'flex',zIndex:100,paddingBottom:'env(safe-area-inset-bottom)'}}>
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>setScreen(t.id)}
          style={{flex:1,padding:'8px 4px 10px',background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
          <span style={{fontSize:22,lineHeight:1,filter:current===t.id?'none':'grayscale(0.4)',opacity:current===t.id?1:0.55}}>{t.icon}</span>
          <span style={{fontSize:10,fontWeight:700,color:current===t.id?'#3A5828':'#8A8070',letterSpacing:0.3}}>{t.label}</span>
          {current===t.id&&<div style={{width:20,height:3,borderRadius:2,background:'#5A7848',marginTop:1}}/>}
        </button>
      ))}
    </div>
  );
}


function UrlField({value, onChange, style={}}) {
  const clean = v => v?.trim().startsWith("http") ? v.trim() : v?.trim() ? "https://"+v.trim() : "";
  return (
    <div style={{...style}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
        <span style={{fontSize:14,flexShrink:0}}>🔗</span>
        <input
          value={value||""}
          onChange={e=>onChange(e.target.value)}
          placeholder="Paste recipe or Pinterest link..."
          style={{flex:1,padding:"7px 10px",borderRadius:9,border:`1.5px solid ${C.ll}`,fontSize:12,color:C.txt,outline:"none",background:C.pale,fontWeight:600}}
        />
        {value?.trim()&&(
          <button onClick={()=>window.open(clean(value),"_blank")}
            style={{background:C.pp,color:"#1A1A10",border:"none",borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:800,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
            Open ↗
          </button>
        )}
      </div>
      {/* Quick shortcut buttons */}
      <div style={{display:"flex",gap:6}}>
        <button onClick={()=>window.open("https://www.pinterest.co.uk/search/pins/?q=recipe","_blank")}
          style={{display:"flex",alignItems:"center",gap:4,padding:"5px 10px",background:"rgba(230,0,35,0.08)",color:"#E60023",border:"1px solid rgba(230,0,35,0.18)",borderRadius:100,fontSize:11,fontWeight:700,cursor:"pointer"}}>
          📌 Pinterest
        </button>
        <button onClick={()=>window.open("https://www.bbcgoodfood.com/recipes","_blank")}
          style={{display:"flex",alignItems:"center",gap:4,padding:"5px 10px",background:"rgba(90,120,72,0.08)",color:"#3A6020",border:"1px solid rgba(90,120,72,0.18)",borderRadius:100,fontSize:11,fontWeight:700,cursor:"pointer"}}>
          🍽️ BBC Food
        </button>
        <button onClick={()=>window.open("https://www.google.com/search?q=recipe","_blank")}
          style={{display:"flex",alignItems:"center",gap:4,padding:"5px 10px",background:"rgba(66,133,244,0.08)",color:"#4285f4",border:"1px solid rgba(66,133,244,0.18)",borderRadius:100,fontSize:11,fontWeight:700,cursor:"pointer"}}>
          🔍 Search
        </button>
      </div>
    </div>
  );
}

/* ── Compact URL badge (shown on saved items) ─────────── */

function UrlBadge({url}) {
  if(!url?.trim()) return null;
  const href = url.trim().startsWith("http") ? url.trim() : "https://"+url.trim();
  const label = (() => { try { return new URL(href).hostname.replace("www.",""); } catch { return url.slice(0,24); } })();
  return (
    <a href={href} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}
      style={{display:"inline-flex",alignItems:"center",gap:4,background:"#e3f2fd",color:"#1565c0",fontSize:10,fontWeight:700,borderRadius:20,padding:"2px 8px",textDecoration:"none",marginTop:4,flexShrink:0}}>
      🔗 {label}
    </a>
  );
}

function Header({ title, onBack, right }) {
  return (
    <div style={{
      background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",
      backdropFilter:"blur(16px)",
      WebkitBackdropFilter:"blur(16px)",
      padding:"16px 20px",
      display:"flex",alignItems:"center",gap:12,
      boxShadow:"0 1px 12px rgba(0,0,0,0.06)",
      position:"sticky",top:0,zIndex:50,
      borderBottom:"1px solid rgba(90,120,72,0.1)",
    }}>
      {onBack&&(
        <button onClick={onBack} style={{
          background:"none",color:"#1A1A10",border:"none",
          width:36,height:36,fontSize:22,cursor:"pointer",
          flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
          borderRadius:10,
        }}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      <span style={{flex:1,color:"#1A1A10",fontFamily:"Georgia,serif",fontWeight:700,fontSize:20,textAlign:"center",letterSpacing:0.2}}>{title}</span>
      {right || (
        <button style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",color:"#1A1A10",opacity:0.7}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5" r="3" stroke="#1A1A10" strokeWidth="1.8"/><circle cx="6" cy="12" r="3" stroke="#1A1A10" strokeWidth="1.8"/><circle cx="18" cy="19" r="3" stroke="#1A1A10" strokeWidth="1.8"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="#1A1A10" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>
      )}
    </div>
  );
}


function ColourPicker({current,onChange,onClose}) {
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:900,background:"rgba(20,30,10,0.45)",backdropFilter:"blur(3px)",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"rgba(252,250,244,0.99)",borderRadius:"24px 24px 0 0",padding:"18px 18px 28px",boxShadow:"0 -8px 32px rgba(60,50,30,0.25)",width:"100%",maxWidth:480}}>
        <div style={{width:36,height:4,borderRadius:2,background:"rgba(90,80,60,0.20)",margin:"0 auto 14px"}}/>
        <div style={{fontSize:12,fontWeight:700,color:"rgba(60,50,30,0.55)",letterSpacing:0.8,marginBottom:12,textTransform:"uppercase",textAlign:"center"}}>Colour label</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}}>
          {SWATCHES.map(s=>(
            <button key={s.id} onClick={()=>{onChange(s.id);onClose();}}
              style={{width:"100%",aspectRatio:"1",borderRadius:12,cursor:"pointer",background:s.fill,
                border:current===s.id?`3px solid rgba(30,30,20,0.6)`:`2px solid ${s.border}`,
                boxShadow:current===s.id?"0 0 0 3px rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.15)":"0 1px 3px rgba(0,0,0,0.08)",
                transform:current===s.id?"scale(1.08)":"scale(1)",
                transition:"all 0.12s"}} title={s.id}/>
          ))}
        </div>
        <button onClick={onClose} style={{width:"100%",marginTop:18,padding:"12px",background:"rgba(90,80,60,0.08)",border:"none",borderRadius:100,fontSize:13,fontWeight:700,color:"#5A4A30",cursor:"pointer"}}>Cancel</button>
      </div>
    </div>
  );
}

function PriTaskRow({task,index,onDelete,onComplete,onColorChange,onAddSub,onMoveToList,lists,onPrioritizeThis,onSendTo,onEdit,onLater,onMoveToHw,hwZones,onMoveUp,onMoveDown,isFirst,isLast,setScreen,dragHandlers}) {
  const sw=swatchById(task.color);
  const [editingName,setEditingName]=useState(false);
  const [editText,setEditText]=useState(task.name);
  const [moveMenu,setMoveMenu]=useState(false);
  const [pickerOpen,setPickerOpen]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [subOpen,setSubOpen]=useState(false);
  const [newSub,setNewSub]=useState("");
  const [mins,setMins]=useState(5);
  const [left,setLeft]=useState(null);
  const [on,setOn]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    if(on&&left>0)ref.current=setInterval(()=>setLeft(l=>l-1),1000);
    else{clearInterval(ref.current);if(left===0)setOn(false);}
    return()=>clearInterval(ref.current);
  },[on,left]);
  const start=(secs)=>{const t=secs||mins*60;if(t<1)return;setLeft(t);setOn(true);};
  const stop=()=>{setOn(false);setLeft(null);};
  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  const subs=task.subItems||[];
  const subsDone=subs.filter(s=>s.done).length;

  const addSub=()=>{
    if(!newSub.trim())return;
    onAddSub(task.id,[...subs,{id:Date.now(),text:newSub.trim(),done:false}]);
    setNewSub("");
  };
  const toggleSub=id=>onAddSub(task.id,subs.map(s=>s.id===id?{...s,done:!s.done}:s));
  const delSub=id=>onAddSub(task.id,subs.filter(s=>s.id!==id));

  const MenuItem=({icon,label,onClick,danger})=>(
    <button onClick={()=>{onClick();setMenuOpen(false);}}
      style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left",color:danger?"#e74c3c":C.txt,fontWeight:600,fontSize:14}}>
      <span style={{fontSize:18,flexShrink:0}}>{icon}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <div style={{background:task.done?"rgba(248,245,236,0.55)":"rgba(248,245,236,0.92)",border:`1.5px solid ${task.done?"rgba(90,80,60,0.12)":sw.border+"55"}`,borderLeft:`4px solid ${task.done?"rgba(90,80,60,0.18)":sw.fill}`,borderRadius:18,padding:"12px 12px 10px 12px",marginBottom:10,opacity:task.done?0.65:1,transition:"all 0.2s",boxShadow:"0 2px 10px rgba(60,70,40,0.07)",position:"relative"}}>

      {/* Task name — full width on its own line, editable */}
      <div style={{marginBottom:8}}>
        {editingName?(
          <div style={{display:"flex",gap:6}}>
            <input value={editText} onChange={e=>setEditText(e.target.value)}
              onKeyDown={e=>{
                if(e.key==="Enter"){if(editText.trim()&&onEdit)onEdit(task.id,editText.trim());setEditingName(false);}
                if(e.key==="Escape"){setEditText(task.name);setEditingName(false);}
              }}
              autoFocus
              style={{flex:1,fontWeight:700,fontSize:16,padding:"6px 10px",borderRadius:10,border:`1.5px solid ${C.lp}`,color:"#1A1A10",outline:"none"}}/>
            <button onClick={()=>{if(editText.trim()&&onEdit)onEdit(task.id,editText.trim());setEditingName(false);}}
              style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:10,padding:"6px 14px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Save</button>
          </div>
        ):(
          <div onClick={()=>{setEditText(task.name);setEditingName(true);}} style={{fontWeight:700,fontSize:16,lineHeight:1.4,color:task.done?C.soft:"#1A1A10",textDecoration:task.done?"line-through":"none",overflowWrap:"break-word",cursor:"pointer"}}>{task.name}</div>
        )}
        {task.url&&<UrlBadge url={task.url}/>}
        {subs.length>0&&<div style={{fontSize:11,color:C.soft,marginTop:2,fontWeight:600}}>{subsDone}/{subs.length} sub-items done</div>}
      </div>

      {/* Controls row — index, drag, colour, actions */}
      <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:8}}>
        {/* Index */}
        <div style={{minWidth:28,height:28,borderRadius:"50%",background:task.done?C.done:sw.num,color:"#1A1A10",fontWeight:800,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{index+1}</div>
        <div {...(dragHandlers||{})} style={{display:"flex",alignItems:"center",justifyContent:"center",cursor:"grab",color:"rgba(90,120,72,0.35)",fontSize:20,lineHeight:1,padding:"4px 8px",letterSpacing:1,touchAction:"none",flexShrink:0}}>⠿</div>
        {/* Colour picker dot */}
        <div style={{position:"relative",flexShrink:0}}>
          <button onClick={()=>setPickerOpen(p=>!p)}
            title="Change colour"
            style={{width:24,height:24,borderRadius:"50%",cursor:"pointer",padding:0,
              background:task.done?C.done:sw.fill,
              border:`3px solid ${task.done?C.done:sw.border}`,
              boxShadow:pickerOpen?`0 0 0 3px ${C.lp},0 2px 8px rgba(0,0,0,0.15)`:"0 1px 4px rgba(0,0,0,0.12)",
              transition:"all 0.15s",display:"flex",alignItems:"center",justifyContent:"center"}}/>
          {pickerOpen&&<ColourPicker current={task.color} onChange={id=>onColorChange(task.id,id)} onClose={()=>setPickerOpen(false)}/>}
        </div>
        <div style={{flex:1}}/>
        {/* Complete */}
        <button onClick={()=>onComplete(task.id)} style={{background:task.done?C.ll:sw.num,color:task.done?C.mid:"#fff",border:"none",borderRadius:9,width:32,height:32,cursor:"pointer",fontSize:15,flexShrink:0}}>{task.done?"↩":"✓"}</button>
        {/* Delete — visible on card */}
        {onLater&&<button onClick={()=>onLater(task.id)} title={task.later?"Move back to list":"Save for later"} style={{background:task.later?"rgba(212,160,32,0.18)":"rgba(90,120,72,0.08)",color:task.later?"#B8860B":"#5A7848",border:`1px solid ${task.later?"rgba(212,160,32,0.35)":"rgba(90,120,72,0.20)"}`,borderRadius:9,width:32,height:32,cursor:"pointer",fontSize:14,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>💾</button>}
        {onDelete&&<button onClick={()=>onDelete(task.id)} style={{background:"rgba(192,57,43,0.09)",color:"#c0392b",border:"1px solid rgba(192,57,43,0.18)",borderRadius:9,width:32,height:32,cursor:"pointer",fontSize:14,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>}
        {onMoveToHw&&hwZones&&hwZones.length>0&&(
          <div style={{position:"relative",flexShrink:0}}>
            <button onClick={()=>setMoveMenu(m=>!m)}
              style={{background:"rgba(90,80,60,0.07)",color:"#5A4A30",border:"1px solid rgba(90,80,60,0.12)",borderRadius:9,width:32,height:32,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>⋯</button>
            {moveMenu&&(
              <div style={{position:"absolute",right:0,bottom:38,background:"#fff",borderRadius:14,boxShadow:"0 4px 20px rgba(0,0,0,0.15)",border:"1px solid rgba(90,80,60,0.12)",zIndex:200,minWidth:170,overflow:"hidden"}}>


                {hwZones&&hwZones.length>0&&<div style={{fontSize:11,fontWeight:700,color:"#8A8070",padding:"8px 12px 4px",textTransform:"uppercase",letterSpacing:0.5}}>Move to chores</div>}
                {hwZones&&hwZones.map(z=>(
                  <button key={z.id} onClick={()=>{
                    onMoveToHw(z.id,{id:Date.now()+Math.random(),name:task.name,score:3,reason:'',done:false,color:task.color||'lilac'});
                    onDelete(task.id);
                    setMoveMenu(false);
                  }} style={{width:"100%",padding:"10px 14px",background:"none",border:"none",textAlign:"left",fontSize:13,fontWeight:600,color:"#1A1A10",cursor:"pointer",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid rgba(90,80,60,0.06)"}}>
                    {z.icon} {z.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sub-items */}
      {subOpen&&(
        <div style={{marginLeft:56,marginBottom:8,borderLeft:`3px solid ${C.lp}`,paddingLeft:12}}>
          {subs.map(s=>(
            <div key={s.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
              <button onClick={()=>toggleSub(s.id)} style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${s.done?"#27ae60":C.lp}`,background:s.done?"#27ae60":"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11,fontWeight:900}}>{s.done?"✓":""}</button>
              <span style={{flex:1,fontSize:13,color:s.done?C.soft:C.txt,textDecoration:s.done?"line-through":"none",fontWeight:600}}>{s.text}</span>
              <button onClick={()=>delSub(s.id)} style={{background:"transparent",color:"#e74c3c",border:"none",cursor:"pointer",fontSize:13,padding:0}}>🗑</button>
            </div>
          ))}
          <div style={{display:"flex",gap:6,marginTop:6}}>
            <input value={newSub} onChange={e=>setNewSub(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addSub()}
              placeholder="Add sub-item..."
              style={{flex:1,padding:"6px 10px",borderRadius:8,border:`1.5px solid ${C.lp}`,fontSize:13,color:C.txt,outline:"none"}}/>
            <button onClick={addSub} style={{background:btnGrad,color:"#1A1A10",border:"none",borderRadius:8,padding:"6px 12px",fontWeight:800,fontSize:13,cursor:"pointer"}}>+</button>
          </div>
        </div>
      )}

      {/* ── 3-dot menu sheet ── */}
    </div>
  );
}


function PriCompare({tasks,onDone}) {
  // DEAD SIMPLE rebuild: the original `tasks` array is NEVER filtered, sliced, or rebuilt.
  // We only ever attach a `wins` counter to each task by reference. At the end we sort
  // a COPY of the original array — nothing can ever be dropped because nothing is ever removed.

  // Freeze the working set once, on mount, immune to any parent re-render.
  const workingRef=useRef(null);
  if(workingRef.current===null){
    workingRef.current=tasks.map(t=>({...t,_wins:0,_seen:0}));
  }
  const working=workingRef.current; // array of ALL tasks (done + not done), each tagged with _wins/_seen

  const notDone=working.filter(t=>!t.done);
  const doneOnes=working.filter(t=>t.done);

  // Build the full list of pairs to compare ONCE, up front. Simple round-robin: everyone vs everyone once.
  // For n items this is n*(n-1)/2 comparisons — more than binary insertion, but utterly simple and safe.
  const pairsRef=useRef(null);
  if(pairsRef.current===null){
    const p=[];
    for(let i=0;i<notDone.length;i++){
      for(let j=i+1;j<notDone.length;j++){
        p.push([notDone[i].id,notDone[j].id]);
      }
    }
    pairsRef.current=p;
  }
  const pairs=pairsRef.current;

  const [pairIdx,setPairIdx]=useState(0);
  const [winsMap,setWinsMap]=useState(()=>{
    const m={};
    notDone.forEach(t=>{m[t.id]=0;});
    return m;
  });
  const lockRef=useRef(false);

  // If there are fewer than 2 tasks, nothing to compare — just hand back everything untouched.
  if(notDone.length<2){
    onDone(working.map(t=>{const {_wins,_seen,...clean}=t;return clean;}));
    return null;
  }

  const finish=(finalWinsMap)=>{
    // Sort a COPY of notDone by wins (descending). Original `working` array is untouched.
    const ranked=[...notDone].sort((a,b)=>(finalWinsMap[b.id]||0)-(finalWinsMap[a.id]||0));
    const finalList=[...ranked,...doneOnes].map(t=>{const {_wins,_seen,...clean}=t;return clean;});
    onDone(finalList);
  };

  if(pairIdx>=pairs.length){
    finish(winsMap);
    return null;
  }

  const [idA,idB]=pairs[pairIdx];
  const taskA=notDone.find(t=>t.id===idA);
  const taskB=notDone.find(t=>t.id===idB);

  // Safety: if for any reason a task referenced by a pair can't be found, skip this pair entirely — never crash, never drop data.
  if(!taskA||!taskB){
    setPairIdx(i=>i+1);
    return null;
  }

  const choose=winnerId=>{
    if(lockRef.current)return;
    lockRef.current=true;
    setWinsMap(prev=>{
      const next={...prev,[winnerId]:(prev[winnerId]||0)+1};
      const nextIdx=pairIdx+1;
      if(nextIdx>=pairs.length){
        setTimeout(()=>finish(next),0);
      } else {
        setPairIdx(nextIdx);
      }
      return next;
    });
    setTimeout(()=>{lockRef.current=false;},200);
  };

  const skip=()=>{
    if(lockRef.current)return;
    lockRef.current=true;
    const nextIdx=pairIdx+1;
    if(nextIdx>=pairs.length){
      setTimeout(()=>finish(winsMap),0);
    } else {
      setPairIdx(nextIdx);
    }
    setTimeout(()=>{lockRef.current=false;},200);
  };

  const goBack=()=>{
    // Return everything exactly as it was received — original task objects untouched.
    onDone(working.map(t=>{const {_wins,_seen,...clean}=t;return clean;}));
  };

  const pct=pairs.length>0?Math.round((pairIdx/pairs.length)*100):0;

  const TaskCard=({task,onPick})=>{
    const sw=swatchById(task.color);
    return(
      <button onClick={onPick}
        style={{flex:1,padding:"22px 16px 20px",borderRadius:20,background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",border:`3px solid ${sw.fill}`,color:C.txt,fontWeight:800,fontSize:16,cursor:"pointer",boxShadow:`0 6px 24px ${sw.fill}`,display:"flex",flexDirection:"column",alignItems:"center",gap:14,transition:"all 0.15s",minHeight:160,textAlign:"center",lineHeight:1.4,userSelect:"none",WebkitUserSelect:"none"}}>
        <div style={{width:32,height:32,borderRadius:"50%",background:sw.fill,border:"3px solid rgba(255,255,255,0.9)",boxShadow:`0 2px 10px ${sw.fill}`,flexShrink:0,display:"block"}}/>
        <span style={{color:C.dp,fontWeight:800,fontSize:15,lineHeight:1.4,wordBreak:"break-word"}}>{task.name}</span>
      </button>
    );
  };

  return(
    <div style={{minHeight:"100vh",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",fontFamily:"'Segoe UI',sans-serif",paddingBottom:40}}>

      <div style={{width:"100%",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",padding:"14px 18px",display:"flex",alignItems:"center",gap:12,flexShrink:0,borderBottom:"1px solid rgba(90,80,60,0.08)",position:"sticky",top:0,zIndex:50}}>
        <button onClick={goBack}
          style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{flex:1,fontFamily:"Georgia,serif",fontWeight:700,fontSize:18,color:"#1A1A10"}}>To Do List</div>
        <div style={{color:"#5A4A30",fontSize:12,fontWeight:700}}>{pairIdx+1} / {pairs.length}</div>
      </div>

      <div style={{width:"100%",height:4,background:"rgba(90,80,60,0.10)"}}>
        <div style={{height:"100%",width:`${pct}%`,background:"#5A7848",transition:"width 0.3s"}}/>
      </div>

      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 20px",width:"100%",maxWidth:480,gap:0}}>

        <div style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:700,color:"#1A1A10",marginBottom:8,textAlign:"center",lineHeight:1.3,background:"rgba(255,255,255,0.55)",borderRadius:14,padding:"8px 16px"}}>
          Which one is more urgent?
        </div>
        <div style={{fontSize:12,color:"#3A2A18",fontWeight:700,marginBottom:24,textAlign:"center",background:"rgba(255,255,255,0.55)",borderRadius:10,padding:"5px 14px",display:"inline-block"}}>
          Comparing {notDone.length} task{notDone.length!==1?"s":""} total · {pairs.length-pairIdx} comparison{pairs.length-pairIdx!==1?"s":""} left
        </div>

        <div style={{display:"flex",gap:16,width:"100%",alignItems:"stretch"}}>
          <TaskCard task={taskA} onPick={()=>choose(taskA.id)}/>

          <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <div style={{fontWeight:900,fontSize:20,color:"#3A5828",letterSpacing:2}}>OR</div>
          </div>

          <TaskCard task={taskB} onPick={()=>choose(taskB.id)}/>
        </div>

        <div style={{marginTop:14,color:"#5A4A30",fontWeight:700,fontSize:12,textAlign:"center",background:"rgba(255,255,255,0.55)",borderRadius:10,padding:"5px 14px",display:"inline-block"}}>
          Tap the one that matters more right now
        </div>
      </div>
    </div>
  );
}


/* ── HomeBar — sticky top bar with 🏠 home for all modules ── */

function BreakTimer({setScreen}) {
  const [mins,setMins]=useState(5);
  const [left,setLeft]=useState(null);
  const [on,setOn]=useState(false);
  const [alerted,setAlerted]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    clearInterval(ref.current);
    if(!on) return;
    ref.current=setInterval(()=>setLeft(l=>{
      if(l===0&&!alerted){playAlarm("gentle");setAlerted(true);}
      return l-1;
    }),1000);
    return()=>clearInterval(ref.current);
  },[on]);
  const fmt=s=>{const abs=Math.abs(s);const str=String(Math.floor(abs/60)).padStart(2,"0")+":"+String(abs%60).padStart(2,"0");return s<0?"+"+str:str;};
  return (
    <div style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:18,padding:"14px 16px",marginBottom:12,border:"1px solid rgba(255,255,255,0.9)"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <span style={{fontFamily:"Georgia,serif",fontSize:15,fontWeight:700,color:"#1A1A10",flex:1}}>☕ Break Timer</span>
        {left!==null&&<span style={{fontFamily:"monospace",fontSize:18,fontWeight:700,color:left<0?"#c0392b":left<60?"#E08020":"#2C3820"}}>{fmt(left)}</span>}
      </div>
      {left!==null&&left>=0&&(
        <div style={{height:4,background:"rgba(90,80,60,0.10)",borderRadius:100,overflow:"hidden",marginBottom:10}}>
          <div style={{height:"100%",width:`${Math.round((left/(mins*60))*100)}%`,background:left<60?"#c0392b":"#5A7848",borderRadius:100,transition:"width 1s linear"}}/>
        </div>
      )}
      {left===null&&(
        <div style={{display:"flex",gap:6,marginBottom:10}}>
          {[5,10,15,20,30].map(p=>(
            <button key={p} onClick={()=>setMins(p)} style={{flex:1,padding:"7px 0",fontSize:12,fontWeight:600,cursor:"pointer",background:mins===p?"#5A7848":"rgba(255,255,255,0.75)",color:mins===p?"#fff":"#3A3020",border:`1.5px solid ${mins===p?"transparent":"rgba(90,120,72,0.25)"}`,borderRadius:100,transition:"all 0.15s"}}>{p}m</button>
          ))}
        </div>
      )}
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{if(left===null){setLeft(mins*60);setOn(true);setAlerted(false);}else setOn(o=>!o);}} style={{flex:1,padding:"9px",background:on?"rgba(192,57,43,0.10)":"#5A7848",color:on?"#c0392b":"#fff",border:`1.5px solid ${on?"rgba(192,57,43,0.25)":"#5A7848"}`,borderRadius:100,fontWeight:700,fontSize:13,cursor:"pointer"}}>
          {left===null?`▶ Start ${mins}m`:on?"⏸ Pause":"▶ Resume"}
        </button>
        {left!==null&&<button onClick={()=>{clearInterval(ref.current);setLeft(null);setOn(false);setAlerted(false);}} style={{flex:1,padding:"9px",background:"rgba(192,57,43,0.08)",color:"#c0392b",border:"1px solid rgba(192,57,43,0.18)",borderRadius:100,fontWeight:700,fontSize:13,cursor:"pointer"}}>⏹ Stop</button>}
      </div>
      {setScreen&&<button onClick={()=>setScreen("rest")} style={{width:"100%",marginTop:8,padding:"9px",background:"transparent",color:"#5A7848",border:"1px solid rgba(90,120,72,0.22)",borderRadius:100,fontWeight:600,fontSize:12,cursor:"pointer"}}>🌿 Open Rest Space</button>}
    </div>
  );
}


function PriList({list,onBack,onUpdate,matrixData,setMatrixData,setScreen,focusMins,setFocusMins,focusLeft,setFocusLeft,focusOn,setFocusOn,setFocusAlerted,fmtTimer,onMoveToHw,hwZones}) {
  const [newTask,setNewTask]=useState("");
  const [newUrl,setNewUrl]=useState("");
  const [prioritized,setPrioritized]=useState(false);

  const [comparing,setComparing]=useState(false);
  const [taskCelebration,setTaskCelebration]=useState(null);
  const [taskConfetti,setTaskConfetti]=useState([]);
  const [addingNow,setAddingNow]=useState(false);
  const addTask=()=>{
    if(!newTask.trim()||addingNow)return;
    setAddingNow(true);
    const taskText=newTask.trim();
    const currentActive=list.tasks.filter(t=>!t.done);
    const isTop3=currentActive.length<3;
    const newId=Date.now()+Math.random();
    onUpdate(curr=>({...curr,tasks:[...curr.tasks,{id:newId,name:taskText,done:false,color:isTop3?"red":"lilac",url:""}]}));
    setNewTask("");setPrioritized(false);
    setTimeout(()=>setAddingNow(false),400); // brief lock to prevent double-fire from double-tap
  };
  const deleteTask=id=>{onUpdate(curr=>({...curr,tasks:curr.tasks.filter(t=>t.id!==id)}));setPrioritized(false);};
  const laterTask=id=>onUpdate(curr=>({...curr,tasks:curr.tasks.map(t=>t.id===id?{...t,later:!t.later}:t)}));
  const recoverLaterTasks=()=>{
    // Try to find tasks that might have been lost by checking all localStorage keys
    const allTasks=[];
    try{
      // Check multiple possible backup keys
      for(let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i);
        if(key&&(key.includes('pri')||key.includes('task')||key.includes('todo'))){
          const val=JSON.parse(localStorage.getItem(key)||'[]');
          if(Array.isArray(val)){
            val.forEach(list=>{
              if(list&&Array.isArray(list.tasks)){
                list.tasks.forEach(t=>{
                  if(t&&t.name&&t.later){
                    allTasks.push(t);
                  }
                });
              }
            });
          }
        }
      }
    }catch(e){}
    if(allTasks.length===0){
      alert("Sorry — no saved-for-later tasks found in storage. They may have been overwritten.");
      return;
    }
    // Add recovered tasks back
    onUpdate(curr=>{
      const existingIds=new Set(curr.tasks.map(t=>String(t.id)));
      const newTasks=allTasks.filter(t=>!existingIds.has(String(t.id)));
      if(newTasks.length===0){
        alert("Your saved-for-later tasks are already in the list!");
        return curr;
      }
      alert("Recovered "+newTasks.length+" task(s)! Check your Save for Later section.");
      return {...curr,tasks:[...curr.tasks,...newTasks]};
    });
  };

  const launchTaskConfetti=allDone=>{
    const emojis=allDone?["🏆","⭐","🌟","💫","✨","🎊","🎉","💥"]:["🎉","✨","⭐","💫","🌿","🎊"];
    const pieces=Array.from({length:allDone?80:40},(_,i)=>({
      id:i,x:Math.random()*100,emoji:emojis[i%emojis.length],
      size:allDone?(16+Math.random()*14):(12+Math.random()*10),
      delay:Math.random()*0.6,speed:1.4+Math.random()*1.2,rotation:Math.random()*360,
    }));
    setTaskConfetti(pieces);
    setTimeout(()=>setTaskConfetti([]),3500);
  };

  const completeTask=id=>{
    const updated=list.tasks.map(t=>t.id===id?{...t,done:!t.done}:t);
    onUpdate(curr=>({...curr,tasks:curr.tasks.map(t=>t.id===id?{...t,done:!t.done}:t)}));
    const task=list.tasks.find(t=>t.id===id);
    if(!task.done){ // marking as done (not undoing)
      const allDone=updated.filter(t=>!t.done).length===0;
      setTaskCelebration({name:task.name,allDone,total:list.tasks.length});
      launchTaskConfetti(allDone);
      setTimeout(()=>setTaskCelebration(null),allDone?6000:2800);
    }
  };
  const colorTask=(id,color)=>onUpdate(curr=>({...curr,tasks:curr.tasks.map(t=>t.id===id?{...t,color}:t)}));
  const editTask=(id,newName)=>onUpdate(curr=>({...curr,tasks:curr.tasks.map(t=>t.id===id?{...t,name:newName}:t)}));
  const [dragTaskId,setDragTaskId]=useState(null);
  const priTaskTouchRef=useRef(null);
  const priTaskDragOver=(toId)=>{
    if(!dragTaskId||dragTaskId===toId)return;
    const arr=[...list.tasks];
    const fi=arr.findIndex(t=>t.id===dragTaskId),ti=arr.findIndex(t=>t.id===toId);
    if(fi<0||ti<0||fi===ti)return;
    const[m]=arr.splice(fi,1);arr.splice(ti,0,m);
    onUpdate(curr=>({...curr,tasks:arr}));
  };
  const priTaskTouchStart=(e,id)=>{priTaskTouchRef.current=setTimeout(()=>setDragTaskId(id),200);};
  const priTaskTouchMove=(e)=>{
    if(!dragTaskId)return;e.preventDefault();
    const el=document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY);
    const tid=el?.dataset?.pritaskid;if(tid&&Number(tid)!==dragTaskId)priTaskDragOver(Number(tid));
  };
  const priTaskTouchEnd=()=>{clearTimeout(priTaskTouchRef.current);setDragTaskId(null);};

  const moveTask=(id,dir)=>{
    const a=[...list.tasks];const i=a.findIndex(t=>t.id===id);const j=i+dir;
    if(j<0||j>=a.length)return;
    [a[i],a[j]]=[a[j],a[i]];onUpdate(curr=>({...curr,tasks:a}));
  };
  const addSubItems=(id,subs)=>onUpdate(curr=>({...curr,tasks:curr.tasks.map(t=>t.id===id?{...t,subItems:subs}:t)}));
  const [sendToast,setSendToast]=useState("");
  const showSendToast=msg=>{setSendToast(msg);setTimeout(()=>setSendToast(""),2200);};
  const sendTaskTo=(task,dest,extra)=>{
    if(dest==="matrix"&&setMatrixData){
      setMatrixData(ds=>[...ds,{id:Date.now(),text:task.name,quad:extra||"do",created:Date.now(),touched:Date.now(),url:task.url||""}]);
      showSendToast(`🎯 Sent to Matrix!`);
    } else if(dest==="charge"){
      // The Wipe Out reads from priData directly so it auto-appears — just toast
      showSendToast("⚡ The Wipe Out will pick this up from your To Do List!");
    }
  };
  const onPriDone=fullList=>{
    // fullList only has non-later tasks — merge back with later tasks to preserve them
    let activeIndex=0;
    const recoloured=fullList.map(t=>{
      if(t.done) return t;
      const i=activeIndex++;
      return {
        ...t,
        color: i<3 ? (t.color==="lilac"||t.color==="red" ? "red" : t.color) : (t.color==="red" ? "lilac" : t.color)
      };
    });
    onUpdate(curr=>{
      const laterTasks=curr.tasks.filter(t=>t.later); // preserve save-for-later tasks
      return {...curr,tasks:[...recoloured,...laterTasks]};
    });
    setComparing(false);setPrioritized(true);
  };


  if(comparing){
    return <PriCompare tasks={list.tasks.filter(t=>!t.later)} onDone={onPriDone}/>;
  }
  const active=list.tasks.filter(t=>!t.done&&!t.later);
  const done=list.tasks.filter(t=>t.done);
  const later=list.tasks.filter(t=>!t.done&&t.later);
  return (
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",position:"relative",overflow:"hidden"}}>
      <style>{`
        @keyframes taskConfettiFall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}
        @keyframes taskCelebIn{0%{transform:scale(0.2) rotate(-5deg);opacity:0}100%{transform:scale(1) rotate(0deg);opacity:1}}
        @keyframes taskCelebBob{0%{transform:scale(1) rotate(-4deg)}100%{transform:scale(1.18) rotate(4deg)}}
        @keyframes taskDotPulse{0%{transform:scale(0.7);opacity:0.4}100%{transform:scale(1.3);opacity:1}}
      `}</style>

      {/* Task celebration overlay */}
      {taskCelebration&&(
        <div style={{position:"fixed",inset:0,zIndex:700,display:"flex",alignItems:"center",justifyContent:"center",
          background:taskCelebration.allDone?"radial-gradient(ellipse at center,rgba(15,50,10,0.96),rgba(5,15,5,0.98))":"rgba(10,10,10,0.80)",
          backdropFilter:"blur(5px)"}}
          onClick={()=>setTaskCelebration(null)}>
          {taskConfetti.map(p=>(
            <div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:"-5%",fontSize:p.size,
              animation:`taskConfettiFall ${p.speed}s ${p.delay}s ease-in forwards`,
              transform:`rotate(${p.rotation}deg)`,pointerEvents:"none",zIndex:1}}>{p.emoji}</div>
          ))}
          {taskCelebration.allDone?(
            <div style={{textAlign:"center",zIndex:2,padding:"0 28px",width:"100%",maxWidth:380}}>
              <div style={{fontSize:96,lineHeight:1,marginBottom:14,animation:"taskCelebBob 0.5s ease-in-out infinite alternate",filter:"drop-shadow(0 0 28px rgba(255,215,0,0.8))"}}>🏆</div>
              <div style={{fontFamily:"Georgia,serif",fontWeight:900,fontSize:32,color:"#FFD700",lineHeight:1.1,marginBottom:12,textShadow:"0 0 28px rgba(255,215,0,0.6)",animation:"taskCelebIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards"}}>
                {["ALL DONE!\nLIST CRUSHED! 💥","EVERY TASK\nWIPED OUT! 🔥","INCREDIBLE!\nCOMPLETE! 🌟","CHAMPION!\nEVERY TASK DONE! 👑"][Math.floor(Date.now()/1000)%4].split('\n').map((l,i)=><div key={i}>{l}</div>)}
              </div>
              <div style={{fontSize:16,color:"rgba(255,255,255,0.88)",lineHeight:1.7,marginBottom:20}}>
                You can <strong style={{color:"#FFD700"}}>achieve anything</strong> you put your mind to ✨<br/>
                <strong style={{color:"#90FF90"}}>{list.name}</strong> — completely finished!
              </div>
              <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:16}}>
                {Array.from({length:Math.min(list.tasks.length,10)}).map((_,i)=>(
                  <div key={i} style={{width:16,height:16,borderRadius:"50%",background:"#FFD700",boxShadow:"0 0 10px rgba(255,215,0,0.8)",animation:`taskDotPulse ${0.2+i*0.07}s ease-in-out infinite alternate`}}/>
                ))}
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.30)"}}>Tap anywhere to continue</div>
            </div>
          ):(
            <div style={{background:"rgba(255,253,240,0.97)",borderRadius:28,padding:"28px 24px",textAlign:"center",maxWidth:290,margin:"0 24px",zIndex:2,border:"2.5px solid rgba(90,160,80,0.35)",boxShadow:"0 20px 60px rgba(0,0,0,0.4)",animation:"taskCelebIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards"}}>
              <div style={{fontSize:64,lineHeight:1,marginBottom:8,animation:"taskCelebBob 0.5s ease-in-out infinite alternate"}}>🎉</div>
              <div style={{fontFamily:"Georgia,serif",fontWeight:800,fontSize:22,color:"#1A1A10",marginBottom:8,lineHeight:1.2}}>
                {["TASK DONE! 💪","YES! ONE DOWN! ⚡","NAILED IT! 💥","KEEP GOING! 🔥"][done.length%4]}
              </div>
              <div style={{fontSize:13,color:"#5A7060",lineHeight:1.7,marginBottom:12}}>
                &quot;{taskCelebration.name}&quot; crossed off! &#127807;<br/>
                <span style={{fontSize:12,color:"#8A8070"}}>{done.length+1}/{taskCelebration.total} tasks complete</span>
              </div>
              <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:10}}>
                {Array.from({length:taskCelebration.total}).map((_,i)=>(
                  <div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<done.length+1?"#5A7848":"rgba(90,80,60,0.12)",transition:"background 0.3s"}}/>
                ))}
              </div>
              <div style={{fontSize:11,color:"#C0B090"}}>Tap to continue</div>
            </div>
          )}
        </div>
      )}


      {/* Same vine background as main page */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        <svg width="100%" height="100%" viewBox="0 0 400 860" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="lg1" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#7AB848"/><stop offset="60%" stopColor="#4A8828"/><stop offset="100%" stopColor="#2A5818"/></radialGradient>
            <radialGradient id="lg2" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#90C858"/><stop offset="55%" stopColor="#5A9838"/><stop offset="100%" stopColor="#305820"/></radialGradient>
            <filter id="ls"><feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(20,60,10,0.20)"/></filter>
          </defs>
          <ellipse cx="200" cy="-20" rx="280" ry="180" fill="rgba(255,210,120,0.10)"/>
          <path d="M-10 0 C20 80 -5 160 15 240 C35 320 10 400 25 480" stroke="#3A6820" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6"/>
          <ellipse cx="28" cy="60" rx="38" ry="22" fill="url(#lg1)" filter="url(#ls)" transform="rotate(-30 28 60)" opacity="0.85"/>
          <ellipse cx="35" cy="140" rx="44" ry="25" fill="url(#lg2)" filter="url(#ls)" transform="rotate(-20 35 140)" opacity="0.80"/>
          <ellipse cx="22" cy="230" rx="40" ry="24" fill="url(#lg1)" transform="rotate(-35 22 230)" opacity="0.70"/>
          <path d="M410 0 C380 80 405 160 385 240 C365 320 390 400 375 480" stroke="#3A6820" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6"/>
          <ellipse cx="372" cy="55" rx="42" ry="24" fill="url(#lg2)" filter="url(#ls)" transform="rotate(28 372 55)" opacity="0.85"/>
          <ellipse cx="365" cy="145" rx="46" ry="26" fill="url(#lg1)" filter="url(#ls)" transform="rotate(22 365 145)" opacity="0.80"/>
          <ellipse cx="378" cy="235" rx="42" ry="24" fill="url(#lg2)" transform="rotate(32 378 235)" opacity="0.70"/>
          <ellipse cx="100" cy="15" rx="50" ry="28" fill="url(#lg1)" filter="url(#ls)" transform="rotate(-10 100 15)" opacity="0.75"/>
          <ellipse cx="200" cy="5" rx="55" ry="30" fill="url(#lg2)" filter="url(#ls)" transform="rotate(5 200 5)" opacity="0.70"/>
          <ellipse cx="305" cy="18" rx="48" ry="27" fill="url(#lg1)" transform="rotate(12 305 18)" opacity="0.75"/>
        </svg>
      </div>

      {/* Garden-style header matching main page */}
      <div style={{position:"relative",zIndex:1,padding:"52px 22px 16px",textAlign:"center"}}>
        <button onClick={onBack} style={{position:"absolute",top:16,left:16,background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",border:"none",borderRadius:100,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",backdropFilter:"blur(8px)"}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#2C3820" strokeWidth="2.2" strokeLinecap="round"/></svg>
        </button>
        <button onClick={()=>setScreen&&setScreen("home")} style={{position:"absolute",top:16,right:16,background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",border:"none",borderRadius:100,padding:"8px 14px",fontSize:12,fontWeight:700,color:"#2C3820",cursor:"pointer",backdropFilter:"blur(8px)"}}>🏠</button>
        <button onClick={()=>{
            const idCounts={};
            list.tasks.forEach(t=>{
              const k=t.id;
              if(!idCounts[k]) idCounts[k]=[];
              idCounts[k].push(t.name);
            });
            const idDupes=Object.entries(idCounts).filter(([k,names])=>names.length>1);
            const allIds=list.tasks.map(t=>'ID:'+t.id+' = "'+t.name+'"').join('\n');
            if(idDupes.length>0){
              alert('SAME ID USED TWICE:\n\n'+idDupes.map(([id,names])=>'ID '+id+' shared by: '+names.join(' AND ')).join('\n\n'));
            } else {
              alert('All IDs unique. Total: '+list.tasks.length+'\n\n'+allIds);
            }
          }} style={{position:"absolute",top:60,right:16,background:"rgba(72,120,168,0.85)",border:"none",borderRadius:100,padding:"6px 12px",fontSize:11,fontWeight:700,color:"#fff",cursor:"pointer"}}>🐛 Check</button>
        <div style={{display:"inline-block",background:"rgba(255,255,255,0.65)",borderRadius:14,padding:"6px 16px 8px",marginBottom:6}}>
          <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:18,color:"#1A2810",marginBottom:2,textAlign:"center"}}>{list.name} 🌿</div>
          <div style={{fontSize:12,color:"#3A5828",fontStyle:"italic",fontWeight:700,textAlign:"center"}}>
            {active.length===0&&done.length>0?" All done! Well done you!":
             active.length>0?`${done.length} done · ${active.length} to go`:"Add your first task below"}
          </div>
        </div>
        {/* Progress bar */}
        {list.tasks.length>0&&(
          <div style={{marginTop:10,maxWidth:260,margin:"10px auto 0"}}>
            <div style={{height:5,background:"rgba(90,80,60,0.12)",borderRadius:100,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${Math.round((done.length/list.tasks.length)*100)}%`,background:"#4A7838",borderRadius:100,transition:"width 0.4s"}}/>
            </div>
          </div>
        )}
      </div>

      <div style={{position:"relative",zIndex:1,padding:"0 14px"}}>

        {/* Add task */}
{/* Add task at top */}
        {/* Add task — garden glass style matching main page */}
        <div style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",backdropFilter:"blur(16px)",borderRadius:22,padding:"14px 16px",marginBottom:14,border:"1.5px solid rgba(90,120,72,0.15)",boxShadow:"0 4px 20px rgba(42,80,28,0.07)"}}>
          <div style={{fontSize:15,fontWeight:800,color:"#1A2810",marginBottom:8,display:"flex",alignItems:"center",gap:5}}>
            <span>✏️</span> Add a task
          </div>
          <div style={{display:"flex",gap:10}}>
            <input value={newTask} onChange={e=>setNewTask(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&addTask()}
              placeholder="Add a task…"
              style={{flex:1,padding:"13px 16px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.25)",fontSize:16,fontWeight:700,color:"#1A2810",background:"rgba(255,255,255,0.85)",outline:"none"}}/>
            <button onClick={addTask}
              style={{width:46,height:46,borderRadius:"50%",background:"#FFD700",color:"#2C3820",border:"none",fontSize:24,fontWeight:900,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 3px 12px rgba(255,200,0,0.40)"}}>
              +
            </button>
          </div>
          {newUrl!==undefined&&(
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8,background:"rgba(90,120,72,0.06)",borderRadius:100,padding:"6px 12px"}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{flexShrink:0,opacity:0.5}}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#3A6020" strokeWidth="2" strokeLinecap="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#3A6020" strokeWidth="2" strokeLinecap="round"/></svg>
              <input value={newUrl} onChange={e=>setNewUrl(e.target.value)}
                placeholder="Paste a link (optional)"
                style={{flex:1,border:"none",outline:"none",fontSize:12,color:"rgba(42,60,28,0.70)",background:"transparent"}}/>
            </div>
          )}
        </div>


        {active.map((task,i)=>(
          <div key={task.id}>
            {i===0&&active.length>0&&(
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <div style={{height:1,flex:1,background:"rgba(90,120,72,0.25)"}}/>
                <span style={{fontSize:10,fontWeight:800,color:"#5A7848",letterSpacing:1.5,textTransform:"uppercase"}}>⭐ Top 3 — Focus here first</span>
                <div style={{height:1,flex:1,background:"rgba(90,120,72,0.25)"}}/>
              </div>
            )}
            {i===3&&(
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,marginTop:4}}>
                <div style={{height:1,flex:1,background:"rgba(255,255,255,0.15)"}}/>
                <span style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:1.2,textTransform:"uppercase"}}>Other Tasks</span>
                <div style={{height:1,flex:1,background:"rgba(255,255,255,0.15)"}}/>
              </div>
            )}
            <div key={task.id}
                data-pritaskid={task.id}
                style={{opacity:dragTaskId===task.id?0.5:1,transform:dragTaskId===task.id?"scale(1.02)":"scale(1)",transition:"all 0.15s"}}>
              <PriTaskRow task={task} index={i} onDelete={deleteTask} onComplete={completeTask} onColorChange={colorTask} onEdit={editTask} onLater={laterTask} onMoveToHw={onMoveToHw} hwZones={hwZones} onAddSub={addSubItems} lists={[]} onPrioritizeThis={()=>setComparing(true)} onSendTo={sendTaskTo} onMoveUp={()=>moveTask(task.id,-1)} onMoveDown={()=>moveTask(task.id,1)} isFirst={i===0} isLast={i===active.length-1} setScreen={setScreen}
                dragHandlers={{
                  draggable:true,
                  onDragStart:e=>{e.dataTransfer.effectAllowed="move";setDragTaskId(task.id);},
                  onDragOver:e=>{e.preventDefault();priTaskDragOver(task.id);},
                  onDragEnd:()=>setDragTaskId(null),
                  onTouchStart:e=>priTaskTouchStart(e,task.id),
                  onTouchMove:priTaskTouchMove,
                  onTouchEnd:priTaskTouchEnd,
                }}/>
            </div>)
          </div>
        ))}
        {done.length>0&&<><div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:1.5,margin:"16px 0 8px"}}>✓ Completed</div>{done.map((task,i)=>(<PriTaskRow key={task.id} task={task} index={i} onDelete={deleteTask} onComplete={completeTask} onColorChange={colorTask} onEdit={editTask}/>))}</>}
        {later.length>0&&(
          <div style={{marginTop:8}}>
            <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",letterSpacing:1.5,margin:"16px 0 8px",display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
              💾 Save for later ({later.length})
              <button onClick={recoverLaterTasks} style={{fontSize:10,padding:"2px 8px",background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:100,color:"#fff",cursor:"pointer",fontWeight:600}}>↩ Recover lost tasks</button>
            </div>
            {later.map((task,i)=>(
              <PriTaskRow key={task.id} task={task} index={i} onDelete={deleteTask} onComplete={completeTask} onColorChange={colorTask} onEdit={editTask} onLater={laterTask}/>
            ))}
          </div>
        )}
        <div style={{textAlign:"center",marginTop:8,marginBottom:4}}>
          <button onClick={recoverLaterTasks} style={{fontSize:11,color:"rgba(255,255,255,0.55)",background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>↩ Recover lost saved-for-later tasks</button>
        </div>

        {active.length>1&&(
          <div style={{position:"sticky",bottom:90,left:0,right:0,padding:"12px 0 4px",background:"transparent",pointerEvents:"none"}}>
            <button onClick={()=>setComparing(true)}
              style={{width:"100%",padding:"14px 20px",background:"linear-gradient(135deg,rgba(230,200,180,0.96) 0%,rgba(210,195,220,0.96) 35%,rgba(190,215,200,0.96) 70%,rgba(220,210,185,0.96) 100%)",color:"#2A3820",border:"1.5px solid rgba(90,120,72,0.25)",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,cursor:"pointer",boxShadow:"0 4px 18px rgba(90,120,72,0.20)",pointerEvents:"auto",display:"flex",alignItems:"center",justifyContent:"center",gap:8,backdropFilter:"blur(8px)"}}>
              <span style={{fontSize:18}}>🎯</span>
              <span>{prioritized?"Sort again — reprioritise":"Prioritise — what matters most?"}</span>
            </button>
          </div>
        )}

        {/* Focus Timer — at bottom, matches Chores style */}
        <div style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:18,padding:"11px 16px",marginBottom:10,border:"1.5px solid rgba(180,160,140,0.35)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:15}}>⏱</span>
            <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:13,color:"#1A1A10",flex:1}}>Focus Timer</div>
            <div style={{fontFamily:"monospace",fontSize:20,fontWeight:700,color:(focusLeft!==null&&focusLeft<=59)?"#E03020":"#1A2810"}}>{focusLeft!==null?fmtTimer(focusLeft):fmtTimer((focusMins||25)*60)}</div>
          </div>
          <div style={{display:"flex",gap:6,marginTop:9}}>
            {[10,20,30,60].map(m=>(
              <button key={m} onClick={()=>{setFocusMins&&setFocusMins(m);setFocusLeft&&setFocusLeft(null);setFocusOn&&setFocusOn(false);}}
                style={{flex:1,padding:"5px 0",background:(focusMins||25)===m?"rgba(90,120,72,0.20)":"rgba(255,255,255,0.6)",border:((focusMins||25)===m?"1.5px solid rgba(90,120,72,0.40)":"1.5px solid rgba(180,160,140,0.25)"),borderRadius:9,fontSize:11,fontWeight:700,color:(focusMins||25)===m?"#3A5828":"#5A4A30",cursor:"pointer"}}>{m===60?"1hr":m+"m"}</button>
            ))}
            <button onClick={()=>{
              if(focusLeft===null){setFocusLeft&&setFocusLeft((focusMins||25)*60);setFocusOn&&setFocusOn(true);setFocusAlerted&&setFocusAlerted(false);}
              else if(focusLeft===0){setFocusLeft&&setFocusLeft(null);setFocusOn&&setFocusOn(false);}
              else{setFocusOn&&setFocusOn(o=>!o);}
            }}
              style={{flex:1,padding:"5px 0",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",border:"1.5px solid rgba(90,120,72,0.25)",borderRadius:9,fontSize:15,cursor:"pointer"}}>
              {focusLeft===0?"↺":focusOn?"⏸":"▶"}
            </button>
            <button onClick={()=>{setFocusLeft&&setFocusLeft(null);setFocusOn&&setFocusOn(false);setFocusAlerted&&setFocusAlerted(false);}} style={{flex:1,padding:"5px 0",background:"rgba(180,160,140,0.15)",border:"1.5px solid rgba(180,160,140,0.25)",borderRadius:9,fontSize:10,fontWeight:600,color:"#5A4A30",cursor:"pointer"}}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const SHOP_TEMPLATES=[
  {id:"weekly",    icon:"🛒",name:"Weekly shop",        color:"#2ECC71",items:["Milk","Bread","Eggs","Butter","Cheese","Chicken","Pasta","Rice","Vegetables","Fruit","Yoghurt","Juice"]},
  {id:"topup",     icon:"⚡",name:"Top up",            color:"#F39C12",items:["Milk","Bread","Eggs","Butter","Cheese","Bananas","Juice","Snacks","Toilet roll","Washing up liquid"]},
  {id:"cleaning",  icon:"🧹",name:"Cleaning supplies",  color:"#3498DB",items:["Washing up liquid","Bleach","Surface spray","Sponges","Bin bags","Toilet roll","Laundry tablets","Fabric softener"]},
  {id:"toiletries",icon:"🧴",name:"Toiletries",         color:"#9B59B6",items:["Shampoo","Conditioner","Body wash","Toothpaste","Deodorant","Moisturiser","Razors","Cotton pads"]},
  {id:"pets",      icon:"🐾",name:"Pets",               color:"#8D6E63",items:["Dog food","Cat food","Treats","Poo bags","Flea treatment","Pet shampoo","Toys","Bedding"]},
  {id:"gifts",     icon:"🎁",name:"Gifts & Presents",   color:"#C0392B",items:["Birthday card","Wrapping paper","Ribbon","Gift bags","Sellotape","Tissue paper","Birthday candles"]},
  {id:"party",     icon:"🎉",name:"Party",              color:"#E67E22",items:["Crisps","Dips","Sausage rolls","Sandwiches","Cake","Juice","Pop","Plates","Cups","Napkins"]},
  {id:"health",    icon:"💊",name:"Health",             color:"#E74C3C",items:["Vitamins","Paracetamol","Ibuprofen","Plasters","Hand sanitiser","Tissues"]},
  {id:"wishlist",  icon:"⭐",name:"Wish list",           color:"#9B59B6",items:["Write things you'd love to buy here..."]},
];

const SHOP_LIST_ICONS=["🛒","🎁","🍎","👗","🏠","🐾","💊","📚","🎉","✈️"];


function ShopListDetail({list,onBack,onUpdate,onDelete,onOpenRecipe}){
  const [newItem,setNewItem]=useState("");
  const [dragId,setDragId]=useState(null);

  const [editingId,setEditingId]=useState(null);
  const [editText,setEditText]=useState("");
  const [editQty,setEditQty]=useState("");
  const [sharedOpen,setSharedOpen]=useState(true);
  const save=items=>onUpdate({...list,items:items.map(i=>({cat:"",...i}))});
  const addItem=()=>{if(!newItem.trim())return;save([...list.items,{id:Date.now()+Math.random(),text:newItem.trim(),done:false,cat:""}]);setNewItem("");};
  const toggle=id=>save(list.items.map(it=>it.id===id?{...it,done:!it.done}:it));
  // Recipes (read once) so each meal heading can check every ingredient is covered
  const [savedRecipes]=useState(()=>{try{const v=JSON.parse(localStorage.getItem('chores_recipes')||'[]');return Array.isArray(v)?v:[];}catch{return [];}});
  // Removing a recipe item (bin, or clearing ticked ones) = "sorted", so the recipe check won't ask about it again
  const haveFrom=items=>items.filter(i=>i&&i.meal).flatMap(i=>[{meal:i.meal,key:shopKey(i.text)},...(i.alsoFor||[]).map(a=>({meal:a.meal,key:shopKey(a.text)}))]).filter(h=>h.key);
  const removeItems=pred=>{
    const gone=list.items.filter(pred);
    onUpdate({...list,items:list.items.filter(i=>!pred(i)).map(i=>({cat:"",...i})),haveAlready:[...(list.haveAlready||[]),...haveFrom(gone)]});
  };
  const del=id=>removeItems(it=>it.id===id);
  const dragOver=toId=>{
    if(!dragId||dragId===toId)return;
    const a=[...list.items],fi=a.findIndex(i=>i.id===dragId),ti=a.findIndex(i=>i.id===toId);
    if(fi<0||ti<0)return;a.splice(fi,1);a.splice(ti,0,list.items[fi]);save(a);
  };
  const done=list.items.filter(i=>i.done).length;
  const total=list.items.length;

  return(
    <div style={{minHeight:"100vh",background:"transparent",paddingBottom:90,fontFamily:"'Segoe UI',sans-serif"}}>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",backdropFilter:"blur(16px)",padding:"14px 16px 10px",borderBottom:"1px solid rgba(90,80,60,0.08)",position:"sticky",top:0,zIndex:50}}>
        {/* Title row */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
          <div style={{fontSize:22,flexShrink:0}}>{list.icon||"🛒"}</div>
          <div style={{flex:1,fontFamily:"Georgia,serif",fontWeight:700,fontSize:18,color:"#1A1A10"}}>{list.name}</div>
          <div style={{fontSize:12,color:"#8A8070",fontWeight:600,flexShrink:0}}>{done}/{total}</div>
          <button onClick={()=>{onDelete(list.id);}} style={{background:"none",border:"none",cursor:"pointer",color:"#c0392b",fontSize:20,flexShrink:0}}>🗑</button>
        </div>
        <div style={{display:"flex",gap:6,paddingBottom:6}}>
          <button onClick={()=>{
            const txt="🛒 "+list.name+"\n\n"+list.items.filter(i=>!i.done).map(i=>"☐ "+shopLine(i)).join("\n")+(list.items.filter(i=>i.done).length?"\n\n✅ Got:\n"+list.items.filter(i=>i.done).map(i=>"✓ "+shopLine(i)).join("\n"):"")+("\n\nFrom Thinko 🌿");
            if(navigator.share){navigator.share({title:'Shopping List',text:txt});}
            else{window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank');}
          }} style={{flex:1,background:MULTI,color:'#2A3820',border:'1.5px solid rgba(90,120,72,0.25)',borderRadius:12,padding:'11px',fontSize:14,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 18px rgba(90,120,72,0.15)'}}>📤 Share list</button>

        </div>
      </div>

      {/* Progress bar */}
      {total>0&&<div style={{height:4,background:"rgba(90,80,60,0.08)"}}><div style={{height:"100%",width:`${total?Math.round((done/total)*100):0}%`,background:"#5A7848",transition:"width 0.3s"}}/></div>}

      <div style={{padding:"14px 16px"}}>
        {/* Add item */}
        <div style={{display:"flex",gap:10,marginBottom:14,background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:100,padding:"10px 14px 10px 18px",border:"1.5px solid rgba(90,120,72,0.18)",boxShadow:"0 2px 10px rgba(0,0,0,0.04)"}}>
          <input value={newItem} onChange={e=>setNewItem(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&addItem()}
            placeholder="Add item…"
            style={{flex:1,border:"none",outline:"none",fontSize:15,color:"#1A1A10",background:"transparent",fontWeight:600}}/>
          <button onClick={addItem} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:"50%",width:36,height:36,fontSize:20,cursor:"pointer",fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 2px 10px rgba(58,80,38,0.3)"}}>+</button>
        </div>

        {/* Share row */}
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          <button onClick={()=>{
            const txt="🛒 "+list.name+"\n\n"+list.items.filter(i=>!i.done).map(i=>"☐ "+shopLine(i)).join("\n")+(list.items.filter(i=>i.done).length?"\n\n✅ Got:\n"+list.items.filter(i=>i.done).map(i=>"✓ "+shopLine(i)).join("\n"):"")+("\n\nFrom Thinko 🌿");
            if(navigator.share){navigator.share({title:'Shopping List',text:txt});}
            else{window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank');}
          }} style={{flex:1,background:MULTI,color:'#2A3820',border:'1.5px solid rgba(90,120,72,0.25)',borderRadius:14,padding:'12px 8px',fontSize:14,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>📤 Share</button>
          
        </div>

        {list.items.length===0&&(
          <div style={{textAlign:"center",color:"#8A8070",padding:"30px 0",fontSize:14}}>No items yet — add one above</div>
        )}

        {/* Items grouped by category */}
        {(()=>{
          const active=list.items.filter(i=>!i.done);
          const done=list.items.filter(i=>i.done);
          const groups={};
          const mealGroups={};
          const noCat=[];
          const shared=[];
          const mealOrder=[];
          const mealsOf=i=>[i.meal,...(i.alsoFor||[]).map(a=>a.meal)].filter(Boolean);
          const isShared=i=>!!i.meal&&(i.alsoFor||[]).some(a=>a.meal&&a.meal!==i.meal);
          active.forEach(item=>{
            mealsOf(item).forEach(m=>{if(!mealOrder.includes(m))mealOrder.push(m);});
            if(item.cat&&CAT_EMOJI[item.cat]){if(!groups[item.cat])groups[item.cat]=[];groups[item.cat].push(item);}
            else if(isShared(item)) shared.push(item);
            else if(item.meal){if(!mealGroups[item.meal])mealGroups[item.meal]=[];mealGroups[item.meal].push(item);}
            else noCat.push(item);
          });
          const isMealList=isMealShopList(list);
          const listKeys=new Set(list.items.flatMap(i=>[shopKey(i.text),...(i.alsoFor||[]).map(a=>shopKey(a.text))]).filter(Boolean));
          const small={fontSize:12,fontWeight:700,lineHeight:1.45,marginTop:6};
          const recipeFor=meal=>isMealList?savedRecipes.find(r=>String(r.name||"").trim().toLowerCase()===String(meal).trim().toLowerCase()):null;
          // Recipe lines that aren't on the list yet (and you haven't said you have)
          const missingFor=meal=>{
            const recipe=recipeFor(meal); if(!recipe) return [];
            const have=new Set((list.haveAlready||[]).filter(h=>h.meal===meal).map(h=>h.key));
            const seen=new Set();
            return String(recipe.ingredients||"").split("\n").map(x=>x.trim()).filter(x=>x&&!/:\s*$/.test(x))
              .flatMap(splitShopLine).filter(t=>{const k=shopKey(t);if(!k||seen.has(k))return false;seen.add(k);return !listKeys.has(k)&&!have.has(k)&&!isTapWater(t);});
          };
          const checked=mealOrder.filter(m=>recipeFor(m));
          const allMissing=checked.map(m=>({meal:m,items:missingFor(m)})).filter(x=>x.items.length);
          const missingCount=allMissing.reduce((n,x)=>n+x.items.length,0);
          const renderItem=(item)=>(
            <div key={item.id}
              draggable onDragStart={()=>setDragId(item.id)} onDragOver={e=>{e.preventDefault();dragOver(item.id);}} onDragEnd={()=>setDragId(null)}
              style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:18,marginBottom:8,border:"1px solid rgba(90,80,60,0.10)",opacity:dragId===item.id?0.5:1,boxShadow:"0 2px 8px rgba(60,60,40,0.05)"}}>
              {editingId===item.id&&editText!==(item.qty||"")?(
                /* Edit name mode — only when ✏️ tapped, not qty */
                <div style={{padding:"10px 12px"}}>
                  <input value={editText} onChange={e=>setEditText(e.target.value)}
                    autoFocus
                    onKeyDown={e=>{if(e.key==="Enter"){save(list.items.map(i=>i.id===item.id?{...i,text:editText.trim()||i.text}:i));setEditingId(null);}if(e.key==="Escape")setEditingId(null);}}
                    style={{width:"100%",boxSizing:"border-box",padding:"9px 14px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.25)",fontSize:14,fontWeight:600,color:"#1A1A10",outline:"none",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",marginBottom:8}}/>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>{save(list.items.map(i=>i.id===item.id?{...i,text:editText.trim()||i.text}:i));setEditingId(null);}}
                      style={{flex:1,padding:"9px",background:"#4A7838",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:13,cursor:"pointer"}}>✅ Save</button>
                    <button onClick={()=>setEditingId(null)}
                      style={{flex:1,padding:"9px",background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
                  </div>
                </div>
              ):(
                <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 12px"}}>
                  <span style={{cursor:"grab",color:"rgba(90,80,60,0.25)",fontSize:14,flexShrink:0}}>⠿</span>
                  <button onClick={()=>toggle(item.id)}
                    style={{width:24,height:24,borderRadius:"50%",border:`2px solid ${item.done?"#5A7848":"rgba(90,80,60,0.25)"}`,background:item.done?"#5A7848":"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff"}}>
                    {item.done?"✓":""}
                  </button>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                      <span style={{fontSize:15,fontWeight:item.done?400:600,color:item.done?"#8A9080":"#1A1A10",textDecoration:item.done?"line-through":"none"}}>{item.text}</span>
                      {/* Qty badge — always shown, tap to edit inline */}
                      {editingId===item.id?(
                        <input value={editQty} onChange={e=>setEditQty(e.target.value)}
                          onBlur={()=>{save(list.items.map(i=>i.id===item.id?{...i,qty:editQty.trim()}:i));setEditingId(null);}}
                          onKeyDown={e=>{if(e.key==="Enter"||e.key==="Escape"){save(list.items.map(i=>i.id===item.id?{...i,qty:editQty.trim()}:i));setEditingId(null);}}}
                          autoFocus
                          placeholder="qty"
                          style={{width:52,padding:"2px 8px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.35)",fontSize:12,fontWeight:700,color:"#3A6020",outline:"none",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",textAlign:"center"}}/>
                      ):(
                        <button onClick={()=>{setEditingId(item.id);setEditQty(item.qty||"");setEditText(item.text);}}
                          style={{fontSize:12,fontWeight:700,color:item.qty?"#3A6020":"#B0A898",background:item.qty?"rgba(90,120,72,0.10)":"rgba(90,80,60,0.05)",border:item.qty?"1px solid rgba(90,120,72,0.22)":"1px dashed rgba(90,80,60,0.18)",borderRadius:100,padding:"2px 8px",cursor:"pointer",flexShrink:0}}>
                          {item.qty||"+ qty"}
                        </button>
                      )}
                    </div>
                    {isShared(item)&&(
                      <div style={{marginTop:6,padding:"8px 10px",background:"rgba(255,255,255,0.85)",borderRadius:10,border:"1px solid rgba(41,128,185,0.3)"}}>
                        <div style={{fontSize:12,fontWeight:800,color:"#1a5276",marginBottom:4}}>🛒 Buy enough for {mealsOf(item).length} meals:</div>
                        {[{meal:item.meal,text:item.text},...(item.alsoFor||[])].map((a,ai)=>(
                          <div key={ai} style={{fontSize:13,color:"#1A1A10",lineHeight:1.45,display:"flex",gap:6}}>
                            <span style={{fontWeight:800,color:"#2980b9"}}>•</span>
                            <span><b>{a.text}</b> <span style={{color:"#5A4A30",fontSize:12}}>— {a.meal}</span></span>
                          </div>
                        ))}
                      </div>
                    )}
                    {!isShared(item)&&item.meal&&(item.done||(item.cat&&CAT_EMOJI[item.cat]))&&(
                      <div style={{fontSize:11,color:"#8A8070",fontWeight:600,marginTop:2}}>🍽️ {item.meal}</div>
                    )}
                    {!isShared(item)&&(item.alsoFor||[]).map((a,ai)=>(
                      <div key={ai} style={{fontSize:11,color:"#5A7848",fontWeight:700,marginTop:2,lineHeight:1.4}}>{a.meal===item.meal?`➕ Also: ${a.text}`:`🔗 Also for ${a.meal}: ${a.text}`}</div>
                    ))}
                    <select value={item.cat||""} onChange={e=>{save(list.items.map(i=>i.id===item.id?{...i,cat:e.target.value}:i));}}
                      style={{fontSize:11,fontWeight:600,color:item.cat?"#3A6020":"#8A8070",border:item.cat?"1px solid rgba(90,120,72,0.25)":"1px dashed rgba(90,80,60,0.20)",background:item.cat?"rgba(90,120,72,0.08)":"rgba(255,255,255,0.60)",borderRadius:100,cursor:"pointer",padding:"3px 8px",marginTop:3,outline:"none",maxWidth:"100%"}}>
                      <option value="">＋ category</option>
                      {Object.entries(CAT_EMOJI).map(([k,v])=><option key={k} value={k}>{v} {k}</option>)}
                    </select>
                  </div>
                  <button onClick={()=>{setEditingId(item.id);setEditText(item.text);setEditQty(item.qty||"");}}
                    style={{background:"rgba(90,80,60,0.07)",color:"#8A8070",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}} title="Edit name">✏️</button>
                  <button onClick={()=>del(item.id)} style={{background:"none",border:"none",color:"rgba(192,57,43,0.4)",cursor:"pointer",fontSize:14,flexShrink:0}}>🗑</button>
                </div>
              )}
            </div>
          );
          return(
            <div>
              {isMealList&&checked.length>0&&(
                <div style={{padding:"12px 14px",marginBottom:12,background:"rgba(255,255,255,0.96)",borderRadius:14,border:missingCount?"2px solid rgba(230,126,34,0.55)":"2px solid rgba(46,125,50,0.45)",boxShadow:"0 2px 10px rgba(0,0,0,0.10)"}}>
                  {missingCount===0?(
                    <div style={{fontSize:14,fontWeight:800,color:"#2E7D32"}}>✅ All {checked.length} recipe{checked.length===1?"":"s"} checked — nothing missing, nothing doubled</div>
                  ):(
                    <>
                      <div style={{fontSize:14,fontWeight:800,color:"#8B4513",marginBottom:4}}>➕ {missingCount} ingredient{missingCount===1?"":"s"} missing across {allMissing.length} recipe{allMissing.length===1?"":"s"}</div>
                      {allMissing.map(x=>(
                        <div key={x.meal} style={{fontSize:12,color:"#5A4A30",fontWeight:600,lineHeight:1.5}}><b>{x.meal}:</b> {x.items.map(shopName).join(" · ")}</div>
                      ))}
                      <button onClick={()=>{let l=list;allMissing.forEach(x=>{l=addToMealShop([l],x.meal,x.items).lists[0];});onUpdate(l);}}
                        style={{width:"100%",marginTop:10,padding:"10px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer"}}>+ Add all missing</button>
                      <div style={{fontSize:11,color:"#8A8070",marginTop:6,textAlign:"center"}}>Already have some? Tap "✓ I have these" under that meal instead.</div>
                    </>
                  )}
                </div>
              )}
              {noCat.map(renderItem)}
              {shared.length>0&&(
                <div style={{marginBottom:14}}>
                  <div onClick={()=>setSharedOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",margin:"6px 0 8px",background:"rgba(255,255,255,0.95)",borderRadius:14,border:"1.5px solid rgba(41,128,185,0.3)",borderLeft:"6px solid #2980b9",boxShadow:"0 2px 10px rgba(0,0,0,0.10)",cursor:"pointer"}}>
                    <span style={{fontSize:18,flexShrink:0}}>🔗</span>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:16,color:"#1A2810",lineHeight:1.35}}>Needed for more than one meal</div>
                      <div style={{fontSize:12,color:"#1a5276",fontWeight:700,marginTop:3,lineHeight:1.4}}>{shared.map(i=>shopName(i.text)).join(" · ")}</div>
                      <div style={{fontSize:12,color:"#5A4A30",fontWeight:600,marginTop:3}}>{sharedOpen?`Listed once below ↓ with how much each meal needs · tap to hide`:`Tap to show all ${shared.length}`}</div>
                    </div>
                    <span style={{fontSize:12,color:"#fff",fontWeight:800,background:"#2980b9",borderRadius:100,padding:"3px 10px",flexShrink:0}}>{shared.length} {sharedOpen?"▲":"▼"}</span>
                  </div>
                  {sharedOpen&&shared.map(renderItem)}
                </div>
              )}
              {mealOrder.map(meal=>{
                const own=mealGroups[meal]||[];
                const elsewhere=active.filter(i=>!own.includes(i)&&mealsOf(i).includes(meal));
                const recipe=recipeFor(meal);
                const missing=missingFor(meal);
                return(
                <div key={"meal-"+meal} style={{marginBottom:14}}>
                  {/* Solid panel so the meal name is readable over the garden photo */}
                  <div style={{padding:"10px 14px",margin:"6px 0 8px",background:"rgba(255,255,255,0.95)",borderRadius:14,border:"1.5px solid rgba(90,120,72,0.25)",borderLeft:"6px solid #5A7848",boxShadow:"0 2px 10px rgba(0,0,0,0.10)"}}>
                    <div onClick={()=>{if(recipe&&onOpenRecipe)onOpenRecipe(recipe.id);}} style={{display:"flex",alignItems:"center",gap:10,cursor:recipe?"pointer":"default"}}>
                      <span style={{fontSize:18,flexShrink:0}}>🍽️</span>
                      <span style={{flex:1,fontFamily:"Georgia,serif",fontWeight:700,fontSize:16,color:"#1A2810",lineHeight:1.35}}>
                        {meal}
                        {recipe&&<span style={{display:"block",fontFamily:"'Segoe UI',sans-serif",fontSize:12,fontWeight:700,color:"#5A7848",marginTop:2}}>📖 Tap to open recipe ›</span>}
                      </span>
                      <span style={{fontSize:12,color:"#fff",fontWeight:800,background:"#5A7848",borderRadius:100,padding:"3px 10px",flexShrink:0}}>{own.length}</span>
                    </div>
                    {elsewhere.length>0&&(
                      <div style={{...small,color:"#1a5276"}}>🔗 Also needs (listed {elsewhere.every(isShared)?"in the blue section":"elsewhere"}): {elsewhere.map(i=>shopName(i.text)).join(" · ")}</div>
                    )}
                    {recipe&&missing.length===0&&(
                      <div style={{...small,color:"#2E7D32"}}>✅ Every ingredient for this recipe is covered</div>
                    )}
                    {recipe&&missing.length>0&&(
                      <div style={{marginTop:8,padding:"8px 10px",background:"rgba(230,126,34,0.10)",borderRadius:10,border:"1px solid rgba(230,126,34,0.35)"}}>
                        <div style={{fontSize:12,fontWeight:800,color:"#8B4513",lineHeight:1.45}}>➕ In the recipe but not on the list: {missing.map(shopName).join(" · ")}</div>
                        <div style={{display:"flex",gap:6,marginTop:8}}>
                          <button onClick={()=>{const res=addToMealShop([list],meal,missing);onUpdate(res.lists[0]);}}
                            style={{flex:1,padding:"8px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:12,cursor:"pointer"}}>+ Add {missing.length===1?"it":"them"}</button>
                          <button onClick={()=>onUpdate({...list,haveAlready:[...(list.haveAlready||[]),...missing.map(t=>({meal,key:shopKey(t)}))]})}
                            style={{flex:1,padding:"8px",background:"#fff",color:"#5A4A30",border:"1px solid rgba(90,80,60,0.25)",borderRadius:100,fontWeight:700,fontSize:12,cursor:"pointer"}}>✓ I have {missing.length===1?"it":"these"}</button>
                        </div>
                      </div>
                    )}
                  </div>
                  {own.map(renderItem)}
                </div>
                );
              })}
              {Object.entries(groups).map(([cat,items])=>(
                <div key={cat} style={{marginBottom:10}}>
                  <div style={{display:"inline-block",fontSize:12,fontWeight:800,color:"#2A4020",letterSpacing:0.8,textTransform:"uppercase",marginBottom:8,padding:"6px 14px",background:"rgba(255,255,255,0.95)",borderRadius:100,border:"1px solid rgba(90,120,72,0.25)",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
                    {CAT_EMOJI[cat]} {cat}
                  </div>
                  {items.map(renderItem)}
                </div>
              ))}
              {done.length>0&&(
                <div style={{marginTop:14}}>
                  <div style={{display:"inline-block",fontSize:12,fontWeight:800,color:"#5A4A30",letterSpacing:1,textTransform:"uppercase",marginBottom:8,padding:"6px 14px",background:"rgba(255,255,255,0.95)",borderRadius:100,border:"1px solid rgba(90,80,60,0.2)",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>✓ Done</div>
                  {done.map(renderItem)}
                  <button onClick={()=>removeItems(i=>i.done)}
                    style={{width:"100%",padding:"10px",marginTop:8,background:"rgba(192,57,43,0.08)",color:"#c0392b",border:"1px solid rgba(192,57,43,0.18)",borderRadius:100,fontWeight:700,fontSize:13,cursor:"pointer"}}>
                    🗑 Remove ticked items
                  </button>
                </div>
              )}
            </div>
          );
        })()}
      {/* Fixed share bar */}
      <div style={{position:"fixed",bottom:60,left:0,right:0,zIndex:200,display:"flex",boxShadow:"0 -2px 12px rgba(0,0,0,0.15)"}}>
        <button onClick={()=>{
          const items=list.items;
          if(!items.length){alert("No items yet");return;}
          const txt="🛒 "+list.name+"\n\n"+items.filter(i=>!i.done).map(i=>"☐ "+shopLine(i)).join("\n")+(items.filter(i=>i.done).length?"\n\n✅ Got:\n"+items.filter(i=>i.done).map(i=>"✓ "+shopLine(i)).join("\n"):"")+("\n\nFrom Thinko 🌿");
          if(navigator.share){navigator.share({title:'Shopping List',text:txt});}
        else{window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank');}
        }} style={{flex:1,background:MULTI,color:'#2A3820',border:'1.5px solid rgba(90,120,72,0.25)',padding:'16px 8px',fontSize:16,fontWeight:700,cursor:'pointer',borderRadius:14}}>📤 Share list</button>
        
      </div>
      </div>
    </div>
  );
}

const mkItem=(text)=>({id:Date.now()+Math.random(),text:text.trim(),done:false});
const mkShopList=(name,icon)=>({id:Date.now()+Math.random(),name:name||"My List",icon:icon||"🛒",items:[],color:"#5A7848"});

const CAT_EMOJI={
  "fruit & veg":"🥦",
  "meat & fish":"🥩",
  "dairy & eggs":"🧀",
  "bread & bakery":"🥖",
  "tins & packets":"🥫",
  "frozen":"🧊",
  "drinks":"🥤",
  "snacks & confectionery":"🍿",
  "condiments & sauces":"🫙",
  "cleaning & household":"🧹",
  "toiletries & beauty":"🧴",
  "clothing":"👗",
  "baby & kids":"🍼",
  "health & pharmacy":"💊",
  "pets":"🐾",
};

// ── Meal Plan Shopping: ONE list for all recipes, grouped by meal, no double items ──
const MEAL_SHOP_NAME="Meal Plan Shopping";
const isMealShopList=l=>!!l&&(l.mealShop===true||l.name===MEAL_SHOP_NAME||l.name==="🍽️ Meal Plan Shopping");
// Boil an ingredient line down to the thing you'd actually BUY, so different wordings match:
//   "1 tsp salt" = "sea salt, to taste" · "½ tsp freshly ground black pepper" = "black pepper"
//   "2 cloves garlic, crushed" = "3 garlic cloves" · "1/3 cup shredded Cheddar cheese" = "grated cheddar"
const SHOP_UNITS=/^(tbsps?|tsps?|tablespoons?|teaspoons?|dsp|g|grams?|kg|ml|l|litres?|liters?|oz|lbs?|cups?|handfuls?|pinch(es)?|dash(es)?|cloves?|cans?|tins?|bunch(es)?|slices?|sprigs?|packs?|packets?|jars?|bags?|pieces?|knobs?|splash(es)?|sticks?|drizzle|glugs?|sprinkle|rashers?|heads?|thumbs?|stalks?|bottles?|cartons?|pots?|tubs?|balls?|blocks?)\b\.?\s*/;
const SHOP_DESCRIPTORS=/\b(freshly|fresh|ground|cracked|crushed|finely|roughly|thinly|coarsely|chopped|diced|sliced|grated|shredded|minced|peeled|softened|melted|beaten|room temperature|large|small|medium|big|extra|virgin|light|lean|mild|mature|strong|unsalted|salted|semi skimmed|skimmed|whole|full fat|low fat|reduced fat|good quality|organic|free range|boneless|skinless|ripe)\b/g;
const shopKey=txt=>{
  let s=String(txt||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
  s=s.replace(/\([^)]*\)/g," ").replace(/&/g," and ").replace(/-/g," ").split(",")[0];
  s=s.replace(/^\s*(season(ed)? with|to season|to serve|for serving|to garnish)\s*:?\s*/,"");
  s=s.replace(/\s+(for|to) (frying|fry|serving|serve|garnish|garnishing|greasing|grease|drizzling|drizzle|taste|season|seasoning|decorate|dusting)\b.*$/,"");
  s=s.replace(/\s+optional\s*$/,"");
  for(let n=0;n<5;n++){
    const before=s;
    s=s.trim();
    s=s.replace(/^(a|an|some|about|approx|approximately|around|roughly)\s+/,"");
    s=s.replace(/^[\d\s\/.½¼¾⅓⅔⅛x×]+/,"");
    s=s.replace(SHOP_UNITS,"");
    s=s.replace(/^of\s+/,"");
    if(s===before)break;
  }
  // Same product, different words
  s=s.replace(/\b(minced|ground) (beef|lamb|pork|turkey|chicken)\b/g,"$2 mince")
     .replace(/\bchopped tomatoes\b/g,"tinned tomatoes")
     .replace(/\btomato paste\b/g,"tomato puree")
     .replace(/\b(sea|kosher|table|flaky|fine|coarse|rock) salt\b/g,"salt").replace(/\bsalt flakes\b/g,"salt")
     .replace(/\bblack peppercorns?\b/g,"black pepper")
     .replace(/\bgarlic cloves?\b/g,"garlic")
     .replace(/\begg (yolks?|whites?)\b/g,"egg")
     .replace(/\b(?:juice|zest) of (?:\S+ )?(?:a |an )?(lemon|lime)s?\b/g,"$1").replace(/\b(lemon|lime) (juice|zest)\b/g,"$1")
     .replace(/\b([a-z]+) stock cubes?\b/g,"$1 stock").replace(/\bstock cubes?\b/g,"stock")
     .replace(/\b(cheddar|mozzarella|parmesan|monterey jack|red leicester|feta|halloumi|gouda|edam|brie|stilton|emmental|gruyere|wensleydale|double gloucester) cheese\b/g,"$1");
  s=s.replace(SHOP_DESCRIPTORS," ");
  s=s.replace(/[^a-z\s]/g," ").replace(/\s+/g," ").trim();
  s=s.replace(/^(of|and)\s+/,"").replace(/\s+(and|of)$/,"");
  return s.replace(/oes$/,"o").replace(/([^s])s$/,"$1");
};
const ingCore=shopKey;
// "Salt and pepper" / "Salt & freshly ground black pepper, to taste" → two separate things to buy
const splitShopLine=txt=>{
  const t=String(txt||"");
  const parts=t.split(",").map(p=>shopKey(p));
  const first=parts[0]||"";
  if(/^(salt and (black )?pepper|(black )?pepper and salt)$/.test(first)) return ["Salt","Black pepper"];
  if(first==="salt"&&/^(black )?pepper$/.test(parts[1]||"")) return ["Salt","Black pepper"];
  return [t];
};
// Short tidy name for summaries: "½ tsp freshly ground black pepper" → "Black pepper"
const shopName=txt=>{const k=shopKey(txt);return k?k.charAt(0).toUpperCase()+k.slice(1):String(txt||"").trim();};
// Tap water in a recipe isn't something you buy
const isTapWater=txt=>/^(cold |boiling |hot |warm |tap |lukewarm )?water$/.test(shopKey(txt));
// Add one meal's ingredients to the combined list. Anything already on it (and not ticked off)
// isn't added again — the existing line gets an "also for" note instead, so amounts aren't lost.
// haveTexts = lines you said you already have (unticked), so the recipe check doesn't nag about them.
const addToMealShop=(lists,mealName,entries,haveTexts=[])=>{
  const all=lists||[];
  const found=all.find(isMealShopList);
  const target=found||{id:Date.now()+Math.random(),name:MEAL_SHOP_NAME,icon:"🍽️",color:"#5A7848",items:[],created:Date.now()};
  const items=[...(target.items||[])];
  let added=0;const merged=[];
  const addedNow=new Set();   // lines added in THIS send (a recipe listing salt twice keeps both amounts)
  const expanded=[];
  (entries||[]).forEach(en=>{
    const e=typeof en==="string"?{text:en}:(en||{});
    const text=String(e.text||e.name||"").trim();
    if(!text)return;
    splitShopLine(text).forEach(t=>expanded.push({...e,text:t}));
  });
  expanded.forEach(e=>{
    const text=e.text;
    if(e.done){items.push({id:Date.now()+Math.random(),text,done:true,cat:e.cat||"",qty:e.qty||"",meal:mealName});return;}
    const key=shopKey(text);
    const idx=key?items.findIndex(it=>!it.done&&shopKey(it.text)===key):-1;
    if(idx>=0){
      const it=items[idx];
      const note={meal:mealName,text:e.qty?text+" ("+e.qty+")":text};
      if(addedNow.has(it.id)){ if(it.text!==text) items[idx]={...it,alsoFor:[...(it.alsoFor||[]),note]}; }
      else if(it.meal!==mealName&&!(it.alsoFor||[]).some(a=>a.meal===mealName)) items[idx]={...it,alsoFor:[...(it.alsoFor||[]),note]};
      merged.push(text);
    } else {
      const id=Date.now()+Math.random();
      items.push({id,text,done:false,cat:e.cat||"",qty:e.qty||"",meal:mealName});
      addedNow.add(id);
      added++;
    }
  });
  const have=[...(target.haveAlready||[])];
  (haveTexts||[]).flatMap(t=>splitShopLine(t)).forEach(t=>{const key=shopKey(t);if(key&&!have.some(h=>h.meal===mealName&&h.key===key))have.push({meal:mealName,key});});
  const updated={...target,name:target.name==="🍽️ Meal Plan Shopping"?MEAL_SHOP_NAME:target.name,mealShop:true,items,haveAlready:have};
  return {lists:found?all.map(l=>l.id===found.id?updated:l):[...all,updated],listId:updated.id,added,merged,isNew:!found};
};
// Tidy an existing Meal Plan Shopping list with the stronger matching: split "salt and pepper" lines and
// merge repeats (e.g. black pepper listed under 3 meals) into ONE line with "also for" notes.
// Bought (ticked) and hand-typed items are left alone. Returns the SAME object when nothing changed.
const tidyMealShop=list=>{
  if(!list||!Array.isArray(list.items))return list;
  let changed=false;
  const out=[];const keyIdx={};
  // First: any "also for" note that doesn't actually match its line (from the old, weaker matching)
  // becomes its own item again, so nothing is hidden under the wrong thing.
  const src=[];
  list.items.forEach(it=>{
    if(!it||it.done||!it.meal||!(it.alsoFor||[]).length){src.push(it);return;}
    const k=shopKey(it.text);
    const keep=[],loose=[];
    it.alsoFor.forEach(a=>{(shopKey(a.text)===k||!shopKey(a.text)?keep:loose).push(a);});
    if(loose.length){changed=true;src.push({...it,alsoFor:keep});loose.forEach((a,ai)=>src.push({id:Date.now()+Math.random()+ai,text:a.text,done:false,cat:"",qty:"",meal:a.meal}));}
    else src.push(it);
  });
  src.forEach(it=>{
    if(!it||it.done||!it.meal){out.push(it);return;}
    const parts=splitShopLine(it.text);
    if(parts.length>1)changed=true;
    parts.forEach((t,pi)=>{
      const item=parts.length>1?{...it,id:pi===0?it.id:Date.now()+Math.random()+pi,text:t}:it;
      const key=shopKey(item.text);
      if(key&&keyIdx[key]!==undefined){
        const k=out[keyIdx[key]];
        const extra=[];
        if(item.meal===k.meal){ if(item.text!==k.text&&!(k.alsoFor||[]).some(a=>a.text===item.text))extra.push({meal:item.meal,text:item.text}); }
        else if(!(k.alsoFor||[]).some(a=>a.meal===item.meal)) extra.push({meal:item.meal,text:item.text});
        (item.alsoFor||[]).forEach(a=>{if(a.meal!==k.meal&&!(k.alsoFor||[]).some(x=>x.meal===a.meal)&&!extra.some(x=>x.meal===a.meal))extra.push(a);});
        out[keyIdx[key]]={...k,alsoFor:[...(k.alsoFor||[]),...extra]};
        changed=true;
      } else {
        if(key)keyIdx[key]=out.length;
        out.push(item);
      }
    });
  });
  // forget "I have it" notes for meals no longer on the list
  const meals=new Set(out.flatMap(i=>i?[i.meal,...(i.alsoFor||[]).map(a=>a.meal)]:[]).filter(Boolean));
  const have=(list.haveAlready||[]).filter(h=>meals.has(h.meal));
  if(have.length!==(list.haveAlready||[]).length)changed=true;
  return changed?{...list,items:out,haveAlready:have}:list;
};
const mealShopMsg=res=>{
  const parts=[];
  if(res.added>0) parts.push(`✅ ${res.added} item${res.added===1?"":"s"} added to "${MEAL_SHOP_NAME}"`);
  if(res.merged.length>0) parts.push(`🔗 Already on the list, so not added twice:\n${res.merged.map(t=>"• "+t).join("\n")}`);
  if(res.isNew&&res.added>0) parts.push("Every recipe you send now goes into this one list, under its own heading.");
  return parts.join("\n\n")||"Nothing new to add.";
};
// One line of a shared list (includes "also for" amounts so nobody under-buys)
const shopLine=i=>(i.text||i.name||"")+((i.alsoFor||[]).length?" (+ "+i.alsoFor.map(a=>a.text).join(", ")+")":"");

function ShoppingList({data,setData,setScreen}){
  // Coming back from a recipe opened from the list → reopen that list
  const [activeId,setActiveIdRaw]=useState(()=>{try{const v=localStorage.getItem('thinko_return_list');if(v){localStorage.removeItem('thinko_return_list');const l=(data||[]).find(x=>String(x.id)===v);return l?l.id:null;}}catch{}return null;});
  const [showTemplates,setShowTemplates]=useState(false);
  const [customising,setCustomising]=useState(null);
  const [customItems,setCustomItems]=useState([]);
  const [custNewItem,setCustNewItem]=useState("");
  const [custListName,setCustListName]=useState("");
  const [custDrag,setCustDrag]=useState(null);
  const [dragShop,setDragShop]=useState(null);
  const [lastUsedId,setLastUsedId]=useState(()=>{
    try{return localStorage.getItem('thinko_shop_last')||null;}catch{return null;}
  });
  const setActiveId=id=>{
    setActiveIdRaw(id);
    if(id){
      try{localStorage.setItem('thinko_shop_last',String(id));}catch{}
      setLastUsedId(String(id));
    }
  };
  const shopTouchRef=useRef(null);
  const [templateOrder,setTemplateOrder]=useState(()=>{
    try{
      const v=localStorage.getItem('thinko_template_order');
      const stored=v?JSON.parse(v):null;
      const allIds=SHOP_TEMPLATES.map(t=>t.id);
      if(!stored||!allIds.every(id=>stored.includes(id)))return allIds;
      return stored;
    }catch{return SHOP_TEMPLATES.map(t=>t.id);}
  });
  const [shopOrder,setShopOrder]=useState(()=>{
    try{const v=localStorage.getItem('thinko_shop_order');return v?JSON.parse(v):null;}catch{return null;}
  });

  // Old separate recipe lists ("Corned Beef Hash — Ingredients", "🍽 Fajitas") are folded into the ONE
  // Meal Plan Shopping list automatically — no button to find. Each keeps its meal heading; repeats merge.
  const [mergedNote,setMergedNote]=useState(null);
  useEffect(()=>{
    const oldLists=(data||[]).filter(l=>!!l&&!isMealShopList(l)&&(/ — Ingredients$/.test(l.name||"")||/^🍽/.test(l.name||"")));
    if(!oldLists.length) return;
    let lists=data;let listId=null;let merged=0;
    oldLists.forEach(ol=>{
      const meal=(ol.name||"").replace(/ — Ingredients$/,"").replace(/^🍽️?\s*/,"").trim()||"Recipe";
      const res=addToMealShop(lists,meal,ol.items||[]);
      lists=res.lists;listId=res.listId;merged+=res.merged.length;
    });
    const oldIds=new Set(oldLists.map(l=>l.id));
    setData(lists.filter(l=>!oldIds.has(l.id)));
    setMergedNote({count:oldLists.length,merged,listId});
  },[data]);
  // Tidy the combined list with the stronger matching (merges repeats like black pepper) — runs only when needed
  useEffect(()=>{
    const ml=(data||[]).find(isMealShopList);
    if(!ml)return;
    const t=tidyMealShop(ml);
    if(t!==ml) setData(ds=>ds.map(l=>l.id===ml.id?tidyMealShop(l):l));
  },[data]);

  // Navigate to open list
  const active=data.find(l=>l.id===activeId);
  if(active) return <ShopListDetail list={active} onOpenRecipe={rid=>{try{localStorage.setItem('thinko_open_recipe',String(rid));localStorage.setItem('thinko_return_list',String(active.id));}catch{}setScreen("meals");}} onBack={()=>setActiveId(null)} onUpdate={u=>setData(ds=>ds.map(l=>l.id===u.id?u:l))} onDelete={id=>{setData(ds=>ds.filter(l=>l.id!==id));setActiveId(null);}}/>;

  const orderedLists=(()=>{
    const base=shopOrder
      ?(shopOrder.map(id=>data.find(l=>l.id===id)).filter(Boolean).concat(data.filter(l=>!shopOrder.includes(l.id))))
      :data;
    // Meal Plan Shopping goes to the top, unless you've dragged it somewhere yourself
    const ml=base.find(isMealShopList);
    return ml&&!(shopOrder||[]).includes(ml.id)?[ml,...base.filter(l=>l!==ml)]:base;
  })();

  const shopDragOver=(e,id)=>{
    e.preventDefault();
    if(!dragShop||dragShop===id)return;
    const ids=orderedLists.map(l=>l.id);
    const fi=ids.indexOf(dragShop),ti=ids.indexOf(id);
    if(fi<0||ti<0)return;
    ids.splice(fi,1);ids.splice(ti,0,dragShop);
    setShopOrder(ids);
    try{localStorage.setItem('thinko_shop_order',JSON.stringify(ids));}catch{}
  };

  // Open the customise screen for a template
  const pickTemplate=(t)=>{
    setCustomising(t);
    setCustomItems((t.items||[]).map(n=>({name:typeof n==="string"?n:n.name,on:true,cat:""})));
    setCustNewItem("");
    setCustListName(t.id==="blank"?"":t.name);
    setShowTemplates(false);
  };

  // Create and save the list
  const createList=()=>{
    const name=custListName.trim()||customising.name||"My List";
    const items=customItems
      .filter(ci=>ci.on)
      .map((ci,i)=>({...mkItem(ci.name),id:Date.now()+i,cat:ci.cat||""}));
    const nl={...mkShopList(name,customising.icon||"📝"),items,color:customising.color||"#5A7848"};
    setData(ds=>[...(ds||[]),nl]);
    setActiveId(nl.id);
    setCustomising(null);
    setCustListName("");
    setCustNewItem("");
    setCustomItems([]);
  };

  // ── Customise screen ──────────────────────────────────────────────────────
  if(customising) return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",padding:"14px 18px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(90,80,60,0.08)",position:"sticky",top:0,zIndex:50}}>
        <button onClick={()=>setCustomising(null)} style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{flex:1}}>
          <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:18,color:"#1A1A10"}}>{customising.icon} New list</div>
          <div style={{fontSize:12,color:"#8A8070"}}>Name it, tick items, then tap Create</div>
        </div>
        <button onClick={createList}
          style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",color:"#2A1A08",border:"none",borderRadius:100,padding:"10px 18px",fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 3px 14px rgba(58,80,38,0.30)"}}>
          ✅ Create
        </button>
      </div>

      <div style={{padding:"16px 14px"}}>
        {/* List name — always shown, prominent */}
        <div style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",backdropFilter:"blur(12px)",borderRadius:22,padding:"16px 18px",marginBottom:14,border:"1.5px solid rgba(90,120,72,0.22)",boxShadow:"0 4px 18px rgba(42,80,28,0.08)"}}>
          <div style={{fontSize:11,fontWeight:700,color:"rgba(42,60,28,0.45)",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>📝 Name your list</div>
          <input value={custListName} onChange={e=>setCustListName(e.target.value)}
            placeholder="e.g. This week, Pharmacy, School run..."
            autoFocus
            style={{width:"100%",boxSizing:"border-box",padding:"13px 18px",borderRadius:100,border:"2px solid rgba(90,120,72,0.25)",fontSize:16,fontWeight:700,color:"#1A2810",outline:"none",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)"}}/>
          {custListName.trim()===''&&<div style={{fontSize:11,color:"rgba(42,60,28,0.40)",marginTop:6,paddingLeft:4}}>Tip: give it a name that makes sense to you</div>}
        </div>

        {/* Items */}
        <div style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:22,overflow:"hidden",border:"1px solid rgba(255,255,255,0.9)",boxShadow:"0 2px 14px rgba(60,70,40,0.06)"}}>
          <div style={{height:4,background:customising.color||"#5A7848"}}/>
          <div style={{padding:"14px 16px"}}>
            {customItems.length>0&&(
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <span style={{fontSize:12,color:"#8A8070",fontWeight:600}}>{customItems.filter(i=>i.on).length} of {customItems.length} selected</span>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>setCustomItems(ci=>ci.map(i=>({...i,on:true})))} style={{fontSize:11,color:"#5A7848",background:"none",border:"none",cursor:"pointer",fontWeight:700}}>All</button>
                  <button onClick={()=>setCustomItems(ci=>ci.map(i=>({...i,on:false})))} style={{fontSize:11,color:"#c0392b",background:"none",border:"none",cursor:"pointer",fontWeight:700}}>None</button>
                </div>
              </div>
            )}
            {customItems.length===0&&(
              <div style={{textAlign:"center",padding:"12px 0 8px",color:"#8A8070",fontSize:13}}>Add items below</div>
            )}
            {customItems.map((item,i)=>(
              <div key={i}
                draggable
                onDragStart={e=>{e.dataTransfer.effectAllowed="move";setCustDrag(i);}}
                onDragOver={e=>{e.preventDefault();if(custDrag===null||custDrag===i)return;setCustomItems(ci=>{const a=[...ci];const[m]=a.splice(custDrag,1);a.splice(i,0,m);return a;});setCustDrag(i);}}
                onDragEnd={()=>setCustDrag(null)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<customItems.length-1?"1px solid rgba(90,80,60,0.07)":"none",opacity:custDrag===i?0.5:1}}>
                <div style={{color:"rgba(90,120,72,0.30)",fontSize:14,flexShrink:0}}>⠿</div>
                <div onClick={()=>setCustomItems(ci=>ci.map((x,j)=>j===i?{...x,on:!x.on}:x))}
                  style={{width:24,height:24,borderRadius:"50%",border:"2px solid "+(item.on?"#5A7848":"rgba(90,80,60,0.25)"),background:item.on?"#5A7848":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
                  {item.on&&<svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4l3.5 3.5L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:500,color:item.on?"#1A1A10":"#B0A898",textDecoration:item.on?"none":"line-through",marginBottom:3}}>{item.name}</div>
                  <select value={item.cat||""} onChange={e=>setCustomItems(ci=>ci.map((x,j)=>j===i?{...x,cat:e.target.value}:x))}
                    style={{fontSize:11,color:"#5A7848",border:"1px solid rgba(90,120,72,0.20)",borderRadius:100,padding:"2px 8px",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",cursor:"pointer"}}>
                    <option value="">+ category</option>
                    {Object.entries(CAT_EMOJI).map(([k,v])=><option key={k} value={k}>{v} {k}</option>)}
                  </select>
                </div>
                <button onClick={()=>setCustomItems(ci=>ci.filter((_,j)=>j!==i))}
                  style={{background:"rgba(192,57,43,0.07)",color:"#c0392b",border:"none",borderRadius:"50%",width:28,height:28,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🗑</button>
              </div>
            ))}
            {/* Add item */}
            <div style={{display:"flex",gap:8,marginTop:12,paddingTop:12,borderTop:"1px solid rgba(90,80,60,0.07)"}}>
              <input value={custNewItem} onChange={e=>setCustNewItem(e.target.value)}
                placeholder="Add an item…"
                onKeyDown={e=>{if(e.key==="Enter"&&custNewItem.trim()){setCustomItems(ci=>[...ci,{name:custNewItem.trim(),on:true,cat:""}]);setCustNewItem("");}}}
                style={{flex:1,padding:"10px 14px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.22)",fontSize:13,color:"#1A2810",outline:"none",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)"}}/>
              <button onClick={()=>{if(custNewItem.trim()){setCustomItems(ci=>[...ci,{name:custNewItem.trim(),on:true,cat:""}]);setCustNewItem("");}}}
                style={{width:42,height:42,borderRadius:"50%",background:"#FFD700",color:"#2C3820",border:"none",fontSize:20,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(255,200,0,0.35)"}}>+</button>
            </div>
          </div>
        </div>

        <button onClick={createList}
          style={{width:"100%",marginTop:14,padding:"15px",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",color:"#2A1A08",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:16,cursor:"pointer",boxShadow:"0 4px 18px rgba(58,80,38,0.30)"}}>
          ✅ Create list
        </button>
        {customItems.filter(i=>i.on).length>0&&(
          <div style={{display:"flex",gap:8,marginTop:10,marginBottom:4}}>
            <button onClick={()=>{
              const name=custListName||customising.name;
              const items=customItems.filter(i=>i.on).map(i=>i.name);
              const txt="🛒 "+name+"\n\n"+items.map(i=>"☐ "+i).join("\n")+"\n\nFrom Thinko 🌿";
              if(navigator.share){navigator.share({title:'Shopping List',text:txt});}
            else{window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank');}
            }} style={{flex:1,background:MULTI,color:'#2A3820',border:'1.5px solid rgba(90,120,72,0.25)',borderRadius:20,padding:'13px',fontSize:14,fontWeight:700,cursor:'pointer'}}>📤 Share</button>
            
          </div>
        )}
        <button onClick={()=>setCustomising(null)}
          style={{width:"100%",marginTop:8,padding:"12px",background:"transparent",color:"#8A8070",border:"1px solid rgba(90,80,60,0.15)",borderRadius:100,fontWeight:600,fontSize:13,cursor:"pointer"}}>
          Cancel
        </button>
      </div>
    </div>
  );

  const ALL_TEMPLATES=[...SHOP_TEMPLATES];

  // ── Beautiful full-page template picker ───────────────────────────────────
  if(showTemplates||data.length===0){
    const hasLists=data.length>0;
    return(
      <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#E4EFE0 0%,#D4E6CC 40%,#C8DFBE 100%)",fontFamily:"'Segoe UI',sans-serif",position:"relative",overflow:"hidden"}}>
        {/* Decorative circles */}
        <div style={{position:"absolute",top:-80,right:-80,width:280,height:280,borderRadius:"50%",background:"rgba(90,140,72,0.18)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:60,left:-60,width:200,height:200,borderRadius:"50%",background:"rgba(255,220,100,0.12)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:120,right:-40,width:180,height:180,borderRadius:"50%",background:"rgba(90,140,72,0.14)",pointerEvents:"none"}}/>

{/* Header — back button only */}
        <div style={{padding:"56px 20px 0",position:"relative",zIndex:1}}>
          <button onClick={()=>setScreen("home")}
            style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",border:"1.5px solid rgba(90,120,72,0.18)",backdropFilter:"blur(8px)",borderRadius:100,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#2C4020" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Main content */}
        <div style={{padding:"16px 16px 100px",position:"relative",zIndex:1}}>

          {/* MOST RECENT LIST — always at very top of first screen */}
          {lastUsedId&&data.find(l=>l.id===lastUsedId)&&(()=>{
            const last=data.find(l=>l.id===lastUsedId);
            const remaining=(last.items||[]).filter(i=>!i.done).length;
            const total=(last.items||[]).length;
            return(
              <button onClick={()=>setActiveId(lastUsedId)}
                style={{width:"100%",marginBottom:14,padding:"22px 20px",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",border:"2px solid rgba(90,120,72,0.30)",borderRadius:24,cursor:"pointer",display:"flex",alignItems:"center",gap:16,boxShadow:"0 6px 28px rgba(42,80,28,0.18)"}}>
                <div style={{fontSize:44,flexShrink:0}}>{last.icon||"🛒"}</div>
                <div style={{flex:1,textAlign:"left"}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#5A7040",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>📍 Continue shopping</div>
                  <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:22,color:"#1A1A10",marginBottom:4}}>{last.name}</div>
                  <div style={{fontSize:13,color:"#5A4A30",fontWeight:600}}>{remaining>0?`${remaining} of ${total} items still needed`:"All items ticked ✓"}</div>
                </div>
                <div style={{fontSize:24,color:"#5A7040",flexShrink:0}}>→</div>
              </button>
            );
          })()}

          {/* MY LISTS — second row */}
          {hasLists&&(
            <button onClick={()=>setShowTemplates(false)}
              style={{width:"100%",marginBottom:14,padding:"16px 18px",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",border:"1.5px solid rgba(90,120,72,0.20)",borderRadius:20,cursor:"pointer",display:"flex",alignItems:"center",gap:14,boxShadow:"0 2px 12px rgba(42,80,28,0.08)"}}>
              <div style={{fontSize:28,flexShrink:0}}>📋</div>
              <div style={{flex:1,textAlign:"left"}}>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:16,color:"#1A2810"}}>My lists</div>
                <div style={{fontSize:12,color:"rgba(42,60,28,0.55)",marginTop:2}}>{data.length} saved list{data.length!==1?"s":""}</div>
              </div>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" style={{flexShrink:0}}><path d="M1 1l6 6-6 6" stroke="rgba(42,60,28,0.40)" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
          )}

          {/* CREATE YOUR OWN — smaller */}
          <button onClick={()=>pickTemplate({id:"blank",icon:"✏️",name:"",color:"#5A7848",items:[]})}
            style={{width:"100%",marginBottom:14,padding:"13px 16px",background:"rgba(255,255,255,0.45)",backdropFilter:"blur(12px)",border:"1.5px dashed rgba(90,120,72,0.35)",borderRadius:16,cursor:"pointer",display:"flex",alignItems:"center",gap:12,boxShadow:"0 2px 8px rgba(42,80,28,0.06)"}}>
            <div style={{fontSize:20,flexShrink:0}}>✏️</div>
            <div style={{flex:1,textAlign:"left"}}>
              <div style={{fontWeight:700,fontSize:13,color:"#1A2810"}}>Create your own list</div>
              <div style={{fontSize:11,color:"rgba(42,60,28,0.50)",marginTop:1}}>Name it and add items from scratch</div>
            </div>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" style={{flexShrink:0}}><path d="M1 1l6 6-6 6" stroke="rgba(42,60,28,0.30)" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>

          {/* TEMPLATE GRID — below */}
          <div style={{fontSize:11,fontWeight:700,color:"rgba(42,60,28,0.50)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Or start from a template</div>

          {/* Templates */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {ALL_TEMPLATES.map((t,i)=>(
              <button key={t.id} onClick={()=>pickTemplate({...t,items:t.items||[]})}
                style={{
                  background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",
                  backdropFilter:"blur(16px)",
                  border:"1.5px solid rgba(255,255,255,0.90)",
                  borderRadius:22,
                  padding:"18px 12px 14px",
                  cursor:"pointer",
                  textAlign:"center",
                  position:"relative",
                  overflow:"hidden",
                  boxShadow:"0 4px 20px rgba(42,80,28,0.12)",
                  transition:"transform 0.12s,box-shadow 0.12s",
                  animation:`fadeInUp 0.35s ${i*0.05}s both`,
                }}>
                {/* Colour top bar */}
                <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:t.color,borderRadius:"22px 22px 0 0"}}/>
                {/* Item count badge */}
                {t.items.length>0&&(
                  <div style={{position:"absolute",top:10,right:10,background:"rgba(90,120,72,0.15)",borderRadius:100,padding:"2px 7px",fontSize:9,fontWeight:700,color:"#3A6020"}}>
                    {t.items.length}
                  </div>
                )}
                <div style={{fontSize:34,marginBottom:8,marginTop:4}}>{t.icon}</div>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,color:"#1A2810",marginBottom:4}}>{t.name}</div>
                <div style={{fontSize:10,color:"rgba(42,60,28,0.50)",lineHeight:1.4}}>{t.subtitle||t.items.slice(0,3).join(", ")+(t.items.length>3?"…":"")}</div>
              </button>
            ))}
          </div>

        </div>

        <style>{`@keyframes fadeInUp{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );
  }

  // ── Hub: list of all saved lists ──────────────────────────────────────────
  return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title="🛒 Shopping" onBack={()=>setScreen("home")} right={
        <button onClick={()=>setShowTemplates(true)}
          style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",color:"#2A1A08",border:"none",borderRadius:100,padding:"8px 16px",fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:"0 2px 10px rgba(58,80,38,0.28)"}}>
          + New List
        </button>
      }/>

      {/* My Lists section header */}
      <div style={{padding:"16px 18px 8px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:22,color:"#1A2810",letterSpacing:-0.3}}>My Lists</div>
          <div style={{fontSize:12,color:"rgba(42,60,28,0.50)",marginTop:2}}>{data.length} list{data.length!==1?"s":""} · {data.reduce((s,l)=>s+l.items.filter(i=>!i.done).length,0)} items remaining</div>
        </div>
      </div>

      <div style={{padding:"0 14px"}}>
        {/* One-time message after old recipe lists were combined automatically */}
        {mergedNote&&(
          <div style={{background:"rgba(90,120,72,0.14)",border:"2px solid rgba(90,120,72,0.45)",borderRadius:18,padding:"14px 16px",marginBottom:14}}>
            <div style={{fontSize:15,fontWeight:800,color:"#2A4020",marginBottom:4}}>✅ {mergedNote.count} recipe list{mergedNote.count===1?"":"s"} combined into one</div>
            <div style={{fontSize:13,color:"#3A4A30",lineHeight:1.5,marginBottom:12}}>
              Everything is now in <b>{MEAL_SHOP_NAME}</b>, with a heading for each meal
              {mergedNote.merged>0?` — and ${mergedNote.merged} repeated item${mergedNote.merged===1?"":"s"} (like salt) only appear${mergedNote.merged===1?"s":""} once`:""}.
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{const id=mergedNote.listId;setMergedNote(null);if(id)setActiveId(id);}}
                style={{flex:2,padding:"11px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                Open it →
              </button>
              <button onClick={()=>setMergedNote(null)}
                style={{flex:1,padding:"11px",background:"rgba(255,255,255,0.8)",color:"#5A4A30",border:"1px solid rgba(90,80,60,0.2)",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                OK
              </button>
            </div>
          </div>
        )}
        {/* Empty state when no lists */}
        {data.length===0&&(
          <div style={{textAlign:"center",padding:"60px 24px"}}>
            <div style={{fontSize:64,marginBottom:16}}>🛒</div>
            <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:22,color:"#1A2810",marginBottom:8}}>No lists yet</div>
            <div style={{fontSize:14,color:"rgba(42,60,28,0.50)",marginBottom:24,lineHeight:1.6}}>Tap <strong>+ New List</strong> above to get started</div>
            <button onClick={()=>setShowTemplates(true)}
              style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",color:"#2A1A08",border:"none",borderRadius:100,padding:"14px 28px",fontFamily:"Georgia,serif",fontWeight:700,fontSize:16,cursor:"pointer",boxShadow:"0 4px 18px rgba(58,80,38,0.30)"}}>
              + Create your first list
            </button>
          </div>
        )}
        {/* WISH LIST QUICK ACCESS */}
        {(()=>{
          const wishList=data.find(l=>l.name==="Wish list"||l.id==="wishlist");
          if(!wishList) return null;
          const remaining=(wishList.items||[]).filter(i=>!i.done).length;
          return(
            <button onClick={()=>setActiveId(wishList.id)}
              style={{width:"100%",marginBottom:12,padding:"14px 18px",background:"linear-gradient(135deg,rgba(155,89,182,0.15),rgba(155,89,182,0.08))",border:"2px solid rgba(155,89,182,0.35)",borderRadius:18,cursor:"pointer",display:"flex",alignItems:"center",gap:12,textAlign:"left"}}>
              <span style={{fontSize:28}}>⭐</span>
              <div style={{flex:1}}>
                <div style={{fontSize:11,fontWeight:700,color:"#9B59B6",textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>Wish List</div>
                <div style={{fontSize:13,color:"#5A4A30",fontWeight:600}}>{remaining>0?`${remaining} item${remaining!==1?"s":""} on your wish list`:"Empty — add things you'd love!"}</div>
              </div>
              <span style={{fontSize:20,color:"#9B59B6"}}>→</span>
            </button>
          );
        })()}

        {/* MOST RECENT LIST */}
        {lastUsedId&&data.find(l=>l.id===lastUsedId)&&(()=>{
          const last=data.find(l=>l.id===lastUsedId);
          const remaining=(last.items||[]).filter(i=>!i.done).length;
          const col=last.color||"#5A7848";
          return(
            <button onClick={()=>setActiveId(lastUsedId)}
              style={{width:"100%",marginBottom:20,padding:"22px 20px",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",border:"3px solid "+col,borderRadius:26,cursor:"pointer",boxShadow:"0 8px 32px "+col+"50",textAlign:"left",display:"flex",alignItems:"center",gap:16}}>
              <div style={{fontSize:44,flexShrink:0}}>{last.icon||"🛒"}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:700,color:col,marginBottom:4}}>⭐ Most recent list</div>
                <div style={{fontFamily:"Georgia,serif",fontWeight:800,fontSize:24,color:"#1A1A10",marginBottom:4}}>{last.name}</div>
                <div style={{fontSize:13,color:"#5A4A30",fontWeight:600}}>{remaining>0?`${remaining} items needed`:"All done ✓"}</div>
              </div>
              <div style={{fontSize:30,color:col}}>→</div>
            </button>
          );
        })()}

        {/* List cards — big, beautiful, prominent */}
        {orderedLists.map((list,i)=>{
          const remaining=list.items.filter(it=>!it.done).length;
          const total=list.items.length;
          const pct=total?Math.round(((total-remaining)/total)*100):0;
          const col=list.color||"#5A7848";
          return(
            <div key={list.id}
              draggable
              onDragStart={e=>{e.dataTransfer.effectAllowed="move";setDragShop(list.id);}}
              onDragOver={e=>shopDragOver(e,list.id)}
              onDragEnd={()=>setDragShop(null)}
              data-shoplistid={list.id}
              onClick={()=>setActiveId(list.id)}
              style={{
                background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",
                borderRadius:18,
                marginBottom:10,
                overflow:"hidden",
                cursor:"pointer",
                border:"1.5px solid "+col+"40",
                boxShadow:"0 3px 14px "+col+"18",
                opacity:dragShop===list.id?0.5:1,
              }}>
              {/* Colour top bar */}
              <div style={{height:4,background:col}}/>
              <div style={{padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
                {/* Icon */}
                <div style={{
                  width:40,height:40,borderRadius:12,
                  background:col+"20",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:22,flexShrink:0,
                }}>{list.icon||"🛒"}</div>
                {/* Text */}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:20,color:"#1A1A10",marginBottom:3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{list.name}</div>
                  <div style={{fontSize:13,color:pct===100?"#4A7838":"#8A8070",fontWeight:pct===100?700:400,marginBottom:total>0?8:0}}>
                    {total===0?"Empty — tap to add items":pct===100?"✅ All done!":remaining+" item"+(remaining!==1?"s":"")+" to get"}
                  </div>
                  {total>0&&(
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{flex:1,height:5,background:"rgba(90,80,60,0.10)",borderRadius:100,overflow:"hidden"}}>
                        <div style={{height:"100%",width:pct+"%",background:pct===100?"#4A7838":col,borderRadius:100,transition:"width 0.4s"}}/>
                      </div>
                      <span style={{fontSize:11,color:"rgba(42,60,28,0.45)",fontWeight:700,flexShrink:0}}>{pct}%</span>
                    </div>
                  )}
                </div>
                {/* Arrow */}
                <div style={{width:32,height:32,borderRadius:"50%",background:col+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="7" height="13" viewBox="0 0 7 13" fill="none"><path d="M1 1l5 5.5-5 5.5" stroke={col} strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
              </div>
              {/* Share buttons row */}
              <div style={{display:"flex",borderTop:"1px solid "+col+"22"}} onClick={e=>e.stopPropagation()}>
                <button onClick={e=>{
                  e.stopPropagation();
                  const items=list.items;
                  if(!items.length){alert("No items yet");return;}
                  const txt="🛒 "+list.name+"\n\n"+items.filter(i=>!i.done).map(i=>"☐ "+i.name).join("\n")+(items.filter(i=>i.done).length?"\n\n✅ Got:\n"+items.filter(i=>i.done).map(i=>"✓ "+i.name).join("\n"):"")+("\n\nFrom Thinko 🌿");
                  if(navigator.share){navigator.share({title:'Shopping List',text:txt});}
                else{window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank');}
                }} style={{flex:1,background:MULTI,color:'#2A3820',border:'1.5px solid rgba(90,120,72,0.25)',padding:'12px 8px',fontSize:13,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:6,borderRadius:12}}>📤 Share</button>
                
              </div>
            </div>
          );
        })}
        {data.length>1&&<div style={{textAlign:"center",fontSize:11,color:"rgba(60,50,30,0.35)",marginTop:4}}>⠿ Hold and drag to reorder</div>}

        {/* Templates section below lists */}
        <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid rgba(90,80,60,0.10)"}}>
          <div style={{fontSize:12,fontWeight:700,color:"rgba(42,60,28,0.55)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Start from a template</div>
          <button onClick={()=>pickTemplate({id:"blank",icon:"✏️",name:"",color:"#5A7848",items:[]})}
            style={{width:"100%",marginBottom:10,padding:"11px 14px",background:"rgba(255,255,255,0.5)",border:"1.5px dashed rgba(90,120,72,0.35)",borderRadius:14,cursor:"pointer",display:"flex",alignItems:"center",gap:10,boxShadow:"0 2px 8px rgba(42,80,28,0.06)"}}>
            <span style={{fontSize:18}}>✏️</span>
            <div style={{flex:1,textAlign:"left"}}>
              <div style={{fontWeight:700,fontSize:13,color:"#1A2810"}}>Create your own list</div>
              <div style={{fontSize:11,color:"rgba(42,60,28,0.45)"}}>Name it and add items from scratch</div>
            </div>
            <svg width="7" height="12" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke="rgba(42,60,28,0.30)" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {ALL_TEMPLATES.map((t,i)=>(
              <button key={t.id} onClick={()=>pickTemplate({...t,items:t.items||[]})}
                style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",border:"1.5px solid rgba(255,255,255,0.90)",borderRadius:18,padding:"14px 10px 12px",cursor:"pointer",textAlign:"center",position:"relative",overflow:"hidden",boxShadow:"0 3px 14px rgba(42,80,28,0.10)"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:t.color,borderRadius:"18px 18px 0 0"}}/>
                <div style={{fontSize:28,marginBottom:6,marginTop:2}}>{t.icon}</div>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:13,color:"#1A2810",marginBottom:2}}>{t.name}</div>
                <div style={{fontSize:9,color:"rgba(42,60,28,0.45)",lineHeight:1.4}}>{t.subtitle||t.items.slice(0,3).join(", ")+(t.items.length>3?"…":"")}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   TOOLS  — Calculator · Stopwatch · Countdown Timer ·
            Alarm · White Noise (preset + custom)
═══════════════════════════════════════════════════════ */

/* ── Calculator ─────────────────────────────────────── */
const DEFAULT_DAY_LABELS=["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"];

function VaultHub({data,setData,priData,ideasData,setIdeasData,cabinetData,setNotesMode,setScreen}){
  const [search,setSearch]=useState("");
  const totalPages=(data||[]).reduce((s,sec)=>s+(sec.pages||[]).length,0);
  const totalIdeas=(ideasData||[]).length;
  const totalDrawers=(cabinetData||[]).length;
  const SECTIONS=[
    {id:"notes",  icon:"📓",name:"Notes",         desc:totalPages+" pages",    color:"#5A7848",action:()=>setNotesMode("notes")},
    {id:"ideas",  icon:"💡",name:"Ideas",          desc:totalIdeas+" ideas",    color:"#7A6038",action:()=>setNotesMode("ideas")},
    {id:"filing", icon:"🗄️",name:"Filing Cabinet", desc:totalDrawers+" drawers",color:"#486878",action:()=>setNotesMode("filing")},
  ];
  const searchResults=search.trim().length>1
    ?(data||[]).flatMap(s=>(s.pages||[]).filter(p=>
        (p.title||"").toLowerCase().includes(search.toLowerCase())||
        (p.content||"").toLowerCase().includes(search.toLowerCase())
      ).map(p=>({label:p.title,sub:s.name,icon:"📄"})))
    :[];
}


function MealPlanner({data,setData,shopData,setShopData,setScreen}) {
  // data shape: { labels: ["Mon","Tue",...], days: [ [{id,text},...], ... ] }
  const init=()=>({
    labels:[...DEFAULT_DAY_LABELS],
    days:Array.from({length:7},()=>[]),
  });
  const plan = (data && data.labels) ? data : init();
  const save = (updated) => setData(updated);

  /* saved meal plans */
  const [savedMealPlans,setSavedMealPlansRaw]=useState(()=>{try{const v=localStorage.getItem('chores_saved_plans');return v?JSON.parse(v):[];}catch{return [];}});
  const setSavedMealPlans=d=>{setSavedMealPlansRaw(prev=>{const next=typeof d==='function'?d(prev):d;try{localStorage.setItem('chores_saved_plans',JSON.stringify(next));}catch{}return next;});};
  const [savePlanName,setSavePlanName]=useState('');

  /* label editing */
  const [mealTab,setMealTab]=useState('week');
  const [importText,setImportText]=useState('');
  const [importImg,setImportImg]=useState(null); // base64
  const [importLoading,setImportLoading]=useState(false);
  const [importResult,setImportResult]=useState(null); // [{day,meal}]
  const importFileRef=useRef(null);
  const [recipeCatFilter,setRecipeCatFilter]=useState("all");
  const [recipeCuisineFilter,setRecipeCuisineFilter]=useState("any");
  const [recipes,setRecipesRaw]=useState(()=>{
    try{
      const v=localStorage.getItem('chores_recipes');
      const list=v?JSON.parse(v):[];
      if(!Array.isArray(list)) return [];
      // Tidy old category values (e.g. "soup" → "soups", missing → "other") so every recipe shows under a filter
      return list.map(r=>{if(!r)return r;const c=normCat(r.category)||"other";return r.category===c?r:{...r,category:c};}).filter(Boolean);
    }catch{return [];}
  });
  const setRecipes=d=>{
    setRecipesRaw(prev=>{
      const next=typeof d==='function'?d(prev):d;
      try{
        const stripped=next.map(r=>({...r,
          photo:r.photo&&r.photo.startsWith('data:')?'':r.photo,
          photos:(r.photos||[]).map(p=>p&&p.startsWith('data:')?'':p)
        }));
        localStorage.setItem('chores_recipes',JSON.stringify(stripped));
      }catch(e){
        try{localStorage.setItem('chores_recipes',JSON.stringify(next.map(r=>({...r,photo:'',photos:[]}))));}catch{}
      }
      return next;
    });
  };
  const [addingRecipe,setAddingRecipe]=useState(false);
  const [recipeDetail,setRecipeDetail]=useState(()=>{try{const v=localStorage.getItem('thinko_open_recipe');if(v){localStorage.removeItem('thinko_open_recipe');return recipes.find(x=>String(x.id)===v)||null;}}catch{}return null;});
  const [fromShop,setFromShop]=useState(()=>!!recipeDetail);
  const [recipeAiLoading,setRecipeAiLoading]=useState(false);
  const [recipeFilter,setRecipeFilter]=useState("all");
  const [recipeAiText,setRecipeAiText]=useState('');
  const [showRecipeAi,setShowRecipeAi]=useState(false);
  const [showAddToDay,setShowAddToDay]=useState(false);
  const [ingPickerItems,setIngPickerItems]=useState(null); // null=hidden, array of {text,selected}
  const [recipeDraft,setRecipeDraft]=useState({name:'',description:'',ingredients:'',method:'',url:'',pinUrl:'',photo:'',photos:[],category:'other',cuisine:'other',favourite:false});
  const [recipeFavFilter,setRecipeFavFilter]=useState(false);

  /* ── Recipe categories: by hand + automatic ── */
  const [catEditFor,setCatEditFor]=useState(null);
  const [recipeEdit,setRecipeEdit]=useState(null);   // {id,name,ingredients,method,description} while editing a recipe   // recipe id whose "change category" panel is open
  const [handSort,setHandSort]=useState(null);       // {ids:[...], idx} while sorting by hand
  const [sortBusy,setSortBusy]=useState(null);       // progress text while auto-sorting
  const setRecipeCat=(id,cat)=>setRecipes(prev=>prev.map(x=>x.id===id?{...x,category:cat,catManual:true}:x));
  const setRecipeCuisine=(id,cu)=>setRecipes(prev=>prev.map(x=>x.id===id?{...x,cuisine:cu,cuisineManual:true}:x));
  // Apply automatic results — never overrides anything you chose yourself
  const applyCatResults=(results,overwrite)=>setRecipes(prev=>prev.map(x=>{
    const res=results[x.id]; if(!res) return x;
    const upd={...x};
    if(!x.catManual&&res.category&&res.category!=="other"&&(overwrite||needsCat(x))) upd.category=res.category;
    if(!x.cuisineManual&&res.cuisine&&res.cuisine!=="other"&&(overwrite||!x.cuisine||x.cuisine==="other")) upd.cuisine=res.cuisine;
    return upd;
  }));
  // Every save button uses this: instant guess now, then the AI double-checks in the background
  const saveNewRecipe=(draft,extra={})=>{
    const r={...draft,...extra,id:Date.now()+Math.random(),created:Date.now()};
    if(!r.catManual) r.category=guessCat(r)||"other";
    if(!r.cuisineManual&&!r.cuisine) r.cuisine="other";
    setRecipes(prev=>[r,...prev]);
    if(!r.catManual||!r.cuisineManual){
      aiCategoriseBatch([r]).then(res=>{
        const x=res[0]||{};
        applyCatResults({[r.id]:{category:(x.category&&x.category!=="other")?x.category:guessCat(r),cuisine:x.cuisine}},true);
      }).catch(e=>console.error("Auto-category:",e));
    }
    return r;
  };
  // Sort many recipes at once: "missing" = only unsorted ones, "all" = re-check everything not set by hand
  const autoSortRecipes=async(mode)=>{
    if(sortBusy) return;
    const todo=mode==="all"?recipes.filter(r=>!r.catManual||!r.cuisineManual):recipes.filter(needsCat);
    if(!todo.length){alert(mode==="all"?"You've set every recipe yourself — nothing to re-check ✅":"All your recipes already have a category ✅");return;}
    const results={};
    let aiFailed=false;
    for(let i=0;i<todo.length;i+=12){
      const chunk=todo.slice(i,i+12);
      setSortBusy(`✨ Sorting your recipes… ${Math.min(i+chunk.length,todo.length)} of ${todo.length}`);
      let res=[];
      try{res=await aiCategoriseBatch(chunk);}catch(e){console.error("Auto-sort:",e);aiFailed=true;}
      chunk.forEach((r,j)=>{
        const ai=res[j]||{};
        results[r.id]={category:(ai.category&&ai.category!=="other")?ai.category:guessCat(r),cuisine:ai.cuisine||null};
      });
    }
    applyCatResults(results,mode==="all");
    setSortBusy(null);
    const stillUnsorted=todo.filter(r=>needsCat(r)&&!(results[r.id]?.category&&results[r.id].category!=="other")).length;
    const done=mode==="all"?todo.length:todo.length-stillUnsorted;
    alert((mode==="all"?`✅ Re-checked ${done} recipe${done===1?"":"s"}.`:`✅ Sorted ${done} of ${todo.length} recipe${todo.length===1?"":"s"}.`)
      +(stillUnsorted>0?`\n\n📌 ${stillUnsorted} still need${stillUnsorted===1?"s":""} a category — tap "Sort by hand" to choose.`:"")
      +(aiFailed?"\n\n(The AI couldn't be reached, so I sorted by name and ingredients where I could.)":""));
  };

  const [editLabelIdx,setEditLabelIdx]=useState(null);
  const [labelDraft,setLabelDraft]=useState('');

  const openLabelEdit=(i)=>{setEditLabelIdx(i);setLabelDraft(plan.labels[i]);};
  const saveLabelEdit=()=>{
    if(editLabelIdx===null)return;
    const labels=[...plan.labels];
    labels[editLabelIdx]=labelDraft.trim()||DEFAULT_DAY_LABELS[editLabelIdx];
    save({...plan,labels});
    setEditLabelIdx(null);
  };

  /* meal editing */
  const [editMeal,setEditMeal]=useState(null); // {dayIdx, mealId|null}
  const [mealDraft,setMealDraft]=useState("");
  const [mealUrl,setMealUrl]=useState("");
  const [expandedMeal,setExpandedMeal]=useState(null);
  const [ingInput,setIngInput]=useState("");

  const openAddMeal=(dayIdx)=>{setEditMeal({dayIdx,mealId:null});setMealDraft("");setMealUrl("");};
  const openEditMeal=(dayIdx,meal)=>{setEditMeal({dayIdx,mealId:meal.id});setMealDraft(meal.text);setMealUrl(meal.url||"");};
  const saveMeal=()=>{
    if(!editMeal||!mealDraft.trim()){setEditMeal(null);setMealUrl("");return;}
    const days=plan.days.map((d,i)=>{
      if(i!==editMeal.dayIdx)return d;
      if(editMeal.mealId===null) return [...d,{id:Date.now(),text:mealDraft.trim(),url:mealUrl.trim(),ingredients:[]}];
      return d.map(m=>m.id===editMeal.mealId?{...m,text:mealDraft.trim(),url:mealUrl.trim()}:m);
    });
    save({...plan,days});
    setEditMeal(null);
  };
  // Move a meal to a different day (keeps its ingredients, recipe link and ticks)
  const [moveMealKey,setMoveMealKey]=useState(null);
  const moveMeal=(fromIdx,mealId,toIdx)=>{
    if(fromIdx===toIdx){setMoveMealKey(null);return;}
    const meal=(plan.days[fromIdx]||[]).find(m=>m.id===mealId); if(!meal)return;
    const days=plan.days.map((d,i)=>i===fromIdx?d.filter(m=>m.id!==mealId):i===toIdx?[...(d||[]),meal]:d);
    save({...plan,days});
    setMoveMealKey(null);
  };
  const deleteMeal=(dayIdx,mealId)=>{
    const days=plan.days.map((d,i)=>i===dayIdx?d.filter(m=>m.id!==mealId):d);
    save({...plan,days});
  };
  const toggleMealHad=(dayIdx,mealId)=>{
    const days=plan.days.map((d,di)=>di!==dayIdx?d:d.map(m=>m.id!==mealId?m:{...m,had:!m.had}));
    save({...plan,days});
  };

  
  const addIngredient=(dayIdx,mealId,ing)=>{
    if(!ing.trim())return;
    const days=plan.days.map((d,di)=>di!==dayIdx?d:d.map(m=>m.id!==mealId?m:{...m,ingredients:[...(m.ingredients||[]),{id:Date.now(),text:ing.trim(),got:false}]}));
    save({...plan,days});
    setIngInput("");
  };
  const toggleIngGot=(dayIdx,mealId,ingId)=>{
    const days=plan.days.map((d,di)=>di!==dayIdx?d:d.map(m=>m.id!==mealId?m:{...m,ingredients:(m.ingredients||[]).map(ig=>ig.id===ingId?{...ig,got:!ig.got}:ig)}));
    save({...plan,days});
  };
  const deleteIng=(dayIdx,mealId,ingId)=>{
    const days=plan.days.map((d,di)=>di!==dayIdx?d:d.map(m=>m.id!==mealId?m:{...m,ingredients:(m.ingredients||[]).filter(ig=>ig.id!==ingId)}));
    save({...plan,days});
  };
  const sendSingleIngredientToShop=(dayIdx,mealId,ingId,mealName)=>{
    if(!shopData||!setShopData)return;
    const meal=plan.days[dayIdx]?.find(m=>m.id===mealId);
    const ing=meal?.ingredients?.find(i=>i.id===ingId);
    if(!ing)return;
    const res=addToMealShop(shopData,mealName,[ing.text]);
    setShopData(res.lists);
    if(res.merged.length) alert(`🔗 "${ing.text}" is already on your shopping list — not added twice.`);
  };
  const sendIngredientsToShop=(dayIdx,mealId,mealName)=>{
    if(!shopData||!setShopData)return;
    const meal=plan.days[dayIdx]?.find(m=>m.id===mealId);
    if(!meal?.ingredients?.length)return;
    const needed=(meal.ingredients||[]).filter(ig=>!ig.got);
    if(!needed.length){alert("You already have everything! ✅");return;}
    const res=addToMealShop(shopData,mealName,needed.map(ig=>ig.text),(meal.ingredients||[]).filter(ig=>ig.got).map(ig=>ig.text));
    setShopData(res.lists);
    alert(mealShopMsg(res));
  };
  const shareShoppingList=(dayIdx,mealId,mealName)=>{
    const meal=plan.days[dayIdx]?.find(m=>m.id===mealId);
    const ings=(meal?.ingredients||[]);
    if(!ings.length){alert("No ingredients added yet");return;}
    const lines=ings.map(ig=>(ig.got?"✅ ":"🛒 ")+ig.text);
    const text="🍽 "+mealName+" — Ingredients:\n"+lines.join("\n")+"\n\nSent from Thinko 🌿";
    const encoded=encodeURIComponent(text);
    window.open("https://wa.me/?text="+encoded,"_blank");
  };
const sendMealToShop=(meal,label)=>{
    if(!shopData||!setShopData)return;
    // Find or create a "Meal Plan" shopping list
    const existing=shopData.find(l=>l.name==="Meal Plan");
    const newItem={id:Date.now()+Math.random(),text:meal.text,done:false,cat:""};
    if(existing){
      setShopData(ls=>ls.map(l=>l.id===existing.id?{...l,items:[...l.items,newItem]}:l));
    } else {
      setShopData(ls=>[...ls,{id:Date.now()+1,name:"Meal Plan",icon:"🍽️",items:[newItem],created:Date.now()}]);
    }
  };

  const scheduleMeal=(meal,label)=>{
    const title=encodeURIComponent(`🍽️ ${meal.text} (${label})`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}`,"_blank");
  };

  const DAY_GRADS=[
    "rgba(196,176,224,0.55)",  // Day 1 — soft purple
    "rgba(224,176,176,0.55)",  // Day 2 — soft pink/rose
    "rgba(176,196,224,0.55)",  // Day 3 — soft blue
    "rgba(176,216,196,0.55)",  // Day 4 — soft green
    "rgba(224,204,176,0.55)",  // Day 5 — soft orange/peach
    "rgba(176,216,212,0.55)",  // Day 6 — soft teal
    "rgba(204,188,224,0.55)",  // Day 7 — soft lavender
  ];
  const DAY_BORDER=[
    "rgba(180,152,212,0.45)",
    "rgba(212,152,152,0.45)",
    "rgba(152,180,212,0.45)",
    "rgba(152,204,176,0.45)",
    "rgba(212,184,152,0.45)",
    "rgba(152,200,196,0.45)",
    "rgba(188,168,212,0.45)",
  ];
  const DAY_TEXT=[
    "#4A3068","#6A3040","#2A4868","#2A5840","#6A4020","#205850","#3A2868",
  ];

  // Recipe detail view
  if(recipeDetail){
    // Always show the latest saved version (so category changes appear straight away)
    const r=recipes.find(x=>x.id===recipeDetail.id)||recipeDetail;
    return(
      <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
        <Header title={r.name} onBack={()=>{setRecipeDetail(null);if(fromShop){setFromShop(false);setScreen("shopping");}}} right={
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={()=>{setRecipes(rs=>rs.map(rx=>rx.id===r.id?{...rx,favourite:!rx.favourite}:rx));setRecipeDetail(rv=>({...rv,favourite:!rv.favourite}));}}
              style={{background:"none",border:"none",fontSize:24,cursor:"pointer",padding:"4px",lineHeight:1}}>
              {r.favourite?"❤️":"🤍"}
            </button>
            <button onClick={()=>{setRecipes(rs=>rs.filter(x=>x.id!==r.id));setRecipeDetail(null);}} style={{background:"rgba(192,57,43,0.15)",color:"#c0392b",border:"1px solid rgba(192,57,43,0.3)",borderRadius:10,padding:"6px 12px",fontWeight:700,fontSize:13,cursor:"pointer"}}>🗑 Delete</button>
          </div>
        }/>
        <div style={{padding:"16px 14px"}}>
          {/* Photo gallery — show all uploaded photos */}
          {(()=>{
            const allPhotos=[...(r.photos||[])].filter(Boolean);
            if(r.photo&&!allPhotos.includes(r.photo)) allPhotos.unshift(r.photo);
            if(allPhotos.length===0) return null;
            if(allPhotos.length===1) return <img src={allPhotos[0]} alt={r.name} style={{width:"100%",maxHeight:220,objectFit:"cover",borderRadius:20,marginBottom:14,boxShadow:"0 4px 18px rgba(0,0,0,0.10)"}}/>;
            return(
              <div style={{display:"flex",gap:8,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
                {allPhotos.map((ph,pi)=>(
                  <img key={pi} src={ph} alt={r.name+' '+(pi+1)} style={{height:180,width:"auto",maxWidth:"80vw",objectFit:"cover",borderRadius:16,flexShrink:0,boxShadow:"0 4px 18px rgba(0,0,0,0.10)"}}/>
                ))}
              </div>
            );
          })()}
          {/* Category — tap to change it yourself */}
          {(()=>{
            const cat=RECIPE_CATS.find(c=>c.id===r.category&&c.id!=="all");
            const cu=RECIPE_CUISINES.find(c=>c.id===r.cuisine&&c.id!=="any"&&c.id!=="other");
            const unsorted=needsCat(r)||!cat;
            const open=catEditFor===r.id;
            const chip={borderRadius:100,padding:"5px 12px",fontSize:13,fontWeight:700};
            return(
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                  {unsorted
                    ?<span style={{...chip,background:"#FFF4E8",color:"#A0522D",border:"1.5px dashed rgba(230,126,34,0.6)"}}>📌 No category yet</span>
                    :<span style={{...chip,background:"#EEF5E8",color:"#2A4020",border:"1.5px solid rgba(90,120,72,0.35)"}}>{cat.icon} {cat.label}</span>}
                  {cu&&<span style={{...chip,background:"#EAF3FA",color:"#1a5276",border:"1.5px solid rgba(41,128,185,0.35)"}}>{cu.icon} {cu.label}</span>}
                  <button onClick={()=>setCatEditFor(open?null:r.id)}
                    style={{...chip,background:open?"#5A7848":"#fff",color:open?"#fff":"#3A5828",border:"1.5px solid rgba(90,120,72,0.35)",cursor:"pointer"}}>
                    {open?"✓ Done":unsorted?"✏️ Set category":"✏️ Change"}
                  </button>
                </div>
                {open&&(
                  <div style={{background:"rgba(255,255,255,0.92)",borderRadius:18,padding:"14px",marginTop:10,border:"1.5px solid rgba(90,120,72,0.2)",boxShadow:"0 4px 16px rgba(0,0,0,0.06)"}}>
                    <div style={{fontSize:12,fontWeight:800,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5,marginBottom:8}}>Category</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
                      {RECIPE_CATS.filter(c=>c.id!=="all").map(c=>{
                        const on=r.category===c.id&&!unsorted||(c.id==="other"&&r.catManual&&r.category==="other");
                        return(
                          <button key={c.id} onClick={()=>setRecipeCat(r.id,c.id)}
                            style={{padding:"7px 12px",borderRadius:100,fontSize:13,fontWeight:700,cursor:"pointer",border:"none",
                              background:on?"#5A7848":"rgba(90,80,60,0.08)",color:on?"#fff":"#5A4A30"}}>
                            {c.icon} {c.label}
                          </button>
                        );
                      })}
                    </div>
                    <div style={{fontSize:12,fontWeight:800,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5,marginBottom:8}}>Cuisine</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                      {RECIPE_CUISINES.filter(c=>c.id!=="any").map(c=>{
                        const on=r.cuisine===c.id&&(c.id!=="other"||r.cuisineManual);
                        return(
                          <button key={c.id} onClick={()=>setRecipeCuisine(r.id,c.id)}
                            style={{padding:"7px 12px",borderRadius:100,fontSize:13,fontWeight:700,cursor:"pointer",border:"none",
                              background:on?"#2980b9":"rgba(90,80,60,0.08)",color:on?"#fff":"#5A4A30"}}>
                            {c.icon} {c.label}
                          </button>
                        );
                      })}
                    </div>
                    <button onClick={()=>setCatEditFor(null)}
                      style={{width:"100%",padding:"11px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                      ✓ Done
                    </button>
                  </div>
                )}
              </div>
            );
          })()}
          {r.url&&<div style={{marginBottom:8}}><UrlBadge url={r.url}/></div>}
          {r.pinUrl&&(
            <a href={r.pinUrl} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:"rgba(230,0,35,0.06)",border:"1.5px solid rgba(230,0,35,0.15)",borderRadius:100,marginBottom:12,textDecoration:"none"}}>
              <span style={{fontSize:16}}>📌</span>
              <span style={{fontSize:13,fontWeight:600,color:"#E60023"}}>View on Pinterest</span>
            </a>
          )}
          {/* ✏️ Edit recipe — swap ingredients you can't get, change the method or notes */}
          {recipeEdit&&recipeEdit.id===r.id?(()=>{
            const box={width:"100%",boxSizing:"border-box",padding:"12px 14px",borderRadius:14,border:"1.5px solid rgba(90,120,72,0.3)",fontSize:15,lineHeight:1.7,color:"#1A1A10",outline:"none",resize:"vertical",fontFamily:"inherit",background:"#fff",marginBottom:14};
            const lbl={fontWeight:800,color:"#2A4020",fontSize:14,marginBottom:6};
            return(
              <div style={{background:"rgba(255,255,255,0.95)",borderRadius:18,padding:"16px",marginBottom:14,border:"2px solid #5A7848",boxShadow:"0 4px 18px rgba(0,0,0,0.10)"}}>
                <div style={{fontWeight:800,color:"#2A4020",fontSize:16,marginBottom:12}}>✏️ Edit recipe</div>
                <div style={lbl}>Name</div>
                <input value={recipeEdit.name} onChange={e=>setRecipeEdit(d=>({...d,name:e.target.value}))} style={{...box,lineHeight:1.4}}/>
                <div style={lbl}>🥄 Ingredients <span style={{fontWeight:600,color:"#8A8070",fontSize:12}}>— one per line</span></div>
                <textarea value={recipeEdit.ingredients} onChange={e=>setRecipeEdit(d=>({...d,ingredients:e.target.value}))} rows={9} style={box}/>
                <div style={lbl}>📋 Method</div>
                <textarea value={recipeEdit.method} onChange={e=>setRecipeEdit(d=>({...d,method:e.target.value}))} rows={7} style={box}/>
                <div style={lbl}>📝 Notes</div>
                <textarea value={recipeEdit.description} onChange={e=>setRecipeEdit(d=>({...d,description:e.target.value}))} rows={4} style={box}/>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setRecipeEdit(null)} style={{flex:1,padding:"12px",background:"rgba(90,80,60,0.08)",color:"#5A4A30",border:"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer"}}>Cancel</button>
                  <button onClick={()=>{
                    const name=recipeEdit.name.trim()||r.name;
                    const oldLines=new Set(String(r.ingredients||"").split("\n").map(x=>x.trim().toLowerCase()).filter(Boolean));
                    const newLines=String(recipeEdit.ingredients||"").split("\n").map(x=>x.trim()).filter(Boolean);
                    const added=newLines.filter(x=>!oldLines.has(x.toLowerCase()));
                    setRecipes(prev=>prev.map(x=>x.id===r.id?{...x,name,ingredients:recipeEdit.ingredients,method:recipeEdit.method,description:recipeEdit.description}:x));
                    setRecipeEdit(null);
                    if(added.length&&window.confirm(`Saved ✅\n\nYou added ${added.length} new ingredient${added.length===1?"":"s"}:\n${added.map(t=>"• "+t).join("\n")}\n\nAdd ${added.length===1?"it":"them"} to your shopping list?`)){
                      const onListItems=(((shopData||[]).find(isMealShopList)||{}).items||[]).filter(i=>!i.done);
                      setIngPickerItems(added.map(text=>{
                        const matches=splitShopLine(text).map(pt=>{const k=shopKey(pt);return k?onListItems.find(i=>shopKey(i.text)===k):null;});
                        return {text,selected:!isTapWater(text),water:isTapWater(text),onList:matches.every(Boolean)?(matches[0].meal||"your list"):null};
                      }));
                    }
                  }} style={{flex:2,padding:"12px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer"}}>💾 Save changes</button>
                </div>
              </div>
            );
          })():(
            <>
              <button onClick={()=>setRecipeEdit({id:r.id,name:r.name||"",ingredients:r.ingredients||"",method:r.method||"",description:r.description||""})}
                style={{width:"100%",padding:"11px",marginBottom:14,background:"#fff",color:"#3A5828",border:"1.5px solid rgba(90,120,72,0.4)",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                ✏️ Edit recipe — ingredients, method, notes
              </button>
          {r.ingredients&&<div style={{background:"rgba(255,255,255,0.82)",borderRadius:18,padding:"18px",marginBottom:14,border:"1.5px solid rgba(90,120,72,0.18)",boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
            <div style={{fontWeight:800,color:"#2A4020",fontSize:15,marginBottom:12}}>🥄 Ingredients</div>
            {r.ingredients.split("\n").filter(l=>l.trim()).map((line,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"7px 0",borderBottom:"1px solid rgba(90,80,60,0.07)"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:"#5A7848",flexShrink:0,marginTop:7}}/>
                <div style={{fontSize:15,color:"#1A1A10",lineHeight:1.6,flex:1}}>{line.trim()}</div>
              </div>
            ))}
          </div>}
          {r.method&&<div style={{background:"rgba(255,255,255,0.82)",borderRadius:18,padding:"18px",marginBottom:14,border:"1.5px solid rgba(90,120,72,0.18)",boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
            <div style={{fontWeight:800,color:"#2A4020",fontSize:15,marginBottom:12}}>📋 Method</div>
            {r.method.split(/\n\n+|\n(?=\d+\.)/).flatMap(p=>p.split("\n")).filter(l=>l.trim()).map((line,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"8px 0",borderBottom:"1px solid rgba(90,80,60,0.07)"}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:"#5A7848",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,flexShrink:0}}>{i+1}</div>
                <div style={{fontSize:15,color:"#1A1A10",lineHeight:1.6,flex:1,paddingTop:3}}>{line.trim()}</div>
              </div>
            ))}
          </div>}
          {r.description&&<div style={{background:"rgba(255,255,255,0.82)",borderRadius:18,padding:"18px",marginBottom:14,border:"1.5px solid rgba(90,120,72,0.18)",boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
            <div style={{fontWeight:800,color:"#2A4020",fontSize:15,marginBottom:8}}>📝 Notes</div>
            <div style={{fontSize:15,color:"#3A3020",lineHeight:1.8}}>{r.description}</div>
          </div>}
            </>
          )}

          {/* Action buttons */}
          <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:16}}>

            {/* Add to meal plan */}
            <button onClick={()=>setShowAddToDay(d=>!d)}
              style={{width:"100%",padding:"14px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:15,cursor:"pointer",boxShadow:"0 3px 12px rgba(58,80,38,0.28)"}}>
              📅 Add to meal plan
            </button>
            {showAddToDay&&(
              <div style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:18,padding:"12px",border:"1px solid rgba(90,120,72,0.15)"}}>
                <div style={{fontSize:13,fontWeight:700,color:"#2A4020",marginBottom:8}}>Which day?</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {plan.labels.map((label,dayIdx)=>(
                    <button key={dayIdx} onClick={()=>{
                      const newDays=[...plan.days.map(d=>[...d])];
                      newDays[dayIdx]=[...newDays[dayIdx],{id:Date.now()+Math.random(),text:r.name,url:r.url||"",had:false,recipeId:r.id}];
                      save({...plan,days:newDays});
                      setShowAddToDay(false);
                      alert(`Added "${r.name}" to ${label}!`);
                    }}
                      style={{padding:"10px 8px",background:"rgba(255,255,255,0.7)",border:"1.5px solid rgba(90,120,72,0.20)",borderRadius:12,fontWeight:600,fontSize:13,color:"#1A1A10",cursor:"pointer"}}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add ingredients to shopping — with picker */}
            {r.ingredients&&(
              <>
                <button onClick={()=>{
                  const lines=r.ingredients.split("\n").map(l=>l.trim()).filter(Boolean);
                  if(lines.length===0){alert("No ingredients found in this recipe.");return;}
                  const onListItems=(((shopData||[]).find(isMealShopList)||{}).items||[]).filter(i=>!i.done);
                  setIngPickerItems(lines.map(text=>{
                    const matches=splitShopLine(text).map(pt=>{const k=shopKey(pt);return k?onListItems.find(i=>shopKey(i.text)===k):null;});
                    const water=isTapWater(text);
                    return {text,selected:!water,water,onList:matches.every(Boolean)?(matches[0].meal||"your list"):null};
                  }));
                }}
                  style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",color:"#2A4020",border:"1.5px solid rgba(90,120,72,0.25)",borderRadius:100,fontWeight:700,fontSize:15,cursor:"pointer"}}>
                  🛒 Send ingredients to shopping list
                </button>
                {ingPickerItems&&(
                  <div style={{background:"rgba(255,255,255,0.92)",borderRadius:18,padding:"16px",border:"1.5px solid rgba(90,120,72,0.18)",boxShadow:"0 4px 18px rgba(0,0,0,0.08)"}}>
                    <div style={{fontWeight:800,color:"#2A4020",fontSize:14,marginBottom:4}}>🛒 Choose what you need</div>
                    <div style={{fontSize:12,color:"#8A8070",marginBottom:12}}>Untick anything you already have</div>
                    <div style={{display:"flex",gap:8,marginBottom:12}}>
                      <button onClick={()=>setIngPickerItems(prev=>prev.map(i=>({...i,selected:true})))} style={{flex:1,padding:"7px",background:"rgba(90,120,72,0.1)",border:"none",borderRadius:100,fontSize:12,fontWeight:700,color:"#3A5828",cursor:"pointer"}}>Select all</button>
                      <button onClick={()=>setIngPickerItems(prev=>prev.map(i=>({...i,selected:false})))} style={{flex:1,padding:"7px",background:"rgba(90,80,60,0.07)",border:"none",borderRadius:100,fontSize:12,fontWeight:700,color:"#8A8070",cursor:"pointer"}}>Clear all</button>
                    </div>
                    {ingPickerItems.map((item,idx)=>(
                      <div key={idx} onClick={()=>setIngPickerItems(prev=>prev.map((it,i)=>i===idx?{...it,selected:!it.selected}:it))}
                        style={{display:"flex",alignItems:"center",gap:10,padding:"9px 4px",borderBottom:"1px solid rgba(90,80,60,0.07)",cursor:"pointer",opacity:item.selected?1:0.45}}>
                        <div style={{width:22,height:22,borderRadius:6,border:"1.5px solid "+(item.selected?"#5A7848":"rgba(90,120,72,0.35)"),background:item.selected?"#5A7848":"transparent",color:"#fff",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,transition:"all 0.15s"}}>
                          {item.selected?"✓":""}
                        </div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:14,color:"#1A1A10",lineHeight:1.4,textDecoration:item.selected?"none":"line-through"}}>{item.text}</div>
                          {item.water&&!item.selected&&<div style={{fontSize:11,color:"#2980b9",fontWeight:700,marginTop:2}}>💧 Tap water — left off (tap to add)</div>}
                          {item.onList&&<div style={{fontSize:11,color:"#5A7848",fontWeight:700,marginTop:2,lineHeight:1.4}}>🔗 Already on your list{item.onList===r.name||item.onList==="your list"?"":` for ${item.onList}`} — won't be added twice</div>}
                        </div>
                      </div>
                    ))}
                    <div style={{display:"flex",gap:8,marginTop:14}}>
                      <button onClick={()=>setIngPickerItems(null)} style={{flex:1,padding:"11px",background:"rgba(90,80,60,0.07)",border:"none",borderRadius:100,fontSize:13,fontWeight:700,color:"#8A8070",cursor:"pointer"}}>Cancel</button>
                      <button onClick={()=>{
                        const chosen=ingPickerItems.filter(i=>i.selected).map(i=>i.text);
                        const skipped=ingPickerItems.filter(i=>!i.selected).map(i=>i.text);
                        if(chosen.length===0){alert("Nothing selected!");return;}
                        if(!setShopData)return;
                        const res=addToMealShop(shopData,r.name,chosen,skipped);
                        setShopData(res.lists);
                        setIngPickerItems(null);
                        alert(mealShopMsg(res));
                      }} style={{flex:2,padding:"11px",background:"#5A7848",border:"none",borderRadius:100,fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer"}}>
                        ✅ Add {ingPickerItems.filter(i=>i.selected).length} to shopping
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      {/* Header matching reference */}
      <div style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",padding:"16px 20px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 1px 12px rgba(0,0,0,0.06)",position:"sticky",top:0,zIndex:50,borderBottom:"1px solid rgba(90,120,72,0.1)"}}>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",width:36,height:36,fontSize:22,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:10}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span style={{flex:1,color:"#1A1A10",fontFamily:"Georgia,serif",fontWeight:700,fontSize:20,textAlign:"center",letterSpacing:0.2}}>Meal Planner 🍽️</span>
        {/* Settings-style icon */}
        <button style={{background:"rgba(90,80,60,0.08)",border:"1px solid rgba(90,80,60,0.15)",borderRadius:"50%",width:36,height:36,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#5A5040",fontSize:15}}>⊙</button>
      </div>

      {/* Tabs — scrollable row */}
      <div style={{padding:"14px 0 8px",overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
      <div style={{padding:"0 16px",display:"flex",gap:8,alignItems:"center",minWidth:"max-content"}}>
        <button onClick={()=>setMealTab("week")} style={{
          background:mealTab==="week"?"#1A1A10":"rgba(248,245,236,0.88)",
          color:mealTab==="week"?"#fff":"#5A5040",
          border:mealTab==="week"?"none":"1.5px solid rgba(90,80,60,0.2)",
          borderRadius:100,padding:"10px 20px",
          fontWeight:700,fontSize:14,cursor:"pointer",
          boxShadow:mealTab==="week"?"0 2px 10px rgba(0,0,0,0.2)":"none",
          transition:"all 0.15s",
        }}>Week Plan</button>
        <button onClick={()=>setMealTab("ideas")} style={{
          background:mealTab==="ideas"?"#5A7848":"rgba(248,245,236,0.88)",
          color:mealTab==="ideas"?"#fff":"#5A5040",
          border:mealTab==="ideas"?"none":"1.5px solid rgba(90,80,60,0.2)",
          borderRadius:100,padding:"10px 16px",
          fontWeight:700,fontSize:14,cursor:"pointer",
          boxShadow:mealTab==="ideas"?"0 2px 10px rgba(90,120,72,0.3)":"none",
          transition:"all 0.15s",
        }}>📌 Ideas</button>
        <button onClick={()=>setMealTab("recipes")} style={{
          background:mealTab==="recipes"?"#5A7848":"rgba(248,245,236,0.88)",
          color:mealTab==="recipes"?"#fff":"#5A5040",
          border:mealTab==="recipes"?"none":"1.5px solid rgba(90,80,60,0.2)",
          borderRadius:100,padding:"10px 20px",
          fontWeight:700,fontSize:14,cursor:"pointer",
          boxShadow:mealTab==="recipes"?"0 2px 10px rgba(0,0,0,0.2)":"none",
          transition:"all 0.15s",
        }}>Recipes</button>
        <button onClick={()=>setMealTab("import")} style={{
          background:mealTab==="import"?"#5A7848":"rgba(248,245,236,0.88)",
          color:mealTab==="import"?"#fff":"#5A5040",
          border:mealTab==="import"?"none":"1.5px solid rgba(90,80,60,0.2)",
          borderRadius:100,padding:"10px 16px",
          fontWeight:700,fontSize:14,cursor:"pointer",
          boxShadow:mealTab==="import"?"0 2px 10px rgba(90,120,72,0.3)":"none",
          transition:"all 0.15s",
        }}>✨ Import</button>
        <button onClick={()=>setMealTab("saved")} style={{
          background:mealTab==="saved"?"#5A7848":"rgba(248,245,236,0.88)",
          color:mealTab==="saved"?"#fff":"#5A5040",
          border:mealTab==="saved"?"none":"1.5px solid rgba(90,80,60,0.2)",
          borderRadius:100,padding:"10px 16px",
          fontWeight:700,fontSize:14,cursor:"pointer",
          boxShadow:mealTab==="saved"?"0 2px 10px rgba(90,120,72,0.3)":"none",
          transition:"all 0.15s",
          whiteSpace:"nowrap",
        }}>💾 Saved</button>
        <button onClick={()=>save(init())} style={{
          background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",color:"#5A5040",
          border:"1.5px solid rgba(90,80,60,0.2)",
          borderRadius:100,padding:"10px 16px",
          fontWeight:700,fontSize:14,cursor:"pointer",
          whiteSpace:"nowrap",
        }}>Reset</button>
      </div>
      </div>

      {/* Recipes tab */}

      {/* ── IMPORT TAB ── */}
      {mealTab==="import"&&(
        <div style={{padding:"14px 16px"}}>
          <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:18,color:"#1A1A10",marginBottom:4}}>✨ Import Meals with AI</div>
          <div style={{fontSize:13,color:"#1A1A10",marginBottom:14,lineHeight:1.6,background:"rgba(255,255,255,0.85)",borderRadius:12,padding:"8px 12px"}}>
            Type or paste a meal plan, recipe list, or screenshot — AI will read it and fill in your week automatically.
          </div>

          {/* Text input */}
          <textarea
            value={importText}
            onChange={e=>setImportText(e.target.value)}
            placeholder={"e.g. Monday: pasta, Tuesday: chicken stir fry, Wednesday: soup...\n\nOr paste any text with meals in it!"}
            style={{width:"100%",minHeight:120,padding:"12px",borderRadius:14,border:"1.5px solid rgba(90,120,72,0.25)",fontSize:14,fontFamily:"'Segoe UI',sans-serif",resize:"vertical",outline:"none",background:"rgba(255,255,255,0.9)",color:"#1A1A10",boxSizing:"border-box",marginBottom:10}}
          />

          {/* Image upload */}
          <input ref={importFileRef} type="file" accept="image/*" style={{display:"none"}} onChange={async e=>{
            const file=e.target.files[0];
            if(!file)return;
            const reader=new FileReader();
            reader.onload=ev=>{
              const b64=ev.target.result.split(",")[1];
              setImportImg({b64,type:file.type,name:file.name});
            };
            reader.readAsDataURL(file);
          }}/>

          {importImg?(
            <div style={{background:"rgba(90,120,72,0.08)",border:"1.5px solid rgba(90,120,72,0.20)",borderRadius:12,padding:"10px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:20}}>🖼️</span>
              <span style={{flex:1,fontSize:13,color:"#1A1A10",fontWeight:600}}>{importImg.name}</span>
              <button onClick={()=>setImportImg(null)} style={{background:"none",border:"none",color:"#c0392b",cursor:"pointer",fontSize:16}}>✕</button>
            </div>
          ):(
            <button onClick={()=>importFileRef.current.click()}
              style={{width:"100%",padding:"12px",marginBottom:10,background:"rgba(255,255,255,0.6)",border:"1.5px dashed rgba(90,120,72,0.30)",borderRadius:12,cursor:"pointer",fontSize:13,fontWeight:600,color:"#3A5828",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <span>📸</span> Upload screenshot of a meal plan
            </button>
          )}

          {/* Day labels preview */}
          <div style={{fontSize:12,color:"#5A4A30",marginBottom:12,background:"rgba(255,255,255,0.6)",borderRadius:10,padding:"8px 12px"}}>
            <b>Your days:</b> {plan.labels.join(", ")}
          </div>

          {/* Run AI */}
          <button onClick={async()=>{
            if(!importText.trim()&&!importImg){alert("Please enter some text or upload a screenshot first.");return;}
            setImportLoading(true);
            setImportResult(null);
            try{
              const messages=[];
              const textPart={type:"text",text:`You are helping fill a meal planner. The user has ${plan.labels.length} days labelled: ${plan.labels.join(", ")}.

Extract meals from the content below and assign them to days in order. Return ONLY valid JSON.

Rules:
- "MEAL 1", "MEAL 2" etc map in order to the day labels: MEAL 1 = ${plan.labels[0]}, MEAL 2 = ${plan.labels[1]}, and so on
- If content mentions Monday/Tuesday etc, map those to the closest day label
- If multiple dishes are listed under one meal, join them with " + " into one meal string
- Ignore per-person variations like "Kids:", "Me:", "Maleeka:" — just extract the main dish names
- Keep meal names concise but descriptive
- Return ONLY this JSON format, no markdown, no explanation:
{"meals":[{"day":"${plan.labels[0]}","meal":"Thai soup"},{"day":"${plan.labels[1]}","meal":"Cheese and bean pie"}]}

Content to analyse:
${importText}`};

              if(importImg){
                messages.push({role:"user",content:[
                  {type:"image",source:{type:"base64",media_type:importImg.type,data:importImg.b64}},
                  textPart
                ]});
              } else {
                messages.push({role:"user",content:[textPart]});
              }

              const data=await callAnthropic({
                  model:"claude-sonnet-4-6",
                  max_tokens:1000,
                  system:"You extract meal plans from text or images and return only valid JSON. No markdown, no explanation, no preamble. Start your response with { and end with }.",
                  messages
                });
              if(data.error){throw new Error(data.error.message);}
              const raw=data.content?.[0]?.text||"{}";
              console.log("AI raw response:",raw);
              const clean=raw.replace(/```json|```/g,"").trim();
              // Find JSON object in response
              const jsonMatch=clean.match(/\{[\s\S]*\}/);
              if(!jsonMatch) throw new Error("No JSON in response: "+clean.slice(0,200));
              const parsed=JSON.parse(jsonMatch[0]);
              setImportResult(parsed.meals||[]);
            }catch(err){
              alert("Sorry, couldn't read that. Try again or check your text.");
              console.error(err);
            }
            setImportLoading(false);
          }}
            disabled={importLoading}
            style={{width:"100%",padding:"14px",background:importLoading?"rgba(90,120,72,0.40)":"#5A7848",color:"#fff",border:"none",borderRadius:100,fontSize:15,fontWeight:700,cursor:importLoading?"not-allowed":"pointer",marginBottom:16}}>
            {importLoading?"✨ Reading your meals...":"✨ Extract meals with AI"}
          </button>

          {/* Results */}
          {importResult&&(
            <div>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:16,color:"#1A1A10",marginBottom:10}}>
                {importResult.length>0?`Found ${importResult.length} meal${importResult.length!==1?"s":""}:`:"No meals found — try different text"}
              </div>
              {importResult.map((item,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.7)",borderRadius:12,padding:"10px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10,border:"1px solid rgba(90,120,72,0.15)"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#5A7848",marginBottom:2}}>{item.day}</div>
                    <div style={{fontSize:14,fontWeight:600,color:"#1A1A10"}}>{item.meal}</div>
                  </div>
                  <button onClick={()=>setImportResult(importResult.filter((_,j)=>j!==i))}
                    style={{background:"none",border:"none",color:"#c0392b",cursor:"pointer",fontSize:16}}>✕</button>
                </div>
              ))}
              {importResult.length>0&&(
                <button onClick={()=>{
                  const newDays=[...plan.days.map(d=>[...d])];
                  importResult.forEach(item=>{
                    const dayIdx=plan.labels.findIndex(l=>l.toLowerCase()===item.day.toLowerCase());
                    if(dayIdx>-1){
                      newDays[dayIdx]=[...newDays[dayIdx],{id:Date.now()+Math.random(),text:item.meal,url:"",ingredients:[],had:false}];
                    }
                  });
                  save({...plan,days:newDays});
                  setImportResult(null);
                  setImportText("");
                  setImportImg(null);
                  setMealTab("week");
                }}
                  style={{width:"100%",padding:"14px",background:"#1A1A10",color:"#fff",border:"none",borderRadius:100,fontSize:15,fontWeight:700,cursor:"pointer"}}>
                  ✅ Add all to meal plan
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── IDEAS TAB ── */}
      {mealTab==="ideas"&&(
        <div style={{padding:"0 14px 20px"}}>
          <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:18,color:"#1A1A10",marginBottom:4,marginTop:8}}>Meal Ideas</div>
          <div style={{fontSize:13,color:"#1A1A10",marginBottom:14,lineHeight:1.6,background:"rgba(255,255,255,0.85)",borderRadius:12,padding:"8px 12px"}}>Save inspiration from Pinterest, websites or your own photos. Tap an idea to add it to your week plan.</div>

          {/* Add idea form */}
          {addingRecipe?(
            <div style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:22,padding:"16px",marginBottom:14,border:"1.5px solid rgba(90,120,72,0.20)",boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:16,color:"#1A1A10",marginBottom:12}}>💡 New idea</div>
              <input value={recipeDraft.name} onChange={e=>setRecipeDraft(d=>({...d,name:e.target.value}))} placeholder="Meal name"
                style={{width:"100%",boxSizing:"border-box",padding:"11px 16px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.25)",fontSize:14,fontWeight:600,color:"#1A1A10",outline:"none",marginBottom:10,background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)"}}/>
              {/* Photo upload */}
              <label style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"rgba(90,120,72,0.06)",borderRadius:16,border:"1.5px dashed rgba(90,120,72,0.22)",cursor:"pointer",marginBottom:10}}>
                {recipeDraft.photo
                  ?<img src={recipeDraft.photo} style={{width:44,height:44,objectFit:"cover",borderRadius:10}} alt=""/>
                  :<span style={{fontSize:28}}>📷</span>}
                <div>
                  <div style={{fontWeight:600,fontSize:13,color:"#2A4020"}}>{recipeDraft.photo?"Change photo":"Upload photo"}</div>
                  <div style={{fontSize:11,color:"#8A8070"}}>From your camera roll</div>
                </div>
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setRecipeDraft(d=>({...d,photo:ev.target.result}));r.readAsDataURL(f);}}/>
              </label>
              {/* Pinterest URL */}
              <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"rgba(230,0,35,0.05)",borderRadius:100,border:"1.5px solid rgba(230,0,35,0.15)",marginBottom:8}}>
                <span style={{fontSize:16,flexShrink:0}}>📌</span>
                <input value={recipeDraft.pinUrl||""} onChange={e=>setRecipeDraft(d=>({...d,pinUrl:e.target.value}))}
                  placeholder="Pinterest URL (paste link)"
                  style={{flex:1,border:"none",outline:"none",background:"transparent",fontSize:13,color:"#1A1A10"}}/>
              </div>
              {/* Webpage URL */}
              <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"rgba(66,133,244,0.05)",borderRadius:100,border:"1.5px solid rgba(66,133,244,0.18)",marginBottom:12}}>
                <span style={{fontSize:16,flexShrink:0}}>🌐</span>
                <input value={recipeDraft.url||""} onChange={e=>setRecipeDraft(d=>({...d,url:e.target.value}))}
                  placeholder="Website / recipe link"
                  style={{flex:1,border:"none",outline:"none",background:"transparent",fontSize:13,color:"#1A1A10"}}/>
              </div>
              <textarea value={recipeDraft.description||""} onChange={e=>setRecipeDraft(d=>({...d,description:e.target.value}))}
                placeholder="Notes (optional)..."
                rows={2}
                style={{width:"100%",boxSizing:"border-box",padding:"10px 14px",borderRadius:16,border:"1.5px solid rgba(90,120,72,0.18)",fontSize:13,color:"#1A1A10",outline:"none",resize:"none",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",marginBottom:12}}/>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>{
                  if(!recipeDraft.name.trim())return;
                  saveNewRecipe(recipeDraft,{savedAt:new Date().toISOString()});
                  setRecipeDraft({name:'',description:'',ingredients:'',method:'',url:'',pinUrl:'',photo:''});
                  setAddingRecipe(false);
                }} style={{flex:1,padding:"12px",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",color:"#2A1A08",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>
                  💡 Save idea
                </button>
                <button onClick={()=>{setAddingRecipe(false);setRecipeDraft({name:'',description:'',ingredients:'',method:'',url:'',pinUrl:'',photo:''}); }} style={{flex:1,padding:"12px",background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
              </div>
            </div>
          ):(
            <button onClick={()=>setAddingRecipe(true)}
              style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"14px 18px",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:20,border:"1.5px dashed rgba(90,120,72,0.25)",cursor:"pointer",marginBottom:14}}>
              <span style={{fontSize:28}}>💡</span>
              <div style={{textAlign:"left"}}>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,color:"#2A4020"}}>Save a meal idea</div>
                <div style={{fontSize:11,color:"#8A8070"}}>Photo, Pinterest, website or just a name</div>
              </div>
            </button>
          )}

          {/* Ideas grid */}
          {recipes.length===0&&!addingRecipe&&(
            <div style={{textAlign:"center",padding:"20px 16px",color:"#1A1A10",background:"rgba(255,255,255,0.85)",borderRadius:16}}>
              <div style={{fontSize:40,marginBottom:8}}>🍽️</div>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:16,color:"#1A1A10",marginBottom:4}}>No ideas yet</div>
              <div style={{fontSize:13,color:"#1A1A10",fontWeight:600}}>Save recipes, Pinterest pins and photos here for inspiration.</div>
            </div>
          )}


          {addingRecipe&&(
            <div style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:22,padding:"20px 18px",marginBottom:14,boxShadow:"0 4px 24px rgba(0,0,0,0.08)",border:"1px solid rgba(90,120,72,0.18)"}}>
              <div style={{fontWeight:700,color:"#2A4020",fontSize:15,marginBottom:12}}>📖 New Recipe</div>

              {/* AI extract from text/URL */}
              <button onClick={()=>setShowRecipeAi(a=>!a)}
                style={{width:"100%",padding:"10px",marginBottom:12,background:showRecipeAi?"#5A7848":"rgba(90,120,72,0.08)",color:showRecipeAi?"#fff":"#3A5828",border:"1.5px solid rgba(90,120,72,0.25)",borderRadius:100,fontWeight:700,fontSize:13,cursor:"pointer"}}>
                ✨ {showRecipeAi?"Hide AI import":"Import recipe with AI (paste text or URL)"}
              </button>
              {showRecipeAi&&(
                <div style={{background:"rgba(255,255,255,0.6)",borderRadius:16,padding:"12px",marginBottom:12,border:"1px solid rgba(90,120,72,0.15)"}}>
                  <textarea value={recipeAiText} onChange={e=>setRecipeAiText(e.target.value)}
                    placeholder={"Paste recipe text, a website URL, or Pinterest link here..."}
                    rows={4}
                    style={{width:"100%",boxSizing:"border-box",padding:"10px",borderRadius:12,border:"1.5px solid rgba(90,120,72,0.20)",fontSize:13,fontFamily:"inherit",resize:"none",outline:"none",marginBottom:8,background:"rgba(255,255,255,0.9)"}}/>
                  <button onClick={async()=>{
                    if(!recipeAiText.trim())return;
                    setRecipeAiLoading(true);
                    try{
                      const data=await callAnthropic({
                          model:"claude-sonnet-4-6",
                          max_tokens:1500,
                          system:"Extract recipe details from text or URLs. Return only valid JSON, no markdown, no explanation.",
                          messages:[{role:"user",content:[{type:"text",text:`Extract this recipe and return ONLY JSON in this exact format:
{"name":"Recipe name","ingredients":"ingredient 1\ningredient 2\ningredient 3","method":"Step 1. Do this\nStep 2. Do that","description":"Serving size, tips, notes"}

Rules:
- Extract ALL ingredients listed, one per line including quantities
- Extract ALL method steps — if the text uses paragraphs rather than numbered steps, split each paragraph/sentence into a separate step numbered "Step 1. ...
Step 2. ..."
- If it is a URL, extract the recipe name from the URL and make sensible guesses
- Keep ingredient quantities (e.g. "200g flour", "2 eggs")
- Return ONLY the JSON object, nothing else

Content:
${recipeAiText}`}]}]
                        });
                      if(data.error)throw new Error(data.error.message);
                      const raw=data.content?.[0]?.text||"{}";
                      const jsonMatch=raw.match(/\{[\s\S]*\}/);
                      if(!jsonMatch)throw new Error("No JSON found");
                      const parsed=JSON.parse(jsonMatch[0]);
                      setRecipeDraft(d=>({
                        ...d,
                        name:parsed.name||d.name,
                        ingredients:parsed.ingredients||d.ingredients,
                        method:parsed.method||d.method,
                        description:parsed.description||d.description,
                      }));
                      setShowRecipeAi(false);
                      setRecipeAiText("");
                    }catch(err){
                      alert("Couldn't extract recipe. Try pasting the recipe text directly.");
                      console.error(err);
                    }
                    setRecipeAiLoading(false);
                  }}
                    disabled={recipeAiLoading}
                    style={{width:"100%",padding:"10px",background:recipeAiLoading?"#aaa":"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:13,cursor:recipeAiLoading?"not-allowed":"pointer"}}>
                    {recipeAiLoading?"✨ Extracting...":"✨ Extract recipe with AI"}
                  </button>
                </div>
              )}

              <div style={{marginBottom:6,fontSize:12,fontWeight:700,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5}}>Category <span style={{textTransform:"none",letterSpacing:0,fontWeight:600,color:"#8A8070"}}>— optional, skip it and it's sorted for you</span></div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                {RECIPE_CATS.filter(c=>c.id!=="all").map(c=>(
                  <button key={c.id} onClick={()=>setRecipeDraft(d=>d.catManual&&d.category===c.id?{...d,category:"other",catManual:false}:{...d,category:c.id,catManual:true})}
                    style={{padding:"5px 12px",borderRadius:100,fontSize:12,fontWeight:700,cursor:"pointer",
                      background:recipeDraft.catManual&&recipeDraft.category===c.id?"#5A7848":"rgba(90,80,60,0.08)",
                      color:recipeDraft.catManual&&recipeDraft.category===c.id?"#fff":"#5A4A30",border:"none"}}>
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
              <div style={{marginBottom:6,fontSize:12,fontWeight:700,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5}}>Cuisine <span style={{textTransform:"none",letterSpacing:0,fontWeight:600,color:"#8A8070"}}>— optional</span></div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                {RECIPE_CUISINES.filter(c=>c.id!=="any").map(c=>(
                  <button key={c.id} onClick={()=>setRecipeDraft(d=>d.cuisineManual&&d.cuisine===c.id?{...d,cuisine:"other",cuisineManual:false}:{...d,cuisine:c.id,cuisineManual:true})}
                    style={{padding:"5px 12px",borderRadius:100,fontSize:12,fontWeight:700,cursor:"pointer",
                      background:recipeDraft.cuisineManual&&recipeDraft.cuisine===c.id?"#2980b9":"rgba(90,80,60,0.08)",
                      color:recipeDraft.cuisineManual&&recipeDraft.cuisine===c.id?"#fff":"#5A4A30",border:"none"}}>
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
              <input value={recipeDraft.name} onChange={e=>setRecipeDraft(d=>({...d,name:e.target.value}))} placeholder="Recipe name" style={{width:"100%",boxSizing:"border-box",padding:"12px 16px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.25)",fontSize:15,fontWeight:600,color:"#1A1A10",outline:"none",marginBottom:10,background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)"}}/>
              {/* Multi-photo upload + AI extraction */}
              <div style={{marginBottom:6}}>
                <div style={{fontSize:11,fontWeight:700,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5,marginBottom:6}}>📷 Photos (up to 3 — great for multi-page recipes)</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"flex-start"}}>
                  {(recipeDraft.photos||[]).map((ph,pi)=>(
                    <div key={pi} style={{position:"relative",width:72,height:72,flexShrink:0}}>
                      <img src={ph} alt="" style={{width:72,height:72,objectFit:"cover",borderRadius:12,border:"2px solid rgba(90,120,72,0.3)"}}/>
                      <button onClick={()=>setRecipeDraft(d=>{const newPhotos=(d.photos||[]).filter((_,i)=>i!==pi);return{...d,photos:newPhotos,photo:newPhotos[0]||''}})}
                        style={{position:"absolute",top:-7,right:-7,width:22,height:22,borderRadius:"50%",background:"#c03c3c",color:"#fff",border:"2px solid #fff",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,lineHeight:1}}>×</button>
                    </div>
                  ))}
                  {(recipeDraft.photos||[]).length<3&&(
                    <label style={{width:72,height:72,borderRadius:12,border:"2px dashed rgba(90,120,72,0.35)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",background:"rgba(90,120,72,0.06)",gap:2,flexShrink:0}}>
                      <span style={{fontSize:20}}>📷</span>
                      <span style={{fontSize:10,color:"#5A7848",fontWeight:700,textAlign:"center",lineHeight:1.2}}>Add<br/>photo</span>
                      <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{
                        const f=e.target.files[0];if(!f)return;
                        const reader=new FileReader();
                        reader.onload=ev=>{
                          const dataUrl=ev.target.result;
                          setRecipeDraft(d=>{
                            const newPhotos=[...(d.photos||[]),dataUrl].slice(0,3);
                            return{...d,photos:newPhotos,photo:newPhotos[0]||d.photo,_photoMime:f.type||"image/jpeg"};
                          });
                        };
                        reader.readAsDataURL(f);
                      }}/>
                    </label>
                  )}
                  {recipeAiLoading&&<div style={{fontSize:11,color:"#5A7848",fontWeight:700,alignSelf:"center"}}>✨ Reading...</div>}
                </div>
              </div>
              {(recipeDraft.photos||[]).length>0&&!recipeAiLoading&&(
                <button onClick={async()=>{
                  setRecipeAiLoading(true);
                  try{
                    const resizePhoto=async(dataUrl)=>new Promise(resolve=>{
                      const img=new Image();
                      img.onerror=()=>resolve(dataUrl);
                      img.onload=()=>{
                        try{
                          const MAX=800;
                          let w=img.naturalWidth||img.width;
                          let h=img.naturalHeight||img.height;
                          if(w>MAX||h>MAX){if(w>h){h=Math.round(h*MAX/w);w=MAX;}else{w=Math.round(w*MAX/h);h=MAX;}}
                          const canvas=document.createElement('canvas');
                          canvas.width=w;canvas.height=h;
                          canvas.getContext('2d').drawImage(img,0,0,w,h);
                          resolve(canvas.toDataURL('image/jpeg',0.75));
                        }catch(e){resolve(dataUrl);}
                      };
                      img.src=dataUrl;
                    });
                    const allPhotos=[...(recipeDraft.photos||[])].filter(Boolean);
                    if(recipeDraft.photo&&!allPhotos.includes(recipeDraft.photo)) allPhotos.unshift(recipeDraft.photo);
                    const resizedPhotos=await Promise.all(allPhotos.map(resizePhoto));
                    const imageBlocks=resizedPhotos.map(r=>({type:"image",source:{type:"base64",media_type:"image/jpeg",data:r.split(",")[1]}}));
                    const pageCount=resizedPhotos.length;
                    const data=await callAnthropic({
                      model:"claude-sonnet-4-6",
                      max_tokens:1500,
                      system:"You extract recipe details from photos or screenshots. Return ONLY valid JSON, no markdown, no explanation.",
                      messages:[{role:"user",content:[
                        ...imageBlocks,
                        {type:"text",text:`You are extracting a recipe from ${pageCount>1?`these ${pageCount} images (they are pages of the same recipe — read ALL of them together)`:"this image"}. Look very carefully at ALL text visible across every image.

Return ONLY this JSON (no markdown, no explanation):
{"name":"Recipe name","ingredients":"ingredient 1\ningredient 2\ningredient 3","method":"Step 1. Do this\nStep 2. Do that","description":"Serving size, calories, tips"}

Rules:
- Combine information from ALL images/pages into one complete recipe
- Extract ALL ingredients with quantities (e.g. 200g flour, 2 eggs)
- Extract ALL method steps — even if the book uses paragraphs with no numbers, split each paragraph into a separate numbered step: "Step 1. ...\nStep 2. ..."
- Read partial/cut-off text at edges and include it
- If images are page 1 and page 2 of a cookbook recipe, stitch them together
- Never leave ingredients or method empty if text is visible in ANY of the images`}
                      ]}]
                    });
                    if(data.error) throw new Error(data.error.message);
                    const raw=data.content?.[0]?.text||"{}";
                    const jsonMatch=raw.match(/\{[\s\S]*\}/);
                    if(!jsonMatch) throw new Error("No JSON found");
                    const parsed=JSON.parse(jsonMatch[0]);
                    setRecipeDraft(d=>({
                      ...d,
                      name:parsed.name||(d.name||""),
                      ingredients:parsed.ingredients||(d.ingredients||""),
                      method:parsed.method||(d.method||""),
                      description:parsed.description||(d.description||""),
                    }));
                  }catch(err){
                    const msg=err?.message||String(err);
                    alert("Extract failed: "+msg);
                    console.error("Recipe photo extract error:",err);
                  }
                  setRecipeAiLoading(false);
                }}
                  style={{width:"100%",padding:"12px",marginBottom:8,background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  ✨ Extract recipe from photo{(recipeDraft.photos||[]).length>1?`s (${(recipeDraft.photos||[]).length} pages)`:""}
                </button>
              )}
              {recipeAiLoading&&(
                <div style={{background:"rgba(90,120,72,0.08)",borderRadius:12,padding:"10px 14px",marginBottom:8,fontSize:13,color:"#5A7848",fontWeight:600,textAlign:"center"}}>
                  ✨ Reading your recipe photo... filling in the details automatically
                </div>
              )}
              <UrlField value={recipeDraft.url} onChange={v=>setRecipeDraft(d=>({...d,url:v}))} style={{marginBottom:8}}/>
              <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"rgba(230,0,35,0.05)",borderRadius:100,border:"1.5px solid rgba(230,0,35,0.15)",marginBottom:10}}>
                <span style={{fontSize:16,flexShrink:0}}>📌</span>
                <input value={recipeDraft.pinUrl||""} onChange={e=>setRecipeDraft(d=>({...d,pinUrl:e.target.value}))}
                  placeholder="Pinterest pin URL (optional)"
                  style={{flex:1,border:"none",outline:"none",background:"transparent",fontSize:13,color:"#1A1A10"}}/>
              </div>
              <div style={{marginBottom:6,fontSize:12,fontWeight:700,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5}}>🥄 Ingredients</div>
              <textarea value={recipeDraft.ingredients} onChange={e=>setRecipeDraft(d=>({...d,ingredients:e.target.value}))} placeholder={"e.g.\n2 eggs\n200g flour\n1 tsp salt"} rows={8} style={{width:"100%",boxSizing:"border-box",padding:"14px 16px",borderRadius:16,border:"1.5px solid rgba(90,120,72,0.2)",fontSize:15,lineHeight:1.8,color:"#1A1A10",outline:"none",resize:"vertical",fontFamily:"inherit",marginBottom:16,background:"rgba(255,255,255,0.8)"}}/>
              <div style={{marginBottom:6,fontSize:12,fontWeight:700,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5}}>📋 Method / Steps</div>
              <textarea value={recipeDraft.method} onChange={e=>setRecipeDraft(d=>({...d,method:e.target.value}))} placeholder={"e.g.\nStep 1. Preheat oven to 200°C\nStep 2. Mix ingredients\nStep 3. Bake for 30 mins"} rows={8} style={{width:"100%",boxSizing:"border-box",padding:"14px 16px",borderRadius:16,border:"1.5px solid rgba(90,120,72,0.2)",fontSize:15,lineHeight:1.8,color:"#1A1A10",outline:"none",resize:"vertical",fontFamily:"inherit",marginBottom:16,background:"rgba(255,255,255,0.8)"}}/>
              <div style={{marginBottom:6,fontSize:12,fontWeight:700,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5}}>📝 Notes</div>
              <textarea value={recipeDraft.description} onChange={e=>setRecipeDraft(d=>({...d,description:e.target.value}))} placeholder="Serving size, calories, tips..." rows={3} style={{width:"100%",boxSizing:"border-box",padding:"14px 16px",borderRadius:16,border:"1.5px solid rgba(90,120,72,0.2)",fontSize:15,lineHeight:1.7,color:"#1A1A10",outline:"none",resize:"vertical",fontFamily:"inherit",marginBottom:14,background:"rgba(255,255,255,0.8)"}}/>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>{setAddingRecipe(false);setRecipeDraft({name:"",description:"",ingredients:"",method:"",url:"",photo:"",photos:[],category:"other",cuisine:"other",favourite:false});}} style={{flex:1,background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,padding:"11px",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
                <button onClick={async()=>{
                  if(!recipeDraft.name.trim())return;
                  saveNewRecipe(recipeDraft);
                  setRecipeDraft({name:"",description:"",ingredients:"",method:"",url:"",photo:"",photos:[],category:"other",cuisine:"other",favourite:false});
                  setAddingRecipe(false);
                }} disabled={recipeAiLoading}
                style={{flex:2,background:recipeAiLoading?"#888":"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"11px 24px",fontWeight:700,fontSize:14,cursor:recipeAiLoading?"not-allowed":"pointer",boxShadow:"0 3px 12px rgba(58,80,38,0.28)"}}>
                  {recipeAiLoading?"✨ Saving...":"Save Recipe"}
                </button>
              </div>
            </div>
          )}
          {recipes.length===0&&!addingRecipe&&(
            <div style={{textAlign:"center",marginTop:60}}>
              <div style={{fontSize:52,marginBottom:12}}>📖</div>
              <div style={{color:"#1A1A10",fontSize:15,marginBottom:6,fontFamily:"Georgia,serif",fontWeight:700,background:"rgba(255,255,255,0.85)",borderRadius:12,padding:"8px 12px"}}>No recipes yet</div>
              <div style={{color:"#1A1A10",fontSize:13,fontWeight:600,background:"rgba(255,255,255,0.85)",borderRadius:12,padding:"8px 12px",marginTop:4}}>Tap above to write your own or paste a link</div>
            </div>
          )}

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {recipes.filter(r=>(recipeCatFilter==="all"||(r.category||"other")===recipeCatFilter)&&(recipeCuisineFilter==="any"||(r.cuisine||"other")===recipeCuisineFilter)).map(r=>(
              <div key={r.id} style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:18,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,0.07)",border:"1px solid rgba(90,120,72,0.12)",cursor:"pointer"}}
                onClick={()=>setRecipeDetail(r)}>
                {r.photo
                  ?<img src={r.photo} alt={r.name} style={{width:"100%",height:100,objectFit:"cover"}}/>
                  :<div style={{width:"100%",height:80,background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32}}>{r.pinUrl?"📌":"🍽️"}</div>
                }
                <div style={{padding:"8px 10px"}}>
                  <div style={{fontWeight:700,fontSize:13,color:"#1A1A10",lineHeight:1.3,marginBottom:2}}>{r.name}</div>
                  <div style={{display:"flex",gap:4}}>
                    {r.pinUrl&&<span style={{fontSize:10,color:"#E60023",fontWeight:600}}>📌</span>}
                    {r.url&&<span style={{fontSize:10,color:"#4285f4",fontWeight:600}}>🌐</span>}
                    {r.description&&<span style={{fontSize:10,color:"#8A8070",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.description}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mealTab==="recipes"&&(
        <div style={{padding:"8px 16px 16px"}}>

          {/* Add + Auto-categorise buttons */}
          <button onClick={()=>setAddingRecipe(true)} style={{width:"100%",padding:"14px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:15,cursor:"pointer",marginBottom:10,boxShadow:"0 3px 12px rgba(58,80,38,0.28)",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
            <span style={{fontSize:18}}>+</span> Add Recipe
          </button>

          {/* Sorting: progress / unsorted banner / sort-by-hand */}
          {sortBusy&&(
            <div style={{background:"rgba(255,255,255,0.92)",borderRadius:16,padding:"12px 14px",marginBottom:12,border:"1.5px solid rgba(90,120,72,0.25)",fontSize:14,fontWeight:700,color:"#3A5828",textAlign:"center"}}>
              {sortBusy}
            </div>
          )}
          {!sortBusy&&!handSort&&recipes.length>0&&(()=>{
            const todo=recipes.filter(needsCat);
            if(todo.length===0) return null;
            return(
              <div style={{background:"rgba(255,255,255,0.92)",borderRadius:18,padding:"14px",marginBottom:12,border:"1.5px dashed rgba(230,126,34,0.5)",boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
                <div style={{fontSize:15,fontWeight:800,color:"#2A4020",marginBottom:2}}>📌 {todo.length} recipe{todo.length===1?"":"s"} without a category</div>
                <div style={{fontSize:12,color:"#8A8070",marginBottom:12}}>Let the app sort {todo.length===1?"it":"them"}, or choose yourself</div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>autoSortRecipes("missing")}
                    style={{flex:1,padding:"11px 8px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 3px 12px rgba(58,80,38,0.25)"}}>
                    ✨ Auto-sort
                  </button>
                  <button onClick={()=>setHandSort({ids:todo.map(r=>r.id),idx:0})}
                    style={{flex:1,padding:"11px 8px",background:"rgba(255,255,255,0.9)",color:"#3A5828",border:"1.5px solid rgba(90,120,72,0.4)",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                    ✋ Sort by hand
                  </button>
                </div>
              </div>
            );
          })()}
          {handSort&&(()=>{
            // skip past any recipe that's been deleted since sorting started
            let i=handSort.idx;
            while(i<handSort.ids.length&&!recipes.some(x=>x.id===handSort.ids[i])) i++;
            const cur=recipes.find(x=>x.id===handSort.ids[i]);
            if(!cur) return(
              <button onClick={()=>setHandSort(null)} style={{width:"100%",padding:"12px",marginBottom:14,background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer"}}>✓ All done — close</button>
            );
            const isLast=i+1>=handSort.ids.length;
            const goNext=()=>{if(isLast){setHandSort(null);}else{setHandSort({...handSort,idx:i+1});}};
            const ings=String(cur.ingredients||"").split("\n").map(s=>s.trim()).filter(Boolean);
            return(
              <div style={{background:"rgba(255,255,255,0.96)",borderRadius:20,padding:"16px",marginBottom:14,border:"2px solid #5A7848",boxShadow:"0 6px 24px rgba(0,0,0,0.12)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div style={{fontSize:12,fontWeight:800,color:"#5A7848",textTransform:"uppercase",letterSpacing:0.5}}>✋ Sort by hand · {i+1} of {handSort.ids.length}</div>
                  <button onClick={()=>setHandSort(null)} style={{background:"rgba(90,80,60,0.08)",border:"none",borderRadius:100,padding:"6px 14px",fontSize:12,fontWeight:700,color:"#8A8070",cursor:"pointer"}}>Stop</button>
                </div>
                <div style={{height:5,background:"rgba(90,120,72,0.12)",borderRadius:3,marginBottom:14,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${Math.round((i/handSort.ids.length)*100)}%`,background:"#5A7848",transition:"width 0.3s"}}/>
                </div>
                <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:14}}>
                  <div style={{width:56,height:56,borderRadius:14,background:"#5A7848",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0,overflow:"hidden"}}>
                    {cur.photo?<img src={cur.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:"🍽️"}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:18,color:"#1A1A10",lineHeight:1.3}}>{cur.name}</div>
                    {ings.length>0&&<div style={{fontSize:12,color:"#8A8070",marginTop:3,lineHeight:1.4}}>{ings.slice(0,4).join(" · ")}{ings.length>4?" …":""}</div>}
                  </div>
                </div>
                <div style={{fontSize:14,fontWeight:800,color:"#2A4020",marginBottom:10}}>Which category is it?</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
                  {RECIPE_CATS.filter(c=>c.id!=="all").map(c=>(
                    <button key={c.id} onClick={()=>{
                        setRecipeCat(cur.id,c.id);
                        if(isLast&&!recipes.some(x=>x.id!==cur.id&&needsCat(x))) setTimeout(()=>alert("🎉 All sorted!"),60);
                        goNext();
                      }}
                      style={{padding:"12px 4px",background:"rgba(90,120,72,0.08)",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:14,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                      <span style={{fontSize:24,lineHeight:1}}>{c.icon}</span>
                      <span style={{fontSize:12,fontWeight:700,color:"#2A4020"}}>{c.label}</span>
                    </button>
                  ))}
                </div>
                <button onClick={goNext} style={{width:"100%",padding:"10px",background:"none",border:"none",fontSize:13,fontWeight:700,color:"#8A8070",cursor:"pointer"}}>
                  Skip this one for now →
                </button>
              </div>
            );
          })()}

          {/* Category filter */}
          <div style={{overflowX:"auto",marginBottom:8}}>
            <div style={{display:"flex",gap:6,paddingBottom:4,minWidth:"max-content"}}>
              <button onClick={()=>setRecipeFavFilter(f=>!f)}
                style={{padding:"6px 12px",borderRadius:100,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",
                  background:recipeFavFilter?"#e74c3c":"rgba(255,255,255,0.7)",
                  color:recipeFavFilter?"#fff":"#3A2A18",
                  border:recipeFavFilter?"none":"1.5px solid rgba(90,80,60,0.20)"}}>
                ❤️ Favourites ({recipes.filter(r=>r.favourite).length})
              </button>
              {RECIPE_CATS.map(c=>{
                const n=c.id==="all"?recipes.length:recipes.filter(r=>r.category===c.id).length;
                return <button key={c.id} onClick={()=>setRecipeCatFilter(c.id)}
                  style={{padding:"6px 12px",borderRadius:100,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",
                    background:recipeCatFilter===c.id?"#5A7848":"rgba(255,255,255,0.7)",
                    color:recipeCatFilter===c.id?"#fff":"#3A2A18",
                    border:recipeCatFilter===c.id?"none":"1.5px solid rgba(90,80,60,0.20)"}}>
                  {c.icon} {c.label} ({n})
                </button>;
              })}
            </div>
          </div>

          {/* Cuisine filter */}
          <div style={{overflowX:"auto",marginBottom:12}}>
            <div style={{display:"flex",gap:6,paddingBottom:4,minWidth:"max-content"}}>
              {RECIPE_CUISINES.map(c=>{
                const n=c.id==="any"?recipes.length:recipes.filter(r=>r.cuisine===c.id).length;
                return <button key={c.id} onClick={()=>setRecipeCuisineFilter(c.id)}
                  style={{padding:"6px 12px",borderRadius:100,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",
                    background:recipeCuisineFilter===c.id?"#2980b9":"rgba(255,255,255,0.7)",
                    color:recipeCuisineFilter===c.id?"#fff":"#3A2A18",
                    border:recipeCuisineFilter===c.id?"none":"1.5px solid rgba(90,80,60,0.20)"}}>
                  {c.icon} {c.label} ({n})
                </button>;
              })}
            </div>
          </div>

          {/* Re-check every category with the stronger sorter (keeps anything chosen by hand) */}
          {recipes.length>0&&!sortBusy&&!handSort&&(
            <div style={{textAlign:"center",marginBottom:12}}>
              <button onClick={()=>{
                const n=recipes.filter(r=>!r.catManual||!r.cuisineManual).length;
                if(n===0){alert("You've set every recipe yourself — nothing to re-check ✅");return;}
                if(window.confirm(`Re-check the category of ${n} recipe${n===1?"":"s"}?\n\nAny you've set yourself won't be changed.`)) autoSortRecipes("all");
              }}
                style={{background:"rgba(255,255,255,0.75)",border:"1px solid rgba(90,120,72,0.25)",borderRadius:100,padding:"6px 14px",fontSize:12,fontWeight:700,color:"#5A7848",cursor:"pointer"}}>
                ✨ Re-check all categories
              </button>
            </div>
          )}

          {/* Add recipe form */}
          {addingRecipe&&(
            <div style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:22,padding:"20px 18px",marginBottom:14,boxShadow:"0 4px 24px rgba(0,0,0,0.08)",border:"1px solid rgba(90,120,72,0.18)"}}>
              <div style={{fontWeight:700,color:"#2A4020",fontSize:15,marginBottom:12}}>📖 New Recipe</div>
              <div style={{marginBottom:6,fontSize:12,fontWeight:700,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5}}>Category <span style={{textTransform:"none",letterSpacing:0,fontWeight:600,color:"#8A8070"}}>— optional, skip it and it's sorted for you</span></div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                {RECIPE_CATS.filter(c=>c.id!=="all").map(c=>(
                  <button key={c.id} onClick={()=>setRecipeDraft(d=>d.catManual&&d.category===c.id?{...d,category:"other",catManual:false}:{...d,category:c.id,catManual:true})}
                    style={{padding:"5px 12px",borderRadius:100,fontSize:12,fontWeight:700,cursor:"pointer",
                      background:recipeDraft.catManual&&recipeDraft.category===c.id?"#5A7848":"rgba(90,80,60,0.08)",
                      color:recipeDraft.catManual&&recipeDraft.category===c.id?"#fff":"#5A4A30",border:"none"}}>
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
              <div style={{marginBottom:6,fontSize:12,fontWeight:700,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5}}>Cuisine <span style={{textTransform:"none",letterSpacing:0,fontWeight:600,color:"#8A8070"}}>— optional</span></div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                {RECIPE_CUISINES.filter(c=>c.id!=="any").map(c=>(
                  <button key={c.id} onClick={()=>setRecipeDraft(d=>d.cuisineManual&&d.cuisine===c.id?{...d,cuisine:"other",cuisineManual:false}:{...d,cuisine:c.id,cuisineManual:true})}
                    style={{padding:"5px 12px",borderRadius:100,fontSize:12,fontWeight:700,cursor:"pointer",
                      background:recipeDraft.cuisineManual&&recipeDraft.cuisine===c.id?"#2980b9":"rgba(90,80,60,0.08)",
                      color:recipeDraft.cuisineManual&&recipeDraft.cuisine===c.id?"#fff":"#5A4A30",border:"none"}}>
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
              <input value={recipeDraft.name} onChange={e=>setRecipeDraft(d=>({...d,name:e.target.value}))}
                placeholder="Recipe name" style={{width:"100%",boxSizing:"border-box",padding:"12px 16px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.25)",fontSize:15,fontWeight:600,color:"#1A1A10",outline:"none",marginBottom:10,background:"rgba(255,255,255,0.9)"}}/>
              <div style={{marginBottom:6}}>
                <div style={{fontSize:11,fontWeight:700,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5,marginBottom:6}}>📷 Photos (up to 3 — great for multi-page recipes)</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"flex-start"}}>
                  {(recipeDraft.photos||[]).map((ph,pi)=>(
                    <div key={pi} style={{position:"relative",width:72,height:72,flexShrink:0}}>
                      <img src={ph} alt="" style={{width:72,height:72,objectFit:"cover",borderRadius:12,border:"2px solid rgba(90,120,72,0.3)"}}/>
                      <button onClick={()=>setRecipeDraft(d=>{const newPhotos=(d.photos||[]).filter((_,i)=>i!==pi);return{...d,photos:newPhotos,photo:newPhotos[0]||''}})}
                        style={{position:"absolute",top:-7,right:-7,width:22,height:22,borderRadius:"50%",background:"#c03c3c",color:"#fff",border:"2px solid #fff",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,lineHeight:1}}>×</button>
                    </div>
                  ))}
                  {(recipeDraft.photos||[]).length<3&&(
                    <label style={{width:72,height:72,borderRadius:12,border:"2px dashed rgba(90,120,72,0.35)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",background:"rgba(90,120,72,0.06)",gap:2,flexShrink:0}}>
                      <span style={{fontSize:20}}>📷</span>
                      <span style={{fontSize:10,color:"#5A7848",fontWeight:700,textAlign:"center",lineHeight:1.2}}>Add<br/>photo</span>
                      <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{
                        const f=e.target.files[0];if(!f)return;
                        const reader=new FileReader();
                        reader.onload=ev=>{
                          const dataUrl=ev.target.result;
                          setRecipeDraft(d=>{
                            const newPhotos=[...(d.photos||[]),dataUrl].slice(0,3);
                            return{...d,photos:newPhotos,photo:newPhotos[0]||d.photo,_photoMime:f.type||"image/jpeg"};
                          });
                        };
                        reader.readAsDataURL(f);
                      }}/>
                    </label>
                  )}
                </div>
              </div>
              {(recipeDraft.photos||[]).length>0&&!recipeAiLoading&&(
                <button onClick={async()=>{
                  setRecipeAiLoading(true);
                  try{
                    const resizePhoto=async(dataUrl)=>new Promise(resolve=>{
                      const img=new Image();
                      img.onerror=()=>resolve(dataUrl);
                      img.onload=()=>{
                        try{
                          const MAX=800;
                          let w=img.naturalWidth||img.width;let h=img.naturalHeight||img.height;
                          if(w>MAX||h>MAX){if(w>h){h=Math.round(h*MAX/w);w=MAX;}else{w=Math.round(w*MAX/h);h=MAX;}}
                          const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
                          canvas.getContext('2d').drawImage(img,0,0,w,h);
                          resolve(canvas.toDataURL('image/jpeg',0.75));
                        }catch(e){resolve(dataUrl);}
                      };
                      img.src=dataUrl;
                    });
                    const allPhotos=[...(recipeDraft.photos||[])].filter(Boolean);
                    if(recipeDraft.photo&&!allPhotos.includes(recipeDraft.photo)) allPhotos.unshift(recipeDraft.photo);
                    const resizedPhotos=await Promise.all(allPhotos.map(resizePhoto));
                    const imageBlocks=resizedPhotos.map(r=>({type:"image",source:{type:"base64",media_type:"image/jpeg",data:r.split(",")[1]}}));
                    const pageCount=resizedPhotos.length;
                    const data=await callAnthropic({model:"claude-sonnet-4-6",max_tokens:1500,
                      system:"Extract recipe from images. Return only JSON.",
                      messages:[{role:"user",content:[
                        ...imageBlocks,
                        {type:"text",text:`Extract recipe from ${pageCount>1?`these ${pageCount} images (same recipe across pages — combine all pages)`:"this image"}. Return ONLY JSON: {"name":"name","ingredients":"item1\nitem2","method":"Step 1. ...\nStep 2. ...","description":"notes"}. Split every paragraph into numbered steps. Never say 'not visible' if text exists in any image.`}
                      ]}]
                    });
                    const raw=data.content?.[0]?.text||"{}";
                    const match=raw.match(/\{[\s\S]*\}/);
                    if(match){
                      const p=JSON.parse(match[0]);
                      setRecipeDraft(d=>({...d,name:p.name||d.name,ingredients:p.ingredients||d.ingredients,method:p.method||d.method,description:p.description||d.description}));
                    }
                  }catch(e){alert("Extract failed: "+e.message);}
                  setRecipeAiLoading(false);
                }} style={{width:"100%",padding:"12px",marginBottom:8,background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                  ✨ Extract recipe from photo{(recipeDraft.photos||[]).length>1?`s (${(recipeDraft.photos||[]).length} pages)`:""}
                </button>
              )}
              {recipeAiLoading&&<div style={{textAlign:"center",padding:"10px",color:"#5A7848",fontWeight:700}}>✨ Reading photo...</div>}
              <div style={{marginBottom:6,fontSize:12,fontWeight:700,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5}}>🥄 Ingredients</div>
              <textarea value={recipeDraft.ingredients} onChange={e=>setRecipeDraft(d=>({...d,ingredients:e.target.value}))} placeholder={"e.g.\n2 eggs\n200g flour"} rows={6} style={{width:"100%",boxSizing:"border-box",padding:"14px 16px",borderRadius:16,border:"1.5px solid rgba(90,120,72,0.2)",fontSize:15,lineHeight:1.8,color:"#1A1A10",outline:"none",resize:"vertical",fontFamily:"inherit",marginBottom:12,background:"rgba(255,255,255,0.8)"}}/>
              <div style={{marginBottom:6,fontSize:12,fontWeight:700,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5}}>📋 Method</div>
              <textarea value={recipeDraft.method} onChange={e=>setRecipeDraft(d=>({...d,method:e.target.value}))} placeholder={"Step 1. ..\nStep 2. .."} rows={6} style={{width:"100%",boxSizing:"border-box",padding:"14px 16px",borderRadius:16,border:"1.5px solid rgba(90,120,72,0.2)",fontSize:15,lineHeight:1.8,color:"#1A1A10",outline:"none",resize:"vertical",fontFamily:"inherit",marginBottom:12,background:"rgba(255,255,255,0.8)"}}/>
              <div style={{marginBottom:6,fontSize:12,fontWeight:700,color:"#3A5828",textTransform:"uppercase",letterSpacing:0.5}}>📝 Notes</div>
              <textarea value={recipeDraft.description} onChange={e=>setRecipeDraft(d=>({...d,description:e.target.value}))} placeholder="Serving size, calories, tips..." rows={3} style={{width:"100%",boxSizing:"border-box",padding:"14px 16px",borderRadius:16,border:"1.5px solid rgba(90,120,72,0.2)",fontSize:15,lineHeight:1.7,color:"#1A1A10",outline:"none",resize:"vertical",fontFamily:"inherit",marginBottom:14,background:"rgba(255,255,255,0.8)"}}/>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>{setAddingRecipe(false);setRecipeDraft({name:"",description:"",ingredients:"",method:"",url:"",pinUrl:"",photo:"",category:"other",cuisine:"other"});}} style={{flex:1,background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,padding:"11px",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
                <button onClick={()=>{
                  if(!recipeDraft.name.trim())return;
                  saveNewRecipe(recipeDraft);
                  setAddingRecipe(false);
                  setRecipeDraft({name:"",description:"",ingredients:"",method:"",url:"",pinUrl:"",photo:"",photos:[],category:"other",cuisine:"other",favourite:false});
                }} style={{flex:2,background:"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"13px",fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 3px 12px rgba(58,80,38,0.28)"}}>
                  💾 Save Recipe
                </button>
              </div>
            </div>
          )}

          {/* Recipe grid */}
          {recipes.length===0?(
            <div style={{textAlign:"center",padding:"32px 16px",color:"#5A4A30"}}>
              <div style={{fontSize:40,marginBottom:8}}>🍽️</div>
              <div style={{fontWeight:700,fontSize:16}}>No recipes yet</div>
              <div style={{fontSize:13,marginTop:4}}>Tap + Add Recipe to get started</div>
            </div>
          ):(()=>{
            const filtered=recipes.filter(r=>
              (recipeCatFilter==="all"||r.category===recipeCatFilter)&&
              (recipeCuisineFilter==="any"||r.cuisine===recipeCuisineFilter)&&
              (!recipeFavFilter||r.favourite)
            );
            return filtered.length===0?(
              <div style={{textAlign:"center",padding:"24px",color:"#5A4A30",background:"rgba(255,255,255,0.6)",borderRadius:16}}>
                <div style={{fontSize:32,marginBottom:6}}>🔍</div>
                <div style={{fontWeight:700}}>No recipes match this filter</div>
                <button onClick={()=>{setRecipeCatFilter("all");setRecipeCuisineFilter("any");}} style={{marginTop:10,padding:"8px 20px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,cursor:"pointer",fontSize:13}}>Show all</button>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {filtered.map(r=>(
                  <div key={r.id} onClick={()=>setRecipeDetail(r)}
                    style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:18,padding:"14px 16px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid rgba(90,120,72,0.15)",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:48,height:48,borderRadius:12,background:"#5A7848",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,overflow:"hidden"}}>
                      {r.photo?<img src={r.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:"🍽️"}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,fontSize:15,color:"#1A1A10",marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.name}</div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                        {needsCat(r)&&<span style={{background:"rgba(230,126,34,0.12)",borderRadius:100,padding:"2px 8px",fontSize:11,fontWeight:700,color:"#A0522D"}}>📌 No category</span>}
                        {r.category&&r.category!=="other"&&(()=>{const cat=RECIPE_CATS.find(c=>c.id===r.category);return cat?<span style={{background:"rgba(90,120,72,0.12)",borderRadius:100,padding:"2px 8px",fontSize:11,fontWeight:700,color:"#3A5828"}}>{cat.icon} {cat.label}</span>:null;})()}
                        {r.cuisine&&r.cuisine!=="other"&&(()=>{const cu=RECIPE_CUISINES.find(c=>c.id===r.cuisine);return cu?<span style={{background:"rgba(41,128,185,0.10)",borderRadius:100,padding:"2px 8px",fontSize:11,fontWeight:700,color:"#1a5276"}}>{cu.icon} {cu.label}</span>:null;})()}
                        <span style={{fontSize:11,color:"#8A8070"}}>{r.ingredients?r.ingredients.split("\n").filter(Boolean).length+" ingredients":"No ingredients"}</span>
                      </div>
                    </div>
                    <button onClick={e=>{e.stopPropagation();setRecipes(prev=>prev.map(rx=>rx.id===r.id?{...rx,favourite:!rx.favourite}:rx));}}
                      style={{background:"none",border:"none",fontSize:22,cursor:"pointer",padding:"4px",flexShrink:0,lineHeight:1}}>
                      {r.favourite?"❤️":"🤍"}
                    </button>
                    <span style={{color:"#8A8070",fontSize:18}}>›</span>
                  </div>
                ))}
              </div>
            );
          })()}

        </div>
      )}


      {mealTab==="saved"&&(
        <div style={{padding:"8px 16px 80px"}}>
          {/* Save current week button */}
          <div style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:20,padding:"16px",marginBottom:14,boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
            <div style={{fontWeight:700,fontSize:15,color:"#1A1A10",marginBottom:10}}>💾 Save this week's plan</div>
            <div style={{display:"flex",gap:8}}>
              <input value={savePlanName} onChange={e=>setSavePlanName(e.target.value)}
                placeholder="Name this plan e.g. Week 1..." style={{flex:1,padding:"10px 14px",borderRadius:100,border:"1.5px solid rgba(90,80,60,0.2)",fontSize:14,outline:"none",background:"rgba(255,255,255,0.8)",color:"#1A1A10"}}/>
              <button onClick={()=>{
                if(!savePlanName.trim())return;
                const sp={id:Date.now(),name:savePlanName.trim(),plan:{...plan},savedAt:Date.now()};
                setSavedMealPlans(prev=>[sp,...prev]);
                setSavePlanName("");
              }} style={{padding:"10px 18px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer",whiteSpace:"nowrap"}}>
                💾 Save
              </button>
            </div>
          </div>

          {/* Saved plans list */}
          {savedMealPlans.length===0?(
            <div style={{textAlign:"center",padding:"40px 16px",color:"#5A4A30"}}>
              <div style={{fontSize:48,marginBottom:10}}>📅</div>
              <div style={{fontWeight:700,fontSize:16,marginBottom:4}}>No saved plans yet</div>
              <div style={{fontSize:13,color:"#8A8070"}}>Name your plan above and tap Save</div>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {savedMealPlans.map(sp=>(
                <div key={sp.id} style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",borderRadius:18,padding:"14px 16px",boxShadow:"0 2px 10px rgba(0,0,0,0.06)",border:"1px solid rgba(90,120,72,0.15)"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:15,color:"#1A1A10"}}>{sp.name}</div>
                      <div style={{fontSize:11,color:"#8A8070",marginTop:2}}>Saved {new Date(sp.savedAt).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>{
                        if(window.confirm("Load \""+sp.name+"\" as your current week plan? Your current plan will be replaced.")){
                          save({...sp.plan});
                          setMealTab("week");
                        }
                      }} style={{padding:"8px 16px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:13,cursor:"pointer"}}>
                        Load
                      </button>
                      <button onClick={()=>{
                        if(window.confirm("Delete \""+sp.name+"\"?")){
                          setSavedMealPlans(prev=>prev.filter(p=>p.id!==sp.id));
                        }
                      }} style={{padding:"8px 12px",background:"rgba(200,60,60,0.12)",color:"#c03c3c",border:"none",borderRadius:100,fontWeight:700,fontSize:13,cursor:"pointer"}}>
                        🗑
                      </button>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                    {(sp.plan.labels||[]).map((label,i)=>{
                      const meals=sp.plan.days?.[i]||[];
                      return meals.length>0?(
                        <div key={i} style={{background:"rgba(255,255,255,0.6)",borderRadius:8,padding:"4px 8px",fontSize:11,color:"#3A5828",fontWeight:600}}>
                          {label}: {meals.map(m=>m.name||m.text||m).join(", ")}
                        </div>
                      ):null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {mealTab==="week"&&(
        <div style={{padding:"8px 16px"}}>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <button onClick={()=>{setMealTab("saved");}} style={{flex:1,padding:"10px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontSize:13,fontWeight:700,cursor:"pointer"}}>
              💾 Save this plan
            </button>
            <button onClick={()=>{
                const days=plan.days.map(d=>d.map(m=>({...m,had:false})));
                save({...plan,days});
              }}
              style={{flex:1,padding:"10px",background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",border:"1.5px solid rgba(90,80,60,0.18)",borderRadius:100,fontSize:13,fontWeight:700,color:"#1A1A10",cursor:"pointer"}}>
              🔁 Reset for next week
            </button>
          </div>
          {plan.labels.map((label,dayIdx)=>{
            const meals=plan.days[dayIdx]||[];
            const bg=DAY_GRADS[dayIdx];
            const border=DAY_BORDER[dayIdx];
            const textCol=DAY_TEXT[dayIdx];
            return (
              <div key={dayIdx} style={{
                background:bg,
                borderRadius:22,
                marginBottom:12,
                overflow:"hidden",
                boxShadow:"0 2px 16px rgba(0,0,0,0.07)",
                border:`1.5px solid ${border}`,
                backdropFilter:"blur(8px)",
                WebkitBackdropFilter:"blur(8px)",
              }}>
                {/* Day header row */}
                <div style={{padding:"14px 18px 10px",display:"flex",alignItems:"center",gap:10}}>
                  <div style={{flex:1}}>
                    {editLabelIdx===dayIdx ? (
                      <input
                        value={labelDraft}
                        onChange={e=>setLabelDraft(e.target.value)}
                        onKeyDown={e=>{if(e.key==="Enter")saveLabelEdit();if(e.key==="Escape")setEditLabelIdx(null);}}
                        onBlur={saveLabelEdit}
                        autoFocus
                        style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",border:`1.5px solid ${border}`,borderRadius:10,padding:"4px 12px",color:textCol,fontSize:16,fontWeight:800,outline:"none",width:"100%",boxSizing:"border-box"}}
                      />
                    ) : (
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <button onClick={()=>openLabelEdit(dayIdx)} style={{background:"rgba(255,255,255,0.4)",border:"none",borderRadius:7,width:26,height:26,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:textCol}}>✏️</button>
                        <span style={{color:textCol,fontWeight:800,fontSize:17,fontFamily:"Georgia,serif"}}>{label}</span>
                      </div>
                    )}
                    {meals.length===0&&(
                      <div style={{color:textCol,opacity:0.7,fontSize:13,marginTop:3,paddingLeft:34}}>Tap + to add a meal</div>
                    )}
                  </div>
                  {/* Large + button matching reference */}
                  <button onClick={()=>openAddMeal(dayIdx)} style={{
                    width:44,height:44,borderRadius:"50%",
                    background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",
                    border:`1.5px solid ${border}`,
                    color:textCol,
                    fontSize:24,fontWeight:300,
                    cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    flexShrink:0,
                    boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
                    transition:"all 0.15s",
                  }}>+</button>
                </div>

                {/* Meals list */}
                {meals.length>0&&(
                  <div style={{padding:"0 18px 14px"}}>
                    {meals.map((meal,mi)=>(
                      <>
                      <div key={meal.id} style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,rowGap:6,padding:"8px 0",borderTop:"1px solid "+border,opacity:meal.had?0.6:1}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:textCol,flexShrink:0,opacity:0.6}}/>
                        <div style={{flex:"1 1 120px",minWidth:0}}><div style={{fontSize:14,fontWeight:600,color:textCol,lineHeight:1.4,textDecoration:meal.had?"line-through":"none"}}>{meal.text}</div>{meal.url&&<UrlBadge url={meal.url}/>}</div>
                        {meal.recipeId&&(()=>{const linkedRecipe=recipes.find(rx=>rx.id===meal.recipeId);return linkedRecipe?(<button onClick={()=>setRecipeDetail(linkedRecipe)} title="Open recipe" style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>📖</button>):null;})()}
                        <button onClick={()=>toggleMealHad(dayIdx,meal.id)} title={meal.had?"Mark as not had":"Mark as had — keeps it for next week"} style={{background:meal.had?"#5A7848":"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",color:meal.had?"#fff":textCol,border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✓</button>
                        <button onClick={()=>scheduleMeal(meal,label)} title="Calendar" style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",color:textCol,border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>📅</button>
                        <button onClick={()=>{const key=dayIdx+"-"+meal.id;setExpandedMeal(expandedMeal===key?null:key);}} title="Ingredients" style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",color:textCol,border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🥦</button>
                        <button onClick={()=>openEditMeal(dayIdx,meal)} style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",color:textCol,border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✏️</button>
                        <button onClick={()=>deleteMeal(dayIdx,meal.id)} style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",color:"#c0392b",border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🗑</button>
                      </div>
                      {/* Move to another day */}
                      {moveMealKey===dayIdx+"-"+meal.id&&(
                        <div style={{padding:"10px 12px 12px",borderTop:"1px solid "+border,background:"rgba(255,255,255,0.9)",borderRadius:12,margin:"4px 0 8px"}}>
                          <div style={{fontSize:13,fontWeight:800,color:"#2A4020",marginBottom:8}}>📆 Move "{meal.text}" to…</div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                            {plan.labels.map((lbl,ti)=>(
                              <button key={ti} disabled={ti===dayIdx} onClick={()=>moveMeal(dayIdx,meal.id,ti)}
                                style={{padding:"10px 6px",borderRadius:12,fontSize:13,fontWeight:700,cursor:ti===dayIdx?"default":"pointer",
                                  background:ti===dayIdx?"rgba(90,80,60,0.06)":"rgba(90,120,72,0.10)",color:ti===dayIdx?"#B0A898":"#1A1A10",
                                  border:ti===dayIdx?"1.5px dashed rgba(90,80,60,0.2)":"1.5px solid rgba(90,120,72,0.25)"}}>
                                {lbl}{ti===dayIdx?" (now)":""}
                              </button>
                            ))}
                          </div>
                          <button onClick={()=>setMoveMealKey(null)} style={{width:"100%",marginTop:8,padding:"8px",background:"none",border:"none",color:"#8A8070",fontWeight:700,fontSize:13,cursor:"pointer"}}>Cancel</button>
                        </div>
                      )}
                      {/* Ingredients panel */}
                      {expandedMeal===(dayIdx+"-"+meal.id)&&(
                        <div style={{padding:"10px 14px 14px",borderTop:"1px solid "+border,background:"rgba(255,255,255,0.25)"}}>
                          <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:13,color:textCol,marginBottom:8}}>🥦 Ingredients for {meal.text}</div>
                          {/* Ingredient list */}
                          <div style={{background:"rgba(255,255,255,0.55)",borderRadius:14,overflow:"hidden"}}>
                          {(meal.ingredients||[]).map((ig,igi)=>(
                            <div key={ig.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderTop:igi>0?"1px solid rgba(90,80,60,0.08)":"none"}}>
                              <button onClick={()=>toggleIngGot(dayIdx,meal.id,ig.id)}
                                style={{width:20,height:20,borderRadius:5,border:"1.5px solid "+(ig.got?"#5A7848":"rgba(90,120,72,0.4)"),background:ig.got?"#5A7848":"transparent",color:"#fff",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>
                                {ig.got?"✓":""}
                              </button>
                              <span style={{flex:1,fontSize:13,fontWeight:600,color:textCol,textDecoration:ig.got?"line-through":"none",opacity:ig.got?0.55:1}}>{ig.text}</span>
                              <button onClick={()=>sendSingleIngredientToShop(dayIdx,meal.id,ig.id,meal.text)} title="Send to Shopping list"
                                style={{background:"rgba(90,120,72,0.12)",border:"1px solid rgba(90,120,72,0.20)",borderRadius:7,width:26,height:26,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🛒</button>
                              <button onClick={()=>deleteIng(dayIdx,meal.id,ig.id)} title="Delete"
                                style={{background:"rgba(192,57,43,0.08)",border:"1px solid rgba(192,57,43,0.15)",borderRadius:7,width:26,height:26,cursor:"pointer",color:"#c0392b",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✕</button>
                            </div>
                          ))}
                          {(meal.ingredients||[]).length===0&&(
                            <div style={{padding:"10px",fontSize:12,color:textCol,opacity:0.6,textAlign:"center"}}>No ingredients yet — add some below</div>
                          )}
                          </div>
                          {/* Add ingredient */}
                          <div style={{display:"flex",gap:6,marginTop:8}}>
                            <input value={ingInput} onChange={e=>setIngInput(e.target.value)}
                              onKeyDown={e=>e.key==="Enter"&&addIngredient(dayIdx,meal.id,ingInput)}
                              placeholder="Add ingredient…"
                              style={{flex:1,padding:"7px 12px",borderRadius:20,border:`1.5px solid ${border}`,background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",fontSize:13,color:"#1A1A10",outline:"none"}}/>
                            <button onClick={()=>addIngredient(dayIdx,meal.id,ingInput)}
                              style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",border:`1.5px solid ${border}`,borderRadius:20,padding:"7px 14px",fontSize:12,fontWeight:700,color:textCol,cursor:"pointer"}}>+ Add</button>
                          </div>
                          {/* Action buttons */}
                          {(meal.ingredients||[]).length>0&&(
                            <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
                              <button onClick={()=>sendIngredientsToShop(dayIdx,meal.id,meal.text)}
                                style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:20,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>🛒 Send needed to Shopping</button>
                              <button onClick={()=>shareShoppingList(dayIdx,meal.id,meal.text)}
                                style={{background:"linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)",color:"#2A3820",border:"1.5px solid rgba(90,120,72,0.25)",borderRadius:20,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>📤 Share</button>
                            </div>
                          )}
                        </div>
                      )}
                      </>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Meal edit modal */}
      {editMeal!==null&&(
        <div style={{position:"fixed",inset:0,background:"rgba(58,80,38,0.20)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200}}>
          <div style={{background:C.wh,borderRadius:"22px 22px 0 0",padding:"0 0 30px",width:"100%",maxWidth:480,boxShadow:"0 -8px 40px rgba(45,10,94,0.4)"}}>
            <div style={{display:"flex",justifyContent:"center",padding:"12px 0 6px"}}>
              <div style={{width:40,height:4,borderRadius:2,background:C.ll}}/>
            </div>
            <div style={{padding:"0 20px"}}>
              <div style={{fontWeight:900,color:C.dp,fontSize:15,marginBottom:12}}>
                🍽️ {editMeal.mealId===null?"Add Meal":"Edit Meal"} — {plan.labels[editMeal.dayIdx]}
              </div>
              <input
                value={mealDraft}
                onChange={e=>setMealDraft(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter")saveMeal();if(e.key==="Escape")setEditMeal(null);}}
                autoFocus
                placeholder="e.g. Pasta, scrambled eggs, salad..."
                style={{width:"100%",boxSizing:"border-box",padding:"11px 14px",borderRadius:11,border:`2px solid ${C.lp}`,fontSize:15,fontWeight:600,color:C.txt,outline:"none",marginBottom:10}}
              />
              <UrlField value={mealUrl} onChange={setMealUrl} style={{marginBottom:16}}/>
              {/* Move this meal to a different day */}
              {editMeal.mealId!==null&&(
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:13,fontWeight:800,color:"#2A4020",marginBottom:8}}>📆 Move to another day</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {plan.labels.map((lbl,ti)=>{
                      const here=ti===editMeal.dayIdx;
                      return(
                        <button key={ti} disabled={here} onClick={()=>{
                            // save any text changes first, then move
                            const from=editMeal.dayIdx,id=editMeal.mealId;
                            const days=plan.days.map((d,i)=>i!==from?d:d.map(m=>m.id===id?{...m,text:mealDraft.trim()||m.text,url:mealUrl.trim()}:m));
                            const meal=days[from].find(m=>m.id===id); if(!meal)return;
                            const moved=days.map((d,i)=>i===from?d.filter(m=>m.id!==id):i===ti?[...(d||[]),meal]:d);
                            save({...plan,days:moved});
                            setEditMeal(null);
                          }}
                          style={{padding:"8px 12px",borderRadius:100,fontSize:13,fontWeight:700,cursor:here?"default":"pointer",
                            background:here?"#5A7848":"rgba(90,120,72,0.10)",color:here?"#fff":"#1A1A10",
                            border:here?"none":"1.5px solid rgba(90,120,72,0.25)"}}>
                          {lbl}{here?" ✓":""}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setEditMeal(null)} style={{flex:1,background:C.ll,color:C.mid,border:"none",borderRadius:12,padding:"12px",fontWeight:700,fontSize:14,cursor:"pointer"}}>Cancel</button>
                <button onClick={saveMeal} style={{flex:2,background:btnGrad,color:"#1A1A10",border:"none",borderRadius:12,padding:"12px",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:"0 3px 12px rgba(45,10,94,0.3)"}}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Label edit modal */}
      {editLabelIdx!==null&&(
        <div style={{position:"fixed",inset:0,background:"rgba(58,80,38,0.20)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200}}>
          <div style={{background:C.wh,borderRadius:"22px 22px 0 0",padding:"0 0 30px",width:"100%",maxWidth:480,boxShadow:"0 -8px 40px rgba(45,10,94,0.4)"}}>
            <div style={{display:"flex",justifyContent:"center",padding:"12px 0 6px"}}>
              <div style={{width:40,height:4,borderRadius:2,background:C.ll}}/>
            </div>
            <div style={{padding:"0 20px"}}>
              <div style={{fontWeight:900,color:C.dp,fontSize:15,marginBottom:12}}>📅 Rename Day {editLabelIdx+1}</div>
              <input
                value={labelDraft}
                onChange={e=>setLabelDraft(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter")saveLabelEdit();if(e.key==="Escape")setEditLabelIdx(null);}}
                autoFocus
                placeholder={`e.g. Monday, 12 May, Day ${editLabelIdx+1}...`}
                style={{width:"100%",boxSizing:"border-box",padding:"11px 14px",borderRadius:11,border:`2px solid ${C.lp}`,fontSize:15,fontWeight:600,color:C.txt,outline:"none",marginBottom:16}}
              />
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setEditLabelIdx(null)} style={{flex:1,background:C.ll,color:C.mid,border:"none",borderRadius:12,padding:"12px",fontWeight:700,fontSize:14,cursor:"pointer"}}>Cancel</button>
                <button onClick={saveLabelEdit} style={{flex:2,background:btnGrad,color:"#1A1A10",border:"none",borderRadius:12,padding:"12px",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:"0 3px 12px rgba(45,10,94,0.3)"}}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   IDEAS 2.0 — Goals with mountain climber progress,
   step breakdown, micro-steps, AI automation,
   image/link per step, send to Calendar/To Do List/Matrix/MindMap
═══════════════════════════════════════════════════════ */
const IDEA_TAGS=["💡 Idea","📱 App","🎨 Creative","💰 Business","🔮 Spiritual","✍️ Writing","🏠 Home","Other"];
const TAG_COLORS={"💡 Idea":"#f39c12","📱 App":"#2980b9","🎨 Creative":"#9b59b6","💰 Business":"#27ae60","🔮 Spiritual":"#8e44ad","✍️ Writing":"#c2185b","🏠 Home":"#e67e22","Other":"#7f8c8d"};
const STATUSES=[
  {key:"spark",   label:"✨ Spark",      color:"#f39c12"},
  {key:"develop", label:"🔧 Developing", color:"#2980b9"},
  {key:"ready",   label:"🚀 Ready",      color:"#27ae60"},
  {key:"done",    label:" Done",       color:"#7f8c8d"},
];
const statusByKey=k=>STATUSES.find(s=>s.key===k)||STATUSES[0];

/* ── Mountain SVG — pct 0–100 shows climber progress ── */
// ═══════════════════════════════════════════════════════════
//   HOUSEWORK  — clean rebuild
// ═══════════════════════════════════════════════════════════

function Housework({setScreen,onMoveToPri,hwZones,saveTasksRef}){
  // Inject confetti animation
  React.useEffect(()=>{
    const style=document.createElement('style');
    style.innerHTML=`
      @keyframes confettiFall {
        0%{transform:translateY(0) rotate(0deg);opacity:1;}
        100%{transform:translateY(110vh) rotate(720deg);opacity:0;}
      }
      @keyframes popIn {
        0%{transform:scale(0.5);opacity:0;}
        100%{transform:scale(1);opacity:1;}
      }
    `;
    document.head.appendChild(style);
    return()=>document.head.removeChild(style);
  },[]);
  const MULTI="linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)";
  const MOT=[
    "That's one down! You're doing brilliantly! 🌟",
    "Yes!! Look at you go! 💪",
    "One less thing to worry about — you're amazing! 🌿",
    "Smashing it! Every task counts! ✨",
    "You're on fire! Keep going! 🔥",
    "Brilliant work! Your home thanks you! 🏡",
    "Tick! That felt good, didn't it? 🎉",
    "Another one done! You should be proud! 🦔",
    "Look at you crushing it! 💫",
    "That's the spirit! One task at a time! 🌸",
    "You're making this home shine! ⭐",
    "Every small step adds up — well done! 🌈",
  ];
  const CHORE_DONE_MSGS=[
    {title:"Nailed it! 🎉",msg:"One task down — you're unstoppable!"},
    {title:"YES!! 🌟",msg:"Your home is getting cleaner every minute!"},
    {title:"Brilliant! 💪",msg:"That's one less thing on your mind — amazing!"},
    {title:"You did it! ✨",msg:"Every task you complete is a win for you and your home!"},
    {title:"Look at you go! 🔥",msg:"Seriously impressive — keep that energy!"},
    {title:"One down! 🦔",msg:"Thinko is proud of you — now what's next?"},
    {title:"Smashing it! 🏡",msg:"Your future self will thank you for this!"},
    {title:"Incredible! 🌈",msg:"You showed up and got it done — that's everything!"},
  ];

  // ── Persistent state ──
  const load=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch{return d;}};
  const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}};

  const [profile,setProfile]=useState(()=>load('hw_profile',null));
  const [zones,setZonesRaw]=useState(()=>{
    const clean=arr=>arr?arr.filter(z=>z.id!=='shed'&&z.id!=='garage'):arr; // remove old shed/garage zones
    const z=load('hw_zones',null);
    if(z) return clean(z);
    // Try old key thinko_hw_zones
    const old1=load('thinko_hw_zones',null);
    if(old1) return clean(old1);
    // Try thinko_hw_cats for zone structure
    const old2=load('thinko_hw_cats',null);
    if(old2){
      return clean(Object.values(old2).map(z=>({id:z.id,name:z.name,icon:z.icon,color:z.color,rooms:z.rooms||[]})));
    }
    return null;
  });
  const saveZones=z=>{
    setZonesRaw(prev=>{
      const next=typeof z==='function'?z(prev):z;
      save('hw_zones',next);
      return next;
    });
  };

  // Tasks stored as {zoneId:[{id,name,score,done}]}
  const [tasks,setTasksRaw]=useState(()=>{
    // Try new key first, then migrate from old keys
    const t=load('hw_tasks',null);
    if(t) return t;
    // Try old key thinko_hw_tasks
    const old1=load('thinko_hw_tasks',null);
    if(old1) return old1;
    // Try thinko_hw_cats (extract tasks from old structure)
    const old2=load('thinko_hw_cats',null);
    if(old2){
      const migrated={};
      Object.keys(old2).forEach(zoneId=>{
        if(old2[zoneId]?.tasks?.length>0) migrated[zoneId]=old2[zoneId].tasks;
      });
      if(Object.keys(migrated).length>0) return migrated;
    }
    return {};
  });
  const saveTasks=t=>{
    setTasksRaw(prev=>{
      const next=typeof t==='function'?t(prev):t;
      save('hw_tasks',next);
      return next;
    });
  };
  // Expose saveTasks to parent via ref
  useEffect(()=>{if(saveTasksRef)saveTasksRef.current=saveTasks;},[]);

  const getZT=zid=>tasks[zid]||[];

  // ── UI state ──
  const [view,setView]=useState('hub'); // hub | zone | setup | ai | avb | avbdone
  const [activeZone,setActiveZone]=useState(null);
  const [setupStep,setSetupStep]=useState(0);
  const [setupAnswers,setSetupAnswers]=useState({});
  const [multiSel,setMultiSel]=useState([]);
  const [otherText,setOtherText]=useState('');
  const [aiAnswers,setAiAnswers]=useState([]);
  const [aiStep,setAiStep]=useState(0);
  const [aiLoading,setAiLoading]=useState(false);
  const [pairs,setPairs]=useState([]);
  const [pairIdx,setPairIdx]=useState(0);
  const [ranked,setRanked]=useState([]);
  const [avbTasks,setAvbTasks]=useState([]); // round-robin task list
  const [avbWins,setAvbWins]=useState({});   // win counts per task id
  // Binary-insertion sort state (exact ordering)
  const [sortedList,setSortedList]=useState([]); // already-placed items, best to worst
  const [pendingQueue,setPendingQueue]=useState([]); // items waiting to be inserted
  const [insLo,setInsLo]=useState(0);
  const [insHi,setInsHi]=useState(0);
  const [totalComparisons,setTotalComparisons]=useState(0);
  const [doneComparisons,setDoneComparisons]=useState(0);
  const [celebration,setCelebration]=useState(null);
  const [taskCelebration,setTaskCelebration]=useState(null);
  const [confetti,setConfetti]=useState([]);
  const [motivMsg,setMotivMsg]=useState(null);
  const [newTask,setNewTask]=useState('');
  const [dismissed,setDismissed]=useState(()=>load('hw_dismissed',[]));
  const saveDismissed=d=>{setDismissed(d);save('hw_dismissed',d);};
  const [customChores,setCustomChores]=useState(()=>load('hw_custom_chores',{})); // {zoneId:[names]}
  const saveCustomChores=c=>{
    // dedup each zone's list on every save
    const deduped=Object.fromEntries(Object.entries(c).map(([k,v])=>[k,[...new Set(v)]]));
    setCustomChores(deduped);save('hw_custom_chores',deduped);
  };
  const [newChoreName,setNewChoreName]=useState('');
  const [showTemplates,setShowTemplates]=useState(false);
  const [dragTask,setDragTask]=useState(null);
  const [showAddZone,setShowAddZone]=useState(false);
  const [moveChoreMenu,setMoveChoreMenu]=useState(null); // taskId

  const [newZoneName,setNewZoneName]=useState('');
  const [newZoneIcon,setNewZoneIcon]=useState('📋');
  const [editingChoreId,setEditingChoreId]=useState(null);
  const [chorePickerOpenId,setChorePickerOpenId]=useState(null);
  const [editChoreText,setEditChoreText]=useState('');
  const [showBorrow,setShowBorrow]=useState(false);
  const avbLockRef=useRef(false);
  const [borrowZone,setBorrowZone]=useState(null); // which other zone's dropdown is open
  const [borrowedIds,setBorrowedIds]=useState([]); // [{taskId, fromZone}]
  const [dragZone,setDragZone]=useState(null);
  const [dragOverZone,setDragOverZone]=useState(null);
  const [dragOver,setDragOver]=useState(null);

  // Focus timer
  const [timerOn,setTimerOn]=useState(false);
  const [timerLeft,setTimerLeft]=useState(25*60);
  const [timerMins,setTimerMins]=useState(25);
  const timerRef=useRef(null);
  useEffect(()=>{
    if(timerOn&&timerLeft>0){timerRef.current=setInterval(()=>setTimerLeft(l=>l-1),1000);}
    else{clearInterval(timerRef.current);if(timerLeft===0&&timerOn)setTimerOn(false);}
    return()=>clearInterval(timerRef.current);
  },[timerOn,timerLeft]);
  const fmtT=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const resetTimer=()=>{setTimerOn(false);setTimerLeft(timerMins*60);};

  const SCORE_C={1:"#E03020",2:"#E07020",3:"#D4A020",4:"#5A7848",5:"#4878A8"};
  const SCORE_L={1:"Urgent",2:"High",3:"Medium",4:"Low",5:"Whenever"};

  // ── SETUP ──
  const SETUP=[
    {id:'upstairs',q:"Do you have an upstairs?",opts:["Yes","No"]},
    {id:'bedrooms',q:"What bedrooms do you have upstairs?",opts:["My bedroom","Kids bedroom(s)","Spare room","Guest room","Other"],multi:true},
    {id:'upstairs_rooms',q:"Any other upstairs rooms?",opts:["Bathroom","Upstairs toilet","Landing","Study/Office","None"],multi:true},
    {id:'downstairs',q:"What rooms do you have downstairs?",opts:["Living room","Kitchen","Hallway","Downstairs toilet","Dining room","Utility room","Other"],multi:true},
    {id:'garden',q:"Do you have a garden?",opts:["Yes","No"]},
    {id:'garden_features',q:"What does your garden have?",opts:["Lawn","Plants/Flower beds","Patio/Decking","Shed","Greenhouse","Vegetable patch","Log cabin","Other"],multi:true},
    {id:'cupboards',q:"Any cupboards to organise?",opts:["Bedroom wardrobes","Airing/linen cupboard","Food cupboards","Cleaning/laundry cupboard","Under stairs","None"],multi:true},
  ];

  const buildZones=(ans)=>{
    const z=[];
    if(ans.upstairs==="Yes"){
      const rooms=[...(ans.bedrooms||[]),(ans.upstairs_rooms||[]).filter(r=>r!=="None")].flat().filter(r=>r&&typeof r==="string");
      z.push({id:'upstairs',name:'Upstairs',icon:'🛏️',color:'#6878B8',rooms});
    }
    const down=ans.downstairs||[];
    if(down.length>0) z.push({id:'downstairs',name:'Downstairs',icon:'🛋️',color:'#7A8A5A',rooms:down});
    if(ans.garden==="Yes"){
      z.push({id:'garden',name:'Garden',icon:'🌿',color:'#4A8A5A',rooms:ans.garden_features||[]});
    }
    // Safety net: never let setup silently delete a zone that already has chores saved in it.
    // If a zone existed before and has tasks, keep it even if this run of setup says "No".
    const existing=zones||[];
    existing.forEach(ez=>{
      const hasChores=(getZT(ez.id)||[]).length>0;
      const stillIncluded=z.some(nz=>nz.id===ez.id);
      if(hasChores&&!stillIncluded) z.push(ez);
    });
    return z;
  };

  // ── AI QUESTIONS ──
  const getAIQuestions=(zoneId,prof)=>{
    const z=zones?.find(z=>z.id===zoneId);
    // Flatten rooms - ensure all are strings, not arrays
    const rooms=(z?.rooms||[]).flat().filter(r=>r&&typeof r==='string');
    const qs=[];
    if(zoneId==='upstairs'){
      rooms.forEach(r=>{
        const rl=r.toLowerCase();
        if(rl.includes('bedroom')||rl.includes('room')&&!rl.includes('bath')&&!rl.includes('toilet'))
          qs.push({q:`${r} — when did you last change the bedding?`,opts:["This week","Last week","Two weeks ago","Can't remember"]},{q:`${r} — how tidy is it?`,opts:["Really messy","Getting messy","Could do with a tidy","Fine"]});
        else if(rl.includes('bathroom')) qs.push({q:"Bathroom — how dirty is the toilet?",opts:["Really bad","Needs a clean","Could do with a wipe","Fine"]},{q:"Bathroom — how is the bath/shower?",opts:["Really dirty","Needs a clean","Just a quick wipe","Fine"]});
        else if(rl.includes('toilet')) qs.push({q:"Upstairs toilet — how dirty is it?",opts:["Really bad","Needs a clean","Could do with a wipe","Fine"]});
        else if(rl.includes('landing')) qs.push({q:"Landing — does it need hoovering?",opts:["Really needs it","Yes","Wouldn't hurt","No"]});
        else if(rl.includes('wardrobe')) qs.push({q:"Bedroom wardrobes — how are they?",opts:["Can't close them","Really cluttered","Could do with a sort","Fine","Skip for now"]});
        else if(rl.includes('airing')) qs.push({q:"Airing cupboard — how is it?",opts:["Really need a sort","Getting messy","Could do with a tidy","Fine","Skip for now"]});
      });
      qs.push({q:"Upstairs floors — do they need hoovering?",opts:["Really needs it","Yes","Wouldn't hurt","No"]});
      qs.push({q:"Do the stairs need hoovering?",opts:["Really needs it","Yes","Wouldn't hurt","No stairs"]});
      qs.push({q:"Upstairs surfaces — do they need cleaning?",opts:["Really grimy","Needs a wipe","Could do with a wipe","Fine"]});
      qs.push({q:"Any bins/rubbish to take out upstairs?",opts:["Yes urgently","Yes","Could do soon","No"]});
    }
    if(zoneId==='downstairs'){
      rooms.forEach(r=>{
        const rl=r.toLowerCase();
        if(rl.includes('kitchen')) qs.push({q:"Kitchen — how are the dishes?",opts:["Overflowing","Pretty bad","Just a few","All done"]},{q:"Kitchen — how are the surfaces?",opts:["Really grimy","Sticky patches","Could do with a wipe","Clean"]});
        else if(rl.includes('living')) qs.push({q:"Living room — how is it?",opts:["Really messy","Getting cluttered","Could do with a hoover","Fine"]},{q:"How is the sofa?",opts:["Really needs a tidy","Cushions everywhere","Could do with a straighten","Fine"]});
        else if(rl.includes('toilet')||rl.includes('bathroom')) qs.push({q:`${r} — how dirty is the toilet?`,opts:["Really bad","Needs a clean","Could do with a wipe","Fine"]},{q:"How is the sink?",opts:["Really dirty","Needs a clean","Just a quick wipe","Fine"]});
        else if(rl.includes('hallway')) qs.push({q:"Hallway — how is the floor?",opts:["Filthy","Needs a mop","Could do with a sweep","Fine"]});
        else if(rl.includes('dining')) qs.push({q:"Dining room — how is it?",opts:["Needs a proper clean","Getting messy","Could do with a wipe","Fine"]});
        else if(rl.includes('food cupboard')) qs.push({q:"Food cupboards — how are they?",opts:["Really need a clear out","Getting cluttered","Could do with a tidy","Fine","Skip for now"]});
        else if(rl.includes('cleaning')) qs.push({q:"Cleaning cupboard — how is it?",opts:["Really need a sort","Getting messy","Could do with a tidy","Fine","Skip for now"]});
      });
      qs.push({q:"Downstairs floors — do they need hoovering?",opts:["Really needs it","Yes","Wouldn't hurt","No"]});
      qs.push({q:"Downstairs floors — do they need mopping?",opts:["Really needs it","Yes after hoovering","Wouldn't hurt","No"]});
      qs.push({q:"Downstairs surfaces — do they need cleaning?",opts:["Really grimy","Sticky patches","Could do with a wipe","Fine"]});
      qs.push({q:"Any bins/rubbish to take out?",opts:["Yes urgently","Yes","Could do soon","No"]});
      qs.push({q:"How is the laundry situation?",opts:["Overflowing — urgent","Needs doing today","A small load","All on top of it"]});
      qs.push({q:"Do you need to think about dinner today?",opts:["Yes — nothing planned","Yes — need to prep","Something simple sorted","All sorted"]});
    }
    if(zoneId==='garden'){
      const gf=(prof?.garden_features||rooms).flat().filter(r=>r&&typeof r==='string');
      if(gf.some(f=>f.toLowerCase().includes('lawn'))) qs.push({q:"How is the lawn?",opts:["Very overgrown","Getting long","About right","Just done"]});
      qs.push({q:"How bad are the weeds?",opts:["Taking over","Pretty bad","A few weeds","Under control"]});
      if(gf.some(f=>f.toLowerCase().includes('plant'))) qs.push({q:"How are the plants/flower beds?",opts:["Need watering urgently","Getting weedy","Could do with a tidy","Fine"]});
      if(gf.some(f=>f.toLowerCase().includes('patio'))) qs.push({q:"How is the patio/decking?",opts:["Needs a power wash","Getting dirty","Could do with a sweep","Fine"]});
      if(gf.some(f=>f.toLowerCase().includes('shed'))) qs.push({q:"How is the shed?",opts:["Can't find anything","Pretty cluttered","Could do with a tidy","Fine"]});
      if(gf.some(f=>f.toLowerCase().includes('greenhouse'))) qs.push({q:"How are the greenhouse plants?",opts:["Need watering urgently","Getting dry","Could do with a tidy","Fine"]});
      if(gf.some(f=>f.toLowerCase().includes('veg'))) qs.push({q:"How is the veg patch?",opts:["Urgent attention","Getting weedy","Needs watering","Fine"]});
      if(gf.some(f=>f.toLowerCase().includes('log')||f.toLowerCase().includes('cabin'))) qs.push({q:"How is the log cabin?",opts:["Needs a clean","Getting very messy","Could do with a tidy","Fine"]});
      if(gf.some(f=>f.toLowerCase().includes('pond'))) qs.push({q:"How is the pond?",opts:["Needs cleaning urgently","Getting green","Could do with a tidy","Fine"]});
      qs.push({q:"Any planting or sowing needed?",opts:["Yes urgently","Yes soon","Not right now","No"]});
    }
    if(zoneId==='garage'){
      qs.push({q:"How cluttered is it?",opts:["Can't get in","Pretty bad","A bit untidy","Fine"]});
      qs.push({q:"Does the floor need sweeping?",opts:["Really needs it","Yes","Wouldn't hurt","No"]});
    }
    if(qs.length===0) qs.push({q:`How does ${z?.name||'this area'} look?`,opts:["Really needs doing","Getting bad","Could do with a clean","Fine"]});
    return qs;
  };

  const PRESETS={
    upstairs:["Tidy all floors","Hoovering","Hoover stairs","Clean stairs","Mop bathroom floor","Robo mop floors","Clean surfaces","Clean windows","Clean mirrors","Clean doors","Change bedding","Tidy bedroom","Clean bathroom","Clean toilet","Bleach toilet","Clean bath/shower","Take rubbish out","Iron clothes","Organise clothes","Put away laundry","Take laundry upstairs","Put laundry load in","Air freshener","Brush hair","Get dressed","Make up","Brush teeth"],
    downstairs:["Tidy all floors","Hoovering","Hoover stairs","Clean stairs","Mop floors","Robo mop floors","Clean surfaces","Clean windows","Clean mirrors","Clean doors","Wash up","Clean kitchen sides","Tidy sofa","Tidy living room","Clean downstairs toilet","Bleach toilet","Take rubbish out","Clean oven","Wipe cupboards","Take laundry out","Put laundry load in","Iron clothes","Air freshener","Make dinner","Make fruit juice/smoothie","Tidy food cupboard","Sort cleaning cupboard","Tidy under stairs"],
    garden:["Tidy garden","Mow lawn","Weed","Water plants","Water greenhouse","Sweep path","Trim edges","Clear leaves","Tidy patio","Tidy shed","Organise shed","Plant/sow","Tidy flower beds","Clean pond","Tidy log cabin","Prune","Deadhead flowers"],
    garage:["Sweep floor","Tidy tools","Organise shelves","Take rubbish out","Clear clutter"],
  };
  const allPresetsForZone=activeZone?[...(PRESETS[activeZone]||[]),...(customChores[activeZone]||[])]:[]; // must be after PRESETS

  // Split "X and Y" tasks into separate tasks
  const splitTask=(name)=>{
    if(/ and /i.test(name)){
      const parts=name.split(/ and /i).map(p=>p.trim()).filter(p=>p.length>2);
      if(parts.length===2) return parts.map(p=>p.charAt(0).toUpperCase()+p.slice(1));
    }
    return [name];
  };

  const addTask=(zoneId,name,score,reason)=>{
    const names=splitTask(name);
    const existing=getZT(zoneId);
    const newTasks=names
      .filter(n=>!existing.some(t=>t.name.toLowerCase()===n.toLowerCase()))
      .map(n=>({id:Date.now()+Math.random(),name:n,score:score||3,reason:reason||'',done:false,color:(score||3)<=2?'red':'lilac'}));
    if(newTasks.length===0) return;
    const updated={...tasks,[zoneId]:[...existing,...newTasks].sort((a,b)=>a.score-b.score)};
    saveTasks(updated);
  };

  const tickDone=(zoneId,taskId)=>{
    const zt=getZT(zoneId);
    const task=zt.find(t=>t.id===taskId);
    const wasDone=task?.done;
    const updated={...tasks,[zoneId]:zt.map(t=>t.id===taskId?{...t,done:!t.done}:t)};
    saveTasks(updated);
    if(!wasDone){
      // Show task celebration popup
      const msg=CHORE_DONE_MSGS[Math.floor(Math.random()*CHORE_DONE_MSGS.length)];
      setTaskCelebration({title:msg.title,msg:msg.msg,task:task?.name||''});
      // Generate confetti
      const pieces=Array.from({length:40},(_,i)=>({
        id:i,x:Math.random()*100,delay:Math.random()*0.8,
        color:['#5A7848','#C07040','#4878A8','#D4A020','#E07020','#9b59b6','#e67e22','#1abc9c'][Math.floor(Math.random()*8)],
        size:Math.random()*8+4,
        rotation:Math.random()*360,
      }));
      setConfetti(pieces);
      setTimeout(()=>{setTaskCelebration(null);setConfetti([]);},3500);
      // Check if all tasks done
      if(updated[zoneId].filter(t=>!t.done).length===0&&updated[zoneId].length>0){
        setTimeout(()=>setCelebration({zoneId,name:zones?.find(z=>z.id===zoneId)?.name||''}),3600);
      }
    }
  };

  const delTask=(zoneId,taskId)=>saveTasks(prev=>({...prev,[zoneId]:(prev[zoneId]||[]).filter(t=>t.id!==taskId)}));
  const editChore=(zoneId,taskId,newName)=>saveTasks(prev=>({...prev,[zoneId]:(prev[zoneId]||[]).map(t=>t.id===taskId?{...t,name:newName}:t)}));
  const laterChore=(zoneId,taskId)=>saveTasks(prev=>({...prev,[zoneId]:(prev[zoneId]||[]).map(t=>t.id===taskId?{...t,later:!t.later}:t)}));
  const colorChore=(zoneId,taskId,color)=>saveTasks(prev=>({...prev,[zoneId]:(prev[zoneId]||[]).map(t=>t.id===taskId?{...t,color}:t)}));

  // ── A vs B ──
  // Build pairs that compare EVERY task against several others (not just neighbours)
  // ── Exact binary-insertion sort ──
  // Guarantees mathematically correct order with minimum comparisons (~n*log2(n))
  const startAvB=()=>{
    const ownTasks=getZT(activeZone).filter(t=>!t.done&&!t.later).map(t=>({...t,_fromZone:activeZone}));
    const borrowed=borrowedIds.map(b=>{
      const zt=getZT(b.fromZone);
      const t=zt.find(x=>x.id===b.taskId);
      return t?{...t,_fromZone:b.fromZone,_borrowed:true}:null;
    }).filter(Boolean);
    const todo=[...ownTasks,...borrowed];
    if(todo.length<2){alert("Add at least 2 chores first!");return;}
    // Binary insertion sort — much fewer comparisons than round-robin
    const shuffled=[...todo].sort(()=>Math.random()-0.5);
    setAvbTasks(shuffled);
    setSortedList([shuffled[0]]);
    setPendingQueue(shuffled.slice(1));
    setInsLo(0);
    setInsHi(1);
    setDoneComparisons(0);
    setView('avb');
  };

  const chooseAvB=(winner)=>{
    if(avbLockRef.current)return;
    avbLockRef.current=true;
    const pendingItem=pendingQueue[0];
    const mid=Math.floor((insLo+insHi)/2);
    const pendingWon=winner.id===pendingItem.id;
    let newLo=insLo, newHi=insHi;
    if(pendingWon) newHi=mid; else newLo=mid+1;
    setDoneComparisons(d=>d+1);
    if(newLo>=newHi){
      const newSorted=[...sortedList];
      newSorted.splice(newLo,0,pendingItem);
      const newQueue=pendingQueue.slice(1);
      setSortedList(newSorted);
      setPendingQueue(newQueue);
      if(newQueue.length===0){
        finishSort(newSorted);
      } else {
        setInsLo(0);setInsHi(newSorted.length);
      }
    } else {
      setInsLo(newLo);setInsHi(newHi);
    }
    setTimeout(()=>{avbLockRef.current=false;},200);
  };

  const finishSort=(sortedList)=>{
    // Assign scores based on position
    const n=sortedList.length;
    const withScores=sortedList.map((t,i)=>{
      const pct=n>1?i/(n-1):0;
      const score=Math.max(1,Math.min(5,Math.round(1+pct*4)));
      return {...t,score};
    });

    // Group by zone — ranked tasks in their sorted order, done tasks appended after
    const byZone={};
    withScores.forEach(t=>{
      const fz=t._fromZone||activeZone;
      if(!byZone[fz]) byZone[fz]={ranked:[],doneIds:new Set()};
      byZone[fz].ranked.push(t);
    });

    saveTasks(prev=>{
      const updated={...prev};
      Object.keys(byZone).forEach(fz=>{
        const existingDone=(prev[fz]||[]).filter(t=>t.done);
        // Save: ranked (not-done) in priority order, then done tasks at the end
        const cleanRanked=byZone[fz].ranked.map(t=>{
          const {_fromZone,_borrowed,...clean}=t;
          return clean;
        });
        updated[fz]=[...cleanRanked,...existingDone];
      });
      return updated;
    });

    setBorrowedIds([]);
    setMotivMsg('🏆 Chores ranked! Your priority order is ready.');
    setTimeout(()=>setMotivMsg(null), 3000);
    setView('zone');
  };



  if(view==='avb'){
    if(!pendingQueue||pendingQueue.length===0){setView('zone');return null;}
    const pendingItem=pendingQueue[0];
    const mid=Math.floor((insLo+insHi)/2);
    const pivot=sortedList[mid];
    if(!pivot){setView('zone');return null;}
    // Self-comparison safety net
    if(pivot.id===pendingItem.id){
      const ns=[...sortedList];ns.splice(mid,0,pendingItem);
      const nq=pendingQueue.slice(1);
      setSortedList(ns);setPendingQueue(nq);
      if(nq.length===0){finishSort(ns);}else{setInsLo(0);setInsHi(ns.length);}
      return null;
    }
    const totalComparisons=avbTasks.length<=1?1:avbTasks.reduce((acc,_,i)=>i===0?acc:acc+Math.ceil(Math.log2(i+1)),0);
    const pct=Math.min(100,Math.round((doneComparisons/Math.max(1,totalComparisons))*100));
    const taskA=pendingItem;
    const taskB=pivot;
    return(
      <div style={{minHeight:'100vh',background:'transparent',fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
        <div style={{background:MULTI,padding:'14px 18px',display:'flex',alignItems:'center',gap:12,borderBottom:'1px solid rgba(90,80,60,0.08)',position:'sticky',top:0,zIndex:50}}>
          <button onClick={()=>setView('zone')} style={{background:'none',border:'none',cursor:'pointer',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{fontFamily:'Georgia,serif',fontWeight:700,fontSize:18,color:'#1A1A10',flex:1}}>Which is more urgent?</div>
          <div style={{fontSize:12,color:'#5A4A30',fontWeight:700}}>{sortedList.length} placed · {pendingQueue.length} left</div>
        </div>
        <div style={{padding:'20px 16px'}}>
          <div style={{height:4,borderRadius:2,background:'rgba(90,80,60,0.10)',marginBottom:16,overflow:'hidden'}}>
            <div style={{height:'100%',width:`${pct}%`,background:'#5A7848',borderRadius:2,transition:'width 0.3s'}}/>
          </div>
          <div style={{fontSize:12,color:'#3A2A18',fontWeight:700,marginBottom:20,textAlign:'center',background:'rgba(255,255,255,0.55)',borderRadius:10,padding:'5px 14px',display:'inline-block'}}>
            Comparing {avbTasks.length} chore{avbTasks.length!==1?'s':''} · {pendingQueue.length} left to place
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            {[{label:'A',task:taskA},{label:'B',task:taskB}].map(({label,task})=>(
              <button key={task.id+label} onClick={()=>chooseAvB(task)}
                style={{background:MULTI,border:'2px solid rgba(180,160,140,0.25)',borderRadius:20,padding:'20px',textAlign:'left',cursor:'pointer',display:'flex',alignItems:'center',gap:14,boxShadow:'0 2px 12px rgba(0,0,0,0.07)',userSelect:'none',WebkitUserSelect:'none'}}>
                <div style={{width:38,height:38,borderRadius:'50%',background:'linear-gradient(135deg,#5A7848,#3A5828)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Georgia,serif',fontWeight:800,fontSize:18,flexShrink:0}}>{label}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:16,color:'#1A1A10'}}>{task.name}</div>
                  {task._borrowed&&<div style={{fontSize:10,color:'#5A7040',fontWeight:600,background:'rgba(90,120,72,0.10)',borderRadius:8,padding:'1px 6px',marginTop:3,display:'inline-block'}}>🔄 {zones?.find(z=>z.id===task._fromZone)?.name}</div>}
                </div>
              </button>
            ))}
          </div>
          <div style={{marginTop:14,color:'#5A4A30',fontWeight:700,fontSize:12,textAlign:'center',background:'rgba(255,255,255,0.55)',borderRadius:10,padding:'5px 14px',display:'inline-block'}}>
            Tap the one that matters more right now
          </div>
        </div>
      </div>
    );
  }

  // ── A vs B DONE ──
  if(view==='avbdone'){
    // If ranked not ready yet (React batching), just wait - don't redirect
    if(!ranked||ranked.length===0) return null;
    const todo=ranked.filter(t=>!t.done);
    return(
      <div style={{minHeight:'100vh',background:'transparent',fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
        <div style={{background:MULTI,padding:'14px 18px',display:'flex',alignItems:'center',gap:12,borderBottom:'1px solid rgba(90,80,60,0.08)',position:'sticky',top:0,zIndex:50}}>
          <button onClick={()=>setView('zone')} style={{background:'none',border:'none',cursor:'pointer',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{fontFamily:'Georgia,serif',fontWeight:700,fontSize:18,color:'#1A1A10',flex:1}}>🏆 Your priority list!</div>
        </div>
        <div style={{padding:'16px'}}>
          <div style={{background:MULTI,borderRadius:20,padding:'16px 18px',marginBottom:14,textAlign:'center',border:'1.5px solid rgba(90,120,72,0.25)',boxShadow:'0 4px 18px rgba(90,120,72,0.15)'}}>
            <div style={{fontSize:12,color:'#5A4A30',marginBottom:4,fontWeight:600}}>Start with</div>
            <div style={{fontFamily:'Georgia,serif',fontWeight:700,fontSize:18,color:'#1A2810'}}>{todo[0]?.name||'Your first chore'}</div>
          </div>
          <div style={{fontSize:10,color:'#5A4A30',textAlign:'center',marginBottom:8,fontWeight:700,background:'rgba(255,255,255,0.55)',borderRadius:8,padding:'4px 10px',display:'inline-block'}}>⠿ Hold to drag and reorder if you'd like it different</div>
          {todo.map((t,i)=>(
            <div key={t.id}
              style={{background:MULTI,borderRadius:14,padding:'11px 13px',marginBottom:8,boxShadow:'0 2px 8px rgba(0,0,0,0.05)',border:'1.5px solid transparent'}}>
              {/* Chore name — full width on top, tap to edit */}
              {editingChoreId===t.id?(
                <div style={{display:'flex',gap:6,marginBottom:8}}>
                  <input value={editChoreText} onChange={e=>setEditChoreText(e.target.value)}
                    onKeyDown={e=>{
                      if(e.key==='Enter'){if(editChoreText.trim())editChore(activeZone,t.id,editChoreText.trim());setEditingChoreId(null);}
                      if(e.key==='Escape')setEditingChoreId(null);
                    }}
                    autoFocus
                    style={{flex:1,fontWeight:700,fontSize:15,padding:'6px 10px',borderRadius:10,border:'1.5px solid rgba(90,120,72,0.30)',color:'#1A1A10',outline:'none'}}/>
                  <button onClick={()=>{if(editChoreText.trim())editChore(activeZone,t.id,editChoreText.trim());setEditingChoreId(null);}}
                    style={{background:'#5A7848',color:'#fff',border:'none',borderRadius:10,padding:'6px 14px',fontSize:13,fontWeight:700,cursor:'pointer'}}>Save</button>
                </div>
              ):(
                <div onClick={()=>{setEditChoreText(t.name);setEditingChoreId(t.id);}} style={{fontWeight:700,fontSize:16,lineHeight:1.4,color:'#1A1A10',cursor:'pointer',marginBottom:8,overflowWrap:'break-word'}}>{t.name}</div>
              )}
              {/* Controls row — number, drag, colour, actions */}
              <div style={{display:'flex',alignItems:'center',gap:9}}>
                <div style={{width:28,height:28,borderRadius:8,background:SCORE_C[t.score],display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12,fontWeight:800,flexShrink:0}}>{i+1}</div>

                <div style={{position:'relative',flexShrink:0}}>
                  <button onClick={()=>setChorePickerOpenId(chorePickerOpenId===t.id?null:t.id)}
                    style={{width:22,height:22,borderRadius:'50%',cursor:'pointer',padding:0,background:swatchById(t.color||'lilac').fill,border:`2.5px solid ${swatchById(t.color||'lilac').border}`,boxShadow:'0 1px 4px rgba(0,0,0,0.12)'}}/>
                  {chorePickerOpenId===t.id&&<ColourPicker current={t.color} onChange={c=>colorChore(activeZone,t.id,c)} onClose={()=>setChorePickerOpenId(null)}/>}
                </div>
                <div style={{flex:1}}/>
                <button onClick={()=>tickDone(activeZone,t.id)} style={{background:MULTI,border:'1.5px solid rgba(90,120,72,0.25)',borderRadius:9,width:32,height:32,fontSize:15,fontWeight:700,color:'#3A5828',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>✓</button>
                <button onClick={()=>delTask(activeZone,t.id)} style={{background:'rgba(200,80,60,0.08)',border:'1.5px solid rgba(200,80,60,0.15)',borderRadius:9,width:32,height:32,fontSize:13,fontWeight:700,color:'#C04030',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
              </div>
            </div>
          ))}

          {done.length>0&&(
            <div style={{marginTop:14}}>
              <div style={{fontSize:11,fontWeight:700,color:'#5A4A30',marginBottom:7,textTransform:'uppercase',letterSpacing:1,background:'rgba(255,255,255,0.6)',borderRadius:8,padding:'4px 8px',display:'inline-block'}}>✓ Done ({done.length})</div>
              {done.map(t=>(
                <div key={t.id} style={{background:MULTI,borderRadius:11,padding:'10px 12px',marginTop:6,marginBottom:5,display:'flex',alignItems:'center',gap:8,border:'1px solid rgba(90,120,72,0.15)'}}>
                  <div style={{flex:1,textDecoration:'line-through',color:'#3A2A18',fontSize:13,fontWeight:600}}>{t.name}</div>
                  <button onClick={()=>tickDone(activeZone,t.id)} style={{background:'rgba(255,255,255,0.7)',border:'1px solid rgba(90,80,60,0.25)',borderRadius:6,padding:'4px 9px',fontSize:11,fontWeight:600,color:'#3A5828',cursor:'pointer'}}>Undo</button>
                  <button onClick={()=>delTask(activeZone,t.id)} style={{background:'rgba(192,57,43,0.10)',border:'1px solid rgba(192,57,43,0.20)',borderRadius:6,padding:'4px 8px',fontSize:13,cursor:'pointer',color:'#C04030'}}>✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Focus Timer — at bottom */}
          <div style={{background:MULTI,borderRadius:18,padding:'11px 16px',marginTop:16,border:'1.5px solid rgba(180,160,140,0.35)'}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{fontSize:15}}>⏱</span>
              <div style={{fontFamily:'Georgia,serif',fontWeight:700,fontSize:13,color:'#1A1A10',flex:1}}>Focus Timer</div>
              <div style={{fontFamily:'monospace',fontSize:20,fontWeight:700,color:timerLeft<=59?'#E03020':'#1A2810'}}>{fmtT(timerLeft)}</div>
            </div>
            <div style={{display:'flex',gap:6,marginTop:9}}>
              {[10,20,30,60].map(m=>(
                <button key={m} onClick={()=>{setTimerMins(m);setTimerLeft(m*60);setTimerOn(false);}}
                  style={{flex:1,padding:'5px 0',background:timerMins===m?'rgba(90,120,72,0.20)':'rgba(255,255,255,0.6)',border:(timerMins===m?'1.5px solid rgba(90,120,72,0.40)':'1.5px solid rgba(180,160,140,0.25)'),borderRadius:9,fontSize:11,fontWeight:700,color:timerMins===m?'#3A5828':'#5A4A30',cursor:'pointer'}}>{m===60?"1hr":m+"m"}</button>
              ))}
              <button onClick={()=>timerLeft===0?resetTimer():setTimerOn(!timerOn)}
                style={{flex:1,padding:'5px 0',background:MULTI,border:'1.5px solid rgba(90,120,72,0.25)',borderRadius:9,fontSize:15,cursor:'pointer'}}>
                {timerLeft===0?'↺':timerOn?'⏸':'▶'}
              </button>
              <button onClick={resetTimer} style={{flex:1,padding:'5px 0',background:'rgba(180,160,140,0.15)',border:'1.5px solid rgba(180,160,140,0.25)',borderRadius:9,fontSize:10,fontWeight:600,color:'#5A4A30',cursor:'pointer'}}>Reset</button>
            </div>
          </div>

        </div>

        {/* Task celebration overlay */}
        {taskCelebration&&(
          <div style={{position:'fixed',inset:0,zIndex:900,display:'flex',alignItems:'center',justifyContent:'center',padding:24,pointerEvents:'none'}}>
            {/* Confetti */}
            {confetti.map(p=>(
              <div key={p.id} style={{
                position:'fixed',
                left:p.x+'%',
                top:'-20px',
                width:p.size+'px',
                height:p.size+'px',
                background:p.color,
                borderRadius:p.size>7?'50%':'2px',
                animation:`confettiFall 3s ${p.delay}s ease-in forwards`,
                transform:`rotate(${p.rotation}deg)`,
                zIndex:901,
              }}/>
            ))}
            {/* Message card */}
            <div style={{
              background:'rgba(250,248,240,0.98)',
              borderRadius:32,
              padding:'32px 28px',
              maxWidth:320,
              width:'100%',
              textAlign:'center',
              boxShadow:'0 20px 60px rgba(0,0,0,0.25)',
              border:'2px solid rgba(90,120,72,0.20)',
              pointerEvents:'auto',
              animation:'popIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275)',
            }}>
              <div style={{fontSize:56,marginBottom:8}}>🎉</div>
              <div style={{fontFamily:'Georgia,serif',fontWeight:900,fontSize:24,color:'#3A5828',marginBottom:6}}>{taskCelebration.title}</div>
              <div style={{fontSize:13,color:'#5A4A30',fontWeight:600,marginBottom:12,background:'rgba(90,120,72,0.08)',borderRadius:12,padding:'8px 12px'}}>"{taskCelebration.task}"</div>
              <div style={{fontSize:14,color:'#2A3820',fontWeight:600,lineHeight:1.5}}>{taskCelebration.msg}</div>
            </div>
          </div>
        )}

                {motivMsg&&<div style={{position:'fixed',bottom:100,left:'50%',transform:'translateX(-50%)',background:MULTI,color:'#1A2810',borderRadius:100,padding:'11px 22px',fontFamily:'Georgia,serif',fontWeight:700,fontSize:14,boxShadow:'0 4px 20px rgba(90,120,72,0.25)',zIndex:200,whiteSpace:'nowrap',border:'1.5px solid rgba(90,120,72,0.25)'}}>{motivMsg}</div>}

        {celebration&&celebration.zoneId===activeZone&&(
          <div style={{position:'fixed',inset:0,zIndex:800,background:'rgba(20,30,10,0.75)',backdropFilter:'blur(6px)',display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={()=>setCelebration(null)}>
            <div style={{background:'rgba(250,248,240,0.99)',borderRadius:32,padding:'36px 28px',maxWidth:320,width:'100%',textAlign:'center'}} onClick={e=>e.stopPropagation()}>
              <div style={{fontSize:64,marginBottom:8}}>🎉</div>
              <div style={{fontFamily:'Georgia,serif',fontWeight:900,fontSize:22,color:'#3A5828',marginBottom:12}}>All {celebration.name} tasks done! 🏡</div>
              <button onClick={()=>setCelebration(null)} style={{width:'100%',padding:'14px',background:MULTI,color:'#2A3820',border:'1.5px solid rgba(90,120,72,0.25)',borderRadius:100,fontFamily:'Georgia,serif',fontWeight:700,fontSize:16,cursor:'pointer',boxShadow:'0 4px 18px rgba(90,120,72,0.20)'}}>✨ Keep going!</button>
            </div>
          </div>
        )}

      </div>
    );
  }

  // ── ZONE DETAIL ──


  if(view==='zone'&&activeZone){
    const z=zones?.find(zn=>zn.id===activeZone);
    const zt=getZT(activeZone);
    const todo=zt.filter(t=>!t.done&&!t.later); // order preserved from storage
    const laterChores=zt.filter(t=>!t.done&&t.later);
    const done=zt.filter(t=>t.done);
    const availPresets=(allPresetsForZone||[]).filter(p=>!zt.some(t=>t.name.toLowerCase()===p.toLowerCase())&&!dismissed.includes(p));
    return(
      <div style={{minHeight:'100vh',background:'transparent',fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
        {/* Header */}
        <div style={{background:MULTI,padding:'14px 18px',display:'flex',alignItems:'center',gap:10,borderBottom:'1px solid rgba(90,80,60,0.08)',position:'sticky',top:0,zIndex:50}}>
          <button onClick={()=>setView('hub')} style={{background:'none',border:'none',cursor:'pointer',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{flex:1,fontFamily:'Georgia,serif',fontWeight:700,fontSize:19,color:'#1A1A10'}}>{z?.icon} {z?.name}</div>
        </div>
        <div style={{padding:'14px 16px'}}>

          {/* A vs B button */}
          <button onClick={startAvB}
            style={{width:'100%',marginBottom:12,background:MULTI,color:'#2A3820',border:'1.5px solid rgba(90,120,72,0.25)',borderRadius:100,padding:'10px',fontSize:13,fontFamily:'Georgia,serif',fontWeight:700,cursor:'pointer',boxShadow:'0 4px 18px rgba(90,120,72,0.20)'}}>
            🎯 A vs B — rank chores
          </button>

          {/* Add chore */}
          <div style={{background:MULTI,borderRadius:16,padding:'12px',marginBottom:12,boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
            <div style={{display:'flex',gap:8,marginBottom:8}}>
              <input value={newTask} onChange={e=>setNewTask(e.target.value)}
                onKeyDown={e=>{if(e.key==='Enter'&&newTask.trim()){addTask(activeZone,newTask.trim(),3,'');setNewTask('');}}}
                placeholder="Add a chore…"
                style={{flex:1,padding:'9px 13px',borderRadius:11,border:'1.5px solid rgba(90,120,72,0.25)',fontSize:14,color:'#1A1A10',background:'rgba(255,255,255,0.9)',outline:'none'}}/>
              <button onClick={()=>{if(newTask.trim()){addTask(activeZone,newTask.trim(),3,'');setNewTask('');}}}
                style={{background:MULTI,color:'#2A3820',border:'1.5px solid rgba(90,120,72,0.25)',borderRadius:11,padding:'9px 14px',fontSize:13,fontWeight:700,cursor:'pointer'}}>Add</button>
            </div>

            {/* Borrow from another zone */}
            <button onClick={()=>setShowBorrow(!showBorrow)}
              style={{width:'100%',padding:'8px',marginBottom:8,background:'rgba(255,255,255,0.6)',border:'1px solid rgba(90,120,72,0.20)',borderRadius:10,fontSize:12,fontWeight:700,color:'#3A5828',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span>🔄 Borrow a chore from another zone</span><span>{showBorrow?'▲':'▼'}</span>
            </button>
            {showBorrow&&(
              <div style={{marginBottom:8}}>
                {(zones||[]).filter(zn=>zn.id!==activeZone).length===0&&(
                  <div style={{fontSize:12,color:'#5A4A30',fontWeight:600,textAlign:'center',padding:'8px',background:'rgba(255,255,255,0.55)',borderRadius:10}}>No other zones set up yet</div>
                )}
                {(zones||[]).filter(zn=>zn.id!==activeZone).map(zn=>{
                  const zTasks=getZT(zn.id).filter(t=>!t.done);
                  const zSaved=[...(PRESETS[zn.id]||[]),...(customChores[zn.id]||[])].filter(name=>!zTasks.some(t=>t.name.toLowerCase()===name.toLowerCase()));
                  const isOpen=borrowZone===zn.id;
                  const totalCount=zTasks.length+zSaved.length;
                  return(
                    <div key={zn.id} style={{marginBottom:6,borderRadius:12,overflow:'hidden',border:'1px solid rgba(90,120,72,0.15)'}}>
                      <button onClick={()=>setBorrowZone(isOpen?null:zn.id)}
                        style={{width:'100%',padding:'9px 12px',background:'rgba(255,255,255,0.55)',border:'none',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'}}>
                        <span style={{fontSize:13,fontWeight:700,color:'#3A5828'}}>{zn.icon} {zn.name}</span>
                        <span style={{fontSize:11,color:'#8A8070'}}>{totalCount} chore{totalCount!==1?'s':''} {isOpen?'▲':'▼'}</span>
                      </button>
                      {isOpen&&(
                        <div style={{padding:'6px 10px',background:'rgba(255,255,255,0.35)',maxHeight:200,overflowY:'auto'}}>
                          {zTasks.filter(t=>!borrowedIds.some(b=>b.taskId===t.id)).map(t=>(
                            <div key={t.id} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 0',borderBottom:'1px solid rgba(90,80,60,0.06)'}}>
                              <div style={{flex:1,fontSize:13,color:'#1A1A10'}}>{t.name}</div>
                              <button onClick={()=>{
                                  const newTaskObj={id:Date.now()+Math.random(),name:t.name,score:t.score||3,reason:t.reason||'',done:false,color:t.color||'lilac'};
                                  saveTasks(prev=>({...prev,[activeZone]:[...(prev[activeZone]||[]),newTaskObj]}));
                                  setShowBorrow(false);
                                }}
                                style={{background:'rgba(90,120,72,0.10)',border:'1px solid rgba(90,120,72,0.25)',borderRadius:7,padding:'4px 9px',fontSize:10,fontWeight:700,color:'#3A5828',cursor:'pointer'}}>+ Borrow</button>
                            </div>
                          ))}
                          {zSaved.length>0&&<div style={{fontSize:10,fontWeight:700,color:'#8A8070',padding:'6px 0 2px',textTransform:'uppercase'}}>📋 Saved chores</div>}
                          {zSaved.map(name=>(
                            <div key={name} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 0',borderBottom:'1px solid rgba(90,80,60,0.06)'}}>
                              <div style={{flex:1,fontSize:13,color:'#1A1A10'}}>{name}</div>
                              <button onClick={()=>{
                                  const newTaskObj={id:Date.now()+Math.random(),name,score:3,reason:'',done:false,color:'lilac'};
                                  saveTasks(prev=>({...prev,[activeZone]:[...(prev[activeZone]||[]),newTaskObj]}));
                                  setShowBorrow(false);
                                }}
                                style={{background:'rgba(90,120,72,0.10)',border:'1px solid rgba(90,120,72,0.25)',borderRadius:7,padding:'4px 9px',fontSize:10,fontWeight:700,color:'#3A5828',cursor:'pointer'}}>+ Borrow</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Saved Chores */}
            <button onClick={()=>setShowTemplates(!showTemplates)}
              style={{width:'100%',padding:'8px',background:'rgba(255,255,255,0.6)',border:'1px solid rgba(90,120,72,0.20)',borderRadius:10,fontSize:12,fontWeight:700,color:'#3A5828',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span>📋 Saved Chores</span><span>{showTemplates?'▲':'▼'}</span>
            </button>
            {showTemplates&&(
              <div style={{marginTop:8,maxHeight:280,overflowY:'auto'}}>
                <div style={{display:'flex',gap:6,marginBottom:8}}>
                  <input value={newChoreName} onChange={e=>setNewChoreName(e.target.value)}
                    onKeyDown={e=>{const name=newChoreName.trim();if(e.key==='Enter'&&name){setCustomChores(prev=>{const existing=prev[activeZone]||[];if(existing.includes(name))return prev;const nc={...prev,[activeZone]:[...existing,name]};save('hw_custom_chores',nc);return nc;});setNewChoreName('');}}}
                    placeholder="Save a new chore for next time…"
                    style={{flex:1,padding:'7px 11px',borderRadius:9,border:'1.5px solid rgba(90,120,72,0.20)',fontSize:12,color:'#1A1A10',background:'rgba(255,255,255,0.85)',outline:'none'}}/>
                  <button onClick={()=>{const name=newChoreName.trim();if(name){setCustomChores(prev=>{const existing=prev[activeZone]||[];if(existing.includes(name))return prev;const nc={...prev,[activeZone]:[...existing,name]};save('hw_custom_chores',nc);return nc;});setNewChoreName('');}}}
                    style={{background:MULTI,border:'1px solid rgba(90,120,72,0.25)',borderRadius:9,padding:'7px 12px',fontSize:12,fontWeight:700,color:'#3A5828',cursor:'pointer'}}>Save</button>
                </div>
                {availPresets.length===0
                  ?<div style={{fontSize:12,color:'#8A8070',textAlign:'center',padding:'8px'}}>All saved chores added ✓</div>
                  :availPresets.map(p=>{
                    const isCustom=(customChores[activeZone]||[]).includes(p);
                    return(
                      <div key={p} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 0',borderBottom:'1px solid rgba(90,80,60,0.06)'}}>
                        <div style={{flex:1,fontSize:13,color:'#1A1A10'}}>{p}{isCustom&&<span style={{fontSize:9,color:'#5A7040',marginLeft:5}}>★</span>}</div>
                        <button onClick={()=>addTask(activeZone,p,1,'Urgent')} style={{background:'rgba(224,48,32,0.10)',border:'1px solid rgba(224,48,32,0.25)',borderRadius:7,padding:'4px 7px',fontSize:10,fontWeight:700,color:'#C03020',cursor:'pointer'}}>🔴</button>
                        <button onClick={()=>addTask(activeZone,p,3,'Normal')} style={{background:MULTI,border:'1px solid rgba(90,120,72,0.25)',borderRadius:7,padding:'4px 7px',fontSize:10,fontWeight:700,color:'#3A5828',cursor:'pointer'}}>Normal</button>
                        <button onClick={()=>addTask(activeZone,p,5,'Later')} style={{background:'rgba(72,120,168,0.10)',border:'1px solid rgba(72,120,168,0.25)',borderRadius:7,padding:'4px 7px',fontSize:10,fontWeight:700,color:'#2A5880',cursor:'pointer'}}>Later</button>
                        {isCustom?(
                          <button onClick={()=>{setCustomChores(prev=>{const nc={...prev,[activeZone]:(prev[activeZone]||[]).filter(x=>x!==p)};save('hw_custom_chores',nc);return nc;})}} style={{background:'rgba(192,57,43,0.08)',border:'1px solid rgba(192,57,43,0.18)',borderRadius:7,padding:'4px 7px',fontSize:10,fontWeight:700,color:'#c0392b',cursor:'pointer'}}>🗑</button>
                        ):(
                          <button onClick={()=>saveDismissed([...dismissed,p])} style={{background:'rgba(90,80,60,0.08)',border:'1px solid rgba(90,80,60,0.15)',borderRadius:7,padding:'4px 7px',fontSize:10,fontWeight:700,color:'#8A8070',cursor:'pointer'}}>✕</button>
                        )}
                      </div>
                    );
                  })
                }
              </div>
            )}
          </div>

          {/* Empty state */}
          {todo.length===0&&done.length===0&&(
            <div style={{textAlign:'center',padding:'30px 20px',color:'#5A4A30',background:'rgba(255,255,255,0.55)',borderRadius:20}}>
              <div style={{fontSize:40,marginBottom:8}}>{z?.icon}</div>
              <div style={{fontFamily:'Georgia,serif',fontSize:15,marginBottom:12,fontWeight:600}}>No chores yet — add one above or use Saved Chores!</div>
            </div>
          )}

          {/* Chore list */}
          {todo.map((t,i)=>(
            <div key={t.id}
              onDragOver={e=>{e.preventDefault();setDragOver(t.id);}}
              onDrop={e=>{
                e.preventDefault();
                if(!dragTask||dragTask===t.id){setDragTask(null);setDragOver(null);return;}
                const list=[...getZT(activeZone)];
                const from=list.findIndex(x=>x.id===dragTask),to=list.findIndex(x=>x.id===t.id);
                list.splice(to,0,...list.splice(from,1));
                saveTasks(prev=>({...prev,[activeZone]:list}));
                setDragTask(null);setDragOver(null);
              }}
              style={{background:dragOver===t.id?'rgba(90,120,72,0.08)':MULTI,borderRadius:14,padding:'11px 13px',marginBottom:8,boxShadow:'0 2px 8px rgba(0,0,0,0.05)',border:dragOver===t.id?'1.5px solid rgba(90,120,72,0.30)':'1.5px solid transparent'}}>
              {/* Chore name on top */}
              {editingChoreId===t.id?(
                <div style={{display:'flex',gap:6,marginBottom:8}}>
                  <input value={editChoreText} onChange={e=>setEditChoreText(e.target.value)}
                    onKeyDown={e=>{if(e.key==='Enter'){if(editChoreText.trim())editChore(activeZone,t.id,editChoreText.trim());setEditingChoreId(null);}if(e.key==='Escape')setEditingChoreId(null);}}
                    autoFocus
                    style={{flex:1,fontWeight:700,fontSize:15,padding:'6px 10px',borderRadius:10,border:'1.5px solid rgba(90,120,72,0.30)',color:'#1A1A10',outline:'none'}}/>
                  <button onClick={()=>{if(editChoreText.trim())editChore(activeZone,t.id,editChoreText.trim());setEditingChoreId(null);}}
                    style={{background:'#5A7848',color:'#fff',border:'none',borderRadius:10,padding:'6px 14px',fontSize:13,fontWeight:700,cursor:'pointer'}}>Save</button>
                </div>
              ):(
                <div onClick={()=>{setEditChoreText(t.name);setEditingChoreId(t.id);}}
                  style={{fontWeight:700,fontSize:16,lineHeight:1.4,color:'#1A1A10',cursor:'pointer',marginBottom:8,overflowWrap:'break-word'}}>{t.name}</div>
              )}
              {/* Controls row */}
              <div style={{display:'flex',alignItems:'center',gap:9}}>
                <div style={{width:28,height:28,borderRadius:8,background:swatchById(t.color||'lilac').num,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12,fontWeight:800,flexShrink:0}}>{i+1}</div>
                <div draggable
                  onDragStart={e=>{e.stopPropagation();setDragTask(t.id);}}
                  onDragEnd={()=>{setDragTask(null);setDragOver(null);}}
                  style={{cursor:'grab',color:'rgba(90,120,72,0.35)',fontSize:18,padding:'2px 6px',touchAction:'none',flexShrink:0,userSelect:'none'}}>⠿</div>
                <div style={{position:'relative',flexShrink:0}}>
                  <button onClick={()=>setChorePickerOpenId(chorePickerOpenId===t.id?null:t.id)}
                    style={{width:22,height:22,borderRadius:'50%',cursor:'pointer',padding:0,background:swatchById(t.color||'lilac').fill,border:`2.5px solid ${swatchById(t.color||'lilac').border}`,boxShadow:'0 1px 4px rgba(0,0,0,0.12)'}}/>
                  {chorePickerOpenId===t.id&&<ColourPicker current={t.color} onChange={c=>colorChore(activeZone,t.id,c)} onClose={()=>setChorePickerOpenId(null)}/>}
                </div>
                <div style={{flex:1}}/>
                <button onClick={()=>tickDone(activeZone,t.id)}
                  style={{background:swatchById(t.color||'lilac').num,border:'none',borderRadius:9,width:32,height:32,fontSize:15,fontWeight:700,color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>✓</button>
                <button onClick={()=>laterChore(activeZone,t.id)}
                  title={t.later?"Move back to list":"Save for later"}
                  style={{background:t.later?'rgba(212,160,32,0.18)':'rgba(90,120,72,0.08)',color:t.later?'#B8860B':'#5A7848',border:`1.5px solid ${t.later?'rgba(212,160,32,0.35)':'rgba(90,120,72,0.20)'}`,borderRadius:9,width:32,height:32,fontSize:14,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>💾</button>
                <button onClick={()=>delTask(activeZone,t.id)}
                  style={{background:'rgba(200,80,60,0.08)',border:'1.5px solid rgba(200,80,60,0.15)',borderRadius:9,width:32,height:32,fontSize:13,fontWeight:700,color:'#C04030',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
                <div style={{position:'relative'}}>
                  <button onClick={()=>setMoveChoreMenu(moveChoreMenu===t.id?null:t.id)}
                    style={{background:'rgba(90,80,60,0.08)',border:'1.5px solid rgba(90,80,60,0.15)',borderRadius:9,width:32,height:32,fontSize:13,fontWeight:700,color:'#5A4A30',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>⋯</button>
                  {moveChoreMenu===t.id&&(
                    <div style={{position:'absolute',right:0,bottom:38,background:'#fff',borderRadius:14,boxShadow:'0 4px 20px rgba(0,0,0,0.15)',border:'1px solid rgba(90,80,60,0.12)',zIndex:100,minWidth:160,overflow:'hidden'}}>


                      <div style={{fontSize:11,fontWeight:700,color:'#8A8070',padding:'8px 12px 4px',textTransform:'uppercase',letterSpacing:0.5}}>Move to</div>
                      <button onClick={()=>{
                        if(onMoveToPri){onMoveToPri({id:Date.now()+Math.random(),name:t.name,done:false,color:'lilac',url:''});}
                        delTask(activeZone,t.id);
                        setMoveChoreMenu(null);
                      }} style={{width:'100%',padding:'10px 14px',background:'none',border:'none',textAlign:'left',fontSize:13,fontWeight:600,color:'#1A1A10',cursor:'pointer',display:'flex',alignItems:'center',gap:8}}>
                        📋 To Do list
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Save for later section */}
          {laterChores.length>0&&(
            <div style={{marginTop:14}}>
              <div style={{fontSize:11,fontWeight:700,color:'#5A4A30',marginBottom:7,textTransform:'uppercase',letterSpacing:1,background:'rgba(255,255,255,0.6)',borderRadius:8,padding:'4px 8px',display:'inline-block'}}>💾 Save for later ({laterChores.length})</div>
              {laterChores.map(t=>(
                <div key={t.id} style={{background:MULTI,borderRadius:11,padding:'10px 12px',marginTop:6,display:'flex',alignItems:'center',gap:8,border:'1px solid rgba(212,160,32,0.20)'}}>
                  <div style={{flex:1,color:'#5A4A30',fontSize:13,fontWeight:600}}>{t.name}</div>
                  <button onClick={()=>laterChore(activeZone,t.id)} style={{background:'rgba(90,120,72,0.10)',border:'1px solid rgba(90,120,72,0.25)',borderRadius:6,padding:'4px 9px',fontSize:11,fontWeight:600,color:'#3A5828',cursor:'pointer'}}>↑ Back to list</button>
                  <button onClick={()=>delTask(activeZone,t.id)} style={{background:'rgba(192,57,43,0.10)',border:'1px solid rgba(192,57,43,0.20)',borderRadius:6,padding:'4px 8px',fontSize:13,cursor:'pointer',color:'#C04030'}}>✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Done section */}
          {done.length>0&&(
            <div style={{marginTop:14}}>
              <div style={{fontSize:11,fontWeight:700,color:'#5A4A30',marginBottom:7,textTransform:'uppercase',letterSpacing:1,background:'rgba(255,255,255,0.6)',borderRadius:8,padding:'4px 8px',display:'inline-block'}}>✓ Done ({done.length})</div>
              {done.map(t=>(
                <div key={t.id} style={{background:MULTI,borderRadius:11,padding:'10px 12px',marginTop:6,marginBottom:5,display:'flex',alignItems:'center',gap:8,border:'1px solid rgba(90,120,72,0.15)'}}>
                  <div style={{flex:1,textDecoration:'line-through',color:'#3A2A18',fontSize:13,fontWeight:600}}>{t.name}</div>
                  <button onClick={()=>tickDone(activeZone,t.id)} style={{background:'rgba(255,255,255,0.7)',border:'1px solid rgba(90,80,60,0.25)',borderRadius:6,padding:'4px 9px',fontSize:11,fontWeight:600,color:'#3A5828',cursor:'pointer'}}>Undo</button>
                  <button onClick={()=>delTask(activeZone,t.id)} style={{background:'rgba(192,57,43,0.10)',border:'1px solid rgba(192,57,43,0.20)',borderRadius:6,padding:'4px 8px',fontSize:13,cursor:'pointer',color:'#C04030'}}>✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Focus Timer */}
          <div style={{background:MULTI,borderRadius:18,padding:'11px 16px',marginTop:16,border:'1.5px solid rgba(180,160,140,0.35)'}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{fontSize:15}}>⏱</span>
              <div style={{fontFamily:'Georgia,serif',fontWeight:700,fontSize:13,color:'#1A1A10',flex:1}}>Focus Timer</div>
              <div style={{fontFamily:'monospace',fontSize:20,fontWeight:700,color:timerLeft<=59?'#E03020':'#1A2810'}}>{fmtT(timerLeft)}</div>
            </div>
            <div style={{display:'flex',gap:6,marginTop:9}}>
              {[10,20,30,60].map(m=>(
                <button key={m} onClick={()=>{setTimerMins(m);setTimerLeft(m*60);setTimerOn(false);}}
                  style={{flex:1,padding:'5px 0',background:timerMins===m?'rgba(90,120,72,0.20)':'rgba(255,255,255,0.6)',border:(timerMins===m?'1.5px solid rgba(90,120,72,0.40)':'1.5px solid rgba(180,160,140,0.25)'),borderRadius:9,fontSize:11,fontWeight:700,color:timerMins===m?'#3A5828':'#5A4A30',cursor:'pointer'}}>{m===60?'1hr':m+'m'}</button>
              ))}
              <button onClick={()=>timerLeft===0?resetTimer():setTimerOn(!timerOn)}
                style={{flex:1,padding:'5px 0',background:MULTI,border:'1.5px solid rgba(90,120,72,0.25)',borderRadius:9,fontSize:15,cursor:'pointer'}}>
                {timerLeft===0?'↺':timerOn?'⏸':'▶'}
              </button>
              <button onClick={resetTimer} style={{flex:1,padding:'5px 0',background:'rgba(180,160,140,0.15)',border:'1.5px solid rgba(180,160,140,0.25)',borderRadius:9,fontSize:10,fontWeight:600,color:'#5A4A30',cursor:'pointer'}}>Reset</button>
            </div>
          </div>

          {/* Celebration */}
          {taskCelebration&&(
            <div style={{position:'fixed',inset:0,zIndex:900,display:'flex',alignItems:'center',justifyContent:'center',padding:24,pointerEvents:'none'}}>
              {confetti.map(p=>(
                <div key={p.id} style={{position:'fixed',left:p.x+'%',top:'-20px',width:p.size+'px',height:p.size+'px',background:p.color,borderRadius:p.size>7?'50%':'2px',animation:`confettiFall 3s ${p.delay}s ease-in forwards`,transform:`rotate(${p.rotation}deg)`,zIndex:901}}/>
              ))}
              <div style={{background:'rgba(250,248,240,0.98)',borderRadius:32,padding:'32px 28px',maxWidth:320,width:'100%',textAlign:'center',boxShadow:'0 20px 60px rgba(0,0,0,0.25)',border:'2px solid rgba(90,120,72,0.20)',pointerEvents:'auto',animation:'popIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275)'}}>
                <div style={{fontSize:56,marginBottom:8}}>🎉</div>
                <div style={{fontFamily:'Georgia,serif',fontWeight:900,fontSize:24,color:'#3A5828',marginBottom:6}}>{taskCelebration.title}</div>
                <div style={{fontSize:13,color:'#5A4A30',fontWeight:600,marginBottom:12,background:'rgba(90,120,72,0.08)',borderRadius:12,padding:'8px 12px'}}>"{taskCelebration.task}"</div>
                <div style={{fontSize:14,color:'#2A3820',fontWeight:600,lineHeight:1.5}}>{taskCelebration.msg}</div>
              </div>
            </div>
          )}

          {motivMsg&&<div style={{position:'fixed',bottom:100,left:'50%',transform:'translateX(-50%)',background:MULTI,color:'#1A2810',borderRadius:100,padding:'11px 22px',fontFamily:'Georgia,serif',fontWeight:700,fontSize:14,boxShadow:'0 4px 20px rgba(90,120,72,0.25)',zIndex:200,whiteSpace:'nowrap',border:'1.5px solid rgba(90,120,72,0.25)'}}>{motivMsg}</div>}

          {celebration&&celebration.zoneId===activeZone&&(
            <div style={{position:'fixed',inset:0,zIndex:800,background:'rgba(20,30,10,0.75)',backdropFilter:'blur(6px)',display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={()=>setCelebration(null)}>
              <div style={{background:'rgba(250,248,240,0.99)',borderRadius:32,padding:'36px 28px',maxWidth:320,width:'100%',textAlign:'center'}} onClick={e=>e.stopPropagation()}>
                <div style={{fontSize:64,marginBottom:8}}>🎉</div>
                <div style={{fontFamily:'Georgia,serif',fontWeight:900,fontSize:22,color:'#3A5828',marginBottom:12}}>All {celebration.name} tasks done! 🏡</div>
                <button onClick={()=>setCelebration(null)} style={{width:'100%',padding:'14px',background:MULTI,color:'#2A3820',border:'1.5px solid rgba(90,120,72,0.25)',borderRadius:100,fontFamily:'Georgia,serif',fontWeight:700,fontSize:16,cursor:'pointer',boxShadow:'0 4px 18px rgba(90,120,72,0.20)'}}>✨ Keep going!</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── HUB ──
  const zoneList=zones||[];
  return(
    <div style={{minHeight:'100vh',background:'transparent',fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <div style={{background:MULTI,padding:'14px 18px',display:'flex',alignItems:'center',gap:12,borderBottom:'1px solid rgba(90,80,60,0.08)',position:'sticky',top:0,zIndex:50}}>
        <button onClick={()=>setScreen('home')} style={{background:'none',border:'none',cursor:'pointer',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{fontFamily:'Georgia,serif',fontWeight:700,fontSize:20,color:'#1A1A10',flex:1}}>🏠 Housework</div>
        <button onClick={()=>{
            const current=zones||[];
            const has=id=>current.some(z=>z.id===id);
            const missing=[];
            if(!has('garden')) missing.push({id:'garden',name:'Garden',icon:'🌿',color:'#4A8A5A',rooms:[]});
            if(!has('upstairs')) missing.push({id:'upstairs',name:'Upstairs',icon:'🛏️',color:'#6878B8',rooms:[]});
            if(!has('downstairs')) missing.push({id:'downstairs',name:'Downstairs',icon:'🛋️',color:'#7A8A5A',rooms:[]});
            if(missing.length===0){alert('All zones already present: '+current.map(z=>z.name).join(', '));return;}
            saveZones([...current,...missing]);
            alert('Added back: '+missing.map(z=>z.name).join(', '));
          }}
          style={{background:'rgba(72,120,168,0.10)',border:'1px solid rgba(72,120,168,0.20)',borderRadius:16,padding:'5px 10px',fontSize:11,fontWeight:700,color:'#2A5880',cursor:'pointer',marginRight:6}}>
          🔧 Fix zones
        </button>
        <button onClick={()=>{setSetupStep(0);setSetupAnswers({});setMultiSel([]);setOtherText('');setView('setup');}}
          style={{background:'rgba(90,120,72,0.10)',border:'1px solid rgba(90,120,72,0.20)',borderRadius:16,padding:'5px 12px',fontSize:12,fontWeight:700,color:'#3A5828',cursor:'pointer'}}>
          🤖 Setup
        </button>
      </div>
      <div style={{padding:'12px 16px'}}>
        {zoneList.length===0?(
          <div style={{textAlign:'center',padding:'40px 20px'}}>
            <div style={{fontSize:48,marginBottom:12}}>🏠</div>
            <div style={{fontFamily:'Georgia,serif',fontSize:16,color:'#5A4A30',marginBottom:16}}>Let's set up your home!</div>
            <button onClick={()=>{setSetupStep(0);setSetupAnswers({});setMultiSel([]);setOtherText('');setView('setup');}}
              style={{background:'linear-gradient(135deg,#5A7848,#3A5828)',color:'#fff',border:'none',borderRadius:100,padding:'13px 28px',fontFamily:'Georgia,serif',fontWeight:700,fontSize:15,cursor:'pointer'}}>
              🤖 Set up my home
            </button>
          </div>
        ):(
          <>
          <div style={{fontSize:10,color:'#5A4A30',textAlign:'center',marginBottom:4,fontWeight:700,background:'rgba(255,255,255,0.55)',borderRadius:8,padding:'4px 10px',display:'inline-block'}}>⠿ Hold to drag and reorder</div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {zoneList.map(z=>{
              const zt=getZT(z.id);
              const total=zt.filter(t=>!t.done).length;
              const urgent=zt.filter(t=>!t.done&&t.score<=2).length;
              const doneC=zt.filter(t=>t.done).length;
              return(
                <button key={z.id}
                  onDragOver={e=>{e.preventDefault();setDragOverZone(z.id);}}
                  onDrop={e=>{
                    e.preventDefault();
                    if(!dragZone||dragZone===z.id){setDragZone(null);setDragOverZone(null);return;}
                    const newZones=[...zoneList];
                    const from=newZones.findIndex(x=>x.id===dragZone);
                    const to=newZones.findIndex(x=>x.id===z.id);
                    newZones.splice(to,0,...newZones.splice(from,1));
                    saveZones(newZones);
                    setDragZone(null);setDragOverZone(null);
                  }}
                  onClick={()=>{setActiveZone(z.id);setView('zone');setShowTemplates(false);}}
                  style={{background:dragOverZone===z.id?'rgba(90,120,72,0.12)':MULTI,borderRadius:20,padding:'16px 18px',border:dragOverZone===z.id?'1.5px solid rgba(90,120,72,0.40)':'1.5px solid rgba(255,255,255,0.6)',boxShadow:'0 2px 12px rgba(0,0,0,0.07)',cursor:'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:14,width:'100%'}}>
                  <div draggable
                    onDragStart={e=>{e.stopPropagation();e.dataTransfer.effectAllowed='move';setDragZone(z.id);}}
                    onDragEnd={()=>{setDragZone(null);setDragOverZone(null);}}
                    style={{fontSize:14,color:'rgba(90,80,60,0.30)',flexShrink:0,touchAction:'none',cursor:'grab',padding:'4px'}}
                    onClick={e=>e.stopPropagation()}>⠿</div>
                  <div style={{fontSize:36,flexShrink:0}}>{z.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:'Georgia,serif',fontWeight:700,fontSize:17,color:'#1A1A10',marginBottom:3}}>{z.name}</div>
                    <div style={{fontSize:11,color:total>0?'#5A7040':'#A09080',fontWeight:600}}>
                      {total>0?`${total} to do`:'All clear ✓'}{doneC>0?` · ${doneC} done`:''}
                    </div>
                    {zt.length>0&&<div style={{marginTop:6,height:4,borderRadius:2,background:'rgba(90,80,60,0.08)',overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${(doneC/zt.length)*100}%`,background:z.color,borderRadius:2}}/>
                    </div>}
                  </div>
                  {urgent>0&&<div style={{background:'#E03020',color:'#fff',borderRadius:100,padding:'2px 8px',fontSize:11,fontWeight:700,flexShrink:0}}>{urgent} urgent</div>}
                  {z.id.startsWith('custom_')&&(
                    <button onClick={e=>{
                      e.stopPropagation();
                      if(window.confirm(`Delete "${z.name}"? This will remove all chores in it.`)){
                        saveTasks(prev=>{const updated={...prev};delete updated[z.id];return updated;});
                        saveZones(zoneList.filter(x=>x.id!==z.id));
                      }
                    }} style={{background:'rgba(192,57,43,0.09)',border:'1px solid rgba(192,57,43,0.20)',borderRadius:8,padding:'6px 8px',fontSize:13,cursor:'pointer',color:'#c0392b',flexShrink:0}}>🗑</button>
                  )}
                </button>
              );
            })}
          </div>

          {/* Create custom zone */}
          {!showAddZone?(
            <button onClick={()=>setShowAddZone(true)}
              style={{width:'100%',marginTop:16,padding:'14px',background:'rgba(255,255,255,0.55)',border:'1.5px dashed rgba(90,120,72,0.35)',borderRadius:20,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:10,fontSize:14,fontWeight:700,color:'#3A5828'}}>
              <span style={{fontSize:20}}>＋</span> Create a custom list
            </button>
          ):(
            <div style={{background:MULTI,borderRadius:20,padding:'16px',marginTop:16,border:'1.5px solid rgba(90,120,72,0.20)'}}>
              <div style={{fontWeight:700,fontSize:15,color:'#1A1A10',marginBottom:12}}>New custom list</div>
              {/* Icon picker */}
              <div style={{marginBottom:10}}>
                <div style={{fontSize:12,fontWeight:600,color:'#5A4A30',marginBottom:6}}>Choose an icon</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {['📋','🏠','🚗','💼','🎮','🏋️','💊','🐾','🧹','🌸','🍳','📚','🎨','🧺','🛠️','✂️','🌱','❤️'].map(icon=>(
                    <button key={icon} onClick={()=>setNewZoneIcon(icon)}
                      style={{width:38,height:38,fontSize:20,borderRadius:10,border:newZoneIcon===icon?'2.5px solid #5A7848':'1.5px solid rgba(90,80,60,0.15)',background:newZoneIcon===icon?'rgba(90,120,72,0.15)':'rgba(255,255,255,0.6)',cursor:'pointer'}}>
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              {/* Name input */}
              <input value={newZoneName} onChange={e=>setNewZoneName(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&&newZoneName.trim()&&(()=>{
                  const id='custom_'+Date.now();
                  saveZones([...zoneList,{id,name:newZoneName.trim(),icon:newZoneIcon,color:'#5A7848',rooms:[]}]);
                  setNewZoneName('');setNewZoneIcon('📋');setShowAddZone(false);
                })()}
                placeholder="e.g. Self care, Car, Work tasks..."
                style={{width:'100%',boxSizing:'border-box',padding:'12px 16px',borderRadius:100,border:'1.5px solid rgba(90,120,72,0.25)',fontSize:15,fontWeight:600,outline:'none',background:'rgba(255,255,255,0.85)',color:'#1A1A10',marginBottom:12}}/>
              <div style={{display:'flex',gap:10}}>
                <button onClick={()=>{setShowAddZone(false);setNewZoneName('');setNewZoneIcon('📋');}}
                  style={{flex:1,padding:'12px',background:'rgba(90,80,60,0.08)',color:'#8A8070',border:'none',borderRadius:100,fontWeight:600,fontSize:14,cursor:'pointer'}}>Cancel</button>
                <button onClick={()=>{
                    if(!newZoneName.trim())return;
                    const id='custom_'+Date.now();
                    saveZones([...zoneList,{id,name:newZoneName.trim(),icon:newZoneIcon,color:'#5A7848',rooms:[]}]);
                    setNewZoneName('');setNewZoneIcon('📋');setShowAddZone(false);
                    setTimeout(()=>{setActiveZone(id);setView('zone');},100);
                  }}
                  style={{flex:2,padding:'12px',background:'#5A7848',color:'#fff',border:'none',borderRadius:100,fontWeight:700,fontSize:14,cursor:'pointer',boxShadow:'0 3px 12px rgba(58,80,38,0.28)'}}>
                  Create list
                </button>
              </div>
            </div>
          )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────
export default function App(){
  const load=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch{return d;}};
  const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}};
  const MULTI="linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)";

  const [screen,setScreen]=useState(()=>{
    const p=new URLSearchParams(window.location.search).get('screen');
    return(['todo','housework','shopping','meals'].includes(p))?p:'home';
  });
  // Real focus timer state for Todo list
  const [focusMins,setFocusMins]=useState(25);
  const [focusLeft,setFocusLeft]=useState(null);
  const [focusOn,setFocusOn]=useState(false);
  const [focusAlerted,setFocusAlerted]=useState(false);
  const focusRef=useRef(null);
  const hwSaveTasksRef=useRef(null);
  useEffect(()=>{
    if(focusOn&&focusLeft>0){
      focusRef.current=setInterval(()=>setFocusLeft(l=>l-1),1000);
    } else {
      clearInterval(focusRef.current);
      if(focusLeft===0&&focusOn) setFocusOn(false);
    }
    return()=>clearInterval(focusRef.current);
  },[focusOn,focusLeft]);
  const fmtTimer=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const [installPrompt,setInstallPrompt]=useState(null);
  const DEFAULT_TILE_IDS=['todo','housework','shopping','meals'];
  const [tileOrder,setTileOrderRaw]=useState(()=>load('chores_tile_order',DEFAULT_TILE_IDS));
  const saveTileOrder=o=>{setTileOrderRaw(o);save('chores_tile_order',o);};
  const [dragTile,setDragTile]=useState(null);
  const [dragOverTile,setDragOverTile]=useState(null);
  useEffect(()=>{
    const handler=e=>{e.preventDefault();setInstallPrompt(e);};
    window.addEventListener('beforeinstallprompt',handler);
    return()=>window.removeEventListener('beforeinstallprompt',handler);
  },[]);
  const [userName,setUserName]=useState(()=>{try{return localStorage.getItem('chores_username')||'';}catch{return '';}}); 
  const [nameSaved,setNameSaved]=useState(false);

  const [priData,setPriDataRaw]=useState(()=>{
    const saved=load('chores_pri',null);
    if(saved&&Array.isArray(saved)&&saved.length>0){
      // Clean up: de-dupe by ID only (never by name — same-named tasks are legitimately separate),
      // un-hide any previously saved-for-later tasks
      const cleaned=saved.map(list=>{
        const seenIds=new Set();
        const dedupedTasks=(list.tasks||[]).filter(t=>{
          if(seenIds.has(t.id)) return false;
          seenIds.add(t.id);
          return true;
        });
        return {...list,tasks:dedupedTasks};
      });
      return cleaned;
    }
    return [{id:'main',name:'To Do',tasks:[],created:Date.now()}];
  });
  // priData is saved inside setPriData() every time it changes — no useEffect needed

  const dedupePriList=list=>{
    const seen=new Set();
    const dedupedTasks=(list.tasks||[]).filter(t=>{
      // Use string version of ID to avoid float comparison issues
      const key=String(t.id);
      if(seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return {...list,tasks:dedupedTasks};
  };
  const setPriData=d=>{
    setPriDataRaw(prev=>{
      const raw=typeof d==='function'?d(prev):d;
      const next=raw.map(dedupePriList); // always de-duplicate before saving, permanently
      save('chores_pri',next);
      return next;
    });
  };

  const [shopData,setShopDataRaw]=useState(()=>load('chores_shop',[]));
  const setShopData=d=>{setShopDataRaw(prev=>{const next=typeof d==='function'?d(prev):d;save('chores_shop',next);return next;});};

  const [mealData,setMealDataRaw]=useState(()=>load('chores_meal',{}));
  const setMealData=d=>{setMealDataRaw(prev=>{const next=typeof d==='function'?d(prev):d;save('chores_meal',next);return next;});};

  // Greeting
  const greeting=()=>{
    const h=new Date().getHours();
    const w=h<12?'Morning':h<17?'Afternoon':h<21?'Evening':'Night';
    return `Good ${w}${userName?', '+userName:''}!`;
  };
  const sunMoon=()=>{
    const h=new Date().getHours();
    if(h>=21||h<5) return <div style={{fontSize:52,filter:'drop-shadow(0 0 12px #8090FF)'}}>🌙</div>;
    if(h>=17) return <div style={{fontSize:52,filter:'drop-shadow(0 0 12px #FF8060)'}}>🌅</div>;
    return <div style={{width:52,height:52,borderRadius:'50%',background:'radial-gradient(circle,#FFFDE7,#FFD700,#FFA500)',boxShadow:'0 0 20px #FFD700,0 0 40px rgba(255,200,0,0.4)',margin:'0 auto'}}/>;
  };

  // ── SCREENS ──
  if(screen==='todo') return(<><GardenBg/><div style={{position:'relative',zIndex:10,minHeight:'100vh',paddingBottom:80}}>
    <PriList hwZones={load('hw_zones',[])} onMoveToHw={(zoneId,task)=>{if(hwSaveTasksRef.current){hwSaveTasksRef.current(prev=>({...prev,[zoneId]:[...(prev[zoneId]||[]),task]}));}}} list={{...( priData.length>0?priData[0]:{id:'main',name:'To Do',tasks:[]}),tasks:(priData.length>0&&priData[0].tasks)?priData[0].tasks:[]}} onBack={()=>setScreen('home')} onUpdate={(updater)=>{
            setPriData(prevData=>{
              const currentList=prevData.length>0?prevData[0]:{id:'main',name:'To Do',tasks:[]};
              const newList=typeof updater==='function'?updater(currentList):updater;
              const seen=new Set();
              const dedupedTasks=(newList.tasks||[]).filter(t=>{if(seen.has(t.id))return false;seen.add(t.id);return true;});
              return [{...newList,tasks:dedupedTasks}];
            });
          }} matrixData={{}} setMatrixData={()=>{}} setScreen={setScreen} focusMins={focusMins} setFocusMins={setFocusMins} focusLeft={focusLeft} setFocusLeft={setFocusLeft} focusOn={focusOn} setFocusOn={setFocusOn} setFocusAlerted={setFocusAlerted} fmtTimer={fmtTimer}/>
    <NavBar current="todo" setScreen={setScreen}/>
  </div></>);

  if(screen==='housework') return(<><GardenBg/><div style={{position:'relative',zIndex:10,minHeight:'100vh',paddingBottom:80}}>
    <Housework setScreen={setScreen} hwZones={load('hw_zones',[])} saveTasksRef={hwSaveTasksRef} onMoveToPri={(task)=>{setPriData(prev=>{const list=prev[0]||{id:'main',name:'To Do',tasks:[]};const updated=[{...list,tasks:[...list.tasks,task]}];save('chores_pri',updated);return updated;});}}/>
    <NavBar current="housework" setScreen={setScreen}/>
  </div></>);

  if(screen==='shopping') return(<><GardenBg/><div style={{position:'relative',zIndex:10,minHeight:'100vh',paddingBottom:80}}>
    <ShoppingList data={shopData} setData={setShopData} setScreen={setScreen}/>
    <NavBar current="shopping" setScreen={setScreen}/>
  </div></>);

  if(screen==='meals') return(<><GardenBg/><div style={{position:'relative',zIndex:10,minHeight:'100vh',paddingBottom:80}}>
    <MealPlanner data={mealData} setData={setMealData} shopData={shopData} setShopData={setShopData} setScreen={setScreen}/>
    <NavBar current="meals" setScreen={setScreen}/>
  </div></>);

  // ── HOME ──
  const DEFAULT_TILES=[
    {id:'todo',     icon:'📋', name:'To Do',    color:'#5A7848', summary:'Tasks · A vs B · Focus timer'},
    {id:'housework',icon:'🏠', name:'Chores',   color:'#7A8A5A', summary:'Zones · Templates · A vs B'},
    {id:'shopping', icon:'🛒', name:'Shopping', color:'#4878A8', summary:'Categories · Smart lists'},
    {id:'meals',    icon:'🍽️', name:'Meal Plan',color:'#C07040', summary:'Weekly meals · Shopping link'},
  ];
  const TILES=tileOrder.map(id=>DEFAULT_TILES.find(t=>t.id===id)).filter(Boolean);
  return(
    <><GardenBg/>
    <div style={{position:'relative',zIndex:10,minHeight:'100vh',paddingBottom:80,fontFamily:"'Segoe UI',sans-serif"}}>

      {/* Install button */}
      <div style={{padding:'8px 16px 0'}}>
        <button onClick={()=>{
            if(installPrompt){installPrompt.prompt();installPrompt.userChoice.then(()=>setInstallPrompt(null));return;}
            const ua=navigator.userAgent;
            const isIOS=ua.indexOf('iPhone')>-1||ua.indexOf('iPad')>-1;
            const msg=isIOS?'On iPhone: tap Share then Add to Home Screen':'On Android Chrome: tap 3-dot menu then Add to Home Screen';
            alert(msg);
          }}
          style={{width:'100%',padding:'11px',background:installPrompt?'linear-gradient(135deg,#5A7848,#3A5828)':'rgba(255,255,255,0.75)',color:installPrompt?'#fff':'#3A5828',border:'1.5px solid rgba(90,120,72,0.30)',borderRadius:100,fontFamily:'Georgia,serif',fontWeight:700,fontSize:13,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
          📲 {installPrompt?'Install app — add to home screen':'How to add to home screen'}
        </button>
      </div>

      {/* Logo */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'16px 0 4px'}}>
        <img src="/logo.jpg" alt="Thinko Chores" style={{height:72,objectFit:'contain',filter:'drop-shadow(0 2px 10px rgba(0,0,0,0.15))'}}/>
      </div>

      {/* Greeting */}
      <div style={{textAlign:'center',padding:'10px 16px 16px'}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:10}}>{sunMoon()}</div>
        <div style={{fontFamily:'Georgia,serif',fontSize:26,fontWeight:900,color:'#0A1A08',textShadow:'0 2px 8px rgba(255,255,255,0.8)'}}>{greeting()}</div>
        <div style={{fontSize:12,color:'#3A2A18',fontWeight:600,marginTop:4,opacity:0.75}}>Your home, organised 🦔</div>
      </div>

      {/* 4 Tiles */}
      <div style={{padding:'0 16px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        {TILES.map(t=>(
          <div key={t.id}
            draggable
            onDragStart={e=>{e.dataTransfer.effectAllowed='move';setDragTile(t.id);}}
            onDragEnd={()=>{setDragTile(null);setDragOverTile(null);}}
            onDragOver={e=>{e.preventDefault();setDragOverTile(t.id);}}
            onDrop={e=>{
              e.preventDefault();
              if(!dragTile||dragTile===t.id){setDragTile(null);setDragOverTile(null);return;}
              const order=[...tileOrder];
              const from=order.indexOf(dragTile),to=order.indexOf(t.id);
              order.splice(to,0,...order.splice(from,1));
              saveTileOrder(order);setDragTile(null);setDragOverTile(null);
            }}
            onClick={()=>setScreen(t.id)}
            style={{background:dragOverTile===t.id?'rgba(90,120,72,0.15)':'linear-gradient(135deg,rgba(230,200,180,0.92) 0%,rgba(210,195,220,0.92) 35%,rgba(190,215,200,0.92) 70%,rgba(220,210,185,0.92) 100%)',borderRadius:22,padding:'20px 16px',border:`1.5px solid ${dragOverTile===t.id?'rgba(90,120,72,0.40)':'rgba(255,255,255,0.7)'}`,boxShadow:'0 4px 16px rgba(60,70,40,0.12)',cursor:'grab',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
            <span style={{fontSize:40}}>{t.icon}</span>
            <div style={{fontFamily:'Georgia,serif',fontWeight:700,fontSize:16,color:'#1A1A10'}}>{t.name}</div>
            <div style={{fontSize:11,color:'#5A4A30',opacity:0.8,lineHeight:1.3}}>{t.summary}</div>
            <div style={{width:32,height:3,borderRadius:2,background:t.color,marginTop:2}}/>
          </div>
        ))}
      </div>

      {/* Name input */}
      <div style={{padding:'20px 16px 0',textAlign:'center'}}>
        <div style={{display:'flex',gap:8}}>
          <input value={userName} onChange={e=>setUserName(e.target.value)}
            onKeyDown={e=>{if(e.key==='Enter'){setUserName(e.target.value);try{localStorage.setItem('chores_username',e.target.value);}catch{};}}}
            placeholder="Enter your name…"
            style={{flex:1,padding:'10px 14px',borderRadius:100,border:'1.5px solid rgba(180,160,140,0.35)',fontSize:13,color:'#1A1A10',background:'rgba(255,255,255,0.65)',outline:'none'}}/>
          <button onClick={()=>{
              try{localStorage.setItem('chores_username',userName);}catch{}
              setNameSaved(true);
              setTimeout(()=>setNameSaved(false),2000);
            }}
            style={{padding:'10px 16px',background:nameSaved?'#5A7848':'linear-gradient(135deg,#5A7848,#3A5828)',color:'#fff',border:'none',borderRadius:100,fontSize:13,fontWeight:700,cursor:'pointer',whiteSpace:'nowrap'}}>
            {nameSaved?'Saved! 🦔':'Save ✓'}
          </button>
        </div>
      </div>

      <NavBar current="home" setScreen={setScreen}/>
    </div></>
  );
}
