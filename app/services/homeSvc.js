myApp.factory("homeSvc", function($http){
	
	var updatePlayer = function(player) {
		$http({
  		  method: 'POST',
  		  url: './server/updatePlayer.php',
  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  		  data : player,
  		  
  		}).then(function successCallback(response) {
  		    
  			console.log(response.data);
  			
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
	  		  data : user,
	  		  
	  		}).then(function successCallback(response) {
	  			return response.data[0];
	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		    console.log(response.data);
	  		});
	}
	
	var getPlayer = function(user) {
		$http({
	  		  method: 'POST',
	  		  url: './server/getPlayer.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : user,
	  		  
	  		}).then(function successCallback(response) {
	  			console.log(response.data[0]);
	  			return response.data[0];
	  		
	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		    console.log(response.data);
	  		});
	}
	
	return {
		saveBaby:function(baby, player) {
			$http({
		  		  method: 'POST',
		  		  url: './server/saveBaby.php',
		  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		  		  data : baby,
		  		  
		  		}).then(function successCallback(response) {
		  			console.log(response.data);
		  			updatePlayer(player);
		  			
		  		  }, function errorCallback(response) {
		  			console.log("ERROR");
		  		    console.log(response.data);
		  		});
		},
		updateBaby:function(baby, player) {
			$http({
		  		  method: 'POST',
		  		  url: './server/updateBaby.php',
		  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		  		  data : baby,
		  		  
		  		}).then(function successCallback(response) {
		  			console.log(response.data);
		  			updatePlayer(player);
		  			
		  		  }, function errorCallback(response) {
		  			console.log("ERROR");
		  		    console.log(response.data);
		  		});
		},
		getBaby: getBaby,
		getPlayer: getPlayer,
		loadBaby: function() {
			
		}
	};
});