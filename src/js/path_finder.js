function PathFinder() {
    this.goal = {}
}

PathFinder.prototype.goal_changed = function(new_goal) {
    return (this.goal.i != new_goal.i || this.goal.j != new_goal.j);
}

PathFinder.prototype.update_path = function(puzzle, new_goal) {
    this.goal = new_goal;
    puzzle.clear_path();
    if (puzzle.is_reachable(new_goal)) {
	this.find_path(puzzle, puzzle.player, this.goal, puzzle.current_move().move_type)
    } 
}

PathFinder.prototype.find_path = function(puzzle, start, end, move_type) {

    var res = -1

    var agenda = new Agenda
    var root = new Node(start.i, start.j, null)
    var closed = new Archive
    var opened = new Archive

    agenda.put(root, 0)
    opened.put(root)

    var reached_goal = null
    var expected_goal = new Node(end.i, end.j, null)

    var current = null;

    while (res == -1 && !agenda.is_empty()) {
	current = agenda.front();

	if (current.equals(expected_goal)) {
	    reached_goal = current
	    res = 1
	} else {
	    closed.put(current)

	    successors = current.successors(puzzle, move_type)

	    $.each(successors, function (index, successor) {
		if (!opened.visited(successor)) {
		    agenda.put(successor, 
			       successor.estimated_cost(expected_goal));
		    opened.put(successor);
		}
	    });
	    
	}
    }
    
    if (reached_goal == null) {
	res = 0
    } else {
	this.mark_nodes_from_path(puzzle, reached_goal);
    }

    return res;
}

PathFinder.prototype.mark_nodes_from_path = function(puzzle, goal) {
    var current = goal;
    while (current != null) {
	puzzle.cells[current.i][current.j].in_path = true;
	current = current.parent;
    }
}