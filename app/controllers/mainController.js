myApp.controller('mainController',function($scope){
	$scope.parent = localStorage.getItem("username");
})
.filter('startFrom',function(){
	return function(data,start){
		return data.slice(start);
	}
})
;
