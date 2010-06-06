function Cell(type) {
    this.type = type
    this.in_path = false;
}

Cell.EMPTY = 0;
Cell.IN = 1;
Cell.WALKABLE = 2;
Cell.OUT = 3;

