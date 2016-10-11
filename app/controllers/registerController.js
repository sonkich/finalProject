myApp.controller("registerController",function($scope){

   $scope.userData = {};
   $scope.userData.username = '';
   $scope.userData.email = '';
   $scope.userData.password = '';
   $scope.userData.password2 = '';

   $scope.userData.errors = {};
   $scope.userData.errors.username = '';
   $scope.userData.errors.email = '';
   $scope.userData.errors.password = '';
   $scope.userData.errors.password2 = '';


   $scope.register = function(){

   }
});
