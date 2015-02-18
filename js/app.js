var pickupApp = angular.module('pickupApp', [
	'firebase',
	'ngRoute'
	]);

pickupApp.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
			when('/home',
			{
				templateUrl: 'home.html'
			}).
			when('/setup', {
				templateUrl: 'setup.html',
				controller: 'SetupCtrl'
			}).
			when('/games', {
				templateUrl: 'games.html',
				controller: 'GamesCtrl'
			}).
			otherwise({
				redirectTo: '/home.html'
			});
	}]);

pickupApp.controller('SetupCtrl', function($scope, $firebase){
	var ref = new Firebase('https://popping-inferno-9074.firebaseio.com/');
	$scope.players = $firebase(ref).$asArray();
  
  	$scope.submitPlayer = function submitPlayer() {
    	$scope.players.$add({name: $scope.name});
    	$scope.name = " ";
    };
});

pickupApp.controller('GamesCtrl', function($scope, $firebase){
	var ref = new Firebase('https://popping-inferno-9074.firebaseio.com/');
	$scope.players = $firebase(ref).$asArray();
});


