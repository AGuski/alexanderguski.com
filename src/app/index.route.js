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
      url: '/',
      resolve: {
        cubeHasRotated: rotateToState
      },
      onEnter: ($state) => {
        if (!$state.current.name) return;
        cubeToCenter($state);
      }
    })
    .state('app.imprint', {
      url: '/imprint',
      resolve: {
        cubeHasRotated: rotateToState,
        prevState: ($state) => {
          return $state.current.name;
        }
      },
      views: {
        "bottom-overlay": {
          templateUrl: 'app/views/imprint/imprint.html',
          controller: 'ImprintController',
          controllerAs: 'imprintCtrl'
        }
      }
    })
    .state('app.work', {
      url: '/work',
      resolve: {
        cubeHasRotated: rotateToState
      },
      views: {
        "content": {
          templateUrl: 'app/views/work/work.html',
          controller: 'WorkController',
          controllerAs: 'workCtrl'
        }
      },
      onEnter: ($state) => {
        if (!$state.current.name) return;
        cubeToTopHalf($state);
        bottomContentFromCenter($state);
      }
    })
    .state('app.audio', {
      url: '/audio',
      resolve: {
        cubeHasRotated: rotateToState
      },
      views: {
        "content": {
          templateUrl: 'app/views/audio/audio.html',
          controller: 'AudioController',
          controllerAs: 'AudioCtrl'
        }
      },
      onEnter: ($state) => {
        if (!$state.current.name) return;
        cubeToTopHalf($state);
        bottomContentFromCenter($state);
      }
    })
    .state('app.contact', {
      url: '/contact',
      resolve: {
        cubeHasRotated: rotateToState
      },
      views: {
        "content": {
          templateUrl: 'app/views/contact/contact.html',
          controller: 'ContactController',
          controllerAs: 'ContactCtrl'
        }
      },
      onEnter: ($state) => {
        if (!$state.current.name) return;
        cubeToTopHalf($state);
        bottomContentFromCenter($state);
      }
    })
    .state('app.about', {
      url: '/about',
      resolve: {
        cubeHasRotated: rotateToState
      },
      views: {
        "content": {
          templateUrl: 'app/views/about/about.html',
          controller: 'AboutController',
          controllerAs: 'aboutCtrl'
        }
      },
      onEnter: ($state) => {
        if (!$state.current.name) return;
        cubeToTopHalf($state);
        bottomContentFromCenter($state);
      }
    });

  $urlRouterProvider.otherwise('/');
}

/* State Change Animations */

function cubeToTopHalf() {
  TweenMax.to(angular.element(document).find('menu-cube'), 0.5, {
    transform: 'translateY(-115px)',
    ease: Power4.easeOut
  });
}

function cubeToCenter() {
  TweenMax.to(angular.element(document).find('menu-cube'), 0.5, {
    transform: 'translateY(0px)',
    ease: Power4.easeOut
  });
}

function bottomContentFromCenter(state) {
  let delay = 0;
  switch (state.current.name) {
    case "app.landing":
      delay = 0.3;
    case "app.imprint":
      delay = 0.1;
    case "app.work":
    case "app.audio":
    case "app.contact":
    case "app.about":
      TweenMax.set(angular.element('#bottom-half')[0], {
        opacity: 0, 
        transform: 'translateY(-40px)'
      });
      TweenMax.to(angular.element('#bottom-half')[0], 0.5, {
        opacity: 1,
        transform: 'translateY(0px)',
        ease: Power4.easeOut,
        delay: delay
      });
      break;
    default:
  }
}

/* Use service to bind state changing to cube menu rotation */
const rotateToState = (rotateCube, $state) => {
  switch ($state.current.name) {
    case "app.work":
    case "app.audio":
    case "app.contact":
    case "app.about":
      TweenMax.to(angular.element('#bottom-half')[0], 0.5, {
        opacity: 0,
        transform: 'translateY(-40px)',
        ease: Power2.easeOut
      });
      break;
    default:
  }
  rotateCube.rotateTo($state.next.name);
  if($state.current.name) {
    return rotateCube.rotationEnded();
  }
}
