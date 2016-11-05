export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('app', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'mainCtrl'
    })
    /* === Home Page === */
    .state('app.landing', {
      url: '/'
    })
    .state('app.about', {
      url: '/about',
      views: {
        "content": {
          templateUrl: 'app/views/about/about.html',
          controller: 'AboutController',
          controllerAs: 'aboutCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/');
}
