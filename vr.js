// vr.js — WebXR VR support: web swinging in VR, controllers, haptics, TV remote

var inVR=false;
var vrCtrl0=null,vrCtrl1=null; // left, right
var vrGrip0=false,vrGrip1=false,vrTurnCd=0;
var vrTvRemote=null;

// ── TV REMOTE MESH (grabbable in VR) ──
function buildTVRemote(){
  var g=new THREE.Group();
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  var body=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.04,0.22),M(0x111111));
  g.add(body);
  // Buttons
  var buttonColors=[0xe8001c,0x22aa22,0x2222cc,0xffaa00];
  for(var i=0;i<4;i++){
    var btn=new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,0.008,8),new THREE.MeshLambertMaterial({color:buttonColors[i]}));
    btn.position.set((i%2-0.5)*0.03,(0.025),(i<2?-0.04:0.04));g.add(btn);
  }
  return g;
}

// ── VR CONTROLLER HAND MODEL ──
function buildVRHand(color){
  var g=new THREE.Group();
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  var palm=new THREE.Mesh(new THREE.BoxGeometry(0.07,0.025,0.09),M(color));
  palm.position.set(0,0,-0.02);g.add(palm);
  for(var i=0;i<4;i++){
    var finger=new THREE.Mesh(new THREE.BoxGeometry(0.013,0.022,0.044),M(color));
    finger.position.set(-0.025+i*0.017,0.012,-0.071);g.add(finger);
  }
  var thumb=new THREE.Mesh(new THREE.BoxGeometry(0.022,0.02,0.032),M(color));
  thumb.position.set(-0.04,0.008,-0.018);thumb.rotation.z=0.4;g.add(thumb);
  return g;
}

// ── WEB SHOOTER VISUAL (right hand VR) ──
function buildWebShooterMesh(){
  var g=new THREE.Group();
  var M=function(c){return new THREE.MeshLambertMaterial({color:c});};
  // Wrist device
  var wrist=new THREE.Mesh(new THREE.BoxGeometry(0.07,0.028,0.1),M(0xe8001c));
  g.add(wrist);
  // Nozzle
  var nozzle=new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.016,0.04,8),M(0xcccccc));
  nozzle.rotation.x=Math.PI/2;nozzle.position.set(0,0.015,0.06);g.add(nozzle);
  // Web fluid light
  var light=new THREE.PointLight(0xaaaaff,0.4,1.5);
  light.position.set(0,0.02,0);g.add(light);
  g._light=light;
  return g;
}

function initVR(){
  if(!navigator.xr)return;
  navigator.xr.isSessionSupported('immersive-vr').then(function(ok){
    if(!ok)return;
    var btn=document.getElementById('vrBtn');
    btn.style.display='block';
    btn.onclick=enterVR;
  }).catch(function(){});
}

async function enterVR(){
  try{
    var session=await navigator.xr.requestSession('immersive-vr',{requiredFeatures:['local-floor']});
    await renderer.xr.setSession(session);
    inVR=true;
    document.getElementById('vrBtn').textContent='EXIT VR';

    // Left: hand + TV remote (can grab)
    vrCtrl0=renderer.xr.getControllerGrip(0);
    scene.add(vrCtrl0);
    vrCtrl0.add(buildVRHand(0xf4c48a));
    vrTvRemote=buildTVRemote();
    vrTvRemote.position.set(0.05,-0.02,0.04);
    vrCtrl0.add(vrTvRemote);

    // Right: hand + web shooter
    vrCtrl1=renderer.xr.getControllerGrip(1);
    scene.add(vrCtrl1);
    var rightHand=buildVRHand(0xf4c48a); vrCtrl1.add(rightHand);
    var webShooter=buildWebShooterMesh(); vrCtrl1.add(webShooter);

    // Aim ray
    var ray=new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,-50)]),
      new THREE.LineBasicMaterial({color:0xcccccc,transparent:true,opacity:0.15})
    );
    vrCtrl1.add(ray);

    // Build VR HUD (world-space canvas)
    setupVRHUD();

    session.addEventListener('end',function(){
      inVR=false;
      document.getElementById('vrBtn').textContent='ENTER VR';
      removeVRHUD();
    });

    showToast('🥽 VR Ready! Right trigger = web swing · Left stick = move');
  }catch(e){
    console.warn('VR error:',e);
    showToast('VR error — check headset connection');
  }
}

