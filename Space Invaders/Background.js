var ANIM_IDLE = 0;
var ANIM_MAX = 1;

var Background = function()
{
	this.sprite = new Sprite("Grid2.png");
	this.sprite.buildAnimation(1, 1, 840, 980, 0, [0]);
	
	for(var i=0; i<ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(0, 0, 0);
	}
	
	this.image = document.createElement("img");
	this.position = new Vector2();
	
	
};

Background.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
}

Background.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}