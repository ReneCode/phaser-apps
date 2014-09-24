
function Item(sprite, name) {
    this._sprite = sprite;
    this._name = name;
    this._target = {};
    this._speed = 10;


    this.targetReached = function() {
        var rec = new Phaser.Rectangle(this._sprite.body.x,
                                       this._sprite.body.y, 1,1);
        rec.inflate(this._sprite.body.width / 2, 
                   this._sprite.body.height / 2);

        return Phaser.Rectangle.intersects(rec, this._target);
    }

    this.update = function()
    {
        if (this.targetReached()) {
            this._sprite.body.velocity.x = 0;
            this._sprite.body.velocity.y = 0;
        }
    }

    this.moveTo = function(x, y) {
        this._target = new Phaser.Rectangle(x, y, 0,0);


        var dx = x - this._sprite.body.x;
        var dy = y - this._sprite.body.y;
        // create unit-vector
        var len = Math.sqrt(dx*dx + dy*dy);
        len /= this._speed;
        dx /= len;
        dy /= len;
        // use the speed of the item
        this._sprite.body.velocity.x = dx;
        this._sprite.body.velocity.y = dy;
    }

    this.name = function() {
        return this._name;
    }
}


function Board(game) {
    this._width = 100;
    this._height = 100; 
    this._game = game;
    this._items = [];

    this.addItem = function(name, graphic, x, y) {
        var sprite = game.add.sprite(x, y, graphic);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        this._game.physics.enable(sprite, Phaser.Physics.ARCADE);
        var item = new Item(sprite, name);
        this._items.push(item);
    }

    this.moveItem = function(name, x, y) {
        var item = this.getItem(name);
        if (item) {
            item.moveTo(x, y);
        }
    }

    this.updateItems = function() {
        this._items.forEach( function(i) {
            i.update();
        });
    }

    this.getItem = function(name) {
        var items = this._items.map( function(i) {
            if (i.name() == name) {
                return i;
            }
        });
        if (items) 
        {
            return items[0];
        }
        return undefined;
    }

    this.createGrid = function(dx, dy) {
        var gr = this._game.add.graphics(0,0);

        gr.lineStyle(1, 0xccdddd, 1);
        for (var x=0; x<this._game.width; x+=dx) {
            gr.moveTo(x, 0);
            gr.lineTo(x, game.height);
        }
        for (var y=0; y<this._game.height; y+=dy) {
            gr.moveTo(0, y);
            gr.lineTo(game.width, y);
        }
    }

  
}


var myGame = {};

// ----------------------


function createCircle(color) {
    var graphic = game.add.bitmapData(32,32);
    graphic.ctx.arc(16,16,15,0,30);
    graphic.ctx.fillStyle = color;
    graphic.ctx.fill();
    return graphic;
}


function preload(game) {
//    game.time.advancedTiming = true;

    myGame.board = new Board(game);
}

function create(game) {
    myGame.board.createGrid(50, 50);

    myGame.board.addItem('A1', createCircle('#f0f'), 50, 150 );


    myGame.b1 = game.add.sprite(100,300, createCircle('#f00'));
    myGame.b2 = game.add.sprite(200,300, createCircle('#ff0'));
    game.physics.enable(myGame.b1, Phaser.Physics.ARCADE);
    game.physics.enable(myGame.b2, Phaser.Physics.ARCADE);

    game.input.mouse.mouseDownCallback = mouseDown;

}

function update(game) {  
    myGame.b1.body.velocity.x = 4;
    myGame.b1.body.velocity.y = -1;
    myGame.b2.body.velocity.x = -2;
    myGame.b2.body.velocity.y = -3;

    myGame.board.updateItems();

}


function mouseDown(ev) {
    var x = ev.offsetX;
    var y = ev.offsetY;
    myGame.board.moveItem('A1', x, y);
}


function render() {
    game.debug.pointer( game.input.activePointer );
}

var game = new Phaser.Game(500, 400, Phaser.AUTO, 'phaser-example', 
    { preload: preload, create: create, update: update, render:render});

