(function () {
  if (window.AFRAME && !AFRAME.components['joystick-locomotion']) {
    AFRAME.registerComponent('joystick-locomotion', {
      schema: {
        speed: { type: 'number', default: 4 },
        deadZone: { type: 'number', default: 0.14 }
      },

      tick: function (time, delta) {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        var pad = null;
        var i;

        for (i = 0; i < gamepads.length; i += 1) {
          if (gamepads[i] && gamepads[i].connected && gamepads[i].axes && gamepads[i].axes.length >= 2) {
            pad = gamepads[i];
            break;
          }
        }

        if (!pad) {
          this.el.emit('avatar-move-state', { moving: false });
          return;
        }

        var x = pad.axes[0] || 0;
        var z = pad.axes[1] || 0;
        var moveLength = Math.sqrt(x * x + z * z);

        if (moveLength < this.data.deadZone) {
          this.el.emit('avatar-move-state', { moving: false });
          return;
        }

        var step = this.data.speed * (delta / 1000);
        var direction = new THREE.Vector3(x, 0, z);
        var camera = this.el.querySelector('a-camera');

        if (camera && camera.object3D) {
          var yaw = camera.object3D.rotation.y;
          direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
        }

        this.el.object3D.position.x += direction.x * step;
        this.el.object3D.position.z += direction.z * step;
        this.el.emit('avatar-move-state', { moving: true });
      }
    });
  }

  if (window.AFRAME && !AFRAME.components['avatar-walk']) {
    AFRAME.registerComponent('avatar-walk', {
      schema: {
        leftLeg: { type: 'selector' },
        rightLeg: { type: 'selector' },
        leftArm: { type: 'selector' },
        rightArm: { type: 'selector' }
      },

      init: function () {
        this.moving = false;
        this.lastPosition = this.el.object3D.position.clone();

        this.onMoveState = this.onMoveState.bind(this);
        this.el.addEventListener('avatar-move-state', this.onMoveState);
      },

      onMoveState: function (event) {
        this.moving = event.detail && event.detail.moving;
      },

      tick: function (time) {
        var currentPosition = this.el.object3D.position;
        var deltaX = currentPosition.x - this.lastPosition.x;
        var deltaZ = currentPosition.z - this.lastPosition.z;
        var hasTranslated = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ) > 0.002;
        var isWalking = this.moving || hasTranslated;

        this.lastPosition.copy(currentPosition);

        if (!isWalking) {
          this.setWalkAngles(0);
          return;
        }

        var swing = Math.sin(time * 0.012) * 28;
        this.setWalkAngles(swing);
      },

      setWalkAngles: function (swing) {
        if (this.data.leftLeg && this.data.leftLeg.object3D) {
          this.data.leftLeg.object3D.rotation.x = THREE.MathUtils.degToRad(swing);
        }
        if (this.data.rightLeg && this.data.rightLeg.object3D) {
          this.data.rightLeg.object3D.rotation.x = THREE.MathUtils.degToRad(-swing);
        }
        if (this.data.leftArm && this.data.leftArm.object3D) {
          this.data.leftArm.object3D.rotation.x = THREE.MathUtils.degToRad(-swing * 0.6);
        }
        if (this.data.rightArm && this.data.rightArm.object3D) {
          this.data.rightArm.object3D.rotation.x = THREE.MathUtils.degToRad(swing * 0.6);
        }
      },

      remove: function () {
        this.el.removeEventListener('avatar-move-state', this.onMoveState);
      }
    });
  }

  function setupSwingMode(buttonEl, rigEl) {
    var swingMode = false;

    buttonEl.addEventListener('click', function () {
      swingMode = !swingMode;
      rigEl.setAttribute('wasd-controls', 'acceleration: ' + (swingMode ? 80 : 45));
      rigEl.setAttribute('joystick-locomotion', 'speed: ' + (swingMode ? 7 : 4) + '; deadZone: 0.14');
      buttonEl.textContent = swingMode ? 'Swing mode: on' : 'Toggle swing mode';
    });
  }

  function setupCopyCode(buttonEl, statusEl) {
    var files = ['index.html', 'tile.js', 'map.js', 'gradient.js', 'player.js', 'hand.js', 'radio.js', 'web.js', 'README.md'];

    buttonEl.addEventListener('click', function () {
      statusEl.textContent = 'Preparing code...';

      Promise.all(
        files.map(function (file) {
          return fetch('./' + file).then(function (response) {
            if (!response.ok) {
              throw new Error('Could not load ' + file);
            }
            return response.text().then(function (text) {
              return '--- ' + file + ' ---\n' + text.trimEnd() + '\n';
            });
          });
        })
      )
        .then(function (parts) {
          var allCode = parts.join('\n');
          return navigator.clipboard.writeText(allCode);
        })
        .then(function () {
          statusEl.textContent = 'Copied! Paste anywhere.';
        })
        .catch(function () {
          statusEl.textContent = 'Copy failed. Check browser clipboard permissions.';
        });
    });
  }

  window.addEventListener('DOMContentLoaded', function () {
    var sceneEl = document.getElementById('scene');
    var worldEl = document.getElementById('world');
    var rigEl = document.getElementById('rig');

    window.VRGame.addSkyAndLights(sceneEl);
    window.VRGame.createCity(worldEl);
    window.VRGame.createPlayerRig(rigEl);
    window.VRGame.addHands(rigEl);

    window.VRGame.bindMusicButton(document.getElementById('music-toggle'), sceneEl);
    setupSwingMode(document.getElementById('swing-toggle'), rigEl);
    setupCopyCode(document.getElementById('copy-code'), document.getElementById('copy-status'));
  });
})();
