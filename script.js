// 🚀 Intro screen button
document.getElementById("introStartBtn").addEventListener("click", function() {
  document.getElementById("introScreen").style.display = "none";
  const main = document.getElementById("mainContent");
  main.style.display = "block";
  setTimeout(() => main.classList.add("show"), 50);
});

// 🎮 Memory Game
const emojis = ['💻','🎨','🚀','📚','😂','🐾','☕','🍕','😎','😹'];
let gameEmojis = [];
let firstCard = null;
let secondCard = null;
let moves = 0;
let matched = 0;
let timeLeft = 20;
let timerInterval;
let busy = false;

const memoryBoard = document.getElementById('memoryBoard');
const movesCount = document.getElementById('movesCount');
const timerDisplay = document.getElementById('timer');
const gameStartBtn = document.getElementById('gameStartBtn');

// attach only for the game button
gameStartBtn.addEventListener("click", startGame);

function startGame() {
  const player = document.getElementById('playerName').value || 'Anonymous';
  moves = 0; matched = 0; timeLeft = 20;
  movesCount.textContent = moves;
  timerDisplay.textContent = timeLeft;
  memoryBoard.innerHTML = '';
  gameEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

  gameEmojis.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.addEventListener('click', () => flipCard(card));
    memoryBoard.appendChild(card);
  });

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) endGame(player);
  }, 1000);
}

function flipCard(card) {
  if (card.classList.contains('flipped') || card.classList.contains('matched') || busy) return;

  card.textContent = card.dataset.emoji;
  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    moves++;
    movesCount.textContent = moves;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matched += 2;
      resetFlip();

      if (matched === gameEmojis.length) endGame(document.getElementById('playerName').value || 'Anonymous');
    } else {
      busy = true;
      setTimeout(() => {
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetFlip();
        busy = false;
      }, 800);
    }
  }
}

function resetFlip() {
  firstCard = null;
  secondCard = null;
}

function endGame(player) {
  clearInterval(timerInterval);
  alert(`🎉 Game Over, ${player}! You matched ${matched / 2} pairs in ${moves} moves 🎉`);
}
