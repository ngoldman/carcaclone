(function(){

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
    var new_edges = [],
        new_fields = [],
        i, j;

    for (i = 4; i--;) {
      j = (i + 1) % 4;
      new_edges[i] = this.edges[j];
      new_fields[i] = this.fields[j];
    }

    this.edges = new_edges;
    this.fields = new_fields;
  };

  Carcaclone.Tile = Tile;

})();
