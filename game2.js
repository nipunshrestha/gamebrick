import {drawpowerup,drawScore,drawLives,drawPaddle} from "./visualdisplay.js";
import {level2,level3} from "./levelup.js";

var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext("2d");

var paddleWidth = 105;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleHeight = 10;
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
var powerupball=0;

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


function Ball(x,y,color){
    this.ballRadius = 10;
    this.x = x;
    this.y = y;
    this.dx = 6;
    this.dy = -6;
    this.color=color

    this.drawball = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
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
            level2(brickColumnCount,brickRowCount,numofbricks,bricks);
            numofbricks=  level2(brickColumnCount,brickRowCount,numofbricks,bricks);
        }
        
        
        if(numofbricks==0 && levelnum==2){
            this.y=canvas.height-30;
            this.x= paddleX;
            paddleX = (canvas.width-paddleWidth)/2;
            levelnum++;
            level3(brickColumnCount,brickRowCount,numofbricks,bricks);
            numofbricks=  level3(brickColumnCount,brickRowCount,numofbricks,bricks);
        }
    
        
    
        if(levelnum==3 && numofbricks==0){
            alert('YOU HAVE WON THE GAME');
            document.location.reload();
            clearInterval(interval);
        }

    }

}


var balls=[];
var power=false;

function draw() {
    ctx.fillStyle = 'rgba(233, 255, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawPaddle(paddleX);
    drawScore(points);
    drawLives(lives);
    
    if(points>=0){
        
        py+=2;
        drawpowerup(px,py);
        if(py+7> canvas.height-paddleHeight && py+7< canvas.height && px+7<paddleX+paddleWidth && px+7> paddleX){
            powerupball++;
            if(powerupball==1){
                var x=canvas.width/2;
                var y=canvas.height-30;
                var ball=new Ball(x,y,"green");
                balls.push(ball);    
                power=true;
               
            }
          
        }
        console.log(powerupball);


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
        
    
    


    while(balls.length < numofballs){
        var x=canvas.width/2;
        var y=canvas.height-30;
        var ball=new Ball(x,y,"#FF0000");
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
