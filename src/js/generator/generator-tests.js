$(document).ready(function () {
    test("Step Action single move test", function() {

	s = {title : { fr : 'Template',
		       en : 'Template'
	     },
	     rows : ["I_"],
	     moves : []}
	
	p = new Puzzle(s);

	g = new StepAction(Move.SINGLE);

	equals(Cell.IN, p.cell(0,0).type);
	same(p.player, { i : 0, j : 0}, "player should start on top");

	ok(g.make_step(p), "single move should be possible")

	equals(Cell.WALKABLE, p.cell(0,1).type, "cell type should change");
	same(p.player, { i : 0, j : 1}, "position should change");

	a = new StepAction(Move.DOUBLE);

	equals(g.make_step(p), false);

	same([], p.moves);

	g.consume_move(p);

	equals(p.moves.length, 1, "a move should have been added");
	equals(Move.SINGLE, p.moves[0].move_type);
	equals(true, p.moves[0].available);

	s = {title : { fr : 'Template',
		       en : 'Template'
	     },
	     rows : ["I_"],
	     moves : [Move.SINGLE]}

	p = new Puzzle(s);

	equals(p.moves.length, 1);
	equals(p.moves[0].available, true, "move should be available at start");
	g.consume_move(p);
	equals(p.moves.length, 1, "existing move should have been reused");
	equals(p.moves[0].available, false);
    });

    test("Adding Move to a puzzle", function () {
	s = {title : { fr : 'Template',
		       en : 'Template'
	     },
	     rows : ["I___"],
	     moves : []}
	
	p = new Puzzle(s);

	action = new AddMoveAction(Move.DOUBLE);

	equals(p.moves.length, 0, "No move at startup");
	action.execute(p);
	equals(p.moves.length, 0, "No move can be added on the entry");

	p.player = { i : 0, j : 1 };

	action.execute(p);
	equals(p.moves.length, 1, "One move added");
	equals(p.moves[0].available, true, "Added move should be available");
	ok(p.cell_at(p.player).pickable == true, "New cell should be pickable");

	action.execute(p);
	equals(p.moves.length, 1, "Only one move can be added");

	s = {title : { fr : 'Template',
		       en : 'Template'
	     },
	     rows : ["I___"],
	     moves : [Move.SINGLE, Move.SINGLE, Move.SINGLE, Move.SINGLE, Move.DOUBLE, Move.DOUBLE, Move.DOUBLE, Move.DOUBLE]}

	p = new Puzzle(s);
	p.player = { i : 0, j : 1 };

	equals(p.moves.length, 8, "Eigth move at startup");
	action.execute(p);
	equals(p.moves.length, 8, "Only Eight move at much in the maze");

    });

    test("Exit can be put in the maze", function () {
	
	s = {title : { fr : 'Template',
		       en : 'Template'
	     },
	     rows : ["IK__"],
	     moves : []};

	p = new Puzzle(s);

	a = new ExitAction();

	a.execute(p);
	equals(p.cell(0,0).type, Cell.IN, "Exit can't be put on entry");

	p.player = { i : 0, j : 1 }
	a.execute(p);
	equals(p.cell(0,1).type, Cell.WALKABLE, "exit can't be put on pickable");
	
	p.player = { i : 0, j : 3 }
	a.execute(p);
	equals(p.cell(0,3).type, Cell.OUT, "exit can be put on empty");

    });
    

});

