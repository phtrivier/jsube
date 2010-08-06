function Drawer() {
    this.cell_images = {};
    this.path_images = {};
    this.images = {};
    this.overlays = {};
    this.ctx = document.getElementById('playground').getContext('2d');
}

Drawer.prototype.load_image = function(dest, key, url, callback) {
    var img = new Image();
    img.onload = function() {
	dest[key] = img;
	callback();
    };
    img.src = "../../data/images/png/" + url;
    img.width = 32;
    img.height = 32;
};

Drawer.prototype.load_many_images = function (content, callback) {
    var that = this;
    var load_helper = function (index) {
	if (index == content.length) {
	    callback();
	} else {
	    var args = content[index];
	    that.load_image(args[0], args[1], args[2], function () {
		load_helper(index+1);
	    });
	}
    };
    load_helper(0);
};

Drawer.prototype.load_images = function (callback) {

    var content = [ [this.cell_images, "cell_1", "cell_1.png"],
		    [this.cell_images, "cell_2", "cell_2.png"],
		    [this.cell_images, "cell_3", "cell_3.png"],
		    [this.path_images, "path_0", "path_0.png"],
		    [this.path_images, "path_1", "path_1.png"],
		    [this.path_images, "path_2", "path_2.png"],
		    [this.overlays, Move.SINGLE, "overlay_move_0.png"],
		    [this.overlays, Move.DOUBLE, "overlay_move_1.png"],
		    [this.overlays, Move.KNIGHT, "overlay_move_2.png"],
		    [this.images, "player", "player.png"],
		    [this.images, "forbiden", "banned_cell.png"]
		  ];

    this.load_many_images(content, callback);

};

Drawer.prototype.draw_cell_image = function(image, i, j) {
    this.ctx.drawImage(image, j*32, i*32, 32, 32);
};

Drawer.prototype.draw_move_overlay = function (move_type, i , j) {
    this.draw_cell_image(this.overlays[move_type], i, j);
};

Drawer.prototype.draw_puzzle = function(puzzle, goal) {
    var that = this;
    puzzle.each_cells(function (i,j,cell) {
	var cell_type = cell.type;
	// Add a div to the main div
	if (cell_type !== null) {
	    if (cell_type == Cell.WALKABLE || cell_type == Cell.IN) {
		that.draw_cell_image(that.cell_images["cell_1"], i,j);
	    } else if (cell_type == Cell.OUT) {
		that.draw_cell_image(that.cell_images["cell_2"], i,j);
	    }
	    
	    if (cell.in_path) {
		that.draw_cell_image(that.path_images["path_" + puzzle.current_move().move_type],i,j);
	    }
	    
	    cell.draw_overlay(g_drawer, i, j);
	}
    });
    
    this.draw_cell_image(this.images["player"], puzzle.player.i, puzzle.player.j);

    if (goal && (puzzle.is_forbiden(goal))) {
	this.draw_cell_image(this.images["forbiden"], goal.i, goal.j);
    }

};
