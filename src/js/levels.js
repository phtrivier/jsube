function puzzle_href(puzzle_id) {
    return "in-game.html?puzzle_id=" + puzzle_id;
}

function link_to_puzzle_href(puzzle_id) {
    return "<a href='" + puzzle_href(puzzle_id) + "'>";
}

g_levels_i18n = {
    "en" : { "level.choose" : "Choose a level" },
    "fr" : { "level.choose" : "Choisissez un niveau" } 
};

function build_level_structure(title, lg) {
    $("title").empty();
    $("title").append("Ube - " + title + " - " + g_levels_i18n[lg]["level.choose"]);
    
    $("body").append("<div id='wrapper'></div>");
    $("#wrapper").append("<div id='main'></div>");
    $("#main").append("<h2>" + title + "</h2>");
    $("#main").append("<ul id='levels'></ul>");
    $("body").append("<div id='footer'>Copyright (C) Pierre-Henri Trivier 2010</div>");
}

function load_levels(start, count, titles) {

    var lg = get_lg();

    build_level_structure(titles[lg], lg);

    $("#levels").empty()
    for (var i = 0 ;  i <= count ; i++) {
	var s = PUZZLE_STRUCTS[(start+i)];

	if (s != null) {
    
	    title = s["title"][lg];

	    var a = $(link_to_puzzle_href(start + i));
	    a.append(title);

	    var li = $("<li>");
	    li.append(a);

	    $("#levels").append(li);
	}

    };

};
