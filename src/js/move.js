function Move() {
    this.move_type = Move.SINGLE;
    this.available = true;
}

Move.SINGLE = 0;
Move.DOUBLE = 1;

Move.sp = function (move_type, node) {
    // TODO(pht) implement other move types
    return [ { i : node.i + 1, j : node.j },
	     { i : node.i -1, j : node.j },
	     { i : node.i, j : node.j + 1},
	     { i : node.i, j : node.j -1} ];
}