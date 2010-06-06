function Node(i,j,parent) {
    this.i  = i
    this.j = j
    this.parent = parent

    if (parent == null) {
	this.cost_from_start = 0
    } else {
	this.cost_from_start = parent.cost_from_start + 1
    }
}

Node.prototype.equals = function (other) {
    return (this.i == other.i && this.j == other.j)
}

Node.prototype.successors = function (puzzle, move_type) {
    var res = []
    // TODO(pht) : use filtering ? 
    $.each(this.successor_positions(move_type), function (index, position) {
	if (puzzle.is_reachable(position)) {
	    res.push(position);
	}
    });
    return res
}

Node.prototype.successor_positions = function (move_type) {
    return Move.sp(move_type, this)
}

Node.prototype.h = function(goal) {
    var di = Math.abs(goal.i - this.i)
    var dj = Math.abs(goal.j - this.j)
    return di*di + dj*dj
}

Node.prototype.estimated_cost = function (goal) {
    return this.cost_from_start + this.h(goal);
}