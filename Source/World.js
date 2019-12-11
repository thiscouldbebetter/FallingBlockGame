
function World(blockDefns, level)
{
	this.blockDefns = blockDefns;
	this.level = level;
}
{
	World.prototype.initialize = function()
	{
		this.level.initialize();
	}

	World.prototype.updateForTimerTick = function()
	{
		if (this.level != null)
		{
			this.level.updateForTimerTick();
		}
	}
}
