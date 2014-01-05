// Carcaclone v0.0.1

(function(window){

// shared functions

function shuffle(array) {
	// Found this super concise shuffle function at
	// http://flippinawesome.org/2013/12/23/45-useful-javascript-tips-tricks-and-best-practices/
	// It uses the sort method to randomly swap or not swap elements as it
	// traverses the array.
	array.sort(function(){ return Math.random() - 0.5});
  return array;
}

// shared variables

var available_tiles = [
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

var start_tile = {
  edges: ["r", "c", "r", "f"],
  fields: [1, 2, 2, 1]
};

//=================================== The Game ================================

function Game (players) {
  this.stack = new Stack(); // An array of tiles to be placed
  this.map = new Map(); // A 2D array of placed tiles
  this.players = players; // An ordered list of names
  this.turn; // A name, or an index into the PLAYERS list
  this.score; // A set of name-score pairs

  // test that first tile is always the same, second is random
  $('#stack').append('<p>first tile: ' + JSON.stringify(this.stack.draw()) + '</p>');
  $('#stack').append('<p>second tile: ' + JSON.stringify(this.stack.draw()) + '</p>');
}

//=================================== The Stack ===============================
// Has a stack of tiles that it shuffles on creation.
// First tile is always the same (start tile).
// Has a draw() method that returns the next tile until it's empty.

function Stack () {

  this.tiles = [];

  var count, tile_type;
  var i = available_tiles.length - 1;

  for (i; i > 0; i--) {
    tile_type = available_tiles[i];
    count = tile_type.count;

    while (count--) {
      this.tiles.push(new Tile(tile_type.options));
    }
  }

  // shuffle tiles
  this.tiles = shuffle(this.tiles);

  // add start tile to end of stack so it will be drawn first
  this.tiles.push(new Tile(start_tile));

  this.draw = function() {
    // return false if out of tiles
    if (!this.tiles.length) {
      return false;
    }

    // otherwise pop a tile off the end of the stack
    return this.tiles.pop();
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

//============================ The Map =========================================

// My last attempt lacked a clear data structure to manage the tiles on the map,// and only implemented a GET_TILE method. In this proposal, we'll initialize an
// array of arrays so that we can freely address spaces by integer math.

// The rules dictate that the map is built from the start tile out in all
// directions. This suggests that we use a Cartesian coordinate system with the
// start tile at the origin. The simplest way to account for this is to add an
// offset

function Map() {

  // ====================== Module-level values

  // When we need to look at everything around a space on the map, we need to
	// add these offsets to the coordinates of the space.
	this.cartesian_offsets = [
		{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}
	];
			
	// Given a space on the map, return the contents of the adjacent spaces as an
	// array of tiles.
	this.list_surroundings = function (coords) {
		var surroundings = [];
		var new_coords, i;

		for (i = 4; i--; ) {
			new_coords = {
				x: coords.x + this.cartesian_offsets[i].x,
				y: coords.y + this.cartesian_offsets[i].y
			};
			surroundings.push(this.get_tile(new_coords));
		}

		return surroundings;
	}
	
	// Set up an array of arrays that we will place tiles into. Even if the
	// players build very far in one direction, a board with 40 columns should
	// suffice.
	this.tiles = (function () {
		var temp = [];
		for (var i = 40; i--; ) {
			temp[i] = [];
		}
		return temp;
	}());

	return this;

}

Map.prototype.add_tile = function (tile, coords) {

	var surroundings = this.list_surroundings(coords);

	function valid_placement(tile, coords) {
		return (tiles_adjacent(coords) && edges_match(tile, coords));
	}

	function tiles_adjacent(coords) {
		// Check the surrounds list for at least one element that's a Tile. The
		// SOME method takes a function with three arguments, the element, the
		// index and the array.
		return surroundings.some(function (e, i, a) {
			return (e instanceof Tile);
		});
	}

	function edges_match(tile, coords) {
		// Since we used PUSH to build the surroundings array, the tiles it
		// contains are in counterclockwise order. Reverse the array to resolve the
		// discrepancy. 
		var adj_tiles = surroundings.reverse();

		var i, j, old_edge, new_edge;

		for (i = 4; i--; ) {
			// The loop index will give us the correct edge on the new tile, but we
			// need to index the opposite edge for the old tile.
			j = (i + 2) % 4;

			// If we don't find an EDGES property where we expect it, we're looking
			// at an empty space. While an empty space doesn't technically match an
			// edge, we'd like to return TRUE when we find one. Therefore, in the
			// case of an empty space, we'll give OLD_EDGE the same value that we're
			// about to give NEW_EDGE.
			old_edge = adj_tiles[i].edges[j] || tile.edges[i];

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

}

Map.prototype.get_tile = function (coords) {
	return this.tiles[coords.x + 20][coords.y + 20];
}
//=============================== Followers ==================================

// Follower of a certain type
// types: farmer, thief, knight, monk
function Follower (type, owner) {
  this.type = type;
  this.owner = owner;
}

window.Carcaclone = Game;

})(window);
