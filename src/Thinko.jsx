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
        <radialGradient id="gVig" cx="50%" cy="50%" r="72%"><stop offset="0%" stopColor="transparent"/><stop offset="100%" stopColor="rgba(30,38,12,0.22)"/></radialGradient>
        <linearGradient id="fA" x1="12%" y1="5%" x2="88%" y2="95%"><stop offset="0%" stopColor="#D2F0A2"/><stop offset="35%" stopColor="#8EC84E"/><stop offset="100%" stopColor="#4A8018"/></linearGradient>
        <linearGradient id="fB" x1="8%" y1="8%" x2="92%" y2="92%"><stop offset="0%" stopColor="#BAE882"/><stop offset="40%" stopColor="#7EBC44"/><stop offset="100%" stopColor="#3E7614"/></linearGradient>
        <linearGradient id="fC" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#A6D46E"/><stop offset="45%" stopColor="#6EAC34"/><stop offset="100%" stopColor="#38680C"/></linearGradient>
        <linearGradient id="fD" x1="20%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stopColor="#C6E892"/><stop offset="50%" stopColor="#84C04C"/><stop offset="100%" stopColor="#487C1C"/></linearGradient>
        <linearGradient id="fE" x1="15%" y1="10%" x2="85%" y2="90%"><stop offset="0%" stopColor="#AED876"/><stop offset="42%" stopColor="#74B43C"/><stop offset="100%" stopColor="#407010"/></linearGradient>
        <linearGradient id="fF" x1="5%" y1="5%" x2="95%" y2="95%"><stop offset="0%" stopColor="#DEF2B2"/><stop offset="45%" stopColor="#9ED468"/><stop offset="100%" stopColor="#5A9028"/></linearGradient>
        <linearGradient id="fG" x1="25%" y1="0%" x2="75%" y2="100%"><stop offset="0%" stopColor="#94C85A"/><stop offset="100%" stopColor="#366404"/></linearGradient>
        <linearGradient id="fH" x1="0%" y1="20%" x2="100%" y2="80%"><stop offset="0%" stopColor="#C8E48A"/><stop offset="55%" stopColor="#84BC44"/><stop offset="100%" stopColor="#4C7C1C"/></linearGradient>
        <linearGradient id="stL" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#5E4A1A"/><stop offset="30%" stopColor="#7A6230"/><stop offset="55%" stopColor="#8A7240"/><stop offset="80%" stopColor="#6E5825"/><stop offset="100%" stopColor="#5A4818"/></linearGradient>
        <linearGradient id="stR" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stopColor="#5E4A1A"/><stop offset="30%" stopColor="#7A6230"/><stop offset="55%" stopColor="#8A7240"/><stop offset="80%" stopColor="#6E5825"/><stop offset="100%" stopColor="#5A4818"/></linearGradient>
        <linearGradient id="stH" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6A5622"/><stop offset="50%" stopColor="#7E6834"/><stop offset="100%" stopColor="#604E1C"/></linearGradient>
        <filter id="lsh" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="1.5" dy="3" stdDeviation="4" floodColor="#081802" floodOpacity="0.42"/></filter>
        <filter id="lsh2" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="#081802" floodOpacity="0.30"/></filter>
        <filter id="shs" x="-15%" y="-15%" width="130%" height="130%"><feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2A3810" floodOpacity="0.28"/></filter>
      </defs>
      <rect width="390" height="844" fill="url(#gWall)"/>
      <rect width="390" height="844" fill="url(#gGold)"/>
      <rect width="390" height="844" fill="url(#gGrn)"/>
      {/* LEFT STEMS */}
      <path d="M-10 844 Q8 758 -2 668 Q-12 580 10 494 Q28 414 6 328 Q-12 248 14 162 Q32 92 10 24" stroke="url(#stL)" strokeWidth="7" fill="none" filter="url(#shs)" strokeLinecap="round"/>
      <path d="M14 844 Q30 762 20 676 Q10 592 30 508 Q48 430 28 346 Q10 268 34 184 Q50 116 30 50" stroke="url(#stL)" strokeWidth="3.8" fill="none" opacity="0.65" strokeLinecap="round"/>
      <path d="M-4 620 Q12 572 2 520 Q-6 470 10 422" stroke="url(#stL)" strokeWidth="2" fill="none" opacity="0.45" strokeLinecap="round"/>
      {/* RIGHT STEMS */}
      <path d="M400 844 Q382 758 392 668 Q402 580 380 494 Q362 414 384 328 Q402 248 376 162 Q358 92 380 24" stroke="url(#stR)" strokeWidth="7" fill="none" filter="url(#shs)" strokeLinecap="round"/>
      <path d="M376 844 Q360 762 370 676 Q380 592 360 508 Q342 430 362 346 Q380 268 356 184 Q340 116 360 50" stroke="url(#stR)" strokeWidth="3.8" fill="none" opacity="0.65" strokeLinecap="round"/>
      <path d="M394 620 Q378 572 388 520 Q396 470 380 422" stroke="url(#stR)" strokeWidth="2" fill="none" opacity="0.45" strokeLinecap="round"/>
      {/* TOP CANOPY STEMS */}
      <path d="M-15 -5 Q55 18 130 8 Q195 0 262 15 Q322 28 395 10" stroke="url(#stH)" strokeWidth="4.5" fill="none" filter="url(#shs)" strokeLinecap="round"/>
      <path d="M-10 8 Q55 30 128 20 Q192 10 258 26 Q318 40 390 22" stroke="url(#stH)" strokeWidth="2.5" fill="none" opacity="0.55" strokeLinecap="round"/>
      <path d="M68 6 Q60 50 72 90 Q80 124 62 160" stroke="url(#stH)" strokeWidth="2.2" fill="none" opacity="0.50" strokeLinecap="round"/>
      <path d="M178 2 Q168 46 180 84 Q188 118 170 152" stroke="url(#stH)" strokeWidth="2" fill="none" opacity="0.48" strokeLinecap="round"/>
      <path d="M298 4 Q290 46 302 84 Q310 118 294 152" stroke="url(#stH)" strokeWidth="2" fill="none" opacity="0.46" strokeLinecap="round"/>
      {/* ALL LEAVES */}
      <g filter="url(#lsh)">
  <path d="M8.9 818.4 C-0.7 812.8 -22.7 811.1 -23.4 826.3 C-13.2 843.6 9.9 846.9 32.9 852.8 C35.3 829.1 40.1 806.2 27.4 790.8 C12.9 786.3 6.9 807.5 8.9 818.4Z" fill="url(#fB)" opacity="0.95"/>
  <path d="M8.9 818.4 C16.9 829.8 24.9 841.3 31.1 850.1" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M8.9 818.4 L-9.5 792.1" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M11.5 822.2 Q-4.3 821.3 -19.4 815.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M3.8 820.6 L-1.9 823.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-3.9 818.9 L-9.2 821.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-11.7 817.3 L-16.4 819.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M11.5 822.2 Q16.1 807.0 16.0 790.9" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M12.7 814.4 L17.4 810.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M13.8 806.5 L18.2 802.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M14.9 798.7 L18.9 795.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M14.0 825.7 Q-0.6 824.5 -14.6 818.9" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M6.9 824.0 L1.5 826.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-0.3 822.3 L-5.2 824.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-7.4 820.6 L-11.9 822.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M14.0 825.7 Q17.8 811.5 17.3 796.5" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M14.8 818.4 L19.2 814.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M15.7 811.1 L19.7 807.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M16.5 803.8 L20.1 800.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M16.5 829.3 Q3.0 827.7 -9.8 822.1" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M9.9 827.5 L4.9 829.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M3.3 825.7 L-1.3 827.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-3.2 823.9 L-7.4 825.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M16.5 829.3 Q19.7 816.0 18.8 802.1" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M17.1 822.5 L21.0 818.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M17.6 815.7 L21.2 812.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M18.2 808.9 L21.5 805.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M19.0 832.8 Q6.5 831.0 -5.1 825.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M12.9 831.0 L8.2 833.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M6.9 829.2 L2.6 831.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M0.9 827.3 L-3.0 829.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M19.0 832.8 Q21.5 820.5 20.4 807.7" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M19.3 826.5 L22.8 822.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M19.7 820.2 L22.9 816.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M20.0 814.0 L22.9 810.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M21.4 836.3 Q10.0 834.4 -0.5 829.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M16.0 834.5 L11.6 836.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M10.5 832.7 L6.4 834.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M5.0 830.8 L1.3 832.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M21.4 836.3 Q23.5 824.9 22.1 813.2" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M21.6 830.6 L24.7 827.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M21.7 824.8 L24.6 821.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M21.9 819.0 L24.5 816.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M23.9 839.9 Q13.5 837.8 4.0 832.6" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M18.9 838.1 L14.9 839.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M14.0 836.2 L10.2 837.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M9.0 834.4 L5.6 835.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M23.9 839.9 Q25.5 829.4 23.9 818.7" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M23.9 834.6 L26.7 831.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M23.9 829.3 L26.4 826.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M23.9 824.0 L26.2 821.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M26.4 843.4 Q17.0 841.2 8.4 836.2" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M21.9 841.6 L18.2 842.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M17.4 839.8 L14.0 841.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M12.9 838.0 L9.8 839.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M26.4 843.4 Q27.5 833.8 25.8 824.0" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M26.2 838.6 L28.7 835.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M26.1 833.7 L28.3 830.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M25.9 828.9 L28.0 826.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M28.9 847.0 Q20.4 844.7 12.7 839.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M24.8 845.2 L21.4 846.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M20.8 843.5 L17.6 844.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M16.8 841.7 L13.9 842.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M28.9 847.0 Q29.7 838.2 27.8 829.4" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M28.6 842.6 L30.7 839.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M28.3 838.2 L30.3 835.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M28.1 833.8 L29.9 831.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="-0.9" cy="817.9" rx="13.6" ry="9.6" fill="rgba(255,255,255,0.28)" transform="rotate(-45 -0.9 817.9)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M-4.9 773.3 C-13.1 767.1 -33.4 763.0 -35.8 777.0 C-28.2 794.3 -7.1 800.0 13.6 808.1 C18.5 786.4 25.5 765.7 15.4 749.8 C2.5 743.9 -5.4 763.0 -4.9 773.3Z" fill="url(#fC)" opacity="0.92"/>
  <path d="M-4.9 773.3 C1.3 784.9 7.4 796.5 12.2 805.5" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M-4.9 773.3 L-19.0 746.9" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M-2.8 777.2 Q-17.4 774.6 -30.8 767.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M-9.8 774.8 L-15.4 777.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-16.8 772.4 L-22.0 774.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-23.8 770.1 L-28.5 771.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-2.8 777.2 Q3.1 763.7 4.9 748.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M-0.9 770.1 L4.0 766.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M1.0 762.9 L5.6 759.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M3.0 755.8 L7.1 752.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-0.9 780.8 Q-14.4 777.9 -26.7 771.2" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M-7.4 778.4 L-12.6 780.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-13.8 776.0 L-18.6 777.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-20.2 773.6 L-24.7 775.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-0.9 780.8 Q4.2 768.0 5.5 754.1" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M0.7 774.1 L5.2 770.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M2.3 767.4 L6.4 764.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M3.9 760.7 L7.7 757.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M1.0 784.4 Q-11.4 781.4 -22.6 774.8" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M-4.9 782.0 L-9.9 783.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-10.8 779.6 L-15.4 781.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-16.7 777.2 L-20.9 778.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M1.0 784.4 Q5.4 772.4 6.2 759.4" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M2.3 778.1 L6.4 774.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M3.6 771.9 L7.3 768.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M4.9 765.7 L8.3 763.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M2.9 787.9 Q-8.5 784.8 -18.7 778.4" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M-2.5 785.6 L-7.1 786.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M-7.9 783.2 L-12.1 784.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M-13.3 780.8 L-17.1 781.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M2.9 787.9 Q6.7 776.8 7.0 764.8" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M3.9 782.1 L7.6 779.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M5.0 776.4 L8.3 773.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M6.0 770.6 L9.1 768.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M4.8 791.5 Q-5.6 788.4 -14.8 782.2" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M-0.1 789.2 L-4.4 790.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M-5.0 786.9 L-8.9 787.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M-9.9 784.5 L-13.5 785.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M4.8 791.5 Q8.0 781.2 8.0 770.1" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M5.6 786.2 L8.9 783.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M6.4 780.8 L9.4 778.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M7.2 775.4 L10.0 773.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M6.7 795.1 Q-2.7 791.9 -11.0 786.0" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M2.3 792.8 L-1.7 793.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M-2.2 790.6 L-5.8 791.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M-6.6 788.3 L-9.9 789.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M6.7 795.1 Q9.3 785.5 9.0 775.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M7.3 790.2 L10.2 787.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M7.9 785.2 L10.6 782.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M8.5 780.3 L10.9 778.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M8.6 798.7 Q0.1 795.5 -7.3 789.9" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M4.6 796.5 L1.0 797.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M0.6 794.3 L-2.7 795.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M-3.3 792.1 L-6.4 792.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M8.6 798.7 Q10.7 789.9 10.2 780.6" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M9.0 794.2 L11.6 791.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M9.4 789.6 L11.8 787.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M9.8 785.1 L12.0 782.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M10.5 802.2 Q2.8 799.2 -3.7 793.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M6.9 800.2 L3.6 800.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M3.4 798.1 L0.3 798.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M-0.2 796.0 L-2.9 796.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M10.5 802.2 Q12.2 794.2 11.5 785.8" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M10.7 798.1 L13.0 795.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M11.0 794.0 L13.1 791.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M11.2 789.9 L13.2 787.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="-13.9" cy="771.8" rx="12.8" ry="9.0" fill="rgba(255,255,255,0.28)" transform="rotate(-38 -13.9 771.8)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M14.9 730.2 C5.0 723.8 -18.2 720.8 -19.9 736.9 C-10.0 755.8 14.4 760.6 38.5 768.0 C42.4 743.1 48.8 719.0 36.1 701.9 C21.0 696.3 13.4 718.6 14.9 730.2Z" fill="url(#fD)" opacity="0.9"/>
  <path d="M14.9 730.2 C22.8 742.8 30.6 755.4 36.7 765.2" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M14.9 730.2 L-3.1 701.4" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M17.5 734.4 Q0.8 732.6 -15.0 725.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M9.4 732.2 L3.2 735.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M1.2 730.1 L-4.5 732.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-6.9 727.9 L-12.1 730.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M17.5 734.4 Q23.2 718.6 24.0 701.4" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M19.1 726.1 L24.5 721.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M20.8 717.9 L25.7 713.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M22.4 709.6 L26.9 706.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M19.9 738.3 Q4.4 736.1 -10.1 729.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M12.4 736.1 L6.6 738.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M4.9 733.9 L-0.4 736.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-2.6 731.6 L-7.5 733.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M19.9 738.3 Q24.8 723.4 25.1 707.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M21.2 730.6 L26.1 726.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M22.5 722.9 L27.0 719.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M23.8 715.2 L27.9 711.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M22.4 742.2 Q8.1 739.8 -5.2 733.2" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M15.5 739.9 L10.0 742.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M8.6 737.7 L3.6 739.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M1.7 735.4 L-2.9 737.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M22.4 742.2 Q26.5 728.3 26.3 713.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M23.4 735.0 L27.7 731.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M24.3 727.8 L28.4 724.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M25.3 720.6 L29.0 717.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M24.8 746.1 Q11.7 743.5 -0.4 737.0" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M18.5 743.8 L13.4 745.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M12.2 741.5 L7.5 743.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M5.9 739.3 L1.6 740.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M24.8 746.1 Q28.2 733.1 27.7 719.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M25.5 739.4 L29.5 735.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M26.2 732.8 L29.9 729.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M27.0 726.1 L30.3 723.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M27.2 750.0 Q15.2 747.2 4.3 740.9" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M21.5 747.7 L16.7 749.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M15.8 745.5 L11.4 746.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M10.0 743.2 L6.0 744.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M27.2 750.0 Q30.0 738.0 29.2 725.4" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M27.7 743.8 L31.2 740.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M28.2 737.7 L31.4 734.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M28.7 731.5 L31.6 728.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M29.7 753.9 Q18.7 751.0 8.9 745.0" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M24.5 751.6 L20.1 753.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M19.3 749.4 L15.2 750.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M14.1 747.2 L10.4 748.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M29.7 753.9 Q31.9 742.8 30.8 731.3" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M29.9 748.2 L33.1 744.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M30.2 742.6 L33.1 739.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M30.5 736.9 L33.1 734.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M32.1 757.8 Q22.2 754.9 13.4 749.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M27.4 755.6 L23.4 756.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M22.7 753.4 L19.0 754.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M18.1 751.3 L14.7 752.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M32.1 757.8 Q33.9 747.6 32.5 737.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M32.2 752.6 L35.0 749.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M32.3 747.4 L34.9 744.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M32.4 742.3 L34.7 739.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M34.5 761.7 Q25.6 758.8 17.7 753.3" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M30.3 759.6 L26.6 760.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M26.1 757.5 L22.7 758.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M21.9 755.4 L18.8 756.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M34.5 761.7 Q35.9 752.4 34.4 742.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M34.5 757.0 L36.9 754.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M34.5 752.3 L36.7 749.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M34.4 747.6 L36.4 745.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="4.5" cy="729.2" rx="14.5" ry="10.2" fill="rgba(255,255,255,0.28)" transform="rotate(-42 4.5 729.2)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M11.0 686.3 C2.3 680.1 -18.9 676.5 -20.8 691.2 C-12.4 708.8 9.7 714.1 31.5 721.8 C35.7 699.1 42.2 677.3 31.2 661.2 C17.5 655.5 10.0 675.6 11.0 686.3Z" fill="url(#fF)" opacity="0.88"/>
  <path d="M11.0 686.3 C17.8 698.1 24.7 710.0 29.9 719.1" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M11.0 686.3 L-4.6 659.3" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M13.3 690.2 Q-1.8 688.1 -16.0 681.4" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M6.0 688.0 L0.3 690.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-1.3 685.8 L-6.6 688.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-8.7 683.6 L-13.5 685.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M13.3 690.2 Q19.0 676.0 20.3 660.5" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M15.0 682.8 L20.0 679.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M16.8 675.4 L21.4 671.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M18.5 667.9 L22.7 664.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M15.4 693.9 Q1.4 691.5 -11.6 684.9" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M8.7 691.6 L3.3 693.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M1.9 689.4 L-3.0 691.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-4.8 687.1 L-9.3 688.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M15.4 693.9 Q20.3 680.5 21.1 666.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M16.8 686.9 L21.4 683.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M18.2 680.0 L22.4 676.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M19.7 673.0 L23.5 670.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M17.5 697.5 Q4.6 694.9 -7.2 688.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M11.3 695.3 L6.3 697.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M5.1 693.0 L0.5 694.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-1.0 690.7 L-5.3 692.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M17.5 697.5 Q21.7 685.0 22.0 671.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M18.6 691.1 L22.7 687.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M19.8 684.6 L23.5 681.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M20.9 678.1 L24.3 675.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M19.6 701.2 Q7.8 698.4 -3.0 692.1" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M14.0 698.9 L9.3 700.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M8.3 696.7 L4.0 698.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M2.7 694.4 L-1.3 695.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M19.6 701.2 Q23.1 689.5 23.1 677.1" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M20.5 695.2 L24.2 691.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M21.4 689.1 L24.7 686.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M22.2 683.1 L25.3 680.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M21.7 704.8 Q10.9 702.0 1.2 695.9" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M16.6 702.6 L12.2 703.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M11.4 700.4 L7.4 701.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M6.3 698.1 L2.6 699.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M21.7 704.8 Q24.6 694.0 24.3 682.6" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M22.4 699.3 L25.7 696.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M23.0 693.7 L26.0 690.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M23.6 688.1 L26.4 685.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M23.8 708.5 Q14.0 705.6 5.2 699.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M19.2 706.3 L15.1 707.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M14.5 704.1 L10.8 705.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M9.9 701.9 L6.5 702.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M23.8 708.5 Q26.2 698.5 25.6 688.0" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M24.3 703.4 L27.2 700.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M24.7 698.3 L27.4 695.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M25.1 693.1 L27.6 690.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M25.9 712.1 Q17.0 709.2 9.2 703.7" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M21.8 710.0 L18.0 710.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M17.6 707.9 L14.2 708.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M13.4 705.8 L10.3 706.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M25.9 712.1 Q27.9 703.0 27.0 693.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M26.2 707.5 L28.8 704.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M26.5 702.8 L28.9 700.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M26.7 698.1 L28.9 695.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M28.0 715.8 Q20.0 712.9 13.1 707.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M24.3 713.8 L20.9 714.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M20.6 711.7 L17.4 712.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M16.8 709.7 L14.0 710.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M28.0 715.8 Q29.5 707.4 28.5 698.8" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M28.2 711.5 L30.5 708.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M28.3 707.3 L30.4 704.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M28.4 703.0 L30.3 700.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="1.6" cy="685.0" rx="13.2" ry="9.4" fill="rgba(255,255,255,0.28)" transform="rotate(-40 1.6 685.0)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M17.1 643.4 C8.9 637.2 -11.2 633.3 -13.7 647.2 C-6.3 664.2 14.8 669.8 35.4 677.7 C40.4 656.2 47.5 635.6 37.5 620.0 C24.6 614.2 16.6 633.2 17.1 643.4Z" fill="url(#fB)" opacity="0.85"/>
  <path d="M17.1 643.4 C23.2 654.8 29.3 666.2 34.0 675.1" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M17.1 643.4 L3.2 617.2" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M19.2 647.2 Q4.6 644.5 -8.8 637.6" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M12.2 644.8 L6.5 647.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M5.2 642.4 L-0.0 644.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-1.8 640.0 L-6.5 641.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M19.2 647.2 Q25.1 633.6 26.9 618.6" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M21.1 640.0 L26.0 636.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M23.0 632.9 L27.6 629.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M25.0 625.8 L29.1 622.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M21.0 650.7 Q7.6 647.9 -4.7 641.1" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M14.6 648.3 L9.3 650.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M8.2 645.9 L3.3 647.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M1.7 643.5 L-2.7 645.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M21.0 650.7 Q26.2 638.0 27.5 624.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M22.6 644.0 L27.1 640.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M24.2 637.3 L28.4 634.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M25.9 630.7 L29.6 627.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M22.9 654.2 Q10.5 651.2 -0.7 644.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M17.0 651.8 L12.1 653.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M11.1 649.4 L6.6 650.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M5.2 647.0 L1.1 648.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M22.9 654.2 Q27.4 642.3 28.1 629.3" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M24.2 648.0 L28.3 644.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M25.5 641.8 L29.3 638.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M26.8 635.5 L30.2 632.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M24.8 657.8 Q13.4 654.7 3.3 648.3" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M19.4 655.4 L14.8 656.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M14.0 653.0 L9.8 654.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M8.6 650.6 L4.8 651.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M24.8 657.8 Q28.6 646.6 28.9 634.6" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M25.8 652.0 L29.5 648.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M26.9 646.2 L30.2 643.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M27.9 640.4 L31.0 637.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M26.7 661.3 Q16.3 658.1 7.1 652.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M21.8 659.0 L17.5 660.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M16.9 656.6 L13.0 657.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M12.0 654.3 L8.4 655.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M26.7 661.3 Q29.8 650.9 29.9 639.9" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M27.5 655.9 L30.8 653.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M28.3 650.6 L31.3 647.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M29.1 645.2 L31.8 642.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M28.5 664.8 Q19.1 661.7 10.9 655.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M24.1 662.6 L20.2 663.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M19.7 660.3 L16.1 661.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M15.3 658.0 L12.0 658.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M28.5 664.8 Q31.2 655.3 30.9 645.1" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M29.1 659.9 L32.1 657.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M29.7 655.0 L32.4 652.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M30.3 650.0 L32.8 647.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M30.4 668.4 Q21.9 665.2 14.5 659.6" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M26.4 666.2 L22.8 666.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M22.5 664.0 L19.1 664.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M18.5 661.8 L15.5 662.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M30.4 668.4 Q32.6 659.5 32.1 650.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M30.8 663.8 L33.4 661.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M31.2 659.3 L33.6 656.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M31.6 654.8 L33.8 652.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M32.3 671.9 Q24.6 668.8 18.1 663.5" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M28.7 669.8 L25.4 670.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M25.2 667.7 L22.2 668.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M21.6 665.6 L18.9 666.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M32.3 671.9 Q34.0 663.8 33.3 655.4" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M32.5 667.8 L34.9 665.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M32.8 663.7 L34.9 661.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M33.1 659.5 L35.0 657.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="8.1" cy="641.9" rx="12.8" ry="8.9" fill="rgba(255,255,255,0.28)" transform="rotate(-38 8.1 641.9)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M-4.9 598.4 C-13.0 592.7 -32.7 589.5 -34.5 603.1 C-26.8 619.4 -6.2 624.1 14.0 631.2 C18.0 610.1 24.2 590.0 13.9 575.1 C1.3 569.9 -5.8 588.5 -4.9 598.4Z" fill="url(#fC)" opacity="0.82"/>
  <path d="M-4.9 598.4 C1.4 609.4 7.7 620.3 12.6 628.7" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M-4.9 598.4 L-19.3 573.5" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M-2.8 602.1 Q-16.9 600.0 -30.1 593.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M-9.6 600.0 L-15.0 602.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-16.5 597.9 L-21.4 600.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-23.3 595.9 L-27.8 597.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-2.8 602.1 Q2.5 588.8 3.7 574.3" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M-1.2 595.1 L3.5 591.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M0.5 588.2 L4.7 585.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M2.1 581.2 L6.0 578.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-0.9 605.4 Q-13.9 603.2 -26.0 597.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M-7.2 603.3 L-12.2 605.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-13.4 601.2 L-18.1 603.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-19.7 599.1 L-23.9 600.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-0.9 605.4 Q3.7 593.0 4.4 579.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M0.5 598.9 L4.7 595.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M1.8 592.4 L5.7 589.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M3.1 585.9 L6.7 583.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M1.1 608.8 Q-11.0 606.3 -22.0 600.3" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M-4.7 606.7 L-9.4 608.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-10.5 604.6 L-14.8 606.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-16.2 602.5 L-20.2 603.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M1.1 608.8 Q5.0 597.1 5.3 584.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M2.1 602.8 L6.0 599.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M3.2 596.7 L6.7 593.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M4.2 590.6 L7.4 587.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M3.0 612.2 Q-8.0 609.6 -18.1 603.7" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M-2.2 610.1 L-6.6 611.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M-7.5 608.0 L-11.6 609.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M-12.8 605.8 L-16.5 607.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M3.0 612.2 Q6.3 601.3 6.3 589.7" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M3.8 606.6 L7.3 603.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M4.6 600.9 L7.8 598.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M5.5 595.3 L8.3 592.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M5.0 615.5 Q-5.1 612.9 -14.2 607.2" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M0.2 613.5 L-3.9 614.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M-4.6 611.4 L-8.4 612.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M-9.4 609.3 L-12.8 610.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M5.0 615.5 Q7.7 605.5 7.4 594.8" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M5.6 610.4 L8.7 607.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M6.2 605.2 L9.0 602.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M6.8 600.0 L9.3 597.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M6.9 618.9 Q-2.3 616.2 -10.4 610.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M2.6 616.9 L-1.2 617.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M-1.8 614.8 L-5.2 615.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M-6.1 612.8 L-9.3 613.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M6.9 618.9 Q9.2 609.6 8.5 599.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M7.3 614.1 L10.1 611.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M7.7 609.4 L10.3 606.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M8.1 604.6 L10.4 602.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M8.9 622.3 Q0.6 619.5 -6.8 614.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M5.0 620.3 L1.5 621.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M1.1 618.3 L-2.1 619.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M-2.9 616.4 L-5.8 617.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M8.9 622.3 Q10.7 613.7 9.8 604.8" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M9.1 617.9 L11.5 615.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M9.4 613.5 L11.6 611.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M9.6 609.2 L11.6 607.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M10.8 625.7 Q3.3 622.9 -3.2 618.1" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M7.3 623.8 L4.1 624.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M3.8 621.9 L0.9 622.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M0.3 620.0 L-2.3 620.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M10.8 625.7 Q12.2 617.8 11.2 609.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M10.9 621.7 L13.1 619.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M11.0 617.7 L13.0 615.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M11.1 613.7 L12.9 611.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="-13.7" cy="597.3" rx="12.3" ry="8.6" fill="rgba(255,255,255,0.28)" transform="rotate(-40 -13.7 597.3)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M17.2 556.4 C9.1 550.1 -11.0 545.8 -13.7 559.6 C-6.6 576.8 14.3 582.7 34.8 591.0 C40.2 569.5 47.7 549.1 38.0 533.3 C25.2 527.4 16.8 546.1 17.2 556.4Z" fill="url(#fD)" opacity="0.8"/>
  <path d="M17.2 556.4 C23.0 567.9 28.9 579.4 33.5 588.3" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M17.2 556.4 L3.7 530.0" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M19.1 560.2 Q4.6 557.3 -8.7 550.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M12.2 557.7 L6.5 559.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M5.2 555.2 L0.0 557.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-1.8 552.7 L-6.5 554.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M19.1 560.2 Q25.3 546.8 27.4 531.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M21.2 553.1 L26.2 549.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M23.2 546.0 L27.8 542.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M25.3 538.9 L29.5 536.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M20.9 563.8 Q7.5 560.7 -4.6 553.7" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M14.5 561.2 L9.2 563.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M8.1 558.7 L3.3 560.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M1.7 556.2 L-2.7 557.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M20.9 563.8 Q26.3 551.1 27.8 537.1" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M22.7 557.1 L27.2 553.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M24.4 550.4 L28.6 547.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M26.1 543.8 L29.9 541.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M22.7 567.3 Q10.4 564.1 -0.7 557.3" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M16.9 564.8 L11.9 566.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M11.0 562.3 L6.5 563.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M5.2 559.8 L1.0 561.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M22.7 567.3 Q27.4 555.5 28.4 542.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M24.2 561.1 L28.3 558.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M25.6 554.9 L29.4 552.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M27.0 548.7 L30.5 546.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M24.6 570.9 Q13.3 567.6 3.2 561.0" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M19.2 568.4 L14.6 569.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M13.9 565.9 L9.6 567.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M8.5 563.5 L4.7 564.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M24.6 570.9 Q28.5 559.8 29.1 547.8" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M25.7 565.1 L29.4 562.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M26.8 559.3 L30.3 556.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M28.0 553.6 L31.1 551.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M26.4 574.4 Q16.1 571.1 7.0 564.8" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M21.5 572.0 L17.2 573.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M16.7 569.6 L12.7 570.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M11.8 567.2 L8.2 568.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M26.4 574.4 Q29.7 564.1 30.0 553.1" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M27.3 569.1 L30.6 566.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M28.2 563.8 L31.2 561.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M29.1 558.4 L31.9 556.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M28.2 578.0 Q18.8 574.7 10.7 568.6" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M23.8 575.7 L19.9 576.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M19.4 573.3 L15.8 574.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M15.1 571.0 L11.7 571.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M28.2 578.0 Q31.0 568.5 30.9 558.3" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M28.9 573.1 L31.9 570.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M29.5 568.2 L32.3 565.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M30.2 563.2 L32.7 561.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M30.0 581.6 Q21.6 578.3 14.3 572.5" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M26.1 579.3 L22.4 580.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M22.1 577.1 L18.8 577.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M18.2 574.8 L15.2 575.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M30.0 581.6 Q32.3 572.8 32.0 563.5" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M30.5 577.1 L33.2 574.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M31.0 572.6 L33.4 570.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M31.5 568.0 L33.7 565.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M31.8 585.1 Q24.2 581.9 17.8 576.5" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M28.3 583.0 L25.0 583.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M24.8 580.8 L21.7 581.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M21.3 578.7 L18.5 579.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M31.8 585.1 Q33.7 577.1 33.1 568.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M32.1 581.0 L34.5 578.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M32.5 576.9 L34.6 574.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M32.8 572.8 L34.8 570.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="8.2" cy="554.7" rx="12.8" ry="8.9" fill="rgba(255,255,255,0.28)" transform="rotate(-37 8.2 554.7)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M19.1 508.4 C11.1 502.6 -8.5 499.0 -10.6 512.6 C-3.1 529.0 17.4 534.1 37.5 541.5 C41.8 520.5 48.3 500.5 38.4 485.4 C25.8 480.0 18.4 498.5 19.1 508.4Z" fill="url(#fE)" opacity="0.78"/>
  <path d="M19.1 508.4 C25.2 519.4 31.3 530.5 36.1 539.0" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M19.1 508.4 L5.2 483.2" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M21.2 512.1 Q7.1 509.8 -6.0 503.4" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M14.4 509.9 L9.0 512.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M7.6 507.7 L2.6 509.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M0.8 505.5 L-3.7 507.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M21.2 512.1 Q26.7 498.9 28.2 484.4" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M22.9 505.2 L27.6 501.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M24.7 498.3 L29.0 495.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M26.4 491.3 L30.4 488.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M23.0 515.5 Q10.0 513.0 -2.0 506.6" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M16.8 513.3 L11.7 515.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M10.5 511.1 L5.9 512.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M4.3 508.9 L0.0 510.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M23.0 515.5 Q27.8 503.1 28.8 489.6" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M24.5 509.0 L28.8 505.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M25.9 502.5 L29.9 499.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M27.4 496.1 L31.0 493.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M24.9 518.9 Q12.9 516.2 2.0 510.0" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M19.2 516.7 L14.5 518.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M13.5 514.5 L9.1 515.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M7.7 512.2 L3.8 513.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M24.9 518.9 Q29.0 507.3 29.6 494.7" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M26.1 512.9 L30.0 509.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M27.2 506.8 L30.8 503.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M28.4 500.8 L31.7 498.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M26.8 522.3 Q15.8 519.5 5.9 513.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M21.6 520.1 L17.2 521.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M16.3 517.9 L12.3 519.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M11.1 515.7 L7.4 516.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M26.8 522.3 Q30.3 511.5 30.4 499.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M27.7 516.7 L31.2 513.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M28.6 511.1 L31.8 508.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M29.5 505.5 L32.5 502.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M28.7 525.7 Q18.6 522.8 9.7 517.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M23.9 523.5 L19.8 524.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M19.2 521.4 L15.4 522.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M14.4 519.2 L11.0 520.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M28.7 525.7 Q31.6 515.7 31.4 505.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M29.4 520.5 L32.5 517.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M30.1 515.3 L33.0 512.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M30.8 510.2 L33.4 507.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M30.6 529.1 Q21.4 526.2 13.4 520.7" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M26.3 527.0 L22.5 527.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M22.0 524.9 L18.5 525.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M17.7 522.8 L14.5 523.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M30.6 529.1 Q33.0 519.8 32.5 510.0" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M31.1 524.3 L33.9 521.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M31.6 519.6 L34.1 517.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M32.1 514.8 L34.4 512.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M32.5 532.5 Q24.2 529.6 17.0 524.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M28.6 530.5 L25.1 531.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M24.7 528.4 L21.5 529.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M20.9 526.4 L17.9 527.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M32.5 532.5 Q34.4 524.0 33.8 515.0" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M32.8 528.1 L35.3 525.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M33.1 523.8 L35.4 521.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M33.4 519.4 L35.5 517.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M34.4 535.9 Q26.9 533.1 20.5 528.1" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M30.9 534.0 L27.7 534.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M27.4 532.0 L24.5 532.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M24.0 530.0 L21.3 530.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M34.4 535.9 Q35.9 528.1 35.1 520.0" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M34.5 531.9 L36.7 529.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M34.7 528.0 L36.7 525.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M34.9 524.0 L36.7 522.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="10.4" cy="507.1" rx="12.3" ry="8.6" fill="rgba(255,255,255,0.28)" transform="rotate(-39 10.4 507.1)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M21.2 460.4 C13.8 454.3 -5.0 449.8 -7.6 462.8 C-1.2 479.1 18.3 485.2 37.3 493.5 C42.6 473.4 49.8 454.3 40.9 439.2 C29.0 433.3 21.0 450.8 21.2 460.4Z" fill="url(#fH)" opacity="0.76"/>
  <path d="M21.2 460.4 C26.6 471.4 32.0 482.4 36.1 490.9" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M21.2 460.4 L9.0 435.3" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M23.0 464.1 Q9.6 461.2 -2.7 454.3" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M16.6 461.6 L11.3 463.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M10.1 459.2 L5.3 460.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M3.7 456.8 L-0.7 458.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M23.0 464.1 Q29.0 451.7 31.2 437.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M25.1 457.5 L29.8 454.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M27.1 450.9 L31.4 448.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M29.1 444.4 L33.1 441.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M24.7 467.5 Q12.3 464.4 1.0 457.7" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M18.8 465.0 L13.8 466.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M12.9 462.6 L8.3 464.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M6.9 460.2 L2.8 461.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M24.7 467.5 Q29.9 455.8 31.5 442.8" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M26.4 461.3 L30.7 458.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M28.1 455.2 L32.0 452.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M29.8 449.0 L33.4 446.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M26.3 470.9 Q14.9 467.7 4.7 461.2" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M20.9 468.5 L16.3 469.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M15.5 466.0 L11.2 467.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M10.1 463.6 L6.2 464.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M26.3 470.9 Q30.9 459.9 32.0 447.9" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M27.8 465.1 L31.7 462.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M29.2 459.4 L32.8 456.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M30.6 453.6 L33.9 451.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M28.0 474.3 Q17.5 471.0 8.3 464.7" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M23.1 471.9 L18.7 473.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M18.1 469.5 L14.2 470.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M13.2 467.1 L9.6 468.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M28.0 474.3 Q31.9 464.0 32.6 452.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M29.1 468.9 L32.7 466.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M30.3 463.6 L33.5 461.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M31.5 458.2 L34.4 455.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M29.7 477.7 Q20.1 474.4 11.8 468.4" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M25.2 475.4 L21.2 476.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M20.7 473.0 L17.0 473.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M16.2 470.7 L12.9 471.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M29.7 477.7 Q33.0 468.2 33.3 457.9" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M30.6 472.7 L33.7 470.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M31.5 467.8 L34.4 465.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M32.4 462.8 L35.1 460.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M31.3 481.1 Q22.7 477.8 15.2 472.1" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M27.3 478.8 L23.6 479.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M23.2 476.6 L19.8 477.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M19.2 474.3 L16.1 474.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M31.3 481.1 Q34.1 472.3 34.2 462.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M32.0 476.5 L34.9 474.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M32.7 472.0 L35.3 469.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M33.4 467.4 L35.8 465.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M33.0 484.5 Q25.2 481.3 18.5 475.8" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M29.3 482.3 L26.0 482.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M25.7 480.2 L22.6 480.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M22.1 478.0 L19.3 478.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M33.0 484.5 Q35.3 476.4 35.1 467.7" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M33.5 480.3 L36.0 478.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M34.0 476.1 L36.3 474.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M34.5 471.9 L36.7 470.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M34.6 487.9 Q27.6 484.8 21.7 479.6" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M31.4 485.8 L28.3 486.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M28.2 483.8 L25.3 484.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M24.9 481.7 L22.3 482.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M34.6 487.9 Q36.5 480.4 36.1 472.6" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M35.0 484.1 L37.2 481.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M35.4 480.3 L37.4 478.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M35.7 476.4 L37.6 474.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="12.9" cy="458.7" rx="11.9" ry="8.4" fill="rgba(255,255,255,0.28)" transform="rotate(-36 12.9 458.7)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M17.2 412.5 C9.6 406.9 -9.1 403.4 -11.4 416.2 C-4.6 431.8 14.9 436.8 34.0 444.0 C38.7 424.2 45.4 405.2 36.3 390.8 C24.3 385.6 16.8 403.1 17.2 412.5Z" fill="url(#fG)" opacity="0.74"/>
  <path d="M17.2 412.5 C22.8 423.0 28.4 433.5 32.7 441.6" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M17.2 412.5 L4.4 388.5" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M19.1 416.0 Q5.5 413.6 -7.0 407.1" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M12.5 413.8 L7.3 415.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M6.0 411.6 L1.2 413.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-0.5 409.3 L-4.9 411.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M19.1 416.0 Q24.6 403.4 26.3 389.4" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M20.9 409.4 L25.5 406.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M22.7 402.7 L26.9 399.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M24.5 396.1 L28.3 393.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M20.8 419.2 Q8.3 416.6 -3.2 410.3" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M14.8 417.0 L9.9 418.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M8.8 414.8 L4.3 416.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M2.8 412.5 L-1.3 414.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M20.8 419.2 Q25.6 407.4 26.8 394.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M22.3 413.0 L26.5 409.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M23.8 406.8 L27.6 404.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M25.3 400.6 L28.8 398.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M22.5 422.5 Q11.0 419.7 0.5 413.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M17.0 420.2 L12.4 421.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M11.5 418.0 L7.3 419.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M6.0 415.8 L2.2 417.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M22.5 422.5 Q26.7 411.4 27.4 399.3" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M23.7 416.7 L27.5 413.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M24.9 410.9 L28.4 408.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M26.2 405.1 L29.3 402.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M24.2 425.7 Q13.7 422.9 4.2 416.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M19.2 423.5 L14.9 424.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M14.2 421.3 L10.3 422.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M9.2 419.1 L5.6 420.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M24.2 425.7 Q27.8 415.4 28.1 404.2" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M25.2 420.3 L28.6 417.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M26.2 414.9 L29.3 412.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M27.1 409.6 L30.0 407.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M26.0 429.0 Q16.3 426.0 7.8 420.3" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M21.4 426.8 L17.4 427.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M16.9 424.6 L13.2 425.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M12.3 422.5 L9.0 423.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M26.0 429.0 Q28.9 419.3 28.9 409.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M26.7 424.0 L29.8 421.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M27.5 419.0 L30.3 416.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M28.2 414.0 L30.8 411.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M27.7 432.2 Q18.9 429.3 11.2 423.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M23.6 430.1 L19.9 430.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M19.5 428.0 L16.1 428.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M15.3 425.9 L12.3 426.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M27.7 432.2 Q30.1 423.3 29.9 413.9" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M28.2 427.6 L31.0 425.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M28.8 423.0 L31.3 420.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M29.3 418.4 L31.6 416.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M29.4 435.5 Q21.5 432.5 14.6 427.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M25.7 433.4 L22.3 434.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M22.0 431.4 L18.9 432.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M18.3 429.4 L15.5 429.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M29.4 435.5 Q31.4 427.3 30.9 418.6" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M29.8 431.3 L32.2 428.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M30.2 427.1 L32.4 424.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M30.6 422.8 L32.6 420.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M31.1 438.7 Q24.0 435.8 17.9 430.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M27.8 436.8 L24.8 437.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M24.5 434.8 L21.7 435.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M21.2 432.9 L18.6 433.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M31.1 438.7 Q32.7 431.2 32.1 423.4" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M31.4 434.9 L33.5 432.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M31.6 431.0 L33.6 429.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M31.8 427.2 L33.6 425.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="8.8" cy="411.2" rx="11.9" ry="8.2" fill="rgba(255,255,255,0.28)" transform="rotate(-38 8.8 411.2)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M19.3 364.5 C12.2 358.8 -5.8 354.7 -8.4 367.0 C-2.4 382.4 16.3 388.0 34.5 395.7 C39.6 376.6 46.7 358.5 38.3 344.2 C27.0 338.7 19.2 355.4 19.3 364.5Z" fill="url(#fA)" opacity="0.72"/>
  <path d="M19.3 364.5 C24.3 374.9 29.4 385.3 33.3 393.3" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M19.3 364.5 L7.7 340.8" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M21.0 368.0 Q8.0 365.2 -3.8 358.6" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M14.8 365.6 L9.7 367.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M8.6 363.3 L3.9 364.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M2.4 360.9 L-1.9 362.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M21.0 368.0 Q26.7 356.0 28.8 342.6" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M22.9 361.6 L27.5 358.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M24.9 355.3 L29.0 352.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M26.8 349.0 L30.6 346.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M22.5 371.2 Q10.6 368.2 -0.2 361.8" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M16.8 368.8 L12.0 370.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M11.1 366.5 L6.7 367.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M5.4 364.1 L1.4 365.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M22.5 371.2 Q27.6 359.9 29.1 347.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M24.2 365.2 L28.3 362.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M25.8 359.3 L29.6 356.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M27.5 353.4 L30.9 351.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M24.1 374.4 Q13.1 371.3 3.2 365.0" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M18.9 372.0 L14.4 373.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M13.7 369.7 L9.6 370.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M8.5 367.4 L4.7 368.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M24.1 374.4 Q28.4 363.8 29.6 352.2" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M25.5 368.8 L29.2 366.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M26.8 363.3 L30.3 360.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M28.2 357.8 L31.3 355.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M25.7 377.6 Q15.6 374.5 6.7 368.4" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M20.9 375.3 L16.7 376.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M16.2 373.0 L12.3 374.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M11.4 370.7 L7.9 371.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M25.7 377.6 Q29.4 367.7 30.1 357.0" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M26.8 372.4 L30.2 369.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M27.9 367.3 L31.0 364.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M29.0 362.1 L31.8 359.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M27.2 380.8 Q18.0 377.6 10.0 371.8" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M22.9 378.6 L19.0 379.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M18.6 376.3 L15.1 377.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M14.3 374.1 L11.1 374.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M27.2 380.8 Q30.4 371.6 30.8 361.7" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M28.1 376.0 L31.2 373.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M29.0 371.2 L31.8 368.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M29.9 366.5 L32.4 364.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M28.8 384.0 Q20.4 380.9 13.2 375.3" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M24.9 381.8 L21.3 382.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M21.0 379.7 L17.7 380.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M17.1 377.5 L14.1 378.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M28.8 384.0 Q31.4 375.5 31.5 366.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M29.5 379.6 L32.2 377.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M30.1 375.2 L32.7 373.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M30.8 370.8 L33.1 368.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M30.3 387.2 Q22.8 384.1 16.4 378.9" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M26.9 385.1 L23.6 385.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M23.4 383.0 L20.4 383.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M19.9 381.0 L17.1 381.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M30.3 387.2 Q32.6 379.4 32.4 371.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M30.8 383.2 L33.3 380.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M31.4 379.1 L33.6 377.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M31.9 375.1 L33.9 373.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M31.9 390.4 Q25.2 387.4 19.4 382.5" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M28.8 388.4 L25.8 388.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M25.7 386.4 L22.9 386.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M22.6 384.5 L20.1 384.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M31.9 390.4 Q33.7 383.2 33.3 375.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M32.3 386.7 L34.4 384.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M32.6 383.1 L34.6 381.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M33.0 379.4 L34.8 377.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="11.3" cy="362.9" rx="11.4" ry="7.9" fill="rgba(255,255,255,0.28)" transform="rotate(-36 11.3 362.9)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M17.3 316.5 C10.5 310.9 -6.7 306.5 -9.4 318.4 C-3.8 333.4 14.1 339.2 31.5 347.0 C36.8 328.7 43.8 311.3 35.9 297.3 C25.1 291.8 17.3 307.7 17.3 316.5Z" fill="url(#fB)" opacity="0.7"/>
  <path d="M17.3 316.5 C22.1 326.7 26.8 336.9 30.4 344.7" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M17.3 316.5 L6.5 293.3" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M18.9 319.9 Q6.5 317.0 -4.8 310.5" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M13.0 317.6 L8.1 319.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M7.1 315.2 L2.5 316.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M1.1 312.8 L-3.0 314.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M18.9 319.9 Q24.6 308.5 26.9 295.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M20.9 313.9 L25.3 311.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M22.9 307.8 L26.9 305.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M24.9 301.8 L28.6 299.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M20.4 323.1 Q8.9 320.0 -1.4 313.6" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M14.9 320.7 L10.3 322.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M9.5 318.3 L5.2 319.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M4.1 316.0 L0.2 317.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M20.4 323.1 Q25.4 312.3 27.1 300.3" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M22.0 317.4 L26.1 314.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M23.7 311.7 L27.4 309.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M25.4 306.0 L28.8 303.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M21.8 326.2 Q11.3 323.1 1.9 316.9" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M16.9 323.9 L12.5 325.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M11.9 321.5 L7.9 322.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M6.9 319.2 L3.3 320.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M21.8 326.2 Q26.2 316.1 27.5 305.0" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M23.2 320.9 L26.9 318.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M24.6 315.6 L28.0 313.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M26.0 310.3 L29.1 308.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M23.3 329.3 Q13.6 326.2 5.2 320.2" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M18.8 327.0 L14.7 328.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M14.2 324.8 L10.5 325.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M9.7 322.5 L6.3 323.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M23.3 329.3 Q27.0 319.9 27.9 309.6" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M24.4 324.4 L27.7 321.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M25.6 319.5 L28.6 317.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M26.8 314.5 L29.5 312.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M24.7 332.5 Q16.0 329.3 8.3 323.6" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M20.6 330.2 L16.9 331.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M16.5 328.0 L13.1 328.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M12.4 325.8 L9.3 326.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M24.7 332.5 Q28.0 323.7 28.5 314.2" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M25.7 327.9 L28.7 325.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M26.6 323.3 L29.3 321.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M27.5 318.7 L30.0 316.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M26.2 335.6 Q18.2 332.5 11.4 327.0" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M22.5 333.4 L19.1 334.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M18.8 331.3 L15.6 331.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M15.1 329.1 L12.2 329.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M26.2 335.6 Q28.9 327.5 29.1 318.7" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M26.9 331.4 L29.6 329.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M27.7 327.2 L30.1 325.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M28.4 322.9 L30.6 321.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M27.7 338.7 Q20.5 335.6 14.4 330.5" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M24.3 336.7 L21.2 337.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M21.0 334.6 L18.1 335.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M17.7 332.5 L15.1 332.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M27.7 338.7 Q29.9 331.2 29.9 323.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M28.2 334.9 L30.6 332.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M28.8 331.0 L31.0 329.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M29.3 327.1 L31.3 325.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M29.1 341.9 Q22.7 338.9 17.3 334.0" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M26.2 339.9 L23.3 340.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M23.2 337.9 L20.6 338.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M20.2 336.0 L17.8 336.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M29.1 341.9 Q31.0 335.0 30.7 327.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M29.5 338.3 L31.6 336.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M29.9 334.8 L31.9 333.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M30.3 331.3 L32.1 329.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="9.6" cy="314.8" rx="11.0" ry="7.7" fill="rgba(255,255,255,0.28)" transform="rotate(-35 9.6 314.8)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M-9.5 148.1 C-21.7 142.0 -49.1 141.7 -49.3 160.5 C-35.7 181.0 -6.8 183.2 22.2 188.6 C24.0 159.2 28.8 130.6 12.2 112.5 C-6.1 108.1 -12.4 134.8 -9.5 148.1Z" fill="url(#fA)" opacity="0.96"/>
  <path d="M-9.5 148.1 C1.1 161.6 11.6 175.1 19.8 185.5" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M-9.5 148.1 L-33.6 117.2" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M-6.0 152.6 Q-25.9 152.5 -45.3 146.5" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M-15.8 151.0 L-22.7 155.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-25.6 149.5 L-32.0 153.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-35.5 148.0 L-41.3 151.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-6.0 152.6 Q-1.3 133.3 -2.4 113.0" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M-5.1 142.7 L0.6 137.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-4.2 132.8 L1.1 127.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-3.3 122.9 L1.5 118.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-2.7 156.7 Q-21.2 156.1 -39.1 150.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M-11.8 155.1 L-18.4 158.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-20.9 153.4 L-26.9 156.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-30.0 151.7 L-35.5 154.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-2.7 156.7 Q1.1 138.7 -0.5 119.8" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M-2.2 147.5 L3.0 142.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-1.6 138.3 L3.2 133.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-1.0 129.1 L3.3 124.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M0.5 160.9 Q-16.6 159.9 -33.0 153.7" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M-7.8 159.1 L-14.0 162.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-16.2 157.3 L-21.9 160.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-24.6 155.5 L-29.8 158.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M0.5 160.9 Q3.6 144.1 1.6 126.7" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M0.8 152.4 L5.5 147.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M1.1 143.8 L5.4 139.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M1.4 135.2 L5.3 130.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M3.8 165.1 Q-12.0 163.6 -26.9 157.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M-3.9 163.2 L-9.7 166.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M-11.6 161.3 L-16.9 163.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M-19.3 159.4 L-24.1 161.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M3.8 165.1 Q6.2 149.4 3.9 133.4" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M3.8 157.2 L8.0 152.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M3.8 149.3 L7.7 144.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M3.9 141.4 L7.3 137.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M7.0 169.3 Q-7.4 167.5 -21.0 161.5" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M0.0 167.3 L-5.4 169.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M-7.0 165.4 L-11.9 167.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M-14.0 163.4 L-18.5 165.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M7.0 169.3 Q8.8 154.8 6.3 140.1" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M6.9 162.0 L10.5 157.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M6.7 154.7 L10.1 150.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M6.5 147.4 L9.6 143.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M10.3 173.4 Q-2.9 171.4 -15.2 165.6" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M3.9 171.5 L-1.1 173.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M-2.5 169.5 L-7.1 171.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M-8.8 167.5 L-13.0 169.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M10.3 173.4 Q11.6 160.1 8.8 146.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M9.9 166.8 L13.2 162.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M9.6 160.1 L12.6 156.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M9.2 153.4 L11.9 149.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M13.6 177.6 Q1.6 175.4 -9.5 169.7" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M7.8 175.6 L3.2 177.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M2.0 173.7 L-2.2 175.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M-3.7 171.7 L-7.6 173.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M13.6 177.6 Q14.4 165.4 11.5 153.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M13.1 171.5 L15.9 167.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M12.5 165.5 L15.2 161.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M12.0 159.4 L14.4 156.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M16.8 181.8 Q6.0 179.5 -3.9 174.0" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M11.6 179.8 L7.4 181.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M6.4 177.9 L2.5 179.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M1.3 176.0 L-2.3 177.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M16.8 181.8 Q17.2 170.7 14.3 159.8" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M16.2 176.3 L18.7 172.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M15.6 170.8 L17.9 167.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M14.9 165.3 L17.0 162.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="-21.7" cy="148.3" rx="17.2" ry="11.8" fill="rgba(255,255,255,0.28)" transform="rotate(-48 -21.7 148.3)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M14.2 106.0 C0.4 100.3 -29.9 102.1 -28.6 122.7 C-12.1 144.2 19.9 144.5 52.1 148.1 C51.9 115.7 55.0 83.8 35.3 65.2 C14.9 61.8 10.0 91.6 14.2 106.0Z" fill="url(#fB)" opacity="0.97"/>
  <path d="M14.2 106.0 C26.8 120.0 39.5 134.1 49.2 144.9" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M14.2 106.0 L-14.7 73.9" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M18.4 110.7 Q-3.5 112.1 -25.3 107.0" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M7.5 109.7 L0.2 114.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-3.4 108.8 L-10.1 113.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-14.4 107.9 L-20.5 112.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M18.4 110.7 Q22.1 89.1 19.3 66.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M18.6 99.7 L24.5 93.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M18.9 88.7 L24.3 82.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M19.1 77.8 L24.0 72.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M22.3 115.0 Q1.9 115.8 -18.2 110.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M12.2 113.9 L5.3 118.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M2.1 112.7 L-4.3 116.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-8.1 111.6 L-13.9 115.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M22.3 115.0 Q25.2 94.8 22.0 74.2" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M22.2 104.8 L27.5 98.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M22.1 94.6 L27.0 88.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M22.1 84.4 L26.5 79.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M26.2 119.3 Q7.3 119.5 -11.2 114.0" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M16.9 118.0 L10.3 122.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M7.5 116.7 L1.5 120.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-1.8 115.3 L-7.3 118.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M26.2 119.3 Q28.3 100.6 24.8 81.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M25.9 109.9 L30.6 103.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M25.5 100.5 L29.8 94.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M25.2 91.0 L29.1 85.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M30.1 123.7 Q12.7 123.3 -4.3 117.7" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M21.5 122.2 L15.4 125.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M12.9 120.7 L7.3 124.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M4.3 119.2 L-0.8 122.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M30.1 123.7 Q31.6 106.3 27.8 88.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M29.5 115.0 L33.7 109.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M29.0 106.3 L32.8 101.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M28.4 97.6 L31.9 92.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M34.0 128.0 Q18.0 127.2 2.5 121.6" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M26.2 126.4 L20.4 129.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M18.3 124.8 L13.0 127.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M10.4 123.2 L5.6 125.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M34.0 128.0 Q34.9 112.0 31.0 96.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M33.3 120.0 L37.0 114.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M32.5 112.0 L35.9 107.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M31.7 104.0 L34.8 99.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M37.9 132.4 Q23.2 131.2 9.2 125.6" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M30.8 130.7 L25.4 133.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M23.6 129.0 L18.7 131.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M16.4 127.3 L11.9 129.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M37.9 132.4 Q38.3 117.6 34.3 103.1" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M37.0 125.0 L40.3 120.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M36.1 117.7 L39.1 113.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M35.2 110.4 L37.9 106.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M41.8 136.7 Q28.5 135.2 15.8 129.8" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M35.3 135.0 L30.4 137.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M28.8 133.2 L24.3 135.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M22.3 131.5 L18.2 133.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M41.8 136.7 Q41.8 123.2 37.7 110.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M40.8 130.0 L43.6 125.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M39.8 123.4 L42.4 119.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M38.7 116.8 L41.1 112.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M45.7 141.0 Q33.6 139.3 22.3 134.1" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M39.9 139.3 L35.3 141.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M34.0 137.6 L29.8 139.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M28.2 135.8 L24.3 137.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M45.7 141.0 Q45.3 128.8 41.3 117.0" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M44.6 135.0 L47.1 130.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M43.5 129.0 L45.8 125.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M42.4 123.0 L44.4 119.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="0.8" cy="107.2" rx="18.9" ry="13.0" fill="rgba(255,255,255,0.28)" transform="rotate(-52 0.8 107.2)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M-5.7 66.0 C-18.7 60.0 -47.7 60.6 -47.1 80.4 C-32.0 101.6 -1.3 103.1 29.4 107.8 C30.1 76.7 34.0 46.3 15.7 27.7 C-3.7 23.7 -9.3 52.1 -5.7 66.0Z" fill="url(#fC)" opacity="0.98"/>
  <path d="M-5.7 66.0 C6.0 80.0 17.7 93.9 26.8 104.6" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M-5.7 66.0 L-32.4 34.1" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M-1.8 70.6 Q-22.7 71.3 -43.3 65.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M-12.2 69.4 L-19.3 74.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-22.5 68.2 L-29.1 72.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-32.9 66.9 L-38.9 70.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-1.8 70.6 Q2.5 50.2 0.6 28.9" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M-1.2 60.2 L4.6 54.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-0.6 49.8 L4.7 44.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-0.0 39.3 L4.8 34.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M1.8 75.0 Q-17.6 75.0 -36.6 69.2" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M-7.8 73.5 L-14.5 77.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-17.4 72.1 L-23.6 75.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-27.0 70.7 L-32.6 74.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M1.8 75.0 Q5.2 55.8 2.9 36.1" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M2.1 65.2 L7.3 59.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M2.4 55.5 L7.2 50.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M2.6 45.8 L7.0 40.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M5.4 79.3 Q-12.6 78.8 -30.0 72.9" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M-3.4 77.7 L-9.8 81.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-12.3 76.1 L-18.1 79.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-21.1 74.5 L-26.5 77.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M5.4 79.3 Q8.1 61.4 5.4 43.2" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M5.4 70.3 L10.1 64.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M5.4 61.2 L9.7 56.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M5.4 52.2 L9.3 47.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M9.1 83.6 Q-7.6 82.6 -23.5 76.8" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M0.9 81.9 L-5.1 85.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M-7.2 80.2 L-12.7 83.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M-15.4 78.5 L-20.4 81.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M9.1 83.6 Q11.0 67.0 8.0 50.3" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M8.8 75.2 L13.0 69.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M8.5 66.9 L12.4 62.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M8.3 58.6 L11.8 54.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M12.7 87.9 Q-2.6 86.6 -17.1 80.7" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M5.2 86.1 L-0.4 88.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M-2.2 84.3 L-7.3 86.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M-9.7 82.5 L-14.3 84.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M12.7 87.9 Q14.0 72.6 10.8 57.3" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M12.2 80.2 L15.9 75.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M11.7 72.6 L15.1 68.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M11.3 64.9 L14.4 60.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M16.3 92.2 Q2.3 90.6 -10.8 84.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M9.5 90.3 L4.3 92.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M2.7 88.5 L-2.0 90.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M-4.0 86.7 L-8.4 88.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M16.3 92.2 Q17.1 78.2 13.8 64.2" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M15.7 85.2 L18.9 80.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M15.0 78.2 L18.0 73.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M14.4 71.2 L17.1 67.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M19.9 96.5 Q7.2 94.6 -4.6 89.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M13.8 94.6 L9.0 96.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M7.6 92.8 L3.2 94.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M1.5 90.9 L-2.5 92.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M19.9 96.5 Q20.3 83.7 16.8 71.0" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M19.1 90.1 L22.0 85.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M18.4 83.7 L21.0 79.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M17.6 77.4 L20.0 73.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M23.5 100.8 Q12.0 98.8 1.4 93.4" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M18.0 98.9 L13.6 100.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M12.5 97.1 L8.4 98.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M6.9 95.2 L3.2 96.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M23.5 100.8 Q23.5 89.1 20.1 77.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M22.6 95.0 L25.1 91.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M21.8 89.3 L24.1 85.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M20.9 83.5 L23.0 80.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="-18.5" cy="66.6" rx="18.0" ry="12.5" fill="rgba(255,255,255,0.28)" transform="rotate(-50 -18.5 66.6)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M12.1 26.0 C-2.2 20.7 -33.0 23.7 -31.0 44.7 C-13.5 66.0 19.2 65.0 52.2 67.6 C50.8 34.5 53.0 1.8 32.3 -16.4 C11.3 -19.1 7.3 11.5 12.1 26.0Z" fill="url(#fD)" opacity="0.99"/>
  <path d="M12.1 26.0 C25.5 39.9 38.8 53.7 49.1 64.4" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M12.1 26.0 L-18.5 -5.6" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M16.5 30.6 Q-5.8 32.9 -28.3 28.4" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M5.3 30.1 L-1.9 35.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-5.9 29.5 L-12.6 34.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-17.1 29.0 L-23.2 33.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M16.5 30.6 Q19.6 8.4 15.9 -14.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M16.4 19.4 L22.2 12.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M16.2 8.2 L21.5 1.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M16.1 -3.0 L20.9 -9.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M20.7 34.9 Q-0.1 36.4 -20.9 31.7" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M10.3 34.1 L3.4 39.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-0.1 33.3 L-6.5 37.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-10.5 32.5 L-16.3 36.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M20.7 34.9 Q22.9 14.2 18.9 -6.8" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M20.2 24.5 L25.4 17.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M19.8 14.1 L24.5 7.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M19.3 3.7 L23.6 -2.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M24.8 39.2 Q5.5 40.0 -13.6 35.0" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M15.2 38.1 L8.7 42.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M5.6 37.1 L-0.4 41.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-4.0 36.1 L-9.5 39.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M24.8 39.2 Q26.3 19.9 22.0 0.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M24.1 29.5 L28.7 23.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M23.4 19.9 L27.6 14.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M22.7 10.3 L26.6 4.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M28.9 43.5 Q11.1 43.7 -6.4 38.6" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M20.1 42.2 L13.9 46.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M11.2 41.0 L5.6 44.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M2.4 39.8 L-2.8 43.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M28.9 43.5 Q29.8 25.6 25.3 7.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M28.0 34.6 L32.1 28.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M27.1 25.7 L30.9 20.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M26.2 16.8 L29.6 11.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M33.1 47.7 Q16.6 47.5 0.6 42.3" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M25.0 46.4 L19.2 49.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M16.8 45.0 L11.6 48.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M8.7 43.7 L3.9 46.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M33.1 47.7 Q33.4 31.3 28.8 15.1" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M32.0 39.6 L35.6 33.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M30.9 31.4 L34.2 26.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M29.8 23.3 L32.9 18.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M37.2 52.0 Q22.1 51.3 7.6 46.2" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M29.8 50.6 L24.4 53.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M22.4 49.1 L17.5 51.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M15.0 47.6 L10.5 50.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M37.2 52.0 Q37.0 36.9 32.4 22.3" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M36.0 44.6 L39.1 39.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M34.8 37.1 L37.7 32.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M33.6 29.7 L36.2 25.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M41.3 56.3 Q27.6 55.3 14.5 50.2" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M34.6 54.8 L29.6 57.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M27.9 53.2 L23.3 55.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M21.2 51.7 L17.0 53.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M41.3 56.3 Q40.8 42.5 36.1 29.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M40.0 49.5 L42.8 44.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M38.7 42.8 L41.2 38.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M37.4 36.0 L39.7 31.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M45.4 60.6 Q33.0 59.3 21.2 54.3" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M39.4 59.0 L34.8 61.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M33.3 57.4 L29.1 59.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M27.3 55.9 L23.4 57.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M45.4 60.6 Q44.6 48.1 40.0 36.1" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M44.1 54.5 L46.4 49.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M42.7 48.4 L44.9 44.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M41.4 42.2 L43.4 38.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="-1.6" cy="27.7" rx="19.4" ry="13.2" fill="rgba(255,255,255,0.28)" transform="rotate(-54 -1.6 27.7)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M-11.8 -10.0 C-25.3 -15.6 -54.9 -13.9 -53.6 6.3 C-37.5 27.4 -6.1 27.7 25.5 31.4 C25.1 -0.4 28.1 -31.6 8.8 -49.9 C-11.2 -53.3 -16.0 -24.0 -11.8 -10.0Z" fill="url(#fE)" opacity="1.0"/>
  <path d="M-11.8 -10.0 C0.6 3.8 13.1 17.6 22.6 28.2" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M-11.8 -10.0 L-40.1 -41.5" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M-7.6 -5.4 Q-29.0 -4.0 -50.3 -9.0" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M-18.3 -6.3 L-25.4 -1.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-29.0 -7.2 L-35.5 -2.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-39.7 -8.1 L-45.6 -3.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-7.6 -5.4 Q-4.0 -26.5 -6.7 -48.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M-7.4 -16.1 L-1.7 -22.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-7.2 -26.8 L-1.9 -32.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-7.0 -37.5 L-2.2 -43.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-3.8 -1.1 Q-23.7 -0.4 -43.4 -5.6" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M-13.7 -2.2 L-20.5 2.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-23.6 -3.4 L-29.8 0.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-33.5 -4.5 L-39.1 -0.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-3.8 -1.1 Q-1.0 -20.8 -4.1 -40.9" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M-3.9 -11.1 L1.3 -17.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-4.0 -21.0 L0.8 -26.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-4.1 -31.0 L0.3 -36.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M0.0 3.1 Q-18.4 3.3 -36.5 -2.1" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M-9.1 1.8 L-15.5 5.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-18.2 0.5 L-24.1 4.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-27.4 -0.8 L-32.7 2.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M0.0 3.1 Q2.1 -15.2 -1.4 -33.7" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M-0.3 -6.1 L4.3 -12.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-0.7 -15.3 L3.6 -20.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-1.0 -24.5 L2.8 -29.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M3.9 7.4 Q-13.2 7.0 -29.7 1.6" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M-4.5 5.9 L-10.5 9.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M-12.9 4.5 L-18.4 7.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M-21.3 3.0 L-26.4 6.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M3.9 7.4 Q5.3 -9.6 1.6 -26.6" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M3.3 -1.1 L7.4 -6.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M2.7 -9.6 L6.5 -14.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M2.2 -18.1 L5.6 -22.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M7.7 11.6 Q-8.0 10.9 -23.1 5.4" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M0.0 10.1 L-5.6 13.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M-7.7 8.5 L-12.8 11.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M-15.4 7.0 L-20.1 9.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M7.7 11.6 Q8.5 -4.0 4.7 -19.6" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M6.9 3.8 L10.6 -1.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M6.2 -4.0 L9.5 -8.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M5.4 -11.8 L8.5 -16.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M11.5 15.9 Q-2.8 14.8 -16.5 9.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M4.5 14.3 L-0.7 16.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M-2.5 12.6 L-7.3 15.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M-9.5 11.0 L-13.9 13.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M11.5 15.9 Q11.9 1.5 7.9 -12.6" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M10.6 8.8 L13.8 3.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M9.7 1.6 L12.6 -2.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M8.8 -5.5 L11.5 -9.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M15.4 20.2 Q2.3 18.7 -10.0 13.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M9.0 18.5 L4.2 20.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M2.7 16.8 L-1.8 18.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M-3.7 15.1 L-7.7 17.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M15.4 20.2 Q15.3 7.0 11.3 -5.8" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M14.3 13.7 L17.1 9.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M13.3 7.2 L15.9 3.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M12.3 0.7 L14.6 -3.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M19.2 24.4 Q7.4 22.8 -3.7 17.6" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M13.5 22.7 L9.0 24.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M7.7 21.0 L3.6 22.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M2.0 19.3 L-1.7 21.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M19.2 24.4 Q18.8 12.5 14.8 0.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M18.1 18.5 L20.5 14.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M17.0 12.7 L19.2 8.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M15.9 6.8 L17.9 3.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="-24.9" cy="-8.9" rx="18.5" ry="12.7" fill="rgba(255,255,255,0.28)" transform="rotate(-52 -24.9 -8.9)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M54.9 10.1 C44.9 3.2 20.5 -0.5 18.0 16.2 C27.5 36.1 52.9 41.7 78.0 50.1 C83.3 24.2 91.1 -0.7 78.6 -18.8 C62.9 -25.0 53.9 -2.1 54.9 10.1Z" fill="url(#fF)" opacity="0.88"/>
  <path d="M54.9 10.1 C62.6 23.4 70.3 36.8 76.2 47.1" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M54.9 10.1 L37.3 -20.4" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M57.5 14.5 Q39.8 12.0 23.3 4.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M48.9 12.0 L42.2 14.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M40.4 9.4 L34.2 12.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M31.8 6.8 L26.2 9.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M57.5 14.5 Q64.1 -2.0 65.6 -20.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M59.5 5.8 L65.3 1.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M61.5 -2.8 L66.9 -6.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M63.6 -11.5 L68.4 -15.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M59.8 18.6 Q43.5 15.8 28.4 8.1" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M52.0 16.0 L45.7 18.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M44.1 13.4 L38.3 15.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M36.2 10.8 L31.0 12.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M59.8 18.6 Q65.5 3.1 66.5 -13.9" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M61.5 10.5 L66.8 6.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M63.2 2.4 L68.0 -1.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M64.8 -5.7 L69.2 -9.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M62.2 22.8 Q47.2 19.7 33.4 12.2" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M55.0 20.1 L49.1 22.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M47.8 17.5 L42.4 19.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M40.6 14.8 L35.6 16.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M62.2 22.8 Q67.1 8.2 67.5 -7.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M63.5 15.2 L68.3 11.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M64.8 7.6 L69.2 3.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M66.2 0.1 L70.2 -3.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M64.6 26.9 Q50.8 23.6 38.2 16.3" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M58.0 24.2 L52.5 26.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M51.4 21.6 L46.4 23.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M44.8 19.0 L40.2 20.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M64.6 26.9 Q68.7 13.3 68.6 -1.2" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M65.6 19.9 L69.9 16.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M66.6 12.8 L70.6 9.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M67.6 5.8 L71.2 2.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M67.0 31.0 Q54.3 27.6 43.0 20.6" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M61.0 28.4 L55.9 29.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M55.0 25.8 L50.3 27.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M49.0 23.2 L44.7 24.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M67.0 31.0 Q70.4 18.4 69.9 5.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M67.7 24.5 L71.6 20.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M68.5 18.0 L72.0 14.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M69.2 11.5 L72.4 8.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M69.4 35.1 Q57.9 31.7 47.7 24.9" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M63.9 32.6 L59.2 33.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M58.5 30.0 L54.2 31.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M53.1 27.5 L49.1 28.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M69.4 35.1 Q72.1 23.5 71.4 11.2" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M69.9 29.2 L73.3 25.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M70.4 23.2 L73.5 20.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M70.9 17.2 L73.8 14.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M71.7 39.2 Q61.3 35.8 52.2 29.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M66.8 36.8 L62.5 37.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M62.0 34.3 L58.0 35.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M57.1 31.8 L53.4 32.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M71.7 39.2 Q74.0 28.5 72.9 17.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M72.0 33.8 L75.1 30.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M72.3 28.3 L75.1 25.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M72.6 22.8 L75.2 20.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M74.1 43.4 Q64.8 40.0 56.6 33.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M69.7 41.0 L65.8 41.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M65.4 38.6 L61.7 39.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M61.0 36.2 L57.7 36.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M74.1 43.4 Q75.8 33.6 74.6 23.5" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M74.2 38.4 L76.9 35.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M74.4 33.4 L76.8 30.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M74.5 28.4 L76.7 25.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="44.0" cy="8.8" rx="15.4" ry="10.6" fill="rgba(255,255,255,0.28)" transform="rotate(-40 44.0 8.8)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M89.2 -5.9 C80.6 -13.3 58.7 -19.2 54.9 -4.1 C61.8 15.3 84.6 23.1 106.7 33.5 C113.8 10.1 123.2 -12.0 113.4 -30.1 C99.6 -37.5 89.4 -17.2 89.2 -5.9Z" fill="url(#fG)" opacity="0.82"/>
  <path d="M89.2 -5.9 C95.0 7.2 100.8 20.3 105.3 30.5" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M89.2 -5.9 L75.8 -35.8" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M91.1 -1.5 Q75.3 -5.5 61.0 -14.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M83.6 -4.7 L77.2 -2.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M76.1 -7.8 L70.2 -6.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M68.5 -11.0 L63.2 -9.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M91.1 -1.5 Q98.7 -15.9 101.8 -32.3" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M93.8 -9.2 L99.5 -12.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M96.5 -16.9 L101.7 -20.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M99.2 -24.6 L103.9 -27.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M92.9 2.5 Q78.3 -1.6 65.3 -10.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M86.0 -0.6 L80.1 1.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M79.1 -3.7 L73.6 -2.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M72.2 -6.9 L67.2 -5.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M92.9 2.5 Q99.6 -11.1 102.0 -26.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M95.2 -4.7 L100.4 -8.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M97.5 -11.9 L102.3 -15.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M99.8 -19.2 L104.1 -21.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M94.7 6.6 Q81.3 2.3 69.5 -5.8" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M88.4 3.5 L82.9 4.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M82.1 0.4 L77.0 1.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M75.8 -2.7 L71.1 -1.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M94.7 6.6 Q100.5 -6.2 102.4 -20.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M96.6 -0.2 L101.4 -3.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M98.6 -6.9 L102.9 -9.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M100.5 -13.7 L104.4 -16.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M96.5 10.6 Q84.3 6.4 73.5 -1.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M90.8 7.6 L85.6 8.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M85.0 4.6 L80.3 5.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M79.3 1.5 L75.0 2.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M96.5 10.6 Q101.5 -1.3 102.9 -14.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M98.1 4.3 L102.4 1.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M99.7 -2.0 L103.6 -4.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M101.3 -8.2 L104.9 -10.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M98.3 14.7 Q87.2 10.4 77.5 2.9" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M93.1 11.7 L88.3 12.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M87.9 8.8 L83.5 9.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M82.7 5.9 L78.7 6.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M98.3 14.7 Q102.6 3.5 103.5 -8.7" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M99.6 8.8 L103.5 5.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M100.9 3.0 L104.5 0.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M102.2 -2.8 L105.4 -5.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M100.1 18.7 Q90.0 14.5 81.4 7.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M95.4 15.9 L91.0 16.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M90.7 13.1 L86.7 13.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M86.1 10.2 L82.4 10.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M100.1 18.7 Q103.8 8.4 104.2 -2.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M101.2 13.3 L104.6 10.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M102.2 8.0 L105.4 5.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M103.2 2.6 L106.1 0.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M101.9 22.8 Q92.8 18.7 85.1 11.9" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M97.7 20.1 L93.7 20.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M93.5 17.4 L89.8 17.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M89.3 14.6 L85.9 15.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M101.9 22.8 Q105.0 13.2 105.1 3.0" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M102.7 17.8 L105.8 15.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M103.5 12.9 L106.3 10.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M104.3 8.0 L106.9 5.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M103.7 26.8 Q95.5 22.9 88.7 16.5" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M100.0 24.3 L96.3 24.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M96.2 21.7 L92.8 22.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M92.5 19.1 L89.4 19.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M103.7 26.8 Q106.2 18.1 106.1 8.8" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M104.3 22.3 L107.0 19.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M104.9 17.8 L107.4 15.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M105.5 13.3 L107.8 11.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="79.4" cy="-8.2" rx="14.1" ry="9.8" fill="rgba(255,255,255,0.28)" transform="rotate(-34 79.4 -8.2)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M36.7 -11.7 C26.3 -17.4 2.3 -18.6 1.6 -2.2 C12.9 16.2 38.1 19.1 63.3 24.8 C65.7 -0.9 70.7 -25.8 56.7 -42.2 C40.8 -46.6 34.5 -23.4 36.7 -11.7Z" fill="url(#fH)" opacity="0.85"/>
  <path d="M36.7 -11.7 C45.6 0.4 54.4 12.6 61.3 22.0" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M36.7 -11.7 L16.5 -39.6" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M39.7 -7.7 Q22.4 -8.4 5.6 -14.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M31.2 -9.3 L25.0 -5.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M22.6 -10.9 L17.0 -7.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M14.1 -12.6 L9.0 -9.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M39.7 -7.7 Q44.4 -24.4 44.0 -42.1" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M40.8 -16.3 L45.9 -21.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M41.9 -24.9 L46.6 -29.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M42.9 -33.5 L47.3 -37.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M42.4 -3.9 Q26.3 -5.0 10.9 -10.9" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M34.5 -5.7 L28.7 -2.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M26.7 -7.4 L21.3 -4.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M18.8 -9.1 L13.9 -6.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M42.4 -3.9 Q46.3 -19.6 45.5 -36.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M43.2 -11.9 L47.9 -16.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M44.0 -20.0 L48.3 -24.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M44.7 -28.0 L48.7 -31.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M45.1 -0.2 Q30.3 -1.6 16.2 -7.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M37.9 -2.0 L32.4 0.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M30.7 -3.8 L25.6 -1.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M23.4 -5.6 L18.8 -3.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M45.1 -0.2 Q48.4 -14.8 47.2 -30.0" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M45.6 -7.6 L49.9 -12.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M46.1 -15.1 L50.0 -19.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M46.6 -22.5 L50.2 -26.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M47.9 3.6 Q34.2 1.9 21.3 -3.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M41.2 1.7 L36.1 4.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M34.6 -0.2 L29.9 1.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M28.0 -2.0 L23.7 -0.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M47.9 3.6 Q50.5 -10.0 48.9 -24.0" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M48.1 -3.3 L51.9 -7.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M48.4 -10.2 L51.9 -14.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M48.7 -17.1 L51.8 -20.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M50.6 7.4 Q38.1 5.4 26.4 -0.3" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M44.5 5.4 L39.8 7.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M38.5 3.5 L34.1 5.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M32.4 1.6 L28.4 3.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M50.6 7.4 Q52.6 -5.2 50.8 -18.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M50.7 1.0 L54.0 -2.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M50.7 -5.3 L53.8 -9.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M50.8 -11.7 L53.6 -15.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M53.3 11.1 Q41.9 9.0 31.3 3.5" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M47.8 9.2 L43.4 10.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M42.3 7.3 L38.3 8.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M36.8 5.4 L33.1 6.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M53.3 11.1 Q54.8 -0.4 52.9 -12.2" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M53.2 5.3 L56.2 1.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M53.1 -0.5 L55.8 -3.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M53.0 -6.4 L55.5 -9.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M56.1 14.9 Q45.7 12.6 36.2 7.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M51.1 13.0 L47.0 14.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M46.1 11.1 L42.4 12.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M41.2 9.2 L37.7 10.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M56.1 14.9 Q57.1 4.3 55.0 -6.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M55.8 9.6 L58.4 6.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M55.5 4.3 L57.9 1.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M55.3 -1.1 L57.5 -3.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M58.8 18.6 Q49.4 16.3 40.9 11.2" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M54.3 16.8 L50.6 18.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M49.9 14.9 L46.4 16.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M45.4 13.1 L42.3 14.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M58.8 18.6 Q59.5 9.0 57.3 -0.6" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M58.4 13.8 L60.7 10.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M58.0 9.0 L60.1 6.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M57.7 4.2 L59.6 1.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="26.1" cy="-12.0" rx="15.0" ry="10.3" fill="rgba(255,255,255,0.28)" transform="rotate(-46 26.1 -12.0)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M381.1 818.4 C383.1 807.5 377.1 786.3 362.6 790.8 C349.9 806.2 354.7 829.1 357.1 852.8 C380.1 846.9 403.2 843.6 413.4 826.3 C412.7 811.1 390.7 812.8 381.1 818.4Z" fill="url(#fB)" opacity="0.95"/>
  <path d="M381.1 818.4 C373.1 829.8 365.1 841.3 358.9 850.1" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M381.1 818.4 L399.5 792.1" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M378.5 822.2 Q373.9 807.0 374.0 790.9" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M377.3 814.4 L372.6 810.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M376.2 806.5 L371.8 802.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M375.1 798.7 L371.1 795.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M378.5 822.2 Q394.3 821.3 409.4 815.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M386.2 820.6 L391.9 823.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M393.9 818.9 L399.2 821.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M401.7 817.3 L406.4 819.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M376.0 825.7 Q372.2 811.5 372.7 796.5" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M375.2 818.4 L370.8 814.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M374.3 811.1 L370.3 807.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M373.5 803.8 L369.9 800.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M376.0 825.7 Q390.6 824.5 404.6 818.9" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M383.1 824.0 L388.5 826.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M390.3 822.3 L395.2 824.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M397.4 820.6 L401.9 822.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M373.5 829.3 Q370.3 816.0 371.2 802.1" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M372.9 822.5 L369.0 818.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M372.4 815.7 L368.8 812.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M371.8 808.9 L368.5 805.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M373.5 829.3 Q387.0 827.7 399.8 822.1" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M380.1 827.5 L385.1 829.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M386.7 825.7 L391.3 827.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M393.2 823.9 L397.4 825.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M371.0 832.8 Q368.5 820.5 369.6 807.7" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M370.7 826.5 L367.2 822.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M370.3 820.2 L367.1 816.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M370.0 814.0 L367.1 810.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M371.0 832.8 Q383.5 831.0 395.1 825.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M377.1 831.0 L381.8 833.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M383.1 829.2 L387.4 831.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M389.1 827.3 L393.0 829.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M368.6 836.3 Q366.5 824.9 367.9 813.2" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M368.4 830.6 L365.3 827.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M368.3 824.8 L365.4 821.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M368.1 819.0 L365.5 816.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M368.6 836.3 Q380.0 834.4 390.5 829.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M374.0 834.5 L378.4 836.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M379.5 832.7 L383.6 834.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M385.0 830.8 L388.7 832.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M366.1 839.9 Q364.5 829.4 366.1 818.7" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M366.1 834.6 L363.3 831.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M366.1 829.3 L363.6 826.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M366.1 824.0 L363.8 821.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M366.1 839.9 Q376.5 837.8 386.0 832.6" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M371.1 838.1 L375.1 839.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M376.0 836.2 L379.8 837.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M381.0 834.4 L384.4 835.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M363.6 843.4 Q362.5 833.8 364.2 824.0" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M363.8 838.6 L361.3 835.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M363.9 833.7 L361.7 830.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M364.1 828.9 L362.0 826.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M363.6 843.4 Q373.0 841.2 381.6 836.2" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M368.1 841.6 L371.8 842.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M372.6 839.8 L376.0 841.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M377.1 838.0 L380.2 839.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M361.1 847.0 Q360.3 838.2 362.2 829.4" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M361.4 842.6 L359.3 839.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M361.7 838.2 L359.7 835.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M361.9 833.8 L360.1 831.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M361.1 847.0 Q369.6 844.7 377.3 839.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M365.2 845.2 L368.6 846.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M369.2 843.5 L372.4 844.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M373.2 841.7 L376.1 842.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="378.2" cy="809.0" rx="13.6" ry="9.6" fill="rgba(255,255,255,0.28)" transform="rotate(25 378.2 809.0)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M394.9 773.3 C395.4 763.0 387.5 743.9 374.6 749.8 C364.5 765.7 371.5 786.4 376.4 808.1 C397.1 800.0 418.2 794.3 425.8 777.0 C423.4 763.0 403.1 767.1 394.9 773.3Z" fill="url(#fC)" opacity="0.92"/>
  <path d="M394.9 773.3 C388.7 784.9 382.6 796.5 377.8 805.5" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M394.9 773.3 L409.0 746.9" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M392.8 777.2 Q386.9 763.7 385.1 748.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M390.9 770.1 L386.0 766.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M389.0 762.9 L384.4 759.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M387.0 755.8 L382.9 752.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M392.8 777.2 Q407.4 774.6 420.8 767.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M399.8 774.8 L405.4 777.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M406.8 772.4 L412.0 774.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M413.8 770.1 L418.5 771.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M390.9 780.8 Q385.8 768.0 384.5 754.1" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M389.3 774.1 L384.8 770.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M387.7 767.4 L383.6 764.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M386.1 760.7 L382.3 757.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M390.9 780.8 Q404.4 777.9 416.7 771.2" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M397.4 778.4 L402.6 780.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M403.8 776.0 L408.6 777.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M410.2 773.6 L414.7 775.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M389.0 784.4 Q384.6 772.4 383.8 759.4" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M387.7 778.1 L383.6 774.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M386.4 771.9 L382.7 768.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M385.1 765.7 L381.7 763.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M389.0 784.4 Q401.4 781.4 412.6 774.8" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M394.9 782.0 L399.9 783.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M400.8 779.6 L405.4 781.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M406.7 777.2 L410.9 778.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M387.1 787.9 Q383.3 776.8 383.0 764.8" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M386.1 782.1 L382.4 779.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M385.0 776.4 L381.7 773.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M384.0 770.6 L380.9 768.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M387.1 787.9 Q398.5 784.8 408.7 778.4" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M392.5 785.6 L397.1 786.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M397.9 783.2 L402.1 784.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M403.3 780.8 L407.1 781.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M385.2 791.5 Q382.0 781.2 382.0 770.1" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M384.4 786.2 L381.1 783.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M383.6 780.8 L380.6 778.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M382.8 775.4 L380.0 773.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M385.2 791.5 Q395.6 788.4 404.8 782.2" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M390.1 789.2 L394.4 790.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M395.0 786.9 L398.9 787.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M399.9 784.5 L403.5 785.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M383.3 795.1 Q380.7 785.5 381.0 775.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M382.7 790.2 L379.8 787.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M382.1 785.2 L379.4 782.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M381.5 780.3 L379.1 778.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M383.3 795.1 Q392.7 791.9 401.0 786.0" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M387.7 792.8 L391.7 793.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M392.2 790.6 L395.8 791.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M396.6 788.3 L399.9 789.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M381.4 798.7 Q379.3 789.9 379.8 780.6" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M381.0 794.2 L378.4 791.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M380.6 789.6 L378.2 787.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M380.2 785.1 L378.0 782.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M381.4 798.7 Q389.9 795.5 397.3 789.9" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M385.4 796.5 L389.0 797.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M389.4 794.3 L392.7 795.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M393.3 792.1 L396.4 792.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M379.5 802.2 Q377.8 794.2 378.5 785.8" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M379.3 798.1 L377.0 795.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M379.0 794.0 L376.9 791.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M378.8 789.9 L376.8 787.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M379.5 802.2 Q387.2 799.2 393.7 793.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M383.1 800.2 L386.4 800.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M386.6 798.1 L389.7 798.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M390.2 796.0 L392.9 796.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="391.1" cy="765.0" rx="12.8" ry="9.0" fill="rgba(255,255,255,0.28)" transform="rotate(18 391.1 765.0)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M375.1 730.2 C376.6 718.6 369.0 696.3 353.9 701.9 C341.2 719.0 347.6 743.1 351.5 768.0 C375.6 760.6 400.0 755.8 409.9 736.9 C408.2 720.8 385.0 723.8 375.1 730.2Z" fill="url(#fD)" opacity="0.9"/>
  <path d="M375.1 730.2 C367.2 742.8 359.4 755.4 353.3 765.2" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M375.1 730.2 L393.1 701.4" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M372.5 734.4 Q366.8 718.6 366.0 701.4" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M370.9 726.1 L365.5 721.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M369.2 717.9 L364.3 713.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M367.6 709.6 L363.1 706.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M372.5 734.4 Q389.2 732.6 405.0 725.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M380.6 732.2 L386.8 735.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M388.8 730.1 L394.5 732.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M396.9 727.9 L402.1 730.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M370.1 738.3 Q365.2 723.4 364.9 707.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M368.8 730.6 L363.9 726.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M367.5 722.9 L363.0 719.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M366.2 715.2 L362.1 711.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M370.1 738.3 Q385.6 736.1 400.1 729.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M377.6 736.1 L383.4 738.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M385.1 733.9 L390.4 736.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M392.6 731.6 L397.5 733.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M367.6 742.2 Q363.5 728.3 363.7 713.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M366.6 735.0 L362.3 731.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M365.7 727.8 L361.6 724.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M364.7 720.6 L361.0 717.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M367.6 742.2 Q381.9 739.8 395.2 733.2" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M374.5 739.9 L380.0 742.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M381.4 737.7 L386.4 739.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M388.3 735.4 L392.9 737.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M365.2 746.1 Q361.8 733.1 362.3 719.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M364.5 739.4 L360.5 735.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M363.8 732.8 L360.1 729.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M363.0 726.1 L359.7 723.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M365.2 746.1 Q378.3 743.5 390.4 737.0" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M371.5 743.8 L376.6 745.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M377.8 741.5 L382.5 743.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M384.1 739.3 L388.4 740.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M362.8 750.0 Q360.0 738.0 360.8 725.4" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M362.3 743.8 L358.8 740.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M361.8 737.7 L358.6 734.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M361.3 731.5 L358.4 728.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M362.8 750.0 Q374.8 747.2 385.7 740.9" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M368.5 747.7 L373.3 749.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M374.2 745.5 L378.6 746.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M380.0 743.2 L384.0 744.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M360.3 753.9 Q358.1 742.8 359.2 731.3" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M360.1 748.2 L356.9 744.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M359.8 742.6 L356.9 739.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M359.5 736.9 L356.9 734.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M360.3 753.9 Q371.3 751.0 381.1 745.0" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M365.5 751.6 L369.9 753.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M370.7 749.4 L374.8 750.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M375.9 747.2 L379.6 748.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M357.9 757.8 Q356.1 747.6 357.5 737.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M357.8 752.6 L355.0 749.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M357.7 747.4 L355.1 744.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M357.6 742.3 L355.3 739.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M357.9 757.8 Q367.8 754.9 376.6 749.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M362.6 755.6 L366.6 756.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M367.3 753.4 L371.0 754.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M371.9 751.3 L375.3 752.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M355.5 761.7 Q354.1 752.4 355.6 742.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M355.5 757.0 L353.1 754.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M355.5 752.3 L353.3 749.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M355.6 747.6 L353.6 745.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M355.5 761.7 Q364.4 758.8 372.3 753.3" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M359.7 759.6 L363.4 760.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M363.9 757.5 L367.3 758.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M368.1 755.4 L371.2 756.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="371.5" cy="720.4" rx="14.5" ry="10.2" fill="rgba(255,255,255,0.28)" transform="rotate(22 371.5 720.4)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M379.0 686.3 C380.0 675.6 372.5 655.5 358.8 661.2 C347.8 677.3 354.3 699.1 358.5 721.8 C380.3 714.1 402.4 708.8 410.8 691.2 C408.9 676.5 387.7 680.1 379.0 686.3Z" fill="url(#fF)" opacity="0.88"/>
  <path d="M379.0 686.3 C372.1 698.1 365.3 710.0 360.1 719.1" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M379.0 686.3 L394.6 659.3" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M376.7 690.2 Q371.0 676.0 369.7 660.5" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M375.0 682.8 L370.0 679.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M373.2 675.4 L368.6 671.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M371.5 667.9 L367.3 664.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M376.7 690.2 Q391.8 688.1 406.0 681.4" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M384.0 688.0 L389.7 690.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M391.3 685.8 L396.6 688.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M398.7 683.6 L403.5 685.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M374.6 693.9 Q369.7 680.5 368.9 666.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M373.2 686.9 L368.6 683.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M371.8 680.0 L367.6 676.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M370.3 673.0 L366.5 670.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M374.6 693.9 Q388.6 691.5 401.6 684.9" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M381.3 691.6 L386.7 693.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M388.1 689.4 L393.0 691.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M394.8 687.1 L399.3 688.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M372.5 697.5 Q368.3 685.0 368.0 671.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M371.4 691.1 L367.3 687.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M370.2 684.6 L366.5 681.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M369.1 678.1 L365.7 675.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M372.5 697.5 Q385.4 694.9 397.2 688.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M378.7 695.3 L383.7 697.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M384.9 693.0 L389.5 694.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M391.0 690.7 L395.3 692.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M370.4 701.2 Q366.9 689.5 366.9 677.1" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M369.5 695.2 L365.8 691.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M368.6 689.1 L365.3 686.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M367.8 683.1 L364.7 680.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M370.4 701.2 Q382.2 698.4 393.0 692.1" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M376.0 698.9 L380.7 700.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M381.7 696.7 L386.0 698.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M387.3 694.4 L391.3 695.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M368.3 704.8 Q365.4 694.0 365.7 682.6" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M367.6 699.3 L364.3 696.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M367.0 693.7 L364.0 690.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M366.4 688.1 L363.6 685.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M368.3 704.8 Q379.1 702.0 388.8 695.9" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M373.4 702.6 L377.8 703.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M378.6 700.4 L382.6 701.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M383.7 698.1 L387.4 699.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M366.2 708.5 Q363.8 698.5 364.4 688.0" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M365.7 703.4 L362.8 700.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M365.3 698.3 L362.6 695.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M364.9 693.1 L362.4 690.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M366.2 708.5 Q376.0 705.6 384.8 699.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M370.8 706.3 L374.9 707.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M375.5 704.1 L379.2 705.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M380.1 701.9 L383.5 702.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M364.1 712.1 Q362.1 703.0 363.0 693.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M363.8 707.5 L361.2 704.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M363.5 702.8 L361.1 700.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M363.3 698.1 L361.1 695.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M364.1 712.1 Q373.0 709.2 380.8 703.7" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M368.2 710.0 L372.0 710.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M372.4 707.9 L375.8 708.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M376.6 705.8 L379.7 706.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M362.0 715.8 Q360.5 707.4 361.5 698.8" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M361.8 711.5 L359.5 708.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M361.7 707.3 L359.6 704.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M361.6 703.0 L359.7 700.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M362.0 715.8 Q370.0 712.9 376.9 707.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M365.7 713.8 L369.1 714.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M369.4 711.7 L372.6 712.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M373.2 709.7 L376.0 710.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="375.4" cy="677.5" rx="13.2" ry="9.4" fill="rgba(255,255,255,0.28)" transform="rotate(20 375.4 677.5)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M372.9 643.4 C373.4 633.2 365.4 614.2 352.5 620.0 C342.5 635.6 349.6 656.2 354.6 677.7 C375.2 669.8 396.3 664.2 403.7 647.2 C401.2 633.3 381.1 637.2 372.9 643.4Z" fill="url(#fB)" opacity="0.85"/>
  <path d="M372.9 643.4 C366.8 654.8 360.7 666.2 356.0 675.1" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M372.9 643.4 L386.8 617.2" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M370.8 647.2 Q364.9 633.6 363.1 618.6" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M368.9 640.0 L364.0 636.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M367.0 632.9 L362.4 629.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M365.0 625.8 L360.9 622.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M370.8 647.2 Q385.4 644.5 398.8 637.6" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M377.8 644.8 L383.5 647.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M384.8 642.4 L390.0 644.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M391.8 640.0 L396.5 641.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M369.0 650.7 Q363.8 638.0 362.5 624.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M367.4 644.0 L362.9 640.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M365.8 637.3 L361.6 634.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M364.1 630.7 L360.4 627.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M369.0 650.7 Q382.4 647.9 394.7 641.1" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M375.4 648.3 L380.7 650.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M381.8 645.9 L386.7 647.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M388.3 643.5 L392.7 645.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M367.1 654.2 Q362.6 642.3 361.9 629.3" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M365.8 648.0 L361.7 644.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M364.5 641.8 L360.7 638.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M363.2 635.5 L359.8 632.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M367.1 654.2 Q379.5 651.2 390.7 644.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M373.0 651.8 L377.9 653.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M378.9 649.4 L383.4 650.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M384.8 647.0 L388.9 648.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M365.2 657.8 Q361.4 646.6 361.1 634.6" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M364.2 652.0 L360.5 648.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M363.1 646.2 L359.8 643.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M362.1 640.4 L359.0 637.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M365.2 657.8 Q376.6 654.7 386.7 648.3" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M370.6 655.4 L375.2 656.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M376.0 653.0 L380.2 654.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M381.4 650.6 L385.2 651.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M363.3 661.3 Q360.2 650.9 360.1 639.9" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M362.5 655.9 L359.2 653.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M361.7 650.6 L358.7 647.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M360.9 645.2 L358.2 642.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M363.3 661.3 Q373.7 658.1 382.9 652.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M368.2 659.0 L372.5 660.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M373.1 656.6 L377.0 657.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M378.0 654.3 L381.6 655.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M361.5 664.8 Q358.8 655.3 359.1 645.1" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M360.9 659.9 L357.9 657.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M360.3 655.0 L357.6 652.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M359.7 650.0 L357.2 647.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M361.5 664.8 Q370.9 661.7 379.1 655.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M365.9 662.6 L369.8 663.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M370.3 660.3 L373.9 661.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M374.7 658.0 L378.0 658.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M359.6 668.4 Q357.4 659.5 357.9 650.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M359.2 663.8 L356.6 661.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M358.8 659.3 L356.4 656.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M358.4 654.8 L356.2 652.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M359.6 668.4 Q368.1 665.2 375.5 659.6" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M363.6 666.2 L367.2 666.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M367.5 664.0 L370.9 664.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M371.5 661.8 L374.5 662.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M357.7 671.9 Q356.0 663.8 356.7 655.4" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M357.5 667.8 L355.1 665.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M357.2 663.7 L355.1 661.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M356.9 659.5 L355.0 657.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M357.7 671.9 Q365.4 668.8 371.9 663.5" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M361.3 669.8 L364.6 670.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M364.8 667.7 L367.8 668.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M368.4 665.6 L371.1 666.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="369.1" cy="635.1" rx="12.8" ry="8.9" fill="rgba(255,255,255,0.28)" transform="rotate(18 369.1 635.1)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M394.9 598.4 C395.8 588.5 388.7 569.9 376.1 575.1 C365.8 590.0 372.0 610.1 376.0 631.2 C396.2 624.1 416.8 619.4 424.5 603.1 C422.7 589.5 403.0 592.7 394.9 598.4Z" fill="url(#fC)" opacity="0.82"/>
  <path d="M394.9 598.4 C388.6 609.4 382.3 620.3 377.4 628.7" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M394.9 598.4 L409.3 573.5" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M392.8 602.1 Q387.5 588.8 386.3 574.3" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M391.2 595.1 L386.5 591.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M389.5 588.2 L385.3 585.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M387.9 581.2 L384.0 578.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M392.8 602.1 Q406.9 600.0 420.1 593.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M399.6 600.0 L405.0 602.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M406.5 597.9 L411.4 600.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M413.3 595.9 L417.8 597.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M390.9 605.4 Q386.3 593.0 385.6 579.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M389.5 598.9 L385.3 595.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M388.2 592.4 L384.3 589.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M386.9 585.9 L383.3 583.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M390.9 605.4 Q403.9 603.2 416.0 597.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M397.2 603.3 L402.2 605.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M403.4 601.2 L408.1 603.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M409.7 599.1 L413.9 600.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M388.9 608.8 Q385.0 597.1 384.7 584.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M387.9 602.8 L384.0 599.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M386.8 596.7 L383.3 593.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M385.8 590.6 L382.6 587.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M388.9 608.8 Q401.0 606.3 412.0 600.3" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M394.7 606.7 L399.4 608.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M400.5 604.6 L404.8 606.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M406.2 602.5 L410.2 603.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M387.0 612.2 Q383.7 601.3 383.7 589.7" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M386.2 606.6 L382.7 603.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M385.4 600.9 L382.2 598.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M384.5 595.3 L381.7 592.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M387.0 612.2 Q398.0 609.6 408.1 603.7" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M392.2 610.1 L396.6 611.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M397.5 608.0 L401.6 609.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M402.8 605.8 L406.5 607.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M385.0 615.5 Q382.3 605.5 382.6 594.8" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M384.4 610.4 L381.3 607.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M383.8 605.2 L381.0 602.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M383.2 600.0 L380.7 597.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M385.0 615.5 Q395.1 612.9 404.2 607.2" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M389.8 613.5 L393.9 614.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M394.6 611.4 L398.4 612.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M399.4 609.3 L402.8 610.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M383.1 618.9 Q380.8 609.6 381.5 599.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M382.7 614.1 L379.9 611.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M382.3 609.4 L379.7 606.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M381.9 604.6 L379.6 602.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M383.1 618.9 Q392.3 616.2 400.4 610.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M387.4 616.9 L391.2 617.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M391.8 614.8 L395.2 615.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M396.1 612.8 L399.3 613.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M381.1 622.3 Q379.3 613.7 380.2 604.8" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M380.9 617.9 L378.5 615.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M380.6 613.5 L378.4 611.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M380.4 609.2 L378.4 607.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M381.1 622.3 Q389.4 619.5 396.8 614.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M385.0 620.3 L388.5 621.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M388.9 618.3 L392.1 619.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M392.9 616.4 L395.8 617.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M379.2 625.7 Q377.8 617.8 378.8 609.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M379.1 621.7 L376.9 619.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M379.0 617.7 L377.0 615.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M378.9 613.7 L377.1 611.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M379.2 625.7 Q386.7 622.9 393.2 618.1" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M382.7 623.8 L385.9 624.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M386.2 621.9 L389.1 622.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M389.7 620.0 L392.3 620.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="391.5" cy="590.3" rx="12.3" ry="8.6" fill="rgba(255,255,255,0.28)" transform="rotate(20 391.5 590.3)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M372.8 556.4 C373.2 546.1 364.8 527.4 352.0 533.3 C342.3 549.1 349.8 569.5 355.2 591.0 C375.7 582.7 396.6 576.8 403.7 559.6 C401.0 545.8 380.9 550.1 372.8 556.4Z" fill="url(#fD)" opacity="0.8"/>
  <path d="M372.8 556.4 C367.0 567.9 361.1 579.4 356.5 588.3" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M372.8 556.4 L386.3 530.0" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M370.9 560.2 Q364.7 546.8 362.6 531.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M368.8 553.1 L363.8 549.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M366.8 546.0 L362.2 542.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M364.7 538.9 L360.5 536.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M370.9 560.2 Q385.4 557.3 398.7 550.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M377.8 557.7 L383.5 559.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M384.8 555.2 L390.0 557.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M391.8 552.7 L396.5 554.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M369.1 563.8 Q363.7 551.1 362.2 537.1" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M367.3 557.1 L362.8 553.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M365.6 550.4 L361.4 547.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M363.9 543.8 L360.1 541.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M369.1 563.8 Q382.5 560.7 394.6 553.7" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M375.5 561.2 L380.8 563.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M381.9 558.7 L386.7 560.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M388.3 556.2 L392.7 557.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M367.3 567.3 Q362.6 555.5 361.6 542.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M365.8 561.1 L361.7 558.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M364.4 554.9 L360.6 552.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M363.0 548.7 L359.5 546.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M367.3 567.3 Q379.6 564.1 390.7 557.3" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M373.1 564.8 L378.1 566.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M379.0 562.3 L383.5 563.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M384.8 559.8 L389.0 561.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M365.4 570.9 Q361.5 559.8 360.9 547.8" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M364.3 565.1 L360.6 562.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M363.2 559.3 L359.7 556.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M362.0 553.6 L358.9 551.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M365.4 570.9 Q376.7 567.6 386.8 561.0" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M370.8 568.4 L375.4 569.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M376.1 565.9 L380.4 567.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M381.5 563.5 L385.3 564.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M363.6 574.4 Q360.3 564.1 360.0 553.1" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M362.7 569.1 L359.4 566.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M361.8 563.8 L358.8 561.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M360.9 558.4 L358.1 556.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M363.6 574.4 Q373.9 571.1 383.0 564.8" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M368.5 572.0 L372.8 573.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M373.3 569.6 L377.3 570.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M378.2 567.2 L381.8 568.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M361.8 578.0 Q359.0 568.5 359.1 558.3" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M361.1 573.1 L358.1 570.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M360.5 568.2 L357.7 565.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M359.8 563.2 L357.3 561.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M361.8 578.0 Q371.2 574.7 379.3 568.6" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M366.2 575.7 L370.1 576.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M370.6 573.3 L374.2 574.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M374.9 571.0 L378.3 571.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M360.0 581.6 Q357.7 572.8 358.0 563.5" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M359.5 577.1 L356.8 574.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M359.0 572.6 L356.6 570.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M358.5 568.0 L356.3 565.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M360.0 581.6 Q368.4 578.3 375.7 572.5" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M363.9 579.3 L367.6 580.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M367.9 577.1 L371.2 577.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M371.8 574.8 L374.8 575.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M358.2 585.1 Q356.3 577.1 356.9 568.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M357.9 581.0 L355.5 578.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M357.5 576.9 L355.4 574.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M357.2 572.8 L355.2 570.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M358.2 585.1 Q365.8 581.9 372.2 576.5" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M361.7 583.0 L365.0 583.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M365.2 580.8 L368.3 581.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M368.7 578.7 L371.5 579.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="368.9" cy="548.1" rx="12.8" ry="8.9" fill="rgba(255,255,255,0.28)" transform="rotate(17 368.9 548.1)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M370.9 508.4 C371.6 498.5 364.2 480.0 351.6 485.4 C341.7 500.5 348.2 520.5 352.5 541.5 C372.6 534.1 393.1 529.0 400.6 512.6 C398.5 499.0 378.9 502.6 370.9 508.4Z" fill="url(#fE)" opacity="0.78"/>
  <path d="M370.9 508.4 C364.8 519.4 358.7 530.5 353.9 539.0" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M370.9 508.4 L384.8 483.2" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M368.8 512.1 Q363.3 498.9 361.8 484.4" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M367.1 505.2 L362.4 501.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M365.3 498.3 L361.0 495.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M363.6 491.3 L359.6 488.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M368.8 512.1 Q382.9 509.8 396.0 503.4" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M375.6 509.9 L381.0 512.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M382.4 507.7 L387.4 509.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M389.2 505.5 L393.7 507.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M367.0 515.5 Q362.2 503.1 361.2 489.6" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M365.5 509.0 L361.2 505.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M364.1 502.5 L360.1 499.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M362.6 496.1 L359.0 493.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M367.0 515.5 Q380.0 513.0 392.0 506.6" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M373.2 513.3 L378.3 515.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M379.5 511.1 L384.1 512.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M385.7 508.9 L390.0 510.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M365.1 518.9 Q361.0 507.3 360.4 494.7" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M363.9 512.9 L360.0 509.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M362.8 506.8 L359.2 503.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M361.6 500.8 L358.3 498.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M365.1 518.9 Q377.1 516.2 388.0 510.0" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M370.8 516.7 L375.5 518.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M376.5 514.5 L380.9 515.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M382.3 512.2 L386.2 513.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M363.2 522.3 Q359.7 511.5 359.6 499.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M362.3 516.7 L358.8 513.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M361.4 511.1 L358.2 508.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M360.5 505.5 L357.5 502.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M363.2 522.3 Q374.2 519.5 384.1 513.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M368.4 520.1 L372.8 521.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M373.7 517.9 L377.7 519.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M378.9 515.7 L382.6 516.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M361.3 525.7 Q358.4 515.7 358.6 505.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M360.6 520.5 L357.5 517.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M359.9 515.3 L357.0 512.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M359.2 510.2 L356.6 507.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M361.3 525.7 Q371.4 522.8 380.3 517.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M366.1 523.5 L370.2 524.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M370.8 521.4 L374.6 522.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M375.6 519.2 L379.0 520.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M359.4 529.1 Q357.0 519.8 357.5 510.0" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M358.9 524.3 L356.1 521.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M358.4 519.6 L355.9 517.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M357.9 514.8 L355.6 512.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M359.4 529.1 Q368.6 526.2 376.6 520.7" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M363.7 527.0 L367.5 527.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M368.0 524.9 L371.5 525.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M372.3 522.8 L375.5 523.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M357.5 532.5 Q355.6 524.0 356.2 515.0" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M357.2 528.1 L354.7 525.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M356.9 523.8 L354.6 521.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M356.6 519.4 L354.5 517.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M357.5 532.5 Q365.8 529.6 373.0 524.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M361.4 530.5 L364.9 531.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M365.3 528.4 L368.5 529.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M369.1 526.4 L372.1 527.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M355.6 535.9 Q354.1 528.1 354.9 520.0" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M355.5 531.9 L353.3 529.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M355.3 528.0 L353.3 525.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M355.1 524.0 L353.3 522.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M355.6 535.9 Q363.1 533.1 369.5 528.1" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M359.1 534.0 L362.3 534.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M362.6 532.0 L365.5 532.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M366.0 530.0 L368.7 530.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="367.4" cy="500.3" rx="12.3" ry="8.6" fill="rgba(255,255,255,0.28)" transform="rotate(19 367.4 500.3)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M368.8 460.4 C369.0 450.8 361.0 433.3 349.1 439.2 C340.2 454.3 347.4 473.4 352.7 493.5 C371.7 485.2 391.2 479.1 397.6 462.8 C395.0 449.8 376.2 454.3 368.8 460.4Z" fill="url(#fH)" opacity="0.76"/>
  <path d="M368.8 460.4 C363.4 471.4 358.0 482.4 353.9 490.9" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M368.8 460.4 L381.0 435.3" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M367.0 464.1 Q361.0 451.7 358.8 437.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M364.9 457.5 L360.2 454.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M362.9 450.9 L358.6 448.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M360.9 444.4 L356.9 441.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M367.0 464.1 Q380.4 461.2 392.7 454.3" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M373.4 461.6 L378.7 463.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M379.9 459.2 L384.7 460.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M386.3 456.8 L390.7 458.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M365.3 467.5 Q360.1 455.8 358.5 442.8" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M363.6 461.3 L359.3 458.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M361.9 455.2 L358.0 452.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M360.2 449.0 L356.6 446.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M365.3 467.5 Q377.7 464.4 389.0 457.7" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M371.2 465.0 L376.2 466.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M377.1 462.6 L381.7 464.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M383.1 460.2 L387.2 461.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M363.7 470.9 Q359.1 459.9 358.0 447.9" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M362.2 465.1 L358.3 462.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M360.8 459.4 L357.2 456.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M359.4 453.6 L356.1 451.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M363.7 470.9 Q375.1 467.7 385.3 461.2" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M369.1 468.5 L373.7 469.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M374.5 466.0 L378.8 467.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M379.9 463.6 L383.8 464.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M362.0 474.3 Q358.1 464.0 357.4 452.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M360.9 468.9 L357.3 466.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M359.7 463.6 L356.5 461.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M358.5 458.2 L355.6 455.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M362.0 474.3 Q372.5 471.0 381.7 464.7" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M366.9 471.9 L371.3 473.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M371.9 469.5 L375.8 470.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M376.8 467.1 L380.4 468.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M360.3 477.7 Q357.0 468.2 356.7 457.9" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M359.4 472.7 L356.3 470.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M358.5 467.8 L355.6 465.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M357.6 462.8 L354.9 460.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M360.3 477.7 Q369.9 474.4 378.2 468.4" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M364.8 475.4 L368.8 476.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M369.3 473.0 L373.0 473.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M373.8 470.7 L377.1 471.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M358.7 481.1 Q355.9 472.3 355.8 462.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M358.0 476.5 L355.1 474.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M357.3 472.0 L354.7 469.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M356.6 467.4 L354.2 465.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M358.7 481.1 Q367.3 477.8 374.8 472.1" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M362.7 478.8 L366.4 479.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M366.8 476.6 L370.2 477.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M370.8 474.3 L373.9 474.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M357.0 484.5 Q354.7 476.4 354.9 467.7" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M356.5 480.3 L354.0 478.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M356.0 476.1 L353.7 474.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M355.5 471.9 L353.3 470.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M357.0 484.5 Q364.8 481.3 371.5 475.8" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M360.7 482.3 L364.0 482.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M364.3 480.2 L367.4 480.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M367.9 478.0 L370.7 478.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M355.4 487.9 Q353.5 480.4 353.9 472.6" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M355.0 484.1 L352.8 481.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M354.6 480.3 L352.6 478.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M354.3 476.4 L352.4 474.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M355.4 487.9 Q362.4 484.8 368.3 479.6" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M358.6 485.8 L361.7 486.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M361.8 483.8 L364.7 484.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M365.1 481.7 L367.7 482.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="365.0" cy="452.7" rx="11.9" ry="8.4" fill="rgba(255,255,255,0.28)" transform="rotate(16 365.0 452.7)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M372.8 412.5 C373.2 403.1 365.7 385.6 353.7 390.8 C344.6 405.2 351.3 424.2 356.0 444.0 C375.1 436.8 394.6 431.8 401.4 416.2 C399.1 403.4 380.4 406.9 372.8 412.5Z" fill="url(#fG)" opacity="0.74"/>
  <path d="M372.8 412.5 C367.2 423.0 361.6 433.5 357.3 441.6" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M372.8 412.5 L385.6 388.5" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M370.9 416.0 Q365.4 403.4 363.7 389.4" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M369.1 409.4 L364.5 406.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M367.3 402.7 L363.1 399.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M365.5 396.1 L361.7 393.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M370.9 416.0 Q384.5 413.6 397.0 407.1" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M377.5 413.8 L382.7 415.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M384.0 411.6 L388.8 413.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M390.5 409.3 L394.9 411.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M369.2 419.2 Q364.4 407.4 363.2 394.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M367.7 413.0 L363.5 409.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M366.2 406.8 L362.4 404.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M364.7 400.6 L361.2 398.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M369.2 419.2 Q381.7 416.6 393.2 410.3" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M375.2 417.0 L380.1 418.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M381.2 414.8 L385.7 416.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M387.2 412.5 L391.3 414.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M367.5 422.5 Q363.3 411.4 362.6 399.3" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M366.3 416.7 L362.5 413.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M365.1 410.9 L361.6 408.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M363.8 405.1 L360.7 402.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M367.5 422.5 Q379.0 419.7 389.5 413.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M373.0 420.2 L377.6 421.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M378.5 418.0 L382.7 419.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M384.0 415.8 L387.8 417.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M365.8 425.7 Q362.2 415.4 361.9 404.2" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M364.8 420.3 L361.4 417.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M363.8 414.9 L360.7 412.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M362.9 409.6 L360.0 407.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M365.8 425.7 Q376.3 422.9 385.8 416.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M370.8 423.5 L375.1 424.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M375.8 421.3 L379.7 422.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M380.8 419.1 L384.4 420.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M364.0 429.0 Q361.1 419.3 361.1 409.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M363.3 424.0 L360.2 421.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M362.5 419.0 L359.7 416.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M361.8 414.0 L359.2 411.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M364.0 429.0 Q373.7 426.0 382.2 420.3" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M368.6 426.8 L372.6 427.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M373.1 424.6 L376.8 425.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M377.7 422.5 L381.0 423.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M362.3 432.2 Q359.9 423.3 360.1 413.9" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M361.8 427.6 L359.0 425.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M361.2 423.0 L358.7 420.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M360.7 418.4 L358.4 416.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M362.3 432.2 Q371.1 429.3 378.8 423.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M366.4 430.1 L370.1 430.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M370.5 428.0 L373.9 428.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M374.7 425.9 L377.7 426.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M360.6 435.5 Q358.6 427.3 359.1 418.6" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M360.2 431.3 L357.8 428.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M359.8 427.1 L357.6 424.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M359.4 422.8 L357.4 420.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M360.6 435.5 Q368.5 432.5 375.4 427.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M364.3 433.4 L367.7 434.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M368.0 431.4 L371.1 432.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M371.7 429.4 L374.5 429.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M358.9 438.7 Q357.3 431.2 357.9 423.4" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M358.6 434.9 L356.5 432.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M358.4 431.0 L356.4 429.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M358.2 427.2 L356.4 425.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M358.9 438.7 Q366.0 435.8 372.1 430.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M362.2 436.8 L365.2 437.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M365.5 434.8 L368.3 435.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M368.8 432.9 L371.4 433.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="369.2" cy="404.8" rx="11.9" ry="8.2" fill="rgba(255,255,255,0.28)" transform="rotate(18 369.2 404.8)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M370.7 364.5 C370.8 355.4 363.0 338.7 351.7 344.2 C343.3 358.5 350.4 376.6 355.5 395.7 C373.7 388.0 392.4 382.4 398.4 367.0 C395.8 354.7 377.8 358.8 370.7 364.5Z" fill="url(#fA)" opacity="0.72"/>
  <path d="M370.7 364.5 C365.7 374.9 360.6 385.3 356.7 393.3" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M370.7 364.5 L382.3 340.8" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M369.0 368.0 Q363.3 356.0 361.2 342.6" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M367.1 361.6 L362.5 358.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M365.1 355.3 L361.0 352.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M363.2 349.0 L359.4 346.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M369.0 368.0 Q382.0 365.2 393.8 358.6" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M375.2 365.6 L380.3 367.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M381.4 363.3 L386.1 364.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M387.6 360.9 L391.9 362.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M367.5 371.2 Q362.4 359.9 360.9 347.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M365.8 365.2 L361.7 362.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M364.2 359.3 L360.4 356.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M362.5 353.4 L359.1 351.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M367.5 371.2 Q379.4 368.2 390.2 361.8" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M373.2 368.8 L378.0 370.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M378.9 366.5 L383.3 367.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M384.6 364.1 L388.6 365.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M365.9 374.4 Q361.6 363.8 360.4 352.2" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M364.5 368.8 L360.8 366.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M363.2 363.3 L359.7 360.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M361.8 357.8 L358.7 355.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M365.9 374.4 Q376.9 371.3 386.8 365.0" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M371.1 372.0 L375.6 373.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M376.3 369.7 L380.4 370.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M381.5 367.4 L385.3 368.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M364.3 377.6 Q360.6 367.7 359.9 357.0" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M363.2 372.4 L359.8 369.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M362.1 367.3 L359.0 364.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M361.0 362.1 L358.2 359.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M364.3 377.6 Q374.4 374.5 383.3 368.4" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M369.1 375.3 L373.3 376.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M373.8 373.0 L377.7 374.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M378.6 370.7 L382.1 371.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M362.8 380.8 Q359.6 371.6 359.2 361.7" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M361.9 376.0 L358.8 373.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M361.0 371.2 L358.2 368.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M360.1 366.5 L357.6 364.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M362.8 380.8 Q372.0 377.6 380.0 371.8" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M367.1 378.6 L371.0 379.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M371.4 376.3 L374.9 377.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M375.7 374.1 L378.9 374.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M361.2 384.0 Q358.6 375.5 358.5 366.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M360.5 379.6 L357.8 377.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M359.9 375.2 L357.3 373.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M359.2 370.8 L356.9 368.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M361.2 384.0 Q369.6 380.9 376.8 375.3" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M365.1 381.8 L368.7 382.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M369.0 379.7 L372.3 380.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M372.9 377.5 L375.9 378.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M359.7 387.2 Q357.4 379.4 357.6 371.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M359.2 383.2 L356.7 380.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M358.6 379.1 L356.4 377.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M358.1 375.1 L356.1 373.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M359.7 387.2 Q367.2 384.1 373.6 378.9" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M363.1 385.1 L366.4 385.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M366.6 383.0 L369.6 383.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M370.1 381.0 L372.9 381.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M358.1 390.4 Q356.3 383.2 356.7 375.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M357.7 386.7 L355.6 384.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M357.4 383.1 L355.4 381.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M357.0 379.4 L355.2 377.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M358.1 390.4 Q364.8 387.4 370.6 382.5" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M361.2 388.4 L364.2 388.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M364.3 386.4 L367.1 386.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M367.4 384.5 L369.9 384.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="367.1" cy="357.2" rx="11.4" ry="7.9" fill="rgba(255,255,255,0.28)" transform="rotate(16 367.1 357.2)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M372.7 316.5 C372.7 307.7 364.9 291.8 354.1 297.3 C346.2 311.3 353.2 328.7 358.5 347.0 C375.9 339.2 393.8 333.4 399.4 318.4 C396.7 306.5 379.5 310.9 372.7 316.5Z" fill="url(#fB)" opacity="0.7"/>
  <path d="M372.7 316.5 C367.9 326.7 363.2 336.9 359.6 344.7" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M372.7 316.5 L383.5 293.3" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M371.1 319.9 Q365.4 308.5 363.1 295.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M369.1 313.9 L364.7 311.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M367.1 307.8 L363.1 305.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M365.1 301.8 L361.4 299.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M371.1 319.9 Q383.5 317.0 394.8 310.5" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M377.0 317.6 L381.9 319.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M382.9 315.2 L387.5 316.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M388.9 312.8 L393.0 314.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M369.6 323.1 Q364.6 312.3 362.9 300.3" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M368.0 317.4 L363.9 314.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M366.3 311.7 L362.6 309.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M364.6 306.0 L361.2 303.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M369.6 323.1 Q381.1 320.0 391.4 313.6" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M375.1 320.7 L379.7 322.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M380.5 318.3 L384.8 319.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M385.9 316.0 L389.8 317.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M368.2 326.2 Q363.8 316.1 362.5 305.0" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M366.8 320.9 L363.1 318.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M365.4 315.6 L362.0 313.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M364.0 310.3 L360.9 308.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M368.2 326.2 Q378.7 323.1 388.1 316.9" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M373.1 323.9 L377.5 325.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M378.1 321.5 L382.1 322.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M383.1 319.2 L386.7 320.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M366.7 329.3 Q363.0 319.9 362.1 309.6" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M365.6 324.4 L362.3 321.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M364.4 319.5 L361.4 317.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M363.2 314.5 L360.5 312.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M366.7 329.3 Q376.4 326.2 384.8 320.2" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M371.2 327.0 L375.3 328.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M375.8 324.8 L379.5 325.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M380.3 322.5 L383.7 323.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M365.3 332.5 Q362.0 323.7 361.5 314.2" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M364.3 327.9 L361.3 325.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M363.4 323.3 L360.7 321.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M362.5 318.7 L360.0 316.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M365.3 332.5 Q374.0 329.3 381.7 323.6" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M369.4 330.2 L373.1 331.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M373.5 328.0 L376.9 328.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M377.6 325.8 L380.7 326.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M363.8 335.6 Q361.1 327.5 360.9 318.7" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M363.1 331.4 L360.4 329.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M362.3 327.2 L359.9 325.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M361.6 322.9 L359.4 321.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M363.8 335.6 Q371.8 332.5 378.6 327.0" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M367.5 333.4 L370.9 334.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M371.2 331.3 L374.4 331.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M374.9 329.1 L377.8 329.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M362.3 338.7 Q360.1 331.2 360.1 323.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M361.8 334.9 L359.4 332.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M361.2 331.0 L359.0 329.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M360.7 327.1 L358.7 325.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M362.3 338.7 Q369.5 335.6 375.6 330.5" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M365.7 336.7 L368.8 337.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M369.0 334.6 L371.9 335.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M372.3 332.5 L374.9 332.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M360.9 341.9 Q359.0 335.0 359.3 327.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M360.5 338.3 L358.4 336.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M360.1 334.8 L358.1 333.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M359.7 331.3 L357.9 329.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M360.9 341.9 Q367.3 338.9 372.7 334.0" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M363.8 339.9 L366.7 340.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M366.8 337.9 L369.4 338.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M369.8 336.0 L372.2 336.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="369.0" cy="309.6" rx="11.0" ry="7.7" fill="rgba(255,255,255,0.28)" transform="rotate(15 369.0 309.6)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M399.5 148.1 C402.4 134.8 396.1 108.1 377.8 112.5 C361.2 130.6 366.0 159.2 367.8 188.6 C396.8 183.2 425.7 181.0 439.3 160.5 C439.1 141.7 411.7 142.0 399.5 148.1Z" fill="url(#fA)" opacity="0.96"/>
  <path d="M399.5 148.1 C388.9 161.6 378.4 175.1 370.2 185.5" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M399.5 148.1 L423.6 117.2" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M396.0 152.6 Q391.3 133.3 392.4 113.0" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M395.1 142.7 L389.4 137.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M394.2 132.8 L388.9 127.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M393.3 122.9 L388.5 118.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M396.0 152.6 Q415.9 152.5 435.3 146.5" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M405.8 151.0 L412.7 155.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M415.6 149.5 L422.0 153.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M425.5 148.0 L431.3 151.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M392.7 156.7 Q388.9 138.7 390.5 119.8" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M392.2 147.5 L387.0 142.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M391.6 138.3 L386.8 133.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M391.0 129.1 L386.7 124.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M392.7 156.7 Q411.2 156.1 429.1 150.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M401.8 155.1 L408.4 158.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M410.9 153.4 L416.9 156.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M420.0 151.7 L425.5 154.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M389.5 160.9 Q386.4 144.1 388.4 126.7" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M389.2 152.4 L384.5 147.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M388.9 143.8 L384.6 139.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M388.6 135.2 L384.7 130.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M389.5 160.9 Q406.6 159.9 423.0 153.7" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M397.8 159.1 L404.0 162.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M406.2 157.3 L411.9 160.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M414.6 155.5 L419.8 158.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M386.2 165.1 Q383.8 149.4 386.1 133.4" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M386.2 157.2 L382.0 152.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M386.2 149.3 L382.3 144.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M386.1 141.4 L382.7 137.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M386.2 165.1 Q402.0 163.6 416.9 157.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M393.9 163.2 L399.7 166.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M401.6 161.3 L406.9 163.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M409.3 159.4 L414.1 161.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M383.0 169.3 Q381.2 154.8 383.7 140.1" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M383.1 162.0 L379.5 157.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M383.3 154.7 L379.9 150.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M383.5 147.4 L380.4 143.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M383.0 169.3 Q397.4 167.5 411.0 161.5" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M390.0 167.3 L395.4 169.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M397.0 165.4 L401.9 167.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M404.0 163.4 L408.5 165.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M379.7 173.4 Q378.4 160.1 381.2 146.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M380.1 166.8 L376.8 162.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M380.4 160.1 L377.4 156.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M380.8 153.4 L378.1 149.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M379.7 173.4 Q392.9 171.4 405.2 165.6" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M386.1 171.5 L391.1 173.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M392.5 169.5 L397.1 171.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M398.8 167.5 L403.0 169.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M376.4 177.6 Q375.6 165.4 378.5 153.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M376.9 171.5 L374.1 167.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M377.5 165.5 L374.8 161.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M378.0 159.4 L375.6 156.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M376.4 177.6 Q388.4 175.4 399.5 169.7" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M382.2 175.6 L386.8 177.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M388.0 173.7 L392.2 175.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M393.7 171.7 L397.6 173.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M373.2 181.8 Q372.8 170.7 375.7 159.8" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M373.8 176.3 L371.3 172.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M374.4 170.8 L372.1 167.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M375.1 165.3 L373.0 162.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M373.2 181.8 Q384.0 179.5 393.9 174.0" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M378.4 179.8 L382.6 181.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M383.6 177.9 L387.5 179.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M388.7 176.0 L392.3 177.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="396.4" cy="136.3" rx="17.2" ry="11.8" fill="rgba(255,255,255,0.28)" transform="rotate(28 396.4 136.3)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M375.8 106.0 C380.0 91.6 375.1 61.8 354.7 65.2 C335.0 83.8 338.1 115.7 337.9 148.1 C370.1 144.5 402.1 144.2 418.6 122.7 C419.9 102.1 389.6 100.3 375.8 106.0Z" fill="url(#fB)" opacity="0.97"/>
  <path d="M375.8 106.0 C363.2 120.0 350.5 134.1 340.8 144.9" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M375.8 106.0 L404.7 73.9" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M371.6 110.7 Q367.9 89.1 370.7 66.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M371.4 99.7 L365.5 93.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M371.1 88.7 L365.7 82.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M370.9 77.8 L366.0 72.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M371.6 110.7 Q393.5 112.1 415.3 107.0" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M382.5 109.7 L389.8 114.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M393.4 108.8 L400.1 113.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M404.4 107.9 L410.5 112.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M367.7 115.0 Q364.8 94.8 368.0 74.2" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M367.8 104.8 L362.5 98.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M367.9 94.6 L363.0 88.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M367.9 84.4 L363.5 79.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M367.7 115.0 Q388.1 115.8 408.2 110.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M377.8 113.9 L384.7 118.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M387.9 112.7 L394.3 116.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M398.1 111.6 L403.9 115.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M363.8 119.3 Q361.7 100.6 365.2 81.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M364.1 109.9 L359.4 103.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M364.5 100.5 L360.2 94.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M364.8 91.0 L360.9 85.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M363.8 119.3 Q382.7 119.5 401.2 114.0" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M373.1 118.0 L379.7 122.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M382.5 116.7 L388.5 120.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M391.8 115.3 L397.3 118.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M359.9 123.7 Q358.4 106.3 362.2 88.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M360.5 115.0 L356.3 109.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M361.0 106.3 L357.2 101.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M361.6 97.6 L358.1 92.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M359.9 123.7 Q377.3 123.3 394.3 117.7" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M368.5 122.2 L374.6 125.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M377.1 120.7 L382.7 124.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M385.7 119.2 L390.8 122.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M356.0 128.0 Q355.1 112.0 359.0 96.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M356.7 120.0 L353.0 114.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M357.5 112.0 L354.1 107.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M358.3 104.0 L355.2 99.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M356.0 128.0 Q372.0 127.2 387.5 121.6" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M363.8 126.4 L369.6 129.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M371.7 124.8 L377.0 127.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M379.6 123.2 L384.4 125.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M352.1 132.4 Q351.7 117.6 355.7 103.1" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M353.0 125.0 L349.7 120.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M353.9 117.7 L350.9 113.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M354.8 110.4 L352.1 106.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M352.1 132.4 Q366.8 131.2 380.8 125.6" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M359.2 130.7 L364.6 133.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M366.4 129.0 L371.3 131.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M373.6 127.3 L378.1 129.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M348.2 136.7 Q348.2 123.2 352.3 110.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M349.2 130.0 L346.4 125.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M350.2 123.4 L347.6 119.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M351.3 116.8 L348.9 112.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M348.2 136.7 Q361.5 135.2 374.2 129.8" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M354.7 135.0 L359.6 137.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M361.2 133.2 L365.7 135.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M367.7 131.5 L371.8 133.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M344.3 141.0 Q344.7 128.8 348.7 117.0" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M345.4 135.0 L342.9 130.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M346.5 129.0 L344.2 125.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M347.6 123.0 L345.6 119.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M344.3 141.0 Q356.4 139.3 367.7 134.1" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M350.1 139.3 L354.7 141.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M356.0 137.6 L360.2 139.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M361.8 135.8 L365.7 137.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="373.2" cy="92.8" rx="18.9" ry="13.0" fill="rgba(255,255,255,0.28)" transform="rotate(32 373.2 92.8)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M395.7 66.0 C399.3 52.1 393.7 23.7 374.3 27.7 C356.0 46.3 359.9 76.7 360.6 107.8 C391.3 103.1 422.0 101.6 437.1 80.4 C437.7 60.6 408.7 60.0 395.7 66.0Z" fill="url(#fC)" opacity="0.98"/>
  <path d="M395.7 66.0 C384.0 80.0 372.3 93.9 363.2 104.6" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M395.7 66.0 L422.4 34.1" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M391.8 70.6 Q387.5 50.2 389.4 28.9" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M391.2 60.2 L385.4 54.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M390.6 49.8 L385.3 44.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M390.0 39.3 L385.2 34.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M391.8 70.6 Q412.7 71.3 433.3 65.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M402.2 69.4 L409.3 74.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M412.5 68.2 L419.1 72.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M422.9 66.9 L428.9 70.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M388.2 75.0 Q384.8 55.8 387.1 36.1" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M387.9 65.2 L382.7 59.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M387.6 55.5 L382.8 50.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M387.4 45.8 L383.0 40.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M388.2 75.0 Q407.6 75.0 426.6 69.2" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M397.8 73.5 L404.5 77.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M407.4 72.1 L413.6 75.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M417.0 70.7 L422.6 74.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M384.6 79.3 Q381.9 61.4 384.6 43.2" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M384.6 70.3 L379.9 64.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M384.6 61.2 L380.3 56.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M384.6 52.2 L380.7 47.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M384.6 79.3 Q402.6 78.8 420.0 72.9" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M393.4 77.7 L399.8 81.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M402.3 76.1 L408.1 79.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M411.1 74.5 L416.5 77.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M380.9 83.6 Q379.0 67.0 382.0 50.3" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M381.2 75.2 L377.0 69.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M381.5 66.9 L377.6 62.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M381.7 58.6 L378.2 54.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M380.9 83.6 Q397.6 82.6 413.5 76.8" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M389.1 81.9 L395.1 85.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M397.2 80.2 L402.7 83.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M405.4 78.5 L410.4 81.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M377.3 87.9 Q376.0 72.6 379.2 57.3" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M377.8 80.2 L374.1 75.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M378.3 72.6 L374.9 68.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M378.7 64.9 L375.6 60.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M377.3 87.9 Q392.6 86.6 407.1 80.7" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M384.8 86.1 L390.4 88.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M392.2 84.3 L397.3 86.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M399.7 82.5 L404.3 84.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M373.7 92.2 Q372.9 78.2 376.2 64.2" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M374.3 85.2 L371.1 80.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M375.0 78.2 L372.0 73.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M375.6 71.2 L372.9 67.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M373.7 92.2 Q387.7 90.6 400.8 84.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M380.5 90.3 L385.7 92.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M387.3 88.5 L392.0 90.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M394.0 86.7 L398.4 88.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M370.1 96.5 Q369.7 83.7 373.2 71.0" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M370.9 90.1 L368.0 85.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M371.6 83.7 L369.0 79.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M372.4 77.4 L370.0 73.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M370.1 96.5 Q382.8 94.6 394.6 89.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M376.2 94.6 L381.0 96.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M382.4 92.8 L386.8 94.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M388.5 90.9 L392.5 92.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M366.5 100.8 Q366.5 89.1 369.9 77.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M367.4 95.0 L364.9 91.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M368.2 89.3 L365.9 85.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M369.1 83.5 L367.0 80.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M366.5 100.8 Q378.0 98.8 388.6 93.4" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M372.0 98.9 L376.4 100.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M377.5 97.1 L381.6 98.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M383.1 95.2 L386.8 96.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="392.8" cy="53.4" rx="18.0" ry="12.5" fill="rgba(255,255,255,0.28)" transform="rotate(30 392.8 53.4)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M377.9 26.0 C382.7 11.5 378.7 -19.1 357.7 -16.4 C337.0 1.8 339.2 34.5 337.8 67.6 C370.8 65.0 403.5 66.0 421.0 44.7 C423.0 23.7 392.2 20.7 377.9 26.0Z" fill="url(#fD)" opacity="0.99"/>
  <path d="M377.9 26.0 C364.5 39.9 351.2 53.7 340.9 64.4" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M377.9 26.0 L408.5 -5.6" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M373.5 30.6 Q370.4 8.4 374.1 -14.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M373.6 19.4 L367.8 12.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M373.8 8.2 L368.5 1.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M373.9 -3.0 L369.1 -9.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M373.5 30.6 Q395.8 32.9 418.3 28.4" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M384.7 30.1 L391.9 35.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M395.9 29.5 L402.6 34.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M407.1 29.0 L413.2 33.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M369.3 34.9 Q367.1 14.2 371.1 -6.8" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M369.8 24.5 L364.6 17.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M370.2 14.1 L365.5 7.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M370.7 3.7 L366.4 -2.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M369.3 34.9 Q390.1 36.4 410.9 31.7" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M379.7 34.1 L386.6 39.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M390.1 33.3 L396.5 37.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M400.5 32.5 L406.3 36.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M365.2 39.2 Q363.7 19.9 368.0 0.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M365.9 29.5 L361.3 23.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M366.6 19.9 L362.4 14.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M367.3 10.3 L363.4 4.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M365.2 39.2 Q384.5 40.0 403.6 35.0" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M374.8 38.1 L381.3 42.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M384.4 37.1 L390.4 41.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M394.0 36.1 L399.5 39.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M361.1 43.5 Q360.2 25.6 364.7 7.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M362.0 34.6 L357.9 28.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M362.9 25.7 L359.1 20.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M363.8 16.8 L360.4 11.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M361.1 43.5 Q378.9 43.7 396.4 38.6" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M369.9 42.2 L376.1 46.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M378.8 41.0 L384.4 44.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M387.6 39.8 L392.8 43.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M356.9 47.7 Q356.6 31.3 361.2 15.1" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M358.0 39.6 L354.4 33.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M359.1 31.4 L355.8 26.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M360.2 23.3 L357.1 18.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M356.9 47.7 Q373.4 47.5 389.4 42.3" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M365.0 46.4 L370.8 49.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M373.2 45.0 L378.4 48.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M381.3 43.7 L386.1 46.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M352.8 52.0 Q353.0 36.9 357.6 22.3" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M354.0 44.6 L350.9 39.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M355.2 37.1 L352.3 32.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M356.4 29.7 L353.8 25.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M352.8 52.0 Q367.9 51.3 382.4 46.2" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M360.2 50.6 L365.6 53.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M367.6 49.1 L372.5 51.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M375.0 47.6 L379.5 50.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M348.7 56.3 Q349.2 42.5 353.9 29.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M350.0 49.5 L347.2 44.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M351.3 42.8 L348.8 38.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M352.6 36.0 L350.3 31.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M348.7 56.3 Q362.4 55.3 375.5 50.2" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M355.4 54.8 L360.4 57.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M362.1 53.2 L366.7 55.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M368.8 51.7 L373.0 53.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M344.6 60.6 Q345.4 48.1 350.0 36.1" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M345.9 54.5 L343.6 49.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M347.3 48.4 L345.1 44.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M348.6 42.2 L346.6 38.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M344.6 60.6 Q357.0 59.3 368.8 54.3" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M350.6 59.0 L355.2 61.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M356.7 57.4 L360.9 59.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M362.7 55.9 L366.6 57.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="375.7" cy="12.4" rx="19.4" ry="13.2" fill="rgba(255,255,255,0.28)" transform="rotate(34 375.7 12.4)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M401.8 -10.0 C406.0 -24.0 401.2 -53.3 381.2 -49.9 C361.9 -31.6 364.9 -0.4 364.5 31.4 C396.1 27.7 427.5 27.4 443.6 6.3 C444.9 -13.9 415.3 -15.6 401.8 -10.0Z" fill="url(#fE)" opacity="1.0"/>
  <path d="M401.8 -10.0 C389.4 3.8 376.9 17.6 367.4 28.2" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M401.8 -10.0 L430.1 -41.5" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M397.6 -5.4 Q394.0 -26.5 396.7 -48.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M397.4 -16.1 L391.7 -22.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M397.2 -26.8 L391.9 -32.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M397.0 -37.5 L392.2 -43.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M397.6 -5.4 Q419.0 -4.0 440.3 -9.0" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M408.3 -6.3 L415.4 -1.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M419.0 -7.2 L425.5 -2.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M429.7 -8.1 L435.6 -3.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M393.8 -1.1 Q391.0 -20.8 394.1 -40.9" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M393.9 -11.1 L388.7 -17.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M394.0 -21.0 L389.2 -26.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M394.1 -31.0 L389.7 -36.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M393.8 -1.1 Q413.7 -0.4 433.4 -5.6" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M403.7 -2.2 L410.5 2.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M413.6 -3.4 L419.8 0.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M423.5 -4.5 L429.1 -0.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M390.0 3.1 Q387.9 -15.2 391.4 -33.7" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M390.3 -6.1 L385.7 -12.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M390.7 -15.3 L386.4 -20.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M391.0 -24.5 L387.2 -29.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M390.0 3.1 Q408.4 3.3 426.5 -2.1" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M399.1 1.8 L405.5 5.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M408.2 0.5 L414.1 4.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M417.4 -0.8 L422.7 2.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M386.1 7.4 Q384.7 -9.6 388.4 -26.6" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M386.7 -1.1 L382.6 -6.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M387.3 -9.6 L383.5 -14.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M387.8 -18.1 L384.4 -22.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M386.1 7.4 Q403.2 7.0 419.7 1.6" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M394.5 5.9 L400.5 9.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M402.9 4.5 L408.4 7.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M411.3 3.0 L416.4 6.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M382.3 11.6 Q381.5 -4.0 385.3 -19.6" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M383.1 3.8 L379.4 -1.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M383.8 -4.0 L380.5 -8.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M384.6 -11.8 L381.5 -16.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M382.3 11.6 Q398.0 10.9 413.1 5.4" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M390.0 10.1 L395.6 13.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M397.7 8.5 L402.8 11.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M405.4 7.0 L410.1 9.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M378.5 15.9 Q378.1 1.5 382.1 -12.6" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M379.4 8.8 L376.2 3.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M380.3 1.6 L377.4 -2.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M381.2 -5.5 L378.5 -9.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M378.5 15.9 Q392.8 14.8 406.5 9.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M385.5 14.3 L390.7 16.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M392.5 12.6 L397.3 15.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M399.5 11.0 L403.9 13.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M374.6 20.2 Q374.7 7.0 378.7 -5.8" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M375.7 13.7 L372.9 9.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M376.7 7.2 L374.1 3.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M377.7 0.7 L375.4 -3.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M374.6 20.2 Q387.7 18.7 400.0 13.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M381.0 18.5 L385.8 20.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M387.3 16.8 L391.8 18.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M393.7 15.1 L397.7 17.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M370.8 24.4 Q371.2 12.5 375.2 0.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M371.9 18.5 L369.5 14.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M373.0 12.7 L370.8 8.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M374.1 6.8 L372.1 3.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M370.8 24.4 Q382.6 22.8 393.7 17.6" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M376.5 22.7 L381.0 24.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M382.3 21.0 L386.4 22.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M388.0 19.3 L391.7 21.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="399.3" cy="-22.9" rx="18.5" ry="12.7" fill="rgba(255,255,255,0.28)" transform="rotate(32 399.3 -22.9)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M335.1 10.1 C336.1 -2.1 327.1 -25.0 311.4 -18.8 C298.9 -0.7 306.7 24.2 312.0 50.1 C337.1 41.7 362.5 36.1 372.0 16.2 C369.5 -0.5 345.1 3.2 335.1 10.1Z" fill="url(#fF)" opacity="0.88"/>
  <path d="M335.1 10.1 C327.4 23.4 319.7 36.8 313.8 47.1" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M335.1 10.1 L352.7 -20.4" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M332.5 14.5 Q325.9 -2.0 324.4 -20.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M330.5 5.8 L324.7 1.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M328.5 -2.8 L323.1 -6.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M326.4 -11.5 L321.6 -15.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M332.5 14.5 Q350.2 12.0 366.7 4.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M341.1 12.0 L347.8 14.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M349.6 9.4 L355.8 12.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M358.2 6.8 L363.8 9.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M330.2 18.6 Q324.5 3.1 323.5 -13.9" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M328.5 10.5 L323.2 6.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M326.8 2.4 L322.0 -1.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M325.2 -5.7 L320.8 -9.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M330.2 18.6 Q346.5 15.8 361.6 8.1" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M338.0 16.0 L344.3 18.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M345.9 13.4 L351.7 15.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M353.8 10.8 L359.0 12.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M327.8 22.8 Q322.9 8.2 322.5 -7.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M326.5 15.2 L321.7 11.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M325.2 7.6 L320.8 3.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M323.8 0.1 L319.8 -3.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M327.8 22.8 Q342.8 19.7 356.6 12.2" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M335.0 20.1 L340.9 22.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M342.2 17.5 L347.6 19.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M349.4 14.8 L354.4 16.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M325.4 26.9 Q321.3 13.3 321.4 -1.2" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M324.4 19.9 L320.1 16.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M323.4 12.8 L319.4 9.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M322.4 5.8 L318.8 2.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M325.4 26.9 Q339.2 23.6 351.8 16.3" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M332.0 24.2 L337.5 26.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M338.6 21.6 L343.6 23.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M345.2 19.0 L349.8 20.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M323.0 31.0 Q319.6 18.4 320.1 5.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M322.3 24.5 L318.4 20.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M321.5 18.0 L318.0 14.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M320.8 11.5 L317.6 8.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M323.0 31.0 Q335.7 27.6 347.0 20.6" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M329.0 28.4 L334.1 29.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M335.0 25.8 L339.7 27.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M341.0 23.2 L345.3 24.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M320.6 35.1 Q317.9 23.5 318.6 11.2" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M320.1 29.2 L316.7 25.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M319.6 23.2 L316.5 20.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M319.1 17.2 L316.2 14.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M320.6 35.1 Q332.1 31.7 342.3 24.9" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M326.1 32.6 L330.8 33.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M331.5 30.0 L335.8 31.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M336.9 27.5 L340.9 28.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M318.3 39.2 Q316.0 28.5 317.1 17.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M318.0 33.8 L314.9 30.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M317.7 28.3 L314.9 25.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M317.4 22.8 L314.8 20.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M318.3 39.2 Q328.7 35.8 337.8 29.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M323.2 36.8 L327.5 37.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M328.0 34.3 L332.0 35.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M332.9 31.8 L336.6 32.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M315.9 43.4 Q314.2 33.6 315.4 23.5" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M315.8 38.4 L313.1 35.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M315.6 33.4 L313.2 30.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M315.5 28.4 L313.3 25.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M315.9 43.4 Q325.2 40.0 333.4 33.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M320.3 41.0 L324.2 41.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M324.6 38.6 L328.3 39.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M329.0 36.2 L332.3 36.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="330.8" cy="0.0" rx="15.4" ry="10.6" fill="rgba(255,255,255,0.28)" transform="rotate(20 330.8 0.0)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M300.8 -5.9 C300.6 -17.2 290.4 -37.5 276.6 -30.1 C266.8 -12.0 276.2 10.1 283.3 33.5 C305.4 23.1 328.2 15.3 335.1 -4.1 C331.3 -19.2 309.4 -13.3 300.8 -5.9Z" fill="url(#fG)" opacity="0.82"/>
  <path d="M300.8 -5.9 C295.0 7.2 289.2 20.3 284.7 30.5" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M300.8 -5.9 L314.2 -35.8" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M298.9 -1.5 Q291.3 -15.9 288.2 -32.3" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M296.2 -9.2 L290.5 -12.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M293.5 -16.9 L288.3 -20.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M290.8 -24.6 L286.1 -27.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M298.9 -1.5 Q314.7 -5.5 329.0 -14.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M306.4 -4.7 L312.8 -2.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M313.9 -7.8 L319.8 -6.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M321.5 -11.0 L326.8 -9.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M297.1 2.5 Q290.4 -11.1 288.0 -26.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M294.8 -4.7 L289.6 -8.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M292.5 -11.9 L287.7 -15.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M290.2 -19.2 L285.9 -21.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M297.1 2.5 Q311.7 -1.6 324.7 -10.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M304.0 -0.6 L309.9 1.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M310.9 -3.7 L316.4 -2.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M317.8 -6.9 L322.8 -5.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M295.3 6.6 Q289.5 -6.2 287.6 -20.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M293.4 -0.2 L288.6 -3.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M291.4 -6.9 L287.1 -9.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M289.5 -13.7 L285.6 -16.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M295.3 6.6 Q308.7 2.3 320.5 -5.8" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M301.6 3.5 L307.1 4.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M307.9 0.4 L313.0 1.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M314.2 -2.7 L318.9 -1.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M293.5 10.6 Q288.5 -1.3 287.1 -14.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M291.9 4.3 L287.6 1.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M290.3 -2.0 L286.4 -4.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M288.7 -8.2 L285.1 -10.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M293.5 10.6 Q305.7 6.4 316.5 -1.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M299.2 7.6 L304.4 8.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M305.0 4.6 L309.7 5.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M310.7 1.5 L315.0 2.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M291.7 14.7 Q287.4 3.5 286.5 -8.7" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M290.4 8.8 L286.5 5.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M289.1 3.0 L285.5 0.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M287.8 -2.8 L284.6 -5.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M291.7 14.7 Q302.8 10.4 312.5 2.9" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M296.9 11.7 L301.7 12.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M302.1 8.8 L306.5 9.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M307.3 5.9 L311.3 6.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M289.9 18.7 Q286.2 8.4 285.8 -2.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M288.8 13.3 L285.4 10.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M287.8 8.0 L284.6 5.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M286.8 2.6 L283.9 0.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M289.9 18.7 Q300.0 14.5 308.6 7.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M294.6 15.9 L299.0 16.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M299.3 13.1 L303.3 13.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M303.9 10.2 L307.6 10.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M288.1 22.8 Q285.0 13.2 284.9 3.0" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M287.3 17.8 L284.2 15.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M286.5 12.9 L283.7 10.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M285.7 8.0 L283.1 5.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M288.1 22.8 Q297.2 18.7 304.9 11.9" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M292.3 20.1 L296.3 20.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M296.5 17.4 L300.2 17.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M300.7 14.6 L304.1 15.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M286.3 26.8 Q283.8 18.1 283.9 8.8" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M285.7 22.3 L283.0 19.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M285.1 17.8 L282.6 15.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M284.5 13.3 L282.2 11.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M286.3 26.8 Q294.5 22.9 301.3 16.5" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M290.0 24.3 L293.7 24.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M293.8 21.7 L297.2 22.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M297.5 19.1 L300.6 19.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="296.0" cy="-14.7" rx="14.1" ry="9.8" fill="rgba(255,255,255,0.28)" transform="rotate(14 296.0 -14.7)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M353.3 -11.7 C355.5 -23.4 349.2 -46.6 333.3 -42.2 C319.3 -25.8 324.3 -0.9 326.7 24.8 C351.9 19.1 377.1 16.2 388.4 -2.2 C387.7 -18.6 363.7 -17.4 353.3 -11.7Z" fill="url(#fH)" opacity="0.85"/>
  <path d="M353.3 -11.7 C344.4 0.4 335.6 12.6 328.7 22.0" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M353.3 -11.7 L373.5 -39.6" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M350.3 -7.7 Q345.6 -24.4 346.0 -42.1" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M349.2 -16.3 L344.1 -21.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M348.1 -24.9 L343.4 -29.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M347.1 -33.5 L342.7 -37.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M350.3 -7.7 Q367.6 -8.4 384.4 -14.2" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M358.8 -9.3 L365.0 -5.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M367.4 -10.9 L373.0 -7.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M375.9 -12.6 L381.0 -9.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M347.6 -3.9 Q343.7 -19.6 344.5 -36.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M346.8 -11.9 L342.1 -16.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M346.0 -20.0 L341.7 -24.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M345.3 -28.0 L341.3 -31.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M347.6 -3.9 Q363.7 -5.0 379.1 -10.9" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M355.5 -5.7 L361.3 -2.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M363.3 -7.4 L368.7 -4.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M371.2 -9.1 L376.1 -6.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M344.9 -0.2 Q341.6 -14.8 342.8 -30.0" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M344.4 -7.6 L340.1 -12.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M343.9 -15.1 L340.0 -19.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M343.4 -22.5 L339.8 -26.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M344.9 -0.2 Q359.7 -1.6 373.8 -7.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M352.1 -2.0 L357.6 0.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M359.3 -3.8 L364.4 -1.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M366.6 -5.6 L371.2 -3.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M342.1 3.6 Q339.5 -10.0 341.1 -24.0" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M341.9 -3.3 L338.1 -7.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M341.6 -10.2 L338.1 -14.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M341.3 -17.1 L338.2 -20.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M342.1 3.6 Q355.8 1.9 368.7 -3.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M348.8 1.7 L353.9 4.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M355.4 -0.2 L360.1 1.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M362.0 -2.0 L366.3 -0.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M339.4 7.4 Q337.4 -5.2 339.2 -18.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M339.3 1.0 L336.0 -2.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M339.3 -5.3 L336.2 -9.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M339.2 -11.7 L336.4 -15.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M339.4 7.4 Q351.9 5.4 363.6 -0.3" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M345.5 5.4 L350.2 7.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M351.5 3.5 L355.9 5.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M357.6 1.6 L361.6 3.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M336.7 11.1 Q335.2 -0.4 337.1 -12.2" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M336.8 5.3 L333.8 1.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M336.9 -0.5 L334.2 -3.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M337.0 -6.4 L334.5 -9.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M336.7 11.1 Q348.1 9.0 358.7 3.5" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M342.2 9.2 L346.6 10.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M347.7 7.3 L351.7 8.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M353.2 5.4 L356.9 6.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M333.9 14.9 Q332.9 4.3 335.0 -6.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M334.2 9.6 L331.6 6.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M334.5 4.3 L332.1 1.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M334.7 -1.1 L332.5 -3.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M333.9 14.9 Q344.3 12.6 353.8 7.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M338.9 13.0 L343.0 14.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M343.9 11.1 L347.6 12.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M348.8 9.2 L352.3 10.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M331.2 18.6 Q330.5 9.0 332.7 -0.6" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M331.6 13.8 L329.3 10.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M332.0 9.0 L329.9 6.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M332.3 4.2 L330.4 1.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M331.2 18.6 Q340.6 16.3 349.1 11.2" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M335.7 16.8 L339.4 18.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M340.1 14.9 L343.6 16.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M344.6 13.1 L347.7 14.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="350.2" cy="-22.0" rx="15.0" ry="10.3" fill="rgba(255,255,255,0.28)" transform="rotate(26 350.2 -22.0)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M7.2 0.2 C8.4 12.8 21.5 34.7 36.3 25.4 C45.9 4.4 33.6 -19.6 23.7 -45.2 C-0.3 -31.9 -25.2 -21.4 -31.3 0.8 C-25.9 17.5 -1.8 9.1 7.2 0.2Z" fill="url(#fA)" opacity="0.95"/>
  <path d="M7.2 0.2 C12.7 -15.0 18.2 -30.1 22.5 -41.8" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M7.2 0.2 L-5.4 34.7" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M9.0 -4.9 Q18.7 10.7 23.5 28.9" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M12.7 3.6 L19.3 6.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M16.3 12.0 L22.4 15.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M19.9 20.4 L25.5 23.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M9.0 -4.9 Q-8.4 0.9 -23.7 11.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M0.9 -0.7 L-6.4 -2.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-7.3 3.4 L-14.0 1.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M-15.5 7.5 L-21.6 6.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M10.7 -9.5 Q19.3 5.2 23.3 22.2" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M13.9 -1.6 L20.0 1.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M17.0 6.3 L22.6 9.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M20.1 14.3 L25.3 17.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M10.7 -9.5 Q-5.3 -3.7 -19.2 6.7" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M3.2 -5.5 L-3.6 -6.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-4.3 -1.4 L-10.5 -2.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M-11.8 2.7 L-17.5 1.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M12.4 -14.2 Q20.0 -0.3 23.2 15.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M15.1 -6.8 L20.7 -3.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M17.8 0.7 L22.9 3.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M20.5 8.1 L25.2 10.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M12.4 -14.2 Q-2.3 -8.4 -14.9 1.7" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M5.6 -10.2 L-0.7 -11.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-1.2 -6.3 L-7.1 -7.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M-8.1 -2.3 L-13.4 -3.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M14.1 -18.9 Q20.7 -5.8 23.3 8.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M16.4 -11.9 L21.5 -8.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M18.7 -5.0 L23.3 -2.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M21.0 1.9 L25.2 4.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M14.1 -18.9 Q0.7 -13.1 -10.7 -3.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M7.9 -15.0 L2.1 -15.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M1.7 -11.2 L-3.7 -12.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M-4.5 -7.3 L-9.4 -8.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M15.8 -23.6 Q21.6 -11.4 23.5 2.2" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M17.8 -17.1 L22.3 -14.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M19.7 -10.7 L23.9 -7.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M21.6 -4.2 L25.4 -1.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M15.8 -23.6 Q3.7 -17.9 -6.6 -8.7" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M10.2 -19.8 L4.8 -20.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M4.6 -16.1 L-0.4 -16.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M-1.0 -12.4 L-5.5 -13.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M17.5 -28.2 Q22.5 -16.9 23.9 -4.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M19.1 -22.3 L23.2 -19.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M20.7 -16.3 L24.5 -13.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M22.3 -10.4 L25.7 -7.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M17.5 -28.2 Q6.5 -22.7 -2.6 -14.0" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M12.5 -24.7 L7.5 -25.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M7.5 -21.1 L2.9 -21.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M2.4 -17.6 L-1.8 -17.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M19.2 -32.9 Q23.4 -22.4 24.4 -11.0" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M20.5 -27.4 L24.2 -24.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M21.8 -21.9 L25.2 -19.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M23.1 -16.5 L26.2 -14.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M19.2 -32.9 Q9.3 -27.6 1.2 -19.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M14.7 -29.5 L10.2 -29.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M10.2 -26.2 L6.0 -26.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M5.7 -22.8 L1.9 -23.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M20.9 -37.6 Q24.5 -28.0 25.0 -17.5" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M22.0 -32.6 L25.2 -30.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M23.0 -27.5 L26.0 -25.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M24.0 -22.5 L26.7 -20.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M20.9 -37.6 Q12.1 -32.5 4.9 -24.8" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M16.9 -34.4 L12.8 -34.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M12.9 -31.2 L9.1 -31.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M8.9 -28.0 L5.5 -28.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="13.3" cy="9.7" rx="15.8" ry="11.0" fill="rgba(255,255,255,0.28)" transform="rotate(-170 13.3 9.7)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M43.4 -11.9 C45.6 -0.2 59.8 19.2 72.9 9.3 C80.2 -11.0 66.5 -32.4 55.1 -55.5 C33.7 -41.2 11.2 -29.5 7.3 -8.3 C13.8 6.8 35.7 -2.9 43.4 -11.9Z" fill="url(#fB)" opacity="0.92"/>
  <path d="M43.4 -11.9 C47.3 -26.5 51.2 -41.0 54.2 -52.2" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M43.4 -11.9 L34.5 21.3" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M44.7 -16.8 Q55.1 -2.9 61.1 13.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M48.8 -9.1 L55.4 -6.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M52.9 -1.5 L59.0 0.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M57.0 6.2 L62.5 8.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M44.7 -16.8 Q28.8 -9.9 15.3 1.5" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M37.4 -12.2 L30.4 -13.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M30.0 -7.6 L23.6 -8.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M22.6 -3.1 L16.8 -3.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M45.9 -21.2 Q55.2 -8.1 60.3 7.6" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M49.5 -14.0 L55.6 -11.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M53.1 -6.8 L58.7 -4.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M56.7 0.4 L61.8 2.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M45.9 -21.2 Q31.3 -14.5 19.1 -3.5" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M39.2 -16.8 L32.7 -17.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M32.5 -12.4 L26.5 -13.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M25.8 -7.9 L20.3 -8.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M47.1 -25.7 Q55.4 -13.3 59.7 1.4" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M50.3 -19.0 L55.8 -16.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M53.4 -12.2 L58.5 -9.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M56.6 -5.4 L61.2 -3.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M47.1 -25.7 Q33.8 -19.1 22.7 -8.5" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M41.0 -21.4 L35.0 -22.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M34.9 -17.1 L29.4 -17.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M28.8 -12.8 L23.8 -13.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M48.3 -30.2 Q55.6 -18.5 59.2 -4.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M51.1 -23.9 L56.1 -21.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M53.8 -17.5 L58.4 -15.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M56.5 -11.2 L60.7 -9.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M48.3 -30.2 Q36.2 -23.7 26.3 -13.7" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M42.8 -26.1 L37.2 -26.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M37.3 -22.0 L32.2 -22.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M31.8 -17.8 L27.1 -18.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M49.6 -34.7 Q55.9 -23.7 58.9 -11.1" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M51.9 -28.8 L56.4 -26.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M54.2 -22.9 L58.4 -20.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M56.5 -17.0 L60.3 -14.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M49.6 -34.7 Q38.5 -28.4 29.7 -18.9" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M44.6 -30.8 L39.4 -30.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M39.6 -26.8 L34.9 -26.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M34.6 -22.9 L30.3 -23.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M50.8 -39.2 Q56.3 -29.0 58.7 -17.3" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M52.7 -33.7 L56.8 -31.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M54.7 -28.3 L58.5 -26.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M56.7 -22.8 L60.1 -20.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M50.8 -39.2 Q40.8 -33.1 33.0 -24.2" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M46.3 -35.4 L41.6 -35.4" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M41.9 -31.7 L37.5 -31.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M37.4 -27.9 L33.4 -27.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M52.0 -43.7 Q56.7 -34.2 58.6 -23.5" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M53.6 -38.6 L57.3 -36.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M55.3 -33.6 L58.7 -31.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M56.9 -28.5 L60.0 -26.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M52.0 -43.7 Q43.1 -37.9 36.1 -29.5" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M48.0 -40.1 L43.7 -40.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M44.0 -36.6 L40.1 -36.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M40.1 -33.1 L36.4 -32.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M53.2 -48.2 Q57.3 -39.4 58.6 -29.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M54.5 -43.6 L57.8 -41.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M55.9 -38.9 L58.9 -36.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M57.3 -34.3 L60.0 -32.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M53.2 -48.2 Q45.2 -42.7 39.1 -34.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M49.7 -44.9 L45.7 -44.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M46.2 -41.5 L42.5 -41.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M42.6 -38.2 L39.4 -38.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="50.0" cy="-3.5" rx="15.0" ry="10.3" fill="rgba(255,255,255,0.28)" transform="rotate(-175 50.0 -3.5)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M27.1 20.0 C27.2 32.2 38.1 54.3 53.2 46.7 C64.1 27.5 54.1 3.5 46.6 -21.9 C22.4 -11.3 -2.5 -3.5 -10.2 17.2 C-6.3 33.6 17.7 27.7 27.1 20.0Z" fill="url(#fC)" opacity="0.93"/>
  <path d="M27.1 20.0 C33.6 6.0 40.1 -7.9 45.1 -18.7" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M27.1 20.0 L12.2 51.9" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M29.2 15.4 Q37.3 31.3 40.4 49.3" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M32.0 23.8 L38.2 27.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M34.8 32.3 L40.5 35.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M37.6 40.8 L42.8 44.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M29.2 15.4 Q11.9 19.4 -3.9 28.6" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M20.9 18.7 L14.1 16.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M12.7 22.0 L6.3 19.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M4.4 25.3 L-1.4 23.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M31.2 11.0 Q38.3 26.1 40.7 42.8" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M33.6 19.0 L39.2 22.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M36.0 26.9 L41.1 30.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M38.3 34.9 L43.0 38.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M31.2 11.0 Q15.2 15.3 0.8 24.3" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M23.6 14.3 L17.2 12.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M16.0 17.6 L10.1 15.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M8.4 21.0 L3.0 19.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M33.3 6.7 Q39.4 20.8 41.1 36.4" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M35.2 14.2 L40.3 17.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M37.2 21.6 L41.9 24.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M39.2 29.0 L43.5 32.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M33.3 6.7 Q18.5 11.1 5.4 19.8" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M26.3 10.0 L20.2 8.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M19.3 13.3 L13.8 11.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M12.4 16.5 L7.3 15.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M35.3 2.4 Q40.5 15.6 41.7 30.1" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M36.9 9.3 L41.5 12.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M38.5 16.2 L42.8 19.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M40.1 23.2 L44.0 26.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M35.3 2.4 Q21.8 6.9 9.9 15.2" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M28.9 5.6 L23.3 4.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M22.6 8.8 L17.4 7.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M16.3 12.0 L11.5 10.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M37.3 -1.9 Q41.8 10.4 42.5 23.7" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M38.6 4.5 L42.7 7.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M39.9 10.9 L43.7 14.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M41.2 17.3 L44.7 20.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M37.3 -1.9 Q25.0 2.6 14.3 10.6" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M31.5 1.2 L26.3 0.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M25.8 4.3 L21.0 3.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M20.0 7.5 L15.7 6.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M39.3 -6.2 Q43.1 5.2 43.4 17.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M40.3 -0.3 L44.0 2.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M41.3 5.6 L44.8 8.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M42.4 11.5 L45.5 14.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M39.3 -6.2 Q28.1 -1.8 18.6 5.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M34.1 -3.2 L29.3 -4.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M28.9 -0.2 L24.5 -0.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M23.7 2.8 L19.7 2.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M41.3 -10.5 Q44.5 -0.0 44.4 11.2" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M42.1 -5.1 L45.4 -2.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M42.8 0.3 L45.9 3.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M43.6 5.7 L46.4 8.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M41.3 -10.5 Q31.2 -6.2 22.7 1.0" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M36.6 -7.6 L32.2 -8.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M32.0 -4.7 L27.9 -5.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M27.3 -1.9 L23.7 -2.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M43.3 -14.8 Q45.9 -5.2 45.6 4.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M43.9 -9.9 L46.8 -7.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M44.4 -4.9 L47.1 -2.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M45.0 0.0 L47.5 2.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M43.3 -14.8 Q34.3 -10.6 26.7 -3.8" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M39.2 -12.1 L35.1 -12.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M35.0 -9.3 L31.3 -9.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M30.9 -6.6 L27.5 -7.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="32.2" cy="29.7" rx="15.4" ry="10.6" fill="rgba(255,255,255,0.28)" transform="rotate(-165 32.2 29.7)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M77.3 26.0 C78.9 37.8 92.0 57.9 105.7 48.8 C113.9 28.9 101.5 6.8 91.3 -16.9 C69.1 -3.7 46.0 6.8 41.0 27.8 C46.7 43.2 69.2 34.7 77.3 26.0Z" fill="url(#fD)" opacity="0.9"/>
  <path d="M77.3 26.0 C82.0 11.7 86.6 -2.6 90.2 -13.6" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M77.3 26.0 L66.7 58.8" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M78.9 21.3 Q88.5 35.7 93.6 52.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M82.6 29.1 L89.0 32.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M86.3 37.0 L92.1 39.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M90.0 44.8 L95.3 47.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M78.9 21.3 Q62.6 27.3 48.5 38.0" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M71.3 25.5 L64.4 24.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M63.7 29.6 L57.3 28.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M56.1 33.8 L50.3 32.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M80.3 16.9 Q88.9 30.5 93.2 46.4" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M83.5 24.3 L89.4 27.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M86.8 31.6 L92.1 34.3" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M90.0 39.0 L94.9 41.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M80.3 16.9 Q65.4 22.9 52.5 33.2" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M73.4 20.9 L66.9 19.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M66.4 25.0 L60.5 24.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M59.5 29.1 L54.1 28.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M81.8 12.4 Q89.3 25.3 92.9 40.2" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M84.5 19.4 L89.9 22.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M87.3 26.3 L92.2 28.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M90.1 33.2 L94.6 35.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M81.8 12.4 Q68.1 18.4 56.5 28.3" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M75.4 16.4 L69.4 15.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M69.1 20.4 L63.6 19.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M62.8 24.4 L57.7 23.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M83.2 8.0 Q89.8 20.1 92.7 33.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M85.6 14.5 L90.4 17.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M88.0 21.0 L92.4 23.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M90.3 27.4 L94.4 29.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M83.2 8.0 Q70.7 13.9 60.3 23.4" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M77.5 11.9 L71.9 11.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M71.7 15.7 L66.6 15.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M66.0 19.5 L61.3 19.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M84.6 3.6 Q90.4 14.9 92.7 27.7" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M86.6 9.6 L91.1 12.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M88.7 15.6 L92.7 18.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M90.7 21.7 L94.4 23.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M84.6 3.6 Q73.3 9.3 63.9 18.3" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M79.5 7.3 L74.3 6.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M74.3 11.0 L69.6 10.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M69.1 14.7 L64.8 14.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M86.1 -0.8 Q91.1 9.7 92.8 21.5" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M87.8 4.8 L91.7 7.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M89.4 10.3 L93.1 12.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M91.1 15.9 L94.4 18.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M86.1 -0.8 Q75.8 4.8 67.5 13.2" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M81.4 2.7 L76.7 2.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M76.8 6.2 L72.4 6.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M72.1 9.7 L68.2 9.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M87.5 -5.2 Q91.8 4.5 93.1 15.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M88.9 -0.1 L92.4 2.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M90.3 5.0 L93.5 7.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M91.7 10.2 L94.6 12.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M87.5 -5.2 Q78.3 0.1 70.9 8.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M83.4 -1.9 L79.0 -2.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M79.2 1.4 L75.2 1.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M75.1 4.8 L71.5 4.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M88.9 -9.7 Q92.6 -0.7 93.4 9.1" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M90.1 -5.0 L93.2 -2.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M91.2 -0.3 L94.1 1.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M92.3 4.4 L95.0 6.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M88.9 -9.7 Q80.7 -4.5 74.2 2.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M85.3 -6.5 L81.3 -6.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M81.6 -3.4 L78.0 -3.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M77.9 -0.2 L74.6 -0.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="83.4" cy="34.8" rx="15.0" ry="10.3" fill="rgba(255,255,255,0.28)" transform="rotate(-172 83.4 34.8)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M147.2 15.9 C147.9 27.5 159.2 48.0 173.1 40.0 C182.5 21.1 172.0 -1.2 163.7 -24.9 C141.4 -13.6 118.2 -4.8 111.9 15.3 C116.4 30.7 138.7 23.8 147.2 15.9Z" fill="url(#fE)" opacity="0.88"/>
  <path d="M147.2 15.9 C152.7 2.3 158.2 -11.3 162.5 -21.8" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M147.2 15.9 L134.6 47.1" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M149.0 11.4 Q157.4 26.0 161.2 42.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M152.1 19.3 L158.1 22.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M155.1 27.1 L160.6 30.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M158.2 34.9 L163.2 37.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M149.0 11.4 Q132.9 16.1 118.5 25.5" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M141.4 14.9 L134.8 13.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M133.8 18.5 L127.7 16.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M126.1 22.0 L120.6 20.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M150.7 7.2 Q158.1 21.0 161.2 36.7" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M153.4 14.6 L158.8 17.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M156.0 21.9 L161.0 24.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M158.6 29.3 L163.2 32.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M150.7 7.2 Q135.9 12.0 122.7 21.1" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M143.7 10.7 L137.6 9.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M136.7 14.2 L131.1 12.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M129.7 17.7 L124.6 16.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M152.4 3.0 Q158.9 16.0 161.3 30.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M154.7 9.9 L159.7 13.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M156.9 16.8 L161.5 19.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M159.1 23.7 L163.3 26.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M152.4 3.0 Q138.8 7.8 126.9 16.7" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M146.1 6.4 L140.3 5.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M139.7 9.8 L134.4 8.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M133.3 13.3 L128.4 12.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M154.1 -1.2 Q159.8 10.9 161.6 24.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M156.0 5.2 L160.5 8.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M157.9 11.6 L162.0 14.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M159.7 18.1 L163.5 20.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M154.1 -1.2 Q141.7 3.6 130.9 12.1" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M148.3 2.1 L143.0 1.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M142.5 5.4 L137.6 4.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M136.7 8.8 L132.2 8.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M155.8 -5.4 Q160.7 5.9 162.0 18.4" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M157.4 0.5 L161.5 3.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M158.9 6.5 L162.7 9.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M160.5 12.5 L163.9 14.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M155.8 -5.4 Q144.5 -0.6 134.8 7.5" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M150.6 -2.2 L145.6 -2.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M145.3 1.0 L140.8 0.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M140.1 4.2 L135.9 3.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M157.5 -9.6 Q161.7 0.9 162.6 12.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M158.8 -4.1 L162.5 -1.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M160.1 1.4 L163.4 3.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M161.3 6.9 L164.4 9.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M157.5 -9.6 Q147.3 -4.9 138.6 2.7" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M152.8 -6.5 L148.2 -7.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M148.1 -3.4 L143.9 -4.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M143.4 -0.4 L139.5 -0.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M159.2 -13.8 Q162.7 -4.1 163.2 6.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M160.2 -8.8 L163.5 -6.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M161.2 -3.7 L164.3 -1.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M162.2 1.3 L165.0 3.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M159.2 -13.8 Q150.0 -9.3 142.3 -2.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M155.0 -10.9 L150.8 -11.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M150.8 -7.9 L146.9 -8.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M146.5 -5.0 L143.0 -5.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M160.9 -18.0 Q163.9 -9.1 164.0 0.5" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M161.7 -13.4 L164.6 -10.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M162.5 -8.8 L165.2 -6.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M163.3 -4.2 L165.7 -2.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M160.9 -18.0 Q152.7 -13.7 145.9 -6.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M157.2 -15.3 L153.4 -15.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M153.4 -12.5 L149.9 -12.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M149.6 -9.7 L146.4 -9.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="152.5" cy="24.9" rx="14.5" ry="10.1" fill="rgba(255,255,255,0.28)" transform="rotate(-168 152.5 24.9)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M199.4 18.0 C200.8 29.5 213.5 49.1 226.8 40.2 C234.9 20.7 222.8 -0.9 213.0 -23.9 C191.4 -11.1 169.0 -0.7 164.1 19.8 C169.6 34.8 191.4 26.5 199.4 18.0Z" fill="url(#fF)" opacity="0.86"/>
  <path d="M199.4 18.0 C203.9 4.0 208.4 -10.0 211.9 -20.7" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M199.4 18.0 L189.0 50.0" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M200.9 13.3 Q210.2 27.3 215.2 43.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M204.4 21.0 L210.7 23.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M208.0 28.6 L213.7 31.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M211.6 36.2 L216.8 38.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M200.9 13.3 Q185.1 19.2 171.4 29.6" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M193.5 17.4 L186.8 16.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M186.1 21.5 L179.9 20.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M178.7 25.5 L173.1 24.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M202.3 9.0 Q210.6 22.3 214.8 37.7" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M205.4 16.2 L211.1 19.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M208.5 23.4 L213.7 26.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M211.6 30.5 L216.4 32.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M202.3 9.0 Q187.8 14.9 175.3 24.9" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M195.5 13.0 L189.2 11.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M188.8 17.0 L183.0 16.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M182.0 20.9 L176.8 20.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M203.7 4.7 Q211.0 17.2 214.5 31.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M206.4 11.4 L211.6 14.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M209.1 18.2 L213.8 20.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M211.8 24.9 L216.1 27.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M203.7 4.7 Q190.4 10.5 179.1 20.1" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M197.5 8.6 L191.7 7.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M191.4 12.4 L186.0 11.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M185.3 16.3 L180.4 15.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M205.1 0.4 Q211.5 12.1 214.3 25.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M207.4 6.7 L212.1 9.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M209.7 13.0 L214.0 15.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M212.0 19.2 L216.0 21.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M205.1 0.4 Q193.0 6.1 182.8 15.3" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M199.5 4.1 L194.1 3.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M193.9 7.8 L189.0 7.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M188.4 11.6 L183.8 11.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M206.5 -3.9 Q212.1 7.0 214.3 19.5" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M208.4 1.9 L212.7 4.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M210.4 7.8 L214.3 10.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M212.3 13.6 L215.9 15.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M206.5 -3.9 Q195.5 1.7 186.4 10.4" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M201.5 -0.3 L196.5 -0.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M196.4 3.2 L191.8 2.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M191.4 6.8 L187.2 6.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M207.9 -8.2 Q212.7 2.0 214.4 13.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M209.5 -2.8 L213.4 -0.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M211.2 2.6 L214.7 4.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M212.8 8.0 L216.0 10.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M207.9 -8.2 Q197.9 -2.8 189.9 5.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M203.4 -4.8 L198.8 -5.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M198.9 -1.4 L194.6 -1.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M194.4 2.0 L190.5 1.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M209.3 -12.6 Q213.4 -3.1 214.7 7.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M210.6 -7.6 L214.1 -5.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M212.0 -2.6 L215.1 -0.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M213.3 2.4 L216.2 4.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M209.3 -12.6 Q200.4 -7.4 193.2 0.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M205.3 -9.3 L201.1 -9.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M201.2 -6.1 L197.4 -6.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M197.2 -2.9 L193.7 -2.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M210.7 -16.9 Q214.2 -8.2 215.1 1.4" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M211.8 -12.3 L214.8 -10.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M212.9 -7.8 L215.7 -5.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M214.0 -3.2 L216.5 -1.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M210.7 -16.9 Q202.7 -11.9 196.4 -4.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M207.1 -13.8 L203.3 -13.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M203.5 -10.8 L200.0 -10.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M200.0 -7.7 L196.8 -7.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="205.3" cy="26.5" rx="14.5" ry="10.1" fill="rgba(255,255,255,0.28)" transform="rotate(-172 205.3 26.5)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M251.2 13.9 C251.9 25.5 263.2 46.0 277.1 38.0 C286.5 19.1 276.0 -3.2 267.7 -26.9 C245.4 -15.6 222.2 -6.8 215.9 13.3 C220.4 28.7 242.7 21.8 251.2 13.9Z" fill="url(#fG)" opacity="0.86"/>
  <path d="M251.2 13.9 C256.7 0.3 262.2 -13.3 266.5 -23.8" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M251.2 13.9 L238.6 45.1" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M253.0 9.4 Q261.4 24.0 265.2 40.8" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M256.1 17.3 L262.1 20.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M259.1 25.1 L264.6 28.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M262.2 32.9 L267.2 35.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M253.0 9.4 Q236.9 14.1 222.5 23.5" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M245.4 12.9 L238.8 11.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M237.8 16.5 L231.7 14.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M230.1 20.0 L224.6 18.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M254.7 5.2 Q262.1 19.0 265.2 34.7" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M257.4 12.6 L262.8 15.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M260.0 19.9 L265.0 22.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M262.6 27.3 L267.2 30.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M254.7 5.2 Q239.9 10.0 226.7 19.1" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M247.7 8.7 L241.6 7.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M240.7 12.2 L235.1 10.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M233.7 15.7 L228.6 14.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M256.4 1.0 Q262.9 14.0 265.3 28.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M258.7 7.9 L263.7 11.0" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M260.9 14.8 L265.5 17.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M263.1 21.7 L267.3 24.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M256.4 1.0 Q242.8 5.8 230.9 14.7" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M250.1 4.4 L244.3 3.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M243.7 7.8 L238.4 6.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M237.3 11.3 L232.4 10.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M258.1 -3.2 Q263.8 8.9 265.6 22.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M260.0 3.2 L264.5 6.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M261.9 9.6 L266.0 12.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M263.7 16.1 L267.5 18.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M258.1 -3.2 Q245.7 1.6 234.9 10.1" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M252.3 0.1 L247.0 -0.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M246.5 3.4 L241.6 2.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M240.7 6.8 L236.2 6.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M259.8 -7.4 Q264.7 3.9 266.0 16.4" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M261.4 -1.5 L265.5 1.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M262.9 4.5 L266.7 7.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M264.5 10.5 L267.9 12.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M259.8 -7.4 Q248.5 -2.6 238.8 5.5" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M254.6 -4.2 L249.6 -4.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M249.3 -1.0 L244.8 -1.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M244.1 2.2 L239.9 1.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M261.5 -11.6 Q265.7 -1.1 266.6 10.4" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M262.8 -6.1 L266.5 -3.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M264.1 -0.6 L267.4 1.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M265.3 4.9 L268.4 7.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M261.5 -11.6 Q251.3 -6.9 242.6 0.7" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M256.8 -8.5 L252.2 -9.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M252.1 -5.4 L247.9 -6.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M247.4 -2.4 L243.5 -2.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M263.2 -15.8 Q266.7 -6.1 267.2 4.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M264.2 -10.8 L267.5 -8.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M265.2 -5.7 L268.3 -3.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M266.2 -0.7 L269.0 1.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M263.2 -15.8 Q254.0 -11.3 246.3 -4.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M259.0 -12.9 L254.8 -13.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M254.8 -9.9 L250.9 -10.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M250.5 -7.0 L247.0 -7.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M264.9 -20.0 Q267.9 -11.1 268.0 -1.5" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M265.7 -15.4 L268.6 -12.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M266.5 -10.8 L269.2 -8.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M267.3 -6.2 L269.7 -4.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M264.9 -20.0 Q256.7 -15.7 249.9 -8.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M261.2 -17.3 L257.4 -17.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M257.4 -14.5 L253.9 -14.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M253.6 -11.7 L250.4 -11.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="256.5" cy="22.9" rx="14.5" ry="10.1" fill="rgba(255,255,255,0.28)" transform="rotate(-168 256.5 22.9)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M307.4 15.9 C308.8 27.2 321.1 46.3 334.0 37.5 C341.9 18.5 330.2 -2.5 320.7 -25.0 C299.8 -12.4 277.9 -2.2 273.1 17.8 C278.5 32.4 299.6 24.2 307.4 15.9Z" fill="url(#fH)" opacity="0.87"/>
  <path d="M307.4 15.9 C311.8 2.3 316.2 -11.3 319.7 -21.9" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M307.4 15.9 L297.2 47.1" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M308.8 11.4 Q317.9 25.0 322.7 40.9" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M312.3 18.8 L318.3 21.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M315.8 26.2 L321.3 28.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M319.3 33.6 L324.3 35.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M308.8 11.4 Q293.5 17.0 280.2 27.1" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M301.7 15.3 L295.2 14.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M294.5 19.3 L288.6 18.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M287.4 23.2 L281.9 22.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M310.2 7.2 Q318.3 20.0 322.3 35.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M313.2 14.1 L318.8 16.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M316.3 21.1 L321.3 23.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M319.3 28.1 L323.9 30.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M310.2 7.2 Q296.1 12.8 284.1 22.6" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M303.7 11.0 L297.6 10.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M297.1 14.9 L291.5 13.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M290.6 18.7 L285.5 17.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M311.6 3.0 Q318.7 15.1 322.0 29.1" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M314.2 9.5 L319.2 12.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M316.8 16.0 L321.4 18.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M319.4 22.5 L323.7 24.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M311.6 3.0 Q298.7 8.6 287.8 17.9" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M305.6 6.7 L300.0 5.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M299.7 10.5 L294.5 9.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M293.7 14.2 L289.0 13.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M312.9 -1.2 Q319.2 10.1 321.9 23.1" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M315.2 4.9 L319.8 7.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M317.4 11.0 L321.6 13.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M319.7 17.0 L323.5 19.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M312.9 -1.2 Q301.2 4.3 291.4 13.2" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M307.6 2.4 L302.3 1.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M302.2 6.0 L297.3 5.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M296.8 9.6 L292.4 9.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M314.3 -5.4 Q319.8 5.2 321.9 17.2" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M316.2 0.2 L320.4 2.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M318.1 5.9 L321.9 8.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M320.0 11.6 L323.5 13.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M314.3 -5.4 Q303.7 -0.0 294.9 8.4" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M309.5 -2.0 L304.6 -2.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M304.6 1.5 L300.1 1.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M299.7 5.0 L295.7 4.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M315.7 -9.7 Q320.4 0.2 322.0 11.3" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M317.3 -4.4 L321.0 -2.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M318.9 0.8 L322.3 3.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M320.5 6.1 L323.6 8.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M315.7 -9.7 Q306.1 -4.4 298.2 3.6" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M311.3 -6.4 L306.9 -6.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M307.0 -3.0 L302.9 -3.2" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M302.6 0.3 L298.9 0.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M317.1 -13.9 Q321.1 -4.7 322.3 5.4" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M318.4 -9.0 L321.7 -6.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M319.7 -4.2 L322.7 -2.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M321.0 0.6 L323.8 2.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M317.1 -13.9 Q308.4 -8.8 301.5 -1.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M313.2 -10.7 L309.1 -10.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M309.3 -7.6 L305.5 -7.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M305.4 -4.5 L302.0 -4.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M318.4 -18.1 Q321.8 -9.7 322.7 -0.4" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M319.5 -13.7 L322.5 -11.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M320.6 -9.2 L323.3 -7.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M321.6 -4.8 L324.1 -3.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M318.4 -18.1 Q310.7 -13.3 304.6 -6.3" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M315.0 -15.1 L311.3 -15.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M311.5 -12.2 L308.1 -12.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M308.1 -9.2 L305.0 -9.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="313.1" cy="24.3" rx="14.1" ry="9.8" fill="rgba(255,255,255,0.28)" transform="rotate(-172 313.1 24.3)"/>
</g>
      <g filter="url(#lsh)">
  <path d="M343.3 -10.0 C344.3 1.5 356.4 21.6 370.0 13.1 C378.7 -6.1 367.4 -28.1 358.4 -51.5 C336.4 -39.4 313.6 -29.8 308.0 -9.5 C313.0 5.8 335.0 -1.9 343.3 -10.0Z" fill="url(#fA)" opacity="0.89"/>
  <path d="M343.3 -10.0 C348.3 -23.8 353.3 -37.7 357.2 -48.3" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M343.3 -10.0 L331.8 21.5" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M345.0 -14.6 Q353.8 -0.3 358.2 16.3" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M348.3 -6.9 L354.4 -3.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M351.6 0.8 L357.2 3.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M354.9 8.6 L360.0 11.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M345.0 -14.6 Q329.0 -9.4 314.9 0.6" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M337.4 -10.8 L330.8 -12.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M329.9 -7.0 L323.8 -8.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M322.4 -3.2 L316.8 -4.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M346.5 -18.9 Q354.4 -5.4 358.0 10.2" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M349.4 -11.6 L355.0 -8.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M352.2 -4.3 L357.4 -1.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M355.1 2.9 L359.8 5.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M346.5 -18.9 Q331.8 -13.6 319.0 -4.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M339.6 -15.2 L333.4 -16.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M332.8 -11.4 L327.0 -12.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M325.9 -7.7 L320.7 -8.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M348.1 -23.2 Q355.0 -10.4 357.9 4.1" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M350.5 -16.3 L355.6 -13.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M353.0 -9.5 L357.7 -6.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M355.4 -2.7 L359.7 -0.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M348.1 -23.2 Q334.6 -17.8 323.0 -8.6" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M341.8 -19.5 L336.0 -20.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M335.5 -15.9 L330.2 -16.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M329.3 -12.2 L324.4 -13.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M349.6 -27.4 Q355.6 -15.5 358.0 -2.0" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M351.7 -21.1 L356.3 -18.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M353.8 -14.7 L358.0 -12.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M355.9 -8.3 L359.8 -5.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M349.6 -27.4 Q337.3 -22.1 326.9 -13.3" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M343.9 -23.9 L338.5 -24.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M338.2 -20.4 L333.3 -21.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M332.5 -16.8 L328.0 -17.5" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M351.2 -31.7 Q356.4 -20.5 358.2 -8.1" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M352.9 -25.8 L357.1 -23.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M354.7 -19.9 L358.5 -17.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M356.4 -14.0 L359.9 -11.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M351.2 -31.7 Q340.0 -26.5 330.6 -18.1" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M346.0 -28.3 L341.0 -28.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M340.9 -24.9 L336.3 -25.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M335.7 -21.5 L331.6 -22.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M352.7 -35.9 Q357.2 -25.6 358.5 -14.1" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M354.2 -30.5 L357.9 -27.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M355.6 -25.0 L359.1 -22.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M357.1 -19.6 L360.2 -17.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M352.7 -35.9 Q342.6 -30.9 334.2 -22.9" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M348.1 -32.7 L343.5 -33.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M343.5 -29.4 L339.3 -29.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M338.9 -26.2 L335.0 -26.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M354.3 -40.2 Q358.1 -30.6 359.0 -20.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M355.4 -35.2 L358.8 -32.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M356.6 -30.2 L359.7 -27.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M357.8 -25.1 L360.6 -23.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M354.3 -40.2 Q345.2 -35.3 337.7 -27.8" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M350.1 -37.1 L345.9 -37.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M346.0 -34.0 L342.2 -34.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M341.9 -30.9 L338.4 -31.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M355.8 -44.5 Q359.0 -35.7 359.6 -26.1" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M356.8 -39.9 L359.7 -37.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M357.7 -35.3 L360.4 -33.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M358.6 -30.7 L361.1 -28.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M355.8 -44.5 Q347.7 -39.8 341.1 -32.8" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M352.2 -41.6 L348.3 -41.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M348.5 -38.6 L345.0 -38.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M344.8 -35.7 L341.6 -35.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="348.9" cy="-1.3" rx="14.5" ry="10.1" fill="rgba(255,255,255,0.28)" transform="rotate(-170 348.9 -1.3)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M95.6 -6.0 C98.2 4.7 112.5 22.1 124.4 12.3 C130.1 -6.9 116.2 -26.2 104.3 -47.1 C84.9 -32.8 64.4 -20.9 61.8 -1.0 C68.7 12.8 88.8 2.7 95.6 -6.0Z" fill="url(#fB)" opacity="0.84"/>
  <path d="M95.6 -6.0 C98.5 -19.7 101.4 -33.4 103.7 -44.0" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M95.6 -6.0 L88.9 25.3" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M96.6 -10.6 Q107.0 1.9 113.5 17.3" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M100.8 -3.6 L107.1 -1.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M105.0 3.4 L110.8 5.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M109.2 10.3 L114.5 12.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M96.6 -10.6 Q81.9 -3.4 69.8 8.0" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M89.9 -5.9 L83.2 -6.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M83.2 -1.3 L77.1 -1.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M76.5 3.4 L70.9 2.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M97.5 -14.8 Q106.8 -2.9 112.4 11.6" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M101.2 -8.2 L107.0 -6.1" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M104.9 -1.6 L110.2 0.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M108.7 5.0 L113.5 6.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M97.5 -14.8 Q84.0 -7.7 73.1 3.2" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M91.4 -10.3 L85.2 -10.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M85.3 -5.8 L79.6 -6.2" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M79.2 -1.3 L74.0 -1.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M98.3 -19.1 Q106.7 -7.8 111.5 5.8" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M101.6 -12.8 L106.9 -10.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M104.9 -6.6 L109.8 -4.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M108.2 -0.4 L112.6 1.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M98.3 -19.1 Q86.1 -12.1 76.2 -1.7" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M92.8 -14.7 L87.1 -14.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M87.3 -10.4 L82.0 -10.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M81.8 -6.0 L77.0 -6.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M99.2 -23.3 Q106.7 -12.6 110.7 0.0" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M102.1 -17.5 L106.9 -15.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M105.0 -11.6 L109.4 -9.7" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M107.8 -5.8 L111.9 -4.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M99.2 -23.3 Q88.1 -16.6 79.3 -6.7" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M94.3 -19.1 L89.0 -19.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M89.3 -15.0 L84.4 -15.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M84.3 -10.8 L79.9 -10.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M100.1 -27.5 Q106.7 -17.5 110.1 -5.8" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M102.6 -22.1 L107.0 -20.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M105.1 -16.6 L109.1 -14.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M107.6 -11.2 L111.3 -9.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M100.1 -27.5 Q90.1 -21.0 82.2 -11.7" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M95.7 -23.6 L90.8 -23.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M91.2 -19.6 L86.7 -19.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M86.7 -15.6 L82.6 -15.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M101.0 -31.7 Q106.8 -22.4 109.6 -11.5" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M103.2 -26.7 L107.1 -24.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M105.3 -21.6 L108.9 -19.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M107.4 -16.6 L110.8 -14.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M101.0 -31.7 Q92.0 -25.5 85.1 -16.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M97.0 -28.0 L92.6 -27.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M93.1 -24.2 L89.0 -24.0" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M89.1 -20.5 L85.3 -20.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M101.9 -36.0 Q106.9 -27.3 109.2 -17.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M103.8 -31.3 L107.3 -29.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M105.6 -26.6 L108.8 -24.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M107.4 -22.0 L110.4 -20.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M101.9 -36.0 Q93.9 -30.1 87.8 -21.9" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M98.4 -32.4 L94.3 -32.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M94.8 -28.9 L91.1 -28.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M91.3 -25.4 L87.9 -25.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M102.8 -40.2 Q107.1 -32.2 108.9 -23.1" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M104.4 -35.9 L107.6 -34.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M105.9 -31.6 L108.8 -29.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M107.4 -27.3 L110.1 -25.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M102.8 -40.2 Q95.7 -34.6 90.3 -27.0" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M99.7 -36.9 L96.0 -36.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M96.6 -33.6 L93.2 -33.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M93.5 -30.3 L90.4 -30.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="102.2" cy="1.5" rx="14.1" ry="9.6" fill="rgba(255,255,255,0.28)" transform="rotate(-178 102.2 1.5)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M167.2 5.8 C167.5 16.6 177.5 36.0 190.8 29.1 C200.1 11.9 190.9 -9.3 183.9 -31.6 C162.6 -21.9 140.6 -14.6 134.1 3.9 C137.9 18.3 159.0 12.8 167.2 5.8Z" fill="url(#fC)" opacity="0.82"/>
  <path d="M167.2 5.8 C172.8 -6.7 178.3 -19.2 182.6 -28.8" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M167.2 5.8 L154.5 34.3" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M169.1 1.6 Q176.4 15.6 179.4 31.5" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M171.7 9.1 L177.2 12.4" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M174.3 16.6 L179.3 19.6" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M176.9 24.0 L181.5 26.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M169.1 1.6 Q153.7 5.5 139.9 13.9" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M161.8 4.7 L155.6 2.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M154.5 7.8 L148.8 6.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M147.2 10.8 L142.0 9.2" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M170.8 -2.2 Q177.2 11.0 179.6 25.8" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M173.0 4.8 L178.0 8.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M175.2 11.8 L179.8 14.7" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M177.4 18.8 L181.6 21.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M170.8 -2.2 Q156.6 1.8 144.0 10.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M164.1 0.8 L158.3 -0.8" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M157.4 3.9 L152.1 2.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M150.7 6.9 L145.9 5.6" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M172.5 -6.1 Q178.1 6.3 179.9 20.1" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M174.3 0.5 L178.9 3.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M176.2 7.0 L180.4 9.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M178.1 13.6 L181.9 16.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M172.5 -6.1 Q159.5 -2.0 148.0 5.9" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M166.4 -3.1 L161.0 -4.4" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M160.3 -0.1 L155.3 -1.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M154.1 2.9 L149.6 1.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M174.2 -9.9 Q179.1 1.7 180.4 14.5" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M175.7 -3.8 L179.9 -0.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M177.3 2.3 L181.1 5.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M178.8 8.4 L182.3 10.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M174.2 -9.9 Q162.3 -5.8 151.9 1.8" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M168.6 -7.0 L163.6 -8.1" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M163.1 -4.0 L158.5 -5.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M157.5 -1.1 L153.3 -2.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M175.9 -13.8 Q180.1 -3.0 180.9 8.8" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M177.2 -8.1 L180.9 -5.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M178.4 -2.5 L181.9 0.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M179.7 3.2 L182.8 5.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M175.9 -13.8 Q165.1 -9.6 155.8 -2.4" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M170.9 -10.9 L166.2 -11.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M165.8 -8.1 L161.6 -8.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M160.8 -5.2 L156.9 -5.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M177.6 -17.6 Q181.2 -7.6 181.6 3.2" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M178.6 -12.4 L182.0 -9.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M179.6 -7.2 L182.7 -4.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M180.6 -2.0 L183.4 0.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M177.6 -17.6 Q167.8 -13.5 159.5 -6.6" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M173.1 -14.9 L168.8 -15.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M168.5 -12.1 L164.6 -12.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M164.0 -9.4 L160.4 -9.9" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M179.3 -21.5 Q182.3 -12.2 182.4 -2.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M180.1 -16.7 L183.1 -14.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M180.9 -11.9 L183.6 -9.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M181.7 -7.1 L184.2 -5.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M179.3 -21.5 Q170.5 -17.5 163.0 -11.0" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M175.3 -18.8 L171.4 -19.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M171.2 -16.2 L167.6 -16.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M167.1 -13.6 L163.8 -14.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M181.1 -25.3 Q183.5 -16.9 183.4 -7.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M181.6 -21.0 L184.3 -18.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M182.2 -16.6 L184.6 -14.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M182.8 -12.2 L185.0 -10.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M181.1 -25.3 Q173.1 -21.5 166.5 -15.3" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M177.4 -22.8 L173.9 -23.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M173.8 -20.3 L170.5 -20.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M170.2 -17.8 L167.2 -18.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="171.9" cy="14.3" rx="13.6" ry="9.4" fill="rgba(255,255,255,0.28)" transform="rotate(-166 171.9 14.3)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M227.5 -4.1 C229.2 6.5 241.9 24.3 254.0 15.7 C260.9 -2.7 248.8 -22.3 238.7 -43.5 C219.0 -30.9 198.3 -20.6 194.4 -1.4 C200.2 12.4 220.3 4.0 227.5 -4.1Z" fill="url(#fD)" opacity="0.82"/>
  <path d="M227.5 -4.1 C231.2 -17.2 235.0 -30.4 237.9 -40.5" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M227.5 -4.1 L218.9 25.9" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M228.7 -8.5 Q238.0 4.3 243.2 19.6" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M232.3 -1.5 L238.3 1.0" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M235.9 5.6 L241.4 7.9" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M239.6 12.6 L244.5 14.7" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M228.7 -8.5 Q214.1 -2.5 201.6 7.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M221.9 -4.4 L215.6 -5.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M215.1 -0.4 L209.3 -1.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M208.3 3.7 L203.0 2.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M229.9 -12.5 Q238.1 -0.4 242.5 14.0" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M233.0 -5.9 L238.5 -3.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M236.2 0.7 L241.2 3.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M239.4 7.3 L243.9 9.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M229.9 -12.5 Q216.4 -6.6 205.1 3.2" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M223.7 -8.6 L217.8 -9.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M217.5 -4.7 L212.0 -5.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M211.3 -0.7 L206.3 -1.4" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M231.0 -16.6 Q238.3 -5.1 242.1 8.3" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M233.8 -10.4 L238.8 -7.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M236.5 -4.1 L241.1 -1.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M239.3 2.1 L243.5 4.1" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M231.0 -16.6 Q218.8 -10.7 208.5 -1.3" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M225.4 -12.8 L219.9 -13.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M219.8 -9.0 L214.7 -9.5" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M214.1 -5.1 L209.5 -5.6" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M232.2 -20.6 Q238.6 -9.8 241.7 2.6" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M234.6 -14.8 L239.1 -12.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M236.9 -9.0 L241.1 -6.8" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M239.3 -3.2 L243.1 -1.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M232.2 -20.6 Q221.0 -14.9 211.8 -5.9" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M227.1 -17.0 L222.0 -17.3" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M222.0 -13.3 L217.3 -13.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M216.9 -9.6 L212.6 -9.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M233.4 -24.7 Q239.0 -14.6 241.5 -3.0" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M235.4 -19.3 L239.5 -17.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M237.4 -13.9 L241.2 -11.7" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M239.4 -8.4 L242.9 -6.5" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M233.4 -24.7 Q223.2 -19.1 215.0 -10.6" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M228.8 -21.2 L224.1 -21.4" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M224.2 -17.7 L219.8 -17.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M219.6 -14.1 L215.6 -14.3" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M234.5 -28.7 Q239.4 -19.3 241.4 -8.7" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M236.2 -23.7 L239.9 -21.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M238.0 -18.7 L241.4 -16.6" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M239.7 -13.7 L242.8 -11.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M234.5 -28.7 Q225.4 -23.4 218.1 -15.3" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M230.4 -25.4 L226.1 -25.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M226.3 -22.0 L222.3 -22.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M222.2 -18.7 L218.6 -18.7" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M235.7 -32.8 Q239.9 -24.1 241.4 -14.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M237.1 -28.2 L240.4 -26.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M238.5 -23.5 L241.6 -21.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M240.0 -18.9 L242.8 -17.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M235.7 -32.8 Q227.5 -27.6 221.0 -20.1" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M232.0 -29.6 L228.1 -29.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M228.3 -26.5 L224.7 -26.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M224.7 -23.3 L221.4 -23.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M236.8 -36.9 Q240.4 -28.8 241.6 -19.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M238.0 -32.6 L241.0 -30.6" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M239.2 -28.4 L241.9 -26.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M240.4 -24.1 L242.9 -22.4" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M236.8 -36.9 Q229.5 -31.9 223.9 -24.9" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M233.6 -33.9 L230.0 -33.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M230.4 -30.9 L227.1 -30.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M227.1 -27.9 L224.1 -27.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="233.3" cy="3.6" rx="13.6" ry="9.4" fill="rgba(255,255,255,0.28)" transform="rotate(-174 233.3 3.6)"/>
</g>
      <g filter="url(#lsh2)">
  <path d="M279.4 -2.2 C280.3 8.3 291.3 26.4 303.6 18.8 C311.5 1.4 301.2 -18.5 293.0 -39.7 C273.1 -28.8 252.3 -20.1 247.3 -1.8 C251.8 12.0 271.9 5.2 279.4 -2.2Z" fill="url(#fE)" opacity="0.8"/>
  <path d="M279.4 -2.2 C283.9 -14.7 288.4 -27.2 292.0 -36.9" fill="none" stroke="#0A2804" stroke-width="1.40" opacity="0.85" stroke-linecap="round"/>
  <path d="M279.4 -2.2 L269.0 26.4" fill="none" stroke="#1A4808" stroke-width="0.84" opacity="0.6" stroke-linecap="round"/>
  <path d="M280.9 -6.4 Q288.9 6.6 292.9 21.7" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M283.9 0.7 L289.4 3.5" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M286.9 7.7 L292.0 10.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M289.9 14.7 L294.6 17.1" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M280.9 -6.4 Q266.3 -1.6 253.6 7.4" fill="none" stroke="#0A2804" stroke-width="0.51" opacity="0.70" stroke-linecap="round"/>
  <path d="M274.0 -2.9 L268.0 -4.3" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M267.2 0.5 L261.6 -0.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M260.4 4.0 L255.3 2.8" fill="none" stroke="#0A2804" stroke-width="0.23" opacity="0.38" stroke-linecap="round"/>
  <path d="M282.3 -10.2 Q289.4 2.1 292.7 16.2" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M284.9 -3.6 L290.0 -0.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M287.5 3.0 L292.2 5.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M290.1 9.6 L294.4 11.9" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M282.3 -10.2 Q268.9 -5.4 257.3 3.3" fill="none" stroke="#0A2804" stroke-width="0.48" opacity="0.68" stroke-linecap="round"/>
  <path d="M276.0 -6.8 L270.3 -8.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M269.8 -3.5 L264.6 -4.5" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M263.5 -0.1 L258.8 -1.0" fill="none" stroke="#0A2804" stroke-width="0.22" opacity="0.37" stroke-linecap="round"/>
  <path d="M283.7 -14.1 Q289.9 -2.5 292.6 10.7" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M285.9 -7.9 L290.5 -5.2" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M288.1 -1.7 L292.4 0.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M290.4 4.5 L294.3 6.8" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M283.7 -14.1 Q271.4 -9.3 260.9 -0.9" fill="none" stroke="#0A2804" stroke-width="0.46" opacity="0.66" stroke-linecap="round"/>
  <path d="M278.0 -10.8 L272.7 -11.7" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M272.3 -7.5 L267.4 -8.3" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M266.6 -4.2 L262.2 -4.9" fill="none" stroke="#0A2804" stroke-width="0.21" opacity="0.36" stroke-linecap="round"/>
  <path d="M285.1 -17.9 Q290.6 -7.1 292.7 5.2" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M287.0 -12.2 L291.2 -9.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M288.9 -6.4 L292.7 -4.0" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M290.8 -0.6 L294.3 1.6" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M285.1 -17.9 Q273.9 -13.2 264.4 -5.1" fill="none" stroke="#0A2804" stroke-width="0.44" opacity="0.64" stroke-linecap="round"/>
  <path d="M279.9 -14.7 L275.0 -15.4" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M274.7 -11.5 L270.2 -12.2" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M269.6 -8.3 L265.5 -8.9" fill="none" stroke="#0A2804" stroke-width="0.20" opacity="0.35" stroke-linecap="round"/>
  <path d="M286.5 -21.8 Q291.2 -11.7 292.9 -0.3" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M288.1 -16.4 L291.9 -13.9" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M289.7 -11.1 L293.2 -8.8" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M291.3 -5.7 L294.4 -3.6" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M286.5 -21.8 Q276.3 -17.1 267.8 -9.4" fill="none" stroke="#0A2804" stroke-width="0.41" opacity="0.62" stroke-linecap="round"/>
  <path d="M281.8 -18.7 L277.3 -19.2" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M277.1 -15.6 L273.0 -16.1" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M272.5 -12.5 L268.7 -13.0" fill="none" stroke="#0A2804" stroke-width="0.19" opacity="0.34" stroke-linecap="round"/>
  <path d="M287.9 -25.7 Q292.0 -16.2 293.2 -5.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M289.2 -20.7 L292.6 -18.3" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M290.5 -15.7 L293.7 -13.5" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M291.8 -10.8 L294.7 -8.8" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M287.9 -25.7 Q278.7 -21.1 271.1 -13.8" fill="none" stroke="#0A2804" stroke-width="0.39" opacity="0.60" stroke-linecap="round"/>
  <path d="M283.7 -22.7 L279.5 -23.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M279.5 -19.8 L275.7 -20.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M275.3 -16.8 L271.8 -17.1" fill="none" stroke="#0A2804" stroke-width="0.17" opacity="0.33" stroke-linecap="round"/>
  <path d="M289.3 -29.5 Q292.8 -20.8 293.6 -11.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M290.4 -25.0 L293.4 -22.7" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M291.4 -20.4 L294.2 -18.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M292.5 -15.8 L295.1 -13.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M289.3 -29.5 Q281.0 -25.1 274.3 -18.3" fill="none" stroke="#0A2804" stroke-width="0.36" opacity="0.58" stroke-linecap="round"/>
  <path d="M285.5 -26.7 L281.7 -26.9" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M281.8 -23.9 L278.3 -24.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M278.0 -21.1 L274.8 -21.3" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.32" stroke-linecap="round"/>
  <path d="M290.7 -33.4 Q293.6 -25.4 294.1 -16.7" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M291.5 -29.2 L294.3 -27.1" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M292.4 -25.0 L294.9 -23.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M293.2 -20.9 L295.5 -19.0" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M290.7 -33.4 Q283.3 -29.1 277.4 -22.8" fill="none" stroke="#0A2804" stroke-width="0.35" opacity="0.56" stroke-linecap="round"/>
  <path d="M287.4 -30.7 L283.9 -30.8" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M284.0 -28.1 L280.8 -28.2" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <path d="M280.7 -25.4 L277.8 -25.5" fill="none" stroke="#0A2804" stroke-width="0.16" opacity="0.31" stroke-linecap="round"/>
  <ellipse cx="284.4" cy="5.7" rx="13.2" ry="9.1" fill="rgba(255,255,255,0.28)" transform="rotate(-170 284.4 5.7)"/>
</g>
      {/* BOTTOM FOLIAGE */}
      <ellipse cx="35" cy="840" rx="70" ry="30" fill="#60A028" opacity="0.50"/>
      <ellipse cx="5" cy="844" rx="48" ry="22" fill="#80C040" opacity="0.44"/>
      <ellipse cx="82" cy="844" rx="58" ry="25" fill="#509018" opacity="0.46"/>
      <ellipse cx="148" cy="844" rx="42" ry="17" fill="#78B038" opacity="0.38"/>
      <ellipse cx="355" cy="840" rx="70" ry="30" fill="#60A028" opacity="0.50"/>
      <ellipse cx="385" cy="844" rx="48" ry="22" fill="#80C040" opacity="0.44"/>
      <ellipse cx="308" cy="844" rx="58" ry="25" fill="#509018" opacity="0.46"/>
      <ellipse cx="245" cy="844" rx="42" ry="17" fill="#78B038" opacity="0.38"/>
      <ellipse cx="195" cy="844" rx="34" ry="14" fill="#60A028" opacity="0.34"/>
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
              style={{width:"100%",padding:"17px",background:btnGrad,color:"#1A1A10",border:"none",borderRadius:18,fontWeight:900,fontSize:17,cursor:"pointer",boxShadow:"0 6px 22px rgba(45,10,94,0.5)",pointerEvents:"auto",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
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
    <g style={{cursor:"pointer",filter:selected?"drop-shadow(0 0 10px rgba(160,190,140,0.35))":"drop-shadow(0 4px 8px rgba(45,10,94,0.5))"}}>
      <defs>
        <radialGradient id={`rg_${id}`} cx="38%" cy="32%" r="65%">
          <stop offset="0%"   stopColor="#f0e8ff" stopOpacity="1"/>
          <stop offset="28%"  stopColor="#c4aee8" stopOpacity="0.95"/>
          <stop offset="60%"  stopColor="#7c5cbf" stopOpacity="0.92"/>
          <stop offset="85%"  stopColor="#5a3d9a" stopOpacity="0.97"/>
          <stop offset="100%" stopColor="#2C3820" stopOpacity="1"/>
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
                }} style={{flex:1,background:"#e74c3c",color:"#1A1A10",border:"none",borderRadius:12,padding:"12px",fontWeight:800,fontSize:14,cursor:"pointer"}}>Delete</button>
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

            <div style={{position:"relative",background:C.wh,borderRadius:"22px 22px 0 0",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 -8px 40px rgba(58,80,38,0.20)"}}>
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
                <button onClick={()=>setEditingId(null)} style={{position:"absolute",top:10,left:10,background:"rgba(0,0,0,0.45)",color:"#1A1A10",border:"none",borderRadius:10,width:36,height:36,fontSize:18,cursor:"pointer",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,zIndex:10}}>←</button>
                {/* Overlay buttons */}
                <div style={{position:"absolute",top:10,right:10,display:"flex",gap:8}}>
                  <label style={{background:"rgba(0,0,0,0.45)",color:"#1A1A10",borderRadius:20,padding:"5px 12px",fontSize:12,fontWeight:700,cursor:"pointer",backdropFilter:"blur(4px)"}}>
                    📸 {node.cover?"Change":"Add photo"}
                    <input type="file" accept="image/*" style={{display:"none"}} onChange={handleCover}/>
                  </label>
                  {node.cover&&<button onClick={()=>patchNode({cover:null})} style={{background:"rgba(192,57,43,0.7)",color:"#1A1A10",border:"none",borderRadius:20,padding:"5px 10px",fontSize:12,fontWeight:700,cursor:"pointer"}}>✕</button>}
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
                          style={{background:C.pp,color:"#1A1A10",border:"none",borderRadius:7,width:26,height:26,cursor:"pointer",fontSize:11,flexShrink:0}}>↗</button>
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
                          <button onClick={()=>delImg(img.id)} style={{position:"absolute",top:-6,right:-6,width:20,height:20,borderRadius:"50%",background:"#e74c3c",color:"#1A1A10",border:"none",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
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
                  <button onClick={commitEdit} style={{flex:2,background:btnGrad,color:"#1A1A10",border:"none",borderRadius:12,padding:"13px",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:"0 3px 12px rgba(45,10,94,0.3)"}}>Save</button>
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
          <div style={{textAlign:"center",marginTop:60}}>
            <div style={{fontSize:64,marginBottom:12}}>🗄️</div>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:16,fontWeight:700,marginBottom:6}}>Your filing cabinet is empty</div>
            <div style={{color:"rgba(255,255,255,0.35)",fontSize:13,marginBottom:20}}>Tap + Drawer to add categories like Finance, Health, Work...</div>
            <button onClick={()=>setAddingDrawer(true)} style={{background:btnGrad,color:"#1A1A10",border:"none",borderRadius:14,padding:"13px 28px",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:"0 4px 16px rgba(45,10,94,0.3)"}}>
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
                    <button onClick={e=>{e.stopPropagation();delDrawer(d.id);}} style={{position:"absolute",top:8,right:8,background:"rgba(90,80,60,0.06)",color:"rgba(255,255,255,0.7)",border:"none",borderRadius:6,width:24,height:24,cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",zIndex:10}}>🗑</button>
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
        <button onClick={()=>setStudioOpen(true)} style={{background:"linear-gradient(135deg,#4a148c,#7c5cbf)",color:"#1A1A10",border:"none",borderRadius:10,padding:"7px 11px",fontWeight:800,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4,flexShrink:0}}>🎓</button>
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
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif"}}>
      <div style={{background:`linear-gradient(135deg,${C.dp},${C.mp})`,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,boxShadow:"0 3px 16px rgba(90,80,60,0.35)",position:"sticky",top:0,zIndex:50}}>
        <button onClick={()=>setNotesMode(null)} style={{background:"rgba(255,255,255,0.2)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:10,width:40,height:40,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:900}}>←</button>
        <span style={{flex:1,color:"#1A1A10",fontWeight:900,fontSize:17}}>📓 Notes</span>
        <button onClick={()=>setNotesMode(null)} style={{background:"rgba(255,255,255,0.18)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:10,padding:"8px 14px",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>🏠 Home</button>
        <button onClick={addSection} style={{background:"rgba(255,255,255,0.22)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:12,width:40,height:40,fontSize:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
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
                <div style={{color:"#1A1A10",fontWeight:700,fontSize:17}}>{s.name}</div>
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
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      {/* Top nav bar with home button */}
      <div style={{background:`linear-gradient(135deg,${C.dp},${C.mp})`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 4px 24px rgba(90,80,60,0.35)"}}>
        <div style={{flex:1,textAlign:"center"}}>
          <div style={{fontSize:22,fontWeight:900,color:C.wh}}>📚 The Vault</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.55)"}}>Your space for everything</div>
        </div>
        <button onClick={()=>setScreen&&setScreen("home")} style={{background:"rgba(255,255,255,0.18)",color:"#1A1A10",border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:10,padding:"7px 13px",fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
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
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>

      {/* ── HEADER — elegant serif matching reference ── */}
      <div style={{
        background:"rgba(248,245,236,0.88)",
        backdropFilter:"blur(16px)",
        WebkitBackdropFilter:"blur(16px)",
        padding:"22px 20px 18px",
        textAlign:"center",
        borderBottom:"1px solid rgba(90,80,60,0.08)",
        position:"sticky",top:0,zIndex:50,
      }}>
        <button onClick={()=>setScreen("home")} style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:36,height:36,borderRadius:10}}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9l8 8" stroke="#1A1A10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{fontFamily:"Georgia,serif",fontSize:28,fontWeight:700,color:"#1A1A10",letterSpacing:-0.5,display:"inline-flex",alignItems:"center",gap:10}}>
          Smart Goals <span style={{fontSize:22}}>♥</span>
        </div>
      </div>

      {/* ── TABS — 2 rows like reference, no scroll ── */}
      <div style={{padding:"18px 20px 8px"}}>
        {/* Row 1: Next Week | 6 Months */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          {[{key:"week",label:"Next Week"},{key:"month6",label:"6 Months"}].map(({key,label})=>(
            <button key={key} onClick={()=>setActiveHorizon(key)} style={{
              background:"rgba(248,245,236,0.88)",
              border:"1.5px solid rgba(90,80,60,0.12)",
              borderRadius:18,
              padding:"18px 12px",
              cursor:"pointer",
              transition:"all 0.15s",
              position:"relative",
              boxShadow:activeHorizon===key?"0 2px 14px rgba(90,80,60,0.12)":"none",
            }}>
              <div style={{fontFamily:"Georgia,serif",fontSize:17,fontWeight:activeHorizon===key?700:500,color:activeHorizon===key?"#1A1A10":"#7A7060",textAlign:"center"}}>{label}</div>
              {activeHorizon===key&&<div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:40,height:3,background:"#2A1A08",borderRadius:2}}/>}
            </button>
          ))}
        </div>
        {/* Row 2: 1 Year | 3 Years | 5 Years */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:18}}>
          {[{key:"year1",label:"1 Year"},{key:"year3",label:"3 Years"},{key:"year5",label:"5 Years"}].map(({key,label})=>(
            <button key={key} onClick={()=>setActiveHorizon(key)} style={{
              background:"rgba(248,245,236,0.88)",
              border:"1.5px solid rgba(90,80,60,0.12)",
              borderRadius:18,
              padding:"16px 8px",
              cursor:"pointer",
              transition:"all 0.15s",
              position:"relative",
              boxShadow:activeHorizon===key?"0 2px 14px rgba(90,80,60,0.12)":"none",
            }}>
              <div style={{fontFamily:"Georgia,serif",fontSize:16,fontWeight:activeHorizon===key?700:500,color:activeHorizon===key?"#1A1A10":"#7A7060",textAlign:"center"}}>{label}</div>
              {activeHorizon===key&&<div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:32,height:3,background:"#2A1A08",borderRadius:2}}/>}
            </button>
          ))}
        </div>

        {/* ── ADD GOAL BUTTON — gorgeous pastel gradient like reference ── */}
        <button onClick={addGoal} style={{
          width:"100%",
          padding:"19px 24px",
          background:"linear-gradient(135deg,rgba(230,200,180,0.85) 0%,rgba(210,195,220,0.85) 40%,rgba(190,215,200,0.85) 70%,rgba(220,210,185,0.85) 100%)",
          color:"#2A1A08",
          border:"1.5px solid rgba(180,160,140,0.35)",
          borderRadius:100,
          fontFamily:"Georgia,serif",
          fontWeight:600,
          fontSize:18,
          cursor:"pointer",
          marginBottom:32,
          boxShadow:"0 4px 24px rgba(90,80,60,0.12)",
          backdropFilter:"blur(8px)",
          display:"flex",alignItems:"center",justifyContent:"center",gap:14,
          letterSpacing:0.2,
          transition:"all 0.15s",
        }}>
          <span style={{fontSize:22,fontWeight:300}}>+</span>
          Add {h.label} Goal
        </button>

        {/* ── EMPTY STATE — seedling + gentle prompt ── */}
        {horizonGoals.length===0&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 0 24px"}}>
            {/* Seedling SVG — like the reference */}
            <svg width="60" height="72" viewBox="0 0 60 72" fill="none" style={{marginBottom:20}}>
              <defs>
                <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#A8E068"/><stop offset="100%" stopColor="#5A9830"/></linearGradient>
                <linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#C8F098"/><stop offset="100%" stopColor="#78B848"/></linearGradient>
                <filter id="sgf"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1A3A08" floodOpacity="0.2"/></filter>
              </defs>
              {/* Stem */}
              <path d="M30 70 Q30 50 30 35" stroke="#5A8830" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/* Left leaf */}
              <g filter="url(#sgf)">
                <path d="M30 38 Q18 28 14 18 Q22 16 30 26 Q30 32 30 38Z" fill="url(#sg1)"/>
                <path d="M30 38 Q22 30 14 18" stroke="#2A5010" strokeWidth="0.8" opacity="0.6"/>
              </g>
              {/* Right leaf */}
              <g filter="url(#sgf)">
                <path d="M30 42 Q42 30 46 18 Q38 17 30 28 Q30 35 30 42Z" fill="url(#sg2)"/>
                <path d="M30 42 Q38 32 46 18" stroke="#2A5010" strokeWidth="0.8" opacity="0.6"/>
              </g>
              {/* Small left sprout */}
              <g filter="url(#sgf)" opacity="0.85">
                <path d="M30 52 Q22 44 19 36 Q25 35 30 44 Q30 48 30 52Z" fill="url(#sg2)"/>
                <path d="M30 52 Q24 46 19 36" stroke="#2A5010" strokeWidth="0.65" opacity="0.55"/>
              </g>
              {/* Ground */}
              <ellipse cx="30" cy="70" rx="8" ry="2.5" fill="#C8A870" opacity="0.35"/>
            </svg>

            <div style={{fontFamily:"Georgia,serif",fontSize:20,color:"#2A1A08",textAlign:"center",lineHeight:1.55,maxWidth:260,fontWeight:500}}>
              {h.question}
            </div>
          </div>
        )}

        {/* ── GOALS LIST ── */}
        {horizonGoals.map(goal=>{
          const doneCount=goal.subtasks.filter(s=>s.done).length;
          const pct=goal.subtasks.length>0?Math.round((doneCount/goal.subtasks.length)*100):0;
          return(
            <div key={goal.id} onClick={()=>setDetailId(goal.id)}
              style={{
                background:"rgba(248,245,236,0.92)",
                borderRadius:22,marginBottom:12,overflow:"hidden",
                boxShadow:"0 3px 18px rgba(90,80,60,0.09)",
                border:"1.5px solid rgba(255,255,255,0.9)",
                cursor:"pointer",transition:"transform 0.15s",
              }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              {goal.cover&&<img src={goal.cover} alt="" style={{width:"100%",height:80,objectFit:"cover"}}/>}
              {goal.subtasks.length>0&&(
                <div style={{height:4,background:"rgba(90,80,60,0.1)"}}>
                  <div style={{height:"100%",width:`${pct}%`,background:pct===100?"#5A7848":h.color,borderRadius:2,transition:"width 0.4s"}}/>
                </div>
              )}
              <div style={{padding:"14px 18px"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:16,color:goal.status==="done"?"#9A9080":"#1A1A10",textDecoration:goal.status==="done"?"line-through":"none",marginBottom:4,lineHeight:1.4}}>
                      {goal.title||"(Tap to edit)"}
                    </div>
                    {goal.description&&<div style={{fontSize:12,color:"#8A8070",lineHeight:1.5,marginBottom:4}}>{goal.description.slice(0,70)}{goal.description.length>70?"…":""}</div>}
                    <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                      {goal.dueDate&&<span style={{fontSize:11,color:"#7A7060",fontWeight:600}}>📅 {new Date(goal.dueDate).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>}
                      {goal.subtasks.length>0&&<span style={{fontSize:11,color:"#7A7060",fontWeight:600}}>{doneCount}/{goal.subtasks.length} steps · {pct}%</span>}
                      {goal.links.length>0&&<span style={{fontSize:11,color:"#7A7060"}}>🔗 {goal.links.length}</span>}
                    </div>
                  </div>
                  <span style={{fontSize:22,flexShrink:0}}>{h.icon}</span>
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
          <stop offset="100%" stopColor={full?"#c4aee8":"#2C3820"}/>
        </radialGradient>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={pct>0?`rgba(160,190,140,0.35)*0.35})`:"rgba(0,0,0,0)"}/>
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
  {key:"do",   label:"Do First",     emoji:"🔴", sub:"Urgent + Important",        bg:"#FF0022", light:"#fff0f2", border:"#FF0022", desc:"Act on these today"},
  {key:"plan", label:"Schedule",     emoji:"🟠", sub:"Important, not urgent",     bg:"#5A7848", light:"#fff4ec", border:"#5A7848", desc:"Block time for these"},
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
      <div style={{background:C.wh,borderRadius:"20px 20px 0 0",padding:"0 0 28px",width:"100%",maxWidth:480,boxShadow:"0 -8px 32px rgba(90,80,60,0.35)"}} onClick={e=>e.stopPropagation()}>
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
    <div style={{minHeight:"100vh",background:"transparent",fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      <Header title="🎯 Matrix" onBack={()=>setScreen("home")} />

      <div style={{padding:"12px 12px 0"}}>

        {/* Stale banner */}
        {staleTasks.length>0&&(
          <div style={{background:"linear-gradient(135deg,#b71c1c,#FF1744)",borderRadius:14,padding:"10px 14px",marginBottom:12,boxShadow:"0 4px 16px rgba(255,23,68,0.35)"}}>
            <div style={{color:"#1A1A10",fontWeight:900,fontSize:13,marginBottom:6}}>⏰ {staleTasks.length} task{staleTasks.length>1?"s":""} untouched 7+ days</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {staleTasks.map(t=><button key={t.id} onClick={()=>setStaleModal(t)} style={{background:"rgba(255,255,255,0.22)",color:"#1A1A10",border:"1px solid rgba(255,255,255,0.4)",borderRadius:16,padding:"3px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{t.text.slice(0,22)}{t.text.length>22?"…":""}</button>)}
            </div>
          </div>
        )}

        {/* AI panel */}
        <div style={{background:"rgba(255,255,255,0.14)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:16,padding:"12px 14px",marginBottom:12}}>
          <div style={{color:"#1A1A10",fontWeight:800,fontSize:12,marginBottom:8}}>🤖 AI Placement — describe a task</div>
          <div style={{display:"flex",gap:8,marginBottom:aiResult?8:0}}>
            <input value={aiInput} onChange={e=>setAiInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askAI()} placeholder="e.g. Book dentist appointment..." style={{flex:1,padding:"8px 12px",borderRadius:9,border:"1.5px solid rgba(255,255,255,0.35)",background:"rgba(255,255,255,0.18)",color:"#1A1A10",fontSize:13,fontWeight:600,outline:"none"}}/>
            <button onClick={askAI} disabled={aiLoading||!aiInput.trim()} style={{background:btnGrad,color:"#1A1A10",border:"none",borderRadius:9,padding:"8px 14px",fontWeight:800,fontSize:13,cursor:"pointer",opacity:aiInput.trim()?1:0.5,flexShrink:0}}>{aiLoading?"…":"Ask AI"}</button>
          </div>
          {aiResult&&(()=>{const q=quadByKey(aiResult.quad);return(
            <div style={{background:C.wh,borderRadius:10,padding:"10px 12px",border:`2px solid ${q.bg}`}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <span style={{background:q.bg,color:"#1A1A10",borderRadius:16,padding:"2px 9px",fontSize:11,fontWeight:800}}>{q.emoji} {q.label}</span>
                <span style={{fontSize:11,color:C.soft,flex:1,lineHeight:1.4}}>{aiResult.reason}</span>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={acceptAI} style={{background:btnGrad,color:"#1A1A10",border:"none",borderRadius:9,padding:"6px 14px",fontWeight:800,fontSize:12,cursor:"pointer"}}>✅ Accept</button>
                <button onClick={()=>setAiResult(null)} style={{background:C.ll,color:C.mid,border:"none",borderRadius:9,padding:"6px 12px",fontWeight:700,fontSize:12,cursor:"pointer"}}>Dismiss</button>
              </div>
            </div>
          );})()}
        </div>

        {/* Import from Prioritizer */}
        {priData.some(l=>l.tasks.filter(t=>!t.done).length>0)&&(
          <div style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:14,padding:"10px 14px",marginBottom:12}}>
            <div style={{color:"#1A1A10",fontWeight:800,fontSize:12,marginBottom:8}}>📋 Import from Prioritizer</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {priData.flatMap(l=>l.tasks.filter(t=>!t.done)).slice(0,6).map(t=>(
                <button key={t.id} onClick={()=>importFromPri(t)} style={{background:"rgba(255,255,255,0.2)",color:"#1A1A10",border:"1px solid rgba(255,255,255,0.35)",borderRadius:16,padding:"3px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{t.name.slice(0,20)}{t.name.length>20?"…":""} +</button>
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
                        {stale&&<div style={{position:"absolute",top:-7,right:4,background:"#FF1744",color:"#1A1A10",fontSize:8,fontWeight:900,borderRadius:8,padding:"1px 5px"}}>⏰</div>}
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
                      <button onClick={()=>addInline(q.key)} style={{background:q.bg,color:"#1A1A10",border:"none",borderRadius:8,width:26,height:26,fontSize:16,fontWeight:900,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
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

      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:"#1A1A10",borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(45,10,94,0.4)",zIndex:500,whiteSpace:"nowrap"}}>{toast}</div>}
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
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:"You are a warm friendly financial coach. Give exactly 5 short practical encouraging observations about this budget. Return ONLY a JSON array of 5 strings. No markdown.\n\n"+budgetPrompt}]})});
      const j=await res.json();
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
            <div style={{height:"100%",width:`${pct}%`,background:left<10?"#FF0022":"#7c5cbf",borderRadius:4,transition:"width 1s linear"}}/>
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
          <button onClick={start} disabled={total<1} style={{background:"#7c5cbf",color:"#1A1A10",border:"none",borderRadius:50,width:72,height:72,fontSize:24,cursor:"pointer",opacity:total>0?1:0.4,boxShadow:"0 4px 16px rgba(90,120,72,0.20)"}}>▶</button>
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
        <button onClick={add} style={{background:"#7c5cbf",color:"#1A1A10",border:"none",borderRadius:10,padding:"9px 18px",fontWeight:800,fontSize:14,cursor:"pointer"}}>+ Set</button>
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
          style={{flex:1,accentColor:"#7c5cbf"}}/>
        <span style={{color:"rgba(255,255,255,0.6)",fontSize:12,fontWeight:700,minWidth:32}}>{Math.round(vol*100)}%</span>
      </div>

      {/* Presets */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        {WN_PRESETS.map(p=>(
          <button key={p.id} onClick={()=>play(p.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"12px 14px",borderRadius:14,background:playing===p.id?"#7c5cbf":"rgba(255,255,255,0.12)",border:`1.5px solid ${playing===p.id?"#7c5cbf":"rgba(255,255,255,0.2)"}`,color:"#1A1A10",cursor:"pointer",fontWeight:playing===p.id?800:600,fontSize:13,transition:"all 0.15s"}}>
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
  const [active,setActive]=useState("calc");

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,#1a0336 0%,#4a148c 50%,#7b1fa2 100%)`,fontFamily:"'Segoe UI',sans-serif",paddingBottom:90}}>
      
      <Header title="🔧 Tools" onBack={()=>setScreen("home")} />

      {/* Tool tab bar */}
      <div style={{display:"flex",overflowX:"auto",gap:0,padding:"10px 12px",background:"rgba(90,80,60,0.06)",borderBottom:"1px solid rgba(90,80,60,0.1)"}}>
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
  {key:"week",  label:"Next Week",  icon:"📅", color:"#5A7848", grad:"linear-gradient(135deg,#e65100,#FF6D00)", question:"What do you want to achieve by next week?",  days:7},
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
    <div style={{display:"flex",alignItems:"center",gap:10,background:done?"rgba(39,174,96,0.1)":"rgba(255,255,255,0.06)",borderRadius:14,padding:"10px 14px",marginBottom:8,border:`1.5px solid ${done?"rgba(39,174,96,0.5)":"rgba(160,190,140,0.35)"}`}}>
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
      <div style={{background:"linear-gradient(135deg,#3D5A2A,#5A7848)",padding:"18px 16px 12px",boxShadow:"0 4px 24px rgba(90,120,72,0.20)"}}>
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
        <div style={{display:"flex",gap:0,background:"rgba(90,80,60,0.06)",borderRadius:12,padding:3}}>
          {[["today","⚡ Today"],["week","🔮 Week"],["settings","⚙️ Setup"]].map(([k,l])=>(
            <button key={k} onClick={()=>setView(k)} style={{flex:1,padding:"8px 4px",background:view===k?"rgba(160,190,140,0.35)":"transparent",color:view===k?"#fff":"rgba(255,255,255,0.45)",border:"none",borderRadius:10,fontWeight:view===k?800:600,fontSize:12,cursor:"pointer"}}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{padding:"14px"}}>

        {/* ══ TODAY ══ */}
        {view==="today"&&<>

          {/* Orb + status */}
          <div style={{display:"flex",alignItems:"center",gap:16,background:"rgba(255,255,255,0.05)",borderRadius:20,padding:"16px 18px",marginBottom:14,border:"1px solid rgba(160,190,140,0.35)"}}>
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
              <div style={{background:rewardUnlocked?"linear-gradient(135deg,#1e8449,#27ae60)":"rgba(255,255,255,0.07)",borderRadius:18,padding:"14px 16px",marginBottom:14,border:`1.5px solid ${rewardUnlocked?"rgba(39,174,96,0.8)":"rgba(160,190,140,0.35)"}`}}>
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
            <div style={{display:"flex",gap:8,marginBottom:8,background:"rgba(255,255,255,0.07)",borderRadius:12,padding:"10px 14px",border:"1px solid rgba(160,190,140,0.35)"}}>
              <input value={whatOff} onChange={e=>setWhatOff(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addFrog()}
                placeholder="Write what you've been avoiding..."
                style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#fff",fontSize:14,fontWeight:600}}/>
              <button onClick={addFrog} style={{background:"#7c5cbf",color:"#fff",border:"none",borderRadius:9,width:32,height:32,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
            </div>
            {frogs.map(f=>(
              <div key={f.id} style={{display:"flex",alignItems:"center",gap:10,background:f.done?"rgba(39,174,96,0.1)":"rgba(255,255,255,0.06)",borderRadius:12,padding:"10px 14px",marginBottom:7,border:`1.5px solid ${f.done?"rgba(39,174,96,0.5)":"rgba(160,190,140,0.35)"}`}}>
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
              <button onClick={getAiSugg} disabled={aiLoad} style={{background:"rgba(90,120,72,0.20)",color:"#fff",border:"1px solid rgba(160,190,140,0.35)",borderRadius:20,padding:"5px 13px",fontSize:11,fontWeight:700,cursor:"pointer",opacity:aiLoad?0.6:1}}>
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
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:16,background:"rgba(255,255,255,0.05)",borderRadius:20,padding:"20px",border:"1px solid rgba(160,190,140,0.35)"}}>
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
              <button onClick={getAwardIdeas} disabled={awardLoad} style={{background:btnGrad,color:"#1A1A10",border:"none",borderRadius:20,padding:"6px 14px",fontWeight:800,fontSize:12,cursor:"pointer",opacity:awardLoad?0.6:1}}>
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
                <button onClick={()=>{upd({weeklyAward:draftAward.trim()});setEditAward(false);showToast("🎁 Reward saved!");}} style={{flex:2,background:btnGrad,color:"#1A1A10",border:"none",borderRadius:10,padding:"10px",fontWeight:800,cursor:"pointer"}}>Save Reward</button>
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

      {toast&&<div style={{position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:C.dp,color:"#1A1A10",borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:14,boxShadow:"0 4px 20px rgba(45,10,94,0.4)",zIndex:400,whiteSpace:"nowrap"}}>{toast}</div>}
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
                <div style={{background:"rgba(90,80,60,0.06)",borderRadius:16,padding:"18px 20px",marginBottom:16,minHeight:80,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(82,196,122,0.2)"}}>
                  <div style={{color:"#e0f7e9",fontSize:16,fontWeight:600,textAlign:"center",lineHeight:1.7,fontStyle:"italic"}}>
                    {activeMed.script[Math.min(medStep,activeMed.script.length-1)]}
                  </div>
                </div>
              )}
              {/* Audio playing indicator */}
              {!medDone&&audioFiles[activeMed.id]&&(
                <div style={{background:"rgba(90,80,60,0.06)",borderRadius:16,padding:"18px 20px",marginBottom:16,display:"flex",flexDirection:"column",alignItems:"center",gap:12,border:"1px solid rgba(82,196,122,0.3)"}}>
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
