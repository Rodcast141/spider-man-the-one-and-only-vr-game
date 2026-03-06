(function () {
  function bindMusicButton(buttonEl, sceneEl) {
    var isPlaying = false;

    buttonEl.addEventListener('click', function () {
      if (isPlaying) {
        sceneEl.removeAttribute('sound');
        buttonEl.textContent = 'Play music';
      } else {
        sceneEl.setAttribute('sound', 'src: #city-audio; autoplay: true; loop: true; volume: 0.5');
        buttonEl.textContent = 'Stop music';
      }

      isPlaying = !isPlaying;
    });
  }

  window.VRGame = window.VRGame || {};
  window.VRGame.bindMusicButton = bindMusicButton;
})();
