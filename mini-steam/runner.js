// runner.js — endless runner placeholder (DOM-based)
(function(){
  function start(container){
    const el = document.createElement('div'); el.className='runner-demo'; el.style.padding='12px'; el.innerHTML = '<div style="height:140px;background:#081220;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#7be0ff">Runner demo placeholder</div>';
    container.appendChild(el);
  }
  window.RunnerDemo = { start };
})();
