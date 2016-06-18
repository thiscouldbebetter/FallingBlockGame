function main()
{
	var blockDefnsAll = BlockDefn.Instances._All;

	var level0 = new Level
	(
		5, // fallPeriodOfBlocksInTicksPerCell
		new Map(new Coords(10, 20))
	);

	var world0 = new World
	(
		blockDefnsAll,
		level0
	);

	Globals.Instance.initialize
	(
		100, // millisecondsPerTimerTick
		new Coords(160, 320), // viewSize
		world0
	);
}
