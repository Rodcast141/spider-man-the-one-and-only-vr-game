// apartment.js - Apartment spawn, suit-up sequence, TV mission selector, character switching

// ── APARTMENT STATE ──
var aptState = {
  phase: 'idle',       // idle | box_arriving | suit_prompt | suited | unsorted
  suitOn: false,
  boxArrived: false,
  tvOpen: false,
  currentChar: 'peter', // peter | miles | mj
  charMeshes: {},        // loaded character body meshes visible in first person
};

// ── APARTMENT 3D SCENE ──
var aptRenderer, aptScene, aptCamera;
var aptObjects = {};  // named objects in the apartment
var tvScreen = null;
var tvCanvas, tvCtx;
var suitBox = null;
var suitBoxStartY = 8;
var tvRemoteHeld = false;
var tvMenuOpen = false;
var tvMenuIndex = 0;

var TVOptions = [
  { label:'🕸️  FREE SWING',   sub:'Swing around NYC - no objectives', action:'freeroam' },
  { label:'📺  CAMPAIGN',      sub:'Story missions in order',           action:'campaign' },
  { label:'🎮  MISSION SELECT',sub:'Replay any mission you\'ve seen',   action:'missions' },
  { label:'🔄  SWITCH CHARACTER', sub:'Play as Peter, Miles, or MJ',    action:'switch_char' },
];

// ── LAUNCH APARTMENT ──
function launchApartment(charId, missionContext) {
  aptState.currentChar = charId || 'peter';
  aptState.suitOn = false;
  aptState.boxArrived = false;
  aptState.tvOpen = false;
  aptState.phase = 'idle';

  // Stop any running game
  if (gameRunning) {
    gameRunning = false;
    if (renderer) renderer.setAnimationLoop(null);
  }

  // Show game canvas, hide all screens
  document.querySelectorAll('.screen').forEach(function(el){ el.classList.remove('active'); });
  document.getElementById('gameCanvas').style.display = 'block';
  document.getElementById('gameHUD').style.display = 'none'; // HUD hidden in apartment
  document.getElementById('aptHUD').style.display = 'block';

  var canvas = document.getElementById('gameCanvas');
  canvas.width = innerWidth; canvas.height = innerHeight;

  if (aptRenderer) { try{aptRenderer.dispose();}catch(e){} }
  aptRenderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true});
  aptRenderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  aptRenderer.setSize(innerWidth,innerHeight);
  aptRenderer.shadowMap.enabled = true;
  aptRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
  aptRenderer.xr.enabled = true;

  aptScene = new THREE.Scene();
  aptScene.background = new THREE.Color(0x1a1210);
  aptCamera = new THREE.PerspectiveCamera(80, innerWidth/innerHeight, 0.05, 200);

  // Character spawn point (standing in living room)
  aptCamera.position.set(0, 1.7, 2);
  aptCamera.rotation.set(0, Math.PI, 0); // facing into room
  aptScene.add(aptCamera);

  // Lighting - warm apartment feel
  aptScene.add(new THREE.AmbientLight(0x4a3020, 0.8));
  var lamp = new THREE.PointLight(0xffcc88, 1.2, 12);
  lamp.position.set(-2, 2.5, -1); lamp.castShadow = true; aptScene.add(lamp);
  var lamp2 = new THREE.PointLight(0xffaa66, 0.6, 8);
  lamp2.position.set(3, 2.2, 2); aptScene.add(lamp2);
  var sunThrough = new THREE.DirectionalLight(0xffd4aa, 0.5);
  sunThrough.position.set(5, 4, -3); aptScene.add(sunThrough);

  buildApartmentRoom();
  buildApartmentProps();
  buildApartmentCharacters();
  buildTV();
  buildSuitBox();
  buildFirstPersonHands();

  // Pending mission context
  if (missionContext) {
    aptState.pendingMission = missionContext;
    updateAptSubtitle('A mission is waiting - grab the remote or put on your suit!');
  } else {
    updateAptSubtitle('Welcome home. Grab the TV remote or wait for the suit box.');
  }

  currentScreen = 'apartment';
  aptRenderer.setAnimationLoop(aptLoop);
  initVRForApt();

  // After 3 seconds, trigger suit box arrival
  setTimeout(triggerBoxArrival, 3000);
}

