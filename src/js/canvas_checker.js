CanvasChecker = function () {
}

CanvasChecker.prototype.has_canvas = function () {
    return !!document.createElement('canvas').getContext;
}

CanvasChecker.prototype.check_canvas = function () {
    if (!this.has_canvas()) {
	window.location = "no_canvas.html"
    }
}