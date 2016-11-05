import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import { MainController } from './main/main.controller';

import { AboutController } from './views/about/about.controller';

import MenuCubeComponent from './modules/components/menu-cube/menu-cube.component';

import { affixTopDirective } from './modules/directives/affix-top/affix-top.directive';

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
  .controller('AboutController', AboutController)

  /* Components */
  .component('menuCube', MenuCubeComponent)

  /* Directives */
  .directive('affixTop', affixTopDirective);

  /*Factories */

  /*Services*/
