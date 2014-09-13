var bgtile;

function preload () {
   game.load.image('bgtile', 'bgtile.jpg');
}

function create () {
   bgtile = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('bgtile').height, 'bgtile');
}

function update () {
   bgtile.tilePosition.x -= 1;
}