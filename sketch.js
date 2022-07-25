var PLAY = 1;
var END = 0;
var gameState = PLAY;
var spaceShip
var powerUpsGroup, coin1, coin2
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4
var backgroundImg
var score=0;
var gameOver, restart;



function preload(){
    backgroundImg = loadImage("download(7).png")
    spaceShipImg = loadImage("download.png")
    coin1Img = loadImage("download(3).png")
    coin2Img = loadImage("download(6).png")
    obstacle1Img = loadImage("download(1).png")
    obstacle2Img = loadImage("download(2).png")
    obstacle3Img = loadImage("download(4).png")
    obstacle4Img = loadImage("download(5).png")
    gameOverImg = loadImage("download(8).png")
    restartImg = loadImage("restart.png")
}

function setup() {
spaceShip = createSprite(100,50,10,10)
spaceShip.addImage(spaceShipImg)
spaceShip.setCollider('circle',0,0,350)
spaceShip.scale = 0.08;

backgroundImg = createSprite(width/2,height,width,2);
backgroundImg.addImage( backgroundImg);
backgroundImg.x = width/2
backgroundImg.velocityX = -(6 + 3*score/100);

gameOver = createSprite(width/10,height/2);
gameOver.addImage(gameOverImg);

restart = createSprite(width/2,height/2);
restart.addImage(restartImg);
gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
    background(backgroundImg);
    textSize(20);
    fill("black")
    text("Score: "+ score,30,50); 
    if(gameState===PLAY){
    
      distance = distance + Math.round(getFrameRate()/50);
      path.velocityX = -(6 + 2*distance/150);
     
      spaceShip.y = World.mouseY;
     
      edges= createEdgeSprites();
      spaceShip.collide(edges);
     
     
     if(backgroundImg.x < 0 ){
       backgroundImg.x = width/2;
     }
     
     
    
     var select_oppPlayer = Math.round(random(1,3));
     
     if (World.frameCount % 150 == 0) {
       if (select_obstaclesGroup == 1) {
         obstacle1();
       } else if (obstaclesGroup == 2) {
        obstacle2();
       } else {
         obstacle3();
       }
     }
     
      if(obstaclesGroup.isTouching(spaceShip)){
        gameState = END;
        spaceShip.velocityY = 0;
        }
}
} else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true

  backgroundImg.velocityX = 0;
  spaceShip.velocityY = 0;


  obstaclesGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);

  if(keyDown("Space_KEY")) {
    reset();
    }
}

