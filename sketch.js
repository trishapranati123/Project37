//initiate Game STATEs
var PLAY = 1;
var END = 0;
var Bananas;

var gameState = PLAY;  

var player, player_running, player_collided;
var ground, invisibleGround, groundImage,BGImage;
 
var BananaGroup, BananaImage;
var StonesGroup, stone,stoneImage;
var score=0; 
var count=0;
var scene; 
//place gameOver and restart icon on the screen
var gameOver; 
var restart;




function preload(){
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  player_collided = loadImage("Monkey_08.png");  
  groundImage = loadImage("ground2.png");  
  BananaImage = loadImage("banana.png");  
  stoneImage = loadImage("stone.png"); 
  BGImage=loadImage("jungle.png");
  gameoverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
}
 
function setup() {
  createCanvas(600, 200);
  
  player = createSprite(50,180,20,50);
  player.addAnimation("running", player_running);
  player.scale = 0.1;
  player.x=50;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver= createSprite(200,300);
  restart = createSprite(200,340);
  gameOver.addImage(gameoverImg);
  gameOver.scale = 0.12;
  restart.addImage(restartImg);
  restart.scale = 0.12;

 BananaGroup = new Group();
 StonesGroup = new Group();
  
  score = 0;
  
  //scene=createSprite(0,0,400,400);
  //scene.addImage("scene",BGImage);   
  //scene.scale=2;  
  //scene.x=scene.width/2;
  //scene.velocityX=-1;
}

function draw()     
{
  background(BGImage);    
  camera.position.x = player.x;  
  textSize(15);
  fill("white");
  text("Score: "+ score, 200,50);
  
  if(gameState === PLAY)
  {      
   
    //if(scene.x < 0)
    //{
    //  scene.x = scene.width/2;
    //}

    if(keyDown("space")) 
    {
      player.velocityY = -10;
    }
    //Add gravity
    player.velocityY = player.velocityY + 0.8

    if (ground.x < 200)
    {
      ground.x = ground.width/2;
    }

    player.collide(invisibleGround);
    spawnBananas();
    spawnObstacles();
    if(BananaGroup.isTouching(player))
    {
       switch(score) {  
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;       
        
      }
      score=score+1;

    }
    if(StonesGroup.isTouching(player))
    {
      player.scale=0.05;
      count=count+1
      if(count===2)
      {
        gameState=END;
      }

    }
  }
  else if(gameState === END) {
    score=0; 
    gameOver.visible = true;
    restart.visible = true;
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;    
    StonesGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);    
    //set lifetime of the game objects so that they are never destroyed
    StonesGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
       
  }
  if(mousePressedOver(restart)) {
    reset();
  }
  drawSprites();
}

function spawnBananas() {
  //write code here to spawn the Bananas
  if (frameCount % 200 === 0) 
  {
    bananas = createSprite(player.x+300,120,40,10);
    bananas.y = Math.round(random(30,150));
    bananas.addImage(BananaImage);
    bananas.scale = 0.05;
    bananas.velocityX = -3;                                                                             
    
     //assign lifetime to the variable
    bananas.lifetime = 200;
  //adjust the depth
    bananas.depth = player.depth;
    player.depth = player.depth + 1; 
    
    //add each Banana to the group
    BananaGroup.add(bananas);
  }
  
}

function spawnObstacles() {
  if(frameCount % 300 === 0) 
  {
    stone = createSprite(player.x+300,165,10,40);
    stone.velocityX = -4;
    stone.addImage(stoneImage);      
    //assign scale and lifetime to the obstacle           
    stone.scale = 0.1;
    stone.lifetime = 300;
    //add each obstacle to the group
    StonesGroup.add(stone);
  }
}
function reset(){
 gameState=PLAY;
 restart.visible=false;
 gameOver.visible=false; 
 StonesGroup.destroyEach();
 BananaGroup.destroyEach(); 
}