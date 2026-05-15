<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Thinko Home</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html,body{height:100%;font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
body{background:#E8E2D0;}

.page{position:relative;z-index:10;min-height:100vh;display:flex;flex-direction:column;}

/* Glass panel */
.panel{
  margin:10px 12px 10px;
  background:rgba(248,244,234,0.52);
  backdrop-filter:blur(22px);
  -webkit-backdrop-filter:blur(22px);
  border-radius:36px;
  border:1.5px solid rgba(255,255,255,0.65);
  padding:20px 16px 16px;
  flex:1;
  box-shadow:0 6px 40px rgba(60,55,30,0.1),inset 0 1px 0 rgba(255,255,255,0.85);
  margin-bottom:88px;
}

/* Top bar */
.topbar{display:flex;align-items:center;gap:10px;margin-bottom:18px;opacity:0.6;}

/* Greeting */
.greet{font-size:26px;font-weight:800;color:#1A1A0E;letter-spacing:-0.5px;line-height:1.2;margin-bottom:20px;}

/* Grid */
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}

/* Cards */
.card{
  background:rgba(248,245,236,0.88);
  border-radius:22px;
  padding:18px 16px 15px;
  border:1px solid rgba(255,255,255,0.9);
  box-shadow:
    0 2px 14px rgba(60,55,30,0.07),
    0 1px 3px rgba(60,55,30,0.04),
    inset 0 1px 0 rgba(255,255,255,1);
  cursor:pointer;
  transition:all 0.15s ease;
  display:flex;flex-direction:column;gap:6px;
  min-height:115px;
  position:relative;
}
.card::before{
  content:'';position:absolute;
  top:0;left:12px;right:12px;height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent);
}
.card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(60,55,30,0.12);}
.card:active{transform:scale(0.98);}
.card-ico{font-size:36px;line-height:1;margin-bottom:2px;}
.card-name{font-size:15px;font-weight:700;color:#1A1A0E;letter-spacing:-0.2px;}

/* Nav */
.nav{
  position:fixed;bottom:0;left:0;right:0;z-index:100;
  background:rgba(240,235,222,0.94);
  backdrop-filter:blur(24px);
  -webkit-backdrop-filter:blur(24px);
  border-top:1px solid rgba(255,255,255,0.7);
  padding:12px 8px 28px;
  display:flex;justify-content:space-around;align-items:center;
  box-shadow:0 -4px 24px rgba(60,55,30,0.08);
}
.ni{display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;opacity:0.45;min-width:58px;transition:opacity 0.2s;}
.ni.on{opacity:1;}
.ni-lbl{font-size:11px;font-weight:600;color:#2A2A18;}
.ni.on .ni-lbl{color:#3A6820;}

/* pop animation */
@keyframes popIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
.greet{animation:popIn 0.5s ease 0.05s both;}
.card:nth-child(1){animation:popIn 0.4s ease 0.1s both;}
.card:nth-child(2){animation:popIn 0.4s ease 0.14s both;}
.card:nth-child(3){animation:popIn 0.4s ease 0.18s both;}
.card:nth-child(4){animation:popIn 0.4s ease 0.22s both;}
.card:nth-child(5){animation:popIn 0.4s ease 0.26s both;}
.card:nth-child(6){animation:popIn 0.4s ease 0.30s both;}
.card:nth-child(7){animation:popIn 0.4s ease 0.34s both;}
.card:nth-child(8){animation:popIn 0.4s ease 0.38s both;}
.card:nth-child(9){animation:popIn 0.4s ease 0.42s both;}
.card:nth-child(10){animation:popIn 0.4s ease 0.46s both;}

/* NAME MODAL */
.modal-bg{
  position:fixed;inset:0;z-index:500;
  display:flex;align-items:center;justify-content:center;
  padding:28px;
  background:rgba(224,218,202,0.82);
  backdrop-filter:blur(20px);
  -webkit-backdrop-filter:blur(20px);
}
.modal-card{
  background:rgba(252,249,242,0.97);
  border-radius:36px;
  padding:44px 28px 36px;
  width:100%;max-width:340px;
  text-align:center;
  box-shadow:0 16px 56px rgba(50,45,20,0.18);
  border:1.5px solid rgba(255,255,255,0.95);
  position:relative;
  z-index:1;
}
.modal-card input{
  width:100%;padding:15px 20px;
  border-radius:100px;
  border:1.5px solid rgba(148,180,120,0.4);
  background:rgba(240,236,224,0.85);
  font-family:'Inter',sans-serif;font-size:16px;color:#1A1A0E;
  outline:none;text-align:center;margin-bottom:14px;
  box-shadow:inset 0 2px 6px rgba(50,45,20,0.06);
}
.modal-card input:focus{border-color:rgba(74,112,40,0.5);background:rgba(250,248,240,0.9);}
.modal-btn{
  width:100%;padding:17px;border-radius:100px;
  background:linear-gradient(135deg,#3A6820,#5A9040);
  color:white;font-family:'Inter',sans-serif;
  font-size:16px;font-weight:700;border:none;cursor:pointer;
  box-shadow:0 6px 20px rgba(58,104,32,0.38);
  letter-spacing:0.2px;
  transition:transform 0.15s;
}
.modal-btn:hover{transform:translateY(-1px);}
.modal-btn:active{transform:scale(0.98);}
</style>
</head>
<body>

<!-- ══════════════════════════════════════════
     HYPER-REALISTIC VINE BACKGROUND SVG
══════════════════════════════════════════ -->
<svg style="position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Warm cream wall -->
    <radialGradient id="wall" cx="48%" cy="38%" r="65%">
      <stop offset="0%" stop-color="#FAF7EE"/>
      <stop offset="45%" stop-color="#F2EBD8"/>
      <stop offset="100%" stop-color="#E6DABC"/>
    </radialGradient>
    <!-- Golden hour top right -->
    <radialGradient id="ghr" cx="88%" cy="6%" r="38%">
      <stop offset="0%" stop-color="rgba(228,205,140,0.45)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <!-- Ambient green left -->
    <radialGradient id="agl" cx="4%" cy="52%" r="35%">
      <stop offset="0%" stop-color="rgba(130,180,100,0.14)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <!-- Vignette -->
    <radialGradient id="vig" cx="50%" cy="50%" r="72%">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="100%" stop-color="rgba(35,45,15,0.22)"/>
    </radialGradient>
    <!-- LEAF GRADIENTS — 6 variants for realism -->
    <linearGradient id="lA" x1="15%" y1="5%" x2="85%" y2="95%">
      <stop offset="0%" stop-color="#C2E890"/>
      <stop offset="40%" stop-color="#88C850"/>
      <stop offset="100%" stop-color="#4A8020"/>
    </linearGradient>
    <linearGradient id="lB" x1="10%" y1="10%" x2="90%" y2="90%">
      <stop offset="0%" stop-color="#A8DC78"/>
      <stop offset="45%" stop-color="#70B038"/>
      <stop offset="100%" stop-color="#3E7018"/>
    </linearGradient>
    <linearGradient id="lC" x1="5%" y1="0%" x2="95%" y2="100%">
      <stop offset="0%" stop-color="#B8E088"/>
      <stop offset="50%" stop-color="#7AB848"/>
      <stop offset="100%" stop-color="#488028"/>
    </linearGradient>
    <linearGradient id="lD" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#98D068"/>
      <stop offset="50%" stop-color="#60A030"/>
      <stop offset="100%" stop-color="#386810"/>
    </linearGradient>
    <linearGradient id="lE" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D0EEA8"/>
      <stop offset="55%" stop-color="#98D068"/>
      <stop offset="100%" stop-color="#58A030"/>
    </linearGradient>
    <linearGradient id="lF" x1="30%" y1="0%" x2="70%" y2="100%">
      <stop offset="0%" stop-color="#80C048"/>
      <stop offset="100%" stop-color="#305808"/>
    </linearGradient>
    <!-- STEM GRADIENTS -->
    <linearGradient id="stA" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7A6030"/>
      <stop offset="50%" stop-color="#8A7040"/>
      <stop offset="100%" stop-color="#6A5020"/>
    </linearGradient>
    <linearGradient id="stB" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6A5828"/>
      <stop offset="50%" stop-color="#7A6838"/>
      <stop offset="100%" stop-color="#5A4818"/>
    </linearGradient>
    <!-- Leaf shadow for depth -->
    <filter id="lsf" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="rgba(20,40,5,0.3)"/>
    </filter>
    <filter id="lsf2" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="1.8" flood-color="rgba(20,40,5,0.22)"/>
    </filter>
    <filter id="ssf" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="rgba(30,45,10,0.25)"/>
    </filter>
  </defs>

  <!-- Wall + lighting -->
  <rect width="390" height="844" fill="url(#wall)"/>
  <rect width="390" height="844" fill="url(#ghr)"/>
  <rect width="390" height="844" fill="url(#agl)"/>

  <!-- ================================================================
       LEFT SIDE — LUSH IVY CLIMBING UP THE WALL
  ================================================================ -->
  <!-- Main left stem — thick, curving, natural -->
  <path d="M-12 844 Q12 760 2 672 Q-10 585 14 500 Q32 422 10 338 Q-8 260 18 180 Q35 115 12 50 Q4 25 22 -5" stroke="url(#stA)" stroke-width="5.5" fill="none" filter="url(#ssf)" stroke-linecap="round"/>
  <!-- Secondary left stem -->
  <path d="M16 844 Q36 768 26 688 Q14 602 36 520 Q54 446 32 364 Q14 288 38 210 Q55 148 34 82 Q24 55 40 20" stroke="url(#stB)" stroke-width="3.2" fill="none" opacity="0.65" filter="url(#ssf)" stroke-linecap="round"/>
  <!-- Tertiary thin stem -->
  <path d="M-5 700 Q18 648 8 590 Q-4 532 16 478" stroke="url(#stA)" stroke-width="2" fill="none" opacity="0.45" stroke-linecap="round"/>

  <!-- ── LEFT LEAVES — Bottom third (600–844) ── -->
  <g filter="url(#lsf)">
    <path d="M10 820 Q-15 795 -30 810 Q-35 828 -18 838 Q2 842 10 820Z" fill="url(#lA)" opacity="0.9"/>
    <path d="M10 820 L-18 838" stroke="#204808" stroke-width="0.9" opacity="0.6"/>
    <path d="M-18 838 L-24 844" stroke="#204808" stroke-width="0.6" opacity="0.4"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M4 800 Q32 778 50 790 Q60 804 50 818 Q38 828 20 822 Q4 812 4 800Z" fill="url(#lB)" opacity="0.88"/>
    <path d="M4 800 L20 822" stroke="#204808" stroke-width="0.9" opacity="0.58"/>
    <path d="M20 822 L14 830" stroke="#204808" stroke-width="0.55" opacity="0.38"/>
    <path d="M20 822 L28 828" stroke="#204808" stroke-width="0.55" opacity="0.38"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M-8 768 Q-34 748 -46 762 Q-50 778 -34 786 Q-16 790 -8 768Z" fill="url(#lC)" opacity="0.85"/>
    <path d="M-8 768 L-34 786" stroke="#204808" stroke-width="0.85" opacity="0.55"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M18 750 Q46 730 64 742 Q74 756 64 769 Q52 779 34 773 Q16 765 18 750Z" fill="url(#lD)" opacity="0.86"/>
    <path d="M18 750 L34 773" stroke="#204808" stroke-width="0.9" opacity="0.56"/>
    <path d="M34 773 L28 782" stroke="#204808" stroke-width="0.55" opacity="0.36"/>
    <path d="M34 773 L42 780" stroke="#204808" stroke-width="0.55" opacity="0.36"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M-5 718 Q-28 698 -40 712 Q-44 726 -30 734 Q-12 738 -5 718Z" fill="url(#lE)" opacity="0.82"/>
    <path d="M-5 718 L-30 734" stroke="#204808" stroke-width="0.8" opacity="0.52"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M12 700 Q38 682 56 694 Q66 706 56 720 Q44 730 26 724 Q10 716 12 700Z" fill="url(#lA)" opacity="0.84"/>
    <path d="M12 700 L26 724" stroke="#204808" stroke-width="0.85" opacity="0.54"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M-10 672 Q-35 652 -48 666 Q-52 682 -36 690 Q-18 694 -10 672Z" fill="url(#lB)" opacity="0.80"/>
    <path d="M-10 672 L-36 690" stroke="#204808" stroke-width="0.8" opacity="0.50"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M14 652 Q42 634 60 646 Q70 660 60 674 Q48 684 30 678 Q12 670 14 652Z" fill="url(#lC)" opacity="0.82"/>
    <path d="M14 652 L30 678" stroke="#204808" stroke-width="0.85" opacity="0.52"/>
    <path d="M30 678 L24 686" stroke="#204808" stroke-width="0.5" opacity="0.34"/>
    <path d="M30 678 L38 684" stroke="#204808" stroke-width="0.5" opacity="0.34"/>
  </g>

  <!-- ── LEFT LEAVES — Middle third (340–600) ── -->
  <g filter="url(#lsf)">
    <path d="M8 618 Q-18 598 -32 612 Q-36 628 -20 636 Q-2 640 8 618Z" fill="url(#lD)" opacity="0.78"/>
    <path d="M8 618 L-20 636" stroke="#204808" stroke-width="0.8" opacity="0.50"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M20 598 Q46 580 64 592 Q74 606 64 620 Q52 630 34 624 Q18 616 20 598Z" fill="url(#lE)" opacity="0.80"/>
    <path d="M20 598 L34 624" stroke="#204808" stroke-width="0.82" opacity="0.50"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M-6 565 Q-30 546 -44 560 Q-48 576 -32 584 Q-14 588 -6 565Z" fill="url(#lA)" opacity="0.76"/>
    <path d="M-6 565 L-32 584" stroke="#204808" stroke-width="0.78" opacity="0.48"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M16 545 Q44 527 62 540 Q72 554 62 568 Q50 578 32 572 Q14 563 16 545Z" fill="url(#lB)" opacity="0.78"/>
    <path d="M16 545 L32 572" stroke="#204808" stroke-width="0.8" opacity="0.48"/>
    <path d="M32 572 L26 580" stroke="#204808" stroke-width="0.5" opacity="0.32"/>
    <path d="M32 572 L40 578" stroke="#204808" stroke-width="0.5" opacity="0.32"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M4 512 Q-22 493 -36 507 Q-40 523 -24 531 Q-6 535 4 512Z" fill="url(#lC)" opacity="0.74"/>
    <path d="M4 512 L-24 531" stroke="#204808" stroke-width="0.76" opacity="0.46"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M22 490 Q50 472 68 485 Q78 499 68 513 Q56 522 38 516 Q20 508 22 490Z" fill="url(#lD)" opacity="0.76"/>
    <path d="M22 490 L38 516" stroke="#204808" stroke-width="0.78" opacity="0.46"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M6 458 Q-18 440 -32 454 Q-36 470 -20 478 Q-2 482 6 458Z" fill="url(#lE)" opacity="0.72"/>
    <path d="M6 458 L-20 478" stroke="#204808" stroke-width="0.74" opacity="0.44"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M18 438 Q46 420 64 433 Q74 447 64 461 Q52 470 34 464 Q16 456 18 438Z" fill="url(#lF)" opacity="0.74"/>
    <path d="M18 438 L34 464" stroke="#204808" stroke-width="0.76" opacity="0.44"/>
    <path d="M34 464 L28 472" stroke="#204808" stroke-width="0.48" opacity="0.30"/>
    <path d="M34 464 L42 470" stroke="#204808" stroke-width="0.48" opacity="0.30"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M2 402 Q-24 384 -38 398 Q-42 414 -26 422 Q-8 426 2 402Z" fill="url(#lA)" opacity="0.70"/>
    <path d="M2 402 L-26 422" stroke="#204808" stroke-width="0.72" opacity="0.42"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M20 382 Q48 364 66 377 Q76 391 66 405 Q54 414 36 408 Q18 400 20 382Z" fill="url(#lB)" opacity="0.72"/>
    <path d="M20 382 L36 408" stroke="#204808" stroke-width="0.74" opacity="0.42"/>
  </g>

  <!-- ── LEFT LEAVES — Upper third (0–340) ── -->
  <g filter="url(#lsf)">
    <path d="M10 348 Q-16 330 -30 344 Q-34 360 -18 368 Q0 372 10 348Z" fill="url(#lC)" opacity="0.68"/>
    <path d="M10 348 L-18 368" stroke="#204808" stroke-width="0.70" opacity="0.40"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M24 328 Q52 310 70 323 Q80 337 70 351 Q58 360 40 354 Q22 346 24 328Z" fill="url(#lD)" opacity="0.70"/>
    <path d="M24 328 L40 354" stroke="#204808" stroke-width="0.72" opacity="0.40"/>
    <path d="M40 354 L34 362" stroke="#204808" stroke-width="0.46" opacity="0.28"/>
    <path d="M40 354 L48 360" stroke="#204808" stroke-width="0.46" opacity="0.28"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M8 292 Q-18 274 -32 288 Q-36 304 -20 312 Q-2 316 8 292Z" fill="url(#lE)" opacity="0.72"/>
    <path d="M8 292 L-20 312" stroke="#204808" stroke-width="0.70" opacity="0.42"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M26 272 Q54 255 72 268 Q82 282 72 296 Q60 305 42 299 Q24 291 26 272Z" fill="url(#lA)" opacity="0.74"/>
    <path d="M26 272 L42 299" stroke="#204808" stroke-width="0.72" opacity="0.42"/>
  </g>
  <!-- Branch left at mid-height -->
  <path d="M14 240 Q42 218 72 228" stroke="url(#stB)" stroke-width="2.2" fill="none" opacity="0.55" stroke-linecap="round"/>
  <g filter="url(#lsf)">
    <path d="M76 224 Q100 205 118 218 Q128 232 118 246 Q106 255 88 248 Q70 240 76 224Z" fill="url(#lB)" opacity="0.76"/>
    <path d="M76 224 L88 248" stroke="#204808" stroke-width="0.74" opacity="0.44"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M60 236 Q80 218 98 230 Q108 244 98 258 Q86 267 68 260 Q52 252 60 236Z" fill="url(#lC)" opacity="0.70"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M6 220 Q-20 202 -34 216 Q-38 232 -22 240 Q-4 244 6 220Z" fill="url(#lD)" opacity="0.74"/>
    <path d="M6 220 L-22 240" stroke="#204808" stroke-width="0.72" opacity="0.44"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M22 198 Q50 180 68 193 Q78 207 68 221 Q56 230 38 224 Q20 216 22 198Z" fill="url(#lE)" opacity="0.76"/>
    <path d="M22 198 L38 224" stroke="#204808" stroke-width="0.74" opacity="0.44"/>
    <path d="M38 224 L32 232" stroke="#204808" stroke-width="0.46" opacity="0.30"/>
    <path d="M38 224 L46 230" stroke="#204808" stroke-width="0.46" opacity="0.30"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M4 162 Q-22 144 -36 158 Q-40 174 -24 182 Q-6 186 4 162Z" fill="url(#lA)" opacity="0.78"/>
    <path d="M4 162 L-24 182" stroke="#204808" stroke-width="0.74" opacity="0.46"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M28 142 Q56 124 74 138 Q84 152 74 166 Q62 175 44 168 Q26 160 28 142Z" fill="url(#lB)" opacity="0.80"/>
    <path d="M28 142 L44 168" stroke="#204808" stroke-width="0.76" opacity="0.46"/>
  </g>
  <!-- Big decorative leaves upper-left -->
  <g filter="url(#lsf)">
    <path d="M-5 108 Q25 82 52 96 Q68 112 58 132 Q46 146 24 140 Q2 130 -5 108Z" fill="url(#lC)" opacity="0.82"/>
    <path d="M-5 108 L24 140" stroke="#1A4006" stroke-width="0.88" opacity="0.52"/>
    <path d="M24 140 L16 150" stroke="#1A4006" stroke-width="0.55" opacity="0.36"/>
    <path d="M24 140 L34 148" stroke="#1A4006" stroke-width="0.55" opacity="0.36"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M18 82 Q50 58 76 72 Q90 88 80 108 Q68 122 46 115 Q24 106 18 82Z" fill="url(#lD)" opacity="0.84"/>
    <path d="M18 82 L46 115" stroke="#1A4006" stroke-width="0.90" opacity="0.54"/>
    <path d="M46 115 L38 125" stroke="#1A4006" stroke-width="0.58" opacity="0.38"/>
    <path d="M46 115 L56 122" stroke="#1A4006" stroke-width="0.58" opacity="0.38"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M-12 55 Q16 32 42 46 Q56 62 46 80 Q34 92 12 86 Q-10 78 -12 55Z" fill="url(#lE)" opacity="0.86"/>
    <path d="M-12 55 L12 86" stroke="#1A4006" stroke-width="0.90" opacity="0.56"/>
    <path d="M12 86 L5 96" stroke="#1A4006" stroke-width="0.58" opacity="0.38"/>
    <path d="M12 86 L22 94" stroke="#1A4006" stroke-width="0.58" opacity="0.38"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M8 28 Q36 6 62 20 Q76 36 66 54 Q54 66 32 60 Q10 52 8 28Z" fill="url(#lA)" opacity="0.88"/>
    <path d="M8 28 L32 60" stroke="#1A4006" stroke-width="0.92" opacity="0.58"/>
  </g>
  <g filter="url(#lsf)">
    <path d="M-8 5 Q18 -14 44 0 Q58 16 48 34 Q36 46 14 40 Q-8 32 -8 5Z" fill="url(#lB)" opacity="0.90"/>
    <path d="M-8 5 L14 40" stroke="#1A4006" stroke-width="0.92" opacity="0.58"/>
  </g>
  <!-- Extra small leaves scattered upper left -->
  <g filter="url(#lsf2)">
    <path d="M55 30 Q76 12 96 26 Q106 40 96 54 Q84 62 64 56 Q48 48 55 30Z" fill="url(#lC)" opacity="0.78"/>
    <path d="M55 30 L64 56" stroke="#1A4006" stroke-width="0.72" opacity="0.46"/>
  </g>
  <g filter="url(#lsf2)">
    <path d="M82 8 Q104 -8 124 6 Q134 20 124 34 Q112 42 92 36 Q76 28 82 8Z" fill="url(#lD)" opacity="0.74"/>
    <path d="M82 8 L92 36" stroke="#1A4006" stroke-width="0.68" opacity="0.44"/>
  </g>
  <g filter="url(#lsf2)">
    <path d="M38 -5 Q58 -20 78 -8 Q88 6 78 20 Q66 28 48 22 Q34 14 38 -5Z" fill="url(#lF)" opacity="0.76"/>
    <path d="M38 -5 L48 22" stroke="#1A4006" stroke-width="0.68" opacity="0.44"/>
  </g>

  <!-- ================================================================
       RIGHT SIDE — LUSH IVY (MIRRORED)
  ================================================================ -->
  <!-- Main right stem -->
  <path d="M402 844 Q378 760 388 672 Q400 585 376 500 Q358 422 380 338 Q398 260 372 180 Q355 115 378 50 Q386 25 368 -5" stroke="url(#stA)" stroke-width="5.5" fill="none" filter="url(#ssf)" stroke-linecap="round"/>
  <!-- Secondary right stem -->
  <path d="M374 844 Q354 768 364 688 Q376 602 354 520 Q336 446 358 364 Q376 288 352 210 Q335 148 356 82 Q366 55 350 20" stroke="url(#stB)" stroke-width="3.2" fill="none" opacity="0.65" filter="url(#ssf)" stroke-linecap="round"/>
  <path d="M395 700 Q372 648 382 590 Q394 532 374 478" stroke="url(#stA)" stroke-width="2" fill="none" opacity="0.45" stroke-linecap="round"/>

  <!-- RIGHT leaves — Bottom -->
  <g filter="url(#lsf)"><path d="M380 820 Q405 795 420 810 Q425 828 408 838 Q388 842 380 820Z" fill="url(#lA)" opacity="0.9"/><path d="M380 820 L408 838" stroke="#204808" stroke-width="0.9" opacity="0.6"/></g>
  <g filter="url(#lsf)"><path d="M386 800 Q358 778 340 790 Q330 804 340 818 Q352 828 370 822 Q386 812 386 800Z" fill="url(#lB)" opacity="0.88"/><path d="M386 800 L370 822" stroke="#204808" stroke-width="0.9" opacity="0.58"/><path d="M370 822 L376 830" stroke="#204808" stroke-width="0.55" opacity="0.38"/><path d="M370 822 L362 828" stroke="#204808" stroke-width="0.55" opacity="0.38"/></g>
  <g filter="url(#lsf)"><path d="M398 768 Q424 748 436 762 Q440 778 424 786 Q406 790 398 768Z" fill="url(#lC)" opacity="0.85"/><path d="M398 768 L424 786" stroke="#204808" stroke-width="0.85" opacity="0.55"/></g>
  <g filter="url(#lsf)"><path d="M372 750 Q344 730 326 742 Q316 756 326 769 Q338 779 356 773 Q374 765 372 750Z" fill="url(#lD)" opacity="0.86"/><path d="M372 750 L356 773" stroke="#204808" stroke-width="0.9" opacity="0.56"/></g>
  <g filter="url(#lsf)"><path d="M395 718 Q418 698 430 712 Q434 726 420 734 Q402 738 395 718Z" fill="url(#lE)" opacity="0.82"/><path d="M395 718 L420 734" stroke="#204808" stroke-width="0.8" opacity="0.52"/></g>
  <g filter="url(#lsf)"><path d="M378 700 Q352 682 334 694 Q324 706 334 720 Q346 730 364 724 Q380 716 378 700Z" fill="url(#lA)" opacity="0.84"/><path d="M378 700 L364 724" stroke="#204808" stroke-width="0.85" opacity="0.54"/></g>
  <g filter="url(#lsf)"><path d="M400 672 Q425 652 438 666 Q442 682 426 690 Q408 694 400 672Z" fill="url(#lB)" opacity="0.80"/><path d="M400 672 L426 690" stroke="#204808" stroke-width="0.8" opacity="0.50"/></g>
  <g filter="url(#lsf)"><path d="M376 652 Q348 634 330 646 Q320 660 330 674 Q342 684 360 678 Q378 670 376 652Z" fill="url(#lC)" opacity="0.82"/><path d="M376 652 L360 678" stroke="#204808" stroke-width="0.85" opacity="0.52"/></g>
  <!-- RIGHT middle -->
  <g filter="url(#lsf)"><path d="M382 618 Q408 598 422 612 Q426 628 410 636 Q392 640 382 618Z" fill="url(#lD)" opacity="0.78"/><path d="M382 618 L410 636" stroke="#204808" stroke-width="0.8" opacity="0.50"/></g>
  <g filter="url(#lsf)"><path d="M370 598 Q344 580 326 592 Q316 606 326 620 Q338 630 356 624 Q372 616 370 598Z" fill="url(#lE)" opacity="0.80"/><path d="M370 598 L356 624" stroke="#204808" stroke-width="0.82" opacity="0.50"/></g>
  <g filter="url(#lsf)"><path d="M396 565 Q420 546 434 560 Q438 576 422 584 Q404 588 396 565Z" fill="url(#lA)" opacity="0.76"/><path d="M396 565 L422 584" stroke="#204808" stroke-width="0.78" opacity="0.48"/></g>
  <g filter="url(#lsf)"><path d="M374 545 Q348 527 330 540 Q320 554 330 568 Q342 578 360 572 Q376 563 374 545Z" fill="url(#lB)" opacity="0.78"/><path d="M374 545 L360 572" stroke="#204808" stroke-width="0.8" opacity="0.48"/></g>
  <g filter="url(#lsf)"><path d="M386 512 Q412 493 426 507 Q430 523 414 531 Q396 535 386 512Z" fill="url(#lC)" opacity="0.74"/><path d="M386 512 L414 531" stroke="#204808" stroke-width="0.76" opacity="0.46"/></g>
  <g filter="url(#lsf)"><path d="M368 490 Q342 472 324 485 Q314 499 324 513 Q336 522 354 516 Q370 508 368 490Z" fill="url(#lD)" opacity="0.76"/><path d="M368 490 L354 516" stroke="#204808" stroke-width="0.78" opacity="0.46"/></g>
  <g filter="url(#lsf)"><path d="M384 458 Q408 440 422 454 Q426 470 410 478 Q392 482 384 458Z" fill="url(#lE)" opacity="0.72"/><path d="M384 458 L410 478" stroke="#204808" stroke-width="0.74" opacity="0.44"/></g>
  <g filter="url(#lsf)"><path d="M372 438 Q346 420 328 433 Q318 447 328 461 Q340 470 358 464 Q374 456 372 438Z" fill="url(#lF)" opacity="0.74"/><path d="M372 438 L358 464" stroke="#204808" stroke-width="0.76" opacity="0.44"/></g>
  <g filter="url(#lsf)"><path d="M388 402 Q414 384 428 398 Q432 414 416 422 Q398 426 388 402Z" fill="url(#lA)" opacity="0.70"/><path d="M388 402 L416 422" stroke="#204808" stroke-width="0.72" opacity="0.42"/></g>
  <g filter="url(#lsf)"><path d="M370 382 Q344 364 326 377 Q316 391 326 405 Q338 414 356 408 Q372 400 370 382Z" fill="url(#lB)" opacity="0.72"/><path d="M370 382 L356 408" stroke="#204808" stroke-width="0.74" opacity="0.42"/></g>
  <!-- RIGHT upper -->
  <g filter="url(#lsf)"><path d="M380 348 Q406 330 420 344 Q424 360 408 368 Q390 372 380 348Z" fill="url(#lC)" opacity="0.68"/><path d="M380 348 L408 368" stroke="#204808" stroke-width="0.70" opacity="0.40"/></g>
  <g filter="url(#lsf)"><path d="M366 328 Q342 310 324 323 Q314 337 324 351 Q336 360 354 354 Q370 346 366 328Z" fill="url(#lD)" opacity="0.70"/><path d="M366 328 L354 354" stroke="#204808" stroke-width="0.72" opacity="0.40"/></g>
  <!-- Branch right -->
  <path d="M376 240 Q350 218 320 228" stroke="url(#stB)" stroke-width="2.2" fill="none" opacity="0.55" stroke-linecap="round"/>
  <g filter="url(#lsf)"><path d="M316 224 Q292 205 274 218 Q264 232 274 246 Q286 255 304 248 Q322 240 316 224Z" fill="url(#lB)" opacity="0.76"/><path d="M316 224 L304 248" stroke="#204808" stroke-width="0.74" opacity="0.44"/></g>
  <g filter="url(#lsf)"><path d="M330 236 Q310 218 292 230 Q282 244 292 258 Q304 267 322 260 Q338 252 330 236Z" fill="url(#lC)" opacity="0.70"/></g>
  <g filter="url(#lsf)"><path d="M384 220 Q410 202 424 216 Q428 232 412 240 Q394 244 384 220Z" fill="url(#lD)" opacity="0.74"/><path d="M384 220 L412 240" stroke="#204808" stroke-width="0.72" opacity="0.44"/></g>
  <g filter="url(#lsf)"><path d="M368 198 Q344 180 326 193 Q316 207 326 221 Q338 230 356 224 Q372 216 368 198Z" fill="url(#lE)" opacity="0.76"/><path d="M368 198 L356 224" stroke="#204808" stroke-width="0.74" opacity="0.44"/></g>
  <g filter="url(#lsf)"><path d="M386 162 Q412 144 426 158 Q430 174 414 182 Q396 186 386 162Z" fill="url(#lA)" opacity="0.78"/><path d="M386 162 L414 182" stroke="#204808" stroke-width="0.74" opacity="0.46"/></g>
  <g filter="url(#lsf)"><path d="M362 142 Q338 124 320 138 Q310 152 320 166 Q332 175 350 168 Q366 160 362 142Z" fill="url(#lB)" opacity="0.80"/><path d="M362 142 L350 168" stroke="#204808" stroke-width="0.76" opacity="0.46"/></g>
  <!-- Big right upper leaves -->
  <g filter="url(#lsf)"><path d="M395 108 Q368 82 342 96 Q328 112 338 132 Q350 146 372 140 Q394 130 395 108Z" fill="url(#lC)" opacity="0.82"/><path d="M395 108 L372 140" stroke="#1A4006" stroke-width="0.88" opacity="0.52"/><path d="M372 140 L380 150" stroke="#1A4006" stroke-width="0.55" opacity="0.36"/><path d="M372 140 L362 148" stroke="#1A4006" stroke-width="0.55" opacity="0.36"/></g>
  <g filter="url(#lsf)"><path d="M372 82 Q344 58 318 72 Q304 88 314 108 Q326 122 348 115 Q370 106 372 82Z" fill="url(#lD)" opacity="0.84"/><path d="M372 82 L348 115" stroke="#1A4006" stroke-width="0.90" opacity="0.54"/></g>
  <g filter="url(#lsf)"><path d="M402 55 Q376 32 352 46 Q338 62 348 80 Q360 92 382 86 Q402 78 402 55Z" fill="url(#lE)" opacity="0.86"/><path d="M402 55 L382 86" stroke="#1A4006" stroke-width="0.90" opacity="0.56"/></g>
  <g filter="url(#lsf)"><path d="M382 28 Q358 6 334 20 Q320 36 330 54 Q342 66 364 60 Q384 52 382 28Z" fill="url(#lA)" opacity="0.88"/><path d="M382 28 L364 60" stroke="#1A4006" stroke-width="0.92" opacity="0.58"/></g>
  <g filter="url(#lsf)"><path d="M398 5 Q374 -14 350 0 Q336 16 346 34 Q358 46 380 40 Q400 32 398 5Z" fill="url(#lB)" opacity="0.90"/><path d="M398 5 L380 40" stroke="#1A4006" stroke-width="0.92" opacity="0.58"/></g>
  <g filter="url(#lsf2)"><path d="M335 30 Q314 12 294 26 Q284 40 294 54 Q306 62 326 56 Q342 48 335 30Z" fill="url(#lC)" opacity="0.78"/><path d="M335 30 L326 56" stroke="#1A4006" stroke-width="0.72" opacity="0.46"/></g>
  <g filter="url(#lsf2)"><path d="M308 8 Q286 -8 266 6 Q256 20 266 34 Q278 42 298 36 Q312 28 308 8Z" fill="url(#lD)" opacity="0.74"/></g>
  <g filter="url(#lsf2)"><path d="M352 -5 Q332 -20 312 -8 Q302 6 312 20 Q324 28 342 22 Q356 14 352 -5Z" fill="url(#lF)" opacity="0.76"/></g>

  <!-- ================================================================
       TOP — DENSE CANOPY SPANNING THE TOP EDGE
  ================================================================ -->
  <!-- Top horizontal stems -->
  <path d="M-15 -8 Q55 15 130 5 Q195 -5 260 12 Q318 26 395 8" stroke="url(#stA)" stroke-width="3.8" fill="none" filter="url(#ssf)" stroke-linecap="round"/>
  <path d="M-10 8 Q50 28 122 18 Q185 8 248 24 Q305 38 388 22" stroke="url(#stB)" stroke-width="2.2" fill="none" opacity="0.55" filter="url(#ssf)" stroke-linecap="round"/>
  <!-- Hanging top vines -->
  <path d="M88 5 Q82 40 90 75 Q96 105 84 138" stroke="url(#stB)" stroke-width="2.4" fill="none" opacity="0.6" stroke-linecap="round"/>
  <path d="M168 -2 Q160 34 168 68 Q175 98 162 130" stroke="url(#stB)" stroke-width="2.2" fill="none" opacity="0.55" stroke-linecap="round"/>
  <path d="M248 4 Q240 38 248 72 Q256 103 244 135" stroke="url(#stB)" stroke-width="2.2" fill="none" opacity="0.55" stroke-linecap="round"/>
  <path d="M310 -2 Q304 32 312 65 Q318 94 308 125" stroke="url(#stB)" stroke-width="2" fill="none" opacity="0.5" stroke-linecap="round"/>

  <!-- Top canopy leaves — LEFT zone -->
  <g filter="url(#lsf)"><path d="M12 -2 Q38 -20 60 -8 Q72 6 62 22 Q50 32 30 26 Q12 18 12 -2Z" fill="url(#lA)" opacity="0.92"/><path d="M12 -2 L30 26" stroke="#1A4006" stroke-width="0.9" opacity="0.6"/><path d="M30 26 L24 36" stroke="#1A4006" stroke-width="0.6" opacity="0.4"/><path d="M30 26 L40 34" stroke="#1A4006" stroke-width="0.6" opacity="0.4"/></g>
  <g filter="url(#lsf)"><path d="M48 -14 Q76 -30 98 -18 Q110 -4 100 12 Q88 22 68 16 Q48 8 48 -14Z" fill="url(#lB)" opacity="0.90"/><path d="M48 -14 L68 16" stroke="#1A4006" stroke-width="0.9" opacity="0.58"/></g>
  <g filter="url(#lsf)"><path d="M30 18 Q56 2 78 14 Q90 28 80 44 Q68 54 48 48 Q28 40 30 18Z" fill="url(#lC)" opacity="0.88"/><path d="M30 18 L48 48" stroke="#1A4006" stroke-width="0.88" opacity="0.56"/><path d="M48 48 L42 58" stroke="#1A4006" stroke-width="0.55" opacity="0.38"/><path d="M48 48 L58 56" stroke="#1A4006" stroke-width="0.55" opacity="0.38"/></g>
  <g filter="url(#lsf)"><path d="M68 8 Q94 -8 116 4 Q128 18 118 34 Q106 44 86 38 Q66 30 68 8Z" fill="url(#lD)" opacity="0.86"/><path d="M68 8 L86 38" stroke="#1A4006" stroke-width="0.86" opacity="0.54"/></g>
  <g filter="url(#lsf)"><path d="M82 26 Q108 10 130 22 Q142 36 132 52 Q120 62 100 56 Q80 48 82 26Z" fill="url(#lE)" opacity="0.84"/><path d="M82 26 L100 56" stroke="#1A4006" stroke-width="0.86" opacity="0.52"/><path d="M100 56 L94 66" stroke="#1A4006" stroke-width="0.54" opacity="0.36"/><path d="M100 56 L110 64" stroke="#1A4006" stroke-width="0.54" opacity="0.36"/></g>
  <g filter="url(#lsf)"><path d="M96 -10 Q122 -24 144 -12 Q156 2 146 18 Q134 28 114 22 Q94 14 96 -10Z" fill="url(#lA)" opacity="0.82"/><path d="M96 -10 L114 22" stroke="#1A4006" stroke-width="0.82" opacity="0.50"/></g>
  <g filter="url(#lsf)"><path d="M108 42 Q134 26 156 38 Q168 52 158 68 Q146 78 126 72 Q106 64 108 42Z" fill="url(#lF)" opacity="0.80"/><path d="M108 42 L126 72" stroke="#1A4006" stroke-width="0.80" opacity="0.50"/></g>
  <!-- Top centre leaves -->
  <g filter="url(#lsf)"><path d="M138 -6 Q164 -20 186 -8 Q198 6 188 22 Q176 32 156 26 Q136 18 138 -6Z" fill="url(#lB)" opacity="0.80"/><path d="M138 -6 L156 26" stroke="#1A4006" stroke-width="0.80" opacity="0.48"/></g>
  <g filter="url(#lsf)"><path d="M152 14 Q178 -2 200 10 Q212 24 202 40 Q190 50 170 44 Q150 36 152 14Z" fill="url(#lC)" opacity="0.82"/><path d="M152 14 L170 44" stroke="#1A4006" stroke-width="0.80" opacity="0.50"/><path d="M170 44 L164 54" stroke="#1A4006" stroke-width="0.52" opacity="0.34"/><path d="M170 44 L180 52" stroke="#1A4006" stroke-width="0.52" opacity="0.34"/></g>
  <g filter="url(#lsf)"><path d="M186 -4 Q212 -18 234 -6 Q246 8 236 24 Q224 34 204 28 Q184 20 186 -4Z" fill="url(#lD)" opacity="0.78"/><path d="M186 -4 L204 28" stroke="#1A4006" stroke-width="0.78" opacity="0.46"/></g>
  <g filter="url(#lsf)"><path d="M204 16 Q230 2 252 14 Q264 28 254 44 Q242 54 222 48 Q202 40 204 16Z" fill="url(#lE)" opacity="0.80"/><path d="M204 16 L222 48" stroke="#1A4006" stroke-width="0.78" opacity="0.48"/></g>
  <!-- Top right zone -->
  <g filter="url(#lsf)"><path d="M238 -8 Q264 -22 286 -10 Q298 4 288 20 Q276 30 256 24 Q236 16 238 -8Z" fill="url(#lA)" opacity="0.78"/><path d="M238 -8 L256 24" stroke="#1A4006" stroke-width="0.76" opacity="0.46"/></g>
  <g filter="url(#lsf)"><path d="M256 12 Q282 -2 304 10 Q316 24 306 40 Q294 50 274 44 Q254 36 256 12Z" fill="url(#lB)" opacity="0.80"/><path d="M256 12 L274 44" stroke="#1A4006" stroke-width="0.78" opacity="0.48"/><path d="M274 44 L268 54" stroke="#1A4006" stroke-width="0.50" opacity="0.32"/><path d="M274 44 L284 52" stroke="#1A4006" stroke-width="0.50" opacity="0.32"/></g>
  <g filter="url(#lsf)"><path d="M290 -6 Q316 -20 338 -8 Q350 6 340 22 Q328 32 308 26 Q288 18 290 -6Z" fill="url(#lC)" opacity="0.76"/><path d="M290 -6 L308 26" stroke="#1A4006" stroke-width="0.74" opacity="0.44"/></g>
  <g filter="url(#lsf)"><path d="M312 14 Q336 0 358 12 Q368 26 358 42 Q346 52 326 46 Q308 38 312 14Z" fill="url(#lD)" opacity="0.78"/><path d="M312 14 L326 46" stroke="#1A4006" stroke-width="0.76" opacity="0.46"/></g>
  <g filter="url(#lsf)"><path d="M346 -12 Q370 -26 390 -14 Q400 0 390 16 Q378 26 360 20 Q342 12 346 -12Z" fill="url(#lE)" opacity="0.80"/><path d="M346 -12 L360 20" stroke="#1A4006" stroke-width="0.78" opacity="0.48"/></g>

  <!-- ================================================================
       BOTTOM GROUND FOLIAGE
  ================================================================ -->
  <g opacity="0.55">
    <ellipse cx="38" cy="840" rx="65" ry="28" fill="#78B038"/>
    <ellipse cx="5" cy="844" rx="44" ry="20" fill="#98C858"/>
    <ellipse cx="80" cy="844" rx="52" ry="22" fill="#68A028"/>
    <ellipse cx="145" cy="844" rx="36" ry="14" fill="#88B848" opacity="0.75"/>
    <ellipse cx="352" cy="840" rx="65" ry="28" fill="#78B038"/>
    <ellipse cx="386" cy="844" rx="44" ry="20" fill="#98C858"/>
    <ellipse cx="310" cy="844" rx="52" ry="22" fill="#68A028"/>
    <ellipse cx="245" cy="844" rx="36" ry="14" fill="#88B848" opacity="0.75"/>
    <ellipse cx="195" cy="844" rx="30" ry="12" fill="#78B038" opacity="0.6"/>
  </g>

  <!-- Final vignette -->
  <rect width="390" height="844" fill="url(#vig)"/>
</svg>

<!-- ══ NAME PROMPT MODAL ══ -->
<div class="modal-bg" id="nameModal">
  <!-- Vine SVG inside modal background -->
  <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="mv1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#C2E890"/><stop offset="50%" stop-color="#88C850"/><stop offset="100%" stop-color="#4A8020"/></linearGradient>
      <filter id="mlsf" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(20,40,5,0.28)"/></filter>
    </defs>
    <!-- Top left modal vines -->
    <path d="M-10 0 Q15 45 5 100 Q-5 148 15 200" stroke="#8A7030" stroke-width="3.5" fill="none" opacity="0.55" stroke-linecap="round"/>
    <g filter="url(#mlsf)"><path d="M-8 10 Q18 -8 40 4 Q52 18 42 34 Q30 44 10 38 Q-8 30 -8 10Z" fill="url(#mv1)" opacity="0.85"/><path d="M-8 10 L10 38" stroke="#1A4006" stroke-width="0.85" opacity="0.55"/><path d="M10 38 L4 48" stroke="#1A4006" stroke-width="0.55" opacity="0.38"/><path d="M10 38 L20 46" stroke="#1A4006" stroke-width="0.55" opacity="0.38"/></g>
    <g filter="url(#mlsf)"><path d="M5 42 Q32 26 54 38 Q66 52 56 68 Q44 78 24 72 Q4 64 5 42Z" fill="url(#mv1)" opacity="0.80"/><path d="M5 42 L24 72" stroke="#1A4006" stroke-width="0.82" opacity="0.52"/></g>
    <g filter="url(#mlsf)"><path d="M-5 78 Q22 62 44 74 Q56 88 46 104 Q34 114 14 108 Q-6 100 -5 78Z" fill="url(#mv1)" opacity="0.75"/><path d="M-5 78 L14 108" stroke="#1A4006" stroke-width="0.78" opacity="0.48"/></g>
    <g filter="url(#mlsf)"><path d="M8 115 Q36 99 58 112 Q70 126 60 142 Q48 151 28 145 Q8 137 8 115Z" fill="url(#mv1)" opacity="0.70"/><path d="M8 115 L28 145" stroke="#1A4006" stroke-width="0.75" opacity="0.44"/></g>
    <g filter="url(#mlsf)"><path d="M-2 155 Q24 140 46 152 Q58 166 48 182 Q36 191 16 185 Q-4 177 -2 155Z" fill="url(#mv1)" opacity="0.65"/></g>
    <!-- Extra top-left leaves -->
    <g filter="url(#mlsf)"><path d="M32 -5 Q58 -20 78 -8 Q88 6 78 22 Q66 32 46 26 Q28 18 32 -5Z" fill="url(#mv1)" opacity="0.78"/><path d="M32 -5 L46 26" stroke="#1A4006" stroke-width="0.75" opacity="0.46"/></g>
    <g filter="url(#mlsf)"><path d="M62 8 Q88 -6 108 6 Q118 20 108 36 Q96 46 76 40 Q58 32 62 8Z" fill="url(#mv1)" opacity="0.72"/></g>
    <!-- Top right modal vines -->
    <path d="M400 0 Q375 45 385 100 Q395 148 375 200" stroke="#8A7030" stroke-width="3.5" fill="none" opacity="0.52" stroke-linecap="round"/>
    <g filter="url(#mlsf)"><path d="M398 10 Q372 -8 350 4 Q338 18 348 34 Q360 44 380 38 Q398 30 398 10Z" fill="url(#mv1)" opacity="0.85"/><path d="M398 10 L380 38" stroke="#1A4006" stroke-width="0.85" opacity="0.55"/></g>
    <g filter="url(#mlsf)"><path d="M385 42 Q358 26 336 38 Q324 52 334 68 Q346 78 366 72 Q386 64 385 42Z" fill="url(#mv1)" opacity="0.80"/><path d="M385 42 L366 72" stroke="#1A4006" stroke-width="0.82" opacity="0.52"/></g>
    <g filter="url(#mlsf)"><path d="M395 78 Q368 62 346 74 Q334 88 344 104 Q356 114 376 108 Q396 100 395 78Z" fill="url(#mv1)" opacity="0.75"/></g>
    <g filter="url(#mlsf)"><path d="M382 115 Q354 99 332 112 Q320 126 330 142 Q342 151 362 145 Q382 137 382 115Z" fill="url(#mv1)" opacity="0.70"/></g>
    <g filter="url(#mlsf)"><path d="M358 -5 Q332 -20 312 -8 Q302 6 312 22 Q324 32 344 26 Q362 18 358 -5Z" fill="url(#mv1)" opacity="0.76"/></g>
    <g filter="url(#mlsf)"><path d="M328 8 Q302 -6 282 6 Q272 20 282 36 Q294 46 314 40 Q332 32 328 8Z" fill="url(#mv1)" opacity="0.70"/></g>
    <!-- Bottom left -->
    <path d="M-10 844 Q14 800 4 755" stroke="#8A7030" stroke-width="2.8" fill="none" opacity="0.45" stroke-linecap="round"/>
    <g filter="url(#mlsf)"><path d="M-8 800 Q18 784 40 796 Q52 810 42 826 Q30 835 10 829 Q-10 821 -8 800Z" fill="url(#mv1)" opacity="0.65"/></g>
    <g filter="url(#mlsf)"><path d="M-4 838 Q22 823 44 835 Q54 848 44 844 L-4 844Z" fill="url(#mv1)" opacity="0.58"/></g>
    <!-- Bottom right -->
    <path d="M400 844 Q376 800 386 755" stroke="#8A7030" stroke-width="2.8" fill="none" opacity="0.45" stroke-linecap="round"/>
    <g filter="url(#mlsf)"><path d="M398 800 Q372 784 350 796 Q338 810 348 826 Q360 835 380 829 Q400 821 398 800Z" fill="url(#mv1)" opacity="0.65"/></g>
    <g filter="url(#mlsf)"><path d="M394 838 Q368 823 346 835 Q336 848 346 844 L394 844Z" fill="url(#mv1)" opacity="0.58"/></g>
  </svg>

  <div class="modal-card">
    <div style="font-size:52px;margin-bottom:14px;">🌿</div>
    <div style="font-family:'Inter',sans-serif;font-size:28px;font-weight:800;color:#1A1A0E;margin-bottom:8px;letter-spacing:-0.5px;">Welcome to Thinko</div>
    <div style="font-size:15px;color:#6A6050;line-height:1.7;margin-bottom:26px;font-weight:400;">Your calm space for thinking clearly,<br/>planning gently, and living fully.</div>
    <div style="font-size:13px;font-weight:700;color:#3A6820;margin-bottom:12px;letter-spacing:0.2px;">What shall we call you? 🌱</div>
    <input type="text" id="nameIn" placeholder="Your first name..." autocomplete="given-name"/>
    <button class="modal-btn" onclick="saveName()">Begin my journey 🌿</button>
    <div style="margin-top:12px;font-size:11px;color:#B0A898;">You can change this anytime in settings</div>
  </div>
</div>

<!-- ══ PAGE CONTENT ══ -->
<div class="page">
  <div class="panel">
    <!-- Top bar -->
    <div class="topbar">
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M7 1L1 7l6 6" stroke="#3A3020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 7h16" stroke="#3A3020" stroke-width="2" stroke-linecap="round"/></svg>
      <svg width="18" height="13" viewBox="0 0 18 13" fill="none" style="margin-left:3px;"><path d="M0 1h18M0 6.5h18M0 12h11" stroke="#3A3020" stroke-width="1.8" stroke-linecap="round"/></svg>
    </div>

    <!-- Greeting -->
    <div class="greet" id="greetEl">Good morning ✨</div>

    <!-- Grid of 10 modules -->
    <div class="grid">
      <div class="card"><div class="card-ico">📋</div><div class="card-name">Prioritizer</div></div>
      <div class="card"><div class="card-ico">🧠</div><div class="card-name">Mind Map</div></div>
      <div class="card"><div class="card-ico">📚</div><div class="card-name">The Vault</div></div>
      <div class="card"><div class="card-ico">🍽️</div><div class="card-name">Meal Planner</div></div>
      <div class="card"><div class="card-ico">🎯</div><div class="card-name">Goals</div></div>
      <div class="card"><div class="card-ico">⚡</div><div class="card-name">Matrix</div></div>
      <div class="card"><div class="card-ico">⚡</div><div class="card-name">The Charge</div></div>
      <div class="card"><div class="card-ico">💰</div><div class="card-name">Budget</div></div>
      <div class="card"><div class="card-ico">🛒</div><div class="card-name">Shopping</div></div>
      <div class="card"><div class="card-ico">🔧</div><div class="card-name">Tools</div></div>
    </div>
  </div>
</div>

<!-- ══ BOTTOM NAV ══ -->
<div class="nav">
  <div class="ni on">
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none"><path d="M1 10L12 1l11 9" stroke="#3A6820" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 8v12a1 1 0 001 1h5v-6h6v6h5a1 1 0 001-1V8" stroke="#3A6820" stroke-width="2" stroke-linecap="round"/></svg>
    <div class="ni-lbl" style="color:#3A6820;font-weight:800;">Home</div>
  </div>
  <div class="ni">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="10" cy="10" r="7.5" stroke="#3A3020" stroke-width="1.9"/><path d="M19 19l-3.5-3.5" stroke="#3A3020" stroke-width="1.9" stroke-linecap="round"/></svg>
    <div class="ni-lbl">Search</div>
  </div>
  <div class="ni">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke="#3A3020" stroke-width="1.9"/><path d="M11 7v8M7 11h8" stroke="#3A3020" stroke-width="1.9" stroke-linecap="round"/></svg>
    <div class="ni-lbl">Add</div>
  </div>
  <div class="ni">
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none"><path d="M11 18S2 12.5 2 6.5A5 5 0 0111 3.8 5 5 0 0120 6.5C20 12.5 11 18 11 18z" stroke="#3A3020" stroke-width="1.9" stroke-linejoin="round"/></svg>
    <div class="ni-lbl">Veart</div>
  </div>
  <div class="ni">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="7.5" r="3.5" stroke="#3A3020" stroke-width="1.9"/><path d="M3 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#3A3020" stroke-width="1.9" stroke-linecap="round"/></svg>
    <div class="ni-lbl">Profile</div>
  </div>
</div>

<script>
function getGreeting(name){
  const h=new Date().getHours();
  let word,emoji;
  if(h>=5&&h<12){word='Good morning';emoji='✨';}
  else if(h>=12&&h<17){word='Good afternoon';emoji='☀️';}
  else if(h>=17&&h<21){word='Good evening';emoji='🌅';}
  else{word='Good night';emoji='🌙';}
  return `${word}${name?', '+name:''} ${emoji}`;
}

function saveName(){
  const n=document.getElementById('nameIn').value.trim();
  if(!n)return;
  try{localStorage.setItem('thinko_username',n);}catch{}
  document.getElementById('nameModal').style.display='none';
  document.getElementById('greetEl').textContent=getGreeting(n);
}

document.getElementById('nameIn').addEventListener('keydown',e=>{
  if(e.key==='Enter')saveName();
});

window.addEventListener('DOMContentLoaded',()=>{
  let name='';
  try{name=localStorage.getItem('thinko_username')||'';}catch{}
  if(name){
    document.getElementById('nameModal').style.display='none';
  }
  document.getElementById('greetEl').textContent=getGreeting(name);
  setTimeout(()=>document.getElementById('nameIn').focus(),400);
});

setInterval(()=>{
  let name='';try{name=localStorage.getItem('thinko_username')||'';}catch{}
  document.getElementById('greetEl').textContent=getGreeting(name);
},60000);
</script>
</body>
</html>
