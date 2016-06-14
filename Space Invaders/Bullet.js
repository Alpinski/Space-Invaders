var Bullet = function(x, y)
{
	this.sprite = new Sprite("Bullet.png");
	this.sprite.buildAnimation(1, 4, 14, 14, 0.15, [0, 1, 2,3]);
	this.sprite.setAnimationOffset(0, 436, 530);
	this.sprite.loop = true
	this.position = new Vector2();
	this.position.set(x, y);
	
	
	this.velocity = new Vector2(0,-300);
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
