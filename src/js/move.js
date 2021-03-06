function Move() {
    this.move_type = Move.SINGLE;
    this.available = true;
}

function Move(type) {
    this.move_type = type;
    this.available = true;
}

Move.SINGLE = 0;
Move.DOUBLE = 1;
Move.KNIGHT = 2;
Move.TRIPLE = 3;

Move.moves = {};

Move.moves[Move.SINGLE] = function (node) {
    return [ { i : node.i + 1, j : node.j },
	     { i : node.i -1, j : node.j },
	     { i : node.i, j : node.j + 1},
	     { i : node.i, j : node.j -1} ];
};

Move.moves[Move.DOUBLE] = function (node) {
    return [ { i : node.i + 2, j : node.j },
	     { i : node.i -2, j : node.j },
	     { i : node.i, j : node.j + 2},
	     { i : node.i, j : node.j -2} ];
};

Move.moves[Move.KNIGHT] = function (node) {
    var res = [];
    if (node.depth <= 1) {
	res = [ { i :  node.i + 2, j : node.j + 1}, 
		{ i :  node.i - 2, j : node.j + 1}, 
		{ i :  node.i + 2, j : node.j - 1}, 
		{ i :  node.i - 2, j : node.j - 1}, 
		{ i :  node.i + 1, j : node.j + 2}, 
		{ i :  node.i - 1, j : node.j + 2}, 
		{ i :  node.i + 1, j : node.j - 2}, 
		{ i :  node.i - 1, j : node.j - 2} ];
    }
    return res
};


Move.moves[Move.TRIPLE] = function (node) {
    var res = [];
//    if (node.depth <= 1) {
	res =  [ { i : node.i + 3, j : node.j },
		 { i : node.i -3, j : node.j },
		 { i : node.i, j : node.j + 3},
		 { i : node.i, j : node.j -3} ];
//    }
    return res;
};


Move.sp = function (move_type, node) {
    return Move.moves[move_type](node);
};

Move.prototype.use = function () {
    this.available = false;
}

Move.prototype.revert = function () {
    this.available = true;
}