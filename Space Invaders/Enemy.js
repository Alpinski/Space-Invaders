var ENEMY_SPEED = 150;

var BULLET_SPEED = 1.5;
var Enemies = [];

function rand(floor, ceil)
{
return Math.floor( (Math.random()* (ceil-floor)) +floor );
}

function spawnEnemies()
{


var type = rand(0, 3);

var Enemy = {};
Enemy.image = document.createElement("img");
Enemy.image.src = "alienship.png";
Enemy.width = 69;
Enemy.height = 75;
Enemy.isDead = false;
Enemy.length = 4;


var x = SCREEN_WIDTH/2;
var y = SCREEN_HEIGHT/4;
;
var dirX = rand(-2,2);
var dirY = rand(0,0);

var magnitude = (dirX * dirX) + (dirY * dirY);
if(magnitude != 0)
{
var oneOverMag = 1 / Math.sqrt(magnitude);
dirX *= oneOverMag;
dirY *= oneOverMag;
}

var movX = dirX * SCREEN_HEIGHT;
var movY = dirY * SCREEN_HEIGHT;

Enemy.x = x + movX;
Enemy.y = y + movY;

Enemy.velocityX = -dirX * ENEMY_SPEED;
Enemy.velocityY = -dirY * ENEMY_SPEED;

Enemies.push(Enemy);

	


	
	
	
}