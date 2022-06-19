var mario1,mario1Img,mario2,mario2Img,mariodeadImg,coin,coinImg,goomba1,goomba1Img,kingdom,kingdomImg;
var PLAY=1; 
var END=0;
var gameState="PLAY";
var ground;
var goombaGroup,coinGroup;

//to load the image
function preload(){
  mario1Img=loadImage("sprites/mario1.gif");
  kingdomImg = loadImage("sprites/kingdom.jpg");
  goomba1Img = loadImage("sprites/goomba1.gif");
  coinImg=loadImage("sprites/coin.png")

  //task1: load the images



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

  goombaGroup=createGroup();
  coinGroup=createGroup();

}


//working
function draw() {
  background(0);

  //game : play state
  if(gameState==="PLAY"){

    //kingdom
    kingdom.velocityX=-5;
   // console.log(kingdom.x);

   //movement 
    if(kingdom.x<0){
      kingdom.x=width/2;
    }

    //mario to jump

    if(keyDown("space")){
      mario1.velocityY=-5;
    }

    // working of mario
    console.log(mario1.y);

    if(mario1.isTouching(goombaGroup)){
      gameState=END;
    }
  }
    
  if(gameState==="END"){


    }






    //gravity of mario
    mario1.velocityY=mario1.velocityY+1;

    //mario to stand on the ground
    mario1.collide(ground);
  

  spawnCoin();
  spawnGoomba();

   
  

  //display the object
  drawSprites();
}

function spawnCoin(){
  //to remove continues objects
  if(World.frameCount % 150 === 0){
  coin=createSprite(1500,400,10,10);
  coin.velocityX=-5;
  coin.scale=0.2;
  coin.addImage(coinImg);

  //depth
  coin.depth=mario1.depth;
  mario1.depth=mario1.depth+1;

  coinGroup.add(coin);
  }

}


function spawnGoomba(){
  if(World.frameCount % 90 === 0){
  goomba1=createSprite(1500,600,10,10);
  goomba1.velocityX=-5;
  goomba1.scale=0.2;
  goomba1.addImage(goomba1Img);

  //depth
  goomba1.depth=mario1.depth;
  mario1.depth=mario1.depth+1;

  goombaGroup.add(goomba);
  }

}