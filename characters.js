// characters.js — Spider-Man suit mesh, NPC characters (MJ, Miles, Ned, Stan Lee, Uncle Ben, etc.)

function buildSpiderManMesh(){
  var g=new THREE.Group();
  var M=function(c,e){ return new THREE.MeshLambertMaterial({color:c,emissive:e?new THREE.Color(e):undefined}); };

  var suitColor = selectedCharacter==='miles' ? 0x111133 : 0xe8001c;
  var webColor  = selectedCharacter==='miles' ? 0xcc0000 : 0x0000cc;
  var eyeColor  = selectedCharacter==='miles' ? 0xffffff : 0xe8f0ff;

  // Torso
  var torso=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.92,0.46),M(suitColor));
  torso.position.set(0,1.1,0);torso.castShadow=true;g.add(torso);

  // Web pattern (chest spider)
  var spider=new THREE.Mesh(new THREE.PlaneGeometry(0.5,0.5),M(webColor,0x000022));
  spider.position.set(0,1.25,0.235);g.add(spider);

  // Head
  var head=new THREE.Mesh(new THREE.BoxGeometry(0.56,0.54,0.5),M(suitColor));
  head.position.set(0,1.86,0);head.castShadow=true;g.add(head);

  // Eyes (big Spider-Man lenses)
  var eyeM=new THREE.MeshLambertMaterial({color:eyeColor,emissive:new THREE.Color(0x224488)});
  [-0.16,0.16].forEach(function(ex){
    var eye=new THREE.Mesh(new THREE.BoxGeometry(0.2,0.14,0.08),eyeM);
    eye.position.set(ex,1.9,0.25);g.add(eye);
  });

  // Legs
  var legMat=M(suitColor);
  var legL=new THREE.Mesh(new THREE.BoxGeometry(0.28,0.82,0.3),legMat);
  legL.position.set(-0.2,0.5,0);legL.castShadow=true;g.add(legL);
  var legR=new THREE.Mesh(new THREE.BoxGeometry(0.28,0.82,0.3),legMat);
  legR.position.set(0.2,0.5,0);legR.castShadow=true;g.add(legR);

  // Boots
  var bootMat=M(webColor);
  var bL=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.22,0.38),bootMat);bL.position.set(-0.2,0.12,0.04);g.add(bL);
  var bR=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.22,0.38),bootMat);bR.position.set(0.2,0.12,0.04);g.add(bR);

  // Arms
  var armL=new THREE.Mesh(new THREE.BoxGeometry(0.25,0.7,0.27),M(suitColor));
  armL.position.set(-0.48,1.06,0);armL.castShadow=true;g.add(armL);
  var armR=new THREE.Mesh(new THREE.BoxGeometry(0.25,0.7,0.27),M(suitColor));
  armR.position.set(0.48,1.06,0);armR.castShadow=true;g.add(armR);

  // Gloves
  var gloveM=M(webColor);
  var gL=new THREE.Mesh(new THREE.BoxGeometry(0.24,0.22,0.26),gloveM);gL.position.set(-0.48,0.68,0);g.add(gL);
  var gR=new THREE.Mesh(new THREE.BoxGeometry(0.24,0.22,0.26),gloveM);gR.position.set(0.48,0.68,0);g.add(gR);

  // Miles' electrical aura
  if(selectedCharacter==='miles'){
    var aura=new THREE.PointLight(0x0044ff,0.5,4);
    aura.position.set(0,1,0);g.add(aura);
  }

  g._legL=legL;g._legR=legR;g._armL=armL;g._armR=armR;
  return g;
}

// ── NPC CHARACTERS ──
var npcCharacters=[];

function buildMJCharacter(x,z){
  var g=new THREE.Group();
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  // Body — MJ is visibly pregnant
  var body=new THREE.Mesh(new THREE.BoxGeometry(0.65,0.88,0.48),M(0x8B4513));
  body.position.set(0,1.08,0);g.add(body);
  // Baby bump
  var bump=new THREE.Mesh(new THREE.SphereGeometry(0.28,8,8),M(0x8B4513));
  bump.position.set(0,0.95,0.26);g.add(bump);
  // Head
  var head=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.46),M(0xf4c48a));
  head.position.set(0,1.8,0);g.add(head);
  // Red hair
  var hair=new THREE.Mesh(new THREE.BoxGeometry(0.56,0.28,0.52),M(0xcc4400));
  hair.position.set(0,1.98,0);g.add(hair);
  // Camera (MJ is a journalist)
  var camera_=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.24,0.18),M(0x222222));
  camera_.position.set(0.5,1.1,0.2);g.add(camera_);
  g.position.set(x,0,z);scene.add(g);
  npcCharacters.push({name:'Mary Jane Watson',mesh:g,pos:new THREE.Vector3(x,0,z)});
}

