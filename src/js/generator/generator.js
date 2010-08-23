Generator = function () {
};

Generator.prototype.make_step = function (move_type, puzzle) {
    var res = false;
    var node = { i : puzzle.player.i, j : puzzle.player.j, depth :0 };
    var succs = Move.sp(move_type, node) ;
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
};

/*
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
     moves : []};

p = new Puzzle(PUZZLE_STRUCTS[0]);
*/
