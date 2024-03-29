
class Map
{
	constructor(sizeInCells, sizeInPixels)
	{
		this.sizeInCells = sizeInCells;
		this.sizeInPixels = sizeInPixels;

		this.cellSizeInPixels = this.sizeInPixels.clone().divide(this.sizeInCells);

		this.sizeInCellsMinusOnes = this.sizeInCells.clone().subtract
		(
			new Coords(1, 1)
		);

		this.cellsAsStrings = [];

		this.cellRowBlankAsString = "";

		for (var x = 0; x < this.sizeInCells.x; x++)
		{
			this.cellRowBlankAsString += ".";
		}

		for (var y = 0; y < this.sizeInCells.y; y++)
		{
			this.cellsAsStrings.push(this.cellRowBlankAsString);
		}

	}

	isCellAtPosOccupied(cellPos)
	{
		var returnValue = false;

		var cellRowAsString = this.cellsAsStrings[cellPos.y];
		if (cellRowAsString != null)
		{
			var codeCharAtPos = cellRowAsString[cellPos.x];

			if (codeCharAtPos != null)
			{
				returnValue = (codeCharAtPos != ".");
			}
		}

		return returnValue;
	}

	setCellAtPosAsOccupied(cellPos)
	{
		var cellRowAsString = this.cellsAsStrings[cellPos.y];

		cellRowAsString = cellRowAsString.substr
		(
			0,
			cellPos.x
		)
		+ "x"
		+ cellRowAsString.substr
		(
			cellPos.x + 1
		);

		this.cellsAsStrings[cellPos.y] = cellRowAsString;
	}
}