function buildMilesNPCCharacter(x,z){
  var g=new THREE.Group();
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  var body=new THREE.Mesh(new THREE.BoxGeometry(0.62,0.88,0.44),M(0x1a1a2a));
  body.position.set(0,1.08,0);g.add(body);
  var head=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.46),M(0x5c3a1e));
  head.position.set(0,1.8,0);g.add(head);
  // Miles' hoodie (if not in suit)
  var hood=new THREE.Mesh(new THREE.BoxGeometry(0.58,0.22,0.52),M(0x2a2a3a));
  hood.position.set(0,1.98,0);g.add(hood);
  // Earbuds
  var earbud=new THREE.Mesh(new THREE.SphereGeometry(0.04,6,6),new THREE.MeshLambertMaterial({color:0xffffff}));
  earbud.position.set(-0.26,1.8,0.15);g.add(earbud);
  g.position.set(x,0,z);scene.add(g);
  npcCharacters.push({name:'Miles Morales',mesh:g,pos:new THREE.Vector3(x,0,z)});
}

function buildNedCharacter(x,z){
  var g=new THREE.Group();
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  // Ned is bigger
  var body=new THREE.Mesh(new THREE.BoxGeometry(0.9,0.9,0.6),M(0x4444aa));
  body.position.set(0,1.1,0);g.add(body);
  var head=new THREE.Mesh(new THREE.BoxGeometry(0.6,0.55,0.52),M(0xf0c080));
  head.position.set(0,1.82,0);g.add(head);
  // Glasses
  var glassesMat=new THREE.MeshBasicMaterial({color:0x333333});
  var lensL=new THREE.Mesh(new THREE.TorusGeometry(0.1,0.02,6,12),glassesMat);
  lensL.position.set(-0.14,1.84,0.27);g.add(lensL);
  var lensR=new THREE.Mesh(new THREE.TorusGeometry(0.1,0.02,6,12),glassesMat);
  lensR.position.set(0.14,1.84,0.27);g.add(lensR);
  // Laptop bag
  var bag=new THREE.Mesh(new THREE.BoxGeometry(0.4,0.32,0.14),M(0x333333));
  bag.position.set(-0.55,0.9,0);g.add(bag);
  g.position.set(x,0,z);scene.add(g);
  npcCharacters.push({name:'Ned Leeds',mesh:g,pos:new THREE.Vector3(x,0,z)});
}

function buildUncleCharacter(name,x,z,bodyColor,headColor){
  var g=new THREE.Group();
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  var body=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.9,0.5),M(bodyColor));
  body.position.set(0,1.1,0);g.add(body);
  var head=new THREE.Mesh(new THREE.BoxGeometry(0.54,0.52,0.5),M(headColor));
  head.position.set(0,1.8,0);g.add(head);
  // Gray hair for Ben, natural for Aaron
  var hairColor=name==='Uncle Ben'?0xcccccc:0x1a0a00;
  var hair=new THREE.Mesh(new THREE.BoxGeometry(0.58,0.18,0.52),M(hairColor));
  hair.position.set(0,1.96,0);g.add(hair);
  g.position.set(x,0,z);scene.add(g);
  npcCharacters.push({name:name,mesh:g,pos:new THREE.Vector3(x,0,z)});
}

function buildStanLeeCharacter(x,z){
  var g=new THREE.Group();
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  var body=new THREE.Mesh(new THREE.BoxGeometry(0.62,0.85,0.46),M(0x446622));
  body.position.set(0,1.05,0);g.add(body);
  var head=new THREE.Mesh(new THREE.BoxGeometry(0.52,0.5,0.48),M(0xf0c890));
  head.position.set(0,1.78,0);g.add(head);
  // Mustache
  var stache=new THREE.Mesh(new THREE.BoxGeometry(0.28,0.06,0.08),M(0x444444));
  stache.position.set(0,1.71,0.26);g.add(stache);
  // Glasses
  var gMat=new THREE.MeshBasicMaterial({color:0x222222});
  var l1=new THREE.Mesh(new THREE.TorusGeometry(0.09,0.018,6,12),gMat);l1.position.set(-0.14,1.79,0.26);g.add(l1);
  var l2=new THREE.Mesh(new THREE.TorusGeometry(0.09,0.018,6,12),gMat);l2.position.set(0.14,1.79,0.26);g.add(l2);
  // Glowing Stan Lee badge
  var badge=new THREE.Mesh(new THREE.PlaneGeometry(0.3,0.12),new THREE.MeshBasicMaterial({color:0xf5c518}));
  badge.position.set(0,1.22,0.235);g.add(badge);
  g.position.set(x,0,z);scene.add(g);
  npcCharacters.push({name:"Stan Lee — Nuff Said!",mesh:g,pos:new THREE.Vector3(x,0,z)});
  // Stan Lee special light
  var stanLight=new THREE.PointLight(0xffdd44,0.6,8);
  stanLight.position.set(x,3,z);scene.add(stanLight);
}

// Spawn key NPCs near player start
function spawnKeyNPCs(){
  buildMJCharacter(15,10);
  buildNedCharacter(20,15);
  buildStanLeeCharacter(5,20);
  // Miles and uncles further away
  buildMilesNPCCharacter(-20,30);
  buildUncleCharacter('Uncle Ben',-30,40,0x8B6914,0xf0c890);
  buildUncleCharacter('Uncle Aaron',30,40,0x3a2a5a,0x5c3a1e);
}
