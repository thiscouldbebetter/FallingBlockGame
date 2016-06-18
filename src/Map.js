
function Map(sizeInCells)
{
	this.sizeInCells = sizeInCells;
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

{
	Map.prototype.isCellAtPosOccupied = function(cellPos)
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

	Map.prototype.setCellAtPosAsOccupied = function(cellPos)
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