// ── APARTMENT ROOM ──
function buildApartmentRoom() {
  var M = function(c){ return new THREE.MeshLambertMaterial({color:c}); };

  // Floor - wood-look
  var floorGeo = new THREE.PlaneGeometry(8, 10);
  var floor = new THREE.Mesh(floorGeo, M(0x5a3a1a));
  floor.rotation.x = -Math.PI/2; floor.receiveShadow = true; aptScene.add(floor);

  // Floor planks texture effect
  for(var fx = -3.5; fx <= 3.5; fx += 0.5) {
    var plank = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 10), new THREE.MeshLambertMaterial({color: fx%1===0 ? 0x5c3c1c : 0x583818}));
    plank.rotation.x = -Math.PI/2; plank.position.set(fx, 0.001, 0); aptScene.add(plank);
  }

  // Walls
  var wallMat = M(0x8a7060);
  var wallBack = new THREE.Mesh(new THREE.PlaneGeometry(8,3.2), wallMat);
  wallBack.position.set(0,1.6,-5); aptScene.add(wallBack);
  var wallLeft = new THREE.Mesh(new THREE.PlaneGeometry(10,3.2), wallMat);
  wallLeft.position.set(-4,1.6,0); wallLeft.rotation.y=Math.PI/2; aptScene.add(wallLeft);
  var wallRight = new THREE.Mesh(new THREE.PlaneGeometry(10,3.2), wallMat);
  wallRight.position.set(4,1.6,0); wallRight.rotation.y=-Math.PI/2; aptScene.add(wallRight);

  // Ceiling
  var ceiling = new THREE.Mesh(new THREE.PlaneGeometry(8,10), M(0xc8b8a8));
  ceiling.rotation.x = Math.PI/2; ceiling.position.set(0,3.2,0); aptScene.add(ceiling);

  // Window wall (front - player side) with large windows
  var winWallMat = M(0x7a6050);
  var winWallL = new THREE.Mesh(new THREE.PlaneGeometry(2,3.2), winWallMat);
  winWallL.position.set(-3,1.6,5); winWallL.rotation.y=Math.PI; aptScene.add(winWallL);
  var winWallR = new THREE.Mesh(new THREE.PlaneGeometry(2,3.2), winWallMat);
  winWallR.position.set(3,1.6,5); winWallR.rotation.y=Math.PI; aptScene.add(winWallR);
  var winWallTop = new THREE.Mesh(new THREE.PlaneGeometry(8,0.6), winWallMat);
  winWallTop.position.set(0,3.0,5); winWallTop.rotation.y=Math.PI; aptScene.add(winWallTop);
  var winWallBot = new THREE.Mesh(new THREE.PlaneGeometry(8,0.5), winWallMat);
  winWallBot.position.set(0,0.25,5); winWallBot.rotation.y=Math.PI; aptScene.add(winWallBot);

  // Window glass - NYC skyline visible through
  var winGlass = new THREE.Mesh(new THREE.PlaneGeometry(4,2.1),
    new THREE.MeshBasicMaterial({color:0x334455, transparent:true, opacity:0.55}));
  winGlass.position.set(0,1.7,4.99); winGlass.rotation.y=Math.PI;
  aptScene.add(winGlass);
  aptObjects.window = winGlass;

  // Window frame
  var frameMat = M(0x3a2a1a);
  [[-1,0],[1,0],[0,-0.55],[0,0.55]].forEach(function(o){
    var bar = new THREE.Mesh(new THREE.BoxGeometry(o[0]===0?4.1:0.06, o[1]===0?2.2:0.06, 0.05), frameMat);
    bar.position.set(o[0]===0?0:o[0]*2, 1.7+o[1], 4.98); aptScene.add(bar);
  });

  // NYC outside the window - fake skyline
  buildWindowSkyline();

  // Front door
  var doorMat = M(0x4a3018);
  var door = new THREE.Mesh(new THREE.BoxGeometry(0.9, 2.2, 0.08), doorMat);
  door.position.set(-3.4, 1.1, 4.9); aptScene.add(door);
  aptObjects.frontDoor = door;
  var doorknob = new THREE.Mesh(new THREE.SphereGeometry(0.04,8,8), M(0xddaa44));
  doorknob.position.set(-2.97, 1.1, 4.94); aptScene.add(doorknob);
}

function buildWindowSkyline() {
  // Buildings visible through window
  var skyBg = new THREE.Mesh(new THREE.PlaneGeometry(20, 12),
    new THREE.MeshBasicMaterial({color:0x0a0a1a}));
  skyBg.position.set(0, 3, -15); aptScene.add(skyBg);
  var bldgColors = [0x1a2535,0x1e2a3a,0x162030,0x1c2838];
  var bldgs = [{x:-6,h:8,w:2},{x:-3.5,h:6,w:1.5},{x:-1.5,h:9,w:1.8},{x:1,h:7,w:2},{x:3.5,h:10,w:2.2},{x:6,h:6.5,w:1.6}];
  bldgs.forEach(function(b){
    var bm = new THREE.Mesh(new THREE.BoxGeometry(b.w,b.h,0.2),
      new THREE.MeshBasicMaterial({color:bldgColors[Math.floor(Math.random()*bldgColors.length)]}));
    bm.position.set(b.x, b.h/2-2, -14.5); aptScene.add(bm);
    // Window lights
    for(var wf=0;wf<Math.floor(b.h/1.2);wf++){
      if(Math.random()<0.4){
        var wl=new THREE.Mesh(new THREE.PlaneGeometry(0.3,0.4),
          new THREE.MeshBasicMaterial({color:0xffcc88}));
        wl.position.set(b.x+(Math.random()-0.5)*b.w*0.6, wf*1.2-1.5, -14.3); aptScene.add(wl);
      }
    }
  });
}

