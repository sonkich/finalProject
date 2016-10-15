myApp.controller("toyGameController",function($rootScope,$scope,$timeout,homeSvc){
   $scope.icons = shuffle(iconsList);

      var clicked = [];
      var count = 0;

      $scope.turnVisible = function (index){

         if(clicked.length === 0){
            $scope.icons[index].visible = true;
            clicked.push($scope.icons[index]);
         }else if(clicked.length === 1){
            $scope.icons[index].visible = true;
            clicked.push($scope.icons[index]);

            if(clicked[0].name == clicked[1].name){
               count += 2;
               clicked = [];
            } else {
               $timeout(function(){
                  clicked[0].visible = false;
                  clicked[1].visible = false;
                  clicked = [];
               },500);
            }

            if(count === $scope.icons.length){
               $rootScope.player.toys_q = parseInt($rootScope.player.toys_q) + 1;
               $rootScope.player.diamonds = parseInt($rootScope.player.diamonds) + 1;
               homeSvc.setData($rootScope.baby, $rootScope.player);

               alert("win")
            }


         }


         $scope.resetData = function(){
            for(icon in iconsList){
               iconsList[icon].visible = false;

            }

            clicked = [];
            count = 0;
            $scope.icons = shuffle(iconsList);
         }

      };







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

var iconsList = [

{
   name : "duck",
   url : "./assets/img/game1/duck.png",
   visible : false

},
{
   name : "chameleon",
   url : "./assets/img/game1/chameleon.png",
   visible : false
},
{
   name : "lion",
   url : "./assets/img/game1/lion.png",
   visible : false
},
{
   name : "monkey",
   url : "./assets/img/game1/monkey.png",
   visible : false
},
{
   name : "owl",
   url : "./assets/img/game1/owl.png",
   visible : false
},
{
   name : "penguin",
   url : "./assets/img/game1/penguin.png",
   visible : false
},
{
   name : "sloth",
   url : "./assets/img/game1/sloth.png",
   visible : false
},
{
   name : "squirrel",
   url : "./assets/img/game1/squirrel.png",
   visible : false
},
{
   name : "duck",
   url : "./assets/img/game1/duck.png",
   visible : false

},
{
   name : "chameleon",
   url : "./assets/img/game1/chameleon.png",
   visible : false
},
{
   name : "lion",
   url : "./assets/img/game1/lion.png",
   visible : false
},
{
   name : "monkey",
   url : "./assets/img/game1/monkey.png",
   visible : false
},
{
   name : "owl",
   url : "./assets/img/game1/owl.png",
   visible : false
},
{
   name : "penguin",
   url : "./assets/img/game1/penguin.png",
   visible : false
},
{
   name : "sloth",
   url : "./assets/img/game1/sloth.png",
   visible : false
},
{
   name : "squirrel",
   url : "./assets/img/game1/squirrel.png",
   visible : false
}

];
