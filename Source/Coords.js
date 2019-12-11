
function Coords(x, y)
{
	this.x = x;
	this.y = y;
}

{
	Coords.prototype.add = function(other)
	{
		this.x += other.x;
		this.y += other.y;

		return this;
	}

	Coords.prototype.addXY = function(x, y)
	{
		this.x += x;
		this.y += y;

		return this;
	}

	Coords.prototype.clone = function()
	{
		return new Coords(this.x, this.y);
	}

	Coords.prototype.divide = function(other)
	{
		this.x /= other.x;
		this.y /= other.y;

		return this;
	}

	Coords.prototype.dotProduct = function(other)
	{
		return this.x * other.x + this.y * other.y;
	}

	Coords.prototype.isWithinRangeX = function(rangeMax)
	{
		var returnValue = 
		(
			(this.x >= 0 && this.x <= rangeMax.x)
		);

		return returnValue;
	}

	Coords.prototype.multiply = function(other)
	{
		this.x *= other.x;
		this.y *= other.y;

		return this;
	}

	Coords.prototype.orient = function(forward)
	{
		this.overwriteWithXY
		(
			this.dotProduct(forward),
			this.dotProduct(forward.clone().right())
		);
		
		return this;
	}

	Coords.prototype.overwriteWith = function(other)
	{
		this.x = other.x;
		this.y = other.y;

		return this;
	}

	Coords.prototype.overwriteWithXY = function(x, y)
	{
		this.x = x;
		this.y = y;

		return this;
	}

	Coords.prototype.right = function()
	{
		var temp = this.x;
		this.x = 0 - this.y;
		this.y = temp;
	
		return this;	
	}

	Coords.prototype.subtract = function(other)
	{
		this.x -= other.x;
		this.y -= other.y;

		return this;
	}
}
