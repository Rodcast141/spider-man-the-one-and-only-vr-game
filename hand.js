(function () {
  function addHands(rigEl) {
    var left = document.createElement('a-entity');
    left.setAttribute('laser-controls', 'hand: left');
    left.setAttribute('raycaster', 'objects: .clickable');

    var right = document.createElement('a-entity');
    right.setAttribute('laser-controls', 'hand: right');
    right.setAttribute('raycaster', 'objects: .clickable');

    rigEl.appendChild(left);
    rigEl.appendChild(right);
  }

  window.VRGame = window.VRGame || {};
  window.VRGame.addHands = addHands;
})();
