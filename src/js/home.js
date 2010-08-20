$(document).ready(function(){
    var drawer = new Drawer(16);

    var p = new Puzzle(PUZZLE_STRUCTS[2]);
   
    drawer.load_images(function () {
	drawer.draw_puzzle(p);
    });

});
