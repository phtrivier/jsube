g_home_i18n = {
    "en" : { "level.choose" : "Choose a level",
	     "level.preview" : "Level preview",
	     "welcome" : "Welcome to UBE",
	     "intro" : "Ube is a puzzle game, where you try to reach the exit with only a few moves available.",
	     "play.tutorial" : "Play tutorial",
	     "play.game" : "Play game (work in progress !)",
	     "level.preview" : "Level preview",
	     "level.preview.stub" : "Click on a level name to display a preview",
	     "play" : "Play", 
	     "contact": "Questions ? Remarks ? Drop a note ?"
	   },
    "fr" : { "level.choose" : "Choisissez un niveau",
	     "level.preview" : "Aperçu du niveau",
	     "welcome": "Bienvenue dans UBE",
	     "intro" : "Ube est un casse-tête. Vous devez atteindre la sortie d'un labyrinthe, mais seuls certains mouvements sont possibles !",
	     "play.tutorial" : "Tutoriel",
	     "play.game" : "Jeu (ça avance !)",
	     "level.preview" : "Aperçu du niveau",
	     "level.preview.stub" : "Cliquez sur le titre d'un niveau pour afficher un aperçu",
	     "play" : "Jouer",
	     "contact" : "Des questions ? Des remarques ? Laissez un message !"
	   } 
};

Chapter = function (start, finish) {
    this.start = start;
    this.finish = finish;
}

Home = function (lg) {
    this.drawer = new Drawer(16);
    this.puzzle = null;
    this.has_puzzle = false;
    this.selected_chapter = null;
    this.chapters = [ new Chapter(0,7), new Chapter(7,14) ];
    this.lg = lg;
}
    
Home.prototype.set_selected_chapter = function (chapter_id) {
    if (this.selected_chapter != chapter_id) {
	this.load_chapter(chapter_id);
	this.add_selected_class(chapter_id);
    }
    this.selected_chapter = chapter_id;
    this.set_selected_level(this.chapters[chapter_id].start);
}

Home.prototype.toggle = function(selector, c1, c2)  {
    $(selector).removeClass(c1).addClass(c2);
}

Home.prototype.add_selected_class = function (chapter_id) {
    this.toggle("#chapter_" + chapter_id, "unselected-chapter", "selected-chapter");
    this.toggle("#chapter_" + chapter_id, "tab-header-unselected", "tab-header-selected");

    this.toggle("#chapter_" + ((chapter_id+1) % 2), "selected-chapter", "unselected-chapter");
    this.toggle("#chapter_" + ((chapter_id+1) % 2), "tab-header-selected", "tab-header-unselected" );
}

Home.prototype.puzzle_href = function (puzzle_id) {
    return "in-game.html?puzzle_id=" + puzzle_id;
}

Home.prototype.append_i18n = function (selector, key) {
    $(selector).append(g_home_i18n[this.lg][key]);
}

Home.prototype.load_translated_text = function() {
    this.append_i18n('#welcome', "welcome");
    this.append_i18n('#intro', "intro");
    this.append_i18n('#chapter_0', "play.tutorial");
    this.append_i18n('#chapter_1', "play.game");
    this.append_i18n("#levels-header", "level.choose");
    this.append_i18n("#level-preview-header", "level.preview");
    this.append_i18n("#preview-stub", "level.preview.stub");
    this.append_i18n("#contact", "contact");

    $('#levels-header').mousedown(function (event) {
	if (event.preventDefault) {
	    event.preventDefault();
	}
    });
}

Home.prototype.on_level_selected = function(level_index) {
    this.set_selected_level(level_index);
}

Home.prototype.set_selected_level = function (level_index) {
    var item_index = level_index - this.chapters[this.selected_chapter].start;
    var li = $("#levels > li:eq(" + item_index + ")");
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
	this.append_i18n("#play_link", "play");
	this.has_puzzle = true;
    }

    $("#play_link").attr("href", this.puzzle_href(level_index));
}

Home.prototype.load_chapter = function (index) {
    var chapter = this.chapters[index];
    this.load_level_list(chapter.start, chapter.finish);
}

Home.prototype.load_level_list = function(start, finish) {
    this.chapter_start = start;
    $("#levels").empty();
    var that = this;
    for (var i = start ; i < finish ; i++) {

	var levelDiv = $("<li class='level' id='level_link_" + i + "'></li>");
	levelDiv.append(PUZZLE_STRUCTS[i].title[this.lg]);
	
	levelDiv.hover(function (event) {
	    if (!$(this).hasClass('selected-level')) {
		$(this).addClass('hovered-level');
	    }
	}, 
		       function(event) {
			   $(this).removeClass('hovered-level');
		       });
	
	levelDiv.bind('click', { index : i}, function (event) {
	    that.on_level_selected(event.data.index);
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

    var h = new Home(get_lg());
    h.drawer.load_images(function () {
	h.load_translated_text();
	h.set_selected_chapter(0);
	$("#chapter_0").click(function (event) {
	    h.set_selected_chapter(0);
	});
	$("#chapter_1").click(function (event) {
	    h.set_selected_chapter(1);
	});
    });

});
