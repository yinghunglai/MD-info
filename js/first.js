angular
.module('app')
.controller('firstCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
// This method send post request
   $scope.load = function () {
      var payload = JSON.stringify({
        'participant':[{'FirstName':$scope.FirstName, 'LastName':$scope.LastName, 'City':$scope.City,'Consent':$scope.Consent}]
      });
      console.log('Sending a POST request payload:',payload);
      $state.go('second');
   }
}]);
