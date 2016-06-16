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

var STATE_SPLASH = 0;
var STATE_CONTROLS = 1;
var STATE_GAME = 2;
var STATE_GAMEOVER = 3;

var gameState = STATE_SPLASH;


function runSplash(deltaTime)
{
	if(keyboard.isKeyDown(keyboard.KEY_ENTER) == true)
	{
		enterPressed = true
		gameState = STATE_CONTROLS
	}
	context.fillStyle = "#33ccff";
	context.font = "128px impact";
	context.textBaseline = "bottom";
	context.fillText("Bounce", 250, 500);
	context.font = "52px impact"
	context.fillText("PRESS ENTER", 322, 700)
}

function runControls(deltaTime)
{
	if(keyboard.isKeyDown(keyboard.KEY_ENTER) == true)
	{
		if (enterPressed == false)
		gameState = STATE_GAME
	}
	else
	{
		enterPressed = false
	}
	
	context.fillStyle = "#33ccff";
	context.font="128px impact";
	context.textBaseline = "bottom";
	context.fillText("CONTROLS", 180, 150);
	context.font="72px impact";
	context.fillText("ARROW KEYS = MOVEMENT", 55, 275)
	context.fillText("SPACE = SHOOT", 220, 400)
	context.fillText("ENTER = ADVANCE TO GAME", 50, 900)
}

var score = 0;
var bullet = new Bullet();
var bullets = [];
var iShoot = false;
var shootTimer = 0;
var shootRate = 0.3;
var keyboard = new Keyboard();
var background = new Background();
var player = new Player();
function runGame (deltaTime)
{
	
	
	
	context.restore();
	
	background.update(deltaTime);
	background.draw();
	
	for(var i=0; i<bullets.length; i++)
	{
		bullets[i].update(deltaTime);
		bullets[i].draw();
	}
	
	player.update(deltaTime);
	player.draw();
	
	
	
	
	
	// update the Enemies 
for(var i=0; i<Enemies.length; i++)
{

	Enemies[i].x = Enemies[i].x + Enemies[i].velocityX * deltaTime;
	Enemies[i].y = Enemies[i].y + Enemies[i].velocityY * deltaTime;


	if(Enemies[i].x < -SCREEN_WIDTH)
		{ 
		   Enemies[i].x = SCREEN_WIDTH
		}
	if(Enemies[i].x > SCREEN_WIDTH)
		{
			Enemies[i].x = -SCREEN_WIDTH
		}
}




		// draw all the enemies
	for(var i=0; i<Enemies.length; i++)
	{
		context.drawImage(Enemies[i].image, Enemies[i].x - Enemies[i].width/2,
		Enemies[i].y - Enemies[i].height/2);
	}
	spawnTimer -= deltaTime;
	if(spawnTimer <= 0)
	{
		spawnTimer = 3;	
		spawnEnemies()
	}
	
	
	
	
	
	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}		
		
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 3, 20, 100);

	if(iShoot && shootTimer <= 0)
	{
		shootTimer = shootRate;
		playerShoot();
	}
		
	if(shootTimer > 0)
	shootTimer -= deltaTime;

	if(bullet.isDead == false)
	{
		bullet.x += bullet.velocityX;
		bullet.y += bullet.velocityY;
		context.drawImage(bullet.image, bullet.x - bullet.width/2, bullet.y - bullet.height/2);
		
		if(Enemies.isDead == false)
		{
			var hit = intersects(bullet.x, bullet.y, bullet.width, bullet.height, Enemies.x, Enemies.y, Enemies.width, Enemies.height);
			if(hit == true)
			{
				bullet.isDead = true;
				Enemies.isDead = true;
			}
		}
		if(bullet.x < 0 || bullet.x > SCREEN_WIDTH || bullet.y < 0 || bullet.y > SCREEN_HEIGHT)
		{
			bullet.isDead = true;
		}
	}
};

function runGameOver(deltaTime)
{
	if(keyboard.isKeyDown(keyboard.KEY_ENTER) == true)
	{
		gameState = STATE_SPLASH
	}
	context.fillStyle = "green";
	context.font = "128px impact";
	context.textBaseline = "middle";
	context.fillText("GAME OVER", 655, 375);
	context.fillText(playerScore, 890, 520);
	context.font = "52px impact";
	context.fillText("PRESS ENTER", 815, 900)
}

function playerShoot()
{
	var bullet = new Bullet(player.position.x, player.position.y, player.direction == ANIM_IDLE)
	bullets.push(bullet);
}



var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

var DEBUG = 1;		// set to 0 to turn off drawing debug information

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;



var enemies = [];



var sfxFire;
function initialize()
{
	musicBackground = new Howl(
	{
		urls: ["background.ogg"],
		loop: true,
		buffer: true,
		volume: 0.5
	} );
		musicBackground.play();
		
		sfxFire = new Howl(
		{
			urls: ["fireEffect.ogg"],
			buffer: true,
			volume: 1,
			
			onend: function()
			{
				isSfxPlaying = false;
			}
		} );


}
var spawnTimer = 0;


function run()
{

	
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	
	
	var deltaTime = getDeltaTime();
	
	switch(gameState)
		{
			case STATE_SPLASH:
				runSplash(deltaTime);
				break;
			case STATE_CONTROLS:
				runControls(deltaTime);
				break;
			case STATE_GAME:
				runGame(deltaTime);
				break;
			case STATE_GAMEOVER:
				runGameOver(deltaTime);
				break;
		}
	
	





	

}

initialize();









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