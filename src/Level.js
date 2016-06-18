
function Level(fallPeriodOfBlocksInTicksPerCell, map)
{	
	this.fallPeriodOfBlocksInTicksPerCell = fallPeriodOfBlocksInTicksPerCell;
	this.map = map;

	this.ticksSoFar = 0;
	this.blockCurrent = null;
	this.isTerminated = false;

	this.blockPosInCellsPrev = new Coords(0, 0);
}

{
	Level.prototype.blockGenerate = function()
	{
		var blockDefns = Globals.Instance.world.blockDefns;

		var blockDefnIndex = Math.floor
		(
			Math.random() 
			* blockDefns.length
		);

		var blockDefn = blockDefns[blockDefnIndex];

		var returnValue = new Block
		(
			blockDefn,
			new Coords
			(
				this.map.sizeInCells.x / 2,
				-1
			)
		);

		return returnValue;
	}

	Level.prototype.clearFullRows = function()
	{
		var mapSizeInCells = this.map.sizeInCells;

		var cellPos = new Coords(0, 0);

		var y = mapSizeInCells.y - 1;
		while (y >= 0)
		{
			cellPos.y = y;

			var areAllCellsInRowOccupied = true;

			for (var x = 0; x < mapSizeInCells.x; x++)
			{
				cellPos.x = x;

				var isCellOccupied = this.map.isCellAtPosOccupied	
				(
					cellPos
				);

				if (isCellOccupied == false)
				{
					areAllCellsInRowOccupied = false;
					break;
				}
			}

			if (areAllCellsInRowOccupied == true)
			{
				this.map.cellsAsStrings.splice(y, 1);
				this.map.cellsAsStrings.splice
				(
					0, 0, this.map.cellRowBlankAsString
				);
			}
			else
			{
				y--;
			}
		}
	}

	Level.prototype.initialize = function()
	{
		this.blockCurrent = this.blockGenerate();
	}

	Level.prototype.updateForTimerTick = function()
	{	
		this.ticksSoFar++;

		var blockPosInCells = this.blockCurrent.posInCells;		

		this.blockPosInCellsPrev.overwriteWith(blockPosInCells);

		if (this.ticksSoFar % this.fallPeriodOfBlocksInTicksPerCell == 0)
		{
			blockPosInCells.addXY
			(
				0, 1
			);
		}

		this.blockCurrent.cellPositionsOccupiedUpdate();

		var hasBlockComeToRest = false;

		var hasBlockHitBottom = this.blockCurrent.collidesWithMapBottom
		(
			this.map
		);

		if (hasBlockHitBottom == true)
		{
			hasBlockComeToRest = true;
		}
		else
		{
			var doesBlockCollideWithOthers = this.blockCurrent.collidesWithMapCellsOccupied
			(
				this.map
			);

			if (doesBlockCollideWithOthers == true)
			{
				hasBlockComeToRest = true;
			}
		}

		if (hasBlockComeToRest == true)
		{
			blockPosInCells.overwriteWith
			(
				this.blockPosInCellsPrev
			);
			this.blockCurrent.cellPositionsOccupiedUpdate();

			if (this.blockCurrent.collidesWithMapTop(this.map) == true)
			{
				Globals.Instance.world.level = null;
				alert("Game Over");
			}
			else
			{
				this.blockCurrent.copyCellsOccupiedToMap(this.map);
			}

			this.blockCurrent = null;

			this.clearFullRows();
		}

		if (this.blockCurrent == null)
		{
			this.blockCurrent = this.blockGenerate();
		}

		var displayHelper = Globals.Instance.displayHelper;

		displayHelper.drawBackground();
		
		displayHelper.drawMap
		(
			this.map
		);

		displayHelper.drawBlock
		(
			this.blockCurrent
		);
	}
}
