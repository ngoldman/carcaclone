(function(){

  //=================================== The Game ================================

  function Game (options) {
    this.stack = new Carcaclone.Stack(); // An array of tiles to be placed
    this.board = new Carcaclone.Board(); // A 2D array of placed tiles
    this.players = getPlayers(options.players);

    console.log('new game created!', this);

    /*
    // not yet implemented

    var current_tile, placement;
    var player_count = this.players.length;
    var current_player;
    var turn = 0;

    while (this.stack.has_tiles()) {
      current_player = players[turn];
      current_tile = this.stack.draw();
      // TODO implement CANT_ACCOMODATE
      if (board.cant_accommodate(current_tile) {
        break;
      } else {
        // TODO implement SHOW_PLACEMENT_OPTIONS
        show_placement_options(map, current_tile);
        // TODO implement GET_PLACEMENT
        placement = current_player.get_placement()
        board.add_tile(current_tile, placement.coords);
        // TODO implement ADD_FOLLOWER
        board.add_follower(placement.coords, placement.feature);
        // TODO implement FEATURE_COMPLETED
        if (board.feature_completed(current_tile, placement)) {
          // TODO implement TURN_SCORE
          current_player.add_to_score(board.turn_score(current_tile, placement);
        }
      }
      turn = (turn + 1) % player_count;
    }

    for (turn = player_count; turn--; ) {
      current_player = players[turn];
      current_player.add_to_score(board.final_scoring(current_player.name));
    }
    */
  }

  // private

  function getPlayers (names) {
    var players = [];

    for (var i = names.length; i--;) {
      players.push(new Carcaclone.Player({
        name: names[i]
      }));
    }

    return players;
  }

  // attach to global scope

  window.Carcaclone = Game;

})();