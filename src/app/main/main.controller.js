import './../WebGL/shaders/ColorGradeShader';

import Display from './../retro-mode/display.class';
import MainScreen from './../retro-mode/screen/MainScreen.class';
import ImprintScreen from './../retro-mode/screen/ImprintScreen.class';
import ContactScreen from './../retro-mode/screen/ContactScreen.class';
import AboutScreen from './../retro-mode/screen/AboutScreen.class';
import threejsRenderer from './../retro-mode/retro-canvas';

export class MainController {
  constructor ($document, $element, $rootScope, $mdMedia, $state, $timeout) {
    'ngInject';

    this.state = $state;
    this.document = $document;
    this.element = $element;
    this.$mdMedia = $mdMedia;
    this.retroMode = false;
    this.timeout = $timeout;

    /* Initialize Display */
    this.retroDisplay = new Display({
      // Display tiles
      width: 64,
      height: 48,
      fontSize: 16,
      spacing: 1.3,
      forceSquareRatio: false,
      bg: '#082d08',
      fg: '#75ff74',
      fontFamily: 'monospace'
    });

    this.retroModeEl = angular.element(document.querySelector( '#retro-mode' ));
    
    let size = this.retroDisplay.computeSize(this.retroModeEl.width(),this.retroModeEl.height());
    this.retroDisplay.setOptions({
      width: size[0],
      height: size[1]
    });
    this.retroDisplay.setDisplayWidth(size[0]);
    this.retroDisplay.setDisplayHeight(size[1]);

    /* create Screens (like routing) */
    this.retroDisplay.screens = {
      mainScreen: new MainScreen(this.retroDisplay, {
        deactivateRetroMode: this.deactivateRetroMode.bind(this)
      }),
      imprintScreen: new ImprintScreen(this.retroDisplay),
      contactScreen: new ContactScreen(this.retroDisplay),
      aboutScreen: new AboutScreen(this.retroDisplay)
    }

    if(this.retroMode) {
      this.activateRetroMode();
    }
  }

  isXS() {
    return this.$mdMedia('xs');
  }

  deactivateRetroMode(state) {
    this.state.go(state);
    this.timeout(() => {
      this.retroMode = false;
    }, 0);
    this.element.find('canvas').detach('');

    // TODO: HOW TO DESTROY RENDERER???!?!?

    this.retroDisplay.glRenderer = null;
  }

  activateRetroMode() {
    this.retroMode = true;
    console.log('RETRO_MODE!!!');

    // Check if rot.js can work on this browser
    if (!ROT.isSupported()) {
        alert("The rot.js library isn't supported by your browser.");
    }
    /************************/

    const stateScreenDict = {
      'app.landing': 'mainScreen',
      'app.imprint': 'imprintScreen', 
      'app.contact': 'contactScreen',
      'app.about': 'aboutScreen'
    }

    this.retroDisplay.setCurrentScreen(this.retroDisplay.screens[stateScreenDict[this.state.current.name]]); // TODO: check routing for current screen

  // WebGL-Rendering (experimental)
    this.retroModeEl.append(this.retroDisplay.getContainer());
    this.retroDisplay.glRenderer = threejsRenderer(this.retroDisplay.getContainer()); // <-- uncomment to use webgl rendering
    if (this.retroDisplay.glRenderer) {
      this.retroModeEl.append( this.retroDisplay.glRenderer.domElement );
    }

  }
}
