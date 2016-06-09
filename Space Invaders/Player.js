var KEY_W = 87;
var KEY_S = 83;
var KEY_A = 65;
var KEY_D = 68;


var ANIM_WALK_LEFT = 0;
var ANIM_WALK_RIGHT = 1;
var ANIM_MAX = 2;

var Player = function() 
{
	this.cooldownTimer = 0;
	
	this.scale = new Vector2(0.5 ,0.5)
	
	this.sprites = []; 
	{
		this.sprite = new Sprite("Player anim/RedSheet.png");
		this.sprite.buildAnimation(9, 1, 383, 343, 0.05, [0, 1, 2, 3]);
			this.sprite.setAnimationOffset(0, -55, -87);
		this.sprite.buildAnimation(9, 1, 383, 343, 0.05, [5, 6, 7, 8]);
			this.sprite.setAnimationOffset(0, -55, -87);
	}

	this.image = document.createElement("img");
	this.position = new Vector2(); 	
	
	this.width = 540;
	this.height = 536;
	
	this.velocity = new Vector2();
	
	this.falling = true;
	this.jumping = false;

	SetupImageEvents(this, this.image);
	
};

Player.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	
	var left = false;
	var right = false;
	var jump = false;
	
	if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true) 
	{
		left = true;
		this.direction = LEFT;
		if(this.sprite.currentAnimation != ANIM_WALK_LEFT)
			this.sprite.setAnimation(ANIM_WALK_LEFT);
	}

	if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) 
	{
		right = true;
		this.direction = RIGHT;
		if(this.sprite.currentAnimation != ANIM_WALK_RIGHT)
			this.sprite.setAnimation(ANIM_WALK_RIGHT);
	}
	
	
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true)
	{
		iShoot = true;
	}
		else
	{
		iShoot = false;
	}
	
	var wasleft = this.velocity.x < 0;
	var wasright = this.velocity.x > 0;
	
	if (left)
			ddx = ddx - ACCEL;
		else if (wasleft)
			ddx = ddx + FRICTION;
		
	if (right)
			ddx = ddx + ACCEL;
		else if (wasright)
			ddx = ddx - FRICTION;
	
	if ((wasleft && (this.velocity.x > 0)) || (wasright && (this.velocity.x < 0)))
	{
		this.velocity.x = 0; 
	}
	
	if (this.velocity.y > 0)
	{
		if ((celldown && !cell) || (celldiag && !cellright && nx))
		{
			this.position.y = tileToPixel(ty);
			this.velocity.y = 0;
			this.falling = false;
			this.jumping = false;
			ny = 0;
		}
	}
	 
	else if (this.velocity.y < 0)
	{
		if ((cell && !celldown) || (cellright && !celldiag && nx))
		{
			this.position.y = tileToPixel(ty + 1);
			this.velocity.y = 0;
			cell = celldown;
			cellright = celldiag;
			ny = 0;
		}
	}
	
	if (this.velocity.x > 0)
	{
	if ((cellright && !cell) || (celldiag && !celldown && ny))
		{
			this.position.x = tileToPixel(tx);
			this.velocity.x = 0;
		}
	}
	
	else if (this.velocity.x < 0) 
	{
	if ((cell && !cellright) || (celldown && !celldiag && ny)) 
		{
		this.position.x = tileToPixel(tx + 1);
		this.velocity.x = 0;
		}
	}

}

Player.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}