// ── APARTMENT PROPS ──
function buildApartmentProps() {
  var M = function(c){ return new THREE.MeshLambertMaterial({color:c}); };

  // ── COUCH ──
  var couch = new THREE.Group();
  var couchBase = new THREE.Mesh(new THREE.BoxGeometry(2.4,0.5,0.9), M(0x4a3020));
  couchBase.position.y=0.25; couch.add(couchBase);
  var couchBack = new THREE.Mesh(new THREE.BoxGeometry(2.4,0.6,0.2), M(0x5a3a28));
  couchBack.position.set(0,0.8,-0.35); couch.add(couchBack);
  var cushionMat = M(0x6a4a30);
  [-0.75,0,0.75].forEach(function(cx){
    var c2=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.18,0.7),cushionMat);
    c2.position.set(cx,0.59,0.05); couch.add(c2);
  });
  couch.position.set(0,0,-3.5); aptScene.add(couch);

  // ── COFFEE TABLE ──
  var table = new THREE.Mesh(new THREE.BoxGeometry(1.2,0.06,0.6), M(0x3a2810));
  table.position.set(0,0.6,-2.2); aptScene.add(table);
  // Daily Bugle newspaper on table
  var paper = new THREE.Mesh(new THREE.PlaneGeometry(0.3,0.4), new THREE.MeshBasicMaterial({color:0xddcc88}));
  paper.rotation.x=-Math.PI/2; paper.position.set(0.2,0.64,-2.2); aptScene.add(paper);
  // Coffee mug
  var mug = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.04,0.1,10), M(0xcc4444));
  mug.position.set(-0.3,0.68,-2.2); aptScene.add(mug);

  // ── NURSERY CORNER ──
  // Crib
  var crib = new THREE.Group();
  var cribBase = new THREE.Mesh(new THREE.BoxGeometry(1.1,0.12,0.65), M(0xddcc88));
  cribBase.position.y=0.55; crib.add(cribBase);
  [[-0.5,0],[0.5,0],[0,-0.3],[0,0.3]].forEach(function(r){
    var rail=new THREE.Mesh(new THREE.BoxGeometry(Math.abs(r[0])>0.1?0.04:1.1, 0.4, Math.abs(r[1])>0.1?0.04:0.65), M(0xddcc88));
    rail.position.set(r[0],0.77,r[1]); crib.add(rail);
  });
  // Mattress
  var mattress=new THREE.Mesh(new THREE.BoxGeometry(1.0,0.06,0.58), new THREE.MeshLambertMaterial({color:0xffffff}));
  mattress.position.y=0.62; crib.add(mattress);
  // Stuffed animal in crib
  var bear=new THREE.Mesh(new THREE.SphereGeometry(0.1,8,8), M(0xcc9944));
  bear.position.set(0.2,0.72,0); crib.add(bear);
  crib.position.set(2.5,0,-4); aptScene.add(crib);

  // Baby mobile above crib
  var mobileStick=new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.01,0.8,6), M(0xddcc88));
  mobileStick.position.set(2.5,1.4,-4); aptScene.add(mobileStick);
  ['🕷️','⭐','🌙','❤️'].forEach(function(emoji,i){
    var angle=i/4*Math.PI*2;
    var charm=new THREE.Mesh(new THREE.SphereGeometry(0.06,6,6), M([0xe8001c,0xf5c518,0x1a90d9,0x22aa22][i]));
    charm.position.set(2.5+Math.cos(angle)*0.3, 1.2, -4+Math.sin(angle)*0.3);
    aptScene.add(charm);
  });

  // Baby clothes (folded on shelf)
  var shelf=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.04,0.25), M(0x5a3a18));
  shelf.position.set(3.4,1.8,-4); aptScene.add(shelf);
  var clothes=new THREE.Mesh(new THREE.BoxGeometry(0.55,0.12,0.2), M(0xffaacc));
  clothes.position.set(3.4,1.9,-4); aptScene.add(clothes);

  // ── PLAYROOM AREA (corner) ──
  var playmat=new THREE.Mesh(new THREE.PlaneGeometry(1.5,1.5), new THREE.MeshLambertMaterial({color:0xffcc44}));
  playmat.rotation.x=-Math.PI/2; playmat.position.set(-3,0.002,-3.5); aptScene.add(playmat);
  // Toy blocks
  var blockColors=[0xe8001c,0xf5c518,0x1a90d9,0x22aa22,0xcc44cc];
  for(var bi=0;bi<8;bi++){
    var block=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.12,0.12), M(blockColors[bi%5]));
    block.position.set(-3+(Math.random()-0.5)*1.2, 0.06, -3.5+(Math.random()-0.5)*1.2);
    block.rotation.y=Math.random()*Math.PI; aptScene.add(block);
  }
  // Toy Spider-Man figure
  var spideyToy=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.05,0.2,8), M(0xe8001c));
  spideyToy.position.set(-2.8,0.12,-3.8); aptScene.add(spideyToy);

  // ── MJ'S DESK (camera, notepad, press badge) ──
  var mjDesk=new THREE.Mesh(new THREE.BoxGeometry(1.2,0.06,0.6), M(0x4a3010));
  mjDesk.position.set(-2.8,0.85,-4.5); aptScene.add(mjDesk);
  var camera_=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.14,0.1), M(0x222222));
  camera_.position.set(-2.9,0.95,-4.5); aptScene.add(camera_);
  var notepad=new THREE.Mesh(new THREE.BoxGeometry(0.2,0.003,0.25), new THREE.MeshBasicMaterial({color:0xffffee}));
  notepad.position.set(-2.6,0.89,-4.5); aptScene.add(notepad);

  // ── PETER'S WEB-SHOOTER WORKBENCH ──
  var bench=new THREE.Mesh(new THREE.BoxGeometry(1.4,0.06,0.5), M(0x3a2810));
  bench.position.set(3,0.9,-3); aptScene.add(bench);
  // Web fluid cartridges
  [0,0.18,0.36].forEach(function(ox){
    var cart=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,0.18,8), new THREE.MeshLambertMaterial({color:0x1a90d9,emissive:new THREE.Color(0x001133)}));
    cart.position.set(2.4+ox,1.05,-3); aptScene.add(cart);
  });
  // Toolbox
  var toolbox=new THREE.Mesh(new THREE.BoxGeometry(0.28,0.14,0.18), M(0xcc3300));
  toolbox.position.set(3.2,0.99,-3); aptScene.add(toolbox);

  // ── BOOKSHELF ──
  var bookshelf=new THREE.Mesh(new THREE.BoxGeometry(0.25,2.0,1.0), M(0x4a3010));
  bookshelf.position.set(-3.88,1.0,-1); aptScene.add(bookshelf);
  var bookColors=[0xe8001c,0x1a90d9,0x22aa22,0xf5c518,0x884488,0xcc4400];
  for(var bf=0;bf<3;bf++){
    for(var bk=0;bk<4;bk++){
      var book=new THREE.Mesh(new THREE.BoxGeometry(0.05,0.28,0.18), M(bookColors[(bf*4+bk)%6]));
      book.position.set(-3.74,0.25+bf*0.38,-1.35+bk*0.2); aptScene.add(book);
    }
  }

  // ── RUG ──
  var rug=new THREE.Mesh(new THREE.PlaneGeometry(3,4), new THREE.MeshLambertMaterial({color:0x884422}));
  rug.rotation.x=-Math.PI/2; rug.position.set(0,0.001,-2); aptScene.add(rug);

  // Store refs
  aptObjects.crib = crib;
  aptObjects.mjDesk = mjDesk;
}

