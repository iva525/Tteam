/* enemyAI.js — exposes simple spawn patterns for game.js to call if desired */
(function(){
  function zigzagSpawn(state){
    // adds 3 enemies in a zigzag pattern
    for (let i=0;i<3;i++){
      const w = 24 + Math.random()*20;
      const x = (i%2===0) ? 20 + i*80 : state.canvasWidth - (20 + i*80) - w;
      const speed = 1 + Math.random()*1.6;
      state.enemies.push({ x, y:-10 - i*30, w, h:18, speed });
    }
  }
  window.EnemyAI = { zigzagSpawn };
})();
