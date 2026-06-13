// modal.js — простой модальный контрол
(function(){
  function open(html){
    let div = document.createElement('div'); div.className='mini-modal'; div.innerHTML = `<div class="mini-modal-backdrop" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:9999"><div style="background:#0b1220;padding:18px;border-radius:8px;max-width:90%;">${html}<div style="text-align:right;margin-top:12px"><button id=miniModalClose style="padding:6px 10px">Close</button></div></div></div>`;
    document.body.appendChild(div);
    document.getElementById('miniModalClose').addEventListener('click', ()=> close());
  }
  function close(){ const el=document.querySelector('.mini-modal'); if(el) el.remove(); }
  window.MiniModal = { open, close };
})();
