

function TempLine(x1, y1, x2, y2) {
    if (x1) {
        this._gr = this.update(x1, y1, x2, y2);
    }

    this.update = function(x1, y1, x2, y2) {
        if (this._gr) {
            this._gr.destroy();
        }
        this._gr = game.add.graphics(0,0);
        this._gr.lineStyle(2, 0x00ffdd, 1);
        this._gr.moveTo(x1,y1);
        this._gr.lineTo(x2, y2);
    }
}

function Item(sprite, name) {
    this._sprite = sprite;
    this._name = name;
    this._target = {};
    this._speed = 0.2;
    this._tmpLine = new TempLine();


    this.targetReached = function() {
        return this._target.steps <= 0;
    }

    this.update = function()
    {
        if (this._target.steps) {
            this._target.steps--;

            if (this.targetReached()) {
            }
            else {
                this._sprite.reset( 
                    this._sprite.x + this._target.dx,
                    this._sprite.y + this._target.dy );
            }

        }
    }

    this.moveTo = function(x, y) {
        var dx = x - this._sprite.x;
        var dy = y - this._sprite.y;
        // create unit-vector
        var len = Math.sqrt(dx*dx + dy*dy);
        this._target.steps = len / this._speed;
        this._target.dx = dx / this._target.steps;
        this._target.dy = dy / this._target.steps;

        this._tmpLine.update(x,y,this._sprite.x, this._sprite.y);
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
//    game.debug.pointer( game.input.activePointer );
    if (myGame.board) {
        var item = myGame.board.getItem('A1');
        game.debug.spriteInfo(item._sprite, 40,40);

    }
}

var game = new Phaser.Game(500, 400, Phaser.AUTO, 'phaser-example', 
    { preload: preload, create: create, update: update, render:render});

