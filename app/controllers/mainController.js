myApp.controller('mainController',function($scope,$location,$rootScope,loggedUserSvc){

	$scope.parent = localStorage.getItem("username");

	$scope.logout = function() {
	 	localStorage.removeItem("username");
		loggedUserSvc.clearInfo();
	}
})
.filter('startFrom',function(){
	return function(data,start){
		return data.slice(start);
	}
})
;
