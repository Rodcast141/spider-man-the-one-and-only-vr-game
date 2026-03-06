(function () {
  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createBuilding(x, z) {
    var height = randomBetween(3, 22);
    var width = randomBetween(1.5, 4);
    var depth = randomBetween(1.5, 4);

    var building = document.createElement('a-box');
    building.setAttribute('position', x + ' ' + height / 2 + ' ' + z);
    building.setAttribute('width', width);
    building.setAttribute('height', height);
    building.setAttribute('depth', depth);
    building.setAttribute('color', '#334155');
    building.setAttribute('material', 'roughness: 0.7; metalness: 0.2');

    return building;
  }

  window.VRGame = window.VRGame || {};
  window.VRGame.createBuilding = createBuilding;
})();
