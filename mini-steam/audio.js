/* audio.js — tiny WebAudio helpers
   Usage: window.GameAudio.init(); window.GameAudio.play('shoot'); */
(function(){
  let ctx=null;
  function init(){ if (ctx) return; ctx = new (window.AudioContext || window.webkitAudioContext)(); }
  function beep(freq, time, type='sine'){ if (!ctx) init(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = type; o.frequency.value = freq; o.connect(g); g.connect(ctx.destination); o.start(); g.gain.setValueAtTime(0.002, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime+0.01); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+time); o.stop(ctx.currentTime+time+0.02); }
  function play(name){ if (!ctx) init(); if (name==='shoot') beep(800,0.08,'square'); if (name==='explosion') beep(80,0.35,'sawtooth'); }
  window.GameAudio = { init, play };
})();
