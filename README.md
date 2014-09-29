phaser-apps
===========

#interlektuelles Völlegefühl#

#Ornt La Okros nimmt anderen die Entscheidung ab.

(formating readme.md: see: https://help.github.com/articles/github-flavored-markdown)

apps bases on the js-framework phaser
```javascript
// set a minimum and maximum scale value
worldScale = Phaser.Math.clamp(worldScale, 0.25, 2);
```
--------

create graphic, can be moved by player.x .y

```javascript
player = game.add.graphics(0,100);
player.beginFill(0xddffaa);
player.drawCircle(0, 0, 20);
player.endFill();

player.lineStyle(5, 0xf40022);
player.moveTo(10,10);
player.lineTo(50,100);
```

------

```javascript
myGame.player = game.add.sprite(0,0,'player');
// handle that sprite in the middle
myGame.player.anchor.setTo(0.5, 0.5);
myGame.wall = game.add.sprite(200,0,'wall');

// enable both sprites for collision
game.physics.enable(myGame.player, Phaser.Physics.ARCADE);
game.physics.enable(myGame.wall, Phaser.Physics.ARCADE);
```

--------

create a sprite out of graphics (http://www.html5gamedevs.com/topic/6476-collision-with-gameaddgraphics-and-a-sprite/)


```javascript
shapeGr = game.add.graphics(); 
shapeGr.moveTo(250, 100);
shapeGr.lineTo(250, 0);

// Remove the 10 pixel padding added to graphics by default
shapeGr.boundsPadding = 0;

// Create an empty sprite as a container
shapeSprite = game.add.sprite(0, 0);

// Add the graphics to the sprite as a child
shapeSprite.addChild(shapeGr);

// Enable physics on the sprite (as graphics objects cannot have bodies applied)
game.physics.enable(shapeSprite, Phaser.Physics.ARCADE);

// Overlap should now work
// call that in the update() method
game.physics.arcade.overlap(thing.body, shapeSprite, gotHit, null, this);
```
---------

create a sprite out of a painted bitmap

```javascript
// graphic-block
var graphBlock = game.add.bitmapData(32,32);
// filled rectangle
graphBlock.ctx.rect(0,0,32,32);
graphBlock.ctx.fillStyle = '#33eeff';
graphBlock.ctx.fill();
// line
graphBlock.ctx.beginPath();
graphBlock.ctx.moveTo(5,10);
graphBlock.ctx.lineTo(25,10);
graphBlock.ctx.setStrokeColor('#f00');
graphBlock.ctx.setLineWidth(3);
graphBlock.ctx.stroke();
// sprite-block
myGame.block = game.add.sprite(100,300, graphBlock);
game.physics.enable(myGame.block, Phaser.Physics.ARCADE);
```
------

Sprite sheet

```javascript
// this is a big picture, with several elements,
// each 24x32 size
game.load.spritesheet('characters', 'assets/characters-24-32.gif', 24, 32);
// that is the way to get an element out of the picture. idx = index starts top left
game.add.sprite(10+i*30, 70, 'characters', idx);
```

------

grouping

```javascript
// create a new group
myGame.group = game.add.group();
// if you want to test collision with group elements than enableBody
myGame.group.enableBody = true;
for (var i=0; i<5; i++) {
	// add element (sprite) to the group
    myGame.group.create(20 + i*50, 50,  'characters', 60+i);
}
```

----

pick object
```javascript
function create(game) {
	....
	// add mouse-down handler
    game.input.onDown.add(onMouseDown, this);
}

// this method is called, if an object is picked
function pickObject(pointer,sprite) {
    console.log("pickObject:" + sprite.name);
}

function onMouseDown(pt) {
	// check if the mouse picked something out of the myGame.group
    var objs = game.physics.arcade.getObjectsUnderPointer(pt, myGame.group, pickObject, this);
    if (objs.length > 0) {
        console.log("item picked");
    }
    else {
        console.log("nothing picked");
    }
}
```

----

animation

// sprite loaded by spritesheet
// create an animation from sprite-image nr. 5,6,7,8 with speed 10
// and looped (true)
sprite.animations.add('run', [5,6,7,8], 10, true);
// start the animation named 'run'
sprite.play('run');

