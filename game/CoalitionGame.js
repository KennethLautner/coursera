// Generated by CoffeeScript 1.6.3
(function() {
  var CoalitionGame, ScoreRule, linereader;

  linereader = require('line-reader');

  ScoreRule = (function() {
    function ScoreRule(players, value) {
      this.players = players;
      this.value = value;
    }

    ScoreRule.prototype.isCompatible = function(otherPlayers) {
      var i, _i, _ref;
      if (otherPlayers.length !== this.players.length) {
        return false;
      }
      for (i = _i = 0, _ref = this.players.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (this.players[i] !== '*' && ('' + this.players[i] !== '' + otherPlayers[i])) {
          return false;
        }
      }
      return true;
    };

    ScoreRule.prototype.toString = function() {
      return 'v(' + this.players + ') = ' + this.value;
    };

    return ScoreRule;

  })();

  CoalitionGame = (function() {
    function CoalitionGame(nb) {
      this.nb = nb;
      this.scores = [];
    }

    CoalitionGame.prototype.addScore = function(x) {
      var m;
      m = x.match(/([\d\*,]+)\s*=\s*(\d+.?\d*)/);
      if (m) {
        return this.scores.push(new ScoreRule(m[1].split(','), parseFloat(m[2])));
      }
    };

    CoalitionGame.prototype.findMatchingScore = function(players) {
      var sc, _i, _len, _ref;
      _ref = this.scores;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sc = _ref[_i];
        if (sc.isCompatible(players)) {
          return sc;
        }
      }
      return null;
    };

    CoalitionGame.prototype.getScore = function(players) {
      var matching;
      if (players.length === 0) {
        return 0;
      }
      players.sort();
      matching = this.findMatchingScore(players);
      if (matching !== null) {
        return matching.value;
      }
      console.log("WARN: cannot find a scoring for coalition set ", players);
      return 0;
    };

    CoalitionGame.prototype.printCoalition = function() {
      var sc, _i, _len, _ref, _results;
      console.log("Game with " + this.nb + " players");
      _ref = this.scores;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sc = _ref[_i];
        _results.push(console.log("\t" + sc.toString()));
      }
      return _results;
    };

    return CoalitionGame;

  })();

  module.exports = CoalitionGame;

}).call(this);
