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
var score = 0;




var background = new Background();
var player = new Player();
function runGame (deltaTime)
{

	// enemy update and draw
		for(var i=0; i<enemies.length; i++)
	{
		enemies[i].update(deltaTime);
	}
		for(var i=0; i<enemies.length; i++)
	{
		enemies[i].draw(deltaTime);
	}
	// enemy update and draw.
	context.restore();
	
	background.update(deltaTime);
	background.draw();
	
	player.update(deltaTime);
	player.draw();
	
	
	// update the frame counter 
	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}		
		
	// draw the FPS
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 3, 10, 100);
};





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
	
		player.update(deltaTime);
	player.draw();
	

	

}
	
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");


var playerscore = 0	
var keyboard = new Keyboard();
if(keyboard.isKeyDown(keyboard.KEY_DOWN) == true)
	{
	player.position.y += 1
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