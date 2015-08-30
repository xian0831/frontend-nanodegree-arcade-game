var ENTITY_CONFIG = {
    HORIZONTAL_MOVE_DISTANCE : 101,
    VERTICAL_MOVE_DISTANCE : 83,
    PLAYER_STARTING_LINE_LEVEL : 5

};

// Enemies our player must avoid
var Enemy = function(x,y,width,height) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var boardWidth = ctx.canvas.width;
    this.x += this.speed*dt*10;
    if(this.x>boardWidth){
        this.x = -100;
        this.speed = Math.random()*20 + 5;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Calculate vertical levels
Enemy.prototype.setLineLevel = function() {
    if(this.y <= 0){
        this.lineLevel = 0;
    } else {
        this.lineLevel = Math.floor(this.y/83)+1;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = 'images/char-boy.png';
    this.lineLevel = ENTITY_CONFIG.PLAYER_STARTING_LINE_LEVEL;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.update = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

// Handler for keyboard input
Player.prototype.handleInput = function(direction) {
    if (typeof direction === "string"){
        if(direction === "left"){
            this.x -= ENTITY_CONFIG.HORIZONTAL_MOVE_DISTANCE;
        } else if (direction === "right"){
            this.x += ENTITY_CONFIG.HORIZONTAL_MOVE_DISTANCE;
        } else if (direction === "up") {
            this.lineLevel--;
            this.y -= ENTITY_CONFIG.VERTICAL_MOVE_DISTANCE;
        } else if (direction === "down") {
            this.lineLevel++;
            this.y += ENTITY_CONFIG.VERTICAL_MOVE_DISTANCE;
        }
    }
};

Player.prototype.init = function() {
    this.x = ENTITY_CONFIG.HORIZONTAL_MOVE_DISTANCE*2;
    this.y = ENTITY_CONFIG.VERTICAL_MOVE_DISTANCE*5;
    this.lineLevel = ENTITY_CONFIG.PLAYER_STARTING_LINE_LEVEL;
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var bug_1 = new Enemy(-100,65,101,171);
bug_1.setLineLevel();
var bug_2 = new Enemy(-100,145,101,171);
bug_2.setLineLevel();
var bug_3 = new Enemy(-100,225,101,171);
bug_3.setLineLevel();
allEnemies.push(bug_1);
allEnemies.push(bug_2);
allEnemies.push(bug_3);
var player = new Player(ENTITY_CONFIG.HORIZONTAL_MOVE_DISTANCE*2,406,101,171);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
