myApp.controller("homeController",function($scope, $rootScope,  $location, $route, $routeParams,
		$http, $httpParamSerializerJQLike, homeSvc, loggedUserSvc, $timeout){

	$rootScope.parent = loggedUserSvc.getInfo().username;
	$scope.error = '';
	$scope.babyName = '';
	$rootScope.baby = {};
	$rootScope.player = {};
	$scope.newFriend = false;
	$scope.benefits = true;
	$scope.friend_baby = '';
	$scope.x = false;
	$scope.filter = '';
	$scope.friends;
	$scope.playing = false;
	$scope.sound = './assets/img/sound_on.png';
	$scope.bottle = 0;
	var audio = new Audio();
	var userInfo = loggedUserSvc.getInfo();
	$scope.alerts = {};
	$scope.alerts.success = false;
	$scope.alerts.error = '';
	$scope.alerts.errorFlag = false;
	$scope.dangerClose = function (){
		$scope.alerts.errorFlag = false;
	}
	$scope.successClose = function(){
      $scope.alerts.success = false;
   }

	function loadGame() {

		if (userInfo.logged == false) {
			$location.path('/login');
		} else {
			if (userInfo.is_alive == -1) {
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
				
				$http({
			  		method: 'POST',
			  	    url: './server/routUserCheck.php',
			  		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			  		data : $httpParamSerializerJQLike(parent)
			  	}).then(function successCallback(response) {
			  		 if (JSON.parse(response.data) == false) {
			  			return $location.path('/users/' + localStorage.getItem("username"));
			  		 }
			  		
			  		homeSvc.getPlayer(user).then( function(result) {
						$rootScope.player = result;
						homeSvc.getBaby(parent).then(function(result) {
							$rootScope.baby = result;
							updateFriends();
							if (!$rootScope.baby.is_alive) {
								$location.path('/users/' + localStorage.getItem("username"));
							}
							if ($rootScope.baby.is_alive == 0) {
								$scope.babyImage = './assets/img/gost.png';
							} else {
								if ($rootScope.baby.gender == 'm') {
									$scope.babyImage = './assets/img/boy1.png';
								} else {
									$scope.babyImage = './assets/img/girl1.png';
								}
							}
						})
					})

			  	}, function errorCallback(response) {
			  		console.log("ERROR");
			  		console.log(response.data);
			  	});
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
				'parent': userInfo.username,
				'name': $scope.babyName,
				'gender': gender,
				'food': 1,
				'drink': 1,
				'happiness': 1,
				'is_alive': 1,
			}

			if (userInfo.is_alive == -1) {
				homeSvc.saveNewBaby($rootScope.baby);
			} else {
				$rootScope.player = {
						'username': userInfo.username,
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


			userInfo.is_alive = 1;
			$route.reload();
		}
	}

	$scope.play = function(item) {
		if ($routeParams.user == localStorage.getItem("username") || isFriend()) {
			if (loggedUserSvc.getInfo().is_alive == 0) {
				$scope.show = 1;
			} else {
				if ($scope.playing == false) {
					$scope.playing = true;
					if (item.currentTarget.getAttribute("id") == 'bottle') {
						if ($rootScope.player.drink_q > 0){
							if ($rootScope.baby.drink < 100) {
								playAudio('./assets/sounds/eat.mp3');
								if (parseInt($rootScope.baby.drink) + 5 >= 100) {
									$rootScope.baby.drink = 100;
								} else {
									$rootScope.baby.drink = parseInt($rootScope.baby.drink) + 5;
								}
								$rootScope.player.drink_q -= 1;

								$rootScope.player.points = parseInt($rootScope.player.points) + 1;
								homeSvc.setData($rootScope.baby, $rootScope.player);
								if ($rootScope.baby.gender == 'm') {
									imageChange('./assets/img/boy_drink.png', './assets/img/boy1.png', 3000);
								} else {
									imageChange('./assets/img/girl_drink.png', './assets/img/girl1.png', 3000);
									$scope.bottle = 1;
									$timeout(function() {
										$scope.bottle = 0;
									}, 3000);
								}
							} else {
								$scope.playing = false;
								console.log("full");
							}
						}
					} else if(item.currentTarget.getAttribute("id") == 'jar') {
						if ($rootScope.player.food_q > 0){
							if ($rootScope.baby.food < 100) {
								playAudio('./assets/sounds/eat.mp3');
								if (parseInt($rootScope.baby.food) + 1 + parseInt($rootScope.player.food_lvl) >= 100) {
									$rootScope.baby.food = 100;
								} else {
									$rootScope.baby.food = parseInt($rootScope.baby.food) + 1 + parseInt($rootScope.player.food_lvl);
								}
								$rootScope.player.food_q -= 1;

								$rootScope.player.points = parseInt($rootScope.player.points) + 1 + parseInt($rootScope.player.food_lvl);
								homeSvc.setData($rootScope.baby, $rootScope.player);
								if ($rootScope.baby.gender == 'm') {
									imageChange('./assets/img/boy_eat.png', './assets/img/boy1.png', 3000);
								} else {
									imageChange('./assets/img/girl_eat.png', './assets/img/girl1.png', 3000)
								}
							} else {
								$scope.playing = false;
								console.log('full');
							}
						}
					} else {
						if ($rootScope.player.toys_q > 0){
							if ($rootScope.baby.happiness < 100) {
								playAudio('./assets/sounds/laugh.mp3');
								if (parseInt($rootScope.baby.happiness) + 1 + parseInt($rootScope.player.cloth_lvl) >= 100) {
									$rootScope.baby.happiness = 100;
								} else {
									$rootScope.baby.happiness = parseInt($rootScope.baby.happiness) + 1 + parseInt($rootScope.player.cloth_lvl);
								}
								$rootScope.player.toys_q -= 1;

								$rootScope.player.points = parseInt($rootScope.player.points) + 1 + parseInt($rootScope.player.cloth_lvl);
								homeSvc.setData($rootScope.baby, $rootScope.player);
								if ($rootScope.baby.gender == 'm') {
									imageChange('./assets/img/boy_play.png', './assets/img/boy1.png', 3000);
								} else {
									imageChange('./assets/img/girl_play.png', './assets/img/girl1.png', 3000)
								}
							} else {
								$scope.playing = false;
								console.log('full');
							}
						}
					}
				}
			}
		}
	}

	$scope.openStore = function() {
		if ($routeParams.user == localStorage.getItem("username")) {
			$location.path('/store');
		}
	}

	$scope.sleep = function() {
		if ($routeParams.user == localStorage.getItem("username") || isFriend()) {
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

	$scope.sendFriendRequest = function() {
	      var sendingData = {};
	      sendingData.receiver = $routeParams.user;
	      sendingData.sender = loggedUserSvc.getInfo().username;

	      if(sendingData.receiver != sendingData.sender){
	         $http({
	   	  		  method: 'POST',
	   	  		  url: './server/addFriendRequest.php',
	   	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	              data : $httpParamSerializerJQLike(sendingData)

	   	  		}).then(function successCallback(response) {
	   	  			   if(response.data.error.length != 0){
								$scope.alerts.error = response.data.error;
								$scope.alerts.errorFlag = true;
								console.log($scope.alerts.errorFlag);
	                  }else{
								$scope.alerts.success = true;
							}
	   	  		  }, function errorCallback(response) {
	   	  			console.log("ERROR");
	     		    console.log(response.data);
	   	  		});
	      }else{
	         console.log("You cant invite yourself");
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

	function updateFriends(){
	      var data = {
	         "username" : loggedUserSvc.getInfo().username
	      }
	      $http({
	           method: 'POST',
	           url: './server/getFriends.php',
	           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	           data : $httpParamSerializerJQLike(data)
	         }).then(function successCallback(response) {
	            $scope.friends = response.data;
	            isFriend();
	            notFriend();
	           }, function errorCallback(response) {
	            console.log("ERROR");
	         });
	}

	function isFriend() {
		for (var i = 0; i < $scope.friends.length; i++) {
			if ($routeParams.user == $scope.friends[i].username2) {
				return true;
			}
		}
		return false;
	}

	function notFriend() {
		if($routeParams.user != localStorage.getItem("username") && !isFriend()) {
			$scope.x = true;
			$scope.filter = 'rgba(128,128,128, 0.6)';
			$scope.benefits = false;
			$scope.friend_baby = "Add friend";
			$scope.newFriend = true;
		} else if (isFriend()) {
			$scope.benefits = false;
			$scope.friend_baby = "Friend's baby";
			$scope.filter = 'rgba(65,169,76, 0.6)'
		}
	}
});
