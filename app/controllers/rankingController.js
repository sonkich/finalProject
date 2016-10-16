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
               $scope.myData = convertToInt(response.data);
           }, function errorCallback(response) {
            console.log("ERROR");
          console.log(response.data);
         });
   }

   function convertToInt(array) {
      for(obj in array){
         array[obj].cloth_lvl = parseInt(array[obj].cloth_lvl);
         array[obj].diamonds = parseInt(array[obj].diamonds);
         array[obj].drink_q = parseInt(array[obj].drink_q);
         array[obj].food_lvl = parseInt(array[obj].food_lvl);
         array[obj].food_q = parseInt(array[obj].food_q);
         array[obj].id = parseInt(array[obj].id);
         array[obj].points = parseInt(array[obj].points);
         array[obj].toys_q = parseInt(array[obj].toys_q);
      }

      return array;
   }
});