// ── TV ──
function buildTV() {
  var M = function(c){ return new THREE.MeshLambertMaterial({color:c}); };

  // TV stand
  var stand = new THREE.Mesh(new THREE.BoxGeometry(1.4,0.08,0.35), M(0x222222));
  stand.position.set(0,0.62,-4.8); aptScene.add(stand);
  var standLeg = new THREE.Mesh(new THREE.BoxGeometry(0.1,0.6,0.1), M(0x1a1a1a));
  standLeg.position.set(0,0.3,-4.8); aptScene.add(standLeg);

  // TV body
  var tvBody = new THREE.Mesh(new THREE.BoxGeometry(1.8,1.05,0.08), M(0x111111));
  tvBody.position.set(0,1.2,-4.85); aptScene.add(tvBody);

  // TV bezel
  var bezel = new THREE.Mesh(new THREE.BoxGeometry(1.88,1.13,0.04), M(0x1a1a1a));
  bezel.position.set(0,1.2,-4.84); aptScene.add(bezel);

  // TV SCREEN - canvas texture
  tvCanvas = document.createElement('canvas');
  tvCanvas.width = 512; tvCanvas.height = 288;
  tvCtx = tvCanvas.getContext('2d');
  drawTVScreen('home');

  var tvTex = new THREE.CanvasTexture(tvCanvas);
  tvScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.7,0.96),
    new THREE.MeshBasicMaterial({map:tvTex}));
  tvScreen.position.set(0,1.2,-4.82);
  tvScreen.userData.tvTex = tvTex;
  aptScene.add(tvScreen);
  aptObjects.tvScreen = tvScreen;

  // TV remote on coffee table
  buildTVRemoteObject();
}

function buildTVRemoteObject() {
  var M = function(c){ return new THREE.MeshLambertMaterial({color:c}); };
  var remote = new THREE.Group();
  var body = new THREE.Mesh(new THREE.BoxGeometry(0.08,0.03,0.22), M(0x111111));
  remote.add(body);
  var btnColors = [0xe8001c,0x22aa22,0x2222cc,0xffaa00];
  [[-0.025,0.02,-0.05],[0.025,0.02,-0.05],[-0.025,0.02,0.02],[0.025,0.02,0.02]].forEach(function(p,i){
    var btn=new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.01,0.006,8), M(btnColors[i]));
    btn.position.set(p[0],p[1],p[2]); remote.add(btn);
  });
  remote.position.set(0.35, 0.64, -2.2);
  remote.rotation.z = 0.1;
  aptScene.add(remote);
  aptObjects.tvRemote = remote;
}

// ── SUIT BOX ──
function buildSuitBox() {
  var M = function(c){ return new THREE.MeshLambertMaterial({color:c}); };
  var box = new THREE.Group();

  // Box body - dark Stark Industries style
  var body=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.5,0.5), M(0x1a1a2a));
  box.add(body);
  var lid=new THREE.Mesh(new THREE.BoxGeometry(0.72,0.1,0.52), M(0x222233));
  lid.position.y=0.3; box.add(lid);

  // Arc reactor glow on lid
  var glow=new THREE.PointLight(0x4488ff,1.5,2);
  glow.position.set(0,0.35,0); box.add(glow);
  var arcCircle=new THREE.Mesh(new THREE.CircleGeometry(0.08,16),
    new THREE.MeshBasicMaterial({color:0x88ccff}));
  arcCircle.position.set(0,0.36,0.27); box.add(arcCircle);

  // Thrusters on sides
  var thrusterMat = M(0x333344);
  [[-0.38,0],[0.38,0]].forEach(function(t){
    var th=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.2,0.2), thrusterMat);
    th.position.set(t[0],0,0); box.add(th);
    var flame=new THREE.PointLight(0xff6600,0.8,1.5);
    flame.position.set(t[0],-0.15,0); box.add(flame);
  });

  // STARK INDUSTRIES label
  var labelMesh=new THREE.Mesh(new THREE.PlaneGeometry(0.4,0.08),
    new THREE.MeshBasicMaterial({color:0xf5c518}));
  labelMesh.position.set(0,0.05,0.26); box.add(labelMesh);

  box.position.set(0, suitBoxStartY, 0);
  aptScene.add(box);
  suitBox = box;
  aptObjects.suitBox = suitBox;
}

function triggerBoxArrival() {
  aptState.phase = 'box_arriving';
  aptState.boxArrived = false;
  updateAptSubtitle('The Stark suit delivery is arriving...');
  showAptNotif('📦 Suit box incoming!');
}

// ── CHARACTER MESHES IN APT ──
function buildApartmentCharacters() {
  // MJ sitting on couch (9 months pregnant)
  buildMJInApt();
  // Sarah (Miles' girlfriend) - in Miles' version
  if (aptState.currentChar === 'miles') buildSarahInApt();
}

