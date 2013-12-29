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
    var tiles = [ // List of all possible tiles
                ],
        random_seed = (function () {
            var deck = new Array(71),
                i;
            for (i = 71; i--;) {
                deck[i] = i;
            }
            for (i = 1000; i--;) {
                //redacted
                deck
            }
            // Randomly swap members of the array to shuffle deck
            // Return the shuffled deck
        }()),
        current_card = 0;

    this.draw = function() {
        // if there are tiles left
            // return the next one in the deck
        // else
            // error
    }
}

Stack.prototype.draw = function() {
    if (this.current_card < 72) {
        var tile = tiles[this.random_seed[this.current_card]]
        this.current_card++;
        return tile
    } else {
        you_done_fucked_up();
    }
};

//=========================== Tiles ===========================================

// Tile containing land type data and governing placement of followers
// Constructor should be dumb and just accept assignments from the stack
// It doesn't need to be strict since it will only be manipulated internally
// takes options param that is an object defining edges
// options = {
//   edges: [top,right,bottom,left], // (required) clockwise array of land types
//   follower: (Follower object) // (optional) defaults to false
//   monastery: true // (optional) defaults to false
// }

function Tile (options) {
    this.edges = options.edges;
    this.follower = options.follower || false;
    this.monastery = options.monastery || false;
}

Tile.prototype.rotate = function () {
    // Shift the tile's edges array
}

// These are the edges:
// Field only
// City only
// Field with road

Tile.prototype.addFollower = function (follower) {
    this.followers.push(follower);
}

//============================ The Map ========================================

// Map containing tiles and governing placement rules
function Map () {
    this.tiles = [];
}

// Follower of a certain type
// types: farmer,
function Follower (type, owner) {
    this.type = type;
    this.owner = owner;
}

// In order to place a new tile, its edges must match with the
// existing adjacent edges.

function is_valid_placement(new_tile, coords) {

    var valid_so_far = true,

        // Coordinates of adjacent tiles. Top, right, bottom, left.
        // Not the tiles themselves, but where to find them.
        //x_offsets t = [0, 1, 0, -1], // so how does this represent adjacent tiles?
        y_offsets = [-1, 0, 1, 0],
        i, x, y, test_edge;

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

// allow me *ahem* expose myself
window.Carcaclone = Game;

})(window);
