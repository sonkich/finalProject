myApp.controller("homeController",function($scope, homeSvc){
	$scope.hasBaby = 1;
	$scope.user = 'sisi';
	$scope.logged = 1;
	
	$scope.error = '';
	$scope.babyName = '';
	$scope.baby = {};
	$scope.player = {};
	
	function loadGame() {
		if ($scope.logged == 0) {
			//window.open('index.html', '_self');
		} else {
			if ($scope.hasBaby == -1) {
				$scope.start = 'block';
				$scope.game = 'none';
			} else {
				var user = {
						'username': $scope.user
				}
				
				homeSvc.getBaby(user).then( function(result) {
					$scope.baby = result;
					console.log($scope.baby);
					$scope.start = 'none';
					$scope.game = 'block';
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
			$scope.baby = {
				'parent': $scope.user,
				'name': $scope.babyName,
				'gender': gender,
				'food': 0,
				'drink': 0,
				'happiness': 0,
				'is_live': 1
			}
			
			$scope.player = {
					'parent': $scope.user,
					'points': 0,
					'food_q': 20,
					'drink_q': 20,
					'toys_q': 20,	
			}
			
			if ($scope.hasBaby == -1) {
				homeSvc.saveBaby($scope.baby, $scope.player);
			} else {
				homeSvc.updateBaby($scope.baby, $scope.player);
			}
			
			
			$scope.start = 'none';
			$scope.game = 'block';
		}
	}
});