// villains.js — All villains from Insomniac, Amazing Spider-Man 2, movies

var VILLAIN_DATA = {
  'Kingpin':       {color:0xeeeeee,h:4.5,w:2.5,hp:800, speed:3,  icon:'👑', dmg:35},
  'Electro':       {color:0x00ffff,h:2.2,w:0.8,hp:500, speed:8,  icon:'⚡', dmg:40},
  'Vulture':       {color:0x446644,h:2.0,w:3.0,hp:450, speed:12, icon:'🦅', dmg:30},
  'Rhino':         {color:0x888888,h:3.0,w:2.2,hp:900, speed:6,  icon:'🦏', dmg:50},
  'Doctor Octopus':{color:0x333355,h:2.2,w:0.9,hp:600, speed:5,  icon:'🐙', dmg:35},
  'Venom':         {color:0x111111,h:2.8,w:1.4,hp:700, speed:7,  icon:'⚫', dmg:45},
  'Green Goblin':  {color:0x226622,h:2.2,w:0.9,hp:550, speed:14, icon:'🟢', dmg:40},
  'Carnage':       {color:0xcc0000,h:2.5,w:1.0,hp:650, speed:10, icon:'💀', dmg:50},
  'Scorpion':      {color:0x228822,h:2.4,w:0.9,hp:500, speed:7,  icon:'🦂', dmg:38},
  'Mysterio':      {color:0x4444aa,h:2.2,w:0.9,hp:400, speed:5,  icon:'🌫️', dmg:28},
  'Shocker':       {color:0xffaa00,h:2.2,w:1.0,hp:480, speed:4,  icon:'🔌', dmg:32},
  'Mister Negative':{color:0x1a0028,h:2.2,w:0.9,hp:520,speed:5, icon:'🌙', dmg:36},
  'Hammerhead':    {color:0x666666,h:2.4,w:1.1,hp:580, speed:8,  icon:'🤖', dmg:42},
  'Silver Sable':  {color:0xcccccc,h:2.0,w:0.8,hp:420, speed:9,  icon:'💃', dmg:30},
  'Tombstone':     {color:0xdddddd,h:2.6,w:1.2,hp:680, speed:5,  icon:'⚔️', dmg:44},
  'Tinkerer':      {color:0x554433,h:2.0,w:0.85,hp:450,speed:6,  icon:'🎪', dmg:28},
  'Screwball':     {color:0xff44cc,h:2.0,w:0.8,hp:300, speed:10, icon:'🪲', dmg:20},
  'Inner Demons':  {color:0x220022,h:2.0,w:0.85,hp:200,speed:5,  icon:'🐉', dmg:18},
  'Roxxon Guards': {color:0x443322,h:2.0,w:0.85,hp:180,speed:4,  icon:'🛡️', dmg:15},
  'Kingpin Thugs': {color:0x333333,h:2.0,w:0.85,hp:150,speed:4,  icon:'🕵️', dmg:12},
  'Random Criminals':{color:0x333333,h:2.0,w:0.85,hp:120,speed:4,icon:'👊',dmg:10},
  'Multiple Villains':{color:0x444444,h:2.0,w:0.9,hp:300,speed:5,icon:'☠️', dmg:25},
  'Jackal':        {color:0x334433,h:2.2,w:0.9,hp:480, speed:8,  icon:'🐺', dmg:32},
  'Wraith':        {color:0x222244,h:2.0,w:0.8,hp:380, speed:7,  icon:'🏙️', dmg:26},
  'Smythe':        {color:0x445544,h:1.8,w:2.0,hp:520, speed:5,  icon:'🕷️', dmg:35},
  'Crime Master':  {color:0x332211,h:2.0,w:0.9,hp:350, speed:5,  icon:'🃏', dmg:22},
  'Black Cat':     {color:0xffffff,h:1.9,w:0.8,hp:320, speed:8,  icon:'🐱', dmg:24},
  'Superior Spider-Man':{color:0x222266,h:2.0,w:0.9,hp:600,speed:8,icon:'🤖',dmg:35},
  'Swarm':         {color:0xffcc00,h:2.5,w:2.5,hp:420, speed:6,  icon:'🐝', dmg:28},
  'Cletus Kasady': {color:0xcc0000,h:2.0,w:0.85,hp:300,speed:6,  icon:'🔥', dmg:22},
  'SHIELD':        {color:0x224488,h:2.0,w:0.9,hp:200, speed:5,  icon:'🛡️', dmg:18},
  'Corrupt Officials':{color:0x443322,h:2.0,w:0.9,hp:160,speed:3,icon:'🏛️',dmg:10},
  'Tinkerer':      {color:0x554433,h:2.0,w:0.85,hp:450,speed:6,  icon:'🎪', dmg:28},
};

