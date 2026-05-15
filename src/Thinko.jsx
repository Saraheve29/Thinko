<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/>
<title>Thinko</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
html,body{height:100%;width:100%;background:#E2DBC8;overflow-x:hidden;font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}

/* Fixed background */
#bg{position:fixed;inset:0;z-index:0;overflow:hidden;}
#bg-cream{position:absolute;inset:0;background:radial-gradient(ellipse 80% 65% at 48% 35%,#FAF7EE 0%,#F5EDDA 50%,#EAE0C5 100%);}

/* page */
.page{position:relative;z-index:10;min-height:100vh;padding-bottom:90px;}

/* glass panel */
.panel{
  margin:10px 11px;
  background:rgba(249,246,236,0.48);
  backdrop-filter:blur(24px) saturate(1.4);
  -webkit-backdrop-filter:blur(24px) saturate(1.4);
  border-radius:34px;
  border:1.5px solid rgba(255,255,255,0.62);
  padding:18px 15px 18px;
  box-shadow:0 8px 48px rgba(55,50,25,0.09),inset 0 1.5px 0 rgba(255,255,255,0.85);
}

/* top bar */
.topbar{display:flex;align-items:center;gap:8px;margin-bottom:16px;opacity:0.55;}

/* greeting */
.greet{
  font-size:27px;font-weight:800;color:#14140A;
  letter-spacing:-0.6px;line-height:1.18;
  margin-bottom:18px;
}

/* grid */
.grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
}

