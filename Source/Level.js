
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

	blockGenerate(universe, world)
	{
		var blockDefns = world.blockDefns;

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

	initialize(universe, world)
	{
		this.blockCurrent = this.blockGenerate(universe, world);
	}

	rowsCompletedSoFar()
	{
		return this.rowGroupsCompletedByDepth[0];
	}

	updateForTimerTick(universe, world)
	{
		this.updateForTimerTick_Blocks(universe, world);

		this.drawToDisplay(universe.display);

		this.updateForTimerTick_UserInput(universe, world);
	}

	updateForTimerTick_Blocks(universe, world)
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
				document.open(); // Clear it.
				document.write("You lose!");
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
			this.blockCurrent = this.blockGenerate(universe, world);
		}
	}

	updateForTimerTick_UserInput(universe, world)
	{
		var level = this;
		var blockCurrent = level.blockCurrent;

		if (blockCurrent != null)
		{
			var map = level.map;
			var blockPosInCells = blockCurrent.posInCells;
			var blockPosPrev = blockPosInCells.clone();
			var blockOrientationPrev = blockCurrent.orientation.clone();

			var inputHelper = universe.inputHelper;
			var keysToProcess = inputHelper.keysPressed;

			for (var i = 0; i < keysToProcess.length; i++)
			{
				var key = keysToProcess[i];

				inputHelper.keyRelease(key);

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
			}
		}
	}

	// Drawing.

	drawToDisplay(display)
	{
		display.drawBackground();

		display.drawMap
		(
			this.map
		);

		display.drawBlock
		(
			this.map.cellSizeInPixels,
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

		display.drawText(statsAsText, 10, new Coords(2, 0));
	}

}
