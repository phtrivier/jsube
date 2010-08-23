load("../lib/env.rhino.js");
load("../lib/jquery-1.4.2.min.js");
load("../lib/jquery.shuffle.js");
load("../lib/jsDump.js")

load("../cell.js");
load("../move.js");
load("../puzzle.js");
load("generator.js");

window.location = "../../html/in-game.html"
$(document).ready(function () {

    var g = new Generator();

/*
    for (i = 0 ; i < 10 ; i++) {
	console.log(g.up_to(10));
    }
    */

    p = g.generate();

});
