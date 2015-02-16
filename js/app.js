var pickupApp = angular.module('pickupApp', ["firebase"]);

pickupApp.controller('PickupCtrl', function($scope, $firebase){
	var ref = new Firebase('https://popping-inferno-9074.firebaseio.com/');
	$scope.players = $firebase(ref).$asArray();
  
  	$scope.submitPlayer = function submitPlayer() {
    	$scope.players.$add({name: $scope.name});
    	$scope.name = " ";
    };
});


