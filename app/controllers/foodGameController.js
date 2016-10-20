myApp.controller('foodGameController',function($scope,$location,$rootScope, homeSvc, $timeout) {
	$scope.alerts = {};
	$scope.alerts.gameover = false;
	$scope.alerts.success = false;


	var list = [
    {
	   name : "salad",
	   url : "assets/img/game3/lettuce.png",
	   visible : false

	},
	{
		name : "salad",
		url : "assets/img/game3/tomato.png",
		visible : false

	},
	{
		name : "salad",
		url : "assets/img/game3/mushroom.png",
		visible : false

	},
	{
		name : "soupe",
		url : "assets/img/game3/chicken.png",
		visible : false

	},
	{
		name : "soupe",
		url : "assets/img/game3/carrot1.png",
		visible : false

	},
	{
		name : "soupe",
		url : "assets/img/game3/onion.png",
		visible : false

	},
	{
		name : "cake",
		url : "assets/img/game3/flour.png",
		visible : false

	},
	{
		name : "cake",
		url : "assets/img/game3/egg.png",
		visible : false

	},
	{
		name : "cake",
		url : "assets/img/game3/strawberry.png",
		visible : false

	}
	             ];
	var currentFood;
	$scope.foods = [];
	$scope.trys = 15;

	$scope.ingr1 = '';
	$scope.ingr2 = '';
	$scope.ingr3 = '';

	$scope.ch1 = false;
	$scope.ch2 = false;
	$scope.ch3 = false;

	$scope.ready1 = false;
	$scope.ready2 = false;
	$scope.ready3 = false;

	$scope.loadIngredients = function(item) {
		$scope.ch1 = false;
		$scope.ch2 = false;
		$scope.ch3 = false;
		if (item.currentTarget.getAttribute("id") == 'food1') {
			currentFood = 1;
			foodLoad ();
		} else if (item.currentTarget.getAttribute("id") == 'food2') {
			currentFood = 2;
			foodLoad ();
		} else {
			currentFood = 3;
			foodLoad ();
		}
	}

	$scope.turnVisible = function (index) {
		if ($scope.trys > 0) {
			$scope.trys--;
			$scope.foods[index].visible = true;
			if ($scope.foods[index].url != $scope.ingr1 && $scope.foods[index].url != $scope.ingr2 &&
					$scope.foods[index].url != $scope.ingr3) {
				$timeout(function(){
					$scope.foods[index].visible = false;
	             },500);
			} else if ($scope.foods[index].url == $scope.ingr1) {
				$scope.ch1 = true;
			} else if ($scope.foods[index].url == $scope.ingr2) {
				$scope.ch2 = true;
			} else {
				$scope.ch3 = true;
			}
			if ($scope.ch1 == true && $scope.ch2 == true && $scope.ch3 == true) {
				if (currentFood == 1) {
					$scope.ready1 = true;
					$rootScope.player.diamonds = parseInt($rootScope.player.diamonds) + 1;
					$rootScope.player.food_q = parseInt($rootScope.player.food_q) + 1;
					homeSvc.setData($rootScope.baby, $rootScope.player);
				} else if (currentFood == 2) {
					$scope.ready2 = true;
					$rootScope.player.diamonds = parseInt($rootScope.player.diamonds) + 1;
					$rootScope.player.food_q = parseInt($rootScope.player.food_q) + 1;
					homeSvc.setData($rootScope.baby, $rootScope.player);
				} else if (currentFood == 3) {
					$scope.ready3 = true;
					$rootScope.player.diamonds = parseInt($rootScope.player.diamonds) + 1;
					$rootScope.player.food_q = parseInt($rootScope.player.food_q) + 1;
					homeSvc.setData($rootScope.baby, $rootScope.player);
				}
				if ($scope.ready1 == true && $scope.ready2 == true && $scope.ready3 == true) {
					$scope.alerts.success = true;
				}
			}
		} else {
			$scope.alerts.gameover = true;
		}
	}

	$scope.resetData = function() {
		currentFood = '';

		$scope.foods = [];
		$scope.trys = 15;

		$scope.ingr1 = '';
		$scope.ingr2 = '';
		$scope.ingr3 = '';

		$scope.ch1 = false;
		$scope.ch2 = false;
		$scope.ch3 = false;

		$scope.ready1 = false;
		$scope.ready2 = false;
		$scope.ready3 = false;
	}

	function shuffle(list) {
		var array = JSON.parse( JSON.stringify(list) );
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

	function foodLoad () {
		if (currentFood == 1) {
			$scope.ingr1 = list[0].url;
			$scope.ingr2 = list[1].url;
			$scope.ingr3 = list[2].url;
		} else if (currentFood == 2) {
			$scope.ingr1 = list[3].url;
			$scope.ingr2 = list[4].url;
			$scope.ingr3 = list[5].url;
		} else if (currentFood == 3) {
			$scope.ingr1 = list[6].url;
			$scope.ingr2 = list[7].url;
			$scope.ingr3 = list[8].url;
		}
		$scope.foods = shuffle(list);
	}
});