var villainInstances = [];

function spawnVillain(villainName){
  var data = VILLAIN_DATA[villainName] || VILLAIN_DATA['Random Criminals'];
  var count = 1;
  if(villainName==='Multiple Villains') count=5;
  else if(villainName==='Kingpin Thugs'||villainName==='Inner Demons'||villainName==='Roxxon Guards'||villainName==='Random Criminals') count=8;

  for(var i=0;i<count;i++){
    var angle=Math.random()*Math.PI*2;
    var dist=30+Math.random()*80;
    var x=player.pos.x+Math.cos(angle)*dist;
    var z=player.pos.z+Math.sin(angle)*dist;
    createVillainInstance(villainName, data, x, z);
  }
}

function createVillainInstance(name, data, x, z){
  var g=new THREE.Group();

  // Body
  var body=new THREE.Mesh(new THREE.BoxGeometry(data.w*0.6,data.h*0.6,data.w*0.5),new THREE.MeshLambertMaterial({color:data.color}));
  body.position.y=data.h*0.3; body.castShadow=true; g.add(body);

  // Head
  var headMat=new THREE.MeshLambertMaterial({color:data.color});
  var head=new THREE.Mesh(new THREE.BoxGeometry(data.w*0.45,data.w*0.45,data.w*0.42),headMat);
  head.position.y=data.h*0.7; head.castShadow=true; g.add(head);

  // Villain-specific features
  if(name==='Kingpin'){
    // White suit, very wide
    body.scale.x=1.6; body.scale.z=1.4;
    var suit=new THREE.Mesh(new THREE.BoxGeometry(data.w*0.7,data.h*0.55,data.w*0.52),new THREE.MeshLambertMaterial({color:0xffffff}));
    suit.position.y=data.h*0.32; g.add(suit);
  } else if(name==='Electro'){
    // Electric aura
    var aura=new THREE.PointLight(0x00ffff,1,8);
    aura.position.y=data.h*0.5; g.add(aura);
    body.material=new THREE.MeshLambertMaterial({color:0x003355,emissive:new THREE.Color(0x001122)});
  } else if(name==='Vulture'){
    // Wings
    var wMat=new THREE.MeshLambertMaterial({color:0x445544});
    [-1,1].forEach(function(s){
      var wing=new THREE.Mesh(new THREE.BoxGeometry(3.5,0.2,1.2),wMat);
      wing.position.set(s*2,data.h*0.5,0); wing.rotation.z=s*0.3; g.add(wing);
    });
  } else if(name==='Venom'||name==='Carnage'){
    var tongueColor=name==='Venom'?0xcc0000:0xff4400;
    var tongue=new THREE.Mesh(new THREE.BoxGeometry(0.1,0.3,0.4),new THREE.MeshLambertMaterial({color:tongueColor}));
    tongue.position.set(0,data.h*0.62,data.w*0.22); g.add(tongue);
    var eyeMat=new THREE.MeshBasicMaterial({color:0xffffff});
    [-0.15,0.15].forEach(function(ex){
      var eye=new THREE.Mesh(new THREE.BoxGeometry(0.15,0.08,0.08),eyeMat);
      eye.position.set(ex,data.h*0.72,data.w*0.22); g.add(eye);
    });
  } else if(name==='Doctor Octopus'){
    // Tentacles
    var tMat=new THREE.MeshLambertMaterial({color:0x555555});
    for(var t=0;t<4;t++){
      var ang=t/4*Math.PI*2;
      var tentacle=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.12,1.8,6),tMat);
      tentacle.position.set(Math.cos(ang)*0.5,data.h*0.35,Math.sin(ang)*0.5);
      tentacle.rotation.x=Math.PI/3;
      tentacle.rotation.y=ang; g.add(tentacle);
    }
  } else if(name==='Green Goblin'){
    // Glider
    var glider=new THREE.Mesh(new THREE.BoxGeometry(1.6,0.15,0.7),new THREE.MeshLambertMaterial({color:0x226622}));
    glider.position.y=0; g.add(glider);
    var thruster=new THREE.PointLight(0x44ff44,0.6,4);
    thruster.position.y=-0.3; g.add(thruster);
  } else if(name==='Rhino'){
    // Horn
    var horn=new THREE.Mesh(new THREE.ConeGeometry(0.12,0.6,6),new THREE.MeshLambertMaterial({color:0x777777}));
    horn.rotation.x=Math.PI/2; horn.position.set(0,data.h*0.72,data.w*0.22); g.add(horn);
    body.scale.x=1.4; body.scale.z=1.3;
  }

  // HP bar above head
  var hpBarBg=new THREE.Mesh(new THREE.PlaneGeometry(1.5,0.18),new THREE.MeshBasicMaterial({color:0x333333,depthTest:false}));
  hpBarBg.position.set(0,data.h+0.5,0); g.add(hpBarBg);
  var hpBarFill=new THREE.Mesh(new THREE.PlaneGeometry(1.4,0.13),new THREE.MeshBasicMaterial({color:0xe8001c,depthTest:false}));
  hpBarFill.position.set(0,data.h+0.5,0.01); g.add(hpBarFill);

  g.position.set(x,0,z);
  scene.add(g);
  villainInstances.push({
    pos:new THREE.Vector3(x,0,z),
    mesh:g, hpFill:hpBarFill,
    name:name, data:data,
    hp:data.hp, maxHp:data.hp,
    alive:true,
    state:'patrol',
    moveCd:0, moveDir:new THREE.Vector3(),
    attackCd:0,
    flying: (name==='Vulture'||name==='Green Goblin'),
    floatY: 0, floatT: Math.random()*Math.PI*2,
    yaw:Math.random()*Math.PI*2,
  });
}