function buildMJInApt() {
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  var g=new THREE.Group();
  // Body with bump
  var body=new THREE.Mesh(new THREE.BoxGeometry(0.6,0.8,0.44),M(0x8B4513));
  body.position.y=0.9; g.add(body);
  var bump=new THREE.Mesh(new THREE.SphereGeometry(0.26,8,8),M(0x8B4513));
  bump.position.set(0,0.82,0.23); g.add(bump);
  // Head + red hair
  var head=new THREE.Mesh(new THREE.BoxGeometry(0.46,0.46,0.42),M(0xf4c48a));
  head.position.y=1.5; g.add(head);
  var hair=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.26,0.48),M(0xcc4400));
  hair.position.y=1.66; g.add(hair);
  // Arms
  var armL=new THREE.Mesh(new THREE.BoxGeometry(0.22,0.6,0.24),M(0x8B4513));
  armL.position.set(-0.41,0.9,0); g.add(armL);
  var armR=new THREE.Mesh(new THREE.BoxGeometry(0.22,0.6,0.24),M(0x8B4513));
  armR.position.set(0.41,0.9,0); g.add(armR);
  // Legs
  var legL=new THREE.Mesh(new THREE.BoxGeometry(0.26,0.5,0.28),M(0x334466));
  legL.position.set(-0.16,0.35,0); g.add(legL);
  var legR=new THREE.Mesh(new THREE.BoxGeometry(0.26,0.5,0.28),M(0x334466));
  legR.position.set(0.16,0.35,0); g.add(legR);
  // Belly rub hands
  var handL=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.14,0.2),M(0xf4c48a));
  handL.position.set(-0.18,0.88,0.3); g.add(handL);
  var handR=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.14,0.2),M(0xf4c48a));
  handR.position.set(0.18,0.88,0.3); g.add(handR);
  // Eyes
  var eyeM=new THREE.MeshLambertMaterial({color:0x3a2a1a});
  [-0.1,0.1].forEach(function(ex){
    var e=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.05,0.05),eyeM);
    e.position.set(ex,1.52,0.22); g.add(e);
  });
  // Sit her on the couch
  g.position.set(0.4, 0.5, -3.5);
  g.rotation.y = Math.PI * 0.1;
  aptScene.add(g);
  aptObjects.mj = g;
}

function buildSarahInApt() {
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  var g=new THREE.Group();
  var body=new THREE.Mesh(new THREE.BoxGeometry(0.58,0.84,0.42),M(0xcc6699));
  body.position.y=1.08; g.add(body);
  var head=new THREE.Mesh(new THREE.BoxGeometry(0.44,0.44,0.42),M(0xc09060));
  head.position.y=1.76; g.add(head);
  var hair=new THREE.Mesh(new THREE.BoxGeometry(0.48,0.3,0.46),M(0x1a0a00));
  hair.position.y=1.93; g.add(hair);
  g.position.set(-0.4,0.5,-3.5);
  aptScene.add(g);
  aptObjects.sarah = g;
}

// ── FIRST PERSON HANDS ──
var fpHands = null;
function buildFirstPersonHands() {
  fpHands = new THREE.Group();
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  var skinColor = aptState.currentChar==='miles' ? 0x5c3a1e : 0xf4c48a;
  // Left hand
  var lHand=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.07,0.14),M(skinColor));
  lHand.position.set(-0.18,-0.18,-0.35); fpHands.add(lHand);
  // Right hand
  var rHand=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.07,0.14),M(skinColor));
  rHand.position.set(0.18,-0.18,-0.35); fpHands.add(rHand);
  // Shirt sleeves
  var sleeveColor = aptState.currentChar==='peter' ? 0x3366aa : aptState.currentChar==='miles' ? 0x222233 : 0x884422;
  [-0.18,0.18].forEach(function(x){
    var sleeve=new THREE.Mesh(new THREE.BoxGeometry(0.1,0.14,0.1),M(sleeveColor));
    sleeve.position.set(x,-0.12,-0.28); fpHands.add(sleeve);
  });
  aptCamera.add(fpHands);
}

// ── TV SCREEN DRAWING ──
function drawTVScreen(mode, selectedIdx) {
  if(!tvCtx) return;
  var w=512,h=288;
  tvCtx.clearRect(0,0,w,h);

  if(mode==='home'){
    // Idle TV - NYC news broadcast look
    tvCtx.fillStyle='#0a0a1a'; tvCtx.fillRect(0,0,w,h);
    tvCtx.fillStyle='#e8001c'; tvCtx.fillRect(0,0,w,22);
    tvCtx.fillStyle='#fff'; tvCtx.font='bold 13px Arial'; tvCtx.textAlign='left';
    tvCtx.fillText('DAILY BUGLE NEWS - LIVE', 8, 15);
    tvCtx.fillStyle='#f5c518'; tvCtx.font='bold 11px Arial'; tvCtx.textAlign='right';
    tvCtx.fillText('NEW YORK, NY', w-8, 15);
    // Headline
    tvCtx.fillStyle='#fff'; tvCtx.font='bold 20px Arial'; tvCtx.textAlign='center';
    tvCtx.fillText('SPIDER-MAN SPOTTED IN QUEENS', w/2, 80);
    tvCtx.fillStyle='rgba(255,255,255,0.6)'; tvCtx.font='13px Arial';
    tvCtx.fillText('Local hero saves 3 civilians from Shocker attack', w/2, 105);
    tvCtx.fillStyle='rgba(255,255,255,0.4)'; tvCtx.font='11px Arial';
    tvCtx.fillText('GRAB THE REMOTE TO SELECT A MISSION', w/2, 200);
    tvCtx.fillStyle='rgba(255,255,255,0.25)'; tvCtx.font='10px Arial';
    tvCtx.fillText('▼ Press grip button / E key near remote', w/2, 220);
  } else if(mode==='menu'){
    tvCtx.fillStyle='#050510'; tvCtx.fillRect(0,0,w,h);
    tvCtx.fillStyle='#e8001c'; tvCtx.fillRect(0,0,w,28);
    tvCtx.fillStyle='#fff'; tvCtx.font='bold 15px Arial'; tvCtx.textAlign='center';
    tvCtx.fillText('SPIDER-MAN - SELECT MODE', w/2, 18);
    TVOptions.forEach(function(opt,i){
      var y=55+i*50;
      var isSelected=(i===selectedIdx);
      if(isSelected){
        tvCtx.fillStyle='rgba(232,0,28,0.35)';
        tvCtx.fillRect(20,y-22,w-40,40);
        tvCtx.strokeStyle='#e8001c'; tvCtx.lineWidth=2;
        tvCtx.strokeRect(20,y-22,w-40,40);
      }
      tvCtx.fillStyle=isSelected?'#fff':'rgba(255,255,255,0.75)';
      tvCtx.font='bold 16px Arial'; tvCtx.textAlign='left';
      tvCtx.fillText(opt.label, 36, y);
      tvCtx.fillStyle=isSelected?'rgba(255,220,220,0.9)':'rgba(255,255,255,0.4)';
      tvCtx.font='11px Arial';
      tvCtx.fillText(opt.sub, 36, y+16);
    });
    tvCtx.fillStyle='rgba(255,255,255,0.25)'; tvCtx.font='10px Arial'; tvCtx.textAlign='center';
    tvCtx.fillText('W/S or L-stick to navigate · ENTER/trigger to select', w/2, 275);
  } else if(mode==='missions'){
    tvCtx.fillStyle='#050510'; tvCtx.fillRect(0,0,w,h);
    tvCtx.fillStyle='#e8001c'; tvCtx.fillRect(0,0,w,28);
    tvCtx.fillStyle='#fff'; tvCtx.font='bold 14px Arial'; tvCtx.textAlign='center';
    tvCtx.fillText('📋 SELECT CAMPAIGN MISSION', w/2, 18);
    var allMissions=[].concat(MISSIONS.story);
    var startIdx=Math.max(0,(selectedIdx||0)-2);
    allMissions.slice(startIdx,startIdx+5).forEach(function(m,i){
      var idx=startIdx+i;
      var y=50+i*44;
      var isSel=(idx===(selectedIdx||0));
      if(isSel){tvCtx.fillStyle='rgba(232,0,28,0.3)';tvCtx.fillRect(8,y-18,w-16,38);}
      tvCtx.fillStyle=isSel?'#fff':'rgba(255,255,255,0.65)';
      tvCtx.font='bold 13px Arial'; tvCtx.textAlign='left';
      tvCtx.fillText((idx+1)+'. '+m.icon+' '+m.name, 16, y);
      tvCtx.fillStyle='rgba(255,255,255,0.4)'; tvCtx.font='10px Arial';
      tvCtx.fillText(m.objective.substring(0,60), 16, y+14);
    });
  }
  if(tvScreen && tvScreen.userData.tvTex) tvScreen.userData.tvTex.needsUpdate=true;
}

