function puzzle_href(puzzle_id) {
    return "in-game.html?puzzle_id=" + puzzle_id;
}

function link_to_puzzle_href(puzzle_id) {
    return "<a href='" + puzzle_href(puzzle_id) + "'>";
}

function load_levels(start, count) {
    $("#levels").empty()
    for (var i = 0 ;  i < count ; i++) {
	var s = PUZZLE_STRUCTS[(start+i)];

	if (s != null) {
	    // TODO : escape to avoid injections
	    title = s["title"]["fr"];

	    var a = $(link_to_puzzle_href(start + i));
	    a.append(title);

	    var li = $("<li>");
	    li.append(a);

	    $("#levels").append(li);
	}

    };

};
