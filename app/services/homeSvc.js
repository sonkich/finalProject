myApp.factory("homeSvc", function($http, $httpParamSerializerJQLike){
	var info = {
			'baby': {},
			'player': {}
	};

	var saveNewData = function(baby, player) {
		info.baby = baby;
		info.player = player;
		$http({
	  		  method: 'POST',
	  		  url: './server/saveBaby.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike(baby)
	  		}).then(function successCallback(response) {
	  			console.log('Baby save: ' + response.data);
	  			saveNewPlayer(player);
	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		    console.log(response.data);
	  		});
	}

	function saveNewPlayer(player) {
		$http({
	  		  method: 'POST',
	  		  url: './server/savePlayer.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike(player)
	  		}).then(function successCallback(response) {
	  			console.log('Player save: ' + response.data);
	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		    console.log(response.data);
	  		});
	}

	var getBaby = function(user) {
		return $http({
	  		  method: 'POST',
	  		  url: './server/getBaby.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike(user)
	  		}).then(function successCallback(response) {
	  			info.baby = response.data[0];
	  			return info.baby;
	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		    console.log(response.data);
	  		});
	}

	var getPlayer = function(user) {
		return $http({
	  		  method: 'POST',
	  		  url: './server/getPlayer.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike(user)
	  		}).then(function successCallback(response) {
	  			info.player = response.data[0];
	  			return info.player;

	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		    console.log(response.data);
	  		});
	}

	var setData = function(baby, player) {
		info.baby = baby;
		info.player = player;

		$http({
	  		  method: 'POST',
	  		  url: './server/updateBaby.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike(baby)
	  		}).then(function successCallback(response) {
	  			console.log('Baby set: ' + response.data);
	  			setPlayer(player);

	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		    console.log(response.data);
	  		});
	}

	function setPlayer(player) {
		$http({
	  		  method: 'POST',
	  		  url: './server/updatePlayer.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike(player)
	  		}).then(function successCallback(response) {
	  			console.log('Player set: ' + response.data);

	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		    console.log(response.data);
	  		});
	}

	return {
		saveNewData: saveNewData,
		getBaby: getBaby,
		getPlayer: getPlayer,
		setData: setData
	};
});
