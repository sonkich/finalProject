myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
         templateUrl: './app/views/home.html',
         controller: 'homeController'
      })
      .when('/games',{
         templateUrl: './app/views/games.html',
         controller: 'gamesController'
      })
      .when('/login',{
         templateUrl: './app/views/login.html',
         controller: 'loginController'
      })
      .when('/register',{
         templateUrl: './app/views/register.html',
         controller: 'registerController'
      })
      .when('/user/:username',{
         templateUrl: './app/views/register.html',
         controller: 'registerController'
      })

      .otherwise({
           template:'<h1>Not found</h1><h2>{{message}}</h2>',
           controller:function($scope) {
                $scope.message='not found page is shown'
           }
      })
    ;
})
