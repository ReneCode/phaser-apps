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

// ----------------------


function createCircle(color) {
    var graphic = game.add.bitmapData(32,32);
    graphic.ctx.arc(16,16,10,0,30);
    graphic.ctx.fillStyle = color;
    graphic.ctx.fill();
    return graphic;
}

function createGrid(dx, dy) {
    
}


function preload(game) {
//    game.time.advancedTiming = true;
}

function create(game) {
    myGame.b1 = game.add.sprite(100,300, createCircle('#f00'));
    myGame.b2 = game.add.sprite(200,300, createCircle('#ff0'));
    game.physics.enable(myGame.b1, Phaser.Physics.ARCADE);
    game.physics.enable(myGame.b2, Phaser.Physics.ARCADE);
}

function update(game) {  
    myGame.b1.body.velocity.x = 4;
    myGame.b1.body.velocity.y = -1;
    myGame.b2.body.velocity.x = -2;
    myGame.b2.body.velocity.y = -3;
}


var game = new Phaser.Game(500, 400, Phaser.AUTO, 'phaser-example', 
    { preload: preload, create: create, update: update});