function updateVillains(dt){
  var now=performance.now();
  villainInstances.forEach(function(v){
    if(!v.alive)return;

    v.floatT+=dt;
    var targetY = v.flying ? 40+Math.sin(v.floatT*0.8)*8 : 0;
    v.pos.y+=(targetY-v.pos.y)*dt*2;

    // AI
    var dToPlayer=v.pos.distanceTo(player.pos);
    if(dToPlayer<100){v.state='chase';}
    else{v.state='patrol';}

    v.moveCd-=dt;
    if(v.moveCd<=0){
      v.moveCd=0.3+Math.random()*0.5;
      if(v.state==='chase'){
        var toP=player.pos.clone().sub(v.pos).normalize();
        v.moveDir.copy(toP);
        v.yaw=Math.atan2(toP.x,toP.z);
      } else {
        var a=Math.random()*Math.PI*2;
        v.moveDir.set(Math.sin(a),0,Math.cos(a));
      }
    }
    var spd=v.data.speed*(v.state==='chase'?1:0.4)*dt;
    v.pos.x+=v.moveDir.x*spd;
    v.pos.z+=v.moveDir.z*spd;
    v.pos.x=Math.max(-550,Math.min(550,v.pos.x));
    v.pos.z=Math.max(-550,Math.min(550,v.pos.z));

    v.mesh.position.copy(v.pos);
    v.mesh.rotation.y=v.yaw;

    // Attack player
    v.attackCd-=dt;
    if(dToPlayer<12&&v.attackCd<=0&&v.state==='chase'){
      v.attackCd=2.0+Math.random();
      playerTakeDamage(v.data.dmg);
      addKillFeed(v.name+' attacked you!');
    }

    // HP bar scale
    var hpPct=v.hp/v.maxHp;
    v.hpFill.scale.x=Math.max(0,hpPct);
    v.hpFill.position.x=(hpPct-1)*0.7;
  });
}

function hitVillain(villainInstance, dmg){
  if(!villainInstance.alive)return;
  villainInstance.hp-=dmg;
  playerAttack();
  if(villainInstance.hp<=0){
    villainInstance.alive=false;
    villainInstance.mesh.visible=false;
    player.defeated++;
    player.score+=500+(player.combo*50);
    addKillFeed('✓ Defeated '+villainInstance.name+'!');
    showToast('🕷️ Defeated '+villainInstance.name+'!');
    if(villainInstances.filter(function(v){return v.alive;}).length===0){
      setTimeout(function(){endMission(true);},1500);
    }
  }
}

// Auto-attack when close enough and moving fast (web strike)
function checkWebStrike(){
  if(!webState.active)return;
  villainInstances.forEach(function(v){
    if(!v.alive)return;
    var d=player.pos.distanceTo(v.pos);
    if(d<8&&player.vel.length()>15){
      hitVillain(v,50);
      spawnWebImpact(v.pos.clone().add(new THREE.Vector3(0,1.5,0)));
    }
  });
}

function addKillFeed(msg){
  var kf=document.getElementById('killFeed');
  var el=document.createElement('div');el.className='kfe';el.textContent=msg;
  kf.prepend(el);setTimeout(function(){el.remove();},3500);
}
