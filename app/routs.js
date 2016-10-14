myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/users/:user', {
         templateUrl: './app/views/home.html',
         controller: 'homeController',
         authenticated: true
      })
      .when('/games',{
         templateUrl: './app/views/games.html',
         controller: 'gamesController',
         authenticated: true
      })
      .when('/login',{
         templateUrl: './app/views/login.html',
         controller: 'loginController'
      })
      .when('/register',{
         templateUrl: './app/views/register.html',
         controller: 'registerController'
      })
      .when('/ranking',{
         templateUrl: './app/views/ranking.html',
         controller: 'rankController',
         authenticated: true
      })
      .when('/games/toyGame',{
         templateUrl: './app/views/toyGame.html',
         controller: 'toyGameController',
         authenticated: true
      })


      .otherwise({
           template:'<h1>Not found</h1><h2>{{message}}</h2>',
           controller:function($scope) {
                $scope.message='not found page is shown'
           }
      })
    ;
})
.run(function($rootScope,$location,loggedUserSvc){
   $rootScope.$on('$routeChangeStart',function(event , next , current){


      if (next.$$route.authenticated) {
         console.log("next.$$route.authenticated");
      }else{
         console.log("NOT AUTh");
      }
   });

});
