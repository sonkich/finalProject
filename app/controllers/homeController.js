myApp.controller("homeController",function($scope, $rootScope,  $route, $routeParams, homeSvc){
	$rootScope.hasBaby = 1;
	$rootScope.user = 'sisi';
	$rootScope.logged = 1;
	
	$scope.error = '';
	$scope.babyName = '';
	$rootScope.baby = {};
	$rootScope.player = {};
	
	function loadGame() {
		if ($rootScope.logged == 0) {
			//window.open('index.html', '_self');
		} else {
			if ($rootScope.hasBaby == -1) {
				$scope.show = 1;
			} else {
				$scope.show = 2;
				var user = {
						'username': $rootScope.user
				}
				
				var parent = {
						'username': $routeParams.user
				}
				homeSvc.getPlayer(user).then( function(result) {
					$rootScope.player = result;
					console.log(result);
					homeSvc.getBaby(parent).then(function(result) {
						$rootScope.baby = result;
						console.log(result);
						if ($rootScope.baby.gender == 'm') {
							$scope.babyImage = './assets/img/boy1.png'
						} else {
							$scope.babyImage = './assets/img/girl1.png'
						}
					})
				})
				
			}
		}
	}
	loadGame();
	
	$scope.createBaby = function(item) {
		if ($scope.babyName == '') {
			$scope.error = '  * Enter name';
		} else {
			$scope.error = '';
			var gender = '';
			
			if (item.currentTarget.getAttribute("id") == 'boy') {
				gender = 'm';
			} else {
				gender = 'f';
			}
			$rootScope.baby = {
				'parent': $rootScope.user,
				'name': $scope.babyName,
				'gender': gender,
				'food': 0,
				'drink': 0,
				'happiness': 0,
				'is_alive': 1,
			}
			
			$rootScope.player = {
					'username': $rootScope.user,
					'diamonds': 0,
					'food_q': 10,
					'drink_q': 10,
					'toys_q': 10,
					'cloth_lvl': 1,
					'food_lvl': 1,
					'points': 0
			}
			
			if ($rootScope.hasBaby == -1) {
				homeSvc.saveNewData($scope.baby, $scope.player);
			} else {
				homeSvc.setData($scope.baby, $scope.player);
			}
			
			
			$rootScope.hasBaby = 1;
			$scope.show = 2;
		}
	}
	
	$scope.play = function(item) {
		if (item.currentTarget.getAttribute("id") == 'bottle') {
			if ($rootScope.player.drink_q > 0){
				if ($rootScope.baby.drink < 100) {
					$rootScope.baby.drink = parseInt($rootScope.baby.drink) + 5;
					$rootScope.player.drink_q -= 1;
				}
			}
		} else if(item.currentTarget.getAttribute("id") == 'jar') {
			if ($rootScope.player.food_q > 0){
				if ($rootScope.baby.food < 100) {
					$rootScope.baby.food = parseInt($rootScope.baby.food) + 5;
					$rootScope.player.food_q -= 1;
				}
			}
		} else {
			if ($rootScope.player.toys_q > 0){
				if ($rootScope.baby.happiness < 100) {
					$rootScope.baby.happiness = parseInt($rootScope.baby.happiness) + 5;
					$rootScope.player.toys_q -= 1;
				}
			}
		}
		$rootScope.player.points = parseInt($rootScope.player.points) + 1;
		homeSvc.setData($rootScope.baby, $rootScope.player);
	}
});