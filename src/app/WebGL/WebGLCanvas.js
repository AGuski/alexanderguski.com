let rtParameters = {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.LinearMipMapLinearFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: true
  };

import './effect-composer.index';

export class WebGLCanvas {
  constructor(element) {
    /* get canvas information */
    this.element = element;
    this.canvasWidth = element.width();
    this.canvasHeight = element.height();

    /* setup WebGL renderer */
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.setSize( this.canvasWidth, this.canvasHeight );
    this.renderer.setPixelRatio( window.devicePixelRatio );

    /* append renderer to canvas */
    element.get(0).appendChild( this.renderer.domElement );

    /* create scene */
    this.scene = new THREE.Scene();

    /* initialize camera */
    this.camera = new THREE.PerspectiveCamera( 50, this.canvasWidth / this.canvasHeight, 10, 10000 );

    this.camera.position.z= 500;

    /* object selection */
    this.objects = [];
    this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();

    element[0].addEventListener('mousedown', this.onMouseDown.bind(this), false);

     /* Composer */

    // this.renderer.autoClear = false; // EFFECTCOMPOSER ???
    this.composer = new THREE.EffectComposer( this.renderer, 
    new THREE.WebGLRenderTarget(
      this.canvasWidth, this.canvasHeight, rtParameters));

    /* RenderPass for Objects in scene3D */
    let renderPass = new THREE.RenderPass( this.scene, this.camera);
    renderPass.clear = true;
    this.composer.addPass( renderPass );

    /* ColdorGrade Shader Pass */
    // let colorGradePass = new THREE.ColorGradePass();
    // colorGradePass.renderToScreen = true;
    // this.composer.addPass( colorGradePass );

    // Make sure screen resolution is set!
    // FXAAPass.uniforms.resolution.value.set(2560, 1600);

    /* Bloom Effect Pass */
    // let effectBloom = new THREE.BloomPass(9);
    // effectBloom.clear = false;
    // this.composer.addPass( effectBloom );

    /* Glitch Shader Pass */
    let glitchPass = new THREE.CustomGlitchPass();
    glitchPass.renderToScreen = true;
    this.composer.addPass( glitchPass );
    
    // let FXAAPass = new THREE.ShaderPass(THREE.FXAAShader);
    // this.composer.addPass(FXAAPass);
    // FXAAPass.renderToScreen = true;
    // this.composer.setSize(this.canvasWidth, this.canvasHeight);

    // // Make sure screen resolution is set!
    // FXAAPass.uniforms.resolution.value.set(1/ this.canvasWidth, 1 / this.canvasHeight);

    // let smaaPass = new THREE.SMAAPass( this.canvasWidth, this.canvasHeight );
    // smaaPass.renderToScreen = true;
    // this.composer.addPass( smaaPass );

    // let effectCopy = new THREE.ShaderPass(THREE.CopyShader);
    // effectCopy.renderToScreen = true;
    // this.composer.addPass(effectCopy);

    let clock = new THREE.Clock()

    /* render loop */
    let render = () => {
      this.delta = clock.getDelta();
      requestAnimationFrame( render );
      this.animation();
      this.composer.render( this.delta );
      // this.renderer.render( this.scene, this.camera );
    }
    render();

    this.resize = () => {
      this.camera.aspect = this.canvasWidth / this.canvasHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize( this.canvasWidth, this.canvasHeight );
    }
    this.resize = this.resize.bind(this);

    window.addEventListener( 'resize', this.resize, false );
  }

  /* add object to this canvas scene */
  add(object) {
    this.scene.add(object);
    object.children.forEach((child) => {
      this.objects.push (child);
    });
    
  }

  /* to be overriden with custom animation */
  animation() {}

  onMouseDown(event) {
    event.preventDefault();
    this.mouse.x = ( event.offsetX / this.renderer.domElement.clientWidth ) * 2 - 1;
    this.mouse.y = - ( event.offsetY / this.renderer.domElement.clientHeight ) * 2 + 1;
    this.raycaster.setFromCamera( this.mouse, this.camera );
    var intersects = this.raycaster.intersectObjects( this.objects );

    if ( intersects.length > 0 ) {
      intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
    }
  }

  /* getters */

  getElement() {
    return this.element;
  }

  getWidth() {
    return this.canvasWidth;
  }

  getHeight() {
    return this.canvasHeight;
  }
}