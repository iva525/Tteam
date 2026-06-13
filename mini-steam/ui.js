/* ui.js — optional UI wiring: reads Save and hooks buttons if present */
(function(){
  function wire(){
    const inst = document.getElementById('installBtn');
    const play = document.getElementById('playBtn');
    const progWrap = document.getElementById('progressWrap');
    if (!inst || !play) return;
    if (window.Save && window.Save.getInstalled()){
      inst.textContent = 'Installed';
      play.disabled = false;
    }
    inst.addEventListener('click', ()=>{
      // simple simulation – when finished, persist
      if (window.Save){ window.Save.setInstalled(true); }
    });
    // play button can stay as-is; game.js handles UI
  }
  window.addEventListener('load', wire);
})();
