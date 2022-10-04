var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombies = []
var bullets = []
var zombiesGroup ,bulletsGroup
var heart1, heart2, heart3
var heart1Img, heart2Img, heart3Img
var life = 3
var gameState = "fight"
var score = 0

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  bulletImg = loadImage("assets/Bullet.webp")
  bulletSound = loadSound("assets/explosion.mp3")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-100,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.75
  

//creating the player sprite
player = createSprite(displayWidth-2250, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
   
   heart1 = createSprite(450,100,20,20)
   heart1.addImage("heart1",heart1Img)
   heart2 = createSprite(550,100,20,20)
   heart2.addImage("heart2",heart2Img)
   heart3 = createSprite(650,100,20,20)
   heart3.addImage("heart3",heart3Img)




  bulletsGroup = new Group()
  zombiesGroup = new Group()

}

function draw() {
  background(0); 

if(gameState === "fight"){
  if (life === 3){
    heart1.visible = false;
    heart2.visible = false;
    heart3.visible = true;
  }
  if(life === 2){
    heart1.visible = false;
    heart2.visible = true;
    heart3.visible = false;
  }

  if(life === 1){
    heart1.visible = true;
    heart2.visible = false;
    heart3.visible = false;
  }

  if(life === 0){
    gameState = "end"
  }

  


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bulletSound.play()
  player.addImage(shooter_shooting)
  shoot();
 
}




//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
spawnZombies();
for(var i = 0;i<bullets.length;i++){
  for(var j = 0; j<zombies.length;j++){
    if(bullets[i]!= null && zombies[j]!= null){
    
    if(bullets[i].isTouching(zombies[j])){
      zombiesGroup[j].destroy()
      zombies.splice(j,1)
      bulletsGroup[i].destroy()
      bullets.splice(i,1)
      score = score +5
    }}
  }

}

if(zombiesGroup.isTouching(player)){
 for(var i = 0; i<zombiesGroup.length;i++){
  if (zombiesGroup[i].isTouching(player)){
    zombiesGroup[i].destroy();
      life = life-1
      
  }
 }
}
drawSprites();
textSize(100)
fill("red")
text("lives = "+life,450,250)

text("score = "+score,1500,100)

}
if(gameState === "end"){
  textSize(150)
  fill("red")
  text("you are dead not big surprise",250,200)
  zombiesGroup.destroyEach()
  player.destroy()
  
}
}

function spawnZombies(){
  if(frameCount%30==0){
    zombie = createSprite(width,random(100,1000),40,40)
    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -5
    zombies.push(zombie)
    zombiesGroup.add(zombie)
  }  
}

function shoot(){
  bullet = createSprite(player.position.x,player.position.y,20,20)
  bullet.velocityX = 5
  bullet.addImage(bulletImg);
  bullet.scale = 0.05
  bullets.push(bullet)
  bulletsGroup.add(bullet)

}
