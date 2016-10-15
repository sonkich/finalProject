myApp.controller('storeController',function($scope,$location,$rootScope, homeSvc){
	var food = ['assets/img/food_lvl/f_01.png', 'assets/img/food_lvl/f_02.png', 'assets/img/food_lvl/f_03.png',
	            'assets/img/food_lvl/f_04.png', 'assets/img/food_lvl/f_05.png', 'assets/img/food_lvl/f_06.png',
	            'assets/img/food_lvl/f_07.png', 'assets/img/food_lvl/f_08.png', 'assets/img/food_lvl/f_09.png',
	            'assets/img/food_lvl/f_10.png', 'assets/img/food_lvl/f_11.png', 'assets/img/food_lvl/f_12.png',
	            'assets/img/food_lvl/f_13.png', 'assets/img/food_lvl/f_14.png', 'assets/img/food_lvl/f_15.png'];
	var clothes = ['assets/img/cloth_lvl/cl_01.png', 'assets/img/cloth_lvl/cl_02.png', 'assets/img/cloth_lvl/cl_03.png',
	            'assets/img/cloth_lvl/cl_04.png', 'assets/img/cloth_lvl/cl_05.png', 'assets/img/cloth_lvl/cl_06.png',
	            'assets/img/cloth_lvl/cl_07.png', 'assets/img/cloth_lvl/cl_08.png', 'assets/img/cloth_lvl/cl_09.png',
	            'assets/img/cloth_lvl/cl_10.png', 'assets/img/cloth_lvl/cl_11.png', 'assets/img/cloth_lvl/cl_12.png',
	            'assets/img/cloth_lvl/cl_13.png', 'assets/img/cloth_lvl/cl_14.png', 'assets/img/cloth_lvl/cl_15.png'];
	
	$scope.errorF = '';
	$scope.errorC = '';
	
	$scope.nextF = parseInt($rootScope.player.food_lvl) + 1;
	$scope.nextC = parseInt($rootScope.player.cloth_lvl) + 1;
	
	$scope.food_c = food[$rootScope.player.food_lvl];
	$scope.food_n = food[parseInt($rootScope.player.food_lvl) + 1] != 'undefined' ? 
			food[parseInt($rootScope.player.food_lvl) + 1] : $scope.food_c;
	
	$scope.clothes_c = clothes[$rootScope.player.cloth_lvl];
	$scope.clothes_n = clothes[parseInt($rootScope.player.cloth_lvl) + 1] != 'undefined' ? 
			clothes[parseInt($rootScope.player.cloth_lvl) + 1] : $scope.clothes_c;
	
	$scope.buy = function(item) {
		if ($rootScope.player.diamonds >= 50) {
			$rootScope.player.diamonds = parseInt($rootScope.player.diamonds) - 50;
			if (item.currentTarget.getAttribute("id") == 'buyFood') {
				$rootScope.player.food_lvl = parseInt($rootScope.player.food_lvl) + 1;
				$scope.food_c = food[$rootScope.player.food_lvl];
				$scope.food_n = food[parseInt($rootScope.player.food_lvl) + 1] != 'undefined' ? 
						food[parseInt($rootScope.player.food_lvl) + 1] : $scope.food_c;
			} else {
				$rootScope.player.cloth_lvl = parseInt($rootScope.player.cloth_lvl) + 1;
				$scope.clothes_c = clothes[$rootScope.player.cloth_lvl];
				$scope.clothes_n = clothes[parseInt($rootScope.player.cloth_lvl) + 1] != 'undefined' ? 
						clothes[parseInt($rootScope.player.cloth_lvl) + 1] : $scope.clothes_c;
			}
			homeSvc.setData($rootScope.baby, $rootScope.player);
		} else {
			if (item.currentTarget.getAttribute("id") == 'buyFood') {
				$scope.errorF = '* Not enough diamonds';
			} else {
				$scope.errorC = '* Not enough diamonds';
			}
		}
	}
	
	$scope.close = function() {
		var user = localStorage.getItem("username");
		$location.path('/users/' + user);
	}
});