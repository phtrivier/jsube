/**
 * Representation of a puzzle
 */
function Puzzle() {
    this.cells = [];
    for (i = 0 ; i < 22 ; i++) {
	this.cells[i] = [];
    }

    // Just hardcoded for the moment
    this.cells[0][0] = Cell.IN;
    this.cells[0][1] = Cell.EMPTY;
    this.cells[1][0] = Cell.WALKABLE;
    this.cells[1][1] = Cell.OUT;

    this.player = { i : 0, j : 0}

};

Puzzle.prototype.each_cells = function(callback) {
    for (var i = 0 ; i < 11 ; i++) {
	for (var j = 0 ; j < 22 ; j++) {
	    callback(i,j,this.cells[i][j]);
	}
    }
};