/* card */
.card{
  background:rgba(250,247,238,0.92);
  border-radius:22px;
  border:1px solid rgba(255,255,255,0.95);
  box-shadow:
    0 2px 16px rgba(55,50,25,0.07),
    0 1px 3px rgba(55,50,25,0.04),
    inset 0 1.5px 0 rgba(255,255,255,1);
  padding:17px 15px 14px;
  display:flex;flex-direction:column;gap:5px;
  min-height:112px;
  cursor:pointer;
  transition:transform 0.14s ease, box-shadow 0.14s ease;
  position:relative;overflow:hidden;
}
.card::after{
  content:'';position:absolute;top:0;left:10%;right:10%;height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,0.95),transparent);
}
.card:active{transform:scale(0.97);}
.card:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(55,50,25,0.11);}
.ico{font-size:36px;line-height:1;margin-bottom:3px;}
.name{font-size:15px;font-weight:700;color:#14140A;letter-spacing:-0.25px;}

/* nav */
.nav{
  position:fixed;bottom:0;left:0;right:0;z-index:200;
  background:rgba(242,237,224,0.95);
  backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
  border-top:1.5px solid rgba(255,255,255,0.7);
  padding:11px 4px 26px;
  display:flex;justify-content:space-around;
  box-shadow:0 -4px 28px rgba(55,50,25,0.07);
}
.ni{display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;opacity:0.42;min-width:60px;transition:opacity 0.2s;}
.ni.on{opacity:1;}
.ni svg{width:24px;height:24px;}
.ni-t{font-size:11px;font-weight:600;color:#14140A;}
.ni.on .ni-t{color:#2E6018;}

/* modal */
.modal-wrap{
  position:fixed;inset:0;z-index:500;
  display:flex;align-items:center;justify-content:center;
  padding:24px;
  background:rgba(220,214,196,0.78);
  backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);
}
.modal-box{
  background:rgba(253,250,244,0.97);
  border-radius:38px;padding:44px 26px 34px;
  width:100%;max-width:336px;text-align:center;
  box-shadow:0 20px 64px rgba(45,40,15,0.18);
  border:1.5px solid rgba(255,255,255,0.95);
  position:relative;z-index:1;
}
.modal-box h1{font-size:26px;font-weight:800;color:#14140A;margin-bottom:8px;letter-spacing:-0.5px;}
.modal-box p{font-size:14px;color:#685E48;line-height:1.72;margin-bottom:22px;font-weight:400;}
.modal-box label{font-size:13px;font-weight:700;color:#2E6018;display:block;margin-bottom:10px;}
.modal-box input{
  width:100%;padding:14px 18px;border-radius:100px;
  border:1.5px solid rgba(130,170,100,0.38);
  background:rgba(240,236,222,0.85);
  font-family:'Inter',sans-serif;font-size:15px;color:#14140A;
  outline:none;text-align:center;margin-bottom:13px;
  transition:border-color 0.2s;
}
.modal-box input:focus{border-color:rgba(60,120,30,0.55);background:#FDFAF3;}
.modal-box button{
  width:100%;padding:15px;border-radius:100px;
  background:linear-gradient(150deg,#3A7020 0%,#5A9838 100%);
  color:#fff;font-family:'Inter',sans-serif;font-size:15px;font-weight:700;
  border:none;cursor:pointer;
  box-shadow:0 6px 22px rgba(50,100,20,0.38);
  transition:transform 0.14s;
}
.modal-box button:active{transform:scale(0.97);}
.modal-hint{margin-top:11px;font-size:11px;color:#B0A888;}

/* card entrance */
@keyframes up{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
.greet{animation:up 0.45s ease 0.04s both;}
.card{animation:up 0.38s ease both;}
.c1{animation-delay:0.09s;}.c2{animation-delay:0.13s;}.c3{animation-delay:0.17s;}
.c4{animation-delay:0.21s;}.c5{animation-delay:0.25s;}.c6{animation-delay:0.29s;}
.c7{animation-delay:0.33s;}.c8{animation-delay:0.37s;}.c9{animation-delay:0.41s;}
.c10{animation-delay:0.45s;}
</style>
</head>
<body>

<!-- ████████████████████████████████████████████████
     PHOTOGRAPHIC VINE BACKGROUND
     Every leaf has: midrib + lateral veins + shadow
     Stem has bark-like gradient
████████████████████████████████████████████████ -->
<div id="bg">
  <div id="bg-cream"></div>
  <svg style="position:absolute;inset:0;width:100%;height:100%;" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- WALL MOOD LIGHTING -->
      <radialGradient id="gl1" cx="85%" cy="5%" r="36%"><stop offset="0%" stop-color="rgba(225,205,140,0.42)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
      <radialGradient id="gl2" cx="10%" cy="55%" r="30%"><stop offset="0%" stop-color="rgba(130,185,100,0.12)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
      <radialGradient id="gl3" cx="50%" cy="100%" r="45%"><stop offset="0%" stop-color="rgba(120,170,80,0.1)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
      <!-- VIGNETTE -->
      <radialGradient id="vg" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="transparent"/><stop offset="100%" stop-color="rgba(30,38,12,0.2)"/></radialGradient>
      <!-- LEAF FILL VARIANTS — 8 tones for maximum realism -->
      <linearGradient id="fA" x1="12%" y1="5%" x2="88%" y2="95%"><stop offset="0%" stop-color="#D0F0A0"/><stop offset="35%" stop-color="#92CC58"/><stop offset="100%" stop-color="#4E8A1E"/></linearGradient>
      <linearGradient id="fB" x1="8%" y1="8%" x2="92%" y2="92%"><stop offset="0%" stop-color="#BCEA8A"/><stop offset="40%" stop-color="#82C048"/><stop offset="100%" stop-color="#427A18"/></linearGradient>
      <linearGradient id="fC" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#A8D870"/><stop offset="45%" stop-color="#72B038"/><stop offset="100%" stop-color="#3C6C10"/></linearGradient>
      <linearGradient id="fD" x1="20%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stop-color="#C8EC98"/><stop offset="50%" stop-color="#88C450"/><stop offset="100%" stop-color="#4C8020"/></linearGradient>
      <linearGradient id="fE" x1="15%" y1="10%" x2="85%" y2="90%"><stop offset="0%" stop-color="#B0DC7A"/><stop offset="42%" stop-color="#78B840"/><stop offset="100%" stop-color="#447415"/></linearGradient>
      <linearGradient id="fF" x1="5%" y1="5%" x2="95%" y2="95%"><stop offset="0%" stop-color="#E0F5B8"/><stop offset="45%" stop-color="#A2D870"/><stop offset="100%" stop-color="#5E9430"/></linearGradient>
      <linearGradient id="fG" x1="25%" y1="0%" x2="75%" y2="100%"><stop offset="0%" stop-color="#96CC5E"/><stop offset="100%" stop-color="#3A6808"/></linearGradient>
      <linearGradient id="fH" x1="0%" y1="20%" x2="100%" y2="80%"><stop offset="0%" stop-color="#CAE88C"/><stop offset="55%" stop-color="#88C048"/><stop offset="100%" stop-color="#508020"/></linearGradient>
      <!-- STEM — bark texture -->
      <linearGradient id="stL" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#5E4A1A"/><stop offset="30%" stop-color="#7A6230"/><stop offset="55%" stop-color="#8A7240"/><stop offset="80%" stop-color="#6E5825"/><stop offset="100%" stop-color="#5A4818"/></linearGradient>
      <linearGradient id="stR" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#5E4A1A"/><stop offset="30%" stop-color="#7A6230"/><stop offset="55%" stop-color="#8A7240"/><stop offset="80%" stop-color="#6E5825"/><stop offset="100%" stop-color="#5A4818"/></linearGradient>
      <linearGradient id="stH" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#6A5622"/><stop offset="50%" stop-color="#7E6834"/><stop offset="100%" stop-color="#604E1C"/></linearGradient>
      <!-- SHADOW FILTER — realistic drop shadow per leaf -->
      <filter id="sh" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="1.2" dy="2.2" stdDeviation="2.8" flood-color="#1A2E08" flood-opacity="0.32"/>
      </filter>
      <filter id="sh2" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0.8" dy="1.5" stdDeviation="1.8" flood-color="#1A2E08" flood-opacity="0.24"/>
      </filter>
      <filter id="shs" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#2A3810" flood-opacity="0.2"/>
      </filter>
    </defs>

    <!-- Mood lighting -->
    <rect width="390" height="844" fill="url(#gl1)"/>
    <rect width="390" height="844" fill="url(#gl2)"/>
    <rect width="390" height="844" fill="url(#gl3)"/>

    <!-- ════════════════════════════════════════════════
         LEFT SIDE VINES — main thick stem, branches, leaves
    ════════════════════════════════════════════════ -->
    <!-- Main left stem — thick bark -->
    <path d="M-10 844 Q8 758 -2 668 Q-12 580 10 494 Q28 414 6 328 Q-12 248 14 162 Q32 92 10 24 Q4 8 18 -8" stroke="url(#stL)" stroke-width="6" fill="none" filter="url(#shs)" stroke-linecap="round"/>
    <!-- Secondary left stem -->
    <path d="M14 844 Q30 762 20 676 Q10 592 30 508 Q48 430 28 346 Q10 268 34 184 Q50 116 30 50" stroke="url(#stL)" stroke-width="3.5" fill="none" opacity="0.6" stroke-linecap="round"/>
    <!-- Thin tendril left -->
    <path d="M-4 620 Q12 572 4 520 Q-4 470 12 422" stroke="url(#stL)" stroke-width="1.5" fill="none" opacity="0.4" stroke-linecap="round"/>

    <!-- LEFT — BOTTOM CLUSTER (y 700–844) -->
    <!-- Leaf with full vein structure -->
    <g filter="url(#sh)"><path d="M6 824 Q-22 800 -40 814 Q-45 832 -26 840 Q-6 844 6 824Z" fill="url(#fA)"/><line x1="6" y1="824" x2="-26" y2="840" stroke="#1E4A05" stroke-width="0.85" opacity="0.7"/><line x1="-12" y1="832" x2="-22" y2="840" stroke="#1E4A05" stroke-width="0.5" opacity="0.45"/><line x1="-12" y1="832" x2="-4" y2="838" stroke="#1E4A05" stroke-width="0.5" opacity="0.45"/></g>
    <g filter="url(#sh)"><path d="M2 804 Q32 780 52 794 Q64 810 52 826 Q38 836 18 829 Q0 820 2 804Z" fill="url(#fB)"/><line x1="2" y1="804" x2="18" y2="829" stroke="#1E4A05" stroke-width="0.88" opacity="0.68"/><line x1="18" y1="829" x2="12" y2="837" stroke="#1E4A05" stroke-width="0.52" opacity="0.42"/><line x1="18" y1="829" x2="26" y2="836" stroke="#1E4A05" stroke-width="0.52" opacity="0.42"/><path d="M8 811 Q14 808 20 812" stroke="#1E4A05" stroke-width="0.4" fill="none" opacity="0.35"/></g>
    <g filter="url(#sh)"><path d="M-6 775 Q-34 752 -48 766 Q-53 784 -35 792 Q-15 796 -6 775Z" fill="url(#fC)"/><line x1="-6" y1="775" x2="-35" y2="792" stroke="#1E4A05" stroke-width="0.82" opacity="0.65"/><line x1="-22" y1="784" x2="-30" y2="792" stroke="#1E4A05" stroke-width="0.48" opacity="0.4"/><line x1="-22" y1="784" x2="-14" y2="790" stroke="#1E4A05" stroke-width="0.48" opacity="0.4"/></g>
    <g filter="url(#sh)"><path d="M16 756 Q46 733 66 746 Q78 762 66 777 Q52 787 32 780 Q12 771 16 756Z" fill="url(#fD)"/><line x1="16" y1="756" x2="32" y2="780" stroke="#1E4A05" stroke-width="0.86" opacity="0.66"/><line x1="32" y1="780" x2="26" y2="789" stroke="#1E4A05" stroke-width="0.5" opacity="0.4"/><line x1="32" y1="780" x2="40" y2="787" stroke="#1E4A05" stroke-width="0.5" opacity="0.4"/><path d="M22 762 Q30 759 38 763" stroke="#1E4A05" stroke-width="0.4" fill="none" opacity="0.32"/><path d="M25 770 Q33 767 41 771" stroke="#1E4A05" stroke-width="0.38" fill="none" opacity="0.28"/></g>
    <g filter="url(#sh)"><path d="M-4 724 Q-30 702 -44 716 Q-48 732 -32 740 Q-14 744 -4 724Z" fill="url(#fE)"/><line x1="-4" y1="724" x2="-32" y2="740" stroke="#1E4A05" stroke-width="0.80" opacity="0.63"/></g>
    <g filter="url(#sh)"><path d="M14 706 Q42 684 62 697 Q74 713 62 728 Q48 738 28 730 Q10 722 14 706Z" fill="url(#fF)"/><line x1="14" y1="706" x2="28" y2="730" stroke="#1E4A05" stroke-width="0.84" opacity="0.64"/><line x1="28" y1="730" x2="22" y2="739" stroke="#1E4A05" stroke-width="0.5" opacity="0.39"/><line x1="28" y1="730" x2="36" y2="737" stroke="#1E4A05" stroke-width="0.5" opacity="0.39"/><path d="M20 712 Q28 709 36 713" stroke="#1E4A05" stroke-width="0.38" fill="none" opacity="0.3"/></g>

    <!-- LEFT — MID-LOWER (y 480–700) -->
    <g filter="url(#sh2)"><path d="M-8 674 Q-36 652 -50 666 Q-55 683 -38 691 Q-18 695 -8 674Z" fill="url(#fA)"/><line x1="-8" y1="674" x2="-38" y2="691" stroke="#1E4A05" stroke-width="0.78" opacity="0.62"/></g>
    <g filter="url(#sh2)"><path d="M18 654 Q46 633 66 646 Q78 662 66 678 Q52 688 32 681 Q14 673 18 654Z" fill="url(#fB)"/><line x1="18" y1="654" x2="32" y2="681" stroke="#1E4A05" stroke-width="0.82" opacity="0.62"/><line x1="32" y1="681" x2="26" y2="690" stroke="#1E4A05" stroke-width="0.48" opacity="0.38"/><line x1="32" y1="681" x2="40" y2="688" stroke="#1E4A05" stroke-width="0.48" opacity="0.38"/><path d="M24 660 Q32 657 40 661" stroke="#1E4A05" stroke-width="0.38" fill="none" opacity="0.28"/></g>
    <g filter="url(#sh2)"><path d="M-5 622 Q-32 600 -46 614 Q-50 630 -34 638 Q-15 642 -5 622Z" fill="url(#fC)"/><line x1="-5" y1="622" x2="-34" y2="638" stroke="#1E4A05" stroke-width="0.76" opacity="0.60"/></g>
    <g filter="url(#sh2)"><path d="M20 602 Q48 581 68 594 Q80 610 68 626 Q54 636 34 629 Q16 621 20 602Z" fill="url(#fD)"/><line x1="20" y1="602" x2="34" y2="629" stroke="#1E4A05" stroke-width="0.80" opacity="0.60"/><line x1="34" y1="629" x2="28" y2="638" stroke="#1E4A05" stroke-width="0.46" opacity="0.36"/><line x1="34" y1="629" x2="42" y2="636" stroke="#1E4A05" stroke-width="0.46" opacity="0.36"/></g>
    <g filter="url(#sh2)"><path d="M-7 572 Q-34 550 -48 564 Q-52 580 -36 588 Q-17 592 -7 572Z" fill="url(#fE)"/><line x1="-7" y1="572" x2="-36" y2="588" stroke="#1E4A05" stroke-width="0.74" opacity="0.58"/></g>
    <g filter="url(#sh2)"><path d="M18 552 Q46 531 66 544 Q78 560 66 576 Q52 586 32 579 Q14 571 18 552Z" fill="url(#fF)"/><line x1="18" y1="552" x2="32" y2="579" stroke="#1E4A05" stroke-width="0.78" opacity="0.58"/><line x1="32" y1="579" x2="26" y2="588" stroke="#1E4A05" stroke-width="0.44" opacity="0.35"/><line x1="32" y1="579" x2="40" y2="585" stroke="#1E4A05" stroke-width="0.44" opacity="0.35"/><path d="M24 558 Q32 555 40 559" stroke="#1E4A05" stroke-width="0.36" fill="none" opacity="0.26"/></g>
    <g filter="url(#sh2)"><path d="M-4 520 Q-30 499 -44 513 Q-48 529 -32 537 Q-14 541 -4 520Z" fill="url(#fG)"/><line x1="-4" y1="520" x2="-32" y2="537" stroke="#1E4A05" stroke-width="0.72" opacity="0.56"/></g>
    <g filter="url(#sh2)"><path d="M20 500 Q48 480 68 493 Q80 509 68 525 Q54 535 34 528 Q16 520 20 500Z" fill="url(#fH)"/><line x1="20" y1="500" x2="34" y2="528" stroke="#1E4A05" stroke-width="0.76" opacity="0.56"/><line x1="34" y1="528" x2="28" y2="537" stroke="#1E4A05" stroke-width="0.44" opacity="0.34"/><line x1="34" y1="528" x2="42" y2="534" stroke="#1E4A05" stroke-width="0.44" opacity="0.34"/></g>

    <!-- LEFT — MID-UPPER branch (y 300–480) -->
    <!-- Side branch stem -->
    <path d="M12 448 Q42 428 70 438" stroke="url(#stH)" stroke-width="2.2" fill="none" opacity="0.58" stroke-linecap="round"/>
    <g filter="url(#sh2)"><path d="M-6 468 Q-32 447 -46 461 Q-50 477 -34 485 Q-16 489 -6 468Z" fill="url(#fA)"/><line x1="-6" y1="468" x2="-34" y2="485" stroke="#1E4A05" stroke-width="0.72" opacity="0.56"/></g>
    <g filter="url(#sh2)"><path d="M22 448 Q50 428 70 441 Q82 457 70 473 Q56 483 36 476 Q18 468 22 448Z" fill="url(#fB)"/><line x1="22" y1="448" x2="36" y2="476" stroke="#1E4A05" stroke-width="0.76" opacity="0.56"/><line x1="36" y1="476" x2="30" y2="485" stroke="#1E4A05" stroke-width="0.44" opacity="0.34"/><line x1="36" y1="476" x2="44" y2="482" stroke="#1E4A05" stroke-width="0.44" opacity="0.34"/></g>
    <g filter="url(#sh2)"><path d="M74 434 Q98 415 118 428 Q130 444 118 460 Q104 470 84 462 Q66 454 74 434Z" fill="url(#fC)"/><line x1="74" y1="434" x2="84" y2="462" stroke="#1E4A05" stroke-width="0.74" opacity="0.54"/></g>
    <g filter="url(#sh2)"><path d="M-4 416 Q-30 396 -44 410 Q-48 426 -32 434 Q-14 438 -4 416Z" fill="url(#fD)"/><line x1="-4" y1="416" x2="-32" y2="434" stroke="#1E4A05" stroke-width="0.70" opacity="0.54"/></g>
    <g filter="url(#sh2)"><path d="M20 396 Q48 376 68 389 Q80 405 68 421 Q54 431 34 424 Q16 416 20 396Z" fill="url(#fE)"/><line x1="20" y1="396" x2="34" y2="424" stroke="#1E4A05" stroke-width="0.74" opacity="0.54"/><line x1="34" y1="424" x2="28" y2="433" stroke="#1E4A05" stroke-width="0.42" opacity="0.32"/><line x1="34" y1="424" x2="42" y2="430" stroke="#1E4A05" stroke-width="0.42" opacity="0.32"/></g>
    <g filter="url(#sh2)"><path d="M-6 362 Q-32 342 -46 356 Q-50 372 -34 380 Q-16 384 -6 362Z" fill="url(#fF)"/><line x1="-6" y1="362" x2="-34" y2="380" stroke="#1E4A05" stroke-width="0.68" opacity="0.52"/></g>
    <g filter="url(#sh2)"><path d="M22 342 Q50 322 70 335 Q82 351 70 367 Q56 377 36 370 Q18 362 22 342Z" fill="url(#fG)"/><line x1="22" y1="342" x2="36" y2="370" stroke="#1E4A05" stroke-width="0.72" opacity="0.52"/><line x1="36" y1="370" x2="30" y2="379" stroke="#1E4A05" stroke-width="0.42" opacity="0.31"/><line x1="36" y1="370" x2="44" y2="376" stroke="#1E4A05" stroke-width="0.42" opacity="0.31"/></g>

    <!-- LEFT — UPPER (y 60–300) -->
    <g filter="url(#sh)"><path d="M-4 308 Q-30 288 -44 302 Q-48 318 -32 326 Q-14 330 -4 308Z" fill="url(#fA)"/><line x1="-4" y1="308" x2="-32" y2="326" stroke="#1E4A05" stroke-width="0.70" opacity="0.55"/></g>
    <g filter="url(#sh)"><path d="M24 288 Q52 268 72 281 Q84 297 72 313 Q58 323 38 316 Q20 308 24 288Z" fill="url(#fB)"/><line x1="24" y1="288" x2="38" y2="316" stroke="#1E4A05" stroke-width="0.74" opacity="0.55"/><line x1="38" y1="316" x2="32" y2="325" stroke="#1E4A05" stroke-width="0.44" opacity="0.33"/><line x1="38" y1="316" x2="46" y2="322" stroke="#1E4A05" stroke-width="0.44" opacity="0.33"/></g>
    <g filter="url(#sh)"><path d="M-6 254 Q-32 234 -46 248 Q-50 264 -34 272 Q-16 276 -6 254Z" fill="url(#fC)"/><line x1="-6" y1="254" x2="-34" y2="272" stroke="#1E4A05" stroke-width="0.72" opacity="0.56"/></g>
    <g filter="url(#sh)"><path d="M26 234 Q54 214 74 227 Q86 243 74 259 Q60 269 40 262 Q22 254 26 234Z" fill="url(#fD)"/><line x1="26" y1="234" x2="40" y2="262" stroke="#1E4A05" stroke-width="0.76" opacity="0.56"/><line x1="40" y1="262" x2="34" y2="271" stroke="#1E4A05" stroke-width="0.46" opacity="0.34"/><line x1="40" y1="262" x2="48" y2="268" stroke="#1E4A05" stroke-width="0.46" opacity="0.34"/></g>
    <!-- Upper branch left -->
    <path d="M16 208 Q50 186 84 196" stroke="url(#stH)" stroke-width="2" fill="none" opacity="0.52" stroke-linecap="round"/>
    <g filter="url(#sh)"><path d="M88 192 Q114 173 134 186 Q146 202 134 218 Q120 228 100 220 Q82 212 88 192Z" fill="url(#fE)"/><line x1="88" y1="192" x2="100" y2="220" stroke="#1E4A05" stroke-width="0.74" opacity="0.54"/></g>
    <g filter="url(#sh)"><path d="M-4 200 Q-30 180 -44 194 Q-48 210 -32 218 Q-14 222 -4 200Z" fill="url(#fF)"/><line x1="-4" y1="200" x2="-32" y2="218" stroke="#1E4A05" stroke-width="0.70" opacity="0.55"/></g>
    <g filter="url(#sh)"><path d="M28 178 Q56 158 76 171 Q88 187 76 203 Q62 213 42 206 Q24 198 28 178Z" fill="url(#fG)"/><line x1="28" y1="178" x2="42" y2="206" stroke="#1E4A05" stroke-width="0.75" opacity="0.55"/><line x1="42" y1="206" x2="36" y2="215" stroke="#1E4A05" stroke-width="0.46" opacity="0.33"/><line x1="42" y1="206" x2="50" y2="212" stroke="#1E4A05" stroke-width="0.46" opacity="0.33"/></g>
    <!-- Big corner leaves top-left -->
    <g filter="url(#sh)"><path d="M-10 145 Q20 118 52 132 Q68 150 56 172 Q42 186 18 178 Q-8 168 -10 145Z" fill="url(#fA)"/><line x1="-10" y1="145" x2="18" y2="178" stroke="#14380A" stroke-width="0.92" opacity="0.65"/><line x1="18" y1="178" x2="10" y2="188" stroke="#14380A" stroke-width="0.56" opacity="0.42"/><line x1="18" y1="178" x2="28" y2="186" stroke="#14380A" stroke-width="0.56" opacity="0.42"/><path d="M2 151 Q12 148 22 153" stroke="#14380A" stroke-width="0.44" fill="none" opacity="0.34"/><path d="M4 159 Q14 156 24 161" stroke="#14380A" stroke-width="0.4" fill="none" opacity="0.28"/><path d="M6 167 Q16 164 26 169" stroke="#14380A" stroke-width="0.38" fill="none" opacity="0.24"/></g>
    <g filter="url(#sh)"><path d="M14 112 Q46 87 78 102 Q94 120 82 142 Q68 156 44 148 Q18 138 14 112Z" fill="url(#fB)"/><line x1="14" y1="112" x2="44" y2="148" stroke="#14380A" stroke-width="0.95" opacity="0.67"/><line x1="44" y1="148" x2="36" y2="158" stroke="#14380A" stroke-width="0.58" opacity="0.44"/><line x1="44" y1="148" x2="54" y2="156" stroke="#14380A" stroke-width="0.58" opacity="0.44"/><path d="M22 118 Q34 115 46 120" stroke="#14380A" stroke-width="0.45" fill="none" opacity="0.34"/><path d="M24 128 Q36 125 48 130" stroke="#14380A" stroke-width="0.41" fill="none" opacity="0.28"/></g>
    <g filter="url(#sh)"><path d="M-6 78 Q24 54 58 68 Q74 86 62 108 Q48 122 24 114 Q-4 104 -6 78Z" fill="url(#fC)"/><line x1="-6" y1="78" x2="24" y2="114" stroke="#14380A" stroke-width="0.95" opacity="0.66"/><line x1="24" y1="114" x2="16" y2="124" stroke="#14380A" stroke-width="0.58" opacity="0.43"/><line x1="24" y1="114" x2="34" y2="122" stroke="#14380A" stroke-width="0.58" opacity="0.43"/><path d="M4 84 Q16 81 28 86" stroke="#14380A" stroke-width="0.44" fill="none" opacity="0.33"/><path d="M6 94 Q18 91 30 96" stroke="#14380A" stroke-width="0.40" fill="none" opacity="0.27"/></g>
    <g filter="url(#sh)"><path d="M10 44 Q42 22 74 36 Q90 54 78 76 Q64 90 40 82 Q14 72 10 44Z" fill="url(#fD)"/><line x1="10" y1="44" x2="40" y2="82" stroke="#14380A" stroke-width="0.98" opacity="0.66"/><line x1="40" y1="82" x2="32" y2="92" stroke="#14380A" stroke-width="0.60" opacity="0.43"/><line x1="40" y1="82" x2="50" y2="90" stroke="#14380A" stroke-width="0.60" opacity="0.43"/><path d="M18 50 Q30 47 42 52" stroke="#14380A" stroke-width="0.45" fill="none" opacity="0.34"/></g>
    <g filter="url(#sh)"><path d="M-12 12 Q16 -10 48 4 Q64 22 52 44 Q38 58 14 50 Q-10 40 -12 12Z" fill="url(#fE)"/><line x1="-12" y1="12" x2="14" y2="50" stroke="#14380A" stroke-width="1.0" opacity="0.66"/><line x1="14" y1="50" x2="6" y2="60" stroke="#14380A" stroke-width="0.60" opacity="0.42"/><line x1="14" y1="50" x2="24" y2="58" stroke="#14380A" stroke-width="0.60" opacity="0.42"/></g>
    <!-- Small extra top-left -->
    <g filter="url(#sh2)"><path d="M52 16 Q76 -2 98 10 Q110 26 98 42 Q84 52 64 44 Q46 36 52 16Z" fill="url(#fF)"/><line x1="52" y1="16" x2="64" y2="44" stroke="#14380A" stroke-width="0.80" opacity="0.55"/></g>
    <g filter="url(#sh2)"><path d="M86 0 Q110 -16 132 -4 Q144 12 132 28 Q118 38 98 30 Q80 22 86 0Z" fill="url(#fG)"/><line x1="86" y1="0" x2="98" y2="30" stroke="#14380A" stroke-width="0.76" opacity="0.52"/></g>
    <g filter="url(#sh2)"><path d="M36 -4 Q58 -20 80 -8 Q90 8 80 24 Q66 34 46 26 Q28 18 36 -4Z" fill="url(#fH)"/><line x1="36" y1="-4" x2="46" y2="26" stroke="#14380A" stroke-width="0.74" opacity="0.50"/></g>

    <!-- ════════════════════════════════════════════════
         RIGHT SIDE VINES (mirror of left)
    ════════════════════════════════════════════════ -->
    <path d="M400 844 Q382 758 392 668 Q402 580 380 494 Q362 414 384 328 Q402 248 376 162 Q358 92 380 24 Q386 8 372 -8" stroke="url(#stR)" stroke-width="6" fill="none" filter="url(#shs)" stroke-linecap="round"/>
    <path d="M376 844 Q360 762 370 676 Q380 592 360 508 Q342 430 362 346 Q380 268 356 184 Q340 116 360 50" stroke="url(#stR)" stroke-width="3.5" fill="none" opacity="0.6" stroke-linecap="round"/>
    <path d="M394 620 Q378 572 386 520 Q394 470 378 422" stroke="url(#stR)" stroke-width="1.5" fill="none" opacity="0.4" stroke-linecap="round"/>

    <!-- RIGHT BOTTOM -->
    <g filter="url(#sh)"><path d="M384 824 Q412 800 430 814 Q435 832 416 840 Q396 844 384 824Z" fill="url(#fA)"/><line x1="384" y1="824" x2="416" y2="840" stroke="#1E4A05" stroke-width="0.85" opacity="0.7"/></g>
    <g filter="url(#sh)"><path d="M388 804 Q358 780 338 794 Q326 810 338 826 Q352 836 372 829 Q390 820 388 804Z" fill="url(#fB)"/><line x1="388" y1="804" x2="372" y2="829" stroke="#1E4A05" stroke-width="0.88" opacity="0.68"/><line x1="372" y1="829" x2="378" y2="837" stroke="#1E4A05" stroke-width="0.52" opacity="0.42"/><line x1="372" y1="829" x2="364" y2="836" stroke="#1E4A05" stroke-width="0.52" opacity="0.42"/></g>
    <g filter="url(#sh)"><path d="M396 775 Q424 752 438 766 Q443 784 425 792 Q405 796 396 775Z" fill="url(#fC)"/><line x1="396" y1="775" x2="425" y2="792" stroke="#1E4A05" stroke-width="0.82" opacity="0.65"/></g>
    <g filter="url(#sh)"><path d="M374 756 Q344 733 324 746 Q312 762 324 777 Q338 787 358 780 Q378 771 374 756Z" fill="url(#fD)"/><line x1="374" y1="756" x2="358" y2="780" stroke="#1E4A05" stroke-width="0.86" opacity="0.66"/><line x1="358" y1="780" x2="364" y2="789" stroke="#1E4A05" stroke-width="0.5" opacity="0.40"/><line x1="358" y1="780" x2="350" y2="787" stroke="#1E4A05" stroke-width="0.5" opacity="0.40"/></g>
    <g filter="url(#sh)"><path d="M394 724 Q420 702 434 716 Q438 732 422 740 Q404 744 394 724Z" fill="url(#fE)"/><line x1="394" y1="724" x2="422" y2="740" stroke="#1E4A05" stroke-width="0.80" opacity="0.63"/></g>
    <g filter="url(#sh)"><path d="M376 706 Q348 684 328 697 Q316 713 328 728 Q342 738 362 730 Q380 722 376 706Z" fill="url(#fF)"/><line x1="376" y1="706" x2="362" y2="730" stroke="#1E4A05" stroke-width="0.84" opacity="0.64"/><line x1="362" y1="730" x2="368" y2="739" stroke="#1E4A05" stroke-width="0.5" opacity="0.39"/><line x1="362" y1="730" x2="354" y2="737" stroke="#1E4A05" stroke-width="0.5" opacity="0.39"/></g>
    <!-- RIGHT MID-LOWER -->
    <g filter="url(#sh2)"><path d="M398 674 Q426 652 440 666 Q445 683 428 691 Q408 695 398 674Z" fill="url(#fA)"/><line x1="398" y1="674" x2="428" y2="691" stroke="#1E4A05" stroke-width="0.78" opacity="0.62"/></g>
    <g filter="url(#sh2)"><path d="M372 654 Q344 633 324 646 Q312 662 324 678 Q338 688 358 681 Q376 673 372 654Z" fill="url(#fB)"/><line x1="372" y1="654" x2="358" y2="681" stroke="#1E4A05" stroke-width="0.82" opacity="0.62"/><line x1="358" y1="681" x2="364" y2="690" stroke="#1E4A05" stroke-width="0.48" opacity="0.38"/><line x1="358" y1="681" x2="350" y2="688" stroke="#1E4A05" stroke-width="0.48" opacity="0.38"/></g>
    <g filter="url(#sh2)"><path d="M395 622 Q422 600 436 614 Q440 630 424 638 Q405 642 395 622Z" fill="url(#fC)"/><line x1="395" y1="622" x2="424" y2="638" stroke="#1E4A05" stroke-width="0.76" opacity="0.60"/></g>
    <g filter="url(#sh2)"><path d="M370 602 Q342 581 322 594 Q310 610 322 626 Q336 636 356 629 Q374 621 370 602Z" fill="url(#fD)"/><line x1="370" y1="602" x2="356" y2="629" stroke="#1E4A05" stroke-width="0.80" opacity="0.60"/><line x1="356" y1="629" x2="362" y2="638" stroke="#1E4A05" stroke-width="0.46" opacity="0.36"/><line x1="356" y1="629" x2="348" y2="636" stroke="#1E4A05" stroke-width="0.46" opacity="0.36"/></g>
    <g filter="url(#sh2)"><path d="M393 572 Q420 550 434 564 Q438 580 422 588 Q403 592 393 572Z" fill="url(#fE)"/><line x1="393" y1="572" x2="422" y2="588" stroke="#1E4A05" stroke-width="0.74" opacity="0.58"/></g>
    <g filter="url(#sh2)"><path d="M372 552 Q344 531 324 544 Q312 560 324 576 Q338 586 358 579 Q376 571 372 552Z" fill="url(#fF)"/><line x1="372" y1="552" x2="358" y2="579" stroke="#1E4A05" stroke-width="0.78" opacity="0.58"/><line x1="358" y1="579" x2="364" y2="588" stroke="#1E4A05" stroke-width="0.44" opacity="0.35"/><line x1="358" y1="579" x2="350" y2="585" stroke="#1E4A05" stroke-width="0.44" opacity="0.35"/></g>
    <g filter="url(#sh2)"><path d="M394 520 Q420 499 434 513 Q438 529 422 537 Q404 541 394 520Z" fill="url(#fG)"/><line x1="394" y1="520" x2="422" y2="537" stroke="#1E4A05" stroke-width="0.72" opacity="0.56"/></g>
    <g filter="url(#sh2)"><path d="M370 500 Q342 480 322 493 Q310 509 322 525 Q336 535 356 528 Q374 520 370 500Z" fill="url(#fH)"/><line x1="370" y1="500" x2="356" y2="528" stroke="#1E4A05" stroke-width="0.76" opacity="0.56"/><line x1="356" y1="528" x2="362" y2="537" stroke="#1E4A05" stroke-width="0.44" opacity="0.34"/><line x1="356" y1="528" x2="348" y2="534" stroke="#1E4A05" stroke-width="0.44" opacity="0.34"/></g>
    <!-- RIGHT MID + UPPER -->
    <path d="M378 448 Q348 428 320 438" stroke="url(#stH)" stroke-width="2.2" fill="none" opacity="0.58" stroke-linecap="round"/>
    <g filter="url(#sh2)"><path d="M316 434 Q292 415 272 428 Q260 444 272 460 Q286 470 306 462 Q324 454 316 434Z" fill="url(#fC)"/><line x1="316" y1="434" x2="306" y2="462" stroke="#1E4A05" stroke-width="0.74" opacity="0.54"/></g>
    <g filter="url(#sh2)"><path d="M394 468 Q420 447 434 461 Q438 477 422 485 Q404 489 394 468Z" fill="url(#fA)"/><line x1="394" y1="468" x2="422" y2="485" stroke="#1E4A05" stroke-width="0.72" opacity="0.56"/></g>
    <g filter="url(#sh2)"><path d="M368 448 Q340 428 320 441 Q308 457 320 473 Q334 483 354 476 Q372 468 368 448Z" fill="url(#fB)"/><line x1="368" y1="448" x2="354" y2="476" stroke="#1E4A05" stroke-width="0.76" opacity="0.56"/></g>
    <g filter="url(#sh2)"><path d="M396 416 Q422 396 436 410 Q440 426 424 434 Q406 438 396 416Z" fill="url(#fD)"/><line x1="396" y1="416" x2="424" y2="434" stroke="#1E4A05" stroke-width="0.70" opacity="0.54"/></g>
    <g filter="url(#sh2)"><path d="M368 396 Q340 376 320 389 Q308 405 320 421 Q334 431 354 424 Q372 416 368 396Z" fill="url(#fE)"/><line x1="368" y1="396" x2="354" y2="424" stroke="#1E4A05" stroke-width="0.74" opacity="0.54"/><line x1="354" y1="424" x2="360" y2="433" stroke="#1E4A05" stroke-width="0.42" opacity="0.32"/><line x1="354" y1="424" x2="346" y2="430" stroke="#1E4A05" stroke-width="0.42" opacity="0.32"/></g>
    <g filter="url(#sh2)"><path d="M394 362 Q420 342 434 356 Q438 372 422 380 Q404 384 394 362Z" fill="url(#fF)"/><line x1="394" y1="362" x2="422" y2="380" stroke="#1E4A05" stroke-width="0.68" opacity="0.52"/></g>
    <g filter="url(#sh2)"><path d="M368 342 Q340 322 320 335 Q308 351 320 367 Q334 377 354 370 Q372 362 368 342Z" fill="url(#fG)"/><line x1="368" y1="342" x2="354" y2="370" stroke="#1E4A05" stroke-width="0.72" opacity="0.52"/></g>
    <g filter="url(#sh)"><path d="M396 308 Q422 288 436 302 Q440 318 424 326 Q406 330 396 308Z" fill="url(#fA)"/><line x1="396" y1="308" x2="424" y2="326" stroke="#1E4A05" stroke-width="0.70" opacity="0.55"/></g>
    <g filter="url(#sh)"><path d="M366 288 Q338 268 318 281 Q306 297 318 313 Q332 323 352 316 Q370 308 366 288Z" fill="url(#fB)"/><line x1="366" y1="288" x2="352" y2="316" stroke="#1E4A05" stroke-width="0.74" opacity="0.55"/><line x1="352" y1="316" x2="358" y2="325" stroke="#1E4A05" stroke-width="0.44" opacity="0.33"/><line x1="352" y1="316" x2="344" y2="322" stroke="#1E4A05" stroke-width="0.44" opacity="0.33"/></g>
    <!-- RIGHT upper branch -->
    <path d="M374 208 Q340 186 306 196" stroke="url(#stH)" stroke-width="2" fill="none" opacity="0.52" stroke-linecap="round"/>
    <g filter="url(#sh)"><path d="M302 192 Q278 173 258 186 Q246 202 258 218 Q272 228 292 220 Q308 212 302 192Z" fill="url(#fE)"/><line x1="302" y1="192" x2="292" y2="220" stroke="#1E4A05" stroke-width="0.74" opacity="0.54"/></g>
    <g filter="url(#sh)"><path d="M394 200 Q420 180 434 194 Q438 210 422 218 Q404 222 394 200Z" fill="url(#fF)"/><line x1="394" y1="200" x2="422" y2="218" stroke="#1E4A05" stroke-width="0.70" opacity="0.55"/></g>
    <g filter="url(#sh)"><path d="M362 178 Q334 158 314 171 Q302 187 314 203 Q328 213 348 206 Q366 198 362 178Z" fill="url(#fG)"/><line x1="362" y1="178" x2="348" y2="206" stroke="#1E4A05" stroke-width="0.75" opacity="0.55"/></g>
    <!-- Big corner top-right -->
    <g filter="url(#sh)"><path d="M400 145 Q370 118 338 132 Q322 150 334 172 Q348 186 372 178 Q398 168 400 145Z" fill="url(#fA)"/><line x1="400" y1="145" x2="372" y2="178" stroke="#14380A" stroke-width="0.92" opacity="0.65"/><line x1="372" y1="178" x2="380" y2="188" stroke="#14380A" stroke-width="0.56" opacity="0.42"/><line x1="372" y1="178" x2="362" y2="186" stroke="#14380A" stroke-width="0.56" opacity="0.42"/><path d="M388" stroke="#14380A" stroke-width="0.44" fill="none" opacity="0.34"/></g>
    <g filter="url(#sh)"><path d="M376 112 Q344 87 312 102 Q296 120 308 142 Q322 156 346 148 Q372 138 376 112Z" fill="url(#fB)"/><line x1="376" y1="112" x2="346" y2="148" stroke="#14380A" stroke-width="0.95" opacity="0.67"/><line x1="346" y1="148" x2="354" y2="158" stroke="#14380A" stroke-width="0.58" opacity="0.44"/><line x1="346" y1="148" x2="336" y2="156" stroke="#14380A" stroke-width="0.58" opacity="0.44"/></g>
    <g filter="url(#sh)"><path d="M396 78 Q366 54 332 68 Q316 86 328 108 Q342 122 366 114 Q394 104 396 78Z" fill="url(#fC)"/><line x1="396" y1="78" x2="366" y2="114" stroke="#14380A" stroke-width="0.95" opacity="0.66"/><line x1="366" y1="114" x2="374" y2="124" stroke="#14380A" stroke-width="0.58" opacity="0.43"/><line x1="366" y1="114" x2="356" y2="122" stroke="#14380A" stroke-width="0.58" opacity="0.43"/></g>
    <g filter="url(#sh)"><path d="M380 44 Q348 22 316 36 Q300 54 312 76 Q326 90 350 82 Q376 72 380 44Z" fill="url(#fD)"/><line x1="380" y1="44" x2="350" y2="82" stroke="#14380A" stroke-width="0.98" opacity="0.66"/><line x1="350" y1="82" x2="358" y2="92" stroke="#14380A" stroke-width="0.60" opacity="0.43"/><line x1="350" y1="82" x2="340" y2="90" stroke="#14380A" stroke-width="0.60" opacity="0.43"/></g>
    <g filter="url(#sh)"><path d="M402 12 Q374 -10 342 4 Q326 22 338 44 Q352 58 376 50 Q400 40 402 12Z" fill="url(#fE)"/><line x1="402" y1="12" x2="376" y2="50" stroke="#14380A" stroke-width="1.0" opacity="0.66"/></g>
    <g filter="url(#sh2)"><path d="M338 16 Q314 -2 292 10 Q280 26 292 42 Q306 52 326 44 Q344 36 338 16Z" fill="url(#fF)"/><line x1="338" y1="16" x2="326" y2="44" stroke="#14380A" stroke-width="0.80" opacity="0.55"/></g>
    <g filter="url(#sh2)"><path d="M304 0 Q280 -16 258 -4 Q246 12 258 28 Q272 38 292 30 Q308 22 304 0Z" fill="url(#fG)"/><line x1="304" y1="0" x2="292" y2="30" stroke="#14380A" stroke-width="0.76" opacity="0.52"/></g>
    <g filter="url(#sh2)"><path d="M354 -4 Q332 -20 310 -8 Q298 8 310 24 Q324 34 344 26 Q360 18 354 -4Z" fill="url(#fH)"/><line x1="354" y1="-4" x2="344" y2="26" stroke="#14380A" stroke-width="0.74" opacity="0.50"/></g>

    <!-- ════════════════════════════════════════════════
         TOP CANOPY — dense hanging ivy across top edge
    ════════════════════════════════════════════════ -->
    <path d="M-15 -5 Q55 18 130 8 Q195 0 262 15 Q322 28 395 10" stroke="url(#stH)" stroke-width="4" fill="none" filter="url(#shs)" stroke-linecap="round"/>
    <path d="M-10 8 Q55 30 128 20 Q192 10 258 26 Q318 40 390 22" stroke="url(#stH)" stroke-width="2.2" fill="none" opacity="0.5" stroke-linecap="round"/>
    <!-- Hanging vines from top -->
    <path d="M72 8 Q64 48 72 88 Q80 122 66 158" stroke="url(#stH)" stroke-width="2.4" fill="none" opacity="0.55" stroke-linecap="round"/>
    <path d="M162 2 Q154 42 162 80 Q170 114 156 148" stroke="url(#stH)" stroke-width="2.2" fill="none" opacity="0.52" stroke-linecap="round"/>
    <path d="M250 5 Q242 44 250 83 Q258 117 244 152" stroke="url(#stH)" stroke-width="2.2" fill="none" opacity="0.52" stroke-linecap="round"/>
    <path d="M320 0 Q313 38 320 76 Q327 108 315 142" stroke="url(#stH)" stroke-width="2" fill="none" opacity="0.48" stroke-linecap="round"/>
    <!-- Top canopy leaves LEFT zone -->
    <g filter="url(#sh)"><path d="M8 -2 Q34 -20 58 -8 Q70 8 60 24 Q48 34 28 28 Q8 20 8 -2Z" fill="url(#fA)"/><line x1="8" y1="-2" x2="28" y2="28" stroke="#14380A" stroke-width="0.88" opacity="0.62"/><line x1="28" y1="28" x2="22" y2="38" stroke="#14380A" stroke-width="0.54" opacity="0.40"/><line x1="28" y1="28" x2="36" y2="36" stroke="#14380A" stroke-width="0.54" opacity="0.40"/></g>
    <g filter="url(#sh)"><path d="M44 -14 Q72 -30 94 -18 Q106 -2 96 14 Q84 24 64 18 Q44 10 44 -14Z" fill="url(#fB)"/><line x1="44" y1="-14" x2="64" y2="18" stroke="#14380A" stroke-width="0.86" opacity="0.60"/></g>
    <g filter="url(#sh)"><path d="M28 18 Q54 2 76 14 Q88 30 78 46 Q66 56 46 50 Q26 42 28 18Z" fill="url(#fC)"/><line x1="28" y1="18" x2="46" y2="50" stroke="#14380A" stroke-width="0.88" opacity="0.60"/><line x1="46" y1="50" x2="40" y2="60" stroke="#14380A" stroke-width="0.54" opacity="0.38"/><line x1="46" y1="50" x2="56" y2="58" stroke="#14380A" stroke-width="0.54" opacity="0.38"/></g>
    <g filter="url(#sh)"><path d="M64 6 Q92 -10 114 2 Q126 18 116 34 Q104 44 84 38 Q64 30 64 6Z" fill="url(#fD)"/><line x1="64" y1="6" x2="84" y2="38" stroke="#14380A" stroke-width="0.86" opacity="0.58"/></g>
    <g filter="url(#sh)"><path d="M78 24 Q106 8 128 20 Q140 36 130 52 Q118 62 98 56 Q78 48 78 24Z" fill="url(#fE)"/><line x1="78" y1="24" x2="98" y2="56" stroke="#14380A" stroke-width="0.86" opacity="0.58"/><line x1="98" y1="56" x2="92" y2="66" stroke="#14380A" stroke-width="0.53" opacity="0.36"/><line x1="98" y1="56" x2="108" y2="64" stroke="#14380A" stroke-width="0.53" opacity="0.36"/></g>
    <g filter="url(#sh)"><path d="M92 -10 Q120 -24 142 -12 Q154 4 144 20 Q132 30 112 24 Q92 16 92 -10Z" fill="url(#fF)"/><line x1="92" y1="-10" x2="112" y2="24" stroke="#14380A" stroke-width="0.82" opacity="0.54"/></g>
    <g filter="url(#sh)"><path d="M106 40 Q134 24 156 36 Q168 52 158 68 Q146 78 126 72 Q106 64 106 40Z" fill="url(#fG)"/><line x1="106" y1="40" x2="126" y2="72" stroke="#14380A" stroke-width="0.82" opacity="0.54"/></g>
    <!-- Top canopy CENTRE -->
    <g filter="url(#sh)"><path d="M134 -6 Q162 -20 184 -8 Q196 8 186 24 Q174 34 154 28 Q134 20 134 -6Z" fill="url(#fH)"/><line x1="134" y1="-6" x2="154" y2="28" stroke="#14380A" stroke-width="0.80" opacity="0.52"/></g>
    <g filter="url(#sh)"><path d="M148 14 Q176 0 198 12 Q210 28 200 44 Q188 54 168 48 Q148 40 148 14Z" fill="url(#fA)"/><line x1="148" y1="14" x2="168" y2="48" stroke="#14380A" stroke-width="0.80" opacity="0.52"/><line x1="168" y1="48" x2="162" y2="58" stroke="#14380A" stroke-width="0.50" opacity="0.33"/><line x1="168" y1="48" x2="178" y2="56" stroke="#14380A" stroke-width="0.50" opacity="0.33"/></g>
    <g filter="url(#sh)"><path d="M184 -4 Q212 -18 234 -6 Q246 10 236 26 Q224 36 204 30 Q184 22 184 -4Z" fill="url(#fB)"/><line x1="184" y1="-4" x2="204" y2="30" stroke="#14380A" stroke-width="0.78" opacity="0.50"/></g>
    <g filter="url(#sh)"><path d="M200 16 Q228 2 250 14 Q262 30 252 46 Q240 56 220 50 Q200 42 200 16Z" fill="url(#fC)"/><line x1="200" y1="16" x2="220" y2="50" stroke="#14380A" stroke-width="0.78" opacity="0.50"/></g>
    <!-- Top canopy RIGHT zone -->
    <g filter="url(#sh)"><path d="M236 -8 Q264 -22 286 -10 Q298 6 288 22 Q276 32 256 26 Q236 18 236 -8Z" fill="url(#fD)"/><line x1="236" y1="-8" x2="256" y2="26" stroke="#14380A" stroke-width="0.76" opacity="0.48"/></g>
    <g filter="url(#sh)"><path d="M252 12 Q280 -2 302 10 Q314 26 304 42 Q292 52 272 46 Q252 38 252 12Z" fill="url(#fE)"/><line x1="252" y1="12" x2="272" y2="46" stroke="#14380A" stroke-width="0.78" opacity="0.50"/><line x1="272" y1="46" x2="266" y2="56" stroke="#14380A" stroke-width="0.48" opacity="0.32"/><line x1="272" y1="46" x2="282" y2="54" stroke="#14380A" stroke-width="0.48" opacity="0.32"/></g>
    <g filter="url(#sh)"><path d="M288 -6 Q316 -20 338 -8 Q350 8 340 24 Q328 34 308 28 Q288 20 288 -6Z" fill="url(#fF)"/><line x1="288" y1="-6" x2="308" y2="28" stroke="#14380A" stroke-width="0.74" opacity="0.46"/></g>
    <g filter="url(#sh)"><path d="M308 14 Q334 0 356 12 Q366 28 356 44 Q344 54 324 48 Q306 40 308 14Z" fill="url(#fG)"/><line x1="308" y1="14" x2="324" y2="48" stroke="#14380A" stroke-width="0.76" opacity="0.48"/></g>
    <g filter="url(#sh)"><path d="M344 -12 Q370 -26 390 -14 Q400 2 390 18 Q378 28 360 22 Q342 14 344 -12Z" fill="url(#fH)"/><line x1="344" y1="-12" x2="360" y2="22" stroke="#14380A" stroke-width="0.78" opacity="0.50"/></g>

    <!-- BOTTOM GROUND FOLIAGE -->
    <ellipse cx="35" cy="840" rx="66" ry="28" fill="#6AAA30" opacity="0.48"/>
    <ellipse cx="5" cy="844" rx="44" ry="20" fill="#88C448" opacity="0.42"/>
    <ellipse cx="82" cy="844" rx="54" ry="23" fill="#5A9820" opacity="0.45"/>
    <ellipse cx="148" cy="844" rx="38" ry="15" fill="#80B840" opacity="0.35"/>
    <ellipse cx="355" cy="840" rx="66" ry="28" fill="#6AAA30" opacity="0.48"/>
    <ellipse cx="385" cy="844" rx="44" ry="20" fill="#88C448" opacity="0.42"/>
    <ellipse cx="308" cy="844" rx="54" ry="23" fill="#5A9820" opacity="0.45"/>
    <ellipse cx="242" cy="844" rx="38" ry="15" fill="#80B840" opacity="0.35"/>
    <ellipse cx="195" cy="844" rx="30" ry="12" fill="#6AAA30" opacity="0.32"/>

    <!-- Final vignette -->
    <rect width="390" height="844" fill="url(#vg)"/>
  </svg>
</div>

<!-- ═══════════════════════════════════════════
     NAME MODAL WITH VINES
═══════════════════════════════════════════ -->
<div class="modal-wrap" id="modalWrap">
  <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="mf1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#C8EC98"/><stop offset="45%" stop-color="#88C450"/><stop offset="100%" stop-color="#4C8020"/></linearGradient>
      <filter id="msh" x="-35%" y="-35%" width="170%" height="170%"><feDropShadow dx="1" dy="1.8" stdDeviation="2.2" flood-color="#1A3008" flood-opacity="0.28"/></filter>
    </defs>
    <!-- TL stem -->
    <path d="M-10 0 Q14 50 4 108 Q-6 160 14 215" stroke="#7A6030" stroke-width="3.8" fill="none" opacity="0.55" stroke-linecap="round"/>
    <g filter="url(#msh)"><path d="M-8 12 Q18 -6 40 6 Q52 22 40 38 Q28 48 8 40 Q-8 30 -8 12Z" fill="url(#mf1)"/><line x1="-8" y1="12" x2="8" y2="40" stroke="#1A3A08" stroke-width="0.85" opacity="0.65"/><line x1="8" y1="40" x2="2" y2="50" stroke="#1A3A08" stroke-width="0.52" opacity="0.42"/><line x1="8" y1="40" x2="18" y2="48" stroke="#1A3A08" stroke-width="0.52" opacity="0.42"/><path d="M2 18 Q12 15 22 20" stroke="#1A3A08" stroke-width="0.4" fill="none" opacity="0.35"/></g>
    <g filter="url(#msh)"><path d="M4 45 Q30 28 52 40 Q64 56 52 72 Q40 82 20 74 Q2 66 4 45Z" fill="url(#mf1)"/><line x1="4" y1="45" x2="20" y2="74" stroke="#1A3A08" stroke-width="0.82" opacity="0.62"/><line x1="20" y1="74" x2="14" y2="84" stroke="#1A3A08" stroke-width="0.50" opacity="0.40"/><line x1="20" y1="74" x2="30" y2="82" stroke="#1A3A08" stroke-width="0.50" opacity="0.40"/></g>
    <g filter="url(#msh)"><path d="M-2 82 Q24 65 46 77 Q58 93 46 109 Q34 119 14 111 Q-4 103 -2 82Z" fill="url(#mf1)"/><line x1="-2" y1="82" x2="14" y2="111" stroke="#1A3A08" stroke-width="0.80" opacity="0.60"/></g>
    <g filter="url(#msh)"><path d="M6 118 Q32 101 54 114 Q66 130 54 146 Q42 156 22 148 Q4 140 6 118Z" fill="url(#mf1)"/><line x1="6" y1="118" x2="22" y2="148" stroke="#1A3A08" stroke-width="0.78" opacity="0.58"/><line x1="22" y1="148" x2="16" y2="158" stroke="#1A3A08" stroke-width="0.48" opacity="0.38"/><line x1="22" y1="148" x2="32" y2="156" stroke="#1A3A08" stroke-width="0.48" opacity="0.38"/></g>
    <g filter="url(#msh)"><path d="M28 -4 Q54 -20 76 -8 Q88 8 76 24 Q64 34 44 28 Q26 20 28 -4Z" fill="url(#mf1)"/><line x1="28" y1="-4" x2="44" y2="28" stroke="#1A3A08" stroke-width="0.76" opacity="0.55"/></g>
    <g filter="url(#msh)"><path d="M62 8 Q88 -6 110 6 Q122 22 110 38 Q98 48 78 42 Q60 34 62 8Z" fill="url(#mf1)"/><line x1="62" y1="8" x2="78" y2="42" stroke="#1A3A08" stroke-width="0.74" opacity="0.52"/></g>
    <!-- TR stem -->
    <path d="M400 0 Q376 50 386 108 Q396 160 376 215" stroke="#7A6030" stroke-width="3.8" fill="none" opacity="0.52" stroke-linecap="round"/>
    <g filter="url(#msh)"><path d="M398 12 Q372 -6 350 6 Q338 22 350 38 Q362 48 382 40 Q398 30 398 12Z" fill="url(#mf1)"/><line x1="398" y1="12" x2="382" y2="40" stroke="#1A3A08" stroke-width="0.85" opacity="0.65"/><line x1="382" y1="40" x2="388" y2="50" stroke="#1A3A08" stroke-width="0.52" opacity="0.42"/><line x1="382" y1="40" x2="372" y2="48" stroke="#1A3A08" stroke-width="0.52" opacity="0.42"/></g>
    <g filter="url(#msh)"><path d="M386 45 Q360 28 338 40 Q326 56 338 72 Q350 82 370 74 Q388 66 386 45Z" fill="url(#mf1)"/><line x1="386" y1="45" x2="370" y2="74" stroke="#1A3A08" stroke-width="0.82" opacity="0.62"/></g>
    <g filter="url(#msh)"><path d="M392 82 Q366 65 344 77 Q332 93 344 109 Q356 119 376 111 Q394 103 392 82Z" fill="url(#mf1)"/><line x1="392" y1="82" x2="376" y2="111" stroke="#1A3A08" stroke-width="0.80" opacity="0.60"/><line x1="376" y1="111" x2="382" y2="121" stroke="#1A3A08" stroke-width="0.48" opacity="0.38"/><line x1="376" y1="111" x2="366" y2="119" stroke="#1A3A08" stroke-width="0.48" opacity="0.38"/></g>
    <g filter="url(#msh)"><path d="M384 118 Q358 101 336 114 Q324 130 336 146 Q348 156 368 148 Q386 140 384 118Z" fill="url(#mf1)"/><line x1="384" y1="118" x2="368" y2="148" stroke="#1A3A08" stroke-width="0.78" opacity="0.58"/></g>
    <g filter="url(#msh)"><path d="M362 -4 Q336 -20 314 -8 Q302 8 314 24 Q326 34 346 28 Q364 20 362 -4Z" fill="url(#mf1)"/></g>
    <g filter="url(#msh)"><path d="M328 8 Q302 -6 280 6 Q268 22 280 38 Q292 48 312 42 Q330 34 328 8Z" fill="url(#mf1)"/></g>
    <!-- BL stem -->
    <path d="M-10 844 Q14 796 4 748" stroke="#7A6030" stroke-width="3" fill="none" opacity="0.45" stroke-linecap="round"/>
    <g filter="url(#msh)"><path d="M-6 798 Q20 780 42 793 Q54 809 42 825 Q30 835 10 828 Q-8 820 -6 798Z" fill="url(#mf1)"/><line x1="-6" y1="798" x2="10" y2="828" stroke="#1A3A08" stroke-width="0.74" opacity="0.55"/></g>
    <!-- BR stem -->
    <path d="M400 844 Q376 796 386 748" stroke="#7A6030" stroke-width="3" fill="none" opacity="0.45" stroke-linecap="round"/>
    <g filter="url(#msh)"><path d="M396 798 Q370 780 348 793 Q336 809 348 825 Q360 835 380 828 Q398 820 396 798Z" fill="url(#mf1)"/><line x1="396" y1="798" x2="380" y2="828" stroke="#1A3A08" stroke-width="0.74" opacity="0.55"/></g>
  </svg>
  <div class="modal-box">
    <div style="font-size:50px;margin-bottom:14px;line-height:1;">🌿</div>
    <h1>Welcome to Thinko</h1>
    <p>Your calm space for thinking clearly,<br/>planning gently, and living fully.</p>
    <label>What shall we call you? 🌱</label>
    <input type="text" id="nameIn" placeholder="Your first name..." autocomplete="given-name"/>
    <button onclick="saveName()">Begin my journey 🌿</button>
    <div class="modal-hint">You can change this anytime in settings</div>
  </div>
</div>

<!-- ═══════════════════════════════════════════
     MAIN PAGE
═══════════════════════════════════════════ -->
<div class="page">
  <div class="panel">
    <div class="topbar">
      <svg width="20" height="15" viewBox="0 0 20 15" fill="none"><path d="M8 1L1 7.5l7 6.5" stroke="#2A2010" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><line x1="1" y1="7.5" x2="19" y2="7.5" stroke="#2A2010" stroke-width="2.2" stroke-linecap="round"/></svg>
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none" style="margin-left:2px;"><line x1="0" y1="1" x2="20" y2="1" stroke="#2A2010" stroke-width="2" stroke-linecap="round"/><line x1="0" y1="7" x2="20" y2="7" stroke="#2A2010" stroke-width="2" stroke-linecap="round"/><line x1="0" y1="13" x2="13" y2="13" stroke="#2A2010" stroke-width="2" stroke-linecap="round"/></svg>
    </div>
    <div class="greet" id="greetEl">Good morning ✨</div>
    <div class="grid">
      <div class="card c1"><div class="ico">📋</div><div class="name">Prioritizer</div></div>
      <div class="card c2"><div class="ico">🧠</div><div class="name">Mind Map</div></div>
      <div class="card c3"><div class="ico">📚</div><div class="name">The Vault</div></div>
      <div class="card c4"><div class="ico">🍽️</div><div class="name">Meal Planner</div></div>
      <div class="card c5"><div class="ico">🎯</div><div class="name">Goals</div></div>
      <div class="card c6"><div class="ico">⚡</div><div class="name">Matrix</div></div>
      <div class="card c7"><div class="ico">⚡</div><div class="name">The Charge</div></div>
      <div class="card c8"><div class="ico">💰</div><div class="name">Budget</div></div>
      <div class="card c9"><div class="ico">🛒</div><div class="name">Shopping</div></div>
      <div class="card c10"><div class="ico">🔧</div><div class="name">Tools</div></div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════
     BOTTOM NAV
═══════════════════════════════════════════ -->
<nav class="nav">
  <div class="ni on">
    <svg viewBox="0 0 24 22" fill="none"><path d="M1.5 10.5L12 2l10.5 8.5" stroke="#2E6018" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 9v11a1 1 0 001 1h4.5V16h5v5H19a1 1 0 001-1V9" stroke="#2E6018" stroke-width="2" stroke-linecap="round"/></svg>
    <span class="ni-t">Home</span>
  </div>
  <div class="ni">
    <svg viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="7" stroke="#2A2010" stroke-width="2"/><path d="M20 20l-3.5-3.5" stroke="#2A2010" stroke-width="2" stroke-linecap="round"/></svg>
    <span class="ni-t">Search</span>
  </div>
  <div class="ni">
    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#2A2010" stroke-width="2"/><path d="M12 8v8M8 12h8" stroke="#2A2010" stroke-width="2" stroke-linecap="round"/></svg>
    <span class="ni-t">Add</span>
  </div>
  <div class="ni">
    <svg viewBox="0 0 24 22" fill="none"><path d="M12 19.5S2.5 13 2.5 7A5.5 5.5 0 0112 4.28 5.5 5.5 0 0121.5 7c0 6-9.5 12.5-9.5 12.5z" stroke="#2A2010" stroke-width="2" stroke-linejoin="round"/></svg>
    <span class="ni-t">Veart</span>
  </div>
  <div class="ni">
    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="#2A2010" stroke-width="2"/><path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#2A2010" stroke-width="2" stroke-linecap="round"/></svg>
    <span class="ni-t">Profile</span>
  </div>
</nav>

<script>
function getGreeting(n){
  const h=new Date().getHours();
  const t=h>=5&&h<12?['Good morning','✨']:h>=12&&h<17?['Good afternoon','☀️']:h>=17&&h<21?['Good evening','🌅']:['Good night','🌙'];
  return `${t[0]}${n?', '+n:''} ${t[1]}`;
}
function saveName(){
  const n=document.getElementById('nameIn').value.trim();
  if(!n)return;
  try{localStorage.setItem('thinko_username',n);}catch{}
  document.getElementById('modalWrap').style.display='none';
  document.getElementById('greetEl').textContent=getGreeting(n);
}
document.getElementById('nameIn').addEventListener('keydown',e=>{if(e.key==='Enter')saveName();});
window.addEventListener('DOMContentLoaded',()=>{
  let n='';try{n=localStorage.getItem('thinko_username')||'';}catch{}
  document.getElementById('greetEl').textContent=getGreeting(n);
  if(n){document.getElementById('modalWrap').style.display='none';}
  else{setTimeout(()=>document.getElementById('nameIn').focus(),500);}
});
setInterval(()=>{let n='';try{n=localStorage.getItem('thinko_username')||'';}catch{}document.getElementById('greetEl').textContent=getGreeting(n);},60000);
</script>
</body>
</html>
