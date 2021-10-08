var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;

var player, form,game;
var player1,player2;
var players;
var barricade;
var barricadeGroup;
var player_img;
var initPos;
var shoot = false;
var bulletsRemaining=60;
var bullet1,bullet2,bullets;
var hits = [0,0];
var player1_img,player2_img,barricade_img,bullet1_img,bullet2_img
//pending stuff
//2 test the code with a friend
//upload on git hub
//4 display the score(read the score from the data bace and display it using text cammand)
function preload(){
  //get all the images needed for the game
  //back_img = loadImage("images/jungle.jpg");
  barricadeGroup = new Group();
  player1_img = loadImage("images/player 1.png")
  player2_img = loadImage("images/player 2.png")
  back_img = loadImage("images/background.jfif")
  barricade_img = loadImage("images/barricade.png")
  bullet1_img = loadImage("images/bullet 1.png")
  bullet2_img = loadImage("images/bullet 2.png")
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  database = firebase.database();
  initPos = [100,displayWidth-100]
  game = new Game();
  game.getState();
  game.start();
  
}

function draw() {
  background(back_img);
  
   if (playerCount === 2 && gameState===0) {
     game.update(1);
   }
   if (gameState === 1) {
     clear(); 
     game.play();
     //BS
     for (var i = 0; i < players.length; i++) {
      if (i !== player.index-1)
        bullets[player.index-1].collide(players[i], playerHit);
        
     }
     //BS New 
     for (var i = 0; i < bullets.length; i++) {
         if (i == player.index-1) 
            bullets[i].collide(barricadeGroup, destroyBullet)
     }
   }
   if (gameState === 2) {
     console.log(players)
     //BS New 
     textSize(50); 
     fill("white");
     text("Game Over!!\n Scores are: ", displayWidth/2-100, displayHeight/2)
     var ypos = displayHeight/2 + 150;
     Player.getPlayerInfo(); 
     for (var plr in allPlayers){
          text(allPlayers[plr].name + " : " + allPlayers[plr].points, displayWidth/2, ypos) 
          ypos += 100 
    }
      game.update(2) 
      game.end();
   }
}

function playerHit(bullet,oppPlayer) {
 
  player.points +=50;
  player.updateScore();
  player.bulletX = -1000; player.bulletY = -1000;
  shoot = false;
  player.updateBulletPosition();
  bullets[player.index-1].visible = false;
  if (player.index === 1) oppIndex = 2;
  if (player.index === 2) oppIndex = 1;
  hits[oppIndex-1]++
  Player.updateHitPlayer(oppIndex);
  if (hits[0] > 3 || hits[1] > 3 ) gameState = 2;
}
//BS new
 function destroyBullet(bullet, barricade) { 
  player.bulletX = -1000;
  player.bulletY = -1000;
  shoot = false;
  player.updateBulletPosition();
  }