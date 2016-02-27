angular
  .module('app')
  .config(function($stateProvider, $urlRouterProvider) {
    // if url not landing or display, show landing page
    $urlRouterProvider.otherwise('/first');
    $stateProvider
        // Initial view for taking starting points and destination  ========================================
        .state('first', {
            url: '/first',
            templateUrl: 'html/first.html',
            controller: 'firstCtrl'
        })
        .state('second', {
            url: '/second',
            templateUrl: 'html/second.html',
            controller: 'secondCtrl'
        })
  });
