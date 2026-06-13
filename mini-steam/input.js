/* input.js — optional input helper (touch + keyboard mapping)
   Exposes window.InputHelper with init and isDown(key) */
(function(){
  const keys = new Set();
  const touchState = { left:false, right:false, fire:false };
  function onKey(e){ keys.add(e.key); }
  function onKeyUp(e){ keys.delete(e.key); }
  function init(){
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKeyUp);
    // basic touch zones (optional)
    // create invisible touch zones only on small screens
    if (window.innerWidth < 700){
      const left = document.createElement('div');
      const right = document.createElement('div');
      left.style.cssText = right.style.cssText = 'position:fixed;bottom:0;top:60%;width:50%;z-index:50;';
      left.style.left = '0'; right.style.right = '0';
      left.addEventListener('touchstart', ()=> keys.add('ArrowLeft'));
      left.addEventListener('touchend', ()=> keys.delete('ArrowLeft'));
      right.addEventListener('touchstart', ()=> keys.add('ArrowRight'));
      right.addEventListener('touchend', ()=> keys.delete('ArrowRight'));
      document.body.appendChild(left); document.body.appendChild(right);
    }
  }
  window.InputHelper = { init, isDown: (k)=> keys.has(k) };
})();
