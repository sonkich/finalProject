myApp.controller("rankingController",function($scope,$http,$httpParamSerializerJQLike,loggedUserSvc){
   $scope.myData = [];
   $scope.itemsByPage=15;
   getData();



   function getData(){


      $http({
           method: 'GET',
           url: './server/getAllUserStats.php',
           headers: {'Content-Type': 'application/x-www-form-urlencoded'},


         }).then(function successCallback(response) {
               $scope.myData = response.data;
           }, function errorCallback(response) {
            console.log("ERROR");
          console.log(response.data);
         });
   }
});
