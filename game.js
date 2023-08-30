document.body.addEventListener('touchmove', function (e) {
  e.preventDefault(); //防止滾動
}, { passive: false }); //passive兼容ios和android

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const moleSize = 75;
let score = 0;
let can = true;
let best_Score = localStorage.getItem('best_score');  //讀歷史最佳成績
if (best_Score !== null) {
  best_Score = parseInt(best_Score)
} else {
  best_Score = 0;
}

/*const hit = new Audio('hit.mp3'); //音效預加載
hit.preload = 'auto';
hit.load();*/
var sound = new Howl({
  src: ['hit.mp3']
});

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
  ctx.clearRect(0, 0, 120, 64);
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`Time: ${50 - sec}`, 10, 60);
}

canvas.addEventListener("click", click_event);
function click_event(event) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  ctx.beginPath();
  ctx.fillStyle = 'pink'
  ctx.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
  ctx.fill();
  // Check if the click is on the mole
  if (can == true && mouseX >= moleX && mouseX <= moleX + moleSize && mouseY >= moleY && mouseY <= moleY + moleSize) {
    //hit.currentTime = 0;
    sound.play();
    score++;
    ctx.clearRect(120, 64, canvas.width, canvas.height);
    can = false;
  }
}

let moleX, moleY;

function updateGame() {
  ctx.clearRect(120, 64, canvas.width, canvas.height);
  moleX = Math.random() * (canvas.width - moleSize) + 120;
  moleY = Math.random() * (canvas.height - moleSize) + 64;
  drawMole(moleX, moleY);
}

let sec = 0;
let time1id = setInterval(() => {
  sec += 1;
  if (sec >= 50) {
    clearInterval(time1id);
    clearTimeout(gameid);
    canvas.removeEventListener('click', click_event);
    clearCanvas();
    ctx.fillStyle = 'red';
    ctx.font = "40px Arial";
    ctx.fillText('Game Over', 400 - 120, 200);
    ctx.fillText(`Score:${score}`, 400 - 120, 260);

    if (best_Score < score) {
      best_Score = score;
      localStorage.setItem('best_score', score);
      ctx.fillText('破紀錄', 400 - 120, 120);
    }
    ctx.fillText(`最佳成績:${best_Score}`, 400 - 120, 320);
    ctx.fillText(`打擊率:${(score / hsung_di).toFixed(2)}`, 400 - 120, 380);
    return;
  }
  updateScore();
}, 1000, sec);

let hsung_di = 0;
function startNewRound() {  //調節黃弟出現速度
  can = true;
  hsung_di++;
  updateGame();
  if (sec >= 30 && sec < 40) {
    document.body.style.backgroundColor = '	#C678FF';
    randomInterval = Math.floor(Math.random() * (750 - 450) + 450);
  }
  else if (sec >= 46) {
    document.body.style.backgroundColor = '#8C8CFF';
    randomInterval = Math.floor(Math.random() * (330 - 100) + 100);
  }
  else {
    randomInterval = Math.floor(Math.random() * (900 - 700) + 700);
  }
  gameid = setTimeout(startNewRound, randomInterval);
}

startNewRound();
