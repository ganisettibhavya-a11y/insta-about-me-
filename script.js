const startBtn = document.getElementById('startBtn');
const gameArea = document.getElementById('gameArea');
const scoreSpan = document.getElementById('score');
const leaderboard = document.getElementById('leaderboard');

let score = 0;
let player = '';
let gameInterval;

startBtn.addEventListener('click', () => {
  player = document.getElementById('playerName').value.trim() || 'Anonymous';
  score = 0;
  scoreSpan.textContent = score;
  gameArea.innerHTML = '';
  leaderboard.innerHTML = '';
  startGame();
});

function startGame() {
  gameInterval = setInterval(() => {
    createMeme();
  }, 1000);

  // End game after 20 seconds
  setTimeout(endGame, 20000);
}

function createMeme() {
  const memes = ['😂','😹','🤯','😎','🤪'];
  const meme = document.createElement('span');
  meme.classList.add('meme');
  meme.textContent = memes[Math.floor(Math.random()*memes.length)];

  meme.style.top = Math.random() * (gameArea.clientHeight - 40) + 'px';
  meme.style.left = Math.random() * (gameArea.clientWidth - 40) + 'px';

  meme.addEventListener('click', () => {
    score++;
    scoreSpan.textContent = score;
    meme.remove();
  });

  gameArea.appendChild(meme);

  // Remove after 2s if not clicked
  setTimeout(() => { meme.remove(); }, 2000);
}

function endGame() {
  clearInterval(gameInterval);
  addToLeaderboard(player, score);
  alert(`${player}, your score: ${score}!`);
}

function addToLeaderboard(name, score) {
  const li = document.createElement('li');
  li.textContent = `${name}: ${score}`;
  leaderboard.appendChild(li);
}
