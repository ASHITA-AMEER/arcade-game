// Enemies the player has to avoid
class Enemy {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = 'images/enemy-bug.png';
  }
	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	update(dt) {
  	this.x += this.speed * dt;
	 	// Restarts enemy movement from the left when Player reaches the water
	  if (this.x > 505) {
  		this.x = -100;
	  	this.speed = 200 + Math.floor(Math.random() * 200);
		}
		// Checks collisons and restarts player at the bottom
		if (player.x < this.x + 79 && player.x + 37 > this.x && player.y < this.y + 25 && 30 + player.y > this.y) {
			player.x = 200;
			player.y = 400;
		}
	}
	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = 'images/char-princess-girl.png';
	}
  update() {
		// Stops Player from moving to left/right side of canvas
		if (this.y > 385) {
			this.y = 385;
		}
		if (this.x > 400) {
			this.x = 400;
		}
		if (this.x < 0) {
			this.x = 0;
		}
		// When Player reaches the water, the player has to return
		if (this.y < 0) {
			this.x = 200;
			this.y = 400;
			// When winning the Game
		  confirm('You won the game!!! Congratulations...');
		 }
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	// Player movement with keyboard arrow keys
	handleInput(arrowKeyPressed) {
		switch (arrowKeyPressed) {
			case 'left':
									this.x -= this.speed + 50;
									break;
			case 'up':
									this.y -= this.speed + 30;
									break;
			case 'right':
									this.x += this.speed + 50;
									break;
			case 'down':
									this.y += this.speed + 30;
									break;
		}
	}
}
// Now instantiate your objects.
let allEnemies = [];
// Canvas position (x y and speed) of enemies and Player
let enemyPosition = [60, 145, 230];
let player = new Player(200, 400, 50);

//Creates array of enemy objects
enemyPosition.forEach((enemyPositionCoordinate) => {
	let enemy = new Enemy(0, enemyPositionCoordinate, 200 + Math.floor(Math.random() * 200));
	allEnemies.push(enemy);
});

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
