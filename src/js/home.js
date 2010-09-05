g_home_i18n = {
    "en" : { "level.choose" : "Choose a level",
	     "level.preview" : "Level preview",
	     "play" : "Play"   },
    "fr" : { "level.choose" : "Choisissez un niveau",
	     "level.preview" : "Aperçu du niveau",
	     "play" : "Jouer"  } 
};

Home = function () {
    this.drawer = new Drawer(16);
    this.puzzle = null;
    this.has_puzzle = false;
}
    
Home.prototype.puzzle_href = function (puzzle_id) {
    return "in-game.html?puzzle_id=" + puzzle_id;
}

Home.prototype.load_translated_text = function(lg) {
	$('#levels-header').append(g_home_i18n[lg]['level.choose']);
	$('#levels-header').mousedown(function (event) {
	    if (event.preventDefault) {
		event.preventDefault();
	    }
	});
    }

Home.prototype.on_level_selected = function(li, level_index) {
    $("#levels > li").each(function (k) {
	$(this).removeClass('selected-level');
    });
    li.removeClass('hovered-level').addClass('selected-level')

    this.puzzle = new Puzzle(PUZZLE_STRUCTS[level_index]);
    this.drawer.clear();
    this.drawer.draw_puzzle(this.puzzle);

    if (!this.has_puzzle) {
	$("#preview_stub").remove();
	var play_div = $("<div id='play' class='button span-4 last'><div>");
	play_div.append("<a id='play_link'>Play</a>");
	$("#preview_footer").append(play_div);
	this.has_puzzle = true;
    }

    $("#play_link").attr("href", this.puzzle_href(level_index));
}

Home.prototype.load_tutorial_level_list = function(lg) {
    $("#levels").empty();
    var that = this;
    for (var i = 0 ; i < 8 ; i++) {

	var levelDiv = $("<li class='level' id='level_link_" + i + "'></li>");
	levelDiv.append(PUZZLE_STRUCTS[i].title[lg]);
	
	levelDiv.hover(function (event) {
	    if (!$(this).hasClass('selected-level')) {
		$(this).addClass('hovered-level');
	    }
	}, 
		       function(event) {
			   $(this).removeClass('hovered-level');
		       });
	
	levelDiv.bind('click', { index : i}, function (event) {
	    that.on_level_selected($(this), event.data.index);
	});
	
	levelDiv.mousedown(function (event) {
	    if (event.preventDefault) {
		event.preventDefault();
	    }
	});
	$("#levels").append(levelDiv);
    }
}

$(document).ready(function(){
    var h = new Home
    h.drawer.load_images(function () {
	var lg = get_lg();
	h.load_translated_text(lg);
	h.load_tutorial_level_list(lg);
    });

});
