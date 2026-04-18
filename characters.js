// characters.js — All Spider-Man movie/game characters with 3D models

// ══════════════════════════════════════════════
//  FULL CHARACTER ROSTER
// ══════════════════════════════════════════════
var ALL_CHARACTERS = {
  // ── HEROES / ALLIES ──
  peter:    { name:'Peter Parker / Spider-Man',  suit:[0xe8001c,0x0000cc], skin:0xf4c48a, hair:0x3a2a1a, from:'All Games & Films' },
  miles:    { name:'Miles Morales',               suit:[0x111133,0xcc0018], skin:0x5c3a1e, hair:0x1a0a00, from:'PS4/PS5 Games, Into the Spider-Verse' },
  mj:       { name:'Mary Jane Watson',            suit:null,               skin:0xf4c48a, hair:0xcc4400, from:'PS4 Game, Raimi Films' },
  ned:      { name:'Ned Leeds',                   suit:null,               skin:0xf0c080, hair:0x1a1010, from:'MCU Films' },
  gwen:     { name:'Gwen Stacy / Spider-Gwen',    suit:[0xffffff,0x222244], skin:0xf8e0d0, hair:0xffffff, from:'Into the Spider-Verse, TASM' },
  aunt_may: { name:'Aunt May Parker',             suit:null,               skin:0xf0c898, hair:0xaaaaaa, from:'All Films & Games' },
  uncle_ben:{ name:'Uncle Ben Parker',            suit:null,               skin:0xecc890, hair:0xaaaaaa, from:'Raimi Films, TASM, Games — ALIVE' },
  uncle_aaron:{name:'Uncle Aaron Davis',          suit:null,               skin:0x5c3a1e, hair:0x1a1010, from:'PS4 Game — ALIVE' },
  jefferson:{ name:'Jefferson Davis',             suit:null,               skin:0x5c3a1e, hair:0x1a0a00, from:'PS4 Game — ALIVE' },
  rio:      { name:'Rio Morales',                 suit:null,               skin:0x8a6040, hair:0x1a0a00, from:'PS4 Game' },
  stan_lee: { name:'Stan Lee',                    suit:null,               skin:0xf0c890, hair:0x888888, from:'All Films — CAMEO' },
  yuri:     { name:'Yuri Watanabe',               suit:null,               skin:0xd4a870, hair:0x1a1010, from:'PS4 Game' },
  phin:     { name:'Phin Mason / Tinkerer',       suit:[0x554433,0xaa8855], skin:0x5c3a1e, hair:0x1a0a00, from:'Miles Morales Game' },
  sarah:    { name:'Sarah (Miles\' Girlfriend)',  suit:null,               skin:0xc09060, hair:0x1a0500, from:'Original Character' },
  // MCU heroes
  tony:     { name:'Tony Stark / Iron Man',       suit:[0xcc2200,0xf5c518], skin:0xf0c080, hair:0x2a1810, from:'MCU Films' },
  happy:    { name:'Happy Hogan',                 suit:null,               skin:0xf0c080, hair:0x3a2010, from:'MCU Films' },
  fury:     { name:'Nick Fury',                   suit:null,               skin:0x3a2a1a, hair:0x1a1010, from:'MCU Films' },
  beck:     { name:'Quentin Beck (pre-villain)',  suit:[0x2a2a66,0x4444aa], skin:0xf0c080, hair:0x3a2820, from:'Far From Home' },
  // Raimi universe
  harry_r:  { name:'Harry Osborn (Raimi)',        suit:null,               skin:0xf4c490, hair:0x4a3010, from:'Raimi Trilogy' },
  betty:    { name:'Betty Brant',                 suit:null,               skin:0xf4c490, hair:0x3a2010, from:'Raimi Films, Comics' },
  robbie:   { name:'Robbie Robertson',            suit:null,               skin:0x6a4a2a, hair:0x888888, from:'Comics, Games' },
  jjj:      { name:'J. Jonah Jameson',            suit:null,               skin:0xf0c080, hair:0x888888, from:'All Films & Games' },
  // TASM universe
  gwen_tasm:{ name:'Gwen Stacy (TASM)',           suit:null,               skin:0xf8e0d0, hair:0xddcc88, from:'Amazing Spider-Man Films' },
  harry_t:  { name:'Harry Osborn (TASM)',         suit:null,               skin:0xf0c490, hair:0x4a3010, from:'TASM 2' },
  // Spider-Verse
  spider_ham:{ name:'Spider-Ham (Peter Porker)',  suit:[0xe8001c,0x0000cc], skin:0xffccaa, hair:null,    from:'Into the Spider-Verse' },
  peni:     { name:'Peni Parker',                 suit:[0xff2244,0xffffff], skin:0xf8d0b0, hair:0x1a1010, from:'Into the Spider-Verse' },
  noir:     { name:'Spider-Man Noir',             suit:[0x222222,0x1a1a1a], skin:0xd4a870, hair:0x1a1010, from:'Into the Spider-Verse' },

  // ── VILLAINS ──
  kingpin:  { name:'Wilson Fisk / Kingpin',       suit:[0xffffff,0xeeeeee], skin:0xf0c080, hair:null,    from:'All Games, Spider-Verse' },
  goblin:   { name:'Norman Osborn / Green Goblin',suit:[0x226622,0x884400], skin:0xd4b060, hair:0xcc8800, from:'Raimi, MCU, Games' },
  ock:      { name:'Otto Octavius / Doctor Octopus',suit:[0x333355,0x444488],skin:0xd0a860,hair:0x3a2010, from:'Raimi, PS4 Game' },
  venom:    { name:'Eddie Brock / Venom',         suit:[0x111111,0x222222], skin:0x222222, hair:0x222222, from:'Raimi, PS4 Game, Films' },
  electro:  { name:'Max Dillon / Electro',        suit:[0x003355,0x00ccff], skin:0x224466, hair:0x004466, from:'TASM 2, NWH, PS4 Game' },
  vulture:  { name:'Adrian Toomes / Vulture',     suit:[0x445544,0x668866], skin:0xd0a860, hair:0x666666, from:'MCU, PS4 Game' },
  rhino:    { name:'Aleksei Sytsevich / Rhino',   suit:[0x888888,0x666666], skin:0xd0c0a0, hair:0x3a2010, from:'TASM 2, PS4 Game' },
  sandman:  { name:'Flint Marko / Sandman',       suit:[0xcc9944,0xaa7722], skin:0xcc9944, hair:0x8a6030, from:'Raimi, NWH' },
  lizard:   { name:'Curt Connors / The Lizard',   suit:[0x228822,0x115511], skin:0x228822, hair:null,     from:'TASM, PS4 Game' },
  carnage:  { name:'Cletus Kasady / Carnage',     suit:[0xcc0000,0x880000], skin:0xcc0000, hair:0xcc0000, from:'Venom 2 Film, PS4 Game' },
  scorpion: { name:'Mac Gargan / Scorpion',       suit:[0x228822,0x115511], skin:0xd0a860, hair:0x3a2010, from:'PS4 Game, TASM 2' },
  mysterio: { name:'Quentin Beck / Mysterio',     suit:[0x2244aa,0x3355bb], skin:0xd0a860, hair:0x3a2010, from:'MCU Far From Home' },
  shocker:  { name:'Herman Schultz / Shocker',    suit:[0xcc8800,0x884400], skin:0xd0a860, hair:0x3a2010, from:'PS4 Game, TASM 2 Ref' },
  mr_neg:   { name:'Martin Li / Mister Negative', suit:[0x1a0028,0x330044], skin:0xd4a870, hair:0x1a1010, from:'PS4 Game' },
  hammerhead:{ name:'Hammerhead',                 suit:[0x666666,0x444444], skin:0xd0a860, hair:0x666666, from:'PS4 DLC' },
  sable:    { name:'Silver Sable',                suit:[0xcccccc,0xaaaaaa], skin:0xf4c490, hair:0xffffff, from:'PS4 Game' },
  tombstone:{ name:'Tombstone',                   suit:[0xdddddd,0xbbbbbb], skin:0xdddddd, hair:0xffffff, from:'PS4 Game' },
  screwball:{ name:'Screwball',                   suit:[0xff44cc,0xcc22aa], skin:0xf4c490, hair:0xff44cc, from:'PS4 Game' },
  tinkerer_v:{ name:'Phin / Tinkerer (villain)',  suit:[0x554433,0x887766], skin:0x5c3a1e, hair:0x1a0a00, from:'Miles Morales Game' },
  jackal:   { name:'Miles Warren / Jackal',       suit:[0x334433,0x556655], skin:0xaabb88, hair:0x448844, from:'PS4 DLC, Comics' },
  wraith:   { name:'Yuri / The Wraith',           suit:[0x222244,0x334466], skin:0xd4a870, hair:0x1a1010, from:'PS4 DLC' },
  blackcat: { name:'Felicia Hardy / Black Cat',   suit:[0x111111,0x222222], skin:0xf4c490, hair:0xffffff, from:'PS4 DLC, Comics' },
  // Far From Home extras
  talos:    { name:'Talos (Skrull as Fury)',       suit:null,               skin:0x8aaa88, hair:null,     from:'MCU Far From Home' },
};

