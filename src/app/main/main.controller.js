export class MainController {
  constructor ($document, $element, $rootScope, $mdMedia) {
    'ngInject';

    this.document = $document;
    this.$mdMedia = $mdMedia;
    this.lightsOn = false;

    this.stateChangeListener = $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => {
      console.log(fromState);
      console.log(toState);
      switch (fromState.name) {
        case 'app.landing':
          let timeline = new TimelineMax();
          timeline.to($element.find('menu-cube'), 0.8, {
            transform: 'translateY(-115px)',
            ease: Power3.easeOut
          }).from(angular.element('#content-bottom')[0], 0.8, {
            opacity: 0,
            transform: 'translateY(-60px)',
            ease: Power2.easeOut
          }, 0.3);
          break;
        default:
          break;
      }
       
    });
  }

  isXS() {
    return this.$mdMedia('xs');
  }

  switchLight() {
    TweenMax.to(this.document.find('body'), 3.5, {
      backgroundColor: this.lightsOn ? '#2b2b2b' : '#e4e7e8'
    });
    this.lightsOn = !this.lightsOn;
  }
}
