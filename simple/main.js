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


    game.load.image('player', 'assets/circleBlue.png');
    game.load.image('wall', 'assets/circleA.png');

}

var create = function(game) {

  /*  
    // add a player sprite to give context to the movement
    myGame.player = game.add.graphics(0,100);
    myGame.player.beginFill(0xddffaa);
    myGame.player.drawCircle(0, 0, 20);
    myGame.player.endFill();

    game.physics.arcade.enableBody(myGame.player);

    myGame.wall = game.add.graphics(100,0)
   // myGame.wall.lineStyle(5, 0xf40022);
   // myGame.wall.moveTo(0,0);
   // myGame.wall.lineTo(0,100);
    myGame.wall.beginFill(0x008888);
    myGame.wall.drawCircle(0,0,40);
    myGame.wall.endFill();
    myGame.wall.enableBody = true;
*/

    game.physics.startSystem(Phaser.Physics.ARCADE);

    myGame.player = game.add.sprite(0,0,'player');
    myGame.player.anchor.setTo(0.5, 0.5);
//    myGame.player.enableBody = true;
    myGame.wall = game.add.sprite(200,0,'wall');
//    myGame.wall.enableBody = true;

    game.physics.enable(myGame.player, Phaser.Physics.ARCADE);
    game.physics.enable(myGame.wall, Phaser.Physics.ARCADE);
    myGame.player.body.velocity.x = 5;


/*
    
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
*/
}

var collision = function(a,b) {
    console.log("collision:" + a.key, b.key);
    b.kill();
}

var update = function(game) {    

    game.physics.arcade.overlap(myGame.player, myGame.wall, collision, null, this);


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