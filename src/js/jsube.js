var g_path_finder = new PathFinder;
var g_command_stack = new CommandStack;
var g_move_buttons = [];
var g_puzzle;
var g_lang = "en";
var g_drawer;

var i18n = { en : { "puzzle.previous" : "Previous puzzle",
		    "puzzle.next" : "Next puzzle",
		    "puzzle.home" : "Back" },
	     fr : { "puzzle.previous" : "Puzzle pr&eacute;c&eacute;dent",
		    "puzzle.next" : "Puzzle suivant",
		    "puzzle.home" : "Retour" } }

function Drawer() {
    this.cell_images = {};
    this.path_images = {};
    this.images = {};
    this.overlays = {};
    this.ctx = document.getElementById('playground').getContext('2d');
};

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
}

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
	if (cell_type != null) {
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

    if (goal != null && puzzle.is_forbiden(goal)) {
	this.draw_cell_image(this.images["forbiden"], goal.i, goal.j);
    }

};

function build_ui(puzzle) {
    $('#moves').empty();
    g_move_buttons = [];
    puzzle.each_moves(function (i,move) {
	var move_button = new MoveButton(puzzle, i, move, $('#moves'));
	g_move_buttons.push(move_button);
    });
};

function draw_ui(puzzle) {
    toggle_enabled(g_command_stack.can_undo(), $("#undo"), "undo");
    toggle_enabled(g_command_stack.can_redo(), $("#redo"), "redo");

    build_ui(puzzle);
    
    $.each(g_move_buttons, function (i, button) {
	button.set_selected((i==puzzle.current_move_index));
	button.set_available(puzzle.moves[i].available);
    });
};


function get_mouse_position(e) {
    offset = $("#playground").offset();
    j = Math.floor((e.pageX - offset.left) / 32);
    i = Math.floor((e.pageY - offset.top) / 32);
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
    g_drawer.draw_puzzle(g_puzzle);
};

function prevent_double_click(elem) {
    elem.mousedown(function (e) {
	if (e.preventDefault) {
	    e.preventDefault();
	}
    });
}

function load_puzzle() {
    var res = null;
    var puzzle_id = parseInt($.url.param("puzzle_id"));
    if (puzzle_id < PUZZLE_STRUCTS.length) {
	var puzzle_struct = PUZZLE_STRUCTS[puzzle_id];
	res = new Puzzle(puzzle_struct);

	// Put title of the puzzle
	$("#puzzle-title").empty();
	$("#puzzle-title").append(res.get_title(g_lang));
	document.title = "Ube - " + res.get_title(g_lang);

	// Put text in links
	$("#link_previous").append(i18n[g_lang]["puzzle.previous"]);
	$("#link_next").append(i18n[g_lang]["puzzle.next"]);
	$("#link_home").append(i18n[g_lang]["puzzle.home"]);
	
	// Load links
	if (puzzle_id > 0) {
	    $("#link_previous").attr("href", puzzle_href(puzzle_id - 1));
	} else {
	    $("#link_previous").remove();
	}
	if (puzzle_id < (PUZZLE_STRUCTS.length - 1)) {
	    $("#link_next").attr("href", puzzle_href(puzzle_id + 1));
	} else {
	    $("#link_next").remove();
	}

    }
    return res;
}

function show_message(messages, callback) {
    $("#dialog-message").empty();

    var p = $("<p>");
    p.append(messages[g_lang]);
    p.append("</p>");
    
    $("#dialog-message").append(p);

    $("#dialog-message").dialog({
	modal: true,
	width : 400,
	title : "Ube",
	buttons: {
	    Ok: function() {
		$(this).dialog('close');
		if (callback != null) {
		    callback();
		}
	    }
	}
    });
}

function next_puzzle() {
    var puzzle_id = parseInt($.url.param("puzzle_id"));
    if (puzzle_id < PUZZLE_STRUCTS.length - 1) {
	$("body").fadeOut(1000, function() {	
	    window.location = puzzle_href(puzzle_id + 1);
	});
    }
}

$(document).ready(function(){
    g_drawer = new Drawer;

    if (navigator.language == "fr") {
	g_lang = "fr";
    }

    $("body").css("display", "none");
    $("body").fadeIn(1000);

    g_puzzle = load_puzzle();

    $("a.transition").click(function (event) {
	event.preventDefault();
	linkLocation = this.href;
	$("body").fadeOut(1000, function () {
	    window.location = linkLocation;
	});
    });

    if (g_puzzle.on_start_messages != null) {
	show_message(g_puzzle.on_start_messages);
    }

    if (g_puzzle == null) {
	alert("Erreur lors du chargement du puzzle !");
	return;
    }

    $('#playground').bind('mousemove', function (e) {
	
	new_goal = get_mouse_position(e);
	
	if (g_path_finder.goal_changed(new_goal)) {
	    g_path_finder.update_path(g_puzzle, new_goal);
	    g_drawer.draw_puzzle(g_puzzle, new_goal);
	} 
	
    });
    
    $('#playground').bind('click', function (e) {
	mouse_position = get_mouse_position(e);
	if (g_puzzle.is_in_path(mouse_position)) {
	    var command = new MoveCommand(g_puzzle, mouse_position);
	    g_command_stack.execute(command);
	    g_path_finder.update_path(g_puzzle, mouse_position);
	    draw_all();

	    if (g_puzzle.is_finished()) {
		if (g_puzzle.on_end_messages != null) {
		    show_message(g_puzzle.on_end_messages, function () {
			next_puzzle();
		    });
		} else {
		    next_puzzle();
		}
	    }
	    
	}
    });

    g_drawer.load_images(function () { 
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
