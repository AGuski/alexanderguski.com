let InfoBoxController = class {
  constructor() {
    'ngInject';
    
  }

  $onInit() {
    TweenMax.set(angular.element('.info-box'), {transform: 'rotateY(17deg) translateX(-10px)'})
    TweenMax.to(angular.element('.info-box'), 30, {
      transform: 'rotateY(-17deg) translateX(10px)',
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut
    });
  }
}

export default {
  templateUrl: 'app/modules/components/info-box/info-box.html',
  controller: InfoBoxController,
  controllerAs: 'ctrl',
  transclude: true,
  bindings:{
    title: '@'
  }
}
