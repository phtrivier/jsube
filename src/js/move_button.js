/**
 * A button representing a button to select a move
 */
function MoveButton(puzzle, index, move, target) {
    this.index = index;
    this.img = $("<img/>");
    this.img.attr('src',"../../data/images/png/move_" + move.move_type + ".png");
    this.img.click(function (e) {
	    puzzle.try_set_current_move(index);
	    // FIXME(pht) : pass reference to view instead of 
	    // directly calling the function
	    draw_ui(puzzle);
	});

    // Disable drag and dropping of images (at least in FF)
    this.img.mousedown(function (e) {
	    if (e.preventDefault) {
		e.preventDefault();
	    }
	});

    target.append(this.img);
};

MoveButton.prototype.set_selected = function (selected) {
    if (selected) {
	this.img.removeClass('move_unselected').addClass('move_current');
    } else {
	this.img.removeClass('move_current').addClass('move_unselected');
    }
};