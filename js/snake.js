let canvas = document.getElementById("canvas");
let ctx;
let snakeProperties = {}

let scoreLabel = document.getElementById("score");
let initGameButton = document.getElementById("initGame");

let initialSnakeProperties = {
  width: 20,
  height: 20,
  speed: 25,
  posX: 400,
  posY: 300,
  maxLength: 50,
  parts: [{x:394,y:300},{x:388,y:300}]
};
let score = 0;
let gameInterval = undefined;
let gameRenderInterval = undefined;
let direction = 'right';
let foodImg = new Image(10, 10);
foodImg.src = "./img/food.png";

let headRightImg = new Image(10, 10);
headRightImg.src = "./img/headRight.png";
let headLeftImg = new Image(10, 10);
headLeftImg.src = "./img/headLeft.png";
let headDownImg = new Image(10, 10);
headDownImg.src = "./img/headDown.png";
let headUpImg = new Image(10, 10);
headUpImg.src = "./img/headUp.png";

let food = {x:0, y:0};

let eat = () => {
  let newPart = {...snakeProperties.parts[snakeProperties.parts.length-1]};
  snakeProperties.parts.push(newPart);
  
  score++;
  scoreLabel.innerText=score;
  
  moveFood();
};

let moveFood = () => {
  food.x = Math.trunc(Math.random() * 790);
  food.y = Math.trunc(Math.random() * 590);
}

let gameRender = () => {
  ctx.clearRect(0, 0, 800, 600);
  
  ctx.drawImage(foodImg, food.x, food.y, 30, 30);

  for(let i = 0; i < snakeProperties.parts.length; i++) {
    if(i == 0){
      let imgToDraw = null;
      switch(direction) {
        case "up":
          imgToDraw = headUpImg;
          break;
        case "down":
          imgToDraw = headDownImg;
          break;
        case "left":
          imgToDraw = headLeftImg;
          break;
        case "right":
          imgToDraw = headRightImg;
          break;
      }
      ctx.drawImage(imgToDraw, snakeProperties.posX, snakeProperties.posY, snakeProperties.height, snakeProperties.width);
    }else{
      if(snakeProperties.parts[0].x == snakeProperties.parts[i].x && snakeProperties.parts[0].y == snakeProperties.parts[i].y){
        gameOver();
        
      }else {
        ctx.fillRect(snakeProperties.parts[i].x, snakeProperties.parts[i].y, snakeProperties.height, snakeProperties.width);
      }
      

    }
    

  }
}

let gameOver = () =>{
  clearInterval(gameInterval);
  clearInterval(gameRenderInterval);

  if(confirm("loser! ¿Quieres volver a intentarlo?")){
    initGame();
  }
}


let initGame = () => {

  if (canvas.getContext) {
    clearInterval(gameInterval);
    clearInterval(gameRenderInterval);
    snakeProperties = {...initialSnakeProperties};
    snakeProperties.parts = [...initialSnakeProperties.parts];
    direction = 'right';
    score = 0;
    scoreLabel.innerText=score;
    ctx = canvas.getContext('2d');
    moveFood();
    
    
    gameInterval = setInterval(()=>{
      switch(direction) {
        case 'right':
            snakeProperties.posX += snakeProperties.width;
            if(snakeProperties.posX >= 800){
              snakeProperties.posX = 0;
            }
            break;
        case 'left':
            snakeProperties.posX -= snakeProperties.width;
            if(snakeProperties.posX <= -10){
              snakeProperties.posX = 800-snakeProperties.width;
            }
            break;
        case 'up':
            snakeProperties.posY -= snakeProperties.width;
            if(snakeProperties.posY <= -10){
              snakeProperties.posY = 600-snakeProperties.height;
            }
            break;
        case 'down':
            
            snakeProperties.posY += snakeProperties.width;
            if(snakeProperties.posY >= 600){
              snakeProperties.posY = 0;
            }
            break;
      }
      
      
  
      for(let i = snakeProperties.parts.length-1; i > 0; i--){
        snakeProperties.parts[i].x = snakeProperties.parts[i-1].x;
        snakeProperties.parts[i].y = snakeProperties.parts[i-1].y;
      }
      snakeProperties.parts[0].x = snakeProperties.posX;
      snakeProperties.parts[0].y = snakeProperties.posY;
  
      if((snakeProperties.posX >= food.x -snakeProperties.width && snakeProperties.posX <=food.x+(snakeProperties.width * 2)) && (snakeProperties.posY >= food.y-snakeProperties.width && snakeProperties.posY <=food.y+(snakeProperties.width * 2))) {
        eat();
      }
      
    }, 1000/snakeProperties.speed)
  
    gameRenderInterval = setInterval(gameRender, 16.66);

  }
  
  
}


 window.onkeydown = e => {
   switch(e.key) {
    case 'ArrowUp':
        if(direction == "right" || direction == "left"){
          direction = 'up';
        }
        break;
    case 'ArrowDown':
        if(direction == "right" || direction == "left"){
          direction = 'down';
        }
        break;
    case 'ArrowLeft':
        if(direction == "up" || direction == "down"){
          direction = 'left';
        }
        break;
    case 'ArrowRight':
        if(direction == "up" || direction == "down"){
          direction = 'right';
        }
        break;
  }
 }

 initGameButton.onclick = ()=>{initGame()};