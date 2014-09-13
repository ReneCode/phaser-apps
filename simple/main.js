/*
var game = new Phaser.Game(800, 600, Phaser.AUTO, 
	'phaser-example', { preload: preload, create: create });

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('circle_blue', 'assets/circleBlue.png');

}

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    var sprite = game.add.sprite(0, 0, 'circle_blue');

//    game.physics.enable(image, Phaser.Physics.ARCADE);
  //  sprite.body.velocity.x = 20;


}
*/

var myGame = {};

var preload = function(game) {
    game.time.advancedTiming = true;
    myGame.xyDelta = 2;
    myGame.worldWidth = 2000;
    myGame.worldHeight = 2000;
}

var create = function(game) {
    // add a player sprite to give context to the movement
    myGame.player = game.add.graphics(0,100);
    myGame.player.beginFill(0xddffaa);
    myGame.player.drawCircle(0, 0, 20);
    myGame.player.endFill();
    myGame.player.lineStyle(5, 0xf40022);
    myGame.player.moveTo(10,10);
    myGame.player.lineTo(50,100);
    
    // set our world size to be bigger than the window so we can move the camera
    game.world.setBounds(-myGame.worldWidth/2, 
                         -myGame.worldHeight/2,
                         myGame.worldWidth,
                         myGame.worldHeight);

 console.log(game.width + " - " + game.height);   
    // move our camera half the size of the viewport back so the pivot point is in the center of our view
    game.camera.x = (game.width * -0.5);  // top left
    game.camera.y = (game.height * -0.5); 

    game.camera.width = 200;
//    myGame.player.x = 0;
}

var update = function(game) {    
    // movement
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      myGame.player.y -= myGame.xyDelta;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      myGame.player.y += myGame.xyDelta;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      myGame.player.x -= myGame.xyDelta;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      myGame.player.x += myGame.xyDelta;
    }
    

}


var game = new Phaser.Game(500, 400, Phaser.AUTO, 'phaser-example', 
    { preload: preload, create: create, update: update});