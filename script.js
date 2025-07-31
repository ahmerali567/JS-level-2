const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const gameOverText = document.getElementById("gameOver");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

let isJumping = false;
let isGameOver = false;
let score = 0;
let collisionInterval;
let scoreInterval;

document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && !isJumping && !isGameOver) {
    jump();
  }
});

function jump() {
  isJumping = true;
  let position = 0;

  const upInterval = setInterval(() => {
    if (position >= 100) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 5;
          dino.style.bottom = position + 40 + "px";
        }
      }, 20);
    } else {
      position += 5;
      dino.style.bottom = position + 40 + "px";
    }
  }, 20);
}

function checkCollision() {
  const dinoRect = dino.getBoundingClientRect();
  const cactusRect = cactus.getBoundingClientRect();

  if (
    cactusRect.left < dinoRect.right &&
    cactusRect.right > dinoRect.left &&
    cactusRect.bottom > dinoRect.top &&
    cactusRect.top < dinoRect.bottom
  ) {
    gameOver();
  }
}

function gameOver() {
  isGameOver = true;
  cactus.style.animationPlayState = "paused";
  gameOverText.style.display = "block";
  restartBtn.style.display = "block";
  clearInterval(scoreInterval);
  clearInterval(collisionInterval);
}

function restartGame() {
  // Reset values
  isGameOver = false;
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  gameOverText.style.display = "none";
  restartBtn.style.display = "none";

  // Reset dino and cactus
  dino.style.bottom = "40px";
  cactus.style.animation = "none";
  void cactus.offsetWidth; // Force reflow
  cactus.style.animation = "moveCactus 1.5s linear infinite";

  // Restart intervals
  scoreInterval = setInterval(() => {
    if (!isGameOver) {
      score++;
      scoreDisplay.textContent = "Score: " + score;
    }
  }, 200);

  collisionInterval = setInterval(checkCollision, 10);
}

// Start game
scoreInterval = setInterval(() => {
  if (!isGameOver) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
  }
}, 200);

collisionInterval = setInterval(checkCollision, 10);

