// Tile tests
// ----------

(function tile_tests() {
  // test creating a new tile
  var tile = new Carcaclone.Tile({
    edges: ['a', 'b', 'c', 'd'],
    fields: ['1', '2', '3', '4']
  });
  console.log('new tile', tile);

  // test rotation
  tile.rotate();
  console.log('tile rotated', tile);
}());

// Board tests
//------------

(function board_tests() {
  // new board
  var board = new Carcaclone.Board();

  // test adding a tile
  var tile = new Carcaclone.Tile({
    edges: ['c', 'c', 'c', 'c'],
    fields: [1, 1, 1, 1]
  });

  var add_success = board.add_tile(tile, {x: 1, y: 0});

  if (add_success) {
    console.log('tile added to board at (1,0)', tile);
  } else {
    console.log('failed to add second tile');
    return;
  }

  // test surroundings
  var surroundings = board.list_surroundings({x: 0, y: 0});
  console.log('surroundings of (0,0)', surroundings);
}());
