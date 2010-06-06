function Archive() {
    this.nodes = {}
}

Archive.prototype.visited = function (node) {
    return (this.nodes[node.i] != null && this.nodes[node.i][node.j] == true)
}

Archive.prototype.put = function (node) {
    if (this.nodes[node.i] == null) {
	this.nodes[node.i] = {}
    }
    this.nodes[node.i][node.j] = true;
}
