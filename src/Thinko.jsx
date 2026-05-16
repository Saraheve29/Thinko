import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// ── PWA INSTALL PROMPT ──────────────────────────────────────────────────────
let deferredInstallPrompt = null;
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
  });
}
const showInstallPrompt = async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    return outcome === 'accepted';
  }
  return false;
};


// Thinko v2.5 — Top3 Prioritizer · MindMap Goals · SendToDropdown · Ideas fix

/* ═══════════════════════════════════════════════════════
   THEME
═══════════════════════════════════════════════════════ */
const C = {
  dp:"#2C3820", mp:"#4A7038", pp:"#6A9058",
  lp:"#A8C5B0", ll:"#D4E4D8", pale:"#F0EBE0",
  wh:"#FFFFFF", txt:"#1A1A10", mid:"#5A5040",
  soft:"#8A8070", done:"#D8D0C0",
};
// ── AI CALL HELPER ──────────────────────────────────────────────────────────
// Gets API key from localStorage (user sets it once in Settings)
const getAIKey=()=>{try{return localStorage.getItem('thinko_ai_key')||"";}catch{return "";}};
const saveAIKey=k=>{try{localStorage.setItem('thinko_ai_key',k);}catch{}};

async function callAI(prompt, maxTokens=600) {
  const key = getAIKey();
  try {
    const headers = {"Content-Type":"application/json","anthropic-version":"2023-06-01"};
    if(key) headers["x-api-key"] = key;
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", headers,
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:maxTokens,messages:[{role:"user",content:prompt}]})
    });
    const j = await res.json();
    return j.content?.[0]?.text || null;
  } catch { return null; }
}

// Same as callAI but returns parsed JSON
async function callAIJson(prompt, maxTokens=500) {
  const raw = await callAI(prompt, maxTokens);
  if(!raw) return null;
  try { return JSON.parse(raw.replace(/```json|```/g,"").trim()); }
  catch { return null; }
}


const headerGrad  = `linear-gradient(135deg,#3A5030 0%,#4A6840 50%,#5A7850 100%)`;
const pageGrad    = `linear-gradient(180deg,#F5F0E4 0%,#EDE8D8 40%,#E5DFC8 100%)`;
const btnGrad     = `linear-gradient(135deg,#3D5A2A,#6A9058)`;
const cardGlass   = "rgba(252,248,238,0.75)";

/* ── GARDEN VINE BACKGROUND ── */
const GardenBg=()=>(
  <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
    <svg width="100%" height="100%" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* ── WALL ── */}
        <radialGradient id="wall" cx="48%" cy="35%" r="68%">
          <stop offset="0%" stopColor="#FAF8EE"/>
          <stop offset="40%" stopColor="#F3ECDB"/>
          <stop offset="100%" stopColor="#E8DFCA"/>
        </radialGradient>
        <radialGradient id="sunL" cx="90%" cy="4%" r="42%">
          <stop offset="0%" stopColor="rgba(235,212,148,0.50)"/>
          <stop offset="60%" stopColor="rgba(235,212,148,0.12)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="sunR" cx="10%" cy="58%" r="35%">
          <stop offset="0%" stopColor="rgba(180,210,150,0.13)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="vig" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="rgba(28,38,14,0.18)"/>
        </radialGradient>
        {/* ── LEAF FILLS — photographic layered gradients ── */}
        {/* Each leaf uses 3 gradients: base colour, light-face, dark-underside */}
        <radialGradient id="lf1" cx="35%" cy="28%" r="65%">
          <stop offset="0%" stopColor="#C8E882"/>
          <stop offset="40%" stopColor="#96C84A"/>
          <stop offset="75%" stopColor="#6EA028"/>
          <stop offset="100%" stopColor="#4A7818"/>
        </radialGradient>
        <radialGradient id="lf2" cx="30%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#BADE7A"/>
          <stop offset="45%" stopColor="#88B840"/>
          <stop offset="80%" stopColor="#629220"/>
          <stop offset="100%" stopColor="#407010"/>
        </radialGradient>
        <radialGradient id="lf3" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#D2EE98"/>
          <stop offset="35%" stopColor="#A0D05A"/>
          <stop offset="70%" stopColor="#78AA30"/>
          <stop offset="100%" stopColor="#528220"/>
        </radialGradient>
        <radialGradient id="lf4" cx="32%" cy="22%" r="72%">
          <stop offset="0%" stopColor="#C0E070"/>
          <stop offset="40%" stopColor="#8ABE42"/>
          <stop offset="78%" stopColor="#649A22"/>
          <stop offset="100%" stopColor="#447A14"/>
        </radialGradient>
        <radialGradient id="lf5" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#CAEA8A"/>
          <stop offset="42%" stopColor="#94CA4E"/>
          <stop offset="76%" stopColor="#6CA42C"/>
          <stop offset="100%" stopColor="#4A801C"/>
        </radialGradient>
        <radialGradient id="lf6" cx="28%" cy="20%" r="74%">
          <stop offset="0%" stopColor="#B8D868"/>
          <stop offset="45%" stopColor="#84B438"/>
          <stop offset="80%" stopColor="#5E9018"/>
          <stop offset="100%" stopColor="#3E6E0A"/>
        </radialGradient>
        <radialGradient id="lf7" cx="42%" cy="35%" r="58%">
          <stop offset="0%" stopColor="#D6F0A0"/>
          <stop offset="38%" stopColor="#A4D462"/>
          <stop offset="72%" stopColor="#7CAE38"/>
          <stop offset="100%" stopColor="#568828"/>
        </radialGradient>
        <radialGradient id="lf8" cx="33%" cy="27%" r="68%">
          <stop offset="0%" stopColor="#C4DE78"/>
          <stop offset="42%" stopColor="#90BC44"/>
          <stop offset="76%" stopColor="#6A9824"/>
          <stop offset="100%" stopColor="#487616"/>
        </radialGradient>
        {/* Surface highlight — soft white glow for 3D roundness */}
        <radialGradient id="hl" cx="30%" cy="22%" r="52%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.38)"/>
          <stop offset="50%" stopColor="rgba(255,255,255,0.10)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        <radialGradient id="hl2" cx="28%" cy="20%" r="48%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.30)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        {/* Midrib shadow — subtle darker strip down the centre */}
        <linearGradient id="mr" x1="45%" y1="0%" x2="55%" y2="100%">
          <stop offset="0%" stopColor="rgba(30,55,10,0)"/>
          <stop offset="20%" stopColor="rgba(30,55,10,0.09)"/>
          <stop offset="50%" stopColor="rgba(30,55,10,0.13)"/>
          <stop offset="80%" stopColor="rgba(30,55,10,0.09)"/>
          <stop offset="100%" stopColor="rgba(30,55,10,0)"/>
        </linearGradient>
        {/* Edge darkening for leaf depth */}
        <radialGradient id="ed" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="rgba(0,0,0,0)"/>
          <stop offset="100%" stopColor="rgba(20,40,8,0.22)"/>
        </radialGradient>
        {/* Stem gradients — woody bark */}
        <linearGradient id="stL" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5A4416"/>
          <stop offset="25%" stopColor="#7A6030"/>
          <stop offset="52%" stopColor="#8C7240"/>
          <stop offset="78%" stopColor="#6C5420"/>
          <stop offset="100%" stopColor="#503E12"/>
        </linearGradient>
        <linearGradient id="stR" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#5A4416"/>
          <stop offset="25%" stopColor="#7A6030"/>
          <stop offset="52%" stopColor="#8C7240"/>
          <stop offset="78%" stopColor="#6C5420"/>
          <stop offset="100%" stopColor="#503E12"/>
        </linearGradient>
        <linearGradient id="stH" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#684E1C"/>
          <stop offset="50%" stopColor="#7E6632"/>
          <stop offset="100%" stopColor="#5C4818"/>
        </linearGradient>
        {/* Photographic leaf shadow — large soft */}
        <filter id="ls" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
          <feOffset dx="2" dy="5"/>
          <feComposite in2="SourceGraphic"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.12  0 0 0 0 0.02  0 0 0 0.30 0"/>
        </filter>
        <filter id="ls2" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="1.5" dy="3.5"/>
          <feComposite in2="SourceGraphic"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.12  0 0 0 0 0.02  0 0 0 0.20 0"/>
        </filter>
        {/* Stem shadow */}
        <filter id="ss" x="-20%" y="-5%" width="140%" height="110%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="2" dy="0"/>
          <feComposite in2="SourceGraphic"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.10  0 0 0 0 0.02  0 0 0 0.25 0"/>
        </filter>
        {/* Subtle surface noise for photographic texture */}
        <filter id="tex">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend"/>
          <feComposite in="blend" in2="SourceGraphic" operator="in"/>
        </filter>
        <clipPath id="lc1"><ellipse cx="0" cy="0" rx="38" ry="52"/></clipPath>
      </defs>

      {/* Wall + lighting */}
      <rect width="390" height="844" fill="url(#wall)"/>
      <rect width="390" height="844" fill="url(#sunL)"/>
      <rect width="390" height="844" fill="url(#sunR)"/>

      {/* ═══════════════════════════════════════════
          STEMS — thick woody, bark texture
      ═══════════════════════════════════════════ */}
      {/* Left main stems */}
      <path d="M-8 844 Q10 755 0 662 Q-10 572 12 486 Q30 408 8 322 Q-10 244 16 158 Q34 90 12 22" stroke="url(#stL)" strokeWidth="8" fill="none" filter="url(#ss)" strokeLinecap="round"/>
      <path d="M16 844 Q32 758 22 672 Q12 588 32 504 Q50 428 30 342 Q12 264 36 180 Q52 114 32 48" stroke="url(#stL)" strokeWidth="4.5" fill="none" opacity="0.70" strokeLinecap="round"/>
      {/* Right main stems */}
      <path d="M398 844 Q380 755 390 662 Q400 572 378 486 Q360 408 382 322 Q400 244 374 158 Q356 90 378 22" stroke="url(#stR)" strokeWidth="8" fill="none" filter="url(#ss)" strokeLinecap="round"/>
      <path d="M374 844 Q358 758 368 672 Q378 588 358 504 Q340 428 360 342 Q378 264 354 180 Q338 114 358 48" stroke="url(#stR)" strokeWidth="4.5" fill="none" opacity="0.70" strokeLinecap="round"/>
      {/* Top canopy stems */}
      <path d="M-15 -4 Q58 20 132 9 Q198 0 265 16 Q324 30 398 12" stroke="url(#stH)" strokeWidth="5" fill="none" filter="url(#ss)" strokeLinecap="round"/>
      <path d="M-10 9 Q58 32 130 21 Q195 11 260 28 Q320 42 392 24" stroke="url(#stH)" strokeWidth="2.8" fill="none" opacity="0.60" strokeLinecap="round"/>
      <path d="M65 8 Q56 52 68 94 Q76 128 60 164" stroke="url(#stH)" strokeWidth="2.4" fill="none" opacity="0.55" strokeLinecap="round"/>
      <path d="M180 3 Q170 48 182 88 Q190 122 172 157" stroke="url(#stH)" strokeWidth="2.2" fill="none" opacity="0.52" strokeLinecap="round"/>
      <path d="M300 5 Q291 48 303 88 Q311 122 295 157" stroke="url(#stH)" strokeWidth="2.2" fill="none" opacity="0.50" strokeLinecap="round"/>

      {/* ═══════════════════════════════════════════
          LEAVES — each is 3 stacked shapes:
          1. Base fill (radial gradient = natural colour variation)
          2. Midrib shadow strip (subtle darker centre)
          3. Edge darkening (depth)
          4. Surface highlight (3D roundness)
          NO strokes at all.
      ═══════════════════════════════════════════ */}

      {/* ── MACRO: leaf painting function ──
          Each leaf is a <g transform> containing 4 paths.
          Heart-shaped: notch top, pointed tip, organic lobes.
          We use only filled shapes — zero strokes. */}

      {/* ════ LEFT LEAVES ════ */}

      {/* L1 */}
      <g transform="translate(8,816) rotate(-32)" filter="url(#ls)" opacity="0.96">
        <path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#lf1)"/>
        <path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#mr)"/>
        <path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#ed)"/>
        <path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#hl)"/>
      </g>
      {/* L2 */}
      <g transform="translate(-4,774) rotate(-26)" filter="url(#ls)" opacity="0.93">
        <path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#lf2)"/>
        <path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#mr)"/>
        <path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#ed)"/>
        <path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#hl2)"/>
      </g>
      {/* L3 */}
      <g transform="translate(14,732) rotate(-34)" filter="url(#ls)" opacity="0.94">
        <path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#lf3)"/>
        <path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#mr)"/>
        <path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#ed)"/>
        <path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#hl)"/>
      </g>
      {/* L4 */}
      <g transform="translate(10,688) rotate(-29)" filter="url(#ls)" opacity="0.92">
        <path d="M0-50 C-8-44-37-37-38-17 C-38 5-20 23 0 29 C20 23 38 5 38-17 C38-37 8-44 0-50Z" fill="url(#lf4)"/>
        <path d="M0-50 C-8-44-37-37-38-17 C-38 5-20 23 0 29 C20 23 38 5 38-17 C38-37 8-44 0-50Z" fill="url(#mr)"/>
        <path d="M0-50 C-8-44-37-37-38-17 C-38 5-20 23 0 29 C20 23 38 5 38-17 C38-37 8-44 0-50Z" fill="url(#ed)"/>
        <path d="M0-50 C-8-44-37-37-38-17 C-38 5-20 23 0 29 C20 23 38 5 38-17 C38-37 8-44 0-50Z" fill="url(#hl2)"/>
      </g>
      {/* L5 */}
      <g transform="translate(16,645) rotate(-31)" filter="url(#ls2)" opacity="0.90">
        <path d="M0-48 C-7-42-35-36-36-16 C-36 4-19 22 0 28 C19 22 36 4 36-16 C36-36 7-42 0-48Z" fill="url(#lf5)"/>
        <path d="M0-48 C-7-42-35-36-36-16 C-36 4-19 22 0 28 C19 22 36 4 36-16 C36-36 7-42 0-48Z" fill="url(#mr)"/>
        <path d="M0-48 C-7-42-35-36-36-16 C-36 4-19 22 0 28 C19 22 36 4 36-16 C36-36 7-42 0-48Z" fill="url(#ed)"/>
        <path d="M0-48 C-7-42-35-36-36-16 C-36 4-19 22 0 28 C19 22 36 4 36-16 C36-36 7-42 0-48Z" fill="url(#hl)"/>
      </g>
      {/* L6 */}
      <g transform="translate(-2,600) rotate(-27)" filter="url(#ls2)" opacity="0.88">
        <path d="M0-46 C-7-40-33-34-34-15 C-34 5-18 21 0 27 C18 21 34 5 34-15 C34-34 7-40 0-46Z" fill="url(#lf6)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 5-18 21 0 27 C18 21 34 5 34-15 C34-34 7-40 0-46Z" fill="url(#mr)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 5-18 21 0 27 C18 21 34 5 34-15 C34-34 7-40 0-46Z" fill="url(#ed)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 5-18 21 0 27 C18 21 34 5 34-15 C34-34 7-40 0-46Z" fill="url(#hl2)"/>
      </g>
      {/* L7 */}
      <g transform="translate(18,557) rotate(-30)" filter="url(#ls2)" opacity="0.86">
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#lf7)"/>
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#mr)"/>
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#ed)"/>
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#hl)"/>
      </g>
      {/* L8 */}
      <g transform="translate(20,510) rotate(-28)" filter="url(#ls2)" opacity="0.84">
        <path d="M0-47 C-7-41-34-35-35-16 C-35 4-18 21 0 27 C18 21 35 4 35-16 C35-35 7-41 0-47Z" fill="url(#lf8)"/>
        <path d="M0-47 C-7-41-34-35-35-16 C-35 4-18 21 0 27 C18 21 35 4 35-16 C35-35 7-41 0-47Z" fill="url(#mr)"/>
        <path d="M0-47 C-7-41-34-35-35-16 C-35 4-18 21 0 27 C18 21 35 4 35-16 C35-35 7-41 0-47Z" fill="url(#ed)"/>
        <path d="M0-47 C-7-41-34-35-35-16 C-35 4-18 21 0 27 C18 21 35 4 35-16 C35-35 7-41 0-47Z" fill="url(#hl2)"/>
      </g>
      {/* L9 */}
      <g transform="translate(18,462) rotate(-32)" filter="url(#ls2)" opacity="0.82">
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 21 0 27 C18 21 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#lf1)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 21 0 27 C18 21 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#mr)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 21 0 27 C18 21 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#ed)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 21 0 27 C18 21 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#hl)"/>
      </g>
      {/* L10 */}
      <g transform="translate(20,415) rotate(-29)" filter="url(#ls2)" opacity="0.80">
        <path d="M0-45 C-7-39-32-33-33-14 C-33 5-17 21 0 27 C17 21 33 5 33-14 C33-33 7-39 0-45Z" fill="url(#lf2)"/>
        <path d="M0-45 C-7-39-32-33-33-14 C-33 5-17 21 0 27 C17 21 33 5 33-14 C33-33 7-39 0-45Z" fill="url(#mr)"/>
        <path d="M0-45 C-7-39-32-33-33-14 C-33 5-17 21 0 27 C17 21 33 5 33-14 C33-33 7-39 0-45Z" fill="url(#ed)"/>
        <path d="M0-45 C-7-39-32-33-33-14 C-33 5-17 21 0 27 C17 21 33 5 33-14 C33-33 7-39 0-45Z" fill="url(#hl2)"/>
      </g>

      {/* Large corner leaves — top-left cluster */}
      {/* CL1 — biggest */}
      <g transform="translate(4,148) rotate(-44)" filter="url(#ls)" opacity="0.97">
        <path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#lf3)"/>
        <path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#mr)"/>
        <path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#ed)"/>
        <path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#hl)"/>
      </g>
      {/* CL2 */}
      <g transform="translate(20,104) rotate(-48)" filter="url(#ls)" opacity="0.98">
        <path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#lf1)"/>
        <path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#mr)"/>
        <path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#ed)"/>
        <path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#hl2)"/>
      </g>
      {/* CL3 */}
      <g transform="translate(-2,62) rotate(-46)" filter="url(#ls)" opacity="0.99">
        <path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#lf4)"/>
        <path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#mr)"/>
        <path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#ed)"/>
        <path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#hl)"/>
      </g>
      {/* CL4 */}
      <g transform="translate(16,22) rotate(-50)" filter="url(#ls)" opacity="1.0">
        <path d="M0-76 C-14-66-57-55-59-24 C-59 10-31 38 0 46 C31 38 59 10 59-24 C59-55 14-66 0-76Z" fill="url(#lf5)"/>
        <path d="M0-76 C-14-66-57-55-59-24 C-59 10-31 38 0 46 C31 38 59 10 59-24 C59-55 14-66 0-76Z" fill="url(#mr)"/>
        <path d="M0-76 C-14-66-57-55-59-24 C-59 10-31 38 0 46 C31 38 59 10 59-24 C59-55 14-66 0-76Z" fill="url(#ed)"/>
        <path d="M0-76 C-14-66-57-55-59-24 C-59 10-31 38 0 46 C31 38 59 10 59-24 C59-55 14-66 0-76Z" fill="url(#hl2)"/>
      </g>
      {/* CL5 */}
      <g transform="translate(-8,10) rotate(-42)" filter="url(#ls)" opacity="1.0">
        <path d="M0-70 C-12-61-52-51-54-22 C-54 8-28 33 0 41 C28 33 54 8 54-22 C54-51 12-61 0-70Z" fill="url(#lf6)"/>
        <path d="M0-70 C-12-61-52-51-54-22 C-54 8-28 33 0 41 C28 33 54 8 54-22 C54-51 12-61 0-70Z" fill="url(#mr)"/>
        <path d="M0-70 C-12-61-52-51-54-22 C-54 8-28 33 0 41 C28 33 54 8 54-22 C54-51 12-61 0-70Z" fill="url(#ed)"/>
        <path d="M0-70 C-12-61-52-51-54-22 C-54 8-28 33 0 41 C28 33 54 8 54-22 C54-51 12-61 0-70Z" fill="url(#hl)"/>
      </g>
      {/* Extra small accent leaves top-left */}
      <g transform="translate(56,18) rotate(-34)" filter="url(#ls2)" opacity="0.90">
        <path d="M0-52 C-8-46-38-38-39-17 C-39 5-20 23 0 29 C20 23 39 5 39-17 C39-38 8-46 0-52Z" fill="url(#lf7)"/>
        <path d="M0-52 C-8-46-38-38-39-17 C-39 5-20 23 0 29 C20 23 39 5 39-17 C39-38 8-46 0-52Z" fill="url(#mr)"/>
        <path d="M0-52 C-8-46-38-38-39-17 C-39 5-20 23 0 29 C20 23 39 5 39-17 C39-38 8-46 0-52Z" fill="url(#ed)"/>
        <path d="M0-52 C-8-46-38-38-39-17 C-39 5-20 23 0 29 C20 23 39 5 39-17 C39-38 8-46 0-52Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(92,-2) rotate(-26)" filter="url(#ls2)" opacity="0.85">
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 20 0 26 C18 20 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#lf8)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 20 0 26 C18 20 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#mr)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 20 0 26 C18 20 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#ed)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 20 0 26 C18 20 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#hl)"/>
      </g>
      <g transform="translate(40,-6) rotate(-38)" filter="url(#ls2)" opacity="0.88">
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#lf2)"/>
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#mr)"/>
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#ed)"/>
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#hl2)"/>
      </g>

      {/* ════ RIGHT LEAVES — mirror ════ */}
      <g transform="translate(382,816) rotate(32)" filter="url(#ls)" opacity="0.96">
        <path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#lf2)"/>
        <path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#mr)"/>
        <path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#ed)"/>
        <path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(394,774) rotate(26)" filter="url(#ls)" opacity="0.93">
        <path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#lf3)"/>
        <path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#mr)"/>
        <path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#ed)"/>
        <path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#hl)"/>
      </g>
      <g transform="translate(376,732) rotate(34)" filter="url(#ls)" opacity="0.94">
        <path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#lf4)"/>
        <path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#mr)"/>
        <path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#ed)"/>
        <path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(380,688) rotate(29)" filter="url(#ls)" opacity="0.92">
        <path d="M0-50 C-8-44-37-37-38-17 C-38 5-20 23 0 29 C20 23 38 5 38-17 C38-37 8-44 0-50Z" fill="url(#lf5)"/>
        <path d="M0-50 C-8-44-37-37-38-17 C-38 5-20 23 0 29 C20 23 38 5 38-17 C38-37 8-44 0-50Z" fill="url(#mr)"/>
        <path d="M0-50 C-8-44-37-37-38-17 C-38 5-20 23 0 29 C20 23 38 5 38-17 C38-37 8-44 0-50Z" fill="url(#ed)"/>
        <path d="M0-50 C-8-44-37-37-38-17 C-38 5-20 23 0 29 C20 23 38 5 38-17 C38-37 8-44 0-50Z" fill="url(#hl)"/>
      </g>
      <g transform="translate(374,645) rotate(31)" filter="url(#ls2)" opacity="0.90">
        <path d="M0-48 C-7-42-35-36-36-16 C-36 4-19 22 0 28 C19 22 36 4 36-16 C36-36 7-42 0-48Z" fill="url(#lf6)"/>
        <path d="M0-48 C-7-42-35-36-36-16 C-36 4-19 22 0 28 C19 22 36 4 36-16 C36-36 7-42 0-48Z" fill="url(#mr)"/>
        <path d="M0-48 C-7-42-35-36-36-16 C-36 4-19 22 0 28 C19 22 36 4 36-16 C36-36 7-42 0-48Z" fill="url(#ed)"/>
        <path d="M0-48 C-7-42-35-36-36-16 C-36 4-19 22 0 28 C19 22 36 4 36-16 C36-36 7-42 0-48Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(392,600) rotate(27)" filter="url(#ls2)" opacity="0.88">
        <path d="M0-46 C-7-40-33-34-34-15 C-34 5-18 21 0 27 C18 21 34 5 34-15 C34-34 7-40 0-46Z" fill="url(#lf7)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 5-18 21 0 27 C18 21 34 5 34-15 C34-34 7-40 0-46Z" fill="url(#mr)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 5-18 21 0 27 C18 21 34 5 34-15 C34-34 7-40 0-46Z" fill="url(#ed)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 5-18 21 0 27 C18 21 34 5 34-15 C34-34 7-40 0-46Z" fill="url(#hl)"/>
      </g>
      <g transform="translate(372,557) rotate(30)" filter="url(#ls2)" opacity="0.86">
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#lf8)"/>
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#mr)"/>
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#ed)"/>
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(370,510) rotate(28)" filter="url(#ls2)" opacity="0.84">
        <path d="M0-47 C-7-41-34-35-35-16 C-35 4-18 21 0 27 C18 21 35 4 35-16 C35-35 7-41 0-47Z" fill="url(#lf1)"/>
        <path d="M0-47 C-7-41-34-35-35-16 C-35 4-18 21 0 27 C18 21 35 4 35-16 C35-35 7-41 0-47Z" fill="url(#mr)"/>
        <path d="M0-47 C-7-41-34-35-35-16 C-35 4-18 21 0 27 C18 21 35 4 35-16 C35-35 7-41 0-47Z" fill="url(#ed)"/>
        <path d="M0-47 C-7-41-34-35-35-16 C-35 4-18 21 0 27 C18 21 35 4 35-16 C35-35 7-41 0-47Z" fill="url(#hl)"/>
      </g>
      <g transform="translate(372,462) rotate(32)" filter="url(#ls2)" opacity="0.82">
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 21 0 27 C18 21 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#lf2)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 21 0 27 C18 21 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#mr)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 21 0 27 C18 21 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#ed)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 21 0 27 C18 21 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(370,415) rotate(29)" filter="url(#ls2)" opacity="0.80">
        <path d="M0-45 C-7-39-32-33-33-14 C-33 5-17 21 0 27 C17 21 33 5 33-14 C33-33 7-39 0-45Z" fill="url(#lf3)"/>
        <path d="M0-45 C-7-39-32-33-33-14 C-33 5-17 21 0 27 C17 21 33 5 33-14 C33-33 7-39 0-45Z" fill="url(#mr)"/>
        <path d="M0-45 C-7-39-32-33-33-14 C-33 5-17 21 0 27 C17 21 33 5 33-14 C33-33 7-39 0-45Z" fill="url(#ed)"/>
        <path d="M0-45 C-7-39-32-33-33-14 C-33 5-17 21 0 27 C17 21 33 5 33-14 C33-33 7-39 0-45Z" fill="url(#hl)"/>
      </g>
      {/* Top-right corner cluster */}
      <g transform="translate(386,148) rotate(44)" filter="url(#ls)" opacity="0.97">
        <path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#lf4)"/>
        <path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#mr)"/>
        <path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#ed)"/>
        <path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(370,104) rotate(48)" filter="url(#ls)" opacity="0.98">
        <path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#lf5)"/>
        <path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#mr)"/>
        <path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#ed)"/>
        <path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#hl)"/>
      </g>
      <g transform="translate(392,62) rotate(46)" filter="url(#ls)" opacity="0.99">
        <path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#lf6)"/>
        <path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#mr)"/>
        <path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#ed)"/>
        <path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(374,22) rotate(50)" filter="url(#ls)" opacity="1.0">
        <path d="M0-76 C-14-66-57-55-59-24 C-59 10-31 38 0 46 C31 38 59 10 59-24 C59-55 14-66 0-76Z" fill="url(#lf7)"/>
        <path d="M0-76 C-14-66-57-55-59-24 C-59 10-31 38 0 46 C31 38 59 10 59-24 C59-55 14-66 0-76Z" fill="url(#mr)"/>
        <path d="M0-76 C-14-66-57-55-59-24 C-59 10-31 38 0 46 C31 38 59 10 59-24 C59-55 14-66 0-76Z" fill="url(#ed)"/>
        <path d="M0-76 C-14-66-57-55-59-24 C-59 10-31 38 0 46 C31 38 59 10 59-24 C59-55 14-66 0-76Z" fill="url(#hl)"/>
      </g>
      <g transform="translate(398,10) rotate(42)" filter="url(#ls)" opacity="1.0">
        <path d="M0-70 C-12-61-52-51-54-22 C-54 8-28 33 0 41 C28 33 54 8 54-22 C54-51 12-61 0-70Z" fill="url(#lf8)"/>
        <path d="M0-70 C-12-61-52-51-54-22 C-54 8-28 33 0 41 C28 33 54 8 54-22 C54-51 12-61 0-70Z" fill="url(#mr)"/>
        <path d="M0-70 C-12-61-52-51-54-22 C-54 8-28 33 0 41 C28 33 54 8 54-22 C54-51 12-61 0-70Z" fill="url(#ed)"/>
        <path d="M0-70 C-12-61-52-51-54-22 C-54 8-28 33 0 41 C28 33 54 8 54-22 C54-51 12-61 0-70Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(334,18) rotate(34)" filter="url(#ls2)" opacity="0.90">
        <path d="M0-52 C-8-46-38-38-39-17 C-39 5-20 23 0 29 C20 23 39 5 39-17 C39-38 8-46 0-52Z" fill="url(#lf1)"/>
        <path d="M0-52 C-8-46-38-38-39-17 C-39 5-20 23 0 29 C20 23 39 5 39-17 C39-38 8-46 0-52Z" fill="url(#mr)"/>
        <path d="M0-52 C-8-46-38-38-39-17 C-39 5-20 23 0 29 C20 23 39 5 39-17 C39-38 8-46 0-52Z" fill="url(#ed)"/>
        <path d="M0-52 C-8-46-38-38-39-17 C-39 5-20 23 0 29 C20 23 39 5 39-17 C39-38 8-46 0-52Z" fill="url(#hl)"/>
      </g>
      <g transform="translate(298,-2) rotate(26)" filter="url(#ls2)" opacity="0.85">
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 20 0 26 C18 20 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#lf2)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 20 0 26 C18 20 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#mr)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 20 0 26 C18 20 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#ed)"/>
        <path d="M0-46 C-7-40-33-34-34-15 C-34 4-18 20 0 26 C18 20 34 4 34-15 C34-34 7-40 0-46Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(350,-6) rotate(38)" filter="url(#ls2)" opacity="0.88">
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#lf3)"/>
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#mr)"/>
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#ed)"/>
        <path d="M0-50 C-8-44-36-37-37-17 C-37 5-19 23 0 29 C19 23 37 5 37-17 C37-37 8-44 0-50Z" fill="url(#hl)"/>
      </g>

      {/* ════ TOP CANOPY ════ */}
      <g transform="translate(10,2) rotate(-165)" filter="url(#ls)" opacity="0.96">
        <path d="M0-60 C-10-52-44-44-46-20 C-46 7-24 28 0 35 C24 28 46 7 46-20 C46-44 10-52 0-60Z" fill="url(#lf1)"/>
        <path d="M0-60 C-10-52-44-44-46-20 C-46 7-24 28 0 35 C24 28 46 7 46-20 C46-44 10-52 0-60Z" fill="url(#mr)"/>
        <path d="M0-60 C-10-52-44-44-46-20 C-46 7-24 28 0 35 C24 28 46 7 46-20 C46-44 10-52 0-60Z" fill="url(#ed)"/>
        <path d="M0-60 C-10-52-44-44-46-20 C-46 7-24 28 0 35 C24 28 46 7 46-20 C46-44 10-52 0-60Z" fill="url(#hl)"/>
      </g>
      <g transform="translate(46,-14) rotate(-168)" filter="url(#ls)" opacity="0.93">
        <path d="M0-56 C-9-49-42-41-43-18 C-43 6-22 26 0 33 C22 26 43 6 43-18 C43-41 9-49 0-56Z" fill="url(#lf4)"/>
        <path d="M0-56 C-9-49-42-41-43-18 C-43 6-22 26 0 33 C22 26 43 6 43-18 C43-41 9-49 0-56Z" fill="url(#mr)"/>
        <path d="M0-56 C-9-49-42-41-43-18 C-43 6-22 26 0 33 C22 26 43 6 43-18 C43-41 9-49 0-56Z" fill="url(#ed)"/>
        <path d="M0-56 C-9-49-42-41-43-18 C-43 6-22 26 0 33 C22 26 43 6 43-18 C43-41 9-49 0-56Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(30,20) rotate(-158)" filter="url(#ls)" opacity="0.94">
        <path d="M0-58 C-10-51-43-43-44-19 C-44 7-23 27 0 34 C23 27 44 7 44-19 C44-43 10-51 0-58Z" fill="url(#lf7)"/>
        <path d="M0-58 C-10-51-43-43-44-19 C-44 7-23 27 0 34 C23 27 44 7 44-19 C44-43 10-51 0-58Z" fill="url(#mr)"/>
        <path d="M0-58 C-10-51-43-43-44-19 C-44 7-23 27 0 34 C23 27 44 7 44-19 C44-43 10-51 0-58Z" fill="url(#ed)"/>
        <path d="M0-58 C-10-51-43-43-44-19 C-44 7-23 27 0 34 C23 27 44 7 44-19 C44-43 10-51 0-58Z" fill="url(#hl)"/>
      </g>
      <g transform="translate(80,26) rotate(-163)" filter="url(#ls)" opacity="0.92">
        <path d="M0-56 C-9-49-42-41-43-18 C-43 6-22 26 0 33 C22 26 43 6 43-18 C43-41 9-49 0-56Z" fill="url(#lf2)"/>
        <path d="M0-56 C-9-49-42-41-43-18 C-43 6-22 26 0 33 C22 26 43 6 43-18 C43-41 9-49 0-56Z" fill="url(#mr)"/>
        <path d="M0-56 C-9-49-42-41-43-18 C-43 6-22 26 0 33 C22 26 43 6 43-18 C43-41 9-49 0-56Z" fill="url(#ed)"/>
        <path d="M0-56 C-9-49-42-41-43-18 C-43 6-22 26 0 33 C22 26 43 6 43-18 C43-41 9-49 0-56Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(100,-8) rotate(-170)" filter="url(#ls)" opacity="0.90">
        <path d="M0-52 C-8-46-38-39-39-17 C-39 5-20 24 0 30 C20 24 39 5 39-17 C39-39 8-46 0-52Z" fill="url(#lf5)"/>
        <path d="M0-52 C-8-46-38-39-39-17 C-39 5-20 24 0 30 C20 24 39 5 39-17 C39-39 8-46 0-52Z" fill="url(#mr)"/>
        <path d="M0-52 C-8-46-38-39-39-17 C-39 5-20 24 0 30 C20 24 39 5 39-17 C39-39 8-46 0-52Z" fill="url(#ed)"/>
        <path d="M0-52 C-8-46-38-39-39-17 C-39 5-20 24 0 30 C20 24 39 5 39-17 C39-39 8-46 0-52Z" fill="url(#hl)"/>
      </g>
      <g transform="translate(152,16) rotate(-160)" filter="url(#ls)" opacity="0.91">
        <path d="M0-54 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-54Z" fill="url(#lf6)"/>
        <path d="M0-54 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-54Z" fill="url(#mr)"/>
        <path d="M0-54 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-54Z" fill="url(#ed)"/>
        <path d="M0-54 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-54Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(202,18) rotate(-164)" filter="url(#ls)" opacity="0.89">
        <path d="M0-54 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-54Z" fill="url(#lf3)"/>
        <path d="M0-54 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-54Z" fill="url(#mr)"/>
        <path d="M0-54 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-54Z" fill="url(#ed)"/>
        <path d="M0-54 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-54Z" fill="url(#hl)"/>
      </g>
      <g transform="translate(255,14) rotate(-159)" filter="url(#ls)" opacity="0.88">
        <path d="M0-52 C-8-46-38-39-39-17 C-39 5-20 24 0 30 C20 24 39 5 39-17 C39-39 8-46 0-52Z" fill="url(#lf8)"/>
        <path d="M0-52 C-8-46-38-39-39-17 C-39 5-20 24 0 30 C20 24 39 5 39-17 C39-39 8-46 0-52Z" fill="url(#mr)"/>
        <path d="M0-52 C-8-46-38-39-39-17 C-39 5-20 24 0 30 C20 24 39 5 39-17 C39-39 8-46 0-52Z" fill="url(#ed)"/>
        <path d="M0-52 C-8-46-38-39-39-17 C-39 5-20 24 0 30 C20 24 39 5 39-17 C39-39 8-46 0-52Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(310,16) rotate(-163)" filter="url(#ls)" opacity="0.89">
        <path d="M0-54 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-54Z" fill="url(#lf1)"/>
        <path d="M0-54 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-54Z" fill="url(#mr)"/>
        <path d="M0-54 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-54Z" fill="url(#ed)"/>
        <path d="M0-54 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-54Z" fill="url(#hl)"/>
      </g>
      <g transform="translate(346,-10) rotate(-167)" filter="url(#ls)" opacity="0.91">
        <path d="M0-56 C-9-49-42-41-43-18 C-43 6-22 26 0 33 C22 26 43 6 43-18 C43-41 9-49 0-56Z" fill="url(#lf4)"/>
        <path d="M0-56 C-9-49-42-41-43-18 C-43 6-22 26 0 33 C22 26 43 6 43-18 C43-41 9-49 0-56Z" fill="url(#mr)"/>
        <path d="M0-56 C-9-49-42-41-43-18 C-43 6-22 26 0 33 C22 26 43 6 43-18 C43-41 9-49 0-56Z" fill="url(#ed)"/>
        <path d="M0-56 C-9-49-42-41-43-18 C-43 6-22 26 0 33 C22 26 43 6 43-18 C43-41 9-49 0-56Z" fill="url(#hl2)"/>
      </g>
      <g transform="translate(380,12) rotate(-160)" filter="url(#ls)" opacity="0.92">
        <path d="M0-58 C-10-51-43-43-44-19 C-44 7-23 27 0 34 C23 27 44 7 44-19 C44-43 10-51 0-58Z" fill="url(#lf6)"/>
        <path d="M0-58 C-10-51-43-43-44-19 C-44 7-23 27 0 34 C23 27 44 7 44-19 C44-43 10-51 0-58Z" fill="url(#mr)"/>
        <path d="M0-58 C-10-51-43-43-44-19 C-44 7-23 27 0 34 C23 27 44 7 44-19 C44-43 10-51 0-58Z" fill="url(#ed)"/>
        <path d="M0-58 C-10-51-43-43-44-19 C-44 7-23 27 0 34 C23 27 44 7 44-19 C44-43 10-51 0-58Z" fill="url(#hl)"/>
      </g>

      {/* ════ GROUND FOLIAGE ════ */}
      <ellipse cx="32" cy="840" rx="72" ry="28" fill="#5EA026" opacity="0.52"/>
      <ellipse cx="4" cy="844" rx="50" ry="22" fill="#7EC040" opacity="0.46"/>
      <ellipse cx="84" cy="844" rx="60" ry="24" fill="#4E9018" opacity="0.48"/>
      <ellipse cx="150" cy="844" rx="44" ry="16" fill="#76AE36" opacity="0.40"/>
      <ellipse cx="358" cy="840" rx="72" ry="28" fill="#5EA026" opacity="0.52"/>
      <ellipse cx="386" cy="844" rx="50" ry="22" fill="#7EC040" opacity="0.46"/>
      <ellipse cx="306" cy="844" rx="60" ry="24" fill="#4E9018" opacity="0.48"/>
      <ellipse cx="240" cy="844" rx="44" ry="16" fill="#76AE36" opacity="0.40"/>
      <ellipse cx="195" cy="844" rx="36" ry="14" fill="#5EA026" opacity="0.36"/>

      <rect width="390" height="844" fill="url(#vig)"/>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════ */
function Header({ title, onBack, right }) {
  return (
    <div style={{
      background:"rgba(248,245,236,0.92)",
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

function GlassCard({ children, style={} }) {
  return (
    <div style={{ background:"rgba(255,255,255,0.90)", borderRadius:16, padding:"14px", boxShadow:"0 2px 12px rgba(90,80,60,0.09)", border:`1.5px solid ${C.ll}`, ...style }}>
      {children}
    </div>
  );
}

function PurpleBtn({ children, onClick, style={}, small=false }) {
  return (
    <button onClick={onClick} style={{ background:btnGrad, color:"#1A1A10", border:"none", borderRadius:small?8:12, padding:small?"5px 12px":"10px 20px", fontWeight:800, fontSize:small?13:15, cursor:"pointer", boxShadow:"0 3px 12px rgba(90,80,60,0.25)", ...style }}>
      {children}
    </button>
  );
}

/* ── Shared URL field — paste a link, tap to open ─────── */
function UrlField({value, onChange, style={}}) {
  const clean = v => v?.trim().startsWith("http") ? v.trim() : v?.trim() ? "https://"+v.trim() : "";
  return (
    <div style={{display:"flex",alignItems:"center",gap:6,...style}}>
      <span style={{fontSize:14,flexShrink:0}}>🔗</span>
      <input
        value={value||""}
        onChange={e=>onChange(e.target.value)}
        placeholder="Paste website address (optional)"
        style={{flex:1,padding:"7px 10px",borderRadius:9,border:`1.5px solid ${C.ll}`,fontSize:12,color:C.txt,outline:"none",background:C.pale,fontWeight:600}}
      />
      {value?.trim()&&(
        <button onClick={()=>window.open(clean(value),"_blank")}
          style={{background:C.pp,color:"#1A1A10",border:"none",borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:800,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
          Open ↗
        </button>
      )}
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
const SWATCHES = [
  {id:"purple",fill:"#5A7848",border:"#7d3c98",num:"#7d3c98"},
  {id:"rose",  fill:"#e91e8c",border:"#c2185b",num:"#c2185b"},
  {id:"red",   fill:"#FF1744",border:"#D50000",num:"#D50000"},
  {id:"orange",fill:"#e67e22",border:"#ca6f1e",num:"#ca6f1e"},
  {id:"amber", fill:"#f39c12",border:"#d68910",num:"#b7770d"},
  {id:"green", fill:"#27ae60",border:"#1e8449",num:"#1e8449"},
  {id:"teal",  fill:"#1abc9c",border:"#148f77",num:"#148f77"},
  {id:"blue",  fill:"#2980b9",border:"#1a5276",num:"#1a5276"},
  {id:"lilac", fill:"#c4aee8",border:"#9b7dd4",num:"#5A7848"},
];
const swatchById = id => SWATCHES.find(s=>s.id===id)||SWATCHES[8];
const BREAK_PRESETS = [5,10,15,20,30];

const spinBtnStyle = { borderRadius:8,width:34,height:34,fontSize:22,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1,border:"none" };

/* ── ScrollPicker — drum-roll number input like iOS clock ── */
function ScrollPicker({value,max,onChange,label}){
  const items=Array.from({length:max+1},(_,i)=>i);
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,flex:1}}>
      <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{label}</div>
      <div style={{position:"relative",height:120,overflow:"hidden",width:"100%"}}>
        {/* Selection highlight */}
        <div style={{position:"absolute",top:"50%",left:0,right:0,height:40,transform:"translateY(-50%)",background:"rgba(160,190,140,0.35)",borderRadius:10,border:"1px solid rgba(160,190,140,0.35)",pointerEvents:"none",zIndex:1}}/>
        {/* Fade top/bottom */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:36,background:"linear-gradient(to bottom,rgba(10,1,30,0.9),transparent)",zIndex:2,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:36,background:"linear-gradient(to top,rgba(10,1,30,0.9),transparent)",zIndex:2,pointerEvents:"none"}}/>
        <div style={{overflowY:"scroll",height:"100%",scrollSnapType:"y mandatory",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}}
          ref={el=>{
            if(el&&el._initiated!==value){
              el.scrollTop=(value)*40;
              el._initiated=value;
            }
          }}
          onScroll={e=>{
            const idx=Math.round(e.target.scrollTop/40);
            if(idx>=0&&idx<=max)onChange(idx);
          }}>
          <div style={{height:40}}/>
          {items.map(n=>(
            <div key={n} style={{height:40,display:"flex",alignItems:"center",justifyContent:"center",scrollSnapAlign:"center",fontFamily:"monospace",fontSize:26,fontWeight:n===value?900:400,color:n===value?"#fff":"rgba(255,255,255,0.3)",transition:"all 0.1s",cursor:"pointer"}}
              onClick={()=>onChange(n)}>
              {String(n).padStart(2,"0")}
            </div>
          ))}
          <div style={{height:40}}/>
        </div>
      </div>
    </div>
  );
}

/* ── Alarm — loops until stopped ── */
let _alarmInterval=null;
function stopAlarm(){if(_alarmInterval){clearInterval(_alarmInterval);_alarmInterval=null;}}
function playAlarm(type){
  stopAlarm();
  const ring=()=>{try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const master=ctx.createGain();master.gain.setValueAtTime(0.6,ctx.currentTime);master.connect(ctx.destination);
    if(type==="gentle"){
      [0,0.3,0.6,0.9].forEach((t,i)=>{const osc=ctx.createOscillator();const g=ctx.createGain();osc.connect(g);g.connect(master);osc.type="sine";osc.frequency.setValueAtTime([528,660,792,528][i],ctx.currentTime+t);g.gain.setValueAtTime(0.5,ctx.currentTime+t);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+t+0.6);osc.start(ctx.currentTime+t);osc.stop(ctx.currentTime+t+0.6);});
      setTimeout(()=>ctx.close(),2000);
    } else if(type==="focus"){
      [0,0.2,0.4].forEach(t=>{const osc=ctx.createOscillator();const g=ctx.createGain();osc.connect(g);g.connect(master);osc.type="square";osc.frequency.setValueAtTime(660,ctx.currentTime+t);g.gain.setValueAtTime(0.3,ctx.currentTime+t);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+t+0.15);osc.start(ctx.currentTime+t);osc.stop(ctx.currentTime+t+0.15);});
      setTimeout(()=>ctx.close(),1500);
    } else {
      [0,0.5,1.0].forEach(t=>{const osc=ctx.createOscillator();const g=ctx.createGain();osc.connect(g);g.connect(master);osc.type="sine";osc.frequency.setValueAtTime(880,ctx.currentTime+t);osc.frequency.exponentialRampToValueAtTime(440,ctx.currentTime+t+0.4);g.gain.setValueAtTime(0.8,ctx.currentTime+t);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+t+0.8);osc.start(ctx.currentTime+t);osc.stop(ctx.currentTime+t+0.8);});
      setTimeout(()=>ctx.close(),3000);
    }
  }catch(e){console.log("Audio",e);}};
  ring();_alarmInterval=setInterval(ring,3000);
}


function TimerWidget({icon,label,mins,setMins,left,start,stop,fmt,glass,accent,accentText,setScreen}) {
  const [h,setH]=useState(0);
  const [m,setM]=useState(mins||5);
  const [s,setS]=useState(0);
  const pct=left!==null?(left/((h*3600+m*60+s)||1))*100:100;
  const totalSecs=h*3600+m*60+s;
  const bg=glass?"rgba(255,255,255,0.18)":`${accent}`;
  const border=glass?"1.5px solid rgba(255,255,255,0.35)":`1.5px solid ${accent}`;
  const numColor=glass?C.wh:C.dp;
  const barFill=glass?"rgba(255,255,255,0.85)":accent;

  const handleStart=()=>{
    // sync mins for backwards compat
    if(setMins)setMins(Math.max(1,Math.round(totalSecs/60)));
    start(totalSecs);
  };

  return (
    <div style={{background:bg,backdropFilter:glass?"blur(8px)":"none",border,borderRadius:18,padding:"13px 14px",boxShadow:glass?"0 4px 20px rgba(90,80,60,0.18)":"none"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <span style={{fontSize:20}}>{icon}</span>
        <div style={{fontSize:11,fontWeight:800,color:glass?"rgba(255,255,255,0.75)":accent,textTransform:"uppercase",letterSpacing:1.4,flex:1}}>{label}</div>
        {setScreen&&!left&&(
          <button onClick={()=>setScreen("rest")} style={{background:"rgba(30,92,58,0.4)",color:"#52c47a",border:"1px solid rgba(82,196,122,0.4)",borderRadius:10,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>🌿 Rest</button>
        )}
      </div>
      {left!==null?(
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontFamily:"monospace",fontSize:36,fontWeight:900,lineHeight:1,color:left<60?(glass?"#ffb3b3":"#c0392b"):numColor,flex:1,textAlign:"center"}}>{fmt(left)}</div>
          <button onClick={stop} style={{background:accentText,color:"#1A1A10",border:"none",borderRadius:12,width:46,height:46,fontSize:18,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
      ):(
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{display:"flex",flex:1,gap:0,background:"rgba(0,0,0,0.25)",borderRadius:14,overflow:"hidden",padding:"0 8px"}}>
            <ScrollPicker value={h} max={23} onChange={setH} label="h"/>
            <div style={{width:1,background:"rgba(255,255,255,0.15)",alignSelf:"center",height:60}}/>
            <ScrollPicker value={m} max={59} onChange={v=>{setM(v);if(setMins)setMins(v);}} label="min"/>
            <div style={{width:1,background:"rgba(255,255,255,0.15)",alignSelf:"center",height:60}}/>
            <ScrollPicker value={s} max={59} onChange={setS} label="sec"/>
          </div>
          <button onClick={handleStart} disabled={totalSecs===0} style={{background:totalSecs===0?"rgba(255,255,255,0.15)":accentText,color:"#1A1A10",border:"none",borderRadius:12,width:46,height:46,fontSize:22,cursor:totalSecs===0?"default":"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",opacity:totalSecs===0?0.4:1}}>▶</button>
        </div>
      )}
      {left!==null&&(
        <div style={{height:5,borderRadius:3,background:"rgba(255,255,255,0.15)",overflow:"hidden",marginTop:10}}>
          <div style={{height:"100%",width:`${pct}%`,borderRadius:3,background:left<60?(glass?"#ffb3b3":"#e74c3c"):barFill,transition:"width 1s linear"}}/>
        </div>
      )}
    </div>
  );
}


function BreakTimer({setScreen}) {
  const [mins,setMins]=useState(5);
  const [left,setLeft]=useState(null);
  const [on,setOn]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    if(on&&left>0)ref.current=setInterval(()=>setLeft(l=>l-1),1000);
    else{clearInterval(ref.current);if(left===0){setOn(false);playAlarm("gentle");}}
    return()=>clearInterval(ref.current);
  },[on,left]);
  const toggle=()=>{
    if(on){setOn(false);clearInterval(ref.current);}
    else{
      if(left===null)setLeft(mins*60);
      setOn(true);
    }
  };
  const reset=()=>{setOn(false);setLeft(null);clearInterval(ref.current);};
  const totalSecs=mins*60;
  const displaySecs=left!==null?left:totalSecs;
  const hh=String(Math.floor(displaySecs/3600)).padStart(2,"0");
  const mm=String(Math.floor((displaySecs%3600)/60)).padStart(2,"0");
  const ss=String(displaySecs%60).padStart(2,"0");
  return (
    <div style={{marginBottom:18}}>
      {/* Break Timer header row */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:"#1A1A10",letterSpacing:-0.3}}>Break Timer</span>
          <span style={{fontSize:20}}>☕</span>
        </div>
        {/* Play/Pause button — large sage circle */}
        <button onClick={toggle} style={{
          width:56,height:56,borderRadius:"50%",
          background:"#5A7848",
          border:"none",cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:"0 4px 18px rgba(58,80,38,0.35)",
          flexShrink:0,
          transition:"all 0.15s",
        }}>
          {on
            ? <svg width="18" height="18" viewBox="0 0 18 18" fill="white"><rect x="3" y="2" width="4" height="14" rx="1.5"/><rect x="11" y="2" width="4" height="14" rx="1.5"/></svg>
            : <svg width="18" height="18" viewBox="0 0 18 18" fill="white"><path d="M5 3l11 6-11 6V3z"/></svg>
          }
        </button>
      </div>
      {/* Large timer display */}
      <div style={{
        fontFamily:"Georgia,serif",
        fontSize:72,
        fontWeight:400,
        color:"#5A7848",
        letterSpacing:4,
        textAlign:"center",
        lineHeight:1,
        marginBottom:28,
        opacity:on?1:0.85,
      }}>
        {hh}<span style={{opacity:0.5,margin:"0 6px"}}>:</span>{mm}<span style={{opacity:0.5,margin:"0 6px"}}>:</span>{ss}
      </div>
      {/* Pill time buttons */}
      <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:16}}>
        {[5,10,15,20,30].map(p=>(
          <button key={p} onClick={()=>{setMins(p);setLeft(null);setOn(false);}} style={{
            border:"1.5px solid",
            borderColor:mins===p?"transparent":"rgba(90,120,72,0.3)",
            borderRadius:100,
            padding:"9px 18px",
            fontSize:14,
            fontWeight:600,
            cursor:"pointer",
            background:mins===p?"#5A7848":"rgba(255,255,255,0.75)",
            color:mins===p?"#fff":"#3A3020",
            boxShadow:mins===p?"0 2px 10px rgba(58,80,38,0.28)":"none",
            transition:"all 0.15s",
          }}>{p}m</button>
        ))}
      </div>
      {/* Open Rest Space */}
      {setScreen&&(
        <button onClick={()=>setScreen("rest")} style={{
          width:"100%",
          padding:"16px",
          background:"#5A7848",
          color:"#fff",
          border:"none",
          borderRadius:100,
          fontWeight:700,
          fontSize:16,
          cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",gap:10,
          boxShadow:"0 4px 18px rgba(58,80,38,0.32)",
          marginBottom:4,
          letterSpacing:0.2,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3c-5 4-7 8-7 12a7 7 0 0014 0c0-4-2-8-7-12z" stroke="white" strokeWidth="1.8" fill="none" strokeLinejoin="round"/><path d="M12 10v6M9 13h6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
          Open Rest Space
        </button>
      )}
    </div>
  );
}

function ColourPicker({current,onChange,onClose}) {
  const ref=useRef(null);
  useEffect(()=>{
    const h=e=>{if(ref.current&&!ref.current.contains(e.target))onClose();};
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[onClose]);
  return (
    <div ref={ref} style={{position:"absolute",zIndex:200,top:22,left:-4,background:C.wh,borderRadius:16,padding:"10px 8px",boxShadow:"0 8px 32px rgba(90,80,60,0.28)",border:`1.5px solid ${C.ll}`,display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
      {SWATCHES.map(s=>(
        <button key={s.id} onClick={()=>{onChange(s.id);onClose();}} style={{width:32,height:32,borderRadius:8,cursor:"pointer",background:s.fill,border:current===s.id?`3px solid ${C.dp}`:`2px solid ${s.border}`,boxShadow:current===s.id?`0 0 0 2px ${C.pp}`:"none",transition:"all 0.12s"}} title={s.id}/>
      ))}
    </div>
  );
}

function PriTaskRow({task,index,onDelete,onComplete,onColorChange,onAddSub,onMoveToList,lists,onPrioritizeThis,onSendTo,onMoveUp,onMoveDown,isFirst,isLast,setScreen}) {
  const sw=swatchById(task.color);
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
    <div style={{background:task.done?"rgba(255,255,255,0.50)":"rgba(255,255,255,0.90)",border:`2px solid ${task.done?C.done:sw.border}`,borderLeft:`5px solid ${task.done?C.done:sw.fill}`,borderRadius:16,padding:"12px 12px 12px 10px",marginBottom:10,opacity:task.done?0.65:1,transition:"all 0.2s",boxShadow:"0 2px 12px rgba(90,80,60,0.09)",position:"relative"}}>

      {/* Main row */}
      <div style={{display:"flex",alignItems:"flex-start",gap:9,marginBottom:8}}>
        {/* Index */}
        <div style={{minWidth:28,height:28,borderRadius:"50%",background:task.done?C.done:sw.num,color:"#1A1A10",fontWeight:800,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{index+1}</div>
        <div style={{display:"flex",flexDirection:"column",gap:2,flexShrink:0}}>
          <button onClick={e=>{e.stopPropagation();onMoveUp&&onMoveUp();}} disabled={isFirst} style={{background:isFirst?"transparent":"rgba(90,120,72,0.20)",color:isFirst?"rgba(90,120,72,0.20)":C.pp,border:"none",borderRadius:5,width:22,height:16,cursor:isFirst?"default":"pointer",fontSize:9,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",padding:0,lineHeight:1}}>▲</button>
          <button onClick={e=>{e.stopPropagation();onMoveDown&&onMoveDown();}} disabled={isLast} style={{background:isLast?"transparent":"rgba(90,120,72,0.20)",color:isLast?"rgba(90,120,72,0.20)":C.pp,border:"none",borderRadius:5,width:22,height:16,cursor:isLast?"default":"pointer",fontSize:9,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",padding:0,lineHeight:1}}>▼</button>
        </div>
        {/* Colour picker dot */}
        <div style={{position:"relative",flexShrink:0,marginTop:7}}>
          <button onClick={()=>setPickerOpen(p=>!p)} style={{width:18,height:18,borderRadius:"50%",cursor:"pointer",padding:0,background:task.done?C.done:sw.fill,border:`2.5px solid ${task.done?C.done:sw.border}`,boxShadow:pickerOpen?`0 0 0 3px ${C.lp}`:"none",transition:"box-shadow 0.15s"}}/>
          {pickerOpen&&<ColourPicker current={task.color} onChange={id=>onColorChange(task.id,id)} onClose={()=>setPickerOpen(false)}/>}
        </div>
        {/* Task name */}
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:15,lineHeight:1.4,color:task.done?C.soft:C.txt,textDecoration:task.done?"line-through":"none",wordBreak:"break-word"}}>{task.name}</div>
          {task.url&&<UrlBadge url={task.url}/>}
          {subs.length>0&&<div style={{fontSize:11,color:C.soft,marginTop:2,fontWeight:600}}>{subsDone}/{subs.length} sub-items done</div>}
        </div>
        {/* Complete */}
        <button onClick={()=>onComplete(task.id)} style={{background:task.done?C.ll:sw.num,color:task.done?C.mid:C.wh,border:"none",borderRadius:9,width:34,height:34,cursor:"pointer",fontSize:15,flexShrink:0}}>{task.done?"↩":"✓"}</button>
        {/* 3-dot menu */}
        <button onClick={()=>setMenuOpen(m=>!m)} style={{background:C.ll,color:C.mp,border:"none",borderRadius:9,width:34,height:34,cursor:"pointer",fontSize:18,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>⋮</button>
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

      {/* Timer */}
      <TimerWidget icon="⏱" label="Task Timer" mins={mins} setMins={setMins} left={left} start={(secs)=>{setLeft(secs||mins*60);setOn(true);}} stop={stop} fmt={fmt} glass={false} accent={sw.border} accentText={sw.num}/>

      {/* Calendar */}
      {!task.done&&(
        <button onClick={()=>window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("📋 "+task.name)}`,"_blank")}
          style={{marginTop:8,width:"100%",display:"flex",alignItems:"center",gap:8,background:"#e8f5e9",color:"#2e7d32",border:"1.5px solid #a5d6a7",borderRadius:10,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>
          <span>📅</span><span>Schedule in Google Calendar</span>
        </button>
      )}

      {/* ── 3-dot menu sheet ── */}
      {menuOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setMenuOpen(false)}>
          <div style={{background:C.wh,borderRadius:"20px 20px 0 0",width:"100%",maxWidth:480,boxShadow:"0 -8px 32px rgba(90,80,60,0.35)",paddingBottom:34}} onClick={e=>e.stopPropagation()}>
            {/* Drag handle */}
            <div style={{display:"flex",justifyContent:"center",paddingTop:10,paddingBottom:4}}>
              <div style={{width:40,height:4,borderRadius:2,background:C.ll}}/>
            </div>
            {/* Header — back button LEFT, task name centre, close RIGHT */}
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"6px 12px 10px",borderBottom:`2px solid ${C.ll}`}}>
              <button onClick={()=>setMenuOpen(false)}
                style={{background:C.pp,color:"#1A1A10",border:"none",borderRadius:10,width:40,height:40,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:900,boxShadow:"0 2px 8px rgba(90,80,60,0.25)"}}>←</button>
              <div style={{flex:1,fontWeight:800,color:C.dp,fontSize:14,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{task.name}</div>
              <button onClick={()=>setMenuOpen(false)}
                style={{background:C.ll,color:C.mid,border:"none",borderRadius:10,width:36,height:36,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✕</button>
            </div>
            <MenuItem icon="📝" label="Add sub-item" onClick={()=>setSubOpen(s=>!s)}/>
            <MenuItem icon="🎯" label="Prioritize sub-items" onClick={()=>onPrioritizeThis&&onPrioritizeThis(task.id)}/>
            <MenuItem icon="📋" label="Move to another list" onClick={()=>{}}/>
            {(lists||[]).filter(l=>l.id!==task._listId).map(l=>(
              <button key={l.id} onClick={()=>{onMoveToList&&onMoveToList(task.id,l.id);setMenuOpen(false);}}
                style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px 10px 44px",background:C.pale,border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left",fontSize:13,fontWeight:600,color:C.txt}}>
                → {l.name}
              </button>
            ))}
            <MenuItem icon="📅" label="Schedule in Calendar" onClick={()=>window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("📋 "+task.name)}`,"_blank")}/>
            <MenuItem icon="🎯" label="Send to Matrix — Do First" onClick={()=>onSendTo&&onSendTo(task,"matrix","do")}/>
            <MenuItem icon="🟠" label="Send to Matrix — Schedule" onClick={()=>onSendTo&&onSendTo(task,"matrix","plan")}/>
            <MenuItem icon="🔵" label="Send to Matrix — Ask for Help" onClick={()=>onSendTo&&onSendTo(task,"matrix","help")}/>
            <MenuItem icon="⚡" label="Send to The Charge" onClick={()=>onSendTo&&onSendTo(task,"charge")}/>
            <MenuItem icon="🗑" label="Delete task" onClick={()=>onDelete(task.id)} danger/>
            {/* Big close button at bottom for easy thumb reach */}
            <div style={{padding:"10px 16px 0"}}>
              <button onClick={()=>setMenuOpen(false)}
                style={{width:"100%",padding:"14px",background:C.ll,color:C.mp,border:`1.5px solid ${C.lp}`,borderRadius:14,fontWeight:800,fontSize:15,cursor:"pointer"}}>
                ← Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PriCompare({tasks,onDone}) {
  const pending=tasks.filter(t=>!t.done);
  const pairs=[];
  for(let i=0;i<pending.length;i++) for(let j=i+1;j<pending.length;j++) pairs.push([pending[i],pending[j]]);
  const [idx,setIdx]=useState(0);
  const [scores,setScores]=useState({});

  if(pairs.length===0){onDone(pending);return null;}

  const choose=w=>{
    const ns={...scores,[w.id]:(scores[w.id]||0)+1};
    setScores(ns);
    if(idx+1>=pairs.length) onDone([...pending].sort((a,b)=>(ns[b.id]||0)-(ns[a.id]||0)));
    else setIdx(i=>i+1);
  };

  const skip=()=>{
    if(idx+1>=pairs.length) onDone([...pending].sort((a,b)=>(scores[b.id]||0)-(scores[a.id]||0)));
    else setIdx(i=>i+1);
  };

  const [a,b]=pairs[idx];
  const pct=Math.round((idx/pairs.length)*100);

  const TaskCard=({task,onPick})=>{
    const sw=swatchById(task.color);
    return(
      <button onClick={onPick}
        style={{flex:1,padding:"22px 16px 20px",borderRadius:20,background:"rgba(255,255,255,0.92)",border:`3px solid ${sw.fill}`,color:C.txt,fontWeight:800,fontSize:16,cursor:"pointer",boxShadow:`0 6px 24px ${sw.fill}`,display:"flex",flexDirection:"column",alignItems:"center",gap:14,transition:"all 0.15s",minHeight:160,textAlign:"center",lineHeight:1.4}}
        onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";}}
        onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";}}>
        {/* Colour circle — explicitly forced round */}
        <div style={{width:32,height:32,borderRadius:"50%",background:sw.fill,border:"3px solid rgba(255,255,255,0.9)",boxShadow:`0 2px 10px ${sw.fill}`,flexShrink:0,display:"block"}}/>
        <span style={{color:C.dp,fontWeight:800,fontSize:15,lineHeight:1.4,wordBreak:"break-word"}}>{task.name}</span>
      </button>
    );
  };

  return(
    <div style={{minHeight:"100vh",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",fontFamily:"'Segoe UI',sans-serif",paddingBottom:40}}>

      {/* Header */}
      <div style={{width:"100%",background:"rgba(90,80,60,0.05)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
        <button onClick={()=>onDone([...pending].sort((a,b)=>(scores[b.id]||0)-(scores[a.id]||0)))}
          style={{background:"rgba(255,255,255,0.15)",color:"#1A1A10",border:"none",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
        <div style={{flex:1,color:"#1A1A10",fontWeight:800,fontSize:16}}>Prioritizer</div>
        <div style={{color:"rgba(255,255,255,0.55)",fontSize:13,fontWeight:600}}>{idx+1} / {pairs.length}</div>
      </div>

      {/* Progress bar */}
      <div style={{width:"100%",height:4,background:"rgba(255,255,255,0.1)"}}>
        <div style={{height:"100%",width:`${pct}%`,background:C.lp,transition:"width 0.3s"}}/>
      </div>

      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 20px",width:"100%",maxWidth:480,gap:0}}>

        {/* Question */}
        <div style={{fontSize:22,fontWeight:900,color:"#1A1A10",marginBottom:32,textAlign:"center",lineHeight:1.3}}>
          Which one is most important?
        </div>

        {/* Side by side cards */}
        <div style={{display:"flex",gap:16,width:"100%",alignItems:"stretch"}}>
          <TaskCard task={a} onPick={()=>choose(a)}/>

          <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <div style={{fontWeight:900,fontSize:22,color:"rgba(255,255,255,0.7)",letterSpacing:2}}>OR</div>
          </div>

          <TaskCard task={b} onPick={()=>choose(b)}/>
        </div>

        {/* Skip */}
        <button onClick={skip} style={{marginTop:28,background:"transparent",color:"rgba(255,255,255,0.4)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:20,padding:"8px 22px",fontSize:13,fontWeight:600,cursor:"pointer"}}>
          Skip this pair
        </button>

        {/* Tap hint */}
        <div style={{marginTop:14,color:"rgba(255,255,255,0.3)",fontSize:12,textAlign:"center"}}>
          Tap the task that matters more right now
        </div>
      </div>
    </div>
  );
}

/* ── HomeBar — sticky top bar with 🏠 home for all modules ── */
function HomeBar({setScreen,title,onBack}){
  return(
    <div style={{position:"sticky",top:0,zIndex:50,background:`linear-gradient(135deg,${C.dp},${C.mp})`,display:"flex",alignItems:"center",gap:10,padding:"10px 14px",boxShadow:"0 2px 12px rgba(90,80,60,0.35)",flexShrink:0}}>
      {onBack&&<button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>←</button>}
      <span style={{flex:1,color:"#1A1A10",fontWeight:800,fontSize:16,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{title}</span>
      <button onClick={()=>setScreen&&setScreen("home")} style={{background:"rgba(255,255,255,0.18)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:10,padding:"7px 13px",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
        🏠 <span style={{fontSize:12}}>Home</span>
      </button>
    </div>
  );
}

function PriList({list,onBack,onUpdate,matrixData,setMatrixData,setScreen}) {
  const [newTask,setNewTask]=useState("");
  const [newUrl,setNewUrl]=useState("");
  const [prioritized,setPrioritized]=useState(false);
  const [comparing,setComparing]=useState(false);
  const addTask=()=>{
    if(!newTask.trim())return;
    const currentActive=list.tasks.filter(t=>!t.done);
    const isTop3=currentActive.length<3;
    onUpdate({...list,tasks:[...list.tasks,{id:Date.now(),name:newTask.trim(),done:false,color:isTop3?"red":"lilac",url:""}]});
    setNewTask("");setPrioritized(false);
  };
  const deleteTask=id=>{onUpdate({...list,tasks:list.tasks.filter(t=>t.id!==id)});setPrioritized(false);};
  const completeTask=id=>onUpdate({...list,tasks:list.tasks.map(t=>t.id===id?{...t,done:!t.done}:t)});
  const colorTask=(id,color)=>onUpdate({...list,tasks:list.tasks.map(t=>t.id===id?{...t,color}:t)});
  const moveTask=(id,dir)=>{
    const a=[...list.tasks];const i=a.findIndex(t=>t.id===id);const j=i+dir;
    if(j<0||j>=a.length)return;
    [a[i],a[j]]=[a[j],a[i]];onUpdate({...list,tasks:a});
  };
  const addSubItems=(id,subs)=>onUpdate({...list,tasks:list.tasks.map(t=>t.id===id?{...t,subItems:subs}:t)});
  const [sendToast,setSendToast]=useState("");
  const showSendToast=msg=>{setSendToast(msg);setTimeout(()=>setSendToast(""),2200);};
  const sendTaskTo=(task,dest,extra)=>{
    if(dest==="matrix"&&setMatrixData){
      setMatrixData(ds=>[...ds,{id:Date.now(),text:task.name,quad:extra||"do",created:Date.now(),touched:Date.now(),url:task.url||""}]);
      showSendToast(`🎯 Sent to Matrix!`);
    } else if(dest==="charge"){
      // The Charge reads from priData directly so it auto-appears — just toast
      showSendToast("⚡ The Charge will pick this up from your Prioritizer!");
    }
  };
  const onPriDone=sorted=>{
    const recoloured=sorted.map((t,i)=>({
      ...t,
      color: i<3 ? (t.color==="lilac"||t.color==="red" ? "red" : t.color) : (t.color==="red" ? "lilac" : t.color)
    }));
    onUpdate({...list,tasks:[...recoloured,...list.tasks.filter(t=>t.done)]});
    setComparing(false);setPrioritized(true);
  };

  // ── VINE GROWTH TRACKING ──────────────────────────────
  // Tracks how consistently user works — more consistent = lusher vine
  const [vineGrowth,setVineGrowth]=useState(()=>{
    try{return JSON.parse(localStorage.getItem('thinko_vine')||'{"level":0,"lastTask":0,"streak":0,"thickness":2}');}
    catch{return {level:0,lastTask:0,streak:0,thickness:2};}
  });
  const saveVine=v=>{setVineGrowth(v);try{localStorage.setItem('thinko_vine',JSON.stringify(v));}catch{}};

  // Called when a task is completed — updates vine growth
  const onTaskComplete=id=>{
    completeTask(id);
    const now=Date.now();
    const timeSinceLast=now-(vineGrowth.lastTask||0);
    const consistent=timeSinceLast<30*60*1000; // within 30 min = consistent focus
    const newStreak=consistent?vineGrowth.streak+1:1;
    const newLevel=Math.min(10,vineGrowth.level+(consistent?0.8:0.3));
    const newThickness=Math.min(6,2+newStreak*0.4);
    saveVine({level:newLevel,lastTask:now,streak:newStreak,thickness:newThickness});
  };

  // Vine visual parameters based on growth level
  const vl=vineGrowth.level; // 0–10
  const vineHeight=Math.max(15,vl*10); // % of screen covered
  const vineOpacity=0.35+vl*0.055;
  const stemW=Math.min(5.5,2+vl*0.3);
  const leafScale=0.4+vl*0.07;
  const numLeaves=Math.max(2,Math.floor(vl*1.4));
  const vineColor=vl>7?"#5A8828":vl>4?"#6E9E40":"#88B850";
  const isLush=vl>6;

  if(comparing) return <PriCompare tasks={list.tasks} onDone={onPriDone}/>;
  const active=list.tasks.filter(t=>!t.done);
  const done=list.tasks.filter(t=>t.done);

  return (
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",position:"relative",overflow:"hidden"}}>

      {/* ── LIVE VINE GROWTH — grows as you work ── */}
      <svg style={{position:"fixed",left:0,top:0,width:"50px",height:"100%",pointerEvents:"none",zIndex:1,overflow:"visible"}} viewBox={`0 0 50 844`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="pvlf1" cx="30%" cy="25%" r="65%"><stop offset="0%" stopColor="#D0EE98"/><stop offset="45%" stopColor="#90C850"/><stop offset="100%" stopColor="#4E8820"/></radialGradient>
          <radialGradient id="pvlf2" cx="35%" cy="28%" r="60%"><stop offset="0%" stopColor="#C0E480"/><stop offset="42%" stopColor="#82B840"/><stop offset="100%" stopColor="#427010"/></radialGradient>
          <filter id="pvls" x="-60%" y="-30%" width="220%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="3"/><feOffset dx="1" dy="2"/><feComposite in2="SourceGraphic"/><feColorMatrix type="matrix" values="0 0 0 0 0.04  0 0 0 0 0.10  0 0 0 0 0.02  0 0 0 0.22 0"/></filter>
          <style>{`
            @keyframes pvGrow{from{stroke-dashoffset:900}to{stroke-dashoffset:0}}
            @keyframes pvLeaf{from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}
            @keyframes pvSway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
            .pvStem{stroke-dasharray:900;animation:pvGrow ${Math.max(1.5,3-vl*0.2).toFixed(1)}s ease forwards}
            .pvLeaf{transform-origin:center;animation:pvLeaf 0.6s ease forwards}
            .pvSway{animation:pvSway ${isLush?2.5:4}s ease-in-out infinite}
          `}</style>
        </defs>

        {/* Main stem — height grows with vine level */}
        <path
          className="pvStem"
          d={`M20 844 Q${22+vl} ${844-vineHeight*4} ${18-vl*0.5} ${844-vineHeight*8.44}`}
          stroke={vineColor}
          strokeWidth={stemW}
          fill="none"
          filter="url(#pvls)"
          strokeLinecap="round"
          opacity={vineOpacity+0.2}
        />
        {/* Secondary tendril */}
        {vl>2&&<path
          className="pvStem"
          d={`M28 844 Q${30+vl*0.5} ${844-vineHeight*3} ${24} ${844-vineHeight*6}`}
          stroke={vineColor}
          strokeWidth={stemW*0.55}
          fill="none"
          strokeLinecap="round"
          opacity={vineOpacity}
        />}

        {/* Leaves — number and size increase with vine level */}
        {Array.from({length:numLeaves}).map((_,i)=>{
          const ypos=844-80-(i*(vineHeight*8.44/(numLeaves+1)));
          const side=i%2===0?-1:1;
          const angle=side*(-30-i*5);
          const sz=leafScale*(0.85+i*0.06);
          const lf=i%2===0?"url(#pvlf1)":"url(#pvlf2)";
          return(
            <g key={i} className="pvLeaf pvSway" filter="url(#pvls)"
              style={{animationDelay:`${i*0.18}s`,transformOrigin:`${20+side*10}px ${ypos}px`}}>
              <g transform={`translate(${20+side*12},${ypos}) rotate(${angle}) scale(${sz})`}>
                <path d={`M0-${28*sz/sz} C${-8*sz/sz}-${24*sz/sz} ${-20*sz/sz}-${15*sz/sz} ${-20*sz/sz}-${5*sz/sz} C${-20*sz/sz} ${7*sz/sz} ${-10*sz/sz} ${15*sz/sz} 0 ${18*sz/sz} C${10*sz/sz} ${15*sz/sz} ${20*sz/sz} ${7*sz/sz} ${20*sz/sz}-${5*sz/sz} C${20*sz/sz}-${15*sz/sz} ${8*sz/sz}-${24*sz/sz} 0-${28*sz/sz}Z`}
                  fill={lf} opacity={vineOpacity+0.15}/>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Vine growth indicator badge */}
      <div style={{position:"fixed",left:8,bottom:100,zIndex:20,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
        <div style={{
          background:isLush?"rgba(78,136,32,0.15)":"rgba(90,80,60,0.08)",
          border:`1.5px solid ${isLush?"rgba(78,136,32,0.4)":"rgba(90,80,60,0.15)"}`,
          borderRadius:100,
          padding:"4px 8px",
          fontSize:9,
          fontWeight:700,
          color:isLush?"#3A6818":"#8A8070",
          whiteSpace:"nowrap",
          letterSpacing:0.3,
        }}>
          {vl===0?"Start working…":vl<3?"🌱 Sprouting":vl<6?"🌿 Growing":vl<9?"🍃 Thriving":"🌳 Lush!"}
        </div>
        {/* Mini progress bar */}
        <div style={{width:32,height:3,background:"rgba(90,80,60,0.12)",borderRadius:100,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${vl*10}%`,background:vineColor,borderRadius:100,transition:"width 0.8s ease"}}/>
        </div>
      </div>

      <div style={{position:"relative",zIndex:2}}>
        <Header title={list.name} onBack={onBack} right={<button onClick={()=>onBack&&setScreen&&setScreen("home")} style={{background:"rgba(255,255,255,0.25)",color:"#1A1A10",border:"1px solid rgba(90,120,72,0.25)",borderRadius:10,padding:"7px 14px",fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:5,flexShrink:0}}>🏠 Home</button>}/>
        <div style={{padding:"18px 16px"}}>
          <BreakTimer setScreen={setScreen}/>
          {/* Add task input */}
          <div style={{display:"flex",gap:10,marginBottom:12,background:"rgba(255,255,255,0.88)",borderRadius:100,padding:"12px 14px 12px 20px",border:"1.5px solid rgba(90,120,72,0.15)",boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
            <input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTask()} placeholder="Add task..." style={{flex:1,border:"none",outline:"none",fontSize:15,fontWeight:500,color:"#1A1A10",background:"transparent"}}/>
            <button onClick={addTask} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:"50%",width:38,height:38,fontSize:22,cursor:"pointer",fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 2px 10px rgba(58,80,38,0.3)"}}>+</button>
          </div>
          {/* URL input */}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,background:"rgba(255,255,255,0.75)",borderRadius:100,padding:"12px 18px",border:"1.5px solid rgba(90,120,72,0.12)",boxShadow:"0 1px 6px rgba(0,0,0,0.04)"}}>
            <input value={newUrl} onChange={e=>setNewUrl(e.target.value)} placeholder="Paste website address (optional)" style={{flex:1,border:"none",outline:"none",fontSize:14,color:"#5A5040",background:"transparent"}}/>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{flexShrink:0,opacity:0.45}}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#3A3020" strokeWidth="2" strokeLinecap="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#3A3020" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>

          {/* Vine growth hint when first starting */}
          {vl===0&&active.length===0&&(
            <div style={{background:"rgba(90,120,72,0.08)",borderRadius:18,padding:"12px 16px",marginBottom:14,border:"1px solid rgba(90,120,72,0.15)",display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:20}}>🌱</span>
              <div style={{fontSize:13,color:"#5A7040",lineHeight:1.5,fontFamily:"Georgia,serif"}}>
                Complete tasks consistently to grow your vine.<br/>
                <span style={{fontSize:11,opacity:0.7}}>Steady focus = thicker, lusher growth</span>
              </div>
            </div>
          )}

          {active.map((task,i)=>(
            <div key={task.id}>
              {i===0&&active.length>0&&(
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <div style={{height:1,flex:1,background:"rgba(90,120,72,0.25)"}}/>
                  <span style={{fontSize:10,fontWeight:700,color:"#5A7040",letterSpacing:1.2,textTransform:"uppercase"}}>🌿 Top 3 — Most Important</span>
                  <div style={{height:1,flex:1,background:"rgba(90,120,72,0.25)"}}/>
                </div>
              )}
              {i===3&&(
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,marginTop:4}}>
                  <div style={{height:1,flex:1,background:"rgba(90,80,60,0.12)"}}/>
                  <span style={{fontSize:10,fontWeight:600,color:"rgba(90,80,60,0.45)",letterSpacing:1.2,textTransform:"uppercase"}}>Other Tasks</span>
                  <div style={{height:1,flex:1,background:"rgba(90,80,60,0.12)"}}/>
                </div>
              )}
              <PriTaskRow task={task} index={i} onDelete={deleteTask} onComplete={()=>onTaskComplete(task.id)} onColorChange={colorTask} onAddSub={addSubItems} lists={[]} onPrioritizeThis={()=>setComparing(true)} onSendTo={sendTaskTo} onMoveUp={()=>moveTask(task.id,-1)} onMoveDown={()=>moveTask(task.id,1)} isFirst={i===0} isLast={i===active.length-1} setScreen={setScreen}/>
            </div>
          ))}
          {done.length>0&&(
            <>
              <div style={{fontSize:11,fontWeight:700,color:"#8A8070",textTransform:"uppercase",letterSpacing:1.4,margin:"16px 0 8px",display:"flex",alignItems:"center",gap:8}}>
                <span>✓ Completed</span>
                <div style={{height:1,flex:1,background:"rgba(90,80,60,0.1)"}}/>
              </div>
              {done.map((task,i)=>(<PriTaskRow key={task.id} task={task} index={i} onDelete={deleteTask} onComplete={()=>onTaskComplete(task.id)} onColorChange={colorTask}/>))}
            </>
          )}
          {active.length>1&&(
            <div style={{position:"sticky",bottom:90,left:0,right:0,padding:"12px 0 4px",background:"transparent",pointerEvents:"none"}}>
              <button onClick={()=>setComparing(true)} style={{width:"100%",padding:"17px",background:"linear-gradient(135deg,#3D5A2A,#5A7848)",color:"#fff",border:"none",borderRadius:18,fontWeight:700,fontFamily:"Georgia,serif",fontSize:16,cursor:"pointer",boxShadow:"0 6px 22px rgba(45,80,20,0.38)",pointerEvents:"auto",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                <span style={{fontSize:18}}>🌿</span>
                <span>{prioritized?"Re-Prioritize — sort again":"Prioritize — what matters most?"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Prioritizer({data,setData,matrixData,setMatrixData,setScreen}) {
  const [activeId,setActiveId]=useState(null);
  const [adding,setAdding]=useState(false);
  const [name,setName]=useState("");
  const [dragId,setDragId]=useState(null);
  const inputRef=useRef(null);
  useEffect(()=>{if(adding&&inputRef.current)inputRef.current.focus();},[adding]);
  const active=data.find(l=>l.id===activeId);
  const submit=()=>{if(name.trim()){setData(ls=>[...ls,{id:Date.now(),name:name.trim(),tasks:[]}]);setName("");setAdding(false);}};

  const dragOver=(e,id)=>{
    e.preventDefault();
    if(!dragId||dragId===id)return;
    setData(ls=>{const a=[...ls];const fi=a.findIndex(l=>l.id===dragId),ti=a.findIndex(l=>l.id===id);const [item]=a.splice(fi,1);a.splice(ti,0,item);return a;});
  };

  if(active) return <PriList list={active} onBack={()=>setActiveId(null)} onUpdate={u=>setData(ls=>ls.map(l=>l.id===u.id?u:l))} matrixData={matrixData} setMatrixData={setMatrixData} setScreen={setScreen}/>;
  const listColors=["#5A7848","#7A6038","#486878","#6A5870","#486050","#705848"];
  return (
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif"}}>
      <Header title="Prioritizer" onBack={()=>setScreen("home")} right={
        <button onClick={()=>setAdding(true)} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:50,width:40,height:40,fontSize:24,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 3px 12px rgba(58,80,38,0.35)"}}>+</button>
      }/>

      <div style={{padding:"20px 16px"}}>
        {/* New list form */}
        {adding&&(
          <div style={{background:"rgba(248,245,236,0.95)",borderRadius:24,padding:"20px 18px",marginBottom:18,boxShadow:"0 4px 24px rgba(0,0,0,0.1)",border:"1px solid rgba(90,120,72,0.2)"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#5A7848",textTransform:"uppercase",letterSpacing:1.4,marginBottom:12}}>New list</div>
            <input ref={inputRef} value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")submit();if(e.key==="Escape"){setAdding(false);setName("");}}} placeholder="List name..." style={{width:"100%",boxSizing:"border-box",padding:"13px 16px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.3)",fontSize:15,fontWeight:600,color:"#1A1A10",outline:"none",marginBottom:14,background:"rgba(255,255,255,0.9)"}}/>
            <div style={{display:"flex",justifyContent:"flex-end",gap:10}}>
              <button onClick={()=>{setAdding(false);setName("");}} style={{background:"transparent",color:"#8A8070",border:"none",fontWeight:600,fontSize:14,cursor:"pointer",padding:"8px 16px"}}>Cancel</button>
              <button onClick={submit} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"10px 24px",fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 3px 12px rgba(58,80,38,0.3)"}}>Create</button>
            </div>
          </div>
        )}

        {/* EMPTY STATE — beautiful garden landing */}
        {data.length===0&&!adding&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 16px 0"}}>
            {/* Decorative vine illustration */}
            <svg width="220" height="160" viewBox="0 0 220 160" fill="none" style={{marginBottom:8,overflow:"visible"}}>
              <defs>
                <linearGradient id="eg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#C8EC98"/><stop offset="100%" stopColor="#5A8830"/></linearGradient>
                <linearGradient id="eg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#A8D870"/><stop offset="100%" stopColor="#4A7820"/></linearGradient>
                <linearGradient id="eg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#D8F0A8"/><stop offset="100%" stopColor="#78B040"/></linearGradient>
                <filter id="esh"><feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#1A3A08" floodOpacity="0.28"/></filter>
              </defs>
              {/* Main stems */}
              <path d="M30 160 Q25 120 35 88 Q42 62 28 32 Q22 16 35 5" stroke="#7A6030" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <path d="M190 160 Q195 120 185 88 Q178 62 192 32 Q198 16 185 5" stroke="#7A6030" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <path d="M30 60 Q70 40 110 45 Q150 50 190 60" stroke="#8A7040" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
              {/* Left big leaves */}
              <g filter="url(#esh)"><path d="M28 24 Q8 8 -5 18 Q-8 32 8 38 Q22 40 28 24Z" fill="url(#eg1)"/><line x1="28" y1="24" x2="8" y2="38" stroke="#3A6820" strokeWidth="0.8" opacity="0.18"/><line x1="18" y1="31" x2="12" y2="38" stroke="#3A6820" strokeWidth="0.5" opacity="0.14"/><line x1="18" y1="31" x2="22" y2="37" stroke="#3A6820" strokeWidth="0.5" opacity="0.14"/></g>
              <g filter="url(#esh)"><path d="M32 46 Q12 34 0 44 Q-3 58 14 62 Q28 63 32 46Z" fill="url(#eg2)"/><line x1="32" y1="46" x2="14" y2="62" stroke="#3A6820" strokeWidth="0.8" opacity="0.18"/></g>
              <g filter="url(#esh)"><path d="M30 74 Q10 62 -2 72 Q-5 86 12 90 Q26 91 30 74Z" fill="url(#eg3)"/><line x1="30" y1="74" x2="12" y2="90" stroke="#3A6820" strokeWidth="0.75" opacity="0.18"/></g>
              <g filter="url(#esh)"><path d="M34 100 Q14 88 2 98 Q-1 112 16 116 Q30 117 34 100Z" fill="url(#eg1)"/><line x1="34" y1="100" x2="16" y2="116" stroke="#3A6820" strokeWidth="0.75" opacity="0.18"/></g>
              <g filter="url(#esh)"><path d="M32 128 Q12 116 0 126 Q-3 140 14 144 Q28 145 32 128Z" fill="url(#eg2)"/></g>
              {/* Right big leaves */}
              <g filter="url(#esh)"><path d="M192 24 Q212 8 225 18 Q228 32 212 38 Q198 40 192 24Z" fill="url(#eg1)"/><line x1="192" y1="24" x2="212" y2="38" stroke="#3A6820" strokeWidth="0.8" opacity="0.18"/><line x1="202" y1="31" x2="208" y2="38" stroke="#3A6820" strokeWidth="0.5" opacity="0.14"/><line x1="202" y1="31" x2="198" y2="37" stroke="#3A6820" strokeWidth="0.5" opacity="0.14"/></g>
              <g filter="url(#esh)"><path d="M188 46 Q208 34 220 44 Q223 58 206 62 Q192 63 188 46Z" fill="url(#eg2)"/><line x1="188" y1="46" x2="206" y2="62" stroke="#3A6820" strokeWidth="0.8" opacity="0.18"/></g>
              <g filter="url(#esh)"><path d="M190 74 Q210 62 222 72 Q225 86 208 90 Q194 91 190 74Z" fill="url(#eg3)"/><line x1="190" y1="74" x2="208" y2="90" stroke="#3A6820" strokeWidth="0.75" opacity="0.18"/></g>
              <g filter="url(#esh)"><path d="M186 100 Q206 88 218 98 Q221 112 204 116 Q190 117 186 100Z" fill="url(#eg1)"/><line x1="186" y1="100" x2="204" y2="116" stroke="#3A6820" strokeWidth="0.75" opacity="0.18"/></g>
              <g filter="url(#esh)"><path d="M188 128 Q208 116 220 126 Q223 140 206 144 Q192 145 188 128Z" fill="url(#eg2)"/></g>
              {/* Top arch leaves */}
              <g filter="url(#esh)"><path d="M55 52 Q48 32 60 22 Q72 15 80 28 Q84 40 72 48 Q60 52 55 52Z" fill="url(#eg3)"/><line x1="55" y1="52" x2="72" y2="48" stroke="#3A6820" strokeWidth="0.7" opacity="0.18"/></g>
              <g filter="url(#esh)"><path d="M85 48 Q80 28 92 18 Q104 11 112 24 Q116 36 104 44 Q92 48 85 48Z" fill="url(#eg1)"/><line x1="85" y1="48" x2="104" y2="44" stroke="#3A6820" strokeWidth="0.7" opacity="0.18"/></g>
              <g filter="url(#esh)"><path d="M118 48 Q115 28 128 18 Q140 12 148 25 Q151 37 140 45 Q128 49 118 48Z" fill="url(#eg2)"/><line x1="118" y1="48" x2="140" y2="45" stroke="#3A6820" strokeWidth="0.7" opacity="0.18"/></g>
              <g filter="url(#esh)"><path d="M150 52 Q148 32 160 22 Q172 15 178 28 Q180 42 168 50 Q156 54 150 52Z" fill="url(#eg3)"/><line x1="150" y1="52" x2="168" y2="50" stroke="#3A6820" strokeWidth="0.7" opacity="0.18"/></g>
              {/* Centre clipboard icon */}
              <rect x="88" y="62" width="44" height="52" rx="6" fill="rgba(248,245,236,0.92)" stroke="rgba(90,120,72,0.3)" strokeWidth="1.5"/>
              <rect x="98" y="58" width="24" height="10" rx="5" fill="rgba(90,120,72,0.4)"/>
              <path d="M96 80h28M96 90h20M96 100h24" stroke="rgba(90,120,72,0.6)" strokeWidth="2" strokeLinecap="round"/>
            </svg>

            {/* Headline */}
            <div style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:700,color:"#1A1A10",textAlign:"center",marginBottom:10,letterSpacing:-0.4,lineHeight:1.25}}>
              Your calm task sanctuary
            </div>

            {/* Description */}
            <div style={{fontSize:15,color:"#6A6050",textAlign:"center",lineHeight:1.72,marginBottom:28,maxWidth:280,fontWeight:400}}>
              Create multiple lists — one for work, one for home, one just for today. Keep everything beautifully organised and calm.
            </div>

            {/* CTA button */}
            <button onClick={()=>setAdding(true)} style={{
              background:"#5A7848",
              color:"#fff",
              border:"none",
              borderRadius:100,
              padding:"17px 40px",
              fontSize:17,
              fontWeight:700,
              cursor:"pointer",
              boxShadow:"0 6px 24px rgba(58,80,38,0.38)",
              display:"flex",alignItems:"center",gap:12,
              letterSpacing:0.2,
              marginBottom:16,
            }}>
              <span style={{fontSize:20}}>+</span>
              Create your first list
            </button>

            {/* Hint */}
            <div style={{fontSize:12,color:"rgba(90,80,60,0.55)",textAlign:"center",display:"flex",alignItems:"center",gap:6}}>
              <span>🌿</span>
              <span>You can create as many lists as you like</span>
              <span>🌿</span>
            </div>
          </div>
        )}

        {/* LISTS — when they exist */}
        {data.length>0&&(
          <div style={{fontSize:11,color:"rgba(60,50,30,0.45)",textAlign:"center",marginBottom:12,letterSpacing:0.5}}>⠿ Hold and drag to reorder</div>
        )}
        {data.map((list,i)=>{
          const col=listColors[i%listColors.length];
          return(
            <div key={list.id}
              draggable
              onDragStart={e=>{e.dataTransfer.effectAllowed="move";setDragId(list.id);}}
              onDragOver={e=>dragOver(e,list.id)}
              onDragEnd={()=>setDragId(null)}
              onClick={()=>setActiveId(list.id)}
              style={{
                display:"flex",alignItems:"center",gap:14,
                background:dragId===list.id?"rgba(255,255,255,0.95)":"rgba(248,245,236,0.88)",
                backdropFilter:"blur(12px)",
                borderRadius:22,
                padding:"16px 18px",
                marginBottom:12,
                border:"1px solid rgba(255,255,255,0.9)",
                cursor:"pointer",
                transition:"all 0.15s",
                boxShadow:dragId===list.id?"0 8px 28px rgba(0,0,0,0.12)":"0 2px 14px rgba(0,0,0,0.06)",
                transform:dragId===list.id?"scale(1.02)":"scale(1)",
              }}>
              <div style={{color:"rgba(60,50,30,0.3)",fontSize:14,flexShrink:0}}>⠿</div>
              <div style={{width:44,height:44,borderRadius:14,flexShrink:0,background:col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:`0 2px 10px ${col}55`}}>📋</div>
              <div style={{flex:1}}>
                <div style={{color:"#1A1A10",fontWeight:700,fontSize:17,marginBottom:2}}>{list.name}</div>
                <div style={{color:"#8A8070",fontSize:12}}>{list.tasks.length} task{list.tasks.length!==1?"s":""}</div>
              </div>
              <button onClick={e=>{e.stopPropagation();setData(ls=>ls.filter(l=>l.id!==list.id));}} style={{background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"1px solid rgba(90,80,60,0.15)",borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🗑</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MIND MAP
═══════════════════════════════════════════════════════ */
const NODE_COLORS=["#5A7848","#c2185b","#e67e22","#27ae60","#2980b9","#1abc9c","#e74c3c","#f39c12","#8e44ad","#16a085"];
const BRANCH_COLORS=["#c4aee8","#f48fb1","#ffcc80","#a5d6a7","#90caf9","#80cbc4","#ef9a9a","#ffe082","#ce93d8","#80deea"];

function MindMap({data,setData,priData,setPriData,ideasData,setIdeasData,matrixData,setMatrixData,goalsData,setGoalsData,setScreen}) {
  const [mapId,setMapId]=useState(null);
  const [adding,setAdding]=useState(false);
  const [name,setName]=useState("");
  const [newCover,setNewCover]=useState(null);
  const [newLink,setNewLink]=useState("");
  const inputRef=useRef(null);
  useEffect(()=>{if(adding&&inputRef.current)inputRef.current.focus();},[adding]);

  const map=data.find(m=>m.id===mapId);

  const makeRootNode=(text,cx,cy)=>({id:Date.now(),text,x:cx,y:cy,parent:null,color:"crystal",cover:newCover,links:newLink.trim()?[{id:Date.now()+1,label:newLink.trim(),url:newLink.trim()}]:[]});
  const submit=()=>{
    if(!name.trim())return;
    setData(ms=>[...ms,{id:Date.now(),name:name.trim(),nodes:[makeRootNode(name.trim(),0,0)]}]);
    setName("");setNewCover(null);setNewLink("");setAdding(false);
  };

  if(map) return <MindMapCanvas map={map} onBack={()=>setMapId(null)} onUpdate={u=>setData(ms=>ms.map(m=>m.id===u.id?u:m))} priData={priData} setPriData={setPriData} ideasData={ideasData} setIdeasData={setIdeasData} matrixData={matrixData} setMatrixData={setMatrixData} goalsData={goalsData} setGoalsData={setGoalsData} setScreen={setScreen}/>;

  return (
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif"}}>
      <Header title="Mind Map" onBack={()=>setScreen("home")} right={
        <button onClick={()=>setAdding(true)} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:50,width:40,height:40,fontSize:24,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,boxShadow:"0 3px 12px rgba(58,80,38,0.35)"}}>+</button>
      }/>
      <div style={{padding:"20px 16px"}}>

        {/* New map form */}
        {adding&&(
          <div style={{background:"rgba(248,245,236,0.95)",borderRadius:24,padding:"20px 18px",marginBottom:18,boxShadow:"0 4px 24px rgba(0,0,0,0.1)",border:"1px solid rgba(90,120,72,0.2)"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#5A7848",textTransform:"uppercase",letterSpacing:1.4,marginBottom:12}}>New Mind Map</div>
            <input ref={inputRef} value={name} onChange={e=>setName(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter")submit();if(e.key==="Escape"){setAdding(false);setName("");}}}
              placeholder="Central topic..." style={{width:"100%",boxSizing:"border-box",padding:"13px 16px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.3)",fontSize:15,fontWeight:600,color:"#1A1A10",outline:"none",marginBottom:12,background:"rgba(255,255,255,0.9)"}}/>
            {/* Cover photo */}
            {newCover?(
              <div style={{position:"relative",marginBottom:12}}>
                <img src={newCover} alt="" style={{width:"100%",height:100,objectFit:"cover",borderRadius:14,border:"1.5px solid rgba(90,120,72,0.2)"}}/>
                <button onClick={()=>setNewCover(null)} style={{position:"absolute",top:6,right:6,background:"rgba(192,57,43,0.9)",color:"#fff",border:"none",borderRadius:"50%",width:24,height:24,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
              </div>
            ):(
              <label style={{display:"flex",alignItems:"center",gap:8,padding:"11px 16px",background:"rgba(90,120,72,0.06)",border:"1.5px dashed rgba(90,120,72,0.3)",borderRadius:14,cursor:"pointer",fontSize:13,fontWeight:600,color:"#5A7848",marginBottom:12}}>
                📸 Add cover photo
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>setNewCover(ev.target.result);r.readAsDataURL(file);}}/>
              </label>
            )}
            {/* Link */}
            <div style={{display:"flex",gap:10,marginBottom:16,background:"rgba(255,255,255,0.8)",borderRadius:100,padding:"10px 16px",border:"1.5px solid rgba(90,120,72,0.15)"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{flexShrink:0,opacity:0.45,alignSelf:"center"}}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#3A3020" strokeWidth="2" strokeLinecap="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#3A3020" strokeWidth="2" strokeLinecap="round"/></svg>
              <input value={newLink} onChange={e=>setNewLink(e.target.value)} placeholder="Add a link (optional)"
                style={{flex:1,border:"none",fontSize:13,color:"#1A1A10",outline:"none",background:"transparent"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"flex-end",gap:10}}>
              <button onClick={()=>{setAdding(false);setName("");setNewCover(null);setNewLink("");}} style={{background:"transparent",color:"#8A8070",border:"none",fontWeight:600,fontSize:14,cursor:"pointer",padding:"8px 16px"}}>Cancel</button>
              <button onClick={submit} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"10px 24px",fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 3px 12px rgba(58,80,38,0.3)"}}>Create Map</button>
            </div>
          </div>
        )}

        {/* EMPTY STATE — garden landing */}
        {data.length===0&&!adding&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"28px 16px 0"}}>

            {/* Mind map illustration with vines */}
            <svg width="240" height="180" viewBox="0 0 240 180" fill="none" style={{marginBottom:6,overflow:"visible"}}>
              <defs>
                <linearGradient id="mg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#C8EC98"/><stop offset="100%" stopColor="#5A8830"/></linearGradient>
                <linearGradient id="mg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#A8D870"/><stop offset="100%" stopColor="#4A7820"/></linearGradient>
                <linearGradient id="mg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#D8F0A8"/><stop offset="100%" stopColor="#78B040"/></linearGradient>
                <linearGradient id="mgn" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8A9E78"/><stop offset="100%" stopColor="#5A7848"/></linearGradient>
                <filter id="mgs"><feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="#1A3A08" floodOpacity="0.25"/></filter>
              </defs>

              {/* Side vine stems */}
              <path d="M10 180 Q8 140 16 105 Q22 76 12 45 Q8 28 18 10" stroke="#7A6030" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <path d="M230 180 Q232 140 224 105 Q218 76 228 45 Q232 28 222 10" stroke="#7A6030" strokeWidth="3.5" fill="none" strokeLinecap="round"/>

              {/* Left leaves */}
              <g filter="url(#mgs)"><path d="M14 30 Q-4 16 -12 26 Q-14 40 2 46 Q14 48 14 30Z" fill="url(#mg1)"/><line x1="14" y1="30" x2="2" y2="46" stroke="#3A6820" strokeWidth="0.8" opacity="0.18"/><line x1="8" y1="38" x2="2" y2="46" stroke="#3A6820" strokeWidth="0.5" opacity="0.14"/><line x1="8" y1="38" x2="14" y2="44" stroke="#3A6820" strokeWidth="0.5" opacity="0.14"/></g>
              <g filter="url(#mgs)"><path d="M16 62 Q-2 50 -10 60 Q-12 74 4 80 Q16 81 16 62Z" fill="url(#mg2)"/><line x1="16" y1="62" x2="4" y2="80" stroke="#3A6820" strokeWidth="0.75" opacity="0.18"/></g>
              <g filter="url(#mgs)"><path d="M14 96 Q-4 84 -12 94 Q-14 108 2 114 Q14 115 14 96Z" fill="url(#mg3)"/><line x1="14" y1="96" x2="2" y2="114" stroke="#3A6820" strokeWidth="0.72" opacity="0.18"/></g>
              <g filter="url(#mgs)"><path d="M18 130 Q0 118 -8 128 Q-10 142 6 148 Q18 149 18 130Z" fill="url(#mg1)"/><line x1="18" y1="130" x2="6" y2="148" stroke="#3A6820" strokeWidth="0.7" opacity="0.18"/></g>
              <g filter="url(#mgs)"><path d="M16 160 Q-2 148 -10 158 Q-12 172 4 178 Q16 179 16 160Z" fill="url(#mg2)"/></g>

              {/* Right leaves */}
              <g filter="url(#mgs)"><path d="M226 30 Q244 16 252 26 Q254 40 238 46 Q226 48 226 30Z" fill="url(#mg1)"/><line x1="226" y1="30" x2="238" y2="46" stroke="#3A6820" strokeWidth="0.8" opacity="0.18"/><line x1="232" y1="38" x2="238" y2="46" stroke="#3A6820" strokeWidth="0.5" opacity="0.14"/><line x1="232" y1="38" x2="226" y2="44" stroke="#3A6820" strokeWidth="0.5" opacity="0.14"/></g>
              <g filter="url(#mgs)"><path d="M224 62 Q242 50 250 60 Q252 74 236 80 Q224 81 224 62Z" fill="url(#mg2)"/><line x1="224" y1="62" x2="236" y2="80" stroke="#3A6820" strokeWidth="0.75" opacity="0.18"/></g>
              <g filter="url(#mgs)"><path d="M226 96 Q244 84 252 94 Q254 108 238 114 Q226 115 226 96Z" fill="url(#mg3)"/><line x1="226" y1="96" x2="238" y2="114" stroke="#3A6820" strokeWidth="0.72" opacity="0.18"/></g>
              <g filter="url(#mgs)"><path d="M222 130 Q240 118 248 128 Q250 142 234 148 Q222 149 222 130Z" fill="url(#mg1)"/><line x1="222" y1="130" x2="234" y2="148" stroke="#3A6820" strokeWidth="0.7" opacity="0.18"/></g>
              <g filter="url(#mgs)"><path d="M224 160 Q242 148 250 158 Q252 172 236 178 Q224 179 224 160Z" fill="url(#mg2)"/></g>

              {/* Top arch */}
              <path d="M18 12 Q60 -10 120 -8 Q180 -10 222 12" stroke="#8A7040" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8"/>
              <g filter="url(#mgs)"><path d="M55 4 Q50 -14 64 -20 Q78 -18 80 -2 Q78 10 66 10 Q55 8 55 4Z" fill="url(#mg3)"/><line x1="55" y1="4" x2="66" y2="10" stroke="#3A6820" strokeWidth="0.7" opacity="0.18"/></g>
              <g filter="url(#mgs)"><path d="M95 -2 Q92 -20 106 -24 Q120 -22 120 -6 Q118 6 106 6 Q95 4 95 -2Z" fill="url(#mg1)"/><line x1="95" y1="-2" x2="106" y2="6" stroke="#3A6820" strokeWidth="0.68" opacity="0.18"/></g>
              <g filter="url(#mgs)"><path d="M145 -2 Q148 -20 162 -24 Q176 -22 174 -6 Q172 6 160 6 Q147 4 145 -2Z" fill="url(#mg2)"/></g>
              <g filter="url(#mgs)"><path d="M182 4 Q186 -14 200 -20 Q214 -18 212 -2 Q210 10 198 10 Q184 8 182 4Z" fill="url(#mg3)"/></g>

              {/* Mind map nodes */}
              {/* Central node */}
              <rect x="82" y="76" width="76" height="30" rx="15" fill="url(#mgn)" filter="url(#mgs)"/>
              <text x="120" y="91" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11" fontWeight="700" style={{fontFamily:"Georgia,serif"}}>Your Ideas</text>

              {/* Branch curves with leaves */}
              <path d="M82 91 C60 91 44 68 38 60" stroke="#7A9068" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8"/>
              <ellipse cx="62" cy="78" rx="5" ry="8" fill="url(#mg2)" opacity="0.85" transform="rotate(-30 62 78)"/>
              <line x1="62" y1="83" x2="62" y2="71" stroke="#3A7820" strokeWidth="0.6" opacity="0.18"/>

              <path d="M82 84 C58 76 44 52 40 42" stroke="#7A9068" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8"/>
              <ellipse cx="60" cy="64" rx="4" ry="7" fill="url(#mg1)" opacity="0.85" transform="rotate(-40 60 64)"/>

              <path d="M158 91 C178 91 194 68 202 60" stroke="#7A9068" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8"/>
              <ellipse cx="178" cy="78" rx="5" ry="8" fill="url(#mg3)" opacity="0.85" transform="rotate(30 178 78)"/>
              <line x1="178" y1="83" x2="178" y2="71" stroke="#3A7820" strokeWidth="0.6" opacity="0.18"/>

              <path d="M158 84 C182 76 196 52 200 42" stroke="#7A9068" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8"/>
              <ellipse cx="180" cy="64" rx="4" ry="7" fill="url(#mg2)" opacity="0.85" transform="rotate(40 180 64)"/>

              <path d="M120 106 C120 126 120 140 120 152" stroke="#7A9068" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8"/>
              <ellipse cx="120" cy="130" rx="5" ry="8" fill="url(#mg1)" opacity="0.85" transform="rotate(5 120 130)"/>

              {/* Branch nodes */}
              <rect x="18" y="52" width="52" height="22" rx="11" fill="rgba(248,245,236,0.92)" stroke="rgba(90,120,72,0.35)" strokeWidth="1.2" filter="url(#mgs)"/>
              <text x="44" y="63" textAnchor="middle" dominantBaseline="middle" fill="#2A3A18" fontSize="9.5" fontWeight="600">Thoughts</text>

              <rect x="16" y="30" width="52" height="22" rx="11" fill="rgba(248,245,236,0.92)" stroke="rgba(90,120,72,0.35)" strokeWidth="1.2" filter="url(#mgs)"/>
              <text x="42" y="41" textAnchor="middle" dominantBaseline="middle" fill="#2A3A18" fontSize="9.5" fontWeight="600">Projects</text>

              <rect x="172" y="52" width="52" height="22" rx="11" fill="url(#mgn)" filter="url(#mgs)"/>
              <text x="198" y="63" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="9.5" fontWeight="600">Goals</text>

              <rect x="170" y="30" width="52" height="22" rx="11" fill="rgba(248,245,236,0.92)" stroke="rgba(90,120,72,0.35)" strokeWidth="1.2" filter="url(#mgs)"/>
              <text x="196" y="41" textAnchor="middle" dominantBaseline="middle" fill="#2A3A18" fontSize="9.5" fontWeight="600">Ideas</text>

              <rect x="90" y="147" width="60" height="22" rx="11" fill="rgba(248,245,236,0.92)" stroke="rgba(90,120,72,0.35)" strokeWidth="1.2" filter="url(#mgs)"/>
              <text x="120" y="158" textAnchor="middle" dominantBaseline="middle" fill="#2A3A18" fontSize="9.5" fontWeight="600">Plans</text>
            </svg>

            {/* Headline */}
            <div style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:700,color:"#1A1A10",textAlign:"center",marginBottom:10,letterSpacing:-0.4,lineHeight:1.25}}>
              Think visually, think freely
            </div>

            {/* Description */}
            <div style={{fontSize:15,color:"#6A6050",textAlign:"center",lineHeight:1.72,marginBottom:28,maxWidth:290,fontWeight:400}}>
              Create multiple mind maps — one for each project, idea, or dream. Let your thoughts branch naturally, like vines finding the light.
            </div>

            {/* CTA */}
            <button onClick={()=>setAdding(true)} style={{
              background:"#5A7848",color:"#fff",border:"none",
              borderRadius:100,padding:"17px 40px",
              fontSize:17,fontWeight:700,cursor:"pointer",
              boxShadow:"0 6px 24px rgba(58,80,38,0.38)",
              display:"flex",alignItems:"center",gap:12,
              letterSpacing:0.2,marginBottom:16,
            }}>
              <span style={{fontSize:20}}>+</span>
              Create your first mind map
            </button>

            {/* Hint */}
            <div style={{fontSize:12,color:"rgba(90,80,60,0.55)",textAlign:"center",display:"flex",alignItems:"center",gap:6}}>
              <span>🌿</span>
              <span>You can create as many maps as you like</span>
              <span>🌿</span>
            </div>
          </div>
        )}

        {/* MAPS LIST */}
        {data.length>0&&(
          <div style={{fontSize:11,color:"rgba(60,50,30,0.45)",textAlign:"center",marginBottom:12,letterSpacing:0.5}}>
            Tap a map to open it
          </div>
        )}
        {data.map((m,i)=>{
          const cols=["#5A7848","#7A6038","#486878","#6A5870","#486050"];
          const col=cols[i%cols.length];
          return(
            <div key={m.id} onClick={()=>setMapId(m.id)}
              style={{display:"flex",alignItems:"center",gap:14,background:"rgba(248,245,236,0.88)",backdropFilter:"blur(12px)",borderRadius:22,padding:"16px 18px",marginBottom:12,border:"1px solid rgba(255,255,255,0.9)",cursor:"pointer",transition:"all 0.15s",boxShadow:"0 2px 14px rgba(0,0,0,0.06)"}}>
              <div style={{width:44,height:44,borderRadius:14,flexShrink:0,background:col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:`0 2px 10px ${col}55`}}>🧠</div>
              <div style={{flex:1}}>
                <div style={{color:"#1A1A10",fontWeight:700,fontSize:17,marginBottom:2}}>{m.name}</div>
                <div style={{color:"#8A8070",fontSize:12}}>{m.nodes.length} node{m.nodes.length!==1?"s":""}</div>
              </div>
              <button onClick={e=>{e.stopPropagation();setData(ms=>ms.filter(x=>x.id!==m.id));}}
                style={{background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"1px solid rgba(90,80,60,0.15)",borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🗑</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Crystal node SVG renderer */
function CrystalNode({cx,cy,r,selected,label,isRoot}) {
  const id=`crys_${cx|0}_${cy|0}`;
  return (
    <g style={{cursor:"pointer",filter:selected?"drop-shadow(0 0 10px rgba(160,190,140,0.35))":"drop-shadow(0 4px 8px rgba(45,10,94,0.5))"}}>
      <defs>
        <radialGradient id={`rg_${id}`} cx="38%" cy="32%" r="65%">
          <stop offset="0%"   stopColor="#f0e8ff" stopOpacity="1"/>
          <stop offset="28%"  stopColor="#c4aee8" stopOpacity="0.95"/>
          <stop offset="60%"  stopColor="#5A7848" stopOpacity="0.92"/>
          <stop offset="85%"  stopColor="#5a3d9a" stopOpacity="0.97"/>
          <stop offset="100%" stopColor="#2C3820" stopOpacity="1"/>
        </radialGradient>
        <radialGradient id={`shine_${id}`} cx="32%" cy="28%" r="40%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.75)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        <radialGradient id={`glow_${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#c4aee8" stopOpacity={selected?0.6:0.2}/>
          <stop offset="100%" stopColor="#5A7848" stopOpacity="0"/>
        </radialGradient>
        <clipPath id={`clip_${id}`}>
          <circle cx={cx} cy={cy} r={r}/>
        </clipPath>
      </defs>

      {/* Outer glow ring */}
      <circle cx={cx} cy={cy} r={r+8} fill={`url(#glow_${id})`}/>

      {/* Pulsing selection ring */}
      {selected&&<circle cx={cx} cy={cy} r={r+5} fill="none" stroke="rgba(160,190,140,0.35)" strokeWidth={2} strokeDasharray="6,3"/>}

      {/* Main crystal sphere */}
      <circle cx={cx} cy={cy} r={r} fill={`url(#rg_${id})`} stroke="rgba(255,255,255,0.5)" strokeWidth={selected?2.5:1.5}/>

      {/* Crystal facet lines */}
      <g clipPath={`url(#clip_${id})`} opacity={0.25}>
        <line x1={cx-r} y1={cy-r*0.2} x2={cx+r} y2={cy+r*0.2} stroke="white" strokeWidth={0.8}/>
        <line x1={cx-r*0.3} y1={cy-r} x2={cx+r*0.3} y2={cy+r} stroke="white" strokeWidth={0.8}/>
        <line x1={cx-r*0.8} y1={cy+r*0.5} x2={cx+r*0.8} y2={cy-r*0.5} stroke="white" strokeWidth={0.6}/>
        <line x1={cx} y1={cy-r} x2={cx-r*0.6} y2={cy+r*0.6} stroke="white" strokeWidth={0.5}/>
        <line x1={cx} y1={cy-r} x2={cx+r*0.6} y2={cy+r*0.6} stroke="white" strokeWidth={0.5}/>
      </g>

      {/* Specular highlight */}
      <circle cx={cx} cy={cy} r={r} fill={`url(#shine_${id})`}/>

      {/* Small top sparkle */}
      <circle cx={cx-r*0.28} cy={cy-r*0.3} r={r*0.13} fill="rgba(255,255,255,0.7)"/>
      <circle cx={cx-r*0.18} cy={cy-r*0.18} r={r*0.06} fill="rgba(255,255,255,0.9)"/>

      {/* Label */}
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
        fill="white" fontSize={isRoot?13:10} fontWeight={800}
        style={{pointerEvents:"none",userSelect:"none",textShadow:"0 1px 4px rgba(0,0,0,0.6)"}}>
        {label.length>12?label.slice(0,11)+"…":label}
      </text>
    </g>
  );
}

/* Branch (child) node */
function BranchNode({cx,cy,r,color,lightColor,selected,label}) {
  const id=`br_${cx|0}_${cy|0}_${label.slice(0,4)}`;
  return (
    <g style={{cursor:"pointer",filter:selected?"drop-shadow(0 0 8px rgba(255,255,255,0.6))":"drop-shadow(0 2px 6px rgba(45,10,94,0.4))"}}>
      <defs>
        <radialGradient id={`brg_${id}`} cx="35%" cy="30%" r="65%">
          <stop offset="0%"   stopColor={lightColor} stopOpacity="1"/>
          <stop offset="50%"  stopColor={color} stopOpacity="0.95"/>
          <stop offset="100%" stopColor={color} stopOpacity="1"/>
        </radialGradient>
        <radialGradient id={`bshine_${id}`} cx="30%" cy="25%" r="40%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.6)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        <clipPath id={`bclip_${id}`}><circle cx={cx} cy={cy} r={r}/></clipPath>
      </defs>
      {selected&&<circle cx={cx} cy={cy} r={r+5} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={2} strokeDasharray="5,3"/>}
      <circle cx={cx} cy={cy} r={r} fill={`url(#brg_${id})`} stroke="rgba(255,255,255,0.4)" strokeWidth={selected?2:1.2}/>
      <g clipPath={`url(#bclip_${id})`} opacity={0.2}>
        <line x1={cx-r} y1={cy} x2={cx+r} y2={cy} stroke="white" strokeWidth={0.7}/>
        <line x1={cx} y1={cy-r} x2={cx} y2={cy+r} stroke="white" strokeWidth={0.7}/>
      </g>
      <circle cx={cx} cy={cy} r={r} fill={`url(#bshine_${id})`}/>
      <circle cx={cx-r*0.25} cy={cy-r*0.28} r={r*0.12} fill="rgba(255,255,255,0.65)"/>
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
        fill="white" fontSize={10} fontWeight={700}
        style={{pointerEvents:"none",userSelect:"none"}}>
        {label.length>11?label.slice(0,10)+"…":label}
      </text>
    </g>
  );
}

/* ── SendToDropdown — multi-select, send as many as you want ── */
function SendToDropdown({node,isRoot,priData,setPriData,ideasData,setIdeasData,matrixData,setMatrixData,goalsData,setGoalsData,addToCalendar,sentMsg,setSentMsg}){
  const [open,setOpen]=useState(false);
  const [selected,setSelected]=useState(new Set());
  const ref=useRef(null);

  useEffect(()=>{
    const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);

  const horizons=["week","month1","month6","year1","year3","year5"];
  const horizonLabels={"week":"Next Week","month1":"1 Month","month6":"6 Months","year1":"1 Year","year3":"3 Years","year5":"5 Years"};
  const horizonIcons={"week":"📅","month1":"🗓️","month6":"🌱","year1":"⭐","year3":"🚀","year5":"🏔️"};
  const horizonDays={"week":7,"month1":30,"month6":180,"year1":365,"year3":1095,"year5":1825};

  // Root node: Goals + Calendar. Branch nodes: Prioritizer + Matrix + Calendar
  const OPTIONS=isRoot?[
    {id:"cal",       label:"Google Calendar",       icon:"📅", group:"📅 Calendar"},
    ...horizons.map(h=>({id:`goal_${h}`,label:`${horizonLabels[h]} Goal`,icon:horizonIcons[h],group:"🎯 Add as Goal"})),
  ]:[
    {id:"cal",       label:"Google Calendar",       icon:"📅", group:"📅 Calendar"},
    ...["do","plan","help","drop"].map(q=>({
      id:`matrix_${q}`,
      label:{do:"Do First",plan:"Schedule",help:"Ask for Help",drop:"Eliminate"}[q],
      icon:{do:"🔴",plan:"🟠",help:"🔵",drop:"⚫"}[q],
      group:"🎯 Matrix"
    })),
    ...(priData||[]).map(l=>({id:`pri_${l.id}`,label:l.name,icon:"📋",group:"📋 Prioritizer"})),
  ];

  const groups=[...new Set(OPTIONS.map(o=>o.group))];
  const toggle=id=>setSelected(s=>{const n=new Set(s);n.has(id)?n.delete(id):n.add(id);return n;});

  const sendAll=()=>{
    if(selected.size===0)return;
    const text=node.text;
    const note=node.note||"";
    const msgs=[];

    selected.forEach(id=>{
      if(id==="cal"){
        addToCalendar();
        msgs.push("📅 Calendar");
      }
      else if(id.startsWith("matrix_")){
        const quad=id.replace("matrix_","");
        setMatrixData(ds=>[...ds,{id:Date.now()+Math.random(),text,quad,created:Date.now(),touched:Date.now(),url:""}]);
        msgs.push("🎯 Matrix");
      }
      else if(id.startsWith("pri_")){
        const listId=Number(id.replace("pri_",""));
        setPriData(ls=>ls.map(l=>l.id===listId?{...l,tasks:[...l.tasks,{id:Date.now()+Math.random(),name:text,done:false,color:"lilac",url:""}]}:l));
        msgs.push("📋 Prioritizer");
      }
      else if(id.startsWith("goal_")){
        const horizon=id.replace("goal_","");
        const due=new Date();
        due.setDate(due.getDate()+(horizonDays[horizon]||7));
        const newGoal={
          id:Date.now()+Math.random(),
          horizon:horizon==="month1"?"month6":horizon, // map month1 to nearest GOAL_HORIZONS key
          title:text,description:note,
          dueDate:due.toISOString().slice(0,10),
          cover:node.cover||null,
          links:(node.links||[]).map(l=>({...l,id:Date.now()+Math.random()})),
          subtasks:[],status:"active",created:Date.now()
        };
        // Store the actual horizon label for display
        newGoal._horizonLabel=horizonLabels[horizon];
        newGoal._horizonIcon=horizonIcons[horizon];
        if(setGoalsData) setGoalsData(gs=>[...gs,newGoal]);
        msgs.push(`${horizonIcons[horizon]} Goal`);
      }
    });

    setSentMsg("✅ Sent to: "+[...new Set(msgs)].join(", "));
    setTimeout(()=>setSentMsg(""),3000);
    setSelected(new Set());setOpen(false);
  };

  return(
    <div style={{marginBottom:16,position:"relative"}} ref={ref}>
      <div style={{fontWeight:800,color:C.dp,fontSize:14,marginBottom:8}}>
        {isRoot?"🎯 Add to Goals or Calendar":"↗ Send to Prioritizer / Matrix / Calendar"}
      </div>

      {/* Trigger button */}
      <button onClick={()=>setOpen(o=>!o)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:open?C.ll:C.pale,border:`2px solid ${open?C.pp:C.lp}`,borderRadius:12,fontWeight:700,fontSize:14,color:C.dp,cursor:"pointer",transition:"all 0.15s"}}>
        <span>{selected.size===0?"Choose destinations…":`${selected.size} selected`}</span>
        <span style={{fontSize:12,color:C.soft}}>{open?"▲":"▼"}</span>
      </button>

      {/* Dropdown */}
      {open&&(
        <div style={{position:"absolute",bottom:"calc(100% + 8px)",left:0,right:0,background:C.wh,borderRadius:16,border:`1.5px solid ${C.lp}`,boxShadow:"0 -8px 32px rgba(90,80,60,0.22)",zIndex:400,maxHeight:340,overflowY:"auto"}}>
          {groups.map(group=>{
            const opts=OPTIONS.filter(o=>o.group===group);
            if(!opts.length)return null;
            return(
              <div key={group}>
                <div style={{padding:"8px 14px 4px",fontSize:10,fontWeight:800,color:C.soft,textTransform:"uppercase",letterSpacing:1,background:C.pale,borderBottom:`1px solid ${C.ll}`}}>
                  {group}
                </div>
                {opts.map(opt=>{
                  const isSel=selected.has(opt.id);
                  return(
                    <button key={opt.id} onClick={()=>toggle(opt.id)}
                      style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",background:isSel?"#f0ebff":"transparent",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left"}}>
                      <span style={{fontSize:18,flexShrink:0}}>{opt.icon}</span>
                      <span style={{flex:1,fontSize:14,fontWeight:isSel?700:600,color:isSel?C.pp:C.txt}}>{opt.label}</span>
                      <div style={{width:20,height:20,borderRadius:6,border:`2px solid ${isSel?C.pp:C.lp}`,background:isSel?C.pp:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        {isSel&&<span style={{color:"#1A1A10",fontSize:12,fontWeight:900,lineHeight:1}}>✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
          <div style={{padding:"12px 14px",position:"sticky",bottom:0,background:C.wh,borderTop:`1.5px solid ${C.ll}`}}>
            <button onClick={sendAll} disabled={selected.size===0}
              style={{width:"100%",padding:"12px",background:selected.size>0?btnGrad:"#ccc",color:"#1A1A10",border:"none",borderRadius:12,fontWeight:800,fontSize:14,cursor:selected.size>0?"pointer":"default",transition:"all 0.2s"}}>
              {selected.size===0?"Select destinations above":`Send to ${selected.size} place${selected.size>1?"s":""} →`}
            </button>
          </div>
        </div>
      )}

      {sentMsg&&(
        <div style={{marginTop:8,background:"#e8f5e9",color:"#2e7d32",borderRadius:8,padding:"8px 12px",fontSize:12,fontWeight:700,lineHeight:1.5}}>
          {sentMsg}
        </div>
      )}
    </div>
  );

}

function MindMapCanvas({map,onBack,onUpdate,priData,setPriData,ideasData,setIdeasData,matrixData,setMatrixData,goalsData,setGoalsData,setScreen}) {
  const svgRef=useRef(null);
  const [nodes,setNodes]=useState(map.nodes);
  const [selected,setSelected]=useState(null);
  const [dragging,setDragging]=useState(null);
  const [dragMoved,setDragMoved]=useState(false);
  const [dragOffset,setDragOffset]=useState({x:0,y:0});
  const [editingId,setEditingId]=useState(null);
  const [editText,setEditText]=useState("");
  const [pan,setPan]=useState({x:0,y:0});
  const [panStart,setPanStart]=useState(null);
  const [darkBg,setDarkBg]=useState(true);
  const [deleteConfirmId,setDeleteConfirmId]=useState(null);
  const longPressRef=useRef(null);

  // NodeColourDot — compact colour picker beside the text input
  function NodeColourDot({color,onSelect}) {
    const [open,setOpen]=useState(false);
    const ref=useRef(null);
    useEffect(()=>{
      const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
      document.addEventListener("mousedown",h);
      return()=>document.removeEventListener("mousedown",h);
    },[]);
    return (
      <div ref={ref} style={{position:"relative",flexShrink:0}}>
        <button onClick={()=>setOpen(o=>!o)} style={{width:36,height:36,borderRadius:"50%",background:color,border:`3px solid ${open?C.dp:C.lp}`,cursor:"pointer",padding:0,boxShadow:open?`0 0 0 3px ${C.lp}`:"none",transition:"all 0.15s"}}/>
        {open&&(
          <div style={{position:"absolute",bottom:42,right:0,background:C.wh,borderRadius:14,padding:"10px 8px",boxShadow:"0 8px 28px rgba(90,80,60,0.28)",border:`1.5px solid ${C.ll}`,display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,zIndex:300}}>
            {NODE_COLORS.map((col,i)=>(
              <button key={col} onClick={()=>{onSelect(col,i);setOpen(false);}} style={{width:30,height:30,borderRadius:"50%",background:col,border:color===col?`3px solid ${C.dp}`:"2px solid rgba(0,0,0,0.08)",cursor:"pointer",padding:0,transition:"transform 0.1s"}}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.2)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  const [svgSize,setSvgSize]=useState({w:360,h:500});

  // Keep parent updated
  useEffect(()=>{onUpdate({...map,nodes});},[nodes]);

  // Measure SVG for centering
  useEffect(()=>{
    if(!svgRef.current)return;
    const obs=new ResizeObserver(([e])=>{
      setSvgSize({w:e.contentRect.width,h:e.contentRect.height});
      // centre root on first load
      setNodes(ns=>ns.map(n=>n.parent===null&&n.x===0&&n.y===0?{...n,x:e.contentRect.width/2,y:e.contentRect.height/2}:n));
    });
    obs.observe(svgRef.current);
    return()=>obs.disconnect();
  },[]);

  const getPos=useCallback((e)=>{
    const r=svgRef.current.getBoundingClientRect();
    const touch=e.touches?e.touches[0]:e;
    return{x:touch.clientX-r.left-pan.x, y:touch.clientY-r.top-pan.y};
  },[pan]);

  const hitTest=useCallback((pos)=>{
    return nodes.slice().reverse().find(n=>{
      const isRoot=!n.parent;
      if(isRoot){
        // root card: 110×130 rectangle centred on n.x, n.y
        return Math.abs(pos.x-n.x)<60&&Math.abs(pos.y-n.y)<70;
      }
      // branch: rounded rect 90×36
      return Math.abs(pos.x-n.x)<50&&Math.abs(pos.y-n.y)<22;
    });
  },[nodes]);

  /* Spawn child — horizontal tree layout */
  const spawnChild=(parentId)=>{
    const parent=nodes.find(n=>n.id===parentId);
    if(!parent)return;
    const siblings=nodes.filter(n=>n.parent===parentId);
    const isRoot=parent.parent===null;
    // For root: fan out horizontally; for branches: go further right
    const xOff = isRoot ? 200 : 180;
    const ySpread = 54;
    const totalSibs = siblings.length;
    const yOff = (totalSibs - (totalSibs>0?(totalSibs-1)/2:0)) * ySpread - (totalSibs*(ySpread/2));
    const newY = parent.y + (totalSibs - Math.max(0,totalSibs-1)/2) * ySpread - (totalSibs * ySpread/2);
    const colorIdx=nodes.filter(n=>n.parent!==null).length%NODE_COLORS.length;
    const newNode={
      id:Date.now(), text:"New idea",
      x:parent.x+xOff,
      y:newY,
      parent:parentId,
      color:NODE_COLORS[colorIdx],
      lightColor:BRANCH_COLORS[colorIdx],
    };
    setNodes(ns=>[...ns,newNode]);
    setSelected(newNode.id);
    setTimeout(()=>{setEditingId(newNode.id);setEditText("New idea");},60);
  };

  const deleteSelected=()=>{
    if(!selected||nodes.find(n=>n.id===selected)?.parent===null)return;
    const toDelete=new Set();
    const queue=[selected];
    while(queue.length){const id=queue.shift();toDelete.add(id);nodes.filter(n=>n.parent===id).forEach(n=>queue.push(n.id));}
    setNodes(ns=>ns.filter(n=>!toDelete.has(n.id)));
    setSelected(null);
  };

  const commitEdit=()=>{
    if(!editText.trim())return;
    setNodes(ns=>ns.map(n=>n.id===editingId?{...n,text:editText.trim()}:n));
    setEditingId(null);
  };

  /* Pointer handlers */
  const onDown=e=>{
    const pos=getPos(e);
    const hit=hitTest(pos);
    if(hit){
      setDragging(hit.id);
      setDragMoved(false);
      setDragOffset({x:pos.x-hit.x,y:pos.y-hit.y});
    } else {
      setSelected(null);
      const touch=e.touches?e.touches[0]:e;
      setPanStart({x:touch.clientX-pan.x,y:touch.clientY-pan.y});
    }
  };

  const onMove=e=>{
    e.preventDefault();
    clearTimeout(longPressRef.current);
    if(dragging){
      const pos=getPos(e);
      setDragMoved(true);
      setNodes(ns=>ns.map(n=>n.id===dragging?{...n,x:pos.x-dragOffset.x,y:pos.y-dragOffset.y}:n));
    } else if(panStart){
      const touch=e.touches?e.touches[0]:e;
      setPan({x:touch.clientX-panStart.x,y:touch.clientY-panStart.y});
    }
  };

  const onUp=()=>{
    if(dragging&&!dragMoved){
      if(selected===dragging) spawnChild(dragging);
      else setSelected(dragging);
    }
    setDragging(null);
    setPanStart(null);
  };

  const onDblClick=e=>{
    const pos=getPos(e);
    const hit=hitTest(pos);
    if(hit){setEditingId(hit.id);setEditText(hit.text);}
  };

  /* S-curve edge from parent edge → child centre */
  const edgePath=(p,ch)=>{
    const x1=p.parent===null?p.x+55:p.x+45;
    const x2=ch.x-48;
    const mx=(x1+x2)/2;
    return`M${x1} ${p.y} C${mx} ${p.y} ${mx} ${ch.y} ${x2} ${ch.y}`;
  };

  const [aiGrowing,setAiGrowing]=useState(false);
  const [podcastModal,setPodcastModal]=useState(false);
  const [podcastLength,setPodcastLength]=useState("short");
  const [podcastGenerating,setPodcastGenerating]=useState(false);
  const [podcastText,setPodcastText]=useState("");
  const [podcastSaved,setPodcastSaved]=useState(false);
  const [voiceRecording,setVoiceRecording]=useState(false);
  const [mediaRec,setMediaRec]=useState(null);
  const [dragSendTarget,setDragSendTarget]=useState(null);
  const [sentMsg,setSentMsg]=useState("");
  const [templateModal,setTemplateModal]=useState(false);
  const [gapModal,setGapModal]=useState(false);
  const [gapLoading,setGapLoading]=useState(false);
  const [gaps,setGaps]=useState([]);
  const [mergeModal,setMergeModal]=useState(false);
  const [mergeTargetId,setMergeTargetId]=useState(null);
  const [goalLinkModal,setGoalLinkModal]=useState(false);
  const [linkedGoalId,setLinkedGoalId]=useState(map.linkedGoalId||null);
  const [priSelectModal,setPriSelectModal]=useState(false); // selective high-priority move
  const [priSelected,setPriSelected]=useState(new Set());
  const showMsg=msg=>{setSentMsg(msg);setTimeout(()=>setSentMsg(""),2200);};

  // ── BRANCH TEMPLATES ──────────────────────────────────
  const BRANCH_TEMPLATES=[
    {id:"project",icon:"🏗️",name:"Project Plan",desc:"Goals, tasks, risks, timeline",
     branches:["🎯 Goals","📋 Tasks","⚠️ Risks","📅 Timeline","👥 Team","✅ Done"]},
    {id:"brainstorm",icon:"⚡",name:"Brainstorm",desc:"Free ideas, connections, picks",
     branches:["💡 Ideas","🌀 Wild Cards","🔗 Connections","❓ Questions","🎯 Best Picks","🗑️ Parking Lot"]},
    {id:"problem",icon:"🔍",name:"Problem Solve",desc:"Problem, causes, solutions",
     branches:["❌ The Problem","🔎 Root Causes","💡 Solutions","✅ Best Solution","📋 Action Steps","📊 Measure"]},
    {id:"weekly",icon:"📅",name:"Weekly Review",desc:"Wins, lessons, priorities",
     branches:["🏆 Wins","📚 Lessons","😓 Challenges","🎯 Next Week","💚 Grateful For","🌱 Growing"]},
    {id:"decision",icon:"⚖️",name:"Decision Map",desc:"Options, pros, cons, choice",
     branches:["🤔 The Decision","Option A","Option B","Option C","⚖️ Criteria","✅ My Choice"]},
    {id:"learning",icon:"📚",name:"Learning Plan",desc:"Topic, resources, practice",
     branches:["📖 What","🎯 Why","📚 Resources","🛠️ Practice","📅 Schedule","✅ Milestones"]},
    {id:"goal",icon:"🌱",name:"Goal Garden",desc:"Goal, steps, obstacles",
     branches:["🎯 My Goal","🌿 Why It Matters","📋 Steps","🚧 Obstacles","💪 Support","🌸 Reward"]},
    {id:"meeting",icon:"👥",name:"Meeting Notes",desc:"Agenda, notes, actions",
     branches:["📋 Agenda","🗣️ Discussion","💡 Ideas","✅ Decisions","📌 Actions","📅 Follow Up"]},
  ];

  const applyTemplate=(template)=>{
    if(!root)return;
    const cx=root.x,cy=root.y;
    const n=template.branches.length;
    const newNodes=template.branches.map((b,i)=>{
      const angle=(i/n)*2*Math.PI-Math.PI/2;
      const r=190;
      const colorIdx=i%BRANCH_PALETTE.length;
      return{id:Date.now()+i+Math.random(),text:b,x:cx+Math.cos(angle)*r,y:cy+Math.sin(angle)*r,parent:root.id,color:BRANCH_PALETTE[colorIdx].color,lightColor:BRANCH_PALETTE[colorIdx].color+"33"};
    });
    setNodes(ns=>[...ns,...newNodes]);
    setTemplateModal(false);
    showMsg(`🏗️ "${template.name}" template applied!`);
  };

  // ── AI GAP CHECK ────────────────────────────────────────
  const checkGaps=async()=>{
    if(!root)return;
    setGapModal(true);setGapLoading(true);setGaps([]);
    const outline=nodes.map(n=>`${n.parent===null?"ROOT":nodes.find(p=>p.id===n.parent)?.text||"?"} → ${n.text}`).join("\n");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,
          messages:[{role:"user",content:`You're a gentle thinking partner reviewing a mind map. Identify 3-5 gaps, missing connections, or underdeveloped branches. Be warm, curious, and encouraging — not critical. Format each as a short question or gentle nudge.\n\nMap topic: "${root.text}"\nBranches:\n${outline}\n\nReturn ONLY a JSON array of strings (the gentle prompts). No markdown.`}]})
      });
      setGaps(JSON.parse((j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim()));
    }catch{setGaps(["Couldn't reach AI — try again 🌿"]);}
    setGapLoading(false);
  };

  // ── MERGE MAPS ─────────────────────────────────────────
  const mergeMaps=(targetMap)=>{
    if(!targetMap||!root)return;
    const targetRoot=targetMap.nodes.find(n=>n.parent===null);
    if(!targetRoot)return;
    // Offset merged nodes so they don't overlap
    const offsetX=300,offsetY=0;
    const mergedNodes=targetMap.nodes.map(n=>({
      ...n,
      id:Date.now()+Math.random(),
      x:n.x+offsetX,
      y:n.y+offsetY,
      // reparent root of target map to current root
      parent:n.parent===null?root.id:n.parent,
    }));
    // Fix internal parent refs: old targetRoot id → new id
    const oldRootId=targetRoot.id;
    const newRootId=mergedNodes[0].id; // first node is old root
    const fixedNodes=mergedNodes.map(n=>n.parent===oldRootId?{...n,parent:newRootId}:n);
    setNodes(ns=>[...ns,...fixedNodes]);
    setMergeModal(false);
    showMsg(`🔗 "${targetMap.name}" merged in!`);
  };

  // ── MAP → GOAL PROGRESS SYNC ───────────────────────────
  // Syncs % of branch nodes marked done → linked goal's garden growth
  const syncGoalProgress=useCallback(()=>{
    if(!linkedGoalId||!setGoalsData)return;
    const branchNodes=nodes.filter(n=>n.parent!==null);
    if(!branchNodes.length)return;
    const doneNodes=branchNodes.filter(n=>n.done);
    const pct=Math.round((doneNodes.length/branchNodes.length)*100);
    setGoalsData(gs=>gs.map(g=>g.id===linkedGoalId?{
      ...g,
      // Update subtasks to reflect map progress
      subtasks:g.subtasks.length>0
        ?g.subtasks.map((s,i)=>branchNodes[i]?{...s,done:branchNodes[i].done||s.done}:s)
        :branchNodes.slice(0,8).map(n=>({id:n.id,text:n.text,done:n.done||false,microSteps:[],microExpanded:false})),
    }:g));
    showMsg(`🌱 Goal updated — ${pct}% growth synced!`);
  },[linkedGoalId,nodes,setGoalsData]);

  // Mark node done (for goal sync)
  const toggleNodeDone=id=>{
    setNodes(ns=>ns.map(n=>n.id===id?{...n,done:!n.done}:n));
    if(linkedGoalId)setTimeout(syncGoalProgress,100);
  };

  // ── SELECTIVE HIGH-PRIORITY MOVE ───────────────────────
  const branchNodes=nodes.filter(n=>n.parent!==null);
  const openPriSelect=()=>{setPriSelected(new Set());setPriSelectModal(true);};
  const confirmPriMove=listId=>{
    if(!priSelected.size)return;
    const tasks=[...priSelected].map(id=>{
      const n=nodes.find(x=>x.id===id);
      return{id:Date.now()+Math.random(),name:n?.text||"",done:false,color:"lilac",url:""};
    });
    setPriData(ls=>ls.map(l=>l.id===listId?{...l,tasks:[...l.tasks,...tasks]}:l));
    setPriSelectModal(false);setPriSelected(new Set());
    showMsg(`📋 ${tasks.length} node${tasks.length>1?"s":""} moved to Prioritizer!`);
  };

  const root=nodes.find(n=>n.parent===null);

  // Branch colour palette — colour-coded with leaf icons
  const BRANCH_PALETTE=[
    {color:"#5A7848",label:"🌿 Sage"},
    {color:"#7A6038",label:"🍂 Amber"},
    {color:"#486878",label:"🌊 Slate"},
    {color:"#6A5870",label:"🌸 Mauve"},
    {color:"#7A4A38",label:"🍁 Rust"},
    {color:"#486050",label:"🌱 Forest"},
    {color:"#705848",label:"🌰 Bark"},
    {color:"#3A5868",label:"💧 Ocean"},
  ];

  // ── AI "Grow this branch" ──────────────────────────────
  const growBranch=async(parentId)=>{
    const parent=nodes.find(n=>n.id===parentId);
    if(!parent||!root)return;
    setAiGrowing(true);
    try{
      const allTexts=nodes.map(n=>n.text).join(", ");
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:300,
          messages:[{role:"user",content:`Mind map topic: "${root.text}". Node: "${parent.text}". Existing nodes: ${allTexts}. Suggest 3 short, specific sub-ideas to branch off "${parent.text}". Return ONLY a JSON array of 3 strings, no markdown.`}]
        })
      });
      const ideas=JSON.parse((j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim());
      ideas.slice(0,3).forEach((idea,i)=>{
        const siblings=nodes.filter(n=>n.parent===parentId);
        const yOff=(siblings.length+i-1)*54;
        const colorIdx=(nodes.length+i)%BRANCH_PALETTE.length;
        setNodes(ns=>[...ns,{id:Date.now()+i,text:idea,x:parent.x+180,y:parent.y+yOff,parent:parentId,color:BRANCH_PALETTE[colorIdx].color,lightColor:BRANCH_PALETTE[colorIdx].color+"33",aiGenerated:true}]);
      });
      showMsg("🌿 Branch grown by AI!");
    }catch{showMsg("AI unavailable — try again");}
    setAiGrowing(false);
  };

  // ── Voice note recording ──────────────────────────────
  const startVoice=async(nodeId)=>{
    if(!navigator.mediaDevices){showMsg("Voice notes need microphone access");return;}
    try{
      const stream=await navigator.mediaDevices.getUserMedia({audio:true});
      const mr=new MediaRecorder(stream);
      const chunks=[];
      mr.ondataavailable=e=>chunks.push(e.data);
      mr.onstop=()=>{
        const blob=new Blob(chunks,{type:"audio/webm"});
        const url=URL.createObjectURL(blob);
        setNodes(ns=>ns.map(n=>n.id===nodeId?{...n,voiceNote:url}:n));
        showMsg("🎙️ Voice note saved!");
        stream.getTracks().forEach(t=>t.stop());
      };
      mr.start();
      setMediaRec(mr);
      setVoiceRecording(nodeId);
    }catch{showMsg("Microphone access denied");}
  };
  const stopVoice=()=>{
    if(mediaRec){mediaRec.stop();setMediaRec(null);}
    setVoiceRecording(null);
  };

  // ── Podcast Recap generation ──────────────────────────
  const generatePodcast=async()=>{
    if(!root)return;
    setPodcastGenerating(true);
    const outline=nodes.filter(n=>n.parent!==null).map(n=>`- ${n.text}`).join("\n");
    const wordCount=podcastLength==="short"?200:500;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:700,
          messages:[{role:"user",content:`Create a ${podcastLength==="short"?"60-second (~${wordCount} word)":"3-minute (~${wordCount} word)"} podcast script based on this mind map.\nTopic: "${root.text}"\nKey points:\n${outline}\n\nWrite it in a warm, conversational tone as if speaking directly to a listener. Start with a hook, cover the key ideas, end with a takeaway. No headers, just flowing narration.`}]
        })
      });
      setPodcastText(j.content?.[0]?.text||"Could not generate — please try again.");
    }catch{setPodcastText("AI unavailable — please try again.");}
    setPodcastGenerating(false);
  };

  const savePodcastToVault=()=>{
    if(!podcastText||!ideasData)return;
    const entry={id:Date.now(),title:`🎙️ ${root?.text||"Mind Map"} — Podcast Recap`,content:podcastText,type:"podcast",created:Date.now(),tags:["podcast","mind-map"]};
    setIdeasData(ds=>[entry,...ds]);
    setPodcastSaved(true);
    showMsg("💾 Saved to The Vault!");
  };

  // ── Drag node to send zone ────────────────────────────
  const handleDragNodeEnd=(e,nodeId)=>{
    const target=dragSendTarget;
    setDragSendTarget(null);
    if(!target)return;
    const node=nodes.find(n=>n.id===nodeId);
    if(!node||node.parent===null)return;
    if(target==="prioritizer"&&priData?.length>0){
      setPriData(ls=>[{...ls[0],tasks:[...ls[0].tasks,{id:Date.now(),name:node.text,done:false,color:"lilac",url:""}]},...ls.slice(1)]);
      showMsg("📋 Sent to Prioritizer!");
    } else if(target==="goals"&&setGoalsData){
      const due=new Date();due.setDate(due.getDate()+365);
      setGoalsData(gs=>[...gs,{id:Date.now(),horizon:"year1",title:node.text,description:"",dueDate:due.toISOString().slice(0,10),cover:null,links:[],subtasks:[],status:"active",created:Date.now()}]);
      showMsg("🎯 Planted as Goal!");
    } else if(target==="vault"&&ideasData){
      setIdeasData(ds=>[{id:Date.now(),title:node.text,content:"From Mind Map: "+map.name,type:"note",created:Date.now()},...ds]);
      showMsg("📚 Saved to The Vault!");
    }
  };


  return (
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",display:"flex",flexDirection:"column"}}>
      {/* Back button */}
      <div style={{position:"absolute",top:0,left:0,zIndex:50,padding:"16px"}}>
        <button onClick={onBack} style={{width:44,height:44,borderRadius:"50%",background:"rgba(248,245,236,0.88)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.15)",backdropFilter:"blur(8px)"}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* ── DRAG-TO-SEND ZONES — appear when dragging a node ── */}
      {dragging&&nodes.find(n=>n.id===dragging)?.parent!==null&&(
        <div style={{position:"absolute",top:0,left:0,right:0,zIndex:40,display:"flex",justifyContent:"center",gap:8,padding:"10px 12px",pointerEvents:"none"}}>
          {[
            {id:"prioritizer",label:"📋 Prioritizer",icon:"📋"},
            {id:"goals",label:"🎯 Goals",icon:"🎯"},
            {id:"vault",label:"📚 Vault",icon:"📚"},
          ].map(zone=>(
            <div key={zone.id}
              onMouseEnter={()=>setDragSendTarget(zone.id)}
              onMouseLeave={()=>setDragSendTarget(null)}
              style={{
                pointerEvents:"auto",
                background:dragSendTarget===zone.id?"#5A7848":"rgba(248,245,236,0.88)",
                color:dragSendTarget===zone.id?"#fff":"#3A3020",
                borderRadius:100,
                padding:"8px 14px",
                fontSize:12,fontWeight:700,
                border:"1.5px solid rgba(90,120,72,0.3)",
                backdropFilter:"blur(8px)",
                boxShadow:"0 2px 12px rgba(0,0,0,0.12)",
                transition:"all 0.15s",
                cursor:"copy",
                whiteSpace:"nowrap",
              }}>{zone.label}</div>
          ))}
        </div>
      )}

      {/* Canvas */}
      <div style={{flex:1,overflow:"hidden",position:"relative"}}>
        <svg ref={svgRef} width="100%" height="100%"
          style={{position:"absolute",inset:0,touchAction:"none"}}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp}
          onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
          onDoubleClick={onDblClick}>

          <defs>
            <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7A9068"/><stop offset="100%" stopColor="#5A7848"/>
            </linearGradient>
            <linearGradient id="rootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8A9E78"/><stop offset="100%" stopColor="#607850"/>
            </linearGradient>
            <linearGradient id="leafG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A8D070"/><stop offset="100%" stopColor="#5A8830"/>
            </linearGradient>
            <filter id="nodeSh" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1A2E08" floodOpacity="0.16"/>
            </filter>
            <style>{`
              @keyframes mmAIpop{from{opacity:0;transform:scale(0.6)}to{opacity:1;transform:scale(1)}}
              @keyframes mmPulse{0%,100%{opacity:0.6}50%{opacity:1}}
              .mmAI{animation:mmAIpop 0.4s ease forwards}
              .mmPulse{animation:mmPulse 1.5s ease-in-out infinite}
            `}</style>
          </defs>

          <rect width="100%" height="100%" fill="transparent"/>

          <g transform={`translate(${pan.x},${pan.y})`}>
            {/* Edges with vine-style S-curves and leaf accents */}
            {nodes.filter(n=>n.parent).map(n=>{
              const p=nodes.find(x=>x.id===n.parent);
              if(!p)return null;
              const isSel=n.id===selected||p.id===selected;
              const d=edgePath(p,n);
              const mx=(p.x+(p.parent===null?55:45)+n.x-48)/2;
              const my=(p.y+n.y)/2;
              return(
                <g key={`e${n.id}`}>
                  <path d={d} fill="none" stroke={n.color||"#7A9068"} strokeWidth={isSel?2.5:1.8} strokeLinecap="round" opacity={isSel?0.9:0.6}/>
                  {/* Small leaf on branch midpoint */}
                  <g transform={`translate(${mx},${my})`}>
                    <ellipse cx="0" cy="-6" rx="4" ry="7" fill={n.color||"url(#leafG)"} opacity="0.7" transform="rotate(-20)"/>
                    <line x1="0" y1="-1" x2="0" y2="-11" stroke="#2A5010" strokeWidth="0.5" opacity="0.4"/>
                  </g>
                </g>
              );
            })}

            {/* Root node */}
            {root&&(()=>{
              const isSel=root.id===selected;
              const W=root.text.length>14?160:140,H=46;
              return(
                <g key={root.id} style={{cursor:"pointer"}}
                  onClick={()=>{if(selected===root.id){spawnChild(root.id);}else setSelected(root.id);}}
                  onDoubleClick={()=>{setEditingId(root.id);setEditText(root.text);}}>
                  <rect x={root.x-W/2+2} y={root.y-H/2+3} width={W} height={H} rx={H/2} fill="rgba(0,0,0,0.12)" filter="url(#nodeSh)"/>
                  <rect x={root.x-W/2} y={root.y-H/2} width={W} height={H} rx={H/2}
                    fill="url(#rootGrad)" stroke={isSel?"rgba(255,255,255,0.8)":"rgba(255,255,255,0.25)"} strokeWidth={isSel?2.5:1.5}/>
                  <text x={root.x} y={root.y} textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize={root.text.length>16?12:14} fontWeight={700}
                    style={{pointerEvents:"none",userSelect:"none"}}>
                    {root.text.length>18?root.text.slice(0,17)+"…":root.text}
                  </text>
                  {/* Leaf accent on root */}
                  <g transform={`translate(${root.x},${root.y-H/2-10})`}>
                    <ellipse cx="0" cy="-5" rx="3" ry="6" fill="url(#leafG)" opacity="0.85" transform="rotate(-10)"/>
                    <ellipse cx="5" cy="-3" rx="2.5" ry="4.5" fill="url(#leafG)" opacity="0.7" transform="rotate(20)"/>
                  </g>
                </g>
              );
            })()}

            {/* Branch nodes — colour-coded with leaf icons */}
            {nodes.filter(n=>n.parent!==null).map(n=>{
              const isSel=n.id===selected;
              const W=n.text.length>12?148:118,H=38;
              const nodeColor=n.color||"#5A7848";
              const isAI=n.aiGenerated;
              return(
                <g key={n.id} style={{cursor:"pointer"}}
                  onClick={()=>{if(selected===n.id){spawnChild(n.id);}else setSelected(n.id);}}
                  onDoubleClick={()=>{setEditingId(n.id);setEditText(n.text);}}
                  onContextMenu={e=>{e.preventDefault();setDeleteConfirmId(n.id);}}
                  onMouseDown={e=>{if(e.button===0){setDragging(n.id);setDragMoved(false);const pos=getPos(e);setDragOffset({x:pos.x-n.x,y:pos.y-n.y});}}}
                  onMouseUp={()=>handleDragNodeEnd(null,n.id)}>
                  <rect x={n.x-W/2+1} y={n.y-H/2+2} width={W} height={H} rx={H/2} fill="rgba(0,0,0,0.10)" filter="url(#nodeSh)"/>
                  <rect x={n.x-W/2} y={n.y-H/2} width={W} height={H} rx={H/2}
                    fill={isSel?nodeColor:"rgba(248,245,236,0.90)"}
                    stroke={isSel?"rgba(255,255,255,0.7)":nodeColor}
                    strokeWidth={1.6}/>
                  {/* Leaf icon left */}
                  <text x={n.x-W/2+12} y={n.y} textAnchor="middle" dominantBaseline="middle"
                    fontSize={10} style={{pointerEvents:"none",userSelect:"none"}}>🌿</text>
                  {/* Node text */}
                  <text x={n.x+6} y={n.y} textAnchor="middle" dominantBaseline="middle"
                    fill={isSel?"white":"#1A2E10"} fontSize={12} fontWeight={600}
                    style={{pointerEvents:"none",userSelect:"none"}}>
                    {n.text.length>15?n.text.slice(0,14)+"…":n.text}
                  </text>
                  {/* Voice note indicator */}
                  {n.voiceNote&&<circle cx={n.x+W/2-10} cy={n.y-H/2+6} r={5} fill="#7A4A38" opacity="0.85"/>}
                  {/* AI-generated sparkle */}
                  {isAI&&<text x={n.x+W/2-10} y={n.y+H/2-5} textAnchor="middle" fontSize={8} className="mmPulse">✨</text>}
                </g>
              );
            })}

            {/* AI Grow button — appears when branch node selected */}
            {selected&&nodes.find(n=>n.id===selected)?.parent!==null&&!aiGrowing&&(()=>{
              const sn=nodes.find(n=>n.id===selected);
              return(
                <g className="mmAI" onClick={()=>growBranch(selected)} style={{cursor:"pointer"}}
                  transform={`translate(${sn.x+70},${sn.y-28})`}>
                  <rect x="-32" y="-13" width="64" height="26" rx="13"
                    fill="#5A7848" filter="url(#nodeSh)"/>
                  <text x="0" y="0" textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize={10} fontWeight={700} style={{pointerEvents:"none"}}>🌿 Grow</text>
                </g>
              );
            })()}
            {aiGrowing&&<text x={root?.x||195} y={(root?.y||422)-80} textAnchor="middle" fill="#5A7848" fontSize={13} fontWeight={600} className="mmPulse">🌿 Growing branch…</text>}

            {/* Voice note button — when branch selected */}
            {selected&&nodes.find(n=>n.id===selected)?.parent!==null&&(()=>{
              const sn=nodes.find(n=>n.id===selected);
              const isRec=voiceRecording===selected;
              return(
                <g onClick={()=>isRec?stopVoice():startVoice(selected)} style={{cursor:"pointer"}}
                  transform={`translate(${sn.x+70},${sn.y+14})`}>
                  <rect x="-30" y="-12" width="60" height="24" rx="12"
                    fill={isRec?"#7A4A38":"rgba(248,245,236,0.92)"}
                    stroke={isRec?"#7A4A38":"rgba(90,120,72,0.3)"} strokeWidth="1.5" filter="url(#nodeSh)"/>
                  <text x="0" y="0" textAnchor="middle" dominantBaseline="middle"
                    fill={isRec?"white":"#3A3020"} fontSize={9} fontWeight={700} style={{pointerEvents:"none"}}>
                    {isRec?"⏹ Stop":"🎙 Voice"}
                  </text>
                </g>
              );
            })()}
          </g>
        </svg>

        {nodes.length===1&&!selected&&(
          <div style={{position:"absolute",top:"58%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",color:"rgba(90,80,60,0.55)",fontSize:14,pointerEvents:"none",fontFamily:"Georgia,serif",lineHeight:1.6}}>
            Tap the central node<br/>to add your first branch 🌿
          </div>
        )}
      </div>

      {/* ── BOTTOM TOOLBAR ── */}
      <div style={{padding:"10px 10px 24px",display:"flex",gap:7,alignItems:"center",background:"rgba(240,236,224,0.92)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderTop:"1px solid rgba(255,255,255,0.6)",boxShadow:"0 -2px 16px rgba(0,0,0,0.06)",overflowX:"auto",scrollbarWidth:"none",flexShrink:0}}>
        {/* Add Node */}
        <button onClick={()=>{if(selected)spawnChild(selected);else if(root)spawnChild(root.id);}} style={{background:"#5A7848",color:"white",border:"none",borderRadius:100,padding:"11px 16px",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap",flexShrink:0,boxShadow:"0 2px 10px rgba(58,80,38,0.28)"}}>
          <svg width="12" height="12" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/></svg>
          Add Node
        </button>
        {/* AI Grow */}
        <button onClick={()=>selected&&growBranch(selected)} disabled={aiGrowing||!selected}
          style={{background:selected?"rgba(90,120,72,0.12)":"rgba(90,80,60,0.06)",color:selected?"#3A6020":"#9A9080",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"11px 14px",fontSize:13,fontWeight:600,cursor:selected?"pointer":"default",whiteSpace:"nowrap",flexShrink:0,opacity:aiGrowing?0.6:1}}>
          🌿 Grow Branch
        </button>
        {/* Colors */}
        <button onClick={()=>{if(selected){const n=nodes.find(x=>x.id===selected);if(!n)return;const idx=BRANCH_PALETTE.findIndex(p=>p.color===n.color);const next=BRANCH_PALETTE[(idx+1)%BRANCH_PALETTE.length];setNodes(ns=>ns.map(x=>x.id===selected?{...x,color:next.color,lightColor:next.color+"33"}:x));showMsg(`${next.label}`);} }}
          style={{background:"rgba(248,245,236,0.9)",color:"#3A3020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"11px 14px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
          🎨 Color
        </button>
        {/* Export */}
        <button style={{background:"rgba(248,245,236,0.9)",color:"#3A3020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"11px 14px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
          Export
        </button>
        {/* Podcast Recap */}
        <button onClick={()=>{setPodcastModal(true);setPodcastText("");setPodcastSaved(false);}}
          style={{background:"rgba(90,120,72,0.12)",color:"#3A5020",border:"1.5px solid rgba(90,120,72,0.3)",borderRadius:100,padding:"11px 14px",fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
          🎙 Podcast
        </button>
        {/* Templates */}
        <button onClick={()=>setTemplateModal(true)}
          style={{background:"rgba(90,120,72,0.10)",color:"#3A5020",border:"1.5px solid rgba(90,120,72,0.22)",borderRadius:100,padding:"11px 14px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
          🏗️ Templates
        </button>
        {/* AI Gap Check */}
        <button onClick={checkGaps}
          style={{background:"rgba(90,120,72,0.10)",color:"#3A5020",border:"1.5px solid rgba(90,120,72,0.22)",borderRadius:100,padding:"11px 14px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
          🔍 Check Gaps
        </button>
        {/* Merge Maps */}
        <button onClick={()=>setMergeModal(true)}
          style={{background:"rgba(90,120,72,0.10)",color:"#3A5020",border:"1.5px solid rgba(90,120,72,0.22)",borderRadius:100,padding:"11px 14px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
          🔗 Merge
        </button>
        {/* Link to Goal */}
        <button onClick={()=>setGoalLinkModal(true)}
          style={{background:linkedGoalId?"rgba(90,160,80,0.15)":"rgba(90,120,72,0.10)",color:linkedGoalId?"#2A6020":"#3A5020",border:`1.5px solid ${linkedGoalId?"rgba(90,160,80,0.4)":"rgba(90,120,72,0.22)"}`,borderRadius:100,padding:"11px 14px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
          {linkedGoalId?"🌱 Goal Linked":"🌱 Link Goal"}
        </button>
        {/* Selective high-priority send to Prioritizer */}
        <button onClick={openPriSelect}
          style={{background:"rgba(90,120,72,0.12)",color:"#3A5020",border:"1.5px solid rgba(90,120,72,0.28)",borderRadius:100,padding:"11px 14px",fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
          📋 → Prioritizer
        </button>
      </div>

      {/* ── GAP CHECK MODAL ── */}
      {gapModal&&(
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setGapModal(false)}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"75vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.18)"}}/></div>
            <div style={{padding:"0 20px 12px",flexShrink:0}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:19,marginBottom:2}}>🔍 Gap Check</div>
              <div style={{color:"#8A8070",fontSize:13}}>Gentle prompts from your thinking partner</div>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
              {gapLoading&&<div style={{textAlign:"center",padding:"32px 0",color:"#5A7848",fontFamily:"Georgia,serif",fontSize:14}}>🌿 Thinking about your map…</div>}
              {gaps.map((g,i)=>(
                <div key={i} style={{background:"rgba(90,120,72,0.06)",borderRadius:20,padding:"14px 18px",marginBottom:10,border:"1px solid rgba(90,120,72,0.12)"}}>
                  <div style={{fontFamily:"Georgia,serif",fontSize:14,color:"#1A2810",lineHeight:1.7,fontStyle:"italic"}}>"{g}"</div>
                  <button onClick={()=>{
                    if(!root)return;
                    setNodes(ns=>[...ns,{id:Date.now(),text:"? "+g.slice(0,30),x:root.x+Math.random()*200-100,y:root.y+200+i*60,parent:root.id,color:BRANCH_PALETTE[i%BRANCH_PALETTE.length].color}]);
                    setGapModal(false);showMsg("Branch added from gap!");
                  }} style={{marginTop:8,background:"rgba(90,120,72,0.12)",color:"#3A6020",border:"none",borderRadius:100,padding:"6px 14px",fontSize:11,fontWeight:600,cursor:"pointer"}}>
                    + Add as branch
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MERGE MAPS MODAL ── */}
      {mergeModal&&(
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setMergeModal(false)}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"75vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.18)"}}/></div>
            <div style={{padding:"0 20px 12px",flexShrink:0}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:19,marginBottom:2}}>🔗 Merge Maps</div>
              <div style={{color:"#8A8070",fontSize:13}}>Choose a map to merge into "{root?.text}"</div>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
              {(mapData||[]).filter(m=>m.id!==map.id).map(m=>(
                <div key={m.id} style={{background:"rgba(248,245,236,0.90)",borderRadius:18,padding:"14px 16px",marginBottom:10,border:"1px solid rgba(255,255,255,0.9)",display:"flex",alignItems:"center",gap:12,boxShadow:"0 1px 8px rgba(0,0,0,0.04)"}}>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,color:"#1A1A10"}}>{m.name}</div>
                    <div style={{fontSize:11,color:"#8A8070",marginTop:2}}>{(m.nodes||[]).length-1} branches</div>
                  </div>
                  <button onClick={()=>mergeMaps(m)} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer",boxShadow:"0 2px 8px rgba(58,80,38,0.25)"}}>
                    Merge in →
                  </button>
                </div>
              ))}
              {(mapData||[]).filter(m=>m.id!==map.id).length===0&&(
                <div style={{textAlign:"center",color:"#8A8070",fontFamily:"Georgia,serif",fontSize:14,padding:"32px 0"}}>Create another map first 🌿</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── LINK TO GOAL MODAL ── */}
      {goalLinkModal&&(
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setGoalLinkModal(false)}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"75vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,120,72,0.25)"}}/></div>
            <div style={{padding:"0 20px 12px",flexShrink:0}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:19,marginBottom:2}}>🌱 Link to Goal</div>
              <div style={{color:"#8A8070",fontSize:13}}>Map progress will grow the goal's garden plant</div>
              {linkedGoalId&&<div style={{marginTop:8,display:"flex",gap:8}}>
                <button onClick={()=>{setLinkedGoalId(null);onUpdate({...map,linkedGoalId:null});setGoalLinkModal(false);showMsg("Goal unlinked");}} style={{background:"rgba(192,57,43,0.08)",color:"#c0392b",border:"1.5px solid rgba(192,57,43,0.2)",borderRadius:100,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Unlink current goal</button>
                <button onClick={syncGoalProgress} style={{background:"rgba(90,120,72,0.12)",color:"#3A6020",border:"1.5px solid rgba(90,120,72,0.25)",borderRadius:100,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>🌱 Sync now</button>
              </div>}
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
              {(goalsData||[]).filter(g=>g.status!=="done").map(g=>{
                const pct=g.subtasks.length>0?Math.round((g.subtasks.filter(s=>s.done).length/g.subtasks.length)*100):0;
                const isLinked=g.id===linkedGoalId;
                return(
                  <div key={g.id} onClick={()=>{
                    setLinkedGoalId(g.id);
                    onUpdate({...map,linkedGoalId:g.id});
                    setGoalLinkModal(false);
                    showMsg(`🌱 Linked to "${g.title}" — map progress syncs garden!`);
                  }} style={{background:isLinked?"rgba(90,160,80,0.10)":"rgba(248,245,236,0.90)",borderRadius:18,padding:"13px 16px",marginBottom:10,border:`1.5px solid ${isLinked?"rgba(90,160,80,0.4)":"rgba(255,255,255,0.9)"}`,cursor:"pointer",display:"flex",alignItems:"center",gap:12,boxShadow:"0 1px 8px rgba(0,0,0,0.04)"}}>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,color:"#1A1A10"}}>{g.title||"(untitled)"}</div>
                      <div style={{fontSize:11,color:"#8A8070",marginTop:2}}>{g.horizon} · {pct}% complete</div>
                    </div>
                    {isLinked&&<span style={{color:"#3A8020",fontSize:18}}>✓</span>}
                  </div>
                );
              })}
              {(goalsData||[]).filter(g=>g.status!=="done").length===0&&(
                <div style={{textAlign:"center",color:"#8A8070",fontFamily:"Georgia,serif",fontSize:14,padding:"32px 0"}}>Add goals first 🌱</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── SELECTIVE PRIORITIZER MOVE MODAL ── */}
      {priSelectModal&&(
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setPriSelectModal(false)}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"82vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.18)"}}/></div>
            <div style={{padding:"0 20px 12px",flexShrink:0}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:19,marginBottom:2}}>📋 Choose Nodes to Move</div>
              <div style={{color:"#8A8070",fontSize:13}}>Select which branches to send to Prioritizer</div>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
              {branchNodes.map(n=>{
                const isSel=priSelected.has(n.id);
                return(
                  <div key={n.id} onClick={()=>setPriSelected(s=>{const ns=new Set(s);ns.has(n.id)?ns.delete(n.id):ns.add(n.id);return ns;})}
                    style={{background:isSel?"rgba(90,120,72,0.12)":"rgba(248,245,236,0.90)",borderRadius:18,padding:"12px 16px",marginBottom:8,border:`1.5px solid ${isSel?"rgba(90,120,72,0.4)":"rgba(255,255,255,0.9)"}`,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${isSel?"#5A7848":"rgba(90,80,60,0.25)"}`,background:isSel?"#5A7848":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {isSel&&<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"Georgia,serif",fontWeight:600,fontSize:14,color:"#1A1A10"}}>{n.text}</div>
                      <div style={{fontSize:11,color:"#8A8070"}}>from: {nodes.find(p=>p.id===n.parent)?.text||root?.text}</div>
                    </div>
                    <div style={{width:12,height:12,borderRadius:"50%",background:n.color||"#5A7848",flexShrink:0}}/>
                  </div>
                );
              })}
            </div>
            {/* Select all / none + confirm */}
            <div style={{padding:"12px 20px 0",flexShrink:0}}>
              <div style={{display:"flex",gap:8,marginBottom:10}}>
                <button onClick={()=>setPriSelected(new Set(branchNodes.map(n=>n.id)))} style={{flex:1,background:"rgba(90,80,60,0.08)",color:"#5A5040",border:"none",borderRadius:100,padding:"9px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Select all</button>
                <button onClick={()=>setPriSelected(new Set())} style={{flex:1,background:"rgba(90,80,60,0.08)",color:"#5A5040",border:"none",borderRadius:100,padding:"9px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Clear</button>
              </div>
              {priData.length>0&&priSelected.size>0&&(
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {priData.map(l=>(
                    <button key={l.id} onClick={()=>confirmPriMove(l.id)} style={{flex:1,background:"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"13px 12px",fontSize:13,fontWeight:700,cursor:"pointer",boxShadow:"0 3px 12px rgba(58,80,38,0.28)"}}>
                      Move {priSelected.size} → {l.name}
                    </button>
                  ))}
                </div>
              )}
              {!priSelected.size&&<div style={{textAlign:"center",color:"#8A8070",fontSize:13,padding:"8px 0"}}>Select nodes above to move them</div>}
            </div>
          </div>
        </div>
      )}

      {/* ── TEMPLATE MODAL ── */}
      {templateModal&&(
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setTemplateModal(false)}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.16)",maxHeight:"80vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.18)"}}/></div>
            <div style={{padding:"0 20px 12px",flexShrink:0}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:19,marginBottom:2}}>🏗️ Branch Templates</div>
              <div style={{color:"#8A8070",fontSize:13}}>Start fast with a pre-built structure</div>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"0 14px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {BRANCH_TEMPLATES.map(t=>(
                  <button key={t.id} onClick={()=>applyTemplate(t)}
                    style={{background:"rgba(248,245,236,0.90)",border:"1.5px solid rgba(90,120,72,0.15)",borderRadius:20,padding:"16px 14px",cursor:"pointer",textAlign:"left",transition:"all 0.15s",boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(90,120,72,0.10)";e.currentTarget.style.borderColor="rgba(90,120,72,0.35)";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(248,245,236,0.90)";e.currentTarget.style.borderColor="rgba(90,120,72,0.15)";}}>
                    <div style={{fontSize:24,marginBottom:6}}>{t.icon}</div>
                    <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,color:"#1A1A10",marginBottom:3}}>{t.name}</div>
                    <div style={{fontSize:11,color:"#8A8070",lineHeight:1.45,marginBottom:8}}>{t.desc}</div>
                    <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                      {t.branches.slice(0,4).map((b,i)=>(
                        <span key={i} style={{background:"rgba(90,120,72,0.10)",color:"#3A6020",borderRadius:100,padding:"2px 7px",fontSize:9,fontWeight:600}}>{b}</span>
                      ))}
                      {t.branches.length>4&&<span style={{fontSize:9,color:"#8A8070",padding:"2px 4px"}}>+{t.branches.length-4}</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PODCAST RECAP MODAL ── */}
      {podcastModal&&(
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.6)",display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(8px)"}} onClick={()=>setPodcastModal(false)}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",maxWidth:480,boxShadow:"0 -8px 48px rgba(0,0,0,0.16)",maxHeight:"85vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.2)"}}/></div>
            <div style={{padding:"0 20px 12px",flexShrink:0}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:20,marginBottom:4}}>🎙 Podcast Recap</div>
              <div style={{color:"#8A8070",fontSize:13,marginBottom:14}}>Turn <strong>"{root?.text}"</strong> into a spoken recap</div>
              {/* Length selector */}
              <div style={{display:"flex",gap:8,marginBottom:14}}>
                {[{k:"short",label:"Short",desc:"~60 sec"},{k:"detailed",label:"Detailed",desc:"~3 min"}].map(opt=>(
                  <button key={opt.k} onClick={()=>setPodcastLength(opt.k)} style={{flex:1,padding:"12px",borderRadius:18,border:`2px solid ${podcastLength===opt.k?"#5A7848":"rgba(90,80,60,0.15)"}`,background:podcastLength===opt.k?"rgba(90,120,72,0.10)":"rgba(255,255,255,0.8)",cursor:"pointer",textAlign:"center"}}>
                    <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,color:podcastLength===opt.k?"#3A6020":"#1A1A10"}}>{opt.label}</div>
                    <div style={{fontSize:11,color:"#8A8070",marginTop:2}}>{opt.desc}</div>
                  </button>
                ))}
              </div>
              {!podcastText&&(
                <button onClick={generatePodcast} disabled={podcastGenerating} style={{width:"100%",padding:"15px",background:"linear-gradient(135deg,#3E6828,#5E9040)",color:"#fff",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,cursor:"pointer",boxShadow:"0 4px 16px rgba(58,100,30,0.30)",opacity:podcastGenerating?0.7:1}}>
                  {podcastGenerating?"🌿 Generating…":"🎙 Generate Script"}
                </button>
              )}
            </div>
            {/* Script output */}
            {podcastText&&(
              <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
                <div style={{background:"rgba(90,120,72,0.06)",borderRadius:20,padding:"16px 18px",border:"1px solid rgba(90,120,72,0.15)",marginBottom:12}}>
                  <div style={{fontFamily:"Georgia,serif",fontSize:13,color:"#2A3820",lineHeight:1.75}}>{podcastText}</div>
                </div>
                <div style={{display:"flex",gap:10,marginBottom:8}}>
                  <button onClick={savePodcastToVault} disabled={podcastSaved} style={{flex:1,padding:"14px",background:podcastSaved?"rgba(90,120,72,0.15)":"#5A7848",color:podcastSaved?"#5A7848":"#fff",border:podcastSaved?"1.5px solid rgba(90,120,72,0.3)":"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:podcastSaved?"default":"pointer",boxShadow:podcastSaved?"none":"0 3px 12px rgba(58,80,38,0.28)"}}>
                    {podcastSaved?"✅ Saved to Vault":"💾 Save to The Vault"}
                  </button>
                  <button onClick={()=>{setPodcastText("");setPodcastSaved(false);}} style={{padding:"14px 18px",background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,fontWeight:600,fontSize:14,cursor:"pointer"}}>
                    Redo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirmId&&(()=>{
        const delNode=nodes.find(n=>n.id===deleteConfirmId);
        if(!delNode)return null;
        return(
          <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,backdropFilter:"blur(6px)"}}>
            <div style={{background:"rgba(250,248,240,0.98)",borderRadius:24,padding:"24px 20px",width:"100%",maxWidth:340,textAlign:"center",boxShadow:"0 8px 40px rgba(0,0,0,0.14)"}}>
              <div style={{fontSize:32,marginBottom:10}}>🗑</div>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:17,marginBottom:8}}>Delete this node?</div>
              <div style={{color:"#8A8070",fontSize:13,marginBottom:20,lineHeight:1.5}}>"{delNode.text}" and all its children will be removed.</div>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setDeleteConfirmId(null)} style={{flex:1,background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,padding:"13px",fontWeight:600,fontSize:14,cursor:"pointer"}}>Keep</button>
                <button onClick={()=>{const toDelete=new Set();const collect=(id)=>{toDelete.add(id);nodes.filter(n=>n.parent===id).forEach(n=>collect(n.id));};collect(deleteConfirmId);setNodes(ns=>ns.filter(n=>!toDelete.has(n.id)));setDeleteConfirmId(null);}} style={{flex:1,background:"rgba(192,57,43,0.85)",color:"#fff",border:"none",borderRadius:100,padding:"13px",fontWeight:700,fontSize:14,cursor:"pointer"}}>Delete</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Node edit panel */}
      {editingId&&(()=>{
        const node=nodes.find(n=>n.id===editingId);
        if(!node)return null;
        const patchNode=ch=>setNodes(ns=>ns.map(n=>n.id===editingId?{...n,...ch}:n));
        const links=node.links||[];
        const addLink=()=>patchNode({links:[...links,{id:Date.now(),label:"",url:""}]});
        const patchLink=(id,ch)=>patchNode({links:links.map(l=>l.id===id?{...l,...ch}:l)});
        const delLink=id=>patchNode({links:links.filter(l=>l.id!==id)});
        const images=node.images||[];
        const handleImg=(e)=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>patchNode({images:[...images,{id:Date.now(),src:ev.target.result}]});r.readAsDataURL(file);};
        const delImg=id=>patchNode({images:images.filter(img=>img.id!==id)});
        return(
          <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(30,40,20,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(6px)"}} onClick={commitEdit}>
            <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",maxWidth:480,boxShadow:"0 -8px 40px rgba(0,0,0,0.14)",maxHeight:"75vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"center",padding:"14px 0 6px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.18)"}}/></div>
              <div style={{padding:"0 18px",overflowY:"auto",flex:1}}>
                <input value={editText} onChange={e=>setEditText(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter")commitEdit();}}
                  style={{width:"100%",boxSizing:"border-box",fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,color:"#1A1A10",border:"none",outline:"none",background:"transparent",marginBottom:14,padding:"4px 0"}}
                  autoFocus/>
                {/* Colour picker row */}
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
                  {BRANCH_PALETTE.map(bp=>(
                    <button key={bp.color} onClick={()=>patchNode({color:bp.color,lightColor:bp.color+"33"})}
                      style={{width:28,height:28,borderRadius:"50%",background:bp.color,border:node.color===bp.color?"3px solid #1A1A10":"2px solid rgba(0,0,0,0.1)",cursor:"pointer",padding:0,transition:"transform 0.1s"}}
                      title={bp.label}/>
                  ))}
                </div>
                {/* Attach image */}
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:12,fontWeight:600,color:"#5A7848",marginBottom:6,textTransform:"uppercase",letterSpacing:0.5}}>📎 Attachments</div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {images.map(img=>(
                      <div key={img.id} style={{position:"relative"}}>
                        <img src={img.src} alt="" style={{width:56,height:56,borderRadius:10,objectFit:"cover",border:"1.5px solid rgba(90,120,72,0.2)"}}/>
                        <button onClick={()=>delImg(img.id)} style={{position:"absolute",top:-5,right:-5,background:"rgba(192,57,43,0.85)",color:"#fff",border:"none",borderRadius:"50%",width:18,height:18,cursor:"pointer",fontSize:10,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                      </div>
                    ))}
                    <label style={{width:56,height:56,borderRadius:10,border:"2px dashed rgba(90,120,72,0.3)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#5A7848",fontSize:22}}>
                      +<input type="file" accept="image/*" style={{display:"none"}} onChange={handleImg}/>
                    </label>
                  </div>
                </div>
                {/* Voice note */}
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:12,fontWeight:600,color:"#5A7848",marginBottom:6,textTransform:"uppercase",letterSpacing:0.5}}>🎙 Voice Note</div>
                  {node.voiceNote?(
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <audio controls src={node.voiceNote} style={{flex:1,height:32}}/>
                      <button onClick={()=>patchNode({voiceNote:null})} style={{background:"rgba(192,57,43,0.1)",color:"#c0392b",border:"none",borderRadius:8,padding:"6px 10px",cursor:"pointer",fontSize:12}}>🗑</button>
                    </div>
                  ):(
                    <button onClick={()=>{commitEdit();startVoice(editingId);}} style={{background:"rgba(90,120,72,0.10)",color:"#3A6020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"9px 16px",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                      🎙 Record voice note
                    </button>
                  )}
                </div>
                {/* Links */}
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:600,color:"#5A7848",marginBottom:6,textTransform:"uppercase",letterSpacing:0.5}}>🔗 Links</div>
                  {links.map(l=>(
                    <div key={l.id} style={{display:"flex",gap:6,marginBottom:6}}>
                      <input value={l.label} onChange={e=>patchLink(l.id,{label:e.target.value})} placeholder="Label" style={{width:80,flexShrink:0,padding:"7px 10px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.15)",fontSize:12,outline:"none",background:"rgba(255,255,255,0.8)"}}/>
                      <input value={l.url} onChange={e=>patchLink(l.id,{url:e.target.value})} placeholder="https://…" style={{flex:1,padding:"7px 10px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.15)",fontSize:12,outline:"none",background:"rgba(255,255,255,0.8)",minWidth:0}}/>
                      <button onClick={()=>delLink(l.id)} style={{background:"transparent",color:"#c0392b",border:"none",cursor:"pointer",fontSize:14,flexShrink:0}}>✕</button>
                    </div>
                  ))}
                  <button onClick={addLink} style={{background:"rgba(90,120,72,0.08)",color:"#3A6020",border:"1.5px solid rgba(90,120,72,0.18)",borderRadius:100,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Add link</button>
                </div>
                {/* Send to */}
                <div style={{marginBottom:8}}>
                  <div style={{fontSize:12,fontWeight:600,color:"#5A7848",marginBottom:8,textTransform:"uppercase",letterSpacing:0.5}}>Send to</div>
                  <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                    {priData?.length>0&&<button onClick={()=>{setPriData(ls=>[{...ls[0],tasks:[...ls[0].tasks,{id:Date.now(),name:node.text,done:false,color:"lilac",url:""}]},...ls.slice(1)]);showMsg("📋 Sent to Prioritizer!");commitEdit();}} style={{background:"rgba(90,120,72,0.10)",color:"#3A5020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"8px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>📋 Prioritizer</button>}
                    {setGoalsData&&<button onClick={()=>{const due=new Date();due.setDate(due.getDate()+365);setGoalsData(gs=>[...gs,{id:Date.now(),horizon:"year1",title:node.text,description:"",dueDate:due.toISOString().slice(0,10),cover:null,links:[],subtasks:[],status:"active",created:Date.now()}]);showMsg("🎯 Planted as Goal!");commitEdit();}} style={{background:"rgba(90,120,72,0.10)",color:"#3A5020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"8px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>🎯 Goals</button>}
                    {ideasData&&<button onClick={()=>{setIdeasData(ds=>[{id:Date.now(),title:node.text,content:"From Mind Map: "+map.name,type:"note",created:Date.now()},...ds]);showMsg("📚 Saved to Vault!");commitEdit();}} style={{background:"rgba(90,120,72,0.10)",color:"#3A5020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"8px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>📚 The Vault</button>}
                  </div>
                </div>
                <button onClick={commitEdit} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#3E6828,#5E9040)",color:"#fff",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,cursor:"pointer",boxShadow:"0 4px 14px rgba(58,100,30,0.25)",marginTop:8}}>Done ✓</button>
              </div>
            </div>
          </div>
        );
      })()}

      {sentMsg&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:"rgba(42,56,28,0.92)",color:"#fff",borderRadius:100,padding:"11px 22px",fontWeight:700,fontSize:14,zIndex:500,whiteSpace:"nowrap",backdropFilter:"blur(8px)"}}>{sentMsg}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   NOTES (OneNote-style) + Send To everywhere
═══════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════
   🗄️ FILING CABINET
═══════════════════════════════════════════════════════ */
const DRAWER_COLORS=["#c0392b","#e67e22","#27ae60","#2980b9","#8e44ad","#c2185b","#546e7a","#16a085","#d68910","#1a5276"];
const DRAWER_ICONS=["📁","📂","🗂️","💼","🏠","💰","📊","🔬","🎨","📸","⭐","🔒","🌿","📋","🎓","🪪","📜","🧾","📑","🏦","💳","📃","🗃️","📌","🔑"];

// Premade drawer templates — shown when cabinet is empty
const PREMADE_DRAWERS=[
  {name:"💳 Receipts",      icon:"💳", color:"#2A7A3A", subs:["Physical Receipts","Digital Receipts","Warranty Docs","Returns"]},
  {name:"🪪 Identity Docs", icon:"🪪", color:"#2A5A8A", subs:["Passport / ID","Driving Licence","Birth Certificate","NI / Tax"]},
  {name:"🏥 Medical",       icon:"🏥", color:"#8A2A2A", subs:["Test Results","Prescriptions","Referrals","Insurance"]},
  {name:"💰 Bills",         icon:"💰", color:"#7A5A20", subs:["Energy","Broadband","Council Tax","Subscriptions"]},
  {name:"📋 Contracts",     icon:"📋", color:"#3A3A7A", subs:["Tenancy","Employment","Insurance","Finance"]},
  {name:"🎓 Education",     icon:"🎓", color:"#2A6A5A", subs:["Certificates","Transcripts","Courses","References"]},
];

function mkDrawer(name,color,icon){return{id:Date.now()+Math.random(),name,color,icon,subCats:[]};}
function mkSubCat(name){return{id:Date.now()+Math.random(),name,files:[]};}
function mkFile(name,type,data){return{id:Date.now()+Math.random(),name,type,data,added:Date.now()};}

function FilingCabinet({cabinetData,setCabinetData,onBack,onHome}){
  const [view,setView]=useState("cabinet");
  const [activeDrawerId,setActiveDrawerId]=useState(null);
  const [activeSubId,setActiveSubId]=useState(null);
  const [previewFile,setPreviewFile]=useState(null);
  const [addingDrawer,setAddingDrawer]=useState(false);
  const [addingSub,setAddingSub]=useState(false);
  const [renamingDrawerId,setRenamingDrawerId]=useState(null);
  const [renameDraft,setRenameDraft]=useState("");
  const [draft,setDraft]=useState({name:"",color:DRAWER_COLORS[0],icon:"📁"});
  const [draftSub,setDraftSub]=useState("");
  const [toast,setToast]=useState("");
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2200);};

  const drawers=cabinetData||[];
  const upd=fn=>setCabinetData(d=>fn(d||[]));
  const drawer=drawers.find(d=>d.id===activeDrawerId);
  const sub=drawer?.subCats.find(s=>s.id===activeSubId);
  const fmtDate=ts=>new Date(ts).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});

  // Load premade drawers
  const loadPremade=()=>{
    const now=Date.now();
    const newDrawers=PREMADE_DRAWERS.map((pd,i)=>({
      id:now+i,name:pd.name,color:pd.color,icon:pd.icon,
      subCats:pd.subs.map((s,j)=>({id:now+i*100+j,name:s,files:[]}))
    }));
    upd(()=>newDrawers);
    showToast("📁 Premade drawers loaded!");
  };

  const addDrawer=()=>{
    if(!draft.name.trim())return;
    upd(ds=>[...ds,mkDrawer(draft.name.trim(),draft.color,draft.icon)]);
    setDraft({name:"",color:DRAWER_COLORS[0],icon:"📁"});setAddingDrawer(false);
    showToast("🗄️ Drawer added!");
  };
  const delDrawer=id=>upd(ds=>ds.filter(d=>d.id!==id));
  const renameDrawer=(id,newName)=>{upd(ds=>ds.map(d=>d.id===id?{...d,name:newName}:d));setRenamingDrawerId(null);};
  const addSub=()=>{
    if(!draftSub.trim())return;
    upd(ds=>ds.map(d=>d.id===activeDrawerId?{...d,subCats:[...d.subCats,mkSubCat(draftSub.trim())]}:d));
    setDraftSub("");setAddingSub(false);
  };
  const delSub=id=>upd(ds=>ds.map(d=>d.id===activeDrawerId?{...d,subCats:d.subCats.filter(s=>s.id!==id)}:d));

  const handleUpload=e=>{
    if(!sub||!drawer)return;
    const file=e.target.files[0];if(!file)return;
    const isPDF=file.type==="application/pdf";
    const isImg=file.type.startsWith("image/");
    if(!isPDF&&!isImg){showToast("Images and PDFs only");return;}
    const r=new FileReader();
    r.onload=ev=>{
      const nf=mkFile(file.name,isPDF?"pdf":"image",ev.target.result);
      upd(ds=>ds.map(d=>d.id===activeDrawerId?{...d,subCats:d.subCats.map(s=>s.id===activeSubId?{...s,files:[...s.files,nf]}:s)}:d));
      showToast("✅ File saved!");
    };
    r.readAsDataURL(file);
  };
  const delFile=id=>upd(ds=>ds.map(d=>d.id===activeDrawerId?{...d,subCats:d.subCats.map(s=>s.id===activeSubId?{...s,files:s.files.filter(f=>f.id!==id)}:s)}:d));

  /* ── File preview ── */
  if(previewFile) return(
    <div style={{minHeight:"100vh",background:"#0a0010",fontFamily:"'Segoe UI',sans-serif",display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:"rgba(255,255,255,0.08)",flexShrink:0}}>
        <button onClick={()=>setPreviewFile(null)} style={{background:"rgba(255,255,255,0.15)",color:"#fff",border:"none",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer"}}>←</button>
        <div style={{color:"#fff",fontWeight:700,fontSize:14,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{previewFile.name}</div>
        <button onClick={onHome} style={{background:"rgba(255,255,255,0.15)",color:"#fff",border:"none",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer"}}>🏠</button>
      </div>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        {previewFile.type==="image"
          ?<img src={previewFile.data} alt="" style={{maxWidth:"100%",maxHeight:"80vh",borderRadius:12,objectFit:"contain"}}/>
          :<div style={{textAlign:"center"}}>
            <div style={{fontSize:72,marginBottom:16}}>📄</div>
            <div style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:6}}>{previewFile.name}</div>
            <div style={{color:"rgba(255,255,255,0.45)",fontSize:13,marginBottom:24}}>Added {fmtDate(previewFile.added)}</div>
            <a href={previewFile.data} download={previewFile.name} style={{background:btnGrad,color:"#fff",borderRadius:14,padding:"13px 28px",fontWeight:800,fontSize:14,textDecoration:"none",display:"inline-block",boxShadow:"0 4px 16px rgba(45,10,94,0.4)"}}>
              ⬇️ Download PDF
            </a>
          </div>
        }
      </div>
    </div>
  );

  /* ── Files inside sub-category ── */
  if(sub&&drawer) return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title={sub.name} onBack={()=>setActiveSubId(null)} right={
        <div style={{display:"flex",gap:8}}>
          <button onClick={onHome} style={{background:"rgba(255,255,255,0.18)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>🏠</button>
          <label style={{background:btnGrad,color:"#1A1A10",borderRadius:12,padding:"8px 14px",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            + File
            <input type="file" accept="image/*,application/pdf" style={{display:"none"}} onChange={handleUpload}/>
          </label>
        </div>
      }/>
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.1)",borderRadius:10,padding:"8px 12px",marginBottom:14}}>
          <span style={{fontSize:16}}>{drawer.icon}</span>
          <span style={{color:"#7A7060",fontSize:12,fontWeight:600}}>{drawer.name}</span>
          <span style={{color:"rgba(255,255,255,0.3)"}}>›</span>
          <span style={{color:"#1A1A10",fontWeight:700,fontSize:12}}>{sub.name}</span>
          <span style={{marginLeft:"auto",background:"rgba(255,255,255,0.15)",color:"#1A1A10",borderRadius:20,padding:"1px 8px",fontSize:11,fontWeight:700}}>{sub.files.length} files</span>
        </div>
        {sub.files.length===0?(
          <div style={{textAlign:"center",marginTop:60}}>
            <div style={{fontSize:56,marginBottom:12}}>📂</div>
            <div style={{color:"rgba(255,255,255,0.5)",fontSize:15,marginBottom:6}}>Empty folder</div>
            <div style={{color:"rgba(255,255,255,0.3)",fontSize:13}}>Tap + File to upload images or PDFs</div>
          </div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {sub.files.map(f=>(
              <div key={f.id} style={{background:"rgba(255,255,255,0.92)",borderRadius:14,overflow:"hidden",boxShadow:"0 2px 12px rgba(45,10,94,0.1)",border:`1.5px solid ${C.ll}`}}>
                <div onClick={()=>setPreviewFile(f)} style={{height:100,background:f.type==="image"?"#000":"#f0ebff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",overflow:"hidden"}}>
                  {f.type==="image"
                    ?<img src={f.data} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    :<div style={{textAlign:"center"}}><div style={{fontSize:36}}>📄</div><div style={{fontSize:10,color:C.soft,fontWeight:700,marginTop:4}}>PDF</div></div>}
                </div>
                <div style={{padding:"8px 10px"}}>
                  <div style={{fontWeight:700,fontSize:12,color:C.txt,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:2}}>{f.name}</div>
                  <div style={{fontSize:10,color:C.soft,marginBottom:6}}>{fmtDate(f.added)}</div>
                  <div style={{display:"flex",gap:5}}>
                    <button onClick={()=>setPreviewFile(f)} style={{flex:1,background:C.ll,color:C.mp,border:"none",borderRadius:7,padding:"5px",fontSize:11,fontWeight:700,cursor:"pointer"}}>👁 View</button>
                    <button onClick={()=>delFile(f.id)} style={{background:"#fce4e4",color:"#c0392b",border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:"#1A1A10",borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );

  /* ── Sub-categories inside a drawer ── */
  if(drawer) return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title={`${drawer.icon} ${drawer.name}`} onBack={()=>setActiveDrawerId(null)} right={
        <div style={{display:"flex",gap:8}}>
          <button onClick={onHome} style={{background:"rgba(255,255,255,0.18)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>🏠</button>
          <button onClick={()=>setAddingSub(true)} style={{background:"rgba(255,255,255,0.22)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,width:42,height:42,fontSize:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
        </div>
      }/>
      <div style={{padding:"16px 14px"}}>
        {addingSub&&(
          <GlassCard style={{marginBottom:14}}>
            <div style={{fontWeight:800,color:C.dp,fontSize:14,marginBottom:10}}>New sub-category</div>
            <input autoFocus value={draftSub} onChange={e=>setDraftSub(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addSub()}
              placeholder="e.g. 2024, Contracts, Insurance..."
              style={{width:"100%",boxSizing:"border-box",padding:"10px 13px",borderRadius:10,border:`1.5px solid ${C.lp}`,fontSize:14,fontWeight:600,color:C.txt,outline:"none",marginBottom:10}}/>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button onClick={()=>{setAddingSub(false);setDraftSub("");}} style={{background:"transparent",color:C.soft,border:"none",fontWeight:700,cursor:"pointer"}}>Cancel</button>
              <PurpleBtn onClick={addSub}>Add Folder</PurpleBtn>
            </div>
          </GlassCard>
        )}
        {drawer.subCats.length===0&&!addingSub&&(
          <div style={{textAlign:"center",marginTop:60}}>
            <div style={{fontSize:52,marginBottom:12}}>🗂️</div>
            <div style={{color:"rgba(255,255,255,0.5)",fontSize:15,marginBottom:6}}>No folders yet</div>
            <div style={{color:"rgba(255,255,255,0.3)",fontSize:13}}>Tap + to add sub-categories</div>
          </div>
        )}
        {drawer.subCats.map(s=>{
          const totalFiles=s.files.length;
          return(
            <div key={s.id} onClick={()=>setActiveSubId(s.id)}
              style={{display:"flex",alignItems:"center",gap:12,background:"rgba(255,255,255,0.92)",borderRadius:16,padding:"14px 16px",marginBottom:10,boxShadow:"0 2px 10px rgba(90,80,60,0.08)",border:`1.5px solid ${C.ll}`,cursor:"pointer",transition:"transform 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <div style={{width:42,height:42,borderRadius:10,background:`linear-gradient(135deg,${drawer.color},${C.dp})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>📂</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:15,color:C.txt}}>{s.name}</div>
                <div style={{fontSize:12,color:C.soft,marginTop:2}}>{totalFiles} file{totalFiles!==1?"s":""}</div>
              </div>
              <button onClick={e=>{e.stopPropagation();delSub(s.id);}} style={{background:"#fce4e4",color:"#c0392b",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
              <span style={{color:C.soft,fontSize:18}}>›</span>
            </div>
          );
        })}
      </div>
      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:"#1A1A10",borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );

  /* ── Cabinet home — the drawers ── */
  return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <div style={{background:"rgba(248,245,236,0.92)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",padding:"14px 20px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(90,80,60,0.08)",position:"sticky",top:0,zIndex:50,flexShrink:0}}>
        <button onClick={()=>setScreen&&setScreen("home")} style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        <div style={{flex:1,textAlign:"center",fontFamily:"Georgia,serif",fontWeight:700,fontSize:20,color:"#1A1A10"}}>Rest Space 🌿</div>
        <div style={{width:36}}/>
      </div>
      {/* Rest Space Header */}
      <div style={{background:"rgba(248,245,236,0.92)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",padding:"14px 20px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(90,80,60,0.08)",position:"sticky",top:0,zIndex:50,flexShrink:0}}>
        <button onClick={()=>setScreen&&setScreen("home")} style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{flex:1,textAlign:"center",fontFamily:"Georgia,serif",fontWeight:700,fontSize:20,color:"#1A1A10"}}>Rest Space 🌿</div>
        <div style={{width:36}}/>
      </div>
      {/* Header */}
      <div style={{background:"rgba(248,245,236,0.92)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",padding:"14px 20px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(90,80,60,0.08)",position:"sticky",top:0,zIndex:50}}>
        <button onClick={()=>setScreen&&setScreen("home")} style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{flex:1,textAlign:"center",fontFamily:"Georgia,serif",fontWeight:700,fontSize:20,color:"#1A1A10",letterSpacing:-0.3}}>Rest Space 🌿</div>
        <div style={{width:36}}/>
      </div>
      <Header title="🗄️ Filing Cabinet" onBack={onBack} right={
        <div style={{display:"flex",gap:8}}>
          <button onClick={onHome} style={{background:"rgba(255,255,255,0.18)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>🏠</button>
          <button onClick={()=>setAddingDrawer(true)} style={{background:"rgba(255,255,255,0.22)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,padding:"8px 14px",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>+ Drawer</button>
        </div>
      }/>

      {/* Add drawer form */}
      {addingDrawer&&(
        <div style={{margin:"14px 14px 0"}}>
          <GlassCard>
            <div style={{fontWeight:800,color:C.dp,fontSize:15,marginBottom:12}}>New Drawer</div>
            <input autoFocus value={draft.name} onChange={e=>setDraft(d=>({...d,name:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addDrawer()}
              placeholder="e.g. Finance, Health, Work, Kids..."
              style={{width:"100%",boxSizing:"border-box",padding:"11px 14px",borderRadius:11,border:`1.5px solid ${C.lp}`,fontSize:15,fontWeight:600,color:C.txt,outline:"none",marginBottom:12}}/>
            {/* Icon picker */}
            <div style={{fontSize:12,fontWeight:700,color:C.soft,marginBottom:6}}>Icon</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
              {DRAWER_ICONS.map(ic=>(
                <button key={ic} onClick={()=>setDraft(d=>({...d,icon:ic}))} style={{fontSize:20,width:36,height:36,borderRadius:8,border:`2px solid ${draft.icon===ic?C.pp:C.ll}`,background:draft.icon===ic?C.ll:"transparent",cursor:"pointer"}}>
                  {ic}
                </button>
              ))}
            </div>
            {/* Colour picker */}
            <div style={{fontSize:12,fontWeight:700,color:C.soft,marginBottom:6}}>Colour</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
              {DRAWER_COLORS.map(col=>(
                <button key={col} onClick={()=>setDraft(d=>({...d,color:col}))} style={{width:28,height:28,borderRadius:"50%",background:col,border:draft.color===col?"3px solid white":"2px solid transparent",cursor:"pointer",boxShadow:draft.color===col?"0 0 0 2px "+col:"none"}}/>
              ))}
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button onClick={()=>{setAddingDrawer(false);setDraft({name:"",color:DRAWER_COLORS[0],icon:"📁"});}} style={{background:"transparent",color:C.soft,border:"none",fontWeight:700,cursor:"pointer"}}>Cancel</button>
              <PurpleBtn onClick={addDrawer}>Add Drawer</PurpleBtn>
            </div>
          </GlassCard>
        </div>
      )}

      {/* The cabinet visual */}
      <div style={{padding:"14px 14px"}}>
        {drawers.length===0&&!addingDrawer&&(
          <div style={{textAlign:"center",padding:"32px 0"}}>
            <div style={{fontSize:56,marginBottom:12}}>🗄️</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:18,color:"#1A1A10",fontWeight:700,marginBottom:6}}>Your Filing Cabinet</div>
            <div style={{color:"#8A8070",fontSize:13,marginBottom:24,lineHeight:1.6}}>Store receipts, ID docs, medical records,<br/>bills and any important documents</div>
            {/* Premade drawers grid */}
            <div style={{textAlign:"left",marginBottom:20}}>
              <div style={{fontSize:12,fontWeight:700,color:"#5A7848",textTransform:"uppercase",letterSpacing:0.8,marginBottom:10}}>📋 Premade templates — tap to load</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {PREMADE_DRAWERS.map(pd=>(
                  <div key={pd.name} style={{background:"rgba(248,245,236,0.88)",borderRadius:18,padding:"12px 14px",border:"1px solid rgba(255,255,255,0.9)",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                    <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,color:"#1A1A10",marginBottom:2}}>{pd.name}</div>
                    <div style={{fontSize:11,color:"#8A8070",lineHeight:1.5}}>{pd.subs.slice(0,2).join(", ")}…</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={loadPremade} style={{flex:1,background:"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"14px",fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 3px 12px rgba(58,80,38,0.28)"}}>
                📁 Load All Templates
              </button>
              <button onClick={()=>setAddingDrawer(true)} style={{flex:1,background:"rgba(248,245,236,0.90)",color:"#3A3020",border:"1.5px solid rgba(90,80,60,0.15)",borderRadius:100,padding:"14px",fontFamily:"Georgia,serif",fontWeight:600,fontSize:14,cursor:"pointer"}}>
                + Custom Drawer
              </button>
            </div>
          </div>
        )}

        {/* Cabinet unit visual */}
        {drawers.length>0&&(
          <div style={{background:"linear-gradient(180deg,#3d2a1a 0%,#2a1a0a 100%)",borderRadius:16,padding:"12px 10px",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",border:"3px solid #5a3a1a",marginBottom:14}}>
            <div style={{background:"linear-gradient(90deg,#6b4a2a,#8b6a3a,#6b4a2a)",borderRadius:"8px 8px 0 0",height:14,marginBottom:4,boxShadow:"inset 0 -2px 4px rgba(0,0,0,0.3)"}}/>

            {drawers.map((d,i)=>{
              const totalFiles=d.subCats.reduce((s,sc)=>s+sc.files.length,0);
              const isLast=i===drawers.length-1;
              const isRenaming=renamingDrawerId===d.id;
              return(
                <div key={d.id}>
                  <div style={{position:"relative",marginBottom:4}}>
                    {isRenaming?(
                      <div style={{background:"rgba(248,245,236,0.95)",borderRadius:8,padding:"10px 12px",display:"flex",gap:8,alignItems:"center"}}>
                        <input value={renameDraft} onChange={e=>setRenameDraft(e.target.value)}
                          onKeyDown={e=>{if(e.key==="Enter")renameDrawer(d.id,renameDraft.trim()||d.name);if(e.key==="Escape")setRenamingDrawerId(null);}}
                          autoFocus style={{flex:1,border:"1.5px solid rgba(90,120,72,0.3)",borderRadius:100,padding:"8px 14px",fontSize:14,color:"#1A1A10",outline:"none",background:"rgba(255,255,255,0.9)"}}/>
                        <button onClick={()=>renameDrawer(d.id,renameDraft.trim()||d.name)} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"8px 14px",fontWeight:700,fontSize:13,cursor:"pointer"}}>Save</button>
                        <button onClick={()=>setRenamingDrawerId(null)} style={{background:"transparent",color:"#8A8070",border:"none",cursor:"pointer",fontSize:13}}>✕</button>
                      </div>
                    ):(
                      <div onClick={()=>setActiveDrawerId(d.id)}
                        style={{background:`linear-gradient(135deg,${d.color},${d.color})`,borderRadius:8,padding:"0",cursor:"pointer",border:`2px solid ${d.color}`,boxShadow:`inset 0 2px 4px rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.3)`,overflow:"hidden",transition:"transform 0.15s"}}
                        onMouseEnter={e=>e.currentTarget.style.transform="translateX(3px)"}
                        onMouseLeave={e=>e.currentTarget.style.transform="translateX(0)"}>
                        <div style={{padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
                          <div style={{width:36,height:14,background:"rgba(255,255,255,0.3)",borderRadius:7,border:"1px solid rgba(255,255,255,0.4)",flexShrink:0,boxShadow:"inset 0 1px 2px rgba(0,0,0,0.2)"}}/>
                          <span style={{fontSize:20,flexShrink:0}}>{d.icon}</span>
                          <div style={{flex:1}}>
                            <div style={{color:"#fff",fontWeight:900,fontSize:15,textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>{d.name}</div>
                            <div style={{color:"rgba(255,255,255,0.7)",fontSize:11,marginTop:1}}>{d.subCats.length} folder{d.subCats.length!==1?"s":""} · {totalFiles} file{totalFiles!==1?"s":""}</div>
                          </div>
                          <div style={{color:"rgba(255,255,255,0.6)",fontSize:18}}>›</div>
                        </div>
                        <div style={{height:3,background:"rgba(0,0,0,0.25)"}}/>
                      </div>
                    )}
                    {/* Rename + delete */}
                    {!isRenaming&&<div style={{position:"absolute",top:8,right:8,display:"flex",gap:4,zIndex:10}}>
                      <button onClick={e=>{e.stopPropagation();setRenameDraft(d.name);setRenamingDrawerId(d.id);}} style={{background:"rgba(255,255,255,0.18)",color:"rgba(255,255,255,0.8)",border:"none",borderRadius:6,width:24,height:24,cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>✏️</button>
                      <button onClick={e=>{e.stopPropagation();delDrawer(d.id);}} style={{background:"rgba(90,80,60,0.06)",color:"rgba(255,255,255,0.7)",border:"none",borderRadius:6,width:24,height:24,cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
                    </div>}
                  </div>
                  {!isLast&&<div style={{height:3,background:"rgba(0,0,0,0.4)",borderRadius:1,marginBottom:1}}/>}
                </div>
              );
            })}

            <div style={{background:"linear-gradient(90deg,#6b4a2a,#8b6a3a,#6b4a2a)",borderRadius:"0 0 8px 8px",height:16,marginTop:4,boxShadow:"inset 0 2px 4px rgba(0,0,0,0.3)"}}/>
          </div>
        )}

        {/* Add drawer button below cabinet */}
        {drawers.length>0&&(
          <button onClick={()=>setAddingDrawer(true)} style={{width:"100%",padding:"12px",background:"rgba(255,255,255,0.1)",color:"#1A1A10",border:`2px dashed rgba(255,255,255,0.25)`,borderRadius:14,fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <span style={{fontSize:20}}>+</span> Add Another Drawer
          </button>
        )}
      </div>

      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:"#1A1A10",borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STUDY STUDIO  — Flashcards · Quiz · Infographic · Slides
   AI-powered from Notes page content
═══════════════════════════════════════════════════════ */

async function aiStudy(content,title,type){
  const prompts={
    flashcards:`Create 6 flashcards from this note. Return ONLY a JSON array of objects with "q" (question) and "a" (answer). Keep answers concise. No markdown.\n\nTitle: ${title}\n\n${content.slice(0,2000)}`,
    quiz:`Create 5 multiple-choice questions from this note. Return ONLY a JSON array of objects with "question" (string), "options" (array of 4 strings), "correct" (index 0-3). No markdown.\n\nTitle: ${title}\n\n${content.slice(0,2000)}`,
    infographic:`Create an infographic summary of this note. Return ONLY a JSON object with: "title" (string), "subtitle" (string), "keyPoints" (array of 4-6 objects with "icon" emoji and "text"), "stat" (one memorable number/fact as string), "quote" (one key sentence). No markdown.\n\nTitle: ${title}\n\n${content.slice(0,2000)}`,
    slides:`Create a 5-slide deck from this note. Return ONLY a JSON array of objects with "title", "bullets" (array of 3-4 strings), "emoji" (one relevant emoji). No markdown.\n\nTitle: ${title}\n\n${content.slice(0,2000)}`,
  };
  const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,
      messages:[{role:"user",content:prompts[type]}]})
  });
  return JSON.parse((j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim());
}

function StudyStudio({page,onClose}){
  const [mode,setMode]=useState(null); // null | flashcards | quiz | infographic | slides
  const [loading,setLoading]=useState(false);
  const [data,setData]=useState(null);
  const [error,setError]=useState("");

  const generate=async(type)=>{
    if(!page.content.trim()){setError("Add some content to the page first!");return;}
    setLoading(true);setError("");setData(null);setMode(type);
    try{const d=await aiStudy(page.content,page.title,type);setData(d);}
    catch(e){setError("AI error — try again");setMode(null);}
    setLoading(false);
  };

  // Flashcards
  const [cardIdx,setCardIdx]=useState(0);
  const [flipped,setFlipped]=useState(false);
  const [known,setKnown]=useState(new Set());

  // Quiz
  const [qIdx,setQIdx]=useState(0);
  const [picked,setPicked]=useState(null);
  const [score,setScore]=useState(0);
  const [quizDone,setQuizDone]=useState(false);

  const resetFlashcards=()=>{setCardIdx(0);setFlipped(false);setKnown(new Set());};
  const resetQuiz=()=>{setQIdx(0);setPicked(null);setScore(0);setQuizDone(false);};

  const TOOLS=[
    {id:"flashcards",icon:"🃏",label:"Flashcards",desc:"Flip Q&A cards",col:"#5A7848"},
    {id:"quiz",      icon:"❓",label:"Quiz",      desc:"Test yourself",col:"#2980b9"},
    {id:"infographic",icon:"📊",label:"Infographic",desc:"Visual summary",col:"#27ae60"},
    {id:"slides",    icon:"📑",label:"Slide Deck", desc:"Key slides",  col:"#e67e22"},
  ];

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(10,2,30,0.92)",zIndex:500,display:"flex",flexDirection:"column",fontFamily:"'Segoe UI',sans-serif"}}>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#3D5A2A,#5A7848)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
        <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",color:"#1A1A10",border:"none",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer"}}>←</button>
        <div style={{flex:1}}>
          <div style={{color:"#1A1A10",fontWeight:900,fontSize:17}}>🎓 Study Studio</div>
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:12}}>{page.title}</div>
        </div>
        {mode&&<button onClick={()=>{setMode(null);setData(null);setError("");resetFlashcards();resetQuiz();}} style={{background:"rgba(255,255,255,0.15)",color:"#1A1A10",border:"none",borderRadius:10,padding:"6px 12px",fontWeight:700,fontSize:12,cursor:"pointer"}}>← Back</button>}
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"16px 14px"}}>

        {/* Tool selector */}
        {!mode&&!loading&&(
          <>
            <div style={{color:"rgba(255,255,255,0.7)",fontSize:13,marginBottom:14,textAlign:"center"}}>
              Choose what to generate from your notes ✨
            </div>
            {TOOLS.map(t=>(
              <button key={t.id} onClick={()=>generate(t.id)}
                style={{display:"flex",alignItems:"center",gap:16,width:"100%",padding:"16px 18px",background:"rgba(255,255,255,0.09)",border:`1.5px solid ${t.col}`,borderRadius:18,marginBottom:12,cursor:"pointer",transition:"all 0.15s",textAlign:"left"}}
                onMouseEnter={e=>{e.currentTarget.style.background=`${t.col}`;e.currentTarget.style.borderColor=t.col;}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.09)";e.currentTarget.style.borderColor=`${t.col}`;}}>
                <div style={{width:52,height:52,borderRadius:14,background:`${t.col}`,border:`2px solid ${t.col}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{t.icon}</div>
                <div>
                  <div style={{color:"#1A1A10",fontWeight:800,fontSize:17,marginBottom:2}}>{t.label}</div>
                  <div style={{color:"rgba(255,255,255,0.5)",fontSize:13}}>{t.desc}</div>
                </div>
                <div style={{color:"rgba(255,255,255,0.3)",fontSize:20,marginLeft:"auto"}}>›</div>
              </button>
            ))}
            {error&&<div style={{background:"#fce4e4",color:"#c0392b",borderRadius:10,padding:"10px 14px",fontSize:13,fontWeight:700,marginTop:8}}>{error}</div>}
          </>
        )}

        {/* Loading */}
        {loading&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"60vh",gap:20}}>
            <div style={{fontSize:48}}>✨</div>
            <div style={{color:"#1A1A10",fontWeight:800,fontSize:18}}>Generating {mode}…</div>
            <div style={{color:"rgba(255,255,255,0.5)",fontSize:14}}>Claude is studying your notes</div>
            <div style={{display:"flex",gap:8}}>
              {[0,1,2].map(i=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:C.pp,animation:"none",opacity:0.4+i*0.2}}/>)}
            </div>
          </div>
        )}

        {/* ── FLASHCARDS ── */}
        {mode==="flashcards"&&data&&Array.isArray(data)&&(()=>{
          const card=data[cardIdx];
          const pct=Math.round((known.size/data.length)*100);
          return(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <span style={{color:"rgba(255,255,255,0.7)",fontSize:13,fontWeight:700}}>{cardIdx+1} / {data.length}</span>
                <span style={{background:"rgba(248,245,236,0.88)",color:"#1A1A10",borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:800}}>{known.size} known</span>
                <button onClick={resetFlashcards} style={{background:"rgba(255,255,255,0.15)",color:"#1A1A10",border:"none",borderRadius:8,padding:"5px 10px",fontSize:12,cursor:"pointer"}}>↺ Reset</button>
              </div>
              {/* Progress bar */}
              <div style={{height:5,background:"rgba(255,255,255,0.1)",borderRadius:3,marginBottom:16,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,background:"#27ae60",borderRadius:3,transition:"width 0.4s"}}/>
              </div>
              {/* Card */}
              <div onClick={()=>setFlipped(f=>!f)}
                style={{background:flipped?"linear-gradient(135deg,#1e8449,#27ae60)":"linear-gradient(135deg,#3D5A2A,#5A7848)",borderRadius:22,padding:"32px 24px",minHeight:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 8px 32px rgba(45,10,94,0.4)",transition:"all 0.3s",marginBottom:16}}>
                <div style={{fontSize:11,fontWeight:800,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:1.5,marginBottom:12}}>{flipped?"ANSWER ✅":"QUESTION — tap to flip"}</div>
                <div style={{color:"#1A1A10",fontWeight:700,fontSize:18,textAlign:"center",lineHeight:1.5}}>{flipped?card.a:card.q}</div>
              </div>
              {/* Action buttons */}
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>{setKnown(s=>{const n=new Set(s);n.add(cardIdx);return n;});setFlipped(false);if(cardIdx<data.length-1)setCardIdx(i=>i+1);}}
                  style={{flex:1,background:"rgba(248,245,236,0.88)",color:"#1A1A10",border:"none",borderRadius:14,padding:"14px",fontWeight:800,fontSize:15,cursor:"pointer"}}>
                  ✅ Got it
                </button>
                <button onClick={()=>{setFlipped(false);if(cardIdx<data.length-1)setCardIdx(i=>i+1);}}
                  style={{flex:1,background:"rgba(255,255,255,0.15)",color:"#1A1A10",border:"none",borderRadius:14,padding:"14px",fontWeight:800,fontSize:15,cursor:"pointer"}}>
                  🔄 Again
                </button>
              </div>
              {/* Nav dots */}
              <div style={{display:"flex",gap:6,justifyContent:"center",marginTop:14,flexWrap:"wrap"}}>
                {data.map((_,i)=>(
                  <div key={i} onClick={()=>{setCardIdx(i);setFlipped(false);}}
                    style={{width:10,height:10,borderRadius:"50%",background:known.has(i)?"#27ae60":i===cardIdx?C.pp:"rgba(255,255,255,0.2)",cursor:"pointer",transition:"all 0.2s"}}/>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ── QUIZ ── */}
        {mode==="quiz"&&data&&Array.isArray(data)&&(()=>{
          if(quizDone) return(
            <div style={{textAlign:"center",padding:"40px 20px"}}>
              <div style={{fontSize:64,marginBottom:16}}>{score>=4?"🏆":score>=3?"🌟":"📚"}</div>
              <div style={{color:"#1A1A10",fontWeight:900,fontSize:28,marginBottom:8}}>{score} / {data.length}</div>
              <div style={{color:"rgba(255,255,255,0.7)",fontSize:16,marginBottom:24}}>{score===data.length?"Perfect! 🎉":score>=data.length*0.7?"Great work!":"Keep studying!"}</div>
              <button onClick={()=>{resetQuiz();}} style={{background:btnGrad,color:"#1A1A10",border:"none",borderRadius:14,padding:"14px 32px",fontWeight:800,fontSize:15,cursor:"pointer"}}>Try Again</button>
            </div>
          );
          const q=data[qIdx];
          return(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                <span style={{color:"rgba(255,255,255,0.7)",fontSize:13,fontWeight:700}}>Q{qIdx+1} of {data.length}</span>
                <span style={{color:"rgba(255,255,255,0.7)",fontSize:13,fontWeight:700}}>Score: {score}</span>
              </div>
              <div style={{background:"rgba(255,255,255,0.10)",borderRadius:18,padding:"20px",marginBottom:16}}>
                <div style={{color:"#1A1A10",fontWeight:700,fontSize:17,lineHeight:1.5}}>{q.question}</div>
              </div>
              {q.options.map((opt,i)=>{
                const isCorrect=i===q.correct;
                const isWrong=picked===i&&!isCorrect;
                const showCorrect=picked!==null&&isCorrect;
                return(
                  <button key={i} onClick={()=>{
                    if(picked!==null)return;
                    setPicked(i);
                    if(i===q.correct)setScore(s=>s+1);
                    setTimeout(()=>{
                      if(qIdx<data.length-1){setQIdx(qi=>qi+1);setPicked(null);}
                      else setQuizDone(true);
                    },1200);
                  }}
                  style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"14px 16px",background:showCorrect?"#27ae60":isWrong?"#e74c3c":picked===i?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.09)",border:`2px solid ${showCorrect?"#27ae60":isWrong?"#e74c3c":"rgba(255,255,255,0.15)"}`,borderRadius:14,marginBottom:10,cursor:picked===null?"pointer":"default",textAlign:"left",transition:"all 0.2s"}}>
                    <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,0.15)",color:"#1A1A10",fontWeight:800,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {String.fromCharCode(65+i)}
                    </div>
                    <span style={{color:"#1A1A10",fontWeight:600,fontSize:14,flex:1}}>{opt}</span>
                    {showCorrect&&<span style={{fontSize:18}}>✅</span>}
                    {isWrong&&<span style={{fontSize:18}}>❌</span>}
                  </button>
                );
              })}
            </div>
          );
        })()}

        {/* ── INFOGRAPHIC ── */}
        {mode==="infographic"&&data&&!Array.isArray(data)&&(()=>{
          const inf=data;
          return(
            <div>
              {/* Header card */}
              <div style={{background:"linear-gradient(135deg,#1a5276,#2980b9)",borderRadius:20,padding:"22px 20px",marginBottom:12,textAlign:"center",boxShadow:"0 6px 24px rgba(41,128,185,0.4)"}}>
                <div style={{color:"#1A1A10",fontWeight:900,fontSize:22,marginBottom:4}}>{inf.title}</div>
                <div style={{color:"rgba(255,255,255,0.75)",fontSize:14,lineHeight:1.5}}>{inf.subtitle}</div>
              </div>
              {/* Key points */}
              <div style={{background:"rgba(255,255,255,0.92)",borderRadius:18,padding:"16px",marginBottom:12}}>
                <div style={{fontWeight:800,color:C.dp,fontSize:14,marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>Key Points</div>
                {(inf.keyPoints||[]).map((kp,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10,padding:"10px 12px",background:C.pale,borderRadius:12,border:`1px solid ${C.ll}`}}>
                    <span style={{fontSize:22,flexShrink:0}}>{kp.icon}</span>
                    <span style={{fontSize:14,fontWeight:600,color:C.txt,lineHeight:1.5}}>{kp.text}</span>
                  </div>
                ))}
              </div>
              {/* Stat callout */}
              {inf.stat&&(
                <div style={{background:"linear-gradient(135deg,#8e44ad,#c2185b)",borderRadius:18,padding:"18px",marginBottom:12,textAlign:"center",boxShadow:"0 4px 18px rgba(142,68,173,0.4)"}}>
                  <div style={{color:"rgba(255,255,255,0.7)",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,marginBottom:6}}>Key Fact</div>
                  <div style={{color:"#1A1A10",fontWeight:900,fontSize:20,lineHeight:1.4}}>{inf.stat}</div>
                </div>
              )}
              {/* Quote */}
              {inf.quote&&(
                <div style={{background:"rgba(255,255,255,0.92)",borderRadius:18,padding:"16px 20px",borderLeft:`5px solid ${C.pp}`}}>
                  <div style={{fontSize:28,color:C.pp,lineHeight:1,marginBottom:4}}>"</div>
                  <div style={{fontSize:15,fontWeight:600,color:C.txt,lineHeight:1.6,fontStyle:"italic"}}>{inf.quote}</div>
                </div>
              )}
            </div>
          );
        })()}

        {/* ── SLIDES ── */}
        {mode==="slides"&&data&&Array.isArray(data)&&(()=>{
          const [slideIdx,setSlideIdx]=useState(0);
          const slide=data[slideIdx];
          const slideColors=["linear-gradient(135deg,#3D5A2A,#5A7848)","linear-gradient(135deg,#1a5276,#2980b9)","linear-gradient(135deg,#1e8449,#27ae60)","linear-gradient(135deg,#7d1a1a,#c0392b)","linear-gradient(135deg,#4a148c,#8e44ad)"];
          return(
            <div>
              {/* Slide counter */}
              <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:12}}>
                {data.map((_,i)=>(
                  <button key={i} onClick={()=>setSlideIdx(i)} style={{width:28,height:28,borderRadius:"50%",background:i===slideIdx?C.pp:"rgba(255,255,255,0.2)",color:"#1A1A10",border:"none",cursor:"pointer",fontWeight:800,fontSize:12}}>{i+1}</button>
                ))}
              </div>
              {/* Slide */}
              <div style={{background:slideColors[slideIdx%slideColors.length],borderRadius:22,padding:"28px 22px",minHeight:260,boxShadow:"0 8px 32px rgba(45,10,94,0.4)",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
                  <span style={{fontSize:36}}>{slide.emoji}</span>
                  <div style={{color:"#1A1A10",fontWeight:900,fontSize:20,lineHeight:1.3,flex:1}}>{slide.title}</div>
                </div>
                {(slide.bullets||[]).map((b,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,0.6)",flexShrink:0,marginTop:7}}/>
                    <span style={{color:"rgba(255,255,255,0.9)",fontSize:15,lineHeight:1.5,fontWeight:600}}>{b}</span>
                  </div>
                ))}
              </div>
              {/* Prev/Next */}
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setSlideIdx(i=>Math.max(0,i-1))} disabled={slideIdx===0}
                  style={{flex:1,background:"rgba(255,255,255,0.15)",color:"#1A1A10",border:"none",borderRadius:14,padding:"13px",fontWeight:800,fontSize:15,cursor:"pointer",opacity:slideIdx===0?0.4:1}}>
                  ← Prev
                </button>
                <button onClick={()=>setSlideIdx(i=>Math.min(data.length-1,i+1))} disabled={slideIdx===data.length-1}
                  style={{flex:1,background:btnGrad,color:"#1A1A10",border:"none",borderRadius:14,padding:"13px",fontWeight:800,fontSize:15,cursor:"pointer",opacity:slideIdx===data.length-1?0.4:1}}>
                  Next →
                </button>
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}

function Notes({data,setData,priData,setPriData,mapData,setMapData,ideasData,setIdeasData,matrixData,setMatrixData,goalsData,setGoalsData,setScreen}) {
  const [sectionId,setSectionId]=useState(null);
  const [pageId,setPageId]=useState(null);
  const [sendOpen,setSendOpen]=useState(false);
  const [toast,setToast]=useState("");
  const [studioOpen,setStudioOpen]=useState(false);
  const [notesMode,setNotesMode]=useState(null);
  const [cabinetData,setCabinetData]=useState([]);
  const [addingSectionForm,setAddingSectionForm]=useState(false);
  const [addingPageForm,setAddingPageForm]=useState(false);
  const [newSectionName,setNewSectionName]=useState('');
  const [newPageName,setNewPageName]=useState('');
  const section=data.find(s=>s.id===sectionId);
  const page=section?.pages.find(p=>p.id===pageId);

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2200);};

  const addSection=()=>setAddingSectionForm(true);
  const submitSection=()=>{if(!newSectionName.trim())return;setData(ds=>[...ds,{id:Date.now(),name:newSectionName.trim(),color:NODE_COLORS[ds.length%NODE_COLORS.length],pages:[]}]);setNewSectionName('');setAddingSectionForm(false);};
  const deleteSection=id=>setData(ds=>ds.filter(s=>s.id!==id));
  const addPage=()=>setAddingPageForm(true);
  const submitPage=()=>{if(!newPageName.trim()||!section)return;setData(ds=>ds.map(s=>s.id===sectionId?{...s,pages:[...s.pages,{id:Date.now(),title:newPageName.trim(),content:'',url:'',updated:Date.now()}]}:s));setNewPageName('');setAddingPageForm(false);};
  const deletePage=id=>{if(section)setData(ds=>ds.map(s=>s.id===sectionId?{...s,pages:s.pages.filter(p=>p.id!==id)}:s));};
  const updatePage=(id,content)=>setData(ds=>ds.map(s=>s.id===sectionId?{...s,pages:s.pages.map(p=>p.id===id?{...p,content,updated:Date.now()}:p)}:s));

  /* Send-to actions from page content */
  const plantAsGoal=(horizon)=>{
    if(!setGoalsData)return;
    const days={"week":7,"month1":30,"month6":180,"year1":365,"year3":1095,"year5":1825};
    const due=new Date();due.setDate(due.getDate()+(days[horizon]||365));
    const newGoal={id:Date.now(),horizon:horizon==="month1"?"month6":horizon,title:idea.text,description:idea.ramble||"",dueDate:due.toISOString().slice(0,10),cover:idea.cover||null,links:[],subtasks:(idea.steps||[]).map(s=>({id:Date.now()+Math.random(),text:s.text,done:s.done,microSteps:[],microExpanded:false})),status:"active",created:Date.now()};
    setGoalsData(gs=>[...gs,newGoal]);
    showToast("🌱 Planted as Goal!");
  };
  const sendToIdeas=()=>{
    if(!page)return;
    setIdeasData(ds=>[{id:Date.now(),text:page.title,ramble:page.content.slice(0,400),tag:"💡 Idea",status:"spark",collection:"",pinned:false,votes:0,links:[],created:Date.now()},...ds]);
    showToast("💡 Sent to Ideas!");setSendOpen(false);
  };
  const sendToMap=()=>{
    if(!page)return;
    const root={id:Date.now(),text:page.title,x:0,y:0,parent:null,color:"crystal"};
    setMapData(ms=>[...ms,{id:Date.now()+1,name:page.title,nodes:[root]}]);
    showToast("🧠 Mind map created!");setSendOpen(false);
  };
  const sendToMatrix=(quad)=>{
    if(!page)return;
    setMatrixData(ds=>[...ds,{id:Date.now(),text:page.title,quad,created:Date.now(),touched:Date.now()}]);
    showToast(`🎯 Sent to Matrix!`);setSendOpen(false);
  };
  const sendToPri=(listId)=>{
    if(!page)return;
    setPriData(ls=>ls.map(l=>l.id===listId?{...l,tasks:[...l.tasks,{id:Date.now(),name:page.title,done:false,color:"lilac"}]}:l));
    showToast("📋 Sent to Prioritizer!");setSendOpen(false);
  };
  const sendToCal=()=>{
    if(!page)return;
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(page.title)}`,"_blank");
    setSendOpen(false);
  };

  // Page editor
  const updatePageUrl=(id,url)=>setData(ds=>ds.map(s=>s.id===sectionId?{...s,pages:s.pages.map(p=>p.id===id?{...p,url}:p)}:s));
  if(page&&section) return (
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",display:"flex",flexDirection:"column"}}>
      {studioOpen&&<StudyStudio page={page} onClose={()=>setStudioOpen(false)}/>}
      {/* Page editor nav bar */}
      <div style={{background:`linear-gradient(135deg,${C.dp},${C.mp})`,padding:"10px 12px",display:"flex",alignItems:"center",gap:8,boxShadow:"0 3px 16px rgba(90,80,60,0.35)",position:"sticky",top:0,zIndex:50,flexShrink:0}}>
        <button onClick={()=>setPageId(null)} style={{background:"rgba(255,255,255,0.2)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:10,width:40,height:40,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:900}}>←</button>
        <span style={{flex:1,color:"#1A1A10",fontWeight:800,fontSize:15,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{page.title}</span>
        <button onClick={()=>{setSectionId(null);setNotesMode(null);}} style={{background:"rgba(255,255,255,0.18)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:10,padding:"7px 12px",fontWeight:800,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4,flexShrink:0}}>🏠</button>
        <button onClick={()=>setStudioOpen(true)} style={{background:"linear-gradient(135deg,#3D5A2A,#5A7848)",color:"#1A1A10",border:"none",borderRadius:10,padding:"7px 11px",fontWeight:800,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4,flexShrink:0}}>🎓</button>
        <div style={{position:"relative"}}>
          <button onClick={()=>setSendOpen(o=>!o)} style={{background:"rgba(255,255,255,0.22)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:10,padding:"7px 11px",fontWeight:800,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
            ↗ Send to…
            </button>
          {sendOpen&&(
            <div style={{position:"absolute",top:46,right:0,background:C.wh,borderRadius:16,boxShadow:"0 8px 32px rgba(90,80,60,0.28)",border:`1.5px solid ${C.ll}`,minWidth:220,zIndex:200,overflow:"hidden"}}>
              {/* Calendar */}
              <button onClick={sendToCal} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left"}}>
                <span style={{fontSize:18}}>📅</span><span style={{fontWeight:700,fontSize:14,color:C.txt}}>Google Calendar</span>
              </button>
              {/* Ideas */}
              <button onClick={sendToIdeas} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left"}}>
                <span style={{fontSize:18}}>💡</span><span style={{fontWeight:700,fontSize:14,color:C.txt}}>Ideas board</span>
              </button>
              {/* Mind Map */}
              <button onClick={sendToMap} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left"}}>
                <span style={{fontSize:18}}>🧠</span><span style={{fontWeight:700,fontSize:14,color:C.txt}}>New Mind Map</span>
              </button>
              {/* Matrix quadrants */}
              {[{key:"do",emoji:"🔴",label:"Do First"},{key:"plan",emoji:"🟠",label:"Schedule"},{key:"help",emoji:"🔵",label:"Ask for Help"},{key:"drop",emoji:"⚫",label:"Eliminate"}].map(q=>(
                <button key={q.key} onClick={()=>sendToMatrix(q.key)} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left"}}>
                  <span style={{fontSize:16}}>{q.emoji}</span><span style={{fontWeight:700,fontSize:14,color:C.txt}}>Matrix — {q.label}</span>
                </button>
              ))}
              {/* Prioritizer lists */}
              {priData.map(l=>(
                <button key={l.id} onClick={()=>sendToPri(l.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left"}}>
                  <span style={{fontSize:18}}>📋</span><span style={{fontWeight:700,fontSize:14,color:C.txt}}>Prioritizer — {l.name}</span>
                </button>
              ))}
              <button onClick={()=>setSendOpen(false)} style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"12px 16px",background:"none",border:"none",cursor:"pointer",width:"100%",fontWeight:700,fontSize:13,color:C.soft}}>Cancel</button>
            </div>
          )}
          </div>
        </div>
      <div style={{flex:1,padding:"12px 14px 0",display:"flex",flexDirection:"column"}}>
        <textarea
          ref={el=>{if(el)el._ta=el;}}
          id="page-editor-ta"
          value={page.content}
          onChange={e=>updatePage(page.id,e.target.value)}
          placeholder="Start writing..."
          style={{flex:1,minHeight:"55vh",padding:"16px",borderRadius:16,border:`1.5px solid ${C.ll}`,fontSize:15,lineHeight:1.8,color:C.txt,fontFamily:"'Segoe UI',sans-serif",resize:"none",outline:"none",background:"rgba(255,255,255,0.92)",boxShadow:"0 2px 12px rgba(90,80,60,0.09)"}}
        />
        <UrlField value={page.url||""} onChange={v=>updatePageUrl(page.id,v)} style={{marginTop:8,marginBottom:4}}/>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",marginTop:2,marginBottom:8,textAlign:"right"}}>{page.content.length} chars · auto-saved</div>
      </div>

      {/* ── OneNote-style toolbar ── */}
      <div style={{position:"sticky",bottom:90,background:"rgba(255,255,255,0.97)",borderTop:`2px solid ${C.ll}`,padding:"8px 10px",display:"flex",gap:4,alignItems:"center",boxShadow:"0 -4px 16px rgba(90,80,60,0.12)",zIndex:50,flexWrap:"wrap"}}>
        {/* Insert prefix helpers */}
        {[
          {icon:"☑",tip:"Checkbox",insert:"☐ "},
          {icon:"•",tip:"Bullet",insert:"• "},
          {icon:"1.",tip:"Numbered",insert:(c)=>{const lines=c.split('\n');const nums=lines.filter(l=>/^\d+\./.test(l));return`${nums.length+1}. `;}},
          {icon:"→",tip:"Indent",insert:"    "},
        ].map(({icon,tip,insert})=>(
          <button key={tip} title={tip} onClick={()=>{
            const ta=document.getElementById('page-editor-ta');
            if(!ta)return;
            const start=ta.selectionStart,end=ta.selectionEnd;
            const prefix=typeof insert==='function'?insert(page.content):insert;
            const newVal=page.content.slice(0,start)+prefix+page.content.slice(end);
            updatePage(page.id,newVal);
            setTimeout(()=>{ta.focus();ta.setSelectionRange(start+prefix.length,start+prefix.length);},10);
          }} style={{background:C.ll,color:C.dp,border:`1.5px solid ${C.lp}`,borderRadius:9,width:38,height:38,fontWeight:900,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            {icon}
          </button>
        ))}

        <div style={{width:1,height:28,background:C.ll,margin:"0 4px"}}/>

        {/* Text formatting wrappers */}
        {[
          {icon:"B",tip:"Bold",wrap:"**"},
          {icon:"I",tip:"Italic",wrap:"_",style:{fontStyle:"italic"}},
          {icon:"U",tip:"Underline",wrap:"__",style:{textDecoration:"underline"}},
          {icon:"~~",tip:"Strikethrough",wrap:"~~",style:{textDecoration:"line-through",fontSize:12}},
        ].map(({icon,tip,wrap,style})=>(
          <button key={tip} title={tip} onClick={()=>{
            const ta=document.getElementById('page-editor-ta');
            if(!ta)return;
            const start=ta.selectionStart,end=ta.selectionEnd;
            const sel=page.content.slice(start,end)||tip;
            const newVal=page.content.slice(0,start)+wrap+sel+wrap+page.content.slice(end);
            updatePage(page.id,newVal);
            setTimeout(()=>{ta.focus();ta.setSelectionRange(start+wrap.length,start+wrap.length+sel.length);},10);
          }} style={{background:C.ll,color:C.dp,border:`1.5px solid ${C.lp}`,borderRadius:9,width:38,height:38,fontWeight:900,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,...(style||{})}}>
            {icon}
          </button>
        ))}

        <div style={{width:1,height:28,background:C.ll,margin:"0 4px"}}/>

        {/* Heading */}
        <button title="Heading" onClick={()=>{
          const ta=document.getElementById('page-editor-ta');
          if(!ta)return;
          const start=ta.selectionStart;
          const lineStart=page.content.lastIndexOf('\n',start-1)+1;
          const newVal=page.content.slice(0,lineStart)+'# '+page.content.slice(lineStart);
          updatePage(page.id,newVal);
          setTimeout(()=>{ta.focus();ta.setSelectionRange(start+2,start+2);},10);
        }} style={{background:C.ll,color:C.dp,border:`1.5px solid ${C.lp}`,borderRadius:9,width:38,height:38,fontWeight:900,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>H</button>

        {/* Divider line */}
        <button title="Divider" onClick={()=>{
          const ta=document.getElementById('page-editor-ta');
          if(!ta)return;
          const start=ta.selectionStart;
          const ins='\n---\n';
          const newVal=page.content.slice(0,start)+ins+page.content.slice(start);
          updatePage(page.id,newVal);
          setTimeout(()=>{ta.focus();ta.setSelectionRange(start+ins.length,start+ins.length);},10);
        }} style={{background:C.ll,color:C.dp,border:`1.5px solid ${C.lp}`,borderRadius:9,width:38,height:38,fontWeight:900,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>—</button>

        <div style={{flex:1}}/>

        {/* Undo / Redo */}
        <button title="Undo" onClick={()=>document.execCommand('undo')} style={{background:C.pale,color:C.soft,border:`1px solid ${C.ll}`,borderRadius:9,width:36,height:36,fontWeight:900,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>↩</button>
      </div>

      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:"#1A1A10",borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(45,10,94,0.4)",zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );

  // Page list
  if(section) return (
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif"}}>
      <div style={{background:`linear-gradient(135deg,${C.dp},${C.mp})`,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,boxShadow:"0 3px 16px rgba(90,80,60,0.35)",position:"sticky",top:0,zIndex:50}}>
        <button onClick={()=>setSectionId(null)} style={{background:"rgba(255,255,255,0.2)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:10,width:40,height:40,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:900}}>←</button>
        <span style={{flex:1,color:"#1A1A10",fontWeight:900,fontSize:17,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{section.name}</span>
        <button onClick={()=>{setSectionId(null);setNotesMode(null);}} style={{background:"rgba(255,255,255,0.18)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:10,padding:"8px 14px",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:5,flexShrink:0}}>🏠 Home</button>
        <button onClick={addPage} style={{background:"rgba(255,255,255,0.22)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,width:40,height:40,fontSize:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
      </div>
      <div style={{padding:"20px 16px"}}>
        {addingPageForm&&(
          <div style={{background:"rgba(255,255,255,0.92)",borderRadius:16,padding:"14px 16px",marginBottom:14,border:`1.5px solid ${C.lp}`}}>
            <div style={{fontWeight:800,color:C.dp,fontSize:14,marginBottom:10}}>New page</div>
            <input autoFocus value={newPageName} onChange={e=>setNewPageName(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")submitPage();if(e.key==="Escape")setAddingPageForm(false);}}
              placeholder="Page title..." style={{width:"100%",boxSizing:"border-box",padding:"10px 13px",borderRadius:10,border:`1.5px solid ${C.lp}`,fontSize:15,fontWeight:600,color:C.txt,outline:"none",marginBottom:10}}/>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button onClick={()=>{setAddingPageForm(false);setNewPageName('');}} style={{background:"transparent",color:C.soft,border:"none",fontWeight:700,cursor:"pointer",fontSize:14}}>Cancel</button>
              <PurpleBtn onClick={submitPage}>Create</PurpleBtn>
            </div>
          </div>
        )}
        {section.pages.length===0&&!addingPageForm&&<div style={{textAlign:"center",color:"rgba(255,255,255,0.55)",marginTop:60,fontSize:15}}>Tap + to add a page</div>}
        {section.pages.map(p=>(
          <div key={p.id} onClick={()=>setPageId(p.id)} style={{display:"flex",alignItems:"center",gap:12,background:cardGlass,borderRadius:16,padding:"14px 16px",marginBottom:10,border:"1px solid rgba(255,255,255,0.25)",cursor:"pointer",transition:"all 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.28)"} onMouseLeave={e=>e.currentTarget.style.background=cardGlass}>
            <div style={{width:36,height:36,borderRadius:9,background:`linear-gradient(135deg,${section.color},${C.dp})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>📄</div>
            <div style={{flex:1}}>
              <div style={{color:"#1A1A10",fontWeight:700,fontSize:16}}>{p.title}</div>
              <div style={{color:"rgba(255,255,255,0.45)",fontSize:12,marginTop:2}}>{p.content.slice(0,50)||"Empty"}{p.content.length>50?"…":""}</div>
              {p.url&&<UrlBadge url={p.url}/>}
            </div>
            <button onClick={e=>{e.stopPropagation();deletePage(p.id);}} style={{background:"rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:8,width:30,height:30,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );

  // Route sub-modes
  if(notesMode==="ideas") return(
    <div style={{minHeight:"100vh",background:"transparent"}}>
      <Ideas data={ideasData} setData={setIdeasData} priData={priData} setPriData={setPriData} mapData={mapData} setMapData={setMapData} matrixData={matrixData} setMatrixData={setMatrixData} goalsData={goalsData} setGoalsData={setGoalsData} onBack={()=>setNotesMode(null)}/>
    </div>
  );
  if(notesMode==="filing") return <FilingCabinet cabinetData={cabinetData} setCabinetData={setCabinetData} onBack={()=>setNotesMode(null)} onHome={()=>setNotesMode(null)}/>;
  if(notesMode==="notes") return (
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif"}}>
      <div style={{background:"rgba(248,245,236,0.92)",backdropFilter:"blur(16px)",padding:"14px 16px",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid rgba(90,80,60,0.08)",position:"sticky",top:0,zIndex:50}}>
        <button onClick={()=>setNotesMode(null)} style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        <span style={{flex:1,fontFamily:"Georgia,serif",fontWeight:700,fontSize:18,color:"#1A1A10"}}>📓 Notes</span>
        <button onClick={addSection} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:50,width:38,height:38,fontSize:22,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,boxShadow:"0 2px 10px rgba(58,80,38,0.3)"}}>+</button>
      </div>
      <div style={{padding:"16px"}}>
        {addingSectionForm&&(
          <div style={{background:"rgba(248,245,236,0.95)",borderRadius:22,padding:"18px",marginBottom:14,border:"1px solid rgba(90,120,72,0.2)"}}>
            <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:15,marginBottom:10}}>New section</div>
            <input autoFocus value={newSectionName} onChange={e=>setNewSectionName(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")submitSection();if(e.key==="Escape")setAddingSectionForm(false);}} placeholder="Section name..." style={{width:"100%",boxSizing:"border-box",padding:"12px 16px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.25)",fontSize:15,color:"#1A1A10",outline:"none",marginBottom:10,background:"rgba(255,255,255,0.9)"}}/>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button onClick={()=>{setAddingSectionForm(false);setNewSectionName("");}} style={{background:"transparent",color:"#8A8070",border:"none",fontWeight:600,cursor:"pointer",padding:"8px 16px"}}>Cancel</button>
              <button onClick={submitSection} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"10px 22px",fontWeight:700,fontSize:14,cursor:"pointer"}}>Create</button>
            </div>
          </div>
        )}
        {data.map((s,i)=>(
          <div key={s.id} draggable
            onDragStart={e=>{e.dataTransfer.effectAllowed="move";e.dataTransfer.setData("si",String(i));}}
            onDragOver={e=>e.preventDefault()}
            onDrop={e=>{e.preventDefault();const from=parseInt(e.dataTransfer.getData("si"));if(from===i)return;const a=[...data];const[item]=a.splice(from,1);a.splice(i,0,item);setData(a);}}
            onClick={()=>setSectionId(s.id)}
            style={{display:"flex",alignItems:"center",gap:12,background:"rgba(248,245,236,0.88)",borderRadius:22,padding:"14px 16px",marginBottom:10,border:"1px solid rgba(255,255,255,0.9)",cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
            <div style={{color:"rgba(90,80,60,0.3)",fontSize:14}}>⠿</div>
            <div style={{width:42,height:42,borderRadius:12,background:"#5A7848",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📓</div>
            <div style={{flex:1}}><div style={{fontWeight:700,fontSize:16,color:"#1A1A10"}}>{s.name}</div><div style={{fontSize:12,color:"#8A8070"}}>{s.pages.length} pages</div></div>
            <button onClick={e=>{e.stopPropagation();deleteSection(s.id);}} style={{background:"rgba(90,80,60,0.07)",color:"#8A8070",border:"none",borderRadius:10,width:32,height:32,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
          </div>
        ))}
        {data.length===0&&!addingSectionForm&&<div style={{textAlign:"center",padding:"48px 0",color:"#8A8070",fontFamily:"Georgia,serif",fontSize:15}}>Tap + to create your first section</div>}
      </div>
    </div>
  );

  return <VaultHub data={data} setData={setData} priData={priData} ideasData={ideasData} setIdeasData={setIdeasData} matrixData={matrixData} goalsData={goalsData} cabinetData={cabinetData} setNotesMode={setNotesMode} setScreen={setScreen}/>;
}


/* ═══════════════════════════════════════════════════════
   VAULT HUB — Beautiful garden landing with all features
═══════════════════════════════════════════════════════ */
function VaultHub({data,setData,priData,ideasData,setIdeasData,matrixData,goalsData,cabinetData,setNotesMode,setScreen}) {
  const [search,setSearch]=useState("");
  const [briefingOpen,setBriefingOpen]=useState(false);
  const [briefingText,setBriefingText]=useState("");
  const [briefingLoading,setBriefingLoading]=useState(false);
  const [podcastOpen,setPodcastOpen]=useState(false);
  const [podcastLength,setPodcastLength]=useState("short");
  const [podcastText,setPodcastText]=useState("");
  const [podcastLoading,setPodcastLoading]=useState(false);
  const [podcastSaved,setPodcastSaved]=useState(false);
  const [pdfFile,setPdfFile]=useState(null);
  const [pdfPodcast,setPdfPodcast]=useState("");
  const [pdfLoading,setPdfLoading]=useState(false);
  const [dragOrder,setDragOrder]=useState([0,1,2,3,4,5]);
  const [dragIdx,setDragIdx]=useState(null);
  const [toast,setToast]=useState("");
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2200);};

  const totalPages=data.reduce((s,sec)=>s+sec.pages.length,0);
  const totalIdeas=(ideasData||[]).length;
  const totalDrawers=(cabinetData||[]).length;

  // Smart search — scans all notes content
  const searchResults=search.trim().length>1?[
    ...data.flatMap(sec=>sec.pages.filter(p=>
      p.title.toLowerCase().includes(search.toLowerCase())||
      p.content.toLowerCase().includes(search.toLowerCase())
    ).map(p=>({type:"note",label:p.title,sub:sec.name,preview:p.content.slice(0,60),icon:"📄"}))),
    ...(ideasData||[]).filter(i=>
      (i.text||i.title||"").toLowerCase().includes(search.toLowerCase())
    ).map(i=>({type:"idea",label:i.text||i.title,sub:"Ideas",preview:"",icon:"💡"})),
  ]:[];

  // Auto-tag — scans note content for keywords
  const autoTag=(content)=>{
    const tags=[];
    if(/goal|achieve|target|aim/i.test(content))tags.push("🎯 Goal");
    if(/idea|concept|thought|imagine/i.test(content))tags.push("💡 Idea");
    if(/meeting|call|schedule|agenda/i.test(content))tags.push("📅 Meeting");
    if(/project|plan|build|create/i.test(content))tags.push("🔨 Project");
    if(/learn|study|course|read/i.test(content))tags.push("📚 Learning");
    if(/health|exercise|workout|diet/i.test(content))tags.push("🌿 Health");
    if(/money|budget|finance|cost/i.test(content))tags.push("💰 Finance");
    return tags.slice(0,3);
  };

  // AI Morning Briefing
  const generateBriefing=async()=>{
    setBriefingLoading(true);setBriefingText("");
    const today=new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"});
    const priTasks=(priData||[]).flatMap(l=>l.tasks.filter(t=>!t.done).slice(0,3).map(t=>t.name));
    const matrixDo=(matrixData||[]).filter(t=>t.quad==="do").slice(0,3).map(t=>t.text);
    const recentNotes=data.flatMap(s=>s.pages).sort((a,b)=>(b.updated||0)-(a.updated||0)).slice(0,3).map(p=>p.title);
    const nextGoal=(goalsData||[]).filter(g=>g.status!=="done").slice(0,1).map(g=>g.title)[0];
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,messages:[{role:"user",content:`Create a warm, personal morning briefing for today (${today}). Tone: gentle, motivating, like a trusted personal assistant speaking naturally.

Agenda items:
- Top priority tasks: ${priTasks.join(", ")||"none yet"}
- Urgent & Important: ${matrixDo.join(", ")||"none yet"}
- Recent notes: ${recentNotes.join(", ")||"none yet"}
- Active goal: ${nextGoal||"none set"}

Write 3-4 short paragraphs: (1) warm greeting with day/date, (2) what's on the agenda today, (3) a gentle idea or reflection linked to their current work, (4) a one-sentence encouragement. Keep it under 250 words. No bullet points, just flowing warm prose.`}]})
      });
      setBriefingText(j.content?.[0]?.text||"Could not generate — please try again.");
    }catch{setBriefingText("AI unavailable — please try again.");}
    setBriefingLoading(false);
  };

  // AI Podcast from notes
  const generatePodcast=async()=>{
    setPodcastLoading(true);setPodcastText("");setPodcastSaved(false);
    const allContent=data.flatMap(s=>s.pages.map(p=>`${p.title}: ${p.content.slice(0,300)}`)).join("\n\n");
    const words=podcastLength==="short"?200:500;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:700,messages:[{role:"user",content:`Create a ${podcastLength==="short"?"60-second":"3-minute"} podcast-style spoken summary of these vault notes. Warm, conversational, like a friend sharing their notebook over coffee. No headers. Flowing narration only. Target ~${words} words.\n\n${allContent||"No notes yet — create a brief intro about starting a personal knowledge vault."}`}]})
      });
      setPodcastText(j.content?.[0]?.text||"Could not generate.");
    }catch{setPodcastText("AI unavailable.");}
    setPodcastLoading(false);
  };

  // PDF to Podcast
  const handlePdf=async(e)=>{
    const file=e.target.files[0];if(!file)return;
    setPdfFile(file);setPdfPodcast("");setPdfLoading(true);
    // Read PDF as text via FileReader (text extraction)
    const reader=new FileReader();
    reader.onload=async(ev)=>{
      const text=ev.target.result.slice(0,3000); // first 3000 chars
      try{
        const res=await fetch("https://api.anthropic.com/v1/messages",{
          method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
          body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:`Convert this PDF text into a warm, engaging 2-minute podcast script. Spoken naturally, no headers, flowing narration:\n\n${text}`}]})
        });
        setPdfPodcast(j.content?.[0]?.text||"Could not convert.");
      }catch{setPdfPodcast("AI unavailable.");}
      setPdfLoading(false);
    };
    reader.readAsText(file);
  };

  const savePodcastToVault=(text,title)=>{
    if(!text||!setIdeasData)return;
    setIdeasData(ds=>[{id:Date.now(),title:`🎙️ ${title}`,content:text,type:"podcast",tag:"🎙️ Podcast",created:Date.now()},...ds]);
    showToast("💾 Saved to Vault!");setPodcastSaved(true);
  };

  // Draggable section cards
  const SECTIONS=[
    {id:"notes",   icon:"📓", name:"Notes",          desc:`${totalPages} pages`,         color:"#5A7848",  action:()=>setNotesMode("notes")},
    {id:"ideas",   icon:"💡", name:"Ideas",          desc:`${totalIdeas} ideas`,          color:"#7A6038",  action:()=>setNotesMode("ideas")},
    {id:"filing",  icon:"🗄️", name:"Filing Cabinet", desc:`${totalDrawers} drawers`,      color:"#486878",  action:()=>setNotesMode("filing")},
    {id:"podcast", icon:"🎙️", name:"Podcast Recap",  desc:"AI voice summaries",          color:"#6A5870",  action:()=>setPodcastOpen(true)},
    {id:"briefing",icon:"☀️", name:"Morning Briefing",desc:"Personal AI assistant",     color:"#7A5838",  action:()=>{setBriefingOpen(true);generateBriefing();}},
    {id:"pdf",     icon:"📄", name:"PDF → Podcast",  desc:"Upload & convert",            color:"#486050",  action:()=>document.getElementById("vaultPdfIn").click()},
  ];
  const orderedSections=dragOrder.map(i=>SECTIONS[i]);

  return (
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:100}}>
      {/* Header */}
      <div style={{background:"rgba(248,245,236,0.92)",backdropFilter:"blur(16px)",padding:"18px 20px 14px",textAlign:"center",borderBottom:"1px solid rgba(90,80,60,0.08)",position:"sticky",top:0,zIndex:50}}>
        <button onClick={()=>setScreen&&setScreen("home")} style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{fontFamily:"Georgia,serif",fontSize:24,fontWeight:700,color:"#1A1A10",letterSpacing:-0.4}}>📚 The Vault</div>
        <div style={{fontSize:12,color:"#8A8070",marginTop:2}}>Your personal knowledge garden</div>
      </div>

      <div style={{padding:"14px 14px 0"}}>
        {/* Smart Search */}
        <div style={{background:"rgba(248,245,236,0.92)",borderRadius:100,padding:"12px 18px",marginBottom:14,border:"1px solid rgba(255,255,255,0.9)",boxShadow:"0 2px 10px rgba(0,0,0,0.05)",display:"flex",alignItems:"center",gap:10}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#8A8070" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="#8A8070" strokeWidth="2" strokeLinecap="round"/></svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search all notes, ideas, files…"
            style={{flex:1,border:"none",outline:"none",fontSize:14,color:"#1A1A10",background:"transparent"}}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:"#8A8070",fontSize:16}}>✕</button>}
        </div>

        {/* Search results */}
        {searchResults.length>0&&(
          <div style={{marginBottom:14}}>
            {searchResults.map((r,i)=>(
              <div key={i} style={{background:"rgba(248,245,236,0.90)",borderRadius:18,padding:"12px 16px",marginBottom:8,border:"1px solid rgba(255,255,255,0.9)",boxShadow:"0 1px 8px rgba(0,0,0,0.04)"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:18}}>{r.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:14,color:"#1A1A10"}}>{r.label}</div>
                    <div style={{fontSize:11,color:"#8A8070"}}>{r.sub}{r.preview?` · ${r.preview}…`:""}</div>
                    {/* Auto-tags */}
                    <div style={{display:"flex",gap:4,marginTop:4,flexWrap:"wrap"}}>
                      {autoTag(r.preview).map(tag=>(
                        <span key={tag} style={{background:"rgba(90,120,72,0.10)",color:"#3A6020",borderRadius:100,padding:"2px 8px",fontSize:10,fontWeight:600}}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {search.trim().length>1&&searchResults.length===0&&(
          <div style={{textAlign:"center",color:"#8A8070",fontSize:13,marginBottom:14,fontFamily:"Georgia,serif"}}>No results for "{search}"</div>
        )}

        {/* Morning Briefing quick button */}
        <button onClick={()=>{setBriefingOpen(true);generateBriefing();}} style={{width:"100%",padding:"14px 18px",background:"linear-gradient(135deg,rgba(230,200,140,0.35),rgba(200,220,170,0.30))",border:"1.5px solid rgba(200,180,100,0.35)",borderRadius:22,marginBottom:14,display:"flex",alignItems:"center",gap:14,cursor:"pointer",boxShadow:"0 2px 12px rgba(160,140,60,0.12)",textAlign:"left"}}>
          <div style={{fontSize:30}}>☀️</div>
          <div>
            <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:16,color:"#1A1A10"}}>Today's Briefing</div>
            <div style={{fontSize:12,color:"#7A7050",marginTop:2}}>Your personal AI assistant — agenda, ideas & links</div>
          </div>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" style={{marginLeft:"auto",flexShrink:0}}><path d="M1 1l6 6-6 6" stroke="#8A8070" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>

        {/* Section cards — draggable grid */}
        <div style={{fontSize:11,color:"rgba(90,80,60,0.45)",textAlign:"center",marginBottom:10,letterSpacing:0.5}}>⠿ Hold to drag sections</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          {orderedSections.map((sec,idx)=>(
            <div key={sec.id}
              draggable
              onDragStart={()=>setDragIdx(idx)}
              onDragOver={e=>e.preventDefault()}
              onDrop={()=>{
                if(dragIdx===null||dragIdx===idx)return;
                const newOrder=[...dragOrder];
                [newOrder[dragIdx],newOrder[idx]]=[newOrder[idx],newOrder[dragIdx]];
                setDragOrder(newOrder);setDragIdx(null);
              }}
              onDragEnd={()=>setDragIdx(null)}
              onClick={sec.action}
              style={{
                background:"rgba(248,245,236,0.88)",
                borderRadius:22,padding:"16px 14px",
                border:"1px solid rgba(255,255,255,0.9)",
                boxShadow:dragIdx===idx?"0 8px 24px rgba(0,0,0,0.12)":"0 2px 12px rgba(0,0,0,0.05)",
                cursor:"pointer",
                transform:dragIdx===idx?"scale(1.04)":"scale(1)",
                transition:"all 0.15s",
                display:"flex",flexDirection:"column",gap:8,
                minHeight:100,
                position:"relative",
              }}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
                <div style={{width:46,height:46,borderRadius:14,background:sec.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:`0 3px 10px ${sec.color}55`}}>
                  {sec.icon}
                </div>
                <div style={{opacity:0.3}}>
                  <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="3.5" cy="3.5" r="1.2" fill="#3A3020"/><circle cx="8.5" cy="3.5" r="1.2" fill="#3A3020"/><circle cx="3.5" cy="8.5" r="1.2" fill="#3A3020"/><circle cx="8.5" cy="8.5" r="1.2" fill="#3A3020"/></svg>
                </div>
              </div>
              <div style={{fontWeight:700,fontSize:14,color:"#1A1A10",lineHeight:1.2}}>{sec.name}</div>
              <div style={{fontSize:11,color:"#8A8070"}}>{sec.desc}</div>
            </div>
          ))}
        </div>

        {/* Hidden PDF input */}
        <input id="vaultPdfIn" type="file" accept=".pdf,.txt" style={{display:"none"}} onChange={handlePdf}/>
      </div>

      {/* ── MORNING BRIEFING MODAL ── */}
      {briefingOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setBriefingOpen(false)}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"88vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.18)"}}/></div>
            <div style={{padding:"0 20px 12px",flexShrink:0}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
                <span style={{fontSize:28}}>☀️</span>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:20}}>Today's Briefing</div>
                <button onClick={generateBriefing} disabled={briefingLoading} style={{marginLeft:"auto",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",opacity:briefingLoading?0.6:1}}>
                  {briefingLoading?"…":"Refresh"}
                </button>
              </div>
              <div style={{fontSize:12,color:"#8A8070"}}>
                {new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
              </div>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
              {briefingLoading&&(
                <div style={{textAlign:"center",padding:"40px 0",color:"#5A7848"}}>
                  <div style={{fontSize:32,marginBottom:12}}>🌿</div>
                  <div style={{fontFamily:"Georgia,serif",fontSize:15}}>Preparing your briefing…</div>
                </div>
              )}
              {briefingText&&!briefingLoading&&(
                <>
                  <div style={{background:"rgba(90,120,72,0.06)",borderRadius:20,padding:"18px 20px",border:"1px solid rgba(90,120,72,0.12)",marginBottom:14}}>
                    <div style={{fontFamily:"Georgia,serif",fontSize:14,color:"#1A2810",lineHeight:1.85}}>{briefingText}</div>
                  </div>
                  {/* Quick links */}
                  <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,color:"#1A1A10",marginBottom:10}}>Jump to:</div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
                    {[
                      {label:"📋 Prioritizer",screen:"prioritizer"},
                      {label:"🎯 Goals",screen:"goals"},
                      {label:"⚡ Matrix",screen:"matrix"},
                      {label:"🍽️ Meals",screen:"meals"},
                    ].map(link=>(
                      <button key={link.screen} onClick={()=>{setBriefingOpen(false);setScreen&&setScreen(link.screen);}} style={{background:"rgba(90,120,72,0.10)",color:"#3A6020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"9px 14px",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                        {link.label}
                      </button>
                    ))}
                    <a href="https://calendar.google.com" target="_blank" rel="noreferrer" style={{background:"rgba(90,120,72,0.10)",color:"#3A6020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"9px 14px",fontSize:13,fontWeight:600,cursor:"pointer",textDecoration:"none"}}>
                      📅 Calendar
                    </a>
                  </div>
                  <button onClick={()=>savePodcastToVault(briefingText,"Morning Briefing")} style={{width:"100%",padding:"13px",background:"rgba(90,120,72,0.10)",color:"#3A6020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,fontWeight:600,fontSize:14,cursor:"pointer",marginBottom:8}}>
                    💾 Save to Vault
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── PODCAST RECAP MODAL ── */}
      {podcastOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setPodcastOpen(false)}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"85vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.18)"}}/></div>
            <div style={{padding:"0 20px 12px",flexShrink:0}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:20,marginBottom:4}}>🎙️ Podcast Recap</div>
              <div style={{color:"#8A8070",fontSize:13,marginBottom:14}}>AI voice summary of your entire Vault</div>
              <div style={{display:"flex",gap:8,marginBottom:14}}>
                {[{k:"short",l:"Short",d:"~60 sec"},{k:"detailed",l:"Detailed",d:"~3 min"}].map(o=>(
                  <button key={o.k} onClick={()=>setPodcastLength(o.k)} style={{flex:1,padding:"11px",borderRadius:16,border:`2px solid ${podcastLength===o.k?"#5A7848":"rgba(90,80,60,0.15)"}`,background:podcastLength===o.k?"rgba(90,120,72,0.10)":"rgba(255,255,255,0.8)",cursor:"pointer"}}>
                    <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,color:podcastLength===o.k?"#3A6020":"#1A1A10"}}>{o.l}</div>
                    <div style={{fontSize:11,color:"#8A8070",marginTop:2}}>{o.d}</div>
                  </button>
                ))}
              </div>
              {!podcastText&&<button onClick={generatePodcast} disabled={podcastLoading} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#3E6828,#5E9040)",color:"#fff",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,cursor:"pointer",opacity:podcastLoading?0.7:1}}>
                {podcastLoading?"🌿 Generating…":"🎙️ Generate from Vault"}
              </button>}
            </div>
            {podcastText&&(
              <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
                <div style={{background:"rgba(90,120,72,0.06)",borderRadius:20,padding:"16px 18px",border:"1px solid rgba(90,120,72,0.12)",marginBottom:12}}>
                  <div style={{fontFamily:"Georgia,serif",fontSize:13,color:"#1A2810",lineHeight:1.85}}>{podcastText}</div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>savePodcastToVault(podcastText,"Vault Podcast Recap")} disabled={podcastSaved} style={{flex:1,padding:"13px",background:podcastSaved?"rgba(90,120,72,0.12)":"#5A7848",color:podcastSaved?"#5A7848":"#fff",border:podcastSaved?"1.5px solid rgba(90,120,72,0.3)":"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:podcastSaved?"default":"pointer"}}>
                    {podcastSaved?"✅ Saved":"💾 Save to Vault"}
                  </button>
                  <button onClick={()=>{setPodcastText("");setPodcastSaved(false);}} style={{padding:"13px 18px",background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,fontWeight:600,fontSize:14,cursor:"pointer"}}>Redo</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PDF PODCAST RESULT ── */}
      {(pdfLoading||pdfPodcast)&&(
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>{setPdfPodcast("");setPdfFile(null);}}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"85vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.18)"}}/></div>
            <div style={{padding:"0 20px 14px",flexShrink:0}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:20,marginBottom:4}}>📄 PDF → Podcast</div>
              <div style={{color:"#8A8070",fontSize:13}}>{pdfFile?.name}</div>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
              {pdfLoading&&<div style={{textAlign:"center",padding:"32px 0",color:"#5A7848",fontFamily:"Georgia,serif",fontSize:15}}>🌿 Converting to podcast…</div>}
              {pdfPodcast&&!pdfLoading&&(
                <>
                  <div style={{background:"rgba(90,120,72,0.06)",borderRadius:20,padding:"16px 18px",border:"1px solid rgba(90,120,72,0.12)",marginBottom:12}}>
                    <div style={{fontFamily:"Georgia,serif",fontSize:13,color:"#1A2810",lineHeight:1.85}}>{pdfPodcast}</div>
                  </div>
                  <div style={{display:"flex",gap:10}}>
                    <button onClick={()=>savePodcastToVault(pdfPodcast,pdfFile?.name||"PDF Podcast")} style={{flex:1,padding:"13px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:"pointer"}}>💾 Save to Vault</button>
                    <button onClick={()=>{setPdfPodcast("");setPdfFile(null);}} style={{padding:"13px 18px",background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,fontWeight:600,fontSize:14,cursor:"pointer"}}>Close</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:"rgba(42,56,28,0.92)",color:"#fff",borderRadius:100,padding:"11px 22px",fontWeight:700,fontSize:14,zIndex:500,whiteSpace:"nowrap",backdropFilter:"blur(8px)"}}>{toast}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MEAL PLANNER
═══════════════════════════════════════════════════════ */
const DEFAULT_DAY_LABELS=["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"];

function MealPlanner({data,setData,shopData,setShopData,setScreen}) {
  // data shape: { labels: ["Mon","Tue",...], days: [ [{id,text},...], ... ] }
  const init=()=>({
    labels:[...DEFAULT_DAY_LABELS],
    days:Array.from({length:7},()=>[]),
  });
  const plan = (data && data.labels) ? data : init();
  const save = (updated) => setData(updated);

  /* label editing */
  const [mealTab,setMealTab]=useState('week');
  const [recipes,setRecipes]=useState([]);
  const [addingRecipe,setAddingRecipe]=useState(false);
  const [recipeDetail,setRecipeDetail]=useState(null);
  const [recipeDraft,setRecipeDraft]=useState({name:'',description:'',ingredients:'',method:'',url:''});
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

  const openAddMeal=(dayIdx)=>{setEditMeal({dayIdx,mealId:null});setMealDraft("");setMealUrl("");};
  const openEditMeal=(dayIdx,meal)=>{setEditMeal({dayIdx,mealId:meal.id});setMealDraft(meal.text);setMealUrl(meal.url||"");};
  const saveMeal=()=>{
    if(!editMeal||!mealDraft.trim()){setEditMeal(null);setMealUrl("");return;}
    const days=plan.days.map((d,i)=>{
      if(i!==editMeal.dayIdx)return d;
      if(editMeal.mealId===null) return [...d,{id:Date.now(),text:mealDraft.trim(),url:mealUrl.trim()}];
      return d.map(m=>m.id===editMeal.mealId?{...m,text:mealDraft.trim(),url:mealUrl.trim()}:m);
    });
    save({...plan,days});
    setEditMeal(null);
  };
  const deleteMeal=(dayIdx,mealId)=>{
    const days=plan.days.map((d,i)=>i===dayIdx?d.filter(m=>m.id!==mealId):d);
    save({...plan,days});
  };

  const sendMealToShop=(meal,label)=>{
    if(!shopData||!setShopData)return;
    // Find or create a "Meal Plan" shopping list
    const existing=shopData.find(l=>l.name==="Meal Plan");
    const newItem={id:Date.now(),name:meal.text,qty:"1",unit:"",cat:"Fresh Food",note:label||"",url:meal.url||"",checked:false};
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
    const r=recipeDetail;
    return(
      <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
        <Header title={r.name} onBack={()=>setRecipeDetail(null)} right={
          <button onClick={()=>{setRecipes(rs=>rs.filter(x=>x.id!==r.id));setRecipeDetail(null);}} style={{background:"rgba(192,57,43,0.15)",color:"#c0392b",border:"1px solid rgba(192,57,43,0.3)",borderRadius:10,padding:"6px 12px",fontWeight:700,fontSize:13,cursor:"pointer"}}>🗑 Delete</button>
        }/>
        <div style={{padding:"16px 14px"}}>
          {r.url&&<div style={{marginBottom:12}}><UrlBadge url={r.url}/></div>}
          {r.ingredients&&<div style={{background:"rgba(248,245,236,0.92)",borderRadius:18,padding:"16px",marginBottom:12,border:"1px solid rgba(90,120,72,0.15)",boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
            <div style={{fontWeight:700,color:"#2A4020",fontSize:14,marginBottom:8}}>🥕 Ingredients</div>
            <div style={{fontSize:14,color:"#3A3020",lineHeight:1.8,whiteSpace:"pre-wrap"}}>{r.ingredients}</div>
          </div>}
          {r.method&&<div style={{background:"rgba(248,245,236,0.92)",borderRadius:18,padding:"16px",marginBottom:12,border:"1px solid rgba(90,120,72,0.15)",boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
            <div style={{fontWeight:700,color:"#2A4020",fontSize:14,marginBottom:8}}>👨‍🍳 Method</div>
            <div style={{fontSize:14,color:"#3A3020",lineHeight:1.8,whiteSpace:"pre-wrap"}}>{r.method}</div>
          </div>}
          {r.description&&<div style={{background:"rgba(248,245,236,0.92)",borderRadius:18,padding:"16px",border:"1px solid rgba(90,120,72,0.15)",boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
            <div style={{fontWeight:700,color:"#2A4020",fontSize:14,marginBottom:8}}>📝 Notes</div>
            <div style={{fontSize:14,color:"#3A3020",lineHeight:1.7,whiteSpace:"pre-wrap"}}>{r.description}</div>
          </div>}
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      {/* Header matching reference */}
      <div style={{background:"rgba(248,245,236,0.92)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",padding:"16px 20px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 1px 12px rgba(0,0,0,0.06)",position:"sticky",top:0,zIndex:50,borderBottom:"1px solid rgba(90,120,72,0.1)"}}>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",width:36,height:36,fontSize:22,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:10}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span style={{flex:1,color:"#1A1A10",fontFamily:"Georgia,serif",fontWeight:700,fontSize:20,textAlign:"center",letterSpacing:0.2}}>Meal Planner 🍽️</span>
        {/* Settings-style icon */}
        <button style={{background:"rgba(90,80,60,0.08)",border:"1px solid rgba(90,80,60,0.15)",borderRadius:"50%",width:36,height:36,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#5A5040",fontSize:15}}>⊙</button>
      </div>

      {/* Tabs — Week Plan | Recipes | Reset */}
      <div style={{padding:"14px 16px 8px",display:"flex",gap:8,alignItems:"center"}}>
        <button onClick={()=>setMealTab("week")} style={{
          background:mealTab==="week"?"#1A1A10":"rgba(248,245,236,0.88)",
          color:mealTab==="week"?"#fff":"#5A5040",
          border:mealTab==="week"?"none":"1.5px solid rgba(90,80,60,0.2)",
          borderRadius:100,padding:"10px 20px",
          fontWeight:700,fontSize:14,cursor:"pointer",
          boxShadow:mealTab==="week"?"0 2px 10px rgba(0,0,0,0.2)":"none",
          transition:"all 0.15s",
        }}>Week Plan</button>
        <button onClick={()=>setMealTab("recipes")} style={{
          background:mealTab==="recipes"?"#1A1A10":"rgba(248,245,236,0.88)",
          color:mealTab==="recipes"?"#fff":"#5A5040",
          border:mealTab==="recipes"?"none":"1.5px solid rgba(90,80,60,0.2)",
          borderRadius:100,padding:"10px 20px",
          fontWeight:700,fontSize:14,cursor:"pointer",
          boxShadow:mealTab==="recipes"?"0 2px 10px rgba(0,0,0,0.2)":"none",
          transition:"all 0.15s",
        }}>Recipes</button>
        <button onClick={()=>save(init())} style={{
          background:"rgba(248,245,236,0.88)",color:"#5A5040",
          border:"1.5px solid rgba(90,80,60,0.2)",
          borderRadius:100,padding:"10px 20px",
          fontWeight:700,fontSize:14,cursor:"pointer",
          marginLeft:"auto",
        }}>Reset</button>
      </div>

      {/* Recipes tab */}
      {mealTab==="recipes"&&(
        <div style={{padding:"8px 16px"}}>
          <button onClick={()=>setAddingRecipe(true)} style={{width:"100%",padding:"14px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontWeight:700,fontSize:15,cursor:"pointer",marginBottom:14,boxShadow:"0 3px 12px rgba(58,80,38,0.28)",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
            <span style={{fontSize:18}}>+</span> Add Recipe
          </button>
          {addingRecipe&&(
            <div style={{background:"rgba(248,245,236,0.95)",borderRadius:22,padding:"20px 18px",marginBottom:14,boxShadow:"0 4px 24px rgba(0,0,0,0.08)",border:"1px solid rgba(90,120,72,0.18)"}}>
              <div style={{fontWeight:700,color:"#2A4020",fontSize:15,marginBottom:12}}>📖 New Recipe</div>
              <input value={recipeDraft.name} onChange={e=>setRecipeDraft(d=>({...d,name:e.target.value}))} placeholder="Recipe name" style={{width:"100%",boxSizing:"border-box",padding:"12px 16px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.25)",fontSize:15,fontWeight:600,color:"#1A1A10",outline:"none",marginBottom:10,background:"rgba(255,255,255,0.9)"}}/>
              <UrlField value={recipeDraft.url} onChange={v=>setRecipeDraft(d=>({...d,url:v}))} style={{marginBottom:10}}/>
              <textarea value={recipeDraft.ingredients} onChange={e=>setRecipeDraft(d=>({...d,ingredients:e.target.value}))} placeholder="Ingredients (one per line)..." rows={4} style={{width:"100%",boxSizing:"border-box",padding:"12px 14px",borderRadius:16,border:"1.5px solid rgba(90,120,72,0.2)",fontSize:13,color:"#1A1A10",outline:"none",resize:"none",fontFamily:"inherit",marginBottom:10,background:"rgba(255,255,255,0.85)"}}/>
              <textarea value={recipeDraft.method} onChange={e=>setRecipeDraft(d=>({...d,method:e.target.value}))} placeholder="Method / steps..." rows={4} style={{width:"100%",boxSizing:"border-box",padding:"12px 14px",borderRadius:16,border:"1.5px solid rgba(90,120,72,0.2)",fontSize:13,color:"#1A1A10",outline:"none",resize:"none",fontFamily:"inherit",marginBottom:10,background:"rgba(255,255,255,0.85)"}}/>
              <textarea value={recipeDraft.description} onChange={e=>setRecipeDraft(d=>({...d,description:e.target.value}))} placeholder="Notes (optional)..." rows={2} style={{width:"100%",boxSizing:"border-box",padding:"12px 14px",borderRadius:16,border:"1.5px solid rgba(90,120,72,0.2)",fontSize:13,color:"#1A1A10",outline:"none",resize:"none",fontFamily:"inherit",marginBottom:14,background:"rgba(255,255,255,0.85)"}}/>
              <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                <button onClick={()=>{setAddingRecipe(false);setRecipeDraft({name:"",description:"",ingredients:"",method:"",url:""});}} style={{background:"transparent",color:"#8A8070",border:"none",fontWeight:600,cursor:"pointer",padding:"8px 16px"}}>Cancel</button>
                <button onClick={()=>{if(!recipeDraft.name.trim())return;setRecipes(rs=>[...rs,{id:Date.now(),...recipeDraft}]);setRecipeDraft({name:"",description:"",ingredients:"",method:"",url:""});setAddingRecipe(false);}} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"10px 24px",fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 3px 12px rgba(58,80,38,0.28)"}}>Save Recipe</button>
              </div>
            </div>
          )}
          {recipes.length===0&&!addingRecipe&&(
            <div style={{textAlign:"center",marginTop:60}}>
              <div style={{fontSize:52,marginBottom:12}}>📖</div>
              <div style={{color:"#8A8070",fontSize:15,marginBottom:6,fontFamily:"Georgia,serif"}}>No recipes yet</div>
              <div style={{color:"#A0907A",fontSize:13}}>Tap above to write your own or paste a link</div>
            </div>
          )}
          {recipes.map(r=>(
            <div key={r.id} onClick={()=>setRecipeDetail(r)} style={{background:"rgba(248,245,236,0.92)",borderRadius:20,padding:"14px 16px",marginBottom:10,boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid rgba(90,120,72,0.15)",cursor:"pointer",transition:"transform 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:42,height:42,borderRadius:12,background:"#5A7848",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🍽️</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:15,color:"#1A1A10"}}>{r.name}</div>
                  <div style={{fontSize:12,color:"#8A8070",marginTop:2}}>{r.ingredients?(r.ingredients.split("\n").filter(Boolean).length+" ingredients"):"Freewrite recipe"}{r.url&&" · 🔗 link"}</div>
                </div>
                <span style={{color:"#A0907A",fontSize:18}}>›</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Week tab — matching reference exactly */}
      {mealTab==="week"&&(
        <div style={{padding:"8px 16px"}}>
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
                        style={{background:"rgba(255,255,255,0.5)",border:`1.5px solid ${border}`,borderRadius:10,padding:"4px 12px",color:textCol,fontSize:16,fontWeight:800,outline:"none",width:"100%",boxSizing:"border-box"}}
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
                    background:"rgba(255,255,255,0.85)",
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
                      <div key={meal.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderTop:`1px solid ${border}`}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:textCol,flexShrink:0,opacity:0.6}}/>
                        <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:textCol,lineHeight:1.4}}>{meal.text}</div>{meal.url&&<UrlBadge url={meal.url}/>}</div>
                        <button onClick={()=>sendMealToShop(meal,label)} title="Shopping list" style={{background:"rgba(255,255,255,0.5)",color:textCol,border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🛒</button>
                        <button onClick={()=>scheduleMeal(meal,label)} title="Calendar" style={{background:"rgba(255,255,255,0.5)",color:textCol,border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>📅</button>
                        <button onClick={()=>openEditMeal(dayIdx,meal)} style={{background:"rgba(255,255,255,0.5)",color:textCol,border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✏️</button>
                        <button onClick={()=>deleteMeal(dayIdx,meal.id)} style={{background:"rgba(255,255,255,0.5)",color:"#c0392b",border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🗑</button>
                      </div>
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
   image/link per step, send to Calendar/Prioritizer/Matrix/MindMap
═══════════════════════════════════════════════════════ */
const IDEA_TAGS=["💡 Idea","📱 App","🎨 Creative","💰 Business","🔮 Spiritual","✍️ Writing","🏠 Home","Other"];
const TAG_COLORS={"💡 Idea":"#f39c12","📱 App":"#2980b9","🎨 Creative":"#5A7848","💰 Business":"#27ae60","🔮 Spiritual":"#8e44ad","✍️ Writing":"#c2185b","🏠 Home":"#e67e22","Other":"#7f8c8d"};
const STATUSES=[
  {key:"spark",   label:"✨ Spark",      color:"#f39c12"},
  {key:"develop", label:"🔧 Developing", color:"#2980b9"},
  {key:"ready",   label:"🚀 Ready",      color:"#27ae60"},
  {key:"done",    label:"✅ Done",       color:"#7f8c8d"},
];
const statusByKey=k=>STATUSES.find(s=>s.key===k)||STATUSES[0];

/* ── Mountain SVG — pct 0–100 shows climber progress ── */
function MountainProgress({pct=0,size=160}){
  const w=size,h=size*0.75;
  const summit={x:w/2,y:h*0.08};
  const baseL={x:0,y:h};
  const baseR={x:w,y:h};
  const slope1={x:w*0.22,y:h*0.55};
  const slope2={x:w*0.78,y:h*0.55};
  // Path along left slope: baseL → slope1 → summit
  const pathPts=[baseL,slope1,summit,slope2,baseR];
  // Climber position: interpolate along left slope 0%→summit→right slope 100%
  // 0% = baseL, 50% = summit, 100% = baseR
  let cx,cy;
  if(pct<=50){
    const t=pct/50;
    if(t<=0.4){
      const u=t/0.4;
      cx=baseL.x+(slope1.x-baseL.x)*u;
      cy=baseL.y+(slope1.y-baseL.y)*u;
    } else {
      const u=(t-0.4)/0.6;
      cx=slope1.x+(summit.x-slope1.x)*u;
      cy=slope1.y+(summit.y-slope1.y)*u;
    }
  } else {
    const t=(pct-50)/50;
    if(t<=0.6){
      const u=t/0.6;
      cx=summit.x+(slope2.x-summit.x)*u;
      cy=summit.y+(slope2.y-summit.y)*u;
    } else {
      const u=(t-0.6)/0.4;
      cx=slope2.x+(baseR.x-slope2.x)*u;
      cy=slope2.y+(baseR.y-slope2.y)*u;
    }
  }
  const snowLine=h*0.25;
  const showFlag=pct>=100;
  return(
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display:"block"}}>
      <defs>
        <linearGradient id="skyG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2C3820"/>
          <stop offset="100%" stopColor="#3d1a6e"/>
        </linearGradient>
        <linearGradient id="mtG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c8d0e0"/>
          <stop offset="35%" stopColor="#8a9ab0"/>
          <stop offset="100%" stopColor="#5a6a80"/>
        </linearGradient>
        <linearGradient id="snowG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#dde8f0"/>
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width={w} height={h} fill="url(#skyG)" rx={12}/>
      {/* Stars */}
      {[...Array(12)].map((_,i)=>(
        <circle key={i} cx={(i*47+13)%w} cy={(i*31+8)%(h*0.6)} r={0.8} fill="white" opacity={0.6}/>
      ))}
      {/* Mountain body */}
      <polygon points={`${baseL.x},${baseL.y} ${slope1.x},${slope1.y} ${summit.x},${summit.y} ${slope2.x},${slope2.y} ${baseR.x},${baseR.y}`} fill="url(#mtG)"/>
      {/* Snow cap */}
      <polygon points={`${summit.x},${summit.y} ${summit.x-w*0.12},${snowLine} ${summit.x+w*0.12},${snowLine}`} fill="url(#snowG)" opacity={0.95}/>
      {/* Progress trail */}
      {pct>0&&(
        <polyline
          points={[baseL,slope1,summit].map(p=>`${p.x},${p.y}`).join(" ")}
          fill="none" stroke="#FF9100" strokeWidth={2.5} strokeDasharray="4,3"
          opacity={0.85} strokeLinecap="round"
        />
      )}
      {/* Flag at summit */}
      {showFlag&&(
        <g>
          <line x1={summit.x} y1={summit.y} x2={summit.x} y2={summit.y-18} stroke="#FF9100" strokeWidth={1.5}/>
          <polygon points={`${summit.x},${summit.y-18} ${summit.x+12},${summit.y-13} ${summit.x},${summit.y-8}`} fill="#FF9100"/>
        </g>
      )}
      {/* Climber */}
      {pct>0&&pct<100&&(
        <g transform={`translate(${cx},${cy})`}>
          <circle cx={0} cy={-12} r={4} fill="#FFD700" stroke="white" strokeWidth={1}/>
          <line x1={0} y1={-8} x2={0} y2={0} stroke="#FFD700" strokeWidth={2}/>
          <line x1={-4} y1={-5} x2={4} y2={-5} stroke="#FFD700" strokeWidth={1.5}/>
          <line x1={0} y1={0} x2={-3} y2={5} stroke="#FFD700" strokeWidth={1.5}/>
          <line x1={0} y1={0} x2={3} y2={5} stroke="#FFD700" strokeWidth={1.5}/>
        </g>
      )}
      {/* Base camp label */}
      <text x={w/2} y={h-4} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={8} fontWeight={700}>
        {pct===0?"BASE CAMP":pct>=100?"SUMMIT! 🎉":`${Math.round(pct)}% climbed`}
      </text>
    </svg>
  );
}

/* ── AI step generator ─────────────────────────────── */
async function aiGenerateSteps(goalText){
  const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
    body:JSON.stringify({
      model:"claude-sonnet-4-20250514",max_tokens:400,
      messages:[{role:"user",content:`Break this goal into 4–6 clear, actionable steps. Return ONLY a JSON array of strings (step descriptions). No markdown, no extra text.\n\nGoal: "${goalText}"`}]
    })
  });
  const txt=(j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim();
  return JSON.parse(txt);
}

async function aiGenerateMicroSteps(stepText){
  const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
    body:JSON.stringify({
      model:"claude-sonnet-4-20250514",max_tokens:300,
      messages:[{role:"user",content:`Break this step into 2–4 micro-tasks. Return ONLY a JSON array of strings. No markdown, no extra text.\n\nStep: "${stepText}"`}]
    })
  });
  const txt=(j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim();
  return JSON.parse(txt);
}

function mkStep(text){return{id:Date.now()+Math.random(),text,done:false,url:"",image:"",microSteps:[],microExpanded:false};}

/* ── Idea / Goal detail screen ─────────────────────── */
/* ── Seed to Tree SVG ───────────────────────────────── */
function SeedToTree({pct=0,size=160}){
  const w=size,h=size;
  const cx=w/2;
  // Stages: 0-20 seed, 20-40 sprout, 40-60 sapling, 60-80 young tree, 80-100 full tree
  const stage=pct<=0?0:pct<20?1:pct<40?2:pct<60?3:pct<80?4:5;
  const groundY=h*0.82;
  const trunkH=Math.max(0,(pct/100)*h*0.55);
  const trunkW=Math.max(3,4+(pct/100)*8);
  const canopyR=Math.max(0,(pct<40?0:(pct-40)/60)*h*0.32);
  const leafColor=pct<20?"#2d5a1b":pct<60?"#3d8b2f":"#27ae60";
  const trunkColor="#8b5e3c";
  
  return(
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display:"block"}}>
      <defs>
        <radialGradient id="skyGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#2C3820"/>
          <stop offset="100%" stopColor="#0a0118"/>
        </radialGradient>
        <radialGradient id="canopyGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor={pct>=100?"#52d45a":"#3d9b30"}/>
          <stop offset="100%" stopColor={pct>=100?"#27ae60":"#1e6b1a"}/>
        </radialGradient>
      </defs>
      
      {/* Sky */}
      <rect width={w} height={h} fill="url(#skyGrad)" rx={12}/>
      
      {/* Stars (fade as tree grows) */}
      {pct<80&&[...Array(10)].map((_,i)=>(
        <circle key={i} cx={(i*43+7)%w} cy={(i*29+5)%(h*0.6)} r={0.8} fill="white" opacity={(1-pct/100)*0.6}/>
      ))}
      
      {/* Ground */}
      <ellipse cx={cx} cy={groundY} rx={w*0.42} ry={h*0.06} fill="#2d5a1b" opacity={0.8}/>
      <rect x={w*0.08} y={groundY} width={w*0.84} height={h*0.18} fill="#1a3a0a" rx={4}/>
      
      {/* Seed (stage 0-1) */}
      {stage<=1&&(
        <g>
          <ellipse cx={cx} cy={groundY-6} rx={7+pct*0.3} ry={5+pct*0.2} fill="#8b6914"/>
          {pct>5&&<line x1={cx} y1={groundY-10} x2={cx} y2={groundY-16} stroke="#27ae60" strokeWidth={1.5} strokeLinecap="round"/>}
        </g>
      )}
      
      {/* Trunk */}
      {pct>5&&(
        <rect x={cx-trunkW/2} y={groundY-trunkH} width={trunkW} height={trunkH} fill={trunkColor} rx={trunkW/2}/>
      )}
      
      {/* Sprout leaves (stage 2) */}
      {stage===2&&(
        <g>
          <ellipse cx={cx-8} cy={groundY-trunkH*0.8} rx={10} ry={7} fill={leafColor} transform={`rotate(-30,${cx-8},${groundY-trunkH*0.8})`}/>
          <ellipse cx={cx+8} cy={groundY-trunkH*0.8} rx={10} ry={7} fill={leafColor} transform={`rotate(30,${cx+8},${groundY-trunkH*0.8})`}/>
        </g>
      )}
      
      {/* Sapling branches (stage 3) */}
      {stage===3&&(
        <g>
          <line x1={cx} y1={groundY-trunkH*0.6} x2={cx-18} y2={groundY-trunkH*0.75} stroke={trunkColor} strokeWidth={3} strokeLinecap="round"/>
          <line x1={cx} y1={groundY-trunkH*0.7} x2={cx+16} y2={groundY-trunkH*0.82} stroke={trunkColor} strokeWidth={2.5} strokeLinecap="round"/>
          <ellipse cx={cx-20} cy={groundY-trunkH*0.78} rx={12} ry={9} fill={leafColor}/>
          <ellipse cx={cx+18} cy={groundY-trunkH*0.85} rx={11} ry={8} fill={leafColor}/>
          <ellipse cx={cx} cy={groundY-trunkH} rx={14} ry={10} fill={leafColor}/>
        </g>
      )}
      
      {/* Full canopy (stage 4-5) */}
      {stage>=4&&canopyR>0&&(
        <g>
          {/* Branches */}
          <line x1={cx} y1={groundY-trunkH*0.5} x2={cx-canopyR*0.7} y2={groundY-trunkH*0.7} stroke={trunkColor} strokeWidth={4} strokeLinecap="round"/>
          <line x1={cx} y1={groundY-trunkH*0.6} x2={cx+canopyR*0.65} y2={groundY-trunkH*0.75} stroke={trunkColor} strokeWidth={3.5} strokeLinecap="round"/>
          <line x1={cx} y1={groundY-trunkH*0.75} x2={cx-canopyR*0.4} y2={groundY-trunkH*0.92} stroke={trunkColor} strokeWidth={3} strokeLinecap="round"/>
          {/* Canopy clusters */}
          <circle cx={cx-canopyR*0.6} cy={groundY-trunkH*0.78} r={canopyR*0.55} fill="url(#canopyGrad)"/>
          <circle cx={cx+canopyR*0.55} cy={groundY-trunkH*0.8} r={canopyR*0.5} fill="url(#canopyGrad)"/>
          <circle cx={cx} cy={groundY-trunkH-canopyR*0.3} r={canopyR*0.65} fill="url(#canopyGrad)"/>
          <circle cx={cx-canopyR*0.25} cy={groundY-trunkH-canopyR*0.1} r={canopyR*0.5} fill="url(#canopyGrad)"/>
          {/* Sparkles at 100% */}
          {pct>=100&&[...Array(6)].map((_,i)=>{
            const a=(i/6)*Math.PI*2;
            return(<circle key={i} cx={cx+Math.cos(a)*(canopyR+8)} cy={(groundY-trunkH-canopyR*0.2)+Math.sin(a)*(canopyR+8)} r={3} fill="#FFD700"/>);
          })}
        </g>
      )}
      
      {/* Label */}
      <text x={cx} y={h-4} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={8} fontWeight={700}>
        {pct===0?"seed 🌱":pct<20?"germinating":pct<40?"sprouting":pct<60?"sapling":pct<80?"growing":"🌳 full tree"}
      </text>
    </svg>
  );
}

const GOAL_HORIZONS=[
  {key:"week",  label:"Next Week",  icon:"📅", color:"#5A7848", grad:"linear-gradient(135deg,#3A5A28,#5A7848)", question:"What do you want to achieve by next week?",  days:7},
  {key:"month6",label:"6 Months",   icon:"🌱", color:"#27ae60", grad:"linear-gradient(135deg,#1e8449,#27ae60)", question:"Where do you want to be in 6 months?",        days:180},
  {key:"year1", label:"1 Year",     icon:"⭐", color:"#2980b9", grad:"linear-gradient(135deg,#1a5276,#2980b9)", question:"What will you have achieved in 1 year?",       days:365},
  {key:"year3", label:"3 Years",    icon:"🚀", color:"#8e44ad", grad:"linear-gradient(135deg,#4a148c,#8e44ad)", question:"Imagine your life in 3 years — what's changed?",days:1095},
  {key:"year5", label:"5 Years",    icon:"🏔️", color:"#c0392b", grad:"linear-gradient(135deg,#7d1a1a,#c0392b)", question:"What does your ideal life look like in 5 years?",days:1825},
];

const horizonByKey=k=>GOAL_HORIZONS.find(h=>h.key===k)||GOAL_HORIZONS[0];

function mkGoalSubtask(text=""){
  return {id:Date.now()+Math.random(),text,done:false,microSteps:[],microExpanded:false};
}
function mkGoal(horizon){
  const h=horizonByKey(horizon);
  const due=new Date();due.setDate(due.getDate()+h.days);
  return {id:Date.now(),horizon,title:"",description:"",dueDate:due.toISOString().slice(0,10),cover:null,links:[],subtasks:[],status:"active",created:Date.now()};
}

/* ── AI helpers ─────────────────────────────────────── */
function Goals({data,setData,priData,setPriData,matrixData,setMatrixData,notesData,setNotesData,mapData,setMapData,ideasData,setIdeasData,setScreen}){
  const [view,setView]=useState("garden"); // "garden"|"list"|"folders"
  const [activeHorizon,setActiveHorizon]=useState("all");
  const [detailId,setDetailId]=useState(null);
  const [search,setSearch]=useState("");
  const [podcastOpen,setPodcastOpen]=useState(false);
  const [podcastSrc,setPodcastSrc]=useState("goals"); // "goals"|"notes"|"tasks"|"all"
  const [podcastLength,setPodcastLength]=useState("short");
  const [podcastText,setPodcastText]=useState("");
  const [podcastLoading,setPodcastLoading]=useState(false);
  const [podcastSaved,setPodcastSaved]=useState(false);
  const [reviewOpen,setReviewOpen]=useState(null);
  const [reviewPrompts,setReviewPrompts]=useState([]);
  const [reviewLoading,setReviewLoading]=useState(false);
  const [reviewAnswers,setReviewAnswers]=useState({});
  const [futureLetterGoalId,setFutureLetterGoalId]=useState(null);
  const [nurseOpen,setNurseOpen]=useState(false);
  const [nurseLoading,setNurseLoading]=useState(false);
  const [nurseSuggestions,setNurseSuggestions]=useState([]);
  const [toast,setToast]=useState("");
  const showToast=m=>{setToast(m);setTimeout(()=>setToast(""),2400);};

  // ── GOAL STAGES (seed→sprout→grow→bloom→harvest) ──────
  const STAGES=["🌱 Seed","🌿 Sprout","🌳 Grow","🌸 Bloom","🌾 Harvest"];
  const pctToStage=pct=>pct===0?0:pct<25?1:pct<50?2:pct<75?3:pct<100?4:5;

  // ── PLANT TYPES by horizon ─────────────────────────────
  const plantType=horizon=>{
    if(horizon==="week") return {name:"herb",desc:"Quick herb"};
    if(horizon==="month6") return {name:"shrub",desc:"Growing shrub"};
    if(horizon==="year1") return {name:"tree",desc:"Young tree"};
    if(horizon==="year3") return {name:"oak",desc:"Strong oak"};
    return {name:"redwood",desc:"Ancient redwood"};
  };

  // ── AUTO-TAGGING — uses user's own goals/habits as keywords ──
  const userKeywords=useMemo(()=>{
    const words=new Set();
    data.forEach(g=>{
      (g.title||"").split(/\s+/).filter(w=>w.length>4).forEach(w=>words.add(w.toLowerCase()));
    });
    (priData||[]).flatMap(l=>l.tasks||[]).forEach(t=>{
      (t.name||"").split(/\s+/).filter(w=>w.length>4).forEach(w=>words.add(w.toLowerCase()));
    });
    return words;
  },[data,priData]);

  const autoTag=text=>{
    const t=(text||"").toLowerCase();
    const tags=[];
    // User's own keywords first
    for(const kw of userKeywords){if(t.includes(kw)){tags.push("🔑 "+kw.charAt(0).toUpperCase()+kw.slice(1));if(tags.length>=2)break;}}
    // Category keywords
    if(!tags.length||tags.length<2){
      if(/health|fitness|run|gym|sleep|diet|body|mind|mental/.test(t))tags.push("🌿 Health");
      if(/career|job|work|business|money|finance|income|earn/.test(t))tags.push("💼 Career");
      if(/learn|study|course|skill|read|book|practice/.test(t))tags.push("📚 Learning");
      if(/relationship|family|friend|love|connect|social/.test(t))tags.push("❤️ People");
      if(/travel|adventure|visit|explore|trip/.test(t))tags.push("✈️ Travel");
      if(/create|build|make|art|music|write|design/.test(t))tags.push("🎨 Creative");
      if(/habit|routine|daily|every|morning|evening/.test(t))tags.push("🔄 Habit");
    }
    return tags.slice(0,2);
  };

  // ── SMART SEARCH — across ALL tools ───────────────────
  const searchAll=useMemo(()=>{
    if(search.trim().length<2) return [];
    const q=search.toLowerCase();
    const results=[];
    // Goals
    data.forEach(g=>{
      if((g.title||"").toLowerCase().includes(q)||(g.description||"").toLowerCase().includes(q))
        results.push({type:"goal",icon:"🎯",label:g.title,sub:horizonByKey(g.horizon).label,id:g.id,action:()=>setDetailId(g.id)});
    });
    // Tasks from Prioritizer
    (priData||[]).flatMap(l=>(l.tasks||[]).map(t=>({...t,listName:l.name}))).forEach(t=>{
      if((t.name||"").toLowerCase().includes(q))
        results.push({type:"task",icon:"📋",label:t.name,sub:t.listName,action:()=>setScreen("prioritizer")});
    });
    // Matrix tasks
    (matrixData||[]).forEach(t=>{
      if((t.text||"").toLowerCase().includes(q))
        results.push({type:"matrix",icon:"🎯",label:t.text,sub:"Matrix",action:()=>setScreen("matrix")});
    });
    // Notes
    (notesData||[]).flatMap(s=>(s.pages||[]).map(p=>({...p,section:s.name}))).forEach(p=>{
      if((p.title||"").toLowerCase().includes(q)||(p.content||"").toLowerCase().includes(q))
        results.push({type:"note",icon:"📄",label:p.title,sub:p.section,preview:(p.content||"").slice(0,50),action:()=>setScreen("notes")});
    });
    // Mind maps
    (mapData||[]).forEach(m=>{
      if((m.name||"").toLowerCase().includes(q)||(m.nodes||[]).some(n=>(n.text||"").toLowerCase().includes(q)))
        results.push({type:"mindmap",icon:"🧠",label:m.name,sub:"Mind Map",action:()=>setScreen("mindmap")});
    });
    // Ideas
    (ideasData||[]).forEach(i=>{
      if((i.text||i.title||"").toLowerCase().includes(q)||(i.content||"").toLowerCase().includes(q))
        results.push({type:"idea",icon:"💡",label:i.text||i.title,sub:"Ideas",action:()=>setScreen("notes")});
    });
    return results.slice(0,12);
  },[search,data,priData,matrixData,notesData,mapData,ideasData]);

  // ── GARDEN PLANT SVG (different types by horizon) ─────
  const GardenPlant=({pct,horizon="year1",size=56})=>{
    const stage=pct===0?0:pct<20?1:pct<40?2:pct<60?3:pct<80?4:pct<100?5:6;
    const pt=plantType(horizon);
    const leafColor=["#8B6914","#6AAA3A","#5A9A2A","#4A8A1A","#3A7A0A","#2A6A00","#1A5A00"][stage]||"#3A7A0A";
    const lightLeaf="#C8F098";
    const isTree=horizon==="year3"||horizon==="year5";
    const stemH=Math.max(8,stage*10);
    return(
      <svg width={size} height={size*1.4} viewBox="0 0 60 84" fill="none" style={{flexShrink:0}}>
        <defs>
          <linearGradient id={`pp${horizon}${pct}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={lightLeaf}/><stop offset="100%" stopColor={leafColor}/>
          </linearGradient>
          <filter id="ppf"><feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#1A3A08" floodOpacity="0.20"/></filter>
        </defs>
        {/* Soil */}
        <ellipse cx="30" cy="82" rx="14" ry="3.5" fill="#C8A870" opacity="0.35"/>
        {/* Stem */}
        {stage>=1&&<path d={`M30 82 Q${30+(isTree?2:0)} ${82-stemH*0.6} 30 ${82-stemH}`} stroke={leafColor} strokeWidth={isTree?3:2.2} fill="none" strokeLinecap="round"/>}
        {/* Seed */}
        {stage===0&&<ellipse cx="30" cy="79" rx="6" ry="4" fill="#C8A870" opacity="0.55"/>}
        {/* Stage 1 - first sprout */}
        {stage>=1&&<g filter="url(#ppf)">
          <path d={`M30 ${82-stemH} Q${20-stage} ${72-stemH} ${18-stage} ${62-stemH} Q${26} ${61-stemH} 30 ${74-stemH}Z`} fill={`url(#pp${horizon}${pct})`}/>
        </g>}
        {/* Stage 2+ - second leaf */}
        {stage>=2&&<g filter="url(#ppf)">
          <path d={`M30 ${78-stemH} Q${42+stage} ${68-stemH} ${44+stage} ${58-stemH} Q${36} ${57-stemH} 30 ${70-stemH}Z`} fill={leafColor} opacity="0.88"/>
        </g>}
        {/* Stage 3+ - more growth, tree trunk if tall */}
        {stage>=3&&isTree&&<rect x="27" y={`${82-stemH-10}`} width="6" height="12" rx="3" fill="#7A5A30" opacity="0.6"/>}
        {stage>=3&&<g filter="url(#ppf)">
          <path d={`M30 ${66-stemH} Q${16-stage} ${54-stemH} ${13-stage} ${42-stemH} Q${24} ${41-stemH} 30 ${56-stemH}Z`} fill={`url(#pp${horizon}${pct})`}/>
          <path d={`M30 ${70-stemH} Q${44+stage} ${56-stemH} ${47+stage} ${44-stemH} Q${38} ${43-stemH} 30 ${60-stemH}Z`} fill={leafColor} opacity="0.9"/>
        </g>}
        {/* Stage 4+ - canopy */}
        {stage>=4&&<g filter="url(#ppf)">
          <path d={`M30 ${50-stemH} Q${14-stage} ${36-stemH} ${11-stage} ${22-stemH} Q${23} ${20-stemH} 30 ${38-stemH}Z`} fill={`url(#pp${horizon}${pct})`}/>
          <path d={`M30 ${54-stemH} Q${46+stage} ${38-stemH} ${49+stage} ${24-stemH} Q${39} ${22-stemH} 30 ${42-stemH}Z`} fill={leafColor} opacity="0.92"/>
        </g>}
        {/* Stage 5 - near full bloom */}
        {stage>=5&&<g>
          <ellipse cx="30" cy={`${28-stemH}`} rx={isTree?14:10} ry={isTree?12:8} fill={`url(#pp${horizon}${pct})`} filter="url(#ppf)"/>
        </g>}
        {/* Stage 6 - HARVEST — golden flower */}
        {stage===6&&<g>
          <circle cx="30" cy={`${20-stemH}`} r="7" fill="#FFD700" opacity="0.95" filter="url(#ppf)"/>
          {[0,45,90,135,180,225,270,315].map((deg,i)=>{
            const r=deg*Math.PI/180;
            return <ellipse key={i} cx={30+Math.cos(r)*11} cy={(20-stemH)+Math.sin(r)*11} rx="4" ry="3" fill="#FFE080" opacity="0.88" transform={`rotate(${deg} ${30+Math.cos(r)*11} ${(20-stemH)+Math.sin(r)*11})`}/>;
          })}
        </g>}
        {/* Plant type label */}
        <text x="30" y="87" textAnchor="middle" fontSize="7" fill="#8A7060" fontWeight="600">
          {stage===0?"seed":stage===6?"✨ done":STAGES[Math.min(stage,4)]?.split(" ")[1]||"growing"}
        </text>
      </svg>
    );
  };

  // ── GOAL GARDEN OVERVIEW ───────────────────────────────
  const GoalGardenOverview=()=>{
    const allGoals=data.filter(g=>g.status!=="done"||true);
    const byStage=STAGES.map((_,si)=>allGoals.filter(g=>{
      const pct=g.subtasks.length>0?Math.round((g.subtasks.filter(s=>s.done).length/g.subtasks.length)*100):0;
      return pctToStage(pct)===si;
    }));
    return(
      <div style={{padding:"0 0 16px"}}>
        <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:18,color:"#1A1A10",marginBottom:4,textAlign:"center"}}>Goal Garden 🌻</div>
        <div style={{fontSize:12,color:"#8A8070",textAlign:"center",marginBottom:14}}>See all your goals growing together</div>
        {/* Garden bed SVG overview */}
        <div style={{background:"rgba(248,245,236,0.90)",borderRadius:24,padding:"16px",marginBottom:14,border:"1px solid rgba(255,255,255,0.9)",boxShadow:"0 2px 14px rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap",marginBottom:12}}>
            {allGoals.slice(0,12).map((g,i)=>{
              const pct=g.subtasks.length>0?Math.round((g.subtasks.filter(s=>s.done).length/g.subtasks.length)*100):0;
              const needsAttn=pct<25&&g.created<Date.now()-7*24*60*60*1000;
              return(
                <div key={g.id} onClick={()=>setDetailId(g.id)} title={g.title}
                  style={{cursor:"pointer",textAlign:"center",position:"relative",opacity:g.status==="done"?0.5:1}}>
                  <GardenPlant pct={pct} horizon={g.horizon} size={36}/>
                  {needsAttn&&<div style={{position:"absolute",top:-4,right:-4,width:10,height:10,borderRadius:"50%",background:"rgba(192,120,40,0.85)"}}/>}
                </div>
              );
            })}
            {allGoals.length===0&&<div style={{textAlign:"center",color:"#8A8070",padding:"20px 0",fontFamily:"Georgia,serif",fontSize:14}}>Plant your first goal below 🌱</div>}
          </div>
          {/* Stage legend */}
          <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
            {STAGES.map((s,i)=>(
              <div key={i} style={{fontSize:10,color:byStage[i].length>0?"#3A6020":"#9A9080",fontWeight:byStage[i].length>0?700:400,background:byStage[i].length>0?"rgba(90,120,72,0.10)":"transparent",borderRadius:100,padding:"2px 8px"}}>
                {s} ({byStage[i].length})
              </div>
            ))}
          </div>
        </div>
        {/* Needs attention */}
        {allGoals.filter(g=>{
          const pct=g.subtasks.length>0?Math.round((g.subtasks.filter(s=>s.done).length/g.subtasks.length)*100):0;
          return pct<25&&g.created<Date.now()-7*24*60*60*1000;
        }).length>0&&(
          <div style={{background:"rgba(200,170,100,0.12)",borderRadius:18,padding:"12px 16px",marginBottom:10,border:"1px solid rgba(200,170,100,0.25)"}}>
            <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:13,color:"#7A5820",marginBottom:6}}>🌦️ Needs a little attention</div>
            {allGoals.filter(g=>{
              const pct=g.subtasks.length>0?Math.round((g.subtasks.filter(s=>s.done).length/g.subtasks.length)*100):0;
              return pct<25&&g.created<Date.now()-7*24*60*60*1000;
            }).map(g=>(
              <div key={g.id} onClick={()=>setDetailId(g.id)} style={{fontSize:13,color:"#5A4020",padding:"4px 0",cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
                <GardenPlant pct={0} horizon={g.horizon} size={22}/>
                <span>{g.title||"(untitled)"}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── GARDEN FOLDERS ─────────────────────────────────────
  const FOLDER_STAGES=[
    {key:"seed",icon:"🌱",label:"Seed Ideas",desc:"Just planted — early stage"},
    {key:"growing",icon:"🌿",label:"Growing Projects",desc:"In progress — actively working"},
    {key:"harvest",icon:"🌾",label:"Harvested",desc:"Completed — done & celebrated"},
  ];
  const folderKey=g=>{
    const pct=g.subtasks.length>0?Math.round((g.subtasks.filter(s=>s.done).length/g.subtasks.length)*100):0;
    if(g.status==="done"||pct===100)return"harvest";
    if(pct>0)return"growing";
    return"seed";
  };

  // ── AUTO-UPDATE GROWTH from tasks/mindmaps ─────────────
  const autoProgress=useCallback(goalId=>{
    // Find linked tasks
    const goal=data.find(g=>g.id===goalId);
    if(!goal||!goal.linkedTasks)return;
    const linkedPri=(priData||[]).flatMap(l=>l.tasks||[]).filter(t=>goal.linkedTasks?.includes(t.id));
    if(linkedPri.length===0)return;
    const donePri=linkedPri.filter(t=>t.done).length;
    const pct=Math.round((donePri/linkedPri.length)*100);
    // Update goal subtasks to match linked task progress
    setData(ds=>ds.map(g=>{
      if(g.id!==goalId)return g;
      const updated=g.subtasks.map((s,i)=>linkedPri[i]?{...s,done:linkedPri[i].done}:s);
      return {...g,subtasks:updated};
    }));
  },[data,priData,setData]);

  // ── AI NOTE NURTURE ────────────────────────────────────
  const aiNurture=async()=>{
    setNurseLoading(true);setNurseSuggestions([]);setNurseOpen(true);
    const allNotes=(notesData||[]).flatMap(s=>(s.pages||[]).map(p=>({title:p.title,age:Date.now()-(p.updated||0),content:(p.content||"").slice(0,100)})));
    const oldNotes=allNotes.filter(n=>n.age>14*24*60*60*1000).slice(0,8);
    if(!oldNotes.length){setNurseSuggestions([{title:"No old notes yet",reason:"Keep writing — I'll suggest revisits as your notes age 🌱"}]);setNurseLoading(false);return;}
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,
          messages:[{role:"user",content:`These are notes the user hasn't touched in 2+ weeks. Suggest 3 gentle, specific reasons to revisit each. Return JSON array of objects: [{title, reason}]. Be warm and encouraging. No markdown.\n\nNotes: ${JSON.stringify(oldNotes.map(n=>({title:n.title,preview:n.content})))}`}]})
      });
      setNurseSuggestions(JSON.parse((j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim()));
    }catch{setNurseSuggestions([{title:"AI unavailable",reason:"Try again in a moment 🌿"}]);}
    setNurseLoading(false);
  };

  // ── AI PODCAST — from any source ──────────────────────
  const generatePodcast=async()=>{
    setPodcastLoading(true);setPodcastText("");setPodcastSaved(false);
    let content="";
    if(podcastSrc==="goals"||podcastSrc==="all"){
      content+=data.map(g=>{const pct=g.subtasks.length>0?Math.round((g.subtasks.filter(s=>s.done).length/g.subtasks.length)*100):0;return `Goal: ${g.title} (${horizonByKey(g.horizon).label}, ${pct}% done)`;}).join("\n");
    }
    if(podcastSrc==="notes"||podcastSrc==="all"){
      content+="\n"+(notesData||[]).flatMap(s=>(s.pages||[]).map(p=>`Note: ${p.title} — ${(p.content||"").slice(0,150)}`)).slice(0,5).join("\n");
    }
    if(podcastSrc==="tasks"||podcastSrc==="all"){
      content+="\n"+(priData||[]).flatMap(l=>(l.tasks||[]).filter(t=>!t.done).slice(0,5).map(t=>`Task: ${t.name}`)).join("\n");
    }
    const words=podcastLength==="short"?200:500;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:700,
          messages:[{role:"user",content:`Create a warm ${podcastLength==="short"?"60-second":"3-minute"} podcast-style spoken reflection. Tone: encouraging, personal, like a supportive friend. Flowing narration only, ~${words} words.\n\n${content||"Speak to the power of starting a goal-setting journey."}`}]})
      });
      setPodcastText(j.content?.[0]?.text||"Could not generate.");
    }catch{setPodcastText("AI unavailable — please try again.");}
    setPodcastLoading(false);
  };

  // ── AI QUARTERLY REVIEW ────────────────────────────────
  const generateReview=async(goal)=>{
    setReviewLoading(true);
    const pct=goal.subtasks.length>0?Math.round((goal.subtasks.filter(s=>s.done).length/goal.subtasks.length)*100):0;
    const prevReviews=(goal.quarterlyReviews||[]).slice(-2).map(r=>r.reflection?.slice(0,200)).join(" | ");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,
          messages:[{role:"user",content:`Create 4 soft, kind quarterly review prompts for this goal. Previous reflections: "${prevReviews}". Goal: "${goal.title}" (${pct}% complete, ${goal.horizon}). Make prompts that build on previous answers if available. Warm, compassionate tone. Return ONLY a JSON array of 4 strings.`}]})
      });
      setReviewPrompts(JSON.parse((j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim()));
    }catch{setReviewPrompts(["How do you feel about your progress so far?","What surprised you most?","What's been harder than expected?","What would you tell your past self?"]);}
    setReviewLoading(false);
  };

  // ── CONVERT NOTE → GOAL ────────────────────────────────
  const noteToGoal=note=>{
    const g=mkGoal("year1");
    g.title=note.title||"Goal from note";
    g.description=note.content?.slice(0,300)||"";
    setData(ds=>[...ds,g]);
    showToast("🎯 Note converted to goal!");
    setDetailId(g.id);
  };

  const h=horizonByKey(activeHorizon==="all"?"week":activeHorizon);
  const horizonGoals=activeHorizon==="all"?data:data.filter(g=>g.horizon===activeHorizon);
  const detail=data.find(g=>g.id===detailId);

  if(detail) return(
    <GoalEditor goal={detail} onBack={()=>setDetailId(null)}
      onUpdate={u=>setData(ds=>ds.map(g=>g.id===u.id?u:g))}
      onDelete={id=>{setData(ds=>ds.filter(g=>g.id!==id));setDetailId(null);}}
      priData={priData} setPriData={setPriData} matrixData={matrixData} setMatrixData={setMatrixData}/>
  );

  const addGoal=()=>{
    const hor=activeHorizon==="all"?"year1":activeHorizon;
    const g=mkGoal(hor);setData(ds=>[...ds,g]);setDetailId(g.id);
  };

  return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:100}}>

      {/* ── HEADER ── */}
      <div style={{background:"rgba(248,245,236,0.92)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",padding:"14px 20px",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid rgba(90,80,60,0.08)",position:"sticky",top:0,zIndex:50}}>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{flex:1,textAlign:"center",fontFamily:"Georgia,serif",fontSize:20,fontWeight:700,color:"#1A1A10"}}>Smart Goals 🌱</div>
        {/* View toggles */}
        <div style={{display:"flex",gap:4}}>
          {[["garden","🌻"],["list","☰"],["folders","🗂"]].map(([v,ic])=>(
            <button key={v} onClick={()=>setView(v)} style={{background:view===v?"rgba(90,120,72,0.18)":"transparent",border:"none",borderRadius:8,width:32,height:32,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{ic}</button>
          ))}
        </div>
      </div>

      <div style={{padding:"14px 14px 0"}}>

        {/* ── SMART SEARCH — all tools ── */}
        <div style={{background:"rgba(248,245,236,0.92)",borderRadius:100,padding:"11px 18px",marginBottom:12,border:"1px solid rgba(255,255,255,0.9)",boxShadow:"0 2px 8px rgba(0,0,0,0.05)",display:"flex",alignItems:"center",gap:10}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#8A8070" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="#8A8070" strokeWidth="2" strokeLinecap="round"/></svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search goals, tasks, notes, mind maps…"
            style={{flex:1,border:"none",outline:"none",fontSize:13,color:"#1A1A10",background:"transparent"}}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:"#8A8070",fontSize:16}}>✕</button>}
        </div>

        {/* Search results with type badges */}
        {search.trim().length>1&&(
          <div style={{marginBottom:12}}>
            {searchAll.length===0&&<div style={{textAlign:"center",color:"#8A8070",fontSize:13,fontFamily:"Georgia,serif",padding:"8px 0"}}>Nothing found across all your tools</div>}
            {searchAll.map((r,i)=>(
              <div key={i} onClick={r.action} style={{background:"rgba(248,245,236,0.90)",borderRadius:18,padding:"11px 14px",marginBottom:7,border:"1px solid rgba(255,255,255,0.9)",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:18}}>{r.icon}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:13,color:"#1A1A10",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.label}</div>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:2}}>
                    <span style={{fontSize:10,background:"rgba(90,120,72,0.10)",color:"#3A6020",borderRadius:100,padding:"1px 7px",fontWeight:600}}>{r.type}</span>
                    <span style={{fontSize:10,color:"#8A8070"}}>{r.sub}</span>
                    {autoTag(r.preview||r.label).map(t=><span key={t} style={{fontSize:10,background:"rgba(90,120,72,0.08)",color:"#5A7040",borderRadius:100,padding:"1px 7px"}}>{t}</span>)}
                  </div>
                </div>
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="#8A8070" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
            ))}
          </div>
        )}

        {/* ── ACTION ROW ── */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:7,marginBottom:14}}>
          {[
            {icon:"🎙️",label:"Podcast",action:()=>{setPodcastOpen(true);setPodcastText("");setPodcastSaved(false);}},
            {icon:"🍂",label:"Review",action:()=>{const g=data.filter(x=>x.status!=="done")[0];if(!g){showToast("Add a goal first!");return;}setReviewOpen(g.id);generateReview(g);setReviewAnswers({});}},
            {icon:"💌",label:"Letter",action:()=>{const g=data.filter(x=>x.status!=="done")[0];if(!g){showToast("Add a goal first!");return;}setFutureLetterGoalId(g.id);}},
            {icon:"🌿",label:"Nurture",action:aiNurture},
          ].map(b=>(
            <button key={b.label} onClick={b.action} style={{background:"rgba(248,245,236,0.88)",border:"1px solid rgba(255,255,255,0.9)",borderRadius:18,padding:"11px 6px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:5,boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
              <span style={{fontSize:20}}>{b.icon}</span>
              <span style={{fontSize:10,fontWeight:700,color:"#5A5040",letterSpacing:0.2}}>{b.label}</span>
            </button>
          ))}
        </div>

        {/* ── GARDEN VIEW ── */}
        {view==="garden"&&<GoalGardenOverview/>}

        {/* ── FOLDER VIEW ── */}
        {view==="folders"&&(
          <div style={{marginBottom:16}}>
            {FOLDER_STAGES.map(fs=>{
              const folderGoals=data.filter(g=>folderKey(g)===fs.key);
              return(
                <div key={fs.key} style={{marginBottom:14}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <span style={{fontSize:20}}>{fs.icon}</span>
                    <div>
                      <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,color:"#1A1A10"}}>{fs.label}</div>
                      <div style={{fontSize:11,color:"#8A8070"}}>{fs.desc} · {folderGoals.length} goal{folderGoals.length!==1?"s":""}</div>
                    </div>
                  </div>
                  {folderGoals.length===0&&<div style={{color:"#9A9080",fontSize:12,fontStyle:"italic",paddingLeft:28}}>None here yet</div>}
                  {folderGoals.map(g=>{
                    const pct=g.subtasks.length>0?Math.round((g.subtasks.filter(s=>s.done).length/g.subtasks.length)*100):0;
                    return(
                      <div key={g.id} onClick={()=>setDetailId(g.id)} style={{background:"rgba(248,245,236,0.88)",borderRadius:18,padding:"12px 14px",marginBottom:8,border:"1px solid rgba(255,255,255,0.9)",cursor:"pointer",display:"flex",alignItems:"center",gap:12,boxShadow:"0 1px 8px rgba(0,0,0,0.04)"}}>
                        <GardenPlant pct={pct} horizon={g.horizon} size={36}/>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:700,fontSize:14,color:"#1A1A10"}}>{g.title||"(untitled)"}</div>
                          <div style={{fontSize:11,color:"#5A7848",fontWeight:600}}>{STAGES[Math.min(pctToStage(pct),4)]||"🌱 Seed"} · {pct}%</div>
                        </div>
                        <div style={{fontSize:11,color:"#8A8070"}}>{plantType(g.horizon).desc}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Link notes to goals section */}
            {(notesData||[]).flatMap(s=>(s.pages||[])).slice(0,3).length>0&&(
              <div style={{background:"rgba(240,236,224,0.60)",borderRadius:20,padding:"14px 16px",border:"1px dashed rgba(90,80,60,0.15)"}}>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,color:"#1A1A10",marginBottom:8}}>📄 Link a note to a goal</div>
                {(notesData||[]).flatMap(s=>(s.pages||[]).map(p=>({...p,section:s.name}))).slice(0,4).map(p=>(
                  <div key={p.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                    <span style={{fontSize:14}}>📄</span>
                    <span style={{flex:1,fontSize:13,color:"#1A1A10"}}>{p.title}</span>
                    <button onClick={()=>noteToGoal(p)} style={{background:"rgba(90,120,72,0.12)",color:"#3A6020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>→ Goal</button>
                    <button onClick={()=>{setPriData(ls=>[{...ls[0],tasks:[...ls[0].tasks,{id:Date.now(),name:p.title,done:false,color:"lilac",url:""}]},...ls.slice(1)]);showToast("📋 Sent to Prioritizer!");}} style={{background:"rgba(90,120,72,0.08)",color:"#5A7040",border:"1px solid rgba(90,120,72,0.15)",borderRadius:100,padding:"4px 10px",fontSize:11,fontWeight:600,cursor:"pointer"}}>→ Task</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── LIST VIEW ── */}
        {view==="list"&&<>
          {/* Horizon filter pills */}
          <div style={{display:"flex",gap:7,marginBottom:12,overflowX:"auto",scrollbarWidth:"none",paddingBottom:2}}>
            {[{key:"all",label:"All"},...GOAL_HORIZONS.map(h=>({key:h.key,label:h.label}))].map(({key,label})=>(
              <button key={key} onClick={()=>setActiveHorizon(key)} style={{background:activeHorizon===key?"#5A7848":"rgba(248,245,236,0.88)",color:activeHorizon===key?"#fff":"#5A5040",border:"1.5px solid rgba(90,80,60,0.10)",borderRadius:100,padding:"8px 14px",fontSize:12,fontWeight:activeHorizon===key?700:500,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
                {label}
              </button>
            ))}
          </div>

          {/* Add goal button */}
          <button onClick={addGoal} style={{width:"100%",padding:"16px 24px",background:"linear-gradient(135deg,rgba(230,200,180,0.85) 0%,rgba(210,195,220,0.85) 40%,rgba(190,215,200,0.85) 70%,rgba(220,210,185,0.85) 100%)",color:"#2A1A08",border:"1.5px solid rgba(180,160,140,0.35)",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:600,fontSize:16,cursor:"pointer",marginBottom:20,display:"flex",alignItems:"center",justifyContent:"center",gap:12}}>
            <span style={{fontSize:18,fontWeight:300}}>+</span> New {activeHorizon==="all"?"Goal":h.label+" Goal"}
          </button>

          {horizonGoals.length===0&&(
            <div style={{textAlign:"center",padding:"24px 0 16px"}}>
              <GardenPlant pct={0} horizon={activeHorizon==="all"?"year1":activeHorizon} size={54}/>
              <div style={{fontFamily:"Georgia,serif",fontSize:17,color:"#2A1A08",textAlign:"center",lineHeight:1.6,maxWidth:260,margin:"14px auto 0"}}>
                {activeHorizon==="all"?"Plant your first goal 🌱":horizonByKey(activeHorizon)?.question}
              </div>
            </div>
          )}

          {horizonGoals.map(goal=>{
            const doneCount=goal.subtasks.filter(s=>s.done).length;
            const pct=goal.subtasks.length>0?Math.round((doneCount/goal.subtasks.length)*100):0;
            const stage=STAGES[Math.min(pctToStage(pct),4)]||"🌱 Seed";
            const tags=autoTag((goal.title||"")+" "+(goal.description||""));
            const pt=plantType(goal.horizon);
            const hasLetter=!!goal.futureLetter;
            const reviewCount=(goal.quarterlyReviews||[]).length;
            return(
              <div key={goal.id} onClick={()=>setDetailId(goal.id)}
                style={{background:"rgba(248,245,236,0.92)",borderRadius:24,marginBottom:12,overflow:"hidden",boxShadow:"0 2px 14px rgba(90,80,60,0.07)",border:"1.5px solid rgba(255,255,255,0.9)",cursor:"pointer",transition:"transform 0.15s"}}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                {goal.subtasks.length>0&&<div style={{height:4,background:"rgba(90,80,60,0.08)"}}><div style={{height:"100%",width:`${pct}%`,background:pct===100?"#5A7848":"#7A9A60",borderRadius:2,transition:"width 0.5s"}}/></div>}
                {goal.cover&&<img src={goal.cover} alt="" style={{width:"100%",height:70,objectFit:"cover"}}/>}
                <div style={{padding:"13px 14px",display:"flex",gap:12,alignItems:"flex-start"}}>
                  <GardenPlant pct={pct} horizon={goal.horizon} size={42}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,color:goal.status==="done"?"#9A9080":"#1A1A10",textDecoration:goal.status==="done"?"line-through":"none",marginBottom:3,lineHeight:1.35,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                      {goal.title||"(Tap to edit)"}
                    </div>
                    <div style={{fontSize:10,color:"#7A7060",marginBottom:5,fontWeight:500}}>{pt.desc} · {stage} · {pct}%</div>
                    <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                      {tags.map(t=><span key={t} style={{background:"rgba(90,120,72,0.10)",color:"#3A6020",borderRadius:100,padding:"2px 8px",fontSize:10,fontWeight:600}}>{t}</span>)}
                      {hasLetter&&<span style={{background:"rgba(180,140,220,0.12)",color:"#6A3A90",borderRadius:100,padding:"2px 8px",fontSize:10,fontWeight:600}}>💌</span>}
                      {reviewCount>0&&<span style={{background:"rgba(200,170,100,0.12)",color:"#7A5820",borderRadius:100,padding:"2px 8px",fontSize:10,fontWeight:600}}>🍂×{reviewCount}</span>}
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:4,flexShrink:0}} onClick={e=>e.stopPropagation()}>
                    <button onClick={()=>{setReviewOpen(goal.id);generateReview(goal);setReviewAnswers({});}} style={{background:"rgba(200,170,100,0.18)",border:"none",borderRadius:9,width:28,height:28,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}} title="Review">🍂</button>
                    <button onClick={()=>setFutureLetterGoalId(goal.id)} style={{background:"rgba(220,200,240,0.25)",border:"none",borderRadius:9,width:28,height:28,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}} title="Letter">💌</button>
                  </div>
                </div>
              </div>
            );
          })}
        </>}
      </div>

      {/* ── PODCAST MODAL ── */}
      {podcastOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setPodcastOpen(false)}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"85vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.18)"}}/></div>
            <div style={{padding:"0 20px 12px",flexShrink:0}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:19,marginBottom:10}}>🎙️ Podcast Recap</div>
              {/* Source selector */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginBottom:12}}>
                {[{k:"goals",l:"Goals"},{k:"notes",l:"Notes"},{k:"tasks",l:"Tasks"},{k:"all",l:"All"}].map(o=>(
                  <button key={o.k} onClick={()=>setPodcastSrc(o.k)} style={{padding:"9px 4px",borderRadius:14,border:`2px solid ${podcastSrc===o.k?"#5A7848":"rgba(90,80,60,0.12)"}`,background:podcastSrc===o.k?"rgba(90,120,72,0.10)":"rgba(255,255,255,0.8)",cursor:"pointer"}}>
                    <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:12,color:podcastSrc===o.k?"#3A6020":"#1A1A10",textAlign:"center"}}>{o.l}</div>
                  </button>
                ))}
              </div>
              {/* Length selector */}
              <div style={{display:"flex",gap:8,marginBottom:12}}>
                {[{k:"short",l:"Short",d:"~60 sec"},{k:"detailed",l:"Detailed",d:"~3 min"}].map(o=>(
                  <button key={o.k} onClick={()=>setPodcastLength(o.k)} style={{flex:1,padding:"11px",borderRadius:16,border:`2px solid ${podcastLength===o.k?"#5A7848":"rgba(90,80,60,0.12)"}`,background:podcastLength===o.k?"rgba(90,120,72,0.10)":"rgba(255,255,255,0.8)",cursor:"pointer"}}>
                    <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:13,color:podcastLength===o.k?"#3A6020":"#1A1A10"}}>{o.l}</div>
                    <div style={{fontSize:10,color:"#8A8070",marginTop:1}}>{o.d}</div>
                  </button>
                ))}
              </div>
              {!podcastText&&<button onClick={generatePodcast} disabled={podcastLoading} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#3E6828,#5E9040)",color:"#fff",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,cursor:"pointer",opacity:podcastLoading?0.7:1}}>
                {podcastLoading?"🌿 Generating…":"🎙️ Generate"}
              </button>}
            </div>
            {podcastText&&(
              <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
                <div style={{background:"rgba(90,120,72,0.06)",borderRadius:20,padding:"16px 18px",border:"1px solid rgba(90,120,72,0.12)",marginBottom:12}}>
                  <div style={{fontFamily:"Georgia,serif",fontSize:13,color:"#1A2810",lineHeight:1.85}}>{podcastText}</div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>{showToast("💾 Saved!");setPodcastSaved(true);}} disabled={podcastSaved} style={{flex:1,padding:"13px",background:podcastSaved?"rgba(90,120,72,0.12)":"#5A7848",color:podcastSaved?"#5A7848":"#fff",border:podcastSaved?"1.5px solid rgba(90,120,72,0.3)":"none",borderRadius:100,fontWeight:700,fontSize:14,cursor:podcastSaved?"default":"pointer"}}>
                    {podcastSaved?"✅ Saved":"💾 Save to Vault"}
                  </button>
                  <button onClick={()=>{setPodcastText("");setPodcastSaved(false);}} style={{padding:"13px 18px",background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,fontWeight:600,fontSize:14,cursor:"pointer"}}>Redo</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── QUARTERLY REVIEW MODAL ── */}
      {reviewOpen&&(()=>{
        const goal=data.find(g=>g.id===reviewOpen);if(!goal)return null;
        const pct=goal.subtasks.length>0?Math.round((goal.subtasks.filter(s=>s.done).length/goal.subtasks.length)*100):0;
        const prevReviews=goal.quarterlyReviews||[];
        return(
          <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setReviewOpen(null)}>
            <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"88vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(200,170,100,0.4)"}}/></div>
              <div style={{padding:"0 20px 12px",flexShrink:0}}>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:19,marginBottom:2}}>🍂 Quarterly Review</div>
                <div style={{color:"#8A8070",fontSize:12,marginBottom:6}}>{goal.title} · {pct}% complete · Review #{prevReviews.length+1}</div>
                {/* Show previous review snippets */}
                {prevReviews.length>0&&(
                  <div style={{background:"rgba(200,170,100,0.08)",borderRadius:14,padding:"10px 14px",marginBottom:10,border:"1px solid rgba(200,170,100,0.18)"}}>
                    <div style={{fontSize:10,fontWeight:700,color:"#7A5820",marginBottom:4,textTransform:"uppercase",letterSpacing:0.5}}>Last review — {prevReviews[prevReviews.length-1]?.date}</div>
                    <div style={{fontSize:12,color:"#5A4020",lineHeight:1.6,fontStyle:"italic"}}>{prevReviews[prevReviews.length-1]?.reflection?.slice(0,120)}…</div>
                  </div>
                )}
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
                {reviewLoading&&<div style={{textAlign:"center",padding:"32px 0",color:"#5A7848",fontFamily:"Georgia,serif",fontSize:14}}>🌿 Preparing your prompts…</div>}
                {reviewPrompts.map((prompt,i)=>(
                  <div key={i} style={{marginBottom:16}}>
                    <div style={{fontFamily:"Georgia,serif",fontSize:14,color:"#2A3820",marginBottom:8,lineHeight:1.55,fontStyle:"italic"}}>"{prompt}"</div>
                    <textarea value={reviewAnswers[i]||""} onChange={e=>setReviewAnswers(a=>({...a,[i]:e.target.value}))}
                      placeholder="Take a moment to reflect…" rows={3}
                      style={{width:"100%",boxSizing:"border-box",padding:"12px 16px",borderRadius:18,border:"1.5px solid rgba(90,120,72,0.15)",background:"rgba(248,245,236,0.85)",fontSize:13,color:"#1A1A10",outline:"none",resize:"none",fontFamily:"'Segoe UI',sans-serif",lineHeight:1.6}}/>
                  </div>
                ))}
                {reviewPrompts.length>0&&(
                  <button onClick={()=>{
                    const reflection=reviewPrompts.map((p,i)=>`Q: ${p}\nA: ${reviewAnswers[i]||"—"}`).join("\n\n");
                    setData(ds=>ds.map(g=>g.id===reviewOpen?{...g,quarterlyReviews:[...(g.quarterlyReviews||[]),{date:new Date().toISOString().slice(0,10),reflection}]}:g));
                    setReviewOpen(null);showToast("🍂 Review saved — your thinking is preserved!");
                  }} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#8A6030,#B08040)",color:"#fff",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,cursor:"pointer",marginBottom:8,boxShadow:"0 4px 14px rgba(120,90,30,0.22)"}}>
                    Save Reflection 🍂
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── FUTURE ME LETTER MODAL ── */}
      {futureLetterGoalId&&(()=>{
        const goal=data.find(g=>g.id===futureLetterGoalId);if(!goal)return null;
        const pct=goal.subtasks.length>0?Math.round((goal.subtasks.filter(s=>s.done).length/goal.subtasks.length)*100):0;
        const isLocked=goal.letterUnlockPct&&pct<goal.letterUnlockPct;
        return(
          <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(40,20,60,0.50)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setFutureLetterGoalId(null)}>
            <div style={{background:"rgba(252,248,245,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"88vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(180,140,220,0.35)"}}/></div>
              <div style={{padding:"0 20px 12px",flexShrink:0}}>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:19,marginBottom:2}}>💌 Letter to Future Me</div>
                <div style={{color:"#8A8070",fontSize:12,marginBottom:8}}>{goal.title}</div>
                {/* Unlock milestone setter */}
                <div style={{background:"rgba(220,200,240,0.15)",borderRadius:16,padding:"10px 14px",marginBottom:12,border:"1px solid rgba(180,140,220,0.2)"}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#6A3A90",marginBottom:6}}>🔒 Unlock this letter when:</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {[0,25,50,75,100].map(p=>(
                      <button key={p} onClick={()=>setData(ds=>ds.map(g=>g.id===futureLetterGoalId?{...g,letterUnlockPct:p}:g))}
                        style={{padding:"5px 12px",borderRadius:100,border:`1.5px solid ${goal.letterUnlockPct===p?"#6A3A90":"rgba(180,140,220,0.25)"}`,background:goal.letterUnlockPct===p?"rgba(180,140,220,0.18)":"transparent",cursor:"pointer",fontSize:11,fontWeight:600,color:goal.letterUnlockPct===p?"#6A3A90":"#8A8070"}}>
                        {p===0?"Always open":`${p}% done`}
                      </button>
                    ))}
                  </div>
                </div>
                {isLocked&&(
                  <div style={{background:"rgba(220,200,240,0.15)",borderRadius:16,padding:"16px",textAlign:"center",border:"1px dashed rgba(180,140,220,0.35)",marginBottom:12}}>
                    <div style={{fontSize:24,marginBottom:8}}>🔒</div>
                    <div style={{fontFamily:"Georgia,serif",fontSize:14,color:"#6A3A90"}}>This letter unlocks at {goal.letterUnlockPct}% complete</div>
                    <div style={{fontSize:12,color:"#8A8070",marginTop:4}}>You're at {pct}% — keep going 🌿</div>
                  </div>
                )}
              </div>
              {!isLocked&&(
                <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
                  <div style={{background:"rgba(230,210,245,0.20)",borderRadius:18,padding:"12px 16px",border:"1px solid rgba(180,140,220,0.18)",marginBottom:14}}>
                    <div style={{fontFamily:"Georgia,serif",fontSize:12,color:"#6A5080",lineHeight:1.7,fontStyle:"italic"}}>
                      Write to the version of yourself who has already achieved this goal. What do you want them to know? What are you feeling right now?
                    </div>
                  </div>
                  <textarea value={goal.futureLetter||""} onChange={e=>setData(ds=>ds.map(g=>g.id===futureLetterGoalId?{...g,futureLetter:e.target.value}:g))}
                    placeholder={"Dear Future Me,\n\nBy the time you read this, I hope you've…"}
                    rows={11}
                    style={{width:"100%",boxSizing:"border-box",padding:"16px 18px",borderRadius:22,border:"1.5px solid rgba(180,140,220,0.22)",background:"rgba(250,246,255,0.85)",fontSize:14,color:"#1A1A10",outline:"none",resize:"none",fontFamily:"Georgia,serif",lineHeight:1.75,marginBottom:12}}/>
                  <button onClick={()=>setFutureLetterGoalId(null)} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#5A3870,#8A5AAA)",color:"#fff",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,cursor:"pointer",boxShadow:"0 4px 14px rgba(90,40,140,0.22)"}}>
                    💌 Save Letter
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── NOTE NURTURE MODAL ── */}
      {nurseOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setNurseOpen(false)}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"80vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px",flexShrink:0}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,120,72,0.25)"}}/></div>
            <div style={{padding:"0 20px 12px",flexShrink:0}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:19,marginBottom:2}}>🌿 Note Nurture</div>
              <div style={{color:"#8A8070",fontSize:12}}>Notes you might want to revisit or expand</div>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
              {nurseLoading&&<div style={{textAlign:"center",padding:"32px 0",color:"#5A7848",fontFamily:"Georgia,serif",fontSize:14}}>🌿 Looking through your notes…</div>}
              {nurseSuggestions.map((s,i)=>(
                <div key={i} style={{background:"rgba(90,120,72,0.06)",borderRadius:20,padding:"14px 16px",marginBottom:10,border:"1px solid rgba(90,120,72,0.12)"}}>
                  <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,color:"#1A2810",marginBottom:4}}>{s.title}</div>
                  <div style={{fontSize:13,color:"#3A5020",lineHeight:1.6}}>{s.reason}</div>
                  <button onClick={()=>{setScreen("notes");setNurseOpen(false);}} style={{marginTop:8,background:"rgba(90,120,72,0.12)",color:"#3A6020",border:"none",borderRadius:100,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Open in Notes →</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:"rgba(42,56,28,0.92)",color:"#fff",borderRadius:100,padding:"11px 22px",fontWeight:700,fontSize:14,zIndex:500,whiteSpace:"nowrap",backdropFilter:"blur(8px)"}}>{toast}</div>}
    </div>
  );
}
/* ═══════════════════════════════════════════════════════
   ⚡ THE CHARGE  — Daily task challenge
   Orb of light reward · Overdue task puller · Streak tracker
═══════════════════════════════════════════════════════ */
const STALE_7=7*24*60*60*1000;
const todayStr=()=>new Date().toISOString().slice(0,10);

/* ── Orb of Light SVG ───────────────────────────────── */
function OrbOfLight({pct=0,size=130}){
  const cx=size/2,cy=size/2,maxR=size*0.36;
  const coreR=Math.max(size*0.05,maxR*(pct/100));
  const full=pct>=100;
  const col=pct===0?"#3d1a6e":pct<40?"#5A7848":pct<80?"#c4aee8":"#fff";
  return(
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{display:"block",overflow:"visible"}}>
      <defs>
        <radialGradient id="og" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor={full?"#fff":pct>50?"#e0d0ff":"#9060c0"}/>
          <stop offset="100%" stopColor={full?"#c4aee8":"#2C3820"}/>
        </radialGradient>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={pct>0?"rgba(160,190,140,0.25)":"rgba(0,0,0,0)"}/>
          <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation={pct>60?5:2.5}/></filter>
      </defs>
      {pct>0&&<circle cx={cx} cy={cy} r={maxR*1.7} fill="url(#halo)"/>}
      {pct>25&&Array.from({length:10}).map((_,i)=>{
        const a=(i/10)*Math.PI*2, d=coreR+6, len=maxR*(0.25+0.6*(pct/100));
        return <line key={i} x1={cx+Math.cos(a)*d} y1={cy+Math.sin(a)*d} x2={cx+Math.cos(a)*(d+len)} y2={cy+Math.sin(a)*(d+len)} stroke={full?"#fff":"#c4aee8"} strokeWidth={full?2:1} strokeLinecap="round" opacity={Math.min(0.8,(pct-25)/75)*0.7}/>;
      })}
      {pct>0&&<circle cx={cx} cy={cy} r={coreR*1.6} fill={`rgba(160,190,140,0.35)*0.25})`} filter="url(#glow)"/>}
      <circle cx={cx} cy={cy} r={Math.max(coreR,size*0.04)} fill="url(#og)"/>
      {pct>0&&<circle cx={cx-coreR*0.28} cy={cy-coreR*0.28} r={coreR*0.22} fill="rgba(255,255,255,0.5)"/>}
      {full&&[0,60,120,180,240,300].map((d,i)=>{
        const r=d*Math.PI/180;
        return <circle key={i} cx={cx+Math.cos(r)*maxR*1.15} cy={cy+Math.sin(r)*maxR*1.15} r={3.5} fill="#FFD700"/>;
      })}
      <text x={cx} y={size-6} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={8} fontWeight={700}>
        {pct===0?"unlit":pct<30?"spark":pct<60?"glowing":pct<90?"blazing":"✨ FULL LIGHT"}
      </text>
    </svg>
  );
}


function IdeaDetail({idea,onBack,onUpdate,priData,setPriData,mapData,setMapData,matrixData,setMatrixData,goalsData,setGoalsData}){
  const [aiLoading,setAiLoading]=useState(false);
  const [microLoading,setMicroLoading]=useState(null);
  const [newStepText,setNewStepText]=useState("");
  const [toast,setToast]=useState("");
  const [editStepId,setEditStepId]=useState(null);
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2200);};

  const steps=idea.steps||[];
  const doneCount=steps.filter(s=>s.done).length;
  const pct=steps.length>0?Math.round((doneCount/steps.length)*100):0;

  const upd=ch=>onUpdate({...idea,...ch});
  const updSteps=ss=>upd({steps:ss});

  const handleCover=e=>{
    const file=e.target.files[0];if(!file)return;
    const r=new FileReader();r.onload=ev=>upd({cover:ev.target.result});r.readAsDataURL(file);
  };

  const toggleStep=id=>updSteps(steps.map(s=>s.id===id?{...s,done:!s.done}:s));
  const delStep=id=>updSteps(steps.filter(s=>s.id!==id));
  const addStep=()=>{if(!newStepText.trim())return;updSteps([...steps,mkStep(newStepText.trim())]);setNewStepText("");};
  const patchStep=(id,ch)=>updSteps(steps.map(s=>s.id===id?{...s,...ch}:s));

  const handleStepImg=(id,e)=>{
    const file=e.target.files[0];if(!file)return;
    const r=new FileReader();r.onload=ev=>patchStep(id,{image:ev.target.result});r.readAsDataURL(file);
  };

  const generateSteps=async()=>{
    setAiLoading(true);
    try{const ss=await aiGenerateSteps(idea.text);updSteps([...steps,...ss.map(t=>mkStep(t))]);}
    catch{showToast("AI error — try again");}
    setAiLoading(false);
  };

  const generateMicro=async(step)=>{
    setMicroLoading(step.id);
    try{
      const ms=await aiGenerateMicroSteps(step.text);
      patchStep(step.id,{microSteps:ms.map(t=>({id:Date.now()+Math.random(),text:t,done:false})),microExpanded:true});
    }catch{showToast("AI error — try again");}
    setMicroLoading(null);
  };

  const sendStepTo=(step,dest,extra)=>{
    if(dest==="cal"){
      window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("🏔️ "+step.text)}`,"_blank");
    } else if(dest==="pri"&&extra){
      setPriData(ls=>ls.map(l=>l.id===extra?{...l,tasks:[...l.tasks,{id:Date.now(),name:step.text,done:false,color:"lilac",url:""}]}:l));
      showToast("✅ Added to Prioritizer!");
    } else if(dest==="matrix"&&extra){
      setMatrixData(ds=>[...ds,{id:Date.now(),text:step.text,quad:extra,created:Date.now(),touched:Date.now(),url:""}]);
      showToast("🎯 Added to Matrix!");
    } else if(dest==="map"){
      const root={id:Date.now(),text:step.text,x:0,y:0,parent:null,color:"crystal"};
      setMapData(ms=>[...ms,{id:Date.now()+1,name:step.text,nodes:[root]}]);
      showToast("🧠 Mind map created!");
    }
  };

  const [sendMenuStep,setSendMenuStep]=useState(null);
  const tc=TAG_COLORS[idea.tag]||C.pp;
  const st=statusByKey(idea.status);

  return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>

      {/* ── Header bar ── */}
      <div style={{background:`linear-gradient(135deg,${TAG_COLORS[idea.tag]||C.pp},${C.dp})`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 4px 20px rgba(0,0,0,0.25)"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.18)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
        <span style={{color:"#1A1A10",fontWeight:900,fontSize:17,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{idea.text.slice(0,30)+(idea.text.length>30?"…":"")}</span>
        <button onClick={()=>upd({status:idea.status==="done"?"spark":"done"})} style={{background:idea.status==="done"?"rgba(39,174,96,0.5)":"rgba(255,255,255,0.18)",color:"#1A1A10",border:`1.5px solid ${idea.status==="done"?"#27ae60":"rgba(255,255,255,0.3)"}`,borderRadius:20,padding:"6px 12px",fontWeight:800,fontSize:12,cursor:"pointer",flexShrink:0}}>
          {idea.status==="done"?"✅ Done":"Mark done"}
        </button>
      </div>

      <div style={{padding:"16px 14px"}}>

        {/* ── COVER PHOTO — prominent in-content block ── */}
        <GlassCard style={{marginBottom:14,padding:0,overflow:"hidden"}}>
          {idea.cover?(
            <div style={{position:"relative"}}>
              <img src={idea.cover} alt="" style={{width:"100%",height:180,objectFit:"cover",display:"block"}}/>
              <div style={{position:"absolute",bottom:10,right:10,display:"flex",gap:8}}>
                <label style={{background:"rgba(0,0,0,0.55)",color:"#1A1A10",borderRadius:20,padding:"7px 14px",fontSize:13,fontWeight:800,cursor:"pointer",backdropFilter:"blur(4px)",border:"1.5px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",gap:6}}>
                  📸 Change photo
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={handleCover}/>
                </label>
                <button onClick={()=>upd({cover:null})} style={{background:"rgba(192,57,43,0.75)",color:"#1A1A10",border:"none",borderRadius:20,padding:"7px 12px",fontSize:13,fontWeight:800,cursor:"pointer"}}>✕ Remove</button>
              </div>
            </div>
          ):(
            <label style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,height:130,background:`linear-gradient(135deg,${TAG_COLORS[idea.tag]||C.pp},${TAG_COLORS[idea.tag]||C.pp})`,border:`2.5px dashed ${TAG_COLORS[idea.tag]||C.pp}`,borderRadius:16,cursor:"pointer",transition:"all 0.2s"}}>
              <div style={{width:52,height:52,borderRadius:14,background:`linear-gradient(135deg,${TAG_COLORS[idea.tag]||C.pp},${C.dp})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:`0 4px 14px ${TAG_COLORS[idea.tag]||C.pp}`}}>📸</div>
              <div style={{textAlign:"center"}}>
                <div style={{fontWeight:800,fontSize:15,color:C.dp,marginBottom:2}}>Add a cover photo</div>
                <div style={{fontSize:12,color:C.soft}}>Tap here to upload an image for this idea</div>
              </div>
              <input type="file" accept="image/*" style={{display:"none"}} onChange={handleCover}/>
            </label>
          )}
        </GlassCard>

        {/* Mountain progress */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:18}}>
          <SeedToTree pct={pct} size={220}/>
          <div style={{display:"flex",gap:8,marginTop:6,alignItems:"center"}}>
            <span style={{background:tc,color:"#1A1A10",fontSize:11,fontWeight:800,borderRadius:20,padding:"2px 9px"}}>{idea.tag}</span>
            <span style={{background:st.color,color:"#1A1A10",fontSize:11,fontWeight:800,borderRadius:20,padding:"2px 9px"}}>{st.label}</span>
            <span style={{color:"rgba(255,255,255,0.7)",fontSize:12,fontWeight:700}}>{doneCount}/{steps.length} steps</span>
          </div>
        </div>

        {/* Goal text + ramble */}
        <GlassCard style={{marginBottom:14}}>
          <div style={{fontWeight:900,fontSize:17,color:C.dp,marginBottom:6}}>{idea.text}</div>
          {idea.ramble&&<div style={{fontSize:13,color:C.mid,lineHeight:1.6}}>{idea.ramble}</div>}
          {idea.url&&<div style={{marginTop:6}}><UrlBadge url={idea.url}/></div>}
          {/* Status chips */}
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:10}}>
            {STATUSES.map(s=>(
              <button key={s.key} onClick={()=>upd({status:s.key})} style={{border:`1.5px solid ${s.color}`,borderRadius:20,padding:"3px 10px",fontSize:11,cursor:"pointer",fontWeight:700,background:idea.status===s.key?s.color:"transparent",color:idea.status===s.key?C.wh:s.color}}>{s.label}</button>
            ))}
          </div>
        </GlassCard>

        {/* Steps header + AI */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{color:"#1A1A10",fontWeight:900,fontSize:16,flex:1}}>🏔️ Steps</div>
          <button onClick={generateSteps} disabled={aiLoading} style={{background:btnGrad,color:"#1A1A10",border:"none",borderRadius:20,padding:"6px 14px",fontWeight:800,fontSize:12,cursor:"pointer",opacity:aiLoading?0.6:1}}>
            {aiLoading?"⏳ AI thinking…":"🤖 AI generate steps"}
          </button>
        </div>

        {/* Add step */}
        <div style={{display:"flex",gap:8,marginBottom:12,background:"rgba(255,255,255,0.88)",borderRadius:12,padding:"9px 13px",border:`1.5px solid ${C.ll}`}}>
          <input value={newStepText} onChange={e=>setNewStepText(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&addStep()}
            placeholder="Add a step…"
            style={{flex:1,border:"none",outline:"none",fontSize:14,fontWeight:600,color:C.txt,background:"transparent"}}/>
          <button onClick={addStep} style={{background:btnGrad,color:"#1A1A10",border:"none",borderRadius:9,width:32,height:32,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
        </div>

        {steps.length===0&&(
          <div style={{textAlign:"center",color:"rgba(255,255,255,0.45)",fontSize:13,fontStyle:"italic",marginBottom:12}}>
            No steps yet — add one above or let AI generate them 🤖
          </div>
        )}

        {/* Step cards */}
        {steps.map((step,si)=>{
          const microDone=(step.microSteps||[]).filter(m=>m.done).length;
          return(
            <div key={step.id} style={{background:"rgba(255,255,255,0.92)",borderRadius:16,padding:"12px 14px",marginBottom:10,border:`1.5px solid ${step.done?"#a5d6a7":C.ll}`,boxShadow:"0 2px 10px rgba(90,80,60,0.07)",opacity:step.done?0.75:1}}>

              {/* Step row */}
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                {/* Tick */}
                <button onClick={()=>toggleStep(step.id)} style={{width:28,height:28,borderRadius:"50%",border:`2.5px solid ${step.done?"#27ae60":C.lp}`,background:step.done?"#27ae60":"transparent",cursor:"pointer",flexShrink:0,marginTop:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#1A1A10",fontSize:14,fontWeight:900}}>
                  {step.done?"✓":""}
                </button>
                {/* Step number badge */}
                <div style={{width:22,height:22,borderRadius:"50%",background:btnGrad,color:"#1A1A10",fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:3}}>{si+1}</div>
                {/* Text */}
                <div style={{flex:1,fontWeight:700,fontSize:14,color:step.done?C.soft:C.txt,textDecoration:step.done?"line-through":"none",lineHeight:1.4}}>{step.text}</div>
                {/* Delete */}
                <button onClick={()=>delStep(step.id)} style={{background:"transparent",color:"#e74c3c",border:"none",cursor:"pointer",fontSize:16,flexShrink:0,padding:0}}>🗑</button>
              </div>

              {/* Step image */}
              {step.image&&(
                <div style={{position:"relative",marginTop:8,marginLeft:60}}>
                  <img src={step.image} alt="" style={{width:"100%",maxHeight:140,objectFit:"cover",borderRadius:10,border:`1.5px solid ${C.ll}`}}/>
                  <button onClick={()=>patchStep(step.id,{image:""})} style={{position:"absolute",top:4,right:4,background:"#e74c3c",color:"#1A1A10",border:"none",borderRadius:"50%",width:20,height:20,cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                </div>
              )}

              {/* Step URL */}
              {step.url&&<div style={{marginTop:4,marginLeft:60}}><UrlBadge url={step.url}/></div>}

              {/* Micro-steps */}
              {(step.microSteps||[]).length>0&&step.microExpanded&&(
                <div style={{marginTop:8,marginLeft:60,borderLeft:`3px solid ${C.lp}`,paddingLeft:10}}>
                  {step.microSteps.map(ms=>(
                    <div key={ms.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <button onClick={()=>patchStep(step.id,{microSteps:step.microSteps.map(m=>m.id===ms.id?{...m,done:!m.done}:m)})} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${ms.done?"#27ae60":C.lp}`,background:ms.done?"#27ae60":"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#1A1A10",fontSize:10}}>
                        {ms.done?"✓":""}
                      </button>
                      <span style={{fontSize:12,color:ms.done?C.soft:C.txt,textDecoration:ms.done?"line-through":"none",flex:1}}>{ms.text}</span>
                    </div>
                  ))}
                  {microDone>0&&<div style={{fontSize:10,color:C.soft,marginTop:2}}>{microDone}/{step.microSteps.length} micro-tasks done</div>}
                </div>
              )}
              {(step.microSteps||[]).length>0&&(
                <button onClick={()=>patchStep(step.id,{microExpanded:!step.microExpanded})} style={{marginTop:4,marginLeft:60,background:"transparent",border:"none",color:C.soft,fontSize:11,cursor:"pointer",fontWeight:600}}>
                  {step.microExpanded?"▲ Hide micro-tasks":"▼ Show micro-tasks"}
                </button>
              )}

              {/* Action bar */}
              <div style={{display:"flex",gap:6,marginTop:8,marginLeft:60,flexWrap:"wrap"}}>
                {/* Upload image */}
                <label style={{background:C.ll,color:C.mp,borderRadius:8,padding:"4px 9px",fontSize:11,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
                  📸 <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleStepImg(step.id,e)}/>
                </label>
                {/* Add/show URL */}
                {editStepId===step.id?(
                  <input autoFocus value={step.url} onChange={e=>patchStep(step.id,{url:e.target.value})} onBlur={()=>setEditStepId(null)} placeholder="Paste URL…" style={{fontSize:11,padding:"3px 8px",borderRadius:8,border:`1.5px solid ${C.lp}`,outline:"none",width:140}}/>
                ):(
                  <button onClick={()=>setEditStepId(step.id)} style={{background:C.ll,color:C.mp,border:"none",borderRadius:8,padding:"4px 9px",fontSize:11,fontWeight:700,cursor:"pointer"}}>🔗</button>
                )}
                {/* Micro-steps */}
                <button onClick={()=>generateMicro(step)} disabled={microLoading===step.id} style={{background:"#e8f5e9",color:"#2e7d32",border:"1px solid #a5d6a7",borderRadius:8,padding:"4px 9px",fontSize:11,fontWeight:700,cursor:"pointer",opacity:microLoading===step.id?0.6:1}}>
                  {microLoading===step.id?"⏳":"🔬 Micro"}
                </button>
                {/* Send to */}
                <button onClick={()=>setSendMenuStep(sendMenuStep===step.id?null:step.id)} style={{background:btnGrad,color:"#1A1A10",border:"none",borderRadius:8,padding:"4px 9px",fontSize:11,fontWeight:700,cursor:"pointer"}}>↗ Send</button>
              </div>

              {/* Send dropdown */}
              {sendMenuStep===step.id&&(
                <div style={{marginTop:8,marginLeft:60,background:C.wh,borderRadius:12,border:`1.5px solid ${C.ll}`,overflow:"hidden",boxShadow:"0 4px 16px rgba(90,80,60,0.15)"}}>
                  <button onClick={()=>{sendStepTo(step,"cal");setSendMenuStep(null);}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left",fontSize:13,fontWeight:600,color:C.txt}}>
                    📅 Google Calendar
                  </button>
                  <button onClick={()=>{sendStepTo(step,"map");setSendMenuStep(null);}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left",fontSize:13,fontWeight:600,color:C.txt}}>
                    🧠 New Mind Map
                  </button>
                  {/* Plant as Goal */}
          {["week","month1","month6","year1","year3","year5"].map(h=>{
            const labels={"week":"Next Week","month1":"1 Month","month6":"6 Months","year1":"1 Year","year3":"3 Years","year5":"5 Years"};
            const icons={"week":"📅","month1":"🗓️","month6":"🌱","year1":"⭐","year3":"🚀","year5":"🏔️"};
            return(
              <button key={h} onClick={()=>{plantAsGoal(h);setSendOpen(false);}} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left"}}>
                <span style={{fontSize:18}}>{icons[h]}</span><span style={{fontWeight:700,fontSize:14,color:C.txt}}>🌱 Goal — {labels[h]}</span>
              </button>
            );
          })}
          {["do","plan","help","drop"].map(q=>{
                    const lbl={do:"Do First 🔴",plan:"Schedule 🟠",help:"Ask for Help 🔵",drop:"Eliminate ⚫"}[q];
                    return(
                      <button key={q} onClick={()=>{sendStepTo(step,"matrix",q);setSendMenuStep(null);}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left",fontSize:13,fontWeight:600,color:C.txt}}>
                        🎯 Matrix — {lbl}
                      </button>
                    );
                  })}
                  {(priData||[]).map(l=>(
                    <button key={l.id} onClick={()=>{sendStepTo(step,"pri",l.id);setSendMenuStep(null);}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left",fontSize:13,fontWeight:600,color:C.txt}}>
                      📋 {l.name}
                    </button>
                  ))}
                  <button onClick={()=>setSendMenuStep(null)} style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px",background:"none",border:"none",cursor:"pointer",width:"100%",fontSize:12,color:C.soft}}>Cancel</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:"#1A1A10",borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(45,10,94,0.4)",zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );
}

/* ── Main Ideas board ──────────────────────────────── */
function Ideas({data,setData,priData,setPriData,mapData,setMapData,matrixData,setMatrixData,goalsData,setGoalsData,onBack}){
  const [detailId,setDetailId]=useState(null);
  const [adding,setAdding]=useState(false);
  const [draft,setDraft]=useState({text:"",ramble:"",tag:"💡 Idea",status:"spark",collection:"",url:"",cover:null});
  const [search,setSearch]=useState("");
  const [filterTag,setFilterTag]=useState("All");
  const [filterStatus,setFilterStatus]=useState("All");
  const [toast,setToast]=useState("");
  const textRef=useRef(null);
  useEffect(()=>{if(adding&&textRef.current)textRef.current.focus();},[adding]);
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2200);};

  const upd=fn=>setData(fn);
  const del=id=>upd(ds=>ds.filter(d=>d.id!==id));
  const patch=(id,ch)=>upd(ds=>ds.map(d=>d.id===id?{...d,...ch}:d));

  const submit=()=>{
    if(!draft.text.trim())return;
    upd(ds=>[{id:Date.now(),text:draft.text.trim(),ramble:draft.ramble.trim(),tag:draft.tag,status:draft.status,collection:draft.collection.trim(),url:draft.url.trim(),cover:draft.cover||null,pinned:false,votes:0,links:[],steps:[],created:Date.now()},...ds]);
    setDraft({text:"",ramble:"",tag:"💡 Idea",status:"spark",collection:"",url:"",cover:null});
    setAdding(false);
  };

  const detail=data.find(d=>d.id===detailId);
  if(detail) return(
    <IdeaDetail
      idea={detail}
      onBack={()=>setDetailId(null)}
      onUpdate={u=>patch(u.id,u)}
      priData={priData} setPriData={setPriData}
      mapData={mapData} setMapData={setMapData}
      matrixData={matrixData} setMatrixData={setMatrixData}
      goalsData={goalsData} setGoalsData={setGoalsData}
    />
  );

  const visible=data
    .filter(d=>filterTag==="All"||d.tag===filterTag)
    .filter(d=>filterStatus==="All"||d.status===filterStatus)
    .filter(d=>!search||(d.text+d.ramble).toLowerCase().includes(search.toLowerCase()));

  return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title="💡 Ideas" onBack={onBack||null} right={
        <button onClick={()=>setAdding(true)} style={{background:"rgba(255,255,255,0.22)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,width:42,height:42,fontSize:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
      }/>

      {/* Search */}
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.18)",borderRadius:12,padding:"8px 14px",border:"1px solid rgba(255,255,255,0.25)"}}>
          <span style={{fontSize:16}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search goals…" style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#1A1A10",fontSize:14,fontWeight:600}}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:16,padding:0}}>✕</button>}
        </div>
      </div>

      {/* Filters */}
      <div style={{padding:"8px 14px 0",display:"flex",gap:6,overflowX:"auto",flexWrap:"nowrap"}}>
        {["All",...IDEA_TAGS].map(t=>(
          <button key={t} onClick={()=>setFilterTag(t)} style={{flexShrink:0,border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:20,padding:"4px 11px",fontSize:11,cursor:"pointer",fontWeight:filterTag===t?800:600,background:filterTag===t?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.15)",color:filterTag===t?C.dp:C.wh,whiteSpace:"nowrap"}}>{t}</button>
        ))}
      </div>
      <div style={{padding:"6px 14px 0",display:"flex",gap:6,overflowX:"auto",flexWrap:"nowrap",marginBottom:6}}>
        {["All",...STATUSES.map(s=>s.key)].map(k=>{
          const st=k==="All"?null:statusByKey(k);
          return(<button key={k} onClick={()=>setFilterStatus(k)} style={{flexShrink:0,border:`1.5px solid ${st?st.color:"rgba(255,255,255,0.3)"}`,borderRadius:20,padding:"4px 11px",fontSize:11,cursor:"pointer",fontWeight:filterStatus===k?800:600,background:filterStatus===k?(st?st.color:"rgba(255,255,255,0.9)"):"rgba(255,255,255,0.12)",color:filterStatus===k?C.wh:(st?st.color:C.wh),whiteSpace:"nowrap"}}>{st?st.label:"All stages"}</button>);
        })}
      </div>

      <div style={{padding:"8px 14px"}}>
        {/* Add form */}
        {adding&&(
          <GlassCard style={{marginBottom:14}}>
            <div style={{fontWeight:800,color:C.dp,fontSize:14,marginBottom:10}}>🏔️ New Goal / Idea</div>
            <textarea ref={textRef} value={draft.text} onChange={e=>setDraft(d=>({...d,text:e.target.value}))} placeholder="What's the goal?" rows={2} style={{width:"100%",boxSizing:"border-box",padding:"9px 13px",borderRadius:10,border:`2px solid ${C.lp}`,fontSize:14,color:C.txt,outline:"none",resize:"none",fontFamily:"inherit",marginBottom:8}}/>
            <textarea value={draft.ramble} onChange={e=>setDraft(d=>({...d,ramble:e.target.value}))} placeholder="More detail (optional)…" rows={2} style={{width:"100%",boxSizing:"border-box",padding:"9px 13px",borderRadius:10,border:`1.5px solid ${C.ll}`,fontSize:13,color:C.txt,outline:"none",resize:"none",fontFamily:"inherit",marginBottom:8}}/>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
              {IDEA_TAGS.map(t=>(
                <button key={t} onClick={()=>setDraft(d=>({...d,tag:t}))} style={{border:`1.5px solid ${TAG_COLORS[t]}`,borderRadius:20,padding:"3px 9px",fontSize:11,cursor:"pointer",background:draft.tag===t?TAG_COLORS[t]:"transparent",color:draft.tag===t?C.wh:TAG_COLORS[t],fontWeight:700}}>{t}</button>
              ))}
            </div>
            <UrlField value={draft.url} onChange={v=>setDraft(d=>({...d,url:v}))} style={{marginBottom:8}}/>
            {/* Cover photo for new idea */}
            {draft.cover?(
              <div style={{position:"relative",marginBottom:10}}>
                <img src={draft.cover} alt="" style={{width:"100%",height:100,objectFit:"cover",borderRadius:10,border:`1.5px solid ${C.ll}`}}/>
                <button onClick={()=>setDraft(d=>({...d,cover:null}))} style={{position:"absolute",top:4,right:4,background:"#e74c3c",color:"#1A1A10",border:"none",borderRadius:"50%",width:22,height:22,cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
              </div>
            ):(
              <label style={{display:"flex",alignItems:"center",gap:8,padding:"9px 13px",background:C.pale,border:`1.5px dashed ${C.lp}`,borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:700,color:C.pp,marginBottom:10}}>
                📸 Add cover photo (optional)
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>setDraft(d=>({...d,cover:ev.target.result}));r.readAsDataURL(file);}}/>
              </label>
            )}
            <div style={{display:"flex",justifyContent:"flex-end",gap:8}}>
              <button onClick={()=>{setAdding(false);setDraft({text:"",ramble:"",tag:"💡 Idea",status:"spark",collection:"",url:"",cover:null});}} style={{background:"transparent",color:C.soft,border:"none",fontWeight:700,fontSize:14,cursor:"pointer"}}>Cancel</button>
              <PurpleBtn onClick={submit}>Plant goal 🏔️</PurpleBtn>
            </div>
          </GlassCard>
        )}

        {visible.length===0&&!adding&&<div style={{textAlign:"center",color:"rgba(255,255,255,0.55)",marginTop:60,fontSize:15,lineHeight:2}}>No goals yet — tap + to plant one 🏔️</div>}

        {/* Goal cards */}
        {visible.map(idea=>{
          const steps=idea.steps||[];
          const doneCount=steps.filter(s=>s.done).length;
          const pct=steps.length>0?Math.round((doneCount/steps.length)*100):0;
          const tc=TAG_COLORS[idea.tag]||C.pp;
          const st=statusByKey(idea.status);
          return(
            <div key={idea.id} onClick={()=>setDetailId(idea.id)} style={{background:"rgba(255,255,255,0.92)",borderRadius:18,padding:"0",marginBottom:12,boxShadow:"0 2px 14px rgba(90,80,60,0.10)",border:`1.5px solid ${C.ll}`,overflow:"hidden",cursor:"pointer",transition:"transform 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>

              {/* Cover photo if set */}
              {idea.cover&&<img src={idea.cover} alt="" style={{width:"100%",height:80,objectFit:"cover",display:"block"}}/>}
              {/* Mini mountain strip */}
              <div style={{background:`linear-gradient(135deg,#0d001a,#2d0a5e)`,padding:"10px 14px",display:"flex",alignItems:"center",gap:12}}>
                <SeedToTree pct={pct} size={52}/>
                <div style={{flex:1}}>
                  <div style={{color:"#1A1A10",fontWeight:900,fontSize:15,lineHeight:1.3}}>{idea.text}</div>
                  <div style={{color:"rgba(255,255,255,0.55)",fontSize:11,marginTop:2}}>{steps.length===0?"No steps yet":pct===100?"🎉 Summit reached!": `${doneCount}/${steps.length} steps · ${pct}%`}</div>
                </div>
                <button onClick={e=>{e.stopPropagation();del(idea.id);}} style={{background:"rgba(255,100,100,0.2)",color:"rgba(255,180,180,0.9)",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:13,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
              </div>

              {/* Progress bar */}
              <div style={{height:4,background:C.ll}}>
                <div style={{height:"100%",width:`${pct}%`,background:pct===100?"#27ae60":C.pp,transition:"width 0.4s"}}/>
              </div>

              {/* Tags + ramble */}
              <div style={{padding:"10px 14px 12px"}}>
                <div style={{display:"flex",gap:6,marginBottom:6,flexWrap:"wrap"}}>
                  <span style={{background:tc,color:"#1A1A10",fontSize:10,fontWeight:800,borderRadius:20,padding:"2px 8px"}}>{idea.tag}</span>
                  <span style={{background:st.color,color:"#1A1A10",fontSize:10,fontWeight:800,borderRadius:20,padding:"2px 8px"}}>{st.label}</span>
                  {idea.pinned&&<span>📌</span>}
                </div>
                {idea.ramble&&<div style={{fontSize:12,color:C.soft,lineHeight:1.4}}>{idea.ramble.slice(0,60)}{idea.ramble.length>60?"…":""}</div>}
                {idea.url&&<UrlBadge url={idea.url}/>}
                {/* Plant as Goal button */}
                <button onClick={e=>{e.stopPropagation();if(setGoalsData){const due=new Date();due.setDate(due.getDate()+365);setGoalsData(gs=>[...gs,{id:Date.now(),horizon:"year1",title:idea.text,description:idea.ramble||"",dueDate:due.toISOString().slice(0,10),cover:idea.cover||null,links:[],subtasks:[],status:"active",created:Date.now()}]);showToast("🌱 Planted as 1-Year Goal!");}}}
                  style={{marginTop:6,background:"linear-gradient(135deg,#1e8449,#27ae60)",color:"#fff",border:"none",borderRadius:20,padding:"5px 13px",fontSize:11,fontWeight:800,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:5}}>
                  🌱 Plant as Goal
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:"#1A1A10",borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(45,10,94,0.4)",zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   EISENHOWER MATRIX  — vibrant colours, type directly in
   boxes, AI assist, calendar, mindmap & prioritizer links
═══════════════════════════════════════════════════════ */
const QUADS=[
  {key:"do",   label:"Urgent & Important",     sub:"(Do First)",        bg:"#8A9E78", light:"rgba(138,158,120,0.18)", border:"rgba(138,158,120,0.35)", desc:"Act on these today"},
  {key:"plan", label:"Important, Not Urgent",  sub:"(Schedule)",        bg:"#5A7848", light:"rgba(248,245,236,0.75)", border:"rgba(90,120,72,0.2)",    desc:"Block time for these"},
  {key:"help", label:"Urgent, Not Important",  sub:"(Delegate)",        bg:"#8A9E78", light:"rgba(138,158,120,0.18)", border:"rgba(138,158,120,0.35)", desc:"Outsource or use a tool"},
  {key:"drop", label:"Not Urgent & Not Important", sub:"(Delete / Later)", bg:"#5A7848", light:"rgba(248,245,236,0.75)", border:"rgba(90,120,72,0.2)", desc:"Question if this is needed"},
];
const quadByKey=k=>QUADS.find(q=>q.key===k)||QUADS[0];
const STALE_MS=7*24*60*60*1000;

const FOCUS_PRESETS=[5,10,15,25,30,45,60];

function MatrixTimer({setScreen}) {
  const [mins,setMins]=useState(25);
  const [left,setLeft]=useState(null);
  const [on,setOn]=useState(false);
  const [mode,setMode]=useState("focus"); // focus | break
  const ref=useRef(null);

  useEffect(()=>{
    if(on&&left>0){ref.current=setInterval(()=>setLeft(l=>l-1),1000);}
    else{clearInterval(ref.current);if(left===0)setOn(false);}
    return()=>clearInterval(ref.current);
  },[on,left]);

  const start=(secs)=>{const t=secs||mins*60;if(t<1)return;setLeft(t);setOn(true);};
  const stop=()=>{setOn(false);setLeft(null);};
  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const pct=left!==null?(left/(mins*60))*100:100;

  const accentOn  = mode==="focus"?"#FF0022":"#00BCD4";
  const accentOff = mode==="focus"?"#FF0022":"#00BCD4";
  const glowCol   = mode==="focus"?"rgba(255,0,34,0.35)":"rgba(0,188,212,0.35)";

  return (
    <div style={{marginTop:14,background:"rgba(255,255,255,0.14)",backdropFilter:"blur(8px)",border:`1.5px solid ${accentOff}`,borderRadius:20,padding:"14px 16px",boxShadow:`0 4px 20px ${glowCol}`}}>

      {/* Mode toggle */}
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        {["focus","break"].map(m=>(
          <button key={m} onClick={()=>{setMode(m);setOn(false);setLeft(null);setMins(m==="focus"?25:5);}} style={{flex:1,padding:"7px",borderRadius:10,border:`2px solid ${m==="focus"?"#FF0022":"#00BCD4"}`,background:mode===m?(m==="focus"?"#FF0022":"#00BCD4"):"transparent",color:mode===m?C.wh:(m==="focus"?"#FF0022":"#00BCD4"),fontWeight:800,fontSize:13,cursor:"pointer",transition:"all 0.15s"}}>
            {m==="focus"?"🎯 Focus":"☕ Break"}
          </button>
        ))}
      </div>

      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:left!==null?10:0}}>
        <div style={{fontSize:22}}>{mode==="focus"?"⏱":"☕"}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:11,fontWeight:800,color:accentOn,textTransform:"uppercase",letterSpacing:1.4,marginBottom:3}}>
            {mode==="focus"?"Focus Timer":"Break Timer"}
          </div>
          {left!==null?(
            <div style={{fontFamily:"monospace",fontSize:30,fontWeight:900,lineHeight:1,color:left<60?"#FF0022":(mode==="focus"?"#FF0022":"#00BCD4"),textShadow:left<60?`0 0 12px #FF0022`:`0 0 12px ${glowCol}`}}>
              {fmt(left)}
            </div>
          ):(
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <button onClick={()=>setMins(m=>Math.max(1,m-1))} style={{background:"rgba(255,255,255,0.2)",border:`1.5px solid ${accentOff}`,borderRadius:8,width:32,height:32,fontSize:20,fontWeight:900,cursor:"pointer",color:"#1A1A10",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                <div style={{fontFamily:"monospace",fontSize:26,fontWeight:900,color:"#1A1A10",minWidth:50,textAlign:"center"}}>{String(mins).padStart(2,"0")}</div>
                <button onClick={()=>setMins(m=>Math.min(120,m+1))} style={{background:"rgba(255,255,255,0.2)",border:`1.5px solid ${accentOff}`,borderRadius:8,width:32,height:32,fontSize:20,fontWeight:900,cursor:"pointer",color:"#1A1A10",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                <span style={{fontSize:13,color:"rgba(255,255,255,0.65)"}}>min</span>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {FOCUS_PRESETS.map(p=>(
                  <button key={p} onClick={()=>setMins(p)} style={{border:`1.5px solid ${accentOff}`,borderRadius:20,padding:"3px 10px",fontSize:11,cursor:"pointer",fontWeight:mins===p?800:600,background:mins===p?accentOn:"rgba(255,255,255,0.15)",color:mins===p?C.wh:"rgba(255,255,255,0.8)",transition:"all 0.15s"}}>
                    {p}m
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {left!==null
          ?<button onClick={stop} style={{background:accentOn,color:"#1A1A10",border:"none",borderRadius:12,width:46,height:46,fontSize:18,fontWeight:800,cursor:"pointer",flexShrink:0,boxShadow:`0 3px 12px ${glowCol}`}}>✕</button>
          :<button onClick={start} style={{background:accentOn,color:"#1A1A10",border:"none",borderRadius:12,width:46,height:46,fontSize:20,fontWeight:800,cursor:"pointer",flexShrink:0,boxShadow:`0 3px 12px ${glowCol}`}}>▶</button>
        }
      </div>

      {/* Progress bar */}
      {left!==null&&(
        <div style={{height:6,borderRadius:3,background:"rgba(255,255,255,0.15)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,borderRadius:3,background:left<60?"#FF0022":accentOn,transition:"width 1s linear",boxShadow:`0 0 8px ${glowCol}`}}/>
        </div>
      )}
    </div>
  );
}

function Matrix({data,setData,priData,setPriData,mapData,setMapData,goalsData,setGoalsData,ideasData,setIdeasData,setScreen}) {
  const [inlineTexts,setInlineTexts]=useState({do:"",plan:"",help:"",drop:""});
  const [inlineUrls,setInlineUrls]=useState({do:"",plan:"",help:"",drop:""});
  const [expandedTask,setExpandedTask]=useState(null);
  const [taskUrls,setTaskUrls]=useState({});
  const [aiInput,setAiInput]=useState("");
  const [aiLoading,setAiLoading]=useState(false);
  const [aiResult,setAiResult]=useState(null);
  const [staleModal,setStaleModal]=useState(null);
  const [toast,setToast]=useState("");
  const [moveTask,setMoveTask]=useState(null);
  const [sendMenu,setSendMenu]=useState(null);
  const [dragTaskId,setDragTaskId]=useState(null);
  const [dragOverTarget,setDragOverTarget]=useState(null); // quad key OR "goals"|"vault"
  const [selectedTasks,setSelectedTasks]=useState(new Set());
  const [balanceModal,setBalanceModal]=useState(false);
  const [suggestModal,setSuggestModal]=useState(false);
  const [suggestLoading,setSuggestLoading]=useState(false);
  const [suggestions,setSuggestions]=useState([]);
  const [labelModal,setLabelModal]=useState(false);
  const [customLabels,setCustomLabels]=useState(()=>{try{return JSON.parse(localStorage.getItem('thinko_quad_labels')||'{}')}catch{return {};}});
  const [labelDraft,setLabelDraft]=useState({});
  const now=Date.now();

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2400);};
  const saveLabels=labels=>{setCustomLabels(labels);try{localStorage.setItem('thinko_quad_labels',JSON.stringify(labels));}catch{}};
  const qLabel=q=>customLabels[q.key]?.label||q.label;
  const qSub=q=>customLabels[q.key]?.sub||q.sub;

  const addInline=(quad)=>{
    const text=inlineTexts[quad].trim();
    if(!text)return;
    setData(ds=>[...ds,{id:Date.now(),text,quad,url:inlineUrls[quad].trim(),created:Date.now(),touched:Date.now()}]);
    setInlineTexts(t=>({...t,[quad]:""}));
    setInlineUrls(t=>({...t,[quad]:""}));
  };

  const del=id=>setData(ds=>ds.filter(d=>d.id!==id));
  const moveMatrixTask=(id,quad,dir)=>setData(ds=>{
    const quadTasks=ds.filter(d=>d.quad===quad);
    const others=ds.filter(d=>d.quad!==quad);
    const i=quadTasks.findIndex(d=>d.id===id);
    const j=i+dir;
    if(j<0||j>=quadTasks.length)return ds;
    const a=[...quadTasks];[a[i],a[j]]=[a[j],a[i]];
    return[...others,...a];
  });
  const move=(id,quad)=>{setData(ds=>ds.map(d=>d.id===id?{...d,quad,touched:Date.now()}:d));setMoveTask(null);showToast(`Moved to ${QUADS.find(q=>q.key===quad)?.label||quad}`);};
  const touch=id=>setData(ds=>ds.map(d=>d.id===id?{...d,touched:Date.now()}:d));

  // ── DRAG BETWEEN QUADRANTS + GOALS + VAULT ─────────────
  const handleDragStart=(e,taskId)=>{e.dataTransfer.effectAllowed="move";e.dataTransfer.setData("taskId",String(taskId));setDragTaskId(taskId);};
  const handleDragOver=(e,target)=>{e.preventDefault();e.dataTransfer.dropEffect="move";setDragOverTarget(target);};
  const handleDrop=(e,target)=>{
    e.preventDefault();
    const id=parseInt(e.dataTransfer.getData("taskId"));
    const task=id&&data.find(d=>d.id===id);
    if(!task){setDragTaskId(null);setDragOverTarget(null);return;}
    if(target==="goals"){
      // Drop to Goals — create a goal from task
      if(setGoalsData){
        const due=new Date();due.setDate(due.getDate()+7);
        setGoalsData(gs=>[...gs,{id:Date.now(),horizon:"week",title:task.text,description:"From Matrix",dueDate:due.toISOString().slice(0,10),cover:null,links:[],subtasks:[],status:"active",created:Date.now()}]);
        del(id);showToast("🌱 Planted as Goal!");
      }
    } else if(target==="vault"){
      // Drop to Vault — save as idea note
      if(setIdeasData){
        setIdeasData(ds=>[{id:Date.now(),title:task.text,content:`From Matrix (${QUADS.find(q=>q.key===task.quad)?.label||task.quad})`,type:"note",tag:"📌 Matrix",created:Date.now()},...ds]);
        showToast("📚 Saved to The Vault!");
      }
    } else {
      // Drop to another quadrant
      if(task.quad!==target) move(id,target);
    }
    setDragTaskId(null);setDragOverTarget(null);
  };
  const handleDragEnd=()=>{setDragTaskId(null);setDragOverTarget(null);};

  // ── WEEKLY BALANCE CHECK ───────────────────────────────
  const getBalance=()=>{
    const counts={do:0,plan:0,help:0,drop:0};
    data.forEach(d=>counts[d.quad]=(counts[d.quad]||0)+1);
    const total=data.length||1;
    const urgentPct=Math.round(((counts.do+counts.help)/total)*100);
    const importantPct=Math.round(((counts.do+counts.plan)/total)*100);
    const warnings=[];
    if(urgentPct>60)warnings.push("🔴 Over 60% of tasks are urgent — you may be in reactive mode");
    if(counts.plan<2)warnings.push("🌿 Very few important-but-not-urgent tasks — hard to make progress on big goals");
    if(counts.drop>counts.do)warnings.push("⚠️ More 'eliminate' tasks than 'do first' — consider cleaning up");
    if(counts.do>6)warnings.push("🔥 Lots of urgent+important tasks — prioritise ruthlessly today");
    if(warnings.length===0)warnings.push("✅ Your matrix looks balanced — great focus!");
    return{counts,urgentPct,importantPct,warnings,total};
  };

  // ── AI AUTO-SUGGEST QUADRANT MOVES ────────────────────
  const autoSuggest=async()=>{
    setSuggestLoading(true);setSuggestions([]);setSuggestModal(true);
    const taskList=data.map(t=>`id:${t.id} text:"${t.text}" quad:${t.quad} days_old:${Math.floor((now-(t.touched||now))/(86400000))}`).join("\n");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,
          messages:[{role:"user",content:`Review these Eisenhower Matrix tasks and suggest 3-5 gentle moves between quadrants. Only suggest if there's a clear mismatch (e.g. a task that sounds important but is in "drop", or something that could be delegated). Be warm and brief. Return ONLY JSON array: [{id:number,text:string,currentQuad:string,suggestedQuad:string,reason:string}]\n\nTasks:\n${taskList}`}]})
      });
      setSuggestions(JSON.parse((j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim()));
    }catch{setSuggestions([{id:0,text:"AI unavailable",currentQuad:"",suggestedQuad:"",reason:"Try again in a moment 🌿"}]);}
    setSuggestLoading(false);
  };

  // ── EXPORT TO VAULT ────────────────────────────────────
  const exportToVault=()=>{
    if(!setIdeasData)return;
    const bal=getBalance();
    const date=new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"});
    const content=`# Weekly Matrix Export — ${date}\n\n## Balance\n- Urgent tasks: ${bal.urgentPct}%\n- Important tasks: ${bal.importantPct}%\n\n## Insights\n${bal.warnings.map(w=>`- ${w}`).join("\n")}\n\n## Quadrants\n${QUADS.map(q=>{const tasks=data.filter(d=>d.quad===q.key);return`### ${qLabel(q)}\n${tasks.length?tasks.map(t=>`- ${t.text}`).join("\n"):"(empty)"}`}).join("\n\n")}`;
    setIdeasData(ds=>[{id:Date.now(),title:`📊 Matrix Export — ${date}`,content,type:"note",tag:"📊 Matrix",created:Date.now()},...ds]);
    showToast("📊 Matrix exported to The Vault!");
  };

  // ── MOVE SELECTED TO PRIORITIZER ─────────────────────
  const moveSelectedToPri=()=>{
    if(!priData.length){showToast("Create a Prioritizer list first");return;}
    const tasks=data.filter(d=>selectedTasks.has(d.id));
    if(!tasks.length){showToast("Tap tasks to select them first");return;}
    setPriData(ls=>[{...ls[0],tasks:[...ls[0].tasks,...tasks.map(t=>({id:Date.now()+Math.random(),name:t.text,done:false,color:"lilac",url:t.url||""}))]},...ls.slice(1)]);
    setData(ds=>ds.filter(d=>!selectedTasks.has(d.id)));
    setSelectedTasks(new Set());
    showToast(`✅ ${tasks.length} task${tasks.length>1?"s":""} moved to Prioritizer!`);
  };

  /* send actions */
  const sendToPri=(task,listId)=>{setPriData(ls=>ls.map(l=>l.id===listId?{...l,tasks:[...l.tasks,{id:Date.now(),name:task.text,done:false,color:"lilac"}]}:l));showToast("✅ Sent to Prioritizer!");setSendMenu(null);};
  const sendToMap=task=>{const root={id:Date.now(),text:task.text,x:0,y:0,parent:null,color:"crystal"};setMapData(ms=>[...ms,{id:Date.now()+1,name:task.text,nodes:[root]}]);showToast("🧠 Mind map created!");setSendMenu(null);};
  const sendToCal=task=>{window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(task.text)}`,"_blank");setSendMenu(null);};

  const importFromPri=(task)=>{
    setData(ds=>[...ds,{id:Date.now(),text:task.text,quad:"do",created:Date.now(),touched:Date.now()}]);
    showToast("📋 Imported from Prioritizer!");
  };

  /* AI */
  const askAI=async()=>{
    if(!aiInput.trim())return;
    setAiLoading(true);setAiResult(null);
    try{
      const res={ok:true};const j={content:[{text:await callAI(`Place this task in an Eisenhower Matrix. Quadrants: "do"=Urgent+Important, "plan"=Important not urgent, "help"=Urgent not important (outsource/tool), "drop"=neither. Task: "${aiInput}". Reply ONLY JSON: {"quad":"do","reason":"one sentence"}`,200)}]};
      setAiResult(JSON.parse((j.content?.[0]?.text||"{}").replace(/```json|```/g,"").trim()));
    }catch{setAiResult({quad:"do",reason:"Couldn't reach AI — try again."});}
    setAiLoading(false);
  };
  const acceptAI=()=>{
    if(!aiResult)return;
    setData(ds=>[...ds,{id:Date.now(),text:aiInput.trim(),quad:aiResult.quad,created:Date.now(),touched:Date.now()}]);
    setAiInput("");setAiResult(null);showToast("✅ Task placed by AI!");
  };

  const staleTasks=data.filter(d=>now-d.touched>STALE_MS);

  const SendMenu=({task})=>(
    <div style={{position:"fixed",inset:0,zIndex:400,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(6px)",background:"rgba(30,40,20,0.45)"}} onClick={()=>setSendMenu(null)}>
      <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"22px 22px 0 0",padding:"0 0 32px",width:"100%",maxWidth:480,boxShadow:"0 -8px 32px rgba(0,0,0,0.14)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"center",padding:"12px 0 4px"}}><div style={{width:36,height:4,borderRadius:2,background:"rgba(90,80,60,0.18)"}}/></div>
        <div style={{padding:"4px 20px 14px",fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:15}}>Send "{task.text.slice(0,28)}{task.text.length>28?"…":""}" to…</div>
        {[
          {icon:"📅",label:"Google Calendar",action:()=>sendToCal(task)},
          {icon:"🧠",label:"New Mind Map",action:()=>sendToMap(task)},
          ...priData.map(l=>({icon:"📋",label:"Prioritizer — "+l.name,action:()=>sendToPri(task,l.id)})),
        ].map((btn,i)=>(
          <button key={i} onClick={btn.action} style={{display:"flex",alignItems:"center",gap:14,padding:"13px 20px",background:"none",border:"none",borderTop:"1px solid rgba(90,80,60,0.08)",cursor:"pointer",width:"100%",textAlign:"left"}}>
            <span style={{fontSize:20}}>{btn.icon}</span><span style={{fontWeight:600,fontSize:14,color:"#1A1A10"}}>{btn.label}</span>
          </button>
        ))}
        <button onClick={()=>setSendMenu(null)} style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"13px 20px",background:"none",border:"none",borderTop:"1px solid rgba(90,80,60,0.08)",cursor:"pointer",width:"100%",fontWeight:600,fontSize:14,color:"#8A8070"}}>Cancel</button>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100%",background:"transparent",fontFamily:"'Segoe UI',sans-serif",display:"flex",flexDirection:"column",boxSizing:"border-box"}}>

      {/* ── HEADER ── */}
      <div style={{background:"rgba(248,245,236,0.92)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",padding:"10px 16px 8px",textAlign:"center",borderBottom:"1px solid rgba(90,80,60,0.08)",flexShrink:0,position:"relative"}}>
        <button onClick={()=>setScreen("home")} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{fontFamily:"Georgia,serif",fontSize:17,fontWeight:700,color:"#1A1A10",letterSpacing:-0.3}}>Matrix — Urgent vs Important</div>
        {selectedTasks.size>0&&(
          <button onClick={moveSelectedToPri} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>
            📋 Move {selectedTasks.size} →
          </button>
        )}
      </div>

      {/* ── ACTION ROW — balance / suggest / labels / export ── */}
      <div style={{display:"flex",gap:6,padding:"6px 8px 0",overflowX:"auto",scrollbarWidth:"none"}}>
        {[
          {label:"⚖️ Balance",action:()=>setBalanceModal(true)},
          {label:"🤖 Suggest",action:autoSuggest},
          {label:"🏷️ Labels",action:()=>{setLabelDraft({...customLabels});setLabelModal(true);}},
          {label:"📊 Export",action:exportToVault},
        ].map(b=>(
          <button key={b.label} onClick={b.action} style={{background:"rgba(248,245,236,0.88)",border:"1px solid rgba(90,80,60,0.10)",borderRadius:100,padding:"6px 12px",fontSize:11,fontWeight:600,color:"#3A3020",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,boxShadow:"0 1px 6px rgba(0,0,0,0.04)"}}>
            {b.label}
          </button>
        ))}
      </div>

      {/* ── DROP ZONES — Goals + Vault (show when dragging) ── */}
      {dragTaskId&&(
        <div style={{display:"flex",gap:8,padding:"6px 8px",flexShrink:0}}>
          {[
            {key:"goals",icon:"🌱",label:"Drop → Goals",color:"rgba(90,160,80,0.15)",border:"rgba(90,160,80,0.4)"},
            {key:"vault",icon:"📚",label:"Drop → The Vault",color:"rgba(90,120,72,0.10)",border:"rgba(90,120,72,0.3)"},
          ].map(zone=>(
            <div key={zone.key}
              onDragOver={e=>handleDragOver(e,zone.key)}
              onDrop={e=>handleDrop(e,zone.key)}
              onDragLeave={()=>setDragOverTarget(null)}
              style={{
                flex:1,padding:"10px",borderRadius:14,textAlign:"center",
                background:dragOverTarget===zone.key?"rgba(90,160,80,0.28)":zone.color,
                border:`2px dashed ${dragOverTarget===zone.key?"#5A9040":zone.border}`,
                fontSize:12,fontWeight:700,color:"#2A5020",transition:"all 0.12s",
              }}>
              {zone.icon} {zone.label}
            </div>
          ))}
        </div>
      )}

      {/* Drag hint */}
      <div style={{textAlign:"center",padding:"2px 0",fontSize:10,color:"rgba(90,80,60,0.38)",letterSpacing:0.3}}>
        ⠿ Drag tasks between quadrants, to 🌱 Goals, or 📚 The Vault
      </div>

      {/* ── 2×2 GRID ── */}
      <div style={{padding:"4px 8px 0",display:"flex",flexDirection:"column",boxSizing:"border-box",width:"100%"}}>
        <div style={{display:"grid",gridTemplateColumns:"calc(50% - 4px) calc(50% - 4px)",gridTemplateRows:"calc(50dvh - 120px) calc(50dvh - 120px)",gap:8,width:"100%",boxSizing:"border-box",marginBottom:8}}>
          {QUADS.map((q,qi)=>{
            const tasks=data.filter(d=>d.quad===q.key);
            const isSage=qi===0||qi===2;
            const isDragTarget=dragOverTarget===q.key&&dragTaskId!==null;
            return(
              <div key={q.key}
                onDragOver={e=>handleDragOver(e,q.key)}
                onDrop={e=>handleDrop(e,q.key)}
                onDragLeave={()=>setDragOverTarget(null)}
                style={{
                  background:isDragTarget?"rgba(90,120,72,0.22)":isSage?"rgba(124,148,104,0.35)":"rgba(245,242,234,0.88)",
                  borderRadius:16,padding:"10px 10px 8px",position:"relative",
                  display:"flex",flexDirection:"column",boxSizing:"border-box",minWidth:0,overflow:"hidden",
                  border:isDragTarget?"2px dashed rgba(90,120,72,0.6)":"2px solid transparent",
                  transition:"all 0.12s",
                }}>
                <div style={{position:"absolute",top:8,right:8,opacity:0.7}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3C7 7 4 12 4 17a8 8 0 0016 0C20 12 17 7 12 3z" fill={isSage?"rgba(255,255,255,0.65)":"#5A7848"}/></svg></div>
                <div style={{paddingRight:20,marginBottom:5}}>
                  <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:13,color:isSage?"#1E2E14":"#1A1A10",lineHeight:1.25}}>{qLabel(q)}</div>
                  <div style={{fontFamily:"Georgia,serif",fontSize:11,color:isSage?"#3A5028":"#6A6050"}}>{qSub(q)}</div>
                </div>
                <div style={{height:1,background:isSage?"rgba(255,255,255,0.28)":"rgba(90,80,60,0.10)",marginBottom:6}}/>
                <div style={{flex:1,overflowY:"auto",minHeight:0}}>
                  {tasks.map(t=>{
                    const isSelected=selectedTasks.has(t.id);
                    const expanded=expandedTask===t.id;
                    const stale=now-t.touched>STALE_MS;
                    return(
                      <div key={t.id} draggable onDragStart={e=>handleDragStart(e,t.id)} onDragEnd={handleDragEnd}
                        style={{background:isSelected?"rgba(90,120,72,0.18)":"rgba(255,255,255,0.80)",borderRadius:10,padding:"7px 8px",marginBottom:5,border:isSelected?"1.5px solid rgba(90,120,72,0.5)":"1px solid rgba(255,255,255,0.9)",cursor:"grab",opacity:dragTaskId===t.id?0.5:1,position:"relative"}}>
                        {stale&&<div style={{position:"absolute",top:-4,right:4,background:"rgba(160,110,40,0.85)",color:"#fff",fontSize:7,fontWeight:700,borderRadius:6,padding:"1px 4px"}}>Old</div>}
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <button onClick={()=>setSelectedTasks(s=>{const n=new Set(s);n.has(t.id)?n.delete(t.id):n.add(t.id);return n;})} style={{width:16,height:16,borderRadius:4,border:`1.5px solid ${isSelected?"#5A7848":"rgba(90,80,60,0.25)"}`,background:isSelected?"#5A7848":"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
                            {isSelected&&<svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                          </button>
                          <div onClick={()=>setExpandedTask(expanded?null:t.id)} style={{flex:1,fontFamily:"Georgia,serif",fontSize:12,fontWeight:600,color:"#1A1A10",lineHeight:1.35,cursor:"pointer",wordBreak:"break-word"}}>{t.text}</div>
                          <div style={{flexShrink:0,opacity:0.3,fontSize:10}}>⠿</div>
                        </div>
                        {expanded&&(
                          <div style={{display:"flex",gap:3,flexWrap:"wrap",marginTop:6}}>
                            <button onClick={()=>touch(t.id)} style={{background:"rgba(90,160,80,0.12)",color:"#2A7020",border:"none",borderRadius:5,padding:"2px 7px",fontSize:9,fontWeight:600,cursor:"pointer"}}>✓ Done</button>
                            <button onClick={()=>setMoveTask(t)} style={{background:"rgba(90,120,72,0.10)",color:"#3A6020",border:"none",borderRadius:5,padding:"2px 7px",fontSize:9,fontWeight:600,cursor:"pointer"}}>↔ Move</button>
                            <button onClick={()=>setSendMenu(t)} style={{background:"rgba(90,120,72,0.10)",color:"#3A6020",border:"none",borderRadius:5,padding:"2px 7px",fontSize:9,fontWeight:600,cursor:"pointer"}}>↗ Send</button>
                            {priData.length>0&&<button onClick={()=>sendToPri(t,priData[0].id)} style={{background:"rgba(90,120,72,0.14)",color:"#2A5010",border:"none",borderRadius:5,padding:"2px 7px",fontSize:9,fontWeight:700,cursor:"pointer"}}>📋→Pri</button>}
                            {setGoalsData&&<button onClick={()=>{const due=new Date();due.setDate(due.getDate()+7);setGoalsData(gs=>[...gs,{id:Date.now(),horizon:"week",title:t.text,description:"",dueDate:due.toISOString().slice(0,10),cover:null,links:[],subtasks:[],status:"active",created:Date.now()}]);del(t.id);showToast("🌱 Planted as Goal!");}} style={{background:"rgba(90,160,80,0.12)",color:"#2A6020",border:"none",borderRadius:5,padding:"2px 7px",fontSize:9,fontWeight:700,cursor:"pointer"}}>🌱→Goal</button>}
                            {setIdeasData&&<button onClick={()=>{setIdeasData(ds=>[{id:Date.now(),title:t.text,content:"From Matrix",type:"note",tag:"📌 Matrix",created:Date.now()},...ds]);showToast("📚 Saved!");}} style={{background:"rgba(90,120,72,0.10)",color:"#3A6020",border:"none",borderRadius:5,padding:"2px 7px",fontSize:9,fontWeight:600,cursor:"pointer"}}>📚→Vault</button>}
                            <button onClick={()=>del(t.id)} style={{background:"rgba(192,57,43,0.08)",color:"#c0392b",border:"none",borderRadius:5,padding:"2px 7px",fontSize:9,fontWeight:600,cursor:"pointer"}}>🗑</button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div style={{display:"flex",gap:5,marginTop:5,flexShrink:0}}>
                  <input value={inlineTexts[q.key]} onChange={e=>setInlineTexts(t=>({...t,[q.key]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addInline(q.key)} placeholder="Add task…" style={{flex:1,padding:"6px 9px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.18)",background:"rgba(255,255,255,0.85)",fontSize:11,color:"#1A1A10",outline:"none",minWidth:0,boxSizing:"border-box"}}/>
                  <button onClick={()=>addInline(q.key)} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:"50%",width:28,height:28,fontSize:18,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* ── BOTTOM BUTTONS ── */}
      <div style={{position:"sticky",bottom:0,padding:"8px 12px 24px",background:"rgba(238,234,222,0.96)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderTop:"1px solid rgba(255,255,255,0.6)",display:"flex",gap:10,flexShrink:0,boxSizing:"border-box",width:"100%",zIndex:50}}>
        <button onClick={()=>{if(selectedTasks.size>0){moveSelectedToPri();}else{setScreen("prioritizer");}}} style={{flex:1,padding:"14px 8px",background:"#6A8858",color:"#fff",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 4px 14px rgba(90,120,72,0.28)"}}>
          {selectedTasks.size>0?`📋 Move ${selectedTasks.size} to Prioritizer`:"Move to Prioritizer"}
        </button>
        <button onClick={()=>setScreen("goals")} style={{flex:1,padding:"14px 8px",background:"transparent",color:"#3A6020",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>Weekly Insights</button>
      </div>

      {sendMenu&&<SendMenu task={sendMenu}/>}

      {/* ── WEEKLY BALANCE MODAL ── */}
      {balanceModal&&(()=>{
        const bal=getBalance();
        return(
          <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setBalanceModal(false)}>
            <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"75vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px"}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.18)"}}/></div>
              <div style={{padding:"0 20px 14px"}}>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:19,marginBottom:12}}>⚖️ Weekly Balance Check</div>
                {/* Visual balance bars */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                  {QUADS.map(q=>{
                    const count=data.filter(d=>d.quad===q.key).length;
                    const pct=bal.total>0?Math.round((count/bal.total)*100):0;
                    const isSage=q.key==="do"||q.key==="help";
                    return(
                      <div key={q.key} style={{background:isSage?"rgba(124,148,104,0.15)":"rgba(245,242,234,0.90)",borderRadius:16,padding:"12px 14px",border:"1px solid rgba(255,255,255,0.9)"}}>
                        <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:12,color:"#1A1A10",marginBottom:4}}>{qLabel(q)}</div>
                        <div style={{height:6,background:"rgba(90,80,60,0.10)",borderRadius:100,marginBottom:4,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${pct}%`,background:isSage?"#8A9E78":"#5A7848",borderRadius:100}}/>
                        </div>
                        <div style={{fontSize:11,color:"#8A8070"}}>{count} tasks · {pct}%</div>
                      </div>
                    );
                  })}
                </div>
                {/* Insights */}
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,color:"#1A1A10",marginBottom:10}}>Insights</div>
                {bal.warnings.map((w,i)=>(
                  <div key={i} style={{background:"rgba(90,120,72,0.06)",borderRadius:16,padding:"12px 16px",marginBottom:8,border:"1px solid rgba(90,120,72,0.12)",fontFamily:"Georgia,serif",fontSize:13,color:"#1A2810",lineHeight:1.6}}>{w}</div>
                ))}
                <button onClick={()=>{exportToVault();setBalanceModal(false);}} style={{width:"100%",marginTop:8,background:"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"13px",fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 3px 12px rgba(58,80,38,0.25)"}}>
                  📊 Export insights to The Vault
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── AUTO-SUGGEST MODAL ── */}
      {suggestModal&&(
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setSuggestModal(false)}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"80vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px"}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.18)"}}/></div>
            <div style={{padding:"0 20px 10px",flexShrink:0}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:19,marginBottom:2}}>🤖 Smart Suggestions</div>
              <div style={{color:"#8A8070",fontSize:13}}>Gentle AI nudges based on how you're using the matrix</div>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
              {suggestLoading&&<div style={{textAlign:"center",padding:"32px 0",color:"#5A7848",fontFamily:"Georgia,serif",fontSize:14}}>🌿 Thinking about your tasks…</div>}
              {suggestions.map((s,i)=>(
                <div key={i} style={{background:"rgba(248,245,236,0.92)",borderRadius:20,padding:"14px 16px",marginBottom:10,border:"1px solid rgba(255,255,255,0.9)",boxShadow:"0 1px 8px rgba(0,0,0,0.04)"}}>
                  <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,color:"#1A1A10",marginBottom:3}}>{s.text}</div>
                  <div style={{fontSize:12,color:"#5A7040",marginBottom:8}}>{s.reason}</div>
                  {s.id>0&&s.suggestedQuad&&(
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontSize:11,color:"#8A8070"}}>{QUADS.find(q=>q.key===s.currentQuad)?.label} →</span>
                      <button onClick={()=>{move(s.id,s.suggestedQuad);setSuggestions(ss=>ss.filter(x=>x.id!==s.id));showToast("Moved!");}} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:100,padding:"6px 14px",fontSize:11,fontWeight:700,cursor:"pointer"}}>
                        Move to {QUADS.find(q=>q.key===s.suggestedQuad)?.label||s.suggestedQuad}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CUSTOM LABELS MODAL ── */}
      {labelModal&&(
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",backdropFilter:"blur(8px)"}} onClick={()=>setLabelModal(false)}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 48px rgba(0,0,0,0.14)",maxHeight:"80vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px"}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.18)"}}/></div>
            <div style={{padding:"0 20px 12px",flexShrink:0}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:19,marginBottom:2}}>🏷️ Custom Quadrant Labels</div>
              <div style={{color:"#8A8070",fontSize:13}}>Rename any quadrant to match how you think</div>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"0 20px"}}>
              {QUADS.map(q=>(
                <div key={q.key} style={{marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#5A7848",textTransform:"uppercase",letterSpacing:0.5,marginBottom:6}}>
                    {q.label} <span style={{color:"#9A9080",fontWeight:400,textTransform:"none"}}>({q.sub})</span>
                  </div>
                  <input value={labelDraft[q.key]?.label||""} onChange={e=>setLabelDraft(d=>({...d,[q.key]:{...d[q.key],label:e.target.value}}))}
                    placeholder={`e.g. "Do Now" or leave blank for default`}
                    style={{width:"100%",boxSizing:"border-box",padding:"11px 16px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.20)",fontSize:14,color:"#1A1A10",outline:"none",background:"rgba(255,255,255,0.88)",marginBottom:6}}/>
                  <input value={labelDraft[q.key]?.sub||""} onChange={e=>setLabelDraft(d=>({...d,[q.key]:{...d[q.key],sub:e.target.value}}))}
                    placeholder={`Subtitle e.g. "(Do Now)" — optional`}
                    style={{width:"100%",boxSizing:"border-box",padding:"9px 16px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.12)",fontSize:12,color:"#5A5040",outline:"none",background:"rgba(255,255,255,0.70)"}}/>
                </div>
              ))}
            </div>
            <div style={{padding:"12px 20px 0",flexShrink:0,display:"flex",gap:10}}>
              <button onClick={()=>{saveLabels({});setLabelDraft({});setLabelModal(false);showToast("Labels reset to default");}} style={{flex:1,padding:"13px",background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,fontWeight:600,fontSize:14,cursor:"pointer"}}>Reset</button>
              <button onClick={()=>{
                const merged={};
                QUADS.forEach(q=>{if(labelDraft[q.key]?.label||labelDraft[q.key]?.sub)merged[q.key]={label:labelDraft[q.key]?.label||q.label,sub:labelDraft[q.key]?.sub||q.sub};});
                saveLabels(merged);setLabelModal(false);showToast("🏷️ Labels saved!");
              }} style={{flex:2,padding:"13px",background:"#5A7848",color:"#fff",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,cursor:"pointer",boxShadow:"0 3px 12px rgba(58,80,38,0.25)"}}>Save Labels</button>
            </div>
          </div>
        </div>
      )}

      {/* Move modal */}
      {moveTask&&(
        <div style={{position:"fixed",inset:0,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(6px)"}}>
          <div style={{background:"rgba(248,245,236,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",maxWidth:480,boxShadow:"0 -8px 40px rgba(0,0,0,0.15)"}}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px"}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(90,80,60,0.2)"}}/></div>
            <div style={{padding:"0 20px"}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:16,marginBottom:3}}>Move task</div>
              <div style={{color:"#8A8070",fontSize:13,marginBottom:14,fontStyle:"italic"}}>{moveTask.text}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {QUADS.map(q=>(
                  <button key={q.key} onClick={()=>move(moveTask.id,q.key)} style={{padding:"13px 10px",borderRadius:18,border:`1.5px solid rgba(90,120,72,${moveTask.quad===q.key?0.5:0.18})`,background:moveTask.quad===q.key?"rgba(90,120,72,0.12)":"rgba(255,255,255,0.85)",cursor:"pointer",textAlign:"left",opacity:moveTask.quad===q.key?0.6:1}}>
                    <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:13,color:"#2A4020",lineHeight:1.3}}>{q.label}</div>
                    <div style={{fontSize:11,color:"#7A8A6A",marginTop:2}}>{q.sub}</div>
                  </button>
                ))}
              </div>
              <button onClick={()=>setMoveTask(null)} style={{width:"100%",marginTop:12,background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,padding:"13px",fontWeight:600,fontSize:14,cursor:"pointer"}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {staleModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(30,40,20,0.55)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(6px)"}}>
          <div style={{background:"rgba(248,245,236,0.98)",borderRadius:"28px 28px 0 0",padding:"0 0 36px",width:"100%",boxShadow:"0 -8px 40px rgba(0,0,0,0.12)"}}>
            <div style={{display:"flex",justifyContent:"center",padding:"14px 0 8px"}}><div style={{width:40,height:4,borderRadius:2,background:"rgba(160,110,40,0.3)"}}/></div>
            <div style={{padding:"0 20px"}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#7A5820",fontSize:17,marginBottom:4}}>⏰ Old Task</div>
              <div style={{color:"#8A8070",fontSize:13,marginBottom:10}}>Untouched for over a week:</div>
              <div style={{background:"rgba(160,120,40,0.06)",borderRadius:16,padding:"13px 16px",fontWeight:600,fontSize:14,color:"#1A1A10",marginBottom:16,border:"1px solid rgba(160,110,40,0.18)"}}>{staleModal.text}</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <button onClick={()=>{touch(staleModal.id);setStaleModal(null);showToast("👍 Kept!");}} style={{background:"rgba(90,160,80,0.12)",color:"#2A7020",border:"1.5px solid rgba(90,160,80,0.3)",borderRadius:100,padding:"13px",fontWeight:700,fontSize:14,cursor:"pointer"}}>✅ Still doing it — keep it</button>
                <button onClick={()=>{setMoveTask(staleModal);setStaleModal(null);}} style={{background:"rgba(90,120,72,0.10)",color:"#3A6020",border:"1.5px solid rgba(90,120,72,0.25)",borderRadius:100,padding:"13px",fontWeight:700,fontSize:14,cursor:"pointer"}}>↔ Move to different quadrant</button>
                <button onClick={()=>{del(staleModal.id);setStaleModal(null);showToast("Removed.");}} style={{background:"rgba(90,80,60,0.08)",color:"#7A7060",border:"1.5px solid rgba(90,80,60,0.18)",borderRadius:100,padding:"13px",fontWeight:600,fontSize:14,cursor:"pointer"}}>🗑 Remove this task</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast&&<div style={{position:"fixed",bottom:110,left:"50%",transform:"translateX(-50%)",background:"rgba(42,56,28,0.92)",color:"#fff",borderRadius:100,padding:"11px 22px",fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(0,0,0,0.2)",zIndex:500,whiteSpace:"nowrap",backdropFilter:"blur(8px)"}}>{toast}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BUDGET PLANNER  — Details → Amount → Expenses → Calculate → AI Review
═══════════════════════════════════════════════════════ */
const fmtMoney=n=>`£${Number(n||0).toFixed(2)}`;
const fmtDate=d=>d?new Date(d).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}):"—";

function mkBudget(name="My Budget"){
  const now=new Date(),end=new Date(now);end.setDate(end.getDate()+30);
  return{id:Date.now(),name,period:"monthly",dateFrom:now.toISOString().slice(0,10),dateTo:end.toISOString().slice(0,10),budgetAmount:"",expenses:[],saved:false,aiReview:null};
}

function BudgetPlanner({data,setData,setScreen}){
  const [activeId,setActiveId]=useState(null);
  const active=data.find(b=>b.id===activeId);
  if(active) return <BudgetDetail budget={active} onBack={()=>setActiveId(null)} onUpdate={u=>setData(ds=>ds.map(b=>b.id===u.id?u:b))} onDelete={id=>{setData(ds=>ds.filter(b=>b.id!==id));setActiveId(null);}}/>;
  return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      
      <Header title="💰 Budget" onBack={()=>setScreen("home")} right={
        <button onClick={()=>{const b=mkBudget();setData(ds=>[...ds,b]);setActiveId(b.id);}} style={{background:"rgba(255,255,255,0.22)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,width:42,height:42,fontSize:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
      }/>
      <div style={{padding:"20px 16px"}}>
        {data.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,0.55)",marginTop:80,fontSize:15,lineHeight:2}}>Tap + to create your first budget</div>}
        {data.map(b=>{
          const tot=b.expenses.reduce((s,e)=>s+Number(e.amount||0),0);
          const rem=Number(b.budgetAmount||0)-tot;
          return(
            <div key={b.id} onClick={()=>setActiveId(b.id)} style={{background:"rgba(255,255,255,0.92)",borderRadius:18,padding:"16px 18px",marginBottom:14,boxShadow:"0 4px 18px rgba(90,80,60,0.10)",border:`2px solid ${C.ll}`,cursor:"pointer",transition:"transform 0.15s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
                <div>
                  <div style={{fontWeight:900,fontSize:17,color:C.dp}}>{b.name}</div>
                  <div style={{fontSize:12,color:C.soft,marginTop:2}}>{fmtDate(b.dateFrom)} → {fmtDate(b.dateTo)} · {b.period}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:900,fontSize:20,color:rem>=0?"#27ae60":"#e74c3c"}}>{fmtMoney(rem)}</div>
                  <div style={{fontSize:11,color:C.soft}}>{rem>=0?"remaining":"over budget"}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:10}}>
                <div style={{flex:1,background:"#e3f2fd",borderRadius:10,padding:"8px 12px",textAlign:"center"}}><div style={{fontSize:10,color:"#1565c0",fontWeight:700}}>BUDGET</div><div style={{fontSize:15,fontWeight:800,color:"#1565c0"}}>{fmtMoney(b.budgetAmount)}</div></div>
                <div style={{flex:1,background:"#fce4e4",borderRadius:10,padding:"8px 12px",textAlign:"center"}}><div style={{fontSize:10,color:"#c0392b",fontWeight:700}}>EXPENSES</div><div style={{fontSize:15,fontWeight:800,color:"#c0392b"}}>{fmtMoney(tot)}</div></div>
              </div>
              {b.saved&&<span style={{display:"inline-block",marginTop:8,background:"#e8f5e9",color:"#27ae60",fontSize:10,fontWeight:800,borderRadius:20,padding:"2px 9px"}}>✅ Saved</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BudgetDetail({budget,onBack,onUpdate,onDelete}){
  const b=budget;
  const upd=ch=>onUpdate({...b,...ch});
  const [newExp,setNewExp]=useState({label:"",amount:"",url:""});
  const [adding,setAdding]=useState(false);
  const [aiLoading,setAiLoading]=useState(false);
  const inputRef=useRef(null);
  useEffect(()=>{if(adding&&inputRef.current)inputRef.current.focus();},[adding]);

  const totalExp=b.expenses.reduce((s,e)=>s+Number(e.amount||0),0);
  const budgetAmt=Number(b.budgetAmount||0);
  const remaining=budgetAmt-totalExp;
  const inGreen=remaining>=0;
  const pct=budgetAmt>0?Math.min(100,(totalExp/budgetAmt)*100):0;

  const addExp=()=>{if(!newExp.label.trim()||!newExp.amount)return;upd({expenses:[...b.expenses,{id:Date.now(),label:newExp.label.trim(),amount:newExp.amount,url:newExp.url.trim()}]});setNewExp({label:"",amount:"",url:""});setAdding(false);};
  const delExp=id=>upd({expenses:b.expenses.filter(e=>e.id!==id)});

  const getAIReview=async()=>{
    setAiLoading(true);
    try{
      const budgetPrompt="Budget: "+b.name+" | Period: "+b.period+" ("+b.dateFrom+" to "+b.dateTo+")\nTotal budget: £"+budgetAmt.toFixed(2)+"\nTotal expenses: £"+totalExp.toFixed(2)+"\nRemaining: £"+remaining.toFixed(2)+" ("+(inGreen?"in budget":"over budget")+")\nExpenses: "+(b.expenses.map(e=>e.label+": £"+e.amount).join(", ")||"none listed");
      const res={ok:true};const j={content:[{text:await callAI("You are a warm friendly financial coach. Give exactly 5 short practical encouraging observations about this budget. Return ONLY a JSON array of 5 strings. No markdown.\n\n"+budgetPrompt,600)}]};
      upd({aiReview:JSON.parse((j.content?.[0]?.text||"[]").replace(/\`\`\`json|\`\`\`/g,"").trim())});
    }catch{upd({aiReview:["Could not reach AI — please try again."]});}
    setAiLoading(false);
  };

  const SectionLabel=({n,label})=><div style={{marginBottom:6,fontSize:11,fontWeight:800,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",letterSpacing:1.5}}>{n} · {label}</div>;

  return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title={b.name} onBack={onBack} right={
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>upd({saved:!b.saved})} style={{background:b.saved?"rgba(39,174,96,0.35)":"rgba(255,255,255,0.18)",color:"#1A1A10",border:`1.5px solid ${b.saved?"#27ae60":"rgba(255,255,255,0.35)"}`,borderRadius:10,padding:"6px 12px",fontWeight:800,fontSize:12,cursor:"pointer"}}>{b.saved?"✅ Saved":"💾 Save"}</button>
          <button onClick={()=>{if(window.confirm("Delete this budget?"))onDelete(b.id);}} style={{background:"rgba(192,57,43,0.3)",color:"#1A1A10",border:"1.5px solid rgba(255,100,100,0.4)",borderRadius:10,padding:"6px 10px",fontWeight:800,fontSize:13,cursor:"pointer"}}>🗑</button>
        </div>
      }/>
      <div style={{padding:"16px 14px"}}>

        {/* 1. BUDGET DETAILS */}
        <SectionLabel n="1" label="Budget Details"/>
        <GlassCard style={{marginBottom:18}}>
          <input value={b.name} onChange={e=>upd({name:e.target.value})} placeholder="Budget name" style={{width:"100%",boxSizing:"border-box",padding:"10px 13px",borderRadius:10,border:`1.5px solid ${C.lp}`,fontSize:15,fontWeight:700,color:C.txt,outline:"none",marginBottom:10}}/>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            {["weekly","monthly","custom"].map(p=>(
              <button key={p} onClick={()=>upd({period:p})} style={{flex:1,padding:"8px 4px",borderRadius:10,border:`2px solid ${C.lp}`,background:b.period===p?btnGrad:"transparent",color:b.period===p?C.wh:C.mp,fontWeight:800,fontSize:12,cursor:"pointer",textTransform:"capitalize"}}>{p}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:10}}>
            <div style={{flex:1}}><div style={{fontSize:11,color:C.soft,fontWeight:700,marginBottom:4}}>From</div><input type="date" value={b.dateFrom} onChange={e=>upd({dateFrom:e.target.value})} style={{width:"100%",boxSizing:"border-box",padding:"8px 10px",borderRadius:10,border:`1.5px solid ${C.lp}`,fontSize:13,color:C.txt,outline:"none"}}/></div>
            <div style={{flex:1}}><div style={{fontSize:11,color:C.soft,fontWeight:700,marginBottom:4}}>To</div><input type="date" value={b.dateTo} onChange={e=>upd({dateTo:e.target.value})} style={{width:"100%",boxSizing:"border-box",padding:"8px 10px",borderRadius:10,border:`1.5px solid ${C.lp}`,fontSize:13,color:C.txt,outline:"none"}}/></div>
          </div>
        </GlassCard>

        {/* 2. BUDGET AMOUNT */}
        <SectionLabel n="2" label="Budget Amount"/>
        <GlassCard style={{marginBottom:18}}>
          <div style={{fontSize:13,color:C.soft,marginBottom:8}}>How much do you have to spend?</div>
          <div style={{display:"flex",alignItems:"center",gap:10,background:C.pale,borderRadius:12,padding:"12px 16px",border:`2px solid ${C.lp}`}}>
            <span style={{fontSize:22,fontWeight:900,color:C.mp}}>£</span>
            <input type="number" value={b.budgetAmount} onChange={e=>upd({budgetAmount:e.target.value})} placeholder="0.00" min="0" step="0.01" style={{flex:1,border:"none",background:"transparent",fontSize:26,fontWeight:900,color:C.dp,outline:"none"}}/>
          </div>
        </GlassCard>

        {/* 3. EXPENSES */}
        <SectionLabel n="3" label="Expenses"/>
        <GlassCard style={{marginBottom:18}}>
          {b.expenses.length===0&&!adding&&<div style={{color:C.soft,fontSize:13,fontStyle:"italic",marginBottom:10}}>No expenses added yet</div>}
          {b.expenses.map((e,i)=>(
            <div key={e.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<b.expenses.length-1?`1px solid ${C.ll}`:"none"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:C.pp,flexShrink:0}}/>
              <span style={{flex:1,fontWeight:600,fontSize:14,color:C.txt}}>{e.label}</span>
              <span style={{fontWeight:800,fontSize:15,color:"#c0392b"}}>{fmtMoney(e.amount)}</span>
              <button onClick={()=>delExp(e.id)} style={{background:"#fce4e4",color:"#c0392b",border:"none",borderRadius:7,width:26,height:26,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🗑</button>
            </div>
          ))}
          {adding?(
            <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:8}}>
              <input ref={inputRef} value={newExp.label} onChange={e=>setNewExp(d=>({...d,label:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addExp()} placeholder="Expense name e.g. Rent" style={{width:"100%",boxSizing:"border-box",padding:"9px 13px",borderRadius:10,border:`1.5px solid ${C.lp}`,fontSize:14,fontWeight:600,color:C.txt,outline:"none"}}/>
              <div style={{display:"flex",alignItems:"center",gap:6,background:C.pale,borderRadius:10,padding:"9px 13px",border:`1.5px solid ${C.lp}`}}>
                <span style={{fontWeight:800,color:C.soft,fontSize:16}}>£</span>
                <input type="number" value={newExp.amount} onChange={e=>setNewExp(d=>({...d,amount:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addExp()} placeholder="0.00" min="0" step="0.01" style={{flex:1,border:"none",background:"transparent",fontSize:16,fontWeight:700,color:C.txt,outline:"none"}}/>
              </div>
              <UrlField value={newExp.url} onChange={v=>setNewExp(d=>({...d,url:v}))} style={{marginBottom:8}}/>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>{setAdding(false);setNewExp({label:"",amount:"",url:""}); }} style={{flex:1,background:C.ll,color:C.mid,border:"none",borderRadius:10,padding:"10px",fontWeight:700,cursor:"pointer"}}>Cancel</button>
                <button onClick={addExp} style={{flex:2,background:btnGrad,color:"#1A1A10",border:"none",borderRadius:10,padding:"10px",fontWeight:800,cursor:"pointer"}}>Add Expense</button>
              </div>
            </div>
          ):(
            <button onClick={()=>setAdding(true)} style={{marginTop:b.expenses.length>0?10:0,width:"100%",padding:"10px",background:"transparent",color:C.pp,border:`2px dashed ${C.lp}`,borderRadius:12,fontWeight:800,fontSize:14,cursor:"pointer"}}>+ Add Expense</button>
          )}
        </GlassCard>

        {/* 4. CALCULATE */}
        <SectionLabel n="4" label="Calculate"/>
        <div style={{background:inGreen?"linear-gradient(135deg,#1a5276,#2980b9)":"linear-gradient(135deg,#7d1a1a,#c0392b)",borderRadius:20,padding:"20px",marginBottom:14,boxShadow:`0 6px 24px ${inGreen?"rgba(41,128,185,0.35)":"rgba(192,57,43,0.35)"}`}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:16,gap:4}}>
            <div style={{textAlign:"center",flex:1}}><div style={{color:"rgba(255,255,255,0.7)",fontSize:10,fontWeight:700,marginBottom:4}}>BUDGET</div><div style={{color:"#1A1A10",fontWeight:900,fontSize:18}}>{fmtMoney(budgetAmt)}</div></div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:22,alignSelf:"center"}}>−</div>
            <div style={{textAlign:"center",flex:1}}><div style={{color:"rgba(255,255,255,0.7)",fontSize:10,fontWeight:700,marginBottom:4}}>EXPENSES</div><div style={{color:"#1A1A10",fontWeight:900,fontSize:18}}>{fmtMoney(totalExp)}</div></div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:22,alignSelf:"center"}}>=</div>
            <div style={{textAlign:"center",flex:1}}><div style={{color:"rgba(255,255,255,0.7)",fontSize:10,fontWeight:700,marginBottom:4}}>{inGreen?"LEFT":"OVER"}</div><div style={{color:"#1A1A10",fontWeight:900,fontSize:18}}>{fmtMoney(Math.abs(remaining))}</div></div>
          </div>
          {budgetAmt>0&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:"rgba(255,255,255,0.7)",fontSize:11}}>Budget used</span><span style={{color:"#1A1A10",fontWeight:800,fontSize:11}}>{pct.toFixed(0)}%</span></div>
              <div style={{height:8,borderRadius:4,background:"rgba(255,255,255,0.2)",overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(100,pct)}%`,borderRadius:4,background:pct>90?"#FF0022":pct>70?"#FF9100":"rgba(255,255,255,0.85)",transition:"width 0.4s"}}/></div>
            </div>
          )}
          <div style={{color:"rgba(255,255,255,0.85)",fontSize:14,fontWeight:700,textAlign:"center",marginTop:12}}>
            {inGreen?`✅ £${Math.abs(remaining).toFixed(2)} within budget`:`⚠️ £${Math.abs(remaining).toFixed(2)} over budget`}
          </div>
        </div>

        {/* 5. AI REVIEW */}
        <SectionLabel n="5" label="AI Review"/>
        {!b.aiReview?(
          <button onClick={getAIReview} style={{width:"100%",padding:"14px",background:btnGrad,color:"#1A1A10",border:"none",borderRadius:16,fontWeight:800,fontSize:15,cursor:"pointer",opacity:aiLoading?0.7:1,boxShadow:"0 4px 16px rgba(45,10,94,0.3)"}}>{aiLoading?"🤖 Analysing…":"🤖 Get 5-Point AI Review"}</button>
        ):(
          <div>
            {b.aiReview.map((pt,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,0.92)",borderRadius:14,padding:"13px 15px",marginBottom:10,border:`1.5px solid ${C.ll}`,display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:btnGrad,color:"#1A1A10",fontWeight:900,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                <div style={{fontSize:14,color:C.txt,lineHeight:1.6,fontWeight:600}}>{pt}</div>
              </div>
            ))}
            <button onClick={()=>{upd({aiReview:null});setTimeout(getAIReview,100);}} style={{width:"100%",padding:"12px",background:"rgba(255,255,255,0.15)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:14,fontWeight:700,fontSize:13,cursor:"pointer",marginTop:4}}>🔄 Refresh Review</button>
          </div>
        )}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   SHOPPING LIST  — multiple named lists, tick off items,
   quantities, notes, URL per item, sort by category
═══════════════════════════════════════════════════════ */
const SHOP_LIST_ICONS=["🛒","🎁","🍎","👗","🏠","🐾","💊","📚","🎉","✈️"];
const SHOP_CATS=["General","Fresh Food","Frozen","Drinks","Household","Health & Beauty","Baby & Kids","Pets","Clothing","Electronics","Other"];
const CAT_COLORS={"General":"#5A7848","Fresh Food":"#27ae60","Frozen":"#2980b9","Drinks":"#e67e22","Household":"#8e44ad","Health & Beauty":"#e91e8c","Baby & Kids":"#f39c12","Pets":"#16a085","Clothing":"#c0392b","Electronics":"#1a5276","Other":"#546e7a"};

function mkShopList(name="Groceries",icon="🛒"){
  return {id:Date.now(),name,icon,items:[],created:Date.now()};
}
function mkItem(name){
  return {id:Date.now(),name:name.trim(),qty:"1",unit:"",cat:"General",note:"",url:"",checked:false};
}

function ShoppingList({data,setData,setScreen}){
  const [activeId,setActiveId]=useState(null);
  const [adding,setAdding]=useState(false);
  const [newName,setNewName]=useState("");
  const [newIcon,setNewIcon]=useState("🛒");
  const inputRef=useRef(null);
  useEffect(()=>{if(adding&&inputRef.current)inputRef.current.focus();},[adding]);

  const active=data.find(l=>l.id===activeId);
  if(active) return <ShopListDetail list={active} onBack={()=>setActiveId(null)} onUpdate={u=>setData(ds=>ds.map(l=>l.id===u.id?u:l))} onDelete={id=>{setData(ds=>ds.filter(l=>l.id!==id));setActiveId(null);}}/>;

  const submit=()=>{
    if(!newName.trim())return;
    setData(ds=>[...ds,mkShopList(newName.trim(),newIcon)]);
    setNewName("");setNewIcon("🛒");setAdding(false);
  };

  return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      
      <Header title="🛒 Shopping" onBack={()=>setScreen("home")} right={
        <button onClick={()=>setAdding(true)} style={{background:"rgba(255,255,255,0.22)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,width:42,height:42,fontSize:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
      }/>
      <div style={{padding:"20px 16px"}}>

        {/* New list form */}
        {adding&&(
          <GlassCard style={{marginBottom:18}}>
            <div style={{fontWeight:800,color:C.dp,fontSize:14,marginBottom:12}}>New Shopping List</div>
            <input ref={inputRef} value={newName} onChange={e=>setNewName(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter")submit();if(e.key==="Escape"){setAdding(false);setNewName("");}}}
              placeholder="e.g. Groceries, Christmas Presents…"
              style={{width:"100%",boxSizing:"border-box",padding:"10px 13px",borderRadius:10,border:`1.5px solid ${C.lp}`,fontSize:15,fontWeight:600,color:C.txt,outline:"none",marginBottom:12}}/>
            {/* Icon picker */}
            <div style={{fontSize:12,fontWeight:700,color:C.soft,marginBottom:8}}>Choose an icon</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
              {SHOP_LIST_ICONS.map(ic=>(
                <button key={ic} onClick={()=>setNewIcon(ic)} style={{fontSize:22,width:40,height:40,borderRadius:10,border:`2px solid ${newIcon===ic?C.pp:C.ll}`,background:newIcon===ic?C.ll:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {ic}
                </button>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"flex-end",gap:8}}>
              <button onClick={()=>{setAdding(false);setNewName("");}} style={{background:"transparent",color:C.soft,border:"none",fontWeight:700,fontSize:14,cursor:"pointer"}}>Cancel</button>
              <PurpleBtn onClick={submit}>Create List</PurpleBtn>
            </div>
          </GlassCard>
        )}

        {data.length===0&&!adding&&(
          <div style={{textAlign:"center",color:"rgba(255,255,255,0.55)",marginTop:80,fontSize:15,lineHeight:2}}>
            Tap + to create your first shopping list
          </div>
        )}

        {data.map((list,i)=>{
          const total=list.items.length;
          const done=list.items.filter(it=>it.checked).length;
          const pct=total>0?Math.round((done/total)*100):0;
          const grads=[
            `linear-gradient(135deg,#6a1b9a,#9c27b0)`,
            `linear-gradient(135deg,#1565c0,#1976d2)`,
            `linear-gradient(135deg,#2e7d32,#388e3c)`,
            `linear-gradient(135deg,#e65100,#f57c00)`,
            `linear-gradient(135deg,#880e4f,#c2185b)`,
          ];
          const grad=grads[i%grads.length];
          return(
            <div key={list.id} onClick={()=>setActiveId(list.id)}
              style={{background:"rgba(255,255,255,0.92)",borderRadius:20,marginBottom:14,overflow:"hidden",boxShadow:"0 4px 18px rgba(90,80,60,0.12)",border:`1.5px solid ${C.ll}`,cursor:"pointer",transition:"transform 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              {/* Coloured header */}
              <div style={{background:grad,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:44,height:44,borderRadius:12,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{list.icon}</div>
                <div style={{flex:1}}>
                  <div style={{color:"#1A1A10",fontWeight:900,fontSize:18}}>{list.name}</div>
                  <div style={{color:"rgba(255,255,255,0.75)",fontSize:12,marginTop:2}}>{done}/{total} items done</div>
                </div>
                <button onClick={e=>{e.stopPropagation();setData(ds=>ds.filter(l=>l.id!==list.id));}} style={{background:"rgba(255,255,255,0.18)",color:"#1A1A10",border:"1px solid rgba(255,255,255,0.3)",borderRadius:9,width:32,height:32,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
              </div>
              {/* Progress bar */}
              <div style={{height:5,background:C.ll}}>
                <div style={{height:"100%",width:`${pct}%`,background:pct===100?"#5A9040":"#6A8858",transition:"width 0.4s"}}/>
              </div>
              {/* Item preview */}
              <div style={{padding:"10px 16px"}}>
                {total===0?(
                  <div style={{color:C.soft,fontSize:13,fontStyle:"italic"}}>No items yet — tap to add</div>
                ):(
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {list.items.filter(it=>!it.checked).slice(0,5).map(it=>(
                      <span key={it.id} style={{background:C.ll,color:C.mp,fontSize:11,fontWeight:700,borderRadius:20,padding:"2px 9px"}}>{it.name}</span>
                    ))}
                    {list.items.filter(it=>!it.checked).length>5&&<span style={{color:C.soft,fontSize:11,alignSelf:"center"}}>+{list.items.filter(it=>!it.checked).length-5} more</span>}
                    {pct===100&&<span style={{color:"#27ae60",fontSize:12,fontWeight:800}}>✅ All done!</span>}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShopListDetail({list,onBack,onUpdate,onDelete}){
  const [newItemText,setNewItemText]=useState("");
  const [editItem,setEditItem]=useState(null); // full item being edited
  const [filterCat,setFilterCat]=useState("All");
  const [showDone,setShowDone]=useState(true);
  const [sortByCat,setSortByCat]=useState(false);
  const [dragItemId,setDragItemId]=useState(null);
  const inputRef=useRef(null);

  const upd=changes=>onUpdate({...list,...changes});
  const updItems=items=>upd({items});

  const addItem=()=>{
    if(!newItemText.trim())return;
    updItems([...list.items,mkItem(newItemText)]);
    setNewItemText("");
    if(inputRef.current)inputRef.current.focus();
  };

  const toggle=id=>updItems(list.items.map(it=>it.id===id?{...it,checked:!it.checked}:it));
  const del=id=>updItems(list.items.filter(it=>it.id!==id));
  const saveEdit=()=>{
    if(!editItem)return;
    updItems(list.items.map(it=>it.id===editItem.id?editItem:it));
    setEditItem(null);
  };
  const clearDone=()=>updItems(list.items.filter(it=>!it.checked));

  const itemDragOver=(e,toId)=>{
    e.preventDefault();
    if(!dragItemId||dragItemId===toId)return;
    // Only reorder within the master items array (not the filtered view)
    const arr=[...list.items];
    const fi=arr.findIndex(x=>x.id===dragItemId);
    const ti=arr.findIndex(x=>x.id===toId);
    if(fi<0||ti<0)return;
    const [moved]=arr.splice(fi,1);
    arr.splice(ti,0,moved);
    updItems(arr);
  };

  const cats=[...new Set(list.items.map(it=>it.cat))].filter(Boolean);
  const totalDone=list.items.filter(it=>it.checked).length;

  let visible=list.items;
  if(filterCat!=="All") visible=visible.filter(it=>it.cat===filterCat);
  if(!showDone) visible=visible.filter(it=>!it.checked);
  if(sortByCat) visible=[...visible].sort((a,b)=>a.cat.localeCompare(b.cat));

  // Group by category when sorting
  const grouped=sortByCat
    ? SHOP_CATS.filter(c=>visible.some(it=>it.cat===c)).map(c=>({cat:c,items:visible.filter(it=>it.cat===c)}))
    : [{cat:null,items:visible}];

  return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title={`${list.icon} ${list.name}`} onBack={onBack} right={
        <button onClick={()=>{if(window.confirm("Delete this list?"))onDelete(list.id);}} style={{background:"rgba(192,57,43,0.3)",color:"#1A1A10",border:"1.5px solid rgba(255,100,100,0.4)",borderRadius:10,padding:"6px 10px",fontWeight:800,fontSize:13,cursor:"pointer"}}>🗑</button>
      }/>

      {/* Progress bar */}
      {list.items.length>0&&(
        <div style={{height:5,background:"rgba(255,255,255,0.15)"}}>
          <div style={{height:"100%",width:`${Math.round((totalDone/list.items.length)*100)}%`,background:totalDone===list.items.length?"#27ae60":C.lp,transition:"width 0.4s"}}/>
        </div>
      )}

      <div style={{padding:"14px 14px"}}>

        {/* Quick add bar */}
        <div style={{display:"flex",gap:8,marginBottom:10,background:"rgba(255,255,255,0.92)",borderRadius:14,padding:"10px 14px",border:`1.5px solid ${C.ll}`,boxShadow:"0 2px 10px rgba(90,80,60,0.08)"}}>
          <input ref={inputRef} value={newItemText} onChange={e=>setNewItemText(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&addItem()}
            placeholder="Add item… press Enter to add more"
            style={{flex:1,border:"none",outline:"none",fontSize:15,fontWeight:600,color:C.txt,background:"transparent"}}/>
          <button onClick={addItem} style={{background:btnGrad,color:"#1A1A10",border:"none",borderRadius:10,width:36,height:36,fontSize:22,cursor:"pointer",fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
        </div>

        {/* Toolbar */}
        <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
          {/* Category filter chips */}
          {["All",...cats].map(c=>(
            <button key={c} onClick={()=>setFilterCat(c)} style={{flexShrink:0,border:`1.5px solid ${c==="All"?"rgba(255,255,255,0.4)":(CAT_COLORS[c]||C.pp)+"88"}`,borderRadius:20,padding:"4px 10px",fontSize:11,cursor:"pointer",fontWeight:filterCat===c?800:600,background:filterCat===c?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.18)",color:filterCat===c?C.dp:C.wh,whiteSpace:"nowrap"}}>
              {c}
            </button>
          ))}
          {/* Sort toggle */}
          <button onClick={()=>setSortByCat(s=>!s)} style={{flexShrink:0,border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:20,padding:"4px 10px",fontSize:11,fontWeight:sortByCat?800:600,cursor:"pointer",background:sortByCat?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.15)",color:sortByCat?C.dp:C.wh}}>
            📂 By category
          </button>
          {/* Hide done */}
          <button onClick={()=>setShowDone(s=>!s)} style={{flexShrink:0,border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:20,padding:"4px 10px",fontSize:11,fontWeight:!showDone?800:600,cursor:"pointer",background:!showDone?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.15)",color:!showDone?C.dp:C.wh}}>
            {showDone?"Hide done":"Show done"}
          </button>
          {totalDone>0&&(
            <button onClick={clearDone} style={{flexShrink:0,border:"1px solid rgba(255,100,100,0.4)",borderRadius:20,padding:"4px 10px",fontSize:11,fontWeight:600,cursor:"pointer",background:"rgba(192,57,43,0.25)",color:C.wh}}>
              🗑 Clear done ({totalDone})
            </button>
          )}
        </div>

        {/* Item list */}
        {visible.length===0&&(
          <div style={{textAlign:"center",color:"rgba(255,255,255,0.5)",marginTop:40,fontSize:14,fontStyle:"italic"}}>
            {list.items.length===0?"Tap the bar above to add your first item":"Nothing to show with this filter"}
          </div>
        )}

        {grouped.map(({cat,items})=>(
          <div key={cat||"all"}>
            {cat&&(
              <div style={{display:"flex",alignItems:"center",gap:8,margin:"12px 0 6px"}}>
                <div style={{height:1,flex:1,background:`${CAT_COLORS[cat]||C.pp}`}}/>
                <span style={{fontSize:11,fontWeight:800,color:CAT_COLORS[cat]||C.wh,letterSpacing:1,textTransform:"uppercase"}}>{cat}</span>
                <div style={{height:1,flex:1,background:`${CAT_COLORS[cat]||C.pp}`}}/>
              </div>
            )}
            {items.map(item=>(
              <div key={item.id}
                draggable={!sortByCat}
                onDragStart={e=>{if(sortByCat)return;e.dataTransfer.effectAllowed="move";setDragItemId(item.id);}}
                onDragOver={e=>!sortByCat&&itemDragOver(e,item.id)}
                onDragEnd={()=>setDragItemId(null)}
                style={{background:dragItemId===item.id?"rgba(160,190,140,0.35)":item.checked?"rgba(255,255,255,0.50)":"rgba(255,255,255,0.92)",borderRadius:14,padding:"11px 14px",marginBottom:8,border:`1.5px solid ${dragItemId===item.id?C.pp:item.checked?C.done:C.ll}`,opacity:item.checked&&dragItemId!==item.id?0.7:1,transition:"all 0.2s",display:"flex",alignItems:"flex-start",gap:10,transform:dragItemId===item.id?"scale(1.02)":"scale(1)",boxShadow:dragItemId===item.id?"0 6px 20px rgba(45,10,94,0.2)":"none",cursor:sortByCat?"default":"grab"}}>

                {/* Drag handle — hidden when sorting by category */}
                {!sortByCat&&<div style={{color:"rgba(90,120,72,0.20)",fontSize:14,flexShrink:0,alignSelf:"center",lineHeight:1,cursor:"grab"}}>⠿</div>}

                {/* Checkbox */}
                <button onClick={()=>toggle(item.id)} style={{width:26,height:26,borderRadius:"50%",border:`2.5px solid ${item.checked?"#27ae60":C.lp}`,background:item.checked?"#27ae60":"transparent",cursor:"pointer",flexShrink:0,marginTop:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#1A1A10",fontSize:14,fontWeight:900}}>
                  {item.checked?"✓":""}
                </button>

                {/* Content */}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <span style={{fontWeight:700,fontSize:15,color:item.checked?C.soft:C.txt,textDecoration:item.checked?"line-through":"none"}}>{item.name}</span>
                    {item.qty&&item.qty!=="1"&&<span style={{background:C.ll,color:C.mp,fontSize:11,fontWeight:700,borderRadius:20,padding:"1px 7px"}}>{item.qty}{item.unit?" "+item.unit:""}</span>}
                    {item.cat&&item.cat!=="General"&&<span style={{background:(CAT_COLORS[item.cat]||C.pp)+"22",color:CAT_COLORS[item.cat]||C.pp,fontSize:10,fontWeight:700,borderRadius:20,padding:"1px 7px",border:`1px solid ${(CAT_COLORS[item.cat]||C.pp)+"44"}`}}>{item.cat}</span>}
                  </div>
                  {item.note&&<div style={{fontSize:12,color:C.soft,marginTop:2,lineHeight:1.4}}>{item.note}</div>}
                  {item.url?<UrlBadge url={item.url}/>:(
                    !item.checked&&<button onClick={()=>setEditItem({...item})} style={{marginTop:3,background:"transparent",border:"none",color:"#1565c0",fontSize:11,fontWeight:700,cursor:"pointer",padding:0,textDecoration:"underline",textDecorationStyle:"dotted"}}>🔗 Add link</button>
                  )}
                </div>

                {/* Edit */}
                <button onClick={()=>setEditItem({...item})} style={{background:C.ll,color:C.mp,border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✏️</button>
                {/* Delete */}
                <button onClick={()=>del(item.id)} style={{background:"#fce4e4",color:"#c0392b",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🗑</button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Edit item bottom sheet */}
      {editItem&&(
        <div style={{position:"fixed",inset:0,background:"rgba(20,5,50,0.65)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300}}>
          <div style={{background:C.wh,borderRadius:"22px 22px 0 0",padding:"0 0 30px",width:"100%",maxWidth:480,boxShadow:"0 -8px 40px rgba(45,10,94,0.4)",maxHeight:"88vh",overflowY:"auto"}}>
            <div style={{display:"flex",justifyContent:"center",padding:"12px 0 6px"}}><div style={{width:40,height:4,borderRadius:2,background:C.ll}}/></div>
            <div style={{padding:"0 18px"}}>
              <div style={{fontWeight:900,color:C.dp,fontSize:15,marginBottom:14}}>✏️ Edit Item</div>

              {/* Name */}
              <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Item name</div>
              <input value={editItem.name} onChange={e=>setEditItem(d=>({...d,name:e.target.value}))}
                style={{width:"100%",boxSizing:"border-box",padding:"10px 13px",borderRadius:10,border:`1.5px solid ${C.lp}`,fontSize:15,fontWeight:600,color:C.txt,outline:"none",marginBottom:12}}/>

              {/* Qty + Unit */}
              <div style={{display:"flex",gap:10,marginBottom:12}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Quantity</div>
                  <input value={editItem.qty} onChange={e=>setEditItem(d=>({...d,qty:e.target.value}))}
                    placeholder="1" style={{width:"100%",boxSizing:"border-box",padding:"9px 12px",borderRadius:10,border:`1.5px solid ${C.lp}`,fontSize:14,fontWeight:600,color:C.txt,outline:"none"}}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Unit</div>
                  <input value={editItem.unit} onChange={e=>setEditItem(d=>({...d,unit:e.target.value}))}
                    placeholder="kg, pcs, ml…" style={{width:"100%",boxSizing:"border-box",padding:"9px 12px",borderRadius:10,border:`1.5px solid ${C.lp}`,fontSize:14,fontWeight:600,color:C.txt,outline:"none"}}/>
                </div>
              </div>

              {/* Category */}
              <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Category</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
                {SHOP_CATS.map(c=>(
                  <button key={c} onClick={()=>setEditItem(d=>({...d,cat:c}))} style={{border:`1.5px solid ${(CAT_COLORS[c]||C.pp)+"88"}`,borderRadius:20,padding:"4px 10px",fontSize:11,cursor:"pointer",fontWeight:editItem.cat===c?800:600,background:editItem.cat===c?(CAT_COLORS[c]||C.pp):"transparent",color:editItem.cat===c?C.wh:(CAT_COLORS[c]||C.pp)}}>
                    {c}
                  </button>
                ))}
              </div>

              {/* Note */}
              <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Note</div>
              <textarea value={editItem.note} onChange={e=>setEditItem(d=>({...d,note:e.target.value}))}
                placeholder="Brand, size, any detail…" rows={2}
                style={{width:"100%",boxSizing:"border-box",padding:"9px 12px",borderRadius:10,border:`1.5px solid ${C.ll}`,fontSize:13,color:C.txt,outline:"none",resize:"none",fontFamily:"inherit",marginBottom:10}}/>

              {/* URL */}
              <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Website / Link</div>
              <UrlField value={editItem.url} onChange={v=>setEditItem(d=>({...d,url:v}))} style={{marginBottom:16}}/>

              {/* Buttons */}
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setEditItem(null)} style={{flex:1,background:C.ll,color:C.mid,border:"none",borderRadius:12,padding:"12px",fontWeight:700,fontSize:14,cursor:"pointer"}}>Cancel</button>
                <button onClick={saveEdit} style={{flex:2,background:btnGrad,color:"#1A1A10",border:"none",borderRadius:12,padding:"12px",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:"0 3px 12px rgba(45,10,94,0.3)"}}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TOOLS  — Calculator · Stopwatch · Countdown Timer ·
            Alarm · White Noise (preset + custom)
═══════════════════════════════════════════════════════ */

/* ── Calculator ─────────────────────────────────────── */
function Calculator() {
  const [disp,setDisp]=useState("0");
  const [expr,setExpr]=useState("");
  const [justEvaled,setJustEvaled]=useState(false);

  const press=btn=>{
    if(btn==="C"){setDisp("0");setExpr("");setJustEvaled(false);return;}
    if(btn==="⌫"){setDisp(d=>d.length>1?d.slice(0,-1):"0");setJustEvaled(false);return;}
    if(btn==="="){
      try{
        const raw=expr+disp;
        // safe eval via Function
        const result=Function('"use strict";return ('+raw+')')();
        const str=Number.isFinite(result)?parseFloat(result.toFixed(10)).toString():"Error";
        setDisp(str);setExpr("");setJustEvaled(true);
      }catch{setDisp("Error");setExpr("");setJustEvaled(true);}
      return;
    }
    if(["+","-","×","÷"].includes(btn)){
      const op=btn==="×"?"*":btn==="÷"?"/":btn;
      setExpr(justEvaled?disp+op:expr+disp+op);
      setDisp("0");setJustEvaled(false);return;
    }
    if(btn==="."){
      if(disp.includes("."))return;
      setDisp(d=>d+"."); setJustEvaled(false);return;
    }
    if(btn==="+/-"){setDisp(d=>d.startsWith("-")?d.slice(1):"-"+d);return;}
    if(btn==="%"){setDisp(d=>(parseFloat(d)/100).toString());return;}
    setDisp(d=>(justEvaled||d==="0")?btn:d+btn);
    setJustEvaled(false);
  };

  const rows=[
    ["C","+/-","%","÷"],
    ["7","8","9","×"],
    ["4","5","6","-"],
    ["1","2","3","+"],
    ["0",".","⌫","="],
  ];

  const isOp=b=>["÷","×","-","+","="].includes(b);
  const isGrey=b=>["C","+/-","%"].includes(b);

  return(
    <div style={{background:"rgba(255,255,255,0.10)",borderRadius:22,overflow:"hidden",boxShadow:"0 4px 24px rgba(45,10,94,0.2)"}}>
      {/* Display */}
      <div style={{padding:"18px 20px 10px",textAlign:"right"}}>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.4)",minHeight:18,fontFamily:"monospace"}}>{expr}{expr?" ":""}</div>
        <div style={{fontSize:44,fontWeight:300,color:"#1A1A10",fontFamily:"monospace",lineHeight:1.1,wordBreak:"break-all"}}>{disp}</div>
      </div>
      {/* Buttons */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2,padding:"0 2px 2px"}}>
        {rows.flat().map((btn,i)=>(
          <button key={i} onClick={()=>press(btn)} style={{
            padding:"20px 0",fontSize:btn==="⌫"?18:20,fontWeight:isOp(btn)?400:600,
            background:isOp(btn)?"#5A7848":isGrey(btn)?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.12)",
            color:isGrey(btn)?"rgba(0,0,0,0.7)":C.wh,
            border:"none",cursor:"pointer",borderRadius:4,
            gridColumn:btn==="0"?"span 1":undefined,
            transition:"opacity 0.1s",
          }}
          onMouseDown={e=>e.currentTarget.style.opacity="0.7"}
          onMouseUp={e=>e.currentTarget.style.opacity="1"}
          >{btn}</button>
        ))}
      </div>
    </div>
  );
}

/* ── Stopwatch ───────────────────────────────────────── */
function Stopwatch() {
  const [ms,setMs]=useState(0);
  const [on,setOn]=useState(false);
  const [laps,setLaps]=useState([]);
  const ref=useRef(null);
  const startRef=useRef(null);
  const accRef=useRef(0);

  useEffect(()=>{
    if(on){
      startRef.current=Date.now()-accRef.current;
      ref.current=setInterval(()=>setMs(Date.now()-startRef.current),30);
    } else {
      clearInterval(ref.current);
      accRef.current=ms;
    }
    return()=>clearInterval(ref.current);
  },[on]);

  const reset=()=>{setOn(false);setMs(0);setLaps([]);accRef.current=0;};
  const lap=()=>{if(on)setLaps(l=>[{id:Date.now(),ms,lap:ms-(l[0]?.ms||0)},...l]);};

  const fmt=t=>{
    const m=Math.floor(t/60000),s=Math.floor((t%60000)/1000),cs=Math.floor((t%1000)/10);
    return`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(cs).padStart(2,"0")}`;
  };

  return(
    <div style={{background:"rgba(255,255,255,0.10)",borderRadius:22,padding:"24px 20px",textAlign:"center"}}>
      <div style={{fontFamily:"monospace",fontSize:52,fontWeight:200,color:"#1A1A10",letterSpacing:2,marginBottom:20}}>{fmt(ms)}</div>
      <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:16}}>
        <button onClick={()=>setOn(o=>!o)} style={{background:on?"#FF0022":"#27ae60",color:"#1A1A10",border:"none",borderRadius:50,width:72,height:72,fontSize:24,cursor:"pointer",boxShadow:`0 4px 16px ${on?"rgba(255,0,34,0.4)":"rgba(39,174,96,0.4)"}`}}>
          {on?"⏸":"▶"}
        </button>
        <button onClick={lap} disabled={!on} style={{background:"rgba(255,255,255,0.2)",color:"#1A1A10",border:"none",borderRadius:50,width:72,height:72,fontSize:14,fontWeight:700,cursor:"pointer",opacity:on?1:0.4}}>Lap</button>
        <button onClick={reset} style={{background:"rgba(255,255,255,0.15)",color:"#1A1A10",border:"none",borderRadius:50,width:72,height:72,fontSize:22,cursor:"pointer"}}>↺</button>
      </div>
      {laps.length>0&&(
        <div style={{maxHeight:160,overflowY:"auto",textAlign:"left"}}>
          {laps.map((l,i)=>(
            <div key={l.id} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.1)",fontSize:13,color:"rgba(255,255,255,0.75)",fontFamily:"monospace"}}>
              <span>Lap {laps.length-i}</span>
              <span style={{color:"rgba(255,255,255,0.5)"}}>+{fmt(i===laps.length-1?l.ms:l.lap)}</span>
              <span>{fmt(l.ms)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Countdown Timer ─────────────────────────────────── */
function CountdownTool() {
  const [h,setH]=useState(0);
  const [m,setM]=useState(5);
  const [s,setS]=useState(0);
  const [left,setLeft]=useState(null);
  const [on,setOn]=useState(false);
  const [done,setDone]=useState(false);
  const ref=useRef(null);

  useEffect(()=>{
    if(on&&left>0){ref.current=setInterval(()=>setLeft(l=>l-1),1000);}
    else{ clearInterval(ref.current); if(left===0&&on){setOn(false);setDone(true);}}
    return()=>clearInterval(ref.current);
  },[on,left]);

  const total=h*3600+m*60+s;
  const start=()=>{if(total<1)return;setLeft(total);setOn(true);setDone(false);};
  const stop=()=>{setOn(false);setLeft(null);setDone(false);};
  const fmt=t=>{const hh=Math.floor(t/3600),mm=Math.floor((t%3600)/60),ss=t%60;return`${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")}:${String(ss).padStart(2,"0")}`;};
  const pct=left!==null&&total>0?(left/total)*100:100;

  return(
    <div style={{background:"rgba(255,255,255,0.10)",borderRadius:22,padding:"24px 20px",textAlign:"center"}}>
      {left!==null?(
        <>
          <div style={{fontFamily:"monospace",fontSize:52,fontWeight:200,color:left<10?"#FF0022":C.wh,letterSpacing:2,marginBottom:16}}>{fmt(left)}</div>
          <div style={{height:8,borderRadius:4,background:"rgba(255,255,255,0.15)",overflow:"hidden",marginBottom:20}}>
            <div style={{height:"100%",width:`${pct}%`,background:left<10?"rgba(192,57,43,0.8)":"#6A8858",borderRadius:4,transition:"width 1s linear"}}/>
          </div>
          {done&&<div style={{fontSize:18,fontWeight:800,color:"#FF9100",marginBottom:12}}>⏰ Time's up!</div>}
          <button onClick={stop} style={{background:"rgba(255,255,255,0.2)",color:"#1A1A10",border:"none",borderRadius:50,padding:"12px 32px",fontSize:16,fontWeight:700,cursor:"pointer"}}>Reset</button>
        </>
      ):(
        <>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:20}}>
            {[["h",h,setH,23],["m",m,setM,59],["s",s,setS,59]].map(([lbl,val,set,max])=>(
              <div key={lbl} style={{textAlign:"center"}}>
                <button onClick={()=>set(v=>Math.min(max,v+1))} style={{display:"block",background:"rgba(255,255,255,0.15)",color:"#1A1A10",border:"none",borderRadius:8,width:52,padding:"4px",fontSize:18,cursor:"pointer",marginBottom:4}}>▲</button>
                <div style={{fontFamily:"monospace",fontSize:42,fontWeight:200,color:"#1A1A10",lineHeight:1}}>{String(val).padStart(2,"0")}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",margin:"2px 0"}}>{lbl}</div>
                <button onClick={()=>set(v=>Math.max(0,v-1))} style={{display:"block",background:"rgba(255,255,255,0.15)",color:"#1A1A10",border:"none",borderRadius:8,width:52,padding:"4px",fontSize:18,cursor:"pointer",marginTop:4}}>▼</button>
              </div>
            ))}
          </div>
          {/* Presets */}
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:18,flexWrap:"wrap"}}>
            {[[0,1,0,"1m"],[0,5,0,"5m"],[0,10,0,"10m"],[0,15,0,"15m"],[0,25,0,"25m"],[0,30,0,"30m"],[1,0,0,"1h"]].map(([hv,mv,sv,lbl])=>(
              <button key={lbl} onClick={()=>{setH(hv);setM(mv);setS(sv);}} style={{background:"rgba(255,255,255,0.15)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.25)",borderRadius:20,padding:"5px 12px",fontSize:12,fontWeight:700,cursor:"pointer"}}>{lbl}</button>
            ))}
          </div>
          <button onClick={start} disabled={total<1} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:50,width:72,height:72,fontSize:24,cursor:"pointer",opacity:total>0?1:0.4,boxShadow:"0 4px 16px rgba(90,120,72,0.20)"}}>▶</button>
        </>
      )}
    </div>
  );
}

/* ── Alarm ───────────────────────────────────────────── */
function AlarmTool() {
  const [alarms,setAlarms]=useState([]);
  const [newTime,setNewTime]=useState("");
  const [newLabel,setNewLabel]=useState("");
  const [fired,setFired]=useState(null);
  const audioRef=useRef(null);

  useEffect(()=>{
    const iv=setInterval(()=>{
      const now=new Date();
      const hhmm=`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
      setAlarms(als=>als.map(a=>{
        if(a.active&&a.time===hhmm&&now.getSeconds()<5&&!a.fired){
          setFired(a);
          try{
            if(!audioRef.current){audioRef.current=new AudioContext();}
            const ctx=audioRef.current;
            [0,300,600,900].forEach(d=>{
              setTimeout(()=>{
                const o=ctx.createOscillator(),g=ctx.createGain();
                o.connect(g);g.connect(ctx.destination);
                o.frequency.value=880;g.gain.setValueAtTime(0.5,ctx.currentTime);
                g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.4);
                o.start(ctx.currentTime);o.stop(ctx.currentTime+0.4);
              },d);
            });
          }catch{}
          return{...a,fired:true};
        }
        return a;
      }));
    },1000);
    return()=>clearInterval(iv);
  },[]);

  const add=()=>{
    if(!newTime)return;
    setAlarms(as=>[...as,{id:Date.now(),time:newTime,label:newLabel||"Alarm",active:true,fired:false}]);
    setNewTime("");setNewLabel("");
  };

  return(
    <div style={{background:"rgba(255,255,255,0.10)",borderRadius:22,padding:"20px"}}>
      {/* Add alarm */}
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        <input type="time" value={newTime} onChange={e=>setNewTime(e.target.value)}
          style={{flex:"0 0 auto",padding:"9px 12px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.15)",color:"#1A1A10",fontSize:16,fontFamily:"monospace",outline:"none",colorScheme:"dark"}}/>
        <input value={newLabel} onChange={e=>setNewLabel(e.target.value)} placeholder="Label (optional)"
          style={{flex:1,padding:"9px 12px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.15)",color:"#1A1A10",fontSize:13,outline:"none",minWidth:100}}/>
        <button onClick={add} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:10,padding:"9px 18px",fontWeight:800,fontSize:14,cursor:"pointer"}}>+ Set</button>
      </div>

      {alarms.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,0.4)",fontSize:13,fontStyle:"italic"}}>No alarms set</div>}
      {alarms.map(a=>(
        <div key={a.id} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.10)",borderRadius:14,padding:"12px 14px",marginBottom:8,border:`1.5px solid ${a.active?"rgba(90,120,72,0.20)":"rgba(255,255,255,0.1)"}`}}>
          <div style={{fontFamily:"monospace",fontSize:22,fontWeight:300,color:a.active?C.wh:"rgba(255,255,255,0.4)"}}>{a.time}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:14,color:a.active?C.wh:"rgba(255,255,255,0.4)"}}>{a.label}</div>
          </div>
          {/* Toggle */}
          <div onClick={()=>setAlarms(as=>as.map(x=>x.id===a.id?{...x,active:!x.active,fired:false}:x))}
            style={{width:44,height:24,borderRadius:12,background:a.active?"#5A7848":"rgba(255,255,255,0.2)",cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0}}>
            <div style={{position:"absolute",top:2,left:a.active?22:2,width:20,height:20,borderRadius:"50%",background:C.wh,transition:"left 0.2s"}}/>
          </div>
          <button onClick={()=>setAlarms(as=>as.filter(x=>x.id!==a.id))} style={{background:"rgba(255,100,100,0.2)",color:"#f1948a",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:13}}>🗑</button>
        </div>
      ))}

      {/* Fired modal */}
      {fired&&(
        <div style={{position:"fixed",inset:0,background:"rgba(20,5,50,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500}}>
          <div style={{background:`linear-gradient(135deg,#4a148c,#7b1fa2)`,borderRadius:24,padding:"32px",textAlign:"center",boxShadow:"0 12px 48px rgba(123,31,162,0.6)",maxWidth:300,width:"90%"}}>
            <div style={{fontSize:52,marginBottom:8}}>⏰</div>
            <div style={{fontSize:24,fontWeight:900,color:"#1A1A10",marginBottom:4}}>{fired.time}</div>
            <div style={{fontSize:18,color:"rgba(255,255,255,0.8)",marginBottom:24}}>{fired.label}</div>
            <button onClick={()=>setFired(null)} style={{background:C.wh,color:"#4a148c",border:"none",borderRadius:16,padding:"14px 40px",fontWeight:900,fontSize:16,cursor:"pointer"}}>Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── White Noise ─────────────────────────────────────── */
const WN_PRESETS=[
  {id:"white",  name:"White Noise",   icon:"🌫️", gen:(ctx,stop)=>{
    const buf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
    const d=buf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
    const src=ctx.createBufferSource();src.buffer=buf;src.loop=true;src.connect(ctx.destination);src.start();
    stop.current=()=>src.stop();
  }},
  {id:"pink",   name:"Pink Noise",    icon:"🌸", gen:(ctx,stop)=>{
    const buf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
    const d=buf.getChannelData(0);let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
    for(let i=0;i<d.length;i++){const w=Math.random()*2-1;b0=0.99886*b0+w*0.0555179;b1=0.99332*b1+w*0.0750759;b2=0.96900*b2+w*0.1538520;b3=0.86650*b3+w*0.3104856;b4=0.55000*b4+w*0.5329522;b5=-0.7616*b5-w*0.0168980;d[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11;b6=w*0.115926;}
    const src=ctx.createBufferSource();src.buffer=buf;src.loop=true;src.connect(ctx.destination);src.start();
    stop.current=()=>src.stop();
  }},
  {id:"brown",  name:"Brown Noise",   icon:"🌊", gen:(ctx,stop)=>{
    const buf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
    const d=buf.getChannelData(0);let last=0;
    for(let i=0;i<d.length;i++){const w=Math.random()*2-1;last=(last+0.02*w)/1.02;d[i]=last*3.5;}
    const src=ctx.createBufferSource();src.buffer=buf;src.loop=true;src.connect(ctx.destination);src.start();
    stop.current=()=>src.stop();
  }},
  {id:"rain",   name:"Rain",          icon:"🌧️", gen:(ctx,stop)=>{
    const buf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(Math.random(),3)*0.6;
    const src=ctx.createBufferSource();src.buffer=buf;src.loop=true;
    const filt=ctx.createBiquadFilter();filt.type="lowpass";filt.frequency.value=1400;
    src.connect(filt);filt.connect(ctx.destination);src.start();
    stop.current=()=>src.stop();
  }},
  {id:"fire",   name:"Crackling Fire",icon:"🔥", gen:(ctx,stop)=>{
    const buf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
    const d=buf.getChannelData(0);let v=0;
    for(let i=0;i<d.length;i++){v=v*0.95+(Math.random()-0.5)*0.1;d[i]=v*Math.pow(Math.random(),8)*6;}
    const src=ctx.createBufferSource();src.buffer=buf;src.loop=true;
    const filt=ctx.createBiquadFilter();filt.type="bandpass";filt.frequency.value=600;filt.Q.value=0.5;
    src.connect(filt);filt.connect(ctx.destination);src.start();
    stop.current=()=>src.stop();
  }},
  {id:"ocean",  name:"Ocean Waves",   icon:"🌊", gen:(ctx,stop)=>{
    // LFO-modulated noise
    const buf=ctx.createBuffer(1,ctx.sampleRate*4,ctx.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++){const wave=(Math.sin(i/ctx.sampleRate*0.4)+1)/2;d[i]=(Math.random()*2-1)*wave*0.5;}
    const src=ctx.createBufferSource();src.buffer=buf;src.loop=true;
    const filt=ctx.createBiquadFilter();filt.type="lowpass";filt.frequency.value=900;
    src.connect(filt);filt.connect(ctx.destination);src.start();
    stop.current=()=>src.stop();
  }},
];

function WhiteNoise() {
  const [playing,setPlaying]=useState(null); // preset id or "custom"
  const [vol,setVol]=useState(0.7);
  const [customFreq,setCustomFreq]=useState(500);
  const [customType,setCustomType]=useState("sine"); // sine sawtooth square triangle
  const ctxRef=useRef(null);
  const gainRef=useRef(null);
  const stopRef=useRef(null);
  const customRef=useRef(null);

  const stopAll=()=>{
    try{stopRef.current&&stopRef.current();}catch{}
    try{customRef.current&&customRef.current.stop();}catch{}
    stopRef.current=null;customRef.current=null;
  };

  const play=async(id)=>{
    stopAll();
    if(playing===id){setPlaying(null);return;}
    try{
      if(!ctxRef.current||ctxRef.current.state==="closed") ctxRef.current=new(window.AudioContext||window.webkitAudioContext)();
      const ctx=ctxRef.current;
      if(ctx.state==="suspended")await ctx.resume();
      gainRef.current=ctx.createGain();gainRef.current.gain.value=vol;gainRef.current.connect(ctx.destination);
      const preset=WN_PRESETS.find(p=>p.id===id);
      if(preset){
        // wrap stop to go through gain
        const stopWrap={current:null};
        const origStop=stopWrap;
        preset.gen({...ctx,destination:gainRef.current},stopRef);
      }
      setPlaying(id);
    }catch(e){console.error(e);}
  };

  const playCustom=async()=>{
    stopAll();
    if(playing==="custom"){setPlaying(null);return;}
    try{
      if(!ctxRef.current||ctxRef.current.state==="closed") ctxRef.current=new(window.AudioContext||window.webkitAudioContext)();
      const ctx=ctxRef.current;
      if(ctx.state==="suspended")await ctx.resume();
      const g=ctx.createGain();g.gain.value=vol;g.connect(ctx.destination);
      const osc=ctx.createOscillator();osc.type=customType;osc.frequency.value=customFreq;
      osc.connect(g);osc.start();
      customRef.current=osc;
      setPlaying("custom");
    }catch(e){console.error(e);}
  };

  // Update volume live
  useEffect(()=>{if(gainRef.current)gainRef.current.gain.value=vol;},[vol]);

  useEffect(()=>()=>stopAll(),[]);

  return(
    <div style={{background:"rgba(255,255,255,0.10)",borderRadius:22,padding:"20px"}}>
      {/* Volume */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
        <span style={{fontSize:16}}>🔊</span>
        <input type="range" min={0} max={1} step={0.01} value={vol} onChange={e=>setVol(Number(e.target.value))}
          style={{flex:1,accentColor:"#5A7848"}}/>
        <span style={{color:"rgba(255,255,255,0.6)",fontSize:12,fontWeight:700,minWidth:32}}>{Math.round(vol*100)}%</span>
      </div>

      {/* Presets */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        {WN_PRESETS.map(p=>(
          <button key={p.id} onClick={()=>play(p.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"12px 14px",borderRadius:14,background:playing===p.id?"#5A7848":"rgba(255,255,255,0.12)",border:`1.5px solid ${playing===p.id?"#5A7848":"rgba(255,255,255,0.2)"}`,color:"#1A1A10",cursor:"pointer",fontWeight:playing===p.id?800:600,fontSize:13,transition:"all 0.15s"}}>
            <span style={{fontSize:20}}>{p.icon}</span>
            <span>{p.name}</span>
            {playing===p.id&&<span style={{marginLeft:"auto",fontSize:16}}>⏹</span>}
          </button>
        ))}
      </div>

      {/* Custom tone */}
      <div style={{background:"rgba(255,255,255,0.08)",borderRadius:16,padding:"14px"}}>
        <div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Custom Tone</div>
        <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
          {["sine","square","sawtooth","triangle"].map(t=>(
            <button key={t} onClick={()=>setCustomType(t)} style={{padding:"5px 12px",borderRadius:20,border:`1.5px solid ${customType===t?"#c4aee8":"rgba(255,255,255,0.2)"}`,background:customType===t?"rgba(160,190,140,0.35)":"transparent",color:"#1A1A10",fontSize:11,fontWeight:customType===t?800:600,cursor:"pointer",textTransform:"capitalize"}}>{t}</button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <span style={{color:"rgba(255,255,255,0.6)",fontSize:12,minWidth:48}}>Freq</span>
          <input type="range" min={20} max={2000} step={5} value={customFreq} onChange={e=>setCustomFreq(Number(e.target.value))}
            style={{flex:1,accentColor:"#c4aee8"}}/>
          <span style={{color:"rgba(255,255,255,0.6)",fontSize:12,fontWeight:700,minWidth:52}}>{customFreq}Hz</span>
        </div>
        <button onClick={playCustom} style={{width:"100%",padding:"11px",background:playing==="custom"?"#FF0022":"rgba(255,255,255,0.15)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.25)",borderRadius:12,fontWeight:800,fontSize:14,cursor:"pointer"}}>
          {playing==="custom"?"⏹ Stop Custom":"▶ Play Custom Tone"}
        </button>
      </div>
    </div>
  );
}

/* ── Tools hub ───────────────────────────────────────── */
const TOOLS=[
  {id:"calc",  name:"Calculator", icon:"🔢"},
  {id:"sw",    name:"Stopwatch",  icon:"⏱"},
  {id:"timer", name:"Timer",      icon:"⏳"},
  {id:"alarm", name:"Alarm",      icon:"⏰"},
  {id:"noise", name:"Sounds",     icon:"🎵"},
];

function Tools({setScreen}) {
  const [active,setActive]=useState("voice");

  // ── GLOBAL VOICE TO TEXT ──────────────────────────────
  const VoiceToText=()=>{
    const [listening,setListening]=useState(false);
    const [transcript,setTranscript]=useState("");
    const [copied,setCopied]=useState(false);
    const [lang,setLang]=useState("en-GB");
    const recRef=useRef(null);
    const LANGS=[
      {code:"en-GB",label:"🇬🇧 English (UK)"},
      {code:"en-US",label:"🇺🇸 English (US)"},
      {code:"es-ES",label:"🇪🇸 Spanish"},
      {code:"fr-FR",label:"🇫🇷 French"},
      {code:"de-DE",label:"🇩🇪 German"},
      {code:"it-IT",label:"🇮🇹 Italian"},
      {code:"pt-PT",label:"🇵🇹 Portuguese"},
      {code:"pl-PL",label:"🇵🇱 Polish"},
      {code:"ro-RO",label:"🇷🇴 Romanian"},
      {code:"ar-SA",label:"🇸🇦 Arabic"},
      {code:"zh-CN",label:"🇨🇳 Chinese"},
    ];
    const startListen=()=>{
      const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
      if(!SR){alert("Voice recognition not supported in this browser. Try Chrome.");return;}
      const r=new SR();
      r.lang=lang;r.continuous=true;r.interimResults=true;
      r.onresult=e=>{
        let final="",interim="";
        for(let i=e.resultIndex;i<e.results.length;i++){
          if(e.results[i].isFinal)final+=e.results[i][0].transcript+" ";
          else interim+=e.results[i][0].transcript;
        }
        setTranscript(t=>t+final);
      };
      r.onerror=()=>setListening(false);
      r.onend=()=>setListening(false);
      r.start();recRef.current=r;setListening(true);
    };
    const stopListen=()=>{recRef.current?.stop();setListening(false);};
    const copyText=()=>{navigator.clipboard?.writeText(transcript);setCopied(true);setTimeout(()=>setCopied(false),2000);};
    return(
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={{background:"rgba(248,245,236,0.90)",borderRadius:22,padding:"20px 18px",boxShadow:"0 2px 14px rgba(0,0,0,0.06)",border:"1px solid rgba(255,255,255,0.9)"}}>
          <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:18,color:"#1A1A10",marginBottom:4}}>🎙️ Voice to Text</div>
          <div style={{fontSize:13,color:"#8A8070",marginBottom:14}}>Speak — your words appear instantly</div>
          {/* Language selector */}
          <select value={lang} onChange={e=>setLang(e.target.value)}
            style={{width:"100%",padding:"10px 14px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.20)",background:"rgba(255,255,255,0.88)",fontSize:13,color:"#1A1A10",outline:"none",marginBottom:14}}>
            {LANGS.map(l=><option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
          {/* Big mic button */}
          <div style={{textAlign:"center",marginBottom:14}}>
            <button onClick={listening?stopListen:startListen} style={{
              width:80,height:80,borderRadius:"50%",
              background:listening?"rgba(192,57,43,0.85)":"#5A7848",
              color:"#fff",border:"none",cursor:"pointer",
              fontSize:32,
              boxShadow:listening?"0 0 0 8px rgba(192,57,43,0.18), 0 4px 20px rgba(192,57,43,0.35)":"0 4px 20px rgba(58,80,38,0.30)",
              transition:"all 0.2s",
            }}>
              {listening?"⏹":"🎙️"}
            </button>
            <div style={{marginTop:10,fontSize:13,fontWeight:700,color:listening?"#c0392b":"#5A7848"}}>
              {listening?"● Recording — tap to stop":"Tap to start recording"}
            </div>
          </div>
          {/* Transcript */}
          <textarea value={transcript} onChange={e=>setTranscript(e.target.value)}
            placeholder="Your words will appear here as you speak…" rows={6}
            style={{width:"100%",boxSizing:"border-box",padding:"14px 16px",borderRadius:18,border:"1.5px solid rgba(90,120,72,0.15)",background:"rgba(255,255,255,0.85)",fontSize:14,color:"#1A1A10",outline:"none",resize:"none",fontFamily:"'Segoe UI',sans-serif",lineHeight:1.7,marginBottom:10}}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={copyText} style={{flex:1,padding:"12px",background:copied?"rgba(90,160,80,0.15)":"rgba(90,120,72,0.10)",color:copied?"#2A7020":"#3A6020",border:"1.5px solid rgba(90,120,72,0.22)",borderRadius:100,fontWeight:700,fontSize:13,cursor:"pointer"}}>
              {copied?"✅ Copied":"📋 Copy"}
            </button>
            <button onClick={()=>setTranscript("")} style={{flex:1,padding:"12px",background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,fontWeight:600,fontSize:13,cursor:"pointer"}}>Clear</button>
          </div>
        </div>
        <div style={{background:"rgba(248,245,236,0.80)",borderRadius:20,padding:"14px 16px",border:"1px solid rgba(90,120,72,0.12)"}}>
          <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,color:"#1A1A10",marginBottom:6}}>💡 Works everywhere</div>
          <div style={{fontSize:12,color:"#8A8070",lineHeight:1.7}}>Use this to dictate notes, tasks, goals, or anything. Copy and paste into any screen in Thinko.</div>
        </div>
      </div>
    );
  };

  // ── TRANSLATOR ────────────────────────────────────────
  const Translator=()=>{
    const [srcText,setSrcText]=useState("");
    const [result,setResult]=useState("");
    const [srcLang,setSrcLang]=useState("en");
    const [tgtLang,setTgtLang]=useState("es");
    const [loading,setLoading]=useState(false);
    const [copied,setCopied]=useState(false);
    const TLANGS=[
      {code:"en",label:"🇬🇧 English"},{code:"es",label:"🇪🇸 Spanish"},{code:"fr",label:"🇫🇷 French"},
      {code:"de",label:"🇩🇪 German"},{code:"it",label:"🇮🇹 Italian"},{code:"pt",label:"🇵🇹 Portuguese"},
      {code:"pl",label:"🇵🇱 Polish"},{code:"ro",label:"🇷🇴 Romanian"},{code:"nl",label:"🇳🇱 Dutch"},
      {code:"ar",label:"🇸🇦 Arabic"},{code:"zh",label:"🇨🇳 Chinese"},{code:"ja",label:"🇯🇵 Japanese"},
      {code:"ko",label:"🇰🇷 Korean"},{code:"hi",label:"🇮🇳 Hindi"},{code:"tr",label:"🇹🇷 Turkish"},
      {code:"ru",label:"🇷🇺 Russian"},{code:"uk",label:"🇺🇦 Ukrainian"},{code:"sv",label:"🇸🇪 Swedish"},
    ];
    const langLabel=c=>TLANGS.find(l=>l.code===c)?.label||c;
    const translate=async()=>{
      if(!srcText.trim())return;
      setLoading(true);setResult("");
      try{
        // MyMemory free translation API — no key, no CORS issues
        const langPair=`${srcLang}|${tgtLang}`;
        const url=`https://api.mymemory.translated.net/get?q=${encodeURIComponent(srcText)}&langpair=${langPair}`;
        const res=await fetch(url);
        const txt=j.responseData?.translatedText;
        if(txt&&txt!==srcText){
          setResult(txt);
        } else {
          setResult("Translation unavailable — try a shorter phrase");
        }
      }catch{setResult("Translation failed — check connection");}
      setLoading(false);
    };
    const swap=()=>{setSrcLang(tgtLang);setTgtLang(srcLang);setSrcText(result);setResult("");};
    return(
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div style={{background:"rgba(248,245,236,0.90)",borderRadius:22,padding:"20px 18px",boxShadow:"0 2px 14px rgba(0,0,0,0.06)",border:"1px solid rgba(255,255,255,0.9)"}}>
          <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:18,color:"#1A1A10",marginBottom:14}}>🌍 Translator</div>
          {/* Lang row */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <select value={srcLang} onChange={e=>setSrcLang(e.target.value)}
              style={{flex:1,padding:"10px 12px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.20)",background:"rgba(255,255,255,0.88)",fontSize:12,color:"#1A1A10",outline:"none"}}>
              {TLANGS.map(l=><option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
            <button onClick={swap} style={{background:"rgba(90,120,72,0.12)",color:"#3A6020",border:"1.5px solid rgba(90,120,72,0.22)",borderRadius:"50%",width:36,height:36,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>⇄</button>
            <select value={tgtLang} onChange={e=>setTgtLang(e.target.value)}
              style={{flex:1,padding:"10px 12px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.20)",background:"rgba(255,255,255,0.88)",fontSize:12,color:"#1A1A10",outline:"none"}}>
              {TLANGS.map(l=><option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </div>
          <textarea value={srcText} onChange={e=>setSrcText(e.target.value)}
            placeholder="Type or paste text to translate…" rows={4}
            style={{width:"100%",boxSizing:"border-box",padding:"13px 16px",borderRadius:18,border:"1.5px solid rgba(90,120,72,0.15)",background:"rgba(255,255,255,0.85)",fontSize:14,color:"#1A1A10",outline:"none",resize:"none",fontFamily:"'Segoe UI',sans-serif",lineHeight:1.65,marginBottom:10}}/>
          <button onClick={translate} disabled={loading||!srcText.trim()} style={{width:"100%",padding:"13px",background:loading||!srcText.trim()?"rgba(90,80,60,0.08)":"linear-gradient(135deg,#3E6828,#5E9040)",color:loading||!srcText.trim()?"#8A8070":"#fff",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,cursor:loading||!srcText.trim()?"default":"pointer",marginBottom:12,boxShadow:loading||!srcText.trim()?"none":"0 3px 12px rgba(58,80,38,0.25)"}}>
            {loading?"🌿 Translating…":"🌍 Translate"}
          </button>
          {result&&(
            <div style={{background:"rgba(90,120,72,0.06)",borderRadius:18,padding:"14px 16px",border:"1px solid rgba(90,120,72,0.12)"}}>
              <div style={{fontSize:14,color:"#1A2810",lineHeight:1.7,fontFamily:"'Segoe UI',sans-serif",marginBottom:10}}>{result}</div>
              <button onClick={()=>{navigator.clipboard?.writeText(result);setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{background:copied?"rgba(90,160,80,0.15)":"rgba(90,120,72,0.10)",color:"#3A6020",border:"none",borderRadius:100,padding:"7px 16px",fontSize:12,fontWeight:700,cursor:"pointer"}}>
                {copied?"✅ Copied":"📋 Copy"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── CURRENCY CONVERTER ────────────────────────────────
  const CurrencyConverter=()=>{
    const [amount,setAmount]=useState("100");
    const [from,setFrom]=useState("GBP");
    const [to,setTo]=useState("USD");
    const [result,setResult]=useState(null);
    const [loading,setLoading]=useState(false);
    const [rates,setRates]=useState(null);
    const CURRENCIES=[
      {code:"GBP",flag:"🇬🇧",name:"British Pound"},
      {code:"USD",flag:"🇺🇸",name:"US Dollar"},
      {code:"EUR",flag:"🇪🇺",name:"Euro"},
      {code:"JPY",flag:"🇯🇵",name:"Japanese Yen"},
      {code:"CAD",flag:"🇨🇦",name:"Canadian Dollar"},
      {code:"AUD",flag:"🇦🇺",name:"Australian Dollar"},
      {code:"CHF",flag:"🇨🇭",name:"Swiss Franc"},
      {code:"CNY",flag:"🇨🇳",name:"Chinese Yuan"},
      {code:"INR",flag:"🇮🇳",name:"Indian Rupee"},
      {code:"PLN",flag:"🇵🇱",name:"Polish Złoty"},
      {code:"RON",flag:"🇷🇴",name:"Romanian Leu"},
      {code:"SEK",flag:"🇸🇪",name:"Swedish Krona"},
      {code:"NOK",flag:"🇳🇴",name:"Norwegian Krone"},
      {code:"DKK",flag:"🇩🇰",name:"Danish Krone"},
      {code:"TRY",flag:"🇹🇷",name:"Turkish Lira"},
      {code:"BRL",flag:"🇧🇷",name:"Brazilian Real"},
      {code:"MXN",flag:"🇲🇽",name:"Mexican Peso"},
      {code:"ZAR",flag:"🇿🇦",name:"South African Rand"},
      {code:"AED",flag:"🇦🇪",name:"UAE Dirham"},
      {code:"SGD",flag:"🇸🇬",name:"Singapore Dollar"},
    ];
    const flagOf=code=>CURRENCIES.find(c=>c.code===code)?.flag||"💱";
    const convert=async()=>{
      if(!amount||isNaN(amount))return;
      setLoading(true);setResult(null);
      try{
        // Use free Open Exchange Rates (no key needed for latest via frankfurter)
        // Try exchangerate-api (free, reliable CORS)
        const url=`https://open.er-api.com/v6/latest/${from}`;
        const res=await fetch(url,{mode:"cors"});
        if(!res.ok)throw new Error("Rate fetch failed");
        const converted=j.rates?.[to];
        if(converted!=null){setResult({value:converted,rate:converted/parseFloat(amount)});setRates(j.rates);}
        else setResult({error:"Rate unavailable for that currency pair"});
      }catch{setResult({error:"Couldn't fetch rates — check connection"});}
      setLoading(false);
    };
    const swap=()=>{setFrom(to);setTo(from);setResult(null);};
    const fmt=(n,code)=>new Intl.NumberFormat("en-GB",{style:"currency",currency:code,maximumFractionDigits:2}).format(n);
    return(
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div style={{background:"rgba(248,245,236,0.90)",borderRadius:22,padding:"20px 18px",boxShadow:"0 2px 14px rgba(0,0,0,0.06)",border:"1px solid rgba(255,255,255,0.9)"}}>
          <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:18,color:"#1A1A10",marginBottom:14}}>💱 Currency Converter</div>
          {/* Amount */}
          <div style={{background:"rgba(255,255,255,0.88)",borderRadius:100,padding:"12px 18px",border:"1.5px solid rgba(90,120,72,0.20)",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:20}}>{flagOf(from)}</span>
            <input value={amount} onChange={e=>setAmount(e.target.value)} onKeyDown={e=>e.key==="Enter"&&convert()}
              type="number" placeholder="Amount"
              style={{flex:1,border:"none",outline:"none",fontSize:22,fontWeight:700,color:"#1A1A10",background:"transparent"}}/>
          </div>
          {/* Currency pickers */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <select value={from} onChange={e=>{setFrom(e.target.value);setResult(null);}}
              style={{flex:1,padding:"10px 12px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.20)",background:"rgba(255,255,255,0.88)",fontSize:12,color:"#1A1A10",outline:"none"}}>
              {CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
            </select>
            <button onClick={swap} style={{background:"rgba(90,120,72,0.12)",color:"#3A6020",border:"1.5px solid rgba(90,120,72,0.22)",borderRadius:"50%",width:36,height:36,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>⇄</button>
            <select value={to} onChange={e=>{setTo(e.target.value);setResult(null);}}
              style={{flex:1,padding:"10px 12px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.20)",background:"rgba(255,255,255,0.88)",fontSize:12,color:"#1A1A10",outline:"none"}}>
              {CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
            </select>
          </div>
          <button onClick={convert} disabled={loading} style={{width:"100%",padding:"13px",background:loading?"rgba(90,80,60,0.08)":"linear-gradient(135deg,#3E6828,#5E9040)",color:loading?"#8A8070":"#fff",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,cursor:loading?"default":"pointer",boxShadow:loading?"none":"0 3px 12px rgba(58,80,38,0.25)",marginBottom:14}}>
            {loading?"🌿 Fetching rates…":"💱 Convert"}
          </button>
          {/* Result */}
          {result&&!result.error&&(
            <div style={{background:"rgba(90,120,72,0.06)",borderRadius:20,padding:"18px 20px",border:"1px solid rgba(90,120,72,0.14)",textAlign:"center"}}>
              <div style={{fontSize:13,color:"#8A8070",marginBottom:6}}>{flagOf(from)} {fmt(parseFloat(amount),from)} =</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:32,fontWeight:700,color:"#1A2810",marginBottom:6}}>{flagOf(to)} {fmt(result.value,to)}</div>
              <div style={{fontSize:11,color:"#8A8070"}}>1 {from} = {result.rate.toFixed(4)} {to} · Live rate via Frankfurter</div>
            </div>
          )}
          {result?.error&&<div style={{background:"rgba(192,57,43,0.08)",borderRadius:16,padding:"12px 16px",color:"#c0392b",fontSize:13,textAlign:"center"}}>{result.error}</div>}
        </div>
      </div>
    );
  };

  const TOOL_TABS=[
    {id:"voice",icon:"🎙️",name:"Voice"},
    {id:"translate",icon:"🌍",name:"Translate"},
    {id:"currency",icon:"💱",name:"Currency"},
    {id:"calc",icon:"🧮",name:"Calc"},
    {id:"sw",icon:"⏱️",name:"Timer"},
    {id:"timer",icon:"⏰",name:"Countdown"},
    {id:"alarm",icon:"🔔",name:"Alarm"},
  ];

  return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title="🔧 Tools" onBack={()=>setScreen("home")} />
      {/* Tab bar — garden theme */}
      <div style={{display:"flex",overflowX:"auto",gap:0,padding:"8px 10px",background:"rgba(248,245,236,0.88)",borderBottom:"1px solid rgba(90,80,60,0.08)",scrollbarWidth:"none"}}>
        {TOOL_TABS.map(t=>(
          <button key={t.id} onClick={()=>setActive(t.id)} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"7px 12px",background:"none",border:"none",borderBottom:active===t.id?"3px solid #5A7848":"3px solid transparent",cursor:"pointer",transition:"all 0.15s"}}>
            <span style={{fontSize:18}}>{t.icon}</span>
            <span style={{fontSize:9,fontWeight:active===t.id?800:500,color:active===t.id?"#3A6020":"rgba(60,56,40,0.55)",letterSpacing:0.3}}>{t.name}</span>
          </button>
        ))}
      </div>
      <div style={{padding:"16px 14px"}}>
        {active==="voice"    &&<VoiceToText/>}
        {active==="translate"&&<Translator/>}
        {active==="currency" &&<CurrencyConverter/>}
        {active==="calc"     &&<Calculator/>}
        {active==="sw"       &&<Stopwatch/>}
        {active==="timer"    &&<CountdownTool/>}
        {active==="alarm"    &&<AlarmTool/>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SMART GOALS  — tiered by time horizon
   Next Week · 6 Months · 1 Year · 3 Years · 5 Years
   Each goal: AI suggestions, subtasks, micro-steps,
   date, cover photo, links, send to Calendar/Prioritizer/Matrix
═══════════════════════════════════════════════════════ */

async function aiGoalSubtasks(goalTitle,horizon){
  const h=horizonByKey(horizon);
  const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,
      messages:[{role:"user",content:`Break this ${h.label} goal into 4–6 clear actionable subtasks. Return ONLY a JSON array of strings. No markdown.\n\nGoal: "${goalTitle}"`}]})
  });
  return JSON.parse((j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim());
}
async function aiMicroSteps(subtaskText){
  const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:250,
      messages:[{role:"user",content:`Break this into 2–4 micro-tasks. Return ONLY a JSON array of strings. No markdown.\n\nTask: "${subtaskText}"`}]})
  });
  return JSON.parse((j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim());
}

/* ── Goal detail / editor ───────────────────────────── */
function GoalEditor({goal,onBack,onUpdate,onDelete,priData,setPriData,matrixData,setMatrixData}){
  const h=horizonByKey(goal.horizon);
  const [aiLoading,setAiLoading]=useState(false);
  const [microLoading,setMicroLoading]=useState(null);
  const [newLink,setNewLink]=useState({label:"",url:""});
  const [addingLink,setAddingLink]=useState(false);
  const [newSub,setNewSub]=useState("");
  const [sendMenu,setSendMenu]=useState(null); // subtask id
  const [toast,setToast]=useState("");
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2400);};

  const upd=ch=>onUpdate({...goal,...ch});
  const updSubs=ss=>upd({subtasks:ss});
  const patchSub=(id,ch)=>updSubs(goal.subtasks.map(s=>s.id===id?{...s,...ch}:s));

  const doneCount=goal.subtasks.filter(s=>s.done).length;
  const pct=goal.subtasks.length>0?Math.round((doneCount/goal.subtasks.length)*100):0;

  /* Cover photo */
  const handleCover=e=>{
    const file=e.target.files[0];if(!file)return;
    const r=new FileReader();r.onload=ev=>upd({cover:ev.target.result});r.readAsDataURL(file);
  };

  /* Links */
  const addLink=()=>{
    if(!newLink.url.trim())return;
    upd({links:[...goal.links,{id:Date.now(),label:newLink.label||newLink.url,url:newLink.url}]});
    setNewLink({label:"",url:""});setAddingLink(false);
  };
  const delLink=id=>upd({links:goal.links.filter(l=>l.id!==id)});

  /* Subtasks */
  const addSub=()=>{if(!newSub.trim())return;updSubs([...goal.subtasks,mkGoalSubtask(newSub.trim())]);setNewSub("");};
  const delSub=id=>updSubs(goal.subtasks.filter(s=>s.id!==id));
  const toggleSub=id=>patchSub(id,{done:!goal.subtasks.find(s=>s.id===id)?.done});

  /* AI subtasks */
  const genSubtasks=async()=>{
    if(!goal.title.trim()){showToast("Add a goal title first!");return;}
    setAiLoading(true);
    try{const ss=await aiGoalSubtasks(goal.title,goal.horizon);updSubs([...goal.subtasks,...ss.map(t=>mkGoalSubtask(t))]);}
    catch{showToast("AI error — try again");}
    setAiLoading(false);
  };

  /* AI micro-steps */
  const genMicro=async sub=>{
    setMicroLoading(sub.id);
    try{const ms=await aiMicroSteps(sub.text);patchSub(sub.id,{microSteps:ms.map(t=>({id:Date.now()+Math.random(),text:t,done:false})),microExpanded:true});}
    catch{showToast("AI error — try again");}
    setMicroLoading(null);
  };

  /* Subtask image */
  const handleSubImg=(id,e)=>{
    const file=e.target.files[0];if(!file)return;
    const r=new FileReader();r.onload=ev=>patchSub(id,{image:ev.target.result});r.readAsDataURL(file);
  };

  /* Send subtask */
  const sendSub=(sub,dest,extra)=>{
    if(dest==="cal") window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(sub.text)}&details=${encodeURIComponent(goal.title)}`,"_blank");
    else if(dest==="pri"&&extra) setPriData(ls=>ls.map(l=>l.id===extra?{...l,tasks:[...l.tasks,{id:Date.now(),name:sub.text,done:false,color:"lilac",url:""}]}:l));
    else if(dest==="matrix"&&extra) setMatrixData(ds=>[...ds,{id:Date.now(),text:sub.text,quad:extra,created:Date.now(),touched:Date.now(),url:""}]);
    showToast("✅ Sent!");setSendMenu(null);
  };

  const accentCol=h.color;

  return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>

      {/* ── Garden-themed header ── */}
      <div style={{
        background:"rgba(248,245,236,0.92)",
        backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",
        padding:"15px 18px",display:"flex",alignItems:"center",gap:12,
        boxShadow:"0 1px 12px rgba(0,0,0,0.06)",
        position:"sticky",top:0,zIndex:50,
        borderBottom:"1px solid rgba(90,80,60,0.09)",
      }}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,borderRadius:10}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span style={{fontFamily:"Georgia,serif",color:"#1A1A10",fontWeight:700,fontSize:18,flex:1,letterSpacing:-0.2}}>{h.icon} {h.label} Goal</span>
        {goal.subtasks.length>0&&<span style={{color:"#5A7848",fontSize:12,fontWeight:700,background:"rgba(90,120,72,0.12)",padding:"3px 10px",borderRadius:100}}>{pct}%</span>}
        <button onClick={()=>upd({status:goal.status==="done"?"active":"done"})} style={{
          background:goal.status==="done"?"rgba(90,120,72,0.15)":"rgba(248,245,236,0.95)",
          color:goal.status==="done"?"#3A6820":"#1A1A10",
          border:`1.5px solid ${goal.status==="done"?"rgba(90,120,72,0.4)":"rgba(90,80,60,0.2)"}`,
          borderRadius:100,padding:"7px 14px",fontWeight:700,fontSize:13,cursor:"pointer",
        }}>
          {goal.status==="done"?"✅ Done":"Mark done"}
        </button>
        <button onClick={()=>{if(window.confirm("Delete this goal?"))onDelete(goal.id);}} style={{background:"rgba(192,57,43,0.1)",color:"#c0392b",border:"1px solid rgba(192,57,43,0.2)",borderRadius:10,width:36,height:36,cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
      </div>

      <div style={{padding:"16px 16px"}}>

        {/* ── COVER PHOTO ── */}
        <div style={{background:"rgba(248,245,236,0.92)",borderRadius:22,marginBottom:14,overflow:"hidden",boxShadow:"0 2px 14px rgba(0,0,0,0.06)",border:"1px solid rgba(255,255,255,0.9)"}}>
          {goal.cover?(
            <div style={{position:"relative"}}>
              <img src={goal.cover} alt="" style={{width:"100%",height:180,objectFit:"cover",display:"block",borderRadius:"22px 22px 0 0"}}/>
              <div style={{position:"absolute",bottom:10,right:10,display:"flex",gap:8}}>
                <label style={{background:"rgba(248,245,236,0.92)",color:"#1A1A10",borderRadius:100,padding:"7px 14px",fontSize:13,fontWeight:700,cursor:"pointer",backdropFilter:"blur(8px)",border:"1px solid rgba(90,80,60,0.2)",display:"flex",alignItems:"center",gap:6}}>
                  📸 Change
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={handleCover}/>
                </label>
                <button onClick={()=>upd({cover:null})} style={{background:"rgba(192,57,43,0.85)",color:"#fff",border:"none",borderRadius:100,padding:"7px 12px",fontSize:13,fontWeight:700,cursor:"pointer"}}>✕</button>
              </div>
            </div>
          ):(
            <label style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,height:150,
              background:"linear-gradient(135deg,rgba(90,120,72,0.08),rgba(120,160,90,0.06))",
              border:"2px dashed rgba(90,120,72,0.3)",borderRadius:22,cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.background="linear-gradient(135deg,rgba(90,120,72,0.14),rgba(120,160,90,0.10))"}
              onMouseLeave={e=>e.currentTarget.style.background="linear-gradient(135deg,rgba(90,120,72,0.08),rgba(120,160,90,0.06))"}>
              <div style={{width:58,height:58,borderRadius:16,background:"rgba(90,120,72,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,border:"1.5px solid rgba(90,120,72,0.2)"}}>📸</div>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,color:"#2A3820",marginBottom:3}}>Add a cover photo</div>
                <div style={{fontSize:12,color:"#8A8070"}}>Tap here to upload an image for this goal</div>
              </div>
              <input type="file" accept="image/*" style={{display:"none"}} onChange={handleCover}/>
            </label>
          )}
          {goal.subtasks.length>0&&(
            <div style={{height:5,background:"rgba(90,120,72,0.12)"}}>
              <div style={{height:"100%",width:`${pct}%`,background:pct===100?"#5A7848":"#7A9A60",borderRadius:2,transition:"width 0.4s"}}/>
            </div>
          )}
        </div>

        {/* ── Goal title ── */}
        <div style={{background:"rgba(248,245,236,0.88)",borderRadius:22,padding:"16px 18px",marginBottom:12,border:"1px solid rgba(255,255,255,0.9)",boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
          <div style={{fontFamily:"Georgia,serif",color:"#7A8A6A",fontSize:12,fontWeight:600,marginBottom:8,letterSpacing:0.5}}>{h.question}</div>
          <textarea value={goal.title} onChange={e=>upd({title:e.target.value})} placeholder="Write your goal here…"
            rows={2} style={{width:"100%",boxSizing:"border-box",background:"transparent",border:"none",outline:"none",color:"#1A1A10",fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,resize:"none",lineHeight:1.45}}/>
        </div>

        {/* ── Why this matters ── */}
        <div style={{background:"rgba(248,245,236,0.88)",borderRadius:22,padding:"16px 18px",marginBottom:14,border:"1px solid rgba(255,255,255,0.9)",boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#7A8A6A",textTransform:"uppercase",letterSpacing:1.2,marginBottom:10}}>Why this matters</div>
          <textarea value={goal.description} onChange={e=>upd({description:e.target.value})} placeholder="Your reason, motivation, vision…"
            rows={3} style={{width:"100%",boxSizing:"border-box",padding:"10px 14px",borderRadius:14,border:"1.5px solid rgba(90,120,72,0.15)",fontSize:14,color:"#1A1A10",outline:"none",resize:"none",fontFamily:"inherit",lineHeight:1.55,background:"rgba(255,255,255,0.7)"}}/>
        </div>

        {/* Due date → Calendar */}
        <GlassCard style={{marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:20}}>📅</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:700,color:C.soft,marginBottom:4}}>Target date</div>
              <input type="date" value={goal.dueDate||""} onChange={e=>upd({dueDate:e.target.value})}
                style={{border:"none",background:"transparent",fontSize:15,fontWeight:700,color:C.dp,outline:"none",cursor:"pointer"}}/>
            </div>
            <button onClick={()=>window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("🎯 "+goal.title)}&dates=${(goal.dueDate||"").replace(/-/g,"")}/${(goal.dueDate||"").replace(/-/g,"")}`,"_blank")}
              style={{background:"#e8f5e9",color:"#2e7d32",border:"1.5px solid #a5d6a7",borderRadius:10,padding:"7px 13px",fontWeight:700,fontSize:12,cursor:"pointer"}}>
              Add to Calendar
            </button>
          </div>
        </GlassCard>

        {/* Links */}
        <GlassCard style={{marginBottom:14}}>
          <div style={{fontWeight:800,color:C.dp,fontSize:14,marginBottom:8}}>🔗 Links & references</div>
          {goal.links.map(lnk=>(
            <div key={lnk.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7,background:C.pale,borderRadius:10,padding:"8px 10px",border:`1px solid ${C.ll}`}}>
              <span style={{fontSize:14,flexShrink:0}}>🔗</span>
              <span style={{flex:1,fontSize:13,fontWeight:600,color:C.txt,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{lnk.label}</span>
              <button onClick={()=>window.open(lnk.url.startsWith("http")?lnk.url:"https://"+lnk.url,"_blank")} style={{background:C.pp,color:"#1A1A10",border:"none",borderRadius:7,width:26,height:26,cursor:"pointer",fontSize:11,flexShrink:0}}>↗</button>
              <button onClick={()=>delLink(lnk.id)} style={{background:"#fce4e4",color:"#c0392b",border:"none",borderRadius:7,width:26,height:26,cursor:"pointer",fontSize:12,flexShrink:0}}>🗑</button>
            </div>
          ))}
          {addingLink?(
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:8}}>
              <input value={newLink.label} onChange={e=>setNewLink(d=>({...d,label:e.target.value}))} placeholder="Label (e.g. Inspiration article)"
                style={{padding:"8px 12px",borderRadius:10,border:`1.5px solid ${C.lp}`,fontSize:13,color:C.txt,outline:"none"}}/>
              <input value={newLink.url} onChange={e=>setNewLink(d=>({...d,url:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addLink()} placeholder="https://…"
                style={{padding:"8px 12px",borderRadius:10,border:`1.5px solid ${C.lp}`,fontSize:13,color:C.txt,outline:"none"}}/>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setAddingLink(false)} style={{flex:1,background:C.ll,color:C.mid,border:"none",borderRadius:9,padding:"8px",fontWeight:700,cursor:"pointer"}}>Cancel</button>
                <button onClick={addLink} style={{flex:2,background:btnGrad,color:"#1A1A10",border:"none",borderRadius:9,padding:"8px",fontWeight:800,cursor:"pointer"}}>Add</button>
              </div>
            </div>
          ):(
            <button onClick={()=>setAddingLink(true)} style={{width:"100%",padding:"9px",background:"transparent",border:`1.5px dashed ${C.lp}`,borderRadius:10,color:C.pp,fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add link or hyperlink</button>
          )}
        </GlassCard>

        {/* Subtasks */}
        <div style={{marginBottom:6,display:"flex",alignItems:"center",gap:10}}>
          <div style={{color:"#1A1A10",fontWeight:900,fontSize:16,flex:1}}>📋 Subtasks</div>
          <button onClick={genSubtasks} disabled={aiLoading} style={{background:btnGrad,color:"#1A1A10",border:"none",borderRadius:20,padding:"6px 14px",fontWeight:800,fontSize:12,cursor:"pointer",opacity:aiLoading?0.6:1}}>
            {aiLoading?"⏳ Thinking…":"🤖 AI suggest"}
          </button>
        </div>
        <div style={{fontSize:11,color:"#9A9080",marginBottom:10}}>AI suggestions are optional — add your own or mix both</div>

        {/* Add subtask */}
        <div style={{display:"flex",gap:8,marginBottom:12,background:"rgba(255,255,255,0.88)",borderRadius:12,padding:"9px 13px",border:`1.5px solid ${C.ll}`}}>
          <input value={newSub} onChange={e=>setNewSub(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addSub()} placeholder="Add a subtask…"
            style={{flex:1,border:"none",outline:"none",fontSize:14,fontWeight:600,color:C.txt,background:"transparent"}}/>
          <button onClick={addSub} style={{background:btnGrad,color:"#1A1A10",border:"none",borderRadius:9,width:32,height:32,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
        </div>

        {goal.subtasks.length===0&&(
          <div style={{textAlign:"center",color:"#9A9080",fontSize:13,fontStyle:"italic",marginBottom:12}}>No subtasks yet — add one or tap 🤖 AI suggest</div>
        )}

        {goal.subtasks.map((sub,si)=>(
          <div key={sub.id} style={{background:"rgba(255,255,255,0.92)",borderRadius:16,padding:"12px 14px",marginBottom:10,border:`1.5px solid ${sub.done?"#a5d6a7":C.ll}`,opacity:sub.done?0.75:1}}>

            {/* Subtask row */}
            <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}>
              <button onClick={()=>toggleSub(sub.id)} style={{width:26,height:26,borderRadius:"50%",border:`2.5px solid ${sub.done?"#27ae60":C.lp}`,background:sub.done?"#27ae60":"transparent",cursor:"pointer",flexShrink:0,marginTop:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#1A1A10",fontSize:13,fontWeight:900}}>
                {sub.done?"✓":""}
              </button>
              <div style={{width:22,height:22,borderRadius:"50%",background:"linear-gradient(135deg,rgba(90,120,72,0.18),rgba(74,104,56,0.12))",color:"#1A1A10",fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>{si+1}</div>
              <div style={{flex:1,fontWeight:700,fontSize:14,color:sub.done?C.soft:C.txt,textDecoration:sub.done?"line-through":"none",lineHeight:1.4}}>{sub.text}</div>
              <button onClick={()=>delSub(sub.id)} style={{background:"transparent",color:"#e74c3c",border:"none",cursor:"pointer",fontSize:15,padding:0}}>🗑</button>
            </div>

            {/* Subtask image */}
            {sub.image&&(
              <div style={{position:"relative",marginBottom:8,marginLeft:58}}>
                <img src={sub.image} alt="" style={{width:"100%",maxHeight:120,objectFit:"cover",borderRadius:10,border:`1.5px solid ${C.ll}`}}/>
                <button onClick={()=>patchSub(sub.id,{image:""})} style={{position:"absolute",top:4,right:4,background:"#e74c3c",color:"#1A1A10",border:"none",borderRadius:"50%",width:20,height:20,cursor:"pointer",fontSize:10,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
              </div>
            )}

            {/* Micro-steps */}
            {(sub.microSteps||[]).length>0&&sub.microExpanded&&(
              <div style={{marginLeft:58,borderLeft:`3px solid ${C.lp}`,paddingLeft:10,marginBottom:6}}>
                {sub.microSteps.map(ms=>(
                  <div key={ms.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                    <button onClick={()=>patchSub(sub.id,{microSteps:sub.microSteps.map(m=>m.id===ms.id?{...m,done:!m.done}:m)})} style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${ms.done?"#27ae60":C.lp}`,background:ms.done?"#27ae60":"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#1A1A10",fontSize:9}}>
                      {ms.done?"✓":""}
                    </button>
                    <span style={{fontSize:12,color:ms.done?C.soft:C.txt,textDecoration:ms.done?"line-through":"none",flex:1}}>{ms.text}</span>
                  </div>
                ))}
              </div>
            )}
            {(sub.microSteps||[]).length>0&&(
              <button onClick={()=>patchSub(sub.id,{microExpanded:!sub.microExpanded})} style={{marginLeft:58,background:"transparent",border:"none",color:C.soft,fontSize:11,cursor:"pointer",fontWeight:600}}>
                {sub.microExpanded?"▲ Hide micro-steps":"▼ Show micro-steps"}
              </button>
            )}

            {/* Action bar */}
            <div style={{display:"flex",gap:6,marginTop:8,marginLeft:58,flexWrap:"wrap"}}>
              <label style={{background:C.ll,color:C.mp,borderRadius:8,padding:"4px 9px",fontSize:11,fontWeight:700,cursor:"pointer"}}>
                📸 Photo<input type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleSubImg(sub.id,e)}/>
              </label>
              <button onClick={()=>setSendMenu(sendMenu===sub.id?null:sub.id)} style={{background:C.ll,color:C.mp,border:`1px solid ${C.lp}`,borderRadius:8,padding:"4px 9px",fontSize:11,fontWeight:700,cursor:"pointer"}}>
                🔗 Add link
              </button>
              <button onClick={()=>genMicro(sub)} disabled={microLoading===sub.id} style={{background:"#e8f5e9",color:"#2e7d32",border:"1px solid #a5d6a7",borderRadius:8,padding:"4px 9px",fontSize:11,fontWeight:700,cursor:"pointer",opacity:microLoading===sub.id?0.6:1}}>
                {microLoading===sub.id?"⏳":"🔬 Micro-steps"}
              </button>
              <button onClick={()=>setSendMenu(sendMenu===sub.id?"send_"+sub.id:sub.id)} style={{background:btnGrad,color:"#1A1A10",border:"none",borderRadius:8,padding:"4px 9px",fontSize:11,fontWeight:700,cursor:"pointer"}}>↗ Send to</button>
            </div>

            {/* Send dropdown */}
            {sendMenu===sub.id&&(
              <div style={{marginTop:8,marginLeft:58,background:C.wh,borderRadius:12,border:`1.5px solid ${C.ll}`,overflow:"hidden",boxShadow:"0 4px 16px rgba(90,80,60,0.15)"}}>
                <div style={{padding:"8px 12px",fontSize:11,fontWeight:700,color:C.soft,borderBottom:`1px solid ${C.ll}`,textTransform:"uppercase",letterSpacing:1}}>Send subtask to…</div>
                <button onClick={()=>sendSub(sub,"cal")} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left",fontSize:13,fontWeight:600,color:C.txt}}>📅 Google Calendar</button>
                {/* Plant as Goal */}
          {["week","month1","month6","year1","year3","year5"].map(h=>{
            const labels={"week":"Next Week","month1":"1 Month","month6":"6 Months","year1":"1 Year","year3":"3 Years","year5":"5 Years"};
            const icons={"week":"📅","month1":"🗓️","month6":"🌱","year1":"⭐","year3":"🚀","year5":"🏔️"};
            return(
              <button key={h} onClick={()=>{plantAsGoal(h);setSendOpen(false);}} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left"}}>
                <span style={{fontSize:18}}>{icons[h]}</span><span style={{fontWeight:700,fontSize:14,color:C.txt}}>🌱 Goal — {labels[h]}</span>
              </button>
            );
          })}
          {["do","plan","help","drop"].map(q=>{
                  const lbl={do:"Do First 🔴",plan:"Schedule 🟠",help:"Ask for Help 🔵",drop:"Eliminate ⚫"}[q];
                  return(<button key={q} onClick={()=>sendSub(sub,"matrix",q)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left",fontSize:13,fontWeight:600,color:C.txt}}>🎯 Matrix — {lbl}</button>);
                })}
                {(priData||[]).map(l=>(
                  <button key={l.id} onClick={()=>sendSub(sub,"pri",l.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"none",border:"none",borderBottom:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left",fontSize:13,fontWeight:600,color:C.txt}}>📋 {l.name}</button>
                ))}
                <button onClick={()=>setSendMenu(null)} style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px",background:"none",border:"none",cursor:"pointer",width:"100%",fontSize:12,color:C.soft}}>Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:"#1A1A10",borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(45,10,94,0.4)",zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );
}

/* ── Goals home — 5 horizon tabs ───────────────────── */

async function aiChargePicks(tasks){
  const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,
      messages:[{role:"user",content:`Pick the 3 tasks most likely being avoided and worth tackling today. Return ONLY a JSON array of 3 task name strings. No markdown.\n\nTasks: ${tasks.map(t=>t.name||t.text).slice(0,15).join(", ")}`}]})});
  return JSON.parse((j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim());
}

async function aiAwardSuggestions(style){
  const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{...{"Content-Type":"application/json","anthropic-version":"2023-06-01"},...(getAIKey()?{"x-api-key":getAIKey()}:{})},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:250,
      messages:[{role:"user",content:`Suggest 6 warm, specific, achievable self-care rewards for someone who hit their weekly goals. Style: "${style||"restorative and nurturing"}". Return ONLY a JSON array of 6 strings. No markdown.`}]})});
  return JSON.parse((j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim());
}

function TheCharge({priData,matrixData,setScreen}){
  const [data,setData]=useState({dailyTarget:3,weeklyAward:"",days:{},streak:0});
  const [view,setView]=useState("today");
  const [aiSugg,setAiSugg]=useState([]);
  const [aiLoad,setAiLoad]=useState(false);
  const [awardIdeas,setAwardIdeas]=useState([]);
  const [awardLoad,setAwardLoad]=useState(false);
  const [whatOff,setWhatOff]=useState("");
  const [editTarget,setEditTarget]=useState(false);
  const [editAward,setEditAward]=useState(false);
  const [draftAward,setDraftAward]=useState("");
  const [toast,setToast]=useState("");
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2400);};

  const upd=ch=>setData(d=>({...d,...ch}));
  const today=todayStr();
  const todayD=data.days[today]||{charged:[],frogs:[]};
  const updToday=ch=>upd({days:{...data.days,[today]:{...todayD,...ch}}});

  /* Pull overdue + active tasks */
  const now=Date.now();
  const stalePri=(priData||[]).flatMap(l=>(l.tasks||[]).filter(t=>!t.done&&(now-t.id)>STALE_7).map(t=>({...t,src:"📋 "+l.name})));
  const staleMatrix=(matrixData||[]).filter(t=>(now-(t.touched||t.created||now))>STALE_7).map(t=>({...t,name:t.text,src:"🎯 Matrix"}));
  const allStale=[...stalePri,...staleMatrix];
  const allActive=[
    ...(priData||[]).flatMap(l=>(l.tasks||[]).filter(t=>!t.done).map(t=>({...t}))),
    ...(matrixData||[]).map(t=>({...t,name:t.text})),
  ];

  const charged=todayD.charged||[];
  const frogs=todayD.frogs||[];
  const target=data.dailyTarget||3;
  const pct=Math.min(100,Math.round((charged.length/target)*100));
  const hitTarget=charged.length>=target;

  /* Weekly stats */
  const weekDays=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return d.toISOString().slice(0,10);});
  const dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const weekPcts=weekDays.map(d=>Math.min(100,Math.round(((data.days[d]?.charged||[]).length/target)*100)));
  const daysHit=weekPcts.filter(p=>p>=100).length;
  const weekTotal=weekDays.reduce((s,d)=>s+(data.days[d]?.charged||[]).length,0);

  const chargeIt=name=>{
    if(charged.includes(name))return;
    const nc=[...charged,name];
    updToday({charged:nc});
    if(nc.length>=target)showToast("🔮 Orb fully lit — your light is blazing!");
    else showToast(`⚡ Charged! ${nc.length}/${target} today`);
  };
  const addFrog=()=>{
    if(!whatOff.trim())return;
    updToday({frogs:[...frogs,{id:Date.now(),text:whatOff.trim(),done:false}]});
    setWhatOff("");
  };
  const toggleFrog=id=>{
    const nf=frogs.map(f=>f.id===id?{...f,done:!f.done}:f);
    updToday({frogs:nf});
    if(nf.find(f=>f.id===id)?.done)showToast("⚡ Charged!");
  };
  const delFrog=id=>updToday({frogs:frogs.filter(f=>f.id!==id)});

  const getAiSugg=async()=>{
    if(!allActive.length){showToast("Add tasks to Prioritizer or Matrix first!");return;}
    setAiLoad(true);
    try{setAiSugg(await aiChargePicks(allActive));}catch{showToast("AI error — try again");}
    setAiLoad(false);
  };
  const getAwardIdeas=async()=>{
    setAwardLoad(true);
    try{setAwardIdeas(await aiAwardSuggestions(data.weeklyAward));}catch{showToast("AI error — try again");}
    setAwardLoad(false);
  };

  const Row=({name,src,done,onCharge})=>(
    <div style={{display:"flex",alignItems:"center",gap:12,background:done?"rgba(90,160,80,0.10)":"rgba(248,245,236,0.88)",borderRadius:18,padding:"12px 16px",marginBottom:9,border:`1.5px solid ${done?"rgba(90,160,80,0.3)":"rgba(255,255,255,0.9)"}`,backdropFilter:"blur(8px)"}}>
      <button onClick={()=>!done&&onCharge()} style={{width:30,height:30,borderRadius:"50%",border:`2.5px solid ${done?"#5A9040":"rgba(90,120,72,0.4)"}`,background:done?"#5A9040":"transparent",cursor:done?"default":"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,fontWeight:900}}>{done?"✓":""}</button>
      <div style={{flex:1}}>
        <div style={{color:done?"#9A9080":"#1A1A10",fontWeight:700,fontSize:14,textDecoration:done?"line-through":"none",lineHeight:1.35}}>{name}</div>
        {src&&<div style={{color:"#9A9080",fontSize:11,marginTop:2}}>{src}</div>}
      </div>
      {!done&&<span style={{fontSize:18}}>⚡</span>}
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>

      {/* ── Header ── */}
      <div style={{background:"rgba(248,245,236,0.92)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",padding:"20px 20px 16px",borderBottom:"1px solid rgba(90,80,60,0.08)",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",marginBottom:4}}>
          <button onClick={()=>setScreen&&setScreen("home")} style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",marginRight:8}}>
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{flex:1,textAlign:"center"}}>
            <div style={{fontFamily:"Georgia,serif",fontSize:28,fontWeight:700,color:"#1A1A10",letterSpacing:-0.5,lineHeight:1.1}}>The Charge ✨</div>
            <div style={{fontSize:14,color:"#8A8070",marginTop:3,fontWeight:400}}>Tackle what you've been avoiding</div>
          </div>
          <button style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",color:"#5A7848",fontSize:20}}>🌿</button>
        </div>

        {/* Tabs — Today | Week | Setup */}
        <div style={{display:"flex",gap:4,background:"rgba(90,80,60,0.07)",borderRadius:100,padding:"4px",marginTop:12}}>
          {[["today","Today"],["week","Week"],["settings","Setup"]].map(([k,l])=>(
            <button key={k} onClick={()=>setView(k)} style={{
              flex:1,padding:"10px 8px",
              background:view===k?"#6A8858":"transparent",
              color:view===k?"#fff":"#6A6050",
              border:"none",borderRadius:100,
              fontWeight:view===k?700:500,
              fontSize:14,cursor:"pointer",
              transition:"all 0.15s",
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{padding:"16px 16px 0"}}>

        {/* ══ TODAY ══ */}
        {view==="today"&&<>

          {/* Build the light card */}
          <div style={{background:"rgba(248,245,236,0.90)",borderRadius:24,padding:"18px 18px",marginBottom:12,boxShadow:"0 2px 16px rgba(0,0,0,0.06)",border:"1px solid rgba(255,255,255,0.9)"}}>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}>
              {/* Purple orb */}
              <div style={{
                width:44,height:44,borderRadius:"50%",flexShrink:0,
                background:hitTarget
                  ?"radial-gradient(circle at 38% 32%,#e8d0ff,#9b59b6)"
                  :"radial-gradient(circle at 38% 32%,rgba(180,140,240,0.7),rgba(120,60,200,0.4))",
                boxShadow:hitTarget
                  ?"0 0 24px rgba(155,89,182,0.7),0 0 8px rgba(155,89,182,0.4)"
                  :"0 0 18px rgba(130,70,200,0.35),0 0 6px rgba(130,70,200,0.2)",
              }}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:17,color:"#1A1A10",marginBottom:2}}>
                  {hitTarget?"Light earned today! ⚡":"Build the light ⚡"}
                </div>
                <div style={{fontSize:13,color:"#7A7060"}}>
                  {hitTarget
                    ?`${charged.length} tasks charged — light blazing ✨`
                    :`${target-charged.length} more task${target-charged.length!==1?"s":""} to earn today's light`}
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{flex:1,height:8,background:"rgba(90,80,60,0.12)",borderRadius:100,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,background:hitTarget?"#5A7848":"#6A8858",borderRadius:100,transition:"width 0.4s"}}/>
              </div>
              <span style={{fontSize:13,fontWeight:600,color:"#7A7060",flexShrink:0}}>{charged.length}/{target}</span>
            </div>
          </div>

          {/* Reward card */}
          <div style={{background:"rgba(248,245,236,0.90)",borderRadius:24,padding:"18px 18px",marginBottom:16,boxShadow:"0 2px 16px rgba(0,0,0,0.06)",border:"1px solid rgba(255,255,255,0.9)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
              <span style={{fontSize:28}}>🎁</span>
              <div>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:16,color:"#1A1A10"}}>
                  {data.weeklyAward?data.weeklyAward:"No reward set yet — tap Setup"}
                </div>
                <div style={{fontSize:13,color:"#7A7060",marginTop:2}}>
                  {Math.max(0,5-daysHit)} more lights to unlock
                </div>
              </div>
            </div>
            {/* 5 circle progress lights */}
            <div style={{display:"flex",gap:12}}>
              {[0,1,2,3,4].map(i=>(
                <div key={i} style={{
                  width:36,height:36,borderRadius:"50%",
                  border:`2.5px solid ${i<daysHit?"#6A8858":"rgba(90,80,60,0.2)"}`,
                  background:i<daysHit?"rgba(106,136,88,0.18)":"transparent",
                  display:"flex",alignItems:"center",justifyContent:"center",
                }}>{i<daysHit&&<div style={{width:14,height:14,borderRadius:"50%",background:"#6A8858"}}/>}</div>
              ))}
            </div>
          </div>

          {/* Stale/overdue tasks */}
          {allStale.length>0&&(
            <div style={{marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{fontFamily:"Georgia,serif",color:"#7A5820",fontWeight:700,fontSize:15}}>⏰ Overdue tasks</span>
                <span style={{background:"rgba(192,120,40,0.12)",color:"#7A5820",borderRadius:100,padding:"2px 10px",fontSize:12,fontWeight:600}}>{allStale.length}</span>
              </div>
              {allStale.map((t,i)=>(<Row key={i} name={t.name||t.text} src={t.src} done={charged.includes(t.name||t.text)} onCharge={()=>chargeIt(t.name||t.text)}/>))}
            </div>
          )}

          {/* What are you putting off? */}
          <div style={{marginBottom:16}}>
            <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:19,color:"#1A1A10",marginBottom:12}}>What are you putting off?</div>
            <div style={{display:"flex",gap:10,alignItems:"center",background:"rgba(248,245,236,0.92)",borderRadius:100,padding:"4px 4px 4px 20px",border:"1px solid rgba(255,255,255,0.9)",boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
              <input value={whatOff} onChange={e=>setWhatOff(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addFrog()}
                placeholder="Write what you've been avoiding..."
                style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#1A1A10",fontSize:15,fontWeight:400}}/>
              <button onClick={addFrog} style={{background:"#5A7848",color:"#fff",border:"none",borderRadius:"50%",width:44,height:44,fontSize:22,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,flexShrink:0,boxShadow:"0 3px 12px rgba(90,120,72,0.38)"}}>+</button>
            </div>
            {frogs.map(f=>(
              <div key={f.id} style={{display:"flex",alignItems:"center",gap:12,background:f.done?"rgba(90,160,80,0.08)":"rgba(248,245,236,0.90)",borderRadius:18,padding:"12px 16px",marginTop:9,border:`1px solid ${f.done?"rgba(90,160,80,0.25)":"rgba(255,255,255,0.9)"}`,boxShadow:"0 1px 8px rgba(0,0,0,0.04)"}}>
                <button onClick={()=>toggleFrog(f.id)} style={{width:28,height:28,borderRadius:"50%",border:`2.5px solid ${f.done?"#5A9040":"rgba(90,120,72,0.35)"}`,background:f.done?"#5A9040":"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,fontWeight:900}}>{f.done?"✓":""}</button>
                <span style={{flex:1,color:f.done?"#A0907A":"#1A1A10",fontWeight:600,fontSize:14,textDecoration:f.done?"line-through":"none"}}>{f.text}</span>
                {!f.done&&<span style={{fontSize:16}}>⚡</span>}
                <button onClick={()=>delFrog(f.id)} style={{background:"transparent",color:"rgba(192,57,43,0.5)",border:"none",cursor:"pointer",fontSize:14,padding:0}}>🗑</button>
              </div>
            ))}
          </div>

          {/* AI Task Picks */}
          <div style={{background:"rgba(248,245,236,0.90)",borderRadius:24,padding:"16px 18px",marginBottom:14,boxShadow:"0 2px 14px rgba(0,0,0,0.05)",border:"1px solid rgba(255,255,255,0.9)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
              <span style={{fontSize:26}}>🤖</span>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:17,color:"#1A1A10",flex:1}}>AI Task Picks</div>
              <button onClick={getAiSugg} disabled={aiLoad} style={{background:"#6A8858",color:"#fff",border:"none",borderRadius:100,padding:"9px 20px",fontWeight:700,fontSize:14,cursor:"pointer",opacity:aiLoad?0.6:1,boxShadow:"0 2px 10px rgba(90,120,72,0.28)"}}>
                {aiLoad?"Thinking…":"Ask AI"}
              </button>
            </div>
            {aiSugg.length>0?aiSugg.map((s,i)=>(
              <Row key={i} name={s} src="🤖 AI pick" done={charged.includes(s)} onCharge={()=>chargeIt(s)}/>
            )):(
              <div style={{color:"#8A8070",fontSize:13,lineHeight:1.6}}>
                Tap "Ask AI" — it'll study your tasks and pick the ones you're most likely avoiding.
              </div>
            )}
          </div>

          {/* Charged today summary */}
          {charged.length>0&&(
            <div style={{background:"rgba(90,160,80,0.08)",borderRadius:22,padding:"16px 18px",marginBottom:14,border:"1px solid rgba(90,160,80,0.2)"}}>
              <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#3A6020",fontSize:15,marginBottom:10}}>✅ Charged today ({charged.length})</div>
              {charged.map((n,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:i<charged.length-1?"1px solid rgba(90,120,72,0.12)":"none"}}>
                  <span style={{fontSize:14}}>⚡</span>
                  <span style={{fontSize:13,fontWeight:600,color:"#3A5020"}}>{n}</span>
                </div>
              ))}
            </div>
          )}
        </>}

        {/* ══ WEEK ══ */}
        {view==="week"&&<>
          <div style={{background:"rgba(248,245,236,0.90)",borderRadius:24,padding:"22px 20px",marginBottom:14,boxShadow:"0 2px 16px rgba(0,0,0,0.06)",border:"1px solid rgba(255,255,255,0.9)",textAlign:"center"}}>
            <OrbOfLight pct={weekPcts.reduce((a,b)=>a+b,0)/7} size={140}/>
            <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:20,marginTop:12}}>Weekly Light</div>
            <div style={{color:"#8A8070",fontSize:13,marginTop:4}}>{daysHit}/7 days fully charged · {weekTotal} total tasks</div>
            {daysHit>=5&&data.weeklyAward&&(
              <div style={{marginTop:14,background:"rgba(90,120,72,0.10)",borderRadius:16,padding:"12px 18px"}}>
                <div style={{fontFamily:"Georgia,serif",color:"#3A6020",fontWeight:700,fontSize:15}}>🎁 Weekly reward unlocked!</div>
                <div style={{color:"#5A7040",fontSize:14,marginTop:4}}>{data.weeklyAward}</div>
              </div>
            )}
          </div>
          <div style={{background:"rgba(248,245,236,0.90)",borderRadius:24,padding:"18px 18px",marginBottom:14,boxShadow:"0 2px 14px rgba(0,0,0,0.05)",border:"1px solid rgba(255,255,255,0.9)"}}>
            <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:15,marginBottom:14}}>This week</div>
            <div style={{display:"flex",gap:6,alignItems:"flex-end",height:80}}>
              {weekDays.map((d,i)=>{
                const p=weekPcts[i];
                const isToday=d===today;
                return(
                  <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                    <div style={{width:"100%",height:60,background:"rgba(90,80,60,0.08)",borderRadius:8,display:"flex",alignItems:"flex-end",overflow:"hidden"}}>
                      <div style={{width:"100%",height:`${Math.max(4,p)}%`,background:p>=100?"#5A7848":p>0?"#8AAA78":"rgba(90,80,60,0.1)",borderRadius:"6px 6px 0 0",transition:"height 0.4s"}}/>
                    </div>
                    <div style={{fontSize:9,fontWeight:isToday?800:500,color:isToday?"#3A6020":"#9A9080"}}>{dayNames[new Date(d).getDay()]}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{background:"rgba(248,245,236,0.90)",borderRadius:24,padding:"18px 18px",marginBottom:14,boxShadow:"0 2px 14px rgba(0,0,0,0.05)",border:"1px solid rgba(255,255,255,0.9)"}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{fontSize:40}}>🔥</div>
              <div>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:20}}>{data.streak} day streak</div>
                <div style={{color:"#8A8070",fontSize:13}}>Days in a row hitting your target</div>
              </div>
            </div>
          </div>
        </>}

        {/* ══ SETUP ══ */}
        {view==="settings"&&<>
          <div style={{background:"rgba(248,245,236,0.90)",borderRadius:24,padding:"20px 18px",marginBottom:14,boxShadow:"0 2px 14px rgba(0,0,0,0.05)",border:"1px solid rgba(255,255,255,0.9)"}}>
            <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:16,marginBottom:14}}>⚡ Daily target</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {[1,2,3,4,5].map(n=>(
                <button key={n} onClick={()=>upd({dailyTarget:n})} style={{flex:1,minWidth:48,padding:"12px 8px",background:target===n?"#6A8858":"rgba(248,245,236,0.95)",color:target===n?"#fff":"#3A3020",border:`1.5px solid ${target===n?"#6A8858":"rgba(90,80,60,0.18)"}`,borderRadius:16,fontWeight:700,fontSize:15,cursor:"pointer"}}>{n}</button>
              ))}
            </div>
          </div>
          <div style={{background:"rgba(248,245,236,0.90)",borderRadius:24,padding:"20px 18px",marginBottom:14,boxShadow:"0 2px 14px rgba(0,0,0,0.05)",border:"1px solid rgba(255,255,255,0.9)"}}>
            <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:16,marginBottom:6}}>🎁 Weekly reward</div>
            <div style={{color:"#8A8070",fontSize:13,marginBottom:12}}>Hit your target 5+ days to unlock it</div>
            {editAward?(
              <>
                <input value={draftAward} onChange={e=>setDraftAward(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(upd({weeklyAward:draftAward}),setEditAward(false))}
                  placeholder="e.g. Movie night, massage..."
                  style={{width:"100%",boxSizing:"border-box",padding:"12px 16px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.25)",fontSize:14,color:"#1A1A10",outline:"none",marginBottom:10,background:"rgba(255,255,255,0.85)"}}/>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>setEditAward(false)} style={{flex:1,background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,padding:"11px",fontWeight:600,cursor:"pointer"}}>Cancel</button>
                  <button onClick={()=>{upd({weeklyAward:draftAward});setEditAward(false);}} style={{flex:2,background:"#6A8858",color:"#fff",border:"none",borderRadius:100,padding:"11px",fontWeight:700,cursor:"pointer",boxShadow:"0 3px 12px rgba(90,120,72,0.28)"}}>Save reward</button>
                </div>
              </>
            ):(
              <button onClick={()=>{setDraftAward(data.weeklyAward||"");setEditAward(true);}} style={{width:"100%",padding:"13px",background:data.weeklyAward?"rgba(90,120,72,0.10)":"rgba(248,245,236,0.95)",color:data.weeklyAward?"#3A6020":"#8A8070",border:`1.5px dashed ${data.weeklyAward?"rgba(90,120,72,0.3)":"rgba(90,80,60,0.2)"}`,borderRadius:100,fontWeight:600,fontSize:14,cursor:"pointer"}}>
                {data.weeklyAward?`🎁 ${data.weeklyAward}`:"+ Set your weekly reward"}
              </button>
            )}
          </div>
        </>}

      </div>
      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:"rgba(42,56,28,0.92)",color:"#fff",borderRadius:100,padding:"11px 22px",fontWeight:700,fontSize:14,zIndex:500,whiteSpace:"nowrap",backdropFilter:"blur(8px)",boxShadow:"0 4px 20px rgba(0,0,0,0.18)"}}>{toast}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   🌿 REST SPACE  — Guided rest · Nature sounds · Break timer
   White noise moved here from Tools
═══════════════════════════════════════════════════════ */

const MEDITATIONS=[
  {id:"breath",   icon:"🌬️", title:"Breathing Rest",      duration:300,
   desc:"Gentle guided breathing to calm the nervous system",
   script:["Close your eyes and let your body settle...","Breathe in slowly for 4 counts... 1... 2... 3... 4...","Hold gently for 2... 1... 2...","Breathe out slowly for 6... 1... 2... 3... 4... 5... 6...","Feel your body becoming heavier and more relaxed...","You are safe. You are resting. Nothing needs doing right now...","Continue this gentle rhythm... in for 4... hold for 2... out for 6...","Let any thoughts float past like clouds... you don't need to follow them...","Your body is doing the healing work now. You just rest...","When you're ready, take a deeper breath and gently open your eyes."]},
  {id:"body",     icon:"🌿", title:"Body Scan Rest",       duration:300,
   desc:"Slowly release tension from head to toe",
   script:["Find a comfortable position and close your eyes...","Begin with your face... let your jaw soften... your eyes relax...","Feel your shoulders drop away from your ears...","Let your arms become heavy and warm...","Notice your chest rising and falling... no effort needed...","Let your belly soften with each breath out...","Feel the weight of your hips and legs against whatever supports you...","Your whole body is heavy... warm... supported...","You don't need to do anything right now. Just rest here...","Slowly, gently, come back when you feel ready."]},
  {id:"light",    icon:"✨", title:"Light & Peace",         duration:300,
   desc:"Visualise warm healing light filling your body",
   script:["Settle into stillness and close your eyes softly...","Imagine a warm golden light just above you...","With each breath in, that light flows gently into the crown of your head...","It moves slowly down through your neck and shoulders... warm and peaceful...","Down through your chest... filling your heart with quiet warmth...","Down through your stomach... your hips... flowing gently...","All the way down to your feet... your whole body glowing softly...","This is the light of rest... of peace... of being enough exactly as you are...","Rest here in this warmth for a moment...","When you're ready, carry this peace back with you."]},
  {id:"nature",   icon:"🌸", title:"Garden Visualisation",  duration:300,
   desc:"A gentle walk through a peaceful garden",
   script:["Close your eyes and take three slow breaths...","Imagine you are stepping into a beautiful garden...","The air is warm and gentle... you can smell flowers and fresh earth...","There is a soft path beneath your feet... you walk slowly, no destination...","You notice a bench in a sunny spot and sit down quietly...","Birdsong drifts around you... a breeze moves through the leaves...","There is nothing to do here. Nothing to fix. Nothing to be...","You are simply here, in this garden, completely at rest...","Let your body drink in this peace... your whole system settling...","Slowly become aware of the room around you, carrying the garden's calm with you."]},
  {id:"fatigue",  icon:"💙", title:"Fatigue Recovery Rest", duration:420,
   desc:"Specifically designed for fatigue — no sleep, deep rest",
   script:["This is your permission to rest fully without sleeping...","Let your body be completely supported... release all effort...","You do not need to achieve anything in the next few minutes...","Notice any tension and simply let it be there without fighting it...","Your nervous system is doing important work right now as you rest...","Each breath out... releasing a little more... each breath in... receiving rest...","Your body knows how to restore itself. Trust this process...","You are not being lazy. You are being wise. Rest is productive...","Stay here as long as you need... there is no rush, no pressure...","When you return, you will feel a little more resourced. Rest well."]},
];

const NATURE_SOUNDS=WN_PRESETS; // reuse the existing audio engine

function RestSpace({setScreen}){
  const [tab,setTab]=useState("meditate");
  const [activeMed,setActiveMed]=useState(null);
  const [medStep,setMedStep]=useState(0);
  const [medRunning,setMedRunning]=useState(false);
  const [medDone,setMedDone]=useState(false);
  const [breakMins,setBreakMins]=useState(10);
  const [breakLeft,setBreakLeft]=useState(null);
  const [breakOn,setBreakOn]=useState(false);
  const [audioFiles,setAudioFiles]=useState({}); // {medId: base64dataUrl}
  const [audioPlaying,setAudioPlaying]=useState(null);
  const audioRef=useRef(null);
  const breakRef=useRef(null);

  // Meditation auto-advance (text fallback only when no audio uploaded)
  useEffect(()=>{
    if(!medRunning||!activeMed||audioFiles[activeMed.id])return;
    const steps=activeMed.script;
    if(medStep>=steps.length){setMedDone(true);setMedRunning(false);return;}
    const delay=(activeMed.duration/steps.length)*1000;
    const t=setTimeout(()=>setMedStep(s=>s+1),delay);
    return()=>clearTimeout(t);
  },[medRunning,medStep,activeMed,audioFiles]);

  // Break timer
  useEffect(()=>{
    if(breakOn&&breakLeft>0){breakRef.current=setInterval(()=>setBreakLeft(l=>l-1),1000);}
    else{clearInterval(breakRef.current);if(breakLeft===0&&breakOn)setBreakOn(false);}
    return()=>clearInterval(breakRef.current);
  },[breakOn,breakLeft]);

  const startMed=(med)=>{
    setActiveMed(med);setMedStep(0);setMedRunning(true);setMedDone(false);
    // If audio uploaded, play it
    if(audioFiles[med.id]){
      if(audioRef.current){audioRef.current.pause();audioRef.current=null;}
      const audio=new Audio(audioFiles[med.id]);
      audio.onended=()=>{setMedDone(true);setMedRunning(false);setAudioPlaying(null);};
      audio.play();audioRef.current=audio;setAudioPlaying(med.id);
    }
  };

  const stopMed=()=>{
    if(audioRef.current){audioRef.current.pause();audioRef.current=null;}
    setActiveMed(null);setMedRunning(false);setMedDone(false);setMedStep(0);setAudioPlaying(null);
  };

  const uploadAudio=(medId,e)=>{
    const file=e.target.files[0];if(!file)return;
    const r=new FileReader();
    r.onload=ev=>setAudioFiles(a=>({...a,[medId]:ev.target.result}));
    r.readAsDataURL(file);
  };

  const removeAudio=(medId)=>setAudioFiles(a=>{const n={...a};delete n[medId];return n;});

  const startBreak=()=>{setBreakLeft(breakMins*60);setBreakOn(true);};
  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  return(
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>

      {/* Header */}
      <div style={{background:"rgba(248,245,236,0.92)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",padding:"14px 20px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(90,80,60,0.08)",position:"sticky",top:0,zIndex:50}}>
        <button onClick={()=>setScreen&&setScreen("home")} style={{background:"none",border:"none",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        <div style={{flex:1,textAlign:"center",fontFamily:"Georgia,serif",fontWeight:700,fontSize:20,color:"#1A1A10"}}>Rest Space 🌿</div>
        <div style={{width:36}}/>tAlign:"center",boxShadow:"0 4px 20px rgba(0,0,0,0.3)"}}>
        <div style={{fontSize:13,color:"#6A6050",fontStyle:"italic",lineHeight:1.6}}>
          "Rest is not a reward for finishing — it's part of the work" 🌿
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",background:"rgba(0,0,0,0.25)",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        {[["meditate","🧘 Guided Rest"],["sounds","🎵 Sounds"],["timer","⏱ Break Timer"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"11px 4px",background:"none",border:"none",borderBottom:tab===k?"3px solid #52c47a":"3px solid transparent",color:tab===k?"#fff":"rgba(255,255,255,0.45)",fontWeight:tab===k?800:600,fontSize:12,cursor:"pointer"}}>{l}</button>
        ))}
      </div>

      <div style={{padding:"14px 14px"}}>

        {/* ── GUIDED REST ── */}
        {tab==="meditate"&&<>
          {/* Active meditation */}
          {activeMed&&(
            <div style={{background:"rgba(248,245,236,0.90)",borderRadius:22,padding:"24px 20px",marginBottom:16,boxShadow:"0 8px 32px rgba(0,0,0,0.4)",border:"1px solid rgba(90,120,72,0.20)"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                <button onClick={stopMed} style={{background:"rgba(248,245,236,0.92)",color:"#fff",border:"none",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>←</button>
                <span style={{fontSize:30}}>{activeMed.icon}</span>
                <div style={{flex:1}}>
                  <div style={{color:"#fff",fontWeight:900,fontSize:18}}>{activeMed.title}</div>
                  <div style={{color:"#7A7060",fontSize:12}}>{medDone?"Complete ✨":audioFiles[activeMed.id]?"🎵 Audio playing...":medRunning?"Reading script...":"Paused"}</div>
                </div>
                <button onClick={stopMed} style={{background:"rgba(248,245,236,0.92)",color:"#fff",border:"none",borderRadius:10,padding:"6px 12px",fontWeight:700,fontSize:12,cursor:"pointer"}}>✕ End</button>
              </div>
              {/* Script text — shows when no audio uploaded */}
              {!medDone&&!audioFiles[activeMed.id]&&(
                <div style={{background:"rgba(90,80,60,0.06)",borderRadius:16,padding:"18px 20px",marginBottom:16,minHeight:80,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(82,196,122,0.2)"}}>
                  <div style={{color:"#e0f7e9",fontSize:16,fontWeight:600,textAlign:"center",lineHeight:1.7,fontStyle:"italic"}}>
                    {activeMed.script[Math.min(medStep,activeMed.script.length-1)]}
                  </div>
                </div>
              )}
              {/* Audio playing indicator */}
              {!medDone&&audioFiles[activeMed.id]&&(
                <div style={{background:"rgba(90,80,60,0.06)",borderRadius:16,padding:"18px 20px",marginBottom:16,display:"flex",flexDirection:"column",alignItems:"center",gap:12,border:"1px solid rgba(90,120,72,0.20)"}}>
                  <div style={{display:"flex",gap:6,alignItems:"flex-end",height:32}}>
                    {[0.4,0.7,1,0.8,0.5,0.9,0.6,0.75,0.45,0.85].map((h,i)=>(
                      <div key={i} style={{width:4,borderRadius:2,background:"#52c47a",height:`${h*100}%`,opacity:0.7+i*0.03}}/>
                    ))}
                  </div>
                  <div style={{color:"#e0f7e9",fontSize:14,fontWeight:600,textAlign:"center"}}>🎵 Your guided meditation is playing</div>
                  <div style={{color:"#8A8070",fontSize:12}}>Close your eyes or keep them soft and unfocused</div>
                </div>
              )}
              {medDone&&(
                <div style={{background:"rgba(82,196,122,0.15)",borderRadius:16,padding:"20px",textAlign:"center",border:"1px solid rgba(82,196,122,0.4)"}}>
                  <div style={{fontSize:36,marginBottom:8}}>🌿</div>
                  <div style={{color:"#3A6020",fontWeight:900,fontSize:18,marginBottom:4}}>Rest complete</div>
                  <div style={{color:"#6A6050",fontSize:14}}>Take a moment before moving on</div>
                </div>
              )}
              {/* Progress dots */}
              {!medDone&&(
                <div style={{display:"flex",gap:5,justifyContent:"center",flexWrap:"wrap"}}>
                  {activeMed.script.map((_,i)=>(
                    <div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<medStep?"#52c47a":i===medStep?"#fff":"rgba(255,255,255,0.2)",transition:"all 0.3s"}}/>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Meditation cards */}
          {!activeMed&&<>
            <div style={{color:"#6A6050",fontSize:13,textAlign:"center",marginBottom:14,lineHeight:1.6}}>
              These are guided rest sessions — not sleep.<br/>Perfect for fatigue recovery during the day 💙
            </div>
            {MEDITATIONS.map(med=>(
              <div key={med.id}
                style={{background:"rgba(255,255,255,0.07)",borderRadius:18,padding:"14px 14px",marginBottom:12,border:"1px solid rgba(82,196,122,0.2)"}}>
                {/* Card header — tap to play */}
                <div onClick={()=>startMed(med)} style={{display:"flex",alignItems:"center",gap:14,cursor:"pointer",marginBottom:10}}
                  onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                  onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                  <div style={{width:52,height:52,borderRadius:14,background:"linear-gradient(135deg,#1e5c3a,#52c47a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{med.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{color:"#fff",fontWeight:800,fontSize:15,marginBottom:3}}>{med.title}</div>
                    <div style={{color:"#7A7060",fontSize:12,marginBottom:3}}>{med.desc}</div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{color:"rgba(82,196,122,0.8)",fontSize:11,fontWeight:700}}>{Math.round(med.duration/60)} min</span>
                      {audioFiles[med.id]&&<span style={{background:"rgba(82,196,122,0.25)",color:"#3A6020",fontSize:10,fontWeight:800,borderRadius:10,padding:"2px 8px"}}>🎵 Audio ready</span>}
                      {!audioFiles[med.id]&&<span style={{color:"#9A9080",fontSize:10}}>📝 Text script</span>}
                    </div>
                  </div>
                  <div style={{color:"#9A9080",fontSize:22}}>▶</div>
                </div>
                {/* Audio upload row */}
                <div style={{display:"flex",gap:8,alignItems:"center",borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:10}}>
                  {audioFiles[med.id]?(
                    <>
                      <div style={{flex:1,fontSize:11,color:"rgba(82,196,122,0.8)",fontWeight:700}}>🎵 ElevenLabs audio uploaded</div>
                      <button onClick={()=>removeAudio(med.id)} style={{background:"rgba(255,100,100,0.2)",color:"rgba(255,150,150,0.9)",border:"1px solid rgba(255,100,100,0.3)",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>✕ Remove</button>
                    </>
                  ):(
                    <>
                      <div style={{flex:1,fontSize:11,color:"rgba(255,255,255,0.35)"}}>Upload your ElevenLabs MP3</div>
                      <label style={{background:"rgba(90,120,72,0.12)",color:"#3A6020",border:"1px solid rgba(82,196,122,0.4)",borderRadius:8,padding:"5px 12px",fontSize:11,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                        🎵 Upload audio
                        <input type="file" accept="audio/*" style={{display:"none"}} onChange={e=>uploadAudio(med.id,e)}/>
                      </label>
                    </>
                  )}
                </div>
              </div>
            ))}
          </>}
        </>}

        {/* ── NATURE SOUNDS (White Noise moved here) ── */}
        {tab==="sounds"&&(
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <button onClick={()=>setTab("meditate")} style={{background:"rgba(248,245,236,0.88)",color:"#fff",border:"1px solid rgba(90,80,60,0.12)",borderRadius:10,width:34,height:34,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
              <span style={{color:"#4A4A38",fontWeight:700,fontSize:14}}>🎵 Nature Sounds</span>
            </div>
            <WhiteNoise/>
          </div>
        )}

        {/* ── BREAK TIMER ── */}
        {tab==="timer"&&(
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <button onClick={()=>setTab("meditate")} style={{background:"rgba(248,245,236,0.88)",color:"#fff",border:"1px solid rgba(90,80,60,0.12)",borderRadius:10,width:34,height:34,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
              <span style={{color:"#4A4A38",fontWeight:700,fontSize:14}}>⏱ Break Timer</span>
            </div>
            <div style={{color:"#6A6050",fontSize:13,textAlign:"center",marginBottom:16,lineHeight:1.6}}>
              Set a break timer. During your break, switch to Guided Rest or Sounds 🌿
            </div>
            {/* Big timer display */}
            <div style={{background:"rgba(255,255,255,0.06)",borderRadius:22,padding:"28px 20px",marginBottom:16,textAlign:"center",border:"1px solid rgba(82,196,122,0.2)"}}>
              {breakLeft!==null?(
                <>
                  <div style={{fontFamily:"monospace",fontSize:64,fontWeight:900,color:breakLeft<60?"#FF6B6B":"#52c47a",lineHeight:1,marginBottom:8}}>{fmt(breakLeft)}</div>
                  <div style={{color:"#7A7060",fontSize:13,marginBottom:16}}>
                    {breakOn?"Rest time — you're doing great 🌿":"Break paused"}
                  </div>
                  <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                    <button onClick={()=>{clearInterval(breakRef.current);setBreakOn(false);setBreakLeft(null);}}
                      style={{background:"rgba(255,107,107,0.3)",color:"#fff",border:"1px solid rgba(255,107,107,0.5)",borderRadius:12,padding:"10px 20px",fontWeight:800,cursor:"pointer"}}>✕ Cancel</button>
                    <button onClick={()=>setTab("meditate")}
                      style={{background:"linear-gradient(135deg,#1e5c3a,#52c47a)",color:"#fff",border:"none",borderRadius:12,padding:"10px 20px",fontWeight:800,cursor:"pointer"}}>🧘 Start guided rest</button>
                  </div>
                </>
              ):(
                <>
                  <div style={{fontSize:13,fontWeight:700,color:"#7A7060",marginBottom:14}}>Break duration</div>
                  <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:20}}>
                    {[5,10,15,20,30].map(m=>(
                      <button key={m} onClick={()=>setBreakMins(m)} style={{background:breakMins===m?"rgba(82,196,122,0.3)":"rgba(255,255,255,0.08)",color:breakMins===m?"#52c47a":"rgba(255,255,255,0.6)",border:`1.5px solid ${breakMins===m?"#52c47a":"rgba(255,255,255,0.15)"}`,borderRadius:20,padding:"8px 16px",fontWeight:breakMins===m?800:600,fontSize:13,cursor:"pointer"}}>
                        {m} min
                      </button>
                    ))}
                  </div>
                  <button onClick={startBreak}
                    style={{background:"linear-gradient(135deg,#1e5c3a,#52c47a)",color:"#fff",border:"none",borderRadius:16,padding:"16px 40px",fontWeight:900,fontSize:17,cursor:"pointer",boxShadow:"0 4px 18px rgba(82,196,122,0.4)"}}>
                    🌿 Start {breakMins} min rest
                  </button>
                </>
              )}
            </div>
            {/* Tips */}
            <div style={{background:"rgba(255,255,255,0.06)",borderRadius:16,padding:"14px 16px",border:"1px solid rgba(82,196,122,0.15)"}}>
              <div style={{color:"#3A6020",fontWeight:800,fontSize:13,marginBottom:8}}>💙 Rest tips</div>
              {["Avoid screens during your break if possible","Lie down or sit comfortably — you don't need to sleep","Use guided rest instead of napping to avoid sleep inertia","Even 10 minutes of proper rest restores energy","Your body heals and restores during conscious rest"].map((tip,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:6}}>
                  <span style={{color:"#3A6020",flexShrink:0}}>🌿</span>
                  <span style={{color:"#6A6050",fontSize:13}}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   💎 THINKO PRO — Freemium gate system
   All features UNLOCKED during testing (isPro=true)
   Flip isPro=false at launch to enforce limits
═══════════════════════════════════════════════════════ */

// ── MASTER SWITCH — set false at launch ──────────────
const TESTING_MODE = true;

// ── Pro limits (enforced when TESTING_MODE=false) ────
const FREE_LIMITS = {
  aiCallsPerDay:      3,   // AI suggestions, study studio, etc
  mindMaps:           3,   // max mind maps
  prioritizerLists:   1,   // max lists
  matrixTasks:        10,  // max matrix tasks
  goalsTotal:         5,   // max goals across all horizons
  restSessions:       5,   // guided rest sessions per month
  filingDrawers:      2,   // max filing cabinet drawers
  noteSections:       3,   // max note sections
};

// ── Hook to check if user can do something ───────────
// Usage: const {canDo, showUpgrade} = usePro();
// if(!canDo('aiCallsPerDay')) { showUpgrade(); return; }
function usePro() {
  const [showModal, setShowModal] = useState(false);
  const [limitHit, setLimitHit]   = useState("");

  const canDo = (feature, currentCount=0) => {
    if (TESTING_MODE) return true;          // 🔓 all unlocked
    const limit = FREE_LIMITS[feature];
    if (limit === undefined) return true;
    return currentCount < limit;
  };

  const gate = (feature, currentCount, action) => {
    if (canDo(feature, currentCount)) { action(); return; }
    setLimitHit(feature);
    setShowModal(true);
  };

  return { canDo, gate, showModal, setShowModal, limitHit };
}

function ProUpgradeModal({ limitHit, onClose }) {
  const featureNames = {
    aiCallsPerDay:    "AI suggestions",
    mindMaps:         "Mind Maps",
    prioritizerLists: "Prioritizer lists",
    matrixTasks:      "Matrix tasks",
    goalsTotal:       "Goals",
    restSessions:     "Rest Space sessions",
    filingDrawers:    "Filing Cabinet drawers",
    noteSections:     "Note sections",
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:999,background:"rgba(10,2,30,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:C.wh,borderRadius:24,padding:"28px 24px",width:"100%",maxWidth:380,textAlign:"center",boxShadow:"0 12px 48px rgba(45,10,94,0.5)"}}>
        <div style={{fontSize:48,marginBottom:12}}>💎</div>
        <div style={{fontWeight:900,color:C.dp,fontSize:22,marginBottom:8}}>Unlock Thinko Pro</div>
        <div style={{color:C.soft,fontSize:14,lineHeight:1.6,marginBottom:6}}>
          You've reached the free limit for
        </div>
        <div style={{background:C.ll,color:C.pp,fontWeight:800,fontSize:15,borderRadius:10,padding:"8px 16px",marginBottom:16,display:"inline-block"}}>
          {featureNames[limitHit]||limitHit}
        </div>
        <div style={{color:C.soft,fontSize:13,marginBottom:20,lineHeight:1.6}}>
          Upgrade to Pro for unlimited access to everything in Thinko
        </div>

        {/* Pricing */}
        <div style={{background:`linear-gradient(135deg,${C.dp},${C.mp})`,borderRadius:16,padding:"16px",marginBottom:16,color:C.wh}}>
          <div style={{fontSize:32,fontWeight:900,marginBottom:2}}>£4.99<span style={{fontSize:14,fontWeight:600}}>/month</span></div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginBottom:12}}>or £39.99/year — save £20</div>
          {["Unlimited AI features","All modules & features","Filing Cabinet uploads","Study Studio","Rest Space full library","Cross-device sync"].map((f,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,marginBottom:4}}>
              <span style={{color:"#52c47a"}}>✓</span><span>{f}</span>
            </div>
          ))}
        </div>

        <button style={{width:"100%",padding:"14px",background:btnGrad,color:"#1A1A10",border:"none",borderRadius:14,fontWeight:900,fontSize:16,cursor:"pointer",marginBottom:10,boxShadow:"0 4px 16px rgba(90,80,60,0.35)"}}>
          🚀 Upgrade to Pro
        </button>
        <button onClick={onClose} style={{width:"100%",padding:"11px",background:"transparent",color:C.soft,border:`1px solid ${C.ll}`,borderRadius:14,fontWeight:700,fontSize:14,cursor:"pointer"}}>
          Maybe later
        </button>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   🔐 AUTH SYSTEM — Supabase + Google
═══════════════════════════════════════════════════════ */
const SUPABASE_URL="https://qlgvcwfmgamfarlrcqoy.supabase.co";
const SUPABASE_ANON_KEY="sb_publishable_zFA1_iBaYLUcjdqaS35Gtw_vtt_duJm";
const supabase={
  async signInWithGoogle(){window.location.href=`${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin)}`;},
  async signOut(){const t=localStorage.getItem("thinko_access_token");await fetch(`${SUPABASE_URL}/auth/v1/logout`,{method:"POST",headers:{"Authorization":`Bearer ${t}`,"apikey":SUPABASE_ANON_KEY}});localStorage.removeItem("thinko_access_token");},
  async getUser(){const t=localStorage.getItem("thinko_access_token");if(!t)return null;try{const r=await fetch(`${SUPABASE_URL}/auth/v1/user`,{headers:{"Authorization":`Bearer ${t}`,"apikey":SUPABASE_ANON_KEY}});return r.ok?await r.json():null;}catch{return null;}},
  handleAuthCallback(){const h=window.location.hash;if(h.includes("access_token")){const p=new URLSearchParams(h.replace("#",""));const t=p.get("access_token");if(t){localStorage.setItem("thinko_access_token",t);window.history.replaceState(null,"",window.location.pathname);return true;}}return false;}
};
function useAuth(){
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{supabase.handleAuthCallback();supabase.getUser().then(u=>{setUser(u);setLoading(false);});},[]);
  const signIn=()=>supabase.signInWithGoogle();
  const signOut=async()=>{await supabase.signOut();setUser(null);};
  const isPro=!!user;
  return{user,loading,signIn,signOut,isPro};
}


const MODULES=[
  {id:"prioritizer", name:"Prioritizer",  desc:"Tasks, timers & priorities",       icon:"📋"},
  {id:"mindmap",     name:"Mind Map",     desc:"Visual thinking & brainstorm",      icon:"🧠"},
  {id:"notes",       name:"The Vault",    desc:"Notes, Ideas, Filing & Studio",     icon:"📚"},
  {id:"meals",       name:"Meal Planner", desc:"Plan your week of meals",           icon:"🍽️"},
  {id:"goals",       name:"Goals",        desc:"Smart goals · 5 horizons",          icon:"🎯"},
  {id:"matrix",      name:"Matrix",       desc:"Eisenhower urgent-important grid",  icon:"⚡"},
  {id:"charge",      name:"The Charge",   desc:"Daily challenge · orb of light",   icon:"⚡"},
  {id:"budget",      name:"Budget",       desc:"Income, outgoing & AI review",     icon:"💰"},
  {id:"shopping",    name:"Shopping",     desc:"Multiple lists, tick off as you go",icon:"🛒"},
  {id:"tools",       name:"Tools",        desc:"Calculator, timer, alarm & sounds", icon:"🔧"},
  {id:"rest",        name:"Rest Space",   desc:"Guided rest · Nature sounds",       icon:"🌿"},
];

function ProLoginModal({onClose,onSignIn}){
  return(
    <div style={{position:"fixed",inset:0,zIndex:999,background:"rgba(232,225,212,0.9)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:"rgba(252,249,242,0.97)",borderRadius:28,padding:"32px 24px",width:"100%",maxWidth:380,textAlign:"center",boxShadow:"0 12px 48px rgba(60,50,30,0.15)",border:"1px solid rgba(255,255,255,0.9)"}}>
        <div style={{fontSize:48,marginBottom:12}}>💎</div>
        <div style={{fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A10",fontSize:22,marginBottom:8}}>Unlock Thinko Pro</div>
        <div style={{color:"#6A6050",fontSize:14,lineHeight:1.6,marginBottom:20}}>Sign in with Google to unlock all features</div>
        <div style={{background:"linear-gradient(135deg,#2C3820,#4A7038)",borderRadius:16,padding:"14px 16px",marginBottom:16,color:"#fff",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div><div style={{fontWeight:900,fontSize:22}}>£4.99<span style={{fontSize:13,fontWeight:400}}>/month</span></div><div style={{fontSize:11,opacity:0.6}}>or £39.99/year — save £20</div></div>
          <div style={{fontSize:28}}>🌿</div>
        </div>
        <button onClick={onSignIn} style={{width:"100%",padding:"14px",background:"#fff",color:"#444",border:"2px solid #ddd",borderRadius:14,fontWeight:800,fontSize:15,cursor:"pointer",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center",gap:12,boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
        <button onClick={onClose} style={{width:"100%",padding:"11px",background:"transparent",color:"#8A8070",border:"1px solid rgba(160,152,140,0.3)",borderRadius:14,fontWeight:600,fontSize:14,cursor:"pointer"}}>Continue as guest</button>
      </div>
    </div>
  );
}

function AuthButton({user,onSignIn,onSignOut}){
  const[menuOpen,setMenuOpen]=useState(false);
  if(!user)return(<button onClick={onSignIn} style={{background:"rgba(74,112,56,0.15)",color:"#4A7038",border:"1.5px solid rgba(74,112,56,0.3)",borderRadius:12,padding:"7px 14px",fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>💎 Go Pro</button>);
  return(
    <div style={{position:"relative"}}>
      <button onClick={()=>setMenuOpen(m=>!m)} style={{background:"rgba(74,112,56,0.12)",color:"#4A7038",border:"1.5px solid rgba(74,112,56,0.25)",borderRadius:12,padding:"6px 12px",fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:7}}>
        {user.user_metadata?.avatar_url?<img src={user.user_metadata.avatar_url} style={{width:22,height:22,borderRadius:"50%"}} alt="av"/>:<span>👤</span>}
        <span style={{maxWidth:70,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:12}}>{user.user_metadata?.full_name?.split(" ")[0]||"Pro"}</span>💎
      </button>
      {menuOpen&&(
        <div style={{position:"absolute",top:"calc(100% + 8px)",right:0,background:"rgba(252,249,242,0.98)",borderRadius:14,padding:"8px",boxShadow:"0 8px 32px rgba(60,50,30,0.15)",minWidth:175,zIndex:200,border:"1px solid rgba(255,255,255,0.9)"}} onClick={()=>setMenuOpen(false)}>
          <div style={{padding:"8px 12px",fontSize:12,color:"#8A8070",borderBottom:"1px solid rgba(160,152,140,0.2)",marginBottom:4}}>{user.email}</div>
          <div style={{padding:"8px 12px",fontSize:13,fontWeight:700,color:"#4A7038"}}>✓ Pro subscriber</div>
          <button onClick={onSignOut} style={{width:"100%",padding:"8px 12px",background:"transparent",color:"#c0392b",border:"none",borderRadius:8,fontWeight:700,fontSize:13,cursor:"pointer",textAlign:"left"}}>Sign out</button>
        </div>
      )}
    </div>
  );
}


export default function App() {
  const [screen,setScreen]=useState("home");
  const {user,loading,signIn,signOut,isPro}=useAuth();
  const [showLoginModal,setShowLoginModal]=useState(false);
  const [showAIKeyModal,setShowAIKeyModal]=useState(false);
  const [aiKeyDraft,setAiKeyDraft]=useState("");
  const [priData,setPriData]=useState(()=>{try{const v=localStorage.getItem('thinko_pri');return v?JSON.parse(v):[];}catch{return [];}});
  const [mapData,setMapData]=useState(()=>{try{const v=localStorage.getItem('thinko_map');return v?JSON.parse(v):[];}catch{return [];}});
  const [notesData,setNotesData]=useState(()=>{try{const v=localStorage.getItem('thinko_notes');return v?JSON.parse(v):[];}catch{return [];}});
  const [mealData,setMealData]=useState(()=>{try{const v=localStorage.getItem('thinko_meal');return v?JSON.parse(v):{};}catch{return {};}});
  const [ideasData,setIdeasData]=useState(()=>{try{const v=localStorage.getItem('thinko_ideas');return v?JSON.parse(v):[];}catch{return [];}});
  const [matrixData,setMatrixData]=useState(()=>{try{const v=localStorage.getItem('thinko_matrix');return v?JSON.parse(v):[];}catch{return [];}});
  const [budgetData,setBudgetData]=useState(()=>{try{const v=localStorage.getItem('thinko_budget');return v?JSON.parse(v):[];}catch{return [];}});
  const [shopData,setShopData]=useState(()=>{try{const v=localStorage.getItem('thinko_shop');return v?JSON.parse(v):[];}catch{return [];}});
  const [goalsData,setGoalsData]=useState(()=>{try{const v=localStorage.getItem('thinko_goals');return v?JSON.parse(v):[];}catch{return [];}});
  const [chargeData,setChargeData]=useState(()=>{try{const v=localStorage.getItem('thinko_charge');return v?JSON.parse(v):{dailyTarget:3,weeklyAward:'',days:{},streak:0};}catch{return {dailyTarget:3,weeklyAward:'',days:{},streak:0};}});
  const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}};
  const [showProModal,setShowProModal]=useState(false);
  const [proLimitHit,setProLimitHit]=useState('');
  const [moduleOrder,setModuleOrder]=useState(()=>{try{const v=localStorage.getItem('thinko_order');return v?JSON.parse(v):MODULES.map(m=>m.id);}catch{return MODULES.map(m=>m.id);}});
  const [dragHome,setDragHome]=useState(null);
  const orderedModules=moduleOrder.map(id=>MODULES.find(m=>m.id===id)).filter(Boolean);
  // ── Name & greeting ──
  const [userName,setUserName]=useState(()=>{try{return localStorage.getItem('thinko_username')||'';}catch{return '';}});
  const [showNameModal,setShowNameModal]=useState(()=>{try{return !localStorage.getItem('thinko_username');}catch{return true;}});
  const [nameInput,setNameInput]=useState('');
  const getGreeting=()=>{const h=new Date().getHours();if(h>=5&&h<12)return{word:'Good morning',emoji:'✨'};if(h>=12&&h<17)return{word:'Good afternoon',emoji:'☀️'};if(h>=17&&h<21)return{word:'Good evening',emoji:'🌅'};return{word:'Good night',emoji:'🌙'};};
  const saveName=()=>{const n=nameInput.trim();if(!n)return;try{localStorage.setItem('thinko_username',n);}catch{}setUserName(n);setShowNameModal(false);};

  const homeDragStart=(e,id)=>{e.dataTransfer.effectAllowed="move";setDragHome(id);};
  const homeDragOver=(e,id)=>{
    e.preventDefault();
    if(!dragHome||dragHome===id)return;
    setModuleOrder(o=>{const a=[...o];const from=a.indexOf(dragHome),to=a.indexOf(id);a.splice(from,1);a.splice(to,0,dragHome);return a;});
  };
  const homeDragEnd=()=>setDragHome(null);

  if(screen==="prioritizer") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><Prioritizer data={priData} setData={setPriData} matrixData={matrixData} setMatrixData={setMatrixData} goalsData={goalsData} setGoalsData={setGoalsData} ideasData={ideasData} setIdeasData={setIdeasData} setScreen={setScreen}/><NavBar current="prioritizer" setScreen={setScreen}/></div></>);

  if(screen==="mindmap") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><MindMap data={mapData} setData={setMapData} priData={priData} setPriData={setPriData} ideasData={ideasData} setIdeasData={setIdeasData} matrixData={matrixData} setMatrixData={setMatrixData} goalsData={goalsData} setGoalsData={setGoalsData} setScreen={setScreen}/><NavBar current="mindmap" setScreen={setScreen}/></div></>);
  if(screen==="notes") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><Notes data={notesData} setData={setNotesData} priData={priData} setPriData={setPriData} mapData={mapData} setMapData={setMapData} ideasData={ideasData} setIdeasData={setIdeasData} matrixData={matrixData} setMatrixData={setMatrixData} goalsData={goalsData} setGoalsData={setGoalsData} setScreen={setScreen}/><NavBar current="notes" setScreen={setScreen}/></div></>);
  if(screen==="meals") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><MealPlanner data={mealData} setData={setMealData} shopData={shopData} setShopData={setShopData} setScreen={setScreen}/><NavBar current="meals" setScreen={setScreen}/></div></>);
  if(screen==="goals") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><Goals data={goalsData} setData={setGoalsData} priData={priData} setPriData={setPriData} matrixData={matrixData} setMatrixData={setMatrixData} notesData={notesData} setNotesData={setNotesData} mapData={mapData} setMapData={setMapData} ideasData={ideasData} setIdeasData={setIdeasData} setScreen={setScreen}/><NavBar current="goals" setScreen={setScreen}/></div></>);
  if(screen==="matrix") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><Matrix data={matrixData} setData={setMatrixData} priData={priData} setPriData={setPriData} mapData={mapData} setMapData={setMapData} goalsData={goalsData} setGoalsData={setGoalsData} ideasData={ideasData} setIdeasData={setIdeasData} setScreen={setScreen}/><NavBar current="matrix" setScreen={setScreen}/></div></>);
  if(screen==="charge") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><TheCharge priData={priData} matrixData={matrixData} goalsData={goalsData} setGoalsData={setGoalsData} ideasData={ideasData} setIdeasData={setIdeasData} setScreen={setScreen}/><NavBar current="charge" setScreen={setScreen}/></div></>);
  if(screen==="budget") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><BudgetPlanner data={budgetData} setData={setBudgetData} setScreen={setScreen}/><NavBar current="budget" setScreen={setScreen}/></div></>);
  if(screen==="shopping") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><ShoppingList data={shopData} setData={setShopData} setScreen={setScreen}/><NavBar current="shopping" setScreen={setScreen}/></div></>);
  if(screen==="tools") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><Tools setScreen={setScreen}/><NavBar current="tools" setScreen={setScreen}/></div></>);
  if(screen==="rest") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><RestSpace setScreen={setScreen}/><NavBar current="rest" setScreen={setScreen}/></div></>);

  return (
    <>
    <GardenBg/>
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90,position:"relative",zIndex:10}}>

      {/* ── NAME MODAL with vines ── */}
      {/* ── AI KEY SETUP MODAL ── */}
      {showAIKeyModal&&(
        <div style={{position:"fixed",inset:0,zIndex:500,background:"rgba(30,40,20,0.60)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,backdropFilter:"blur(8px)"}}>
          <div style={{background:"rgba(250,248,240,0.98)",borderRadius:28,padding:"28px 24px",width:"100%",maxWidth:360,boxShadow:"0 8px 48px rgba(0,0,0,0.18)"}}>
            <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:20,color:"#1A1A10",marginBottom:4}}>🤖 AI Setup</div>
            <div style={{fontSize:13,color:"#8A8070",lineHeight:1.7,marginBottom:16}}>
              To use AI features (suggestions, podcast, gap check, etc.) paste your Anthropic API key below. Get one free at <strong>console.anthropic.com</strong> — it only costs fractions of a penny per use.
            </div>
            <div style={{fontSize:11,color:"#5A7848",background:"rgba(90,120,72,0.08)",borderRadius:12,padding:"10px 14px",marginBottom:14,lineHeight:1.6}}>
              🔒 Your key is stored only on your device. Never sent anywhere except directly to Anthropic.
            </div>
            <input
              value={aiKeyDraft||getAIKey()}
              onChange={e=>setAiKeyDraft(e.target.value)}
              placeholder="sk-ant-api03-..."
              type="password"
              style={{width:"100%",boxSizing:"border-box",padding:"13px 16px",borderRadius:100,border:"1.5px solid rgba(90,120,72,0.25)",fontSize:14,color:"#1A1A10",outline:"none",marginBottom:12,background:"rgba(255,255,255,0.9)",fontFamily:"monospace"}}
            />
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>{saveAIKey("");setShowAIKeyModal(false);setAiKeyDraft("");}} style={{flex:1,padding:"13px",background:"rgba(90,80,60,0.08)",color:"#8A8070",border:"none",borderRadius:100,fontWeight:600,fontSize:13,cursor:"pointer"}}>
                {getAIKey()?"Remove Key":"Cancel"}
              </button>
              <button onClick={()=>{if(aiKeyDraft.trim())saveAIKey(aiKeyDraft.trim());setShowAIKeyModal(false);setAiKeyDraft("");}} style={{flex:2,padding:"13px",background:"linear-gradient(135deg,#3E6828,#5E9040)",color:"#fff",border:"none",borderRadius:100,fontFamily:"Georgia,serif",fontWeight:700,fontSize:14,cursor:"pointer",boxShadow:"0 3px 12px rgba(58,80,38,0.25)"}}>
                Save Key ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {showNameModal&&(
        <div style={{position:"fixed",inset:0,zIndex:300,overflow:"hidden"}}>
          {/* Full bleed garden background */}
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 65% at 48% 35%,#FAF8EE 0%,#F0E8D5 55%,#E2D8C0 100%)"}}/>

          {/* Animated SVG vines — full screen */}
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="wlf1" cx="30%" cy="25%" r="65%"><stop offset="0%" stopColor="#D0EE98"/><stop offset="45%" stopColor="#90C850"/><stop offset="100%" stopColor="#4E8820"/></radialGradient>
              <radialGradient id="wlf2" cx="35%" cy="28%" r="60%"><stop offset="0%" stopColor="#C0E480"/><stop offset="42%" stopColor="#82B840"/><stop offset="100%" stopColor="#427010"/></radialGradient>
              <radialGradient id="wlf3" cx="28%" cy="22%" r="70%"><stop offset="0%" stopColor="#D8F0A8"/><stop offset="50%" stopColor="#98C860"/><stop offset="100%" stopColor="#587828"/></radialGradient>
              <radialGradient id="wmr" x1="45%" y1="0%" x2="55%" y2="100%"><stop offset="0%" stopColor="rgba(28,55,8,0)"/><stop offset="50%" stopColor="rgba(28,55,8,0.10)"/><stop offset="100%" stopColor="rgba(28,55,8,0)"/></radialGradient>
              <radialGradient id="wed" cx="50%" cy="50%" r="50%"><stop offset="55%" stopColor="rgba(0,0,0,0)"/><stop offset="100%" stopColor="rgba(18,38,6,0.18)"/></radialGradient>
              <radialGradient id="whl" cx="28%" cy="20%" r="50%"><stop offset="0%" stopColor="rgba(255,255,255,0.32)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/></radialGradient>
              <linearGradient id="wstL" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#5A4416"/><stop offset="40%" stopColor="#7A6030"/><stop offset="65%" stopColor="#8A7240"/><stop offset="100%" stopColor="#5A4818"/></linearGradient>
              <linearGradient id="wstR" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stopColor="#5A4416"/><stop offset="40%" stopColor="#7A6030"/><stop offset="65%" stopColor="#8A7240"/><stop offset="100%" stopColor="#5A4818"/></linearGradient>
              <filter id="wls" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur in="SourceAlpha" stdDeviation="5"/><feOffset dx="1.5" dy="4"/><feComposite in2="SourceGraphic"/><feColorMatrix type="matrix" values="0 0 0 0 0.04  0 0 0 0 0.10  0 0 0 0 0.02  0 0 0 0.28 0"/></filter>
              <filter id="wls2" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur in="SourceAlpha" stdDeviation="3.5"/><feOffset dx="1" dy="3"/><feComposite in2="SourceGraphic"/><feColorMatrix type="matrix" values="0 0 0 0 0.04  0 0 0 0 0.10  0 0 0 0 0.02  0 0 0 0.18 0"/></filter>
              <filter id="wss"><feGaussianBlur in="SourceAlpha" stdDeviation="2.5"/><feOffset dx="2" dy="0"/><feComposite in2="SourceGraphic"/><feColorMatrix type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.10  0 0 0 0 0.02  0 0 0 0.22 0"/></filter>
              <radialGradient id="wvig" cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="transparent"/><stop offset="100%" stopColor="rgba(28,38,12,0.20)"/></radialGradient>
              <radialGradient id="wgold" cx="88%" cy="5%" r="38%"><stop offset="0%" stopColor="rgba(228,205,140,0.45)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
              <style>{`
                @keyframes wvineL { from{stroke-dashoffset:900} to{stroke-dashoffset:0} }
                @keyframes wvineR { from{stroke-dashoffset:900} to{stroke-dashoffset:0} }
                @keyframes wleaf  { from{opacity:0;transform:scale(0.4)} to{opacity:1;transform:scale(1)} }
                @keyframes wfloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
                @keyframes wglint { 0%,100%{opacity:0.6} 50%{opacity:1} }
                @keyframes wgarden{ from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
                .wvL{stroke-dasharray:900;animation:wvineL 2.8s ease forwards}
                .wvR{stroke-dasharray:900;animation:wvineR 2.8s ease 0.3s forwards}
                .wvT{stroke-dasharray:600;stroke-dashoffset:600;animation:wvineL 2.2s ease 0.5s forwards}
                .wl1{animation:wleaf 0.5s ease forwards}
                .wl2{animation:wleaf 0.5s ease 0.15s forwards;opacity:0}
                .wl3{animation:wleaf 0.5s ease 0.3s forwards;opacity:0}
                .wl4{animation:wleaf 0.5s ease 0.45s forwards;opacity:0}
                .wl5{animation:wleaf 0.5s ease 0.6s forwards;opacity:0}
                .wl6{animation:wleaf 0.5s ease 0.75s forwards;opacity:0}
                .wl7{animation:wleaf 0.5s ease 0.9s forwards;opacity:0}
                .wl8{animation:wleaf 0.5s ease 1.05s forwards;opacity:0}
                .wl9{animation:wleaf 0.5s ease 1.2s forwards;opacity:0}
                .wl10{animation:wleaf 0.5s ease 1.35s forwards;opacity:0}
                .wl11{animation:wleaf 0.5s ease 1.5s forwards;opacity:0}
                .wl12{animation:wleaf 0.5s ease 1.65s forwards;opacity:0}
                .worb{animation:wfloat 3s ease-in-out infinite}
                .wglint{animation:wglint 2.5s ease-in-out infinite}
                .wcard{animation:wgarden 0.9s ease 0.4s both}
              `}</style>
            </defs>

            <rect width="390" height="844" fill="url(#wgold)"/>

            {/* LEFT STEM — grows upward */}
            <path className="wvL" d="M-8 844 Q10 755 0 660 Q-10 568 12 478 Q30 396 8 308 Q-10 228 16 142 Q34 78 12 18" stroke="url(#wstL)" strokeWidth="7" fill="none" filter="url(#wss)" strokeLinecap="round"/>
            <path className="wvL" d="M16 844 Q32 760 22 670 Q12 582 32 494 Q50 416 30 330 Q12 252 36 168 Q52 106 32 44" stroke="url(#wstL)" strokeWidth="3.5" fill="none" opacity="0.55" strokeLinecap="round"/>

            {/* LEFT LEAVES — painted style, 6 leaves */}
            <g className="wl1" filter="url(#wls)"><g transform="translate(8,820) rotate(-32)"><path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#wlf1)"/><path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#wmr)"/><path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#wed)"/><path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#whl)"/></g></g>
            <g className="wl2" filter="url(#wls)"><g transform="translate(-4,774) rotate(-26)"><path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#wlf2)"/><path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#wmr)"/><path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#wed)"/><path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#whl)"/></g></g>
            <g className="wl3" filter="url(#wls)"><g transform="translate(14,718) rotate(-34)"><path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#wlf3)"/><path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#wmr)"/><path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#wed)"/><path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#whl)"/></g></g>
            <g className="wl4" filter="url(#wls)"><g transform="translate(4,148) rotate(-44)"><path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#wlf1)"/><path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#wmr)"/><path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#wed)"/><path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#whl)"/></g></g>
            <g className="wl5" filter="url(#wls)"><g transform="translate(18,96) rotate(-48)"><path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#wlf2)"/><path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#wmr)"/><path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#wed)"/><path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#whl)"/></g></g>
            <g className="wl6" filter="url(#wls)"><g transform="translate(-2,48) rotate(-46)"><path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#wlf3)"/><path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#wmr)"/><path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#wed)"/><path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#whl)"/></g></g>

            {/* RIGHT STEM */}
            <path className="wvR" d="M398 844 Q380 755 390 660 Q400 568 378 478 Q360 396 382 308 Q400 228 374 142 Q356 78 378 18" stroke="url(#wstR)" strokeWidth="7" fill="none" filter="url(#wss)" strokeLinecap="round"/>
            <path className="wvR" d="M374 844 Q358 760 368 670 Q378 582 358 494 Q340 416 360 330 Q378 252 354 168 Q338 106 358 44" stroke="url(#wstR)" strokeWidth="3.5" fill="none" opacity="0.55" strokeLinecap="round"/>

            {/* RIGHT LEAVES */}
            <g className="wl7" filter="url(#wls)"><g transform="translate(382,820) rotate(32)"><path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#wlf2)"/><path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#wmr)"/><path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#wed)"/><path d="M0-52 C-8-46-36-38-38-18 C-38 4-20 22 0 28 C20 22 38 4 38-18 C38-38 8-46 0-52Z" fill="url(#whl)"/></g></g>
            <g className="wl8" filter="url(#wls)"><g transform="translate(394,774) rotate(26)"><path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#wlf3)"/><path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#wmr)"/><path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#wed)"/><path d="M0-48 C-7-42-34-35-35-16 C-35 4-18 20 0 26 C18 20 35 4 35-16 C35-35 7-42 0-48Z" fill="url(#whl)"/></g></g>
            <g className="wl9" filter="url(#wls)"><g transform="translate(376,718) rotate(34)"><path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#wlf1)"/><path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#wmr)"/><path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#wed)"/><path d="M0-55 C-9-48-40-40-41-18 C-41 6-22 26 0 32 C22 26 41 6 41-18 C41-40 9-48 0-55Z" fill="url(#whl)"/></g></g>
            <g className="wl10" filter="url(#wls)"><g transform="translate(386,148) rotate(44)"><path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#wlf2)"/><path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#wmr)"/><path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#wed)"/><path d="M0-68 C-12-60-50-50-52-22 C-52 8-28 32 0 40 C28 32 52 8 52-22 C52-50 12-60 0-68Z" fill="url(#whl)"/></g></g>
            <g className="wl11" filter="url(#wls)"><g transform="translate(372,96) rotate(48)"><path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#wlf3)"/><path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#wmr)"/><path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#wed)"/><path d="M0-74 C-13-65-55-54-57-24 C-57 9-30 36 0 44 C30 36 57 9 57-24 C57-54 13-65 0-74Z" fill="url(#whl)"/></g></g>
            <g className="wl12" filter="url(#wls)"><g transform="translate(392,48) rotate(46)"><path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#wlf1)"/><path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#wmr)"/><path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#wed)"/><path d="M0-72 C-12-63-53-52-55-23 C-55 8-29 34 0 42 C29 34 55 8 55-23 C55-52 12-63 0-72Z" fill="url(#whl)"/></g></g>

            {/* TOP CANOPY */}
            <path className="wvT" d="M-10 -4 Q58 20 132 9 Q198 0 265 16 Q325 30 398 12" stroke="url(#wstL)" strokeWidth="4.5" fill="none" filter="url(#wss)" strokeLinecap="round"/>

            {/* Floating garden sparkles */}
            <g className="wglint"><circle cx="195" cy="200" r="3" fill="rgba(180,220,140,0.5)"/></g>
            <g style={{animation:"wglint 3.2s ease-in-out 0.8s infinite"}}><circle cx="80" cy="320" r="2" fill="rgba(180,220,140,0.4)"/></g>
            <g style={{animation:"wglint 2.8s ease-in-out 1.4s infinite"}}><circle cx="310" cy="280" r="2.5" fill="rgba(180,220,140,0.45)"/></g>
            <rect width="390" height="844" fill="url(#wvig)"/>
          </svg>

          {/* Card floats up on load */}
          <div className="wcard" style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",height:"100%",padding:"24px"}}>
            <div style={{background:"rgba(252,249,242,0.94)",borderRadius:36,padding:"44px 28px 36px",width:"100%",maxWidth:340,textAlign:"center",boxShadow:"0 12px 56px rgba(40,50,20,0.16)",border:"1.5px solid rgba(255,255,255,0.92)"}}>
              {/* Animated leaf orb */}
              <div className="worb" style={{display:"flex",justifyContent:"center",marginBottom:18}}>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                  <defs>
                    <radialGradient id="worb1" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#D0F090"/><stop offset="50%" stopColor="#88C040"/><stop offset="100%" stopColor="#4A8018"/></radialGradient>
                    <filter id="worbf"><feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#3A7018" floodOpacity="0.35"/></filter>
                  </defs>
                  <g filter="url(#worbf)">
                    <path d="M36 8C36 8 12 22 12 42a24 24 0 0048 0C60 22 36 8 36 8z" fill="url(#worb1)"/>
                    <path d="M36 8C36 8 12 22 12 42" stroke="rgba(40,80,10,0.25)" strokeWidth="1.2" fill="none"/>
                    <ellipse cx="26" cy="28" rx="8" ry="5" fill="rgba(255,255,255,0.22)" transform="rotate(-20 26 28)"/>
                  </g>
                </svg>
              </div>

              <div style={{fontFamily:"Georgia,serif",fontSize:32,fontWeight:700,color:"#1A1A10",marginBottom:6,letterSpacing:-0.5,lineHeight:1.15}}>Welcome to<br/>Thinko</div>
              <div style={{fontSize:14,color:"#6A6050",lineHeight:1.75,marginBottom:28,fontWeight:400}}>Your calm garden for<br/>thinking clearly and living fully 🌿</div>

              <div style={{fontSize:13,fontWeight:600,color:"#4A7038",marginBottom:10,letterSpacing:0.2}}>What shall we call you?</div>
              <input
                value={nameInput}
                onChange={e=>setNameInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&saveName()}
                placeholder="Your first name..."
                style={{width:"100%",boxSizing:"border-box",padding:"14px 20px",borderRadius:100,border:"1.5px solid rgba(140,170,120,0.4)",background:"rgba(242,238,228,0.85)",fontFamily:"inherit",fontSize:16,color:"#1A1A10",outline:"none",textAlign:"center",marginBottom:14,transition:"border-color 0.2s"}}
              />
              <button onClick={saveName} style={{width:"100%",padding:"16px",borderRadius:100,background:"linear-gradient(135deg,#3E6828,#5E9040)",color:"white",fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,border:"none",cursor:"pointer",boxShadow:"0 6px 22px rgba(58,100,30,0.38)",letterSpacing:0.2}}>
                Begin my journey 🌿
              </button>
              <div style={{marginTop:14,fontSize:11,color:"rgba(100,90,70,0.5)"}}>You can change your name anytime in settings</div>
            </div>
          </div>
        </div>
      )}

      {/* ── HOME HEADER ── */}
      <div style={{
        background:"rgba(248,245,236,0.92)",
        backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",
        padding:"14px 20px 12px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        borderBottom:"1px solid rgba(90,80,60,0.08)",
        position:"sticky",top:0,zIndex:50,
      }}>
        <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:"#1A1A10",letterSpacing:-0.3}}>
          Thinko 🌿
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>setShowAIKeyModal(true)} title="AI Settings" style={{background:getAIKey()?"rgba(90,160,80,0.14)":"rgba(200,100,50,0.10)",border:`1px solid ${getAIKey()?"rgba(90,160,80,0.3)":"rgba(200,100,50,0.25)"}`,borderRadius:100,padding:"6px 10px",fontSize:12,fontWeight:700,color:getAIKey()?"#2A6020":"#7A4020",cursor:"pointer"}}>
            🤖 {getAIKey()?"AI ✓":"AI Key"}
          </button>
          <button onClick={async()=>{const ok=await showInstallPrompt();if(!ok)alert("To install:\n\niPhone/iPad: tap Share → Add to Home Screen\n\nAndroid/Chrome: tap ⋮ menu → Add to Home Screen\n\nThis saves Thinko as an app on your device — works offline!");}} style={{background:"rgba(90,120,72,0.12)",border:"1px solid rgba(90,120,72,0.25)",borderRadius:100,padding:"6px 10px",fontSize:12,fontWeight:700,color:"#3A6020",cursor:"pointer"}} title="Install as app">
            📲 App
          </button>
          <AuthButton user={user} onSignIn={()=>setShowLoginModal(true)} onSignOut={signOut}/>
        </div>
      </div>
      {showLoginModal&&<ProLoginModal onClose={()=>setShowLoginModal(false)} onSignIn={()=>{setShowLoginModal(false);signIn();}}/>}

      {/* ── GREETING ── */}
      <div style={{padding:"22px 22px 8px"}}>
        {(()=>{const {word,emoji}=getGreeting();return(<div style={{fontFamily:"Georgia,serif",fontSize:32,fontWeight:700,color:"#1A1A10",letterSpacing:-0.5,lineHeight:1.2}}>{word}{userName?`, ${userName}`:""} {emoji}</div>);})()}
        <div style={{fontSize:12,color:"#8A8070",marginTop:4}}>Your calm space is ready</div>
        {TESTING_MODE&&<div style={{marginTop:8,display:"inline-flex",alignItems:"center",gap:6,background:"rgba(74,112,56,0.12)",border:"1px solid rgba(74,112,56,0.25)",borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:700,color:"#4A7038"}}>🔓 Tester Mode</div>}
      </div>
      <div style={{padding:"4px 12px 2px",textAlign:"center"}}>
        <span style={{fontSize:11,color:"rgba(60,56,40,0.45)",letterSpacing:0.5}}>⠿ Hold and drag cards to reorder</span>
      </div>
      <div style={{padding:"8px 14px 100px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {orderedModules.map(m=>(
          <div key={m.id}
            draggable
            onDragStart={e=>homeDragStart(e,m.id)}
            onDragOver={e=>homeDragOver(e,m.id)}
            onDragEnd={homeDragEnd}
            onClick={()=>setScreen(m.id)}
            style={{
              background:dragHome===m.id?"rgba(255,255,255,0.92)":"rgba(248,245,236,0.88)",
              backdropFilter:"blur(14px)",
              WebkitBackdropFilter:"blur(14px)",
              borderRadius:22,
              padding:"18px 16px 16px 18px",
              border:"1px solid rgba(255,255,255,0.92)",
              cursor:"pointer",
              transition:"all 0.15s",
              boxShadow:dragHome===m.id
                ?"0 8px 28px rgba(60,70,40,0.14),inset 0 1px 0 rgba(255,255,255,1)"
                :"0 2px 12px rgba(60,70,40,0.07),inset 0 1px 0 rgba(255,255,255,0.95)",
              transform:dragHome===m.id?"scale(1.03)":"scale(1)",
              display:"flex",flexDirection:"column",
              justifyContent:"space-between",
              position:"relative",
              minHeight:128,
            }}>
            {/* Top: emoji icon + drag dots */}
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
              <span style={{fontSize:38,lineHeight:1,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.12))"}}>
                {m.icon}
              </span>
              <div style={{opacity:0.35,marginTop:2}}>
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <circle cx="4" cy="4" r="1.5" fill="#3A3020"/>
                  <circle cx="10" cy="4" r="1.5" fill="#3A3020"/>
                  <circle cx="4" cy="10" r="1.5" fill="#3A3020"/>
                  <circle cx="10" cy="10" r="1.5" fill="#3A3020"/>
                </svg>
              </div>
            </div>
            {/* Bottom: name */}
            <div style={{fontSize:15,fontWeight:700,color:"#1A1A10",letterSpacing:-0.2,lineHeight:1.2,marginTop:10}}>
              {m.name}
            </div>
          </div>
        ))}
      </div>
      <NavBar current="home" setScreen={setScreen}/>
    </div>
    </>
  );
}
function NavBar({current,setScreen}) {
  return (
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(238,232,218,0.96)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(255,255,255,0.6)",zIndex:100,boxShadow:"0 -2px 16px rgba(60,70,40,0.1)"}}>
      <div style={{display:"flex",overflowX:"auto",padding:"8px 4px 12px",gap:0,scrollbarWidth:"none",msOverflowStyle:"none"}}>
        <style>{`.navscroll::-webkit-scrollbar{display:none}`}</style>
        <div className="navscroll" style={{display:"flex",minWidth:"100%",justifyContent:"space-around"}}>
          {MODULES.map(m=>(
            <button key={m.id} onClick={()=>setScreen(m.id)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"4px 8px",opacity:current===m.id?1:0.45,transition:"opacity 0.15s",flexShrink:0}}>
              <span style={{fontSize:20,lineHeight:1}}>{m.icon}</span>
              <span style={{fontSize:8,color:current===m.id?C.mp:"rgba(60,56,40,0.5)",fontWeight:current===m.id?800:500,letterSpacing:0.3,whiteSpace:"nowrap"}}>{m.name}</span>
            </button>
          ))}
          <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"4px 10px",opacity:current==="home"?1:0.5,transition:"opacity 0.15s",flexShrink:0}}>
            <span style={{fontSize:20}}>🏠</span>
            <span style={{fontSize:8,color:current==="home"?C.mp:"rgba(60,56,40,0.5)",fontWeight:600,letterSpacing:0.3}}>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
