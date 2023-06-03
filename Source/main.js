
function main()
{
	var displayWidth = 240;
	var displaySize = new Coords(1, 2).multiplyScalar(displayWidth);
	var display = new Display(displaySize);

	var timerHelper = new TimerHelper(25);

	var blockDefnsAll = BlockDefn.Instances()._All;

	var mapSizeInCells = new Coords(10, 20);
	var mapSizeInPixels = displaySize.clone();

	var level0 = new Level
	(
		5, // fallPeriodOfBlocksInTicksPerCell
		16, // rowsToCompletePerSpeedIncrease
		new Map(mapSizeInCells, mapSizeInPixels)
	);

	var world0 = new World
	(
		blockDefnsAll,
		[
			new PlaceLevel(level0)
		]
	);

	var universe = new Universe
	(
		display,
		timerHelper,
		world0
	);

	universe.initialize();
}
