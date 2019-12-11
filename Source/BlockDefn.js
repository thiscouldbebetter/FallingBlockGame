
function BlockDefn(name, offsets)
{
	this.name = name;	
	this.offsets = offsets;
}

{
	BlockDefn.Instances = new BlockDefn_Instances();

	function BlockDefn_Instances()
	{
		this.Aye = new BlockDefn("Aye", [new Coords(-1, 0), new Coords(0, 0), new Coords(1, 0), new Coords(2, 0)]);
		this.Ell = new BlockDefn("Ell", [new Coords(-1, 1), new Coords(-1, 0), new Coords(0, 0), new Coords(1, 0)]);
		this.Ess = new BlockDefn("Ess", [new Coords(1, 0), new Coords(0, 0), new Coords(0, 1), new Coords(-1, 1)]);
		this.Gamma = new BlockDefn("Gamma", [new Coords(-1, 0), new Coords(0, 0), new Coords(1, 0), new Coords(1, 1)]);
		this.Square = new BlockDefn("Square", [new Coords(0, 0), new Coords(1, 0), new Coords(1, 1), new Coords(0, 1)]);
		this.Tee = new BlockDefn("Tee", [new Coords(-1, 0), new Coords(0, 0), new Coords(1, 0), new Coords(0, 1)]);
		this.Zee = new BlockDefn("Zee", [new Coords(-1, 0), new Coords(0, 0), new Coords(0, 1), new Coords(1, 1)]);

		this._All = 
		[
			this.Aye,
			this.Ell,
			this.Ess,
			this.Gamma,
			this.Square,
			this.Tee,
			this.Zee,
		];	
	}
}
