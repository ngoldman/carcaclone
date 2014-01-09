(function(){

  // public

  function Player(options) {
    this.name = options.name;

    // Start the game without any points
    this.score = 0;

    // Start the game with 7 followers to be placed
    this.followers = 7;
  }

  Player.prototype.add_to_score = function (points) {
    this.score += points;
    return true;
  };

  // attach

  Carcaclone.Player = Player;

})();