// ── APARTMENT LOOP ──
var aptYaw=0, aptPitch=0;
var aptDragLook=false, aptLastMX=0, aptLastMY=0;
var aptMouseLocked=false;
var suitBoxY=suitBoxStartY;
var tvMenuMode='home';
var nearRemote=false, nearDoor=false, nearWindow=false;
var suitPromptShown=false;

function aptLoop(ts) {
  var dt=Math.min((ts-(aptLastT||ts))/1000,0.05); aptLastT=ts;

  // Animate suit box descending
  if(aptState.phase==='box_arriving' && suitBox){
    suitBoxY = Math.max(1.2, suitBoxY - 3*dt);
    suitBox.position.y = suitBoxY;
    suitBox.rotation.y += dt*0.5;
    if(suitBoxY<=1.2 && !aptState.boxArrived){
      aptState.boxArrived=true;
      aptState.phase='suit_prompt';
      suitBox.rotation.y=0;
      showAptNotif('📦 Suit box landed! Press E / grip to open it.');
      if(!suitPromptShown){ showSuitPrompt(); suitPromptShown=true; }
    }
  }

  // Camera look
  aptCamera.rotation.set(aptPitch, Math.PI + aptYaw, 0, 'YXZ');
  aptCamera.rotation.order='YXZ';

  // Proximity checks
  checkAptProximity();

  // Animate MJ
  if(aptObjects.mj){
    aptObjects.mj.rotation.y = Math.sin(ts*0.0004)*0.05 + Math.PI*0.1;
  }

  // Update TV canvas every 2s
  if(tvMenuOpen) drawTVScreen(tvMenuMode==='missions'?'missions':'menu', tvMenuIndex);
  else if(Math.floor(ts/2000)%2===0 && !tvMenuOpen) drawTVScreen('home');

  aptRenderer.render(aptScene, aptCamera);
}
var aptLastT=0;

function checkAptProximity() {
  var camPos=aptCamera.position;

  // Near TV remote
  var rem=aptObjects.tvRemote;
  if(rem){
    var d=Math.hypot(camPos.x-rem.position.x, camPos.z-rem.position.z);
    nearRemote=d<1.2;
    document.getElementById('aptInteract').style.opacity=nearRemote?1:0;
    if(nearRemote) document.getElementById('aptInteract').textContent='[E] Grab TV Remote';
    if(nearRemote&&keys['e']&&!tvMenuOpen){ openTVMenu(); }
  }

  // Near suit box
  var sb=aptObjects.suitBox;
  if(sb&&aptState.boxArrived&&!aptState.suitOn){
    var ds=Math.hypot(camPos.x-sb.position.x,camPos.z-sb.position.z);
    if(ds<1.5){
      document.getElementById('aptInteract').style.opacity=1;
      document.getElementById('aptInteract').textContent='[E] Open suit box';
      if(keys['e']) openSuitBox();
    }
  }

  // Near window (for suited exit)
  var dw=Math.hypot(camPos.x-0, camPos.z-4.8);
  nearWindow=dw<1.5;
  if(nearWindow&&aptState.suitOn){
    document.getElementById('aptInteract').style.opacity=1;
    document.getElementById('aptInteract').textContent='[SPACE] Jump out window - start swinging!';
    if(keys[' ']) exitThroughWindow();
  }

  // Near front door (for civilian exit / no suit)
  var dd=Math.hypot(camPos.x-(-3.4), camPos.z-4.8);
  nearDoor=dd<1.2;
  if(nearDoor&&!aptState.suitOn){
    document.getElementById('aptInteract').style.opacity=1;
    document.getElementById('aptInteract').textContent='[E] Leave through front door';
    if(keys['e']) exitThroughFrontDoor();
  }
}

