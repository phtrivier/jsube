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

$(document).ready(function(){
    for (i = 0 ; i < 22 ; i++) {
	for (j = 0 ; j < 11 ; j++) {
	    // Add a div to the main div
	    if (cells[i][j] != null) {
		if (cells[i][j] == Ube.WALKABLE) {
		    div = document.createElement("div");
		    div.setAttribute("class", "cell");
		    div.setAttribute("position", "absolute");
		    div.setAttribute("top", i*32);
		    div.setAttribute("left", j*32);
		    $('#playground').append(div);
		}
	    }
	}
    }
});
