var Bullet = function(x, y)
{
	this.sprite = new Sprite("Bullet.png");
	this.sprite.buildAnimation(1, 4, 14, 14, 0.15, [0, 1, 2,3]);
	this.sprite.setAnimationOffset(0, -7, -7);
	this.sprite.loop = true
	this.position = new Vector2(370, 850);
	this.position.set(x, y);
	
	this.width = 14;
	this.height = 14;
	
	this.velocity = new Vector2(0,-500);
	
	
}

Bullet.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	this.position.y = Math.round(this.position.y + (deltaTime * this.velocity.y));
}

Bullet.prototype.draw = function()
{
	var screenX = this.position.x;
	this.sprite.draw(context, screenX, this.position.y);
}
