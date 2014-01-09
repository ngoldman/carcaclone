(function(){

  //=================================== The Game ================================

  function Game (options) {
    // setup basics
    this.stack = new Carcaclone.Stack(); // An array of tiles to be placed
    this.board = new Carcaclone.Board(); // A 2D array of placed tiles
    this.players = generatePlayers(options.players);

    console.log('new game created!', this);

    // setup turn
    this.turn = 0;
    this.nextTurn();

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
        current_tile = this.stack.draw();
        continue;
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

  Game.prototype.nextTurn = function() {
    if (!this.stack.has_tiles()) {
      return this.over();
    }

    var current_tile, placement;
    var player_count = this.players.length;
    var current_player = this.players[this.turn];
    var current_tile = this.stack.draw();

    console.log('current_player', current_player);
    console.log('current_tile', current_tile);

    // "In the rare case that a tile cannot be placed anywhere,
    // it is removed from the game, and the player draws another."
    if (this.board.cant_accommodate(current_tile)) {
      console.log('skipping tile');
      return this.nextTurn();
    }

    var self = this;

    this.board.get_placement(current_tile, function(){
      // cycle turn pointer and go to next turn once placement is done
      self.turn = (self.turn + 1) % player_count;
      self.nextTurn();
    });
  };

  Game.prototype.over = function() {
    console.log('game over, man, game over!');
  };

  // private

  function generatePlayers (names) {
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