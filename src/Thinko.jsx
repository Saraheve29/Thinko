<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Thinko Home</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html,body{height:100%;width:100%;font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;}
body{background:#EDE8D8;overflow-x:hidden;}

/* ── FIXED VINE BACKGROUND ── */
.bg{position:fixed;inset:0;z-index:0;}
.bg-cream{position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 40%,#FAF7EE 0%,#F3EDE0 50%,#E8DFC8 100%);}

/* ── CONTENT ── */
.page{position:relative;z-index:10;min-height:100vh;display:flex;flex-direction:column;padding:0;}

/* ── GLASS CARD AREA ── */
.glass-panel{
  margin:12px 14px;
  background:rgba(250,247,240,0.55);
  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
  border-radius:32px;
  border:1px solid rgba(255,255,255,0.7);
  padding:22px 18px 18px;
  flex:1;
  box-shadow:0 4px 32px rgba(80,70,40,0.08),inset 0 1px 0 rgba(255,255,255,0.8);
}

/* ── GREETING ── */
.greeting{margin-bottom:22px;padding:0 4px;}
.greeting-back{font-size:20px;color:#3A3020;opacity:0.6;margin-bottom:14px;cursor:pointer;display:flex;align-items:center;gap:4px;}
.greeting-text{font-size:28px;font-weight:800;color:#1A1A10;letter-spacing:-0.5px;line-height:1.2;}

/* ── GRID ── */
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}

/* ── MODULE CARD ── */
.mcard{
  background:rgba(248,244,236,0.82);
  border-radius:22px;
  padding:18px 16px 16px;
  border:1px solid rgba(255,255,255,0.85);
  box-shadow:0 2px 12px rgba(80,70,40,0.07),inset 0 1px 0 rgba(255,255,255,0.9);
  cursor:pointer;
  transition:all 0.16s ease;
  display:flex;flex-direction:column;gap:8px;
  min-height:120px;
  position:relative;
  overflow:hidden;
}
.mcard::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent);}
.mcard:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 6px 22px rgba(80,70,40,0.13);}
.mcard:active{transform:scale(0.98);}
.mcard-icon{font-size:34px;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.1));}
.mcard-name{font-size:15px;font-weight:700;color:#1A1A10;letter-spacing:-0.2px;margin-top:2px;}

/* ── NAV ── */
.nav{
  position:fixed;bottom:0;left:0;right:0;
  background:rgba(242,237,226,0.94);
  backdrop-filter:blur(20px);
  -webkit-backdrop-filter:blur(20px);
  border-top:1px solid rgba(255,255,255,0.7);
  padding:12px 0 24px;
  display:flex;justify-content:space-around;align-items:flex-start;
  z-index:100;
  box-shadow:0 -2px 20px rgba(80,70,40,0.08);
}
.ni{display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;opacity:0.5;min-width:64px;transition:opacity 0.2s;}
.ni.on{opacity:1;}
.ni-ico{font-size:22px;}
.ni-lbl{font-size:11px;font-weight:600;color:#1A1A10;}
.ni.on .ni-lbl{color:#3A6830;}

/* sparkle animation */
@keyframes sparkle{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.7;transform:scale(1.2);}}
.sparkle{display:inline-block;animation:sparkle 2s ease-in-out infinite;}

/* card pop-in */
@keyframes popIn{from{opacity:0;transform:translateY(10px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);}}
.mcard{animation:popIn 0.4s ease both;}
.mcard:nth-child(1){animation-delay:0.05s;}
.mcard:nth-child(2){animation-delay:0.10s;}
.mcard:nth-child(3){animation-delay:0.15s;}
.mcard:nth-child(4){animation-delay:0.20s;}
.mcard:nth-child(5){animation-delay:0.25s;}
.mcard:nth-child(6){animation-delay:0.30s;}
.mcard:nth-child(7){animation-delay:0.35s;}
.mcard:nth-child(8){animation-delay:0.40s;}
.mcard:nth-child(9){animation-delay:0.45s;}
.mcard:nth-child(10){animation-delay:0.50s;}
</style>
</head>
<body>

<!-- ══ PHOTOREALISTIC VINE BACKGROUND ══ -->
<div class="bg">
  <div class="bg-cream"></div>
  <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Leaf gradients — 3-tone for photorealism -->
      <linearGradient id="L1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#A8D878"/><stop offset="45%" stop-color="#78B848"/><stop offset="100%" stop-color="#4A8828"/></linearGradient>
      <linearGradient id="L2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#C0E890"/><stop offset="50%" stop-color="#90C860"/><stop offset="100%" stop-color="#60A030"/></linearGradient>
      <linearGradient id="L3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#88C858"/><stop offset="50%" stop-color="#58A828"/><stop offset="100%" stop-color="#388010"/></linearGradient>
      <linearGradient id="L4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#B8E088"/><stop offset="50%" stop-color="#88C058"/><stop offset="100%" stop-color="#589030"/></linearGradient>
      <linearGradient id="Ls" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#68A838"/><stop offset="100%" stop-color="#285808"/></linearGradient>
      <!-- Stem gradient -->
      <linearGradient id="St" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#7A6840"/><stop offset="50%" stop-color="#6A5830"/><stop offset="100%" stop-color="#8A7850"/></linearGradient>
      <!-- Leaf shadow filter -->
      <filter id="lsh" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(30,50,10,0.25)"/>
      </filter>
      <filter id="ssh" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="rgba(30,50,10,0.2)"/>
      </filter>
      <!-- Golden glow -->
      <radialGradient id="glow" cx="85%" cy="8%" r="35%"><stop offset="0%" stop-color="rgba(220,200,130,0.4)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
      <radialGradient id="glow2" cx="15%" cy="55%" r="30%"><stop offset="0%" stop-color="rgba(160,200,130,0.15)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
      <radialGradient id="vign" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="transparent"/><stop offset="100%" stop-color="rgba(40,50,20,0.15)"/></radialGradient>
    </defs>

    <!-- Background glow -->
    <rect width="390" height="844" fill="url(#glow)"/>
    <rect width="390" height="844" fill="url(#glow2)"/>

    <!-- ══ TOP LEFT VINE CLUSTER ══ -->
    <!-- Main thick stem top-left coming from corner -->
    <path d="M-15 -10 Q15 25 5 70 Q-5 115 18 165 Q35 210 15 260" stroke="url(#St)" stroke-width="5" fill="none" filter="url(#ssh)" stroke-linecap="round"/>
    <path d="M10 -10 Q35 20 28 62 Q20 105 42 148 Q58 185 45 230" stroke="url(#St)" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round"/>

    <!-- Top-left ivy leaves — large, detailed -->
    <!-- Leaf 1 — big fan leaf top-left corner -->
    <g filter="url(#lsh)">
      <path d="M-5 15 Q20 -5 45 5 Q58 15 52 32 Q45 48 28 44 Q8 38 -5 15Z" fill="url(#L1)"/>
      <path d="M-5 15 L28 44" stroke="#2A5010" stroke-width="0.9" opacity="0.7"/>
      <path d="M28 44 L22 50" stroke="#2A5010" stroke-width="0.6" opacity="0.5"/>
      <path d="M28 44 L36 48" stroke="#2A5010" stroke-width="0.6" opacity="0.5"/>
      <path d="M-5 15 L28 44 L52 32" stroke="#3A6820" stroke-width="0.5" opacity="0.4" fill="none"/>
    </g>
    <!-- Leaf 2 -->
    <g filter="url(#lsh)">
      <path d="M8 -8 Q38 -18 60 -5 Q72 8 65 24 Q56 38 40 33 Q18 25 8 -8Z" fill="url(#L2)"/>
      <path d="M8 -8 L40 33" stroke="#2A5010" stroke-width="0.9" opacity="0.65"/>
      <path d="M40 33 L35 40" stroke="#2A5010" stroke-width="0.6" opacity="0.45"/>
      <path d="M40 33 L48 38" stroke="#2A5010" stroke-width="0.6" opacity="0.45"/>
    </g>
    <!-- Leaf 3 — overlapping -->
    <g filter="url(#lsh)" opacity="0.9">
      <path d="M-10 42 Q12 22 38 28 Q52 35 48 52 Q42 66 25 64 Q5 58 -10 42Z" fill="url(#L3)"/>
      <path d="M-10 42 L25 64" stroke="#2A5010" stroke-width="0.8" opacity="0.6"/>
      <path d="M25 64 L20 72" stroke="#2A5010" stroke-width="0.5" opacity="0.4"/>
      <path d="M25 64 L34 70" stroke="#2A5010" stroke-width="0.5" opacity="0.4"/>
    </g>
    <!-- Leaf 4 hanging down -->
    <g filter="url(#lsh)">
      <path d="M5 62 Q28 48 52 55 Q65 64 60 80 Q54 94 36 92 Q14 88 5 62Z" fill="url(#L4)"/>
      <path d="M5 62 L36 92" stroke="#2A5010" stroke-width="0.8" opacity="0.6"/>
      <path d="M36 92 L30 100" stroke="#2A5010" stroke-width="0.55" opacity="0.4"/>
      <path d="M36 92 L44 98" stroke="#2A5010" stroke-width="0.55" opacity="0.4"/>
    </g>
    <!-- Leaf 5 -->
    <g filter="url(#lsh)" opacity="0.85">
      <path d="M-8 85 Q14 68 40 76 Q54 85 50 102 Q44 116 28 114 Q8 108 -8 85Z" fill="url(#L1)"/>
      <path d="M-8 85 L28 114" stroke="#2A5010" stroke-width="0.8" opacity="0.58"/>
    </g>
    <!-- Leaf 6 branch right -->
    <g filter="url(#lsh)">
      <path d="M28 38 Q55 20 80 30 Q92 42 85 58 Q76 70 60 66 Q40 60 28 38Z" fill="url(#L2)"/>
      <path d="M28 38 L60 66" stroke="#2A5010" stroke-width="0.8" opacity="0.6"/>
    </g>
    <!-- Leaf 7 top arch -->
    <g filter="url(#lsh)" opacity="0.88">
      <path d="M55 -5 Q82 -20 105 -8 Q118 5 110 20 Q100 32 84 28 Q64 22 55 -5Z" fill="url(#L3)"/>
      <path d="M55 -5 L84 28" stroke="#2A5010" stroke-width="0.8" opacity="0.55"/>
    </g>
    <!-- Leaf 8 -->
    <g filter="url(#lsh)" opacity="0.82">
      <path d="M-5 108 Q18 92 42 100 Q56 110 52 126 Q46 140 30 138 Q10 132 -5 108Z" fill="url(#L4)"/>
      <path d="M-5 108 L30 138" stroke="#2A5010" stroke-width="0.75" opacity="0.55"/>
    </g>
    <!-- Leaf 9 -->
    <g filter="url(#lsh)" opacity="0.78">
      <path d="M15 130 Q40 115 64 124 Q77 134 72 150 Q66 163 50 160 Q30 155 15 130Z" fill="url(#L1)"/>
      <path d="M15 130 L50 160" stroke="#2A5010" stroke-width="0.75" opacity="0.52"/>
    </g>
    <!-- Leaf 10 side shoot -->
    <g filter="url(#lsh)" opacity="0.75">
      <path d="M22 155 Q45 140 68 150 Q80 160 75 175 Q68 188 52 185 Q34 180 22 155Z" fill="url(#L2)"/>
      <path d="M22 155 L52 185" stroke="#2A5010" stroke-width="0.7" opacity="0.5"/>
    </g>
    <!-- Extra small accent leaves top-left -->
    <g filter="url(#lsh)" opacity="0.7">
      <path d="M70 15 Q90 2 108 12 Q118 22 112 36 Q104 46 90 42 Q74 36 70 15Z" fill="url(#Ls)"/>
      <path d="M70 15 L90 42" stroke="#1A4808" stroke-width="0.7" opacity="0.5"/>
    </g>
    <g filter="url(#lsh)" opacity="0.65">
      <path d="M95 -2 Q115 -14 132 -4 Q142 8 136 22 Q128 32 114 28 Q98 22 95 -2Z" fill="url(#L4)"/>
      <path d="M95 -2 L114 28" stroke="#2A5010" stroke-width="0.65" opacity="0.48"/>
    </g>
    <!-- Side stem left going down -->
    <path d="M12 165 Q-5 210 8 258 Q20 302 5 348 Q-8 390 10 435" stroke="url(#St)" stroke-width="3.5" fill="none" filter="url(#ssh)" stroke-linecap="round" opacity="0.8"/>
    <path d="M-2 210 Q22 195 45 205 Q58 215 52 232 Q44 246 28 242 Q8 236 -2 210Z" fill="url(#L3)" filter="url(#lsh)" opacity="0.72"/>
    <path d="M-2 210 L28 242" stroke="#2A5010" stroke-width="0.7" opacity="0.48"/>
    <path d="M8 248 Q32 234 55 244 Q68 254 62 270 Q55 284 38 280 Q18 275 8 248Z" fill="url(#L1)" filter="url(#lsh)" opacity="0.68"/>
    <path d="M8 248 L38 280" stroke="#2A5010" stroke-width="0.7" opacity="0.46"/>
    <path d="M-5 292 Q18 278 40 288 Q52 298 47 314 Q40 326 24 323 Q5 318 -5 292Z" fill="url(#L4)" filter="url(#lsh)" opacity="0.64"/>
    <path d="M-5 292 L24 323" stroke="#2A5010" stroke-width="0.65" opacity="0.44"/>
    <path d="M5 335 Q28 322 50 332 Q62 342 56 358 Q49 370 33 367 Q14 362 5 335Z" fill="url(#L2)" filter="url(#lsh)" opacity="0.6"/>
    <path d="M5 335 L33 367" stroke="#2A5010" stroke-width="0.65" opacity="0.42"/>
    <path d="M-2 378 Q20 365 42 375 Q54 385 48 400 Q41 412 26 409 Q8 404 -2 378Z" fill="url(#L3)" filter="url(#lsh)" opacity="0.56"/>
    <path d="M-2 378 L26 409" stroke="#2A5010" stroke-width="0.6" opacity="0.4"/>

    <!-- ══ TOP RIGHT VINE CLUSTER ══ -->
    <path d="M405 -10 Q375 25 385 70 Q395 115 372 165 Q355 210 375 260" stroke="url(#St)" stroke-width="5" fill="none" filter="url(#ssh)" stroke-linecap="round"/>
    <path d="M380 -10 Q355 20 362 62 Q370 105 348 148 Q332 185 345 230" stroke="url(#St)" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round"/>

    <!-- Top-right leaves mirror -->
    <g filter="url(#lsh)">
      <path d="M395 15 Q370 -5 345 5 Q332 15 338 32 Q345 48 362 44 Q382 38 395 15Z" fill="url(#L1)"/>
      <path d="M395 15 L362 44" stroke="#2A5010" stroke-width="0.9" opacity="0.7"/>
      <path d="M362 44 L368 50" stroke="#2A5010" stroke-width="0.6" opacity="0.5"/>
      <path d="M362 44 L354 48" stroke="#2A5010" stroke-width="0.6" opacity="0.5"/>
    </g>
    <g filter="url(#lsh)">
      <path d="M382 -8 Q352 -18 330 -5 Q318 8 325 24 Q334 38 350 33 Q372 25 382 -8Z" fill="url(#L2)"/>
      <path d="M382 -8 L350 33" stroke="#2A5010" stroke-width="0.9" opacity="0.65"/>
    </g>
    <g filter="url(#lsh)" opacity="0.9">
      <path d="M400 42 Q378 22 352 28 Q338 35 342 52 Q348 66 365 64 Q385 58 400 42Z" fill="url(#L3)"/>
      <path d="M400 42 L365 64" stroke="#2A5010" stroke-width="0.8" opacity="0.6"/>
    </g>
    <g filter="url(#lsh)">
      <path d="M385 62 Q362 48 338 55 Q325 64 330 80 Q336 94 354 92 Q376 88 385 62Z" fill="url(#L4)"/>
      <path d="M385 62 L354 92" stroke="#2A5010" stroke-width="0.8" opacity="0.6"/>
    </g>
    <g filter="url(#lsh)" opacity="0.85">
      <path d="M398 85 Q376 68 350 76 Q336 85 340 102 Q346 116 362 114 Q382 108 398 85Z" fill="url(#L1)"/>
      <path d="M398 85 L362 114" stroke="#2A5010" stroke-width="0.8" opacity="0.58"/>
    </g>
    <g filter="url(#lsh)">
      <path d="M362 38 Q335 20 310 30 Q298 42 305 58 Q314 70 330 66 Q350 60 362 38Z" fill="url(#L2)"/>
      <path d="M362 38 L330 66" stroke="#2A5010" stroke-width="0.8" opacity="0.6"/>
    </g>
    <g filter="url(#lsh)" opacity="0.88">
      <path d="M335 -5 Q308 -20 285 -8 Q272 5 280 20 Q290 32 306 28 Q326 22 335 -5Z" fill="url(#L3)"/>
      <path d="M335 -5 L306 28" stroke="#2A5010" stroke-width="0.8" opacity="0.55"/>
    </g>
    <g filter="url(#lsh)" opacity="0.82">
      <path d="M395 108 Q372 92 348 100 Q334 110 338 126 Q344 140 360 138 Q380 132 395 108Z" fill="url(#L4)"/>
      <path d="M395 108 L360 138" stroke="#2A5010" stroke-width="0.75" opacity="0.55"/>
    </g>
    <g filter="url(#lsh)" opacity="0.78">
      <path d="M375 130 Q350 115 326 124 Q313 134 318 150 Q324 163 340 160 Q360 155 375 130Z" fill="url(#L1)"/>
      <path d="M375 130 L340 160" stroke="#2A5010" stroke-width="0.75" opacity="0.52"/>
    </g>
    <g filter="url(#lsh)" opacity="0.75">
      <path d="M368 155 Q345 140 322 150 Q310 160 315 175 Q322 188 338 185 Q356 180 368 155Z" fill="url(#L2)"/>
      <path d="M368 155 L338 185" stroke="#2A5010" stroke-width="0.7" opacity="0.5"/>
    </g>
    <g filter="url(#lsh)" opacity="0.7">
      <path d="M320 15 Q300 2 282 12 Q272 22 278 36 Q286 46 300 42 Q316 36 320 15Z" fill="url(#Ls)"/>
      <path d="M320 15 L300 42" stroke="#1A4808" stroke-width="0.7" opacity="0.5"/>
    </g>
    <g filter="url(#lsh)" opacity="0.65">
      <path d="M295 -2 Q275 -14 258 -4 Q248 8 254 22 Q262 32 276 28 Q292 22 295 -2Z" fill="url(#L4)"/>
    </g>
    <!-- Right side stem going down -->
    <path d="M378 165 Q395 210 382 258 Q370 302 385 348 Q398 390 380 435" stroke="url(#St)" stroke-width="3.5" fill="none" filter="url(#ssh)" stroke-linecap="round" opacity="0.8"/>
    <path d="M392 210 Q368 195 345 205 Q332 215 338 232 Q346 246 362 242 Q382 236 392 210Z" fill="url(#L3)" filter="url(#lsh)" opacity="0.72"/>
    <path d="M382 248 Q358 234 335 244 Q322 254 328 270 Q335 284 352 280 Q372 275 382 248Z" fill="url(#L1)" filter="url(#lsh)" opacity="0.68"/>
    <path d="M395 292 Q372 278 350 288 Q338 298 343 314 Q350 326 366 323 Q385 318 395 292Z" fill="url(#L4)" filter="url(#lsh)" opacity="0.64"/>
    <path d="M385 335 Q362 322 340 332 Q328 342 334 358 Q341 370 357 367 Q376 362 385 335Z" fill="url(#L2)" filter="url(#lsh)" opacity="0.6"/>
    <path d="M392 378 Q370 365 348 375 Q336 385 342 400 Q349 412 364 409 Q382 404 392 378Z" fill="url(#L3)" filter="url(#lsh)" opacity="0.56"/>

    <!-- ══ TOP CENTRE arch stems ══ -->
    <path d="M-10 -5 Q80 -25 195 -18 Q305 -12 402 -5" stroke="url(#St)" stroke-width="3" fill="none" filter="url(#ssh)" stroke-linecap="round" opacity="0.55"/>
    <!-- Centre top leaves -->
    <g filter="url(#lsh)" opacity="0.62">
      <path d="M148 -15 Q168 -28 188 -18 Q198 -8 192 6 Q184 16 170 12 Q154 6 148 -15Z" fill="url(#L2)"/>
      <path d="M148 -15 L170 12" stroke="#2A5010" stroke-width="0.7" opacity="0.48"/>
    </g>
    <g filter="url(#lsh)" opacity="0.58">
      <path d="M202 -14 Q222 -26 240 -16 Q250 -5 244 8 Q236 18 222 14 Q206 8 202 -14Z" fill="url(#L4)"/>
      <path d="M202 -14 L222 14" stroke="#2A5010" stroke-width="0.65" opacity="0.44"/>
    </g>
    <g filter="url(#lsh)" opacity="0.54">
      <path d="M110 -8 Q130 -20 148 -10 Q158 1 152 14 Q145 24 132 20 Q116 14 110 -8Z" fill="url(#L1)"/>
    </g>
    <g filter="url(#lsh)" opacity="0.54">
      <path d="M242 -10 Q262 -22 280 -12 Q290 -1 284 12 Q276 22 263 18 Q247 12 242 -10Z" fill="url(#L3)"/>
    </g>

    <!-- ══ BOTTOM FOLIAGE ══ -->
    <path d="M-10 840 Q20 818 50 828 Q80 838 110 820 Q140 805 170 820 Q195 832 220 818 Q245 804 275 820 Q305 836 335 820 Q362 806 390 830 L405 844 L-15 844Z" fill="url(#L2)" opacity="0.38"/>
    <path d="M-10 844 Q25 828 55 836 Q82 842 108 828 Q132 816 158 828 Q182 840 208 826 Q232 813 258 828 Q282 842 310 828 Q336 815 362 828 Q385 840 405 832 L405 844 L-15 844Z" fill="url(#L1)" opacity="0.32"/>
    <!-- Bottom left cluster -->
    <g filter="url(#lsh)" opacity="0.6">
      <path d="M-12 780 Q8 762 30 772 Q42 782 36 798 Q28 810 12 807 Q-8 802 -12 780Z" fill="url(#L3)"/>
      <path d="M-12 780 L12 807" stroke="#2A5010" stroke-width="0.7" opacity="0.45"/>
    </g>
    <g filter="url(#lsh)" opacity="0.55">
      <path d="M18 798 Q40 782 62 792 Q74 802 68 818 Q60 830 44 827 Q24 822 18 798Z" fill="url(#L1)"/>
    </g>
    <!-- Bottom right cluster -->
    <g filter="url(#lsh)" opacity="0.6">
      <path d="M402 780 Q382 762 360 772 Q348 782 354 798 Q362 810 378 807 Q398 802 402 780Z" fill="url(#L4)"/>
      <path d="M402 780 L378 807" stroke="#2A5010" stroke-width="0.7" opacity="0.45"/>
    </g>
    <g filter="url(#lsh)" opacity="0.55">
      <path d="M372 798 Q350 782 328 792 Q316 802 322 818 Q330 830 346 827 Q366 822 372 798Z" fill="url(#L2)"/>
    </g>

    <!-- Vignette -->
    <rect width="390" height="844" fill="url(#vign)"/>
  </svg>
</div>

<!-- ══ PAGE ══ -->
<div class="page">
  <!-- Glass panel -->
  <div class="glass-panel" style="margin-top:60px;margin-bottom:90px;">

    <!-- Back / menu -->
    <div class="greeting-back">
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M7 1L1 7l6 6M1 7h16" stroke="#3A3020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style="margin-left:4px"><path d="M0 1h16M0 6h16M0 11h10" stroke="#3A3020" stroke-width="1.8" stroke-linecap="round"/></svg>
    </div>

    <!-- Greeting -->
    <div class="greeting">
      <div class="greeting-text" id="greetTxt">Good morning, Alex <span class="sparkle">✨</span></div>
    </div>

    <!-- Grid -->
    <div class="grid">
      <div class="mcard" onclick="location.hash='prioritizer'">
        <div class="mcard-icon">📋</div>
        <div class="mcard-name">Prioritizer</div>
      </div>
      <div class="mcard" onclick="location.hash='mindmap'">
        <div class="mcard-icon">🧠</div>
        <div class="mcard-name">Mind Map</div>
      </div>
      <div class="mcard" onclick="location.hash='vault'">
        <div class="mcard-icon">📚</div>
        <div class="mcard-name">The Vault</div>
      </div>
      <div class="mcard" onclick="location.hash='meals'">
        <div class="mcard-icon">🍽️</div>
        <div class="mcard-name">Meal Planner</div>
      </div>
      <div class="mcard" onclick="location.hash='goals'">
        <div class="mcard-icon">🎯</div>
        <div class="mcard-name">Goals</div>
      </div>
      <div class="mcard" onclick="location.hash='matrix'">
        <div class="mcard-icon">⚡</div>
        <div class="mcard-name">Matrix</div>
      </div>
      <div class="mcard" onclick="location.hash='charge'">
        <div class="mcard-icon">⚡</div>
        <div class="mcard-name">The Charge</div>
      </div>
      <div class="mcard" onclick="location.hash='budget'">
        <div class="mcard-icon">💰</div>
        <div class="mcard-name">Budget</div>
      </div>
      <div class="mcard" onclick="location.hash='shopping'">
        <div class="mcard-icon">🛒</div>
        <div class="mcard-name">Shopping</div>
      </div>
      <div class="mcard" onclick="location.hash='tools'">
        <div class="mcard-icon">🔧</div>
        <div class="mcard-name">Tools</div>
      </div>
    </div>
  </div>

  <!-- Bottom Nav -->
  <div class="nav">
    <div class="ni on">
      <svg class="ni-ico" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill="#3A6830" stroke="#3A6830" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 21V12h6v9" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>
      <div class="ni-lbl" style="color:#3A6830;">Home</div>
    </div>
    <div class="ni">
      <svg class="ni-ico" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#3A3020" stroke-width="1.8"/><path d="M20 20l-3-3" stroke="#3A3020" stroke-width="1.8" stroke-linecap="round"/></svg>
      <div class="ni-lbl">Search</div>
    </div>
    <div class="ni">
      <svg class="ni-ico" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3A3020" stroke-width="1.8"/><path d="M12 8v8M8 12h8" stroke="#3A3020" stroke-width="1.8" stroke-linecap="round"/></svg>
      <div class="ni-lbl">Add</div>
    </div>
    <div class="ni">
      <svg class="ni-ico" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 4 15 4 9a8 8 0 0116 0c0 6-8 12-8 12z" stroke="#3A3020" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="9" r="2.5" stroke="#3A3020" stroke-width="1.5"/></svg>
      <div class="ni-lbl">Veart</div>
    </div>
    <div class="ni">
      <svg class="ni-ico" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="#3A3020" stroke-width="1.8"/><path d="M5 20c0-4 3.1-7 7-7s7 3 7 7" stroke="#3A3020" stroke-width="1.8" stroke-linecap="round"/></svg>
      <div class="ni-lbl">Profile</div>
    </div>
  </div>
</div>

<script>
// Greeting
function updateGreeting(){
  const h=new Date().getHours();
  const name=localStorage.getItem('thinko_username')||'';
  let word,emoji;
  if(h>=5&&h<12){word='Good morning';emoji='✨';}
  else if(h>=12&&h<17){word='Good afternoon';emoji='☀️';}
  else if(h>=17&&h<21){word='Good evening';emoji='🌅';}
  else{word='Good night';emoji='🌙';}
  const el=document.getElementById('greetTxt');
  el.innerHTML=`${word}${name?', '+name:''} <span class="sparkle">${emoji}</span>`;
}
updateGreeting();
setInterval(updateGreeting,60000);
</script>
</body>
</html>
