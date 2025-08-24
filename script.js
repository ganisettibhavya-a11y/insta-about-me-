const emojis = ['💻','🎨','🚀','📚','😂','🐾','☕','🍕','😎','😹'];
let gameEmojis = [];
let firstCard, secondCard;
let moves = 0;
let matched = 0;
let timeLeft = 20;
let timerInterval;

// Leaderboard from localStorage
const leaderboard = JSON.parse(localStorage.getItem('memoryLeaderboard') || '[]');

const memoryBoard = document.getElementById('memoryBoard');
const movesCount = document.getElementById('movesCount');
const timerDisplay = document.getElementById('timer');
const memoryLeaderboard = document.getElementById('memoryLeaderboard');

function startGame() {
  const player = document.getElementById('playerName').value || 'Anonymous';
  moves = 0; matched = 0; timeLeft = 20;
  movesCount.textContent = moves;
  timerDisplay.textContent = timeLeft;

  // Clear previous board
  memoryBoard.innerHTML = '';

  // Prepare emojis (10 pairs)
  gameEmojis = [...emojis, ...emojis];
  gameEmojis.sort(() => Math.random() - 0.5);

  // Create cards
  gameEmojis.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.addEventListener('click', () => flipCard(card));
    memoryBoard.appendChild(card);
  });

  // Start timer
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if(timeLeft <= 0) endGame(player);
  }, 1000);
}

function flipCard(card){
  if(card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.textContent = card.dataset.emoji;
  card.classList.add('flipped');

  if(!firstCard){
    firstCard = card;
  } else {
    secondCard = card;
    moves++;
    movesCount.textContent = moves;
    checkMatch();
  }
}

function checkMatch(){
  if(firstCard.dataset.emoji === secondCard.dataset.emoji){
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matched += 2;
    resetFlip();
    if(matched === gameEmojis.length) endGame(document.getElementById('playerName').value || 'Anonymous');
  } else {
    setTimeout(() => {
      firstCard.textContent = '';
      secondCard.textContent = '';
      resetFlip();
    }, 800);
  }
}

function resetFlip(){
  firstCard = null;
  secondCard = null;
}

function endGame(player){
  clearInterval(timerInterval);
  alert(`Game Over! Moves: ${moves}`);

  // Save to leaderboard
  leaderboard.push({player, moves});
  leaderboard.sort((a,b)=> a.moves - b.moves);
  if(leaderboard.length>5) leaderboard.splice(5); // keep top 5
  localStorage.setItem('memoryLeaderboard', JSON.stringify(leaderboard));
  updateLeaderboard();
}

// Show leaderboard
function updateLeaderboard(){
  memoryLeaderboard.innerHTML = '';
  leaderboard.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.player} - ${entry.moves} moves`;
    memoryLeaderboard.appendChild(li);
  });
}

// Initialize leaderboard on page load
updateLeaderboard();

document.getElementById('startBtn').addEventListener('click', startGame);
