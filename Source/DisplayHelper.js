
class DisplayHelper
{
	drawBackground()
	{
		this.graphics.fillStyle = "White";
		this.graphics.strokeStyle = "Gray";

		this.graphics.fillRect
		(
			0, 0, 
			this.viewSizeInPixels.x, this.viewSizeInPixels.y
		);

		this.graphics.strokeRect
		(
			0, 0, 
			this.viewSizeInPixels.x, this.viewSizeInPixels.y
		);

	}

	drawBlock(block)
	{
		var cellPositionsOccupied = block.cellPositionsOccupied;

		for (var i = 0; i < cellPositionsOccupied.length; i++)
		{
			var cellPos = cellPositionsOccupied[i];

			this.drawMapCellAtPos(cellPos);
		}
	}

	drawMap(map)
	{
		for (var y = 0; y < map.sizeInCells.y; y++)
		{
			this.cellPos.y = y;

			for (var x = 0; x < map.sizeInCells.x; x++)
			{
				this.cellPos.x = x;

				var isCellAtPosOccupied = map.isCellAtPosOccupied
				(
					this.cellPos
				);

				if (isCellAtPosOccupied == true)
				{
					this.drawMapCellAtPos(this.cellPos);
				}
			}
		}
	}

	drawMapCellAtPos(cellPos)
	{
		this.graphics.fillStyle = "LightGray";
		this.graphics.strokeStyle = "Gray";

		this.drawPos.overwriteWith
		(
			cellPos
		).multiply
		(
			this.mapCellSizeInPixels
		);

		this.graphics.fillRect
		(
			this.drawPos.x,
			this.drawPos.y,
			this.mapCellSizeInPixels.x,
			this.mapCellSizeInPixels.y
		);

		this.graphics.strokeRect
		(
			this.drawPos.x,
			this.drawPos.y,
			this.mapCellSizeInPixels.x,
			this.mapCellSizeInPixels.y
		);
	}

	drawText(textToDraw, fontHeightInPixels, drawPos)
	{
		this.graphics.font = fontHeightInPixels + "px sans-serif";
		this.graphics.fillText
		(
			textToDraw, drawPos.x, drawPos.y + fontHeightInPixels
		);
	}

	initialize(viewSizeInPixels, mapCellSizeInPixels)
	{
		this.viewSizeInPixels = viewSizeInPixels;
		this.mapCellSizeInPixels = mapCellSizeInPixels;

		this.canvas = document.createElement("canvas");
		this.canvas.width = this.viewSizeInPixels.x;
		this.canvas.height = this.viewSizeInPixels.y;
		
		this.graphics = this.canvas.getContext("2d");

		document.body.appendChild(this.canvas);

		// temporary variables

		this.cellPos = new Coords(0, 0);
		this.drawPos = new Coords(0, 0);
	}
}
