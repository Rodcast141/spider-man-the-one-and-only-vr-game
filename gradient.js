(function () {
  function addSkyAndLights(sceneEl) {
    var sky = document.createElement('a-sky');
    sky.setAttribute('color', '#1e3a8a');

    var sun = document.createElement('a-entity');
    sun.setAttribute('light', 'type: directional; color: #fff5d9; intensity: 1');
    sun.setAttribute('position', '4 8 -2');

    var ambient = document.createElement('a-entity');
    ambient.setAttribute('light', 'type: ambient; color: #94a3b8; intensity: 0.5');

    sceneEl.appendChild(sky);
    sceneEl.appendChild(sun);
    sceneEl.appendChild(ambient);
  }

  window.VRGame = window.VRGame || {};
  window.VRGame.addSkyAndLights = addSkyAndLights;
})();
