
var ENTITY_CONFIG = {
    HORIZONTAL_MOVE_DISTANCE : 101,
    VERTICAL_MOVE_DISTANCE : 83,
    PLAYER_STARTING_LINE_LEVEL : 5,


};

// Game over audio
var audioGameOver = new Audio('sound/game-over.mp3');
var audioCoin = new Audio('sound/coin.mp3');

// Enemies our player must avoid
var Enemy = function(x,y,width,height,type) {
    "use strict";
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    if(typeof type === "string"){
        switch (type) {
            case "bug":
                // The image/sprite for our enemies
                this.sprite = 'images/enemy-bug.png';
                break;
            case "bear":
                // The image/sprite for our enemies,
                this.sprite = 'images/enemy-bear.png';
                break;
        }
    }


    // The position for our enemies
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = Math.random()*10 + 5;
    this.lineLevel = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    "use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt*10;
    if(this.x>ctx.canvas.width){
        this.x = -100;
        this.speed = Math.random()*20 + 5;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Calculate vertical levels
Enemy.prototype.setLineLevel = function() {
    "use strict";
    if(this.y < 120){
        this.lineLevel = 0;
    } else {
        this.lineLevel = Math.floor((this.y-120)/ENTITY_CONFIG.VERTICAL_MOVE_DISTANCE)+1;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,width,height){
    "use strict";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = 'images/char-boy.png';
    this.lineLevel = ENTITY_CONFIG.PLAYER_STARTING_LINE_LEVEL;
    this.score = 0;
};

Player.prototype.render = function() {
    "use strict";
    // render player image
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.update = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};



// Handler for keyboard input
Player.prototype.handleInput = function(direction) {
    "use strict";
    if (typeof direction === "string"){
        if(direction === "left"){
            if(this.x-ENTITY_CONFIG.HORIZONTAL_MOVE_DISTANCE>=0){
                this.x -= ENTITY_CONFIG.HORIZONTAL_MOVE_DISTANCE;
            }
        } else if (direction === "right" && this.x <= ENTITY_CONFIG.HORIZONTAL_MOVE_DISTANCE*4){
            if(this.x+ENTITY_CONFIG.HORIZONTAL_MOVE_DISTANCE<ENTITY_CONFIG.HORIZONTAL_MOVE_DISTANCE*5){
                this.x += ENTITY_CONFIG.HORIZONTAL_MOVE_DISTANCE;
            }
        } else if (direction === "up") {
            // compare to -10 is because 10 is the offest for enemy image
            if(this.y-ENTITY_CONFIG.VERTICAL_MOVE_DISTANCE >= -10){
                this.lineLevel--;
                this.y -= ENTITY_CONFIG.VERTICAL_MOVE_DISTANCE;
            }
        } else if (direction === "down") {
            if(this.y+ENTITY_CONFIG.VERTICAL_MOVE_DISTANCE< ENTITY_CONFIG.VERTICAL_MOVE_DISTANCE*5){
                this.lineLevel++;
                this.y += ENTITY_CONFIG.VERTICAL_MOVE_DISTANCE;
            }

        }
    }
};

Player.prototype.init = function() {
    "use strict";
    this.score = 0;
    this.x = ENTITY_CONFIG.HORIZONTAL_MOVE_DISTANCE*2;
    this.y = ENTITY_CONFIG.VERTICAL_MOVE_DISTANCE*5-10;
    this.lineLevel = ENTITY_CONFIG.PLAYER_STARTING_LINE_LEVEL;
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

var Item = function (x,y) {
    "use strict";
    this.x = x;
    this.y = y;
};

Item.prototype.render = function() {
    "use strict";
    // render player image
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};


var Gem = function(x,y,type) {
    "use strict";
    Item.call(this,x,y);
    if(typeof type === "string"){
        switch (type) {
            case "orange":
                // The image/sprite for our enemies
                this.sprite = 'images/gem-orange.png';
                // Value foe the gem
                this.value = 1;
                break;
            case "green":
                // The image/sprite for our enemies
                this.sprite = 'images/gem-green.png';
                this.value = 10;
                break;
        }
    }
    this.width = 101;
    this.height = 100;

    if(this.y < 120){
        this.lineLevel = 0;
    } else {
        this.lineLevel = Math.floor((this.y-120)/ENTITY_CONFIG.VERTICAL_MOVE_DISTANCE)+1;
    }
};

Gem.prototype = Object.create(Item.prototype);
Gem.prototype.constructor = Gem.prototype;

Gem.prototype.update = function() {
    "use strict";
    // render player image
    do{
        var tmp = Math.floor((Math.random()*5))*101;
    }while(tmp === this.x);

    this.x = tmp;
    this.y = 120+Math.floor(Math.random()*3)*83;
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Gem.prototype.setLineLevel = function() {
    "use strict";
    if(this.y < 120){
        this.lineLevel = 0;
    } else {
        this.lineLevel = Math.floor((this.y-120)/ENTITY_CONFIG.VERTICAL_MOVE_DISTANCE)+1;
    }
};







// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var bug_1 = new Enemy(-100,120,101,171,"bug");
bug_1.setLineLevel();
var bug_2 = new Enemy(-100,203,101,171,"bug");
bug_2.setLineLevel();
var bug_3 = new Enemy(-100,286,101,171,"bug");
bug_3.setLineLevel();
var bear_1 = new Enemy(-100,203,101,100,"bear");
bear_1.setLineLevel();

allEnemies.push(bug_1);
allEnemies.push(bug_2);
allEnemies.push(bug_3);
allEnemies.push(bear_1);

var allGems = []

var gem = new Gem(Math.floor((Math.random()*5))*101,120+Math.floor(Math.random()*3)*83,"orange");
gem.setLineLevel();

var gem_2 = new Gem(Math.floor((Math.random()*5))*101,120+Math.floor(Math.random()*3)*83,"green");
gem_2.setLineLevel();

allGems.push(gem);
allGems.push(gem_2);

var player = new Player(ENTITY_CONFIG.HORIZONTAL_MOVE_DISTANCE*2,ENTITY_CONFIG.VERTICAL_MOVE_DISTANCE*5-10,101,171);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    "use strict";
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
