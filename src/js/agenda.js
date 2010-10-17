function Agenda() {
    this.lower_cost = null
    this.elements = {}
    this.count = 0
}

Agenda.prototype.clear = function () {
    this.elements = {}
    this.lower_cost = null;
    this.count = 0;
}

Agenda.prototype.is_empty = function () {
    return (this.count == 0);
}

Agenda.prototype.put = function (item, cost) {
    if (this.elements[cost] == null) {
	this.elements[cost] = []
    }

    if (this.lower_cost == null || cost < this.lower_cost) {
	this.lower_cost = cost;
    }

    this.elements[cost].push(item)
    this.count = this.count + 1;
}

Agenda.prototype.front = function () {
    var res = this.elements[this.lower_cost].pop();
    if (this.elements[this.lower_cost].length == 0) {
	this.update_lower_cost();
    }
    if (res != null) {
	this.count = this.count - 1;
    }

    return res;
}

Agenda.prototype.update_lower_cost = function () {
    this.elements[this.lower_cost] = null
    this.lower_cost = null
    // Very strangely, it seems like keys (costs) are stored as string
    // instead of integers ...
    for (var cost in this.elements) {
	if (this.elements[cost] != null) {
	    if (this.lower_cost == null || cost < this.lower_cost) {
		this.lower_cost = parseInt(cost);
	    }
	}
    }
}