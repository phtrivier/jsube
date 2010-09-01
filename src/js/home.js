g_home_i18n = {
    "en" : { "level.choose" : "Choose a level",
	     "level.preview" : "Level preview",
	     "play" : "Play"   },
    "fr" : { "level.choose" : "Choisissez un niveau",
	     "level.preview" : "Aperçu du niveau",
	     "play" : "Jouer"  } 
};

function load_translated_text(lg) {
    $('#levels-header').append(g_home_i18n[lg]['level.choose']);
    $('#levels-header').mousedown(function (event) {
	if (event.preventDefault) {
	    event.preventDefault();
	}
    });
}

function on_level_selected(li) {
    $("#levels > li").each(function (index) {
	$(this).removeClass('selected-level');
    });
    li.removeClass('hovered-level').addClass('selected-level')
}

function load_tutorial_level_list(lg) {
    $("#levels").empty();
    for (var i = 0 ; i < 7 ; i++) {

	var levelDiv = $("<li class='level'></li>");
	levelDiv.append(PUZZLE_STRUCTS[i].title[lg]);
	
	levelDiv.hover(function (event) {
	    if (!$(this).hasClass('selected-level')) {
		$(this).addClass('hovered-level');
	    }
	}, 
		       function(event) {
			   $(this).removeClass('hovered-level');
		       });
	
	levelDiv.click(function (event) {
	    on_level_selected($(this));
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
    var drawer = new Drawer(16);

    var p = new Puzzle(PUZZLE_STRUCTS[2]);
   
    drawer.load_images(function () {
	var lg = get_lg();
	load_translated_text(lg);
	load_tutorial_level_list(lg);
	// drawer.draw_puzzle(p);
    });

});
