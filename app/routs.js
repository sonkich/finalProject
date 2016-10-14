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
