/* localstore-ext.js — расширение Save.js для мульти-игрового состояния */
(function(){
  const NS = 'mini_steam_v2_';
  function key(name){ return NS + name; }
  function set(keyName, value){ localStorage.setItem(key(keyName), JSON.stringify(value)); }
  function get(keyName, def){ const v = localStorage.getItem(key(keyName)); return v ? JSON.parse(v) : def; }
  function clear(){ Object.keys(localStorage).forEach(k=>{ if(k.indexOf(NS)===0) localStorage.removeItem(k); }); }
  window.LocalStoreExt = { set, get, clear };
})();
