function Cell(type) {
    this.type = type
    this.in_path = false;
}

Cell.prototype.do_script = function (puzzle) {
};

Cell.prototype.undo_script = function (puzzle) {
};

Cell.prototype.draw_overlay = function (drawer,i,j) {
};

Cell.prototype.is_empty = function () {
    return (this.type == Cell.EMPTY);
}

Cell.EMPTY = 0;
Cell.IN = 1;
Cell.WALKABLE = 2;
Cell.OUT = 3;

function MoveCell(move_type) {
    // TODO(pht) : how to do inherintance properly ?
    this.in_path = false;
    this.type = Cell.WALKABLE;
    this.move_type = move_type;
    this.move_index = -1;
    this.pickable = true;
};

MoveCell.prototype.do_script = function (puzzle) {
    this.pickable = false;
    this.move_index = puzzle.moves.length;
    puzzle.moves.push(new Move(this.move_type));
};

MoveCell.prototype.undo_script = function (puzzle) {
    this.pickable = true;
    puzzle.moves.splice(this.move_index);
    this.move_index = -1;
};

MoveCell.prototype.draw_overlay = function (drawer, i , j) {
    if (this.pickable) {
	drawer.draw_move_overlay(this.move_type, i, j);
    }
};