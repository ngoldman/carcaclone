// Carcaclone v0.0.1

(function(window){

//=================================== The Game ================================

// Lord of all you see before you
// One day this shall all belong to you
// We must keep the law of this land, for we its guardians and shepherds

function Game (players) {
  this.stack = new Stack(); // An array of tiles to be placed
  this.map = new Map(); // A 2D array of placed tiles
  this.players = players; // An ordered list of names
  this.turn; // A name
  this.score; // A set of name-score pairs

  console.log('hello!', this);
}

//=================================== The Stack ===============================

function Stack () {

  function rand() {
    return Math.floor(Math.random() * 24);
  }

  var available_tiles;

  available_tiles = [
    {
      count: 2,
      options: {
        edges: ["f", "f", "r", "f"],
        fields: ["m", "m", "m", "m"]
      }
    },
    {
      count: 4,
      options: {
        edges: ["f", "f", "f", "f"],
        fields: ["m", "m", "m", "m"]
      }
    },
    {
      count: 1,
      options: {
        edges: ["c", "c", "c", "c"],
        fields: ["c", "c", "c", "c"],
        pennant: true
      }
    },
    {
      // The manual tells us that there are 4 of these tiles,
      // but 1 of them is the Start tile, so we can only
      // allow players to draw the remaining 3.
      count: 3,
      options: {
        edges: ["r", "c", "r", "f"],
        fields: [1, 2, 2, 1]
      }
    },
    {
      count: 5,
      options: {
        edges: ["c", "f", "f", "f"],
        fields: [1, 1, 1, 1]
      }
    },
    {
      count: 2,
      options: {
        edges: ["f", "c", "f", "c"],
        fields: ["c", "c", "c", "c"],
        pennant: true
      }
    }
    // TODO: add tiles G through X
  ];

  this.draw = function() {

    var tile;

    do {
      tile = available_tiles[rand()];
    } while (tile.count = 0);

    available_tiles[i].count -= 1;
    return (new Tile(tile.options));
  };
}

//=========================== Tiles ===========================================

// A tile is divided into 8 sections:
//
//   ___________
//  |\  edge_t /|
//  |e\_______/e|
//  |d |  |  | d|
//  |g |f1|f2| g|
//  |e |--+--| e|
//  |_ |f3|f4| _|
//  |l |__|__| r|
//  | / edge_b\ |
//  |/_________\|

// The edges allow us to determine which tiles fit together. They may be one of
// field, city or road. The central 4 tiles provide additional information
// about exactly where followers have been placed. Field sections may take the
// following values: monastery, city, 1, 2, 3, 4. The numeric values indicate
// which central squares are part of which field.

function Tile (options) {
  // options = {
  //   edges: [top, right, bot, left],
  //   fields: [nw, ne, se, sw],
  //   pennant: ..., // boolean
  //   follower: ... // designation for a tile section
  // }
  this.edges = options.edges;
  this.fields = options.fields;
  this.pennant = options.pennant || false;
  this.follower = options.follower || false;
}

Tile.prototype.rotate = function () {

  var new_edges, new_fields, i, j;

  for (i = 4; i--; ) {
    j = (i + 1) % 4;
    new_edges[i] = this.edges[j];
    new_fields[i] = this.fields[j];
  }

  this.edges = new_edges;
  this.fields = new_fields;
};

//============================ The Map ========================================

// The game starts with just the Start Tile on the map. Each turn, a player
// will add a tile to the map whose edges match with the edges of any adjacent
// tiles that are already part of the map.

// The map can also answer questions for us about features that extend across
// multiple tiles. These features are roads, fields, cities and monasteries. We
// will ask these questions when we update the score at the end of each turn
// and at the very end of game.

function Map () {
  var start_tile;

  var check_surrounding = (function() {

    var x_offsets = [0, 1, 0, -1];
    var y_offsets = [-1, 0, 1, 0];

    return (function (coords, prop) {
      var i, x, y, result;

      result = true;

      for (i = 4; i--; ) {
        x = coords.x + x_offsets[i];
        y = coords.y + y_offsets[i];
        if (!prop(x, y)) {
          result = false;
          break;
        }
      }

      return result;

    }());

  });

  start_tile = new Tile ({
    edges: ["c", "r", "f", "r"],
    fields: [1, 1, 2, 2]
  });

  this.tiles[0][0] = start_tile;

  this.get_tile = function (x, y) {
    return this.tiles[x][y];
  };
}

Map.prototype.add_tile = function (tile, x, y) {

  // Tiles must be added to the map adjacent to at least one existing
  // tile.
  check_surrounding({x: x, y: y}, function (x, y) {});
};

//=============================== Followers ==================================

// Follower of a certain type
// types: farmer, thief, knight, monk
function Follower (type, owner) {
  this.type = type;
  this.owner = owner;
}

// In order to place a new tile, its edges must match with the
// existing adjacent edges.

function is_valid_placement(new_tile, coords) {

  var i, x, y, test_edge;
  var valid_so_far = true;

  // Does each edge match with the tiles already on the board?
  for (i = 4; i -= 1; ) {
    x = coords.x + x_offsets[i];
    y = coords.y + y_offsets[i];
    test_edge = board.get_tile(x, y).edge[i];
    if (new_tile.edge[i] != test_edge) {
      valid_so_far = false;
    }
  }

  return valid_so_far;
}

window.Carcaclone = Game;

})(window);
