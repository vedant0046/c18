var jungle,jungleimg
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score=0;
var survivalTime=0;
var play = 1;
var end = 0;
var gameState = play;




function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collided = loadAnimation("sprite_0.png");
 jungleimg=loadImage("jungle.jpg")
}



function setup() 
{
  createCanvas(400,365);
  
  jungle=createSprite(300,182,800,365)
  jungle.addImage(jungleimg)
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.1;
  
  ground = createSprite(600,350,1200,10);
  ground.visible=false
  ground.x=ground.width/2;
  console.log(ground.x);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  
  
  

  
}


function draw() 
{
  background("white");
  
  monkey.collide(ground);
  
  if(gameState === play)
  {
    
    
    if(keyDown("space"))
    {
      monkey.velocityY = -13;
      
      
    }
  
    monkey.velocityY = monkey.velocityY + 0.5;
    jungle.velocityX=-3
    if (jungle.x < 0)
    {
      jungle.x = 300
    }
    
    if(monkey.isTouching(bananaGroup))
    {
      bananaGroup.destroyEach();
      score = score+1;
      console.log("string");
    }
    
    food();
    obstacles();
    
    if(monkey.isTouching(obstacleGroup))
      {
        gameState = end;
      }
    
    survivalTime = survivalTime+Math.round(getFrameRate()/60)
    
  } else if (gameState === end)
    {
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      
      monkey.changeAnimation("collided",monkey_collided);
      bananaGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      monkey.velocityY = 0;
      jungle.velocityX=0
    }
    
    
  

 
 drawSprites(); 
  
  stroke("white");
  textSize(15);
  fill("black");
  text ("Score:" + score, 350,50);
  
  stroke("black");
  textSize(15);
  fill("black");
  
  text("Time: " + survivalTime, 100,50);
}

function food()
{
  if (frameCount % 80 === 0)
  {
    var banana = createSprite(600,40,10,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.velocityX = -3
    banana.lifetime = 200;
    banana.scale = 0.1;
    bananaGroup.add(banana);
  } 
}

function obstacles()
{
  if (frameCount % 300 === 0)
    {
      var obstacle = createSprite(600,330,10,40);
      obstacle.velocityX = -3;
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.1;
      obstacle.lifetime = 200;
      obstacleGroup.add(obstacle);
      
    }         
}