// ══════════════════════════════════════════════
//  3D CHARACTER PORTRAIT RENDERER (2D canvas 3D-style)
// ══════════════════════════════════════════════
function drawCharacterPortrait(canvas, charKey, t) {
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var w = canvas.width, h = canvas.height;
  var data = ALL_CHARACTERS[charKey];
  if(!data) return;
  ctx.clearRect(0,0,w,h);
  var bob = Math.sin((t||0)*0.002)*2;

  // Background
  var bgColor = data.suit ? data.suit[0] : 0x1a1010;
  var r=(bgColor>>16)&255, g=(bgColor>>8)&255, b=bgColor&255;
  var bg = ctx.createRadialGradient(w/2,h*0.5,2,w/2,h*0.5,w*0.7);
  bg.addColorStop(0,'rgba('+r+','+g+','+b+',0.35)');
  bg.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);

  var sc = w/80; // scale factor
  ctx.save(); ctx.scale(sc,sc);

  // Choose renderer by character type
  if(charKey==='peter')          drawPeter(ctx, bob);
  else if(charKey==='miles')     drawMiles(ctx, bob);
  else if(charKey==='mj')        drawMJ(ctx, bob);
  else if(charKey==='gwen')      drawGwen(ctx, bob);
  else if(charKey==='kingpin')   drawKingpin(ctx, bob);
  else if(charKey==='goblin')    drawGoblin(ctx, bob);
  else if(charKey==='ock')       drawOck(ctx, bob);
  else if(charKey==='venom')     drawVenom(ctx, bob);
  else if(charKey==='electro')   drawElectro(ctx, bob);
  else if(charKey==='vulture')   drawVulture(ctx, bob);
  else if(charKey==='rhino')     drawRhino(ctx, bob);
  else if(charKey==='sandman')   drawSandman(ctx, bob);
  else if(charKey==='lizard')    drawLizard(ctx, bob);
  else if(charKey==='carnage')   drawCarnage(ctx, bob);
  else if(charKey==='mysterio')  drawMysterio(ctx, bob);
  else if(charKey==='stan_lee')  drawStanLee(ctx, bob);
  else if(charKey==='ned')       drawNed(ctx, bob);
  else if(charKey==='tony')      drawTony(ctx, bob);
  else if(charKey==='noir')      drawNoir(ctx, bob);
  else if(charKey==='spider_ham')drawSpiderHam(ctx, bob);
  else if(charKey==='blackcat')  drawBlackCat(ctx, bob);
  else drawGenericChar(ctx, data, bob);

  ctx.restore();
}

// ── HELPER DRAWING FUNCTIONS ──
function shadow(ctx,x,y){
  ctx.fillStyle='rgba(0,0,0,0.25)';
  ctx.beginPath(); ctx.ellipse(x,y,16,4,0,0,Math.PI*2); ctx.fill();
}

