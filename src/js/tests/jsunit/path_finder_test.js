function testAgendaWorks() {
    var a = new Agenda()

    var n1 = new Node(0,0, null)
    var n2 = new Node(1,1,n1)
    var n3 = new Node(3,3,n1)

    assertTrue("empty at start", a.is_empty());
    
    a.put(n1, 0)
    a.put(n2, 1)
    a.put(n3, 0)

    assertEquals(0, a.lower_cost);
    assertNotNull(a.elements[0]);

    assertFalse("not empty after putting stuff", a.is_empty());
    
    var f = a.front();
    assertEquals(3, f.i);
    assertEquals(3, f.j);
    
    assertFalse("not empty after taking one out", a.is_empty());

    assertEquals(0, a.lower_cost);

    f = a.front();
    assertEquals(0, f.i);
    assertEquals(0, f.j);

    assertEquals(1, a.lower_cost);
    
    f = a.front();
    assertEquals(1, f.i);
    assertEquals(1, f.j);
    
    assertTrue("Empty in the end", a.is_empty());
    
}

