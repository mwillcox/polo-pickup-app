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



