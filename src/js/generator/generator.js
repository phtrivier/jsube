StepAction = function (move_type) {
    this.move_type = move_type;
}

StepAction.prototype.execute = function (puzzle) {
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
	if (puzzle.is_valid_cell(succ) && 
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
    if (!puzzle.cell_at(puzzle.player).type == Cell.IN &&
	!puzzle.cell_at(puzzle.player).pickable && 
	puzzle.moves.length < 8 ) {
	puzzle.set_cell_at(puzzle.player, new MoveCell(this.move_type));
	puzzle.moves.push(new Move(this.move_type));
    }
};

ExitAction = function() {
};

ExitAction.prototype.execute = function (puzzle) {
    var current = puzzle.cell_at(puzzle.player);
    if (current.type != Cell.IN && !current.pickable) {
	puzzle.set_cell_at(puzzle.player, new Cell(Cell.OUT));
    }
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

    p = new Puzzle(p);

}

