(function(){

  //=================================== The Stack ===============================
  // Has a stack of tiles that it shuffles on creation.
  // First tile is always the same (start tile).
  // Has a draw() method that returns the next tile until it's empty.

  function Stack () {
    this.tiles = generateStack();
  }

  Stack.prototype.draw = function() {
    // return false if out of tiles
    if (!this.tiles.length) {
      return false;
    }

    // otherwise pop a tile off the end of the stack
    return this.tiles.pop();
  };

  Stack.prototype.has_tiles = function() {
    return (this.tiles.length > 0);
  };

  // private

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

  function generateStack () {
    var tiles = [];
    var i = available_tiles.length - 1;

    // add all tiles
    for (i; i--;) {
      var tile_type = available_tiles[i];
      var count = tile_type.count;

      while (count--) {
        tiles.push(new Carcaclone.Tile(tile_type.options));
      }
    }

    // shuffle tiles
    return shuffle(tiles);
  }

  function shuffle (array) {
    // Found this super concise shuffle function at
    // http://flippinawesome.org/2013/12/23/45-useful-javascript-tips-tricks-and-best-practices/
    // It uses the sort method to randomly swap or not swap elements as it
    // traverses the array.
    array.sort(function(){ return Math.random() - 0.5; });
    return array;
  }

  // attach to global

  Carcaclone.Stack = Stack;

})();
