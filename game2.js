var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext("2d");

var paddleHeight = 10;
var paddleWidth = 105;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

var lives =3 ;
var brickRowCount = 6;
var brickColumnCount = 7;
var brickWidth = 75;
var brickHeight = 30;
var brickPadding = 10;
var brickOffsetTop = 40;
var brickOffsetLeft = 0;
var numofbricks=0;

var points = 0 ;
var numofballs = 1 ;
var levelnum=1 ;
var px= canvas.width/2;
var py=0;
var livelost = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var bricks = [];

for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status:0 };
    }
}

if( levelnum == 1 ){
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            numofbricks++;
            bricks[c][r].status =1;
        }
    }
   
}


function level2(){
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            numofbricks++;
            bricks[c][r].status =1 ;
        }
    }
    for(var c=2; c<brickColumnCount-2; c++) {
        for(var r=1; r<brickRowCount-1; r++) {
            numofbricks--;
            bricks[c][r].status =0 ;
        }
    }
}

function level3(){
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            numofbricks++;
            bricks[c][r].status =1 ;
        }
    }
    for(var c=2; c<brickColumnCount-2; c++) {
        for(var r=1; r<brickRowCount-1; r++) {
            numofbricks++;
            bricks[c][r].status =2 ;
        }
    }

}
    


function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.keyCode == 32){
        spacepress =true;

    }
    
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }

    else if(e.keyCode== 32){
        spacepress =false;
        
    }
}


function drawBricks() {
  
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status==2 ){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "grey";
                ctx.fill();
                ctx.closePath();
            }
            else  if(bricks[c][r].status==1 ){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
           
        }
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function Ball(x,y){
    this.ballRadius = 10;
    this.x = x;
    this.y = y;
    this.dx = 6;
    this.dy = 6;

    this.drawball = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
    }

    this.move= function(){
        this.x+=this.dx;
        this.y+=this.dy;
        
    }

    this.collisiondect = function(){
        if ( this.x +  this.dx > canvas.width -  this.ballRadius ||  this.x +  this.dx <  this.ballRadius) {
            this.dx = - this.dx;
        }
        if( this.y +  this.dy <  this.ballRadius ) {
            this.dy = - this.dy;
        } 
        else if(this.y + this.dy > canvas.height-this.ballRadius) {
            if(this.x > paddleX && this.x < paddleX + paddleWidth) {
                this.dy = -this.dy;
            }
            else {
              lives--;
              if(lives==0) {
                alert("GAME OVER");
                document.location.reload();
              }
              else {
                this.x = canvas.width/2;
                this.y = canvas.height-30;
                this.dx = 6;
                this.dy = 6;
                paddleX = (canvas.width-paddleWidth)/2;
                livelost = true;
              }
            }
        }

        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1 ){
                    if(this.x > b.x && this.x < b.x+brickWidth && this.y > b.y && this.y < b.y+brickHeight) {
                        this.dy = -this.dy;
                        b.status = 0;
                        points++;
                        numofbricks--;
                       
                    }
            }
            }
        }

        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status==2){
                    if(this.x > b.x && this.x < b.x+brickWidth && this.y > b.y && this.y < b.y+brickHeight){
                        this.dy = -this.dy;
                        numofbricks--;
                        b.status =1 ;
                    }
                }

            }
        }
    }

    this.levelup= function(){

        if(numofbricks==0 && levelnum==1){
            this.y=canvas.height-30;
            paddleX = (canvas.width-paddleWidth)/2;
            levelnum++;
            level2();
        }
    
        
        if(numofbricks==0 && levelnum==2){
            this.y=canvas.height-30;
            paddleX = (canvas.width-paddleWidth)/2;
            levelnum++;
            level3();
        }
    
        console.log(numofbricks);
    
        if(levelnum==3 && numofbricks==0){
            alert('YOU HAVE WON THE GAME');
            document.location.reload();
            clearInterval(interval);
        }

    }

}

function drawpowerup(){
    ctx.beginPath();
    ctx.arc(px, py, 10, 0, Math.PI * 2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: "+points, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  }

var balls=[];
var power=false;

function draw() {
    ctx.fillStyle = 'rgba(233, 255, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawPaddle();
    drawScore();
    drawLives();
    
    if(points>=0){
        py+=2;
        drawpowerup();
        if(py> canvas.height-paddleHeight && py< canvas.height && px<paddleX+paddleWidth && px > paddleX){

            var x=canvas.width/2;
            var y=canvas.height-30;
            var ball=new Ball(x,y);
            balls.push(ball);    
            power=true;
            px=10000;
        }



        if(livelost==true && (power ==true)){
            balls.pop();
            livelost=false;
            power=false;
            lives++;
        }
        if( points==42 && power==true){
            balls.pop();   
            power=false;
        }

        
    }
        
    
    
    console.log(balls.length);

    while(balls.length < numofballs){
        var x=canvas.width/2;
        var y=canvas.height-30;
        var ball=new Ball(x,y);
        balls.push(ball); 
    }

    for (var i = 0; i < balls.length; i++) {
        balls[i].drawball();
        balls[i].move();
        balls[i].collisiondect();
        balls[i].levelup();
       
    }
    
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    // else if ( !spacepress ){
    //     break;
    // }
    requestAnimationFrame(draw);
}
draw();
