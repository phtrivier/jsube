$(document).ready(function () {
    test("A single step can be made", function() {

	s = {title : { fr : 'Template',
		       en : 'Template'
	     },
	     rows : ["I_"],
	     moves : []}
	
	p = new Puzzle(s);

	g = new Generator();

	equals(Cell.IN, p.cell(0,0).type);
	same(p.player, { i : 0, j : 0}, "player should start on top");

	ok(g.make_step(Move.SINGLE, p), "move should be possible")

	equals(Cell.WALKABLE, p.cell(0,1).type, "cell type should change");
	same(p.player, { i : 0, j : 1}, "position should change");

    });
});

