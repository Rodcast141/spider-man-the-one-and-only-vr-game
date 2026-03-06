(function () {
  function createGround() {
    var ground = document.createElement('a-plane');
    ground.setAttribute('rotation', '-90 0 0');
    ground.setAttribute('width', '120');
    ground.setAttribute('height', '120');
    ground.setAttribute('color', '#0f172a');
    ground.setAttribute('material', 'roughness: 1');
    return ground;
  }

  function createCity(worldEl) {
    worldEl.appendChild(createGround());

    for (var x = -40; x <= 40; x += 8) {
      for (var z = -40; z <= 40; z += 8) {
        if (Math.abs(x) < 8 && Math.abs(z) < 8) {
          continue;
        }

        var building = window.VRGame.createBuilding(x, z);
        worldEl.appendChild(building);
      }
    }
  }

  window.VRGame = window.VRGame || {};
  window.VRGame.createCity = createCity;
})();
