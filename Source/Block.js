
// classes

class Block
{
	constructor(defn, posInCells)
	{
		this.defn = defn;
		this.posInCells = posInCells;
		this.orientation = new Coords(1, 0);

		this.cellPositionsOccupied = 
		[
			new Coords(0, 0),
			new Coords(0, 0),
			new Coords(0, 0),
			new Coords(0, 0),
		];

		this.cellPositionsOccupiedUpdate();
	}

	cellPositionsOccupiedUpdate()
	{
		var defn = this.defn;

		for (var i = 0; i < defn.offsets.length; i++)
		{
			var offset = defn.offsets[i];
			var posToOverwrite = this.cellPositionsOccupied[i];
			
			posToOverwrite.overwriteWith
			(
				offset
			).orient
			(
				this.orientation
			).add
			(
				this.posInCells
			)
		}
		
	}

	copyCellsOccupiedToMap(map)
	{
		var returnValue = false;

		for (var i = 0; i < this.cellPositionsOccupied.length; i++)
		{
			var cellPos = this.cellPositionsOccupied[i];

			map.setCellAtPosAsOccupied(cellPos);
		}
	}

	collidesWithMapBottom(map)
	{
		var returnValue = false;

		for (var i = 0; i < this.cellPositionsOccupied.length; i++)
		{
			var cellPos = this.cellPositionsOccupied[i];

			if (cellPos.y >= map.sizeInCells.y)
			{
				returnValue = true;
				break;
			}	
		}

		return returnValue;	
	}

	collidesWithMapCellsOccupied(map)
	{
		var returnValue = false;

		for (var i = 0; i < this.cellPositionsOccupied.length; i++)
		{	
			var cellPos = this.cellPositionsOccupied[i];

			var isCellAtPosOccupied = map.isCellAtPosOccupied
			(
				cellPos
			);

			if (isCellAtPosOccupied == true)
			{
				returnValue = true;
				break;
			}
		}	

		return returnValue;	
	}

	collidesWithMapSides(map)
	{
		var returnValue = false;

		for (var i = 0; i < this.cellPositionsOccupied.length; i++)
		{
			var cellPos = this.cellPositionsOccupied[i];

			if (cellPos.x < 0 || cellPos.x >= map.sizeInCells.x)
			{
				returnValue = true;
				break;
			}		
		}

		return returnValue;	
	}

	collidesWithMapTop(map)
	{
		var returnValue = false;

		for (var i = 0; i < this.cellPositionsOccupied.length; i++)
		{
			var cellPos = this.cellPositionsOccupied[i];

			if (cellPos.y < 0)
			{
				returnValue = true;
				break;
			}
		}

		return returnValue;	
	}

}
