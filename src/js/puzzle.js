/**
 * Representation of a puzzle
 */
function Puzzle() {
    this.cells = [];
    for (i = 0 ; i < 11 ; i++) {
	this.cells[i] = [];
    }
    // TODO : put player in entry
    this.player = { i : 1, j : 0}
    this.moves = [];
    this.current_move_index = 0;

    // Just hardcoded for the moment
    this.cells[0][0] = new Cell(Cell.WALKABLE);
    this.cells[1][0] = new Cell(Cell.IN);
    this.cells[1][1] = new Cell(Cell.WALKABLE);
    this.cells[1][2] = new Cell(Cell.WALKABLE);
    this.cells[1][3] = new Cell(Cell.WALKABLE);
    this.cells[1][4] = new Cell(Cell.WALKABLE);
    this.cells[2][4] = new Cell(Cell.OUT);

    var m1 = new Move;
    m1.move_type = Move.SINGLE;
    var m2 = new Move;
    m2.move_type = Move.DOUBLE;
	
    this.moves = [ m1, m2];

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
}