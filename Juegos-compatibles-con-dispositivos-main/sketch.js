var PLAY = 1;
var END = 0;
var gameState = PLAY;

var cohete,coheteimg;
var ground;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;
var jumpSound, collidedSound;

var gameOver,gameOverImg, restart, restartImg;
var invisibleGround

function preload(){
  jumpSound = loadSound("jump.wav")
  collidedSound = loadSound("collided.wav")
  
  backgroundImg = loadImage("images.jpg")
  
  coheteimg = loadImage("cohete.png");
  
  obstacle1 = loadImage("asteroide1.png");
  obstacle2 = loadImage("asteroide2.png");
  obstacle3 = loadImage("asteroide3.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  cohete = createSprite(width/2,height-100,20,50);
  cohete.addImage(coheteimg)
  cohete.setCollider('rectangle',0,30)
  cohete.scale = 0.8
   //cohete.debug=true

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2 -10);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  gameOver.depth = cohete.depth+1;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 invisibleGround =createSprite()
 invisibleGround.visible =false

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(backgroundImg);
  textSize(20);
  fill("White")
  text("Puntuación: "+ score,30,50,);
  
  if (cohete.x > windowWidth + 100){
    gameState = END;
  }
  if (cohete.x < -windowWidth+1100){
    gameState = END;
  }

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    backgroundImg.velocityY = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown(LEFT_ARROW))) {
      jumpSound.play( )
      cohete.velocityX = -10;
      //cohete.x = touches.x;
       //touches = [];}
    }
    if((touches.length > 0 || keyDown(RIGHT_ARROW))) {
      jumpSound.play( )
      cohete.velocityX = 10;
      //cohete.x = touches.x;
      //touches = [];
    }

    spawnObstacles();
  
    if(obstaclesGroup.isTouching(cohete)){
        collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.ivsible = true;
    
    //establecer la velocidad de cada objeto del juego como 0
    cohete.velocityX = 0;
    cohete.x = windowWidth/2;
    obstaclesGroup.setVelocityYEach(0);
    
    textSize(30);
    fill("White")
    text("Press space or touch the screen to restart",windowHeight/2,windowWidth/2);
    //establecer lifetime de los objetos del juego para que no sean destruidos nunca
    obstaclesGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }
  
  
  drawSprites();
}

//function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  //if (frameCount % 60 === 0) {
   // var cloud = createSprite(width+20,height-300,40,10);
    //cloud.y = Math.round(random(100,220));
    //cloud.addImage(cloudImage);
    //cloud.scale = 0.5;
    //cloud.velocityX = -3;
    
     //asignar lifetime a la variable
    //cloud.lifetime = 300;
    
    //ajustar la profundidad
   // cloud.depth = trex.depth;
    //trex.depth = trex.depth+1;
    
    //agregar cada nube al grupo
    //cloudsGroup.add(cloud);
  //}
  
//}

function spawnObstacles() {
  if(frameCount % 15 === 0) {
    var obstacle = createSprite(Math.round(random(100,windowWidth)),0-95,20,30);
    obstacle.setCollider('circle',0,0,150)
     //obstacle.debug = true
  
    obstacle.velocityY = (15 + 3*score/100);
    
    //generar obstáculos al azar
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
              case 3: obstacle.addImage(obstacle3); 
              break;
      default: break;
    }
    
    //asignar escala y lifetime al obstáculo        
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstacle.depth = cohete.depth;
    cohete.depth +=1;
    //agregar cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  score = 0;
  
}
