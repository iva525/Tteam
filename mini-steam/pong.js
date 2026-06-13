// pong.js — очень упрощённая версия Pong на canvas
(function(){
  const canvas = document.createElement('canvas'); canvas.width=480; canvas.height=300; canvas.style.width='100%';
  const ctx = canvas.getContext('2d');
  let pY=130, aiY=130, ball={x:240,y:150,vx:3,vy:2}, pScore=0, aiScore=0, run=false, raf;
  function draw(){ ctx.fillStyle='#001'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#fff'; ctx.fillRect(10,pY,8,60); ctx.fillRect(canvas.width-18,aiY,8,60);
    ctx.beginPath(); ctx.arc(ball.x,ball.y,6,0,Math.PI*2); ctx.fill(); ctx.fillText(pScore+' - '+aiScore, canvas.width/2-10,20);
  }
  function update(){ if(!run) return; ball.x+=ball.vx; ball.y+=ball.vy; if(ball.y<8||ball.y>canvas.height-8) ball.vy*=-1; if(ball.x<30){ if(ball.y>pY&&ball.y<pY+60) ball.vx*=-1; else { aiScore++; reset(); } }
    if(ball.x>canvas.width-30){ if(ball.y>aiY&&ball.y<aiY+60) ball.vx*=-1; else { pScore++; reset(); } }
    aiY += (ball.y - (aiY+30))*0.05; draw(); raf=requestAnimationFrame(update);
  }
  function reset(){ ball.x=240; ball.y=150; ball.vx = (Math.random()>0.5?1:-1)*3; ball.vy = (Math.random()>0.5?1:-1)*2; }
  function start(container){ if(run) return; run=true; container.appendChild(canvas); update(); }
  function stop(){ run=false; if(raf) cancelAnimationFrame(raf); }
  window.PongDemo = { start, stop };
})();
