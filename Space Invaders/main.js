var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

//Get deltaTime

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
function getDeltaTime() // Only call this function once per frame
{
endFrameMillis = startFrameMillis;
startFrameMillis = Date.now();
var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
if (deltaTime > 1) // validate that the delta is within range
{
deltaTime = 1;
}
return deltaTime;
}
var score = 0;





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





//Get deltaTime





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
	
	
	var idx = 0;
for(var y = 0; y < level1.layers[LAYER_OBJECT_ENEMIES].height; y++) {
	for(var x = 0; x < level1.layers[LAYER_OBJECT_ENEMIES].width; x++) {
		if(level1.layers[LAYER_OBJECT_ENEMIES].data[idx] != 0) {
			var px = tileToPixel(x);
			var py = tileToPixel(y);
			var e = new Enemy(px, py);
			enemies.push(e);
		}
		idx++;
	}
}	
	
	
	
}





function run()
{
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();
	
	starEmitter.update(deltaTime);
	
	
	// Particles
	var deltaTime = getDeltaTime();
	starEmitter.update(deltaTime);
	starEmitter.draw();
	
	if(DEBUG == 1);

	}
	
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");


var playerscore = 0	
	
window.addEventListener('keydown', function(evt) { onKeyDown(evt); }, false); 
window.addEventListener('keyup', function(evt) { onKeyUp(evt); }, false);










//-------------------- Don't modify anything below here
(function() {
var onEachFrame;
if (window.requestAnimationFrame) {
onEachFrame = function(cb) {
var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
 _cb();
};
} else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb();
window.mozRequestAnimationFrame(_cb); } 
_cb();
};
} else {
onEachFrame = function(cb) { 
setInterval(cb, 1000 / 60);
} 
}
window.onEachFrame = onEachFrame;
 })();

window.onEachFrame (run);