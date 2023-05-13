// Game configuration
var pong = document.getElementById("pong");
var paddleA = document.getElementById("paddleA");
var paddleB = document.getElementById("paddleB");
var ball = document.getElementById("ball");
var pongRect = pong.getBoundingClientRect();
var paddleSpeed = 5;
var ballSpeed = 2;
var ballX = pongRect.width / 2 - ball.offsetWidth / 2;
var ballY = pongRect.height / 2 - ball.offsetHeight / 2;
var dx = ballSpeed; // Ball's horizontal speed
var dy = ballSpeed; // Ball's vertical speed
var scoreA = 0;
var scoreB = 0;

// Keyboard input
var keys = {};
document.addEventListener("keydown", function (e) {
  keys[e.key] = true;
});
document.addEventListener("keyup", function (e) {
  keys[e.key] = false;
});

// Update paddles and ball positions
function update() {
  // Move paddle A
  if (keys["ArrowUp"] && paddleA.offsetTop > 0) {
    paddleA.style.top = paddleA.offsetTop - paddleSpeed + "px";
  } else if (keys["ArrowDown"] && paddleA.offsetTop + paddleA.offsetHeight < pongRect.height) {
    paddleA.style.top = paddleA.offsetTop + paddleSpeed + "px";
  }

  // Move paddle B
  if (keys["w"] && paddleB.offsetTop > 0) {
    paddleB.style.top = paddleB.offsetTop - paddleSpeed + "px";
  } else if (keys["s"] && paddleB.offsetTop + paddleB.offsetHeight < pongRect.height) {
    paddleB.style.top = paddleB.offsetTop + paddleSpeed + "px";
  }

  // Move ball
  ballX += dx;
  ballY += dy;

  // Ball collision with paddles
  if (ballX <= paddleA.offsetLeft + paddleA.offsetWidth && ballY + ball.offsetHeight >= paddleA.offsetTop && ballY <= paddleA.offsetTop + paddleA.offsetHeight) {
    dx = ballSpeed;
  } else if (ballX + ball.offsetWidth >= paddleB.offsetLeft && ballY + ball.offsetHeight >= paddleB.offsetTop && ballY <= paddleB.offsetTop + paddleB.offsetHeight) {
    dx = -ballSpeed;
  }

  // Ball collision with walls
  if (ballY <= 0 || ballY + ball.offsetHeight >= pongRect.height) {
    dy = -dy;
  }

  // Ball scoring
  if (ballX < 0) {
    scoreB++;
    resetBall();
  } else if (ballX + ball.offsetWidth > pongRect.width) {
    scoreA++;
    resetBall();
  }

  // Update ball position
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  // Update score
  document.getElementById("scoreA").textContent = scoreA;
  document.getElementById("scoreB").textContent = scoreB;

  // Repeat the update function
  requestAnimationFrame(update);
}

// Reset ball position
function resetBall() {
  ballX = pongRect.width / 2 - ball.offsetWidth / 2;
  ballY = pongRect.height / 2 - ball.offsetHeight / 2;
  dx = -dx;
  dy = -dy;
}

// Start the game
requestAnimationFrame(update);