// ── TV MENU ──
function openTVMenu(){
  tvMenuOpen=true; tvMenuMode='home'; tvMenuIndex=0;
  drawTVScreen('menu',0);
  showAptNotif('TV menu open - W/S to navigate, ENTER to select');
  document.getElementById('aptInteract').textContent='[E] Close TV · W/S Navigate · ENTER Select';
}

function closeTVMenu(){
  tvMenuOpen=false;
  drawTVScreen('home');
  document.getElementById('aptInteract').style.opacity=0;
}

function navigateTV(dir){
  if(!tvMenuOpen) return;
  if(tvMenuMode==='home'||tvMenuMode==='menu'){
    tvMenuIndex=(tvMenuIndex+dir+TVOptions.length)%TVOptions.length;
    drawTVScreen('menu',tvMenuIndex);
  } else if(tvMenuMode==='missions'){
    tvMenuIndex=Math.max(0,Math.min(MISSIONS.story.length-1,tvMenuIndex+dir));
    drawTVScreen('missions',tvMenuIndex);
  }
}

function selectTVOption(){
  if(!tvMenuOpen) return;
  if(tvMenuMode==='home'||tvMenuMode==='menu'){
    var opt=TVOptions[tvMenuIndex];
    if(opt.action==='freeroam'){ closeTVMenu(); exitThroughWindow(true); }
    else if(opt.action==='campaign'){ tvMenuMode='missions'; tvMenuIndex=0; drawTVScreen('missions',0); }
    else if(opt.action==='missions'){ tvMenuMode='missions'; tvMenuIndex=0; drawTVScreen('missions',0); }
    else if(opt.action==='switch_char'){ closeTVMenu(); showCharSwitch(); }
  } else if(tvMenuMode==='missions'){
    var m=MISSIONS.story[tvMenuIndex];
    if(m){ closeTVMenu(); startMissionFromApt(m); }
  }
}

function showCharSwitch(){
  showAptNotif('Switching characters - use 1=Peter, 2=Miles, 3=MJ');
}

// ── SUIT UP ──
function openSuitBox(){
  aptState.phase='suited';
  aptState.suitOn=true;
  showAptNotif('🕷️ Suit equipped! Approach the window and press SPACE to swing out!');
  // Animate box opening - lid flies up
  if(suitBox){
    suitBox.children.forEach(function(c,i){ if(i===1){ c.position.y=2.5; } });
  }
  // Change fp hands to suit gloves
  if(fpHands){ aptCamera.remove(fpHands); }
  buildFPSuitHands();
  updateAptSubtitle('Suit on - head to the window and jump out!');
  document.getElementById('aptSuitIndicator').style.opacity=1;
}

function buildFPSuitHands(){
  fpHands=new THREE.Group();
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  var suitC=aptState.currentChar==='miles'?0x111133:0xe8001c;
  var webC=aptState.currentChar==='miles'?0xcc0000:0x0000cc;
  [-0.2,0.2].forEach(function(x){
    var hand=new THREE.Mesh(new THREE.BoxGeometry(0.1,0.08,0.18),M(suitC));
    hand.position.set(x,-0.2,-0.38); fpHands.add(hand);
    var glove=new THREE.Mesh(new THREE.BoxGeometry(0.11,0.07,0.06),M(webC));
    glove.position.set(x,-0.2,-0.46); fpHands.add(glove);
    // Web shooter wrist device
    var ws=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.025,0.1),M(0x888888));
    ws.position.set(x,-0.16,-0.38); fpHands.add(ws);
  });
  aptCamera.add(fpHands);
}

function showSuitPrompt(){
  var needsSuit = !aptState.pendingMission || aptState.pendingMission.type !== 'explore';
  if(needsSuit){
    showAptNotif('👔 A mission requires your suit - open the box!');
    updateAptSubtitle('Press E near the suit box to suit up, then jump out the window.');
  } else {
    showAptNotif('This mission does not need your suit - leave through the front door.');
    updateAptSubtitle('Head to the front door to begin the mission without your suit.');
  }
}

// ── EXIT ──
function exitThroughWindow(forceFreeroam){
  aptRenderer.setAnimationLoop(null);
  var mission = forceFreeroam ? {name:'Free Roam NYC',objective:'Swing around New York City',type:'freeroam'} : (aptState.pendingMission||{name:'Free Roam NYC',objective:'Swing anywhere',type:'freeroam'});
  currentMission=mission;
  document.getElementById('aptHUD').style.display='none';
  document.getElementById('gameHUD').style.display='block';
  document.getElementById('mHUDName').textContent=mission.name;
  document.getElementById('mHUDObj').textContent=mission.objective;
  launchGame();
}

function exitThroughFrontDoor(){
  aptRenderer.setAnimationLoop(null);
  var mission = aptState.pendingMission||{name:'Free Roam NYC',objective:'Walk around New York',type:'freeroam'};
  currentMission=mission;
  document.getElementById('aptHUD').style.display='none';
  document.getElementById('gameHUD').style.display='block';
  launchGame();
}

function startMissionFromApt(m){
  aptState.pendingMission=m;
  var needsSuit = m.type!=='explore' && m.badge!=='story' || m.villain!=null;
  if(needsSuit && !aptState.suitOn){
    showAptNotif('Put on your suit first, then jump out the window!');
    updateAptSubtitle('Suit up, then exit through the window for mission: '+m.name);
  } else {
    exitThroughWindow(false);
  }
}

