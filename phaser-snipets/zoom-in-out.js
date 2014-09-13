function updateLevelstatus(){
    //desktop zoom
    if (game.input.keyboard.isDown(Phaser.Keyboard.A) && (mapSizeMaxCurrent < mapSizeMax)) {mapSizeMaxCurrent += 16;}
    else if (game.input.keyboard.isDown(Phaser.Keyboard.O) && (mapSizeMaxCurrent > worldwidth )) {  mapSizeMaxCurrent -= 16;    }

    mapSizeMaxCurrent = Phaser.Math.clamp(mapSizeMaxCurrent, worldwidth , mapSizeMax); //prevent odd scalefactors - set a minimum and maximum scale value
    worldScale = mapSizeMaxCurrent/mapSizeMax;

    if (mapSizeMaxCurrent < mapSizeMax  ){
        zoomed=true;
        stageGroup.scale.set(worldScale);
        currentBounds = new Phaser.Rectangle(0, 0, mapSizeX*worldScale, mapSizeY*worldScale);
        game.camera.bounds=currentBounds; // update bounds to the actual size for the camera so it cannot move outside
    }else{
       currentBounds = new Phaser.Rectangle(0, 0, mapSizeX, mapSizeY);
       game.camera.bounds=currentBounds;  // keep camera in bounds
        if (stageGroup.scale.x != 1) {
            zoomed=false; 
            stageGroup.scale.set(1);
        }
    }

    if(zoomed === false){ }
   else { 
        if(game.input.activePointer.isDown && !game.input.pointer2.isDown){   //move around the world
            if (oldcamera) { game.camera.x += oldcamera.x - game.input.activePointer.position.x; game.camera.y += oldcamera.y - game.input.activePointer.position.y; }
            oldcamera = game.input.activePointer.position.clone();
        }
        else { 
           oldcamera = null;   
        }
    }
}