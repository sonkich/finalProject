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
         controller: 'loginController',
         authenticated: false
      })
      .when('/register',{
         templateUrl: './app/views/register.html',
         controller: 'registerController',
         authenticated: false
      })
      .when('/users',{
         templateUrl: './app/views/users.html',
         controller: 'usersController',
         authenticated: true
      })
      .when('/ranking',{
         templateUrl: './app/views/ranking.html',
         controller: 'rankingController',
         authenticated: true
      })
      .when('/games/toyGame',{
         templateUrl: './app/views/toyGame.html',
         controller: 'toyGameController',
         authenticated: true
      })
      .when('/games/waterGame',{
         templateUrl: './app/views/waterGame.html',
         controller: 'waterGameController',
         authenticated: true
      })
      .when('/store',{
         templateUrl: './app/views/store.html',
         controller: 'storeController',
         authenticated: true
      })
      .when('/friends',{
         templateUrl: './app/views/friends.html',
         controller: 'friendsController',
         authenticated: true
      })


      .otherwise({
          redirectTo : "/login"
      })
    ;
})
.run(function($rootScope,$location,loggedUserSvc){
   $rootScope.$on('$routeChangeStart',function(event , next , current){

      if(next.$$route){

         if (next.$$route.authenticated) {
            if(!loggedUserSvc.getInfo().logged){
               $location.path('#/login');
            }
         }
      }
   });

   if(localStorage.getItem("username")){
      loggedUserSvc.setInfo(localStorage.getItem("username"));
   }

});
