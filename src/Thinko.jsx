import { useState, useEffect, useRef, useCallback } from "react";
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
const headerGrad  = `linear-gradient(135deg,#3A5030 0%,#4A6840 50%,#5A7850 100%)`;
const pageGrad    = `linear-gradient(180deg,#F5F0E4 0%,#EDE8D8 40%,#E5DFC8 100%)`;
const btnGrad     = `linear-gradient(135deg,#3D5A2A,#6A9058)`;
const cardGlass   = "rgba(252,248,238,0.75)";

/* ── GARDEN VINE BACKGROUND ── */
const GardenBg=()=>(
  <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
    <svg width="100%" height="100%" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gWall" cx="48%" cy="36%" r="65%"><stop offset="0%" stopColor="#FAF7EE"/><stop offset="45%" stopColor="#F2EBD8"/><stop offset="100%" stopColor="#E6DABC"/></radialGradient>
        <radialGradient id="gGold" cx="88%" cy="6%" r="38%"><stop offset="0%" stopColor="rgba(228,205,140,0.42)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
        <radialGradient id="gGrn" cx="5%" cy="52%" r="32%"><stop offset="0%" stopColor="rgba(130,180,100,0.13)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
        <radialGradient id="gVig" cx="50%" cy="50%" r="72%"><stop offset="0%" stopColor="transparent"/><stop offset="100%" stopColor="rgba(30,38,12,0.2)"/></radialGradient>
        <linearGradient id="fA" x1="12%" y1="5%" x2="88%" y2="95%"><stop offset="0%" stopColor="#D0F0A0"/><stop offset="35%" stopColor="#92CC58"/><stop offset="100%" stopColor="#4E8A1E"/></linearGradient>
        <linearGradient id="fB" x1="8%" y1="8%" x2="92%" y2="92%"><stop offset="0%" stopColor="#BCEA8A"/><stop offset="40%" stopColor="#82C048"/><stop offset="100%" stopColor="#427A18"/></linearGradient>
        <linearGradient id="fC" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#A8D870"/><stop offset="45%" stopColor="#72B038"/><stop offset="100%" stopColor="#3C6C10"/></linearGradient>
        <linearGradient id="fD" x1="20%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stopColor="#C8EC98"/><stop offset="50%" stopColor="#88C450"/><stop offset="100%" stopColor="#4C8020"/></linearGradient>
        <linearGradient id="fE" x1="15%" y1="10%" x2="85%" y2="90%"><stop offset="0%" stopColor="#B0DC7A"/><stop offset="42%" stopColor="#78B840"/><stop offset="100%" stopColor="#447415"/></linearGradient>
        <linearGradient id="fF" x1="5%" y1="5%" x2="95%" y2="95%"><stop offset="0%" stopColor="#E0F5B8"/><stop offset="45%" stopColor="#A2D870"/><stop offset="100%" stopColor="#5E9430"/></linearGradient>
        <linearGradient id="fG" x1="25%" y1="0%" x2="75%" y2="100%"><stop offset="0%" stopColor="#96CC5E"/><stop offset="100%" stopColor="#3A6808"/></linearGradient>
        <linearGradient id="fH" x1="0%" y1="20%" x2="100%" y2="80%"><stop offset="0%" stopColor="#CAE88C"/><stop offset="55%" stopColor="#88C048"/><stop offset="100%" stopColor="#508020"/></linearGradient>
        <linearGradient id="stL" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#5E4A1A"/><stop offset="30%" stopColor="#7A6230"/><stop offset="55%" stopColor="#8A7240"/><stop offset="80%" stopColor="#6E5825"/><stop offset="100%" stopColor="#5A4818"/></linearGradient>
        <linearGradient id="stR" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stopColor="#5E4A1A"/><stop offset="30%" stopColor="#7A6230"/><stop offset="55%" stopColor="#8A7240"/><stop offset="80%" stopColor="#6E5825"/><stop offset="100%" stopColor="#5A4818"/></linearGradient>
        <linearGradient id="stH" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6A5622"/><stop offset="50%" stopColor="#7E6834"/><stop offset="100%" stopColor="#604E1C"/></linearGradient>
        <filter id="lsh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="1.2" dy="2.2" stdDeviation="2.8" floodColor="#1A2E08" floodOpacity="0.32"/></filter>
        <filter id="lsh2" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0.8" dy="1.5" stdDeviation="1.8" floodColor="#1A2E08" floodOpacity="0.22"/></filter>
        <filter id="shs" x="-15%" y="-15%" width="130%" height="130%"><feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#2A3810" floodOpacity="0.2"/></filter>
      </defs>
      <rect width="390" height="844" fill="url(#gWall)"/>
      <rect width="390" height="844" fill="url(#gGold)"/>
      <rect width="390" height="844" fill="url(#gGrn)"/>
      {/* LEFT MAIN STEM */}
      <path d="M-10 844 Q8 758 -2 668 Q-12 580 10 494 Q28 414 6 328 Q-12 248 14 162 Q32 92 10 24" stroke="url(#stL)" strokeWidth="6" fill="none" filter="url(#shs)" strokeLinecap="round"/>
      <path d="M14 844 Q30 762 20 676 Q10 592 30 508 Q48 430 28 346 Q10 268 34 184 Q50 116 30 50" stroke="url(#stL)" strokeWidth="3.2" fill="none" opacity="0.6" strokeLinecap="round"/>
      {/* LEFT LEAVES with veins */}
      <g filter="url(#lsh)"><path d="M2 804 Q32 780 52 794 Q64 810 52 826 Q38 836 18 829 Q0 820 2 804Z" fill="url(#fB)"/><line x1="2" y1="804" x2="18" y2="829" stroke="#1E4A05" strokeWidth="0.88" opacity="0.68"/><line x1="18" y1="829" x2="12" y2="837" stroke="#1E4A05" strokeWidth="0.52" opacity="0.42"/><line x1="18" y1="829" x2="26" y2="836" stroke="#1E4A05" strokeWidth="0.52" opacity="0.42"/></g>
      <g filter="url(#lsh)"><path d="M-6 775 Q-34 752 -48 766 Q-53 784 -35 792 Q-15 796 -6 775Z" fill="url(#fC)"/><line x1="-6" y1="775" x2="-35" y2="792" stroke="#1E4A05" strokeWidth="0.82" opacity="0.65"/><line x1="-22" y1="784" x2="-30" y2="792" stroke="#1E4A05" strokeWidth="0.48" opacity="0.4"/><line x1="-22" y1="784" x2="-14" y2="790" stroke="#1E4A05" strokeWidth="0.48" opacity="0.4"/></g>
      <g filter="url(#lsh)"><path d="M16 756 Q46 733 66 746 Q78 762 66 777 Q52 787 32 780 Q12 771 16 756Z" fill="url(#fD)"/><line x1="16" y1="756" x2="32" y2="780" stroke="#1E4A05" strokeWidth="0.86" opacity="0.66"/><line x1="32" y1="780" x2="26" y2="789" stroke="#1E4A05" strokeWidth="0.5" opacity="0.4"/><line x1="32" y1="780" x2="40" y2="787" stroke="#1E4A05" strokeWidth="0.5" opacity="0.4"/></g>
      <g filter="url(#lsh)"><path d="M14 706 Q42 684 62 697 Q74 713 62 728 Q48 738 28 730 Q10 722 14 706Z" fill="url(#fF)"/><line x1="14" y1="706" x2="28" y2="730" stroke="#1E4A05" strokeWidth="0.84" opacity="0.64"/><line x1="28" y1="730" x2="22" y2="739" stroke="#1E4A05" strokeWidth="0.5" opacity="0.39"/><line x1="28" y1="730" x2="36" y2="737" stroke="#1E4A05" strokeWidth="0.5" opacity="0.39"/></g>
      <g filter="url(#lsh2)"><path d="M18 654 Q46 633 66 646 Q78 662 66 678 Q52 688 32 681 Q14 673 18 654Z" fill="url(#fB)"/><line x1="18" y1="654" x2="32" y2="681" stroke="#1E4A05" strokeWidth="0.82" opacity="0.62"/><line x1="32" y1="681" x2="26" y2="690" stroke="#1E4A05" strokeWidth="0.48" opacity="0.38"/><line x1="32" y1="681" x2="40" y2="688" stroke="#1E4A05" strokeWidth="0.48" opacity="0.38"/></g>
      <g filter="url(#lsh2)"><path d="M-5 622 Q-32 600 -46 614 Q-50 630 -34 638 Q-15 642 -5 622Z" fill="url(#fC)"/><line x1="-5" y1="622" x2="-34" y2="638" stroke="#1E4A05" strokeWidth="0.76" opacity="0.60"/></g>
      <g filter="url(#lsh2)"><path d="M20 602 Q48 581 68 594 Q80 610 68 626 Q54 636 34 629 Q16 621 20 602Z" fill="url(#fD)"/><line x1="20" y1="602" x2="34" y2="629" stroke="#1E4A05" strokeWidth="0.80" opacity="0.60"/><line x1="34" y1="629" x2="28" y2="638" stroke="#1E4A05" strokeWidth="0.46" opacity="0.36"/><line x1="34" y1="629" x2="42" y2="636" stroke="#1E4A05" strokeWidth="0.46" opacity="0.36"/></g>
      <g filter="url(#lsh2)"><path d="M18 552 Q46 531 66 544 Q78 560 66 576 Q52 586 32 579 Q14 571 18 552Z" fill="url(#fE)"/><line x1="18" y1="552" x2="32" y2="579" stroke="#1E4A05" strokeWidth="0.78" opacity="0.58"/><line x1="32" y1="579" x2="26" y2="588" stroke="#1E4A05" strokeWidth="0.44" opacity="0.35"/><line x1="32" y1="579" x2="40" y2="585" stroke="#1E4A05" strokeWidth="0.44" opacity="0.35"/></g>
      <g filter="url(#lsh2)"><path d="M20 500 Q48 480 68 493 Q80 509 68 525 Q54 535 34 528 Q16 520 20 500Z" fill="url(#fA)"/><line x1="20" y1="500" x2="34" y2="528" stroke="#1E4A05" strokeWidth="0.76" opacity="0.56"/><line x1="34" y1="528" x2="28" y2="537" stroke="#1E4A05" strokeWidth="0.44" opacity="0.34"/><line x1="34" y1="528" x2="42" y2="534" stroke="#1E4A05" strokeWidth="0.44" opacity="0.34"/></g>
      <g filter="url(#lsh2)"><path d="M22 448 Q50 428 70 441 Q82 457 70 473 Q56 483 36 476 Q18 468 22 448Z" fill="url(#fH)"/><line x1="22" y1="448" x2="36" y2="476" stroke="#1E4A05" strokeWidth="0.76" opacity="0.56"/><line x1="36" y1="476" x2="30" y2="485" stroke="#1E4A05" strokeWidth="0.44" opacity="0.34"/><line x1="36" y1="476" x2="44" y2="482" stroke="#1E4A05" strokeWidth="0.44" opacity="0.34"/></g>
      <g filter="url(#lsh2)"><path d="M20 396 Q48 376 68 389 Q80 405 68 421 Q54 431 34 424 Q16 416 20 396Z" fill="url(#fG)"/><line x1="20" y1="396" x2="34" y2="424" stroke="#1E4A05" strokeWidth="0.74" opacity="0.54"/><line x1="34" y1="424" x2="28" y2="433" stroke="#1E4A05" strokeWidth="0.42" opacity="0.32"/><line x1="34" y1="424" x2="42" y2="430" stroke="#1E4A05" strokeWidth="0.42" opacity="0.32"/></g>
      <g filter="url(#lsh)"><path d="M26 272 Q54 255 72 268 Q82 282 72 296 Q60 305 42 299 Q24 291 26 272Z" fill="url(#fD)"/><line x1="26" y1="272" x2="42" y2="299" stroke="#1E4A05" strokeWidth="0.76" opacity="0.56"/></g>
      <g filter="url(#lsh)"><path d="M28 142 Q56 124 74 138 Q84 152 74 166 Q62 175 44 168 Q26 160 28 142Z" fill="url(#fB)"/><line x1="28" y1="142" x2="44" y2="168" stroke="#1E4A05" strokeWidth="0.76" opacity="0.56"/></g>
      {/* BIG CORNER LEAVES top-left */}
      <g filter="url(#lsh)"><path d="M-10 145 Q20 118 52 132 Q68 150 56 172 Q42 186 18 178 Q-8 168 -10 145Z" fill="url(#fA)"/><line x1="-10" y1="145" x2="18" y2="178" stroke="#14380A" strokeWidth="0.92" opacity="0.65"/><line x1="18" y1="178" x2="10" y2="188" stroke="#14380A" strokeWidth="0.56" opacity="0.42"/><line x1="18" y1="178" x2="28" y2="186" stroke="#14380A" strokeWidth="0.56" opacity="0.42"/><path d="M2 151 Q12 148 22 153" stroke="#14380A" strokeWidth="0.44" fill="none" opacity="0.34"/><path d="M4 159 Q14 156 24 161" stroke="#14380A" strokeWidth="0.4" fill="none" opacity="0.28"/></g>
      <g filter="url(#lsh)"><path d="M14 112 Q46 87 78 102 Q94 120 82 142 Q68 156 44 148 Q18 138 14 112Z" fill="url(#fB)"/><line x1="14" y1="112" x2="44" y2="148" stroke="#14380A" strokeWidth="0.95" opacity="0.67"/><line x1="44" y1="148" x2="36" y2="158" stroke="#14380A" strokeWidth="0.58" opacity="0.44"/><line x1="44" y1="148" x2="54" y2="156" stroke="#14380A" strokeWidth="0.58" opacity="0.44"/><path d="M22 118 Q34 115 46 120" stroke="#14380A" strokeWidth="0.45" fill="none" opacity="0.34"/></g>
      <g filter="url(#lsh)"><path d="M-6 78 Q24 54 58 68 Q74 86 62 108 Q48 122 24 114 Q-4 104 -6 78Z" fill="url(#fC)"/><line x1="-6" y1="78" x2="24" y2="114" stroke="#14380A" strokeWidth="0.95" opacity="0.66"/><line x1="24" y1="114" x2="16" y2="124" stroke="#14380A" strokeWidth="0.58" opacity="0.43"/><line x1="24" y1="114" x2="34" y2="122" stroke="#14380A" strokeWidth="0.58" opacity="0.43"/></g>
      <g filter="url(#lsh)"><path d="M10 44 Q42 22 74 36 Q90 54 78 76 Q64 90 40 82 Q14 72 10 44Z" fill="url(#fD)"/><line x1="10" y1="44" x2="40" y2="82" stroke="#14380A" strokeWidth="0.98" opacity="0.66"/><line x1="40" y1="82" x2="32" y2="92" stroke="#14380A" strokeWidth="0.60" opacity="0.43"/><line x1="40" y1="82" x2="50" y2="90" stroke="#14380A" strokeWidth="0.60" opacity="0.43"/></g>
      <g filter="url(#lsh)"><path d="M-12 12 Q16 -10 48 4 Q64 22 52 44 Q38 58 14 50 Q-10 40 -12 12Z" fill="url(#fE)"/><line x1="-12" y1="12" x2="14" y2="50" stroke="#14380A" strokeWidth="1.0" opacity="0.66"/><line x1="14" y1="50" x2="6" y2="60" stroke="#14380A" strokeWidth="0.60" opacity="0.42"/><line x1="14" y1="50" x2="24" y2="58" stroke="#14380A" strokeWidth="0.60" opacity="0.42"/></g>
      <g filter="url(#lsh2)"><path d="M52 16 Q76 -2 98 10 Q110 26 98 42 Q84 52 64 44 Q46 36 52 16Z" fill="url(#fF)"/><line x1="52" y1="16" x2="64" y2="44" stroke="#14380A" strokeWidth="0.80" opacity="0.55"/></g>
      <g filter="url(#lsh2)"><path d="M86 0 Q110 -16 132 -4 Q144 12 132 28 Q118 38 98 30 Q80 22 86 0Z" fill="url(#fG)"/><line x1="86" y1="0" x2="98" y2="30" stroke="#14380A" strokeWidth="0.76" opacity="0.52"/></g>
      <g filter="url(#lsh2)"><path d="M36 -4 Q58 -20 80 -8 Q90 8 80 24 Q66 34 46 26 Q28 18 36 -4Z" fill="url(#fH)"/><line x1="36" y1="-4" x2="46" y2="26" stroke="#14380A" strokeWidth="0.74" opacity="0.50"/></g>
      {/* RIGHT MAIN STEM */}
      <path d="M400 844 Q382 758 392 668 Q402 580 380 494 Q362 414 384 328 Q402 248 376 162 Q358 92 380 24" stroke="url(#stR)" strokeWidth="6" fill="none" filter="url(#shs)" strokeLinecap="round"/>
      <path d="M376 844 Q360 762 370 676 Q380 592 360 508 Q342 430 362 346 Q380 268 356 184 Q340 116 360 50" stroke="url(#stR)" strokeWidth="3.2" fill="none" opacity="0.6" strokeLinecap="round"/>
      {/* RIGHT LEAVES with veins */}
      <g filter="url(#lsh)"><path d="M388 804 Q358 780 338 794 Q326 810 338 826 Q352 836 372 829 Q390 820 388 804Z" fill="url(#fB)"/><line x1="388" y1="804" x2="372" y2="829" stroke="#1E4A05" strokeWidth="0.88" opacity="0.68"/><line x1="372" y1="829" x2="378" y2="837" stroke="#1E4A05" strokeWidth="0.52" opacity="0.42"/><line x1="372" y1="829" x2="364" y2="836" stroke="#1E4A05" strokeWidth="0.52" opacity="0.42"/></g>
      <g filter="url(#lsh)"><path d="M396 775 Q424 752 438 766 Q443 784 425 792 Q405 796 396 775Z" fill="url(#fC)"/><line x1="396" y1="775" x2="425" y2="792" stroke="#1E4A05" strokeWidth="0.82" opacity="0.65"/><line x1="411" y1="784" x2="419" y2="792" stroke="#1E4A05" strokeWidth="0.48" opacity="0.4"/><line x1="411" y1="784" x2="403" y2="790" stroke="#1E4A05" strokeWidth="0.48" opacity="0.4"/></g>
      <g filter="url(#lsh)"><path d="M374 756 Q344 733 324 746 Q312 762 324 777 Q338 787 358 780 Q378 771 374 756Z" fill="url(#fD)"/><line x1="374" y1="756" x2="358" y2="780" stroke="#1E4A05" strokeWidth="0.86" opacity="0.66"/><line x1="358" y1="780" x2="364" y2="789" stroke="#1E4A05" strokeWidth="0.5" opacity="0.4"/><line x1="358" y1="780" x2="350" y2="787" stroke="#1E4A05" strokeWidth="0.5" opacity="0.4"/></g>
      <g filter="url(#lsh)"><path d="M376 706 Q348 684 328 697 Q316 713 328 728 Q342 738 362 730 Q380 722 376 706Z" fill="url(#fF)"/><line x1="376" y1="706" x2="362" y2="730" stroke="#1E4A05" strokeWidth="0.84" opacity="0.64"/><line x1="362" y1="730" x2="368" y2="739" stroke="#1E4A05" strokeWidth="0.5" opacity="0.39"/><line x1="362" y1="730" x2="354" y2="737" stroke="#1E4A05" strokeWidth="0.5" opacity="0.39"/></g>
      <g filter="url(#lsh2)"><path d="M372 654 Q344 633 324 646 Q312 662 324 678 Q338 688 358 681 Q376 673 372 654Z" fill="url(#fB)"/><line x1="372" y1="654" x2="358" y2="681" stroke="#1E4A05" strokeWidth="0.82" opacity="0.62"/><line x1="358" y1="681" x2="364" y2="690" stroke="#1E4A05" strokeWidth="0.48" opacity="0.38"/><line x1="358" y1="681" x2="350" y2="688" stroke="#1E4A05" strokeWidth="0.48" opacity="0.38"/></g>
      <g filter="url(#lsh2)"><path d="M395 622 Q422 600 436 614 Q440 630 424 638 Q405 642 395 622Z" fill="url(#fC)"/><line x1="395" y1="622" x2="424" y2="638" stroke="#1E4A05" strokeWidth="0.76" opacity="0.60"/></g>
      <g filter="url(#lsh2)"><path d="M370 602 Q342 581 322 594 Q310 610 322 626 Q336 636 356 629 Q374 621 370 602Z" fill="url(#fD)"/><line x1="370" y1="602" x2="356" y2="629" stroke="#1E4A05" strokeWidth="0.80" opacity="0.60"/><line x1="356" y1="629" x2="362" y2="638" stroke="#1E4A05" strokeWidth="0.46" opacity="0.36"/><line x1="356" y1="629" x2="348" y2="636" stroke="#1E4A05" strokeWidth="0.46" opacity="0.36"/></g>
      <g filter="url(#lsh2)"><path d="M372 552 Q344 531 324 544 Q312 560 324 576 Q338 586 358 579 Q376 571 372 552Z" fill="url(#fE)"/><line x1="372" y1="552" x2="358" y2="579" stroke="#1E4A05" strokeWidth="0.78" opacity="0.58"/><line x1="358" y1="579" x2="364" y2="588" stroke="#1E4A05" strokeWidth="0.44" opacity="0.35"/><line x1="358" y1="579" x2="350" y2="585" stroke="#1E4A05" strokeWidth="0.44" opacity="0.35"/></g>
      <g filter="url(#lsh2)"><path d="M370 500 Q342 480 322 493 Q310 509 322 525 Q336 535 356 528 Q374 520 370 500Z" fill="url(#fA)"/><line x1="370" y1="500" x2="356" y2="528" stroke="#1E4A05" strokeWidth="0.76" opacity="0.56"/><line x1="356" y1="528" x2="362" y2="537" stroke="#1E4A05" strokeWidth="0.44" opacity="0.34"/><line x1="356" y1="528" x2="348" y2="534" stroke="#1E4A05" strokeWidth="0.44" opacity="0.34"/></g>
      <g filter="url(#lsh2)"><path d="M368 448 Q340 428 320 441 Q308 457 320 473 Q334 483 354 476 Q372 468 368 448Z" fill="url(#fH)"/><line x1="368" y1="448" x2="354" y2="476" stroke="#1E4A05" strokeWidth="0.76" opacity="0.56"/></g>
      <g filter="url(#lsh2)"><path d="M368 396 Q340 376 320 389 Q308 405 320 421 Q334 431 354 424 Q372 416 368 396Z" fill="url(#fG)"/><line x1="368" y1="396" x2="354" y2="424" stroke="#1E4A05" strokeWidth="0.74" opacity="0.54"/></g>
      <g filter="url(#lsh)"><path d="M366 288 Q338 268 318 281 Q306 297 318 313 Q332 323 352 316 Q370 308 366 288Z" fill="url(#fD)"/><line x1="366" y1="288" x2="352" y2="316" stroke="#1E4A05" strokeWidth="0.74" opacity="0.55"/></g>
      <g filter="url(#lsh)"><path d="M362 142 Q338 124 320 138 Q310 152 320 166 Q332 175 350 168 Q366 160 362 142Z" fill="url(#fB)"/><line x1="362" y1="142" x2="350" y2="168" stroke="#1E4A05" strokeWidth="0.76" opacity="0.56"/></g>
      {/* BIG CORNER LEAVES top-right */}
      <g filter="url(#lsh)"><path d="M400 145 Q370 118 338 132 Q322 150 334 172 Q348 186 372 178 Q398 168 400 145Z" fill="url(#fA)"/><line x1="400" y1="145" x2="372" y2="178" stroke="#14380A" strokeWidth="0.92" opacity="0.65"/><line x1="372" y1="178" x2="380" y2="188" stroke="#14380A" strokeWidth="0.56" opacity="0.42"/><line x1="372" y1="178" x2="362" y2="186" stroke="#14380A" strokeWidth="0.56" opacity="0.42"/><path d="M386 151 Q376 148 366 153" stroke="#14380A" strokeWidth="0.44" fill="none" opacity="0.34"/></g>
      <g filter="url(#lsh)"><path d="M376 112 Q344 87 312 102 Q296 120 308 142 Q322 156 346 148 Q372 138 376 112Z" fill="url(#fB)"/><line x1="376" y1="112" x2="346" y2="148" stroke="#14380A" strokeWidth="0.95" opacity="0.67"/><line x1="346" y1="148" x2="354" y2="158" stroke="#14380A" strokeWidth="0.58" opacity="0.44"/><line x1="346" y1="148" x2="336" y2="156" stroke="#14380A" strokeWidth="0.58" opacity="0.44"/></g>
      <g filter="url(#lsh)"><path d="M396 78 Q366 54 332 68 Q316 86 328 108 Q342 122 366 114 Q394 104 396 78Z" fill="url(#fC)"/><line x1="396" y1="78" x2="366" y2="114" stroke="#14380A" strokeWidth="0.95" opacity="0.66"/><line x1="366" y1="114" x2="374" y2="124" stroke="#14380A" strokeWidth="0.58" opacity="0.43"/><line x1="366" y1="114" x2="356" y2="122" stroke="#14380A" strokeWidth="0.58" opacity="0.43"/></g>
      <g filter="url(#lsh)"><path d="M380 44 Q348 22 316 36 Q300 54 312 76 Q326 90 350 82 Q376 72 380 44Z" fill="url(#fD)"/><line x1="380" y1="44" x2="350" y2="82" stroke="#14380A" strokeWidth="0.98" opacity="0.66"/><line x1="350" y1="82" x2="358" y2="92" stroke="#14380A" strokeWidth="0.60" opacity="0.43"/><line x1="350" y1="82" x2="340" y2="90" stroke="#14380A" strokeWidth="0.60" opacity="0.43"/></g>
      <g filter="url(#lsh)"><path d="M402 12 Q374 -10 342 4 Q326 22 338 44 Q352 58 376 50 Q400 40 402 12Z" fill="url(#fE)"/><line x1="402" y1="12" x2="376" y2="50" stroke="#14380A" strokeWidth="1.0" opacity="0.66"/></g>
      <g filter="url(#lsh2)"><path d="M338 16 Q314 -2 292 10 Q280 26 292 42 Q306 52 326 44 Q344 36 338 16Z" fill="url(#fF)"/><line x1="338" y1="16" x2="326" y2="44" stroke="#14380A" strokeWidth="0.80" opacity="0.55"/></g>
      <g filter="url(#lsh2)"><path d="M354 -4 Q332 -20 310 -8 Q298 8 310 24 Q324 34 344 26 Q360 18 354 -4Z" fill="url(#fH)"/><line x1="354" y1="-4" x2="344" y2="26" stroke="#14380A" strokeWidth="0.74" opacity="0.50"/></g>
      {/* TOP CANOPY */}
      <path d="M-15 -5 Q55 18 130 8 Q195 0 262 15 Q322 28 395 10" stroke="url(#stH)" strokeWidth="4" fill="none" filter="url(#shs)" strokeLinecap="round"/>
      <path d="M-10 8 Q55 30 128 20 Q192 10 258 26 Q318 40 390 22" stroke="url(#stH)" strokeWidth="2.2" fill="none" opacity="0.5" strokeLinecap="round"/>
      <g filter="url(#lsh)"><path d="M8 -2 Q34 -20 58 -8 Q70 8 60 24 Q48 34 28 28 Q8 20 8 -2Z" fill="url(#fA)"/><line x1="8" y1="-2" x2="28" y2="28" stroke="#14380A" strokeWidth="0.88" opacity="0.62"/><line x1="28" y1="28" x2="22" y2="38" stroke="#14380A" strokeWidth="0.54" opacity="0.40"/><line x1="28" y1="28" x2="36" y2="36" stroke="#14380A" strokeWidth="0.54" opacity="0.40"/></g>
      <g filter="url(#lsh)"><path d="M44 -14 Q72 -30 94 -18 Q106 -2 96 14 Q84 24 64 18 Q44 10 44 -14Z" fill="url(#fB)"/><line x1="44" y1="-14" x2="64" y2="18" stroke="#14380A" strokeWidth="0.86" opacity="0.60"/></g>
      <g filter="url(#lsh)"><path d="M28 18 Q54 2 76 14 Q88 30 78 46 Q66 56 46 50 Q26 42 28 18Z" fill="url(#fC)"/><line x1="28" y1="18" x2="46" y2="50" stroke="#14380A" strokeWidth="0.88" opacity="0.60"/><line x1="46" y1="50" x2="40" y2="60" stroke="#14380A" strokeWidth="0.54" opacity="0.38"/><line x1="46" y1="50" x2="56" y2="58" stroke="#14380A" strokeWidth="0.54" opacity="0.38"/></g>
      <g filter="url(#lsh)"><path d="M78 24 Q106 8 128 20 Q140 36 130 52 Q118 62 98 56 Q78 48 78 24Z" fill="url(#fD)"/><line x1="78" y1="24" x2="98" y2="56" stroke="#14380A" strokeWidth="0.86" opacity="0.58"/><line x1="98" y1="56" x2="92" y2="66" stroke="#14380A" strokeWidth="0.53" opacity="0.36"/><line x1="98" y1="56" x2="108" y2="64" stroke="#14380A" strokeWidth="0.53" opacity="0.36"/></g>
      <g filter="url(#lsh)"><path d="M148 14 Q176 0 198 12 Q210 28 200 44 Q188 54 168 48 Q148 40 148 14Z" fill="url(#fE)"/><line x1="148" y1="14" x2="168" y2="48" stroke="#14380A" strokeWidth="0.80" opacity="0.52"/><line x1="168" y1="48" x2="162" y2="58" stroke="#14380A" strokeWidth="0.50" opacity="0.33"/><line x1="168" y1="48" x2="178" y2="56" stroke="#14380A" strokeWidth="0.50" opacity="0.33"/></g>
      <g filter="url(#lsh)"><path d="M200 16 Q228 2 250 14 Q262 30 252 46 Q240 56 220 50 Q200 42 200 16Z" fill="url(#fF)"/><line x1="200" y1="16" x2="220" y2="50" stroke="#14380A" strokeWidth="0.78" opacity="0.50"/></g>
      <g filter="url(#lsh)"><path d="M252 12 Q280 -2 302 10 Q314 26 304 42 Q292 52 272 46 Q252 38 252 12Z" fill="url(#fG)"/><line x1="252" y1="12" x2="272" y2="46" stroke="#14380A" strokeWidth="0.78" opacity="0.50"/><line x1="272" y1="46" x2="266" y2="56" stroke="#14380A" strokeWidth="0.48" opacity="0.32"/><line x1="272" y1="46" x2="282" y2="54" stroke="#14380A" strokeWidth="0.48" opacity="0.32"/></g>
      <g filter="url(#lsh)"><path d="M308 14 Q334 0 356 12 Q366 28 356 44 Q344 54 324 48 Q306 40 308 14Z" fill="url(#fH)"/><line x1="308" y1="14" x2="324" y2="48" stroke="#14380A" strokeWidth="0.76" opacity="0.48"/></g>
      <g filter="url(#lsh)"><path d="M344 -12 Q370 -26 390 -14 Q400 2 390 18 Q378 28 360 22 Q342 14 344 -12Z" fill="url(#fA)"/><line x1="344" y1="-12" x2="360" y2="22" stroke="#14380A" strokeWidth="0.78" opacity="0.50"/></g>
      {/* BOTTOM FOLIAGE */}
      <ellipse cx="35" cy="840" rx="66" ry="28" fill="#6AAA30" opacity="0.45"/>
      <ellipse cx="5" cy="844" rx="44" ry="20" fill="#88C448" opacity="0.40"/>
      <ellipse cx="82" cy="844" rx="54" ry="23" fill="#5A9820" opacity="0.42"/>
      <ellipse cx="355" cy="840" rx="66" ry="28" fill="#6AAA30" opacity="0.45"/>
      <ellipse cx="385" cy="844" rx="44" ry="20" fill="#88C448" opacity="0.40"/>
      <ellipse cx="308" cy="844" rx="54" ry="23" fill="#5A9820" opacity="0.42"/>
      <ellipse cx="195" cy="844" rx="30" ry="12" fill="#6AAA30" opacity="0.30"/>
      <rect width="390" height="844" fill="url(#gVig)"/>
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
    <div style={{ background:"rgba(255,255,255,0.90)", borderRadius:16, padding:"14px", boxShadow:"0 2px 12px rgba(45,10,94,0.09)", border:`1.5px solid ${C.ll}`, ...style }}>
      {children}
    </div>
  );
}

