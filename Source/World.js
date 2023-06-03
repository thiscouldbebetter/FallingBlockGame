
class World
{
	constructor(blockDefns, places)
	{
		this.blockDefns = blockDefns;
		this.places = places;

		this.placeCurrentIndex = null;
		this.placeNextIndex = 0;
	}

	initialize(universe)
	{
		// todo
	}

	placeCurrent()
	{
		return (this.placeCurrentIndex == null ? null : this.places[this.placeCurrentIndex]);
	}

	updateForTimerTick(universe)
	{
		if (this.placeNextIndex != null)
		{
			var placeCurrent = this.placeCurrent();
			if (placeCurrent != null)
			{
				placeCurrent.finalize(universe, this);
			}

			this.placeCurrentIndex = this.placeNextIndex;
			this.placeNextIndex = null;

			var placeCurrent = this.placeCurrent();
			placeCurrent.initialize(universe, this);
		}

		var placeCurrent = this.placeCurrent();
		if (placeCurrent != null)
		{
			placeCurrent.updateForTimerTick(universe, this);
		}
	}
}
