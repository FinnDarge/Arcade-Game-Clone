// Enemies our player must avoid
var Enemy = function () {
    this.x = -100;
    this.y = 55;
    this.speed = 200;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 101 * 5) {
        this.x += this.speed * dt;
    }
    else {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class LittleBoy {
    constructor() {
        this.x = 2 * 101;
        this.y = 55 + (4 * 83);
        this.sprite = 'images/char-boy.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // checking the postion from the player for collisions or the winning condition
    update() {
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + 50 >= this.x && enemy.x - 50 <= this.x)) {
                this.x = 2 * 101;
                this.y = 55 + (4 * 83);
            }
            else if (this.y < 55) {
                alert("You won!");
                this.x = 2 * 101;
                this.y = 55 + (4 * 83);
            }
        }
    }
    // input handler that checks what key is pressed an then moves the player accordingly
    handleInput(input) {
        switch (input) {
            case "right":
                if (this.x < 101 * 4) {
                    this.x += 101;
                }
                break;
            case "left":
                if (this.x > 0) {
                    this.x -= 101;
                }
                break;
            case "up":
                if (this.y > 0) {
                    this.y -= 83;
                }
                break;
            case "down":
                if (this.y < 83 * 4) {
                    this.y += 83;
                }
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// bug 1
const bug1 = new Enemy();
bug1.speed = 250;

// bug 2
const bug2 = new Enemy();
bug2.y = 55 + 83;

// bug 3
const bug3 = new Enemy();
bug3.y = 55 + (2 * 83);
bug3.speed = 300;

// Creating allEnemies array and pushing the bugs in it.
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3);

// Place the player object in a variable called player
const player = new LittleBoy();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
