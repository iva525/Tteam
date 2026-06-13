// game.js — handles fake install + simple shooter game

// --- UI and fake install ---
const installBtn = document.getElementById('installBtn');
const playBtn = document.getElementById('playBtn');
const progressWrap = document.getElementById('progressWrap');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const gameContainer = document.getElementById('gameContainer');
const welcome = document.getElementById('welcome');
const backBtn = document.getElementById('backBtn');

let installed = false;

installBtn.addEventListener('click', () => {
  if (installed) return;
  progressWrap.classList.remove('hidden');
  installBtn.disabled = true;
  let p = 0;
  const t = setInterval(() => {
    p += Math.floor(Math.random() * 12) + 6; // random progress
    if (p >= 100) p = 100;
    progressBar.style.width = p + '%';
    progressText.textContent = p + '%';
    if (p >= 100) {
      clearInterval(t);
      installed = true;
      playBtn.disabled = false;
      installBtn.textContent = 'Installed';
      setTimeout(() => progressWrap.classList.add('hidden'), 600);
    }
  }, 300);
});

playBtn.addEventListener('click', () => {
  if (!installed) return;
  welcome.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  startGame();
});

backBtn.addEventListener('click', () => {
  stopGame();
  gameContainer.classList.add('hidden');
  welcome.classList.remove('hidden');
});

// --- Simple shooter game ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let running = false;
let animationId = null;

const state = {
  player: { x: canvas.width / 2 - 20, y: canvas.height - 40, w: 40, h: 16, speed: 5 },
  bullets: [],
  enemies: [],
  keys: {},
  score: 0,
  spawnTimer: 0,
  gameOver: false
};

function startGame(){
  resetState();
  running = true;
  state.gameOver = false;
  loop();
}

function stopGame(){
  running = false;
  if (animationId) cancelAnimationFrame(animationId);
}

function resetState(){
  state.player.x = canvas.width / 2 - state.player.w / 2;
  state.bullets = [];
  state.enemies = [];
  state.keys = {};
  state.score = 0;
  state.spawnTimer = 0;
  state.gameOver = false;
  document.getElementById('score').textContent = state.score;
}

function spawnEnemy(){
  const w = 28 + Math.random() * 30;
  const x = Math.random() * (canvas.width - w);
  const speed = 1 + Math.random() * 2;
  state.enemies.push({ x, y: -20, w, h: 18, speed });
}

function loop(){
  update();
  draw();
  if (!state.gameOver) animationId = requestAnimationFrame(loop);
}

function update(){
  // input
  if (state.keys['ArrowLeft'] || state.keys['a']) state.player.x -= state.player.speed;
  if (state.keys['ArrowRight'] || state.keys['d']) state.player.x += state.player.speed;
  state.player.x = Math.max(0, Math.min(canvas.width - state.player.w, state.player.x));

  // bullets
  for (let i = state.bullets.length - 1; i >= 0; i--){
    const b = state.bullets[i];
    b.y -= b.speed;
    if (b.y < -10) state.bullets.splice(i,1);
  }

  // enemies
  state.spawnTimer += 1;
  if (state.spawnTimer > 50) {
    spawnEnemy();
    state.spawnTimer = 0;
  }
  for (let i = state.enemies.length - 1; i >= 0; i--){
    const e = state.enemies[i];
    e.y += e.speed;
    if (e.y > canvas.height + 30) {
      state.enemies.splice(i,1);
      // optionally penalize player
    }
  }

  // collisions
  for (let i = state.enemies.length - 1; i >= 0; i--){
    const e = state.enemies[i];
    // enemy hits player
    if (rectsOverlap(e, state.player)) {
      endGame();
      return;
    }
    // bullets hit enemy
    for (let j = state.bullets.length - 1; j >= 0; j--){
      const b = state.bullets[j];
      if (rectsOverlap(e, b)) {
        state.enemies.splice(i,1);
        state.bullets.splice(j,1);
        state.score += 10;
        document.getElementById('score').textContent = state.score;
        break;
      }
    }
  }
}

function draw(){
  // clear
  ctx.fillStyle = '#001219';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // player
  ctx.fillStyle = '#7be0ff';
  roundRect(ctx, state.player.x, state.player.y, state.player.w, state.player.h, 4, true);

  // bullets
  ctx.fillStyle = '#ffd166';
  state.bullets.forEach(b => roundRect(ctx, b.x, b.y, b.w, b.h, 3, true));

  // enemies
  ctx.fillStyle = '#ff6b6b';
  state.enemies.forEach(e => roundRect(ctx, e.x, e.y, e.w, e.h, 6, true));

  if (state.gameOver){
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width/2, canvas.height/2 - 10);
    ctx.font = '16px sans-serif';
    ctx.fillText('Press R to restart or Back to Library', canvas.width/2, canvas.height/2 + 20);
  }
}

function rectsOverlap(a,b){
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function roundRect(ctx, x, y, w, h, r, fill){
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y, x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r);
  ctx.arcTo(x, y, x+w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  else ctx.stroke();
}

// input handlers
window.addEventListener('keydown', (e) => {
  if (!running) return;
  state.keys[e.key] = true;
  if (e.key === ' '){ // space to shoot
    shoot();
    e.preventDefault();
  }
  if (e.key === 'r' || e.key === 'R'){
    if (state.gameOver) startGame();
  }
});
window.addEventListener('keyup', (e) => {
  state.keys[e.key] = false;
});

function shoot(){
  state.bullets.push({
    x: state.player.x + state.player.w/2 - 4,
    y: state.player.y - 8,
    w: 8, h: 12, speed: 6
  });
}

// end game
function endGame(){
  state.gameOver = true;
  running = false;
  // leave the Game Over screen drawn
}

// set canvas size responsive
function fitCanvas(){
  const parentWidth = canvas.parentElement.clientWidth;
  const maxW = Math.min(900, parentWidth - 20);
  canvas.width = Math.max(480, maxW);
  canvas.height = Math.round(canvas.width * 9 / 16);
}
window.addEventListener('resize', () => {
  fitCanvas();
  draw();
});
fitCanvas();
