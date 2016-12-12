import { WebGLBaseCanvas } from './../WebGL/WebGLBaseCanvas';
import './../WebGL/shaders/ColorGradeShader';

export class MainController {
  constructor ($document, $element, $rootScope, $mdMedia, $state) {
    'ngInject';

    this.state = $state;
    this.document = $document;
    this.$mdMedia = $mdMedia;
    this.lightsOn = false;

    // let bgCanvas = new WebGLBaseCanvas(angular.element('#bg-canvas'));

    // let bgShader = THREE.ColorGradeShader;
    // let uniforms = THREE.UniformsUtils.clone( bgShader.uniforms );

    // let material = new THREE.ShaderMaterial( {
    //   uniforms: uniforms,
    //   vertexShader: bgShader.vertexShader,
    //   fragmentShader: bgShader.fragmentShader
    // });
    
    // let quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
    // quad.material = material;
    // bgCanvas.scene.add( quad );

    // bgCanvas.animate = () => {
    //   uniforms[ "time" ].value += bgCanvas.delta;
    // }

    

    // window.addEventListener('wheel', (event) => {
    //   event.preventDefault();
    //   // console.log(event.deltaY);
    //   if (event.deltaY > 100) {
    //     $state.go('app.work');
    //   }
    //   if (event.deltaY < -100) {
    //     $state.go('app.about');
    //   }
    // })
  }

  isXS() {
    return this.$mdMedia('xs');
  }

  switchLight() {
    console.log('switch');
    TweenMax.to(this.document.find('body'), 3.5, {
      // backgroundColor: this.lightsOn ? '#2b2b2b' : '#e4e7e8'
      background: this.lightsOn ? `linear-gradient(336deg, #495364, #3e343a)` : `linear-gradient(336deg, #fff, #000)`
    });
    this.lightsOn = !this.lightsOn;
  }
}
