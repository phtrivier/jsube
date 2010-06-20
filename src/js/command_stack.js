function CommandStack() {
    this.clear();
};


CommandStack.prototype.clear = function () {
    this.undo_index = -1;
    this.redo_index = -1;
    this.commands = [];
};

CommandStack.prototype.execute = function (command) {
    for (var top_index = (this.commands.length -1) ; 
	 top_index > this.undo_index;
	 top_index--) {
	this.commands.pop();
    }

    this.commands.push(command);
    this.undo_index++;
    this.redo_index = -1;
    command.execute();
};

CommandStack.prototype.undo_last = function () {
    if (this.can_undo()) {
	var to_undo = this.commands[this.undo_index];
	to_undo.undo();
	this.redo_index = this.undo_index;
	this.undo_index--;
    }
};

CommandStack.prototype.redo_last = function () {
    if (this.can_redo()) {
	var to_redo = this.commands[this.redo_index];
	to_redo.execute();
	this.undo_index = this.redo_index;
	if (this.redo_index == this.commands.length -1) {
	    this.redo_index = -1;
	} else {
	    this.redo_index++;
	}
    }
};

CommandStack.prototype.can_undo = function () {
    return (this.undo_index != -1);
};

CommandStack.prototype.can_redo = function () {
    return (this.redo_index != -1);
};

// ----------- //

function MoveCommand(puzzle, position) {
    this.old_position = null;
    this.target_position = position;
    this.puzzle = puzzle;
}

MoveCommand.prototype.execute = function () {
    this.old_position = this.puzzle.player;
    this.move_index = this.puzzle.current_move_index;

    this.puzzle.move_player(this.target_position);
    this.puzzle.moves[this.move_index].use();

    this.puzzle.set_next_available_move_as_current();

    // g_path_finder.update_path(puzzle, position);
    // TODO(pht) add script handling
};

MoveCommand.prototype.undo = function () {
    this.puzzle.moves[this.move_index].revert();
    this.puzzle.move_player(this.old_position);

    this.old_position = this.puzzle.player;
    this.move_index = this.puzzle.current_move_index;

    this.puzzle.set_next_available_move_as_current();

    // g_path_finder.update_path(puzzle, position);
    // TODO(pht) add script handling
};
