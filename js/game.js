class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200,500);
        player1.addImage("player1",player1_img);

        player2 = createSprite(800,500);
        player2.addImage("player2", player2_img); 
        player2.scale=0.2
        players=[player1,player2];

        bullet1=createSprite(-1000,-1000,20,20);
        bullet2=createSprite(-1000,-1000,20,20);
        bullet1.addImage("bullet1", bullet1_img);
        bullet2.addImage("bullet2", bullet2_img); 
        bullet1.scale= 0.2
        bullet2.scale=0.2
        bullets = [bullet1,bullet2];



    }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, displayWidth, displayHeight);//BS
        var x =100;
        var y=200;
        var index =0;
        drawSprites();
        var yPos=30
        for(var plr in allPlayers){        
            index = index+1;
            x=initPos[index-1]
            y = allPlayers[plr].yPos;
            textSize(20);
            fill("yellow");
            text(allPlayers[plr].name+" : "+allPlayers[plr].points,displayWidth/2,yPos)    
            yPos= yPos+30      
            players[index -1].x = x;
            players[index - 1].y = y;
            
            bullets[index -1].x = allPlayers[plr].bulletX;
            bullets[index - 1].y = allPlayers[plr].bulletY;
            if (bullets[index-1].y !== -1000 || bullets[index-1].x !==-1000) bullets[index-1].visible = true;
            if(index === player.index){
                textSize(30);
                text(allPlayers[plr].name,x,y+25)        
                // BS
                if (shoot) {
                    if (player.bulletX==-1000 && player.bulletY==-1000) {
                     player.bulletX = initPos[player.index-1]; 
                     player.bulletY = player.yPos;
                     bulletsRemaining--;
                    }
                    if (player.index==1) player.bulletX +=20;
                    if (player.index==2) player.bulletX -=20;
                    player.updateBulletPosition();
                }
                if (player.bulletX > width || player.bulletX < 0) {
                      shoot= false;
                      player.bulletX = -1000;
                      player.bulletY = -1000;
                      player.updateBulletPosition();
                }                
            }
        }
        if (keyIsDown(UP_ARROW) && player.index !== null) {
            player.yPos -= 10
            player.update();
        }
        if (keyIsDown(DOWN_ARROW) && player.index !== null) {
            player.yPos += 10
            player.update();
        }

        if (keyDown(32) && player.index != null){ //BS
            shoot = true;
        }


        if (frameCount % 300 === 0) {//change barricade to sheild 
            barricade = createSprite(random(200, displayWidth-200), 0, 100, 100);
            barricade.addImage("barricade",barricade_img)
            //barricade.rotate(90);
            barricade.scale=0.5
            barricade.velocityY = 6;
            barricade.lifetime= displayHeight/6
            var rand = Math.round(random(1,5));
            barricadeGroup.add(barricade);
        }
            

    }

    end(){
       console.log("Game Ended");
    }
}
