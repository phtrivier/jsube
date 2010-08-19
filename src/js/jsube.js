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
	    $("#link_previous").css("visibility", "hidden");
	}
	if (puzzle_id < (PUZZLE_STRUCTS.length - 1)) {
	    $("#link_next").attr("href", puzzle_href(puzzle_id + 1));
	} else {
	    $("#link_next").css("display", "none");
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
    g_drawer = new Drawer(32);

    if (navigator.language == "fr") {
	g_lang = "fr";
    }

    $("body").css("display", "none");
    $("body").fadeIn(1000);

    g_puzzle = load_puzzle();

    if (g_puzzle == null) {
	alert("Unable to load puzzle, sorry");
	window.location = "jsube.html";
    }

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

    g_drawer.on_move(function (position) {
	if (g_path_finder.goal_changed(position)) {
	    g_path_finder.update_path(g_puzzle, position);
	    g_drawer.draw_puzzle(g_puzzle, position);
	} 
    });

    g_drawer.on_click(function (mouse_position) {
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
