var g_cell_images = {}
var g_images = {}
var g_ctx;

function load_image(dest, key, url, callback) {
    var img = new Image();
    img.onload = function() {
	dest[key] = img;
	callback();
    }
    img.src = "../../data/images/png/" + url;
    img.width = 32;
    img.height = 32;
}

function load_images(callback) {
    load_image(g_cell_images, "cell_1", "cell_1.png", function() {
	load_image(g_cell_images, "cell_2", "cell_2.png", function() {
	    load_image(g_images, "player", "player.png", callback);
	});
    });
}

function draw_puzzle(puzzle) {
    puzzle.each_cells(function (i,j,cell) {
	// Add a div to the main div
	if (cell != null) {
	    if (cell == Cell.WALKABLE || cell == Cell.IN) {
		g_ctx.drawImage(g_cell_images["cell_1"], j*32, i*32, 32, 32);
	    } else if (cell == Cell.OUT) {
		g_ctx.drawImage(g_cell_images["cell_2"], j*32, i*32, 32, 32);
	    }
	}
    });
   
    g_ctx.drawImage(g_images["player"], puzzle.player.i * 32, puzzle.player.j * 32, 32, 32);
}

$(document).ready(function(){
    g_ctx = document.getElementById('playground').getContext('2d');
    p = new Puzzle;
    load_images(function () { 
	draw_puzzle(p);
    });
});
