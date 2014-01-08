(function tile_tests() {
  var my_tile = new Tile({
    edges: ['a', 'b', 'c', 'd'],
    fields: ['1', '2', '3', '4']
  });
  var hash_tile = document.getElementById('tile');
  hash_tile.innerHTML = 'my_tile = ' + JSON.stringify(my_tile);
  my_tile.rotate();
  hash_tile.innerHTML += '<br/>Now my_tile =' + JSON.stringify(my_tile)
}());

(function map_tests() {
  var my_map = new carca_Map;
  var second_tile = new Tile({
    edges: ['c', 'c', 'c', 'c'],
    fields: [1, 1, 1, 1]
  });
  var add_success = my_map.add_tile(second_tile, {x: 1, y: 0});
  if (add_success) {
    var surroundings = my_map.list_surroundings({x: 0, y: 0});
    show('map', 'Second tile added at (1,0). Now surroundings of (0,0) are', surroundings)
  } else {
    show('map', 'Failed to add second tile.', my_map)
  }
}());
