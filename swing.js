// swing.js — Web swinging physics, player movement, combat, game loop

var renderer, scene, camera, camPivot;
var gameRunning=false, lastT=0;
var keys={}, mouseLocked=false, dragLooking=false, lastMX=0, lastMY=0;
var gameStartTime=0;

// Player state
var player={
  pos:new THREE.Vector3(0,80,0),
  vel:new THREE.Vector3(0,0,0),
  yaw:0, pitch:-0.3,
  hp:100, webFluid:100, maxHp:100, maxWebFluid:100,
  alive:true, onGround:false, swinging:false,
  combo:0, score:0, bestCombo:0, defeated:0,
  mesh:null,
};

// Web swing state
var webState={
  active:false,
  anchor:null,      // THREE.Vector3 of current anchor
  length:0,         // rope length
  mesh:null,        // line showing the web
};
var webLines=[]; // all web lines in scene

// Physics
var GRAVITY = -18;
var WEB_SPEED = 0.4; // web shooting speed (affects momentum)

function launchGame(){
  if(renderer){ try{renderer.dispose();}catch(e){} }
  var canvas=document.getElementById('gameCanvas');
  canvas.width=innerWidth; canvas.height=innerHeight;

  renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.setSize(innerWidth,innerHeight);
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.xr.enabled=true;
  renderer.fog=new THREE.FogExp2(0x0a0a1a,0.0015);

  scene=new THREE.Scene();
  scene.background=new THREE.Color(0x0a0a1a);
  camera=new THREE.PerspectiveCamera(80,innerWidth/innerHeight,0.1,1000);
  camPivot=new THREE.Object3D(); scene.add(camPivot); camPivot.add(camera);
  camera.position.set(0,0,0);

  // Lighting
  scene.add(new THREE.AmbientLight(0x223344,0.7));
  var sun=new THREE.DirectionalLight(0xffeedd,1.2);
  sun.position.set(200,400,100); sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);
  sun.shadow.camera.left=-500; sun.shadow.camera.right=500;
  sun.shadow.camera.top=500; sun.shadow.camera.bottom=-500; sun.shadow.camera.far=800;
  scene.add(sun);
  scene.add(Object.assign(new THREE.DirectionalLight(0x4466aa,0.3),{position:new THREE.Vector3(-100,200,-100)}));
  scene.add(new THREE.HemisphereLight(0x223355,0x1a1a1a,0.4));

  // Build city
  buildCity();

  // Build current enemy based on mission
  if(currentMission && currentMission.villain) spawnVillain(currentMission.villain);

  // Player
  player.pos.set(0,80,0);
  player.vel.set(0,0,0);
  player.hp=100; player.webFluid=100;
  player.yaw=0; player.pitch=-0.2;
  player.alive=true; player.swinging=false;
  player.combo=0; player.score=0; player.bestCombo=0; player.defeated=0;
  player.mesh=buildSpiderManMesh();
  player.mesh.visible=false;
  scene.add(player.mesh);

  // Web state
  webState.active=false; webState.anchor=null;
  webLines.forEach(function(l){scene.remove(l);}); webLines=[];

  gameStartTime=performance.now();
  gameRunning=true; lastT=performance.now();
  renderer.setAnimationLoop(gameLoop);
  showScreen('game');
  initVR();
}

function gameLoop(ts){
  if(!gameRunning)return;
  var dt=Math.min((ts-lastT)/1000,0.05); lastT=ts;
  if(inVR) updateVRInput();
  updateSpiderMan(dt);
  updateVillains(dt);
  updateParticles(dt);
  updateWebLines(dt);
  renderMinimap();
  updateHUD();
  renderer.render(scene,camera);
}

