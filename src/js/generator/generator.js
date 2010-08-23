StepAction = function (move_type, step_count) {
    this.move_type = move_type;
    this.step_count = step_count;
}

StepAction.prototype.to_string = function () {
    return "Step : " + Move.to_long_name(this.move_type) + ", " + this.step_count + " times";
}

StepAction.prototype.execute = function (puzzle) {
    var step_made = false;
    for (var i = 0 ; i < this.step_count ; i++) {
	var made = this.make_step(puzzle);
	console.log("-- Step could be made ? " + made);
	step_made = step_made || made
    }
    if (step_made) {
	this.consume_move(puzzle);
    }
}

// If a move is available, consume it, otherwise create it.
StepAction.prototype.consume_move = function (puzzle) {
    var that = this;
    var found = false;
    $.each(puzzle.moves, function (index, move) {
	if (!found && move.move_type == that.move_type && move.available) {
	    move.available = false;
	    found = true;
	    return;
	}
    });
    if (!found) {
	puzzle.moves.push(new Move(this.move_type));
    }
}

StepAction.prototype.make_step = function (puzzle) {
    var res = false;
    var node = { i : puzzle.player.i, j : puzzle.player.j, depth :0 };
    var succs = Move.sp(this.move_type, node) ;
    $(succs).shuffle();
    $.each(succs, function (index, succ) {
	if (!res && puzzle.is_valid_cell(succ) && 
	    puzzle.cell_at(succ).is_empty()) {
	    puzzle.cell_at(succ).type = Cell.WALKABLE;
	    puzzle.player = { i : succ.i, j : succ.j };
	    res = true;
	}
    });
    return res;
}

AddMoveAction = function (move_type) {
    this.move_type = move_type;
};

AddMoveAction.prototype.execute = function (puzzle) {
    var res = false;
    console.log("-- Not On entry ? " + (puzzle.cell_at(puzzle.player).type != Cell.IN));
    console.log("-- Not pickabe ? " + !puzzle.cell_at(puzzle.player).pickable);
    console.log("-- How many moves ? " + puzzle.moves.length);

    if ((puzzle.cell_at(puzzle.player).type != Cell.IN) &&
	(!puzzle.cell_at(puzzle.player).pickable) && 
	(puzzle.moves.length < 8) ) {
	puzzle.set_cell_at(puzzle.player, new MoveCell(this.move_type));
	puzzle.moves.push(new Move(this.move_type));
	res = true;
    }
    console.log("-- Could move be added ? " + res);
    return res;
};

AddMoveAction.prototype.to_string = function () {
    return "Add Move " + Move.to_long_name(this.move_type);
}

ExitAction = function() {
};

ExitAction.prototype.execute = function (puzzle) {
    var current = puzzle.cell_at(puzzle.player);
    if (current.type != Cell.IN && !current.pickable) {
	puzzle.set_cell_at(puzzle.player, new Cell(Cell.OUT));
    }
}

ExitAction.prototype.to_string = function () {
    return "Put exit";
}

Generator = function () {
    // TODO(pht) : add generator configuration
};

Generator.prototype.generate = function () {
    s = {title : { fr : 'Template',
		   en : 'Template'
		 },
	 rows : ["______________________",
		 "______________________",
		 "______________________",
		 "______________________",
		 "______________________",
		 "______________________",
		 "______________________",
		 "______________________",
		 "______________________",
		 "______________________",
		 "______________________"],
 	 moves : []}

    p = new Puzzle(s);

    var i = this.up_to(10);
    var j = this.up_to(20);

    console.log("Choosed initial position " + i + "," + j)

    p.player = { i : i, j : j };
    p.set_cell_at(p.player, new Cell(Cell.IN));

    actions = this.pick_actions();

    console.log("Initial state : ");
    console.log(p.to_string());

    $.each(actions, function (index, action) {
	console.log(">>>>>>>>> Action " + index  + " >>>>>>>>>>>>>>>>>>");
	console.log(action.to_string());
	action.execute(p);
	console.log(p.to_string());
	console.log("");
    });

    console.log("Final state : " );
    console.log(p.to_string());

    return p;
}

Generator.prototype.up_to = function (k) {
    return (Math.round(Math.random() * 100)) % k ;
}

Generator.prototype.pick_actions = function () {

    var res = [];
    var finished = false;

    while (!finished) {
	
	var dice = Math.random() * 100;
	if (dice < 80) {
	    // Generate a move
	    var move_type = this.up_to(2);
	    var step_count = 0;
	    switch(step_count) {
	    case (Move.SINGLE) : {
		step_count = this.up_to(10);
		break;
	    }
	    case (Move.DOUBLE) : {
		step_count = this.up_to(5);
		break;
	    }
	    case (Move.KNIGHT) : {
		step_count = this.up_to(2);
		break;
	    }
	    }
	    var toAdd = new StepAction(move_type, step_count);
	    res.push(toAdd);

	} else if (dice < 90) {
	    // Generate a pickable move
	    var move_type = this.up_to(2);
	    res.push(new AddMoveAction(move_type));
	} else if (res.length > 5) {
	    finished = true;
	}

	if (res.length >= 10) {
	    finished = true;
	}

    }

    res.push(new ExitAction());

    return res;
}
