
function InputHelper()
{}
{
	InputHelper.prototype.handleEventKeyDown = function(event)
	{
		if (this.hasActionBeenPerformedThisTick == true)
		{
			return;
		}

		var isKeyPressedMappedToAnAction = true;

		var level = Globals.Instance.world.level;
		var blockCurrent = level.blockCurrent;

		if (blockCurrent != null)
		{
			var map = level.map;
			var blockPosInCells = blockCurrent.posInCells;
			var blockPosPrev = blockPosInCells.clone();
			var blockOrientationPrev = blockCurrent.orientation.clone();

			var keyCode = event.keyCode;
	
			if (keyCode == 65) // a - left
			{
				blockPosInCells.addXY
				(
					-1, 0
				);

				blockCurrent.cellPositionsOccupiedUpdate();

				if 
				(
					blockCurrent.collidesWithMapSides(map) == true
					|| blockCurrent.collidesWithMapCellsOccupied(map) == true
				)
				{
					blockPosInCells.overwriteWith(blockPosPrev);	
				}
			}
			else if (keyCode == 68) // d - right
			{
				blockPosInCells.addXY
				(
					1, 0
				);

				blockCurrent.cellPositionsOccupiedUpdate();

				if 
				(
					blockCurrent.collidesWithMapSides(map) == true
					|| blockCurrent.collidesWithMapCellsOccupied(map) == true
				)
				{
					blockPosInCells.overwriteWith(blockPosPrev);	
				}
			}
			else if (keyCode == 83) // s - down
			{
				blockPosInCells.addXY
				(
					0, 1
				);

				blockCurrent.cellPositionsOccupiedUpdate();

				if 
				(
					blockCurrent.collidesWithMapBottom(map) == true
					|| blockCurrent.collidesWithMapCellsOccupied(map) == true
				)
				{
					blockPosInCells.overwriteWith(blockPosPrev);	
				}
			}
			else if (keyCode == 87) // w - rotate
			{
				blockCurrent.orientation.right();

				blockCurrent.cellPositionsOccupiedUpdate();

				if 
				(
					blockCurrent.collidesWithMapBottom(map) == true
					|| blockCurrent.collidesWithMapSides(map) == true
					|| blockCurrent.collidesWithMapCellsOccupied(map) == true
				)
				{
					blockCurrent.orientation.overwriteWith
					(
						blockOrientationPrev
					);	
				}
			}
			else
			{
				isKeyPressedMappedToAnAction = false;
			}
		}

		if (isKeyPressedMappedToAnAction == true)
		{
			this.hasActionBeenPerformedThisTick = true;
		}
	}

	InputHelper.prototype.initialize = function()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
	}

	InputHelper.prototype.updateForTimerTick = function()
	{
		this.hasActionBeenPerformedThisTick = false;
	}
}