// ── SPIDERMAN MOVEMENT + SWINGING ──
function updateSpiderMan(dt){
  if(!player.alive)return;
  var now=performance.now();

  // Web swing physics
  if(webState.active && webState.anchor){
    var toAnchor=webState.anchor.clone().sub(player.pos);
    var dist=toAnchor.length();
    // Pendulum constraint
    if(dist > webState.length){
      var dir=toAnchor.normalize();
      var radialVel=player.vel.dot(dir);
      if(radialVel<0) player.vel.addScaledVector(dir,-radialVel*1.02);
    }
    // Swing momentum boost when swinging down
    if(player.pos.y < webState.anchor.y) player.vel.y-=0.5*dt;
  }

  // Gravity
  player.vel.y+=GRAVITY*dt;

  // Movement controls
  if(!inVR){
    var fw=new THREE.Vector3(-Math.sin(player.yaw),0,-Math.cos(player.yaw));
    var rt=new THREE.Vector3(Math.cos(player.yaw),0,-Math.sin(player.yaw));
    var airControl=webState.active?1.2:0.6;
    if(keys['w']||keys['arrowup'])    player.vel.addScaledVector(fw, 12*dt*airControl);
    if(keys['s']||keys['arrowdown'])  player.vel.addScaledVector(fw,-8*dt*airControl);
    if(keys['a']||keys['arrowleft'])  player.vel.addScaledVector(rt,-10*dt*airControl);
    if(keys['d']||keys['arrowright']) player.vel.addScaledVector(rt, 10*dt*airControl);
  }

  // Drag / air resistance
  player.vel.x*=webState.active?0.995:0.97;
  player.vel.z*=webState.active?0.995:0.97;

  // Integrate
  player.pos.addScaledVector(player.vel,dt);

  // Ground collision
  if(player.pos.y<2){
    player.pos.y=2;
    if(player.vel.y<0){
      if(player.vel.y<-15) playerTakeDamage((Math.abs(player.vel.y)-15)*2);
      player.vel.y=0; player.onGround=true;
      if(webState.active) releaseWeb();
    }
  } else { player.onGround=false; }

  // Boundary
  player.pos.x=Math.max(-580,Math.min(580,player.pos.x));
  player.pos.z=Math.max(-580,Math.min(580,player.pos.z));

  // Shoot web — SPACE or LMB
  if((keys[' ']||keys['lmb'])&&!webState.active&&player.webFluid>0){
    shootWeb();
  }
  if(keys['e']&&webState.active) releaseWeb();
  if(keys['f']) jump();
  if(keys['q']) webZip();

  // Update camera
  if(!inVR){
    var camOffset=webState.active?new THREE.Vector3(0,2,-8):new THREE.Vector3(0,1.5,-4);
    camPivot.position.copy(player.pos).add(new THREE.Vector3(0,1.5,0));
    camPivot.rotation.y=player.yaw;
    camera.rotation.x=player.pitch;
  }

  // Update web line if swinging
  if(webState.active&&webState.anchor&&webState.mesh){
    var pts=[player.pos.clone(),webState.anchor.clone()];
    webState.mesh.geometry.setFromPoints(pts);
    webState.mesh.geometry.attributes.position.needsUpdate=true;
  }

  // Web fluid regen
  if(!webState.active&&player.webFluid<100) player.webFluid=Math.min(100,player.webFluid+10*dt);

  // Update player mesh
  if(player.mesh){
    player.mesh.position.copy(player.pos);
    player.mesh.rotation.y=player.yaw;
  }

  // Tip display
  var tip=document.getElementById('swingTip');
  if(!webState.active&&player.pos.y>20){
    tip.textContent='SPACE — shoot web · E — release · F — wall jump';
    tip.style.opacity='1';
  } else if(webState.active){
    tip.textContent='WASD — steer · E — release web · gain speed by swinging down!';
    tip.style.opacity='1';
  } else { tip.style.opacity='0'; }
}

