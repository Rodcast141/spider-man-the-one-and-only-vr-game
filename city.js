// city.js — NYC 3D city: skyscrapers, streets, apartments, landmarks, web anchor points

var CITY_SIZE = 1200;
var webAnchors = []; // points in 3D space Spider-Man can attach webs to

function buildCity() {
  // ── GROUND / STREETS ──
  var groundMat = new THREE.MeshLambertMaterial({color:0x1a1a1a});
  var ground = new THREE.Mesh(new THREE.PlaneGeometry(CITY_SIZE,CITY_SIZE,1,1), groundMat);
  ground.rotation.x = -Math.PI/2; ground.position.y = 0; ground.receiveShadow=true; scene.add(ground);

  // Street grid lines
  var lineMat = new THREE.MeshBasicMaterial({color:0xffffff, opacity:0.04, transparent:true});
  for(var x=-600;x<=600;x+=60){
    var lineG=new THREE.PlaneGeometry(2,CITY_SIZE);
    var line=new THREE.Mesh(lineG,lineMat);
    line.rotation.x=-Math.PI/2; line.position.set(x,0.05,0); scene.add(line);
  }
  for(var z=-600;z<=600;z+=60){
    var lineG2=new THREE.PlaneGeometry(CITY_SIZE,2);
    var line2=new THREE.Mesh(lineG2,lineMat);
    line2.rotation.x=-Math.PI/2; line2.position.set(0,0.05,z); scene.add(line2);
  }

  // ── SKYSCRAPERS (Manhattan style) ──
  var buildings = [
    // Downtown / Financial District
    {x:0,z:0,w:22,d:22,h:280,c:0x1a2035,name:'Empire State'},
    {x:80,z:-60,w:18,d:18,h:180,c:0x1e2a3a},{x:-80,z:-60,w:16,d:16,h:200,c:0x152030},
    {x:120,z:40,w:20,d:18,h:160,c:0x1c2838},{x:-120,z:40,w:22,d:20,h:190,c:0x1a2535},
    {x:200,z:-100,w:25,d:22,h:220,c:0x1e2840,name:'One WTC'},
    {x:-200,z:-100,w:20,d:18,h:175,c:0x1a2030},
    {x:60,z:120,w:16,d:14,h:140,c:0x182030},{x:-60,z:120,w:18,d:16,h:155,c:0x1c2a38},
    // Midtown
    {x:300,z:0,w:28,d:24,h:250,c:0x1a2a40,name:'Chrysler Bldg'},
    {x:-300,z:0,w:20,d:20,h:190,c:0x1e2838},{x:250,z:150,w:22,d:20,h:170,c:0x162028},
    {x:-250,z:150,w:18,d:16,h:160,c:0x1a2535},{x:350,z:-150,w:24,d:22,h:210,c:0x1c2a38},
    {x:-350,z:-150,w:20,d:18,h:185,c:0x182030},
    // Upper Manhattan
    {x:180,z:280,w:16,d:14,h:120,c:0x141e28},{x:-180,z:280,w:18,d:16,h:135,c:0x1a2535},
    {x:0,z:300,w:22,d:20,h:145,c:0x1c2838},{x:100,z:250,w:14,d:14,h:110,c:0x162030},
    {x:-100,z:250,w:16,d:14,h:125,c:0x1a2535},
    // Brooklyn-ish
    {x:400,z:200,w:20,d:18,h:95,c:0x1c2030},{x:-400,z:200,w:18,d:16,h:85,c:0x182028},
    {x:450,z:-50,w:16,d:14,h:105,c:0x1a2535},{x:-450,z:-50,w:18,d:16,h:90,c:0x1e2a3a},
    // Extra density
    {x:140,z:-180,w:14,d:14,h:155,c:0x182030},{x:-140,z:-180,w:16,d:14,h:140,c:0x1c2838},
    {x:220,z:-200,w:18,d:16,h:175,c:0x1a2535},{x:-220,z:-200,w:20,d:18,h:165,c:0x162030},
    {x:330,z:100,w:16,d:14,h:130,c:0x1c2030},{x:-330,z:100,w:18,d:16,h:120,c:0x1a2535},
    // Apartment blocks (shorter)
    {x:160,z:180,w:28,d:22,h:40,c:0x2a2020},{x:-160,z:180,w:24,d:20,h:38,c:0x282020},
    {x:240,z:80,w:26,d:22,h:45,c:0x202028},{x:-240,z:80,w:22,d:20,h:42,c:0x1e2030},
  ];

  buildings.forEach(function(b){
    // Main tower
    var geo = new THREE.BoxGeometry(b.w, b.h, b.d);
    var mat = new THREE.MeshLambertMaterial({color:b.c});
    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(b.x, b.h/2, b.z);
    mesh.castShadow=true; mesh.receiveShadow=true; scene.add(mesh);

    // Roof details
    var roofMat = new THREE.MeshLambertMaterial({color:0x0a1020});
    var roof = new THREE.Mesh(new THREE.BoxGeometry(b.w+0.5,1.5,b.d+0.5), roofMat);
    roof.position.set(b.x, b.h+0.75, b.z); scene.add(roof);

    // Antenna on tall buildings
    if(b.h > 150){
      var antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.3,b.h*0.12,6), new THREE.MeshLambertMaterial({color:0x888888}));
      antenna.position.set(b.x, b.h+b.h*0.06, b.z); scene.add(antenna);
    }

    // Windows (glow)
    var winMat = new THREE.MeshLambertMaterial({color:0x88aacc, emissive:new THREE.Color(0x112233), transparent:true, opacity:0.7});
    var floors = Math.max(2, Math.floor(b.h/8));
    var wcols  = Math.max(1, Math.floor(b.w/5));
    for(var f=0;f<floors;f++){
      for(var wi=0;wi<wcols;wi++){
        if(Math.random()<0.25) continue; // some windows dark
        var wx = b.x - b.w/2 + 2.5 + wi*(b.w-3)/wcols;
        var wy = 4 + f*8;
        if(wy > b.h-2) continue;
        var win=new THREE.Mesh(new THREE.PlaneGeometry(1.8,3), winMat);
        win.position.set(wx,wy,b.z+b.d/2+0.02); scene.add(win);
        var win2=new THREE.Mesh(new THREE.PlaneGeometry(1.8,3), winMat);
        win2.position.set(wx,wy,b.z-b.d/2-0.02); win2.rotation.y=Math.PI; scene.add(win2);
      }
    }

    // Web anchor points on rooftop and sides
    webAnchors.push(new THREE.Vector3(b.x, b.h+1, b.z));
    webAnchors.push(new THREE.Vector3(b.x+b.w/2, b.h*0.7, b.z));
    webAnchors.push(new THREE.Vector3(b.x-b.w/2, b.h*0.7, b.z));
    webAnchors.push(new THREE.Vector3(b.x, b.h*0.7, b.z+b.d/2));
    webAnchors.push(new THREE.Vector3(b.x, b.h*0.7, b.z-b.d/2));
  });

  // ── SPECIAL APARTMENTS ──
  buildPeterMJApartment();
  buildMilesApartment();
  buildUncleApartments();
  buildStanLeeRoom();

  // ── WATER TOWER PROPS ──
  for(var i=0;i<30;i++){
    var wx=(Math.random()-0.5)*800, wz=(Math.random()-0.5)*800;
    var tower=new THREE.Mesh(new THREE.CylinderGeometry(1.5,2,5,10), new THREE.MeshLambertMaterial({color:0x4a3020}));
    var nearBldg = buildings.reduce(function(best,b){ var d=Math.hypot(wx-b.x,wz-b.z); return d<best.d?{d:d,h:b.h}:best; },{d:99999,h:20});
    tower.position.set(wx,nearBldg.h+3.5,wz);
    scene.add(tower);
    webAnchors.push(new THREE.Vector3(wx,nearBldg.h+6,wz));
  }

  // ── BRIDGES ──
  buildBridge(-500, 0, 0, 1, 0); // Brooklyn Bridge
  buildBridge(500, 0, 0, 1, 0);  // George Washington Bridge

  // ── CENTRAL PARK ──
  var parkMat=new THREE.MeshLambertMaterial({color:0x1a3a1a});
  var park=new THREE.Mesh(new THREE.PlaneGeometry(120,180),parkMat);
  park.rotation.x=-Math.PI/2; park.position.set(-50,0.1,220); scene.add(park);
  // Trees in park
  for(var i=0;i<40;i++){
    var tx=-110+Math.random()*120, tz=140+Math.random()*160;
    var th=6+Math.random()*8;
    var tTrunk=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.5,th,7),new THREE.MeshLambertMaterial({color:0x3a2010}));
    tTrunk.position.set(tx,th/2,tz); scene.add(tTrunk);
    var tLeaf=new THREE.Mesh(new THREE.ConeGeometry(3+Math.random()*2,5+Math.random()*3,8),new THREE.MeshLambertMaterial({color:0x1a5a1a}));
    tLeaf.position.set(tx,th+2.5,tz); scene.add(tLeaf);
  }
}

