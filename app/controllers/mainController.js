myApp.controller('mainController',function($scope,$location,$rootScope,loggedUserSvc){

	$scope.parent = localStorage.getItem("username");

	$scope.logout = function() {
	 	localStorage.removeItem("username");
		$scope.parent = {};
		$rootScope.hasBaby = {};
		$rootScope.user = {};
		$rootScope.logged = 0;

		$location.path('/login');

	}
})
.filter('startFrom',function(){
	return function(data,start){
		return data.slice(start);
	}
})
;
