myApp.controller("rankController",function($scope,$http,$location){


   $scope.data = [];
   getData();
   $scope.pageSize = 5;
   $scope.currentPage = 1;


   $scope.openProfil = function(index) {
      var string = '/users/' + $scope.data[index].username;
       $location.path(string);
   }
   function getData (){
      $http({
	  		  method: 'GET',
	  		  url: './server/rank.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},

	  		}).then(function successCallback(response) {
	  			   $scope.data = response.data;
	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		    console.log(response.data);
	  		});
   }
});
