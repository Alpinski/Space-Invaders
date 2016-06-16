var ENEMY3_SPEED = 150;


var BULLET_SPEED = 1.5;
var Enemies3 = [];

function rand(floor, ceil)
{
return Math.floor( (Math.random()* (ceil-floor)) +floor );
}

function spawnEnemies3()
{


var type = rand(0, 3);

var Enemy3 = {};
Enemy3.image = document.createElement("img");
Enemy3.image.src = "alienship.png";
Enemy3.width = 69;
Enemy3.height = 75;
Enemy3.length = 4;



var x = SCREEN_WIDTH/2;
var y = SCREEN_HEIGHT/2;
;
var dirX = rand(-4,-4);
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

Enemy3.x = x + movX;
Enemy3.y = y + movY;

Enemy3.velocityX = -dirX * ENEMY3_SPEED;
Enemy3.velocityY = -dirY * ENEMY3_SPEED;
 
 


Enemies3.push(Enemy3);

}

