const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const moleSize = 75;
let score = 0;
let best_Score = localStorage.getItem('best_score');
if (best_Score !== null) {
  best_Score = parseInt(best_Score)
} else {
  best_Score = 0;
}

const hit = new Audio('hit.mp3'); //音效預加載
hit.preload = 'auto';
hit.load();

const moleImage = new Image();  //圖片預加載
moleImage.src = "./youtube.png";
moleImage.onload = function () {
  updateGame();
};

function drawMole(x, y) {
  ctx.drawImage(moleImage, x, y, moleSize, moleSize - 10);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateScore() {
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`Time: ${50 - sec}`, 10, 60);
}

canvas.addEventListener("click", click_event);
function click_event(event) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  // Check if the click is on the mole
  if (mouseX >= moleX && mouseX <= moleX + moleSize && mouseY >= moleY && mouseY <= moleY + moleSize) {
    hit.currentTime = 0;
    hit.play();
    score++;
    updateGame();
  }
}

let moleX, moleY;

function updateGame() {
  clearCanvas();

  moleX = Math.random() * (canvas.width - moleSize);
  moleY = Math.random() * (canvas.height - moleSize);

  drawMole(moleX, moleY);
  updateScore();
}

let sec = 0;
let time1id = setInterval(() => {
  //console.log(sec);
  sec++;
  if (sec >= 50) {
    clearInterval(time1id);
    canvas.removeEventListener('click', click_event);
    clearCanvas();
    ctx.fillStyle = 'red';
    ctx.font = "40px Arial";
    ctx.fillText('Game Over', 400 - 120, 200);
    ctx.fillText(`Score:${score}`, 400 - 120, 260);

    if (best_Score < score) {
      localStorage.setItem('best_score', score);
    }
    ctx.fillText(`Best Score:${best_Score}`, 400 - 120, 320);
    return;
  }
  updateGame();
}, 1000, sec);

updateGame();
