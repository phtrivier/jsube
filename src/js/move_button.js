/**
 * A button representing a button to select a move
 */
function MoveButton(puzzle, index, move, target) {
    this.index = index;
    this.img = $("<img/>");
    this.move = move;

    this.set_available(true);

    this.img.click(function (e) {
	puzzle.try_set_current_move(index);
	// FIXME(pht) : pass reference to view instead of 
	// directly calling the function
	draw_ui(puzzle);
    });

    var that = this;
    this.img.mouseenter(function () {
	if (that.move.available) {
	    that.img.removeClass('move_unselected').addClass('move_hovered');
	}
    });

    this.img.mouseleave(function () {
	that.img.removeClass('move_hovered').addClass('move_unselected');
    });

    // Disable drag and dropping of images (at least in FF)
    prevent_double_click(this.img);

    target.append(this.img);
};

MoveButton.prototype.set_selected = function (selected) {
    if (selected) {
	this.img.removeClass('move_unselected').addClass('move_current');
    } else {
	this.img.removeClass('move_current').addClass('move_unselected');
    }
};

MoveButton.prototype.set_available = function (available) {
    if (available) {
	this.img.attr('src',"../../data/images/png/move_" + this.move.move_type + ".png");
    } else {
	this.img.attr('src',"../../data/images/png/move_" + this.move.move_type + "_grayed.png");
    }
};

