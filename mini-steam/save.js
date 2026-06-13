/* save.js — save installed state and high score to localStorage
   API: window.Save.setInstalled(true); Save.getInstalled(); Save.setHighscore(n); */
(function(){
  const KEY_INST = 'mini_steam_installed_v1';
  const KEY_SCORE = 'mini_steam_highscore_v1';
  function setInstalled(v){ localStorage.setItem(KEY_INST, v? '1':'0'); }
  function getInstalled(){ return localStorage.getItem(KEY_INST) === '1'; }
  function setHighscore(n){ localStorage.setItem(KEY_SCORE, String(n)); }
  function getHighscore(){ return parseInt(localStorage.getItem(KEY_SCORE)||'0',10); }
  window.Save = { setInstalled, getInstalled, setHighscore, getHighscore };
})();
