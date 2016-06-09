this.KEY_LEFT = 37;
this.KEY_UP = 38;
this.KEY_RIGHT = 39;
this.KEY_DOWN = 40;



var ANIM_WALK_LEFT = 0;
var ANIM_WALK_RIGHT = 1;
var ANIM_IDLE = 2;
var ANIM_MAX = 3;

var Player = function() 
{
	this.cooldownTimer = 0;
		
	this.sprites = []; 
	{
		this.sprite = new Sprite("Player anim/RedSheet.png");
		this.sprite.buildAnimation(9, 1, 383, 381, 0.15, [3, 2, 1, 0]);
		this.sprite.buildAnimation(9, 1, 383, 381, 0.15, [5, 6, 7, 8]);
		this.sprite.buildAnimation(9, 1, 383, 381, 0.15, [4]);
	}
	for(var i=0; i<ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(i, 250, 500);
	}
	this.image = document.createElement("img");
	this.position = new Vector2(); 	
	
	this.direction = ANIM_IDLE
	
	this.width = 540;
	this.height = 536;
	
	this.velocity = new Vector2();

	SetupImageEvents(this, this.image);
	
};

Player.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	
	this.velocity.set(0, 0);
	
	var left = false;
	var right = false;
	var jump = false;
	
	if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true) 
	{
		this.direction = ANIM_WALK_LEFT
		left = true;
		if(this.sprite.currentAnimation != ANIM_WALK_LEFT)
			this.sprite.setAnimation(ANIM_WALK_LEFT);
	}
	else if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) 
	{
		this.direction = ANIM_WALK_RIGHT
		right = true;
		if(this.sprite.currentAnimation != ANIM_WALK_RIGHT)
			this.sprite.setAnimation(ANIM_WALK_RIGHT);
	}
	else
	{
		this.direction = ANIM_IDLE
		if(this.sprite.currentAnimation != ANIM_IDLE)
			this.sprite.setAnimation(ANIM_IDLE);
	}

	
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true)
	{
		iShoot = true;
	}
		else
	{
		iShoot = false;
	}
	
	if (right == true)
	{
		this.velocity.add(new Vector2(1000));
	}
	if (left == true)
	{
		this.velocity.add(new Vector2(-1000))
	}
	this.position.x += this.velocity.x * deltaTime;
	this.position.y += this.velocity.y * deltaTime;
	
}

Player.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}