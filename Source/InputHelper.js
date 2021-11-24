
class InputHelper
{
	handleEventKeyDown(event)
	{
		if (this.hasActionBeenPerformedThisTick)
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

			var key = event.key;

			if (key == "ArrowLeft")
			{
				blockPosInCells.addXY
				(
					-1, 0
				);

				blockCurrent.cellPositionsOccupiedUpdate();

				if 
				(
					blockCurrent.collidesWithMapSides(map)
					|| blockCurrent.collidesWithMapCellsOccupied(map)
				)
				{
					blockPosInCells.overwriteWith(blockPosPrev);
				}
			}
			else if (key == "ArrowRight")
			{
				blockPosInCells.addXY
				(
					1, 0
				);

				blockCurrent.cellPositionsOccupiedUpdate();

				if 
				(
					blockCurrent.collidesWithMapSides(map)
					|| blockCurrent.collidesWithMapCellsOccupied(map)
				)
				{
					blockPosInCells.overwriteWith(blockPosPrev);
				}
			}
			else if (key == "ArrowDown")
			{
				blockPosInCells.addXY
				(
					0, 1
				);

				blockCurrent.cellPositionsOccupiedUpdate();

				if 
				(
					blockCurrent.collidesWithMapBottom(map)
					|| blockCurrent.collidesWithMapCellsOccupied(map)
				)
				{
					blockPosInCells.overwriteWith(blockPosPrev);
				}
			}
			else if (key == "ArrowUp")
			{
				blockCurrent.orientation.right();

				blockCurrent.cellPositionsOccupiedUpdate();

				if 
				(
					blockCurrent.collidesWithMapBottom(map)
					|| blockCurrent.collidesWithMapSides(map)
					|| blockCurrent.collidesWithMapCellsOccupied(map)
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

		if (isKeyPressedMappedToAnAction)
		{
			this.hasActionBeenPerformedThisTick = true;
		}
	}

	initialize()
	{
		document.body.onkeydown =
			this.handleEventKeyDown.bind(this);
	}

	updateForTimerTick()
	{
		this.hasActionBeenPerformedThisTick = false;
	}
}
