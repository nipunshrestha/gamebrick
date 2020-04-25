export {drawpowerup,drawScore,drawLives,drawPaddle}

var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext("2d");
var paddleHeight = 10;
var paddleWidth = 105;


function drawpowerup(px,py){
    ctx.beginPath();
    ctx.arc(px, py, 10, 0, Math.PI * 2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawScore(points) {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: "+points, 8, 20);
}
function drawLives(lives) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  }


  function drawPaddle(paddleX) {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}