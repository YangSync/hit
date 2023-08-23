const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const hit = document.getElementById('hit');
const moleSize = 75;//50
let score = 0;
const savedScore = localStorage.getItem('score');
if (savedScore !== null) {
  score = parseInt(savedScore); // string->number
}

const moleImage = new Image();
moleImage.src = "./youtube.png";
moleImage.onload = function () {
  updateGame();
};

function drawMole(x, y) {
  /*
  ctx.fillStyle = "brown";
  ctx.fillRect(x, y, moleSize, moleSize);
  */
  ctx.drawImage(moleImage, x, y, moleSize, moleSize - 10);


}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateScore() {
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  localStorage.setItem('score', score);
  ctx.fillText(`Score: ${score}`, 10, 30);
}

canvas.addEventListener("click", (event) => {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  // Check if the click is on the mole
  if (mouseX >= moleX && mouseX <= moleX + moleSize && mouseY >= moleY && mouseY <= moleY + moleSize) {
    hit.play();
    score++;
    updateGame();
  }
});

let moleX, moleY;

function updateGame() {
  clearCanvas();

  moleX = Math.random() * (canvas.width - moleSize);
  moleY = Math.random() * (canvas.height - moleSize);

  drawMole(moleX, moleY);
  updateScore();
}

updateGame();