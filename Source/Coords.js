
class Coords
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	add(other)
	{
		this.x += other.x;
		this.y += other.y;

		return this;
	}

	addXY(x, y)
	{
		this.x += x;
		this.y += y;

		return this;
	}

	clone()
	{
		return new Coords(this.x, this.y);
	}

	divide(other)
	{
		this.x /= other.x;
		this.y /= other.y;

		return this;
	}

	dotProduct(other)
	{
		return this.x * other.x + this.y * other.y;
	}

	isWithinRangeX(rangeMax)
	{
		var returnValue = 
		(
			(this.x >= 0 && this.x <= rangeMax.x)
		);

		return returnValue;
	}

	multiply(other)
	{
		this.x *= other.x;
		this.y *= other.y;

		return this;
	}

	orient(forward)
	{
		this.overwriteWithXY
		(
			this.dotProduct(forward),
			this.dotProduct(forward.clone().right())
		);
		
		return this;
	}

	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;

		return this;
	}

	overwriteWithXY(x, y)
	{
		this.x = x;
		this.y = y;

		return this;
	}

	right()
	{
		var temp = this.x;
		this.x = 0 - this.y;
		this.y = temp;
	
		return this;
	}

	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;

		return this;
	}
}
