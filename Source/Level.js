
class Level
{
	constructor
	(
		fallPeriodOfBlocksInTicksPerCellBase,
		rowsToCompletePerSpeedIncrease,
		map
	)
	{
		this.fallPeriodOfBlocksInTicksPerCellBase =
			fallPeriodOfBlocksInTicksPerCellBase;
		this.rowsToCompletePerSpeedIncrease =
			rowsToCompletePerSpeedIncrease;
		this.map = map;

		this.ticksSoFar = 0;
		this.blockCurrent = null;
		this.isTerminated = false;

		this.blockPosInCellsPrev = new Coords(0, 0);

		this.rowGroupsCompletedByDepth = [ 0, 0, 0, 0, 0 ];
	}

	blockGenerate()
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

	clearFullRows()
	{
		var mapSizeInCells = this.map.sizeInCells;

		var cellPos = new Coords(0, 0);

		var y = mapSizeInCells.y - 1;

		var numberOfLinesCompletedSoFar = 0;

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

			if (areAllCellsInRowOccupied)
			{
				this.map.cellsAsStrings.splice(y, 1);
				this.map.cellsAsStrings.splice
				(
					0, 0, this.map.cellRowBlankAsString
				);
				numberOfLinesCompletedSoFar++;
			}
			else
			{
				y--;
			}
		}

		if (numberOfLinesCompletedSoFar > 0)
		{
			this.rowGroupsCompletedByDepth[0] +=
				numberOfLinesCompletedSoFar;
			this.rowGroupsCompletedByDepth[numberOfLinesCompletedSoFar]++;
		}
	}

	fallPeriodOfBlocksInTicksPerCell()
	{
		var rowsCompletedSoFar = this.rowsCompletedSoFar();
		var numberOfSpeedIncreases = Math.floor
		(
			rowsCompletedSoFar / this.rowsToCompletePerSpeedIncrease
		);
		var fallPeriodDivisor = 1 + numberOfSpeedIncreases / 2;
		var fallPeriod = Math.round
		(
			this.fallPeriodOfBlocksInTicksPerCellBase
			/ fallPeriodDivisor
		);
		if (fallPeriod < 1)
		{
			fallPeriod = 1;
		}

		return fallPeriod;
	}

	initialize()
	{
		this.blockCurrent = this.blockGenerate();
	}

	rowsCompletedSoFar()
	{
		return this.rowGroupsCompletedByDepth[0];
	}

	updateForTimerTick()
	{
		this.ticksSoFar++;

		var blockPosInCells = this.blockCurrent.posInCells;

		this.blockPosInCellsPrev.overwriteWith(blockPosInCells);

		if (this.ticksSoFar % this.fallPeriodOfBlocksInTicksPerCell() == 0)
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

		if (hasBlockHitBottom)
		{
			hasBlockComeToRest = true;
		}
		else
		{
			var doesBlockCollideWithOthers =
				this.blockCurrent.collidesWithMapCellsOccupied
				(
					this.map
				);

			if (doesBlockCollideWithOthers)
			{
				hasBlockComeToRest = true;
			}
		}

		if (hasBlockComeToRest)
		{
			blockPosInCells.overwriteWith
			(
				this.blockPosInCellsPrev
			);
			this.blockCurrent.cellPositionsOccupiedUpdate();

			if (this.blockCurrent.collidesWithMapTop(this.map) )
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

		var statsAsText =
			"Rows: "
			+ this.rowGroupsCompletedByDepth[0]
			+ " (1x" + this.rowGroupsCompletedByDepth[1]
			+ " 2x" + this.rowGroupsCompletedByDepth[2]
			+ " 3x" + this.rowGroupsCompletedByDepth[3]
			+ " 4x" + this.rowGroupsCompletedByDepth[4]
			+ ")";

		displayHelper.drawText(statsAsText, 10, new Coords(2, 0));
	}
}
