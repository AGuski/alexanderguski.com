import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import { MainController } from './main/main.controller';

import { WorkController } from './views/work/work.controller';
import { AudioController } from './views/audio/audio.controller';
import { ContactController } from './views/contact/contact.controller';
import { AboutController } from './views/about/about.controller';

import { ImprintController } from './views/imprint/imprint.controller';

import MenuCubeComponent from './modules/components/menu-cube/menu-cube.component';
import InfoBoxComponent from './modules/components/info-box/info-box.component';

import { affixTopDirective } from './modules/directives/affix-top/affix-top.directive';

import rotateCubeService from './modules/services/rotate-cube.service';

angular.module('agApp', [ 'ngMaterial',
                          'ngAnimate',
                          'ngSanitize',
                          'ngResource',
                          'ui.router',
                          'pc035860.scrollWatch'

  ])
  .config(config)
  .config(routerConfig)
  .run(runBlock)

  /* Controllers */
  .controller('MainController', MainController)
  .controller('WorkController', WorkController)
  .controller('AudioController', AudioController)
  .controller('ContactController', ContactController)
  .controller('AboutController', AboutController)
  .controller('ImprintController', ImprintController)

  /* Components */
  .component('menuCube', MenuCubeComponent)
  .component('infoBox', InfoBoxComponent)

  /* Directives */
  .directive('affixTop', affixTopDirective)

  /*Factories */

  /*Services*/
  .service('rotateCube', rotateCubeService)

  /*Decorators*/
  .decorator('$state', function($delegate, $rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, state, params) {
      $delegate.next = state;
      $delegate.toParams = params;
    });
    return $delegate;
  });

