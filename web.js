// web.js — Screen manager, character select, apartments, UI

var currentScreen = 'menu';
var selectedCharacter = 'peter';

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(function(el){ el.classList.remove('active'); });
  document.getElementById('gameCanvas').style.display = 'none';
  document.getElementById('gameHUD').style.display = 'none';
  if (name === 'menu')       { document.getElementById('sMenu').classList.add('active'); }
  else if (name === 'missions') { document.getElementById('sMissions').classList.add('active'); buildMissionList('story'); }
  else if (name === 'apartments') { document.getElementById('sApartments').classList.add('active'); buildAptGrid(); }
  else if (name === 'game')  { document.getElementById('gameCanvas').style.display='block'; document.getElementById('gameHUD').style.display='block'; }
  else if (name === 'result'){ document.getElementById('sResult').classList.add('active'); document.getElementById('gameCanvas').style.display='none'; document.getElementById('gameHUD').style.display='none'; }
  currentScreen = name;
}

function showToast(msg) {
  var el = document.getElementById('toast');
  el.textContent = msg; el.style.opacity = '1';
  setTimeout(function(){ el.style.opacity = '0'; }, 2800);
}

function selectChar(c, el) {
  selectedCharacter = c;
  document.querySelectorAll('.charBtn').forEach(function(b){ b.classList.remove('active'); });
  el.classList.add('active');
  var names = {peter:'Peter Parker', miles:'Miles Morales', mj:'Mary Jane Watson'};
  document.getElementById('selectedCharLabel').textContent = 'PLAYING AS: ' + names[c].toUpperCase();
  showToast('Character: ' + names[c]);
}

// ── MENU BACKGROUND ──
(function(){
  var c = document.getElementById('menuBg');
  var ctx = c.getContext('2d');
  function resize(){ c.width=innerWidth; c.height=innerHeight; }
  resize(); window.addEventListener('resize',resize);
  var webs=[]; var t=0;
  for(var i=0;i<20;i++) webs.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*0.3,vy:(Math.random()-.5)*0.3,r:Math.random()*80+40,a:Math.random()*Math.PI*2});
  (function draw(){
    requestAnimationFrame(draw); t+=0.008;
    ctx.clearRect(0,0,c.width,c.height);
    // Spider web background
    ctx.strokeStyle='rgba(232,0,28,0.04)'; ctx.lineWidth=1;
    for(var i=0;i<webs.length;i++){
      webs[i].x+=webs[i].vx; webs[i].y+=webs[i].vy;
      if(webs[i].x<0||webs[i].x>c.width)webs[i].vx*=-1;
      if(webs[i].y<0||webs[i].y>c.height)webs[i].vy*=-1;
      for(var j=i+1;j<webs.length;j++){
        var dx=webs[j].x-webs[i].x, dy=webs[j].y-webs[i].y;
        var dist=Math.hypot(dx,dy);
        if(dist<200){ ctx.globalAlpha=(200-dist)/200*0.3; ctx.beginPath();ctx.moveTo(webs[i].x,webs[i].y);ctx.lineTo(webs[j].x,webs[j].y);ctx.stroke(); }
      }
      // Web node
      ctx.globalAlpha=0.15; ctx.fillStyle='#e8001c';
      ctx.beginPath(); ctx.arc(webs[i].x,webs[i].y,2,0,Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha=1;
    // Subtle spider silhouette
    var cx=c.width/2, cy=c.height*0.35;
    ctx.globalAlpha=0.03; ctx.fillStyle='#e8001c';
    ctx.beginPath(); ctx.arc(cx,cy,120,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=1;
  })();
})();

// ── APARTMENTS ──
var APARTMENTS = [
  {icon:'🏠',name:"Peter & MJ's Shared Apartment", desc:'Peter and MJ live here together — nursery, baby crib, playroom, MJ\'s camera gear, Peter\'s Spider-Man suit case, and clothes for the baby',color:'#1a0010',fn:'peter_mj'},
  {icon:'🏢',name:"Miles Morales' Apartment",desc:"Rio's cooking on the stove, Miles' art on walls",color:'#001a10',fn:'miles'},
  {icon:'🎓',name:"Ned Leeds' Apartment",    desc:'Lego sets, laptop, Star Wars posters',           color:'#0a0a0a',fn:'ned'},
  {icon:'👴',name:"Uncle Ben's House",        desc:"Ben is ALIVE — workshop full of projects",      color:'#1a0800',fn:'uncle_ben'},
  {icon:'🏡',name:"Aunt May's House",         desc:'F.E.A.S.T. flyers, home cooking smells',        color:'#1a1000',fn:'aunt_may'},
  {icon:'🎨',name:"Miles' Dad's Precinct",   desc:"Jefferson Davis is alive — cop desk, family photos", color:'#001010',fn:'jefferson'},
  {icon:'👴',name:"Uncle Aaron's Place",      desc:'Uncle Aaron is ALIVE — music gear, boxing bag', color:'#100010',fn:'uncle_aaron'},
  {icon:'✏️',name:"Stan Lee's Cameo Room",    desc:"'Nuff Said! Stan's memorabilia and autographs", color:'#100010',fn:'stan_lee'},
];

function buildAptGrid(){
  var grid=document.getElementById('aptGrid'); grid.innerHTML='';
  APARTMENTS.forEach(function(apt){
    var d=document.createElement('div'); d.className='aptCard';
    d.innerHTML='<div class="aptCardImg" style="background:linear-gradient(135deg,'+apt.color+',#0a0a0a)">'+apt.icon+'</div>'
      +'<div class="aptCardBody"><div class="aptCardName">'+apt.name+'</div><div class="aptCardDesc">'+apt.desc+'</div></div>';
    d.onclick=function(){ startApartmentVisit(apt.fn, apt.name); };
    grid.appendChild(d);
  });
}

function startApartmentVisit(name, label){
  currentMission = {name:'Visiting: '+label, objective:'Explore the apartment', type:'explore', location:name};
  document.getElementById('mHUDName').textContent='Visiting: '+label;
  document.getElementById('mHUDObj').textContent='Explore the apartment';
  launchGame();
}

var currentMission = {name:'Free Roam',objective:'Swing around New York City',type:'freeroam'};
function startFreeRoam(){
  currentMission={name:'Free Roam NYC',objective:'Swing between skyscrapers · No objectives',type:'freeroam'};
  document.getElementById('mHUDName').textContent='Free Roam — New York City';
  document.getElementById('mHUDObj').textContent='Swing anywhere · SPACE or RT to shoot web';
  launchGame();
}
