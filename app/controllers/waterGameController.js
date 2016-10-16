myApp.controller("waterGameController",function($scope,$rootScope,homeSvc){

   var waterList = [

      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "drop",
         url : "./assets/img/game2/drop.png",
         visible : false ,
         points : 1
      },
      {
         name : "water",
         url : "./assets/img/game2/water.png",
         visible : false ,
         points : 10
      },
      {
         name : "water",
         url : "./assets/img/game2/water.png",
         visible : false ,
         points : 10
      },
      {
         name : "water",
         url : "./assets/img/game2/water.png",
         visible : false ,
         points : 10
      },
      {
         name : "water",
         url : "./assets/img/game2/water.png",
         visible : false ,
         points : 10
      },
      {
         name : "water",
         url : "./assets/img/game2/water.png",
         visible : false ,
         points : 10
      },
      {
         name : "water",
         url : "./assets/img/game2/water.png",
         visible : false ,
         points : 10
      },
      {
         name : "water",
         url : "./assets/img/game2/water.png",
         visible : false ,
         points : 10
      },
      {
         name : "water",
         url : "./assets/img/game2/water.png",
         visible : false ,
         points : 10
      },
      {
         name : "water",
         url : "./assets/img/game2/water.png",
         visible : false ,
         points : 10
      },
      {
         name : "water",
         url : "./assets/img/game2/water.png",
         visible : false ,
         points : 10
      },
      {
         name : "max-water",
         url : "./assets/img/game2/max-water.png",
         visible : false ,
         points : 50
      },
      {
         name : "max-water",
         url : "./assets/img/game2/max-water.png",
         visible : false ,
         points : 50
      }
   ];

   $scope.points = 0;
   $scope.bullets = 10;
   $scope.waterList = shuffle(waterList);
   $scope.diamonds = 0;
   $scope.water = 0;

   $scope.reset = function(){
      for(water in waterList){
         waterList[water].visible = false;
      }

      $scope.points = 0;
      $scope.bullets = 10;
      $scope.waterList = shuffle(waterList);
      $scope.diamonds = 0;
      $scope.water = 0;
   }

   $scope.turnVisible = function(index){
      if($scope.bullets > 1){

         $scope.bullets -= 1;
         $scope.points += $scope.waterList[index].points;
         $scope.waterList[index].visible = true;
      }else if($scope.bullets == 1){
         $scope.bullets -= 1;
         $scope.points += $scope.waterList[index].points;
         $scope.waterList[index].visible = true;

         calcProfit();

         // end game give points here
      }
   }

   function calcProfit (){

      if($scope.points < 50){
         $scope.water = 1;
      }else if($scope.points >= 50 && $scope.points < 100){
         $scope.water = 2;
         $scope.diamonds = 1;
      }else if($scope.points >= 100 && $scope.points < 150){
         $scope.water = 3;
         $scope.diamonds = 2;
      }else {
         $scope.water = 5;
         $scope.diamonds = 5;
      }

      $rootScope.player.drink_q = parseInt($rootScope.player.drink_q) + $scope.water;
      $rootScope.player.diamonds = parseInt($rootScope.player.diamonds) + $scope.diamonds;
      homeSvc.setData($rootScope.baby, $rootScope.player);
   }
});

function shuffle(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
