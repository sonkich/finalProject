myApp.controller("homeController",function($scope, $rootScope,  $location, $route, $routeParams, homeSvc, $timeout){
	
	$scope.error = '';
	$scope.babyName = '';
	$rootScope.baby = {};
	$rootScope.player = {};
	$scope.playing = false;
	$scope.sound = './assets/img/sound_on.png';
	$scope.bottle = 0;
	var audio = new Audio();
	
	function loadGame() {
		if ($rootScope.logged == 0) {
			$location.path('/login');
		} else {
			if ($rootScope.hasBaby == -1) {
				$scope.show = 1;
				var user = {
						'username': localStorage.getItem("username")
				}
				homeSvc.getPlayer(user).then( function(result) {
					$rootScope.player = result;
				})
			} else {
				$scope.show = 2;
				var user = {
						'username': localStorage.getItem("username")
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
				$scope.babyImage = './assets/img/boy1.png'
			} else {
				gender = 'f';
				$scope.babyImage = './assets/img/girl1.png'
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
			
			if ($rootScope.hasBaby == -1) {
				homeSvc.saveNewBaby($rootScope.baby);
			} else {
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
				homeSvc.setData($rootScope.baby, $rootScope.player);
			}
			
			
			$rootScope.hasBaby = 1;
			$scope.show = 2;
		}
	}
	
	$scope.play = function(item) {
		if ($scope.playing == false) {
			$scope.playing = true;
			if (item.currentTarget.getAttribute("id") == 'bottle') {
				if ($rootScope.player.drink_q > 0){
					if ($rootScope.baby.drink < 100) {
						playAudio('./assets/sounds/eat.mp3');
						$rootScope.baby.drink = parseInt($rootScope.baby.drink) + 5;
						$rootScope.player.drink_q -= 1;
						if ($rootScope.baby.gender == 'm') {
							imageChange('./assets/img/boy_drink.png', './assets/img/boy1.png', 3000); 
						} else {
							imageChange('./assets/img/girl_drink.png', './assets/img/girl1.png', 3000);
							$scope.bottle = 1;
							$timeout(function() {
								$scope.bottle = 0;
							}, 3000);
						}
					}
				}
			} else if(item.currentTarget.getAttribute("id") == 'jar') {
				if ($rootScope.player.food_q > 0){
					if ($rootScope.baby.food < 100) {
						playAudio('./assets/sounds/eat.mp3');
						$rootScope.baby.food = parseInt($rootScope.baby.food) + 5;
						$rootScope.player.food_q -= 1;
						if ($rootScope.baby.gender == 'm') {
							imageChange('./assets/img/boy_eat.png', './assets/img/boy1.png', 3000); 
						} else {
							imageChange('./assets/img/girl_eat.png', './assets/img/girl1.png', 3000) 
						}
					}
				}
			} else {
				if ($rootScope.player.toys_q > 0){
					if ($rootScope.baby.happiness < 100) {
						playAudio('./assets/sounds/laugh.mp3');
						$rootScope.baby.happiness = parseInt($rootScope.baby.happiness) + 5;
						$rootScope.player.toys_q -= 1;
						if ($rootScope.baby.gender == 'm') {
							imageChange('./assets/img/boy_play.png', './assets/img/boy1.png', 3000); 
						} else {
							imageChange('./assets/img/girl_play.png', './assets/img/girl1.png', 3000) 
						}
					}
				}
			}
			
			$rootScope.player.points = parseInt($rootScope.player.points) + 1;
			homeSvc.setData($rootScope.baby, $rootScope.player);
		}
	}
	
	$scope.sleep = function() {
		if ($scope.playing == false) {
			$scope.playing = true;
			playAudio('./assets/sounds/sleep1.mp3');
			if ($rootScope.baby.gender == 'm') {
				imageChange('./assets/img/boy_sleep.png', './assets/img/boy1.png', 14000); 
			} else {
				imageChange('./assets/img/girl_sleep.png', './assets/img/girl1.png', 14000) 
			}
		}
	}
	
	$scope.soundOnOff = function() {
		if (audio.muted) {
			audio.muted = false;
			$scope.sound = './assets/img/sound_on.png'
		} else {
			audio.muted = true;
			$scope.sound = './assets/img/sound_off.png'
		}
	}
	
	function imageChange(url1, url2, time) {
		$scope.babyImage = url1;
		$timeout(function() {
			$scope.babyImage = url2;
			$scope.playing = false;
		}, time); 
	}
	
	function playAudio(u) {
		audio.src = u;
		audio.play();
	}
});