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

// ----------------------

function preload(game) {
//    game.time.advancedTiming = true;
}

function create(game) {
    // create a reusable point for bounds checking later
    
    // add a player sprite to give context to the movement
    player = game.add.graphics(20, 20);
    player.beginFill(0xff0000);
    player.drawCircle(0, 0, 30);
    player.endFill();

//    game.physics.enable(player, Phaser.Physics.ARCADE);

 //   player.body.x = 50;
}

function update(game) {  
    player.x += 1;
}


var game = new Phaser.Game(500, 400, Phaser.AUTO, 'phaser-example', 
    { preload: preload, create: create, update: update});

