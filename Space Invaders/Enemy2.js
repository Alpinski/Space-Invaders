var ENEMY2_SPEED = 150;


var BULLET_SPEED = 1.5;
var Enemies2 = [];

function rand(floor, ceil)
{
return Math.floor( (Math.random()* (ceil-floor)) +floor );
}

function spawnEnemies2()
{


var type = rand(0, 3);

var Enemy2 = {};
Enemy2.image = document.createElement("img");
Enemy2.image.src = "alienship.png";
Enemy2.width = 69;
Enemy2.height = 75;
Enemy2.length = 4;



var x = SCREEN_WIDTH/2;
var y = SCREEN_HEIGHT/3;
;
var dirX = rand(4,4);
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

Enemy2.x = x + movX;
Enemy2.y = y + movY;

Enemy2.velocityX = -dirX * ENEMY_SPEED;
Enemy2.velocityY = -dirY * ENEMY_SPEED;
 
 


Enemies2.push(Enemy2);


}