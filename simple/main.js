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

function MyGame() {
    this.moveJob = [];

}
var myGame = new MyGame();


function randomColor() {
    var r = Math.random() * 255;
    var g = Math.random() * 255;
    var b = Math.random() * 255;
    return r*255*255 + g*255 + b;
}

var preload = function(game) {
    game.time.advancedTiming = true;
    myGame.xyDelta = 2;
    myGame.worldWidth = 2000;
    myGame.worldHeight = 2000;


    game.load.image('player', 'assets/circleYellowSmall.png');
    game.load.image('wall', 'assets/circleA.png');
    game.load.spritesheet('characters', 'assets/characters-24-32.gif', 24, 32);
}

function getArray(start, cnt) {
    var arr = [];
    for (var i=0; i<cnt; i++) {
        arr.push(start+i);
    }
    return arr;
}

function create(game) {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    myGame.group = game.add.group();
    myGame.group.name = "enemies";
    myGame.group.enableBody = true;
    var person = 4;
    var aniLen = 3;
    for (var i=0; i<8; i++) {
        var sprite = myGame.group.create(20 + i*50, 50,  'characters', 24*i);
        sprite.name.name = "A" + (i+1);
        sprite.name.value = 4711 +i;
        sprite.anchor.setTo(0.5, 0.5);
        sprite.animations.add('run', getArray(person*24 + aniLen*i, aniLen), 3, true);
        sprite.play('run');
    }


    myGame.friendGroup = game.add.group();
    myGame.friendGroup.name = "friendGroup";
    myGame.friendGroup.enableBody = true;
    for (var i=0; i<5; i++) {
        var sprite = myGame.friendGroup.create(20 + i*50, 300, 'characters', 18*24 + i);
        sprite.name = "B" + (i+1);
        // reference-pointer in the center
        sprite.anchor.setTo(0.5, 0.5);
    }


    myGame.player = game.add.sprite(0,100,'player');
    myGame.player.anchor.setTo(0.5, 0.5);

    // enable both sprites for collision
    game.physics.enable(myGame.player, Phaser.Physics.ARCADE);
    myGame.player.body.velocity.x = 5;

    game.input.onDown.add(onMouseDown, this);


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
    */
//    myGame.player.x = 0;


}

function pickSprite(pointer,sprite) {
    myGame.pickedSprite = sprite;
    myGame.group.forEachAlive( function(i) {
//        console.log(i.name);
    }, this)
}

function moveSprite(sprite, pointer) {
    game.physics.arcade.moveToObject(sprite, pointer, 20);
    // make a copy of the x,y coords of the pointer
    myGame.moveJob.push( {sprite:sprite, target:{x:pointer.x, y:pointer.y}});
}

function onMouseDown(pointer) {
    if (myGame.pickedSprite != undefined) {
        // something is picked
        moveSprite(myGame.pickedSprite, pointer);
        myGame.pickedSprite = undefined;
    }
    else {
        // nothing is picked
        var objs = game.physics.arcade.getObjectsUnderPointer(pointer, myGame.friendGroup, pickSprite, this);
        var objs = game.physics.arcade.getObjectsUnderPointer(pointer, myGame.group, pickSprite, this);
    }
}

function collision(a,b) {
    console.log("collision:" + a.name, b.name);
    b.kill();
}


// stop the sprites out of the myGame.moveJob array
// if it reaches the target position
function updateMove(game) {
    var x = myGame.moveJob.filter( function(mj) {
        //console.log(mj.sprite.name);
        if (game.physics.arcade.distanceToPointer(mj.sprite, mj.target) < 5) {
            mj.sprite.body.velocity.set(0);
            // remove that from the moveJob array
            return false;
        } else {
            return true;
        }
    });
    if (x.length != myGame.moveJob.length) {
        myGame.moveJob = x;
    }

}

var update = function(game) {    
    game.physics.arcade.overlap(myGame.player, myGame.group, collision, null, this);
    game.physics.arcade.overlap(myGame.player, myGame.friendGroup, collision, null, this);

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

    updateMove(game);
}


function render() {
//    game.debug.spriteCoords(myGame.player, 32, 32);
}

var game = new Phaser.Game(500, 400, Phaser.AUTO, 'phaser-example', 
    { preload: preload, 
      create: create, 
      update: update,
      render: render});