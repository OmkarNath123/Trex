var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex = createSprite(200,380,20,50);
var invisibleGround = createSprite(200,385,400,5);
var ObstaclesGroup = createGroup();
var CloudsGroup = createGroup();
var ground = createSprite(200,380,400,20);
var gameOver = createSprite(200,300);
var restart = createSprite(200,340);
var invisibleGround = createSprite(200,385,400,5);
var ObstaclesGroup = createGroup();
var CloudsGroup = createGroup();
var count = 0;
function preload(){
    Trex = loadAnimation("Trex1.png","Trex2.png","Trex3.png");
    Ground1 = loadImage("Ground1.png");
    Ground2 = loadImage("Ground2.png");
    Cactus1 = loadImage("Cactus1.png");
    Cactus2 = loadImage("Cactus2.png");
    Cactus3 = loadImage("Cactus3.png");
    Cactus4 = loadImage("Cactus4.png");
    Cactus5 = loadImage("Cactus5.png");
    Cactus6 = loadImage("Cactus6.png");
    Cloud = loadImage("Cloud.png");
    Restart = loadImage("Restart.png");
    GameOver = loadImage("GameOver.png")
    TrexColided = loadImage("TrexCollided.png")
  }
 
 function setup(){
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;
  var trex = createSprite(200,380,20,50);
  var invisibleGround = createSprite(200,385,400,5);
  var ObstaclesGroup = createGroup();
  var CloudsGroup = createGroup();
  var ground = createSprite(200,380,400,20);
  var gameOver = createSprite(200,300);
  var restart = createSprite(200,340);
  var invisibleGround = createSprite(200,385,400,5);
  var ObstaclesGroup = createGroup();
  var CloudsGroup = createGroup();
  ground.addImage("Ground1.png");
  invisibleGround.addImage("Ground2.png");
  ground.x = ground.width /2;
  restart.addImage("Restart.png")
  textSize(18);
  textFont("Georgia");
  textStyle(BOLD);
  var count = 0;
 }
 
  function draw() {
    
    background("cyan");
    text("Score: "+ count, 250, 100);
    if(gameState === PLAY){
      trex.addAnimation("Trex1.png","Trex2.png","Trex3.png",Trex);
      ground.velocityX = -(6 + 3*count/100);
      count = count+Math.round(World.frameRate/25);
      
      if (count>0 && count%100 === 0){
        playSound("checkPoint.mp3");
      }
      
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
      
      if(keyDown("space") && trex.y >= 359){
        trex.velocityY = -12 ;
        playSound("jump.mp3");
      }
    
      
      trex.velocityY = trex.velocityY + 0.8;
      
      spawnClouds();
      spawnObstacles();
      
      
      if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
      playSound("die.mp3");
      }
    }
    
    else if(gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      ground.velocityX = 0;
      trex.velocityY = 0;
      ObstaclesGroup.setVelocityXEach(0);
      CloudsGroup.setVelocityXEach(0);
      trex.addImage("TrexCollided.png",TrexCollied);
      ObstaclesGroup.setLifetimeEach(-1);
      CloudsGroup.setLifetimeEach(-1);
    }
    if(mousePressedOver(restart)) {
      reset();
    }
    trex.collide(invisibleGround);
    drawSprites();
  }
  
  function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  ObstaclesGroup.hide();
  CloudsGroup.hide();
  count=0;
  trex.addAnimation("Trex1.png","Trex2.png","Trex3.png",Trex);
  }
  
  function spawnObstacles() {
    if(World.frameCount % 60 === 0) {
      var obstacle = createSprite(400,365,10,40);
      obstacle.velocityX = - (6 + 3*count/100);
      var rand = randomNumber(1,6);
      obstacle.addImage("Cactus" + rand+".png");
      obstacle.scale = 0.5;
      obstacle.lifetime = 70;
      ObstaclesGroup.add(obstacle);
    }
  }
  
  function spawnClouds() {
    if (World.frameCount % 60 === 0) {
      var cloud = createSprite(400,320,40,10);
      cloud.y = randomNumber(280,320);
      cloud.addImage("Cloud.png");
      cloud.scale = 0.5;
      cloud.velocityX=-3;
      cloud.lifetime = 134;
      cloud.depth = trex.depth;
      trex.depth = trex.depth + 1;
      CloudsGroup.add(cloud);
    }
  }