// ── PETER PARKER / SPIDER-MAN ──
function drawPeter(ctx, bob) {
  shadow(ctx,40,93);
  // Boots
  ctx.fillStyle='#0000aa'; ctx.fillRect(27,80,12,8); ctx.fillRect(41,80,12,8);
  // Legs
  ctx.fillStyle='#cc0018'; ctx.fillRect(28,60,11,22); ctx.fillRect(41,60,11,22);
  // Blue leg panels
  ctx.fillStyle='#0000aa'; ctx.fillRect(29,62,9,8); ctx.fillRect(42,62,9,8);
  // Torso
  ctx.fillStyle='#e8001c'; ctx.fillRect(24,36,32,26);
  // Web lines on torso
  ctx.strokeStyle='rgba(0,0,120,0.4)'; ctx.lineWidth=0.7;
  for(var i=0;i<5;i++){ctx.beginPath();ctx.moveTo(24,36+i*5);ctx.lineTo(56,36+i*5);ctx.stroke();}
  for(var j=0;j<5;j++){ctx.beginPath();ctx.moveTo(24+j*8,36);ctx.lineTo(24+j*8,62);ctx.stroke();}
  // Spider chest logo
  ctx.fillStyle='#0000aa';
  ctx.beginPath(); ctx.moveTo(40,42); ctx.lineTo(36,50); ctx.lineTo(40,48); ctx.lineTo(44,50); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(40,48); ctx.lineTo(36,55); ctx.lineTo(40,53); ctx.lineTo(44,55); ctx.closePath(); ctx.fill();
  // Arms
  ctx.fillStyle='#e8001c'; ctx.fillRect(13,36,11,20);
  ctx.fillStyle='#0000aa'; ctx.fillRect(13,52,11,8);
  ctx.fillStyle='#e8001c'; ctx.fillRect(56,36,11,20);
  ctx.fillStyle='#0000aa'; ctx.fillRect(56,52,11,8);
  // Head
  ctx.fillStyle='#e8001c';
  ctx.beginPath(); ctx.ellipse(40,26+bob,15,18,0,0,Math.PI*2); ctx.fill();
  // Web lines on mask
  ctx.strokeStyle='rgba(0,0,120,0.35)'; ctx.lineWidth=0.6;
  for(var l=0;l<7;l++){ctx.beginPath();ctx.moveTo(40,8+bob);ctx.lineTo(18+l*5,44+bob);ctx.stroke();}
  // Eyes
  ctx.fillStyle='#eef5ff'; ctx.strokeStyle='rgba(0,0,100,0.4)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.ellipse(32,25+bob,8,5.5,-0.25,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(48,25+bob,8,5.5,0.25,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.fillStyle='rgba(200,220,255,0.4)';
  ctx.beginPath(); ctx.ellipse(32,25+bob,8,5.5,-0.25,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(48,25+bob,8,5.5,0.25,0,Math.PI*2); ctx.fill();
}

// ── MILES MORALES ──
function drawMiles(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#cc0018'; ctx.fillRect(27,80,12,8); ctx.fillRect(41,80,12,8);
  ctx.fillStyle='#0a0a1a'; ctx.fillRect(28,60,11,22); ctx.fillRect(41,60,11,22);
  // Red stripe on legs
  ctx.fillStyle='#cc0018'; ctx.fillRect(29,68,9,4); ctx.fillRect(42,68,9,4);
  // Torso — black suit
  ctx.fillStyle='#0a0a1a'; ctx.fillRect(24,36,32,26);
  ctx.fillStyle='#cc0018'; ctx.fillRect(24,36,32,4); ctx.fillRect(24,58,32,4);
  // Spider logo — red on black
  ctx.fillStyle='#cc0018';
  ctx.beginPath(); ctx.moveTo(40,43); ctx.lineTo(36,51); ctx.lineTo(40,49); ctx.lineTo(44,51); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(40,49); ctx.lineTo(36,56); ctx.lineTo(40,54); ctx.lineTo(44,56); ctx.closePath(); ctx.fill();
  // Electric aura on arms
  ctx.strokeStyle='rgba(80,80,255,0.6)'; ctx.lineWidth=1.5;
  [[13,40,10,37],[13,46,9,44],[67,40,70,37],[67,46,71,44]].forEach(function(p){
    ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(p[2],p[3]);ctx.stroke();
  });
  ctx.fillStyle='#0a0a1a'; ctx.fillRect(13,36,11,20);
  ctx.fillStyle='#cc0018'; ctx.fillRect(13,52,11,8);
  ctx.fillStyle='#0a0a1a'; ctx.fillRect(56,36,11,20);
  ctx.fillStyle='#cc0018'; ctx.fillRect(56,52,11,8);
  // Head
  ctx.fillStyle='#0a0a1a';
  ctx.beginPath(); ctx.ellipse(40,26+bob,15,18,0,0,Math.PI*2); ctx.fill();
  // Eyes — angular white
  ctx.fillStyle='white';
  ctx.beginPath(); ctx.moveTo(23,25+bob); ctx.lineTo(35,21+bob); ctx.lineTo(37,29+bob); ctx.lineTo(23,30+bob); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(57,25+bob); ctx.lineTo(45,21+bob); ctx.lineTo(43,29+bob); ctx.lineTo(57,30+bob); ctx.closePath(); ctx.fill();
  // Electric glow
  ctx.shadowColor='rgba(80,80,255,0.8)'; ctx.shadowBlur=6;
  ctx.fillStyle='rgba(80,80,255,0.3)';
  ctx.beginPath(); ctx.ellipse(40,26+bob,16,19,0,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur=0;
}

// ── MARY JANE (PREGNANT) ──
function drawMJ(ctx, bob) {
  shadow(ctx,40,93);
  // Jeans
  ctx.fillStyle='#334466'; ctx.fillRect(28,60,11,30); ctx.fillRect(41,60,11,30);
  // Shirt — brown/orange
  ctx.fillStyle='#8B4513'; ctx.fillRect(23,36,34,26);
  // Baby bump
  ctx.fillStyle='#8B4513';
  ctx.beginPath(); ctx.ellipse(40,57,13,10,0,0,Math.PI*2); ctx.fill();
  // Arms with hands on belly
  ctx.fillStyle='#8B4513'; ctx.fillRect(13,36,10,20); ctx.fillRect(57,36,10,20);
  ctx.fillStyle='#f4c48a'; ctx.fillRect(13,52,10,8); ctx.fillRect(57,52,10,8);
  ctx.fillStyle='#f4c48a'; ctx.fillRect(26,55,10,8); ctx.fillRect(44,55,10,8);
  // Neck
  ctx.fillStyle='#f4c48a'; ctx.fillRect(35,26,10,12);
  // Head
  ctx.fillStyle='#f4c48a'; ctx.beginPath(); ctx.ellipse(40,20+bob,14,15,0,0,Math.PI*2); ctx.fill();
  // Red hair — signature MJ
  ctx.fillStyle='#cc4400';
  ctx.beginPath(); ctx.ellipse(40,12+bob,15,9,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(28,22+bob,6,13,-0.4,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(52,22+bob,6,13,0.4,0,Math.PI*2); ctx.fill();
  // Eyes
  ctx.fillStyle='#3a2a1a';
  ctx.beginPath(); ctx.ellipse(34,20+bob,3,2.5,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(46,20+bob,3,2.5,0,0,Math.PI*2); ctx.fill();
  // Smile
  ctx.strokeStyle='#c07050'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.arc(40,25+bob,4,0.2,Math.PI-0.2); ctx.stroke();
}

// ── GWEN STACY / SPIDER-GWEN ──
function drawGwen(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#222244'; ctx.fillRect(27,80,12,8); ctx.fillRect(41,80,12,8);
  ctx.fillStyle='#ffffff'; ctx.fillRect(28,58,11,24); ctx.fillRect(41,58,11,24);
  ctx.fillStyle='#ffaacc'; ctx.fillRect(29,62,9,6); ctx.fillRect(42,62,9,6);
  // Torso white
  ctx.fillStyle='#ffffff'; ctx.fillRect(24,36,32,24);
  ctx.fillStyle='#222244'; ctx.fillRect(24,36,32,4);
  // Hood
  ctx.fillStyle='#ffffff'; ctx.beginPath(); ctx.ellipse(40,30+bob,18,14,0,0,Math.PI,-1); ctx.fill();
  ctx.fillStyle='#ffaacc'; ctx.fillRect(23,38,6,16); ctx.fillRect(51,38,6,16);
  // Arms
  ctx.fillStyle='#ffffff'; ctx.fillRect(13,36,11,22); ctx.fillRect(56,36,11,22);
  ctx.fillStyle='#222244'; ctx.fillRect(13,54,11,6); ctx.fillRect(56,54,11,6);
  // Head
  ctx.fillStyle='#ffffff'; ctx.beginPath(); ctx.ellipse(40,24+bob,15,18,0,0,Math.PI*2); ctx.fill();
  // Eyes — large white with black outline
  ctx.fillStyle='#111133'; ctx.strokeStyle='#111133'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.ellipse(32,23+bob,8,6,-0.2,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(48,23+bob,8,6,0.2,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='white';
  ctx.beginPath(); ctx.ellipse(34,22+bob,3,2.5,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(50,22+bob,3,2.5,0,0,Math.PI*2); ctx.fill();
}

// ── KINGPIN ──
function drawKingpin(ctx, bob) {
  shadow(ctx,40,93);
  // Huge body — white suit
  ctx.fillStyle='#f5f5f5'; ctx.fillRect(18,34,44,34); // Wide torso
  ctx.fillStyle='#eeeeee'; ctx.fillRect(18,34,44,6); // Jacket shoulders
  ctx.fillStyle='#333333'; ctx.fillRect(34,36,12,30); // Shirt/tie
  ctx.fillStyle='#cc0000'; ctx.fillRect(37,38,6,15); // Red tie
  // Very wide legs
  ctx.fillStyle='#222222'; ctx.fillRect(22,68,17,24); ctx.fillRect(41,68,17,24);
  ctx.fillStyle='#111111'; ctx.fillRect(22,86,17,6); ctx.fillRect(41,86,17,6);
  // Huge arms
  ctx.fillStyle='#f5f5f5'; ctx.fillRect(6,34,14,22); ctx.fillRect(60,34,14,22);
  ctx.fillStyle='#f4c48a'; ctx.fillRect(6,52,14,10); ctx.fillRect(60,52,14,10);
  // Neck — massive
  ctx.fillStyle='#f4c48a'; ctx.fillRect(34,24,12,14);
  // Head — bald, large
  ctx.fillStyle='#f0c888';
  ctx.beginPath(); ctx.ellipse(40,20+bob,17,18,0,0,Math.PI*2); ctx.fill();
  // No hair — bald
  ctx.fillStyle='rgba(0,0,0,0.1)';
  ctx.beginPath(); ctx.ellipse(40,14+bob,17,8,0,Math.PI*2,0); ctx.fill();
  // Eyes — small, mean
  ctx.fillStyle='#222222';
  ctx.beginPath(); ctx.ellipse(33,20+bob,3,2.5,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(47,20+bob,3,2.5,0,0,Math.PI*2); ctx.fill();
  // Frown
  ctx.strokeStyle='#884422'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.arc(40,26+bob,4,Math.PI+0.3,-0.3); ctx.stroke();
  // Cane
  ctx.strokeStyle='#888844'; ctx.lineWidth=2.5;
  ctx.beginPath(); ctx.moveTo(68,56); ctx.lineTo(72,88); ctx.stroke();
  ctx.fillStyle='#ccbb44'; ctx.beginPath(); ctx.ellipse(68,55,4,3,0,0,Math.PI*2); ctx.fill();
}

// ── GREEN GOBLIN ──
function drawGoblin(ctx, bob) {
  shadow(ctx,40,93);
  // Glider platform
  ctx.fillStyle='#224422'; ctx.fillRect(10,82,60,6);
  ctx.fillStyle='#aa4400'; ctx.fillRect(14,84,52,2);
  // Goblin suit — green with purple
  ctx.fillStyle='#447744'; ctx.fillRect(26,50,28,22);
  ctx.fillStyle='#884400'; ctx.fillRect(26,50,28,5);
  ctx.fillStyle='#447744'; ctx.fillRect(20,50,8,16); ctx.fillRect(52,50,8,16);
  ctx.fillStyle='#224422'; ctx.fillRect(26,68,10,14); ctx.fillRect(44,68,10,14);
  // Head — goblin mask
  ctx.fillStyle='#228822';
  ctx.beginPath(); ctx.ellipse(40,36+bob,15,16,0,0,Math.PI*2); ctx.fill();
  // Pointed ears
  ctx.beginPath(); ctx.moveTo(26,30+bob); ctx.lineTo(22,20+bob); ctx.lineTo(30,28+bob); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(54,30+bob); ctx.lineTo(58,20+bob); ctx.lineTo(50,28+bob); ctx.closePath(); ctx.fill();
  // Teeth grin
  ctx.fillStyle='#ffdd44'; ctx.fillRect(32,40+bob,16,5);
  ctx.fillStyle='#228822';
  for(var t=0;t<5;t++){ctx.fillRect(33+t*3,40+bob,1,5);}
  // Eyes — yellow
  ctx.fillStyle='#ffdd00';
  ctx.beginPath(); ctx.ellipse(33,34+bob,5,4,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(47,34+bob,5,4,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#cc6600'; ctx.beginPath(); ctx.arc(33,34+bob,2,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(47,34+bob,2,0,Math.PI*2); ctx.fill();
  // Pumpkin bomb
  ctx.fillStyle='#cc6600'; ctx.beginPath(); ctx.arc(66,60,7,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#228822'; ctx.fillRect(65,52,2,6);
}

// ── DOCTOR OCTOPUS ──
function drawOck(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#2a2a44'; ctx.fillRect(28,60,12,30); ctx.fillRect(40,60,12,30);
  ctx.fillStyle='#111122'; ctx.fillRect(28,84,12,8); ctx.fillRect(40,84,12,8);
  // Coat
  ctx.fillStyle='#3a3a55'; ctx.fillRect(20,34,40,28);
  ctx.fillStyle='#222233'; ctx.fillRect(20,34,40,4);
  // Mechanical tentacles — 4 of them
  ctx.strokeStyle='#888888'; ctx.lineWidth=3;
  ctx.lineCap='round';
  // Back tentacles
  ctx.beginPath(); ctx.moveTo(30,50); ctx.quadraticCurveTo(10,40,5,25); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(50,50); ctx.quadraticCurveTo(70,40,75,25); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(28,52); ctx.quadraticCurveTo(8,65,5,80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(52,52); ctx.quadraticCurveTo(72,65,75,80); ctx.stroke();
  // Claw tips
  ctx.fillStyle='#aaaaaa'; ctx.lineWidth=1;
  [[5,25],[75,25],[5,80],[75,80]].forEach(function(p){
    ctx.beginPath(); ctx.arc(p[0],p[1],3,0,Math.PI*2); ctx.fill();
  });
  // Arms
  ctx.fillStyle='#3a3a55'; ctx.fillRect(10,34,12,22); ctx.fillRect(58,34,12,22);
  ctx.fillStyle='#f0c888'; ctx.fillRect(10,52,12,8); ctx.fillRect(58,52,12,8);
  // Head
  ctx.fillStyle='#f0c888'; ctx.beginPath(); ctx.ellipse(40,24+bob,14,16,0,0,Math.PI*2); ctx.fill();
  // Glasses
  ctx.strokeStyle='#888844'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.ellipse(33,23+bob,6,4.5,0,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(47,23+bob,6,4.5,0,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(39,23+bob); ctx.lineTo(41,23+bob); ctx.stroke();
  // Hair
  ctx.fillStyle='#4a3010'; ctx.fillRect(27,14+bob,26,11);
}

// ── VENOM ──
function drawVenom(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#111111'; ctx.fillRect(28,60,12,30); ctx.fillRect(40,60,12,30);
  // Huge muscular torso
  ctx.fillStyle='#111111'; ctx.fillRect(18,32,44,32);
  // White spider on chest
  ctx.fillStyle='white';
  ctx.beginPath(); ctx.moveTo(40,40); ctx.lineTo(35,50); ctx.lineTo(40,47); ctx.lineTo(45,50); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(40,47); ctx.lineTo(35,58); ctx.lineTo(40,55); ctx.lineTo(45,58); ctx.closePath(); ctx.fill();
  // Muscle lines
  ctx.strokeStyle='rgba(0,0,0,0.5)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(40,32); ctx.lineTo(40,64); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(18,45); ctx.lineTo(62,45); ctx.stroke();
  // Huge arms
  ctx.fillStyle='#111111'; ctx.fillRect(6,32,14,24); ctx.fillRect(60,32,14,24);
  ctx.fillStyle='#111111'; ctx.fillRect(6,52,14,10); ctx.fillRect(60,52,14,10);
  // Head — alien shape
  ctx.fillStyle='#111111';
  ctx.beginPath(); ctx.ellipse(40,22+bob,17,20,0,0,Math.PI*2); ctx.fill();
  // Huge tongue
  ctx.fillStyle='#cc0022';
  ctx.beginPath(); ctx.moveTo(32,32+bob); ctx.quadraticCurveTo(40,42+bob,48,32+bob); ctx.lineTo(48,35+bob); ctx.quadraticCurveTo(40,50+bob,32,35+bob); ctx.closePath(); ctx.fill();
  // Teeth
  ctx.fillStyle='white';
  for(var t=0;t<6;t++){
    ctx.beginPath(); ctx.moveTo(30+t*4,32+bob); ctx.lineTo(32+t*4,38+bob); ctx.lineTo(34+t*4,32+bob); ctx.closePath(); ctx.fill();
  }
  // White eyes — alien
  ctx.fillStyle='white';
  ctx.beginPath(); ctx.ellipse(31,18+bob,9,7,-0.3,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(49,18+bob,9,7,0.3,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#111111';
  ctx.beginPath(); ctx.arc(31,18+bob,4,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(49,18+bob,4,0,Math.PI*2); ctx.fill();
}

// ── ELECTRO ──
function drawElectro(ctx, bob) {
  shadow(ctx,40,93);
  // Electric glow around whole figure
  ctx.shadowColor='rgba(0,200,255,0.8)'; ctx.shadowBlur=12;
  ctx.fillStyle='#003355'; ctx.fillRect(28,60,12,30); ctx.fillRect(40,60,12,30);
  ctx.fillStyle='#004466'; ctx.fillRect(22,34,36,28);
  // Lightning bolt on chest
  ctx.fillStyle='#00ccff';
  ctx.beginPath(); ctx.moveTo(43,36); ctx.lineTo(38,48); ctx.lineTo(42,48); ctx.lineTo(37,60); ctx.lineTo(44,46); ctx.lineTo(40,46); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#003355'; ctx.fillRect(10,34,14,22); ctx.fillRect(56,34,14,22);
  // Lightning from hands
  ctx.strokeStyle='#00ccff'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(10,52); ctx.lineTo(2,44); ctx.moveTo(10,52); ctx.lineTo(4,58); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(70,52); ctx.lineTo(78,44); ctx.moveTo(70,52); ctx.lineTo(76,58); ctx.stroke();
  ctx.shadowBlur=0;
  // Head — blue electric
  ctx.shadowColor='rgba(0,200,255,0.6)'; ctx.shadowBlur=8;
  ctx.fillStyle='#002244';
  ctx.beginPath(); ctx.ellipse(40,24+bob,15,17,0,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur=0;
  // Star-shaped mask markings
  ctx.fillStyle='#00ccff';
  ctx.beginPath(); ctx.moveTo(40,10+bob); ctx.lineTo(38,18+bob); ctx.lineTo(40,16+bob); ctx.lineTo(42,18+bob); ctx.closePath(); ctx.fill();
  // Eyes glowing
  ctx.fillStyle='#00ffff'; ctx.shadowColor='#00ffff'; ctx.shadowBlur=6;
  ctx.beginPath(); ctx.ellipse(33,24+bob,5,4,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(47,24+bob,5,4,0,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur=0;
}

// ── VULTURE ──
function drawVulture(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#334433'; ctx.fillRect(28,62,12,28); ctx.fillRect(40,62,12,28);
  ctx.fillStyle='#2a3a2a'; ctx.fillRect(28,84,12,6); ctx.fillRect(40,84,12,6);
  ctx.fillStyle='#3a4a3a'; ctx.fillRect(22,36,36,28);
  ctx.fillStyle='#2a3a2a'; ctx.fillRect(22,36,36,5);
  // WINGS — large mechanical green
  ctx.fillStyle='#336633';
  ctx.beginPath(); ctx.moveTo(22,46); ctx.lineTo(2,30); ctx.lineTo(6,55); ctx.lineTo(18,54); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(58,46); ctx.lineTo(78,30); ctx.lineTo(74,55); ctx.lineTo(62,54); ctx.closePath(); ctx.fill();
  // Wing detail
  ctx.strokeStyle='#224422'; ctx.lineWidth=1;
  [[22,46,2,30],[22,46,6,55],[58,46,78,30],[58,46,74,55]].forEach(function(p){
    ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(p[2],p[3]);ctx.stroke();
  });
  ctx.fillStyle='#3a4a3a'; ctx.fillRect(10,36,14,22); ctx.fillRect(56,36,14,22);
  ctx.fillStyle='#556655'; ctx.fillRect(10,54,14,8); ctx.fillRect(56,54,14,8);
  // Helmet
  ctx.fillStyle='#445544'; ctx.beginPath(); ctx.ellipse(40,24+bob,16,18,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#f0c888'; ctx.beginPath(); ctx.ellipse(40,26+bob,8,10,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#556655'; ctx.beginPath(); ctx.ellipse(40,18+bob,16,10,0,0,Math.PI,-1); ctx.fill();
  ctx.fillStyle='rgba(80,200,80,0.4)';
  ctx.beginPath(); ctx.ellipse(33,24+bob,4,3,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(47,24+bob,4,3,0,0,Math.PI*2); ctx.fill();
}

// ── RHINO ──
function drawRhino(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#555555'; ctx.fillRect(24,66,17,24); ctx.fillRect(44,66,17,24);
  ctx.fillStyle='#333333'; ctx.fillRect(24,84,17,6); ctx.fillRect(44,84,17,6);
  // MASSIVE armored torso
  ctx.fillStyle='#666666'; ctx.fillRect(16,30,48,38);
  ctx.fillStyle='#444444'; ctx.fillRect(16,30,48,6);
  // Armor plates
  ctx.strokeStyle='#333333'; ctx.lineWidth=2;
  ctx.strokeRect(18,32,44,34);
  ctx.beginPath(); ctx.moveTo(18,48); ctx.lineTo(62,48); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(40,32); ctx.lineTo(40,64); ctx.stroke();
  ctx.fillStyle='#777777'; ctx.fillRect(6,30,12,26); ctx.fillRect(62,30,12,26);
  ctx.fillStyle='#555555'; ctx.fillRect(6,52,12,10); ctx.fillRect(62,52,12,10);
  // Head with horn
  ctx.fillStyle='#666666'; ctx.beginPath(); ctx.ellipse(40,22+bob,18,20,0,0,Math.PI*2); ctx.fill();
  // HORN
  ctx.fillStyle='#888888';
  ctx.beginPath(); ctx.moveTo(36,10+bob); ctx.lineTo(44,10+bob); ctx.lineTo(40,0+bob); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#222222';
  ctx.beginPath(); ctx.ellipse(33,22+bob,4,3,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(47,22+bob,4,3,0,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='#444444'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.arc(40,28+bob,5,0.3,Math.PI-0.3); ctx.stroke();
}

// ── MYSTERIO ──
function drawMysterio(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#2a2a66'; ctx.fillRect(28,60,12,30); ctx.fillRect(40,60,12,30);
  ctx.fillStyle='#2244aa'; ctx.fillRect(22,34,36,28);
  ctx.fillStyle='#3355bb'; ctx.fillRect(22,34,36,6);
  ctx.fillStyle='#336633'; ctx.fillRect(22,36,4,26); ctx.fillRect(54,36,4,26);
  ctx.fillStyle='#2244aa'; ctx.fillRect(10,34,14,24); ctx.fillRect(56,34,14,24);
  ctx.fillStyle='#114433'; ctx.fillRect(10,54,14,8); ctx.fillRect(56,54,14,8);
  // FISHBOWL HELMET — signature Mysterio
  ctx.fillStyle='rgba(100,200,255,0.15)';
  ctx.beginPath(); ctx.ellipse(40,22+bob,20,22,0,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='rgba(100,200,255,0.6)'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.ellipse(40,22+bob,20,22,0,0,Math.PI*2); ctx.stroke();
  // Face inside bowl
  ctx.fillStyle='#f0c888'; ctx.beginPath(); ctx.ellipse(40,22+bob,12,14,0,0,Math.PI*2); ctx.fill();
  // Eyes
  ctx.fillStyle='#224488';
  ctx.beginPath(); ctx.ellipse(34,20+bob,3,2.5,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(46,20+bob,3,2.5,0,0,Math.PI*2); ctx.fill();
  // Mist/smoke inside bowl
  ctx.fillStyle='rgba(100,200,255,0.12)'; ctx.beginPath(); ctx.ellipse(40,30+bob,14,8,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='rgba(100,200,255,0.08)'; ctx.beginPath(); ctx.ellipse(40,14+bob,12,6,0,0,Math.PI*2); ctx.fill();
  // Green cape bits
  ctx.fillStyle='#336633';
  ctx.beginPath(); ctx.moveTo(22,60); ctx.lineTo(14,80); ctx.lineTo(22,78); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(58,60); ctx.lineTo(66,80); ctx.lineTo(58,78); ctx.closePath(); ctx.fill();
}

// ── SANDMAN ──
function drawSandman(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#cc9944'; ctx.fillRect(28,62,12,28); ctx.fillRect(40,62,12,28);
  ctx.fillStyle='#886622'; ctx.fillRect(28,84,12,6); ctx.fillRect(40,84,12,6);
  ctx.fillStyle='#aa8833'; ctx.fillRect(22,36,36,28);
  ctx.fillStyle='#228833'; ctx.fillRect(22,36,36,6);
  // Sand texture on body — dots
  ctx.fillStyle='rgba(180,140,60,0.4)';
  for(var si=0;si<20;si++){
    ctx.beginPath(); ctx.arc(22+Math.random()*36,36+Math.random()*28,1,0,Math.PI*2); ctx.fill();
  }
  ctx.fillStyle='#aa8833'; ctx.fillRect(10,36,14,20); ctx.fillRect(56,36,14,20);
  // Arms transforming to sand
  ctx.fillStyle='#cc9944'; ctx.fillRect(10,52,14,10); ctx.fillRect(56,52,14,10);
  // Sand particles flying off
  ctx.fillStyle='rgba(200,160,60,0.6)';
  [[4,50,3],[3,44,2],[4,56,2],[76,50,3],[77,44,2],[76,56,2]].forEach(function(p){
    ctx.beginPath();ctx.arc(p[0],p[1],p[2],0,Math.PI*2);ctx.fill();
  });
  // Head — partially sandy
  ctx.fillStyle='#f0c888'; ctx.beginPath(); ctx.ellipse(40,24+bob,14,16,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='cc9944'; ctx.fillRect(27,14+bob,26,8);
  ctx.fillStyle='#3a2010';
  ctx.beginPath(); ctx.ellipse(33,23+bob,3,2.5,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(47,23+bob,3,2.5,0,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='#884422'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.arc(40,28+bob,4,Math.PI+0.3,-0.3); ctx.stroke();
}

// ── LIZARD ──
function drawLizard(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#228822'; ctx.fillRect(28,62,12,28); ctx.fillRect(40,62,12,28);
  ctx.fillStyle='#115511'; ctx.fillRect(28,84,12,6); ctx.fillRect(40,84,12,6);
  ctx.fillStyle='#2a9a2a'; ctx.fillRect(18,32,44,32);
  ctx.fillStyle='#115511'; ctx.fillRect(18,32,44,5);
  // Scale pattern
  ctx.strokeStyle='rgba(0,80,0,0.4)'; ctx.lineWidth=0.7;
  for(var si=0;si<6;si++){for(var sj=0;sj<4;sj++){
    ctx.beginPath();ctx.arc(22+si*7,37+sj*7,3,0,Math.PI*2);ctx.stroke();
  }}
  ctx.fillStyle='#2a9a2a'; ctx.fillRect(8,32,12,26); ctx.fillRect(60,32,12,26);
  ctx.fillStyle='#115511'; ctx.fillRect(8,54,12,10); ctx.fillRect(60,54,12,10);
  // Tail
  ctx.fillStyle='#228822';
  ctx.beginPath(); ctx.moveTo(40,90); ctx.quadraticCurveTo(70,85,78,70); ctx.lineWidth=8; ctx.strokeStyle='#228822'; ctx.stroke();
  // Head — reptile
  ctx.fillStyle='#2a9a2a'; ctx.beginPath(); ctx.ellipse(40,22+bob,15,18,0,0,Math.PI*2); ctx.fill();
  // Snout
  ctx.beginPath(); ctx.ellipse(40,30+bob,8,6,0,0,Math.PI*2); ctx.fill();
  // Nostrils
  ctx.fillStyle='#115511';
  ctx.beginPath(); ctx.arc(37,30+bob,1.5,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(43,30+bob,1.5,0,Math.PI*2); ctx.fill();
  // Eyes — yellow reptile
  ctx.fillStyle='#ccff00';
  ctx.beginPath(); ctx.ellipse(30,20+bob,5,4,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(50,20+bob,5,4,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#004400';
  ctx.beginPath(); ctx.arc(30,20+bob,1.5,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(50,20+bob,1.5,0,Math.PI*2); ctx.fill();
}

// ── CARNAGE ──
function drawCarnage(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#880000'; ctx.fillRect(26,58,14,32); ctx.fillRect(40,58,14,32);
  // Tendrils for legs
  ctx.strokeStyle='#aa0000'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.moveTo(26,90); ctx.lineTo(18,95); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(54,90); ctx.lineTo(62,95); ctx.stroke();
  ctx.fillStyle='#cc0000'; ctx.fillRect(18,30,44,30);
  // Black symbiote pattern
  ctx.fillStyle='#440000';
  ctx.beginPath(); ctx.moveTo(40,35); ctx.lineTo(36,45); ctx.lineTo(40,42); ctx.lineTo(44,45); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(40,42); ctx.lineTo(36,54); ctx.lineTo(40,51); ctx.lineTo(44,54); ctx.closePath(); ctx.fill();
  // Symbiote tendrils as arms
  ctx.strokeStyle='#cc0000'; ctx.lineWidth=4; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(18,44); ctx.quadraticCurveTo(6,38,2,28); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(18,52); ctx.quadraticCurveTo(6,58,4,68); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(62,44); ctx.quadraticCurveTo(74,38,78,28); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(62,52); ctx.quadraticCurveTo(74,58,76,68); ctx.stroke();
  // Head
  ctx.fillStyle='#cc0000'; ctx.beginPath(); ctx.ellipse(40,20+bob,16,18,0,0,Math.PI*2); ctx.fill();
  // Massive insane grin
  ctx.fillStyle='#440000';
  ctx.beginPath(); ctx.moveTo(26,24+bob); ctx.quadraticCurveTo(40,38+bob,54,24+bob); ctx.lineTo(54,26+bob); ctx.quadraticCurveTo(40,46+bob,26,26+bob); ctx.closePath(); ctx.fill();
  ctx.fillStyle='white';
  for(var t=0;t<8;t++){
    ctx.beginPath(); ctx.moveTo(28+t*3.2,25+bob); ctx.lineTo(29+t*3.2,32+bob); ctx.lineTo(30.5+t*3.2,25+bob); ctx.closePath(); ctx.fill();
  }
  // Eyes — white jagged
  ctx.fillStyle='white';
  ctx.beginPath(); ctx.moveTo(22,14+bob); ctx.lineTo(32,11+bob); ctx.lineTo(34,18+bob); ctx.lineTo(22,18+bob); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(58,14+bob); ctx.lineTo(48,11+bob); ctx.lineTo(46,18+bob); ctx.lineTo(58,18+bob); ctx.closePath(); ctx.fill();
  // Red tongue
  ctx.fillStyle='#ff2222';
  ctx.beginPath(); ctx.moveTo(38,36+bob); ctx.quadraticCurveTo(40,46+bob,42,36+bob); ctx.stroke();
}

// ── STAN LEE ──
function drawStanLee(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#334422'; ctx.fillRect(28,62,12,28); ctx.fillRect(40,62,12,28);
  ctx.fillStyle='#222200'; ctx.fillRect(28,84,12,6); ctx.fillRect(40,84,12,6);
  ctx.fillStyle='#446633'; ctx.fillRect(22,36,36,28);
  ctx.fillStyle='#223322'; ctx.fillRect(36,36,8,28);
  ctx.fillStyle='#446633'; ctx.fillRect(10,36,14,22); ctx.fillRect(56,36,14,22);
  ctx.fillStyle='#f4c48a'; ctx.fillRect(10,54,14,8); ctx.fillRect(56,54,14,8);
  ctx.fillStyle='#f4c48a'; ctx.fillRect(35,26,10,12);
  ctx.fillStyle='#f0c890'; ctx.beginPath(); ctx.ellipse(40,20+bob,14,16,0,0,Math.PI*2); ctx.fill();
  // White hair
  ctx.fillStyle='#dddddd'; ctx.fillRect(27,12+bob,26,10);
  ctx.beginPath(); ctx.ellipse(29,20+bob,5,8,0.3,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(51,20+bob,5,8,-0.3,0,Math.PI*2); ctx.fill();
  // Mustache
  ctx.fillStyle='#888888'; ctx.beginPath(); ctx.ellipse(40,25+bob,6,2.5,0,0,Math.PI*2); ctx.fill();
  // Glasses — signature thick frames
  ctx.strokeStyle='#222222'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.ellipse(33,19+bob,6,5,0,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(47,19+bob,6,5,0,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(39,19+bob); ctx.lineTo(41,19+bob); ctx.stroke();
  // Smile
  ctx.strokeStyle='#c07050'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.arc(40,27+bob,4,0.1,Math.PI-0.1); ctx.stroke();
  // Gold badge "NUFF SAID"
  ctx.fillStyle='#f5c518'; ctx.fillRect(32,40,16,6);
  ctx.fillStyle='#000'; ctx.font='bold 4px Arial'; ctx.textAlign='center';
  ctx.fillText("NUFF SAID",40,44);
}

// ── NED ──
function drawNed(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#334488'; ctx.fillRect(28,62,12,28); ctx.fillRect(40,62,12,28);
  ctx.fillStyle='#222244'; ctx.fillRect(28,84,12,6); ctx.fillRect(40,84,12,6);
  // Larger body (Ned is big)
  ctx.fillStyle='#446699'; ctx.fillRect(20,36,40,28);
  ctx.fillStyle='#334488'; ctx.fillRect(34,36,12,28);
  ctx.fillStyle='#446699'; ctx.fillRect(8,36,14,24); ctx.fillRect(58,36,14,24);
  ctx.fillStyle='#f0c080'; ctx.fillRect(8,56,14,8); ctx.fillRect(58,56,14,8);
  ctx.fillStyle='#f0c080'; ctx.fillRect(34,26,12,12);
  // Wider head
  ctx.fillStyle='#f0c080'; ctx.beginPath(); ctx.ellipse(40,20+bob,16,17,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#2a1a10'; ctx.fillRect(26,11+bob,28,10);
  ctx.strokeStyle='#222222'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.ellipse(33,19+bob,5,4.5,0,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(47,19+bob,5,4.5,0,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(38,19+bob); ctx.lineTo(42,19+bob); ctx.stroke();
  ctx.strokeStyle='#c07050'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.arc(40,26+bob,4,0.2,Math.PI-0.2); ctx.stroke();
}

// ── IRON MAN (Tony Stark) ──
function drawTony(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#cc2200'; ctx.fillRect(28,62,12,28); ctx.fillRect(40,62,12,28);
  ctx.fillStyle='#cc2200'; ctx.fillRect(22,34,36,30);
  // Gold chest reactor
  ctx.fillStyle='#f5c518'; ctx.fillRect(22,34,36,6);
  ctx.fillStyle='rgba(100,200,255,0.8)'; ctx.beginPath(); ctx.arc(40,52,6,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='rgba(100,200,255,0.4)'; ctx.beginPath(); ctx.arc(40,52,9,0,Math.PI*2); ctx.fill();
  // Gold stripes
  ctx.fillStyle='#f5c518'; ctx.fillRect(22,40,6,24); ctx.fillRect(52,40,6,24);
  // Arms — red and gold
  ctx.fillStyle='#cc2200'; ctx.fillRect(10,34,14,22); ctx.fillRect(56,34,14,22);
  ctx.fillStyle='#f5c518'; ctx.fillRect(10,52,14,10); ctx.fillRect(56,52,14,10);
  // Repulsor glow on palms
  ctx.fillStyle='rgba(100,200,255,0.7)'; ctx.beginPath(); ctx.arc(17,58,3,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(63,58,3,0,Math.PI*2); ctx.fill();
  // Helmet
  ctx.fillStyle='#cc2200'; ctx.beginPath(); ctx.ellipse(40,22+bob,15,18,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#f5c518'; ctx.fillRect(27,14+bob,26,10);
  // Faceplate eye slits
  ctx.fillStyle='rgba(100,200,255,0.9)'; ctx.shadowColor='rgba(100,200,255,0.8)'; ctx.shadowBlur=5;
  ctx.fillRect(28,22+bob,10,4); ctx.fillRect(42,22+bob,10,4);
  ctx.shadowBlur=0;
}

// ── NOIR SPIDER-MAN ──
function drawNoir(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#1a1a1a'; ctx.fillRect(28,62,12,28); ctx.fillRect(40,62,12,28);
  ctx.fillStyle='#111111'; ctx.fillRect(28,84,12,6); ctx.fillRect(40,84,12,6);
  ctx.fillStyle='#222222'; ctx.fillRect(22,36,36,26);
  // White chest spider
  ctx.strokeStyle='rgba(255,255,255,0.3)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(40,42); ctx.lineTo(36,52); ctx.moveTo(40,42); ctx.lineTo(44,52); ctx.stroke();
  ctx.fillStyle='#1a1a1a'; ctx.fillRect(10,36,14,22); ctx.fillRect(56,36,14,22);
  ctx.fillStyle='#111111'; ctx.fillRect(10,54,14,8); ctx.fillRect(56,54,14,8);
  ctx.fillStyle='#1a1a1a'; ctx.beginPath(); ctx.ellipse(40,24+bob,15,18,0,0,Math.PI*2); ctx.fill();
  // White goggles
  ctx.fillStyle='rgba(255,255,255,0.85)';
  ctx.beginPath(); ctx.ellipse(32,24+bob,7,5,-0.2,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(48,24+bob,7,5,0.2,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#1a1a1a';
  ctx.beginPath(); ctx.arc(32,24+bob,3,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(48,24+bob,3,0,Math.PI*2); ctx.fill();
  // Film noir rain effect
  ctx.strokeStyle='rgba(100,150,255,0.25)'; ctx.lineWidth=0.8;
  for(var r=0;r<8;r++){
    var rx=10+r*9, ry=0;
    ctx.beginPath();ctx.moveTo(rx,ry);ctx.lineTo(rx-2,ry+15);ctx.stroke();
  }
}

// ── SPIDER-HAM ──
function drawSpiderHam(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#0000aa'; ctx.fillRect(28,68,12,22); ctx.fillRect(40,68,12,22);
  ctx.fillStyle='#0000aa'; ctx.fillRect(28,84,12,6); ctx.fillRect(40,84,12,6);
  ctx.fillStyle='#e8001c'; ctx.fillRect(24,44,32,26);
  ctx.fillStyle='#0000aa'; ctx.fillRect(26,44,28,5);
  ctx.fillStyle='#e8001c'; ctx.fillRect(12,44,14,18); ctx.fillRect(54,44,14,18);
  ctx.fillStyle='#0000aa'; ctx.fillRect(12,58,14,7); ctx.fillRect(54,58,14,7);
  // Pig head — round and cute
  ctx.fillStyle='#ffccaa'; ctx.beginPath(); ctx.ellipse(40,28+bob,18,20,0,0,Math.PI*2); ctx.fill();
  // Big ears
  ctx.beginPath(); ctx.ellipse(26,18+bob,7,9,-.4,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(54,18+bob,7,9,.4,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#ffaaaa';
  ctx.beginPath(); ctx.ellipse(26,18+bob,4,6,-.4,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(54,18+bob,4,6,.4,0,Math.PI*2); ctx.fill();
  // Snout
  ctx.fillStyle='#ff9988'; ctx.beginPath(); ctx.ellipse(40,33+bob,7,5,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#cc6666';
  ctx.beginPath(); ctx.arc(38,33+bob,2,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(42,33+bob,2,0,Math.PI*2); ctx.fill();
  // Eyes
  ctx.fillStyle='black';
  ctx.beginPath(); ctx.arc(33,25+bob,4,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(47,25+bob,4,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='white';
  ctx.beginPath(); ctx.arc(35,24+bob,1.5,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(49,24+bob,1.5,0,Math.PI*2); ctx.fill();
  // Spider-Man mask only on bottom half
  ctx.fillStyle='#e8001c'; ctx.beginPath(); ctx.ellipse(40,34+bob,16,10,0,0,Math.PI*2); ctx.fill();
}

// ── BLACK CAT ──
function drawBlackCat(ctx, bob) {
  shadow(ctx,40,93);
  ctx.fillStyle='#111111'; ctx.fillRect(28,62,12,28); ctx.fillRect(40,62,12,28);
  ctx.fillStyle='#222222'; ctx.fillRect(28,84,12,6); ctx.fillRect(40,84,12,6);
  ctx.fillStyle='#1a1a1a'; ctx.fillRect(22,36,36,28);
  // White fur trim
  ctx.fillStyle='#eeeeee'; ctx.fillRect(22,36,36,5);
  ctx.fillStyle='#1a1a1a'; ctx.fillRect(10,36,14,22); ctx.fillRect(56,36,14,22);
  ctx.fillStyle='#eeeeee'; ctx.fillRect(10,54,14,8); ctx.fillRect(56,54,14,8);
  // White cuffs
  ctx.fillStyle='#f4c490'; ctx.fillRect(35,26,10,12);
  ctx.fillStyle='#f4c490'; ctx.beginPath(); ctx.ellipse(40,20+bob,14,16,0,0,Math.PI*2); ctx.fill();
  // White hair
  ctx.fillStyle='#eeeeee';
  ctx.beginPath(); ctx.ellipse(40,12+bob,14,9,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(28,22+bob,6,12,-0.3,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(52,22+bob,6,12,0.3,0,Math.PI*2); ctx.fill();
  // Cat ears
  ctx.fillStyle='#eeeeee';
  ctx.beginPath(); ctx.moveTo(29,12+bob); ctx.lineTo(24,4+bob); ctx.lineTo(32,8+bob); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(51,12+bob); ctx.lineTo(56,4+bob); ctx.lineTo(48,8+bob); ctx.closePath(); ctx.fill();
  // Eyes — green cat eyes
  ctx.fillStyle='#44cc44';
  ctx.beginPath(); ctx.ellipse(33,20+bob,4,3.5,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(47,20+bob,4,3.5,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#1a0a00';
  ctx.beginPath(); ctx.arc(33,20+bob,1.5,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(47,20+bob,1.5,0,Math.PI*2); ctx.fill();
  // Smirk
  ctx.strokeStyle='#c07050'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.arc(44,26+bob,4,Math.PI+0.2,Math.PI*2-0.1); ctx.stroke();
}

// ── GENERIC CHARACTER FALLBACK ──
function drawGenericChar(ctx, data, bob) {
  shadow(ctx,40,93);
  var sc = data.suit ? data.suit[0] : 0x334444;
  var skinC = data.skin || 0xf4c48a;
  function hexToRgb(hex){ return [(hex>>16)&255,(hex>>8)&255,hex&255]; }
  var sc_ = hexToRgb(sc); var sk_ = hexToRgb(skinC);
  var suitColor='rgb('+sc_+')'; var skinColor='rgb('+sk_+')';
  ctx.fillStyle='#111111'; ctx.fillRect(28,62,12,28); ctx.fillRect(40,62,12,28);
  ctx.fillStyle=suitColor; ctx.fillRect(22,36,36,28);
  ctx.fillStyle=suitColor; ctx.fillRect(10,36,14,22); ctx.fillRect(56,36,14,22);
  ctx.fillStyle=skinColor; ctx.fillRect(10,54,14,8); ctx.fillRect(56,54,14,8);
  ctx.fillStyle=skinColor; ctx.fillRect(35,26,10,12);
  ctx.fillStyle=skinColor; ctx.beginPath(); ctx.ellipse(40,20+bob,14,16,0,0,Math.PI*2); ctx.fill();
  if(data.hair){
    var hr_=hexToRgb(data.hair);
    ctx.fillStyle='rgb('+hr_+')'; ctx.fillRect(27,11+bob,26,10);
  }
  ctx.fillStyle='#3a2a1a';
  ctx.beginPath(); ctx.ellipse(33,20+bob,3,2.5,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(47,20+bob,3,2.5,0,0,Math.PI*2); ctx.fill();
}

// ══════════════════════════════════════════════
//  BUILD 3D CHARACTER MODELS (Three.js in-game)
// ══════════════════════════════════════════════
function buildSpiderManMesh(charKey) {
  var data = ALL_CHARACTERS[charKey] || ALL_CHARACTERS.peter;
  var g = new THREE.Group();
  var M = function(c){ return new THREE.MeshLambertMaterial({color:c}); };

  var suitColor = data.suit ? data.suit[0] : 0xe8001c;
  var accentColor = data.suit ? data.suit[1] : 0x0000cc;
  var skinColor = data.skin || 0xf4c48a;
  var hairColor = data.hair || 0x2a1a10;

  // Torso
  var torso = new THREE.Mesh(new THREE.BoxGeometry(0.72,0.92,0.46),M(suitColor));
  torso.position.set(0,1.1,0); torso.castShadow=true; g.add(torso);
  // Chest accent
  var chest = new THREE.Mesh(new THREE.BoxGeometry(0.4,0.5,0.48),M(accentColor));
  chest.position.set(0,1.15,0); g.add(chest);

  // Head
  var head = new THREE.Mesh(new THREE.BoxGeometry(0.56,0.54,0.5),M(suitColor));
  head.position.set(0,1.86,0); head.castShadow=true; g.add(head);

  // Eyes
  var eyeColor = (charKey==='peter'||charKey==='gwen') ? 0xeef5ff : charKey==='miles' ? 0xffffff : 0x224488;
  var eyeM = new THREE.MeshLambertMaterial({color:eyeColor, emissive:new THREE.Color(0x112244)});
  [-0.14,0.14].forEach(function(ex){
    var eye = new THREE.Mesh(new THREE.BoxGeometry(0.13,0.09,0.08),eyeM);
    eye.position.set(ex,1.9,0.25); g.add(eye);
  });

  // Legs
  var legL = new THREE.Mesh(new THREE.BoxGeometry(0.28,0.82,0.3),M(suitColor));
  legL.position.set(-0.2,0.5,0); legL.castShadow=true; g.add(legL);
  var legR = new THREE.Mesh(new THREE.BoxGeometry(0.28,0.82,0.3),M(suitColor));
  legR.position.set(0.2,0.5,0); legR.castShadow=true; g.add(legR);

  // Boots
  var bm = M(accentColor);
  var bL=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.22,0.38),bm); bL.position.set(-0.2,0.12,0.04); g.add(bL);
  var bR=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.22,0.38),bm); bR.position.set(0.2,0.12,0.04); g.add(bR);

  // Arms
  var armL = new THREE.Mesh(new THREE.BoxGeometry(0.24,0.7,0.26),M(suitColor));
  armL.position.set(-0.48,1.06,0); armL.castShadow=true; g.add(armL);
  var armR = new THREE.Mesh(new THREE.BoxGeometry(0.24,0.7,0.26),M(suitColor));
  armR.position.set(0.48,1.06,0); armR.castShadow=true; g.add(armR);
  var gL=new THREE.Mesh(new THREE.BoxGeometry(0.24,0.22,0.26),M(accentColor)); gL.position.set(-0.48,0.68,0); g.add(gL);
  var gR=new THREE.Mesh(new THREE.BoxGeometry(0.24,0.22,0.26),M(accentColor)); gR.position.set(0.48,0.68,0); g.add(gR);

  // Miles electric aura
  if(charKey==='miles'){
    var aura=new THREE.PointLight(0x4444ff,0.4,3);
    aura.position.set(0,1,0); g.add(aura);
  }

  // Kingpin special — much wider
  if(charKey==='kingpin'){
    torso.scale.set(1.8,1.1,1.6);
    armL.scale.set(1.4,1,1.4); armR.scale.set(1.4,1,1.4);
    legL.scale.set(1.4,1,1.3); legR.scale.set(1.4,1,1.3);
  }

  // Venom special — huge + tongue
  if(charKey==='venom'){
    torso.scale.set(1.5,1.1,1.4);
    head.scale.set(1.3,1.2,1.2);
    var tongue=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.25,0.35),M(0xcc0022));
    tongue.position.set(0,1.72,0.26); g.add(tongue);
  }

  // Ock tentacles
  if(charKey==='ock'){
    var tMat=M(0x888888);
    for(var t=0;t<4;t++){
      var ang=t/4*Math.PI*2;
      var tent=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.1,1.8,6),tMat);
      tent.position.set(Math.cos(ang)*0.5,1.1,Math.sin(ang)*0.5);
      tent.rotation.x=Math.PI/3; tent.rotation.y=ang; g.add(tent);
    }
  }

  // Vulture wings
  if(charKey==='vulture'){
    var wMat=M(0x445544);
    [-1,1].forEach(function(s){
      var wing=new THREE.Mesh(new THREE.BoxGeometry(3.8,0.15,1.4),wMat);
      wing.position.set(s*2.2,1.2,0); wing.rotation.z=s*0.25; g.add(wing);
    });
  }

  // Rhino horn
  if(charKey==='rhino'){
    var horn=new THREE.Mesh(new THREE.ConeGeometry(0.1,0.6,6),M(0x888888));
    horn.rotation.x=Math.PI/2; horn.position.set(0,2.08,0.26); g.add(horn);
    torso.scale.set(1.6,1.1,1.5);
  }

  // Mysterio fishbowl
  if(charKey==='mysterio'){
    var bowl=new THREE.Mesh(new THREE.SphereGeometry(0.36,14,14),
      new THREE.MeshPhongMaterial({color:0x88ccff,transparent:true,opacity:0.25,shininess:100}));
    bowl.position.set(0,1.88,0); g.add(bowl);
  }

  g._legL=legL; g._legR=legR; g._armL=armL; g._armR=armR;
  return g;
}

// ══════════════════════════════════════════════
//  ANIMATED MENU PORTRAITS
// ══════════════════════════════════════════════
var menuPortraitT = 0;
function animateMenuPortraits(){
  menuPortraitT++;
  ['peter','miles','mj'].forEach(function(key){
    var cv = document.getElementById('charPortrait_'+key);
    if(cv) drawCharacterPortrait(cv, key, menuPortraitT*16);
  });
  requestAnimationFrame(animateMenuPortraits);
}

// Start portrait animation when DOM is ready
document.addEventListener('DOMContentLoaded', function(){
  // Replace character select icons with portrait canvases
  ['peter','miles','mj'].forEach(function(key){
    var btn = document.getElementById('char'+key.charAt(0).toUpperCase()+key.slice(1));
    if(!btn) return;
    var cv = document.createElement('canvas');
    cv.id = 'charPortrait_'+key;
    cv.width = 80; cv.height = 95;
    cv.style.display = 'block';
    cv.style.margin = '0 auto';
    // Replace the icon div
    var icon = btn.querySelector('.charIcon');
    if(icon) btn.replaceChild(cv, icon);
    else btn.prepend(cv);
  });
  animateMenuPortraits();
});

// NPC character builders (used in apartment.js)
function buildMJInApt() {
  if(!aptScene) return;
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  var g=new THREE.Group();
  var body=new THREE.Mesh(new THREE.BoxGeometry(0.62,0.85,0.44),M(0x8B4513));
  body.position.set(0,1.08,0); g.add(body);
  var bump=new THREE.Mesh(new THREE.SphereGeometry(0.26,10,10),M(0x8B4513));
  bump.position.set(0,0.9,0.24); g.add(bump);
  var head=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.46),M(0xf4c48a));
  head.position.set(0,1.78,0); g.add(head);
  var hair=new THREE.Mesh(new THREE.BoxGeometry(0.54,0.28,0.5),M(0xcc4400));
  hair.position.set(0,1.95,0); g.add(hair);
  var hairL=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.34,0.18),M(0xcc4400));
  hairL.position.set(-0.32,1.8,0); g.add(hairL);
  var hairR=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.34,0.18),M(0xcc4400));
  hairR.position.set(0.32,1.8,0); g.add(hairR);
  var eyeM=new THREE.MeshLambertMaterial({color:0x3a2a1a});
  [-0.1,0.1].forEach(function(ex){var e=new THREE.Mesh(new THREE.BoxGeometry(0.07,0.06,0.05),eyeM);e.position.set(ex,1.8,0.24);g.add(e);});
  var armL=new THREE.Mesh(new THREE.BoxGeometry(0.22,0.62,0.24),M(0x8B4513));
  armL.position.set(-0.42,1.07,0); g.add(armL);
  var armR=new THREE.Mesh(new THREE.BoxGeometry(0.22,0.62,0.24),M(0x8B4513));
  armR.position.set(0.42,1.07,0); g.add(armR);
  var legL=new THREE.Mesh(new THREE.BoxGeometry(0.26,0.52,0.28),M(0x334466));
  legL.position.set(-0.16,0.38,0); g.add(legL);
  var legR=new THREE.Mesh(new THREE.BoxGeometry(0.26,0.52,0.28),M(0x334466));
  legR.position.set(0.16,0.38,0); g.add(legR);
  g.position.set(0.4,0.5,-3.5); g.rotation.y=Math.PI*0.1;
  aptScene.add(g);
  aptObjects.mj=g;
}

function buildSarahInApt() {
  if(!aptScene) return;
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  var g=new THREE.Group();
  var body=new THREE.Mesh(new THREE.BoxGeometry(0.58,0.84,0.42),M(0xcc6699));
  body.position.set(0,1.08,0); g.add(body);
  var head=new THREE.Mesh(new THREE.BoxGeometry(0.46,0.46,0.44),M(0xc09060));
  head.position.set(0,1.76,0); g.add(head);
  var hair=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.3,0.48),M(0x1a0500));
  hair.position.set(0,1.93,0); g.add(hair);
  g.position.set(-0.4,0.5,-3.5);
  aptScene.add(g);
  aptObjects.sarah=g;
}
