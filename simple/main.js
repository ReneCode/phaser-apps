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
    game.physics.startSystem(Phaser.Physics.ARCADE);

  /*  
    // add a player sprite to give context to the movement
    myGame.player = game.add.graphics(0,100);
    myGame.player.beginFill(0xddffaa);
    myGame.player.drawCircle(0, 0, 20);
    myGame.player.endFill();

    game.physics.arcade.enableBody(myGame.player);
*/
    var graph = game.add.graphics()
    graph.lineStyle(5, 0xf40022);
    graph.moveTo(0,0);
    graph.lineTo(0,100);

    graph.boundsPadding = 0;
    myGame.wall = game.add.sprite(300,50);
    myGame.wall.key = "wall-1";
    myGame.wall.addChild(graph);


//    var group = game.add.group();
//    group.enableBody = true;

    // graphic-block
    var graphBlock = game.add.bitmapData(32,32);
    graphBlock.ctx.rect(0,0,32,32);
    graphBlock.ctx.fillStyle = '#33eeff';
    graphBlock.ctx.fill();
    graphBlock.ctx.beginPath();
    graphBlock.ctx.moveTo(5,10);
    graphBlock.ctx.lineTo(25,10);
    graphBlock.ctx.setStrokeColor('#f00');
    graphBlock.ctx.setLineWidth(3);
    graphBlock.ctx.stroke();
    // sprite-block
    myGame.block = game.add.sprite(100,300, graphBlock);
    game.physics.enable(myGame.block, Phaser.Physics.ARCADE);

//    platform1 = game.add.sprite(game.world.centerX - 200, game.world.centerY + 64, platformbmd, 0, group);



    myGame.player = game.add.sprite(0,0,'player');
    myGame.player.anchor.setTo(0.5, 0.5);
//    myGame.wall = game.add.sprite(200,0,'wall');
//    myGame.wall.enableBody = true;

    // enable both sprites for collision
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
    game.physics.arcade.overlap(myGame.player, myGame.block, collision, null, this);


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