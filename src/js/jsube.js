var g_cell_images = {};
var g_path_images = {};
var g_images = {};
var g_ctx;
var g_path_finder = new PathFinder;
var g_command_stack = new CommandStack;
var g_move_buttons = [];
var g_puzzle;

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
			    load_image(g_path_images, "path_1", "path_1.png", function () {
				    load_image(g_images, "player", "player.png", callback);
				});
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
		    draw_cell_image(g_path_images["path_" + puzzle.current_move().move_type],i,j);
		}
		
	    }
	});
    
    draw_cell_image(g_images["player"], puzzle.player.i, puzzle.player.j);
};

function build_ui(puzzle) {
    puzzle.each_moves(function (i,move) {
	    var move_button = new MoveButton(puzzle, i, move, $('#moves'));
	    g_move_buttons.push(move_button);
	});
};

function draw_ui(puzzle) {
    toggle_enabled(g_command_stack.can_undo(), $("#undo"), "undo");
    toggle_enabled(g_command_stack.can_redo(), $("#redo"), "redo");

    $.each(g_move_buttons, function (i, button) {
	    button.set_selected((i==puzzle.current_move_index));
	    button.set_available(puzzle.moves[i].available);
	});
};


function get_mouse_position(e) {
    j = Math.floor((e.pageX - 20) / 32);
    i = Math.floor((e.pageY - 20) / 32);
    return { i : i, j : j};
};

function toggle_enabled(enabled, elem, base) {
    var enabled_class = base + "_enabled";
    var disabled_class = base + "_disabled";
    if (enabled) {
	elem.removeClass(disabled_class).addClass(enabled_class);
    } else {
	elem.removeClass(enabled_class).addClass(disabled_class);
    }
};

function draw_all() {
    draw_ui(g_puzzle);
    draw_puzzle(g_puzzle);
};

function prevent_double_click(elem) {
    elem.mousedown(function (e) {
	    if (e.preventDefault) {
		e.preventDefault();
	    }
	});
}

$(document).ready(function(){

	g_puzzle = new Puzzle({ rows : ["########",
					"I#-----O",
					"---#####"],
				moves : [Move.SINGLE, Move.DOUBLE]});
	
	g_ctx = document.getElementById('playground').getContext('2d');

	$('#playground').bind('mousemove', function (e) {
	
		new_goal = get_mouse_position(e);
		
		if (g_path_finder.goal_changed(new_goal)) {
		    g_path_finder.update_path(g_puzzle, new_goal);
		    draw_puzzle(g_puzzle);
		}
		
	    });
	
	$('#playground').bind('click', function (e) {
		mouse_position = get_mouse_position(e);
		if (g_puzzle.is_in_path(mouse_position)) {
		    var command = new MoveCommand(g_puzzle, mouse_position);
		    g_command_stack.execute(command);
		    g_path_finder.update_path(g_puzzle, mouse_position);
		    draw_all();
		}
	    });

	load_images(function () { 
		build_ui(g_puzzle);
		draw_all();
	    });

	prevent_double_click($('#undo'));
	$('#undo').click(function (e) {
		if (g_command_stack.can_undo()) {
		    g_command_stack.undo_last();
		    draw_all();
		}
	    });

	prevent_double_click($('#redo'));
	$('#redo').click(function (e) {
		if (g_command_stack.can_redo()) {
		    g_command_stack.redo_last();
		    draw_all();
		}
	    });


    });