function shootWeb(){
  // Find nearest anchor in front of player
  var fw=new THREE.Vector3(-Math.sin(player.yaw),Math.sin(player.pitch),-Math.cos(player.yaw)).normalize();
  var best=null, bestScore=-Infinity;
  webAnchors.forEach(function(a){
    var toA=a.clone().sub(player.pos);
    var dist=toA.length();
    if(dist<5||dist>220) return;
    var dir=toA.normalize();
    var dot=fw.dot(dir);
    if(dot<0.2) return;
    // Score = closeness in forward direction, bonus for height
    var score=dot*100 - dist*0.3 + (a.y-player.pos.y)*0.5;
    if(score>bestScore){ bestScore=score; best=a; }
  });
  if(!best) return;

  webState.active=true;
  webState.anchor=best.clone();
  webState.length=player.pos.distanceTo(best)*0.9;

  // Add initial momentum toward anchor
  var impulse=best.clone().sub(player.pos).normalize().multiplyScalar(18);
  impulse.y=Math.abs(impulse.y)+4;
  player.vel.add(impulse);
  player.swinging=true;

  // Draw web line
  var geo=new THREE.BufferGeometry().setFromPoints([player.pos.clone(),best.clone()]);
  var mat=new THREE.LineBasicMaterial({color:0xcccccc,linewidth:1});
  webState.mesh=new THREE.Line(geo,mat);
  scene.add(webState.mesh);
  webLines.push(webState.mesh);

  player.webFluid=Math.max(0,player.webFluid-8);
  showToast('🕸️ Web attached!');
}

function releaseWeb(){
  if(webState.mesh){ scene.remove(webState.mesh); webState.mesh=null; }
  webState.active=false; webState.anchor=null;
  player.swinging=false;
  // Release boost
  player.vel.y+=4;
}

function jump(){
  if(player.onGround||player.pos.y<5){
    player.vel.y=14;
    player.onGround=false;
  } else if(webState.active){
    // Swing launch
    var speed=player.vel.length();
    player.vel.normalize().multiplyScalar(speed+8);
    player.vel.y+=6;
    releaseWeb();
  }
}

function webZip(){
  // Quick zip to nearest anchor above
  var above=null, bestDist=Infinity;
  webAnchors.forEach(function(a){
    if(a.y<player.pos.y+20) return;
    var d=Math.hypot(a.x-player.pos.x,a.z-player.pos.z);
    if(d<50&&a.y-player.pos.y<200&&d<bestDist){ bestDist=d; above=a; }
  });
  if(!above) return;
  // Zip instantly toward it
  var dir=above.clone().sub(player.pos).normalize();
  player.vel.copy(dir.multiplyScalar(35));
}

function updateWebLines(dt){
  // Fade old web lines
  for(var i=webLines.length-1;i>=0;i--){
    var l=webLines[i];
    if(l===webState.mesh) continue;
    l.material.opacity-=dt*0.4;
    if(l.material.opacity<=0){ scene.remove(l); webLines.splice(i,1); }
  }
}

function playerTakeDamage(dmg){
  if(!player.alive)return;
  player.hp-=dmg; if(player.hp<0)player.hp=0;
  player.combo=0;
  var df=document.getElementById('dmgFlash');
  df.style.opacity=Math.min(1,dmg/20);
  setTimeout(function(){df.style.opacity=0;},150);
  if(player.hp<=0){player.alive=false;endMission(false);}
}

function playerAttack(){
  player.combo++;
  if(player.combo>player.bestCombo) player.bestCombo=player.combo;
  player.score+=player.combo*10;
  var comboHUD=document.getElementById('comboHUD');
  document.getElementById('comboDisplay').textContent=player.combo;
  comboHUD.style.opacity='1';
  clearTimeout(player._comboTimeout);
  player._comboTimeout=setTimeout(function(){comboHUD.style.opacity='0';player.combo=0;},2000);
}

function endMission(success){
  gameRunning=false;
  renderer.setAnimationLoop(null);
  if(!inVR)document.exitPointerLock();
  var survived=Math.round((performance.now()-gameStartTime)/1000);
  document.getElementById('resultTitle').textContent=success?'MISSION COMPLETE':'MISSION FAILED';
  document.getElementById('resultTitle').style.color=success?'#e8001c':'#888';
  document.getElementById('rCombo').textContent=player.bestCombo;
  document.getElementById('rDefeated').textContent=player.defeated;
  document.getElementById('rTime').textContent=survived+'s';
  showScreen('result');
}