function buildBridge(x, y, z, scaleX, scaleZ){
  var roadMat=new THREE.MeshLambertMaterial({color:0x333333});
  var road=new THREE.Mesh(new THREE.BoxGeometry(200,1.5,16),roadMat);
  road.position.set(x,y+30,z); scene.add(road);
  // Cables
  var cableMat=new THREE.MeshBasicMaterial({color:0x888888});
  for(var i=-90;i<=90;i+=15){
    var cable=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.15,30,5),cableMat);
    cable.position.set(x+i,y+45,z); cable.rotation.z=0.1; scene.add(cable);
    webAnchors.push(new THREE.Vector3(x+i,y+60,z));
  }
  // Towers
  [-90,90].forEach(function(ox){
    var tower=new THREE.Mesh(new THREE.BoxGeometry(4,50,4),new THREE.MeshLambertMaterial({color:0x444444}));
    tower.position.set(x+ox,y+55,z); scene.add(tower);
    webAnchors.push(new THREE.Vector3(x+ox,y+80,z));
  });
}

function buildPeterMJApartment(){
  var ax=-160, az=180, ah=40;
  // Building (already added in main buildings array as apartment block)
  // Interior marker — glowing window different color
  var aptMat=new THREE.MeshLambertMaterial({color:0xffaa44,emissive:new THREE.Color(0x441100),transparent:true,opacity:0.8});
  var aptWin=new THREE.Mesh(new THREE.PlaneGeometry(2.5,3.5),aptMat);
  aptWin.position.set(ax-14,ah*0.6,az+11.02); scene.add(aptWin);
  // Baby crib visible through window (tiny mesh)
  var crib=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.4,1.2),new THREE.MeshLambertMaterial({color:0xf5c518}));
  crib.position.set(ax-13.5,ah*0.55,az+10.5); scene.add(crib);
}