// ── KEY HANDLING FOR APT ──
document.addEventListener('keydown',function(e){
  if(currentScreen!=='apartment') return;
  var k=e.key.toLowerCase();
  if(k==='w') { aptPitch=Math.max(-1.2,aptPitch-0.04); if(tvMenuOpen) navigateTV(-1); }
  if(k==='s') { aptPitch=Math.min(0.8,aptPitch+0.04); if(tvMenuOpen) navigateTV(1); }
  if(k==='arrowup'&&tvMenuOpen) navigateTV(-1);
  if(k==='arrowdown'&&tvMenuOpen) navigateTV(1);
  if(k==='enter'&&tvMenuOpen) selectTVOption();
  if(k==='escape'&&tvMenuOpen) closeTVMenu();
  if(k==='1') switchPlayableChar('peter');
  if(k==='2') switchPlayableChar('miles');
  if(k==='3') switchPlayableChar('mj');
});

document.addEventListener('mousemove',function(e){
  if(currentScreen!=='apartment') return;
  if(aptMouseLocked){
    aptYaw-=e.movementX*0.002;
    aptPitch=Math.max(-1.2,Math.min(0.8,aptPitch-e.movementY*0.002));
  } else if(aptDragLook){
    aptYaw-=(e.clientX-aptLastMX)*0.004;
    aptPitch=Math.max(-1.2,Math.min(0.8,aptPitch-(e.clientY-aptLastMY)*0.004));
    aptLastMX=e.clientX; aptLastMY=e.clientY;
  }
});

document.addEventListener('mousedown',function(e){
  if(currentScreen!=='apartment'&&e.button===0){
    aptDragLook=true; aptLastMX=e.clientX; aptLastMY=e.clientY;
  }
});
document.addEventListener('mouseup',function(){ aptDragLook=false; });
document.getElementById('gameCanvas').addEventListener('click',function(){
  if(currentScreen==='apartment'&&!aptMouseLocked) document.getElementById('gameCanvas').requestPointerLock();
});
document.addEventListener('pointerlockchange',function(){
  aptMouseLocked=!!document.pointerLockElement;
});

// ── SWITCH CHARACTER ──
function switchPlayableChar(c){
  aptState.currentChar=c;
  if(fpHands){ aptCamera.remove(fpHands); }
  aptState.suitOn=false;
  document.getElementById('aptSuitIndicator').style.opacity=0;
  buildFirstPersonHands();
  var names={peter:'Peter Parker',miles:'Miles Morales',mj:'Mary Jane Watson'};
  showAptNotif('Now playing as '+names[c]);
  updateAptSubtitle('Playing as '+names[c]);
  // Update char select buttons
  document.querySelectorAll('.charBtn').forEach(function(b){ b.classList.remove('active'); });
  var btn=document.getElementById('char'+c.charAt(0).toUpperCase()+c.slice(1));
  if(btn) btn.classList.add('active');
}

// ── HELPERS ──
function updateAptSubtitle(msg){
  var el=document.getElementById('aptSubtitle');
  if(el) el.textContent=msg;
}
function showAptNotif(msg){ showToast(msg); }

function initVRForApt(){
  if(!navigator.xr||!aptRenderer)return;
  aptRenderer.xr.enabled=true;
  navigator.xr.isSessionSupported('immersive-vr').then(function(ok){
    if(!ok)return;
    document.getElementById('vrBtn').style.display='block';
    document.getElementById('vrBtn').onclick=function(){ enterVRForApt(); };
  }).catch(function(){});
}

async function enterVRForApt(){
  try{
    var session=await navigator.xr.requestSession('immersive-vr',{requiredFeatures:['local-floor']});
    await aptRenderer.xr.setSession(session);
    inVR=true;
    document.getElementById('vrBtn').textContent='EXIT VR';
    // Right controller = hand + web shooter when suited
    var ctrl1=aptRenderer.xr.getControllerGrip(1);
    aptScene.add(ctrl1);
    var rHand=buildVRHand(aptState.currentChar==='miles'?0x5c3a1e:0xf4c48a);
    ctrl1.add(rHand);
    // Left controller = hand + TV remote
    var ctrl0=aptRenderer.xr.getControllerGrip(0);
    aptScene.add(ctrl0);
    var lHand=buildVRHand(aptState.currentChar==='miles'?0x5c3a1e:0xf4c48a);
    ctrl0.add(lHand);
    var remVR=buildTVRemote();
    remVR.position.set(0.04,-0.02,0.04);
    ctrl0.add(remVR);
    // VR input for apartment
    session.addEventListener('end',function(){ inVR=false; document.getElementById('vrBtn').textContent='ENTER VR'; });
    // Handle VR input in apt loop via xr session
    session.addEventListener('selectstart',function(e){
      // Trigger = interact / select TV
      if(tvMenuOpen) selectTVOption();
      else if(nearRemote) openTVMenu();
      else if(aptState.boxArrived&&!aptState.suitOn) openSuitBox();
    });
    session.addEventListener('squeezestart',function(e){
      // Grip = exit through window/door
      if(aptState.suitOn) exitThroughWindow(false);
      else exitThroughFrontDoor();
    });
  }catch(err){ console.warn('VR apt error:',err); }
}

function buildVRHand(color){
  var g=new THREE.Group();
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  var palm=new THREE.Mesh(new THREE.BoxGeometry(0.07,0.025,0.09),M(color));
  palm.position.set(0,0,-0.02); g.add(palm);
  for(var i=0;i<4;i++){
    var f=new THREE.Mesh(new THREE.BoxGeometry(0.013,0.022,0.044),M(color));
    f.position.set(-0.025+i*0.017,0.012,-0.071); g.add(f);
  }
  return g;
}
function buildTVRemote(){
  var g=new THREE.Group();
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.08,0.03,0.22),M(0x111111)));
  [[0xe8001c,0.025,-0.05],[0x22aa22,-0.025,-0.05],[0x2222cc,0.025,0.02],[0xffaa00,-0.025,0.02]].forEach(function(b){
    var btn=new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.01,0.006,8),M(b[0]));
    btn.position.set(b[1],0.02,b[2]); g.add(btn);
  });
  return g;
}
