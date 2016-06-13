var ANIM_IDLE = 0;
var ANIM_MAX = 1;

var Background = function()
{
	this.sprite = new Sprite("GridS.png");
	this.sprite.buildAnimation(1, 1, 900, 600, 0, [0]);
	
	for(var i=0; i<ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(0, -43, -54);
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