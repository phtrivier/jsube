function testArchiveWorks() {
    var a = new Archive
    var n = new Node(0,1,null)
    var n2 = new Node(1,2, n)

    a.put(n)

    assertFalse(a.visited(n2))
    assertTrue(a.visited(n))
}

function testMovesGivesProperSuccessorsPositions() {
    var n = new Node(0,0,null)

    var sp = n.successor_positions(Move.SINGLE);

    assertEquals(1, sp[0].i)
    assertEquals(0, sp[0].j)

    assertEquals(-1, sp[1].i)
    assertEquals(0, sp[1].j)
    
    assertEquals(0, sp[2].i)
    assertEquals(1, sp[2].j)
    
    assertEquals(0, sp[3].i)
    assertEquals(-1, sp[3].j)
}

function testMovesGivesProperSuccessors() {
    p = new Puzzle
    var n = new Node(0,0,null)
    var s = n.successors(p, Move.SINGLE)
    assertEquals(1, s.length)
    assertEquals(1, s[0].i)
    assertEquals(0, s[0].j)
    assertEquals(n.i, s[0].parent.i)
    assertEquals(n.j, s[0].parent.j)
}

function testComputesCostsCorrectly() {
    var n = new Node(0,0,null)

    var n1 = new Node(0,1,n)

    var g = new Node(0,2,null)

    assertEquals(0, n.cost_from_start)
    assertEquals(4, n.h(g))
    assertEquals(4, n.estimated_cost(g))

    assertEquals(1, n1.cost_from_start)
    assertEquals(1, n1.h(g))
    assertEquals(2, n1.estimated_cost(g))
}

function testNodeEquality() {
    var n = new Node(0,1,null)
    var g = new Node(1,1,null)
    var n2 = new Node(1,1,n);

    assertFalse(n.equals(g));
    assertTrue(n2.equals(g));

}

function testFindPaths() {
    var p = new Puzzle
    var path_finder = new PathFinder
    var start = {i:0,j:0}
    var end = {i:1,j:1}
    var r = path_finder.find_path(p, start, end, Move.SINGLE)
    assertEquals(1, r);
}