// ── HUD ──
var mmC_,mmX_;
function renderMinimap(){
  if(!mmC_){mmC_=document.getElementById('mmCanvas');mmX_=mmC_.getContext('2d');}
  var MMS=80, SC=MMS/CITY_SIZE*1.2;
  var cx=player.pos.x, cz=player.pos.z;
  mmX_.clearRect(0,0,MMS,MMS);
  mmX_.fillStyle='rgba(0,0,0,.85)';mmX_.fillRect(0,0,MMS,MMS);
  // Player dot
  mmX_.beginPath();mmX_.arc(MMS/2,MMS/2,4,0,Math.PI*2);
  mmX_.fillStyle='#e8001c';mmX_.fill();
  // Enemies
  villainInstances.forEach(function(v){
    var dx=(v.pos.x-cx)*SC, dz=(v.pos.z-cz)*SC;
    mmX_.beginPath();mmX_.arc(MMS/2+dx,MMS/2+dz,3,0,Math.PI*2);
    mmX_.fillStyle='#ff8800';mmX_.fill();
  });
}
function updateHUD(){
  document.getElementById('hpFill').style.width=Math.max(0,player.hp/player.maxHp*100)+'%';
  document.getElementById('webFill').style.width=Math.max(0,player.webFluid/player.maxWebFluid*100)+'%';
  document.getElementById('hpVal').textContent=Math.ceil(Math.max(0,player.hp));
  document.getElementById('webVal').textContent=Math.ceil(Math.max(0,player.webFluid));
  document.getElementById('comboN').textContent=player.combo;
  document.getElementById('enemiesN').textContent=villainInstances.filter(function(v){return v.alive;}).length;
  document.getElementById('scoreN').textContent=player.score;
}

// ── INPUT ──
document.addEventListener('keydown',function(e){keys[e.key.toLowerCase()]=true;if(e.key===' ')e.preventDefault();});
document.addEventListener('keyup',  function(e){keys[e.key.toLowerCase()]=false;});
document.addEventListener('mousedown',function(e){
  if(e.button===0)keys['lmb']=true;
  if(currentScreen==='game'&&!mouseLocked&&!inVR){dragLooking=true;lastMX=e.clientX;lastMY=e.clientY;e.preventDefault();}
});
document.addEventListener('mouseup',function(e){if(e.button===0)keys['lmb']=false;dragLooking=false;});
document.addEventListener('contextmenu',function(e){if(currentScreen==='game')e.preventDefault();});
document.addEventListener('mousemove',function(e){
  if(currentScreen!=='game'||inVR)return;
  if(mouseLocked){player.yaw-=e.movementX*.002;player.pitch=Math.max(-1.2,Math.min(0.8,player.pitch-e.movementY*.002));}
  else if(dragLooking){var dx=e.clientX-lastMX,dy=e.clientY-lastMY;lastMX=e.clientX;lastMY=e.clientY;player.yaw-=dx*.004;player.pitch=Math.max(-1.2,Math.min(0.8,player.pitch-dy*.004));}
});
document.addEventListener('pointerlockchange',function(){mouseLocked=!!document.pointerLockElement;document.getElementById('lh').style.opacity=mouseLocked?0:1;});
document.getElementById('gameCanvas').addEventListener('click',function(){if(currentScreen==='game'&&!mouseLocked&&!inVR)document.getElementById('gameCanvas').requestPointerLock();});
window.addEventListener('resize',function(){if(!renderer)return;camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});

// ── PARTICLES ──
var particles=[];
function spawnWebImpact(pos){
  for(var i=0;i<6;i++){
    var m=new THREE.Mesh(new THREE.SphereGeometry(0.05,4,4),new THREE.MeshBasicMaterial({color:0xcccccc,transparent:true,opacity:.8}));
    m.position.copy(pos);scene.add(m);
    var vel=new THREE.Vector3((Math.random()-.5)*4,(Math.random()-.5)*4,(Math.random()-.5)*4);
    particles.push({m:m,vel:vel,life:.4});
  }
}
function updateParticles(dt){
  for(var i=particles.length-1;i>=0;i--){
    var p=particles[i];
    p.vel.y+=GRAVITY*dt*.3;
    p.m.position.addScaledVector(p.vel,dt);
    p.life-=dt*2.5;
    p.m.material.opacity=Math.max(0,p.life);
    if(p.life<=0){scene.remove(p.m);particles.splice(i,1);}
  }
}
