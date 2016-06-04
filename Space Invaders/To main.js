if(player.isDead == false)
		{
		DrawImage(context, player.image, player.x, player.y, player.rotation)
		
	for(var i=0; i<asteroids.length; i++)
		{	
			var hit = intersects(player.x, player.y, player.width, player.height, asteroids[i].x, asteroids[i].y, asteroids[i].width, asteroids[i].height);
		
		if(hit == true)
		{
			player.isDead = true;
			asteroids.splice(i, 1);
			break;
		}
		
		
	//To Main
function playerShoot()
{
	var bullet = new Bullet(player.position.x, player.position.y, player.direction == RIGHT)
	bullets.push(bullet);
}
var bullets = [];
var iShoot = false;
var shootTimer = 0;
var shootRate = 0.3;

for(var i=0; i<bullets.length; i++)
	{
		bullets[i].update(deltaTime);
		bullets[i].draw();
	}
	
	if(iShoot && shootTimer <= 0)
	{
		shootTimer = shootRate;
		playerShoot();
	}
		
	if(shootTimer > 0)
	shootTimer -= deltaTime;