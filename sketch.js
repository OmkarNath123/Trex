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

function preload(){
    Trex1 = loadImage("Trex1.png");
    Trex2 = loadImage("Trex2.png");
    Trex3 = loadImage("Trex3.png");
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
 
 function setup(){}
  ground.x = ground.width /2;
  textSize(18);
  textFont("Georgia");
  textStyle(BOLD);
  
  //score
  var count = 0;
  
  function draw() {
    
    background("cyan");
    //display score
    text("Score: "+ count, 250, 100);
   // console.log(gameState);
    
    if(gameState === PLAY){
      //move the ground
      ground.velocityX = -(6 + 3*count/100);
      //scoring
      count = count+Math.round(World.frameRate/25);
      
      if (count>0 && count%100 === 0){
        playSound("checkPoint.mp3");
      }
      
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
       //jump when the space key is pressed
      if(keyDown("space") && trex.y >= 359){
        trex.velocityY = -12 ;
        playSound("jump.mp3");
      }
    
      //add gravity
      trex.velocityY = trex.velocityY + 0.8;
      
      //spawn the clouds
      spawnClouds();
    
      //spawn obstacles
      spawnObstacles();
      
      //End the game when trex is touching the obstacle
      if(ObstaclesGroup.isTouching(trex)){
       // playSound("jump.mp3");
        gameState = END;
        playSound("die.mp3");
      }
    }
    
    else if(gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      //set velcity of each game object to 0
      ground.velocityX = 0;
      trex.velocityY = 0;
      ObstaclesGroup.setVelocityXEach(0);
      CloudsGroup.setVelocityXEach(0);
      
      //change the trex animation
      trex.setAnimation("trex_collided");
      
      //set lifetime of the game objects so that they are never destroyed
      ObstaclesGroup.setLifetimeEach(-1);
      CloudsGroup.setLifetimeEach(-1);
      
      
    }
    
    if(mousePressedOver(restart)) {
      reset();
    }
    
    //console.log(trex.y);
    
    //stop trex from falling down
    trex.collide(invisibleGround);
    
    drawSprites();
  }
  
  function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  count=0;
  trex.setAnimation("trex");
  }
  
  function spawnObstacles() {
    if(World.frameCount % 60 === 0) {
      var obstacle = createSprite(400,365,10,40);
      obstacle.velocityX = - (6 + 3*count/100);
      
      //generate random obstacles
      var rand = randomNumber(1,6);
      obstacle.setAnimation("obstacle" + rand);
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = 70;
      //add each obstacle to the group
      ObstaclesGroup.add(obstacle);
    }
  }
  
  function spawnClouds() {
    //write code here to spawn the clouds
    if (World.frameCount % 60 === 0) {
      var cloud = createSprite(400,320,40,10);
      cloud.y = randomNumber(280,320);
      cloud.setAnimation("cloud");
      cloud.scale = 0.5;
      cloud.velocityX = -3;
      
       //assign lifetime to the variable
      cloud.lifetime = 134;
      
      //adjust the depth
      cloud.depth = trex.depth;
      trex.depth = trex.depth + 1;
      
      //add each cloud to the group
      CloudsGroup.add(cloud);
    }
  }