/**
 * Representation of a puzzle
 */
function Puzzle(structure) {
    this.moves = [];
    this.current_move_index = 0;

    this.on_start_messages = null;
    this.on_end_messages = null;
    this.titles = null;

    if (structure != null) {
	this.load_puzzle_structure(structure);
    }
}

Puzzle.prototype.load_puzzle_structure = function (structure) {
    this.load_cells(structure.rows);
    this.load_moves(structure.moves);
    this.load_messages(structure);
};

Puzzle.prototype.load_messages = function (structure) {
    if (structure.on_start) {
	this.on_start_messages = structure.on_start;
    }
    if (structure.on_end) {
	this.on_end_messages = structure.on_end;
    }
    this.titles = structure.title;
};

Puzzle.prototype.load_moves = function (moves) {
    this.moves = [];
    var that = this;
    $.each(moves, function (index, move_type) {
	var m = new Move;
	m.move_type = move_type;
	that.moves.push(m);
    });
}

Puzzle.prototype.load_cells = function (rows) {
    var that = this;

    this.cells = [];
    for (i = 0 ; i < 11 ; i++) {
	this.cells[i] = [];
    }
    $.each(rows, function (i, row) {
	$.each(row, function (j, letter) {
	    var cell = null;
	    switch(letter) {
	    case '_' :
		cell = new Cell(Cell.EMPTY);
		break;
	    case '-' :
		cell = new Cell(Cell.WALKABLE);
		break;
	    case 'I' :
		cell = new Cell(Cell.IN);
		that.player = { i : i, j : j};
		break;
	    case 'O' :
		cell = new Cell(Cell.OUT);
		break;
	    case 'S' :
		cell = new MoveCell(Move.SINGLE);
		break;
	    case 'D':
		cell = new MoveCell(Move.DOUBLE);
		break;
	    case 'K':
		cell = new MoveCell(Move.KNIGHT);
		break;
	    }
	    that.cells[i][j] = cell;
	});
    });
};

/**
 * The current move type.
 */
Puzzle.prototype.current_move = function() {
    return this.moves[this.current_move_index];
};

/**
 * Iterate over all the cells of the puzzle.
 */
Puzzle.prototype.each_cells = function(callback) {
    for (var i = 0 ; i < 11 ; i++) {
	for (var j = 0 ; j < 22 ; j++) {
	    if (this.cells[i][j] != null) {
		callback(i,j,this.cells[i][j]);
	    }
	}
    }
};

Puzzle.prototype.is_reachable  = function (position) {
    return (this.cells[position.i] != null && this.cells[position.i][position.j] != null &&
	    this.cells[position.i][position.j].type != Cell.EMPTY);
};

Puzzle.prototype.clear_path = function () {
    this.each_cells(function (i,j,cell) {
	cell.in_path = false;
    });
};

Puzzle.prototype.each_moves = function (f) {
    $.each(this.moves, f);
};

// function Puzzle.try_set_current_move(index) {
Puzzle.prototype.try_set_current_move = function (index) {
    if (index >= 0 && index < this.moves.length && this.moves[index].available) {
	this.current_move_index = index;
    }
};

Puzzle.prototype.move_player = function (position) {
    this.player = position;
};

Puzzle.prototype.is_valid_cell = function (position) {
    return (this.cells[position.i] != null && this.cells[position.i][position.j] != null);
};

Puzzle.prototype.is_in_path = function (position) {
    var res = false;
    if (this.is_valid_cell(position)) {
 	res=this.cells[position.i][position.j].in_path;
    }
    return res;
};

Puzzle.prototype.set_next_available_move_as_current = function () {
    var size = this.moves.length;
    var found = false;
    var old_index = this.current_move_index;
    do {
	this.current_move_index = (this.current_move_index + 1) % size;
	if (this.moves[this.current_move_index].available) {
	    found = true;
	}
    } while (!found && this.current_move_index != old_index);
};

Puzzle.prototype.current_move = function () {
    return this.moves[this.current_move_index];
};

Puzzle.prototype.has_available_move = function () {
    return (this.current_move_index != -1 && this.current_move() != null &&
	    this.current_move().available);
};

Puzzle.prototype.do_script_at = function (position) {
    var c = this.cells[position.i][position.j];
    c.do_script(this);
}

Puzzle.prototype.undo_script_at = function (position) {
    var c = this.cells[position.i][position.j];
    c.undo_script(this);
}

Puzzle.prototype.is_finished = function () {
    var p = this.player;
    var c = this.cells[p.i][p.j];
    return (c.type == Cell.OUT)
}

Puzzle.prototype.cell_at = function (position) {
    return this.cell(position.i, position.j);
}

Puzzle.prototype.cell = function (i,j) {
    var res = null;
    if (this.cells[i] != null) {
	res = this.cells[i][j];
    }
    return res;
}

Puzzle.prototype.is_forbiden = function (position) {
    var c = this.cell_at(position);
    return (c!= null && c.type != Cell.EMPTY && !c.in_path);
}

Puzzle.prototype.get_title = function (lg) {
    var res = null;
    if (this.titles != null) {
	res = this.titles[lg];
	if (res == null) {
	    res = this.titles["en"];
	    if (res == null) {
		res = "";
	    }
	}
    }
    return res;
}

Puzzle.prototype.set_cell_at = function(position, cell) {
    if (this.is_valid_cell(position)) {
	this.cells[position.i][position.j] = cell;
    }
}