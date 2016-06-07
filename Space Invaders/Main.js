var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;

	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var chuckNorris = document.createElement("img");
chuckNorris.src = "redfighter0005.png";

var player = new Player();
var keyboard = new Keyboard();
var viewOffset = new Vector2();
var Healthbar = new Healthbar();
var bullet = new Bullet();
var bullets = [];
var iShoot = false;
var shootTimer = 0;
var shootRate = 0.3;

if(player.isDead == false)
{
		DrawImage(context, player.image, player.x, player.y, player.rotation)
		
	for(var i=0; i<asteroids.length; i++)
	{	
		var hit = intersects(player.x, player.y, player.width, player.height, asteroids[i].x, asteroids[i].y, asteroids[i].width, asteroids[i].height);
		
	if(hit == true)
		{
			player.isDead = true;
			asteroids.splice(i, 1);
			break;
		}
	}
}

function playerShoot()
{
	var bullet = new Bullet(player.position.x, player.position.y, player.direction == RIGHT)
	bullets.push(bullet);
}

for(var i=0; i<bullets.length; i++)
	{
		bullets[i].update(deltaTime);
		bullets[i].draw();
	}
	
	if(iShoot && shootTimer <= 0)
	{
		shootTimer = shootRate;
		playerShoot();
	}
		
	if(shootTimer > 0)
	shootTimer -= deltaTime;










(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);