// ── VR HUD ──
var vrHUDMesh=null, vrHUDTex=null, vrHUDCtx=null;
function setupVRHUD(){
  var cvs=document.createElement('canvas');cvs.width=512;cvs.height=128;
  vrHUDCtx=cvs.getContext('2d');
  vrHUDTex=new THREE.CanvasTexture(cvs);
  vrHUDMesh=new THREE.Mesh(
    new THREE.PlaneGeometry(0.4,0.1),
    new THREE.MeshBasicMaterial({map:vrHUDTex,transparent:true,depthTest:false})
  );
  vrHUDMesh.position.set(0,-0.12,-0.38);
  vrHUDMesh.renderOrder=999;
  camera.add(vrHUDMesh);
  updateVRHUD();
}
function removeVRHUD(){if(vrHUDMesh){camera.remove(vrHUDMesh);vrHUDMesh=null;}}
function updateVRHUD(){
  if(!vrHUDCtx||!vrHUDTex)return;
  var cx=vrHUDCtx,w=512,h=128;
  cx.clearRect(0,0,w,h);
  cx.fillStyle='rgba(0,0,0,.75)';cx.fillRect(0,0,w,h);
  cx.fillStyle='#e8001c';cx.font='bold 11px Arial';cx.fillText('HP',6,16);
  cx.fillStyle='rgba(255,255,255,.15)';cx.fillRect(30,4,180,14);
  cx.fillStyle='#e8001c';cx.fillRect(30,4,Math.max(0,player.hp/player.maxHp*180),14);
  cx.fillStyle='#1a90d9';cx.fillText('WEB',6,38);
  cx.fillStyle='rgba(255,255,255,.15)';cx.fillRect(36,26,174,14);
  cx.fillStyle='#1a90d9';cx.fillRect(36,26,Math.max(0,player.webFluid/player.maxWebFluid*174),14);
  cx.fillStyle='#fff';cx.font='9px Arial';cx.fillText(currentMission.name,6,58);
  cx.fillStyle='rgba(255,255,255,.5)';cx.font='9px Arial';cx.fillText(currentMission.objective,6,72);
  cx.fillStyle='#f5c518';cx.font='bold 11px Arial';cx.fillText('COMBO: '+player.combo,6,96);
  cx.fillStyle='rgba(255,255,255,.5)';cx.font='9px Arial';cx.fillText('SCORE: '+player.score,6,112);
  vrHUDTex.needsUpdate=true;
}

