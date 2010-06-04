// Create a stupid list of stuff
cells = [];
for (i = 0 ; i < 22 ; i++) {
    cells[i] = [];
}

Ube = function() { };
Ube.EMPTY = 0;
Ube.IN = 1;
Ube.WALKABLE = 2;
Ube.OUT = 3;

cells[0][0] = Ube.IN;
cells[0][1] = Ube.EMPTY;
cells[1][0] = Ube.WALKABLE;
cells[1][1] = Ube.OUT;

var g_cell_images = {}
var g_ctx;

function load_image(dest, id, url, callback) {
    var img = new Image();
    img.onload = function() {
	g_cell_images["1"] = img;
	callback();
    }
    img.src = url;
    img.width = 32;
    img.height = 32;
    
}

function load_images(callback) {
    load_image(g_cell_images, "1", "../../data/images/png/cell_1.png", callback);
}

function drawPuzzle() {
    for (i = 0 ; i < 22 ; i++) {
	for (j = 0 ; j < 11 ; j++) {
	    // Add a div to the main div
	    if (cells[i][j] != null) {
		if (cells[i][j] == Ube.WALKABLE) {
		    g_ctx.drawImage(g_cell_images["1"], j*32, i*32, 32, 32);
		}
	    }
	}
    }
}

$(document).ready(function(){
    g_ctx = document.getElementById('playground').getContext('2d');
    load_images(drawPuzzle);
});
