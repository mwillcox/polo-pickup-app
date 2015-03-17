var pickupApp = angular.module('pickupApp', [
	'firebase',
	'ui.router'
	]);

pickupApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');
	$stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
        url: '/home',
        templateUrl: 'home.html'
    })
    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('setup', {
        url: '/setup',
        templateUrl: 'setup.html',
        controller: 'SetupCtrl'    
    })
    .state('games', {
        url: '/games',
        templateUrl: 'games.html',  
        controller: 'GamesCtrl'    
    });
});

pickupApp.factory("players", ["$firebaseArray",
  function($firebaseArray) {
    var ref = new Firebase('https://popping-inferno-9074.firebaseio.com/players');
    return $firebaseArray(ref);
  }
]);

pickupApp.factory("games", ["$firebaseArray",
  function($firebaseArray) {
    var ref = new Firebase('https://popping-inferno-9074.firebaseio.com/games');
    return $firebaseArray(ref);
  }
]);

pickupApp.factory("teams", ["$firebaseArray",
  function($firebaseArray) {
    var ref = new Firebase('https://popping-inferno-9074.firebaseio.com/teams');
    return $firebaseArray(ref);
  }
]);

pickupApp.controller("SetupCtrl", ["$scope", "players",
  function($scope, players) {

    $scope.players = players;

    $scope.addPlayer = function() {
      $scope.players.$add({
        name: $scope.playerName,
        gameCount: 0
      });

      $scope.playerName = "";
    };
  }
]);

pickupApp.controller("GamesCtrl", ["$scope", "players", "games", "teams",
	function($scope, players, games, teams){
		$scope.players = players;
		$scope.games = games;
		$scope.teams = teams;
		$scope.isNewGame = true;

		var game = {};

		$scope.startGames = function(){
			$scope.isNewGame = false;
			//TODO:verify there are 6 players
			splitTeams($scope.players,2);
			$scope.games.$add({
				status: 1,
				teamA: game.team1,
				teamB: game.team2,
				goalsTeamA: 0,
				goalsTeamB: 0
			});
		}

		function splitTeams(names, teams_count) {
		    var teams = [];
		    var copyNames = names.slice(0)
		    while (teams_count > 0) {
			    teams.push(copyNames.splice(0, Math.floor(names.length/teams_count)))
			    teams_count--;
		    }
		    game.team1 = teams[0];
		    game.team2 = teams[1];
		}
	}
]);



