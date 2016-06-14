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
	
	for(var i=0; i<enemies.length; i++)
	{
		enemies[i].update(deltaTime);
	}
	for(var i=0; i<enemies.length; i++)
	{
		enemies[i].draw(deltaTime);
	}
	
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

var starEmitter = createFlyingStarsEmitter("star.png", SCREEN_WIDTH/2, 250);



function initialize()
{
	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) 
	{
		cells[layerIdx] = [];
		var idx = 0;
		for(var y = 0; y < level1.layers[layerIdx].height; y++) 
		{
			cells[layerIdx][y] = [];
			for(var x = 0; x < level1.layers[layerIdx].width; x++) 
			{
				if(level1.layers[layerIdx].data[idx] != 0) 
				{
					cells[layerIdx][y][x] = 1;
					cells[layerIdx][y-1][x] = 1;
					cells[layerIdx][y-1][x+1] = 1;
					cells[layerIdx][y][x+1] = 1;
				}
				else if(cells[layerIdx][y][x] != 1) 
				{
					cells[layerIdx][y][x] = 0; 
				}
				idx++;
			}
		}
	}

}



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