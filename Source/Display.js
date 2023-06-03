
class Display
{
	constructor(sizeInPixels)
	{
		this.sizeInPixels = sizeInPixels;

		this.colorFore = "Gray";
		this.colorFill = "LightGray";
		this.colorBack = "Black";

		// temporary variables

		this._cellPos = new Coords(0, 0);
		this._drawPos = new Coords(0, 0);
	}

	initialize(universe)
	{
		var d = document;
		this.canvas = d.createElement("canvas");
		this.canvas.width = this.sizeInPixels.x;
		this.canvas.height = this.sizeInPixels.y;
		
		this.graphics = this.canvas.getContext("2d");

		var divDisplay = d.getElementById("divDisplay");
		divDisplay.appendChild(this.canvas);
	}

	// Drawing.

	drawBackground()
	{
		var g = this.graphics;
		g.fillStyle = this.colorBack;
		g.strokeStyle = this.colorFore;

		var size = this.sizeInPixels;
		g.fillRect(0, 0, size.x, size.y);
		g.strokeRect(0, 0, size.x, size.y);
	}

	drawBlock(mapCellSizeInPixels, block)
	{
		var cellPositionsOccupied = block.cellPositionsOccupied;

		for (var i = 0; i < cellPositionsOccupied.length; i++)
		{
			var cellPos = cellPositionsOccupied[i];

			this.drawMapCellAtPos(mapCellSizeInPixels, cellPos);
		}
	}

	drawMap(map)
	{
		var mapSizeInCells = map.sizeInCells;
		var mapCellSizeInPixels = map.cellSizeInPixels;

		var cellPos = this._cellPos;

		for (var y = 0; y < mapSizeInCells.y; y++)
		{
			cellPos.y = y;

			for (var x = 0; x < mapSizeInCells.x; x++)
			{
				cellPos.x = x;

				var isCellAtPosOccupied =
					map.isCellAtPosOccupied(cellPos);

				if (isCellAtPosOccupied)
				{
					this.drawMapCellAtPos(mapCellSizeInPixels, cellPos);
				}
			}
		}
	}

	drawMapCellAtPos(size, cellPos)
	{
		var g = this.graphics;

		g.fillStyle = this.colorFill;
		g.strokeStyle = this.colorFore;

		var drawPos = this._drawPos.overwriteWith
		(
			cellPos
		).multiply
		(
			size
		);

		g.fillRect(drawPos.x, drawPos.y, size.x, size.y);
		g.strokeRect(drawPos.x, drawPos.y, size.x, size.y);
	}

	drawText(textToDraw, fontHeightInPixels, drawPos)
	{
		var g = this.graphics;
		g.font = fontHeightInPixels + "px sans-serif";
		g.fillText
		(
			textToDraw, drawPos.x, drawPos.y + fontHeightInPixels
		);
	}
}
