var g_cell_images = {};
var g_path_images = {};
var g_images = {};
var g_ctx;
var g_path_finder = new PathFinder;

function load_image(dest, key, url, callback) {
    var img = new Image();
    img.onload = function() {
	dest[key] = img;
	callback();
    };
    img.src = "../../data/images/png/" + url;
    img.width = 32;
    img.height = 32;
};

function load_images(callback) {
    load_image(g_cell_images, "cell_1", "cell_1.png", function() {
	    load_image(g_cell_images, "cell_2", "cell_2.png", function() {
		    load_image(g_path_images, "path_0", "path_0.png", function () {
			    load_image(g_images, "player", "player.png", callback);
			});
		});
	});
};

function draw_cell_image(image, i, j) {
    g_ctx.drawImage(image, j*32, i*32, 32, 32);
};

function draw_puzzle(puzzle) {
    puzzle.each_cells(function (i,j,cell) {
	    var cell_type = cell.type;
	    // Add a div to the main div
	    if (cell_type != null) {
		if (cell_type == Cell.WALKABLE || cell_type == Cell.IN) {
		    draw_cell_image(g_cell_images["cell_1"], i,j);
		} else if (cell_type == Cell.OUT) {
		    draw_cell_image(g_cell_images["cell_2"], i,j);
		}
		
		if (cell.in_path) {
		    draw_cell_image(g_path_images["path_0"],i,j);
		}
		
	    }
	});
    
    draw_cell_image(g_images["player"], puzzle.player.i, puzzle.player.j);
};

var g_move_buttons = [];

function build_ui(puzzle) {
    puzzle.each_moves(function (i,move) {
	    var move_button = new MoveButton(puzzle, i, move, $('#moves'));
	    g_move_buttons.push(move_button);
	});
};

function draw_ui(puzzle) {
    $.each(g_move_buttons, function (i, button) {
	    // TODO : update the class / src of each
	    // buttons depending on the state.
	    button.set_selected((i==puzzle.current_move_index));
	});
}

$(document).ready(function(){
	
	p = new Puzzle;
	
	g_ctx = document.getElementById('playground').getContext('2d');

	$('#playground').bind('mousemove', function (e) {
	
		j = Math.floor((e.pageX - 20) / 32);
		i = Math.floor((e.pageY - 20) / 32);
		
		new_goal = { i : i , j : j };
		if (g_path_finder.goal_changed(new_goal)) {
		    g_path_finder.update_path(p, new_goal);
		    draw_puzzle(p);
		}
		
	    });
	
	load_images(function () { 
		draw_puzzle(p);
		build_ui(p);
		draw_ui(p);
	    });
    });