function PurpleBtn({ children, onClick, style={}, small=false }) {
  return (
    <button onClick={onClick} style={{ background:btnGrad, color:C.wh, border:"none", borderRadius:small?8:12, padding:small?"5px 12px":"10px 20px", fontWeight:800, fontSize:small?13:15, cursor:"pointer", boxShadow:"0 3px 12px rgba(45,10,94,0.25)", ...style }}>
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
          style={{background:C.pp,color:C.wh,border:"none",borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:800,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
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
  {id:"purple",fill:"#9b59b6",border:"#7d3c98",num:"#7d3c98"},
  {id:"rose",  fill:"#e91e8c",border:"#c2185b",num:"#c2185b"},
  {id:"red",   fill:"#FF1744",border:"#D50000",num:"#D50000"},
  {id:"orange",fill:"#e67e22",border:"#ca6f1e",num:"#ca6f1e"},
  {id:"amber", fill:"#f39c12",border:"#d68910",num:"#b7770d"},
  {id:"green", fill:"#27ae60",border:"#1e8449",num:"#1e8449"},
  {id:"teal",  fill:"#1abc9c",border:"#148f77",num:"#148f77"},
  {id:"blue",  fill:"#2980b9",border:"#1a5276",num:"#1a5276"},
  {id:"lilac", fill:"#c4aee8",border:"#9b7dd4",num:"#7c5cbf"},
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
        <div style={{position:"absolute",top:"50%",left:0,right:0,height:40,transform:"translateY(-50%)",background:"rgba(196,174,232,0.2)",borderRadius:10,border:"1px solid rgba(196,174,232,0.4)",pointerEvents:"none",zIndex:1}}/>
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
    <div style={{background:bg,backdropFilter:glass?"blur(8px)":"none",border,borderRadius:18,padding:"13px 14px",boxShadow:glass?"0 4px 20px rgba(45,10,94,0.18)":"none"}}>
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
          <button onClick={stop} style={{background:accentText,color:C.wh,border:"none",borderRadius:12,width:46,height:46,fontSize:18,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
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
          <button onClick={handleStart} disabled={totalSecs===0} style={{background:totalSecs===0?"rgba(255,255,255,0.15)":accentText,color:C.wh,border:"none",borderRadius:12,width:46,height:46,fontSize:22,cursor:totalSecs===0?"default":"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",opacity:totalSecs===0?0.4:1}}>▶</button>
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
    <div ref={ref} style={{position:"absolute",zIndex:200,top:22,left:-4,background:C.wh,borderRadius:16,padding:"10px 8px",boxShadow:"0 8px 32px rgba(45,10,94,0.28)",border:`1.5px solid ${C.ll}`,display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
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
    <div style={{background:task.done?"rgba(255,255,255,0.50)":"rgba(255,255,255,0.90)",border:`2px solid ${task.done?C.done:sw.border}`,borderLeft:`5px solid ${task.done?C.done:sw.fill}`,borderRadius:16,padding:"12px 12px 12px 10px",marginBottom:10,opacity:task.done?0.65:1,transition:"all 0.2s",boxShadow:"0 2px 12px rgba(45,10,94,0.09)",position:"relative"}}>

      {/* Main row */}
      <div style={{display:"flex",alignItems:"flex-start",gap:9,marginBottom:8}}>
        {/* Index */}
        <div style={{minWidth:28,height:28,borderRadius:"50%",background:task.done?C.done:sw.num,color:C.wh,fontWeight:800,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{index+1}</div>
        <div style={{display:"flex",flexDirection:"column",gap:2,flexShrink:0}}>
          <button onClick={e=>{e.stopPropagation();onMoveUp&&onMoveUp();}} disabled={isFirst} style={{background:isFirst?"transparent":"rgba(124,92,191,0.15)",color:isFirst?"rgba(124,92,191,0.2)":C.pp,border:"none",borderRadius:5,width:22,height:16,cursor:isFirst?"default":"pointer",fontSize:9,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",padding:0,lineHeight:1}}>▲</button>
          <button onClick={e=>{e.stopPropagation();onMoveDown&&onMoveDown();}} disabled={isLast} style={{background:isLast?"transparent":"rgba(124,92,191,0.15)",color:isLast?"rgba(124,92,191,0.2)":C.pp,border:"none",borderRadius:5,width:22,height:16,cursor:isLast?"default":"pointer",fontSize:9,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",padding:0,lineHeight:1}}>▼</button>
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
            <button onClick={addSub} style={{background:btnGrad,color:C.wh,border:"none",borderRadius:8,padding:"6px 12px",fontWeight:800,fontSize:13,cursor:"pointer"}}>+</button>
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
          <div style={{background:C.wh,borderRadius:"20px 20px 0 0",width:"100%",maxWidth:480,boxShadow:"0 -8px 32px rgba(45,10,94,0.35)",paddingBottom:34}} onClick={e=>e.stopPropagation()}>
            {/* Drag handle */}
            <div style={{display:"flex",justifyContent:"center",paddingTop:10,paddingBottom:4}}>
              <div style={{width:40,height:4,borderRadius:2,background:C.ll}}/>
            </div>
            {/* Header — back button LEFT, task name centre, close RIGHT */}
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"6px 12px 10px",borderBottom:`2px solid ${C.ll}`}}>
              <button onClick={()=>setMenuOpen(false)}
                style={{background:C.pp,color:C.wh,border:"none",borderRadius:10,width:40,height:40,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:900,boxShadow:"0 2px 8px rgba(45,10,94,0.25)"}}>←</button>
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
    <div style={{minHeight:"100vh",background:"#F3EAD8",display:"flex",flexDirection:"column",alignItems:"center",fontFamily:"'Segoe UI',sans-serif",paddingBottom:40}}>

      {/* Header */}
      <div style={{width:"100%",background:"rgba(0,0,0,0.2)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
        <button onClick={()=>onDone([...pending].sort((a,b)=>(scores[b.id]||0)-(scores[a.id]||0)))}
          style={{background:"rgba(255,255,255,0.15)",color:C.wh,border:"none",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
        <div style={{flex:1,color:C.wh,fontWeight:800,fontSize:16}}>Prioritizer</div>
        <div style={{color:"rgba(255,255,255,0.55)",fontSize:13,fontWeight:600}}>{idx+1} / {pairs.length}</div>
      </div>

      {/* Progress bar */}
      <div style={{width:"100%",height:4,background:"rgba(255,255,255,0.1)"}}>
        <div style={{height:"100%",width:`${pct}%`,background:C.lp,transition:"width 0.3s"}}/>
      </div>

      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 20px",width:"100%",maxWidth:480,gap:0}}>

        {/* Question */}
        <div style={{fontSize:22,fontWeight:900,color:C.wh,marginBottom:32,textAlign:"center",lineHeight:1.3}}>
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
    <div style={{position:"sticky",top:0,zIndex:50,background:`linear-gradient(135deg,${C.dp},${C.mp})`,display:"flex",alignItems:"center",gap:10,padding:"10px 14px",boxShadow:"0 2px 12px rgba(45,10,94,0.35)",flexShrink:0}}>
      {onBack&&<button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>←</button>}
      <span style={{flex:1,color:C.wh,fontWeight:800,fontSize:16,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{title}</span>
      <button onClick={()=>setScreen&&setScreen("home")} style={{background:"rgba(255,255,255,0.18)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:10,padding:"7px 13px",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
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
  if(comparing) return <PriCompare tasks={list.tasks} onDone={onPriDone}/>;
  const active=list.tasks.filter(t=>!t.done);
  const done=list.tasks.filter(t=>t.done);
  return (
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif"}}>
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
        {active.map((task,i)=>(
          <div key={task.id}>
            {i===0&&active.length>0&&(
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <div style={{height:1,flex:1,background:"rgba(255,80,80,0.35)"}}/>
                <span style={{fontSize:10,fontWeight:800,color:"#FF4444",letterSpacing:1.5,textTransform:"uppercase"}}>🔴 Top 3 — Most Important</span>
                <div style={{height:1,flex:1,background:"rgba(255,80,80,0.35)"}}/>
              </div>
            )}
            {i===3&&(
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,marginTop:4}}>
                <div style={{height:1,flex:1,background:"rgba(255,255,255,0.15)"}}/>
                <span style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:1.2,textTransform:"uppercase"}}>Other Tasks</span>
                <div style={{height:1,flex:1,background:"rgba(255,255,255,0.15)"}}/>
              </div>
            )}
            <PriTaskRow task={task} index={i} onDelete={deleteTask} onComplete={completeTask} onColorChange={colorTask} onAddSub={addSubItems} lists={[]} onPrioritizeThis={()=>setComparing(true)} onSendTo={sendTaskTo} onMoveUp={()=>moveTask(task.id,-1)} onMoveDown={()=>moveTask(task.id,1)} isFirst={i===0} isLast={i===active.length-1} setScreen={setScreen}/>)
          </div>
        ))}
        {done.length>0&&<><div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:1.5,margin:"16px 0 8px"}}>✓ Completed</div>{done.map((task,i)=>(<PriTaskRow key={task.id} task={task} index={i} onDelete={deleteTask} onComplete={completeTask} onColorChange={colorTask}/>))}</>}
        {active.length>1&&(
          <div style={{position:"sticky",bottom:90,left:0,right:0,padding:"12px 0 4px",background:"transparent",pointerEvents:"none"}}>
            <button onClick={()=>setComparing(true)}
              style={{width:"100%",padding:"17px",background:btnGrad,color:C.wh,border:"none",borderRadius:18,fontWeight:900,fontSize:17,cursor:"pointer",boxShadow:"0 6px 22px rgba(45,10,94,0.5)",pointerEvents:"auto",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
              <span style={{fontSize:22}}>⬆</span>
              <span>{prioritized?"✓ Re-Prioritize — sort again":"Prioritize — what's more important?"}</span>
            </button>
          </div>
        )}
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
              <g filter="url(#esh)"><path d="M28 24 Q8 8 -5 18 Q-8 32 8 38 Q22 40 28 24Z" fill="url(#eg1)"/><line x1="28" y1="24" x2="8" y2="38" stroke="#1A3A08" strokeWidth="0.8" opacity="0.6"/><line x1="18" y1="31" x2="12" y2="38" stroke="#1A3A08" strokeWidth="0.5" opacity="0.4"/><line x1="18" y1="31" x2="22" y2="37" stroke="#1A3A08" strokeWidth="0.5" opacity="0.4"/></g>
              <g filter="url(#esh)"><path d="M32 46 Q12 34 0 44 Q-3 58 14 62 Q28 63 32 46Z" fill="url(#eg2)"/><line x1="32" y1="46" x2="14" y2="62" stroke="#1A3A08" strokeWidth="0.8" opacity="0.58"/></g>
              <g filter="url(#esh)"><path d="M30 74 Q10 62 -2 72 Q-5 86 12 90 Q26 91 30 74Z" fill="url(#eg3)"/><line x1="30" y1="74" x2="12" y2="90" stroke="#1A3A08" strokeWidth="0.75" opacity="0.55"/></g>
              <g filter="url(#esh)"><path d="M34 100 Q14 88 2 98 Q-1 112 16 116 Q30 117 34 100Z" fill="url(#eg1)"/><line x1="34" y1="100" x2="16" y2="116" stroke="#1A3A08" strokeWidth="0.75" opacity="0.52"/></g>
              <g filter="url(#esh)"><path d="M32 128 Q12 116 0 126 Q-3 140 14 144 Q28 145 32 128Z" fill="url(#eg2)"/></g>
              {/* Right big leaves */}
              <g filter="url(#esh)"><path d="M192 24 Q212 8 225 18 Q228 32 212 38 Q198 40 192 24Z" fill="url(#eg1)"/><line x1="192" y1="24" x2="212" y2="38" stroke="#1A3A08" strokeWidth="0.8" opacity="0.6"/><line x1="202" y1="31" x2="208" y2="38" stroke="#1A3A08" strokeWidth="0.5" opacity="0.4"/><line x1="202" y1="31" x2="198" y2="37" stroke="#1A3A08" strokeWidth="0.5" opacity="0.4"/></g>
              <g filter="url(#esh)"><path d="M188 46 Q208 34 220 44 Q223 58 206 62 Q192 63 188 46Z" fill="url(#eg2)"/><line x1="188" y1="46" x2="206" y2="62" stroke="#1A3A08" strokeWidth="0.8" opacity="0.58"/></g>
              <g filter="url(#esh)"><path d="M190 74 Q210 62 222 72 Q225 86 208 90 Q194 91 190 74Z" fill="url(#eg3)"/><line x1="190" y1="74" x2="208" y2="90" stroke="#1A3A08" strokeWidth="0.75" opacity="0.55"/></g>
              <g filter="url(#esh)"><path d="M186 100 Q206 88 218 98 Q221 112 204 116 Q190 117 186 100Z" fill="url(#eg1)"/><line x1="186" y1="100" x2="204" y2="116" stroke="#1A3A08" strokeWidth="0.75" opacity="0.52"/></g>
              <g filter="url(#esh)"><path d="M188 128 Q208 116 220 126 Q223 140 206 144 Q192 145 188 128Z" fill="url(#eg2)"/></g>
              {/* Top arch leaves */}
              <g filter="url(#esh)"><path d="M55 52 Q48 32 60 22 Q72 15 80 28 Q84 40 72 48 Q60 52 55 52Z" fill="url(#eg3)"/><line x1="55" y1="52" x2="72" y2="48" stroke="#1A3A08" strokeWidth="0.7" opacity="0.5"/></g>
              <g filter="url(#esh)"><path d="M85 48 Q80 28 92 18 Q104 11 112 24 Q116 36 104 44 Q92 48 85 48Z" fill="url(#eg1)"/><line x1="85" y1="48" x2="104" y2="44" stroke="#1A3A08" strokeWidth="0.7" opacity="0.5"/></g>
              <g filter="url(#esh)"><path d="M118 48 Q115 28 128 18 Q140 12 148 25 Q151 37 140 45 Q128 49 118 48Z" fill="url(#eg2)"/><line x1="118" y1="48" x2="140" y2="45" stroke="#1A3A08" strokeWidth="0.7" opacity="0.5"/></g>
              <g filter="url(#esh)"><path d="M150 52 Q148 32 160 22 Q172 15 178 28 Q180 42 168 50 Q156 54 150 52Z" fill="url(#eg3)"/><line x1="150" y1="52" x2="168" y2="50" stroke="#1A3A08" strokeWidth="0.7" opacity="0.5"/></g>
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
const NODE_COLORS=["#9b59b6","#c2185b","#e67e22","#27ae60","#2980b9","#1abc9c","#e74c3c","#f39c12","#8e44ad","#16a085"];
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
              <g filter="url(#mgs)"><path d="M14 30 Q-4 16 -12 26 Q-14 40 2 46 Q14 48 14 30Z" fill="url(#mg1)"/><line x1="14" y1="30" x2="2" y2="46" stroke="#1A3A08" strokeWidth="0.8" opacity="0.6"/><line x1="8" y1="38" x2="2" y2="46" stroke="#1A3A08" strokeWidth="0.5" opacity="0.4"/><line x1="8" y1="38" x2="14" y2="44" stroke="#1A3A08" strokeWidth="0.5" opacity="0.4"/></g>
              <g filter="url(#mgs)"><path d="M16 62 Q-2 50 -10 60 Q-12 74 4 80 Q16 81 16 62Z" fill="url(#mg2)"/><line x1="16" y1="62" x2="4" y2="80" stroke="#1A3A08" strokeWidth="0.75" opacity="0.55"/></g>
              <g filter="url(#mgs)"><path d="M14 96 Q-4 84 -12 94 Q-14 108 2 114 Q14 115 14 96Z" fill="url(#mg3)"/><line x1="14" y1="96" x2="2" y2="114" stroke="#1A3A08" strokeWidth="0.72" opacity="0.52"/></g>
              <g filter="url(#mgs)"><path d="M18 130 Q0 118 -8 128 Q-10 142 6 148 Q18 149 18 130Z" fill="url(#mg1)"/><line x1="18" y1="130" x2="6" y2="148" stroke="#1A3A08" strokeWidth="0.7" opacity="0.5"/></g>
              <g filter="url(#mgs)"><path d="M16 160 Q-2 148 -10 158 Q-12 172 4 178 Q16 179 16 160Z" fill="url(#mg2)"/></g>

              {/* Right leaves */}
              <g filter="url(#mgs)"><path d="M226 30 Q244 16 252 26 Q254 40 238 46 Q226 48 226 30Z" fill="url(#mg1)"/><line x1="226" y1="30" x2="238" y2="46" stroke="#1A3A08" strokeWidth="0.8" opacity="0.6"/><line x1="232" y1="38" x2="238" y2="46" stroke="#1A3A08" strokeWidth="0.5" opacity="0.4"/><line x1="232" y1="38" x2="226" y2="44" stroke="#1A3A08" strokeWidth="0.5" opacity="0.4"/></g>
              <g filter="url(#mgs)"><path d="M224 62 Q242 50 250 60 Q252 74 236 80 Q224 81 224 62Z" fill="url(#mg2)"/><line x1="224" y1="62" x2="236" y2="80" stroke="#1A3A08" strokeWidth="0.75" opacity="0.55"/></g>
              <g filter="url(#mgs)"><path d="M226 96 Q244 84 252 94 Q254 108 238 114 Q226 115 226 96Z" fill="url(#mg3)"/><line x1="226" y1="96" x2="238" y2="114" stroke="#1A3A08" strokeWidth="0.72" opacity="0.52"/></g>
              <g filter="url(#mgs)"><path d="M222 130 Q240 118 248 128 Q250 142 234 148 Q222 149 222 130Z" fill="url(#mg1)"/><line x1="222" y1="130" x2="234" y2="148" stroke="#1A3A08" strokeWidth="0.7" opacity="0.5"/></g>
              <g filter="url(#mgs)"><path d="M224 160 Q242 148 250 158 Q252 172 236 178 Q224 179 224 160Z" fill="url(#mg2)"/></g>

              {/* Top arch */}
              <path d="M18 12 Q60 -10 120 -8 Q180 -10 222 12" stroke="#8A7040" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8"/>
              <g filter="url(#mgs)"><path d="M55 4 Q50 -14 64 -20 Q78 -18 80 -2 Q78 10 66 10 Q55 8 55 4Z" fill="url(#mg3)"/><line x1="55" y1="4" x2="66" y2="10" stroke="#1A3A08" strokeWidth="0.7" opacity="0.5"/></g>
              <g filter="url(#mgs)"><path d="M95 -2 Q92 -20 106 -24 Q120 -22 120 -6 Q118 6 106 6 Q95 4 95 -2Z" fill="url(#mg1)"/><line x1="95" y1="-2" x2="106" y2="6" stroke="#1A3A08" strokeWidth="0.68" opacity="0.48"/></g>
              <g filter="url(#mgs)"><path d="M145 -2 Q148 -20 162 -24 Q176 -22 174 -6 Q172 6 160 6 Q147 4 145 -2Z" fill="url(#mg2)"/></g>
              <g filter="url(#mgs)"><path d="M182 4 Q186 -14 200 -20 Q214 -18 212 -2 Q210 10 198 10 Q184 8 182 4Z" fill="url(#mg3)"/></g>

              {/* Mind map nodes */}
              {/* Central node */}
              <rect x="82" y="76" width="76" height="30" rx="15" fill="url(#mgn)" filter="url(#mgs)"/>
              <text x="120" y="91" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11" fontWeight="700" style={{fontFamily:"Georgia,serif"}}>Your Ideas</text>

              {/* Branch curves with leaves */}
              <path d="M82 91 C60 91 44 68 38 60" stroke="#7A9068" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8"/>
              <ellipse cx="62" cy="78" rx="5" ry="8" fill="url(#mg2)" opacity="0.85" transform="rotate(-30 62 78)"/>
              <line x1="62" y1="83" x2="62" y2="71" stroke="#2A5010" strokeWidth="0.6" opacity="0.5"/>

              <path d="M82 84 C58 76 44 52 40 42" stroke="#7A9068" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8"/>
              <ellipse cx="60" cy="64" rx="4" ry="7" fill="url(#mg1)" opacity="0.85" transform="rotate(-40 60 64)"/>

              <path d="M158 91 C178 91 194 68 202 60" stroke="#7A9068" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8"/>
              <ellipse cx="178" cy="78" rx="5" ry="8" fill="url(#mg3)" opacity="0.85" transform="rotate(30 178 78)"/>
              <line x1="178" y1="83" x2="178" y2="71" stroke="#2A5010" strokeWidth="0.6" opacity="0.5"/>

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
    <g style={{cursor:"pointer",filter:selected?"drop-shadow(0 0 10px rgba(196,174,232,0.9))":"drop-shadow(0 4px 8px rgba(45,10,94,0.5))"}}>
      <defs>
        <radialGradient id={`rg_${id}`} cx="38%" cy="32%" r="65%">
          <stop offset="0%"   stopColor="#f0e8ff" stopOpacity="1"/>
          <stop offset="28%"  stopColor="#c4aee8" stopOpacity="0.95"/>
          <stop offset="60%"  stopColor="#7c5cbf" stopOpacity="0.92"/>
          <stop offset="85%"  stopColor="#5a3d9a" stopOpacity="0.97"/>
          <stop offset="100%" stopColor="#2d0a5e" stopOpacity="1"/>
        </radialGradient>
        <radialGradient id={`shine_${id}`} cx="32%" cy="28%" r="40%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.75)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        <radialGradient id={`glow_${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#c4aee8" stopOpacity={selected?0.6:0.2}/>
          <stop offset="100%" stopColor="#7c5cbf" stopOpacity="0"/>
        </radialGradient>
        <clipPath id={`clip_${id}`}>
          <circle cx={cx} cy={cy} r={r}/>
        </clipPath>
      </defs>

      {/* Outer glow ring */}
      <circle cx={cx} cy={cy} r={r+8} fill={`url(#glow_${id})`}/>

      {/* Pulsing selection ring */}
      {selected&&<circle cx={cx} cy={cy} r={r+5} fill="none" stroke="rgba(196,174,232,0.7)" strokeWidth={2} strokeDasharray="6,3"/>}

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
        <div style={{position:"absolute",bottom:"calc(100% + 8px)",left:0,right:0,background:C.wh,borderRadius:16,border:`1.5px solid ${C.lp}`,boxShadow:"0 -8px 32px rgba(45,10,94,0.22)",zIndex:400,maxHeight:340,overflowY:"auto"}}>
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
                        {isSel&&<span style={{color:C.wh,fontSize:12,fontWeight:900,lineHeight:1}}>✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
          <div style={{padding:"12px 14px",position:"sticky",bottom:0,background:C.wh,borderTop:`1.5px solid ${C.ll}`}}>
            <button onClick={sendAll} disabled={selected.size===0}
              style={{width:"100%",padding:"12px",background:selected.size>0?btnGrad:"#ccc",color:C.wh,border:"none",borderRadius:12,fontWeight:800,fontSize:14,cursor:selected.size>0?"pointer":"default",transition:"all 0.2s"}}>
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
  const [sentMsg,setSentMsg]=useState("");
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
          <div style={{position:"absolute",bottom:42,right:0,background:C.wh,borderRadius:14,padding:"10px 8px",boxShadow:"0 8px 28px rgba(45,10,94,0.28)",border:`1.5px solid ${C.ll}`,display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,zIndex:300}}>
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

  /* Root image upload (stored on root node) */
  const handleRootImg=(e)=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>setNodes(ns=>ns.map(n=>n.parent===null?{...n,rootImg:ev.target.result}:n));
    reader.readAsDataURL(file);
  };

  const root=nodes.find(n=>n.parent===null);

  return (
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",display:"flex",flexDirection:"column"}}>
      {/* Back button — floating top left like reference */}
      <div style={{position:"absolute",top:0,left:0,zIndex:50,padding:"16px"}}>
        <button onClick={onBack} style={{width:44,height:44,borderRadius:"50%",background:"rgba(248,245,236,0.88)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.15)",backdropFilter:"blur(8px)"}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Canvas — full bleed */}
      <div style={{flex:1,overflow:"hidden",position:"relative"}}>
        <svg ref={svgRef} width="100%" height="100%"
          style={{position:"absolute",inset:0,touchAction:"none"}}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp}
          onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
          onDoubleClick={onDblClick}>

          <defs>
            {/* Sage node fill */}
            <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7A9068"/>
              <stop offset="100%" stopColor="#5A7848"/>
            </linearGradient>
            {/* Root node fill */}
            <linearGradient id="rootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8A9E78"/>
              <stop offset="100%" stopColor="#607850"/>
            </linearGradient>
            {/* Leaf gradient */}
            <linearGradient id="leafG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A8D070"/>
              <stop offset="100%" stopColor="#5A8830"/>
            </linearGradient>
            <filter id="nodeSh" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1A2E08" floodOpacity="0.18"/>
            </filter>
          </defs>

          <rect width="100%" height="100%" fill="transparent"/>

          <g transform={`translate(${pan.x},${pan.y})`}>

            {/* ── Vine Edges — organic S-curves with small leaves ── */}
            {nodes.filter(n=>n.parent).map(n=>{
              const p=nodes.find(x=>x.id===n.parent);
              if(!p)return null;
              const isSel=n.id===selected||p.id===selected;
              const d=edgePath(p,n);
              // midpoint for leaf placement
              const x1=p.parent===null?p.x+55:p.x+45;
              const x2=n.x-48;
              const mx=(x1+x2)/2;
              const my=(p.y+n.y)/2;
              return(
                <g key={`e${n.id}`}>
                  <path d={d} fill="none"
                    stroke={isSel?"#5A7848":"#7A9068"}
                    strokeWidth={isSel?2.5:2} strokeLinecap="round"
                    opacity={isSel?1:0.75}
                  />
                  {/* Small leaf on branch mid-point */}
                  <g transform={`translate(${mx},${my})`}>
                    <ellipse cx="0" cy="-7" rx="5" ry="9" fill="url(#leafG)" opacity="0.85" transform="rotate(-20)"/>
                    <line x1="0" y1="-2" x2="0" y2="-13" stroke="#2A5010" strokeWidth="0.7" opacity="0.6"/>
                    <ellipse cx="8" cy="-3" rx="4" ry="7" fill="url(#leafG)" opacity="0.75" transform="rotate(15)"/>
                  </g>
                </g>
              );
            })}

            {/* ── Root node — larger rounded pill ── */}
            {root&&(()=>{
              const isSel=root.id===selected;
              const rx=root.x, ry=root.y;
              const W=root.text.length>14?160:140, H=46;
              return(
                <g key={root.id} style={{cursor:"pointer"}}
                  onClick={()=>{if(selected===root.id){spawnChild(root.id);}else setSelected(root.id);}}
                  onDoubleClick={()=>{setEditingId(root.id);setEditText(root.text);}}>
                  {/* Shadow */}
                  <rect x={rx-W/2+2} y={ry-H/2+3} width={W} height={H} rx={H/2} fill="rgba(0,0,0,0.14)" filter="url(#nodeSh)"/>
                  {/* Root pill */}
                  <rect x={rx-W/2} y={ry-H/2} width={W} height={H} rx={H/2}
                    fill="url(#rootGrad)"
                    stroke={isSel?"rgba(255,255,255,0.8)":"rgba(255,255,255,0.3)"}
                    strokeWidth={isSel?2.5:1.5}/>
                  {/* Label */}
                  <text x={rx} y={ry} textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize={root.text.length>16?12:14} fontWeight={700}
                    style={{pointerEvents:"none",userSelect:"none"}}>
                    {root.text.length>18?root.text.slice(0,17)+"…":root.text}
                  </text>
                  {/* Small leaf accent top */}
                  <g transform={`translate(${rx},${ry-H/2-8})`}>
                    <ellipse cx="0" cy="-6" rx="4" ry="7" fill="url(#leafG)" opacity="0.9" transform="rotate(-10)"/>
                    <ellipse cx="6" cy="-4" rx="3" ry="5" fill="url(#leafG)" opacity="0.75" transform="rotate(20)"/>
                    <line x1="0" y1="0" x2="0" y2="-12" stroke="#2A5010" strokeWidth="0.8" opacity="0.6"/>
                  </g>
                </g>
              );
            })()}

            {/* ── Branch nodes — sage rounded pills ── */}
            {nodes.filter(n=>n.parent!==null).map(n=>{
              const isSel=n.id===selected;
              const W=n.text.length>12?140:116, H=38;
              const hasIcon=n.icon;
              return(
                <g key={n.id} style={{cursor:"pointer"}}
                  onClick={()=>{if(selected===n.id){spawnChild(n.id);}else setSelected(n.id);}}
                  onDoubleClick={()=>{setEditingId(n.id);setEditText(n.text);}}
                  onContextMenu={e=>{e.preventDefault();setDeleteConfirmId(n.id);}}>
                  {/* Shadow */}
                  <rect x={n.x-W/2+1} y={n.y-H/2+2} width={W} height={H} rx={H/2} fill="rgba(0,0,0,0.12)" filter="url(#nodeSh)"/>
                  {/* Pill */}
                  <rect x={n.x-W/2} y={n.y-H/2} width={W} height={H} rx={H/2}
                    fill={isSel?"url(#nodeGrad)":"rgba(248,245,236,0.88)"}
                    stroke={isSel?"rgba(255,255,255,0.7)":"rgba(90,120,72,0.35)"}
                    strokeWidth={1.5}/>
                  {/* Icon circle if node has icon */}
                  {hasIcon&&(
                    <>
                      <circle cx={n.x-W/2+20} cy={n.y} r={14}
                        fill={isSel?"rgba(255,255,255,0.2)":"rgba(248,245,236,0.95)"}
                        stroke={isSel?"rgba(255,255,255,0.4)":"rgba(90,120,72,0.2)"} strokeWidth={1}/>
                      <text x={n.x-W/2+20} y={n.y} textAnchor="middle" dominantBaseline="middle"
                        fontSize={12} style={{pointerEvents:"none",userSelect:"none"}}>{n.icon}</text>
                    </>
                  )}
                  {/* Label */}
                  <text
                    x={hasIcon?n.x+10:n.x} y={n.y}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={isSel?"white":"#1A2E10"} fontSize={12} fontWeight={600}
                    style={{pointerEvents:"none",userSelect:"none"}}>
                    {n.text.length>14?n.text.slice(0,13)+"…":n.text}
                  </text>
                  {/* Link icon if has url */}
                  {n.url&&(
                    <text x={n.x+W/2-14} y={n.y} textAnchor="middle" dominantBaseline="middle"
                      fontSize={10} style={{pointerEvents:"none"}}>🔗</text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {nodes.length===1&&!selected&&(
          <div style={{position:"absolute",top:"58%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",color:"rgba(90,80,60,0.55)",fontSize:14,pointerEvents:"none",fontFamily:"Georgia,serif",lineHeight:1.6}}>
            Tap the central node<br/>to add your first branch
          </div>
        )}
      </div>

      {/* ── Bottom toolbar — matching reference ── */}
      <div style={{
        padding:"12px 12px 28px",
        display:"flex",gap:8,alignItems:"center",
        background:"rgba(240,236,224,0.88)",
        backdropFilter:"blur(20px)",
        WebkitBackdropFilter:"blur(20px)",
        borderTop:"1px solid rgba(255,255,255,0.6)",
        boxShadow:"0 -2px 16px rgba(0,0,0,0.06)",
        overflowX:"auto",
        scrollbarWidth:"none",
        flexShrink:0,
      }}>
        <style>{`.mmbar::-webkit-scrollbar{display:none}`}</style>
        {/* + Add Node */}
        <button onClick={()=>{if(selected)spawnChild(selected);else if(root)spawnChild(root.id);}}
          style={{
            background:"#5A7848",color:"white",
            border:"none",borderRadius:100,
            padding:"11px 18px",
            fontSize:14,fontWeight:700,cursor:"pointer",
            display:"flex",alignItems:"center",gap:7,
            whiteSpace:"nowrap",flexShrink:0,
            boxShadow:"0 2px 10px rgba(58,80,38,0.28)",
          }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/></svg>
          Add Node
        </button>
        {/* Attach */}
        <button onClick={()=>{if(editingId||selected){setEditingId(selected||editingId);setEditText(nodes.find(n=>n.id===(selected||editingId))?.text||"");}}}
          style={{background:"rgba(248,245,236,0.9)",color:"#3A3020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"11px 18px",fontSize:14,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
          Attach
        </button>
        {/* Colors */}
        <button onClick={()=>setDarkBg(d=>!d)}
          style={{background:"rgba(248,245,236,0.9)",color:"#3A3020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"11px 18px",fontSize:14,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
          Colors
        </button>
        {/* Export */}
        <button style={{background:"rgba(248,245,236,0.9)",color:"#3A3020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"11px 18px",fontSize:14,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
          Export
        </button>
        {/* Turn into Podcast Recap */}
        <button style={{background:"rgba(248,245,236,0.9)",color:"#3A3020",border:"1.5px solid rgba(90,120,72,0.2)",borderRadius:100,padding:"11px 16px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,lineHeight:1.3,textAlign:"center"}}>
          Turn into<br/>Podcast Recap
        </button>
      </div>

      {/* Long press delete confirm */}
      {deleteConfirmId&&(()=>{
        const delNode=nodes.find(n=>n.id===deleteConfirmId);
        if(!delNode)return null;
        return(
          <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(10,2,30,0.75)",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
            <div style={{background:C.wh,borderRadius:20,padding:"24px 20px",width:"100%",maxWidth:360,textAlign:"center",boxShadow:"0 8px 40px rgba(45,10,94,0.5)"}}>
              <div style={{fontSize:36,marginBottom:12}}>🗑</div>
              <div style={{fontWeight:900,color:C.dp,fontSize:17,marginBottom:8}}>Delete this node?</div>
              <div style={{color:C.soft,fontSize:14,marginBottom:20,lineHeight:1.5}}>"{delNode.text}" and all its children will be removed.</div>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setDeleteConfirmId(null)} style={{flex:1,background:C.ll,color:C.mp,border:`1.5px solid ${C.lp}`,borderRadius:12,padding:"12px",fontWeight:800,fontSize:14,cursor:"pointer"}}>← Keep</button>
                <button onClick={()=>{
                  // Delete node and all descendants
                  const toDelete=new Set();
                  const collect=(id)=>{toDelete.add(id);nodes.filter(n=>n.parent===id).forEach(n=>collect(n.id));};
                  collect(deleteConfirmId);
                  setNodes(ns=>ns.filter(n=>!toDelete.has(n.id)));
                  setDeleteConfirmId(null);
                }} style={{flex:1,background:"#e74c3c",color:C.wh,border:"none",borderRadius:12,padding:"12px",fontWeight:800,fontSize:14,cursor:"pointer"}}>Delete</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Node panel — full detail sheet like the screenshot */}
      {editingId&&(()=>{
        const node=nodes.find(n=>n.id===editingId);
        if(!node)return null;
        const isRoot=node.parent===null;
        const updateColor=(col,i)=>setNodes(ns=>ns.map(n=>n.id===editingId?{...n,color:col,lightColor:BRANCH_COLORS[i]}:n));
        const patchNode=ch=>setNodes(ns=>ns.map(n=>n.id===editingId?{...n,...ch}:n));

        /* Cover image */
        const handleCover=(e)=>{
          const file=e.target.files[0];if(!file)return;
          const r=new FileReader();r.onload=ev=>patchNode({cover:ev.target.result});r.readAsDataURL(file);
        };

        /* Named links */
        const links=node.links||[];
        const addLink=()=>patchNode({links:[...links,{id:Date.now(),label:"",url:""}]});
        const patchLink=(id,ch)=>patchNode({links:links.map(l=>l.id===id?{...l,...ch}:l)});
        const delLink=id=>patchNode({links:links.filter(l=>l.id!==id)});

        /* Image attachments */
        const images=node.images||[];
        const handleImg=(e)=>{
          const file=e.target.files[0];if(!file)return;
          const r=new FileReader();r.onload=ev=>patchNode({images:[...images,{id:Date.now(),src:ev.target.result}]});r.readAsDataURL(file);
        };
        const delImg=id=>patchNode({images:images.filter(img=>img.id!==id)});

        /* Send actions */
        const sendToPrioritizer=(listId)=>{
          setPriData(ls=>ls.map(l=>l.id===listId?{...l,tasks:[...l.tasks,{id:Date.now(),name:node.text,done:false,color:"lilac",url:""}]}:l));
          setSentMsg("✅ Added to Prioritizer!");setTimeout(()=>setSentMsg(""),2000);
        };
        const plantAsGoal=(horizon)=>{
    if(!setGoalsData)return;
    const days={"week":7,"month1":30,"month6":180,"year1":365,"year3":1095,"year5":1825};
    const due=new Date();due.setDate(due.getDate()+(days[horizon]||365));
    const newGoal={id:Date.now(),horizon:horizon==="month1"?"month6":horizon,title:idea.text,description:idea.ramble||"",dueDate:due.toISOString().slice(0,10),cover:idea.cover||null,links:[],subtasks:(idea.steps||[]).map(s=>({id:Date.now()+Math.random(),text:s.text,done:s.done,microSteps:[],microExpanded:false})),status:"active",created:Date.now()};
    setGoalsData(gs=>[...gs,newGoal]);
    showToast("🌱 Planted as Goal!");
  };
  const sendToIdeas=()=>{
          setIdeasData(ds=>[{id:Date.now(),text:node.text,ramble:node.note||"",tag:"💡 Idea",status:"spark",collection:"",url:"",pinned:false,votes:0,links:[],steps:[],created:Date.now()},...ds]);
          setSentMsg("✅ Sent to Ideas!");setTimeout(()=>setSentMsg(""),2000);
        };
        const addToCalendar=()=>window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(node.text)}`,"_blank");

        const accentCol=isRoot?C.pp:(node.color||NODE_COLORS[0]);

        return (
          <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}
            onClick={e=>{if(e.target===e.currentTarget)setEditingId(null);}}>
            <div style={{position:"absolute",inset:0,background:"rgba(10,2,30,0.65)"}} onClick={()=>setEditingId(null)}/>

            <div style={{position:"relative",background:C.wh,borderRadius:"22px 22px 0 0",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 -8px 40px rgba(45,10,94,0.55)"}}>
              {/* Drag handle */}
              <div style={{display:"flex",justifyContent:"center",padding:"10px 0 6px"}}><div style={{width:40,height:4,borderRadius:2,background:C.ll}}/></div>

              {/* ── Cover photo area ── */}
              <div style={{position:"relative",height:node.cover?180:90,background:node.cover?"transparent":`linear-gradient(135deg,${accentCol},${C.dp})`,borderRadius:"22px 22px 0 0",overflow:"hidden",flexShrink:0}}>
                {node.cover&&<img src={node.cover} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>}
                {!node.cover&&(
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",gap:8}}>
                    <span style={{fontSize:32,opacity:0.4}}>📸</span>
                    <span style={{color:"rgba(255,255,255,0.5)",fontSize:13,fontWeight:700}}>Add cover photo</span>
                  </div>
                )}
                {/* Back button top-left */}
                <button onClick={()=>setEditingId(null)} style={{position:"absolute",top:10,left:10,background:"rgba(0,0,0,0.45)",color:C.wh,border:"none",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,zIndex:10}}>←</button>
                {/* Overlay buttons */}
                <div style={{position:"absolute",top:10,right:10,display:"flex",gap:8}}>
                  <label style={{background:"rgba(0,0,0,0.45)",color:C.wh,borderRadius:20,padding:"5px 12px",fontSize:12,fontWeight:700,cursor:"pointer",backdropFilter:"blur(4px)"}}>
                    📸 {node.cover?"Change":"Add photo"}
                    <input type="file" accept="image/*" style={{display:"none"}} onChange={handleCover}/>
                  </label>
                  {node.cover&&<button onClick={()=>patchNode({cover:null})} style={{background:"rgba(192,57,43,0.7)",color:C.wh,border:"none",borderRadius:20,padding:"5px 10px",fontSize:12,fontWeight:700,cursor:"pointer"}}>✕</button>}
                </div>
                {/* Drag handle */}
                <div style={{position:"absolute",top:8,left:"50%",transform:"translateX(-50%)",width:36,height:4,borderRadius:2,background:"rgba(255,255,255,0.4)"}}/>
              </div>

              <div style={{padding:"16px 18px 30px"}}>

                {/* ── Title + colour dot ── */}
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                  <input value={editText} onChange={e=>setEditText(e.target.value)}
                    onKeyDown={e=>{if(e.key==="Enter")commitEdit();}}
                    autoFocus
                    placeholder="Topic title…"
                    style={{flex:1,padding:"10px 14px",borderRadius:11,border:`2px solid ${C.lp}`,fontSize:16,fontWeight:700,color:C.txt,outline:"none"}}/>
                  {!isRoot&&(
                    <NodeColourDot color={node.color||NODE_COLORS[0]} onSelect={(col,i)=>updateColor(col,i)}/>
                  )}
                </div>

                {/* ── Description / Notes ── */}
                <div style={{display:"flex",gap:10,marginBottom:16,alignItems:"flex-start"}}>
                  <span style={{fontSize:18,marginTop:2}}>≡</span>
                  <textarea
                    value={node.note||""}
                    onChange={e=>patchNode({note:e.target.value})}
                    placeholder="Add more detailed information…"
                    rows={3}
                    style={{flex:1,padding:"10px 13px",borderRadius:11,border:`1.5px solid ${C.ll}`,fontSize:14,color:C.txt,outline:"none",resize:"none",fontFamily:"inherit",lineHeight:1.6,background:C.pale}}
                  />
                </div>

                {/* ── Links section ── */}
                <div style={{marginBottom:16}}>
                  <div style={{fontWeight:800,color:C.dp,fontSize:14,marginBottom:8}}>🔗 Links</div>
                  {links.map(lnk=>(
                    <div key={lnk.id} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center",background:C.pale,borderRadius:10,padding:"8px 10px",border:`1.5px solid ${C.ll}`}}>
                      <input value={lnk.label} onChange={e=>patchLink(lnk.id,{label:e.target.value})}
                        placeholder="Label (e.g. Instagram)"
                        style={{flex:"0 0 100px",border:"none",background:"transparent",fontSize:13,fontWeight:600,color:C.txt,outline:"none"}}/>
                      <div style={{width:1,height:20,background:C.ll,flexShrink:0}}/>
                      <input value={lnk.url} onChange={e=>patchLink(lnk.id,{url:e.target.value})}
                        placeholder="https://…"
                        style={{flex:1,border:"none",background:"transparent",fontSize:12,color:C.mid,outline:"none"}}/>
                      {lnk.url&&(
                        <button onClick={()=>window.open(lnk.url.startsWith("http")?lnk.url:"https://"+lnk.url,"_blank")}
                          style={{background:C.pp,color:C.wh,border:"none",borderRadius:7,width:26,height:26,cursor:"pointer",fontSize:11,flexShrink:0}}>↗</button>
                      )}
                      <button onClick={()=>delLink(lnk.id)} style={{background:"#fce4e4",color:"#c0392b",border:"none",borderRadius:7,width:26,height:26,cursor:"pointer",fontSize:12,flexShrink:0}}>🗑</button>
                    </div>
                  ))}
                  <button onClick={addLink} style={{width:"100%",padding:"8px",background:"transparent",border:`1.5px dashed ${C.lp}`,borderRadius:10,color:C.pp,fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add link</button>
                </div>

                {/* ── Image attachments ── */}
                <div style={{marginBottom:16}}>
                  <div style={{fontWeight:800,color:C.dp,fontSize:14,marginBottom:8}}>📎 Attachments</div>
                  {images.length>0&&(
                    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
                      {images.map(img=>(
                        <div key={img.id} style={{position:"relative"}}>
                          <img src={img.src} alt="" style={{width:80,height:80,objectFit:"cover",borderRadius:10,border:`2px solid ${C.ll}`}}/>
                          <button onClick={()=>delImg(img.id)} style={{position:"absolute",top:-6,right:-6,width:20,height:20,borderRadius:"50%",background:"#e74c3c",color:C.wh,border:"none",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <label style={{display:"flex",alignItems:"center",gap:8,padding:"9px 14px",background:C.pale,border:`1.5px dashed ${C.lp}`,borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:700,color:C.pp}}>
                    📸 Upload image
                    <input type="file" accept="image/*" style={{display:"none"}} onChange={handleImg}/>
                  </label>
                </div>

                {/* ── Send to — multi-select dropdown ── */}
                <SendToDropdown
                  node={node}
                  isRoot={isRoot}
                  priData={priData} setPriData={setPriData}
                  ideasData={ideasData} setIdeasData={setIdeasData}
                  matrixData={matrixData} setMatrixData={setMatrixData}
                  goalsData={goalsData} setGoalsData={setGoalsData}
                  addToCalendar={addToCalendar}
                  sentMsg={sentMsg} setSentMsg={setSentMsg}
                />

                {/* ── Save / Cancel / Delete ── */}
                <div style={{display:"flex",gap:10,marginBottom:8}}>
                  <button onClick={()=>setEditingId(null)} style={{flex:1,background:C.ll,color:C.mp,border:`1.5px solid ${C.lp}`,borderRadius:12,padding:"13px",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>← Back</button>
                  <button onClick={commitEdit} style={{flex:2,background:btnGrad,color:C.wh,border:"none",borderRadius:12,padding:"13px",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:"0 3px 12px rgba(45,10,94,0.3)"}}>Save</button>
                </div>
                {!isRoot&&(
                  <button onClick={()=>{
                    const toDelete=new Set();
                    const collect=(id)=>{toDelete.add(id);nodes.filter(n=>n.parent===id).forEach(n=>collect(n.id));};
                    collect(editingId);
                    setNodes(ns=>ns.filter(n=>!toDelete.has(n.id)));
                    setEditingId(null);
                  }} style={{width:"100%",padding:"12px",background:"#fce4e4",color:"#c0392b",border:"1.5px solid #f1948a",borderRadius:12,fontWeight:800,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                    🗑 Delete this node
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}
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

function mkDrawer(name,color,icon){return{id:Date.now()+Math.random(),name,color,icon,subCats:[]};}
function mkSubCat(name){return{id:Date.now()+Math.random(),name,files:[]};}
function mkFile(name,type,data){return{id:Date.now()+Math.random(),name,type,data,added:Date.now()};}

function FilingCabinet({cabinetData,setCabinetData,onBack,onHome}){
  const [view,setView]=useState("cabinet"); // cabinet | drawer | sub | preview
  const [activeDrawerId,setActiveDrawerId]=useState(null);
  const [activeSubId,setActiveSubId]=useState(null);
  const [previewFile,setPreviewFile]=useState(null);
  const [addingDrawer,setAddingDrawer]=useState(false);
  const [addingSub,setAddingSub]=useState(false);
  const [draft,setDraft]=useState({name:"",color:DRAWER_COLORS[0],icon:"📁"});
  const [draftSub,setDraftSub]=useState("");
  const [toast,setToast]=useState("");
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2200);};

  const drawers=cabinetData||[];
  const upd=fn=>setCabinetData(d=>fn(d||[]));
  const drawer=drawers.find(d=>d.id===activeDrawerId);
  const sub=drawer?.subCats.find(s=>s.id===activeSubId);
  const fmtDate=ts=>new Date(ts).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});

  const addDrawer=()=>{
    if(!draft.name.trim())return;
    upd(ds=>[...ds,mkDrawer(draft.name.trim(),draft.color,draft.icon)]);
    setDraft({name:"",color:DRAWER_COLORS[0],icon:"📁"});setAddingDrawer(false);
    showToast("🗄️ Drawer added!");
  };
  const delDrawer=id=>upd(ds=>ds.filter(d=>d.id!==id));
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
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title={sub.name} onBack={()=>setActiveSubId(null)} right={
        <div style={{display:"flex",gap:8}}>
          <button onClick={onHome} style={{background:"rgba(255,255,255,0.18)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>🏠</button>
          <label style={{background:btnGrad,color:C.wh,borderRadius:12,padding:"8px 14px",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
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
          <span style={{color:C.wh,fontWeight:700,fontSize:12}}>{sub.name}</span>
          <span style={{marginLeft:"auto",background:"rgba(255,255,255,0.15)",color:C.wh,borderRadius:20,padding:"1px 8px",fontSize:11,fontWeight:700}}>{sub.files.length} files</span>
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
      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:C.wh,borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );

  /* ── Sub-categories inside a drawer ── */
  if(drawer) return(
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title={`${drawer.icon} ${drawer.name}`} onBack={()=>setActiveDrawerId(null)} right={
        <div style={{display:"flex",gap:8}}>
          <button onClick={onHome} style={{background:"rgba(255,255,255,0.18)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>🏠</button>
          <button onClick={()=>setAddingSub(true)} style={{background:"rgba(255,255,255,0.22)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,width:42,height:42,fontSize:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
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
              style={{display:"flex",alignItems:"center",gap:12,background:"rgba(255,255,255,0.92)",borderRadius:16,padding:"14px 16px",marginBottom:10,boxShadow:"0 2px 10px rgba(45,10,94,0.08)",border:`1.5px solid ${C.ll}`,cursor:"pointer",transition:"transform 0.15s"}}
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
      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:C.wh,borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );

  /* ── Cabinet home — the drawers ── */
  return(
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title="🗄️ Filing Cabinet" onBack={onBack} right={
        <div style={{display:"flex",gap:8}}>
          <button onClick={onHome} style={{background:"rgba(255,255,255,0.18)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>🏠</button>
          <button onClick={()=>setAddingDrawer(true)} style={{background:"rgba(255,255,255,0.22)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,padding:"8px 14px",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>+ Drawer</button>
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
          <div style={{textAlign:"center",marginTop:60}}>
            <div style={{fontSize:64,marginBottom:12}}>🗄️</div>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:16,fontWeight:700,marginBottom:6}}>Your filing cabinet is empty</div>
            <div style={{color:"rgba(255,255,255,0.35)",fontSize:13,marginBottom:20}}>Tap + Drawer to add categories like Finance, Health, Work...</div>
            <button onClick={()=>setAddingDrawer(true)} style={{background:btnGrad,color:C.wh,border:"none",borderRadius:14,padding:"13px 28px",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:"0 4px 16px rgba(45,10,94,0.3)"}}>
              + Add First Drawer
            </button>
          </div>
        )}

        {/* Cabinet unit visual */}
        {drawers.length>0&&(
          <div style={{background:"linear-gradient(180deg,#3d2a1a 0%,#2a1a0a 100%)",borderRadius:16,padding:"12px 10px",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",border:"3px solid #5a3a1a",marginBottom:14}}>
            {/* Cabinet top */}
            <div style={{background:"linear-gradient(90deg,#6b4a2a,#8b6a3a,#6b4a2a)",borderRadius:"8px 8px 0 0",height:14,marginBottom:4,boxShadow:"inset 0 -2px 4px rgba(0,0,0,0.3)"}}/>

            {drawers.map((d,i)=>{
              const totalFiles=d.subCats.reduce((s,sc)=>s+sc.files.length,0);
              const isLast=i===drawers.length-1;
              return(
                <div key={d.id}>
                  {/* Drawer unit */}
                  <div style={{position:"relative",marginBottom:4}}>
                    {/* Drawer body */}
                    <div onClick={()=>setActiveDrawerId(d.id)}
                      style={{background:`linear-gradient(135deg,${d.color},${d.color})`,borderRadius:8,padding:"0",cursor:"pointer",border:`2px solid ${d.color}`,boxShadow:`inset 0 2px 4px rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.3)`,overflow:"hidden",transition:"transform 0.15s"}}
                      onMouseEnter={e=>e.currentTarget.style.transform="translateX(3px)"}
                      onMouseLeave={e=>e.currentTarget.style.transform="translateX(0)"}>
                      {/* Drawer face */}
                      <div style={{padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
                        {/* Handle */}
                        <div style={{width:36,height:14,background:"rgba(255,255,255,0.3)",borderRadius:7,border:"1px solid rgba(255,255,255,0.4)",flexShrink:0,boxShadow:"inset 0 1px 2px rgba(0,0,0,0.2)"}}/>
                        <span style={{fontSize:20,flexShrink:0}}>{d.icon}</span>
                        <div style={{flex:1}}>
                          <div style={{color:"#fff",fontWeight:900,fontSize:15,textShadow:"0 1px 2px rgba(0,0,0,0.4)"}}>{d.name}</div>
                          <div style={{color:"rgba(255,255,255,0.7)",fontSize:11,marginTop:1}}>
                            {d.subCats.length} folder{d.subCats.length!==1?"s":""} · {totalFiles} file{totalFiles!==1?"s":""}
                          </div>
                        </div>
                        <div style={{color:"rgba(255,255,255,0.6)",fontSize:18}}>›</div>
                      </div>
                      {/* Bottom shadow line */}
                      <div style={{height:3,background:"rgba(0,0,0,0.25)"}}/>
                    </div>
                    {/* Delete button */}
                    <button onClick={e=>{e.stopPropagation();delDrawer(d.id);}} style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,0.3)",color:"rgba(255,255,255,0.7)",border:"none",borderRadius:6,width:24,height:24,cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",zIndex:10}}>🗑</button>
                  </div>
                  {/* Gap between drawers */}
                  {!isLast&&<div style={{height:3,background:"rgba(0,0,0,0.4)",borderRadius:1,marginBottom:1}}/>}
                </div>
              );
            })}

            {/* Cabinet base */}
            <div style={{background:"linear-gradient(90deg,#6b4a2a,#8b6a3a,#6b4a2a)",borderRadius:"0 0 8px 8px",height:16,marginTop:4,boxShadow:"inset 0 2px 4px rgba(0,0,0,0.3)"}}/>
          </div>
        )}

        {/* Add drawer button below cabinet */}
        {drawers.length>0&&(
          <button onClick={()=>setAddingDrawer(true)} style={{width:"100%",padding:"12px",background:"rgba(255,255,255,0.1)",color:C.wh,border:`2px dashed rgba(255,255,255,0.25)`,borderRadius:14,fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <span style={{fontSize:20}}>+</span> Add Another Drawer
          </button>
        )}
      </div>

      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:C.wh,borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
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
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,
      messages:[{role:"user",content:prompts[type]}]})
  });
  const j=await res.json();
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
    {id:"flashcards",icon:"🃏",label:"Flashcards",desc:"Flip Q&A cards",col:"#7c5cbf"},
    {id:"quiz",      icon:"❓",label:"Quiz",      desc:"Test yourself",col:"#2980b9"},
    {id:"infographic",icon:"📊",label:"Infographic",desc:"Visual summary",col:"#27ae60"},
    {id:"slides",    icon:"📑",label:"Slide Deck", desc:"Key slides",  col:"#e67e22"},
  ];

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(10,2,30,0.92)",zIndex:500,display:"flex",flexDirection:"column",fontFamily:"'Segoe UI',sans-serif"}}>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#2d0a5e,#4a148c)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
        <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",color:C.wh,border:"none",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer"}}>←</button>
        <div style={{flex:1}}>
          <div style={{color:C.wh,fontWeight:900,fontSize:17}}>🎓 Study Studio</div>
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:12}}>{page.title}</div>
        </div>
        {mode&&<button onClick={()=>{setMode(null);setData(null);setError("");resetFlashcards();resetQuiz();}} style={{background:"rgba(255,255,255,0.15)",color:C.wh,border:"none",borderRadius:10,padding:"6px 12px",fontWeight:700,fontSize:12,cursor:"pointer"}}>← Back</button>}
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
                  <div style={{color:C.wh,fontWeight:800,fontSize:17,marginBottom:2}}>{t.label}</div>
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
            <div style={{color:C.wh,fontWeight:800,fontSize:18}}>Generating {mode}…</div>
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
                <span style={{background:"#27ae60",color:C.wh,borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:800}}>{known.size} known</span>
                <button onClick={resetFlashcards} style={{background:"rgba(255,255,255,0.15)",color:C.wh,border:"none",borderRadius:8,padding:"5px 10px",fontSize:12,cursor:"pointer"}}>↺ Reset</button>
              </div>
              {/* Progress bar */}
              <div style={{height:5,background:"rgba(255,255,255,0.1)",borderRadius:3,marginBottom:16,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,background:"#27ae60",borderRadius:3,transition:"width 0.4s"}}/>
              </div>
              {/* Card */}
              <div onClick={()=>setFlipped(f=>!f)}
                style={{background:flipped?"linear-gradient(135deg,#1e8449,#27ae60)":"linear-gradient(135deg,#2d0a5e,#7c5cbf)",borderRadius:22,padding:"32px 24px",minHeight:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 8px 32px rgba(45,10,94,0.4)",transition:"all 0.3s",marginBottom:16}}>
                <div style={{fontSize:11,fontWeight:800,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:1.5,marginBottom:12}}>{flipped?"ANSWER ✅":"QUESTION — tap to flip"}</div>
                <div style={{color:C.wh,fontWeight:700,fontSize:18,textAlign:"center",lineHeight:1.5}}>{flipped?card.a:card.q}</div>
              </div>
              {/* Action buttons */}
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>{setKnown(s=>{const n=new Set(s);n.add(cardIdx);return n;});setFlipped(false);if(cardIdx<data.length-1)setCardIdx(i=>i+1);}}
                  style={{flex:1,background:"#27ae60",color:C.wh,border:"none",borderRadius:14,padding:"14px",fontWeight:800,fontSize:15,cursor:"pointer"}}>
                  ✅ Got it
                </button>
                <button onClick={()=>{setFlipped(false);if(cardIdx<data.length-1)setCardIdx(i=>i+1);}}
                  style={{flex:1,background:"rgba(255,255,255,0.15)",color:C.wh,border:"none",borderRadius:14,padding:"14px",fontWeight:800,fontSize:15,cursor:"pointer"}}>
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
              <div style={{color:C.wh,fontWeight:900,fontSize:28,marginBottom:8}}>{score} / {data.length}</div>
              <div style={{color:"rgba(255,255,255,0.7)",fontSize:16,marginBottom:24}}>{score===data.length?"Perfect! 🎉":score>=data.length*0.7?"Great work!":"Keep studying!"}</div>
              <button onClick={()=>{resetQuiz();}} style={{background:btnGrad,color:C.wh,border:"none",borderRadius:14,padding:"14px 32px",fontWeight:800,fontSize:15,cursor:"pointer"}}>Try Again</button>
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
                <div style={{color:C.wh,fontWeight:700,fontSize:17,lineHeight:1.5}}>{q.question}</div>
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
                    <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,0.15)",color:C.wh,fontWeight:800,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {String.fromCharCode(65+i)}
                    </div>
                    <span style={{color:C.wh,fontWeight:600,fontSize:14,flex:1}}>{opt}</span>
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
                <div style={{color:C.wh,fontWeight:900,fontSize:22,marginBottom:4}}>{inf.title}</div>
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
                  <div style={{color:C.wh,fontWeight:900,fontSize:20,lineHeight:1.4}}>{inf.stat}</div>
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
          const slideColors=["linear-gradient(135deg,#2d0a5e,#7c5cbf)","linear-gradient(135deg,#1a5276,#2980b9)","linear-gradient(135deg,#1e8449,#27ae60)","linear-gradient(135deg,#7d1a1a,#c0392b)","linear-gradient(135deg,#4a148c,#8e44ad)"];
          return(
            <div>
              {/* Slide counter */}
              <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:12}}>
                {data.map((_,i)=>(
                  <button key={i} onClick={()=>setSlideIdx(i)} style={{width:28,height:28,borderRadius:"50%",background:i===slideIdx?C.pp:"rgba(255,255,255,0.2)",color:C.wh,border:"none",cursor:"pointer",fontWeight:800,fontSize:12}}>{i+1}</button>
                ))}
              </div>
              {/* Slide */}
              <div style={{background:slideColors[slideIdx%slideColors.length],borderRadius:22,padding:"28px 22px",minHeight:260,boxShadow:"0 8px 32px rgba(45,10,94,0.4)",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
                  <span style={{fontSize:36}}>{slide.emoji}</span>
                  <div style={{color:C.wh,fontWeight:900,fontSize:20,lineHeight:1.3,flex:1}}>{slide.title}</div>
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
                  style={{flex:1,background:"rgba(255,255,255,0.15)",color:C.wh,border:"none",borderRadius:14,padding:"13px",fontWeight:800,fontSize:15,cursor:"pointer",opacity:slideIdx===0?0.4:1}}>
                  ← Prev
                </button>
                <button onClick={()=>setSlideIdx(i=>Math.min(data.length-1,i+1))} disabled={slideIdx===data.length-1}
                  style={{flex:1,background:btnGrad,color:C.wh,border:"none",borderRadius:14,padding:"13px",fontWeight:800,fontSize:15,cursor:"pointer",opacity:slideIdx===data.length-1?0.4:1}}>
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
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",display:"flex",flexDirection:"column"}}>
      {studioOpen&&<StudyStudio page={page} onClose={()=>setStudioOpen(false)}/>}
      {/* Page editor nav bar */}
      <div style={{background:`linear-gradient(135deg,${C.dp},${C.mp})`,padding:"10px 12px",display:"flex",alignItems:"center",gap:8,boxShadow:"0 3px 16px rgba(45,10,94,0.35)",position:"sticky",top:0,zIndex:50,flexShrink:0}}>
        <button onClick={()=>setPageId(null)} style={{background:"rgba(255,255,255,0.2)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:10,width:40,height:40,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:900}}>←</button>
        <span style={{flex:1,color:C.wh,fontWeight:800,fontSize:15,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{page.title}</span>
        <button onClick={()=>{setSectionId(null);setNotesMode(null);}} style={{background:"rgba(255,255,255,0.18)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:10,padding:"7px 12px",fontWeight:800,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4,flexShrink:0}}>🏠</button>
        <button onClick={()=>setStudioOpen(true)} style={{background:"linear-gradient(135deg,#4a148c,#7c5cbf)",color:C.wh,border:"none",borderRadius:10,padding:"7px 11px",fontWeight:800,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4,flexShrink:0}}>🎓</button>
        <div style={{position:"relative"}}>
          <button onClick={()=>setSendOpen(o=>!o)} style={{background:"rgba(255,255,255,0.22)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:10,padding:"7px 11px",fontWeight:800,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
            ↗ Send to…
            </button>
          {sendOpen&&(
            <div style={{position:"absolute",top:46,right:0,background:C.wh,borderRadius:16,boxShadow:"0 8px 32px rgba(45,10,94,0.28)",border:`1.5px solid ${C.ll}`,minWidth:220,zIndex:200,overflow:"hidden"}}>
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
          style={{flex:1,minHeight:"55vh",padding:"16px",borderRadius:16,border:`1.5px solid ${C.ll}`,fontSize:15,lineHeight:1.8,color:C.txt,fontFamily:"'Segoe UI',sans-serif",resize:"none",outline:"none",background:"rgba(255,255,255,0.92)",boxShadow:"0 2px 12px rgba(45,10,94,0.09)"}}
        />
        <UrlField value={page.url||""} onChange={v=>updatePageUrl(page.id,v)} style={{marginTop:8,marginBottom:4}}/>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",marginTop:2,marginBottom:8,textAlign:"right"}}>{page.content.length} chars · auto-saved</div>
      </div>

      {/* ── OneNote-style toolbar ── */}
      <div style={{position:"sticky",bottom:90,background:"rgba(255,255,255,0.97)",borderTop:`2px solid ${C.ll}`,padding:"8px 10px",display:"flex",gap:4,alignItems:"center",boxShadow:"0 -4px 16px rgba(45,10,94,0.12)",zIndex:50,flexWrap:"wrap"}}>
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

      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:C.wh,borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(45,10,94,0.4)",zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );

  // Page list
  if(section) return (
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif"}}>
      <div style={{background:`linear-gradient(135deg,${C.dp},${C.mp})`,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,boxShadow:"0 3px 16px rgba(45,10,94,0.35)",position:"sticky",top:0,zIndex:50}}>
        <button onClick={()=>setSectionId(null)} style={{background:"rgba(255,255,255,0.2)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:10,width:40,height:40,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:900}}>←</button>
        <span style={{flex:1,color:C.wh,fontWeight:900,fontSize:17,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{section.name}</span>
        <button onClick={()=>{setSectionId(null);setNotesMode(null);}} style={{background:"rgba(255,255,255,0.18)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:10,padding:"8px 14px",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:5,flexShrink:0}}>🏠 Home</button>
        <button onClick={addPage} style={{background:"rgba(255,255,255,0.22)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,width:40,height:40,fontSize:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
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
              <div style={{color:C.wh,fontWeight:700,fontSize:16}}>{p.title}</div>
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
    <div style={{minHeight:"100vh",background:pageGrad}}>
      <Ideas data={ideasData} setData={setIdeasData} priData={priData} setPriData={setPriData} mapData={mapData} setMapData={setMapData} matrixData={matrixData} setMatrixData={setMatrixData} goalsData={goalsData} setGoalsData={setGoalsData} onBack={()=>setNotesMode(null)}/>
    </div>
  );
  if(notesMode==="filing") return <FilingCabinet cabinetData={cabinetData} setCabinetData={setCabinetData} onBack={()=>setNotesMode(null)} onHome={()=>setNotesMode(null)}/>;
  // Notes sections list (when in notes mode)
  const moveSection=(id,dir)=>{
    setData(ds=>{
      const a=[...ds];
      const i=a.findIndex(s=>s.id===id);
      const j=i+dir;
      if(j<0||j>=a.length)return ds;
      [a[i],a[j]]=[a[j],a[i]];
      return a;
    });
  };

  if(notesMode==="notes") return (
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif"}}>
      <div style={{background:`linear-gradient(135deg,${C.dp},${C.mp})`,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,boxShadow:"0 3px 16px rgba(45,10,94,0.35)",position:"sticky",top:0,zIndex:50}}>
        <button onClick={()=>setNotesMode(null)} style={{background:"rgba(255,255,255,0.2)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:10,width:40,height:40,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:900}}>←</button>
        <span style={{flex:1,color:C.wh,fontWeight:900,fontSize:17}}>📓 Notes</span>
        <button onClick={()=>setNotesMode(null)} style={{background:"rgba(255,255,255,0.18)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:10,padding:"8px 14px",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>🏠 Home</button>
        <button onClick={addSection} style={{background:"rgba(255,255,255,0.22)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,width:40,height:40,fontSize:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
      </div>
      <div style={{padding:"20px 16px"}}>
        {addingSectionForm&&(
          <div style={{background:"rgba(255,255,255,0.92)",borderRadius:16,padding:"14px 16px",marginBottom:14,border:`1.5px solid ${C.lp}`}}>
            <div style={{fontWeight:800,color:C.dp,fontSize:14,marginBottom:10}}>New section</div>
            <input autoFocus value={newSectionName} onChange={e=>setNewSectionName(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")submitSection();if(e.key==="Escape")setAddingSectionForm(false);}}
              placeholder="Section name..." style={{width:"100%",boxSizing:"border-box",padding:"10px 13px",borderRadius:10,border:`1.5px solid ${C.lp}`,fontSize:15,fontWeight:600,color:C.txt,outline:"none",marginBottom:10}}/>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button onClick={()=>{setAddingSectionForm(false);setNewSectionName('');}} style={{background:"transparent",color:C.soft,border:"none",fontWeight:700,cursor:"pointer",fontSize:14}}>Cancel</button>
              <PurpleBtn onClick={submitSection}>Create</PurpleBtn>
            </div>
          </div>
        )}
        {data.length===0&&!addingSectionForm&&<div style={{textAlign:"center",color:"rgba(255,255,255,0.55)",marginTop:80,fontSize:15}}>Tap + to create a notebook section</div>}
        {data.map((s,idx)=>(
          <div key={s.id}
            style={{display:"flex",alignItems:"center",gap:10,background:cardGlass,backdropFilter:"blur(8px)",borderRadius:18,padding:"12px 14px",marginBottom:12,border:`1px solid rgba(255,255,255,0.3)`,borderLeft:`5px solid ${s.color}`,transition:"all 0.15s"}}>
            {/* Up/down buttons */}
            <div style={{display:"flex",flexDirection:"column",gap:3,flexShrink:0}}>
              <button onClick={()=>moveSection(s.id,-1)} disabled={idx===0}
                style={{background:idx===0?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.18)",color:idx===0?"rgba(255,255,255,0.2)":C.wh,border:"none",borderRadius:7,width:26,height:22,cursor:idx===0?"default":"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,lineHeight:1}}>▲</button>
              <button onClick={()=>moveSection(s.id,1)} disabled={idx===data.length-1}
                style={{background:idx===data.length-1?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.18)",color:idx===data.length-1?"rgba(255,255,255,0.2)":C.wh,border:"none",borderRadius:7,width:26,height:22,cursor:idx===data.length-1?"default":"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,lineHeight:1}}>▼</button>
            </div>
            {/* Section card — tappable */}
            <div onClick={()=>setSectionId(s.id)} style={{display:"flex",alignItems:"center",gap:12,flex:1,cursor:"pointer"}}>
              <div style={{width:40,height:40,borderRadius:11,background:`linear-gradient(135deg,${s.color},${C.dp})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,flexShrink:0}}>📒</div>
              <div style={{flex:1}}>
                <div style={{color:C.wh,fontWeight:700,fontSize:17}}>{s.name}</div>
                <div style={{color:"rgba(255,255,255,0.45)",fontSize:13}}>{s.pages.length} page{s.pages.length!==1?"s":""}</div>
              </div>
            </div>
            <button onClick={e=>{e.stopPropagation();deleteSection(s.id);}} style={{background:"rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:9,width:32,height:32,cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );

  // Hub home screen — 4 big buttons
  const HUB_MODES=[
    {id:"notes",   icon:"📓", name:"Notes",          desc:"Sections, pages, freewriting",  grad:`linear-gradient(135deg,#1a5276,#2980b9)`, count:`${data.reduce((s,sec)=>s+sec.pages.length,0)} pages`},
    {id:"filing",  icon:"🗄️", name:"Filing Cabinet", desc:"Drawers, folders, PDFs & photos",grad:`linear-gradient(135deg,#3d1a00,#8b4a00)`, count:`${cabinetData.length} drawers`},
    {id:"ideas",   icon:"💡", name:"Ideas",          desc:"Capture sparks, plant as goals",   grad:`linear-gradient(135deg,#d68910,#e91e8c)`, count:`${(ideasData||[]).length} ideas`},
    {id:"studio",  icon:"🎓", name:"Study Studio",   desc:"Flashcards, quiz, slides — AI powered",grad:`linear-gradient(135deg,#0d3b0d,#1e8449)`, count:"Open a note first"},
  ];
  return (
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      {/* Top nav bar with home button */}
      <div style={{background:`linear-gradient(135deg,${C.dp},${C.mp})`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 4px 24px rgba(45,10,94,0.35)"}}>
        <div style={{flex:1,textAlign:"center"}}>
          <div style={{fontSize:22,fontWeight:900,color:C.wh}}>📚 The Vault</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.55)"}}>Your space for everything</div>
        </div>
        <button onClick={()=>setScreen&&setScreen("home")} style={{background:"rgba(255,255,255,0.18)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:10,padding:"7px 13px",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
          🏠 <span style={{fontSize:12}}>Home</span>
        </button>
      </div>
      <div style={{padding:"16px 14px"}}>
        {HUB_MODES.map(m=>(
          <div key={m.id}
            onClick={()=>m.id==="studio"?setNotesMode("notes"):setNotesMode(m.id)}
            style={{display:"flex",alignItems:"center",gap:16,borderRadius:20,padding:"0",marginBottom:14,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,0.25)",cursor:"pointer",transition:"transform 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
            {/* Colour sidebar */}
            <div style={{background:m.grad,width:72,alignSelf:"stretch",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,flexShrink:0}}>
              {m.icon}
            </div>
            {/* Content */}
            <div style={{flex:1,background:"rgba(255,255,255,0.92)",padding:"16px 14px 16px 4px"}}>
              <div style={{fontWeight:900,fontSize:17,color:C.dp,marginBottom:3}}>{m.name}</div>
              <div style={{fontSize:13,color:C.soft,marginBottom:4,lineHeight:1.4}}>{m.desc}</div>
              <div style={{display:"inline-block",background:C.ll,color:C.mp,fontSize:11,fontWeight:700,borderRadius:20,padding:"2px 9px"}}>{m.count}</div>
            </div>
            <div style={{background:"rgba(255,255,255,0.92)",padding:"16px 14px 16px 0",alignSelf:"stretch",display:"flex",alignItems:"center"}}>
              <span style={{color:C.soft,fontSize:20}}>›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MEAL PLANNER  — Day 1–7, each day has a label + meals list
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
        <div style={{position:"fixed",inset:0,background:"rgba(45,10,94,0.65)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200}}>
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
                <button onClick={saveMeal} style={{flex:2,background:btnGrad,color:C.wh,border:"none",borderRadius:12,padding:"12px",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:"0 3px 12px rgba(45,10,94,0.3)"}}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Label edit modal */}
      {editLabelIdx!==null&&(
        <div style={{position:"fixed",inset:0,background:"rgba(45,10,94,0.65)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200}}>
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
                <button onClick={saveLabelEdit} style={{flex:2,background:btnGrad,color:C.wh,border:"none",borderRadius:12,padding:"12px",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:"0 3px 12px rgba(45,10,94,0.3)"}}>Save</button>
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
const TAG_COLORS={"💡 Idea":"#f39c12","📱 App":"#2980b9","🎨 Creative":"#9b59b6","💰 Business":"#27ae60","🔮 Spiritual":"#8e44ad","✍️ Writing":"#c2185b","🏠 Home":"#e67e22","Other":"#7f8c8d"};
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
          <stop offset="0%" stopColor="#1a0336"/>
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
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      model:"claude-sonnet-4-20250514",max_tokens:400,
      messages:[{role:"user",content:`Break this goal into 4–6 clear, actionable steps. Return ONLY a JSON array of strings (step descriptions). No markdown, no extra text.\n\nGoal: "${goalText}"`}]
    })
  });
  const j=await res.json();
  const txt=(j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim();
  return JSON.parse(txt);
}

async function aiGenerateMicroSteps(stepText){
  const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      model:"claude-sonnet-4-20250514",max_tokens:300,
      messages:[{role:"user",content:`Break this step into 2–4 micro-tasks. Return ONLY a JSON array of strings. No markdown, no extra text.\n\nStep: "${stepText}"`}]
    })
  });
  const j=await res.json();
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
          <stop offset="0%" stopColor="#1a0336"/>
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

function Goals({data,setData,priData,setPriData,matrixData,setMatrixData,setScreen}){
  const [activeHorizon,setActiveHorizon]=useState("week");
  const [detailId,setDetailId]=useState(null);
  const h=horizonByKey(activeHorizon);

  const horizonGoals=data.filter(g=>g.horizon===activeHorizon);
  const detail=data.find(g=>g.id===detailId);

  if(detail) return(
    <GoalEditor
      goal={detail}
      onBack={()=>setDetailId(null)}
      onUpdate={u=>setData(ds=>ds.map(g=>g.id===u.id?u:g))}
      onDelete={id=>{setData(ds=>ds.filter(g=>g.id!==id));setDetailId(null);}}
      priData={priData} setPriData={setPriData}
      matrixData={matrixData} setMatrixData={setMatrixData}
    />
  );

  const addGoal=()=>{
    const g=mkGoal(activeHorizon);
    setData(ds=>[...ds,g]);
    setDetailId(g.id);
  };

  return(
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <HomeBar setScreen={setScreen} title="🎯 Goals" onBack={()=>setScreen("home")}/>

      {/* Gorgeous gradient header */}
      <div style={{background:h.grad,padding:"24px 20px 16px",boxShadow:"0 4px 24px rgba(0,0,0,0.3)"}}>
        <div style={{fontSize:36,textAlign:"center",marginBottom:4}}>{h.icon}</div>
        <div style={{color:C.wh,fontWeight:900,fontSize:22,textAlign:"center",marginBottom:2}}>Smart Goals</div>
        <div style={{color:"rgba(255,255,255,0.7)",fontSize:13,textAlign:"center"}}>{h.question}</div>
      </div>

      {/* Horizon tabs */}
      <div style={{display:"flex",overflowX:"auto",background:"rgba(0,0,0,0.2)",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        {GOAL_HORIZONS.map(horizon=>(
          <button key={horizon.key} onClick={()=>setActiveHorizon(horizon.key)} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"10px 14px",background:"none",border:"none",borderBottom:activeHorizon===horizon.key?`3px solid ${horizon.color}`:"3px solid transparent",cursor:"pointer",transition:"all 0.15s"}}>
            <span style={{fontSize:18}}>{horizon.icon}</span>
            <span style={{fontSize:10,fontWeight:activeHorizon===horizon.key?800:600,color:activeHorizon===horizon.key?C.wh:"rgba(255,255,255,0.5)",whiteSpace:"nowrap"}}>{horizon.label}</span>
          </button>
        ))}
      </div>

      <div style={{padding:"16px 14px"}}>
        {/* Add goal button */}
        <button onClick={addGoal} style={{width:"100%",padding:"14px",background:h.grad,color:C.wh,border:"none",borderRadius:16,fontWeight:800,fontSize:15,cursor:"pointer",marginBottom:16,boxShadow:`0 4px 18px ${h.color}`,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <span style={{fontSize:20}}>+</span> Add {h.label} Goal
        </button>

        {horizonGoals.length===0&&(
          <div style={{textAlign:"center",color:"rgba(255,255,255,0.5)",marginTop:40,fontSize:14,lineHeight:2}}>
            No {h.label.toLowerCase()} goals yet.<br/>Tap the button above to set one {h.icon}
          </div>
        )}

        {horizonGoals.map(goal=>{
          const doneCount=goal.subtasks.filter(s=>s.done).length;
          const pct=goal.subtasks.length>0?Math.round((doneCount/goal.subtasks.length)*100):0;
          return(
            <div key={goal.id} onClick={()=>setDetailId(goal.id)}
              style={{background:"rgba(255,255,255,0.92)",borderRadius:18,marginBottom:12,overflow:"hidden",boxShadow:"0 4px 16px rgba(45,10,94,0.10)",border:`1.5px solid ${C.ll}`,cursor:"pointer",transition:"transform 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>

              {/* Cover */}
              {goal.cover&&<img src={goal.cover} alt="" style={{width:"100%",height:80,objectFit:"cover"}}/>}

              {/* Progress bar */}
              {goal.subtasks.length>0&&(
                <div style={{height:4,background:C.ll}}>
                  <div style={{height:"100%",width:`${pct}%`,background:pct===100?"#27ae60":h.color,transition:"width 0.4s"}}/>
                </div>
              )}

              <div style={{padding:"12px 14px"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:900,fontSize:16,color:goal.status==="done"?C.soft:C.dp,textDecoration:goal.status==="done"?"line-through":"none",marginBottom:4,lineHeight:1.3}}>
                      {goal.title||"(No title yet — tap to edit)"}
                    </div>
                    {goal.description&&<div style={{fontSize:12,color:C.soft,lineHeight:1.4,marginBottom:4}}>{goal.description.slice(0,70)}{goal.description.length>70?"…":""}</div>}
                    <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                      {goal.dueDate&&<span style={{fontSize:11,color:C.mid,fontWeight:700}}>📅 {new Date(goal.dueDate).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>}
                      {goal.subtasks.length>0&&<span style={{fontSize:11,color:C.mid,fontWeight:700}}>{doneCount}/{goal.subtasks.length} subtasks · {pct}%</span>}
                      {goal.links.length>0&&<span style={{fontSize:11,color:C.mid}}>🔗 {goal.links.length}</span>}
                    </div>
                  </div>
                  <span style={{fontSize:26,flexShrink:0}}>{h.icon}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
  const col=pct===0?"#3d1a6e":pct<40?"#7c5cbf":pct<80?"#c4aee8":"#fff";
  return(
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{display:"block",overflow:"visible"}}>
      <defs>
        <radialGradient id="og" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor={full?"#fff":pct>50?"#e0d0ff":"#9060c0"}/>
          <stop offset="100%" stopColor={full?"#c4aee8":"#2d0a5e"}/>
        </radialGradient>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={pct>0?`rgba(196,174,232,${(pct/100)*0.35})`:"rgba(0,0,0,0)"}/>
          <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation={pct>60?5:2.5}/></filter>
      </defs>
      {pct>0&&<circle cx={cx} cy={cy} r={maxR*1.7} fill="url(#halo)"/>}
      {pct>25&&Array.from({length:10}).map((_,i)=>{
        const a=(i/10)*Math.PI*2, d=coreR+6, len=maxR*(0.25+0.6*(pct/100));
        return <line key={i} x1={cx+Math.cos(a)*d} y1={cy+Math.sin(a)*d} x2={cx+Math.cos(a)*(d+len)} y2={cy+Math.sin(a)*(d+len)} stroke={full?"#fff":"#c4aee8"} strokeWidth={full?2:1} strokeLinecap="round" opacity={Math.min(0.8,(pct-25)/75)*0.7}/>;
      })}
      {pct>0&&<circle cx={cx} cy={cy} r={coreR*1.6} fill={`rgba(196,174,232,${(pct/100)*0.25})`} filter="url(#glow)"/>}
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
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>

      {/* ── Header bar ── */}
      <div style={{background:`linear-gradient(135deg,${TAG_COLORS[idea.tag]||C.pp},${C.dp})`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 4px 20px rgba(0,0,0,0.25)"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.18)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
        <span style={{color:C.wh,fontWeight:900,fontSize:17,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{idea.text.slice(0,30)+(idea.text.length>30?"…":"")}</span>
        <button onClick={()=>upd({status:idea.status==="done"?"spark":"done"})} style={{background:idea.status==="done"?"rgba(39,174,96,0.5)":"rgba(255,255,255,0.18)",color:C.wh,border:`1.5px solid ${idea.status==="done"?"#27ae60":"rgba(255,255,255,0.3)"}`,borderRadius:20,padding:"6px 12px",fontWeight:800,fontSize:12,cursor:"pointer",flexShrink:0}}>
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
                <label style={{background:"rgba(0,0,0,0.55)",color:C.wh,borderRadius:20,padding:"7px 14px",fontSize:13,fontWeight:800,cursor:"pointer",backdropFilter:"blur(4px)",border:"1.5px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",gap:6}}>
                  📸 Change photo
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={handleCover}/>
                </label>
                <button onClick={()=>upd({cover:null})} style={{background:"rgba(192,57,43,0.75)",color:C.wh,border:"none",borderRadius:20,padding:"7px 12px",fontSize:13,fontWeight:800,cursor:"pointer"}}>✕ Remove</button>
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
            <span style={{background:tc,color:C.wh,fontSize:11,fontWeight:800,borderRadius:20,padding:"2px 9px"}}>{idea.tag}</span>
            <span style={{background:st.color,color:C.wh,fontSize:11,fontWeight:800,borderRadius:20,padding:"2px 9px"}}>{st.label}</span>
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
          <div style={{color:C.wh,fontWeight:900,fontSize:16,flex:1}}>🏔️ Steps</div>
          <button onClick={generateSteps} disabled={aiLoading} style={{background:btnGrad,color:C.wh,border:"none",borderRadius:20,padding:"6px 14px",fontWeight:800,fontSize:12,cursor:"pointer",opacity:aiLoading?0.6:1}}>
            {aiLoading?"⏳ AI thinking…":"🤖 AI generate steps"}
          </button>
        </div>

        {/* Add step */}
        <div style={{display:"flex",gap:8,marginBottom:12,background:"rgba(255,255,255,0.88)",borderRadius:12,padding:"9px 13px",border:`1.5px solid ${C.ll}`}}>
          <input value={newStepText} onChange={e=>setNewStepText(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&addStep()}
            placeholder="Add a step…"
            style={{flex:1,border:"none",outline:"none",fontSize:14,fontWeight:600,color:C.txt,background:"transparent"}}/>
          <button onClick={addStep} style={{background:btnGrad,color:C.wh,border:"none",borderRadius:9,width:32,height:32,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
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
            <div key={step.id} style={{background:"rgba(255,255,255,0.92)",borderRadius:16,padding:"12px 14px",marginBottom:10,border:`1.5px solid ${step.done?"#a5d6a7":C.ll}`,boxShadow:"0 2px 10px rgba(45,10,94,0.07)",opacity:step.done?0.75:1}}>

              {/* Step row */}
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                {/* Tick */}
                <button onClick={()=>toggleStep(step.id)} style={{width:28,height:28,borderRadius:"50%",border:`2.5px solid ${step.done?"#27ae60":C.lp}`,background:step.done?"#27ae60":"transparent",cursor:"pointer",flexShrink:0,marginTop:1,display:"flex",alignItems:"center",justifyContent:"center",color:C.wh,fontSize:14,fontWeight:900}}>
                  {step.done?"✓":""}
                </button>
                {/* Step number badge */}
                <div style={{width:22,height:22,borderRadius:"50%",background:btnGrad,color:C.wh,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:3}}>{si+1}</div>
                {/* Text */}
                <div style={{flex:1,fontWeight:700,fontSize:14,color:step.done?C.soft:C.txt,textDecoration:step.done?"line-through":"none",lineHeight:1.4}}>{step.text}</div>
                {/* Delete */}
                <button onClick={()=>delStep(step.id)} style={{background:"transparent",color:"#e74c3c",border:"none",cursor:"pointer",fontSize:16,flexShrink:0,padding:0}}>🗑</button>
              </div>

              {/* Step image */}
              {step.image&&(
                <div style={{position:"relative",marginTop:8,marginLeft:60}}>
                  <img src={step.image} alt="" style={{width:"100%",maxHeight:140,objectFit:"cover",borderRadius:10,border:`1.5px solid ${C.ll}`}}/>
                  <button onClick={()=>patchStep(step.id,{image:""})} style={{position:"absolute",top:4,right:4,background:"#e74c3c",color:C.wh,border:"none",borderRadius:"50%",width:20,height:20,cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                </div>
              )}

              {/* Step URL */}
              {step.url&&<div style={{marginTop:4,marginLeft:60}}><UrlBadge url={step.url}/></div>}

              {/* Micro-steps */}
              {(step.microSteps||[]).length>0&&step.microExpanded&&(
                <div style={{marginTop:8,marginLeft:60,borderLeft:`3px solid ${C.lp}`,paddingLeft:10}}>
                  {step.microSteps.map(ms=>(
                    <div key={ms.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <button onClick={()=>patchStep(step.id,{microSteps:step.microSteps.map(m=>m.id===ms.id?{...m,done:!m.done}:m)})} style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${ms.done?"#27ae60":C.lp}`,background:ms.done?"#27ae60":"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:C.wh,fontSize:10}}>
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
                <button onClick={()=>setSendMenuStep(sendMenuStep===step.id?null:step.id)} style={{background:btnGrad,color:C.wh,border:"none",borderRadius:8,padding:"4px 9px",fontSize:11,fontWeight:700,cursor:"pointer"}}>↗ Send</button>
              </div>

              {/* Send dropdown */}
              {sendMenuStep===step.id&&(
                <div style={{marginTop:8,marginLeft:60,background:C.wh,borderRadius:12,border:`1.5px solid ${C.ll}`,overflow:"hidden",boxShadow:"0 4px 16px rgba(45,10,94,0.15)"}}>
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
      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:C.wh,borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(45,10,94,0.4)",zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
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
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title="💡 Ideas" onBack={onBack||null} right={
        <button onClick={()=>setAdding(true)} style={{background:"rgba(255,255,255,0.22)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,width:42,height:42,fontSize:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
      }/>

      {/* Search */}
      <div style={{padding:"10px 14px 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.18)",borderRadius:12,padding:"8px 14px",border:"1px solid rgba(255,255,255,0.25)"}}>
          <span style={{fontSize:16}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search goals…" style={{flex:1,background:"transparent",border:"none",outline:"none",color:C.wh,fontSize:14,fontWeight:600}}/>
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
                <button onClick={()=>setDraft(d=>({...d,cover:null}))} style={{position:"absolute",top:4,right:4,background:"#e74c3c",color:C.wh,border:"none",borderRadius:"50%",width:22,height:22,cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
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
            <div key={idea.id} onClick={()=>setDetailId(idea.id)} style={{background:"rgba(255,255,255,0.92)",borderRadius:18,padding:"0",marginBottom:12,boxShadow:"0 2px 14px rgba(45,10,94,0.10)",border:`1.5px solid ${C.ll}`,overflow:"hidden",cursor:"pointer",transition:"transform 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>

              {/* Cover photo if set */}
              {idea.cover&&<img src={idea.cover} alt="" style={{width:"100%",height:80,objectFit:"cover",display:"block"}}/>}
              {/* Mini mountain strip */}
              <div style={{background:`linear-gradient(135deg,#0d001a,#2d0a5e)`,padding:"10px 14px",display:"flex",alignItems:"center",gap:12}}>
                <SeedToTree pct={pct} size={52}/>
                <div style={{flex:1}}>
                  <div style={{color:C.wh,fontWeight:900,fontSize:15,lineHeight:1.3}}>{idea.text}</div>
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
                  <span style={{background:tc,color:C.wh,fontSize:10,fontWeight:800,borderRadius:20,padding:"2px 8px"}}>{idea.tag}</span>
                  <span style={{background:st.color,color:C.wh,fontSize:10,fontWeight:800,borderRadius:20,padding:"2px 8px"}}>{st.label}</span>
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
      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:C.wh,borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(45,10,94,0.4)",zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   EISENHOWER MATRIX  — vibrant colours, type directly in
   boxes, AI assist, calendar, mindmap & prioritizer links
═══════════════════════════════════════════════════════ */
const QUADS=[
  {key:"do",   label:"Do First",     emoji:"🔴", sub:"Urgent + Important",        bg:"#FF0022", light:"#fff0f2", border:"#FF0022", desc:"Act on these today"},
  {key:"plan", label:"Schedule",     emoji:"🟠", sub:"Important, not urgent",     bg:"#FF6D00", light:"#fff4ec", border:"#FF6D00", desc:"Block time for these"},
  {key:"help", label:"Ask for Help", emoji:"🔵", sub:"Urgent, not important",     bg:"#00E5FF", light:"#e0fcff", border:"#00BCD4", desc:"Use a tool, app or ask Claude"},
  {key:"drop", label:"Eliminate",    emoji:"⚫", sub:"Not urgent, not important", bg:"#546E7A", light:"#f5f7f8", border:"#546E7A", desc:"Question if this needs doing"},
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
                <button onClick={()=>setMins(m=>Math.max(1,m-1))} style={{background:"rgba(255,255,255,0.2)",border:`1.5px solid ${accentOff}`,borderRadius:8,width:32,height:32,fontSize:20,fontWeight:900,cursor:"pointer",color:C.wh,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                <div style={{fontFamily:"monospace",fontSize:26,fontWeight:900,color:C.wh,minWidth:50,textAlign:"center"}}>{String(mins).padStart(2,"0")}</div>
                <button onClick={()=>setMins(m=>Math.min(120,m+1))} style={{background:"rgba(255,255,255,0.2)",border:`1.5px solid ${accentOff}`,borderRadius:8,width:32,height:32,fontSize:20,fontWeight:900,cursor:"pointer",color:C.wh,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
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
          ?<button onClick={stop} style={{background:accentOn,color:C.wh,border:"none",borderRadius:12,width:46,height:46,fontSize:18,fontWeight:800,cursor:"pointer",flexShrink:0,boxShadow:`0 3px 12px ${glowCol}`}}>✕</button>
          :<button onClick={start} style={{background:accentOn,color:C.wh,border:"none",borderRadius:12,width:46,height:46,fontSize:20,fontWeight:800,cursor:"pointer",flexShrink:0,boxShadow:`0 3px 12px ${glowCol}`}}>▶</button>
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

function Matrix({data,setData,priData,setPriData,mapData,setMapData,setScreen}) {
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
  const [sendMenu,setSendMenu]=useState(null); // {taskId, x, y}
  const now=Date.now();

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2400);};

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
  const move=(id,quad)=>{setData(ds=>ds.map(d=>d.id===id?{...d,quad,touched:Date.now()}:d));setMoveTask(null);};
  const touch=id=>setData(ds=>ds.map(d=>d.id===id?{...d,touched:Date.now()}:d));

  /* send actions */
  const sendToPri=(task,listId)=>{setPriData(ls=>ls.map(l=>l.id===listId?{...l,tasks:[...l.tasks,{id:Date.now(),name:task.text,done:false,color:"lilac"}]}:l));showToast("✅ Sent to Prioritizer!");setSendMenu(null);};
  const sendToMap=task=>{const root={id:Date.now(),text:task.text,x:0,y:0,parent:null,color:"crystal"};setMapData(ms=>[...ms,{id:Date.now()+1,name:task.text,nodes:[root]}]);showToast("🧠 Mind map created!");setSendMenu(null);};
  const sendToCal=task=>{window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(task.text)}`,"_blank");setSendMenu(null);};

  /* receive from Prioritizer — pull tasks into Do First */
  const importFromPri=(task)=>{
    setData(ds=>[...ds,{id:Date.now(),text:task.text,quad:"do",created:Date.now(),touched:Date.now()}]);
    showToast("📋 Imported from Prioritizer!");
  };

  /* AI */
  const askAI=async()=>{
    if(!aiInput.trim())return;
    setAiLoading(true);setAiResult(null);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,messages:[{role:"user",content:`Place this task in an Eisenhower Matrix. Quadrants: "do"=Urgent+Important, "plan"=Important not urgent, "help"=Urgent not important (outsource/tool), "drop"=neither. Task: "${aiInput}". Reply ONLY JSON: {"quad":"do","reason":"one sentence"}`}]})});
      const j=await res.json();
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

  /* ── Send menu component ── */
  const SendMenu=({task})=>(
    <div style={{position:"fixed",inset:0,zIndex:400,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setSendMenu(null)}>
      <div style={{background:C.wh,borderRadius:"20px 20px 0 0",padding:"0 0 28px",width:"100%",maxWidth:480,boxShadow:"0 -8px 32px rgba(45,10,94,0.35)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"center",padding:"12px 0 4px"}}><div style={{width:36,height:4,borderRadius:2,background:C.ll}}/></div>
        <div style={{padding:"4px 20px 14px",fontWeight:800,color:C.dp,fontSize:14}}>Send "{task.text.slice(0,30)}{task.text.length>30?"…":""}" to…</div>
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {/* Calendar */}
          <button onClick={()=>sendToCal(task)} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 20px",background:"none",border:"none",borderTop:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left"}}>
            <span style={{fontSize:22}}>📅</span><span style={{fontWeight:700,fontSize:15,color:C.txt}}>Google Calendar</span>
          </button>
          {/* Mind Map */}
          <button onClick={()=>sendToMap(task)} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 20px",background:"none",border:"none",borderTop:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left"}}>
            <span style={{fontSize:22}}>🧠</span><span style={{fontWeight:700,fontSize:15,color:C.txt}}>New Mind Map</span>
          </button>
          {/* Prioritizer lists */}
          {priData.length>0&&priData.map(l=>(
            <button key={l.id} onClick={()=>sendToPri(task,l.id)} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 20px",background:"none",border:"none",borderTop:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",textAlign:"left"}}>
              <span style={{fontSize:22}}>📋</span><span style={{fontWeight:700,fontSize:15,color:C.txt}}>Prioritizer — {l.name}</span>
            </button>
          ))}
          <button onClick={()=>setSendMenu(null)} style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"14px 20px",background:"none",border:"none",borderTop:`1px solid ${C.ll}`,cursor:"pointer",width:"100%",fontWeight:700,fontSize:14,color:C.soft}}>Cancel</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title="🎯 Matrix" onBack={()=>setScreen("home")} />

      <div style={{padding:"12px 12px 0"}}>

        {/* Stale banner */}
        {staleTasks.length>0&&(
          <div style={{background:"linear-gradient(135deg,#b71c1c,#FF1744)",borderRadius:14,padding:"10px 14px",marginBottom:12,boxShadow:"0 4px 16px rgba(255,23,68,0.35)"}}>
            <div style={{color:C.wh,fontWeight:900,fontSize:13,marginBottom:6}}>⏰ {staleTasks.length} task{staleTasks.length>1?"s":""} untouched 7+ days</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {staleTasks.map(t=><button key={t.id} onClick={()=>setStaleModal(t)} style={{background:"rgba(255,255,255,0.22)",color:C.wh,border:"1px solid rgba(255,255,255,0.4)",borderRadius:16,padding:"3px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{t.text.slice(0,22)}{t.text.length>22?"…":""}</button>)}
            </div>
          </div>
        )}

        {/* AI panel */}
        <div style={{background:"rgba(255,255,255,0.14)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:16,padding:"12px 14px",marginBottom:12}}>
          <div style={{color:C.wh,fontWeight:800,fontSize:12,marginBottom:8}}>🤖 AI Placement — describe a task</div>
          <div style={{display:"flex",gap:8,marginBottom:aiResult?8:0}}>
            <input value={aiInput} onChange={e=>setAiInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askAI()} placeholder="e.g. Book dentist appointment..." style={{flex:1,padding:"8px 12px",borderRadius:9,border:"1.5px solid rgba(255,255,255,0.35)",background:"rgba(255,255,255,0.18)",color:C.wh,fontSize:13,fontWeight:600,outline:"none"}}/>
            <button onClick={askAI} disabled={aiLoading||!aiInput.trim()} style={{background:btnGrad,color:C.wh,border:"none",borderRadius:9,padding:"8px 14px",fontWeight:800,fontSize:13,cursor:"pointer",opacity:aiInput.trim()?1:0.5,flexShrink:0}}>{aiLoading?"…":"Ask AI"}</button>
          </div>
          {aiResult&&(()=>{const q=quadByKey(aiResult.quad);return(
            <div style={{background:C.wh,borderRadius:10,padding:"10px 12px",border:`2px solid ${q.bg}`}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <span style={{background:q.bg,color:C.wh,borderRadius:16,padding:"2px 9px",fontSize:11,fontWeight:800}}>{q.emoji} {q.label}</span>
                <span style={{fontSize:11,color:C.soft,flex:1,lineHeight:1.4}}>{aiResult.reason}</span>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={acceptAI} style={{background:btnGrad,color:C.wh,border:"none",borderRadius:9,padding:"6px 14px",fontWeight:800,fontSize:12,cursor:"pointer"}}>✅ Accept</button>
                <button onClick={()=>setAiResult(null)} style={{background:C.ll,color:C.mid,border:"none",borderRadius:9,padding:"6px 12px",fontWeight:700,fontSize:12,cursor:"pointer"}}>Dismiss</button>
              </div>
            </div>
          );})()}
        </div>

        {/* Import from Prioritizer */}
        {priData.some(l=>l.tasks.filter(t=>!t.done).length>0)&&(
          <div style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:14,padding:"10px 14px",marginBottom:12}}>
            <div style={{color:C.wh,fontWeight:800,fontSize:12,marginBottom:8}}>📋 Import from Prioritizer</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {priData.flatMap(l=>l.tasks.filter(t=>!t.done)).slice(0,6).map(t=>(
                <button key={t.id} onClick={()=>importFromPri(t)} style={{background:"rgba(255,255,255,0.2)",color:C.wh,border:"1px solid rgba(255,255,255,0.35)",borderRadius:16,padding:"3px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{t.name.slice(0,20)}{t.name.length>20?"…":""} +</button>
              ))}
            </div>
          </div>
        )}

        {/* ── 2×2 quadrant grid ── */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {QUADS.map(q=>{
            const tasks=data.filter(d=>d.quad===q.key);
            return(
              <div key={q.key} style={{borderRadius:18,overflow:"hidden",boxShadow:`0 4px 20px ${q.bg}`,border:`2.5px solid ${q.bg}`}}>
                {/* Vibrant header */}
                <div style={{background:q.bg,padding:"10px 12px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div>
                    <div style={{color:q.key==="help"?"#003a45":C.wh,fontWeight:900,fontSize:13}}>{q.emoji} {q.label}</div>
                    <div style={{color:q.key==="help"?"rgba(0,50,70,0.75)":"rgba(255,255,255,0.8)",fontSize:9,marginTop:1,letterSpacing:0.3}}>{q.sub}</div>
                  </div>
                  <div style={{background:"rgba(255,255,255,0.25)",color:q.key==="help"?"#003a45":C.wh,fontWeight:900,fontSize:12,borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center"}}>{tasks.length}</div>
                </div>

                <div style={{background:q.light,padding:"8px 10px 10px"}}>
                  <div style={{fontSize:9,color:"#888",fontStyle:"italic",marginBottom:6}}>{q.desc}</div>

                  {/* Tasks */}
                  {tasks.map(t=>{
                    const stale=now-t.touched>STALE_MS;
                    const expanded=expandedTask===t.id;
                    return(
                      <div key={t.id} style={{background:C.wh,borderRadius:10,padding:"7px 9px",marginBottom:6,border:`1.5px solid ${stale?"#FF1744":q.bg}`,position:"relative",boxShadow:stale?`0 0 0 2px ${q.bg}`:""}}>
                        {stale&&<div style={{position:"absolute",top:-7,right:4,background:"#FF1744",color:C.wh,fontSize:8,fontWeight:900,borderRadius:8,padding:"1px 5px"}}>⏰</div>}
                        <div onClick={()=>setExpandedTask(expanded?null:t.id)} style={{fontSize:12,fontWeight:700,color:C.txt,lineHeight:1.4,marginBottom:5,cursor:"pointer"}}>{t.text}</div>
                        {/* URL badge when collapsed */}
                        {!expanded&&t.url&&<div style={{marginBottom:4}}><UrlBadge url={t.url}/></div>}
                        {/* URL edit when expanded */}
                        {expanded&&(
                          <div style={{marginBottom:6}}>
                            <UrlField
                              value={taskUrls[t.id]??t.url??""}
                              onChange={v=>{
                                setTaskUrls(u=>({...u,[t.id]:v}));
                                setData(ds=>ds.map(d=>d.id===t.id?{...d,url:v}:d));
                              }}
                            />
                          </div>
                        )}
                        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                          <button onClick={e=>{e.stopPropagation();moveMatrixTask(t.id,q.key,-1);}} style={{background:"rgba(255,255,255,0.8)",color:C.dp,border:"1px solid #ddd",borderRadius:6,padding:"2px 5px",fontSize:9,fontWeight:900,cursor:"pointer",lineHeight:1}}>▲</button>
                          <button onClick={e=>{e.stopPropagation();moveMatrixTask(t.id,q.key,1);}} style={{background:"rgba(255,255,255,0.8)",color:C.dp,border:"1px solid #ddd",borderRadius:6,padding:"2px 5px",fontSize:9,fontWeight:900,cursor:"pointer",lineHeight:1}}>▼</button>
                          <button onClick={()=>touch(t.id)} style={{background:"#e8f5e9",color:"#27ae60",border:"1px solid #a5d6a7",borderRadius:6,padding:"2px 6px",fontSize:9,fontWeight:700,cursor:"pointer"}}>✓</button>
                          <button onClick={()=>setMoveTask(t)} style={{background:C.ll,color:C.mp,border:`1px solid ${C.lp}`,borderRadius:6,padding:"2px 6px",fontSize:9,fontWeight:700,cursor:"pointer"}}>↔</button>
                          <button onClick={()=>setSendMenu(t)} style={{background:`${q.bg}`,color:q.bg,border:`1px solid ${q.bg}`,borderRadius:6,padding:"2px 6px",fontSize:9,fontWeight:700,cursor:"pointer"}}>↗ Send</button>
                          <button onClick={()=>window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("🎯 "+t.text)}`,"_blank")} style={{background:"#e8f5e9",color:"#2e7d32",border:"1px solid #a5d6a7",borderRadius:6,padding:"2px 6px",fontSize:9,fontWeight:700,cursor:"pointer"}}>📅</button>
                          <button onClick={()=>del(t.id)} style={{background:"#fce4e4",color:"#c0392b",border:"1px solid #f1948a",borderRadius:6,padding:"2px 6px",fontSize:9,fontWeight:700,cursor:"pointer"}}>🗑</button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Inline type-in box */}
                  <div style={{marginTop:4,display:"flex",flexDirection:"column",gap:4}}>
                    <div style={{display:"flex",gap:5}}>
                      <input
                        value={inlineTexts[q.key]}
                        onChange={e=>setInlineTexts(t=>({...t,[q.key]:e.target.value}))}
                        onKeyDown={e=>e.key==="Enter"&&addInline(q.key)}
                        placeholder="Type task here…"
                        style={{flex:1,padding:"6px 8px",borderRadius:8,border:`1.5px solid ${q.bg}`,background:"rgba(255,255,255,0.85)",fontSize:11,fontWeight:600,color:C.txt,outline:"none"}}
                      />
                      <button onClick={()=>addInline(q.key)} style={{background:q.bg,color:C.wh,border:"none",borderRadius:8,width:26,height:26,fontSize:16,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
                    </div>
                    <input
                      value={inlineUrls[q.key]}
                      onChange={e=>setInlineUrls(t=>({...t,[q.key]:e.target.value}))}
                      placeholder="🔗 Paste website (optional)"
                      style={{padding:"5px 8px",borderRadius:8,border:`1.5px solid ${q.bg}`,background:"rgba(255,255,255,0.7)",fontSize:10,fontWeight:600,color:C.txt,outline:"none",width:"100%",boxSizing:"border-box"}}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Focus Timer ── */}
        <MatrixTimer setScreen={setScreen}/>

      </div>

      {/* Send menu */}
      {sendMenu&&<SendMenu task={sendMenu}/>}

      {/* Move modal */}
      {moveTask&&(
        <div style={{position:"fixed",inset:0,background:"rgba(20,5,50,0.7)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300}}>
          <div style={{background:C.wh,borderRadius:"22px 22px 0 0",padding:"0 0 28px",width:"100%",maxWidth:480,boxShadow:"0 -8px 40px rgba(45,10,94,0.4)"}}>
            <div style={{display:"flex",justifyContent:"center",padding:"12px 0 6px"}}><div style={{width:40,height:4,borderRadius:2,background:C.ll}}/></div>
            <div style={{padding:"0 20px"}}>
              <div style={{fontWeight:900,color:C.dp,fontSize:15,marginBottom:4}}>↔ Move task</div>
              <div style={{color:C.soft,fontSize:13,marginBottom:12,fontStyle:"italic"}}>{moveTask.text}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {QUADS.map(q=>(
                  <button key={q.key} onClick={()=>move(moveTask.id,q.key)} style={{padding:"12px 10px",borderRadius:14,border:`2.5px solid ${q.bg}`,background:moveTask.quad===q.key?q.light:C.wh,cursor:"pointer",textAlign:"left",opacity:moveTask.quad===q.key?0.5:1}}>
                    <div style={{fontWeight:800,fontSize:13,color:q.bg}}>{q.emoji} {q.label}</div>
                    <div style={{fontSize:10,color:"#777",marginTop:2}}>{q.sub}</div>
                  </button>
                ))}
              </div>
              <button onClick={()=>setMoveTask(null)} style={{width:"100%",marginTop:12,background:C.ll,color:C.mid,border:"none",borderRadius:12,padding:"12px",fontWeight:700,fontSize:14,cursor:"pointer"}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Stale modal */}
      {staleModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(20,5,50,0.7)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300}}>
          <div style={{background:C.wh,borderRadius:"22px 22px 0 0",padding:"0 0 28px",width:"100%",maxWidth:480,boxShadow:"0 -8px 40px rgba(255,23,68,0.3)"}}>
            <div style={{display:"flex",justifyContent:"center",padding:"12px 0 6px"}}><div style={{width:40,height:4,borderRadius:2,background:"#f1948a"}}/></div>
            <div style={{padding:"0 20px"}}>
              <div style={{fontWeight:900,color:"#FF1744",fontSize:16,marginBottom:4}}>⏰ Stale Task</div>
              <div style={{color:C.soft,fontSize:13,marginBottom:8}}>Untouched for over a week:</div>
              <div style={{background:"#fff5f5",borderRadius:12,padding:"12px 14px",fontWeight:700,fontSize:14,color:C.txt,marginBottom:14,border:"1.5px solid #FF1744"}}>{staleModal.text}</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <button onClick={()=>{touch(staleModal.id);setStaleModal(null);showToast("👍 Kept — timer reset!");}} style={{background:"#e8f5e9",color:"#27ae60",border:"1.5px solid #a5d6a7",borderRadius:12,padding:"13px",fontWeight:800,fontSize:14,cursor:"pointer"}}>✅ Still doing it — keep it</button>
                <button onClick={()=>{setMoveTask(staleModal);setStaleModal(null);}} style={{background:C.ll,color:C.mp,border:`1.5px solid ${C.lp}`,borderRadius:12,padding:"13px",fontWeight:800,fontSize:14,cursor:"pointer"}}>↔ Move to different quadrant</button>
                <button onClick={()=>{del(staleModal.id);setStaleModal(null);showToast("🗑 Erased.");}} style={{background:"#fce4e4",color:"#c0392b",border:"1.5px solid #f1948a",borderRadius:12,padding:"13px",fontWeight:800,fontSize:14,cursor:"pointer"}}>🗑 Erase — it's not happening</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:C.wh,borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(45,10,94,0.4)",zIndex:500,whiteSpace:"nowrap"}}>{toast}</div>}
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
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <HomeBar setScreen={setScreen} title="💰 Budget" onBack={()=>setScreen("home")}/>
      <Header title="💰 Budget" onBack={()=>setScreen("home")} right={
        <button onClick={()=>{const b=mkBudget();setData(ds=>[...ds,b]);setActiveId(b.id);}} style={{background:"rgba(255,255,255,0.22)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,width:42,height:42,fontSize:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
      }/>
      <div style={{padding:"20px 16px"}}>
        {data.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,0.55)",marginTop:80,fontSize:15,lineHeight:2}}>Tap + to create your first budget</div>}
        {data.map(b=>{
          const tot=b.expenses.reduce((s,e)=>s+Number(e.amount||0),0);
          const rem=Number(b.budgetAmount||0)-tot;
          return(
            <div key={b.id} onClick={()=>setActiveId(b.id)} style={{background:"rgba(255,255,255,0.92)",borderRadius:18,padding:"16px 18px",marginBottom:14,boxShadow:"0 4px 18px rgba(45,10,94,0.10)",border:`2px solid ${C.ll}`,cursor:"pointer",transition:"transform 0.15s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
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
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:"You are a warm friendly financial coach. Give exactly 5 short practical encouraging observations about this budget. Return ONLY a JSON array of 5 strings. No markdown.\n\n"+budgetPrompt}]})});
      const j=await res.json();
      upd({aiReview:JSON.parse((j.content?.[0]?.text||"[]").replace(/\`\`\`json|\`\`\`/g,"").trim())});
    }catch{upd({aiReview:["Could not reach AI — please try again."]});}
    setAiLoading(false);
  };

  const SectionLabel=({n,label})=><div style={{marginBottom:6,fontSize:11,fontWeight:800,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",letterSpacing:1.5}}>{n} · {label}</div>;

  return(
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title={b.name} onBack={onBack} right={
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>upd({saved:!b.saved})} style={{background:b.saved?"rgba(39,174,96,0.35)":"rgba(255,255,255,0.18)",color:C.wh,border:`1.5px solid ${b.saved?"#27ae60":"rgba(255,255,255,0.35)"}`,borderRadius:10,padding:"6px 12px",fontWeight:800,fontSize:12,cursor:"pointer"}}>{b.saved?"✅ Saved":"💾 Save"}</button>
          <button onClick={()=>{if(window.confirm("Delete this budget?"))onDelete(b.id);}} style={{background:"rgba(192,57,43,0.3)",color:C.wh,border:"1.5px solid rgba(255,100,100,0.4)",borderRadius:10,padding:"6px 10px",fontWeight:800,fontSize:13,cursor:"pointer"}}>🗑</button>
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
                <button onClick={addExp} style={{flex:2,background:btnGrad,color:C.wh,border:"none",borderRadius:10,padding:"10px",fontWeight:800,cursor:"pointer"}}>Add Expense</button>
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
            <div style={{textAlign:"center",flex:1}}><div style={{color:"rgba(255,255,255,0.7)",fontSize:10,fontWeight:700,marginBottom:4}}>BUDGET</div><div style={{color:C.wh,fontWeight:900,fontSize:18}}>{fmtMoney(budgetAmt)}</div></div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:22,alignSelf:"center"}}>−</div>
            <div style={{textAlign:"center",flex:1}}><div style={{color:"rgba(255,255,255,0.7)",fontSize:10,fontWeight:700,marginBottom:4}}>EXPENSES</div><div style={{color:C.wh,fontWeight:900,fontSize:18}}>{fmtMoney(totalExp)}</div></div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:22,alignSelf:"center"}}>=</div>
            <div style={{textAlign:"center",flex:1}}><div style={{color:"rgba(255,255,255,0.7)",fontSize:10,fontWeight:700,marginBottom:4}}>{inGreen?"LEFT":"OVER"}</div><div style={{color:C.wh,fontWeight:900,fontSize:18}}>{fmtMoney(Math.abs(remaining))}</div></div>
          </div>
          {budgetAmt>0&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:"rgba(255,255,255,0.7)",fontSize:11}}>Budget used</span><span style={{color:C.wh,fontWeight:800,fontSize:11}}>{pct.toFixed(0)}%</span></div>
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
          <button onClick={getAIReview} style={{width:"100%",padding:"14px",background:btnGrad,color:C.wh,border:"none",borderRadius:16,fontWeight:800,fontSize:15,cursor:"pointer",opacity:aiLoading?0.7:1,boxShadow:"0 4px 16px rgba(45,10,94,0.3)"}}>{aiLoading?"🤖 Analysing…":"🤖 Get 5-Point AI Review"}</button>
        ):(
          <div>
            {b.aiReview.map((pt,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,0.92)",borderRadius:14,padding:"13px 15px",marginBottom:10,border:`1.5px solid ${C.ll}`,display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:btnGrad,color:C.wh,fontWeight:900,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                <div style={{fontSize:14,color:C.txt,lineHeight:1.6,fontWeight:600}}>{pt}</div>
              </div>
            ))}
            <button onClick={()=>{upd({aiReview:null});setTimeout(getAIReview,100);}} style={{width:"100%",padding:"12px",background:"rgba(255,255,255,0.15)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:14,fontWeight:700,fontSize:13,cursor:"pointer",marginTop:4}}>🔄 Refresh Review</button>
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
const CAT_COLORS={"General":"#7c5cbf","Fresh Food":"#27ae60","Frozen":"#2980b9","Drinks":"#e67e22","Household":"#8e44ad","Health & Beauty":"#e91e8c","Baby & Kids":"#f39c12","Pets":"#16a085","Clothing":"#c0392b","Electronics":"#1a5276","Other":"#546e7a"};

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
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <HomeBar setScreen={setScreen} title="🛒 Shopping" onBack={()=>setScreen("home")}/>
      <Header title="🛒 Shopping" onBack={()=>setScreen("home")} right={
        <button onClick={()=>setAdding(true)} style={{background:"rgba(255,255,255,0.22)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,width:42,height:42,fontSize:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
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
              style={{background:"rgba(255,255,255,0.92)",borderRadius:20,marginBottom:14,overflow:"hidden",boxShadow:"0 4px 18px rgba(45,10,94,0.12)",border:`1.5px solid ${C.ll}`,cursor:"pointer",transition:"transform 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              {/* Coloured header */}
              <div style={{background:grad,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:44,height:44,borderRadius:12,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{list.icon}</div>
                <div style={{flex:1}}>
                  <div style={{color:C.wh,fontWeight:900,fontSize:18}}>{list.name}</div>
                  <div style={{color:"rgba(255,255,255,0.75)",fontSize:12,marginTop:2}}>{done}/{total} items done</div>
                </div>
                <button onClick={e=>{e.stopPropagation();setData(ds=>ds.filter(l=>l.id!==list.id));}} style={{background:"rgba(255,255,255,0.18)",color:C.wh,border:"1px solid rgba(255,255,255,0.3)",borderRadius:9,width:32,height:32,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
              </div>
              {/* Progress bar */}
              <div style={{height:5,background:C.ll}}>
                <div style={{height:"100%",width:`${pct}%`,background:pct===100?"#27ae60":"#7c5cbf",transition:"width 0.4s"}}/>
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
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title={`${list.icon} ${list.name}`} onBack={onBack} right={
        <button onClick={()=>{if(window.confirm("Delete this list?"))onDelete(list.id);}} style={{background:"rgba(192,57,43,0.3)",color:C.wh,border:"1.5px solid rgba(255,100,100,0.4)",borderRadius:10,padding:"6px 10px",fontWeight:800,fontSize:13,cursor:"pointer"}}>🗑</button>
      }/>

      {/* Progress bar */}
      {list.items.length>0&&(
        <div style={{height:5,background:"rgba(255,255,255,0.15)"}}>
          <div style={{height:"100%",width:`${Math.round((totalDone/list.items.length)*100)}%`,background:totalDone===list.items.length?"#27ae60":C.lp,transition:"width 0.4s"}}/>
        </div>
      )}

      <div style={{padding:"14px 14px"}}>

        {/* Quick add bar */}
        <div style={{display:"flex",gap:8,marginBottom:10,background:"rgba(255,255,255,0.92)",borderRadius:14,padding:"10px 14px",border:`1.5px solid ${C.ll}`,boxShadow:"0 2px 10px rgba(45,10,94,0.08)"}}>
          <input ref={inputRef} value={newItemText} onChange={e=>setNewItemText(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&addItem()}
            placeholder="Add item… press Enter to add more"
            style={{flex:1,border:"none",outline:"none",fontSize:15,fontWeight:600,color:C.txt,background:"transparent"}}/>
          <button onClick={addItem} style={{background:btnGrad,color:C.wh,border:"none",borderRadius:10,width:36,height:36,fontSize:22,cursor:"pointer",fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
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
                style={{background:dragItemId===item.id?"rgba(196,174,232,0.6)":item.checked?"rgba(255,255,255,0.50)":"rgba(255,255,255,0.92)",borderRadius:14,padding:"11px 14px",marginBottom:8,border:`1.5px solid ${dragItemId===item.id?C.pp:item.checked?C.done:C.ll}`,opacity:item.checked&&dragItemId!==item.id?0.7:1,transition:"all 0.2s",display:"flex",alignItems:"flex-start",gap:10,transform:dragItemId===item.id?"scale(1.02)":"scale(1)",boxShadow:dragItemId===item.id?"0 6px 20px rgba(45,10,94,0.2)":"none",cursor:sortByCat?"default":"grab"}}>

                {/* Drag handle — hidden when sorting by category */}
                {!sortByCat&&<div style={{color:"rgba(124,92,191,0.35)",fontSize:14,flexShrink:0,alignSelf:"center",lineHeight:1,cursor:"grab"}}>⠿</div>}

                {/* Checkbox */}
                <button onClick={()=>toggle(item.id)} style={{width:26,height:26,borderRadius:"50%",border:`2.5px solid ${item.checked?"#27ae60":C.lp}`,background:item.checked?"#27ae60":"transparent",cursor:"pointer",flexShrink:0,marginTop:1,display:"flex",alignItems:"center",justifyContent:"center",color:C.wh,fontSize:14,fontWeight:900}}>
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
                <button onClick={saveEdit} style={{flex:2,background:btnGrad,color:C.wh,border:"none",borderRadius:12,padding:"12px",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:"0 3px 12px rgba(45,10,94,0.3)"}}>Save</button>
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
        <div style={{fontSize:44,fontWeight:300,color:C.wh,fontFamily:"monospace",lineHeight:1.1,wordBreak:"break-all"}}>{disp}</div>
      </div>
      {/* Buttons */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2,padding:"0 2px 2px"}}>
        {rows.flat().map((btn,i)=>(
          <button key={i} onClick={()=>press(btn)} style={{
            padding:"20px 0",fontSize:btn==="⌫"?18:20,fontWeight:isOp(btn)?400:600,
            background:isOp(btn)?"#7c5cbf":isGrey(btn)?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.12)",
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
      <div style={{fontFamily:"monospace",fontSize:52,fontWeight:200,color:C.wh,letterSpacing:2,marginBottom:20}}>{fmt(ms)}</div>
      <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:16}}>
        <button onClick={()=>setOn(o=>!o)} style={{background:on?"#FF0022":"#27ae60",color:C.wh,border:"none",borderRadius:50,width:72,height:72,fontSize:24,cursor:"pointer",boxShadow:`0 4px 16px ${on?"rgba(255,0,34,0.4)":"rgba(39,174,96,0.4)"}`}}>
          {on?"⏸":"▶"}
        </button>
        <button onClick={lap} disabled={!on} style={{background:"rgba(255,255,255,0.2)",color:C.wh,border:"none",borderRadius:50,width:72,height:72,fontSize:14,fontWeight:700,cursor:"pointer",opacity:on?1:0.4}}>Lap</button>
        <button onClick={reset} style={{background:"rgba(255,255,255,0.15)",color:C.wh,border:"none",borderRadius:50,width:72,height:72,fontSize:22,cursor:"pointer"}}>↺</button>
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
            <div style={{height:"100%",width:`${pct}%`,background:left<10?"#FF0022":"#7c5cbf",borderRadius:4,transition:"width 1s linear"}}/>
          </div>
          {done&&<div style={{fontSize:18,fontWeight:800,color:"#FF9100",marginBottom:12}}>⏰ Time's up!</div>}
          <button onClick={stop} style={{background:"rgba(255,255,255,0.2)",color:C.wh,border:"none",borderRadius:50,padding:"12px 32px",fontSize:16,fontWeight:700,cursor:"pointer"}}>Reset</button>
        </>
      ):(
        <>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:20}}>
            {[["h",h,setH,23],["m",m,setM,59],["s",s,setS,59]].map(([lbl,val,set,max])=>(
              <div key={lbl} style={{textAlign:"center"}}>
                <button onClick={()=>set(v=>Math.min(max,v+1))} style={{display:"block",background:"rgba(255,255,255,0.15)",color:C.wh,border:"none",borderRadius:8,width:52,padding:"4px",fontSize:18,cursor:"pointer",marginBottom:4}}>▲</button>
                <div style={{fontFamily:"monospace",fontSize:42,fontWeight:200,color:C.wh,lineHeight:1}}>{String(val).padStart(2,"0")}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",margin:"2px 0"}}>{lbl}</div>
                <button onClick={()=>set(v=>Math.max(0,v-1))} style={{display:"block",background:"rgba(255,255,255,0.15)",color:C.wh,border:"none",borderRadius:8,width:52,padding:"4px",fontSize:18,cursor:"pointer",marginTop:4}}>▼</button>
              </div>
            ))}
          </div>
          {/* Presets */}
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:18,flexWrap:"wrap"}}>
            {[[0,1,0,"1m"],[0,5,0,"5m"],[0,10,0,"10m"],[0,15,0,"15m"],[0,25,0,"25m"],[0,30,0,"30m"],[1,0,0,"1h"]].map(([hv,mv,sv,lbl])=>(
              <button key={lbl} onClick={()=>{setH(hv);setM(mv);setS(sv);}} style={{background:"rgba(255,255,255,0.15)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.25)",borderRadius:20,padding:"5px 12px",fontSize:12,fontWeight:700,cursor:"pointer"}}>{lbl}</button>
            ))}
          </div>
          <button onClick={start} disabled={total<1} style={{background:"#7c5cbf",color:C.wh,border:"none",borderRadius:50,width:72,height:72,fontSize:24,cursor:"pointer",opacity:total>0?1:0.4,boxShadow:"0 4px 16px rgba(124,92,191,0.5)"}}>▶</button>
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
          style={{flex:"0 0 auto",padding:"9px 12px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.15)",color:C.wh,fontSize:16,fontFamily:"monospace",outline:"none",colorScheme:"dark"}}/>
        <input value={newLabel} onChange={e=>setNewLabel(e.target.value)} placeholder="Label (optional)"
          style={{flex:1,padding:"9px 12px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.15)",color:C.wh,fontSize:13,outline:"none",minWidth:100}}/>
        <button onClick={add} style={{background:"#7c5cbf",color:C.wh,border:"none",borderRadius:10,padding:"9px 18px",fontWeight:800,fontSize:14,cursor:"pointer"}}>+ Set</button>
      </div>

      {alarms.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,0.4)",fontSize:13,fontStyle:"italic"}}>No alarms set</div>}
      {alarms.map(a=>(
        <div key={a.id} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.10)",borderRadius:14,padding:"12px 14px",marginBottom:8,border:`1.5px solid ${a.active?"rgba(124,92,191,0.5)":"rgba(255,255,255,0.1)"}`}}>
          <div style={{fontFamily:"monospace",fontSize:22,fontWeight:300,color:a.active?C.wh:"rgba(255,255,255,0.4)"}}>{a.time}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:14,color:a.active?C.wh:"rgba(255,255,255,0.4)"}}>{a.label}</div>
          </div>
          {/* Toggle */}
          <div onClick={()=>setAlarms(as=>as.map(x=>x.id===a.id?{...x,active:!x.active,fired:false}:x))}
            style={{width:44,height:24,borderRadius:12,background:a.active?"#7c5cbf":"rgba(255,255,255,0.2)",cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0}}>
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
            <div style={{fontSize:24,fontWeight:900,color:C.wh,marginBottom:4}}>{fired.time}</div>
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
          style={{flex:1,accentColor:"#7c5cbf"}}/>
        <span style={{color:"rgba(255,255,255,0.6)",fontSize:12,fontWeight:700,minWidth:32}}>{Math.round(vol*100)}%</span>
      </div>

      {/* Presets */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        {WN_PRESETS.map(p=>(
          <button key={p.id} onClick={()=>play(p.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"12px 14px",borderRadius:14,background:playing===p.id?"#7c5cbf":"rgba(255,255,255,0.12)",border:`1.5px solid ${playing===p.id?"#7c5cbf":"rgba(255,255,255,0.2)"}`,color:C.wh,cursor:"pointer",fontWeight:playing===p.id?800:600,fontSize:13,transition:"all 0.15s"}}>
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
            <button key={t} onClick={()=>setCustomType(t)} style={{padding:"5px 12px",borderRadius:20,border:`1.5px solid ${customType===t?"#c4aee8":"rgba(255,255,255,0.2)"}`,background:customType===t?"rgba(196,174,232,0.3)":"transparent",color:C.wh,fontSize:11,fontWeight:customType===t?800:600,cursor:"pointer",textTransform:"capitalize"}}>{t}</button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <span style={{color:"rgba(255,255,255,0.6)",fontSize:12,minWidth:48}}>Freq</span>
          <input type="range" min={20} max={2000} step={5} value={customFreq} onChange={e=>setCustomFreq(Number(e.target.value))}
            style={{flex:1,accentColor:"#c4aee8"}}/>
          <span style={{color:"rgba(255,255,255,0.6)",fontSize:12,fontWeight:700,minWidth:52}}>{customFreq}Hz</span>
        </div>
        <button onClick={playCustom} style={{width:"100%",padding:"11px",background:playing==="custom"?"#FF0022":"rgba(255,255,255,0.15)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.25)",borderRadius:12,fontWeight:800,fontSize:14,cursor:"pointer"}}>
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
  const [active,setActive]=useState("calc");

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,#1a0336 0%,#4a148c 50%,#7b1fa2 100%)`,fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <HomeBar setScreen={setScreen} title="🔧 Tools" onBack={()=>setScreen("home")}/>
      <Header title="🔧 Tools" onBack={()=>setScreen("home")} />

      {/* Tool tab bar */}
      <div style={{display:"flex",overflowX:"auto",gap:0,padding:"10px 12px",background:"rgba(0,0,0,0.2)",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        {TOOLS.map(t=>(
          <button key={t.id} onClick={()=>setActive(t.id)} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"8px 14px",background:"none",border:"none",borderBottom:active===t.id?"3px solid #c4aee8":"3px solid transparent",cursor:"pointer",transition:"all 0.15s"}}>
            <span style={{fontSize:20}}>{t.icon}</span>
            <span style={{fontSize:10,fontWeight:active===t.id?800:600,color:active===t.id?C.wh:"rgba(255,255,255,0.5)",letterSpacing:0.3}}>{t.name}</span>
          </button>
        ))}
      </div>

      <div style={{padding:"16px 14px"}}>
        {active==="calc" &&<Calculator/>}
        {active==="sw"   &&<Stopwatch/>}
        {active==="timer"&&<CountdownTool/>}
        {active==="alarm"&&<AlarmTool/>}
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

const GOAL_HORIZONS=[
  {key:"week",  label:"Next Week",  icon:"📅", color:"#FF6D00", grad:"linear-gradient(135deg,#e65100,#FF6D00)", question:"What do you want to achieve by next week?",  days:7},
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
async function aiGoalSubtasks(goalTitle,horizon){
  const h=horizonByKey(horizon);
  const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,
      messages:[{role:"user",content:`Break this ${h.label} goal into 4–6 clear actionable subtasks. Return ONLY a JSON array of strings. No markdown.\n\nGoal: "${goalTitle}"`}]})
  });
  const j=await res.json();
  return JSON.parse((j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim());
}
async function aiMicroSteps(subtaskText){
  const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:250,
      messages:[{role:"user",content:`Break this into 2–4 micro-tasks. Return ONLY a JSON array of strings. No markdown.\n\nTask: "${subtaskText}"`}]})
  });
  const j=await res.json();
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
    <div style={{minHeight:"100vh",background:"#F3EAD8",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>

      {/* Cover photo header */}
      {/* ── Header bar ── */}
      <div style={{background:h.grad,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 4px 20px rgba(0,0,0,0.25)"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.18)",color:C.wh,border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",flexShrink:0}}>←</button>
        <span style={{color:C.wh,fontWeight:900,fontSize:18,flex:1}}>{h.icon} {h.label} Goal</span>
        {goal.subtasks.length>0&&<span style={{color:"rgba(255,255,255,0.8)",fontSize:12,fontWeight:700}}>{pct}%</span>}
        <button onClick={()=>upd({status:goal.status==="done"?"active":"done"})} style={{background:goal.status==="done"?"rgba(39,174,96,0.5)":"rgba(255,255,255,0.18)",color:C.wh,border:`1.5px solid ${goal.status==="done"?"#27ae60":"rgba(255,255,255,0.3)"}`,borderRadius:20,padding:"6px 12px",fontWeight:800,fontSize:12,cursor:"pointer"}}>
          {goal.status==="done"?"✅ Done":"Mark done"}
        </button>
        <button onClick={()=>{if(window.confirm("Delete this goal?"))onDelete(goal.id);}} style={{background:"rgba(192,57,43,0.4)",color:C.wh,border:"none",borderRadius:10,width:34,height:34,cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>🗑</button>
      </div>

      <div style={{padding:"16px 14px"}}>

        {/* ── COVER PHOTO — prominent in-content block ── */}
        <GlassCard style={{marginBottom:14,padding:0,overflow:"hidden"}}>
          {goal.cover?(
            <div style={{position:"relative"}}>
              <img src={goal.cover} alt="" style={{width:"100%",height:180,objectFit:"cover",display:"block"}}/>
              {/* Overlay action buttons */}
              <div style={{position:"absolute",bottom:10,right:10,display:"flex",gap:8}}>
                <label style={{background:"rgba(0,0,0,0.55)",color:C.wh,borderRadius:20,padding:"7px 14px",fontSize:13,fontWeight:800,cursor:"pointer",backdropFilter:"blur(4px)",border:"1.5px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",gap:6}}>
                  📸 Change photo
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={handleCover}/>
                </label>
                <button onClick={()=>upd({cover:null})} style={{background:"rgba(192,57,43,0.75)",color:C.wh,border:"none",borderRadius:20,padding:"7px 12px",fontSize:13,fontWeight:800,cursor:"pointer",backdropFilter:"blur(4px)"}}>✕ Remove</button>
              </div>
            </div>
          ):(
            /* No photo yet — big obvious upload area */
            <label style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,height:140,background:`linear-gradient(135deg,${h.color},${h.color})`,border:`2.5px dashed ${h.color}`,borderRadius:16,cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=`${h.color}`;e.currentTarget.style.borderColor=h.color;}}
              onMouseLeave={e=>{e.currentTarget.style.background=`linear-gradient(135deg,${h.color},${h.color})`;e.currentTarget.style.borderColor=`${h.color}`;}}>
              <div style={{width:56,height:56,borderRadius:16,background:h.grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,boxShadow:`0 4px 14px ${h.color}`}}>📸</div>
              <div style={{textAlign:"center"}}>
                <div style={{fontWeight:800,fontSize:15,color:C.dp,marginBottom:2}}>Add a cover photo</div>
                <div style={{fontSize:12,color:C.soft}}>Tap here to upload an image for this goal</div>
              </div>
              <input type="file" accept="image/*" style={{display:"none"}} onChange={handleCover}/>
            </label>
          )}
          {/* Progress bar at bottom */}
          {goal.subtasks.length>0&&(
            <div style={{height:5,background:C.ll}}>
              <div style={{height:"100%",width:`${pct}%`,background:pct===100?"#27ae60":h.color,transition:"width 0.4s"}}/>
            </div>
          )}
        </GlassCard>

        {/* AI prompt question */}
        <div style={{background:"rgba(255,255,255,0.10)",borderRadius:14,padding:"10px 14px",marginBottom:12,border:"1px solid rgba(255,255,255,0.2)"}}>
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:12,fontWeight:700,marginBottom:6}}>{h.question}</div>
          <textarea value={goal.title} onChange={e=>upd({title:e.target.value})} placeholder="Write your goal here…"
            rows={2} style={{width:"100%",boxSizing:"border-box",background:"transparent",border:"none",outline:"none",color:C.wh,fontSize:16,fontWeight:700,resize:"none",fontFamily:"inherit",lineHeight:1.4}}/>
        </div>

        {/* Description */}
        <GlassCard style={{marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Why this matters</div>
          <textarea value={goal.description} onChange={e=>upd({description:e.target.value})} placeholder="Your reason, motivation, vision…"
            rows={3} style={{width:"100%",boxSizing:"border-box",padding:"8px 12px",borderRadius:10,border:`1.5px solid ${C.ll}`,fontSize:14,color:C.txt,outline:"none",resize:"none",fontFamily:"inherit",lineHeight:1.5,background:C.pale}}/>
        </GlassCard>

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
              <button onClick={()=>window.open(lnk.url.startsWith("http")?lnk.url:"https://"+lnk.url,"_blank")} style={{background:C.pp,color:C.wh,border:"none",borderRadius:7,width:26,height:26,cursor:"pointer",fontSize:11,flexShrink:0}}>↗</button>
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
                <button onClick={addLink} style={{flex:2,background:btnGrad,color:C.wh,border:"none",borderRadius:9,padding:"8px",fontWeight:800,cursor:"pointer"}}>Add</button>
              </div>
            </div>
          ):(
            <button onClick={()=>setAddingLink(true)} style={{width:"100%",padding:"9px",background:"transparent",border:`1.5px dashed ${C.lp}`,borderRadius:10,color:C.pp,fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add link or hyperlink</button>
          )}
        </GlassCard>

        {/* Subtasks */}
        <div style={{marginBottom:6,display:"flex",alignItems:"center",gap:10}}>
          <div style={{color:C.wh,fontWeight:900,fontSize:16,flex:1}}>📋 Subtasks</div>
          <button onClick={genSubtasks} disabled={aiLoading} style={{background:btnGrad,color:C.wh,border:"none",borderRadius:20,padding:"6px 14px",fontWeight:800,fontSize:12,cursor:"pointer",opacity:aiLoading?0.6:1}}>
            {aiLoading?"⏳ Thinking…":"🤖 AI suggest"}
          </button>
        </div>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginBottom:10}}>AI suggestions are optional — add your own or mix both</div>

        {/* Add subtask */}
        <div style={{display:"flex",gap:8,marginBottom:12,background:"rgba(255,255,255,0.88)",borderRadius:12,padding:"9px 13px",border:`1.5px solid ${C.ll}`}}>
          <input value={newSub} onChange={e=>setNewSub(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addSub()} placeholder="Add a subtask…"
            style={{flex:1,border:"none",outline:"none",fontSize:14,fontWeight:600,color:C.txt,background:"transparent"}}/>
          <button onClick={addSub} style={{background:btnGrad,color:C.wh,border:"none",borderRadius:9,width:32,height:32,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
        </div>

        {goal.subtasks.length===0&&(
          <div style={{textAlign:"center",color:"rgba(255,255,255,0.4)",fontSize:13,fontStyle:"italic",marginBottom:12}}>No subtasks yet — add one or tap 🤖 AI suggest</div>
        )}

        {goal.subtasks.map((sub,si)=>(
          <div key={sub.id} style={{background:"rgba(255,255,255,0.92)",borderRadius:16,padding:"12px 14px",marginBottom:10,border:`1.5px solid ${sub.done?"#a5d6a7":C.ll}`,opacity:sub.done?0.75:1}}>

            {/* Subtask row */}
            <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}>
              <button onClick={()=>toggleSub(sub.id)} style={{width:26,height:26,borderRadius:"50%",border:`2.5px solid ${sub.done?"#27ae60":C.lp}`,background:sub.done?"#27ae60":"transparent",cursor:"pointer",flexShrink:0,marginTop:1,display:"flex",alignItems:"center",justifyContent:"center",color:C.wh,fontSize:13,fontWeight:900}}>
                {sub.done?"✓":""}
              </button>
              <div style={{width:22,height:22,borderRadius:"50%",background:h.grad,color:C.wh,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>{si+1}</div>
              <div style={{flex:1,fontWeight:700,fontSize:14,color:sub.done?C.soft:C.txt,textDecoration:sub.done?"line-through":"none",lineHeight:1.4}}>{sub.text}</div>
              <button onClick={()=>delSub(sub.id)} style={{background:"transparent",color:"#e74c3c",border:"none",cursor:"pointer",fontSize:15,padding:0}}>🗑</button>
            </div>

            {/* Subtask image */}
            {sub.image&&(
              <div style={{position:"relative",marginBottom:8,marginLeft:58}}>
                <img src={sub.image} alt="" style={{width:"100%",maxHeight:120,objectFit:"cover",borderRadius:10,border:`1.5px solid ${C.ll}`}}/>
                <button onClick={()=>patchSub(sub.id,{image:""})} style={{position:"absolute",top:4,right:4,background:"#e74c3c",color:C.wh,border:"none",borderRadius:"50%",width:20,height:20,cursor:"pointer",fontSize:10,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
              </div>
            )}

            {/* Micro-steps */}
            {(sub.microSteps||[]).length>0&&sub.microExpanded&&(
              <div style={{marginLeft:58,borderLeft:`3px solid ${C.lp}`,paddingLeft:10,marginBottom:6}}>
                {sub.microSteps.map(ms=>(
                  <div key={ms.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                    <button onClick={()=>patchSub(sub.id,{microSteps:sub.microSteps.map(m=>m.id===ms.id?{...m,done:!m.done}:m)})} style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${ms.done?"#27ae60":C.lp}`,background:ms.done?"#27ae60":"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:C.wh,fontSize:9}}>
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
              <button onClick={()=>setSendMenu(sendMenu===sub.id?"send_"+sub.id:sub.id)} style={{background:btnGrad,color:C.wh,border:"none",borderRadius:8,padding:"4px 9px",fontSize:11,fontWeight:700,cursor:"pointer"}}>↗ Send to</button>
            </div>

            {/* Send dropdown */}
            {sendMenu===sub.id&&(
              <div style={{marginTop:8,marginLeft:58,background:C.wh,borderRadius:12,border:`1.5px solid ${C.ll}`,overflow:"hidden",boxShadow:"0 4px 16px rgba(45,10,94,0.15)"}}>
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
      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:C.wh,borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(45,10,94,0.4)",zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );
}

/* ── Goals home — 5 horizon tabs ───────────────────── */

async function aiChargePicks(tasks){
  const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,
      messages:[{role:"user",content:`Pick the 3 tasks most likely being avoided and worth tackling today. Return ONLY a JSON array of 3 task name strings. No markdown.\n\nTasks: ${tasks.map(t=>t.name||t.text).slice(0,15).join(", ")}`}]})});
  const j=await res.json();
  return JSON.parse((j.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim());
}

async function aiAwardSuggestions(style){
  const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:250,
      messages:[{role:"user",content:`Suggest 6 warm, specific, achievable self-care rewards for someone who hit their weekly goals. Style: "${style||"restorative and nurturing"}". Return ONLY a JSON array of 6 strings. No markdown.`}]})});
  const j=await res.json();
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
    <div style={{display:"flex",alignItems:"center",gap:10,background:done?"rgba(39,174,96,0.1)":"rgba(255,255,255,0.06)",borderRadius:14,padding:"10px 14px",marginBottom:8,border:`1.5px solid ${done?"rgba(39,174,96,0.5)":"rgba(196,174,232,0.2)"}`}}>
      <button onClick={()=>!done&&onCharge()} style={{width:28,height:28,borderRadius:"50%",border:`2.5px solid ${done?"#27ae60":"#c4aee8"}`,background:done?"#27ae60":"transparent",cursor:done?"default":"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,fontWeight:900}}>{done?"✓":""}</button>
      <div style={{flex:1}}>
        <div style={{color:done?"rgba(255,255,255,0.35)":"#fff",fontWeight:700,fontSize:14,textDecoration:done?"line-through":"none",lineHeight:1.3}}>{name}</div>
        {src&&<div style={{color:"rgba(255,255,255,0.35)",fontSize:11,marginTop:1}}>{src}</div>}
      </div>
      {!done&&<span style={{fontSize:16,opacity:0.7}}>⚡</span>}
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0a0118 0%,#1a0336 50%,#2d0a5e 100%)",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#1a0336,#7c5cbf)",padding:"18px 16px 12px",boxShadow:"0 4px 24px rgba(124,92,191,0.5)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>

          <div style={{fontSize:32}}>⚡</div>
          <button onClick={()=>setScreen&&setScreen("home")} style={{marginLeft:"auto",background:"rgba(255,255,255,0.18)",color:"#fff",border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:10,padding:"6px 12px",fontWeight:800,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4,flexShrink:0}}>🏠 <span>Home</span></button>
          <div style={{flex:1}}>
            <div style={{color:"#fff",fontWeight:900,fontSize:22,letterSpacing:0.3}}>The Charge</div>
            <div style={{color:"rgba(255,255,255,0.55)",fontSize:12}}>Tackle what you've been avoiding</div>
          </div>
          {data.streak>0&&<div style={{background:"rgba(255,215,0,0.15)",border:"1.5px solid rgba(255,215,0,0.4)",borderRadius:12,padding:"6px 10px",textAlign:"center",flexShrink:0}}>
            <div style={{color:"#FFD700",fontWeight:900,fontSize:20}}>🔥{data.streak}</div>
            <div style={{color:"rgba(255,255,255,0.5)",fontSize:9,fontWeight:700}}>STREAK</div>
          </div>}
        </div>
        <div style={{display:"flex",gap:0,background:"rgba(0,0,0,0.3)",borderRadius:12,padding:3}}>
          {[["today","⚡ Today"],["week","🔮 Week"],["settings","⚙️ Setup"]].map(([k,l])=>(
            <button key={k} onClick={()=>setView(k)} style={{flex:1,padding:"8px 4px",background:view===k?"rgba(196,174,232,0.25)":"transparent",color:view===k?"#fff":"rgba(255,255,255,0.45)",border:"none",borderRadius:10,fontWeight:view===k?800:600,fontSize:12,cursor:"pointer"}}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{padding:"14px"}}>

        {/* ══ TODAY ══ */}
        {view==="today"&&<>

          {/* Orb + status */}
          <div style={{display:"flex",alignItems:"center",gap:16,background:"rgba(255,255,255,0.05)",borderRadius:20,padding:"16px 18px",marginBottom:14,border:"1px solid rgba(196,174,232,0.2)"}}>
            <OrbOfLight pct={pct} size={110}/>
            <div style={{flex:1}}>
              <div style={{color:"#fff",fontWeight:900,fontSize:19,marginBottom:5}}>
                {hitTarget?"🔮 Light earned today!":"⚡ Build the light"}
              </div>
              <div style={{color:"rgba(255,255,255,0.6)",fontSize:13,lineHeight:1.6,marginBottom:6}}>
                {hitTarget
                  ?`${charged.length} tasks charged — today's light earned ✨`
                  :`${target-charged.length} more task${target-charged.length!==1?"s":""} to earn today's light`}
              </div>
              <div style={{height:5,background:"rgba(255,255,255,0.1)",borderRadius:3,overflow:"hidden",marginBottom:4}}>
                <div style={{height:"100%",width:`${pct}%`,background:hitTarget?"#FFD700":"#c4aee8",borderRadius:3,transition:"width 0.4s"}}/>
              </div>
              <div style={{color:"rgba(255,255,255,0.4)",fontSize:11}}>{charged.length} / {target} tasks today</div>
            </div>
          </div>

          {/* Reward + lights progress card */}
          {(()=>{
            const orbTarget=data.orbTarget||5;
            const lightsEarned=weekDays.filter(d=>(data.days[d]?.charged||[]).length>=target).length;
            const orbPct=Math.min(100,Math.round((lightsEarned/orbTarget)*100));
            const rewardUnlocked=orbPct>=100;
            const daysLeft=data.rewardDeadline?Math.ceil((new Date(data.rewardDeadline)-new Date())/(1000*60*60*24)):null;
            return(
              <div style={{background:rewardUnlocked?"linear-gradient(135deg,#1e8449,#27ae60)":"rgba(255,255,255,0.07)",borderRadius:18,padding:"14px 16px",marginBottom:14,border:`1.5px solid ${rewardUnlocked?"rgba(39,174,96,0.8)":"rgba(196,174,232,0.2)"}`}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10}}>
                  <span style={{fontSize:20}}>🎁</span>
                  <div style={{flex:1}}>
                    <div style={{color:"#fff",fontWeight:800,fontSize:14,marginBottom:2}}>{data.weeklyAward||"No reward set yet — tap ⚙️ Setup"}</div>
                    {rewardUnlocked?<div style={{color:"rgba(255,255,255,0.85)",fontSize:13}}>🎉 All lights earned — go claim it!</div>
                    :<div style={{color:"#7A7060",fontSize:12}}>{orbTarget-lightsEarned} more light{orbTarget-lightsEarned!==1?"s":""} to unlock</div>}
                  </div>
                </div>
                {/* Lights dots */}
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:daysLeft!==null?8:0}}>
                  {Array.from({length:Math.min(orbTarget,15)}).map((_,i)=>(
                    <div key={i} style={{width:22,height:22,borderRadius:"50%",background:i<lightsEarned?"#FFD700":"rgba(255,255,255,0.12)",border:`1.5px solid ${i<lightsEarned?"#FFD700":"rgba(255,255,255,0.2)"}`,boxShadow:i<lightsEarned?"0 0 8px #FFD700":"none",transition:"all 0.3s",flexShrink:0}}/>
                  ))}
                  {orbTarget>15&&<span style={{color:"#7A7060",fontSize:12,alignSelf:"center"}}>+{orbTarget-15} more</span>}
                </div>
                {daysLeft!==null&&(
                  <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
                    <span style={{fontSize:13}}>📅</span>
                    <span style={{color:daysLeft<3?"#FF6B6B":daysLeft<7?"#FFD700":"rgba(255,255,255,0.6)",fontSize:12,fontWeight:700}}>
                      {daysLeft<=0?"Deadline passed!":daysLeft===1?"1 day left to deadline":`${daysLeft} days left`}
                    </span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Overdue tasks */}
          {allStale.length>0&&(
            <div style={{marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{color:"#FF9100",fontWeight:800,fontSize:14}}>⏰ Over a week old</span>
                <span style={{background:"rgba(255,145,0,0.2)",color:"#FF9100",borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:700}}>{allStale.length}</span>
              </div>
              {allStale.map((t,i)=>(<Row key={i} name={t.name||t.text} src={t.src} done={charged.includes(t.name||t.text)} onCharge={()=>chargeIt(t.name||t.text)}/>) )}
            </div>
          )}

          {/* What are you putting off */}
          <div style={{marginBottom:16}}>
            <div style={{color:"rgba(255,255,255,0.8)",fontWeight:800,fontSize:14,marginBottom:8}}>💭 What are you putting off?</div>
            <div style={{display:"flex",gap:8,marginBottom:8,background:"rgba(255,255,255,0.07)",borderRadius:12,padding:"10px 14px",border:"1px solid rgba(196,174,232,0.2)"}}>
              <input value={whatOff} onChange={e=>setWhatOff(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addFrog()}
                placeholder="Write what you've been avoiding..."
                style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#fff",fontSize:14,fontWeight:600}}/>
              <button onClick={addFrog} style={{background:"#7c5cbf",color:"#fff",border:"none",borderRadius:9,width:32,height:32,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
            </div>
            {frogs.map(f=>(
              <div key={f.id} style={{display:"flex",alignItems:"center",gap:10,background:f.done?"rgba(39,174,96,0.1)":"rgba(255,255,255,0.06)",borderRadius:12,padding:"10px 14px",marginBottom:7,border:`1.5px solid ${f.done?"rgba(39,174,96,0.5)":"rgba(196,174,232,0.15)"}`}}>
                <button onClick={()=>toggleFrog(f.id)} style={{width:26,height:26,borderRadius:"50%",border:`2.5px solid ${f.done?"#27ae60":"#c4aee8"}`,background:f.done?"#27ae60":"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,fontWeight:900}}>{f.done?"✓":""}</button>
                <span style={{flex:1,color:f.done?"rgba(255,255,255,0.35)":"#fff",fontWeight:600,fontSize:14,textDecoration:f.done?"line-through":"none"}}>{f.text}</span>
                {!f.done&&<span style={{fontSize:14,opacity:0.6}}>⚡</span>}
                <button onClick={()=>delFrog(f.id)} style={{background:"transparent",color:"rgba(255,100,100,0.6)",border:"none",cursor:"pointer",fontSize:14,padding:0}}>🗑</button>
              </div>
            ))}
          </div>

          {/* AI suggestions */}
          <div style={{marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <div style={{color:"rgba(255,255,255,0.8)",fontWeight:800,fontSize:14,flex:1}}>🤖 AI Task Picks</div>
              <button onClick={getAiSugg} disabled={aiLoad} style={{background:"rgba(124,92,191,0.35)",color:"#fff",border:"1px solid rgba(196,174,232,0.4)",borderRadius:20,padding:"5px 13px",fontSize:11,fontWeight:700,cursor:"pointer",opacity:aiLoad?0.6:1}}>
                {aiLoad?"Thinking…":"Ask AI"}
              </button>
            </div>
            {aiSugg.length>0?aiSugg.map((s,i)=>(
              <Row key={i} name={s} src="🤖 AI pick" done={charged.includes(s)} onCharge={()=>chargeIt(s)}/>
            )):(
              <div style={{color:"rgba(255,255,255,0.3)",fontSize:13,fontStyle:"italic",padding:"6px 0"}}>
                Tap "Ask AI" — it'll study your tasks and pick the ones you're most likely avoiding
              </div>
            )}
          </div>

          {/* Charged today summary */}
          {charged.length>0&&(
            <GlassCard>
              <div style={{fontWeight:800,color:C.dp,fontSize:14,marginBottom:8}}>✅ Charged today ({charged.length})</div>
              {charged.map((n,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<charged.length-1?`1px solid ${C.ll}`:"none"}}>
                  <span style={{fontSize:14}}>⚡</span>
                  <span style={{fontSize:13,fontWeight:600,color:C.txt}}>{n}</span>
                </div>
              ))}
            </GlassCard>
          )}
        </>}

        {/* ══ WEEK ══ */}
        {view==="week"&&<>
          {/* Orb for week */}
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:16,background:"rgba(255,255,255,0.05)",borderRadius:20,padding:"20px",border:"1px solid rgba(196,174,232,0.2)"}}>
            <OrbOfLight pct={weekPcts.reduce((a,b)=>a+b,0)/7} size={150}/>
            <div style={{color:"#fff",fontWeight:900,fontSize:20,marginTop:10}}>Weekly Light</div>
            <div style={{color:"rgba(255,255,255,0.55)",fontSize:13,marginTop:4}}>{daysHit}/7 days fully charged · {weekTotal} total tasks</div>
            {daysHit>=5&&data.weeklyAward&&(
              <div style={{marginTop:12,background:"rgba(255,215,0,0.15)",border:"1.5px solid rgba(255,215,0,0.45)",borderRadius:14,padding:"10px 18px",textAlign:"center"}}>
                <div style={{color:"#FFD700",fontWeight:900,fontSize:15,marginBottom:2}}>🎁 Weekly reward unlocked!</div>
                <div style={{color:"rgba(255,255,255,0.8)",fontSize:14}}>{data.weeklyAward}</div>
              </div>
            )}
          </div>

          {/* Day bars */}
          <GlassCard style={{marginBottom:14}}>
            <div style={{fontWeight:800,color:C.dp,fontSize:14,marginBottom:12}}>📊 This week</div>
            <div style={{display:"flex",gap:6,alignItems:"flex-end",height:80}}>
              {weekDays.map((d,i)=>{
                const p=weekPcts[i];
                const isToday=d===today;
                const dayDate=new Date(d);
                return(
                  <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <div style={{width:"100%",height:60,background:C.ll,borderRadius:6,display:"flex",alignItems:"flex-end",overflow:"hidden"}}>
                      <div style={{width:"100%",height:`${Math.max(4,p)}%`,background:p>=100?"#FFD700":p>0?"#c4aee8":C.ll,borderRadius:"4px 4px 0 0",transition:"height 0.4s"}}/>
                    </div>
                    <div style={{fontSize:9,fontWeight:isToday?800:600,color:isToday?C.dp:C.soft}}>{dayNames[dayDate.getDay()]}</div>
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:10}}>
              <span style={{fontSize:12,color:C.soft}}>Target: {target}/day</span>
              <span style={{fontSize:12,fontWeight:700,color:C.dp}}>{weekTotal} tasks charged this week</span>
            </div>
          </GlassCard>

          {/* Streak */}
          <GlassCard style={{marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{fontSize:42}}>🔥</div>
              <div>
                <div style={{fontWeight:900,color:C.dp,fontSize:22}}>{data.streak} day streak</div>
                <div style={{color:C.soft,fontSize:13}}>Days in a row hitting your target</div>
              </div>
            </div>
          </GlassCard>

          {/* Reward section */}
          <GlassCard>
            <div style={{fontWeight:800,color:C.dp,fontSize:14,marginBottom:4}}>🎁 Weekly Reward</div>
            <div style={{color:C.soft,fontSize:13,marginBottom:10}}>Hit your daily target 5+ days to unlock it</div>
            {data.weeklyAward?(
              <div style={{background:"rgba(255,215,0,0.1)",border:"1.5px solid rgba(255,215,0,0.4)",borderRadius:12,padding:"12px 14px",marginBottom:10}}>
                <div style={{fontWeight:700,fontSize:15,color:C.dp}}>{data.weeklyAward}</div>
              </div>
            ):(
              <div style={{color:C.soft,fontSize:13,fontStyle:"italic",marginBottom:10}}>No reward set yet — go to Setup</div>
            )}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
              <span style={{fontSize:13,fontWeight:700,color:daysHit>=5?"#27ae60":C.soft}}>{daysHit>=5?"✅ Reward unlocked!":` ${5-daysHit} more days to unlock`}</span>
              <button onClick={getAwardIdeas} disabled={awardLoad} style={{background:btnGrad,color:C.wh,border:"none",borderRadius:20,padding:"6px 14px",fontWeight:800,fontSize:12,cursor:"pointer",opacity:awardLoad?0.6:1}}>
                {awardLoad?"…":"🤖 Reward ideas"}
              </button>
            </div>
            {awardIdeas.length>0&&(
              <div style={{marginTop:10}}>
                {awardIdeas.map((a,i)=>(
                  <button key={i} onClick={()=>{upd({weeklyAward:a});setAwardIdeas([]);showToast("🎁 Reward set!");}}
                    style={{display:"block",width:"100%",textAlign:"left",padding:"9px 12px",background:C.pale,border:`1px solid ${C.ll}`,borderRadius:10,marginBottom:6,cursor:"pointer",fontSize:13,fontWeight:600,color:C.txt}}>
                    {a}
                  </button>
                ))}
              </div>
            )}
          </GlassCard>
        </>}

        {/* ══ SETTINGS ══ */}
        {view==="settings"&&<>

          {/* ── What will you reward yourself with? ── */}
          <GlassCard style={{marginBottom:14}}>
            <div style={{fontWeight:800,color:C.dp,fontSize:15,marginBottom:4}}>🎁 What will you reward yourself with?</div>
            <div style={{color:C.soft,fontSize:13,marginBottom:10}}>Write your reward — what will you give yourself when the orb is fully lit?</div>
            <textarea
              value={editAward?draftAward:data.weeklyAward}
              onChange={e=>setDraftAward(e.target.value)}
              onFocus={()=>{setEditAward(true);setDraftAward(data.weeklyAward);}}
              placeholder="e.g. Long bath with candles, a new book, favourite meal out, cinema trip..."
              rows={3}
              style={{width:"100%",boxSizing:"border-box",padding:"11px 13px",borderRadius:11,border:`1.5px solid ${C.lp}`,fontSize:14,color:C.txt,outline:"none",resize:"none",fontFamily:"inherit",marginBottom:8}}
            />
            {editAward&&(
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                <button onClick={()=>setEditAward(false)} style={{flex:1,background:C.ll,color:C.mid,border:"none",borderRadius:10,padding:"10px",fontWeight:700,cursor:"pointer"}}>Cancel</button>
                <button onClick={()=>{upd({weeklyAward:draftAward.trim()});setEditAward(false);showToast("🎁 Reward saved!");}} style={{flex:2,background:btnGrad,color:C.wh,border:"none",borderRadius:10,padding:"10px",fontWeight:800,cursor:"pointer"}}>Save Reward</button>
              </div>
            )}
            <button onClick={getAwardIdeas} disabled={awardLoad} style={{width:"100%",background:"rgba(255,255,255,0.7)",color:C.dp,border:`1.5px solid ${C.lp}`,borderRadius:10,padding:"9px",fontWeight:700,fontSize:13,cursor:"pointer",opacity:awardLoad?0.6:1}}>
              {awardLoad?"Getting ideas…":"🤖 Get AI reward ideas"}
            </button>
            {awardIdeas.length>0&&(
              <div style={{marginTop:8}}>
                <div style={{fontSize:11,fontWeight:700,color:C.soft,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Tap one to use it</div>
                {awardIdeas.map((a,i)=>(
                  <button key={i} onClick={()=>{upd({weeklyAward:a});setAwardIdeas([]);setEditAward(false);showToast("🎁 Reward set!");}}
                    style={{display:"block",width:"100%",textAlign:"left",padding:"10px 12px",background:C.pale,border:`1.5px solid ${C.lp}`,borderRadius:10,marginBottom:6,cursor:"pointer",fontSize:13,fontWeight:600,color:C.txt}}>
                    {a}
                  </button>
                ))}
              </div>
            )}
          </GlassCard>

          {/* ── How many lights to earn it? ── */}
          <GlassCard style={{marginBottom:14}}>
            <div style={{fontWeight:800,color:C.dp,fontSize:15,marginBottom:4}}>🔮 How many lights to earn the reward?</div>
            <div style={{color:C.soft,fontSize:13,marginBottom:14}}>Each day you hit your daily target = 1 light. Set how many lights it takes to unlock your reward.</div>
            <div style={{display:"flex",alignItems:"center",gap:0,justifyContent:"center",marginBottom:10}}>
              <button onClick={()=>upd({orbTarget:Math.max(1,(data.orbTarget||5)-1)})} style={{background:C.ll,color:C.dp,border:`1.5px solid ${C.lp}`,borderRadius:"10px 0 0 10px",width:48,height:52,fontSize:24,fontWeight:900,cursor:"pointer"}}>−</button>
              <div style={{background:C.pale,border:`1.5px solid ${C.lp}`,borderTop:`1.5px solid ${C.lp}`,borderBottom:`1.5px solid ${C.lp}`,padding:"0 24px",height:52,display:"flex",alignItems:"center",justifyContent:"center",minWidth:80}}>
                <span style={{fontFamily:"monospace",fontSize:38,fontWeight:900,color:C.dp}}>{data.orbTarget||5}</span>
              </div>
              <button onClick={()=>upd({orbTarget:Math.min(30,(data.orbTarget||5)+1)})} style={{background:C.ll,color:C.dp,border:`1.5px solid ${C.lp}`,borderRadius:"0 10px 10px 0",width:48,height:52,fontSize:24,fontWeight:900,cursor:"pointer"}}>+</button>
            </div>
            {/* Quick presets */}
            <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
              {[3,5,7,10,14,21].map(n=>(
                <button key={n} onClick={()=>upd({orbTarget:n})} style={{border:`1.5px solid ${(data.orbTarget||5)===n?C.pp:C.lp}`,borderRadius:20,padding:"4px 12px",fontSize:12,cursor:"pointer",fontWeight:(data.orbTarget||5)===n?800:600,background:(data.orbTarget||5)===n?C.pp:"transparent",color:(data.orbTarget||5)===n?C.wh:C.mp}}>
                  {n} {n===7?"(1 week)":n===14?"(2 weeks)":n===21?"(3 weeks)":""}
                </button>
              ))}
            </div>
            {/* Progress towards orb target */}
            {(data.orbTarget||5)>0&&(()=>{
              const lightsEarned=weekDays.filter(d=>(data.days[d]?.charged||[]).length>=target).length;
              const orbPct=Math.min(100,Math.round((lightsEarned/(data.orbTarget||5))*100));
              return(
                <div style={{marginTop:14,padding:"12px 14px",background:C.pale,borderRadius:12,border:`1px solid ${C.lp}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:13,fontWeight:700,color:C.dp}}>Progress to reward</span>
                    <span style={{fontSize:13,fontWeight:800,color:C.pp}}>{lightsEarned} / {data.orbTarget||5} lights</span>
                  </div>
                  <div style={{height:8,background:C.ll,borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${orbPct}%`,background:orbPct>=100?"#FFD700":btnGrad,borderRadius:4,transition:"width 0.4s"}}/>
                  </div>
                  {orbPct>=100&&<div style={{color:"#27ae60",fontWeight:800,fontSize:13,marginTop:6,textAlign:"center"}}>🎉 Reward unlocked! Go claim it!</div>}
                </div>
              );
            })()}
          </GlassCard>

          {/* ── Deadline ── */}
          <GlassCard style={{marginBottom:14}}>
            <div style={{fontWeight:800,color:C.dp,fontSize:15,marginBottom:4}}>📅 Set a deadline</div>
            <div style={{color:C.soft,fontSize:13,marginBottom:10}}>When do you want to have earned your reward by?</div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <input type="date" value={data.rewardDeadline||""} onChange={e=>upd({rewardDeadline:e.target.value})}
                style={{flex:1,padding:"11px 14px",borderRadius:11,border:`1.5px solid ${C.lp}`,fontSize:15,fontWeight:600,color:C.txt,outline:"none",background:C.pale}}/>
              {data.rewardDeadline&&(()=>{
                const days=Math.ceil((new Date(data.rewardDeadline)-new Date())/(1000*60*60*24));
                const col=days<3?"#e74c3c":days<7?"#f39c12":"#27ae60";
                return <div style={{background:col+"22",border:`1.5px solid ${col}`,borderRadius:10,padding:"6px 12px",textAlign:"center",flexShrink:0}}>
                  <div style={{color:col,fontWeight:900,fontSize:18,lineHeight:1}}>{days}</div>
                  <div style={{color:col,fontWeight:700,fontSize:10}}>days left</div>
                </div>;
              })()}
            </div>
            {/* Quick deadline presets */}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:10}}>
              {[[7,"1 week"],[14,"2 weeks"],[30,"1 month"],[90,"3 months"]].map(([d,l])=>(
                <button key={d} onClick={()=>{const dt=new Date();dt.setDate(dt.getDate()+d);upd({rewardDeadline:dt.toISOString().slice(0,10)});}}
                  style={{border:`1.5px solid ${C.lp}`,borderRadius:20,padding:"4px 12px",fontSize:12,cursor:"pointer",fontWeight:600,background:"transparent",color:C.mp}}>
                  {l}
                </button>
              ))}
              {data.rewardDeadline&&<button onClick={()=>upd({rewardDeadline:""})} style={{border:`1.5px solid #f1948a`,borderRadius:20,padding:"4px 12px",fontSize:12,cursor:"pointer",fontWeight:600,background:"transparent",color:"#c0392b"}}>✕ Clear</button>}
            </div>
          </GlassCard>

          {/* ── Daily target ── */}
          <GlassCard style={{marginBottom:14}}>
            <div style={{fontWeight:800,color:C.dp,fontSize:15,marginBottom:4}}>⚡ Daily task target</div>
            <div style={{color:C.soft,fontSize:13,marginBottom:14}}>How many tasks must you charge each day to earn a light?</div>
            <div style={{display:"flex",alignItems:"center",gap:16,justifyContent:"center"}}>
              <button onClick={()=>upd({dailyTarget:Math.max(1,target-1)})} style={{background:C.ll,color:C.dp,border:`1.5px solid ${C.lp}`,borderRadius:10,width:44,height:44,fontSize:22,fontWeight:900,cursor:"pointer"}}>−</button>
              <div style={{fontFamily:"monospace",fontSize:48,fontWeight:900,color:C.dp,minWidth:70,textAlign:"center"}}>{target}</div>
              <button onClick={()=>upd({dailyTarget:Math.min(10,target+1)})} style={{background:C.ll,color:C.dp,border:`1.5px solid ${C.lp}`,borderRadius:10,width:44,height:44,fontSize:22,fontWeight:900,cursor:"pointer"}}>+</button>
            </div>
            <div style={{textAlign:"center",color:C.soft,fontSize:13,marginTop:8}}>tasks per day = 1 light 🔮</div>
          </GlassCard>

          {/* ── Streak ── */}
          <GlassCard>
            <div style={{fontWeight:800,color:C.dp,fontSize:15,marginBottom:10}}>🔥 Current streak</div>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{fontSize:44}}>🔥</div>
              <div>
                <div style={{fontWeight:900,color:C.dp,fontSize:28}}>{data.streak} days</div>
                <div style={{color:C.soft,fontSize:13}}>consecutive days hitting target</div>
              </div>
            </div>
          </GlassCard>
        </>}
      </div>

      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:C.wh,borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(45,10,94,0.4)",zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
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
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0a1a0a 0%,#0d2b1a 40%,#1a3d2a 100%)",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>

      {/* Header */}
      <HomeBar setScreen={setScreen} title="🌿 Rest Space" onBack={()=>setScreen("home")}/>
      <div style={{background:"linear-gradient(135deg,#0d2b1a,#1e5c3a)",padding:"18px 16px 14px",textAlign:"center",boxShadow:"0 4px 20px rgba(0,0,0,0.3)"}}>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",fontStyle:"italic",lineHeight:1.6}}>
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
            <div style={{background:"linear-gradient(135deg,#0d2b1a,#1e5c3a)",borderRadius:22,padding:"24px 20px",marginBottom:16,boxShadow:"0 8px 32px rgba(0,0,0,0.4)",border:"1px solid rgba(82,196,122,0.3)"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                <button onClick={stopMed} style={{background:"rgba(255,255,255,0.15)",color:"#fff",border:"none",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>←</button>
                <span style={{fontSize:30}}>{activeMed.icon}</span>
                <div style={{flex:1}}>
                  <div style={{color:"#fff",fontWeight:900,fontSize:18}}>{activeMed.title}</div>
                  <div style={{color:"#7A7060",fontSize:12}}>{medDone?"Complete ✨":audioFiles[activeMed.id]?"🎵 Audio playing...":medRunning?"Reading script...":"Paused"}</div>
                </div>
                <button onClick={stopMed} style={{background:"rgba(255,255,255,0.15)",color:"#fff",border:"none",borderRadius:10,padding:"6px 12px",fontWeight:700,fontSize:12,cursor:"pointer"}}>✕ End</button>
              </div>
              {/* Script text — shows when no audio uploaded */}
              {!medDone&&!audioFiles[activeMed.id]&&(
                <div style={{background:"rgba(0,0,0,0.3)",borderRadius:16,padding:"18px 20px",marginBottom:16,minHeight:80,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(82,196,122,0.2)"}}>
                  <div style={{color:"#e0f7e9",fontSize:16,fontWeight:600,textAlign:"center",lineHeight:1.7,fontStyle:"italic"}}>
                    {activeMed.script[Math.min(medStep,activeMed.script.length-1)]}
                  </div>
                </div>
              )}
              {/* Audio playing indicator */}
              {!medDone&&audioFiles[activeMed.id]&&(
                <div style={{background:"rgba(0,0,0,0.3)",borderRadius:16,padding:"18px 20px",marginBottom:16,display:"flex",flexDirection:"column",alignItems:"center",gap:12,border:"1px solid rgba(82,196,122,0.3)"}}>
                  <div style={{display:"flex",gap:6,alignItems:"flex-end",height:32}}>
                    {[0.4,0.7,1,0.8,0.5,0.9,0.6,0.75,0.45,0.85].map((h,i)=>(
                      <div key={i} style={{width:4,borderRadius:2,background:"#52c47a",height:`${h*100}%`,opacity:0.7+i*0.03}}/>
                    ))}
                  </div>
                  <div style={{color:"#e0f7e9",fontSize:14,fontWeight:600,textAlign:"center"}}>🎵 Your guided meditation is playing</div>
                  <div style={{color:"rgba(255,255,255,0.4)",fontSize:12}}>Close your eyes or keep them soft and unfocused</div>
                </div>
              )}
              {medDone&&(
                <div style={{background:"rgba(82,196,122,0.15)",borderRadius:16,padding:"20px",textAlign:"center",border:"1px solid rgba(82,196,122,0.4)"}}>
                  <div style={{fontSize:36,marginBottom:8}}>🌿</div>
                  <div style={{color:"#52c47a",fontWeight:900,fontSize:18,marginBottom:4}}>Rest complete</div>
                  <div style={{color:"rgba(255,255,255,0.6)",fontSize:14}}>Take a moment before moving on</div>
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
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:13,textAlign:"center",marginBottom:14,lineHeight:1.6}}>
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
                      {audioFiles[med.id]&&<span style={{background:"rgba(82,196,122,0.25)",color:"#52c47a",fontSize:10,fontWeight:800,borderRadius:10,padding:"2px 8px"}}>🎵 Audio ready</span>}
                      {!audioFiles[med.id]&&<span style={{color:"rgba(255,255,255,0.3)",fontSize:10}}>📝 Text script</span>}
                    </div>
                  </div>
                  <div style={{color:"rgba(255,255,255,0.3)",fontSize:22}}>▶</div>
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
                      <label style={{background:"rgba(82,196,122,0.2)",color:"#52c47a",border:"1px solid rgba(82,196,122,0.4)",borderRadius:8,padding:"5px 12px",fontSize:11,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
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
              <button onClick={()=>setTab("meditate")} style={{background:"rgba(255,255,255,0.1)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,width:34,height:34,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
              <span style={{color:"rgba(255,255,255,0.7)",fontWeight:700,fontSize:14}}>🎵 Nature Sounds</span>
            </div>
            <WhiteNoise/>
          </div>
        )}

        {/* ── BREAK TIMER ── */}
        {tab==="timer"&&(
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <button onClick={()=>setTab("meditate")} style={{background:"rgba(255,255,255,0.1)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,width:34,height:34,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
              <span style={{color:"rgba(255,255,255,0.7)",fontWeight:700,fontSize:14}}>⏱ Break Timer</span>
            </div>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:13,textAlign:"center",marginBottom:16,lineHeight:1.6}}>
              Set a break timer. During your break, switch to Guided Rest or Sounds 🌿
            </div>
            {/* Big timer display */}
            <div style={{background:"rgba(255,255,255,0.06)",borderRadius:22,padding:"28px 20px",marginBottom:16,textAlign:"center",border:"1px solid rgba(82,196,122,0.2)"}}>
              {breakLeft!==null?(
                <>
                  <div style={{fontFamily:"monospace",fontSize:64,fontWeight:900,color:breakLeft<60?"#FF6B6B":"#52c47a",lineHeight:1,marginBottom:8}}>{fmt(breakLeft)}</div>
                  <div style={{color:"rgba(255,255,255,0.5)",fontSize:13,marginBottom:16}}>
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
                  <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.5)",marginBottom:14}}>Break duration</div>
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
              <div style={{color:"#52c47a",fontWeight:800,fontSize:13,marginBottom:8}}>💙 Rest tips</div>
              {["Avoid screens during your break if possible","Lie down or sit comfortably — you don't need to sleep","Use guided rest instead of napping to avoid sleep inertia","Even 10 minutes of proper rest restores energy","Your body heals and restores during conscious rest"].map((tip,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:6}}>
                  <span style={{color:"#52c47a",flexShrink:0}}>🌿</span>
                  <span style={{color:"rgba(255,255,255,0.6)",fontSize:13}}>{tip}</span>
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

        <button style={{width:"100%",padding:"14px",background:btnGrad,color:C.wh,border:"none",borderRadius:14,fontWeight:900,fontSize:16,cursor:"pointer",marginBottom:10,boxShadow:"0 4px 16px rgba(45,10,94,0.35)"}}>
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

  if(screen==="prioritizer") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><Prioritizer data={priData} setData={setPriData} matrixData={matrixData} setMatrixData={setMatrixData} setScreen={setScreen}/><NavBar current="prioritizer" setScreen={setScreen}/></div></>);
  if(screen==="mindmap") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><MindMap data={mapData} setData={setMapData} priData={priData} setPriData={setPriData} ideasData={ideasData} setIdeasData={setIdeasData} matrixData={matrixData} setMatrixData={setMatrixData} goalsData={goalsData} setGoalsData={setGoalsData} setScreen={setScreen}/><NavBar current="mindmap" setScreen={setScreen}/></div></>);
  if(screen==="notes") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><Notes data={notesData} setData={setNotesData} priData={priData} setPriData={setPriData} mapData={mapData} setMapData={setMapData} ideasData={ideasData} setIdeasData={setIdeasData} matrixData={matrixData} setMatrixData={setMatrixData} goalsData={goalsData} setGoalsData={setGoalsData} setScreen={setScreen}/><NavBar current="notes" setScreen={setScreen}/></div></>);
  if(screen==="meals") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><MealPlanner data={mealData} setData={setMealData} shopData={shopData} setShopData={setShopData} setScreen={setScreen}/><NavBar current="meals" setScreen={setScreen}/></div></>);
  if(screen==="goals") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><Goals data={goalsData} setData={setGoalsData} priData={priData} setPriData={setPriData} matrixData={matrixData} setMatrixData={setMatrixData} setScreen={setScreen}/><NavBar current="goals" setScreen={setScreen}/></div></>);
  if(screen==="matrix") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><Matrix data={matrixData} setData={setMatrixData} priData={priData} setPriData={setPriData} mapData={mapData} setMapData={setMapData} setScreen={setScreen}/><NavBar current="matrix" setScreen={setScreen}/></div></>);
  if(screen==="charge") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><TheCharge priData={priData} matrixData={matrixData} setScreen={setScreen}/><NavBar current="charge" setScreen={setScreen}/></div></>);
  if(screen==="budget") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><BudgetPlanner data={budgetData} setData={setBudgetData} setScreen={setScreen}/><NavBar current="budget" setScreen={setScreen}/></div></>);
  if(screen==="shopping") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><ShoppingList data={shopData} setData={setShopData} setScreen={setScreen}/><NavBar current="shopping" setScreen={setScreen}/></div></>);
  if(screen==="tools") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><Tools setScreen={setScreen}/><NavBar current="tools" setScreen={setScreen}/></div></>);
  if(screen==="rest") return (<><GardenBg/><div style={{position:"relative",zIndex:10,minHeight:"100vh"}}><RestSpace setScreen={setScreen}/><NavBar current="rest" setScreen={setScreen}/></div></>);

  return (
    <>
    <GardenBg/>
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90,position:"relative",zIndex:10}}>

      {/* ── NAME MODAL with vines ── */}
      {showNameModal&&(
        <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(232,225,212,0.9)",backdropFilter:"blur(16px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"}}>
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
            <defs><linearGradient id="mv1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#C8DDB8"/><stop offset="100%" stopColor="#9ABB90"/></linearGradient></defs>
            <path d="M-5 0 Q18 60 6 130 Q-4 200 13 270" stroke="#A8C0A0" strokeWidth="1.8" fill="none" opacity="0.5" strokeLinecap="round"/>
            <path d="M60 8 Q48 -2 34 2 Q24 12 31 25 Q42 32 55 25 Q65 15 60 8Z" fill="url(#mv1)" opacity="0.6"/>
            <path d="M16 80 Q4 70 -10 74 Q-20 84 -13 97 Q-2 104 11 97 Q21 87 16 80Z" fill="url(#mv1)" opacity="0.55"/>
            <path d="M54 81 Q42 71 28 75 Q18 85 25 98 Q36 105 49 98 Q59 88 54 81Z" fill="url(#mv1)" opacity="0.5"/>
            <path d="M-5 844 Q20 780 8 710 Q-4 640 16 570" stroke="#A8C0A0" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round"/>
            <path d="M40 764 Q28 754 14 758 Q4 768 11 781 Q22 788 35 781 Q45 771 40 764Z" fill="url(#mv1)" opacity="0.45"/>
            <path d="M395 0 Q372 58 384 128 Q394 198 377 268" stroke="#A8C0A0" strokeWidth="1.8" fill="none" opacity="0.48" strokeLinecap="round"/>
            <path d="M328 6 Q340 -4 354 0 Q364 10 357 23 Q346 30 333 23 Q323 13 328 6Z" fill="url(#mv1)" opacity="0.58"/>
            <path d="M372 77 Q384 67 398 71 Q408 81 401 94 Q390 101 377 94 Q367 84 372 77Z" fill="url(#mv1)" opacity="0.52"/>
            <path d="M395 844 Q370 780 382 710 Q394 640 374 570" stroke="#A8C0A0" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round"/>
            <path d="M350 764 Q362 754 376 758 Q386 768 379 781 Q368 788 355 781 Q345 771 350 764Z" fill="url(#mv1)" opacity="0.45"/>
          </svg>
          <div style={{background:"rgba(252,249,242,0.96)",borderRadius:32,padding:"40px 28px",width:"100%",maxWidth:340,textAlign:"center",boxShadow:"0 8px 40px rgba(60,50,30,0.14)",border:"1px solid rgba(255,255,255,0.9)",position:"relative",zIndex:1}}>
            <div style={{fontSize:52,marginBottom:14}}>🌿</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:30,fontWeight:700,color:"#1A1A10",marginBottom:8}}>Welcome to Thinko</div>
            <div style={{fontSize:15,color:"#6A6050",lineHeight:1.7,marginBottom:28,fontWeight:300}}>Your calm space for thinking clearly, planning gently, and living fully.</div>
            <div style={{fontSize:13,fontWeight:700,color:"#4A7038",marginBottom:12}}>What shall we call you? 🌱</div>
            <input value={nameInput} onChange={e=>setNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveName()} placeholder="Your first name..." style={{width:"100%",padding:"14px 20px",borderRadius:100,border:"1.5px solid rgba(160,172,140,0.4)",background:"rgba(242,238,228,0.8)",fontFamily:"inherit",fontSize:16,color:"#1A1A10",outline:"none",textAlign:"center",marginBottom:14}}/>
            <button onClick={saveName} style={{width:"100%",padding:"16px",borderRadius:100,background:"#4A7038",color:"white",fontFamily:"inherit",fontSize:16,fontWeight:700,border:"none",cursor:"pointer",boxShadow:"0 4px 16px rgba(74,112,56,0.32)"}}>Begin my journey 🌿</button>
          </div>
        </div>
      )}

      {/* ── GREETING ── */}
      <div style={{padding:"22px 22px 8px"}}>
        {(()=>{const {word,emoji}=getGreeting();return(<div style={{fontFamily:"Georgia,serif",fontSize:32,fontWeight:700,color:"#1A1A10",letterSpacing:-0.5,lineHeight:1.2}}>{word}{userName?`, ${userName}`:""} {emoji}</div>);})()}
        <div style={{fontSize:12,color:"#8A8070",marginTop:4}}>Your calm space is ready</div>
        {TESTING_MODE&&<div style={{marginTop:8,display:"inline-flex",alignItems:"center",gap:6,background:"rgba(74,112,56,0.12)",border:"1px solid rgba(74,112,56,0.25)",borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:700,color:"#4A7038"}}>🔓 Tester Mode</div>}
        <div style={{marginTop:10,display:"flex",alignItems:"center",justifyContent:"flex-end"}}><AuthButton user={user} onSignIn={()=>setShowLoginModal(true)} onSignOut={signOut}/></div>
        {showLoginModal&&<ProLoginModal onClose={()=>setShowLoginModal(false)} onSignIn={()=>{setShowLoginModal(false);signIn();}}/>}
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
