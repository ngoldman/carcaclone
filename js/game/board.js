(function(){

  //============================ The Board =======================================

  // My last attempt lacked a clear data structure to manage the tiles on the board,
  // and only implemented a GET_TILE method. In this proposal, we'll initialize an
  // array of arrays so that we can freely address spaces by integer math.

  // The rules dictate that the board is built from the start tile out in all
  // directions. This suggests that we use a Cartesian coordinate system with the
  // start tile at the origin. The simplest way to account for this is to add an
  // offset.

  // public

  function Board () {
    // Set up an array of arrays that we will place tiles into. Even if the
    // players build very far in one direction, a 40x40 board should suffice.
    this.tiles = generateBoard();
  }

  // Given a space on the board, return the contents of the adjacent spaces as an
  // array of tiles.
  Board.prototype.list_surroundings = function (coords) {
    var surroundings = [];
    var new_coords, i;

    for (i = 4; i--; ) {
      new_coords = {
        x: coords.x + cartesian_offsets[i].x,
        y: coords.y + cartesian_offsets[i].y
      };
      surroundings.push(this.get_tile(new_coords));
    }

    // Since we used PUSH, the tiles are actually listed in counterclockwise
    // order. Return them in clockwise order so that everything is consistent.
    return surroundings.reverse();
  };

  Board.prototype.add_tile = function (tile, coords) {

    var adj = this.list_surroundings(coords);

    function valid_placement(tile, coords) {
      return (tiles_adjacent(coords) && edges_match(tile, coords));
    }

    function tiles_adjacent(coords) {
      // Check the surrounds list for at least one element that's a Tile. The
      // SOME method takes a function with three arguments, the element, the
      // index and the array.
      return adj.some(function (e, i, a) {
        return (e instanceof Carcaclone.Tile);
      });
    }

    function edges_match(tile, coords) {
      var i, j, old_edge, new_edge;

      for (i = 4; i--;) {
        // The loop index will give us the correct edge on the new tile, but we
        // need to index the opposite edge for the old tile.
        j = (i + 2) % 4;

        // If we don't find an EDGES property where we expect it, we're looking
        // at an empty space. While an empty space doesn't technically match an
        // edge, we'd like to return TRUE when we find one. Therefore, in the
        // case of an empty space, we'll give OLD_EDGE the same value that we're
        // about to give NEW_EDGE.
        console.log('board: adj_tiles[' + i + ']', adj[i]);
        old_edge = (
          (adj[i] && adj[i].edges && adj[i].edges[j]) ||
          tile.edges[i]
        );

        new_edge = tile.edges[i];
        if ( old_edge !== new_edge ) {
          return false;
        }
      }

      return true;

    }

    if (valid_placement(tile, coords)) {
      this.tiles[coords.x + 20][coords.y + 20] = tile;
      return true;
    } else {
      return false;
    }
  };

  Board.prototype.get_tile = function (coords) {
    return this.tiles[coords.x + 20][coords.y + 20];
  };

  Board.prototype.cant_accommodate = function(tile) {
    // TODO return true if tile can't be placed
    return false;
  };

  Board.prototype.get_placement = function(tile, callback) {
    // TODO show where tile can be placed
    console.log('showing placement options');

    // TODO add event listeners to placement options
    console.log('wait for valid click');
    console.log('tile placed');

    // TODO follower placement
    console.log('follower placed (or not placed)');

    callback();
  };

  // private

  // When we need to look at everything around a space on the board, we need to
  // add these offsets to the coordinates of the space.
  var cartesian_offsets = [
    { x:  0,  y: -1 },
    { x:  1,  y: 0  },
    { x:  0,  y: 1  },
    { x: -1,  y: 0  }
  ];

  var start_tile = {
    edges: ["r", "c", "r", "f"],
    fields: [1, 2, 2, 1]
  };

  function generateBoard () {
    var tiles = [];
    for (var i = 40; i--;) {
      tiles[i] = [];
      for (var j = 40; j--;) {
        tiles[i][j] = {};
      }
    }

    // As of 2014-01-06, have to add the first tile here in the constructor,
    // otherwise, any attempt to add a tile will fail, because the first
    // criterion for placing a tile is that it is adjacent to another tile.
    tiles[20][20] = new Carcaclone.Tile(start_tile);
    return tiles;
  }

  // attach

  Carcaclone.Board = Board;

})();
