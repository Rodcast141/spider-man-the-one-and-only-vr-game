(function () {
  function createLimb(tag, options) {
    var limb = document.createElement(tag);
    limb.setAttribute('position', options.position);
    limb.setAttribute('color', options.color);

    if (options.radius) {
      limb.setAttribute('radius', options.radius);
    }
    if (options.height) {
      limb.setAttribute('height', options.height);
    }
    if (options.width) {
      limb.setAttribute('width', options.width);
    }
    if (options.depth) {
      limb.setAttribute('depth', options.depth);
    }

    limb.setAttribute('material', 'roughness: 0.55; metalness: 0.12');
    return limb;
  }

  function createPlayerRig(rigEl) {
    rigEl.setAttribute('position', '0 0 8');
    rigEl.setAttribute('wasd-controls', 'acceleration: 45');
    rigEl.setAttribute('joystick-locomotion', 'speed: 4; deadZone: 0.14');
    rigEl.setAttribute('avatar-walk', 'leftLeg: #left-leg; rightLeg: #right-leg; leftArm: #left-arm; rightArm: #right-arm');

    var avatarRoot = document.createElement('a-entity');
    avatarRoot.setAttribute('id', 'avatar-root');
    avatarRoot.setAttribute('position', '0 0 0');

    var torso = createLimb('a-box', {
      position: '0 1.05 0',
      width: '0.55',
      height: '0.8',
      depth: '0.28',
      color: '#c8102e'
    });

    var torsoStripe = createLimb('a-box', {
      position: '0 1.05 0.145',
      width: '0.21',
      height: '0.8',
      depth: '0.02',
      color: '#1d4ed8'
    });

    var head = createLimb('a-sphere', {
      position: '0 1.63 0',
      radius: '0.18',
      color: '#c8102e'
    });

    var leftEye = createLimb('a-box', {
      position: '-0.055 1.66 0.155',
      width: '0.06',
      height: '0.03',
      depth: '0.01',
      color: '#f8fafc'
    });

    var rightEye = createLimb('a-box', {
      position: '0.055 1.66 0.155',
      width: '0.06',
      height: '0.03',
      depth: '0.01',
      color: '#f8fafc'
    });

    var leftArm = createLimb('a-cylinder', {
      position: '-0.38 1.06 0',
      radius: '0.07',
      height: '0.84',
      color: '#c8102e'
    });
    leftArm.setAttribute('id', 'left-arm');

    var rightArm = createLimb('a-cylinder', {
      position: '0.38 1.06 0',
      radius: '0.07',
      height: '0.84',
      color: '#c8102e'
    });
    rightArm.setAttribute('id', 'right-arm');

    var leftLeg = createLimb('a-cylinder', {
      position: '-0.15 0.35 0',
      radius: '0.09',
      height: '0.7',
      color: '#1d4ed8'
    });
    leftLeg.setAttribute('id', 'left-leg');

    var rightLeg = createLimb('a-cylinder', {
      position: '0.15 0.35 0',
      radius: '0.09',
      height: '0.7',
      color: '#1d4ed8'
    });
    rightLeg.setAttribute('id', 'right-leg');

    avatarRoot.appendChild(torso);
    avatarRoot.appendChild(torsoStripe);
    avatarRoot.appendChild(head);
    avatarRoot.appendChild(leftEye);
    avatarRoot.appendChild(rightEye);
    avatarRoot.appendChild(leftArm);
    avatarRoot.appendChild(rightArm);
    avatarRoot.appendChild(leftLeg);
    avatarRoot.appendChild(rightLeg);

    var camera = document.createElement('a-camera');
    camera.setAttribute('position', '0 1.6 0');
    camera.setAttribute('look-controls', 'pointerLockEnabled: true');

    var cursor = document.createElement('a-cursor');
    cursor.setAttribute('color', '#38bdf8');
    cursor.setAttribute('fuse', 'false');
    camera.appendChild(cursor);

    rigEl.appendChild(avatarRoot);
    rigEl.appendChild(camera);
  }

  window.VRGame = window.VRGame || {};
  window.VRGame.createPlayerRig = createPlayerRig;
})();