function buildMilesApartment(){
  var ax=160, az=180, ah=40;
  var aptMat=new THREE.MeshLambertMaterial({color:0x44aaff,emissive:new THREE.Color(0x001144),transparent:true,opacity:0.8});
  var aptWin=new THREE.Mesh(new THREE.PlaneGeometry(2.5,3.5),aptMat);
  aptWin.position.set(ax+14,ah*0.7,az+11.02); scene.add(aptWin);
}

function buildUncleApartments(){
  // Uncle Ben's house
  var bh=new THREE.Mesh(new THREE.BoxGeometry(18,12,16),new THREE.MeshLambertMaterial({color:0x3a2a1a}));
  bh.position.set(-380,6,250); scene.add(bh);
  webAnchors.push(new THREE.Vector3(-380,13,250));
  // Uncle Aaron
  var ah=new THREE.Mesh(new THREE.BoxGeometry(16,10,14),new THREE.MeshLambertMaterial({color:0x2a1a2a}));
  ah.position.set(380,5,250); scene.add(ah);
  webAnchors.push(new THREE.Vector3(380,11,250));
}

function buildStanLeeRoom(){
  // Stan Lee's cameo spot — a newsstand near Times Square
  var stand=new THREE.Mesh(new THREE.BoxGeometry(4,3,3),new THREE.MeshLambertMaterial({color:0x3a2010}));
  stand.position.set(5,1.5,5); scene.add(stand);
  // Stan Lee character hint — glowing exclamation
  var sign=new THREE.Mesh(new THREE.PlaneGeometry(1.5,1.5),new THREE.MeshBasicMaterial({color:0xf5c518}));
  sign.position.set(5,4.5,6.6); scene.add(sign);
}
