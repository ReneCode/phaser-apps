phaser-apps
===========

apps bases on the js-framework phaser

// set a minimum and maximum scale value
worldScale = Phaser.Math.clamp(worldScale, 0.25, 2);

--------

create graphic, can be moved by player.x .y

player = game.add.graphics(0,100);
player.beginFill(0xddffaa);
player.drawCircle(0, 0, 20);
player.endFill();

player.lineStyle(5, 0xf40022);
player.moveTo(10,10);
player.lineTo(50,100);

------

myGame.player = game.add.sprite(0,0,'player');
// handle that sprite in the middle
myGame.player.anchor.setTo(0.5, 0.5);
myGame.wall = game.add.sprite(200,0,'wall');

// enable both sprites for collision
game.physics.enable(myGame.player, Phaser.Physics.ARCADE);
game.physics.enable(myGame.wall, Phaser.Physics.ARCADE);
