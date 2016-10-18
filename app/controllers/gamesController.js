myApp.controller("gamesController",function($scope,$location){
   $scope.playForFood = function(){
      $location.path('/games/foodGame');
   }
   $scope.playForWater = function(){
      $location.path('/games/waterGame');
   }
   $scope.playForToys = function(){
      $location.path('/games/toyGame');
   }
});