// ── VR INPUT ──
function updateVRInput(){
  var session=renderer.xr.getSession();if(!session)return;
  var dt=1/72;vrTurnCd-=dt;
  var xrCam=renderer.xr.getCamera(camera);

  session.inputSources.forEach(function(src){
    if(!src.gamepad)return;
    var gp=src.gamepad,left=src.handedness==='left',right=src.handedness==='right';
    var sx=gp.axes.length>2?gp.axes[2]:(gp.axes[0]||0);
    var sy=gp.axes.length>3?gp.axes[3]:(gp.axes[1]||0);

    if(left&&player.alive){
      // LEFT STICK = locomotion (head-relative direction)
      var dz=0.18;
      if(Math.abs(sx)>dz||Math.abs(sy)>dz){
        var hq=xrCam.getWorldQuaternion(new THREE.Quaternion());
        var he=new THREE.Euler().setFromQuaternion(hq,'YXZ');
        var fw=new THREE.Vector3(-Math.sin(he.y),0,-Math.cos(he.y));
        var rt=new THREE.Vector3(Math.cos(he.y),0,-Math.sin(he.y));
        var mag=Math.min(1,Math.hypot(sx,sy));
        var spd=webState.active?8*mag:5*mag;
        var mv=new THREE.Vector3();
        mv.addScaledVector(fw,-sy*spd*dt*60);
        mv.addScaledVector(rt,sx*spd*dt*60);
        player.vel.x+=mv.x;player.vel.z+=mv.z;
      }

      // LEFT GRIP = release web
      var lg=gp.buttons[4]?gp.buttons[4].pressed:false;
      if(lg&&!vrGrip0&&webState.active){releaseWeb();vrGrip0=true;}
      if(!lg)vrGrip0=false;

      // LEFT X BUTTON = TV remote menu
      var xb=gp.buttons[3]?gp.buttons[3].pressed:false;
      if(xb&&!vrGrip0){
        showToast('📺 TV Remote: Use the right stick to select');
      }
    }

    if(right&&player.alive){
      // RIGHT STICK = snap turn
      if(Math.abs(sx)>0.65&&vrTurnCd<=0){
        player.yaw+=sx>0?-Math.PI/4:Math.PI/4;vrTurnCd=0.28;
      }

      // RIGHT TRIGGER = SHOOT WEB (from controller direction)
      var trig=gp.buttons[0]?gp.buttons[0].value:0;
      if(trig>0.5&&!webState.active&&player.webFluid>0){
        // Shoot web in direction right controller is pointing
        var ctrlDir=new THREE.Vector3(0,0,-1).applyQuaternion(vrCtrl1.getWorldQuaternion(new THREE.Quaternion()));
        var ctrlPos=vrCtrl1.getWorldPosition(new THREE.Vector3());

        // Find anchor in controller direction
        var best=null,bestScore=-Infinity;
        webAnchors.forEach(function(a){
          var toA=a.clone().sub(ctrlPos);
          var dist=toA.length();
          if(dist<5||dist>220)return;
          var dot=ctrlDir.dot(toA.normalize());
          if(dot<0.15)return;
          var score=dot*100-dist*0.3+(a.y-ctrlPos.y)*0.5;
          if(score>bestScore){bestScore=score;best=a;}
        });
        if(best){
          webState.active=true;
          webState.anchor=best.clone();
          webState.length=player.pos.distanceTo(best)*0.9;
          var impulse=best.clone().sub(player.pos).normalize().multiplyScalar(20);
          impulse.y=Math.abs(impulse.y)+5;
          player.vel.add(impulse);
          player.swinging=true;
          player.webFluid=Math.max(0,player.webFluid-8);
          // Haptic pop on web attachment
          if(gp.hapticActuators&&gp.hapticActuators[0])gp.hapticActuators[0].pulse(0.8,80);
          // Draw web line
          var geo=new THREE.BufferGeometry().setFromPoints([player.pos.clone(),best.clone()]);
          webState.mesh=new THREE.Line(geo,new THREE.LineBasicMaterial({color:0xdddddd}));
          scene.add(webState.mesh);webLines.push(webState.mesh);
        }
      }

      // RIGHT GRIP = attack nearest enemy
      var rg=gp.buttons[4]?gp.buttons[4].pressed:false;
      if(rg&&!vrGrip1){
        var nearest=null,nearDist=20;
        villainInstances.forEach(function(v){
          if(!v.alive)return;
          var d=player.pos.distanceTo(v.pos);
          if(d<nearDist){nearDist=d;nearest=v;}
        });
        if(nearest){
          hitVillain(nearest,45);
          if(gp.hapticActuators&&gp.hapticActuators[0])gp.hapticActuators[0].pulse(0.6,60);
        }
        vrGrip1=true;
      }
      if(!rg)vrGrip1=false;

      // RIGHT B BUTTON = jump/boost
      var bb=gp.buttons[5]?gp.buttons[5].pressed:false;
      if(bb){
        player.vel.y+=12;
        if(gp.hapticActuators&&gp.hapticActuators[0])gp.hapticActuators[0].pulse(0.4,50);
      }
    }
  });

  // Sync camera rig
  camPivot.position.set(player.pos.x,player.pos.y,player.pos.z);
  camPivot.rotation.y=player.yaw;

  // Update VR HUD every frame
  updateVRHUD();
}
