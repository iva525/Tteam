// clicker.js — простой кликер
(function(){
  let count=0; function create(container){ const btn=document.createElement('button'); const span=document.createElement('div'); btn.textContent='Click me'; span.textContent='0'; btn.addEventListener('click',()=>{ count++; span.textContent=count; }); container.appendChild(btn); container.appendChild(span); }
  window.Clicker = { create };
})();
