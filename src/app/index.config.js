export function config ($provide, $logProvider, $locationProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  $locationProvider.html5Mode(true);

  // Smooth scrolling animation
  $provide.decorator('$uiViewScroll', function () {
    return function (uiViewElement) {
        angular.element('html,body').animate({
            scrollTop: uiViewElement.offset().top
        }, 1000);
    };
  });

}
