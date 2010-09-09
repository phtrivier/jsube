g_home_i18n = {
    "en" : { "level.choose" : "Choose a level",
	     "level.preview" : "Level preview",
	     "welcome" : "Welcome to UBE",
	     "intro" : "Ube is a puzzle game, where you try to reach the exit with only a few moves available.",
	     "play.tutorial" : "Play tutorial",
	     "play.game" : "Play game (coming soon !)",
	     "level.preview" : "Level preview",
	     "level.preview.stub" : "Click on a level name to display a preview",
	     "play" : "Play"},
    "fr" : { "level.choose" : "Choisissez un niveau",
	     "level.preview" : "Aperçu du niveau",
	     "welcome": "Bienvenue dans UBE",
	     "intro" : "Ube est un casse-tête. Vous devez atteindre la sortie d'un labyrinthe, mais seuls certains mouvements sont possibles !",
	     "play.tutorial" : "Tutoriel",
	     "play.game" : "Jeu complet (c'est pour bientôt !)",
	     "level.preview" : "Aperçu du niveau",
	     "level.preview.stub" : "Cliquez sur le titre d'un niveau pour afficher un aperçu",
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

Home.prototype.append_i18n = function (selector, lg, key) {
    $(selector).append(g_home_i18n[lg][key]);
}

Home.prototype.load_translated_text = function(lg) {
    this.append_i18n('#welcome', lg, "welcome");
    this.append_i18n('#intro', lg, "intro");
    this.append_i18n('#chapter_0', lg, "play.tutorial");
    this.append_i18n('#chapter_1', lg, "play.game");
    this.append_i18n("#levels-header", lg, "level.choose");
    this.append_i18n("#level-preview-header", lg, "level.preview");
    this.append_i18n("#preview-stub", lg, "level.preview.stub");

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
	$("#preview-stub").remove();
	var play_div = $("<div id='play' class='button span-4 last'><div>");
	play_div.append("<a id='play_link'></a>");
	$("#preview-footer").append(play_div);
	this.append_i18n("#play_link", get_lg(), "play");
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

    new CanvasChecker().check_canvas();

    var h = new Home
    h.drawer.load_images(function () {
	var lg = get_lg();
	h.load_translated_text(lg);
	h.load_tutorial_level_list(lg);
    });

});
