var mario1,mario1Img,mario2,mario2Img,mariodeadImg,coin,coinImg;
var goomba1,goomba1Img,goomba2Img,goomba3Img;
var mariodead,kingdom,kingdomImg;
var PLAY=1; 
var END=0;
var gameState="PLAY";
var ground;
var goombaGroup,coinGroup;
var score=0;

//to load the image
function preload(){
  mario1Img=loadImage("sprites/mario1.gif");
  kingdomImg = loadImage("sprites/kingdom.jpg");
  goomba1Img = loadImage("sprites/goomba1.gif");

  //goomba
 // goomba2Img=loadImage("");
  //goomba3Img=loadImage("");

  coinImg=loadImage("sprites/coin.png");
  mariodeadImg=loadImage("sprites/mariodead.jpg");
  
}

//create the sprites(objects)
function setup() {
  createCanvas(1500,700);

  kingdom=createSprite(750,350,1500,700);
  kingdom.addImage(kingdomImg);
  kingdom.scale=7.5;

  mario1=createSprite(90, 600, 50, 50);
  mario1.addImage(mario1Img);
  // mario1.debug=true;
  mario1.setCollider("circle",0,0,80);

  ground=createSprite(750,650,1500,20);
  ground.visible=false;

  mariodead = createSprite(750,350,1500,700);
    mariodead.addImage(mariodeadImg);
    mariodead.visible=false;

  goombaGroup=createGroup();
  coinGroup=createGroup();

}


//working
function draw() {
  background(0);

  console.log(gameState);

  //game : play state
  if(gameState==="PLAY"){

    mario1.visible=true;

    //kingdom
    kingdom.velocityX=-5;
   // console.log(kingdom.x);

   //movement 
    if(kingdom.x<0){
      kingdom.x=width/2;
    }

    //mario to jump

    if(keyDown("space")&& mario1.y >= 250 ){
      mario1.velocityY=-8;
    }

    // score:
    if(mario1.isTouching(coinGroup)){
      coinGroup.destroyEach();
      score=score+50;
    }
    // working of mario
    //console.log(mario1.y);

    if(mario1.isTouching(goombaGroup)){
      gameState="END";
      coinGroup.setVelocityXEach(0);
      goombaGroup.setVelocityXEach(0);
    }
  }
    
  

    //gravity of mario
    mario1.velocityY=mario1.velocityY+1;

    //mario to stand on the ground
    mario1.collide(ground);
  

  spawnCoin();
  spawnGoomba();  
  

  //display the object
  drawSprites();

  
  textSize(38);
  fill(255,255,255)
 
  text("Score: " +score, 1250,100);
  

  if(gameState==="END"){

    mario1.velocityY=0;
    
    coinGroup.destroyEach();
    goombaGroup.destroyEach();
    goombaGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    mariodead.visible=true;
    mario1.visible=false;
    kingdom.velocityX=0;  
    

    textSize(38);
    fill(255,255,255)
   
    text("Press 'r' to restart the game", 550,180);

    // to restart the game
    if(keyCode===114){
      reset();
    }
  }
  
}

function spawnCoin(){
  //to remove continues objects
  if(World.frameCount % 150 === 0){
  coin=createSprite(1500,Math.round(random(120,250)),10,10);
  coin.velocityX=-10;
  coin.scale=0.2;
  coin.addImage(coinImg);

  //depth
  coin.depth=mario1.depth;
  mario1.depth=mario1.depth+1;

  coinGroup.add(coin);

  //lifetime
  coin.lifetime=300;

  //speed=distamce/time --> t= d/s = 1500/5 =300
  }

}


function spawnGoomba(){
  if(World.frameCount % 90 === 0){
  goomba=createSprite(1500,650,10,10);
  goomba.y=Math.round(random(190,320));
  goomba.velocityX=-8;
  goomba.scale=0.2;
  

  //var rand = Math.round(random(1,6));
  //switch(rand) {
    //case 1: goomba.addImage(goomba1Img);
         //   break;
    //case 2: goomba.addImage(goomba2Img);
         //   break;
    //case 3: goomba1.addImage(goomba3Img);
          //  break;
    //case 4: obstacle.addImage(goomba4Img);
      //      break;
        //default: break;
  //}
 

  //depth
  goomba.depth=mario1.depth;
  mario1.depth=mario1.depth+1;

  goombaGroup.add(goomba);

  goomba.lifetime=300;
  }

}

function reset(){
gameState="PLAY";
  score=0;
  coinGroup.destroyEach();
  goombaGroup.destroyEach();
  mariodead.visible=false;
  //mario1.visible=true;
 //theme.play();
 
 }

