function load_tutorial_level_list() {
    var lg = get_lg();
    $("#levels").empty();
    for (var i = 0 ; i < 7 ; i++) {

	var levelDiv = $("<li class='level'></li>");
	levelDiv.append(PUZZLE_STRUCTS[i].title[lg]);
	
	levelDiv.hover(function (event) {
	    $(this).addClass('hovered-level');
	}, 
		       function(event) {
			   $(this).removeClass('hovered-level');
		       });
	
	// TODO(levelDiv.click(on_link_clicked(), load_level_preview(i));
	
	$("#levels").append(levelDiv);
    }
}

$(document).ready(function(){
    var drawer = new Drawer(16);

    var p = new Puzzle(PUZZLE_STRUCTS[2]);
   
    drawer.load_images(function () {
	load_tutorial_level_list();
	// drawer.draw_puzzle(p);
    });

});
